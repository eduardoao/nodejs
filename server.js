const express = require('express')
    , app = express()
    , bodyParser = require('body-parser')
    , cors = require('cors');      

    var ip = require('ip');
 
app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());


require('./api')(app);

 // Initialize the app.
 var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port, ip.address());
    
  });
