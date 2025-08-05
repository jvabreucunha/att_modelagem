💼 Sistema de Compras — Projeto Final de Modelagem
Este projeto é uma aplicação web para gerenciamento de usuários, produtos e compras, desenvolvida como trabalho final da disciplina de Modelagem de Sistemas do SESI. A aplicação utiliza Node.js + Express + Sequelize no backend, MySQL como banco de dados, e HTML, CSS e JavaScript puro no frontend.

⚙️ Tecnologias Utilizadas
Backend: Node.js, Express, Sequelize

Banco de Dados: MySQL

Frontend: HTML5, CSS3, JavaScript

Gráficos: Chart.js

Relatórios: HTML + JavaScript dinâmico

Deploy: Vercel

🧪 Funcionalidades
👤 Usuários
Cadastrar, consultar, editar, excluir e listar

📦 Produtos
Cadastrar, consultar, editar, excluir e listar

🛍️ Compras
Registrar compras com cálculo automático de preço final com desconto

Consultar, editar, excluir e listar compras

📊 Relatórios e Gráficos
Relatório de usuários

Relatório de produtos

Produtos com estoque crítico

Relatório de compras

Relatório consolidado (com forma de pagamento e status)

Gráfico de estoque por produto

Gráfico da idade dos usuários

🚀 Como Instalar e Executar
1. Clone o repositório
bash
Copiar
Editar
git clone https://github.com/jvabreucunha/att_modelagem.git
cd att_modelagem
2. Instale as dependências
bash
Copiar
Editar
npm install
Ou, manualmente:

bash
Copiar
Editar
npm install express sequelize mysql2 cors dotenv
3. Configure o banco de dados
Crie o banco no MySQL:

sql
Copiar
Editar
CREATE DATABASE compras_db;
Depois, edite o arquivo db/conn.js com suas credenciais do MySQL:

javascript
Copiar
Editar
const sequelize = new Sequelize('compras_db', 'SEU_USUARIO', 'SUA_SENHA', {
  host: 'localhost',
  dialect: 'mysql'
});
4. Sincronize os modelos
Se o projeto estiver configurado com sequelize.sync(), os modelos serão sincronizados automaticamente ao rodar o servidor.

5. Inicie o servidor
bash
Copiar
Editar
node index.js
O backend estará disponível em: http://localhost:3000

Projeto desenvolvido para a disciplina de Modelagem de Sistemas – SESI

