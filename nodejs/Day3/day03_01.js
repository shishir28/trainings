var fs = require('fs');

var writeStream = fs.createWriteStream('./trace.txt', {
    'flags': 'a',
    'encoding': 'utf8',
    'mode': 0666
});

try {
    fs.readdir('./data/', function (err, files) {
        files.forEach(function (name) {
            //            console.log(name);
            fs.readFile('./data/' + name, 'utf8', function (err, data) {
                if (err) throw err;

                var adjData = data.replace('#', ' sharp');
                //                var adjData = data.replace(' sharp', '#');

                fs.writeFile('./data/' + name, adjData, function (err) {
                    if (err) throw err;

                    writeStream.write('changed ' + name + '\n', 'utf8', function (err) {
                        if (err) throw err;
                    });
                });
            });
        });
        writeStream.write('\n all done \n', 'utf8', function (err) {
            if (err) throw err;
        });
    });
} catch (err) {
    console.error(err);
}