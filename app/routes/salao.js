module.exports = function(application){
    
    application.get('/salao', function(req, res){
        application.app.controllers.salao.index(application, req, res);
    });

    application.post('/aberturaMesa', function(req, res){
        application.app.controllers.salao.abertura(application, req, res);
    });

    application.get('/itens/:_id', function(req, res){
        application.app.controllers.salao.itens(application, req, res);
    });

    application.post('/incluirItens/:_id', function(req, res){
        application.app.controllers.salao.incluirItens(application, req, res);
    });

    application.get('/cancelarItens/:_id', function(req, res){
        application.app.controllers.salao.cancelarItens(application, req, res);
    });

    application.get('/itensCategoria/:_id', function(req, res){
        application.app.controllers.salao.itensCategoria(application, req, res);
    });
}