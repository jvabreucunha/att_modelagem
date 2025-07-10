const conn = require('./db/conn')
const { Compra, Produto, Usuario } = require('./model/rel')

async function syncDataBase() {
    try {
        await conn.sync({force: true})
        console.log('Tabelas criadas e Banco de dados sincronizado!')
    } catch (err) {
        console.error('Erro ao sincronuzar tabelas', err)
    } finally {
        await conn.close()
        console.log('Banco de dados fechado!')
    }
}

syncDataBase()
