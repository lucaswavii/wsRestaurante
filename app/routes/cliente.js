module.exports = function(application){
    
    application.get('/cliente', function(req, res){
        application.app.controllers.cliente.index(application, req, res);
    });

    application.get('/clienteNovo', function(req, res){
        application.app.controllers.cliente.novo(application, req, res);
    });

    application.get('/clienteEditar/:_id', function(req, res){
        application.app.controllers.cliente.editar(application, req, res);
    });

    application.get('/clienteExcluir/:_id', function(req, res){
        application.app.controllers.cliente.excluir(application, req, res);
    });

    application.post('/clienteSalvar', function(req, res){
        application.app.controllers.cliente.salvar(application, req, res);
    });
}