const Compra = require('./Compra')
const Produto = require('./Produto')
const Usuario = require('./Usuario')

Usuario.hasMany(Compra, {
    foreignKey: 'idUsuario',
    as: 'usuarioCom',
    onDelete: 'CASCADE',
})

Compra.hasMany(Produto, {
    foreignKey: 'idProduto',
    as: 'compraProd',
    onDelete: 'CASCADE',
})

Compra.belongsTo(Usuario, {
    foreignKey: 'idUsuario',
    as: 'compraUser',
    allowNull: false
})

Produto.belongsTo(Compra, {
    foreignKey: 'idProduto',
    as: 'produtoCom',
    allowNull: false
})

module.exports = { Usuario, Compra, Produto}
