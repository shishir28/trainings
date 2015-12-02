var sql = require('mssql');
var config = {
    user: 'sa',
    password: 'test123#',
    server: 'ICSEAB01\\SQLEXPRESS',
    database: 'ShishirTest'
};

var connection = new sql.Connection(config);
var request = new sql.Request(connection);

exports.Connection = connection;
exports.CommandRequest = request;