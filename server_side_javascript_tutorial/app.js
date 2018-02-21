var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.send('Hello home page');
});

app.get('/dynamic', function(req, res) {
  var lis = '';
  for(var i=0; i<5; i++) {
    lis = lis + '<li>coding</li>';
  };
  var time = Date();
  const output = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title></title>
      </head>
      <body>
        Hello, Dynamic!
        <ul>
          ${lis}
        </ul>
        ${time}
      </body>
    </html>
  `
  res.send(output);
});

app.get('/route', function(req, res) {
  res.send('Hello Router, <img src="/route.png">');
})

app.get('/login', function(req, res) {
  res.send('login please');
});

app.listen(3000, function() {
  console.log('Connected 3000 port!');
});