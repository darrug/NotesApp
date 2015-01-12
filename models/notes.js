/**
 * Created by dario on 12/01/15.
 */
var notes = [];
exports.update = exports.create = function(key, title, body) {
    notes[key] = { title: title, body: body };
}
exports.read = function(key) {
    return notes[key];
}
exports.destroy = function(key) {
    delete notes[key];
}

exports.keys = function() {
    return Object.keys(notes);
}