module.exports = function(application){
    
    application.get('/caixa', function(req, res){
        application.app.controllers.caixa.index(application, req, res);
    });

    application.get('/caixaNovo', function(req, res){
        application.app.controllers.caixa.novo(application, req, res);
    });

    application.get('/caixaEditar/:_id', function(req, res){
        application.app.controllers.caixa.editar(application, req, res);
    });

    application.get('/caixaExcluir/:_id', function(req, res){
        application.app.controllers.caixa.excluir(application, req, res);
    });

    application.post('/caixaSalvar', function(req, res){
        application.app.controllers.caixa.salvar(application, req, res);
    });
}