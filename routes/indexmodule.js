/**
 * Created by dario on 13/01/15.
 */
var notes = undefined;

exports.configure = function (params) {
    notes = params.model;
}

exports.index = function(req, res) {
    notes.titles(function(err, titles) {
        if (err) {
            res.render('showerror', {
                title: "Could not retrieve note keys from data store",
                error: err
            });
        } else {
            res.render('index', { title: 'Notes', notes: titles });
        } });
};