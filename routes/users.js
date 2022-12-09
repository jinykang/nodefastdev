var express = require('express');
var router = express.Router();

//해당라우팅 파일의 기본주소는 app.js에서 http://localhost:3000/users/ 로지정되어있습니다.

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//호출주소 : http://localhost:3000/users/regist
router.get('/regist', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
