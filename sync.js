const conn = require('./db/conn')
const { Fabricante, Produto, Entrega } = require('./model/rel')

async function syncDataBase() {
    try{
        await conn.sync({force: true})
        console.log('Tabelas criadas e Banco de dados sincronizado!')
    }catch(err){
        console.error('Não foi possível criar as tabelas e sincronizar o BD!',err)
    }finally{
        await conn.close()
        console.log('Banco de dados fechado!')
    }
}

syncDataBase()
