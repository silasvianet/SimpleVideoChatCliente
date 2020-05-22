//já está sendo iniciado via https
const express = require('express'),
      https   = require('https'), 
      app     = express(),
      fs      = require('fs'),
      router = express.Router();

//const pkey = fs.readFileSync('./ssl/key.pem'),
//pcert = fs.readFileSync('./ssl/cert.pem'),
//options = {key: pkey, cert: pcert, passphrase: '123456789'};
	  
var options = {
    pfx: fs.readFileSync('./Trasmontano.pfx'),
    passphrase: 'infra@Tras1'
}; 
 
// use express static to deliver resources HTML, CSS, JS, etc)
// from the public folder 
app.use(express.static('public'));

app.use(function(req, res, next) {

console.log(req.get('Host'));

  if(req.headers['x-forwarded-proto']==='http') {
    return res.redirect(['https://', req.get('Host'), req.url].join(''));
  }
  next();
});

var handleRequest = (request, response) => {
    response.writeHead(200, {
        'Content-Type': 'text/html'
    });
    fs.readFile('./index.html', null, function (error, data) {
        if (error) {
            response.writeHead(404);
            respone.write('Arquivo não encontrado');
        } else {
            response.write(data);
        }
        response.end();
    });
};
 
https.createServer(options, handleRequest).listen(9999);
console.log('Sendo executado em: https://localhost:9999');
