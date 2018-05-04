module.exports = function(application){
    application.get('/', function(req, res){
        res.render('index');
    });
  
    application.get('/index', function(req, res){		
        res.render('index');
    });

    application.get('/empresa', function(req, res){
        application.app.controllers.empresa.index(application, req, res);
    });
}  