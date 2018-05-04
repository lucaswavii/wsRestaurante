module.exports.index = function( application, req, res ){
    
    var connection = application.config.dbConnection();
    var funcionarioDao = new application.app.models.FuncionarioDAO(connection);
    
    funcionarioDao.listar(function(error, funcionarios){
        connection.end();
        console.log(funcionarios)
        if( error ) {
            res.render('funcionario', { validacao : {}, funcionarios : {}, sessao: {} });
            return;
        }
        res.render('funcionario', { validacao : {}, funcionarios : funcionarios, sessao: {} });
    });
}

module.exports.editar = function( application, req, res ){
    
    var connection = application.config.dbConnection();
    var funcionarioDao = new application.app.models.FuncionarioDAO(connection);
    
    funcionarioDao.editar( req.params._id, function(error, funcionarios){
        connection.end();
        if( error ) {
            res.render('funcionarioEditar', { validacao : [ {'msg': error.sqlMessage }], funcionarios : {}, sessao: req.session.usuario });
            return;
        }
        res.render('funcionarioEditar', { validacao : {}, funcionarios : funcionarios, sessao: req.session.usuario });
    });
}

module.exports.excluir = function( application, req, res ){
    
    var connection = application.config.dbConnection();
    var funcionarioDao = new application.app.models.FuncionarioDAO(connection);
    
    funcionarioDao.excluir( req.params._id, function(error, funcionarios){
        if( error ) {
            if(error.errno != undefined && error.errno == 1451) { 
                funcionarioDao.listar(function(error, funcionarios){                    
                    res.render('funcionarioListar', { validacao : [ {'msg': "Não se pode excluir dados com vínculos em outras tabelas." }], funcionarios : funcionarios, sessao: req.session.usuario });
                    connection.end();
                });
            } else {                
                res.render('funcionario', { validacao : [ {'msg': error.sqlMessage ? error.sqlMessage : error }], funcionarios : {}, sessao: req.session.usuario });
            }
            return;
        }
        connection.end();
        res.redirect("/funcionario");
    });
}

module.exports.salvar = function( application, req, res ){

    
    var dadosForms = req.body;
    req.assert('cpf', 'cnpj é obrigatório').notEmpty();
    req.assert('nome', 'Razão é obrigatório').notEmpty();       
    var erros = req.validationErrors();

    if(erros){
        res.render('Funcionario', {validacao: erros,  funcionarios: {}, sessao: {}});
        return;
    }
    
    var connection = application.config.dbConnection();
    var funcionarioDao = new application.app.models.FuncionarioDAO(connection);        
    
    funcionarioDao.salvar(dadosForms, function(error, result){
        connection.end();   
        if( error ) {
            console.log(error)
        
            res.render('funcionario', { validacao : error, funcionarios : {}, sessao: {} });
            return;
        }
        res.redirect('/funcionario');
    });
     
}