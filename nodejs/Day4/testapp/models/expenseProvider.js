var sqlObj = require('./sql.js');
var request = sqlObj.CommandRequest;
ExpenseProvider = function () { };


//Find all expenses
ExpenseProvider.prototype.findAll = function (callback) {
    //Expense.find({}, function (err, expenses) {
    //    callback(null, expenses)
    //});
};

ExpenseProvider.prototype.findById = function (id, callback) {
    //Expense.findById(id, function (err, expense) {
    //    if (!err) {
    //        callback(null, expense);
    //    }
    //});
};


ExpenseProvider.prototype.updateById = function (id, body, callback) {
    //Expense.findById(id, function (err, expense) {
    //    if (!err) {
    //        expense.transaction = body.transaction;
    //        expense.date = body.date;
    //        expense.amount = body.amount;
    //        expense.category = body.category;
    //        expense.save(function (err) {
    //            callback();
    //        });
    //    }
    //});
};

ExpenseProvider.prototype.deleteById = function (id, body, callback) {
    //Expense.findById(id, function (err, expense) {
    //    if (!err) {
    //        expense.remove(function (err, expense) {
    //            callback();
    //        });
    //    }
    //});
};


//Create a new expense
ExpenseProvider.prototype.save = function (params, callback) {
    //var expense = new Expense({
    //    transaction: params['transaction'],
    //    date: params['date'],
    //    amount: params['amount'],
    //    category: params['category']
    //});

    //expense.save(function (err) {
    //    callback();
    //});
};

///* =========================Expense related operation Ends========================= */

exports.ExpenseProvider = ExpenseProvider;