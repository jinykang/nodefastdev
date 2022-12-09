var express = require('express');
var router = express.Router();

//회원목록 조회 RESTFul  라우팅 메소드
//호출주소: http://localhost:3000/api/members/all
router.get('/all',function(req,res){

    var usertList = [
        {
            userid:"eddy",
            name:"강창훈",
            email:"test@test.co.kr"
        },
        {
            userid:"eddy2",
            name:"강창훈2",
            email:"test2@test.co.kr"
        }
    ];

    res.json(usertList);
});



module.exports = router;