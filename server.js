const express = require('express')
    , app = express()
    , bodyParser = require('body-parser')
    , cors = require('cors');

const extractIpParameter = () => 
    process.argv[2] ? process.argv[2] : 'shielded-beach-51714.herokuapp.com';

const ip = extractIpParameter();
app.set('ip', ip);    

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());

require('./api')(app);

app.listen(443, () => 
    console.log(`Servidor rodando em https://${ip}`));