// routes.js
const { Router } = require('express');
const router = Router();

// Import dos controllers
const usuarioController  = require('./controller/usuario.controller');
const produtoController  = require('./controller/produto.controller');
const compraController   = require('./controller/compra.controller');

// Rotas de Usuários
router.post('/usuarios', usuarioController.cadastrarUsuario);
router.get('/usuarios', usuarioController.listarUsuarios);
router.get('/usuarios/:id', usuarioController.buscarUsuarioPorId);
router.put('/usuarios/:id', usuarioController.atualizarUsuario);
router.delete('/usuarios/:id', usuarioController.apagarUsuario);

// Rotas de Produtos
router.post('/produtos', produtoController.cadastrarProduto);
router.get('/produtos', produtoController.listarProdutos);
router.get('/produtos/:id', produtoController.buscarProdutoPorId);
router.put('/produtos/:id', produtoController.atualizarProduto);
router.delete('/produtos/:id', produtoController.apagarProduto);

// Rotas de Compras
router.post('/compras', compraController.cadastrarCompra);
router.get('/compras', compraController.listarCompras);
router.get('/compras/:id', compraController.buscarCompraPorId);
router.put('/compras/:id', compraController.atualizarCompra);
router.delete('/compras/:id', compraController.apagarCompra);

module.exports = router;
