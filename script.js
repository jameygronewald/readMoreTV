// INITIALIZING GLOBAL VARIABLES
let genres = [];

$('#button').on('click', function(event) {
    event.preventDefault();
    // API call to tvmaze
    let queryURL = 'http://api.tvmaze.com/singlesearch/shows?q=Pok%C3%A9mon'
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function(response){
        console.log(response);
        let i = 0;
        while (i < response.genres.length) {
            let showGenre = response.genres[i];
            genres.push(showGenre);
            i++;
        }
        console.log(genres);
        let queryURL2 = 'https://www.googleapis.com/books/v1/volumes?key=AIzaSyDQcHbPNLRpWvqCjR3cYCQgwCK3Llt09M0&q=subject:' + genres[0];
        $.ajax({
            url: queryURL2,
            method: 'GET'
        }).then(function(response) {
            console.log(response);
        })
    })

    //API call to google books
}); 


// https://www.googleapis.com/books/v1/volumes?q=search+terms
/* http://api.tvmaze.com/singlesearch/shows?q=Pok%C3%A9mon */