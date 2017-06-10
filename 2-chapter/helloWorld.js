var http = require('http'),
    fs = require('fs')

function serverStaticFile(res, path, contentType, responseCode) {
    if (!responseCode) responseCode = 200;
    fs.readFile(__dirname + path, function(err, data) {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('500-Internal Error')
        } else {
            res.writeHead(responseCode, { 'Content-Type': contentType });
            res.end(data)
        }
    });
}
http.createServer(function(req, res) {
    // 规范化url， 去掉查询字符串，可选的反斜杠，并把它变成小写

    var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase()
    console.log(path)
    switch (path) {
        case '':
            serverStaticFile(res, '/public/home.html', 'text/html');
            res.end('Homepage');
            break;
        case '/about':
            serverStaticFile(res, '/public/about.html', 'text/html');
            res.end('About');
            break;
        case '/img/logo.jpg':
            serverStaticFile(res, '/public/img/logo.jpg', 'image/jpeg');
            res.end('About');
            break;
        default:
            serveStaticFile(res, '/public/404.html', 'text/html', 404);
            res.end('Not Found')
            break;


    }

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello world!');
}).listen(3000);
console.log('Server started on localhost: 3000; press Ctrl-C to terminate...')