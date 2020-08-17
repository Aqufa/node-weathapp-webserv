const path = require('path');
const hbs = require('hbs');
const express = require('express');
const geocode = require('./utils/geocode');
const forecast= require('./utils/forecast');
const { request } = require('express');
//console.log(__dirname);
// console.log(path.join(__dirname,'../public/index.html'));

const app = express();
const port = process.env.PORT || 3000

//Define path for express config
const publicDirPath = path.join(__dirname,'../public');
const viewDirPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

//Setup handlebar engine and views location
app.set('views', viewDirPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

//Setup path for static files like html 
app.use(express.static(publicDirPath))

app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather',
        name: 'Aquib Faiyaz',
        link: './img/img2.png'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About me',
        name: 'Aquib Faiyaz',
        
    })
})

app.get('/help', (req,res) =>{
    res.render('help', {
        message: 'Here you can fix your problems',
        title: 'Help',
        name: 'Aquib Faiyaz',
        
    })
})

app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'please enter a correct location'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location}={})=>{
        if(error){
            return res.send({error});
        }
        forecast(latitude, longitude, (error, forecast)=>{
            if(error){
                return res.send({error});
            }
            res.send({location, 
                      forecast,
                      address: req.query.address});
        })
    })
    
})

app.get('/products',
(req, res) =>{
    if(!req.query.search){
        return res.send({
        error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) =>{
    res.render('404error', {
        message: 'Help not found',
        name: 'Aquib Faiyaz',
        title: '404'

    })
})

app.get('*', (req, res) =>{
    res.render('404error', {
        title: '404',
        message: 'Page not found',
        name: 'Aquib faiyaz'
        
    })
})

app.listen(port, ()=>{
    console.log('Server is up on port 3000 ' + port)
})