import { carregarUsuarios } from './carregaDados.js'
import LigaModais from './cadastros.js'
import LigaFiltros from './filtros.js'

document.addEventListener('DOMContentLoaded', () => {
  LigaModais()
  LigaFiltros()
  const sections = document.querySelectorAll('main section');
  document.querySelectorAll('header nav button').forEach(btn => {
    btn.addEventListener('click', () => {
      sections.forEach(s => s.classList.add('hidden'));
      const targetId = btn.dataset.section;
      const targetSection = document.getElementById(targetId);
      targetSection.classList.remove('hidden');

      if (targetId === 'usuarios') {
        carregarUsuarios();
      } else if (targetId === 'produtos') {
        carregarProdutos();
      } else if (targetId === 'compras') {
        carregarCompras();
      }
    });
  });
});
  