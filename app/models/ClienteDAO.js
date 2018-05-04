function ClienteDAO( connection ){
	this._connection = connection; 
}

ClienteDAO.prototype.listar = function( callback) {
	this._connection.query('select * from cliente order by id', callback);	
}

ClienteDAO.prototype.salvar = function( cliente, callback) {	
	if( !cliente.id ) {
		this._connection.query('insert into cliente set ?', cliente, callback);
	} else {
		this._connection.query('update cliente set ? where id = ?', [ cliente, cliente.id], callback);	
	}
}

ClienteDAO.prototype.editar = function( id, callback) {
	this._connection.query('select * from cliente where id = ?', id, callback);
}

ClienteDAO.prototype.excluir = function( id, callback) {	
	console.log(id)
	this._connection.query('delete from cliente where id = ?', id, callback);	
}

module.exports = function(){
	return ClienteDAO;
};
