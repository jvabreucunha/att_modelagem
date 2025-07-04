const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Compra = db.define('compra', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        references: {
            model: 'usuario',  
            key: 'id'
        }
    },
    id_produto: {
        type: DataTypes.INTEGER,
        references: {
            model: 'usuario',  
            key: 'id'
        }
    },
    local: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    responsavel: {
        type: DataTypes.STRING(30),
        allowNull: false
    }
},{
    tableName: 'compras',
    timestamps: false
})

module.exports = Compra