var express = require('express');
var router = express.Router();



//회원 목록 조회  페이지 호출 라우팅메소드
//호출주소: http://localhost:3000/members/list
router.get('/list',function(req,res){
    //views/member/list.ejs를 반환한다.
    res.render('member/list');
});


//회원 등록  페이지 호출 라우팅메소드
//호출주소: http://localhost:3000/members/entry
router.get('/entry',function(req,res){
    res.render('member/entry');
});



//회원정보 확인/수정  페이지 호출 라우팅메소드
//호출주소: http://localhost:3000/members/modify
router.get('/modify',function(req,res){
    res.render('member/modify');
});


//회원 로그인 페이지 호출 라우팅메소드
//호출주소: http://localhost:3000/members/login
router.get('/login',function(req,res){
    res.render('member/login');
});




module.exports = router;