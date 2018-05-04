module.exports = function(application){
    
    application.get('/categoria', function(req, res){
        application.app.controllers.categoria.index(application, req, res);
    });

    application.get('/categoriaNovo', function(req, res){
        application.app.controllers.categoria.novo(application, req, res);
    });

    application.get('/categoriaEditar/:_id', function(req, res){
        application.app.controllers.categoria.editar(application, req, res);
    });

    application.get('/categoriaExcluir/:_id', function(req, res){
        application.app.controllers.categoria.excluir(application, req, res);
    });

    application.post('/categoriaSalvar', function(req, res){
        application.app.controllers.categoria.salvar(application, req, res);
    });
}