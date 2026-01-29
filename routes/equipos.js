const express = require('express');
const router = express.Router();
const db = require('../db');
const { verifyToken } = require('../utils/auth');

//Metodo get para registro unico
router.get('/:id', verifyToken, (req, res) => {
    const { id } = req.params;//Capturar el id desde los parametros de la URL
    const query = 'SELECT * FROM equipo WHERE equ_id = ?;';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error al obtener el equipo' })
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Equipo no encontrado' })
        }
        res.json(results[0]);
    });
});

//Metodo Get para multiples registros con paginacion
router.get('/', verifyToken, (req, res) => {
    // obtener parámetros de la URL
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit; // el punto de inicio de la consulta
    const cadena = req.query.cadena;
    let whereClause = '';
    let queryParams = [];
    if (cadena) {
        whereClause = 'where equ_nombre like ? or equ_ciudad like ? or equ_estadio like ?';
        const searchTerm = `%${cadena}%`;
        queryParams.push(searchTerm, searchTerm, searchTerm)
    }
    // consulta para obtener total de registros
    const countQuery = `SELECT COUNT(*) as total FROM equipo ${whereClause}`;
    db.query(countQuery, queryParams, (err, countResult) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error al obtener total de equipos' });
        }

        const totalEquipos = countResult[0].total;
        const totalPages = Math.ceil(totalEquipos / limit);

        const equiposQuery = `SELECT * FROM equipo ${whereClause} LIMIT ? OFFSET ?`;
        queryParams.push(limit, offset);

        db.query(equiposQuery, queryParams, (err, equiposResult) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Error al obtener equipos' });
            }

            res.json({
                totalItems: totalEquipos,
                totalPages: totalPages,
                currentPage: page,
                limit: limit,
                data: equiposResult
            });
        });
    });
});

//Método POST
router.post('/', verifyToken, (req, res) => {
    //Obtener los datos
    const { equ_nombre, equ_ciudad, equ_estadio, equ_fundacion, usu_id } = req.body;
    const query = 'insert into equipo values(null, ?, ?, ?, ?, ?)';
    const values = [equ_nombre, equ_ciudad, equ_estadio, equ_fundacion, usu_id];
    db.query(query, values, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Error al insertar el equipo' });
        }
        console.log('Equipo insertado correctamente');
        res.status(201).json({
            message: 'Equipo insertado correctamente',
            equ_id: result.insertId
        });
    })
})

//Método PUT
router.put('/:id', verifyToken, (req, res) => {
    //Obtener los datos
    const { id } = req.params; //Capturar el id desde los parámetros de la URL
    const { equ_nombre, equ_ciudad, equ_estadio, equ_fundacion, usu_id } = req.body;
    const query = 'update equipo set equ_nombre = ?, equ_ciudad = ?, equ_estadio = ?, equ_fundacion = ?, usu_id = ? where equ_id = ?';
    const values = [equ_nombre, equ_ciudad, equ_estadio, equ_fundacion, usu_id, id];
    db.query(query, values, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Error al actualizar el equipo' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Equipo no encontrado" })
        }
        console.log('Equipo actualizado correctamente');
        res.status(201).json({
            message: 'Equipo actualizado correctamente'
        });

    })
});

// Método DELETE mejorado con lógica de limpieza
router.delete('/:id', verifyToken, (req, res) => {
    const { id } = req.params;

    // 1. Iniciamos una transacción para asegurar la integridad
    db.beginTransaction((err) => {
        if (err) return res.status(500).json({ error: "Error al iniciar transacción" });

        // PASO 1: Borrar estadísticas de los jugadores que pertenecen a ese equipo
        const deleteStats = `DELETE FROM estadistica_jugador WHERE jug_id IN (SELECT jug_id FROM jugador WHERE equ_id = ?)`;

        db.query(deleteStats, [id], (err) => {
            if (err) return db.rollback(() => res.status(500).json({ error: "Error eliminando estadísticas" }));

            // PASO 2: Borrar jugadores y entrenadores (puedes usar varias queries o una que maneje las dependencias)
            const deletePlayers = `DELETE FROM jugador WHERE equ_id = ?`;
            db.query(deletePlayers, [id], (err) => {
                if (err) return db.rollback(() => res.status(500).json({ error: "Error eliminando jugadores" }));

                const deleteCoach = `DELETE FROM entrenador WHERE equ_id = ?`;
                db.query(deleteCoach, [id], (err) => {
                    if (err) return db.rollback(() => res.status(500).json({ error: "Error eliminando entrenador" }));

                    // PASO 3: Borrar partidos donde participó el equipo (local o visitante)
                    const deleteMatches = `DELETE FROM partido WHERE equ_local_id = ? OR equ_visitante_id = ?`;
                    db.query(deleteMatches, [id, id], (err) => {
                        if (err) return db.rollback(() => res.status(500).json({ error: "Error eliminando partidos" }));

                        // PASO 4: Finalmente, borrar el equipo
                        const deleteTeam = `DELETE FROM equipo WHERE equ_id = ?`;
                        db.query(deleteTeam, [id], (err, result) => {
                            if (err) return db.rollback(() => res.status(500).json({ error: "Error final al eliminar equipo" }));

                            // Si todo salió bien, confirmamos los cambios
                            db.commit((err) => {
                                if (err) return db.rollback(() => res.status(500).json({ error: "Error al confirmar cambios" }));

                                if (result.affectedRows === 0) {
                                    return res.status(404).json({ message: 'Equipo no encontrado' });
                                }
                                res.status(200).json({ message: 'Equipo y todas sus relaciones eliminadas correctamente' });
                            });
                        });
                    });
                });
            });
        });
    });
});

module.exports = router;