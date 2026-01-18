
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const db = require('../db')
const { generateToken } = require('../utils/auth')


router.post('/login', (req, res) => {
    const { usu_nombre, usu_password } = req.body
    db.query('SELECT * FROM usuario WHERE usu_nombre =?', [usu_nombre], async (err, results) => {
        if (err) throw err;
        if (results.length === 0) {
            return res.status(401).json({ message: "usuario o contrasenia incorrecta" })
        }
        const user = results[0]
        const isPasswordValid = await bcrypt.compare(usu_password, user.usu_password)
        if (!isPasswordValid) {
            return res.status(401).json({ message: "usuario o contrasenia incorrecta" })
        }
        //Si el logueo es correcto la aplicacion genera un token y lo envia al cliente
        const token = generateToken({ usu_id: user.usu_id, usu_nombre: user.usu_nombre });
        res.json({ message: "logeo exitoso", token })
    })
});
module.exports = router;
