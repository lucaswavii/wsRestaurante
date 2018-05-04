module.exports.index = function( application, req, res ){
    
    var connection = application.config.dbConnection();
    var empresaDao = new application.app.models.EmpresaDAO(connection);
    
    empresaDao.listar(function(error, empresas){
        connection.end();
        console.log(empresas)
        if( error ) {
            res.render('empresa', { validacao : {}, empresas : {}, sessao: {} });
            return;
        }
        res.render('empresa', { validacao : {}, empresas : empresas, sessao: {} });
    });
}

module.exports.editar = function( application, req, res ){
    
    var connection = application.config.dbConnection();
    var empresaDao = new application.app.models.EmpresaDAO(connection);
    
    empresaDao.editar( req.params._id, function(error, empresas){
        connection.end();
        if( error ) {
            res.render('empresaEditar', { validacao : [ {'msg': error.sqlMessage }], empresas : {}, sessao: req.session.usuario });
            return;
        }
        res.render('empresaEditar', { validacao : {}, empresas : empresas, sessao: req.session.usuario });
    });
}

module.exports.excluir = function( application, req, res ){
    
    var connection = application.config.dbConnection();
    var empresaDao = new application.app.models.EmpresaDAO(connection);
    
    empresaDao.excluir( req.params._id, function(error, empresas){
        if( error ) {
            if(error.errno != undefined && error.errno == 1451) { 
                empresaDao.listar(function(error, empresas){                    
                    res.render('empresaListar', { validacao : [ {'msg': "Não se pode excluir dados com vínculos em outras tabelas." }], empresas : empresas, sessao: req.session.usuario });
                    connection.end();
                });
            } else {                
                res.render('empresa', { validacao : [ {'msg': error.sqlMessage ? error.sqlMessage : error }], empresas : {}, sessao: req.session.usuario });
            }
            return;
        }
        connection.end();
        res.redirect("/empresa");
    });
}

module.exports.salvar = function( application, req, res ){

    
    var dadosForms = req.body;
    req.assert('cnpj', 'cnpj é obrigatório').notEmpty();
    req.assert('nome', 'Razão é obrigatório').notEmpty();       
    var erros = req.validationErrors();

    if(erros){
        res.render('empresa', {validacao: erros,  empresas: {}, sessao: {}});
        return;
    }
    
    var connection = application.config.dbConnection();
    var empresaDao = new application.app.models.EmpresaDAO(connection);        
    
    empresaDao.salvar(dadosForms, function(error, result){
        connection.end();   
        if( error ) {
            console.log(error)
        
            res.render('empresa', { validacao : error, empresas : {}, sessao: {} });
            return;
        }
        res.redirect('/empresa');
    });
     
}