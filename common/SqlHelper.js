var config = require("./../config");
var sql = require("mssql");

exports.executeStoredProcedure = function (query, callback) {
    sql.connect(config.storage.pool).then(pool => {
        pool.request().execute(query, (err, result) => {
            sql.close();
            callback(err, result);
        }).catch(function (err) {
            sql.close();
            console.log(err);
            callback(err, null);
        });;
    });
}

exports.executeQuery = function (query, callback) {
    sql.connect(config.storage.pool).then(pool => {
        pool.request().query(query, (err, result) => {
            sql.close();
            callback(err, result);
        }).catch(function (err) {
            sql.close();
            console.log(err);
            callback(err, null);
        });;
    });
}
