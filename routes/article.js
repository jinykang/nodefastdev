var express = require('express');
var router = express.Router();

//ORM DB객체 참조 
var db = require('../models/index');



//게시글 목록 조회  페이지 호출 라우팅메소드
//호출주소: http://localhost:3000/articles/list
router.get('/list',async(req,res)=>{

    //DB에서 가져온 게시글 목록 데이터 
    // var articles =[
    //     { 
    //         article_id:1,
    //         title:"제목1입니다.",
    //         contents:"내용1입니다.",
    //         email:"test@test.co.kr",
    //         writer:"강창훈",
    //         display:"Y"
    //     },
    //     { 
    //         article_id:2,
    //         title:"제목2입니다.",
    //         contents:"내용2입니다.",
    //         email:"test2@test.co.kr",
    //         writer:"강창훈2",
    //         display:"N"
    //     }
    // ];

    //전체 게시글 목록 조회 하기 select * from article; 쿼리가 자동으 생성되어 db서버에 전달됨.
    const articles = await db.Article.findAll();


    //views/member/list.ejs를 반환한다.
    res.render('article/list',{articles:articles});
});


//게시글 등록  페이지 호출 라우팅메소드
//호출주소: http://localhost:3000/articles/regist
router.get('/regist',function(req,res){
    res.render('article/regist');
});

//게시글 데이터 등록처리 라우팅 메소드 
//호출주소: http://localhost:3000/articles/regist
router.post('/regist',async(req,res)=>{

    //화면에서 전달된 데이터 추출 
    var title = req.body.title;
    var contents = req.body.contents;

    //DB에 저장할 데이터 정의
    //속성명은 모델의 속성명과 일치해야한다.
    var articleData = {
        title:title,
        contents:contents,
        email:"test@test.co.kr",
        writer:"강창훈",
        display:"Y",
        view_cnt:0,
        regist_date:Date.now()
    }

    //게시글 데이터 등록처리=orm에 의해 insert query자동생성 db서버에 전달된다.
    await db.Article.create(articleData);

    //등록후 목록 페이지로 이동...
    res.redirect('/articles/list');
});



//게시글 확인/수정  페이지 호출 라우팅메소드
//호출주소: http://localhost:3000/articles/modify/1 <==파라메터방식
//호출주소: http://localhost:3000/articles/modify?aid=1 <==쿼리스트링방식
router.get('/modify/:aid',async(req,res)=>{

    //QueryString방식으로 전달될 키값 추출하기 
    //var articleIdx = req.query.aid;
    //console.log("쿼리스트링방식으로 전달되는 값추출:",articleIdx);

    //파라메터 방식으로 전달되는 값추출하기- 와일드카드 방식 
    var articleIdx = req.params.aid;
    console.log("파라메터 방식으로 전달되는 값추출:",articleIdx);

    //db에서 단일게시글 정보를 조회해옴...

    // var article={
    //     title:"제목입니다.",
    //     contents:"내용입니다.",
    //     email:"test@test.co.kr",
    //     writer:"강창훈",
    //     display:"N"
    //   };

    //select * from articles where article_id=1;
    const article = await db.Article.findOne({
            where:{article_id:articleIdx}
        });


    res.render('article/modify',{article});
});


//router.post()메소드는 mvc/fronstend에서 post방식으로 데이터/html을 전달해오면 받아주는 라우팅메소드입니다.
router.post('/modify',async(req,res)=>{

    //폼태그에 입력한 사용자 데이터를 추출한다.
    //폼태그의 데이터 추출시 req.body.html요소의 name값 json데이터 추출시는 req.body.json객체속성명
    
    //게시글 고유번호 추출=hidden filed사용
    var articleid = req.body.articleid;


    var title = req.body.title;
    var contents = req.body.contents;
    var email = req.body.email;
    var writer = req.body.writer;
    var display = req.body.display;

    //추출된 값을 db에 저장한다.
    //저장 json 데이터 정의 
    var article= {
        title,
        contents,
        email,
        writer,
        display,
    }

    //해당 게시글 정보 수정하기 
    //update articles set title='',contents=''... where article_id=1 쿼리가 만들어져서 db 서버로이동 쿼리가 실행됨.
    await db.Article.update(article,{where:{article_id:articleid}});
    
    console.log("폼에서 전달된 게시글 데이터 출력: ",article);

    //수정처리 이후 특정페이지로 바로 이동하기

    //http://localhost:3000/articles/list로 이동시키기
    res.redirect('/articles/list');
});


//게시글 삭제 라우팅 메소드 
//localhost:3000/articles/delete?aid=1
router.get('/delete',async(req,res)=>{

    //게시글 고유번호 추출하기 
    var articleIdx = req.query.aid;

    //게시글 삭제처리 
    await db.Article.destroy({where:{article_id:articleIdx}});

    //삭제후 목록 페이지 이동
    res.redirect('/articles/list');

});



module.exports = router;
