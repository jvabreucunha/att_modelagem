require('dotenv').config()
const fetch = require('node-fetch')
const db = require('./db/conn')
const { Usuario, Produto } = require('./model/rel')

async function popularUsuarios() {
  const response = await fetch('https://dummyjson.com/users')
  const data = await response.json()

  for (const user of data.users) {
    await Usuario.create({
      firstName: user.firstName,
      lastName: user.lastName,
      age: user.age,
      email: user.email,
      phone: user.phone,
      address: user.address.address,
      city: user.address.city,
      state: user.address.state,
      birthDate: new Date(user.birthDate)
    })
  }

  console.log('Usuários populados com sucesso!')
}

async function popularProdutos() {
  const response = await fetch('https://dummyjson.com/products')
  const data = await response.json()

  for (const product of data.products) {
    await Produto.create({
      title: product.title,
      description: product.description,
      category: product.category,
      price: product.price,
      discountPercentage: product.discountPercentage,
      stock: product.stock,
      brand: product.brand,
      thumbnail: product.thumbnail
    })
  }

  console.log('Produtos populados com sucesso!')
}

async function seed() {
  try {
    await db.sync({ force: true }) // zera e recria o banco
    await popularUsuarios()
    await popularProdutos()
  } catch (err) {
    console.error('Erro ao popular o banco:', err)
  } finally {
    await db.close()
    console.log('Conexão com banco encerrada.')
  }
}

seed()
