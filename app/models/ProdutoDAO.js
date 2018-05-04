function ProdutoDAO( connection ){
	this._connection = connection; 
}

ProdutoDAO.prototype.listar = function( callback) {
	this._connection.query('select * from produto order by id', callback);	
}

ProdutoDAO.prototype.salvar = function( produto, callback) {	
	if( !produto.id ) {
		this._connection.query('insert into produto set ?', produto, callback);
	} else {
		this._connection.query('update produto set ? where id = ?', [ produto, produto.id], callback);	
	}
}

ProdutoDAO.prototype.editar = function( id, callback) {
	this._connection.query('select * from produto where id = ?', id, callback);
}

ProdutoDAO.prototype.excluir = function( id, callback) {	
	console.log(id)
	this._connection.query('delete from produto where id = ?', id, callback);	
}

module.exports = function(){
	return ProdutoDAO;
};
