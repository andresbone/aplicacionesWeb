const express = require('express');
const router = express.Router();
const db = require('../db.js'); // <-- con extensión .js explícita
const { verifyToken } = require('../utils/auth.js');
const { parse } = require('dotenv');

//Metodo Get para registros unicos
router.get('/:id', verifyToken, (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM torneo WHERE tor_id = ?';

    db.query(query, [id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error al obtener el torneo' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Torneo no encontrado' });
        }

        res.json(results[0]);
    });
});


//Get multiple registros tor_nombre tor_temporada
router.get('/', verifyToken, (req, res) => {
    //Obtener parametros de URL 
    const page = parseInt(req.query.page) || 1; //Pagina actual, por defecto 1
    const limit = parseInt(req.query.limit) || 10;//limete de registros, por defecto 10
    const offset = (page - 1) * limit; //El punto de inicio de la consulta
    const cadena = req.query.cadena; //Parametro de busqueda

    let whereClause = '';
    let queryParams = [];
    if (cadena) {
        whereClause = `WHERE tor_nombre LIKE ? OR tor_temporada LIKE ? OR tor_pais LIKE ?`;
        const searchTerm = `%${cadena}%`;
        queryParams.push(searchTerm, searchTerm, searchTerm);// agregar en el searchTerm las cantidad de consultas que se requiere en el WhereClause
    }
    const countQuery = `SELECT count(*) as total FROM torneo ${whereClause}`;
    db.query(countQuery, queryParams, (err, countResults) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: `Error al obtener el total de torneos ${err} ` });
        }
        const totalTorneos = countResults[0]['total'];
        const totalPages = Math.ceil(totalTorneos / limit);
        //Consulta para obtener los registros de la página
        const torneoQuery = `SELECT * FROM torneo ${whereClause} LIMIT ? OFFSET ?`;
        queryParams.push(limit, offset);
        db.query(torneoQuery, queryParams, (err, torneoResults) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Error al obtener los torneos' });
            }
            //Enviar respuesta con los datos y la información de la paginación
            res.json({
                totalItems: totalTorneos,
                totalPages: totalPages,
                currentPage: page,
                limit: limit,
                data: torneoResults
            });
        });

    });


});


//Metodo Post para crear nuevos registros 
router.post('/', verifyToken, (req, res) => {
    const { tor_nombre, tor_temporada, tor_pais, usu_id } = req.body;
    const search_query = 'select count(*)as contador from torneo where tor_nombre = ?';
    db.query(search_query, [tor_nombre], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: `Error intento al verificar el torneo` });
        }
        if (results[0].contador > 0) {
            return res.status(409).json({ error: `El torneo con nombre ` + tor_nombre + ` ya existe` });
        }
        const query = 'INSERT INTO torneo (tor_nombre, tor_temporada, tor_pais, usu_id) VALUES (?, ?, ?, ?)';
        const values = [tor_nombre, tor_temporada, tor_pais, usu_id];
        db.query(query, values, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: `Error al crear el torneo ${err.message}` });
            }
            res.status(201).json({
                message: `Torneo creado exitosamente`,
                id: results.insertId


            });

        });
    });
});

//Método PUT
router.put('/:id', verifyToken, (req, res) => {
    const { id } = req.params;
    const { tor_nombre, tor_temporada, tor_pais, usu_id } = req.body;
    const query = 'UPDATE torneo SET tor_nombre = ?, tor_temporada = ?, tor_pais = ?, usu_id = ? WHERE tor_id = ?';
    const values = [tor_nombre, tor_temporada, tor_pais, usu_id, id];
    db.query(query, values, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error al actualizar el torneo' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Torneo no encontrado' });
        }
        res.status(200).json({ message: 'Torneo actualizado exitosamente' });

    });

});

//Metodo DELETE
router.delete('/:id', verifyToken, (req, res) => {
    const { id } = req.params;
    const search_query = "select count(*) as contador from partido where tor_id = ?";
    db.query(search_query, [id], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: `Error interno al verificar el partido` });
        }
        if (results[0].contador > 0) {
            return res.status(409).json({ error: `El torneo no se pude eliminar porque tiene partido registrados` });
        }
        const query = 'DELETE FROM torneo WHERE tor_id = ?';
        const values = [id];
        db.query(query, values, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Error al eliminar el torneo' });
            }

            if (results.affectedRows === 0) {
                return res.status(404).json({ message: 'Torneo no encontrado' });
            }

            res.json({ message: 'Torneo eliminado exitosamente' });
        });
    });


});







module.exports = router;