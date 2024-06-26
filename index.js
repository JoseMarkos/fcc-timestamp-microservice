// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
const util = require('node:util');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


// api timestamp
app.get("/api/:dateinput", function(req, res) {
  let dateinput = new Date(req.params.dateinput);
  if ("Invalid Date" == dateinput) {
    const time = parseInt(req.params.dateinput);
    if (isNaN(time)) {
      return res.json({ error : "Invalid Date" });
    }
    dateinput = new Date(time);
  }
    
  return res.json({ unix: dateinput.getTime(), utc: dateinput.toUTCString() });
});

app.get("/api/", function(req, res) {
  let dateinput = new Date();
    
  return res.json({ unix: dateinput.getTime(), utc: dateinput.toUTCString() });
});
