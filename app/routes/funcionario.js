module.exports = function(application){
    
    application.get('/funcionario', function(req, res){
        application.app.controllers.funcionario.index(application, req, res);
    });

    application.get('/funcionarioNovo', function(req, res){
        application.app.controllers.funcionario.novo(application, req, res);
    });

    application.get('/funcionarioEditar/:_id', function(req, res){
        application.app.controllers.funcionario.editar(application, req, res);
    });

    application.get('/funcionarioExcluir/:_id', function(req, res){
        application.app.controllers.funcionario.excluir(application, req, res);
    });

    application.post('/funcionarioSalvar', function(req, res){
        application.app.controllers.funcionario.salvar(application, req, res);
    });
}