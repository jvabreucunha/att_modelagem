const Produto = require('../model/Produto')

const cadastrar = async (req,res)=>{
    const valores = req.body
    try{
        const dados = await Produto.create(valores)
        res.status(200).json(dados)
    }catch(err){
        console.error('Erro ao cadastrar os dados!',err)
        res.status(500).json({message: 'Erro ao cadastrar os dados!'})
    }
}

const listar = async (req,res)=>{
    try{
        const dados = await Produto.findAll()
        res.status(200).json(dados)
    }catch(err){
        console.error('Erro ao listar os dados!',err)
        res.status(500).json({message: 'Erro ao listar os dados!'})
    }
}


// const apagar = async (req,res)=>{

// }


// const atualizar = async (req,res)=>{

// }

module.exports = { cadastrar, listar }
