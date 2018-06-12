function PdvDAO( connection ){
	this._connection = connection; 
}

PdvDAO.prototype.listar = function( pdv, callback) {
	this._connection.query('select * from PDV where caixa = ? and data = CURDATE()  order by id', pdv.id, callback);	
}

PdvDAO.prototype.aberturaPdv = function( pdv, callback) {
    	
	if( !pdv.id ) {
		this._connection.query('insert into PDV set ?', pdv, callback);
	} else {
		this._connection.query('update PDV set ? where id = ?', [ pdv, pdv.id], callback);	
	}
}

PdvDAO.prototype.editar = function( id, callback) {
	this._connection.query('select * from PDV where id = ?', id, callback);
}

PdvDAO.prototype.excluir = function( id, callback) {	
	console.log(id)
	this._connection.query('delete from PDV where id = ?', id, callback);	
}

module.exports = function(){
	return PdvDAO;
};
