var mysql = require('mysql');

var connMysql = function() {
	
	return mysql.createConnection({
		host : '18.218.132.80',
		user: 'root',
		password: 'Wa180279',
		database: 'wsRestaurante'
});
}

module.exports = function(){
	return connMysql;
}
