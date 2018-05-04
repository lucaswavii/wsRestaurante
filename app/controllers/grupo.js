module.exports.index = function( application, req, res ){
    
    var connection = application.config.dbConnection();
    var grupoDao = new application.app.models.GrupoDAO(connection);
    
    grupoDao.listar(function(error, grupos){
        connection.end();
        console.log(grupos)
        if( error ) {
            res.render('grupo', { validacao : {}, grupos : {}, sessao: {} });
            return;
        }
        res.render('grupo', { validacao : {}, grupos : grupos, sessao: {} });
    });
}

module.exports.editar = function( application, req, res ){
    
    var connection = application.config.dbConnection();
    var grupoDao = new application.app.models.GrupoDAO(connection);
    
    grupoDao.editar( req.params._id, function(error, grupos){
        connection.end();
        if( error ) {
            res.render('grupoEditar', { validacao : [ {'msg': error.sqlMessage }], grupos : {}, sessao: req.session.usuario });
            return;
        }
        res.render('grupoEditar', { validacao : {}, grupos : grupos, sessao: req.session.usuario });
    });
}

module.exports.excluir = function( application, req, res ){
    
    var connection = application.config.dbConnection();
    var grupoDao = new application.app.models.GrupoDAO(connection);
    
    grupoDao.excluir( req.params._id, function(error, grupos){
        if( error ) {
            if(error.errno != undefined && error.errno == 1451) { 
                grupoDao.listar(function(error, grupos){                    
                    res.render('grupoListar', { validacao : [ {'msg': "Não se pode excluir dados com vínculos em outras tabelas." }], grupos : grupos, sessao: req.session.usuario });
                    connection.end();
                });
            } else {                
                res.render('grupo', { validacao : [ {'msg': error.sqlMessage ? error.sqlMessage : error }], grupos : {}, sessao: req.session.usuario });
            }
            return;
        }
        connection.end();
        res.redirect("/grupo");
    });
}

module.exports.salvar = function( application, req, res ){

    
    var dadosForms = req.body;
    req.assert('nome', 'Razão é obrigatório').notEmpty();       
    var erros = req.validationErrors();

    if(erros){
        res.render('grupo', {validacao: erros,  grupos: {}, sessao: {}});
        return;
    }
    
    var connection = application.config.dbConnection();
    var grupoDao = new application.app.models.GrupoDAO(connection);        
    
    grupoDao.salvar(dadosForms, function(error, result){
        connection.end();   
        if( error ) {
            console.log(error)
        
            res.render('grupo', { validacao : error, grupos : {}, sessao: {} });
            return;
        }
        res.redirect('/grupo');
    });
     
}