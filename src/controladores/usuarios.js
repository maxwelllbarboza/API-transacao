const conexao = require('../conexao'); 
const bcrypt = require('bcrypt')


//---------- Cadastro de Usuário -----------------
async function cadastrarUsuario(req, res){
    const {nome, email, senha, nome_loja} = req.body; 
   
    if (!nome) {
         return res.status(404).json({mensagem: "O nome é obrigatório"});
     }
    if (!nome_loja) {
         return res.status(404).json({mensagem: "O nome da loja é obrigatório"});
     }
    if (!email){
         return res.status(404).json({mensagem: "O e-mail é obrigatório"});
     }
     if (!senha){
          return res.status(404).json({mensagem: "A senha é obrigatória."});
     }     
     try {
          const {rowCount} = await conexao.query('select * from usuarios where email = $1', [email]);
          if(rowCount > 0){
               return res.status(400).json({"mensagem": "Já existe usuário cadastrado com o e-mail informado."});
          }
          const senhaCripto = await bcrypt.hash(senha, 10);
          const usuarioCadastrado = await conexao.query(
               'insert into usuarios (nome, email, senha, nome_loja ) values ($1, $2, $3, $4)',
                [nome, email, senhaCripto, nome_loja]);
          if(usuarioCadastrado === 0){
               return res.status(400).json({"mensagem": "Não foi possível cadastrar o suário."});
          }     
          return res.status(201).send();
     }catch(error){
          return res.status(404).json(error.message);
     }
}

// --------------Detalhar Usuário------------
async function detalharUsuario(req, res){
     const {usuario} = req;
     try{         
         const usuarioExistente = await conexao.query('select * from usuarios where id = $1',[usuario.id]);
         if(usuarioExistente.rowCount === 0){
             return res.status(401).json({"mensagem": "O usuário não foi encontrado."});
         }
         const {senha, ...detalhesUsuario} = usuarioExistente.rows[0];        
         return res.status(200).json(detalhesUsuario);
     }catch(error){
          return res.status(404).json(error.message);
     }
}

// -------------Atualizar Usuário-------------

async function atualizarUsuario(req, res){
     const {nome, email, senha, nome_loja} = req.body; 
     const {usuario} = req;

     if (!nome) {
          return res.status(404).json({mensagem: "O nome é obrigatório"});
     }
     if (!email){
          return res.status(404).json({mensagem: "O e-mail é obrigatório"});
     }
     if (!senha){
          return res.status(404).json({mensagem: "A senha é obrigatória."});
     }     
     if (!nome_loja) {
          return res.status(404).json({mensagem: "O nome da loja é obrigatório"});
     }
     try{         

         const {rowCount: usuarioExistente} = await conexao.query('select * from usuarios where id = $1',[usuario.id]);
         if(usuarioExistente  === 0){
             return res.status(400).json({"mensagem": "O usuário não foi encontrado."});
         }


         const {rowCount: validarEmail} = await conexao.query('select * from usuarios where email = $1', [email]);
         if(validarEmail > 0){
              return res.status(400).json({"mensagem": "O e-mail informado já existe."});
         }

         const senhaCripto = await bcrypt.hash(senha, 10);

         const {rowCount: usuarioAtualizado} = await conexao.query('update usuarios set nome = $1, email = $2, senha = $3, nome_loja =$4 where id = $5' , [nome, email, senhaCripto,nome_loja, usuario.id]);

        if( usuarioAtualizado === 0){
            return res.status(400).send();
        }
        return res.status(200).send();       
         
     }catch(error){
          return res.status(404).json(error.message);
     }
     
}



module.exports = {
    cadastrarUsuario,
    detalharUsuario,
    atualizarUsuario
}