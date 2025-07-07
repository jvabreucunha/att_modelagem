const Compra = require('./Compra')
const Produto = require('./Produto')
const Usuario = require('./Usuario')

Usuario.hasMany(Compra, {
    foreignKey: 'id_usuario',
    as: 'usuarioCom',
    onDelete: 'CASCADE'
})

Compra.hasMany(Produto, {
    foreignKey: 'id_produto',
    as: 'compraProd',
    onDelete: 'CASCADE'
})

Compra.belongsTo(Usuario, {
    foreignKey: 'id_usuario',
    as: 'compraUser',
    allowNull: false
})

Produto.belongsTo(Compra, {
    foreignKey: 'id_produto',
    as: 'produtoCom',
    allowNull: false
})

module.exports = { Usuario, Compra, Produto}
