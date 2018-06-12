function UsuarioDAO( connection ){
	this._connection = connection; 
}

UsuarioDAO.prototype.listar = function( callback) {
	this._connection.query('select * from USUARIO order by id', callback);	
}

UsuarioDAO.prototype.salvar = function( usuario, callback) {	
	if( !usuario.id ) {
		this._connection.query('insert into USUARIO set ?', usuario, callback);
	} else {
		this._connection.query('update USUARIO set ? where id = ?', [ usuario, usuario.id], callback);	
	}
}

UsuarioDAO.prototype.editar = function( id, callback) {
	this._connection.query('select * from USUARIO where id = ?', id, callback);
}

UsuarioDAO.prototype.excluir = function( id, callback) {	
	
	this._connection.query('delete from USUARIO where id = ?', id, callback);	
}

module.exports = function(){
	return UsuarioDAO;
};
