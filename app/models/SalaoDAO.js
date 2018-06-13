function SalaoDAO( connection ){
	this._connection = connection; 
}

SalaoDAO.prototype.listar = function( pdv, callback) {
    
    var sql = " select mesa.id, mesa.nome, empresa.nome as empresa, movimento.id as idVenda, movimento.data, movimento.hora, caixa.nome as caixa, operador.nome as operador, atendente.nome as atendente, sum(item.total) as total " 
    sql += " from MESA mesa "
    sql += " inner join EMPRESA empresa on ( empresa.id = mesa.empresa ) "
    sql += " inner join PDV pdv on (pdv.empresa = empresa.id ) "
    sql += " inner join FUNCIONARIO operador on ( operador.id = pdv.operador ) "
    sql += " inner join CAIXA caixa on ( caixa.id = pdv.caixa ) "
    sql += " left outer join MOVIMENTO movimento on ( movimento.pdv = pdv.id and movimento.mesa = mesa.id ) " 
    sql += " left outer join ITEM item on ( item.movimento = movimento.id ) "
    sql += " left outer join FUNCIONARIO atendente on ( atendente.id = movimento.atendente ) "
    sql += " where empresa.id = ? and pdv.data = ? "
    sql += " group by mesa.id, mesa.nome, empresa.nome, movimento.id,movimento.data, movimento.hora, caixa.nome, operador.nome, atendente.nome;"

	this._connection.query(sql, [ pdv.empresa, pdv.data ], callback);	
}

SalaoDAO.prototype.novo = function( movimento, callback) {
    	
	if( !movimento.id ) {
		this._connection.query('insert into MOVIMENTO set ?', movimento, callback);
	} else {
		this._connection.query('update MOVIMENTO set ? where id = ?', [ movimento, movimento.id], callback);	
	}
}

SalaoDAO.prototype.editar = function( id, callback) {
	this._connection.query('select * from MOVIMENTO where id = ?', id, callback);
}

SalaoDAO.prototype.excluir = function( id, callback) {		
	this._connection.query('delete from MOVIMENTO where id = ?', id, callback);	
}

module.exports = function(){
	return SalaoDAO;
};
