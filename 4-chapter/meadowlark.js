var express = require('express');
var app = express();
var fortunes = require('./lib/fortune.js');

// static 中间件 相当于给你想要发送的所有静态文件创建了一个路由
app.use(express.static(__dirname + '/public'));


//< 这段代码创建了一个视图引擎，并对 Express 进行了配置，将其作为默认的视图引擎
var handlebars = require('express3-handlebars').create({ defaultLayout: 'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
// >


app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res) {
    res.render('home');
});

app.get('/about', function(req, res) {
    var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    res.render('about', { fortune: fortunes.getFortune() });
});


//再指定内容类型和状态码了:视图引擎默认会返回 text/html 的内容类型和 200 的状态码
app.use(function(req, res) {
    res.status(404);
    res.render('404');
});


app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost:' + app.get('port') +
        '; press Ctrl-C to terminate.');
});