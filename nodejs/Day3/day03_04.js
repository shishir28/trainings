var fs = require('fs'),
    async = require('async');

var writeStream = fs.createWriteStream('./trace.txt', {
    'flags': 'a',
    'encoding': 'utf8',
    'mode': 0666
});

try {
    async.waterfall([function (callback) {
            fs.readdir('./data/', function (err, files) {
                callback(err, files);
            });
        },
        function (files, callback) {
            files.forEach(function (name) {
                callback(null, name);
            });
        },
        function (name, callback) { // check if file type
            fs.stat('./data/' + name, function (err, stats) {
                if (stats.isFile()) {
                    callback(err, name);
                }
            });
        },
        function (name, callback) {
            fs.readFile('./data/' + name, 'utf8', function (err, data) {
                callback(err, name, data);
            });
        },
        function (name, text, callback) {
            var adjData = text.replace(' #', ' sharp');
            callback(null, name, adjData);
        },
        function (name, text, callback) {
            fs.writeFile('./data/' + name, text, function (err) {
                callback(err, name);
            });
        },
        function (filename, callback) {
            writeStream.write('changed ' + filename + '\n', 'utf8', function (err) {
                callback(null, filename);
            });
        }
    ], function (err, result) {
        if (err) throw err;
        //console.log(result);
    });

} catch (err) {
    console.error(err);
}