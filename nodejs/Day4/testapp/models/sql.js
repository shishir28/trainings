var sql = require('mssql');
var config = {
    user: 'sa',
    password: 'test123#',
    server: 'SHISHIR-PC\\MSSQLSERVER2014',
    database: 'ShishirTest'
};
 sql.on('error', function (err) {
        console.log(err);
    });
var connection = new sql.Connection(config);
connection.connect();
var request = new sql.Request(connection);

exports.Connection = connection;
exports.CommandRequest = request;