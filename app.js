require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.port;
const db = require('./server/index');




app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));

app.set('views', 'views')
app.set('view engine', 'ejs')

app.use('/', require('./routes/pages'));

//leave this at the bottom, it's your error code
app.use(function(req, res) {
    res.status(400);
   res.render('error/404.ejs', {title: '404: File Not Found'});
   });

// just place the error code up here...
app.listen(port, () => console.info(`listening on port ` + port))