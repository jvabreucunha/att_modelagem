import { carregarUsuarios } from './user/carregaDados.js';
import { carregarProdutos } from './produtos/carregaDados.js';
import modalUsuarios from './user/cadastros.js'
import modalProdutos from './produtos/cadastros.js'

export function LigaModais() {
    modalUsuarios()
    modalProdutos()
}

export { carregarUsuarios, carregarProdutos }