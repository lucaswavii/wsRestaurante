function DisponivelDAO( connection ){
	this._connection = connection; 
}

DisponivelDAO.prototype.listar = function( callback) {
	this._connection.query('select * from DISPONIVEL order by id', callback);	
}

DisponivelDAO.prototype.salvar = function( disponivel, callback) {	
	if( !disponivel.id ) {
		this._connection.query('insert into DISPONIVEL set ?', disponivel, callback);
	} else {
		this._connection.query('update DISPONIVEL set ? where id = ?', [ disponivel, disponivel.id], callback);	
	}
}

DisponivelDAO.prototype.editar = function( id, callback) {
	this._connection.query('select * from DISPONIVEL where id = ?', id, callback);
}

DisponivelDAO.prototype.excluir = function( id, callback) {	
	
	this._connection.query('delete from DISPONIVEL where id = ?', id, callback);	
}

module.exports = function(){
	return DisponivelDAO;
};
