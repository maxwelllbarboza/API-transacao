const conexao = require('../conexao');
const jwt = require('jsonwebtoken');
const segredo = require('../hashToken');

async function validaToken(req, res, next){
    const { authorization} = req.headers;    
    if(!authorization){
        return res.status(401).json({"mensagem": "Para acessar este recurso um token de autenticação válido deve ser enviado."});
    }    
    try{
        const token = authorization.replace('Bearer', '').trim();
        const { id } = jwt.verify(token, segredo);
        const {rows, rowCount} = await conexao.query('select * from usuarios where id = $1',[id]);

        if(rowCount === 0){
            return res.status(403).json({"mensagem": "Usuário não foi encontrado."});
        }
        const {senha, ...usuarioLogado} = rows[0];     
       
       req.usuario = usuarioLogado;
       return next();
    }catch(error){
        return res.status(404).json(error.message);
    }
}
module.exports = {
    validaToken
}