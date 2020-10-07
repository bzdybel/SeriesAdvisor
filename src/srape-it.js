const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
let filmwebData = Array.from({ length: 100 }).map(() => ({
    name: '',
    // productionDate: '',
    // rateValue: '',
    // rateCount: '',
}));
const filmwebSource = {
    name: '.film__link',
    // productionDate: '.film__production-year',
    // rateValue: '.rate__value',
    // rateCount: '.rate__count',
};

request('https://www.filmweb.pl/ranking/film', (error, response, html) => {
    if (!error && response.statusCode === 200) {
        const $ = cheerio.load(html);
        Object.keys(filmwebSource).map(key => {
            $(filmwebSource[key]).each((i, el) => {
                filmwebData[i][key] = el.children[0].data;
            });
        });
        const jsonContent = JSON.stringify(filmwebData);
        fs.writeFile('filmweb_data.json', jsonContent, 'utf8', err => {
            if (err) {
                console.log(
                    'An error occured while writing JSON Object to File.'
                );
                return console.log(err);
            }
            console.log('JSON file has been saved.');
        });
    }
});


