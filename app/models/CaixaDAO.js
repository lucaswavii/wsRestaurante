function CaixaDAO( connection ){
	this._connection = connection; 
}

CaixaDAO.prototype.listar = function( callback) {
	this._connection.query('select * from caixa order by id', callback);	
}

CaixaDAO.prototype.salvar = function( caixa, callback) {	
	if( !caixa.id ) {
		this._connection.query('insert into caixa set ?', caixa, callback);
	} else {
		this._connection.query('update caixa set ? where id = ?', [ caixa, caixa.id], callback);	
	}
}

CaixaDAO.prototype.editar = function( id, callback) {
	this._connection.query('select * from caixa where id = ?', id, callback);
}

CaixaDAO.prototype.excluir = function( id, callback) {	
	console.log(id)
	this._connection.query('delete from caixa where id = ?', id, callback);	
}

module.exports = function(){
	return CaixaDAO;
};
