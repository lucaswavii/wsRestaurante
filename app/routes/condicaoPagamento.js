module.exports = function(application){
    
    application.get('/condicaoPagamento', function(req, res){
        application.app.controllers.condicaoPagamento.index(application, req, res);
    });

    application.get('/condicaoPagamentoNovo', function(req, res){
        application.app.controllers.condicaoPagamento.novo(application, req, res);
    });

    application.get('/condicaoPagamentoEditar/:_id', function(req, res){
        application.app.controllers.condicaoPagamento.editar(application, req, res);
    });

    application.get('/condicaoPagamentoExcluir/:_id', function(req, res){
        application.app.controllers.condicaoPagamento.excluir(application, req, res);
    });

    application.post('/condicaoPagamentoSalvar', function(req, res){
        application.app.controllers.condicaoPagamento.salvar(application, req, res);
    });
}