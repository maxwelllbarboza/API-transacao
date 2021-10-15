const conexao = require('../conexao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const segredo = require('../hashToken');

async function loginUsuario(req, res){
    const {email, senha} = req.body;
    if(!email || !senha){
        return res.status(403).json({"mensagem": "Usuário e/ou senha inválido(s)."})
    }
    try{
        const {rowCount, rows} = await conexao.query('select * from usuarios where email = $1', [email]);
        if(rowCount <= 0){
            return res.status(403).json({"mensagem": "Usuário e/ou senha inválido(s)."});
        }
        const usuarioLogado =rows[0];
        const senhaCorreta = await bcrypt.compare(senha, usuarioLogado.senha);
        if(!senhaCorreta){
            return res.status(403).json({"mensagem": "Usuário e/ou senha inválido(s)."});
        }
        const token = jwt.sign({id: usuarioLogado.id}, segredo, {expiresIn: '4h'});
        return res.status(200).json({token});

    }catch(error){
        return res.status(404).json(error.message);
    }
}

module.exports = {
    loginUsuario
}