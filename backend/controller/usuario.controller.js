const { Op } = require('sequelize');
const Usuario = require('../model/Usuario');

// CREATE
const cadastrarUsuario = async (req, res) => {
  try {
    const novoUsuario = await Usuario.create(req.body);
    return res.status(201).json(novoUsuario);
  } catch (err) {
    console.error('Erro ao cadastrar usuário:', err);
    return res.status(500).json({ message: 'Erro ao cadastrar usuário.' });
  }
};

// READ ALL
const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    return res.status(200).json(usuarios);
  } catch (err) {
    console.error('Erro ao listar usuários:', err);
    return res.status(500).json({ message: 'Erro ao listar usuários.' });
  }
};

// READ ONE
const buscarUsuarioPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    return res.status(200).json(usuario);
  } catch (err) {
    console.error(`Erro ao buscar usuário ${id}:`, err);
    return res.status(500).json({ message: 'Erro ao buscar usuário.' });
  }
};

const buscarUsuarioPorNome = async (req, res) => {
  const { nome } = req.query;

  try {
    if (!nome) {
      return res.status(400).json({ message: 'Informe um nome para busca.' });
    }

    const usuarios = await Usuario.findAll({
      where: {
        primeiroNome: {
          [Op.like]: `%${nome}%`
        }
      }
    });

    if (usuarios.length === 0) {
      return res.status(404).json({ message: 'Nenhum usuário encontrado com esse nome.' });
    }

    return res.status(200).json(usuarios);
  } catch (err) {
    console.error('Erro ao buscar usuário por nome:', err);
    return res.status(500).json({ message: 'Erro ao buscar usuário por nome.' });
  }
};

// UPDATE
const atualizarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const [atualizados] = await Usuario.update(req.body, { where: { idUsuario: id } });
    if (atualizados === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    const usuarioAtualizado = await Usuario.findByPk(id);
    return res.status(200).json(usuarioAtualizado);
  } catch (err) {
    console.error(`Erro ao atualizar usuário ${id}:`, err);
    return res.status(500).json({ message: 'Erro ao atualizar usuário.' });
  }
};

// DELETE
const apagarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const excluidos = await Usuario.destroy({ where: { idUsuario: id } });
    if (excluidos === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    return res.status(204).send();
  } catch (err) {
    console.error(`Erro ao apagar usuário ${id}:`, err);
    return res.status(500).json({ message: 'Erro ao apagar usuário.' });
  }
};

module.exports = {
  cadastrarUsuario,
  listarUsuarios,
  buscarUsuarioPorId,
  buscarUsuarioPorNome,
  atualizarUsuario,
  apagarUsuario
};
