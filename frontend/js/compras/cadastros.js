import { carregarCompras } from './carregaDados.js';

const btnCadastrar = document.getElementById('btnCadastrarCompra');
const modal = document.getElementById('modalCadastroCompra');
const btnClose = document.getElementById('modalCloseCompra');
const formCadastro = document.getElementById('formCadastroCompra');
const formError = document.getElementById('formErrorCompra');
const tbody = document.querySelector('#tableCompras tbody');

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
        const res = await fetch(`${API}/compras/${id}`);
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const c = await res.json();

        formCadastro.elements.idCompra.value = c.idCompra;
        formCadastro.elements.idUsuario.value = c.idUsuario;
        formCadastro.elements.idProduto.value = c.idProduto;
        formCadastro.elements.quantidade.value = c.quantidade;
        // convert ISO datetime to local‐input format
        formCadastro.elements.dataCompra.value = new Date(c.dataCompra)
            .toISOString().slice(0, 16);
        formCadastro.elements.precoUnitario.value = c.precoUnitario;
        formCadastro.elements.descontoAplicado.value = c.descontoAplicado;
        formCadastro.elements.precoFinal.value = c.precoFinal;
        formCadastro.elements.formaPagamento.value = c.formaPagamento;
        formCadastro.elements.statusCompra.value = c.statusCompra;

        formCadastro.dataset.editId = id;
        modal.classList.remove('hidden');
    } catch (err) {
        alert('Erro ao carregar dados da compra.');
        console.error(err);
    }
}

export default function modalCompras() {
    // abrir modal
    btnCadastrar.addEventListener('click', () => {
        formCadastro.reset();
        delete formCadastro.dataset.editId;
        limparErro();
        modal.classList.remove('hidden');
    });

    // fechar modal
    btnClose.addEventListener('click', () => modal.classList.add('hidden'));
    modal.addEventListener('click', e => {
        if (e.target === modal) modal.classList.add('hidden');
    });

    // submit form
    formCadastro.addEventListener('submit', async e => {
        e.preventDefault();
        limparErro();

        const data = Object.fromEntries(new FormData(formCadastro).entries());
        data.idUsuario = parseInt(data.idUsuario, 10);
        data.idProduto = parseInt(data.idProduto, 10);
        data.quantidade = parseInt(data.quantidade, 10);
        data.precoUnitario = parseFloat(data.precoUnitario);
        data.descontoAplicado = parseFloat(data.descontoAplicado);
        data.precoFinal = parseFloat(data.precoFinal);

        // validações básicas
        if (isNaN(data.idUsuario) || data.idUsuario < 1) {
            return mostrarErro('Informe um usuário válido.');
        }
        if (isNaN(data.idProduto) || data.idProduto < 1) {
            return mostrarErro('Informe um produto válido.');
        }
        if (isNaN(data.quantidade) || data.quantidade < 1) {
            return mostrarErro('Informe quantidade >= 1.');
        }
        if (isNaN(data.precoUnitario) || data.precoUnitario < 0) {
            return mostrarErro('Informe um preço unitário válido.');
        }
        if (isNaN(data.descontoAplicado) ||
            data.descontoAplicado < 0 ||
            data.descontoAplicado > 100
        ) {
            return mostrarErro('Desconto deve estar entre 0% e 100%.');
        }
        if (isNaN(data.precoFinal) || data.precoFinal < 0) {
            return mostrarErro('Informe um preço final válido.');
        }

        const idEdit = formCadastro.dataset.editId;
        const metodo = idEdit ? 'PUT' : 'POST';
        const url = idEdit
            ? `${API}/compras/${idEdit}`
            : `${API}/compras`;

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
            carregarCompras();
        } catch (err) {
            mostrarErro(err.message);
        }
    });

    // editar / excluir
    tbody.addEventListener('click', async e => {
        const tgt = e.target;
        const id = tgt.dataset.id;
        if (tgt.classList.contains('edit')) {
            abrirModalParaEditar(id);
        } else if (tgt.classList.contains('del')) {
            if (!confirm('Confirma exclusão desta compra?')) return;
            try {
                const res = await fetch(`${API}/compras/${id}`, { method: 'DELETE' });
                if (!res.ok) throw new Error(`Status ${res.status}`);
                carregarCompras();
            } catch (err) {
                alert('Erro ao excluir compra.');
                console.error(err);
            }
        }
    });
}
