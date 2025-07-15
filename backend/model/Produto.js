const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Produto = db.define('Produto', {
    idProduto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true
    },
    titulo: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    categoria: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    preco: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
    },
    percentualDesconto: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    estoque: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    marca: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    imagemThumbnail: {
        type: DataTypes.STRING(255),
        allowNull: true,
    }
}, {
    tableName: 'produtos',
    timestamps: false
})

module.exports = Produto
