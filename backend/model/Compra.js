const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Compra = db.define('Compra', {
    idCompra: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuarios',  
            key: 'idUsuario'
        }
    },
    idProduto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'produtos',  
            key: 'idProduto'
        }
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    dataCompra: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    precoUnitario: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
    },
    descontoAplicado: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    precoFinal: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
    },
    formaPagamento: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    statusCompra: {
        type: DataTypes.STRING(255),
        allowNull: false,
    }
}, {
    tableName: 'compras',
    timestamps: false
})

module.exports = Compra
