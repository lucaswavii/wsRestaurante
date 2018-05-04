module.exports.index = function( application, req, res ){
    
    this._meuIp = require('ip');        
    var ip = this._meuIp.address();
    
    var connection = application.config.dbConnection();
    var caixaDao = new application.app.models.CaixaDAO(connection);
    var pdvDao = new application.app.models.PdvDAO(connection);
    var funcionarioDao = new application.app.models.FuncionarioDAO(connection);
    
    caixaDao.listar(function(error, caixas ){
        
        if( error ) {
            res.render('pdv', { validacao : {}, caixa: rta, caixa: {}, pdvs : {}, funcionarios:{}, sessao: {} });
            return;
        }	    

        var rta =  caixas.find(
            (it) => {
              return it.ip === ip;
            });

        if( rta == undefined ) {
                connection.end();
                res.render('pdv', { validacao : [{'msg': 'O caixa não pode ser aberto! Configure o caixa com o ip ' + ip + '.'}], caixa: rta,  caixa: {}, pdvs : {}, funcionarios:{}, sessao: {} });
        } else {
            funcionarioDao.listar(function(error, funcionarios ){
                
                pdvDao.listar(rta.ip, function(error, pdvs ){
                    if( error ) {
                        res.render('pdv', { validacao : error, caixa: rta, caixas: caixas, pdvs : {}, funcionarios: funcionarios, sessao: {} });
                        return;
                    }
                    connection.end();
                    res.render('pdv', { validacao : {}, caixa: rta, caixas: caixas, pdvs : pdvs, funcionarios: funcionarios, sessao: {} });
                });
            });
        }
         
    });
}


module.exports.abertura = function( application, req, res ){

    
    var dadosForms = req.body;
    
    var connection = application.config.dbConnection();
    var pdvDao = new application.app.models.PdvDAO(connection);        
    
    pdvDao.aberturaPdv(dadosForms, function(error, result){
        connection.end();   
       console.log(error)
        res.redirect('/pdv');
    });
     
}