module.exports.index = function( application, req, res ){
    
    var connection = application.config.dbConnection();
    var usuarioDao = new application.app.models.UsuarioDAO(connection);
    var grupoDao = new application.app.models.GrupoDAO(connection);
    var empresaDao = new application.app.models.EmpresaDAO(connection);
    var funcionarioDao = new application.app.models.FuncionarioDAO(connection);

    funcionarioDao.listar(function(error, funcionarios){
        usuarioDao.listar(function(error, usuarios){
            grupoDao.listar(function(error, grupos){
                empresaDao.listar(function(error, empresas){
                    connection.end();
                    if( error ) {
                        res.render('usuario', { validacao : {}, usuarios : usuarios,  grupos: grupos,funcionarios: funcionarios, empresas: empresas, sessao: {} });
                        return;
                    }
                    res.render('usuario', { validacao : {}, usuarios : usuarios,  grupos: grupos,funcionarios: funcionarios, empresas: empresas, sessao: {} });
                });
            });
        });
    });
}


module.exports.excluir = function( application, req, res ){
    
    var connection = application.config.dbConnection();
    var connection = application.config.dbConnection();
    var usuarioDao = new application.app.models.UsuarioDAO(connection);
    var grupoDao = new application.app.models.GrupoDAO(connection);
    var empresaDao = new application.app.models.EmpresaDAO(connection);
    var funcionarioDao = new application.app.models.FuncionarioDAO(connection);
    
    usuarioDao.excluir( req.params._id, function(error, usuarios){
        if( error ) {
            funcionarioDao.listar(function(error, funcionarios){
                usuarioDao.listar(function(error, usuarios){
                    grupoDao.listar(function(error, grupos){
                        empresaDao.listar(function(error, empresas){
                            connection.end();
                            res.render('usuario', { validacao : {}, usuarios : usuarios,  grupos: grupos,funcionarios: funcionarios, empresas: empresas, sessao: {} });
                            return;
                        });        
                    });
                });
            });
        }
        connection.end();
        res.redirect("/usuario");
    });
}

module.exports.salvar = function( application, req, res ){
    
    var connection = application.config.dbConnection();
    var usuarioDao = new application.app.models.UsuarioDAO(connection);
    var grupoDao = new application.app.models.GrupoDAO(connection);
    var empresaDao = new application.app.models.EmpresaDAO(connection);
    var funcionarioDao = new application.app.models.FuncionarioDAO(connection);
    
    var dadosForms = req.body;
    req.assert('nome', 'Nome é obrigatório').notEmpty();       
    req.assert('senha', 'Senha é obrigatório').notEmpty();
    req.assert('grupo', 'Grupo é obrigatório').notEmpty();
    req.assert('empresa', 'Empresa é obrigatório').notEmpty();
    
    var erros = req.validationErrors();

    if(erros){
        funcionarioDao.listar(function(error, funcionarios){
            usuarioDao.listar(function(error, usuarios){
                grupoDao.listar(function(error, grupos){
                    empresaDao.listar(function(error, empresas){
                        connection.end();
            
                        if( error ) {
                            res.render('usuario', { validacao : {}, usuarios : usuarios,  grupos: grupos,funcionarios: funcionarios, empresas: empresas, sessao: {} });
                            return;
                        }
                        res.render('usuario', { validacao : {}, usuarios : usuarios,  grupos: grupos, empresas: empresas, sessao: {} });
                        return;
                    });
                    
                });                
            });            
        });
    }
    
    
    usuarioDao.salvar(dadosForms, function(error, result){
        if( error ) {
            usuarioDao.listar(function(error, usuarios){
                grupoDao.listar(function(error, grupos){
                    empresaDao.listar(function(error, empresas){
                        connection.end();
                        res.render('usuario', { validacao : {}, usuarios : usuarios,  grupos: grupos,funcionarios: funcionarios, empresas: empresas, sessao: {} });
                        return;
                    });
                });
            });                
        }
    
        connection.end();   
        res.redirect('/usuario');
    });
     
}