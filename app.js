const express = require('express');
const bodyParser = require('body-parser');

// service that combines Dark Sky API + zip code to GPS coords
const weather = require('./services/weather');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/weather/:gps', async (req, res) => {
	const gps = req.params.gps;
	const result = await weather(gps)
		.then(response => {
			return response.daily;
		})
		.catch(err => console.log(err));

	res.send(result);
});

app.listen(PORT, process.env.IP, function() {
	console.log('server is running... on port ', PORT);
});
