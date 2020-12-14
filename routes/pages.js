const express = require('express');
const app = express.Router();
//const bcrypt = require('bcrypt');
const mysql = require('mysql')
const connect = mysql.createConnection({
    password: process.env.MYSQL_PASS,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DB,
    host: process.env.MYSQL_HOST,
    charset: 'utf8mb4_bin'
})

// OS information
const os = require('os');
const { callbackify } = require('util');

var ut_sec = os.uptime(); 
var ut_min = ut_sec/60; 
var ut_hour = ut_min/60;
ut_sec = Math.floor(ut_sec); 
ut_min = Math.floor(ut_min); 
ut_hour = Math.floor(ut_hour); 
  
ut_hour = ut_hour%60; 
ut_min = ut_min%60; 
ut_sec = ut_sec%60; 
memoryLeft = os.totalmem();
memoryFree = memoryLeft*0.000001;
memoryTotal = os.freemem();
memorytotal = memoryTotal*0.000001;
//showing files to the public
app.get('/',(req, res) =>{
    res.render('index',{title: 'Home Page'})
});

app.get('/about',(req, res) =>{
    res.render('about',{
      title: 'About Biscuits Industrial',
      uptime: ut_hour+ " hours " + ut_min +" minutes " + ut_sec + " seconds",
      load: os.loadavg(),
      type: os.platform(),
      memoryTotal: Math.floor(memoryFree),
      memoryLeft: Math.floor(memorytotal)
    })
});
app.get('/ships/:id', (req, res) => {
    res.render('content/shipinformation',{
      title: 'Building ships?',
        power: connect.query('SELECT capacity FROM invTypes WHERE typeName = ?', req.params.id, function(err, results){
          if(err){
            return console.err(err.message);
          } else {
            console.log(results);
            return JSON.stringify(results);
          }
          
      })
    })
  });
app.use('/auth', require('../routes/auth'));

app.get('/login', (req, res) => {
  res.render('login');
});



app.get('/register', (req, res) => {
  res.render('register');
});



app.get('/ships', function (req, res) {
  res.render('ships')
});

  //api shit 
const apiRouter = require('../server/routes')
app.use('/api/InvTypes', apiRouter)
app.use(function(req, res) {
    res.render('../api');
});


module.exports = app;