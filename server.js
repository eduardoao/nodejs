const express = require('express')
    , app = express()
    , bodyParser = require('body-parser')
    , cors = require('cors');

    var ip = "";

    var dns = require('dns');
    var w3 = dns.lookup('https://testebackendionic.herokuapp.com/', function (err, addresses, family) {
    console.log(addresses);
    ip = addresses;
    });


//const extractIpParameter = () => 
//    process.argv[2] ? 'immense-retreat-73594.herokuapp.com' : 'immense-retreat-73594.herokuapp.com';

//const ip = //extractIpParameter();
app.set('ip', ip);    

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());

require('./api')(app);

app.listen(8080, () => 
    console.log(`Servidor rodando em http://${ip}`));