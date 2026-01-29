const express = require('express');
const router = express.Router();
const db = require('../db');
const { verifyToken } = require('../utils/auth');

router.get('/:id', verifyToken, (req, res) => {
    const { id } = req.params;//Esta linea calcula el id desde los parametros de la url
    const query = 'SELECT * FROM usuario WHERE usu_id = ?;';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error al obtener al usuario' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'usuario not found' });
        }
        res.json(results[0]);
    });
});

// Método get para multiples registros con paginacion y Busqueda
router.get('/', verifyToken, (req, res) => {
    //Obtener parametro de la URL
    const page = parseInt(req.query.page) || 1; // pagina actual por defecto va a ser uno
    const limit = parseInt(req.query.limit) || 10; // limite de registros por defecto 10 registro
    const offset = (page - 1) * limit; //el punto de inicio de la consulta
    const cadena = req.query.cadena;
    let whereClause = '';
    let queryParams = [];
    if (cadena) {
        whereClause = 'where usu_nombre like ? or usu_email like ? or usu_rol like ?';
        const searchTerm = `%${cadena}%`;
        queryParams.push(searchTerm, searchTerm, searchTerm); // BUSCAR LOS TRES TERMINOS 
    }
    //Consultas para obtener registros
    const countQuery = `select count(*) as total from usuario ${whereClause}`;
    db.query(countQuery, queryParams, (err, countResult) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Error al obtener el total de usuarios" });
        }
        const totalUsuarios = countResult[0].total;
        const totalPages = Math.ceil(totalUsuarios / limit);
        //Consulta para obtener los registros de la pagina
        const UsuariosQuery = `select * from usuario ${whereClause} LIMIT ? OFFSET ?`;
        queryParams.push(limit, offset);
        db.query(UsuariosQuery, queryParams, (err, usuariosResult) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Error al obtener los usuario' });
            }
            //Enviar respuestas con los datos y la informacion de paginacion
            res.json({
                totalItems: totalUsuarios,
                totalPage: totalPages,
                currentPage: page,
                limit: limit,
                data: usuariosResult
            });
        });
    });
});

// METODO POST 

router.post('/', verifyToken, async (req, res) => {
    //Obtener los datos , declarar constatntes
    const { usu_nombre, usu_email, usu_password, usu_rol } = req.body;
    const search_query = 'select count(usu_email) as contador from usuario where usu_email = ?';
    db.query(search_query, [usu_email], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Error interno al verificar el usuario' });
        }
        if (result[0].contador > 0) {
            return res.status(409).json({ error: "El usuario con este email " + usu_email + " ya existe" })
        }
        const query = 'insert into usuario values (null, ?, ?, ?, ?)';
        const values = [usu_nombre, usu_email, usu_password, usu_rol];
        db.query(query, values, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: 'Error al registar usuario' });
            }
            res.status(201).json({
                message: 'usuario registardo correctamente',
                usu_id: result.insertkd
            });
        });
    })


})

//Metodo put
router.put('/:id', verifyToken, (req, res) => {
    // Obtener el ID de la ciudad desde los parámetros de la URL
    const { id } = req.params;
    // Obtener los datos del cuerpo de la solicitud
    const { usu_nombre, usu_email, usu_password, usu_rol} = req.body;

    // Consulta SQL para actualizar el usuario
    const query = 'UPDATE usuario SET usu_nombre = ?, usu_email = ?, usu_password = ?, usu_rol = ? WHERE usu_id = ?';
    const values = [usu_nombre, usu_email, usu_password, usu_rol,  id];

    db.query(query, values, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Error al actualizar la usuario' });
        }
        // Verificar si se actualizó alguna fila
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'usuario no encontrado' });
        }
        res.status(200).json({
            message: 'usuario actualizado correctamente',
        });
    });
});

//Metodo delete
router.delete('/:id', verifyToken, (req, res) => {
    const { id } = req.params;
    const search_Query = 'select count(*S) as contador from entrenador where usu_id = ?';
    db.query(search_Query, [id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Error intero a verificar el entrenador"})
        }
        if (result[0].contador > 0) {
           return res.status(409).json({ error: "El usuario eliminar porque el registro entrenador ya existe" }) 
        }
        const query = 'DELETE FROM usuario WHERE usu_id = ?;';
    const values = [id];
    db.query(query, values, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Error al eliminar al usuario' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'usuario no encontrado' });
        }
        res.status(200).json({
            message: 'usuario eliminado correctamente',
        });
    });
    });
    
});

module.exports = router;