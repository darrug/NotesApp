/**
 * Created by dario on 13/01/15.
 */
var sqlite3 = require('sqlite3');
sqlite3.verbose();
var db = undefined;
exports.connect = function(dbname, callback) {
    db = new sqlite3.Database(dbname,
        sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
        function(err) {
            if (err) callback(err);
            else     callback();
        }
    );
}
exports.disconnect = function(callback) {
    callback();
}

exports.create = function(key, title, body, callback) {
    db.run("INSERT INTO notes ( notekey, title, body) "+
    "VALUES ( ?, ? , ? );",
        [ key, title, body ],
        function(err) {
            if (err) callback(err);
            else     callback();
        });
}
exports.update = function(key, title, body, callback) {
    db.run("UPDATE notes "+
        "SET title = ?, body = ? "+
        "WHERE notekey = ?",
        [ title, body, key ],
        function(err) {
            if (err) callback(err);
            else     callback();
        });
}

exports.read = function(key, callback) {
    db.get("SELECT * FROM notes WHERE notekey = ?",
        [ key ],
        function(err, row) {
            if (err) callback(err);
            else     callback(null, row);
        });
}

exports.destroy = function(key, callback) {
    db.run("DELETE FROM notes WHERE notekey = ?;",
        [ key ],
        function(err) {
            if (err) callback(err);
            else     callback();
        });
}


exports.titles = function(callback) {
    var titles = [];
    db.each("SELECT notekey, title FROM notes",
        function(err, row) {
            if (err) callback(err);
            else titles.push({
                key: row.notekey, title: row.title });
        },
        function(err, num) {
            if (err) callback(err);
            else callback(null, titles);
        });
}

