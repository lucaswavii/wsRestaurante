module.exports = function(application){
    
    application.get('/salao', function(req, res){
        application.app.controllers.salao.index(application, req, res);
    });

    application.post('/aberturaMesa', function(req, res){
        application.app.controllers.salao.abertura(application, req, res);
    });
}