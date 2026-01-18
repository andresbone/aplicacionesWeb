const mysql =require('mysql2')
require('dotenv').config()
const db = mysql.createConnection({
    host: process.env.BD_HOST,
    user: process.env.BD_USER,
    password: process.env.BD_PASSWORD,
    database: process.env.BD_NAME,
    
})

db.connect(err =>{
    if (err) {
        console.log('error',err)
        return
    }
    console.log('conexion exitosa')
})
 module.exports = db