module.exports = function(application){
    
    application.get('/produto', function(req, res){
        application.app.controllers.produto.index(application, req, res);
    });

    application.get('/produtoNovo', function(req, res){
        application.app.controllers.produto.novo(application, req, res);
    });

    application.get('/produtoEditar/:_id', function(req, res){
        application.app.controllers.produto.editar(application, req, res);
    });

    application.get('/produtoExcluir/:_id', function(req, res){
        application.app.controllers.produto.excluir(application, req, res);
    });

    application.post('/produtoSalvar', function(req, res){
        application.app.controllers.produto.salvar(application, req, res);
    });
}