function ItensDAO( connection ){
	this._connection = connection; 
}

ItensDAO.prototype.listar = function( movimento, callback) {
	this._connection.query('select * from ITEM where movimento = ? order by id', movimento, callback);	
}

ItensDAO.prototype.salvar = function( item, callback) {	
	if( !item.id ) {
		this._connection.query('insert into ITEM set ?', item, callback);
	} else {
		this._connection.query('update ITEM set ? where id = ?', [ item, item.id], callback);	
	}
}

ItensDAO.prototype.editar = function( id, callback) {
	this._connection.query('select * from ITEM where id = ?', id, callback);
}

ItensDAO.prototype.excluir = function( id, callback) {	
	console.log(id)
	this._connection.query('delete from ITEM where id = ?', id, callback);	
}

module.exports = function(){
	return ItensDAO;
};
