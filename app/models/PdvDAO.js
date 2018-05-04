function PdvDAO( connection ){
	this._connection = connection; 
}

PdvDAO.prototype.listar = function( pdv, callback) {
	this._connection.query('select * from pdv where caixa = ? and data = CURDATE()  order by id', pdv.id, callback);	
}

PdvDAO.prototype.aberturaPdv = function( pdv, callback) {
    	
	if( !pdv.id ) {
		this._connection.query('insert into pdv set ?', pdv, callback);
	} else {
		this._connection.query('update pdv set ? where id = ?', [ pdv, pdv.id], callback);	
	}
}

PdvDAO.prototype.editar = function( id, callback) {
	this._connection.query('select * from pdv where id = ?', id, callback);
}

PdvDAO.prototype.excluir = function( id, callback) {	
	console.log(id)
	this._connection.query('delete from pdv where id = ?', id, callback);	
}

module.exports = function(){
	return PdvDAO;
};
