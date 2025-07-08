const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Usuario = db.define('Usuario', {
    idUsuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    primeiroNome: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    sobrenome: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    idade: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    telefone: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    endereco: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    cidade: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    estado: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    dataNascimento: {
        type: DataTypes.DATE,
        allowNull: false,
    }
}, {
    tableName: 'usuarios',
    timestamps: false
})

module.exports = Usuario
