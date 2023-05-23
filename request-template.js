/*
Name: Salvador Cornejo
Course: CS 4220
Homework: 1
Description: This is an assignment to practice functions, methods, 
string properties, and other things in the Javascript programming language.
Date Due: 02/15/23

*/


// require in your prefered module/library to make http requests (superagent, axios, etc)
 const superagent = require('superagent');


const websites = {
    dummyjson: {
        name: 'Dummy JSON',
        url: 'https://dummyjson.com/products/1'
    },
    spotify: {
        name: 'Spotify',
        url: 'http://www.spotify.com/us/'
    },
    nasa: {
        name: 'NASA',
        url: 'https://www.nasa.gov/error/'
    },
    unknown: {
        name: 'Unknown',
        url: null
    }
};

// // # 2 - Write the requestPromise() function which uses your http request module
const requestPromise = (url, callee) => {
    const start = Date.now();
    return new Promise((resolve, reject) => {
        superagent.get(url).end((error, response) => {
            const millis = Date.now() - start;
            console.log(millis);
            if(!error) {
                resolve({
                    url: url,
                    duration: millis,
                    statusCode: response.status,
                    contentType: response.headers['content-type'],
                    callee: callee
                })
            } else {
                reject({
                    url: url,
                    statusCode: response.status,
                    callee: callee
                })
            }
        });
    })
};


// // # 3 - Invoke the requestPromise() using then/catch for each websites object above
requestPromise(websites.dummyjson.url, 'promise').then(response => console.log(response)).catch(error => console.log(error));
requestPromise(websites.spotify.url, 'promise').then(response => console.log(response)).catch(error => console.log(error));
requestPromise(websites.nasa.url, 'promise').then(response => console.log(response)).catch(error => console.log(error));
requestPromise(websites.unknown.url, 'promise').then(response => console.log(response)).catch(error => console.log(error));


// // # 4 - Write the requestWrapper() function which interacts with the requestPromise() function
const requestWrapper = async (url, callee) => {
    try {
        const obj = await requestPromise(url, callee);
        console.log(obj);
    }
    catch (error) {
        console.log(error);
    }
}

// // # 5 - Invoke the requestWrapper() for each websites object above
requestWrapper(websites.dummyjson.url, 'async/await');
requestWrapper(websites.spotify.url, 'async/await');
requestWrapper(websites.nasa.url, 'async/await');
requestWrapper(websites.unknown.url, 'async/await');
