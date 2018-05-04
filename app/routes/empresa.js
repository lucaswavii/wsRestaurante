module.exports = function(application){
    
    application.get('/empresa', function(req, res){
        application.app.controllers.empresa.index(application, req, res);
    });

    application.get('/empresaNovo', function(req, res){
        application.app.controllers.empresa.novo(application, req, res);
    });

    application.get('/empresaEditar/:_id', function(req, res){
        application.app.controllers.empresa.editar(application, req, res);
    });

    application.get('/empresaExcluir/:_id', function(req, res){
        application.app.controllers.empresa.excluir(application, req, res);
    });

    application.post('/empresaSalvar', function(req, res){
        application.app.controllers.empresa.salvar(application, req, res);
    });
}