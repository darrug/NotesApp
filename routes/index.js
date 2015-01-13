var express = require('express');
//require('../models/notes')
var notesroute = require('./notesroute')
var indexmodule = require('./indexmodule')
var router = express.Router();


/* GET home page. */
router.get('/', indexmodule.index);


router.get('/noteadd',notesroute.add);
router.post('/notesave',notesroute.save);
router.get('/noteview',notesroute.view);

router.get('/noteedit',notesroute.edit);
router.get('/notedestroy', notesroute.destroy);
router.post('/notedodelete',notesroute.notedodelete);

module.exports = router;
