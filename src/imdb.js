const tmdb = require('tmdbv3').init('5208414409036588923403a5490e9c1a');
const fs = require('fs');
const http = require('https');

const options = {
    method: 'GET',
    hostname: 'api.themoviedb.org',
    port: null,
    path: '3/trending/all/day?api_key=5208414409036588923403a5490e9c1a&page=1',
    headers: {
        'content-type': 'application/json;charset=utf-8',
        authorization: 'Bearer <<access_token>>',
    },
};

const req = http.request(options, function(res) {
    const chunks = [];

    res.on('data', function(chunk) {
        chunks.push(chunk);
    });

    res.on('end', function() {
        const body = Buffer.concat(chunks);

        fs.writeFile('filmweb_data_latest.json', body, 'utf8', err => {
            if (err) {
                console.log(
                    'An error occured while writing JSON Object to File.'
                );
                return console.log(err);
            }
            console.log('JSON file has been saved.');
        });
    });
});

req.end();
