const API = 'http://localhost:3000';

// Elementos DOM
const metodoSelect = document.getElementById('metodoBusca');
const inputBusca = document.getElementById('inputBuscaUsuario');
const btnBuscar = document.getElementById('btnBuscarUsuario');
const tbody = document.querySelector('#tableUsuarios tbody');

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

export function filtroUsuarios() {
    btnBuscar.addEventListener('click', async () => {
        const valor = inputBusca.value.trim();
        const metodo = metodoSelect.value;

        if (!valor) {
            alert('Por favor, digite um valor para buscar.');
            return;
        }

        let url;
        if (metodo === 'id') {
            // busca por ID exato
            url = `${API}/usuarios/${encodeURIComponent(valor)}`;
        } else {
            // busca parcial por nome
            url = `${API}/usuarios/buscar?nome=${encodeURIComponent(valor)}`;
        }

        try {
            const res = await fetch(url);
            if (!res.ok) {
                if (res.status === 404) {
                    // nenhum encontrado
                    popularTabela([]);
                    return;
                }
                throw new Error(`Erro ${res.status}`);
            }
            const data = await res.json();
            // se vier um único objeto, transforma em array para a tabela
            const lista = Array.isArray(data) ? data : [data];
            popularTabela(lista);
        } catch (err) {
            console.error('Erro na busca:', err);
            tbody.innerHTML = '<tr><td colspan="11">Erro ao buscar usuários.</td></tr>';
        }
    });
}


export default function LigaFiltros() {
    filtroUsuarios()
}