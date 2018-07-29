require("dotenv").config();

// var spotify = new Spotify(keys.spotify);
// var client = new Twitter(keys.twitter);

//setting up spotify search

if (process.argv[2] === "spotify-this-song") {
  var Spotify = require('node-spotify-api');

  var spotify = new Spotify({
    id: '76d99e26a2b24f96b161ac14ff899152',
    secret: '1408764b1455475ba9b552c90bf703cf'
  });

  spotify.search({ type: 'track', query: process.argv[3] }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    console.log(data);
  });

};

//setting up OMDB search

if (process.argv[2] === "movie-this") {
  var request = require("request");
  var movieName = "";
  var nodeArgs = process.argv;
  for (var i = 3; i < nodeArgs.length; i++) {

    movieName = movieName + " " + nodeArgs[i];
  
  }

  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
  console.log(queryUrl);

  request(queryUrl, function(error, response, body) {

    if (!error && response.statusCode === 200) {
      console.log("Title: " + JSON.parse(body).Title);
      console.log("Release Year: " + JSON.parse(body).Year);
      console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
      console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
      console.log("Country: " + JSON.parse(body).Country);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);
    }
  });
}; 