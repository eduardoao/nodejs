var express = require('express');
var bodyParser = require('body-parser');
var app     = express();

var messages = [
    { name: 'Ronda', message: 'Hi' },
    { name: 'Jamil', message: 'Whats up?'}
    
];

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extends: false}));
//Here we call a route.
app.get('/messages', (req, res)=> {
    res.send();
});
// ------//
//Post new message
app.post('/messages', (req, res)=> {
    console.log('Body:' + req.body);
    messages.push(req.body);   
    res.sendStatus(200);
});

var server = app.listen(3000, () => {
    console.log('Server is runnig ...', Date() +  server.address().port);
});