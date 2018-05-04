module.exports.index = function( application, req, res ){
    
    var connection = application.config.dbConnection();
    var caixaDao = new application.app.models.CaixaDAO(connection);
    
    caixaDao.listar(function(error, caixas){
        connection.end();
        if( error ) {
            res.render('caixa', { validacao : {}, caixas : {}, sessao: {} });
            return;
        }
        res.render('caixa', { validacao : {}, caixas : caixas, sessao: {} });
    });
}

module.exports.editar = function( application, req, res ){
    
    var connection = application.config.dbConnection();
    var caixaDao = new application.app.models.CaixaDAO(connection);
    
    caixaDao.editar( req.params._id, function(error, caixas){
        connection.end();
        if( error ) {
            res.render('caixaEditar', { validacao : [ {'msg': error.sqlMessage }], caixas : {}, sessao: req.session.usuario });
            return;
        }
        res.render('caixaEditar', { validacao : {}, caixas : caixas, sessao: req.session.usuario });
    });
}

module.exports.excluir = function( application, req, res ){
    
    var connection = application.config.dbConnection();
    var caixaDao = new application.app.models.CaixaDAO(connection);
    
    caixaDao.excluir( req.params._id, function(error, caixas){
        if( error ) {
            if(error.errno != undefined && error.errno == 1451) { 
                caixaDao.listar(function(error, caixas){                    
                    res.render('caixaListar', { validacao : [ {'msg': "Não se pode excluir dados com vínculos em outras tabelas." }], caixas : caixas, sessao: req.session.usuario });
                    connection.end();
                });
            } else {                
                res.render('caixa', { validacao : [ {'msg': error.sqlMessage ? error.sqlMessage : error }], caixas : {}, sessao: req.session.usuario });
            }
            return;
        }
        connection.end();
        res.redirect("/caixa");
    });
}

module.exports.salvar = function( application, req, res ){

    
    var dadosForms = req.body;
    req.assert('nome', 'Razão é obrigatório').notEmpty();       
    var erros = req.validationErrors();

    if(erros){
        res.render('caixa', {validacao: erros,  caixas: {}, sessao: {}});
        return;
    }
    
    var connection = application.config.dbConnection();
    var caixaDao = new application.app.models.CaixaDAO(connection);        
    
    caixaDao.salvar(dadosForms, function(error, result){
        connection.end();   
        if( error ) {
            console.log(error)
        
            res.render('caixa', { validacao : error, caixas : {}, sessao: {} });
            return;
        }
        res.redirect('/caixa');
    });
     
}