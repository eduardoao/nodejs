const express = require('express')
    , app = express()
    , bodyParser = require('body-parser')
    , cors = require('cors');

    var ip = require("ip");

//const extractIpParameter = () => 
//    process.argv[2] ? 'immense-retreat-73594.herokuapp.com' : 'immense-retreat-73594.herokuapp.com';

//const ip = //extractIpParameter();
app.set('ip', ip.address());    

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());

require('./api')(app);

app.listen(80, () => 
    console.log(`Servidor rodando em http://${ip}`));