require("dotenv").config();

//TODO: need to fix "keys" showing as undefined
// require("./keys.js");
// var spotify = new Spotify(keys.spotify);

// var client = new Twitter(keys.twitter);

// var Twitter = require('twitter');

//TODO: need song search and movie search to read default values if field is blank

//setting up spotify search
if (process.argv[2] === "spotify-this-song") {
  spotify()
};

function spotify() {
  var Spotify = require('node-spotify-api');
  var songName = "";
  var nodeArgs = process.argv;
  for (var i = 3; i < nodeArgs.length; i++) {

    songName = songName + " " + nodeArgs[i];
  }
  // var spotify = new Spotify(keys.spotify);
  var spotify = new Spotify({
    id: (process.env.SPOTIFY_ID),
    secret: (process.env.SPOTIFY_SECRET)
  });
  spotify.search({ type: 'track', query: songName, limit: 1 }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    console.log("Arist: " + (JSON.stringify((data.tracks.items[0].album.artists[0].name), null, 2)));
    console.log("Song Title: " + (JSON.stringify((data.tracks.items[0].name), null, 2)));
    console.log("Preview Link: " + (JSON.stringify((data.tracks.items[0].album.artists[0].external_urls.spotify), null, 2)));
    console.log("Album: " + (JSON.stringify((data.tracks.items[0].album.name), null, 2)));
  });
};

//setting up OMDB search
if (process.argv[2] === "movie-this") {
  movie()
};

function movie() {
  var request = require("request");
  var movieName = "";
  var nodeArgs = process.argv;
  for (var i = 3; i < nodeArgs.length; i++) {

    movieName = movieName + " " + nodeArgs[i];

  }

  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
  // console.log(queryUrl);

  request(queryUrl, function (error, response, body) {

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

//setting up "do what it says"

//*****IMPORTANT! Must use "node liri.js random" to pull correctly******
var fs = require("fs");

fs.readFile("random.txt", "utf8", function (error, data) {

  if (error) {
    return console.log(error);
  }

  // console.log(data);

  var dataArr = data.split(",");

  // console.log(dataArr);

  if (dataArr[0] === "spotify-this-song" && process.argv[2] === "random") {
    var Spotify = require('node-spotify-api');
    var songName = dataArr[1];

    // var spotify = new Spotify(keys.spotify);
    var spotify = new Spotify({
      id: (process.env.SPOTIFY_ID),
      secret: (process.env.SPOTIFY_SECRET)
    });

    spotify.search({ type: 'track', query: songName, limit: 1 }, function (err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }

      // console.log(data);   
      // console.log(JSON.stringify(data, null, 2));
      console.log("Arist: " + (JSON.stringify((data.tracks.items[0].album.artists[0].name), null, 2)));
      console.log("Song Title: " + (JSON.stringify((data.tracks.items[0].name), null, 2)));
      console.log("Preview Link: " + (JSON.stringify((data.tracks.items[0].album.artists[0].external_urls.spotify), null, 2)));
      console.log("Album: " + (JSON.stringify((data.tracks.items[0].album.name), null, 2)));
    });

  }
  if (dataArr[0] === "movie-this" && process.argv[2] === "random") {
    var request = require("request");
    var movieName = dataArr[1];

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    console.log(queryUrl);

    request(queryUrl, function (error, response, body) {

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

  }


});

//setting up Twitter API
if (process.argv[2] === "my-tweets") {
  myTweets()
};

function myTweets() {
  var Twitter = require('twitter');

  var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });

  var params = { screen_name: 'jmgerow' };
  client.get('statuses/user_timeline', params, function (error, tweets, response) {

    if (!error) {

      for (var i = 0; i < tweets.length; i++) {
        if (i === 21) {
          break;
        }
        console.log(tweets[i].created_at + ": " + tweets[i].text);
      };

    } else {
      console.log('error', error);
    }
  });
};
