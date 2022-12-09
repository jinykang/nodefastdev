var express = require('express');
var router = express.Router();

/* 
메인페이지 - 라우팅 메소드 
호출주소: http://localhost:3000
*/
router.get('/', function(req, res, next) {

  //HTTP Response객체의 render('뷰파일이름=index.ejs','뷰파일에 전달할 json데이터')메소드
  res.render('index', { title: '강현서' });

});

//router.get('호출주소','콜백함수= 라우팅메소드 호출시 실행되는 함수');
//http://localhost:3000/sample1
router.get('/sample1',function(req,res){

  //웹서버에서 웹브라우저로 리소스를 전달하는 객체로 response객체의 
  //render('뷰파일명',뷰에 전달할 json데이터) 메소드 호출
  res.render('sampleview',{userName:"강창훈",email:"test@test.co.kr"});
});


//호출주소: http://localhost:3000/company/intro
router.get('/company/intro',function(req,res){
  res.render('sampleview',{userName:"강창훈",email:"test@test.co.kr"});
});


//호출주소: http://localhost:3000/contact
router.get('/contact',function(req,res){
  res.render('sampleview',{userName:"강창훈",email:"test@test.co.kr"});
});



module.exports = router;
