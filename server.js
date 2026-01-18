const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app= express()
const port= process.env.PORT || 5000;

app.use(cors())
app.use(express.json())


//importar rutas
const authRoutes = require('./routes/auth');
const equiposRoutes = require('./routes/equipos');git add .

//usar rutas 
app.use('/api/auth',authRoutes);
app.use('/api/equipos',equiposRoutes);

//ruta de ejempl
app.get('/',(req,res)=>{
    res.send('hola desde el servidor')
})

// iniciar el srvidor 
app.listen(port,()=>{
    console.log(`servidor escuchando en el puerto ${port}`);
}) 