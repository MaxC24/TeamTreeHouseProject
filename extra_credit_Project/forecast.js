//Build a program that takes a Zip Code and retrieves the forecast for today. 

// load the modules I will need for the project

var https = require("https");
var fs = require("fs");

//Deal with the zipcodes and find the coordinates

//get the variable zipcode from the user
var chosenZipcode = process.argv[2];

//read the file with all the zipcodes and assign it to a variable. 

function zipCallback(error, data){
	if (error) throw error;
	return data;
}
var allZipcodes = fs.readFileSync("./zipcode.csv", "utf8", zipCallback).split("\n");

//Create a function that assigns the coordinates to a string variable and returns it
//then add it to the URL string.
function getTheCoordinates(){
	var coordinates = "";

	for (var i in allZipcodes) {
		if (allZipcodes[i].split(",")[0].includes(chosenZipcode)){
			coordinates += allZipcodes[i].split(",")[3].slice(1, -1);
			coordinates += ",";
			coordinates += allZipcodes[i].split(",")[4].slice(1, -1);
		}
	}
	return coordinates;
}

//Print the forecat
function printForecast(place, forecast){
	var message = "The weather for today in :" + place + " is " + forecast;
	console.log(message);
}





//Request to the server:

var request = https.get("https://api.forecast.io/forecast/5e62dd054658bf372aeb858723cacf3a/"+ getTheCoordinates(), function(response){
	// console.log("statusCode: ", response.statusCode);
	// console.log("headers: ", response.headers);
	var body;

	response.on("data", function(d){
		body = d.toString();
	});

	response.on("end", function() {
		console.log("Body :" + body);
		// printForecast(weatherObj[place]);

	});
});

request.on("error", function(error) {
	console.error(error.message);
});

