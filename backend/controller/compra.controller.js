const { Op } = require('sequelize');
const Compra = require('../model/Compra');
const Produto = require('../model/Produto');

const cadastrarCompra = async (req, res) => {
  const {
    idUsuario,
    idProduto,
    quantidade,
    dataCompra,
    precoUnitario,
    descontoAplicado,
    precoFinal,
    formaPagamento,
    statusCompra
  } = req.body;

  try {
    const produto = await Produto.findByPk(idProduto);
    if (!produto) return res.status(404).json({ message: 'Produto não encontrado.' });

    // Verifica estoque
    if (produto.estoque < quantidade) {
      return res.status(400).json({ message: 'Estoque insuficiente.' });
    }

    // Atualiza estoque
    produto.estoque -= quantidade;
    await produto.save();

    // Cadastra a compra
    const novaCompra = await Compra.create({
      idUsuario,
      idProduto,
      quantidade,
      dataCompra,
      precoUnitario,
      descontoAplicado,
      precoFinal,
      formaPagamento,
      statusCompra
    });

    res.status(201).json(novaCompra);
  } catch (err) {
    console.error('Erro ao cadastrar a compra:', err);
    res.status(500).json({ message: 'Erro ao cadastrar a compra!' });
  }
};

const listarCompras = async (req, res) => {
  try {
    const dados = await Compra.findAll();
    res.status(200).json(dados);
  } catch (err) {
    console.error('Erro ao listar as compras:', err);
    res.status(500).json({ message: 'Erro ao listar as compras!' });
  }
};

const buscarCompraPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const compra = await Compra.findByPk(id);
    if (!compra) return res.status(404).json({ message: 'Compra não encontrada.' });
    res.status(200).json(compra);
  } catch (err) {
    console.error('Erro ao buscar compra:', err);
    res.status(500).json({ message: 'Erro ao buscar compra!' });
  }
};

const atualizarCompra = async (req, res) => {
  const { id } = req.params;
  const novosDados = req.body;
  try {
    const compra = await Compra.findByPk(id);
    if (!compra) return res.status(404).json({ message: 'Compra não encontrada.' });

    await compra.update(novosDados);
    res.status(200).json(compra);
  } catch (err) {
    console.error('Erro ao atualizar compra:', err);
    res.status(500).json({ message: 'Erro ao atualizar compra!' });
  }
};

const apagarCompra = async (req, res) => {
  const { id } = req.params;
  try {
    const compra = await Compra.findByPk(id);
    if (!compra) return res.status(404).json({ message: 'Compra não encontrada.' });

    await compra.destroy();
    res.status(204).send();
  } catch (err) {
    console.error('Erro ao apagar compra:', err);
    res.status(500).json({ message: 'Erro ao apagar compra!' });
  }
};

module.exports = {
  cadastrarCompra,
  listarCompras,
  buscarCompraPorId,
  atualizarCompra,
  apagarCompra
};