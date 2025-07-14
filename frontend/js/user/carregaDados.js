const API = 'http://localhost:3000';

function carregarUsuarios() {
  fetch(`${API}/usuarios`)
    .then(r => r.json())
    .then(usuarios => {
      const tbody = document.querySelector('#tableUsuarios tbody');
      tbody.innerHTML = '';

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
            <button class="del" data-id="${u.idUsuario}">🗑️</button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    })
    .catch(err => {
      console.error('Erro ao carregar usuários:', err);
    });
}

export { carregarUsuarios }