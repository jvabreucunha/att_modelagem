const Compra = require('./Compra')
const Produto = require('./Produto')
const Usuario = require('./Usuario')

Usuario.hasMany(Compra, {
    foreignKey: 'idUsuario',
    as: 'usuarioCom',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
Compra.belongsTo(Usuario, {
    foreignKey: 'idUsuario',
    as: 'compraUser',
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

Produto.hasMany(Compra, {
    foreignKey: 'idProduto',
    as: 'produtoEmCompras',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
});

Compra.belongsTo(Produto, {
    foreignKey: 'idProduto',
    as: 'compraProd',
    allowNull: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
});

module.exports = { Usuario, Compra, Produto }