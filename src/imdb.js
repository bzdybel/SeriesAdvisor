const tmdb = require('tmdbv3').init('5208414409036588923403a5490e9c1a');
const fs = require('fs');
const http = require('https');
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

const Http = new XMLHttpRequest();
const url =
    'https://api.themoviedb.org/3/movie/top_rated?api_key=5208414409036588923403a5490e9c1a&language=en-US&page=1';
Http.open('GET', url);
Http.send();

Http.onreadystatechange = e => {
    fs.writeFile('filmweb_data_latest.json', Http.responseText, 'utf8', err => {
        if (err) {
            console.log('An error occured while writing JSON Object to File.');
            return console.log(err);
        }
        console.log('JSON file has been saved.');
    });
    console.log(Http.responseText);
};
