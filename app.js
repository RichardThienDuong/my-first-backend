var express = require('express');
var app = express(); // start as an express app
const path = require('path');
const basicAuth = require('express-basic-auth')
var securedRoutes = require('express').Router()
securedRoutes.use((req, res) => {
        const auth = {login: 'admin', password: 'admin'} 
        // parse login and password from headers
        const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
        const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')
        // Verify login and password are set and correct
        if (login && password && login === auth.login && password === auth.password) {
          // Access granted...
          res.send("Welcome, Authenticated Client.")
        }
        // Access denied...
        res.set('WWW-Authenticate', 'Basic realm="401"')
        res.status(401).send('Not Authenticated.') 
      });

securedRoutes.get('path1', )
app.get("public", )
// const https = require('https');

// To define any routes 
// you need app.get & app.post
// could possible do router.get & router.post

app.get('/', (req, res) => {
    var i = ["Accidents Will Happen", "After Youve Gone", "Aint She Sweet", "All By Myself", "All I Do Is Dream of You", 
    "All I Need is the Girl", "All My Tomorrows", "All of Me", "All of You", "All or Nothing at All", "All the Things You Are", 
    "All the Way", "All the Way Home", "All This and Heaven Too", "And Then You Kissed Me", "Angel Eyes", "Anything", 
    "April in Paris", "Are You Lonesome Tonight?", "Arent You Glad Youre You?"];
    console.log(i[Math.floor(Math.random() * 20)]);
    res.json(i[Math.floor(Math.random() * 20)])
});

app.get('/birth_date', (req, res) => {
    res.json("Frank Sinatra's Date of Birth is December 12th, 1915")
});

app.get('/birth_city', (req, res) => {
    res.json("Frank Sinatra's Birth City is Hoboken, New Jersey")
});

app.get('/wives', (req, res) => {
    res.json("Frank Sinatra's Wives : Nancy Barbato, Ava Gardner, Mia Farrow, Barbara Sinatra")
});

// app.get("/picture",function(res,res){
//     res.write("<img src="+upload.wikimedia.org/wikipedia/commons/a/af/Frank_Sinatra_%2757.jpg+">");
//     res.send();
// });

// app.use('/picture', express.static(__dirname+'/image.jpeg'));

app.get('/picture', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
  });

app.get('/public', (req, res) => {
    res.json("Everybody can see this page")
});

app.use("/protected", securedRoutes)

app.get('*', (req, res) => {
    res.json("You in da wrong neighborhood boi, i best believe you gon git on outta here, move along nah")
});

app.listen(8080, function () { 
    console.log('Example app listening on port ' + 8080 + '!'); 
});
