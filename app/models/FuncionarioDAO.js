function FuncionarioDAO( connection ){
	this._connection = connection; 
}

FuncionarioDAO.prototype.listar = function( callback) {
	this._connection.query('select * from Funcionario order by id', callback);	
}

FuncionarioDAO.prototype.salvar = function( Funcionario, callback) {	
	if( !Funcionario.id ) {
		this._connection.query('insert into Funcionario set ?', Funcionario, callback);
	} else {
		this._connection.query('update Funcionario set ? where id = ?', [ Funcionario, Funcionario.id], callback);	
	}
}

FuncionarioDAO.prototype.editar = function( id, callback) {
	this._connection.query('select * from Funcionario where id = ?', id, callback);
}

FuncionarioDAO.prototype.excluir = function( id, callback) {	
	console.log(id)
	this._connection.query('delete from Funcionario where id = ?', id, callback);	
}

module.exports = function(){
	return FuncionarioDAO;
};
