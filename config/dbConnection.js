var mysql = require('mysql');

var connMysql = function() {
	
	return mysql.createConnection({
		host : '',
		user: 'root',
		password: '',
		database: 'wsRestaurante'
});
}

module.exports = function(){
	return connMysql;
}
