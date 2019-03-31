const express = require('express');
const weatherApi = require('./weatherapi');

// Dotenv parses the contents of the .env file from the working folder.
// Make your own .env file as it shouldn't be commited to git.

require('dotenv').config();

const app = express();

const API_KEY = process.env.GOOGLE_API_KEY;

const googleMapsClient = require('@google/maps').createClient({
  key: API_KEY
})

function geocodeThis(address) {
  googleMapsClient.geocode({
    address: address
  }, function(err, response) {
    if (!err) {
      return response.json.results[0].geometry.location;
    }else {
      return err;
    }
  })
}


app.get('/', function (req, res) {
    const a = weatherApi.getTemperature("Sometown");
    const b = weatherApi.getTemperature("Otherplace");
    const diff = weatherApi.diffTwoTemperatures(a, b);
    const location = geocodeThis("Mathias Lunds gate, Stjørdal");

    sendThis = "Temperature at site A was " + a + "\nTemperature at site B was " + b + "\nDifference is " + diff;
    sendThis += "\nAnd the location is: " + location;
    res.send(sendThis);
});


app.put('/', function (req, res) {
    console.log("HTTP Put Request");
    res.send("HTTP PUT Request");
  });
  
  app.post('/', function (req, res) {
    console.log("HTTP POST Request");
    res.send("HTTP POST Request");  
  });
  
  app.delete('/', function (req, res) {
    console.log("HTTP DELETE Request");
    res.send("HTTP DELETE Request");
  });

//start server on the port defined in environment variable OR port 8080
const PORT = process.env.PORT || 8080;

var server = app.listen(PORT, function () {
    var host = server.address().address;

    console.log("Server listening at http://%s:%s", host, PORT);
});
