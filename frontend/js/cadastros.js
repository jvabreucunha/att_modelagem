import { carregarUsuarios } from './carregaDados.js'

const btnCadastrar = document.getElementById('btnCadastrarUsuario');
const modal = document.getElementById('modalCadastro');
const btnClose = document.getElementById('modalClose');
const formCadastro = document.getElementById('formCadastroUsuario');    
const formError = document.getElementById('formError')

const API = 'http://localhost:3000';

function limparErro() {
    formError.textContent = '';
    formError.classList.add('hidden');
  }
  
function mostrarErro(msg) {
    formError.textContent = msg;
    formError.classList.remove('hidden');
}

function modalUsuarios() {
    btnCadastrar.addEventListener('click', () => {
        formCadastro.reset();
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
        // data.dataNascimento já vem em YYYY-MM-DD
    
        // validação simples de idade
        if (isNaN(data.idade) || data.idade < 0 || data.idade > 120) {
          return mostrarErro('Informe uma idade válida entre 0 e 120.');
        }
    
        try {
          const res = await fetch(`${API}/usuarios`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          });
    
          if (!res.ok) {
            // tenta ler mensagem de erro do servidor
            const errBody = await res.json().catch(() => ({}));
            throw new Error(errBody.message || `Status ${res.status}`);
          }
    
          modal.classList.add('hidden');
          carregarUsuarios(); // atualiza tabela
        } catch (err) {
          mostrarErro(err.message);
        }
    });
}

export default function LigaModais() {
    modalUsuarios()
}