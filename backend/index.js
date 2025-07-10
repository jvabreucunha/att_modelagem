const express = require('express')
const app = express()
const cors = require('cors')
const routes = require('./routes')
require('dotenv').config() 

const PORT = process.env.PORT
const hostname = 'localhost'

const conn = require('./db/conn')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())
app.use(routes)

app.get('/', (req,res)=>{
    res.status(200).json({message: "Aplicação rodando!"})
})

conn.sync()
.then(()=>{
    app.listen(PORT, hostname, ()=>{
        console.log(`Servidor rodando em http://${hostname}:${PORT}`)
    })
})
.catch((err)=>{
    console.error('Não foi possível conectar com o banco de dados!',err)
})

