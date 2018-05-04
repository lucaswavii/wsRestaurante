module.exports.index = function( application, req, res ){
    
    var connection = application.config.dbConnection();
    var categoriaDao = new application.app.models.CategoriaDAO(connection);
    
    categoriaDao.listar(function(error, categorias){
        connection.end();
        console.log(categorias)
        if( error ) {
            res.render('categoria', { validacao : {}, categorias : {}, sessao: {} });
            return;
        }
        res.render('categoria', { validacao : {}, categorias : categorias, sessao: {} });
    });
}

module.exports.editar = function( application, req, res ){
    
    var connection = application.config.dbConnection();
    var categoriaDao = new application.app.models.CategoriaDAO(connection);
    
    categoriaDao.editar( req.params._id, function(error, categorias){
        connection.end();
        if( error ) {
            res.render('categoriaEditar', { validacao : [ {'msg': error.sqlMessage }], categorias : {}, sessao: req.session.usuario });
            return;
        }
        res.render('categoriaEditar', { validacao : {}, categorias : categorias, sessao: req.session.usuario });
    });
}

module.exports.excluir = function( application, req, res ){
    
    var connection = application.config.dbConnection();
    var categoriaDao = new application.app.models.CategoriaDAO(connection);
    
    categoriaDao.excluir( req.params._id, function(error, categorias){
        if( error ) {
            if(error.errno != undefined && error.errno == 1451) { 
                categoriaDao.listar(function(error, categorias){                    
                    res.render('categoriaListar', { validacao : [ {'msg': "Não se pode excluir dados com vínculos em outras tabelas." }], categorias : categorias, sessao: req.session.usuario });
                    connection.end();
                });
            } else {                
                res.render('categoria', { validacao : [ {'msg': error.sqlMessage ? error.sqlMessage : error }], categorias : {}, sessao: req.session.usuario });
            }
            return;
        }
        connection.end();
        res.redirect("/categoria");
    });
}

module.exports.salvar = function( application, req, res ){

    
    var dadosForms = req.body;
    req.assert('nome', 'Razão é obrigatório').notEmpty();       
    var erros = req.validationErrors();

    if(erros){
        res.render('categoria', {validacao: erros,  categorias: {}, sessao: {}});
        return;
    }
    
    var connection = application.config.dbConnection();
    var categoriaDao = new application.app.models.CategoriaDAO(connection);        
    
    categoriaDao.salvar(dadosForms, function(error, result){
        connection.end();   
        if( error ) {
            console.log(error)
        
            res.render('categoria', { validacao : error, categorias : {}, sessao: {} });
            return;
        }
        res.redirect('/categoria');
    });
     
}