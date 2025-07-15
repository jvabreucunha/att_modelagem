const API = 'http://localhost:3000';

// Elementos DOM
const metodoSelect = document.getElementById('metodoBusca');
const inputBusca   = document.getElementById('inputBuscaUsuario');
const btnBuscar    = document.getElementById('btnBuscarUsuario');
const tbody        = document.querySelector('#tableUsuarios tbody');

// Função para popular a tabela com um array de usuários
function popularTabela(usuarios) {
  tbody.innerHTML = '';
  if (!usuarios || usuarios.length === 0) {
    tbody.innerHTML = '<tr><td colspan="11">Nenhum usuário encontrado.</td></tr>';
    return;
  }
  usuarios.forEach(u => {
    const dataNascto = new Date(u.dataNascimento).toLocaleDateString('pt-BR');
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${u.idUsuario}</td>
      <td>${u.primeiroNome}</td>
      <td>${u.sobrenome}</td>
      <td>${u.idade}</td>
      <td>${u.email}</td>
      <td>${u.telefone}</td>
      <td>${u.endereco}</td>
      <td>${u.cidade}</td>
      <td>${u.estado}</td>
      <td>${dataNascto}</td>
      <td>
        <button class="edit" data-id="${u.idUsuario}">✏️</button>
        <button class="del"  data-id="${u.idUsuario}">🗑️</button>
      </td>`;
    tbody.appendChild(tr);
  });
}

// Busca todos os usuários
async function fetchAllUsuarios() {
  const res = await fetch(`${API}/usuarios`);
  if (!res.ok) throw new Error(`Erro ${res.status}`);
  return res.json();
}

// Handler do clique em "Buscar"
export function filtroUsuarios() {
  btnBuscar.addEventListener('click', async () => {
    const valor = inputBusca.value.trim();
    const metodo = metodoSelect.value;

    try {
      let usuarios = [];

      if (!valor) {
        // input vazio → mostra todos
        usuarios = await fetchAllUsuarios();
      } else if (metodo === 'id') {
        // busca por ID exato
        const res = await fetch(`${API}/usuarios/${encodeURIComponent(valor)}`);
        if (res.status === 404) {
          usuarios = [];
        } else if (!res.ok) {
          throw new Error(`Erro ${res.status}`);
        } else {
          usuarios = [await res.json()];
        }
      } else {
        // busca por nome (case‑insensitive, parcial)
        const todos = await fetchAllUsuarios();
        const busca = valor.toLowerCase();
        usuarios = todos.filter(u =>
          u.primeiroNome.toLowerCase().includes(busca) ||
          u.sobrenome.toLowerCase().includes(busca)
        );
      }

      popularTabela(usuarios);
    } catch (err) {
      console.error('Erro na busca:', err);
      tbody.innerHTML = '<tr><td colspan="11">Erro ao buscar usuários.</td></tr>';
    }
  });
}

export default function LigaFiltros() {
  filtroUsuarios();
}
