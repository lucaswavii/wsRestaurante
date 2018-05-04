function UsuarioDAO( connection ){
	this._connection = connection; 
}

UsuarioDAO.prototype.listar = function( callback) {
	this._connection.query('select * from usuario order by id', callback);	
}

UsuarioDAO.prototype.salvar = function( usuario, callback) {	
	if( !usuario.id ) {
		this._connection.query('insert into usuario set ?', usuario, callback);
	} else {
		this._connection.query('update usuario set ? where id = ?', [ usuario, usuario.id], callback);	
	}
}

UsuarioDAO.prototype.editar = function( id, callback) {
	this._connection.query('select * from usuario where id = ?', id, callback);
}

UsuarioDAO.prototype.excluir = function( id, callback) {	
	console.log(id)
	this._connection.query('delete from usuario where id = ?', id, callback);	
}

module.exports = function(){
	return UsuarioDAO;
};
