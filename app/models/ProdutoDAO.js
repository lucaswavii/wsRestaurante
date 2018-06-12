function ProdutoDAO( connection ){
	this._connection = connection; 
}

ProdutoDAO.prototype.listar = function( callback) {
	this._connection.query('select * from PRODUTO order by id', callback);	
}

ProdutoDAO.prototype.salvar = function( produto, callback) {	
	if( !produto.id ) {
		this._connection.query('insert into PRODUTO set ?', produto, callback);
	} else {
		this._connection.query('update PRODUTO set ? where id = ?', [ produto, produto.id], callback);	
	}
}

ProdutoDAO.prototype.editar = function( id, callback) {
	this._connection.query('select * from PRODUTO where id = ?', id, callback);
}

ProdutoDAO.prototype.excluir = function( id, callback) {	
	console.log(id)
	this._connection.query('delete from PRODUTO where id = ?', id, callback);	
}

module.exports = function(){
	return ProdutoDAO;
};
