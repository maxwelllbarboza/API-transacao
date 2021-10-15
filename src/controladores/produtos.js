const conexao = require('../conexao');

// -------------Listar Produtos--------------------------
async function listarProduto(req, res){
    const {usuario} = req;     
    try{           
        const {rows} = await conexao.query('select * from produtos where usuario_id = $1', [usuario.id]);       
        return res.status(200).json(rows);
    }catch(error){
        return res.status(404).json(error.message);
    }
}

// --------------Cadastrar Produtos-----------------
async function cadastrarProduto(req, res){
    const {nome, quantidade, categoria, preco, descricao, imagem } = req.body;
    const {usuario} = req;
    try{
        const cadastroProduto = await conexao.query('insert into produtos (usuario_id, nome, quantidade, categoria, preco, descricao, imagem) values($1, $2, $3, $4, $5, $6, $7)',[usuario.id, nome, quantidade, categoria, preco, descricao, imagem]);
        if(!cadastroProduto){
            return res.status(400).json({"mensagem": "Não foi possível cadastrar a postagem."});
        }
        return res.status(200).send();
    }catch(error){
        return res.status(404).json(error.message);
    }
}

// ---------------Detalhar Produtos-----------------
async function detalharProduto(req, res){
    const {usuario} = req;
    const {id: idProdutos} = req.params;

    if(!idProdutos){
        return res.status(400).json({"mensagem": "Você precisa informar o ID."});
    }
    try{
        const queryProdutosExistentes = 'select * from produtos where id = $1 and usuario_id = $2';    
        const produtoExistente = await conexao.query(queryProdutosExistentes,[idProdutos, usuario.id]);
        if(produtoExistente.rowCount === 0){
            return res.status(400).json({"mensagem": "O produto não foi encontrado."});
        }        
        return res.status(200).json(produtoExistente.rows);
    }catch(error){
        return res.status(404).json(error.message);
    }
}

// ------------Atualizar Produtos------------------
async function atualizarProduto(req, res){
    const {nome, quantidade, categoria, preco, descricao, imagem } = req.body;
    const {usuario} = req;
    const {id: idProdutos} = req.params;

    if(!idProdutos){
        return res.status(400).json({"mensagem": "Você precisa informar o ID."});
    }
    if(!nome){
        return res.status(400).json({"mensagem": "Você precisa informar o nome."});
    }
    if(!quantidade){
        return res.status(400).json({"mensagem": "Você precisa informar a quantidade ."});
    }
    if(!categoria){
        return res.status(400).json({"mensagem": "Você precisa informar a categoria."});
    }
    if(!preco){
        return res.status(400).json({"mensagem": "Você precisa informar o preço."});
    }
    if(!descricao){
        return res.status(400).json({"mensagem": "Você precisa informar a descrição."});
    }
    if(!imagem){
        return res.status(400).json({"mensagem": "Você precisa informar a imagem."});
    }
    try{
        const queryProdutosExistentes = 'select * from produtos where id = $1 and usuario_id = $2';    
        const produtoExistente = await conexao.query(queryProdutosExistentes,[idProdutos, usuario.id]);
        if(produtoExistente.rowCount === 0){
            return res.status(400).json({"mensagem": "O produto não foi encontrado."});
        }  
        const {rowCount, rows} = await conexao.query('update produtos set nome = $1, quantidade = $2, categoria = $3, preco = $4, descricao = $5, imagem =$6 where id = $7 and usuario_id = $8' , [nome, quantidade, categoria, preco, descricao, imagem, idProdutos,usuario.id]);
        if(rowCount === 0){
            return res.status(400).send();
        }
        return res.status(200).send();       
    }catch(error){
        return res.status(404).json(error.message);
    }
}

// --------------------------Deletar Produtos----------------------------------
async function deletarProduto(req, res){
    const {usuario} = req;
    const {id: idProdutos} = req.params;

    if(!idProdutos){
        return res.status(400).json({"mensagem": "Você precisa informar o ID."});
    }
    try{
        const queryProdutosExistentes = 'select * from produtos where id = $1 and usuario_id = $2';
        const produtoExistente = await conexao.query(queryProdutosExistentes,[idProdutos, usuario.id]);
        if(produtoExistente.rowCount === 0){
            return res.status(400).json({"mensagem": "O produto não foi encontrado."});
        }
        const {rowCount } = await conexao.query('delete from produtos where id = $1', [idProdutos]);
        if(rowCount === 0){
            return res.status(400).send();
        }
        return res.status(200).send();
    }catch(error){
        return res.status(404).json(error.message);
    }
}

module.exports = {
    listarProduto,
    cadastrarProduto,
    detalharProduto,
    atualizarProduto,
    deletarProduto
}
    