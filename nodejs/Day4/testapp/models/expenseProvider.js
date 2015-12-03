var sqlObj = require('./sql.js');
var request = sqlObj.CommandRequest;
ExpenseProvider = function () {};


//Find all expenses
ExpenseProvider.prototype.findAll = function (callback) {
    expenses = [];
    request.query(" select e.ExpenseId, e.TransactionDetail,e.TransactionDate,e.Amount, e.CategoryId, c.Name from Expenses e inner join Category c on e.CategoryId = c.CategoryId ")
        .then(function (recordset) {
            if (recordset !== null) {
                recordset.forEach(function (currentRecord) {
                    var expense = {
                        'id': currentRecord.ExpenseId,
                        'transaction': currentRecord.TransactionDetail,
                        'date': currentRecord.TransactionDate,
                        'amount': currentRecord.Amount,
                        'categoryId': currentRecord.CategoryId,
                        'categoryName': currentRecord.Name,
                    };
                    expenses.push(expense);
                });
            }
            callback(null, expenses);
        }).catch(function (err) {
            log(err);
        });
};

ExpenseProvider.prototype.findById = function (id, callback) {
    request.query(" select e.ExpenseId, e.TransactionDetail,e.TransactionDate,e.Amount, e.CategoryId, c.Name from Expenses e inner join Category c on e.CategoryId = c.CategoryId where ExpenseId = " + id)
        .then(function (recordset) {
            if (recordset !== null) {
                recordset.forEach(function (currentRecord) {
                    var expense = {
                        'id': currentRecord.ExpenseId,
                        'transaction': currentRecord.TransactionDetail,
                        'date': currentRecord.TransactionDate,
                        'amount': currentRecord.Amount,
                        'categoryId': currentRecord.CategoryId,
                        'categoryName': currentRecord.Name,
                    };
                    callback(null, expense);
                });
            }
        }).catch(function (err) {
            log(err);
        });
};


ExpenseProvider.prototype.updateById = function (id, body, callback) {
    request.query("UPDATE Expenses SET  TransactionDetail = '" + body.transaction + "' , TransactionDate =  '" + body.date + "' , Amount =  " + body.amount + " , CategoryId =  '" + body.category + "' WHERE ExpenseId =  " + id, function (err, updatedRecords) {
        callback();
    });
};

ExpenseProvider.prototype.deleteById = function (id, body, callback) {
    request.query("Delete Expenses  WHERE ExpenseId =  " + id, function (err, updatedRecords) {
        callback();
    });
};

//Create a new expense
ExpenseProvider.prototype.save = function (body, callback) {
    request.query("INSERT INTO Expenses (TransactionDetail, TransactionDate, Amount, CategoryId ) VALUES ('" + body.transaction + "' ,  '" + body.date + "' ,  '" + body.amount + "' ,  '" + body.category + "' )", function (err, updatedRecords) {
        callback();
    });
};

///* =========================Expense related operation Ends========================= */

exports.ExpenseProvider = ExpenseProvider;
