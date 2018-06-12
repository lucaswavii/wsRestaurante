function CondicaoPagamentoDAO( connection ){
	this._connection = connection; 
}

CondicaoPagamentoDAO.prototype.listar = function( callback) {
	this._connection.query('select * from CONDPAGAMENTO order by id', callback);	
}

CondicaoPagamentoDAO.prototype.salvar = function( condicaoPagamento, callback) {	
	if( !condicaoPagamento.id ) {
		this._connection.query('insert into CONDPAGAMENTO set ?', condicaoPagamento, callback);
	} else {
		this._connection.query('update CONDPAGAMENTO set ? where id = ?', [ condicaoPagamento, condicaoPagamento.id], callback);	
	}
}

CondicaoPagamentoDAO.prototype.editar = function( id, callback) {
	this._connection.query('select * from CONDPAGAMENTO where id = ?', id, callback);
}

CondicaoPagamentoDAO.prototype.excluir = function( id, callback) {	
	console.log(id)
	this._connection.query('delete from CONDPAGAMENTO where id = ?', id, callback);	
}

module.exports = function(){
	return CondicaoPagamentoDAO;
};
