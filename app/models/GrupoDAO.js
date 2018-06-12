function GrupoDAO( connection ){
	this._connection = connection; 
}

GrupoDAO.prototype.listar = function( callback) {
	this._connection.query('select * from GRUPO order by id', callback);	
}

GrupoDAO.prototype.salvar = function( grupo, callback) {	
	if( !grupo.id ) {
		this._connection.query('insert into GRUPO set ?', grupo, callback);
	} else {
		this._connection.query('update GRUPO set ? where id = ?', [ grupo, grupo.id], callback);	
	}
}

GrupoDAO.prototype.editar = function( id, callback) {
	this._connection.query('select * from GRUPO where id = ?', id, callback);
}

GrupoDAO.prototype.excluir = function( id, callback) {	
	console.log(id)
	this._connection.query('delete from GRUPO where id = ?', id, callback);	
}

module.exports = function(){
	return GrupoDAO;
};
