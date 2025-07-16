const API = 'http://localhost:3000';

const metodoSelect = document.getElementById('metodoBuscaCompra');
const inputBusca = document.getElementById('inputBuscaCompra');
const btnBuscar = document.getElementById('btnBuscarCompra');
const tbody = document.querySelector('#tableCompras tbody');

function popularTabela(compras) {
  tbody.innerHTML = '';
  if (!compras || compras.length === 0) {
    tbody.innerHTML = '<tr><td colspan="11">Nenhuma compra encontrada.</td></tr>';
    return;
  }

  compras.forEach(c => {
    const dataFmt = new Date(c.dataCompra)
      .toLocaleString('pt-BR');
    const precoUnit = Number(c.precoUnitario)
      .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const desconto = `${Number(c.descontoAplicado).toFixed(2)}%`;
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
        <button class="del"  data-id="${c.idCompra}">🗑️</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}


async function fetchAllCompras() {
  const res = await fetch(`${API}/compras`);
  if (!res.ok) throw new Error(`Erro ${res.status}`);
  return res.json();
}


export default function filtroCompras() {
  btnBuscar.addEventListener('click', async () => {
    const valor = inputBusca.value.trim();
    const metodo = metodoSelect.value;

    try {
      let compras = [];

      if (!valor) {
        // input vazio → mostra todas
        compras = await fetchAllCompras();
      } else if (metodo === 'idCompra') {
        // busca por ID exato
        const res = await fetch(`${API}/compras/${encodeURIComponent(valor)}`);
        if (res.status === 404) {
          compras = [];
        } else if (!res.ok) {
          throw new Error(`Erro ${res.status}`);
        } else {
          compras = [await res.json()];
        }
      } else {
        // filtro em memória
        const todas = await fetchAllCompras();
        const busca = valor.toLowerCase();
        if (metodo === 'idUsuario') {
          compras = todas.filter(c => String(c.idUsuario) === busca);
        } else if (metodo === 'idProduto') {
          compras = todas.filter(c => String(c.idProduto) === busca);
        } else if (metodo === 'statusCompra') {
          compras = todas.filter(c =>
            c.statusCompra.toLowerCase().includes(busca)
          );
        }
      }

      popularTabela(compras);
    } catch (err) {
      console.error('Erro na busca de compras:', err);
      tbody.innerHTML = '<tr><td colspan="11">Erro ao buscar compras.</td></tr>';
    }
  });
}

