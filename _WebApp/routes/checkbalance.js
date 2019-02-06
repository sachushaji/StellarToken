var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/checkbalance', function(req, res) {
  res.render('checkbalance', { title: 'Express' });
});



module.exports = router;