const API = 'http://localhost:3000';

function carregarProdutos() {
  fetch(`${API}/produtos`)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then(produtos => {
      const tbody = document.querySelector('#tableProdutos tbody');
      tbody.innerHTML = '';

      produtos.forEach(p => {
        // Formata preço em R$ e percentual de desconto
        const precoFormatado = Number(p.preco)
          .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        const descontoFormatado = `${Number(p.percentualDesconto).toFixed(2)}%`;

        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${p.idProduto}</td>
          <td>${p.titulo}</td>
          <td>${p.descricao}</td>
          <td>${p.categoria}</td>
          <td>${precoFormatado}</td>
          <td>${descontoFormatado}</td>
          <td>${p.estoque}</td>
          <td>${p.marca || '-'}</td>
          <td>
            <button class="edit" data-id="${p.idProduto}">✏️</button>
            <button class="del" data-id="${p.idProduto}">🗑️</button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    })
    .catch(err => {
      console.error('Erro ao carregar produtos:', err);
    });
}

export { carregarProdutos };
