function CategoriaDAO( connection ){
	this._connection = connection; 
}

CategoriaDAO.prototype.listar = function( callback) {
	this._connection.query('select * from categoria order by id', callback);	
}

CategoriaDAO.prototype.salvar = function( categoria, callback) {	
	if( !categoria.id ) {
		this._connection.query('insert into categoria set ?', categoria, callback);
	} else {
		this._connection.query('update categoria set ? where id = ?', [ categoria, categoria.id], callback);	
	}
}

CategoriaDAO.prototype.editar = function( id, callback) {
	this._connection.query('select * from categoria where id = ?', id, callback);
}

CategoriaDAO.prototype.excluir = function( id, callback) {	
	console.log(id)
	this._connection.query('delete from categoria where id = ?', id, callback);	
}

module.exports = function(){
	return CategoriaDAO;
};
