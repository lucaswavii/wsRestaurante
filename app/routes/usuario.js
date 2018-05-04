module.exports = function(application){
    
    application.get('/usuario', function(req, res){
        application.app.controllers.usuario.index(application, req, res);
    });

    application.get('/usuarioNovo', function(req, res){
        application.app.controllers.usuario.novo(application, req, res);
    });

    application.get('/usuarioEditar/:_id', function(req, res){
        application.app.controllers.usuario.editar(application, req, res);
    });

    application.get('/usuarioExcluir/:_id', function(req, res){
        application.app.controllers.usuario.excluir(application, req, res);
    });

    application.post('/usuarioSalvar', function(req, res){
        application.app.controllers.usuario.salvar(application, req, res);
    });
}