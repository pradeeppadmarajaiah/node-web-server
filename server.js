const express = require('express');
const hbs = require('hbs');
const fs=require('fs');

const port =process.env.PORT || 3000;
var app = express();

//hbs view
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + "/views/partials");

//start the server
app.listen(port, () => console.log(`server is up!!!.Listening on port ${port}`));



app.use((req,res,next)=> {
  var now=new Date().toString();
  console.log(`This is the middleware ${req.url} : ${req.method} : ${now}`);
  fs.appendFile("server.log",`${req.url} : ${req.method} : ${now} \n`,(err) =>{
    if(err) {
      console.log("Error");
    }
  });
  next();
});


//static pages
app.use(express.static(__dirname + "/web"));

// app.use((req,res,next)=> {
//   res.render('main.hbs');
// });

app.get('/hello', (req, res) => {
  res.send('<h1>This is the info page</h1>');
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    year: new Date()

  });
});

app.get('/', (req, res) => {
  res.render('index.hbs', {
    year: new Date().getFullYear(),
    welcome: "Welcome to Pradeep world"
  });
});
