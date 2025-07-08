// controllers/produto.controller.js
const Produto = require('../model/Produto');

// CREATE
const cadastrarProduto = async (req, res) => {
  try {
    const novoProduto = await Produto.create(req.body);
    return res.status(201).json(novoProduto);
  } catch (err) {
    console.error('Erro ao cadastrar produto:', err);
    return res.status(500).json({ message: 'Erro ao cadastrar produto.' });
  }
};

// READ ALL
const listarProdutos = async (req, res) => {
  try {
    const produtos = await Produto.findAll();
    return res.status(200).json(produtos);
  } catch (err) {
    console.error('Erro ao listar produtos:', err);
    return res.status(500).json({ message: 'Erro ao listar produtos.' });
  }
};

// READ ONE
const buscarProdutoPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const produto = await Produto.findByPk(id);
    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrado.' });
    }
    return res.status(200).json(produto);
  } catch (err) {
    console.error(`Erro ao buscar produto ${id}:`, err);
    return res.status(500).json({ message: 'Erro ao buscar produto.' });
  }
};

// UPDATE
const atualizarProduto = async (req, res) => {
  const { id } = req.params;
  try {
    const [atualizados] = await Produto.update(req.body, { where: { idProduto: id } });
    if (atualizados === 0) {
      return res.status(404).json({ message: 'Produto não encontrado.' });
    }
    const produtoAtualizado = await Produto.findByPk(id);
    return res.status(200).json(produtoAtualizado);
  } catch (err) {
    console.error(`Erro ao atualizar produto ${id}:`, err);
    return res.status(500).json({ message: 'Erro ao atualizar produto.' });
  }
};

// DELETE
const apagarProduto = async (req, res) => {
  const { id } = req.params;
  try {
    const excluidos = await Produto.destroy({ where: { idProduto: id } });
    if (excluidos === 0) {
      return res.status(404).json({ message: 'Produto não encontrado.' });
    }
    return res.status(204).send();
  } catch (err) {
    console.error(`Erro ao apagar produto ${id}:`, err);
    return res.status(500).json({ message: 'Erro ao apagar produto.' });
  }
};

module.exports = {
  cadastrarProduto,
  listarProdutos,
  buscarProdutoPorId,
  atualizarProduto,
  apagarProduto
};
