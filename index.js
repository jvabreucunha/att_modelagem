const express = require('express')
const app = express()
const cors = require('cors')

const PORT = 3000
const hostname = 'localhost'

const entregaController = require('./controller/entrega.controller')
const fabricanteController = require('./controller/fabricante.controller')
const produtoController = require('./controller/produto.controller')
const conn = require('./db/conn')

// ------------ MiddlleWare ------------------
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())
// -------------------------------------------

app.post('/fabricante', fabricanteController.cadastrar)
app.get('/fabricante', fabricanteController.listar)
app.delete('/fabricante/:id', fabricanteController.apagar)
app.put('/fabricante/:id', fabricanteController.atualizar)

app.post('/entrega', entregaController.cadastrar)
app.get('/entrega', entregaController.listar)

app.post('/produto', produtoController.cadastrar)
app.get('/produto', produtoController.listar)


app.get('/', (req,res)=>{
    res.status(200).json({message: "Aplicação rodando!"})
})

// -------------------------------------------
conn.sync()
.then(()=>{
    app.listen(PORT, hostname, ()=>{
        console.log(`Servidor rodando em http://${hostname}:${PORT}`)
    })
})
.catch((err)=>{
    console.error('Não foi possível conectar com o banco de dados!',err)
})

