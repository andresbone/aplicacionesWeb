const express = require('express');
const router = express.Router();
const db = require('../db');
const { verifyToken } = require('../utils/auth');

router.get('/:jug_id', verifyToken, (req, res) => {
    const { jug_id } = req.params;//Esta linea calcula el id desde los parametros de la url
    const query = 'SELECT * FROM jugador WHERE jug_id = ?;';
    db.query(query, [jug_id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({error: 'Error al obtener al jugador'});
        }
        if (results.length === 0) {
            return res.status(404).json({error: 'jugador not found'});
        }
        res.json(results[0]);
    });
});

// Método get para multiples registros con paginacion
router.get('/', verifyToken, (req, res)=>{
    //Obtener parametro de la URL
    const page = parseInt(req.query.page) || 1; // pagina actual por defecto va a ser uno
    const limit = parseInt(req.query.limit) || 10; // limite de registros por defecto 10 registro
    const offset = (page - 1) * limit; //el punto de inicio de la consulta
    const cadena = req.query.cadena;
    let whereClause = '';
    let queryParams =[];
    if (cadena) {
        whereClause = 'where jug_nombre like ? or jug_posicion like ? or jug_nacionalidad like ?';
        const searchTerm = `%${cadena}%`;
        queryParams.push(searchTerm, searchTerm, searchTerm); // BUSCAR LOS TRES TERMINOS 
    }
    //Consultas para obtener registros
    const countQuery = `select count(*) as total from jugador ${whereClause}`;
    db.query(countQuery, queryParams, (err, countResult) =>{
     if (err) {
        console.error(err);
        return res.status(500).json({error: "Error al obtener el total de jugador"});
     }
     const totalJugador = countResult[0].total;
     const totalPages = Math.ceil(totalJugador / limit);
     //Consulta para obtener los registros de la pagina
     const JugadorQuery = `select * from jugador ${whereClause} LIMIT ? OFFSET ?`;
     queryParams.push(limit,offset);
     db.query(JugadorQuery, queryParams, (err, JugadorResult) => {
        if (err) {
            console.error(err);
            return res.status(500).json({error: 'Error al obtener los jugador'});
        }
        //Enviar respuestas con los datos y la informacion de paginacion
        res.json({
            totalItems: totalJugador,
            totalPages: totalPages,
            currentPage: page,
            limit: limit,
            data: JugadorResult
        });
     });
    });
});

//Metodo POST
router.post('/', verifyToken, async (req, res) => {
    //Obtener los datos , declarar constatntes
    const {jug_nombre, jug_posicion, jug_nacionalidad, jug_edad, equ_id, usu_id, Cedula} = req.body;
    const search_query = 'select count(*) as contador from jugador where Cedula = ?';
    db.query(search_query, [Cedula], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Error interno al verificar al jugador' });
        }
        if (result[0].contador > 0) {
            return res.status(409).json({ error: "El jugador con esta Cedula " + Cedula + " ya existe" })
        }
        const query = 'insert into jugador values (null, ?, ?, ?, ?, ?, ?, ?)'; //estas poniendo id manualmente cuando es auto incrementable
        const values = [jug_nombre, jug_posicion, jug_nacionalidad, jug_edad, equ_id, usu_id, Cedula];
        db.query(query, values, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: 'Error al registar jugador' });
            }
            res.status(201).json({
                message: 'jugador registardo correctamente',
                usu_id: result.insertkd
            });
        });
    });

});

//Metodo Put
router.put('/:jug_id', verifyToken, (req, res)=> {
    const {jug_id} = req.params;
    const{jug_nombre, jug_posicion, jug_nacionalidad, jug_edad, equ_id, usu_id, Cedula} = req.body;
    const query = 'update jugador set jug_nombre=?, jug_posicion=?, jug_nacionalidad=?, jug_edad=?, equ_id=?, usu_id=?, Cedula=? where jug_id=?';
    const values = [jug_nombre, jug_posicion, jug_nacionalidad, jug_edad, equ_id, usu_id, Cedula, jug_id];
    db.query(query, values, (err, result)=>{
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Error al actualizar jugador' });
        };
        if (result.affectedRows === 0) {
            return res.status(404).json({message: "Jugador no encontrado"});
        }
        res.status(200).json({
            message: 'Jugador actualizado correctamente',
        })
    });
});


//Metodo Delete
router.delete('/:jug_id', verifyToken, (req, res)=> {
    const {jug_id} = req.params;
    const search_query = 'select count(*) as contador from estadistica_jugador where jug_id = ?';
    db.query(search_query, [jug_id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Error interno al verificar al jugador' });
        }
        if (result[0].contador > 0) {
            return res.status(409).json({ error: "El jugador no se puede eliminar por que tiene estadisticas" })
        }
    const query = 'delete from jugador where jug_id=?'
    const values = [jug_id];
    db.query(query, values, (err, result)=>{
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Error al eliminar jugador' });
        };
        if (result.affectedRows === 0) {
            return res.status(404).json({message: "Jugador no encontrado"});
        }
        res.status(201).json({
            message: 'Jugador eliminado correctamente',
        });
        });
    });


});


module.exports = router;
