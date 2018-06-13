module.exports.index = function( application, req, res ){

    var connection = application.config.dbConnection();
    var MesaDao = new application.app.models.MesaDAO(connection);
    var caixaDao = new application.app.models.CaixaDAO(connection);
    var pdvDao = new application.app.models.PdvDAO(connection);
    var funcionarioDao = new application.app.models.FuncionarioDAO(connection);
    var salaoDao = new application.app.models.SalaoDAO(connection);
    var clienteDao = new application.app.models.ClienteDAO(connection);
    
    this._meuIp = require('ip');        
    var ip = this._meuIp.address();
    
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
            clienteDao.listar(function(error, clientes ){
                pdvDao.listar(rta, function(error, pdvs ){
                    salaoDao.listar(pdvs[0], function(error, salao ){
                        MesaDao.listar(function(error, mesas ){
                            funcionarioDao.listar(function(error, atendentes ){
                                funcionarioDao.editar( pdvs[0].operador, function(error, funcionarios ){
                                    if( error ) { 
                                        connection.end();                               
                                        res.render('pdv', { validacao : error, caixa: rta, caixas: caixas, pdvs : {}, funcionarios: funcionarios, sessao: {} });
                                        return;
                                    }
                                    
                                    connection.end();
                                    res.render('salao', { validacao : {}, clientes: clientes, atendentes:atendentes, salao:salao, mesas: mesas, caixa: rta, caixas: caixas, pdvs : pdvs, funcionarios: funcionarios, atendentes:atendentes, sessao: {} });
                                });
                            });
                        });
                    });
                });
            });
        }
    });
}


module.exports.abertura = function( application, req, res ){

    var dadosForms = req.body;
    
    var connection = application.config.dbConnection();
    var salaoDao = new application.app.models.SalaoDAO(connection);        
    
    salaoDao.novo(dadosForms, function(error, result){
        connection.end();  
    
        res.redirect('/salao');
    });
     
}

module.exports.itens = function( application, req, res ){

    var connection = application.config.dbConnection();
    var categoriaDao = new application.app.models.CategoriaDAO(connection);     
    var produtosDao = new application.app.models.ProdutoDAO(connection); 
    var itemDao = new application.app.models.ItensDAO(connection); 
        
    var idVenda = req.params._id
    itemDao.listar( idVenda, function(error, itens ){
        categoriaDao.listar(function(error, categorias ){
            produtosDao.listar(function(error, produtos ){
                res.render('itens', { validacao: {},  idVenda: idVenda, itens:itens, categorias:categorias, produtos:produtos, sessao: {} });
            });
        });
    });    
}

module.exports.incluirItens = function( application, req, res ){
    var dadosForms = req.body;
    var idVenda = req.params._id
    var connection = application.config.dbConnection();    
    var itemDao = new application.app.models.ItensDAO(connection); 

    dadosForms.total = dadosForms.quantidade * dadosForms.unitario
    itemDao.salvar( dadosForms, function(error, itens ){
        console.log(error)
        res.redirect("/itens/" + idVenda )
    });

}
