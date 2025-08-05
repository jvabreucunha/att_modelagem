# 💼 Sistema de Compras — Projeto Final de Modelagem

Este projeto é uma aplicação web para **gerenciamento de usuários, produtos e compras**, desenvolvida como trabalho final da disciplina de Modelagem de Sistemas do SESI. A aplicação utiliza **Node.js + Express + Sequelize** no backend, **MySQL** como banco de dados, e **HTML, CSS e JavaScript puro** no frontend.

---

## ⚙️ Tecnologias Utilizadas

- **Backend:** Node.js, Express, Sequelize  
- **Banco de Dados:** MySQL  
- **Frontend:** HTML5, CSS3, JavaScript  
- **Gráficos:** Chart.js  
- **Relatórios:** HTML + JavaScript dinâmico  
- **Deploy (opcional):** Vercel  

---

## 🧪 Funcionalidades

### 👤 Usuários
- Cadastrar, consultar, editar, excluir e listar

### 📦 Produtos
- Cadastrar, consultar, editar, excluir e listar

### 🛍️ Compras
- Registrar compras com cálculo automático de preço final com desconto
- Consultar, editar, excluir e listar compras

### 📊 Relatórios e Gráficos
- Relatório de usuários
- Relatório de produtos
- Produtos com estoque crítico
- Relatório de compras
- Relatório consolidado (com forma de pagamento e status)
- Gráfico de estoque por produto
- Gráfico da idade dos usuários

---

## 🚀 Como Instalar e Executar

### 1. Clone o repositório

```bash
git clone https://github.com/jvabreucunha/att_modelagem.git
cd att_modelagem
```
### 2. Instale as dependências

```bash
npm install
```

```sql
CREATE DATABASE nome_do_seu_db;
```

- No arquivo `db/conn.js`, atualize com suas credenciais do MySQL:

```javascript
const sequelize = new Sequelize('nome_do_seu_db', 'SEU_USUARIO', 'SUA_SENHA', {
  host: 'localhost',
  dialect: 'mysql'
});
```

### 4. Rode as migrações (se necessário)

Se os modelos estiverem configurados com `sequelize.sync()`, ao iniciar o servidor os dados serão sincronizados automaticamente.

### 5. Inicie o servidor

```bash
node index.js
```

> O backend estará disponível em: `http://localhost:3000`
