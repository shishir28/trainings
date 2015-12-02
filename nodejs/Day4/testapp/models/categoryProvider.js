var sqlObj = require('./sql.js');

var request = sqlObj.CommandRequest;

CategoryProvider = function () { };

//Find all categories
CategoryProvider.prototype.findAll = function (callback) {
    categories = {};
    //sql.on('error', function (err) {
    //    console.log(err);
    //});

    request.query(" SELECT CategoryIsdasdasdd ,Name, Description FROM Category ")
        .then(function (recordset) {
            console.log(recordset);
            if (recordset !== null) {
                console.log(3);
                recordset.forEach(function (currentRecord) {
                    var category = {
                        'CategoryId': currentRecord.CategoryId,
                        'Name': currentRecord.Name,
                        'Description': currentRecord.Description
                    };
                    console.log(4);
                    categories.push(category);
                });
            }
            console.log("before callback is called");

            callback(null, categories);
        }).catch(function (err) {
            log(err);
        });
};

CategoryProvider.prototype.findById = function (id, callback) {
    request.query("SELECT CategoryId ,Name, Description FROM Category  where CategoryId = " + id)
        .then(function (recordset) {
            if (recordset !== null) {
                recordset.forEach(function (currentRecord) {
                    var category = {
                        'CategoryId': currentRecord.CategoryId,
                        'Name': currentRecord.Name,
                        'Description': currentRecord.Description
                    };
                    callback(null, category);
                });
            }
        }).catch(function (err) {
            log(err);
        });
};

CategoryProvider.prototype.updateById = function (id, body, callback) {
    request.query("UPDATE Category SET  Name = '" + body.name + " , Description =  '" + body.description + "' WHERE CategoryId =  " + id, function (err, updatedRecords) { callback(); });

};

CategoryProvider.prototype.deleteById = function (id, body, callback) {
    request.query("Delete Category  WHERE CategoryId =  " + id, function (err, updatedRecords) { callback(); });
};

//Create a new category
CategoryProvider.prototype.save = function (params, callback) {
    request.query("INSERT INTO Category (Name,Description) VALUES ('" + params['name'] + " , Description =  '" + params['description'] + "' )", function (err, updatedRecords) { callback(); });
    ;
};

exports.CategoryProvider = CategoryProvider;