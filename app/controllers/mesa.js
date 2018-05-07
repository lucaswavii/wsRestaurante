module.exports.index = function( application, req, res ){
    
    var connection = application.config.dbConnection();
    var MesaDao = new application.app.models.MesaDAO(connection);
    var empresaDao = new application.app.models.EmpresaDAO(connection);

    MesaDao.listar(function(error, mesas){
        empresaDao.listar(function(error, empresas ){
            connection.end();
            
            if( error ) {
                res.render('mesa', { validacao : {}, mesas : {}, empresas:empresas, sessao: {} });
                return;
            }
            res.render('mesa', { validacao : {}, mesas : mesas, empresas:empresas, sessao: {} });
        });
    });
}

module.exports.editar = function( application, req, res ){
    
    var connection = application.config.dbConnection();
    var MesaDao = new application.app.models.MesaDAO(connection);
    var empresaDao = new application.app.models.EmpresaDAO(connection);

    MesaDao.editar( req.params._id, function(error, mesas){
        empresaDao.listar(function(error, empresas ){
            connection.end();
            if( error ) {
                res.render('mesaEditar', { validacao : [ {'msg': error.sqlMessage }], mesas : {}, empresas: empresas, sessao: req.session.usuario });
                return;
            }
            res.render('mesaEditar', { validacao : {}, mesas : mesas, empresas: empresas, sessao: req.session.usuario });
        });
    });
}

module.exports.excluir = function( application, req, res ){
    
    var connection = application.config.dbConnection();
    var MesaDao = new application.app.models.MesaDAO(connection);
    
    MesaDao.excluir( req.params._id, function(error, mesas){
        if( error ) {
            if(error.errno != undefined && error.errno == 1451) { 
                MesaDao.listar(function(error, mesas){                    
                    res.render('mesaListar', { validacao : [ {'msg': "Não se pode excluir dados com vínculos em outras tabelas." }], mesas : mesas, sessao: req.session.usuario });
                    connection.end();
                });
            } else {                
                res.render('mesa', { validacao : [ {'msg': error.sqlMessage ? error.sqlMessage : error }], mesas : {}, empresas: {}, sessao: req.session.usuario });
            }
            return;
        }
        connection.end();
        res.redirect("/mesa");
    });
}

module.exports.salvar = function( application, req, res ){

    
    var dadosForms = req.body;
    req.assert('nome', 'Razão é obrigatório').notEmpty();       
    var erros = req.validationErrors();

    if(erros){
        res.render('mesa', {validacao: erros,  mesas: {}, empresas: {}, sessao: {}});
        return;
    }
    
    var connection = application.config.dbConnection();
    var MesaDao = new application.app.models.MesaDAO(connection);        
    
    MesaDao.salvar(dadosForms, function(error, result){
        connection.end();   
        if( error ) {
            console.log(error)
        
            res.render('mesa', { validacao : error, mesas : {}, empresas: {}, sessao: {} });
            return;
        }
        res.redirect('/mesa');
    });
     
}