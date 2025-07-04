const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('db_cadastro','root','senai',{
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
})

sequelize.authenticate()
.then(()=>{
    console.log('Conexão realizada com sucesso!')
})
.catch((err)=>{
    console.error('Não foi possível conectar com o banco de dados!',err)
})

module.exports = sequelize