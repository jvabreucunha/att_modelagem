import { carregarUsuarios } from './carregaDados.js';

const btnCadastrar = document.getElementById('btnCadastrarUsuario');
const modal = document.getElementById('modalCadastro');
const btnClose = document.getElementById('modalClose');
const formCadastro = document.getElementById('formCadastroUsuario');
const formError = document.getElementById('formError');
const tbody = document.querySelector('#tableUsuarios tbody');
const API = 'http://localhost:3000';

function limparErro() {
    formError.textContent = '';
    formError.classList.add('hidden');
}

function mostrarErro(msg) {
    formError.textContent = msg;
    formError.classList.remove('hidden');
}

function abrirModalParaCriar() {
    formCadastro.reset();
    formCadastro.dataset.editId = '';    // sinaliza “novo”
    limparErro();
    modal.classList.remove('hidden');
}

async function abrirModalParaEditar(id) {
    limparErro();
    try {
        const res = await fetch(`${API}/usuarios/${id}`);
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const u = await res.json();
        // popular form
        formCadastro.elements.idUsuario.value = u.idUsuario;
        formCadastro.elements.primeiroNome.value = u.primeiroNome;
        formCadastro.elements.sobrenome.value = u.sobrenome;
        formCadastro.elements.idade.value = u.idade;
        formCadastro.elements.email.value = u.email;
        formCadastro.elements.telefone.value = u.telefone;
        formCadastro.elements.endereco.value = u.endereco;
        formCadastro.elements.cidade.value = u.cidade;
        formCadastro.elements.estado.value = u.estado;
        formCadastro.elements.dataNascimento.value = u.dataNascimento.split('T')[0];
        formCadastro.dataset.editId = id;          // sinaliza “edição”
        modal.classList.remove('hidden');
    } catch (err) {
        alert('Não foi possível carregar dados do usuário.');
        console.error(err);
    }
}

function fecharModal() {
    modal.classList.add('hidden');
}

// Envio do formulário
async function handleSubmit(e) {
    e.preventDefault();
    limparErro();

    const dataRaw = Object.fromEntries(new FormData(formCadastro).entries());
    const idEdit = formCadastro.dataset.editId;
    const payload = {
        primeiroNome: dataRaw.primeiroNome,
        sobrenome: dataRaw.sobrenome,
        idade: parseInt(dataRaw.idade, 10),
        email: dataRaw.email,
        telefone: dataRaw.telefone,
        endereco: dataRaw.endereco,
        cidade: dataRaw.cidade,
        estado: dataRaw.estado,
        dataNascimento: dataRaw.dataNascimento
    };

    // validação simples
    if (isNaN(payload.idade) || payload.idade < 0 || payload.idade > 120) {
        return mostrarErro('Informe uma idade válida entre 0 e 120.');
    }

    try {
        const metodo = idEdit ? 'PUT' : 'POST';
        const url = idEdit ? `${API}/usuarios/${idEdit}` : `${API}/usuarios`;
        const res = await fetch(url, {
            method: metodo,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (!res.ok) {
            const errBody = await res.json().catch(() => ({}));
            throw new Error(errBody.message || `Status ${res.status}`);
        }
        fecharModal();
        carregarUsuarios();
    } catch (err) {
        mostrarErro(err.message);
    }
}

export default function LigaModais() {
    // Abre modal em “criar”
    btnCadastrar.addEventListener('click', abrirModalParaCriar);

    // Fecha modal
    btnClose.addEventListener('click', fecharModal);
    modal.addEventListener('click', e => {
        if (e.target === modal) fecharModal();
    });

    // Intercepta clique em linhas da tabela
    tbody.addEventListener('click', async e => {
        const tgt = e.target;
        const id = tgt.dataset.id;
        // EDITAR
        if (tgt.classList.contains('edit')) {
            abrirModalParaEditar(id);
        }
        // DELETAR
        else if (tgt.classList.contains('del')) {
            if (!confirm('Confirma exclusão deste usuário?')) return;
            try {
                const res = await fetch(`${API}/usuarios/${id}`, { method: 'DELETE' });
                if (!res.ok) throw new Error(`Status ${res.status}`);
                carregarUsuarios(); // recarrega tabela
            } catch (err) {
                alert('Erro ao excluir usuário.');
                console.error(err);
            }
        }
    });

    // Submissão do form
    formCadastro.addEventListener('submit', handleSubmit);
}

