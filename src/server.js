// All external dependencies should be declared on top of the file
// for the sake of readability
// const express = require('express');
const request = require('request');
const cheerio = require('cheerio')


request('https://upflix.pl/netflix/serial/', (error, response, html)=>{
    if(!error && response.statusCode === 200)
    console.log(html)
})
// const app = express();

    // scrapeIt('https://www.filmweb.pl', {
    //     title: '.header h1',
    //     desc: '.header h2',
    //     avatar: {
    //         selector: '.header img',
    //         attr: 'src',
    //     },
        
    // }).then(({ data, response }) => {
    //     //save data to file
    //     response.status(200).send(data)
    // })    


// app.listen(PORT, () => console.log(`Server is listening on ${PORT}...`));
