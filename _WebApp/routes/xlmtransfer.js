var express = require('express');
var router = express.Router();

/* GET xlmtransferpage page. */
router.get('/', function(req, res) {
  res.render('xlmtransfer', { title: 'Express' });
});

module.exports = router;
