module.exports.index = function( application, req, res ){
    
    var connection = application.config.dbConnection();
    var clienteDao = new application.app.models.ClienteDAO(connection);
    
    clienteDao.listar(function(error, clientes){
        connection.end();
        console.log(clientes)
        if( error ) {
            res.render('cliente', { validacao : {}, clientes : {}, sessao: {} });
            return;
        }
        res.render('cliente', { validacao : {}, clientes : clientes, sessao: {} });
    });
}

module.exports.editar = function( application, req, res ){
    
    var connection = application.config.dbConnection();
    var clienteDao = new application.app.models.ClienteDAO(connection);
    
    clienteDao.editar( req.params._id, function(error, clientes){
        connection.end();
        if( error ) {
            res.render('clienteEditar', { validacao : [ {'msg': error.sqlMessage }], clientes : {}, sessao: req.session.usuario });
            return;
        }
        res.render('clienteEditar', { validacao : {}, clientes : clientes, sessao: req.session.usuario });
    });
}

module.exports.excluir = function( application, req, res ){
    
    var connection = application.config.dbConnection();
    var clienteDao = new application.app.models.ClienteDAO(connection);
    
    clienteDao.excluir( req.params._id, function(error, clientes){
        if( error ) {
            if(error.errno != undefined && error.errno == 1451) { 
                clienteDao.listar(function(error, clientes){                    
                    res.render('clienteListar', { validacao : [ {'msg': "Não se pode excluir dados com vínculos em outras tabelas." }], clientes : clientes, sessao: req.session.usuario });
                    connection.end();
                });
            } else {                
                res.render('cliente', { validacao : [ {'msg': error.sqlMessage ? error.sqlMessage : error }], clientes : {}, sessao: req.session.usuario });
            }
            return;
        }
        connection.end();
        res.redirect("/cliente");
    });
}

module.exports.salvar = function( application, req, res ){

    
    var dadosForms = req.body;
    req.assert('cgccpf', 'cnpj é obrigatório').notEmpty();
    req.assert('nome', 'Razão é obrigatório').notEmpty();       
    var erros = req.validationErrors();

    if(erros){
        res.render('cliente', {validacao: erros,  clientes: {}, sessao: {}});
        return;
    }

    
    if( dadosForms.consumidor == "on" ) {
        dadosForms.consumidor = "S";
    } else {
        dadosForms.consumidor = "N";    
    }
    var connection = application.config.dbConnection();
    var clienteDao = new application.app.models.ClienteDAO(connection);        
    
    clienteDao.salvar(dadosForms, function(error, result){
        connection.end();   
        if( error ) {
            console.log(error)
        
            res.render('cliente', { validacao : error, clientes : {}, sessao: {} });
            return;
        }
        res.redirect('/cliente');
    });
     
}