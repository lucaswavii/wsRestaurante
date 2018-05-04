function DisponivelDAO( connection ){
	this._connection = connection; 
}

DisponivelDAO.prototype.listar = function( callback) {
	this._connection.query('select * from disponivel order by id', callback);	
}

DisponivelDAO.prototype.salvar = function( disponivel, callback) {	
	if( !disponivel.id ) {
		this._connection.query('insert into disponivel set ?', disponivel, callback);
	} else {
		this._connection.query('update disponivel set ? where id = ?', [ disponivel, disponivel.id], callback);	
	}
}

DisponivelDAO.prototype.editar = function( id, callback) {
	this._connection.query('select * from disponivel where id = ?', id, callback);
}

DisponivelDAO.prototype.excluir = function( id, callback) {	
	console.log(id)
	this._connection.query('delete from disponivel where id = ?', id, callback);	
}

module.exports = function(){
	return DisponivelDAO;
};
