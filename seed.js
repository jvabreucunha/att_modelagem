require('dotenv').config()
const fetch = require('node-fetch')
const db = require('./db/conn')
const { Usuario, Produto } = require('./model/rel')

async function popularUsuarios() {
  const response = await fetch('https://dummyjson.com/users')
  const data = await response.json()

  for (const user of data.users) {
    await Usuario.create({
      primeiroNome: user.firstName,
      sobrenome: user.lastName,
      idade: user.age,
      email: user.email,
      telefone: user.phone,
      endereco: user.address.address,
      cidade: user.address.city,
      estado: user.address.state,
      dataNascimento: new Date(user.birthDate)
    })
  }

  console.log('Usuários populados com sucesso!')
}

async function popularProdutos() {
  const response = await fetch('https://dummyjson.com/products')
  const data = await response.json()

  for (const product of data.products) {
    await Produto.create({
      titulo: product.title,
      descricao: product.description,
      categoria: product.category,
      preco: product.price,
      percentualDesconto: product.discountPercentage,
      estoque: product.stock,
      marca: product.brand ?? null,
      imagemThumbnail: product.thumbnail ?? null
    })
  }

  console.log('Produtos populados com sucesso!')
}

async function popularCompras() {
  // Obtém todos usuários e produtos já criados
  const usuarios = await Usuario.findAll()
  const produtos = await Produto.findAll()

  for (let i = 0; i < 20; i++) {
    const usuario = usuarios[Math.floor(Math.random() * usuarios.length)]
    const produto = produtos[Math.floor(Math.random() * produtos.length)]
    const quantidade = Math.floor(Math.random() * 5) + 1
    const descontoAplicado = Math.random() < 0.3 ? Math.floor(Math.random() * 31) : 0 // até 30% de desconto
    const precoUnitario = produto.preco
    const precoFinal = parseFloat((precoUnitario * quantidade * (1 - descontoAplicado / 100)).toFixed(2))
    const formas = ['boleto', 'cartao', 'pix']
    const statusLista = ['pendente', 'pago', 'cancelado']

    await Compra.create({
      idUsuario:       usuario.idUsuario,
      idProduto:       produto.idProduto,
      quantidade,
      dataCompra:      new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000), // compras últimos 30 dias
      precoUnitario,
      descontoAplicado,
      precoFinal,
      formaPagamento:  formas[Math.floor(Math.random() * formas.length)],
      statusCompra:    statusLista[Math.floor(Math.random() * statusLista.length)]
    })
  }

  console.log('Compras populadas com sucesso!')
}

async function seed() {
  try {
    await db.sync({ force: true }) // recria todas as tabelas
    await popularUsuarios()
    await popularProdutos()
    await popularCompras()
  } catch (err) {
    console.error('Erro ao popular o banco:', err)
  } finally {
    await db.close()
    console.log('Conexão com banco encerrada.')
  }
}

seed()