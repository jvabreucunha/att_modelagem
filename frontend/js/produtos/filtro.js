const API = 'http://localhost:3000';

// Elementos DOM
const metodoSelect   = document.getElementById('metodoBuscaProduto');
const inputBusca     = document.getElementById('inputBuscaProduto');
const btnBuscar      = document.getElementById('btnBuscarProduto');
const tbody          = document.querySelector('#tableProdutos tbody');

/**
 * Popula a tabela de produtos com um array de produtos.
 */
function popularTabela(produtos) {
  tbody.innerHTML = '';
  if (!produtos || produtos.length === 0) {
    tbody.innerHTML = '<tr><td colspan="9">Nenhum produto encontrado.</td></tr>';
    return;
  }

  produtos.forEach(p => {
    const precoFmt = Number(p.preco)
      .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const descontoFmt = `${Number(p.percentualDesconto).toFixed(2)}%`;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${p.idProduto}</td>
      <td>${p.titulo}</td>
      <td>${p.descricao}</td>
      <td>${p.categoria}</td>
      <td>${precoFmt}</td>
      <td>${descontoFmt}</td>
      <td>${p.estoque}</td>
      <td>${p.marca || '-'}</td>
      <td>
        <button class="edit" data-id="${p.idProduto}">✏️</button>
        <button class="del"  data-id="${p.idProduto}">🗑️</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

async function fetchAllProdutos() {
  const res = await fetch(`${API}/produtos`);
  if (!res.ok) throw new Error(`Erro ${res.status}`);
  return res.json();
}

export default function filtroProdutos() {
  btnBuscar.addEventListener('click', async () => {
    const valor = inputBusca.value.trim();
    const metodo = metodoSelect.value;

    try {
      let produtos = [];

      if (!valor) {
        // input vazio → mostra todos
        produtos = await fetchAllProdutos();
      } else if (metodo === 'idProduto') {
        // busca por ID exato
        const res = await fetch(`${API}/produtos/${encodeURIComponent(valor)}`);
        if (res.status === 404) {
          produtos = [];
        } else if (!res.ok) {
          throw new Error(`Erro ${res.status}`);
        } else {
          produtos = [await res.json()];
        }
      } else {
        // busca por título (case‑insensitive, parcial)
        const todos = await fetchAllProdutos();
        const busca = valor.toLowerCase();
        produtos = todos.filter(p =>
          p.titulo.toLowerCase().includes(busca)
        );
      }

      popularTabela(produtos);
    } catch (err) {
      console.error('Erro na busca de produtos:', err);
      tbody.innerHTML = '<tr><td colspan="9">Erro ao buscar produtos.</td></tr>';
    }
  });
}


