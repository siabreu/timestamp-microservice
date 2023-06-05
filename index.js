var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
	res.sendFile(__dirname + '/views/index.html');
});

function isTimestamp(value){
	return /^[0-9]+$/.test(value)
}

app.get('/api', (req, res) => {
	const currentDate = new Date().toUTCString()
	const currentUnix = Date.parse(currentDate)
	res.json({ unix: currentUnix, utc: currentDate })
})

app.get('/api/:date?', (req, res) => {
 const dateString = req.params.date
 
 if (isTimestamp(dateString)) {
	 const timestamp = parseInt(dateString)
   const utcDate = new Date(timestamp).toUTCString()

   res.json({ unix: timestamp, utc: utcDate })
 } 
 else {
	 const timestamp = Date.parse(dateString)
   const utcDate = new Date(timestamp).toUTCString()

   if (timestamp)
		 res.json({ unix: timestamp, utc: utcDate })
	 else
		 res.json({ error: "Invalid Date" })
	}
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
	console.log('Your app is listening on port ' + listener.address().port);
});
