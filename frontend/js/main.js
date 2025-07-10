document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('main section');
  document.querySelectorAll('header nav button').forEach(btn => {
    btn.addEventListener('click', () => {
      sections.forEach(s => s.classList.add('hidden'));
      document.getElementById(btn.dataset.section).classList.remove('hidden');
    });
  });

  // CRUD Produtos
  const tblProd = document.querySelector('#tableProdutos tbody');
  function fetchProdutos() {
    fetch('/produtos').then(r => r.json()).then(popularTabela);
  }
  function popularTabela(prods) {
    tblProd.innerHTML = '';
    prods.forEach(p => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${p.idProduto}</td>
        <td>${p.titulo}</td><td>${p.categoria}</td><td>${p.preco}</td><td>${p.estoque}</td>
        <td>
          <button data-id="${p.idProduto}" class="edit">✏️</button>
          <button data-id="${p.idProduto}" class="del">🗑️</button>
        </td>`;
      tblProd.appendChild(tr);
    });
  }
  tblProd.addEventListener('click', ev => {
    const id = ev.target.dataset.id;
    if (ev.target.classList.contains('edit')) {
      const tr = ev.target.closest('tr');
      document.getElementById('prodTitulo').value = tr.children[1].textContent;
      document.getElementById('prodCategoria').value = tr.children[2].textContent;
      document.getElementById('prodPreco').value = tr.children[3].textContent;
      document.getElementById('prodEstoque').value = tr.children[4].textContent;
      document.getElementById('btnAddProduto').textContent = 'Atualizar';
      document.getElementById('btnAddProduto').dataset.id = id;
    } else if (ev.target.classList.contains('del')) {
      fetch(`/produtos/${id}`, { method: 'DELETE' })
        .then(() => fetchProdutos());
    }
  });
  document.getElementById('btnAddProduto').addEventListener('click', () => {
    const id = document.getElementById('btnAddProduto').dataset.id;
    const payload = {
      titulo: document.getElementById('prodTitulo').value,
      categoria: document.getElementById('prodCategoria').value,
      preco: parseFloat(document.getElementById('prodPreco').value),
      estoque: parseInt(document.getElementById('prodEstoque').value),
    };
    const method = id ? 'PUT' : 'POST';
    const url = id ? `/produtos/${id}` : '/produtos';
    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).then(() => {
      fetchProdutos();
      document.getElementById('btnAddProduto').textContent = 'Adicionar';
      document.getElementById('btnAddProduto').dataset.id = '';
    });
  });
  fetchProdutos();

  // Chart.js Produtos x Estoque
  let chartProdutos;
  document.getElementById('btnUpdateCharts').addEventListener('click', () => {
    const start = parseInt(document.getElementById('filterStart').value);
    const end = parseInt(document.getElementById('filterEnd').value);
    fetch(`/produtos?_start=${start - 1}&_end=${end}`)
      .then(r => r.json())
      .then(data => {
        const labels = data.map(p => p.titulo);
        const quant = data.map(p => p.estoque);
        if (chartProdutos) chartProdutos.destroy();
        chartProdutos = new Chart(document.getElementById('chartProdutos'), {
          type: 'bar',
          data: { labels, datasets: [{ label: 'Estoque', data: quant, backgroundColor: '#4f6d8f' }] }
        });
      });
  });
});
  