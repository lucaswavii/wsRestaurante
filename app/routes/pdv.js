module.exports = function(application){
    
    application.get('/pdv', function(req, res){
        application.app.controllers.pdv.index(application, req, res);
    });

    application.post('/aberturaCaixa', function(req, res){
        application.app.controllers.pdv.abertura(application, req, res);
    });
}