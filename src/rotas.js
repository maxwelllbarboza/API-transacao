const express = require('express');
const controladorUsuarios = require('./controladores/usuarios'); 
const controladorLogin = require('./controladores/login');
const controladorProdutos = require('./controladores/produtos');
const filtroAutenticacao = require('./filtros/autenticacao')
const rotas = express();

// ---------Cadastrar Usuários-------------
rotas.post('/usuario', controladorUsuarios.cadastrarUsuario);

//-------- Login do usuário --------
rotas.post('/login', controladorLogin.loginUsuario);


// ----------Validação de Autenticação-----------
rotas.use(filtroAutenticacao.validaToken);

// -------Detalhar e atualizar Usuários-----------
rotas.get('/usuario', controladorUsuarios.detalharUsuario);
rotas.put('/usuario', controladorUsuarios.atualizarUsuario);

// -----------Produtos-----------------
rotas.get('/produtos', controladorProdutos.listarProduto);
rotas.get('/produtos/:id', controladorProdutos.detalharProduto);
rotas.post('/produtos', controladorProdutos.cadastrarProduto);
rotas.put('/produtos/:id', controladorProdutos.atualizarProduto);
rotas.delete('/produtos/:id', controladorProdutos.deletarProduto);

module.exports = rotas;

