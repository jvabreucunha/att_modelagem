const { Op } = require('sequelize');
const Produto = require('../model/Produto');

// CREATE
const cadastrarProduto = async (req, res) => {
  try {
    const novoProduto = await Produto.create(req.body, {
      fields: [
        'titulo',
        'descricao',
        'categoria',
        'preco',
        'percentualDesconto',
        'estoque',
        'marca'
      ]
    });
    
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

const buscarProdutoPorNome = async (req, res) => {
  const { nome } = req.query;

  try {
    if (!nome) {
      return res.status(400).json({ message: 'Informe um nome para busca.' });
    }

    const produtos = await Produto.findAll({
      where: {
        titulo: {
          [Op.like]: `%${nome}%`
        }
      }
    });

    if (produtos.length === 0) {
      return res.status(404).json({ message: 'Nenhum produto encontrado com esse nome.' });
    }

    return res.status(200).json(produtos);
  } catch (err) {
    console.error('Erro ao buscar produto por nome:', err);
    return res.status(500).json({ message: 'Erro ao buscar produto por nome.' });
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
  buscarProdutoPorNome,
  atualizarProduto,
  apagarProduto
};
