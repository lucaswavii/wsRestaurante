module.exports.index = function( application, req, res ){
    
    var connection = application.config.dbConnection();
    var disponivelDao = new application.app.models.DisponivelDAO(connection);
    
    disponivelDao.listar(function(error, disponiveis){
        connection.end();
        console.log(disponiveis)
        if( error ) {
            res.render('disponivel', { validacao : {}, disponiveis : {}, sessao: {} });
            return;
        }
        res.render('disponivel', { validacao : {}, disponiveis : disponiveis, sessao: {} });
    });
}

module.exports.editar = function( application, req, res ){
    
    var connection = application.config.dbConnection();
    var disponivelDao = new application.app.models.DisponivelDAO(connection);
    
    disponivelDao.editar( req.params._id, function(error, disponiveis){
        connection.end();
        if( error ) {
            res.render('disponivelEditar', { validacao : [ {'msg': error.sqlMessage }], disponiveis : {}, sessao: req.session.usuario });
            return;
        }
        res.render('disponivelEditar', { validacao : {}, disponiveis : disponiveis, sessao: req.session.usuario });
    });
}

module.exports.excluir = function( application, req, res ){
    
    var connection = application.config.dbConnection();
    var disponivelDao = new application.app.models.DisponivelDAO(connection);
    
    disponivelDao.excluir( req.params._id, function(error, disponiveis){
        if( error ) {
            if(error.errno != undefined && error.errno == 1451) { 
                disponivelDao.listar(function(error, disponiveis){                    
                    res.render('disponivelListar', { validacao : [ {'msg': "Não se pode excluir dados com vínculos em outras tabelas." }], disponiveis : disponiveis, sessao: req.session.usuario });
                    connection.end();
                });
            } else {                
                res.render('disponivel', { validacao : [ {'msg': error.sqlMessage ? error.sqlMessage : error }], disponiveis : {}, sessao: req.session.usuario });
            }
            return;
        }
        connection.end();
        res.redirect("/disponivel");
    });
}

module.exports.salvar = function( application, req, res ){

    
    var dadosForms = req.body;
    req.assert('nome', 'Razão é obrigatório').notEmpty();       
    var erros = req.validationErrors();

    if(erros){
        res.render('disponivel', {validacao: erros,  disponiveis: {}, sessao: {}});
        return;
    }
    
    var connection = application.config.dbConnection();
    var disponivelDao = new application.app.models.DisponivelDAO(connection);        
    
    disponivelDao.salvar(dadosForms, function(error, result){
        connection.end();   
        if( error ) {
            console.log(error)
        
            res.render('disponivel', { validacao : error, disponiveis : {}, sessao: {} });
            return;
        }
        res.redirect('/disponivel');
    });
     
}