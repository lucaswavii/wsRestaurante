module.exports = function(application){
    
    application.get('/grupo', function(req, res){
        application.app.controllers.grupo.index(application, req, res);
    });

    application.get('/grupoNovo', function(req, res){
        application.app.controllers.grupo.novo(application, req, res);
    });

    application.get('/grupoEditar/:_id', function(req, res){
        application.app.controllers.grupo.editar(application, req, res);
    });

    application.get('/grupoExcluir/:_id', function(req, res){
        application.app.controllers.grupo.excluir(application, req, res);
    });

    application.post('/grupoSalvar', function(req, res){
        application.app.controllers.grupo.salvar(application, req, res);
    });
}