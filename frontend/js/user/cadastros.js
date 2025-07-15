import { carregarUsuarios } from './carregaDados.js';

const btnCadastrar = document.getElementById('btnCadastrarUsuario');
const modal = document.getElementById('modalCadastro');
const btnClose = document.getElementById('modalClose');
const formCadastro = document.getElementById('formCadastroUsuario');    
const formError = document.getElementById('formError');
const tbody = document.querySelector('#tableUsuarios tbody'); // ADICIONADO

const API = 'http://localhost:3000';

function limparErro() {
    formError.textContent = '';
    formError.classList.add('hidden');
}
  
function mostrarErro(msg) {
    formError.textContent = msg;
    formError.classList.remove('hidden');
}

function abrirModalParaEditar(id) {
  limparErro();
  fetch(`${API}/usuarios/${id}`)
    .then(res => {
      if (!res.ok) throw new Error(`Erro ao buscar usuário: ${res.status}`);
      return res.json();
    })
    .then(usuario => {
      formCadastro.elements.idUsuario.value = usuario.idUsuario;
      formCadastro.elements.primeiroNome.value = usuario.primeiroNome;
      formCadastro.elements.sobrenome.value = usuario.sobrenome;
      formCadastro.elements.idade.value = usuario.idade;
      formCadastro.elements.email.value = usuario.email;
      formCadastro.elements.telefone.value = usuario.telefone;
      formCadastro.elements.endereco.value = usuario.endereco;
      formCadastro.elements.cidade.value = usuario.cidade;
      formCadastro.elements.estado.value = usuario.estado;
      formCadastro.elements.dataNascimento.value = usuario.dataNascimento.split('T')[0];

      formCadastro.dataset.editId = id;
      modal.classList.remove('hidden');
    })
    .catch(err => {
      alert('Erro ao carregar dados do usuário.');
      console.error(err);
    });
}

export default function modalUsuarios() {
    btnCadastrar.addEventListener('click', () => {
        formCadastro.reset();
        delete formCadastro.dataset.editId; // importante para criar novo
        modal.classList.remove('hidden');
    });

    btnClose.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    modal.addEventListener('click', e => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });

    // Envio do formulário
    formCadastro.addEventListener('submit', async e => {
        e.preventDefault();
        limparErro();

        const data = Object.fromEntries(new FormData(formCadastro).entries());
        data.idade = parseInt(data.idade, 10);

        if (isNaN(data.idade) || data.idade < 0 || data.idade > 120) {
            return mostrarErro('Informe uma idade válida entre 0 e 120.');
        }

        const idEdit = formCadastro.dataset.editId;
        const metodo = idEdit ? 'PUT' : 'POST';
        const url = idEdit ? `${API}/usuarios/${idEdit}` : `${API}/usuarios`;

        try {
            const res = await fetch(url, {
                method: metodo,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (!res.ok) {
                const errBody = await res.json().catch(() => ({}));
                throw new Error(errBody.message || `Status ${res.status}`);
            }

            modal.classList.add('hidden');
            carregarUsuarios();
        } catch (err) {
            mostrarErro(err.message);
        }
    });

    tbody.addEventListener('click', async e => {
        const tgt = e.target;
        const id = tgt.dataset.id;
        
        if (tgt.classList.contains('edit')) {
            abrirModalParaEditar(id);
        } else if (tgt.classList.contains('del')) {
            if (!confirm('Confirma exclusão deste usuário?')) return;
            try {
                const res = await fetch(`${API}/usuarios/${id}`, { method: 'DELETE' });
                if (!res.ok) throw new Error(`Erro ao deletar: ${res.status}`);
                carregarUsuarios();
            } catch (err) {
                alert('Erro ao excluir usuário.');
                console.error(err);
            }
        }
    });
}



