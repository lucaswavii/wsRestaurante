module.exports.index = function( application, req, res ){
    
    var connection = application.config.dbConnection();
    var categoriaDao = new application.app.models.CategoriaDAO(connection);
    var produtoDao = new application.app.models.ProdutoDAO(connection);

    categoriaDao.listar(function(error, categorias){
        produtoDao.listar(function(error, produtos){
            connection.end();
            if( error ) {
                console.log(error)
                res.render('produto', { validacao : {}, produtos : produtos,  categorias: categorias, sessao: {} });
                return;
            }                
            res.render('produto', { validacao : {}, produtos : produtos,  categorias: categorias, sessao: {} });
        });
    });
}


module.exports.excluir = function( application, req, res ){
    
    var connection = application.config.dbConnection();
    var categoriaDao = new application.app.models.CategoriaDAO(connection);
    var produtoDao = new application.app.models.ProdutoDAO(connection);

    produtoDao.excluir( req.params._id, function(error, produtos){
        if( error ) {
            categoriaDao.listar(function(error, categorias){
                produtoDao.listar(function(error, produtos){
                    connection.end();
                    res.render('produto', { validacao : {}, produtos : produtos,  categorias: categorias, sessao: {} });
                    return;
                });        
            });
        }
        connection.end();
        res.redirect("/produto");
    });
}

module.exports.salvar = function( application, req, res ){
    
    var connection = application.config.dbConnection();
    var categoriaDao = new application.app.models.CategoriaDAO(connection);
    var produtoDao = new application.app.models.ProdutoDAO(connection);

    var dadosForms = req.body;
    req.assert('nome', 'Nome é obrigatório').notEmpty();       
    
    var erros = req.validationErrors();
    console.log(dadosForms)
            
    if(erros){
        categoriaDao.listar(function(error, categorias){
            produtoDao.listar(function(error, produtos){
                connection.end();
                res.render('produto', { validacao : {}, produtos : produtos,  categorias: categorias, sessao: {} });
                return;
            });        
        });
    }
    
    
    produtoDao.salvar(dadosForms, function(error, result){
        if( error ) {
            categoriaDao.listar(function(error, categorias){
                produtoDao.listar(function(error, produtos){
                    connection.end();
                    res.render('produto', { validacao : {}, produtos : produtos,  categorias: categorias, sessao: {} });
                    return;
                });        
            });                
        }
    
        connection.end();   
        res.redirect('/produto');
    });
     
}