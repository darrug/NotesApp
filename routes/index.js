var express = require('express');
var notes = require('../models/notes')
var notesroute = require('./notesroute')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Notes', notes: notes });
});

router.get('/noteadd',notesroute.add);
router.post('/notesave',notesroute.save);
router.get('/noteview',notesroute.view);

router.get('/noteedit',notesroute.edit);
router.get('/notedestroy', notesroute.destroy);
router.post('/notedodelete',notesroute.notedodelete);

module.exports = router;
