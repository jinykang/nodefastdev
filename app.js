var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//레아이웃팩키지 참조 
var expressLayouts = require('express-ejs-layouts');

//시퀄라이즈 ORM DB객체 참조 
var sequelize = require('./models/index.js').sequelize;


//라우팅 파일 참조영역 
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//개발자 정의 라우팅 파일 참조하기 
var articleRouter = require('./routes/article');
var memberRouter = require('./routes/member');

//회원정보관리 RESTfulAPI 전용라우팅 파일 참조 
var memberAPIRouter = require('./routes/memberAPI');


var app = express();

//mysql과 자동연결처리 및 모델기반 물리 테이블 생성처리제공
sequelize.sync(); 


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//레이아웃 페이지 설정
app.set('layout', 'layoutPage'); //기본 레이아웃 페이지 뷰 설정하기 
app.set("layout extractScripts", true); //컨텐츠 페이지의 스크립트소스를 추출할지여부 정의 
app.use(expressLayouts);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//라우팅 파일의 기본 호출주소 세팅영역 
app.use('/', indexRouter);
app.use('/users', usersRouter);

//개발자 정의 라우팅 파일의 기본접속 주소 정의 
//http://localhost:3000/articles/
//http://localhost:3000/members/

app.use('/articles', articleRouter);
app.use('/members', memberRouter);

app.use('/api/members', memberAPIRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
