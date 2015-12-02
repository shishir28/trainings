var fs = require('fs'),
    async = require('async');

var writeStream = fs.createWriteStream('./trace.txt', {
    'flags': 'a',
    'encoding': 'utf8',
    'mode': 0666
});

try {
    fs.readdir('./data/', function (err, files) {
        files.forEach(function (name) {
            fs.stat('./data/' + name, function (err, stats) {
                if (err) throw err;
                if (stats.isFile()) {
                    async.waterfall([

                        function (callback) {
                            fs.readFile('./data/' + name, 'utf8', function (err, data) {
                                callback(err, name, data);
                            });
                        },
                        function (name, text, callback) {
                            var adjData = text.replace('#', ' sharp');
                            callback(null, name, adjData);
                        },
                        function (name, text, callback) {
                            fs.writeFile('./data/' + name, text, function (err) {
                                callback(err, name);
                            });
                        },
                        function (fileName, callback) {
                            writeStream.write('changed ' + name + '\n', 'utf8', function (err) {
                                callback(err, fileName);
                            });
                        }
                    ], function (err, result) {
                        if (err) throw err;
                        console.log(result);
                    });
                }
            });
        });
    });

} catch (err) {
    console.error(err);
}