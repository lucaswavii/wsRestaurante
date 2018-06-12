function MesaDAO( connection ){
	this._connection = connection; 
}

MesaDAO.prototype.listar = function( callback) {
	this._connection.query('select * from MESA order by id', callback);	
}

MesaDAO.prototype.salvar = function( mesa, callback) {	
	if( !mesa.id ) {
		this._connection.query('insert into MESA set ?', mesa, callback);
	} else {
		this._connection.query('update MESA set ? where id = ?', [ mesa, mesa.id], callback);	
	}
}

MesaDAO.prototype.editar = function( id, callback) {
	this._connection.query('select * from MESA where id = ?', id, callback);
}

MesaDAO.prototype.excluir = function( id, callback) {	
	console.log(id)
	this._connection.query('delete from MESA where id = ?', id, callback);	
}

module.exports = function(){
	return MesaDAO;
};
