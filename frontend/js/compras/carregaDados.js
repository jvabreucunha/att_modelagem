const API = 'http://localhost:3000';

function carregarCompras() {
  fetch(`${API}/compras`)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then(compras => {
      const tbody = document.querySelector('#tableCompras tbody');
      tbody.innerHTML = '';

      compras.forEach(c => {
        const dataFmt = new Date(c.dataCompra)
          .toLocaleString('pt-BR');

        const precoUnit = Number(c.precoUnitario)
          .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        const desconto   = `${Number(c.descontoAplicado).toFixed(2)}%`;
        const precoFinal = Number(c.precoFinal)
          .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${c.idCompra}</td>
          <td>${c.idUsuario}</td>
          <td>${c.idProduto}</td>
          <td>${c.quantidade}</td>
          <td>${dataFmt}</td>
          <td>${precoUnit}</td>
          <td>${desconto}</td>
          <td>${precoFinal}</td>
          <td>${c.formaPagamento}</td>
          <td>${c.statusCompra}</td>
          <td>
            <button class="edit" data-id="${c.idCompra}">✏️</button>
            <button class="del" data-id="${c.idCompra}">🗑️</button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    })
    .catch(err => {
      console.error('Erro ao carregar compras:', err);
    });
}

export { carregarCompras };
