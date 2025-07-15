import { carregarProdutos } from './carregaDados.js';

const btnCadastrar = document.getElementById('btnCadastrarProduto');
const modal = document.getElementById('modalCadastroProduto');
const btnClose = document.getElementById('modalCloseProduto');
const formCadastro = document.getElementById('formCadastroProduto');
const formError = document.getElementById('formErrorProduto');
const tbody = document.querySelector('#tableProdutos tbody');

const API = 'http://localhost:3000';

function limparErro() {
    formError.textContent = '';
    formError.classList.add('hidden');
}

function mostrarErro(msg) {
    formError.textContent = msg;
    formError.classList.remove('hidden');
}

async function abrirModalParaEditar(id) {
    limparErro();
    try {
        const res = await fetch(`${API}/produtos/${id}`);
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const p = await res.json();

        formCadastro.elements.idProduto.value = p.idProduto;
        formCadastro.elements.titulo.value = p.titulo;
        formCadastro.elements.descricao.value = p.descricao;
        formCadastro.elements.categoria.value = p.categoria;
        formCadastro.elements.preco.value = p.preco;
        formCadastro.elements.percentualDesconto.value = p.percentualDesconto;
        formCadastro.elements.estoque.value = p.estoque;
        formCadastro.elements.marca.value = p.marca || '';

        formCadastro.dataset.editId = id;
        modal.classList.remove('hidden');
    } catch (err) {
        alert('Erro ao carregar dados do produto.');
        console.error(err);
    }
}

export default function modalProdutos() {
    // Abrir modal de cadastro
    btnCadastrar.addEventListener('click', () => {
        formCadastro.reset();
        delete formCadastro.dataset.editId;
        limparErro();
        modal.classList.remove('hidden');
    });

    // Fechar modal
    btnClose.addEventListener('click', () => modal.classList.add('hidden'));
    modal.addEventListener('click', e => {
        if (e.target === modal) modal.classList.add('hidden');
    });

    // Envio do formulário
    formCadastro.addEventListener('submit', async e => {
        e.preventDefault();
        limparErro();

        const data = Object.fromEntries(new FormData(formCadastro).entries());
        data.preco = parseFloat(data.preco);
        data.percentualDesconto = parseFloat(data.percentualDesconto);
        data.estoque = parseInt(data.estoque, 10);

        // Validações básicas
        if (isNaN(data.preco) || data.preco < 0) {
            return mostrarErro('Informe um preço válido.');
        }
        if (
            isNaN(data.percentualDesconto) ||
            data.percentualDesconto < 0 ||
            data.percentualDesconto > 100
        ) {
            return mostrarErro('Informe um desconto entre 0% e 100%.');
        }
        if (isNaN(data.estoque) || data.estoque < 0) {
            return mostrarErro('Informe um estoque válido (>= 0).');
        }

        const idEdit = formCadastro.dataset.editId;
        const metodo = idEdit ? 'PUT' : 'POST';
        const url = idEdit
            ? `${API}/produtos/${idEdit}`
            : `${API}/produtos`;

        try {
            const res = await fetch(url, {
                method: metodo,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!res.ok) {
                const errBody = await res.json().catch(() => ({}));
                throw new Error(errBody.message || `Status ${res.status}`);
            }
            modal.classList.add('hidden');
            carregarProdutos();
        } catch (err) {
            mostrarErro(err.message);
        }
    });

    // Editar / Excluir na tabela
    tbody.addEventListener('click', async e => {
        const tgt = e.target;
        const id = tgt.dataset.id;
        if (tgt.classList.contains('edit')) {
            abrirModalParaEditar(id);
        } else if (tgt.classList.contains('del')) {
            if (!confirm('Confirma exclusão deste produto?')) return;
            try {
                const res = await fetch(`${API}/produtos/${id}`, { method: 'DELETE' });
                if (!res.ok) throw new Error(`Status ${res.status}`);
                carregarProdutos();
            } catch (err) {
                alert('Erro ao excluir produto.');
                console.error(err);
            }
        }
    });
}


