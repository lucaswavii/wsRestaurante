module.exports = function(application){
    
    application.get('/disponivel', function(req, res){
        application.app.controllers.disponivel.index(application, req, res);
    });

    application.get('/disponivelNovo', function(req, res){
        application.app.controllers.disponivel.novo(application, req, res);
    });

    application.get('/disponivelEditar/:_id', function(req, res){
        application.app.controllers.disponivel.editar(application, req, res);
    });

    application.get('/disponivelExcluir/:_id', function(req, res){
        application.app.controllers.disponivel.excluir(application, req, res);
    });

    application.post('/disponivelSalvar', function(req, res){
        application.app.controllers.disponivel.salvar(application, req, res);
    });
}