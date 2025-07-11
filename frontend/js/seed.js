const API = 'http://localhost:3000';

async function popularUsuarios() {
  const resp = await fetch('https://dummyjson.com/users');
  const { users } = await resp.json();

  for (const u of users) {
    const payload = {
      primeiroNome: u.firstName,
      sobrenome: u.lastName,
      idade: u.age,
      email: u.email,
      telefone: u.phone,
      endereco: u.address.address,
      cidade: u.address.city,
      estado: u.address.state,
      dataNascimento: u.birthDate
    };
    const res = await fetch(`${API}/usuarios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      console.error('Falha ao criar usuário', await res.text());
    }
  }
  console.log('Usuários populados via API!');
}

async function popularProdutos() {
  const resp = await fetch('https://dummyjson.com/products');
  const { products } = await resp.json();

  for (const p of products) {
    const payload = {
      titulo: p.title,
      descricao: p.description,
      categoria: p.category,
      preco: p.price,
      percentualDesconto: p.discountPercentage,
      estoque: p.stock,
      marca: p.brand || null,
      imagemThumbnail: p.thumbnail || null
    };
    const res = await fetch(`${API}/produtos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      console.error('Falha ao criar produto', await res.text());
    }
  }
  console.log('Produtos populados via API!');
}

async function popularCompras() {
  // Busca todos os usuários e produtos já criados
  const [usR, prR] = await Promise.all([  
    fetch(`${API}/usuarios`),
    fetch(`${API}/produtos`)
  ]);
  const usuarios = await usR.json();
  const produtos = await prR.json();

  for (let i = 0; i < 20; i++) {
    const usuario = usuarios[Math.floor(Math.random() * usuarios.length)];
    const produto = produtos[Math.floor(Math.random() * produtos.length)];
    const quantidade = Math.floor(Math.random() * 5) + 1;
    const descontoAplicado = Math.random() < 0.3 ? Math.floor(Math.random() * 31) : 0;
    const precoUnitario = produto.preco;
    const precoFinal = parseFloat((precoUnitario * quantidade * (1 - descontoAplicado / 100)).toFixed(2));
    const formas = ['boleto', 'cartao', 'pix'];
    const statusLista = ['pendente', 'pago', 'cancelado'];

    const payload = {
      idUsuario: usuario.idUsuario,
      idProduto: produto.idProduto,
      quantidade,
      dataCompra: new Date(Date.now() - Math.random() * 30 * 24*60*60*1000),
      precoUnitario,
      descontoAplicado,
      precoFinal,
      formaPagamento: formas[Math.floor(Math.random() * formas.length)],
      statusCompra: statusLista[Math.floor(Math.random() * statusLista.length)]
    };

    const res = await fetch(`${API}/compras`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      console.error('Falha ao criar compra', await res.text());
    }
  }
  console.log('Compras populadas via API!');
}

function appendLog(msg) {
    const logEl = document.getElementById('seedLogs');
    logEl.textContent += msg + '\n';
    logEl.scrollTop = logEl.scrollHeight;
  }
  
let seedExecutado = false;
  
document.getElementById('btnSeed').addEventListener('click', async function () {
    if (seedExecutado) return; // só roda uma vez
    seedExecutado = true;
    this.disabled = true; // desabilita o botão
    appendLog('➡️ Iniciando povoamento em lote…');

    try {
        appendLog('📥 Populando Usuários…');
        await popularUsuarios();
        appendLog('✅ Usuários populados com sucesso!');

        appendLog('📥 Populando Produtos…');
        await popularProdutos();
        appendLog('✅ Produtos populados com sucesso!');

        appendLog('📥 Populando Compras…');
        await popularCompras();
        appendLog('✅ Compras populadas com sucesso!');

        appendLog('🎉 Seed finalizado sem erros.');
    } catch (err) {
        appendLog(`❌ Erro ao gerar lote`);
    }
});
