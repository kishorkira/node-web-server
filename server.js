const express = require('express');
const hbs = require('hbs');
const fs =require('fs');

const app = express();
app.set('view engine','hbs');
app.use((req,res,next)=>{
    let now = new Date().toString();
    let log = `${now}, method: ${req.method}, url: ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log + '\n',(err)=>{
        console.log('Unable to append to server.log');
    });
    next();
});
// app.use((req,res,next)=>{
//     res.render('Maintenance.hbs');
// });

hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(__dirname+"/public"));
hbs.registerHelper('getCurrentYear',()=>new Date().getFullYear());
hbs.registerHelper('screamIt',(text)=> text.toUpperCase());

app.get('/',(req, res)=>{
    res.render('home.hbs',{
        welcomeMessage : "Welcome to my website",
        pageTitle : 'Home page',
    });
});
app.get('/about',(req,res)=>{
   res.render('about.hbs',{
       pageTitle : 'About page',
   });
});
app.get('/bad',(req,res)=>{
    res.send({
        errorMessage :"Error Message"
    });
});
app.listen(3000);