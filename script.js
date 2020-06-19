// INITIALIZING GLOBAL VARIABLES
let genres = [];

$('#searchButton').on('click', function(event) {
    event.preventDefault();
    // API call to tvmaze
    let tvShow = $('#inputSearch').val();
    let queryURL = 'http://api.tvmaze.com/singlesearch/shows?q=' + tvShow;
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function(response){
        console.log(response);
        genres = [];
        let i = 0;
        while (i < response.genres.length) {
            let showGenre = response.genres[i];
            genres.push(showGenre);
            i++;
        };
        console.log(genres);
        $('.container').empty();
        //API call to google books
        let queryURL2 = 'https://www.googleapis.com/books/v1/volumes?key=AIzaSyDQcHbPNLRpWvqCjR3cYCQgwCK3Llt09M0&q=subject:' + genres[0];
        $.ajax({
            url: queryURL2,
            method: 'GET'
        }).then(function(response) {
            console.log(response);
        });
    });

}); 


// https://www.googleapis.com/books/v1/volumes?q=search+terms
/* http://api.tvmaze.com/singlesearch/shows?q=Pok%C3%A9mon */