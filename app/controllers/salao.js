module.exports.index = function( application, req, res ){

    var connection = application.config.dbConnection();
    var caixaDao = new application.app.models.CaixaDAO(connection);
    var pdvDao = new application.app.models.PdvDAO(connection);
    var funcionarioDao = new application.app.models.FuncionarioDAO(connection);
    var MesaDao = new application.app.models.MesaDAO(connection);
    var salaoDao = new application.app.models.SalaoDAO(connection);
    var clienteDao = new application.app.models.ClienteDAO(connection);
    
    this._meuIp = require('ip');        
    var ip = this._meuIp.address();
    
    caixaDao.listar(function(error, caixas ){
        if( error ) {
            
            res.render('pdv', { validacao : [{'msg': 'O caixa não pode ser aberto! Configure o caixa com o ip ' + ip + '.'}], caixa: rta, caixas: {}, pdvs : {}, empresas: {}, funcionarios: {}, sessao: {} });
            return;
        }	    

        var rta =  caixas.find(
            (it) => {
              return it.ip === ip;
            });

        if( rta == undefined ) {            
            connection.end();
            res.render('pdv', { validacao : [{'msg': 'O caixa não pode ser aberto! Configure o caixa com o ip ' + ip + '.'}], caixa: rta, caixas: {}, pdvs : {}, empresas: {}, funcionarios: {}, sessao: {} });
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

    var idVenda = req.params._id;
    
    var connection = application.config.dbConnection();
    var categoriaDao = new application.app.models.CategoriaDAO(connection);     
    var produtosDao = new application.app.models.ProdutoDAO(connection); 
    var itemDao = new application.app.models.ItensDAO(connection); 
    var salaoDao = new application.app.models.SalaoDAO(connection);        
    var funcionarioDao = new application.app.models.FuncionarioDAO(connection);
    var MesaDao = new application.app.models.MesaDAO(connection);
    var condicaoPagamentoDao = new application.app.models.CondicaoPagamentoDAO(connection);
    var pagamentoDao = new application.app.models.PagamentoDAO(connection);

    pagamentoDao.listar( idVenda, function(error, pagamentos ){ 

        condicaoPagamentoDao.listar(function(error, condicaoPagamentos){

            pagamentoDao.listar(idVenda, function(error, pagamentos){

                salaoDao.editar(idVenda, function(error, saloes){

                    funcionarioDao.editar(saloes[0].atendente, function(error, funcionarios){

                        MesaDao.editar(saloes[0].mesa, function(error, mesas){

                            itemDao.listar( idVenda, function(error, itens ){

                                categoriaDao.listar(function(error, categorias ){
                                
                                    produtosDao.listar(function(error, produtos ){
                                
                                        connection.end(); 
                                        res.render('itens', { validacao: {},  idVenda: idVenda, pagamentos:pagamentos, condicaoPagamentos:condicaoPagamentos, itens:itens, categorias:categorias, produtos:produtos, saloes:saloes, mesas:mesas, funcionarios: funcionarios, sessao: {} });
                                    });
                                });
                            }); 
                        });  
                    });
                });
            });
        });
    });
}

module.exports.incluirItens = function( application, req, res ){

    var dadosForms = req.body;
    var idVenda = req.params._id
    var connection = application.config.dbConnection();    
    var itemDao = new application.app.models.ItensDAO(connection); 
    var produtosDao = new application.app.models.ProdutoDAO(connection); 
    var categoriaDao = new application.app.models.CategoriaDAO(connection);  
    var salaoDao = new application.app.models.SalaoDAO(connection);        
    var condicaoPagamentoDao = new application.app.models.CondicaoPagamentoDAO(connection);
    var idVenda = req.params._id;
    
    var produtosDao = new application.app.models.ProdutoDAO(connection); 
    var itemDao = new application.app.models.ItensDAO(connection); 
    var salaoDao = new application.app.models.SalaoDAO(connection);        
    var funcionarioDao = new application.app.models.FuncionarioDAO(connection);
    var MesaDao = new application.app.models.MesaDAO(connection);
    var condicaoPagamentoDao = new application.app.models.CondicaoPagamentoDAO(connection);
    var pagamentoDao = new application.app.models.PagamentoDAO(connection);
    
       
    pagamentoDao.listar( idVenda, function(error, pagamentos ){ 
   
        condicaoPagamentoDao.listar(function(error, condicaoPagamentos){

            salaoDao.editar(idVenda, function(error, salao){
            
                dadosForms.total = dadosForms.quantidade * dadosForms.unitario
                
                produtosDao.editar( dadosForms.produto, function(error, produtos ){
                
                    if( produtos[0].estoque >= dadosForms.quantidade ) { 
                        
                        produtos[0].estoque -= dadosForms.quantidade;
                        
                        itemDao.salvar( dadosForms, function(error, itens ){
                            produtosDao.salvar( produtos[0], function(error, produtos ){
                                connection.end(); 
                                res.redirect("/itens/" + idVenda ) 
                            });
                        });
                    } else {
                        var msg = "O produto " + produtos[0].nome + " não possui estoque para atender esta demanda.";
                        itemDao.listar( idVenda, function(error, itens ){
                            categoriaDao.listar(function(error, categorias ){
                                produtosDao.listar(function(error, produtos ){
                                    connection.end(); 
                                    res.render('itens', { validacao: [{'msg': msg}],  idVenda: idVenda, pagamentos:pagamentos, condicaoPagamentos:condicaoPagamentos, itens:itens, categorias:categorias, produtos:produtos, sessao: {} });
                                });
                            });
                        });    
                    }
                    
                });
            });
        });
    });
}

module.exports.cancelarItens = function( application, req, res ){

    var params = req.params._id
    var idItem = params.split('&&')[0];
    var idVenda = params.split('&&')[1];

    var connection = application.config.dbConnection();    
    var categoriaDao = new application.app.models.CategoriaDAO(connection);     
    var produtosDao = new application.app.models.ProdutoDAO(connection); 
    var itemDao = new application.app.models.ItensDAO(connection); 
    var salaoDao = new application.app.models.SalaoDAO(connection);        
    var funcionarioDao = new application.app.models.FuncionarioDAO(connection);
    var MesaDao = new application.app.models.MesaDAO(connection);
    var condicaoPagamentoDao = new application.app.models.CondicaoPagamentoDAO(connection);
    
    condicaoPagamentoDao.listar(function(error, condicaoPagamentos){

        salaoDao.editar(idVenda, function(error, salao){
        
            itemDao.editar(idItem, function(error, itens ){
                itens[0].cancelamento = new Date();
                itens[0].cancelador   = 1; // Incluir a sessão do usuário funcionario
                itens[0].total = 0;
                produtosDao.editar( itens[0].produto, function(error, produtos ){
                    
                    produtos[0].estoque += itens[0].quantidade;

                    produtosDao.salvar( produtos[0], function(error, produtos ){});
                    itemDao.salvar( itens[0], function(error, itens ){
                        connection.end(); 
                        res.redirect("/itens/" + idVenda ) 
                    });
                });
                
            });
        });
    });
}

module.exports.itensCategoria = function( application, req, res ){

    var params = req.params._id
    var idCategoria = params.split('&&')[1];
    var idVenda = params.split('&&')[0];

    var connection = application.config.dbConnection();
    var categoriaDao = new application.app.models.CategoriaDAO(connection);     
    var produtosDao = new application.app.models.ProdutoDAO(connection); 
    var itemDao = new application.app.models.ItensDAO(connection); 
    var salaoDao = new application.app.models.SalaoDAO(connection);        
    var funcionarioDao = new application.app.models.FuncionarioDAO(connection);
    var MesaDao = new application.app.models.MesaDAO(connection);
    var condicaoPagamentoDao = new application.app.models.CondicaoPagamentoDAO(connection);
    var pagamentoDao = new application.app.models.PagamentoDAO(connection);
    
    pagamentoDao.listar( idVenda, function(error, pagamentos ){  

        condicaoPagamentoDao.listar(function(error, condicaoPagamentos){

            salaoDao.editar(idVenda, function(error, saloes){

                funcionarioDao.editar(saloes[0].atendente, function(error, funcionarios){

                    MesaDao.editar(saloes[0].mesa, function(error, mesas){

                        salaoDao.editar(idVenda, function(error, salao){

                            itemDao.listar( idVenda, function(error, itens ){
                            
                                categoriaDao.editar(idCategoria, function(error, categorias ){
                            
                                    produtosDao.listar(function(error, produtos ){
                                        connection.end(); 
                                        res.render('itens', { validacao: {},  idVenda: idVenda, pagamentos:pagamentos, mesas:mesas, condicaoPagamentos:condicaoPagamentos,  funcionarios:funcionarios, saloes:saloes, itens:itens, categorias:categorias, produtos:produtos, sessao: {} });
                                    });
                                });
                            });  
                        }); 
                    });
                });
            });
        });
    });
}

module.exports.solicitarConta = function( application, req, res ){
    
    var dadosForms = req.body;
    var idVenda = req.params._id
    
    var connection = application.config.dbConnection();    
    var itemDao = new application.app.models.ItensDAO(connection); 
    var produtosDao = new application.app.models.ProdutoDAO(connection); 
    var categoriaDao = new application.app.models.CategoriaDAO(connection);  
    var salaoDao = new application.app.models.SalaoDAO(connection);        
    var condicaoPagamentoDao = new application.app.models.CondicaoPagamentoDAO(connection);
    var pagamentoDao = new application.app.models.PagamentoDAO(connection);
    var funcionarioDao = new application.app.models.FuncionarioDAO(connection);
    var MesaDao = new application.app.models.MesaDAO(connection);

    if( dadosForms.valor > dadosForms.total  ) {
        var msg = "O valor pago é maior que o valor total.";
        pagamentoDao.listar( idVenda, function(error, pagamentos ){   

            condicaoPagamentoDao.listar(function(error, condicaoPagamentos){

                salaoDao.editar(idVenda, function(error, saloes){
        
                    funcionarioDao.editar(saloes[0].atendente, function(error, funcionarios){
        
                        MesaDao.editar(saloes[0].mesa, function(error, mesas){
        
                            salaoDao.editar(idVenda, function(error, salao){
        
                                itemDao.listar( idVenda, function(error, itens ){
                                
                                    categoriaDao.editar(idCategoria, function(error, categorias ){
                                
                                        produtosDao.listar(function(error, produtos ){
                                            connection.end(); 
                                            res.render('itens', { validacao: [{'msg': msg}],  idVenda: idVenda, pagamentos:pagamentos, mesas:mesas, condicaoPagamentos:condicaoPagamentos,  funcionarios:funcionarios, saloes:saloes, itens:itens, categorias:categorias, produtos:produtos, sessao: {} });
                                        });
                                    });
                                });  
                            }); 
                        });
                    });
                });
            });
        });

    } else {
        var pagamento = { movimento:idVenda, condpagamento: dadosForms.condpagamento, valor: dadosForms.valor };

        pagamentoDao.salvar( pagamento, function(error, pagamentos ){
            
            itemDao.listar( idVenda, function(error, itens ){
                for (var index = 0; index < itens.length; index++) {
                    
                    itens[index].bloqueio = 'S';
''
                    itemDao.salvar( itens[index], function(error, itens ){});
                }
                
            });
            connection.end(); 
            res.redirect("/itens/" + idVenda ) 
        });
        
    }
    
}