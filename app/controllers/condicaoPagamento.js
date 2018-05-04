module.exports.index = function( application, req, res ){
    
    var connection = application.config.dbConnection();
    var condicaoPagamentoDao = new application.app.models.CondicaoPagamentoDAO(connection);
    
    condicaoPagamentoDao.listar(function(error, condicaoPagamentos){
        connection.end();
        console.log(condicaoPagamentos)
        if( error ) {
            res.render('condicaoPagamento', { validacao : {}, condicaoPagamentos : {}, sessao: {} });
            return;
        }
        res.render('condicaoPagamento', { validacao : {}, condicaoPagamentos : condicaoPagamentos, sessao: {} });
    });
}

module.exports.editar = function( application, req, res ){
    
    var connection = application.config.dbConnection();
    var condicaoPagamentoDao = new application.app.models.CondicaoPagamentoDAO(connection);
    
    condicaoPagamentoDao.editar( req.params._id, function(error, condicaoPagamentos){
        connection.end();
        if( error ) {
            res.render('condicaoPagamentosEditar', { validacao : [ {'msg': error.sqlMessage }], condicaoPagamentos : {}, sessao: req.session.usuario });
            return;
        }
        res.render('condicaoPagamentosEditar', { validacao : {}, condicaoPagamentos : condicaoPagamentos, sessao: req.session.usuario });
    });
}

module.exports.excluir = function( application, req, res ){
    
    var connection = application.config.dbConnection();
    var condicaoPagamentoDao = new application.app.models.CondicaoPagamentoDAO(connection);
    
    condicaoPagamentoDao.excluir( req.params._id, function(error, condicaoPagamentos){
        if( error ) {
            if(error.errno != undefined && error.errno == 1451) { 
                condicaoPagamentoDao.listar(function(error, condicaoPagamentos){                    
                    res.render('condicaoPagamentoListar', { validacao : [ {'msg': "Não se pode excluir dados com vínculos em outras tabelas." }], condicaoPagamentos : condicaoPagamentos, sessao: req.session.usuario });
                    connection.end();
                });
            } else {                
                res.render('condicaoPagamento', { validacao : [ {'msg': error.sqlMessage ? error.sqlMessage : error }], condicaoPagamentos : {}, sessao: req.session.usuario });
            }
            return;
        }
        connection.end();
        res.redirect("/condicaoPagamento");
    });
}

module.exports.salvar = function( application, req, res ){

    
    var dadosForms = req.body;
    req.assert('nome', 'Razão é obrigatório').notEmpty();       
    var erros = req.validationErrors();

    if(erros){
        res.render('condicaoPagamento', {validacao: erros,  condicaoPagamentos: {}, sessao: {}});
        return;
    }
    if( dadosForms.financeiro == 'on' ) {
        dadosForms.financeiro = 'S'
    } else {
        dadosForms.financeiro = 'N'    
    }
    var connection = application.config.dbConnection();
    var condicaoPagamentoDao = new application.app.models.CondicaoPagamentoDAO(connection);        
    
    condicaoPagamentoDao.salvar(dadosForms, function(error, result){
        connection.end();   
        if( error ) {
            console.log(error)
        
            res.render('condicaoPagamento', { validacao : error, condicaoPagamentos : {}, sessao: {} });
            return;
        }
        res.redirect('/condicaoPagamento');
    });
     
}