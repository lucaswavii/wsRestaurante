module.exports = function(application){
    
    application.get('/mesa', function(req, res){
        application.app.controllers.mesa.index(application, req, res);
    });

    application.get('/mesaNovo', function(req, res){
        application.app.controllers.mesa.novo(application, req, res);
    });

    application.get('/mesaEditar/:_id', function(req, res){
        application.app.controllers.mesa.editar(application, req, res);
    });

    application.get('/mesaExcluir/:_id', function(req, res){
        application.app.controllers.mesa.excluir(application, req, res);
    });

    application.post('/mesaSalvar', function(req, res){
        application.app.controllers.mesa.salvar(application, req, res);
    });
}