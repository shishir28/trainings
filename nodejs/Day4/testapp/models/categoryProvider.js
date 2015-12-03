var sqlObj = require('./sql.js');

var request = sqlObj.CommandRequest;
CategoryProvider = function () {};

//Find all categories
CategoryProvider.prototype.findAll = function (callback) {
    categories = [];

    request.query(" SELECT CategoryId ,Name, Description FROM Category ")
        .then(function (recordset) {
            if (recordset !== null) {
                recordset.forEach(function (currentRecord) {
                    var category = {
                        'id': currentRecord.CategoryId,
                        'name': currentRecord.Name,
                        'description': currentRecord.Description
                    };
                    categories.push(category);
                });
            }
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
                        'id': currentRecord.CategoryId,
                        'name': currentRecord.Name,
                        'description': currentRecord.Description
                    };
                    callback(null, category);
                });
            }
        }).catch(function (err) {
            log(err);
        });
};

CategoryProvider.prototype.updateById = function (id, body, callback) {
    request.query("UPDATE Category SET  Name = '" + body.name + "' , Description =  '" + body.description + "' WHERE CategoryId =  " + id, function (err, updatedRecords) {
        callback();
    });

};

CategoryProvider.prototype.deleteById = function (id, body, callback) {
    request.query("Delete Category  WHERE CategoryId =  " + id, function (err, updatedRecords) {
        callback();
    });
};

//Create a new category
CategoryProvider.prototype.save = function (body, callback) {
    request.query("INSERT INTO Category (Name, Description ) VALUES ('" + body.name + "' ,  '" + body.description + "' )", function (err, updatedRecords) {
      console.log(err);
      callback();
  });
};

exports.CategoryProvider = CategoryProvider;
