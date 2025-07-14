import { carregarUsuarios } from './user/carregaDados.js';
import LigaModais from './user/cadastros.js';
import LigaFiltros from './user/filtro.js';

document.addEventListener('DOMContentLoaded', () => {
  LigaModais();
  LigaFiltros();

  const sections = document.querySelectorAll('main section');
  const navButtons = document.querySelectorAll('header nav button');

  function showSection(id) {
    sections.forEach(s => s.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
  }

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.section;
      showSection(targetId);

      if (targetId === 'usuarios') {
        carregarUsuarios();
      } else if (targetId === 'produtos') {
        carregarProdutos();
      } else if (targetId === 'compras') {
        carregarCompras();
      }
    });
  });

  showSection('usuarios');
  carregarUsuarios();
});
