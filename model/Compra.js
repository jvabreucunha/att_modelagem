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
            model: 'produtos',  
            key: 'id'
        }
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    data_compra: {
        type: DataTypes.DATE,
        allowNull: false
    },
    preco_uni: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    desconto: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    preco_final: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    forma_pagamento: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    status: {
        type: DataTypes.STRING(30),
        allowNull: false
    },

},{
    tableName: 'compras',
    timestamps: false
})

module.exports = Compra