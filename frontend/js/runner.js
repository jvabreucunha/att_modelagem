import { carregarUsuarios } from './user/carregaDados.js';
import { carregarProdutos } from './produtos/carregaDados.js';
import { carregarCompras } from './compras/carregaDados.js';
import modalUsuarios from './user/cadastros.js'
import modalProdutos from './produtos/cadastros.js'
import modalCompras from './compras/cadastros.js'
import filtroUsuarios from './user/filtro.js';
import filtroProdutos from './produtos/filtro.js';
import filtroCompras from './compras/filtro.js';

export function LigaModais() {
    modalUsuarios()
    modalProdutos()
    modalCompras()
}

export function LigaFiltros() {
    filtroUsuarios()
    filtroProdutos()
    filtroCompras()
}

export { carregarUsuarios, carregarProdutos, carregarCompras }