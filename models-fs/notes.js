var fs    = require('fs');
var path  = require('path');
var async = require('async');
var _dirname = undefined;

exports.connect = function(dirname, callback) {
    _dirname = dirname;
    callback();
}
exports.disconnect = function(callback) {
    callback();
}

exports.create = function(key, title, body, callback) {
    fs.writeFile(path.join(_dirname, key + '.json'),
        JSON.stringify({
            title: title, body: body
        }), 'utf8',
        function(err) {
            if (err) callback(err);
            else callback();
        });
}
exports.update = exports.create;

exports.read = function(key, callback) {
    if (fs.existsSync(path.join(_dirname, key + '.json'))) {
        fs.readFile(path.join(_dirname, key + '.json'), 'utf8',
            function (err, data) {
                if (err) callback(err);
                else {
                    callback(undefined, JSON.parse(data));
                }
            });
    }
    else
      callback('notfound');
}

exports.destroy = function(key, callback) {
    fs.unlink(path.join(_dirname, key + '.json'),
        function(err) {
            if (err) callback(err);
            else callback();
        });
}


exports.titles = function(callback) {
    fs.readdir(_dirname, function(err, filez) {
        if (err) callback(err);
        else {
            var thenotes = [];
            async.eachSeries(filez,
                function(fname, cb) {
                    var key = path.basename(fname, '.json');
                    exports.read(key, function(err, note) {
                        if (err=='notfound') cb();
                        else
                        if (err) cb(err);
                        else {
                            thenotes.push({
                                key: fname.replace('.json',''), title: note.title });
                            cb();
                        }
                    });
                },
                function(err) {
                    if (err) callback(err);
                    else callback(null, thenotes);
                }); }
    });
}