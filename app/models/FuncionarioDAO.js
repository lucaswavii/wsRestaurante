function FuncionarioDAO( connection ){
	this._connection = connection; 
}

FuncionarioDAO.prototype.listar = function( callback) {
	this._connection.query('select * from FUNCIONARIO order by id', callback);	
}

FuncionarioDAO.prototype.salvar = function( Funcionario, callback) {	
	if( !Funcionario.id ) {
		this._connection.query('insert into FUNCIONARIO set ?', Funcionario, callback);
	} else {
		this._connection.query('update FUNCIONARIO set ? where id = ?', [ Funcionario, Funcionario.id], callback);	
	}
}

FuncionarioDAO.prototype.editar = function( id, callback) {
	this._connection.query('select * from FUNCIONARIO where id = ?', id, callback);
}

FuncionarioDAO.prototype.excluir = function( id, callback) {	
	console.log(id)
	this._connection.query('delete from FUNCIONARIO where id = ?', id, callback);	
}

module.exports = function(){
	return FuncionarioDAO;
};
