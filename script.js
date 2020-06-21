$(document).ready(function() {
    // INITIALIZING GLOBAL VARIABLES
    let genres = [];

    $('#searchButton').on('click', function(event) {
        event.preventDefault();
        // API call to tvmaze
        let tvShow = $('#inputSearch').val();
        let queryURL = 'https://api.tvmaze.com/singlesearch/shows?q=' + tvShow;
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function(response){
            console.log(response);
            console.log(response.summary);
            genres = [];
            let i = 0;
            while (i < response.genres.length) {
                let showGenre = response.genres[i];
                genres.push(showGenre);
                i++;
            };
            console.log(genres);
            let totalGenres = '';
            let j = 0;
            while (j < genres.length) {
                if (j < genres.length - 1) {
                    totalGenres += genres[j] + '+';
                }
                else {
                    totalGenres += genres[j];
                };
                j++;
                console.log(totalGenres);
            };
            $('.container-fluid').empty();
            $('.container-books').empty();
            //API call to google books
            let queryURL2 = 'https://www.googleapis.com/books/v1/volumes?key=AIzaSyDQcHbPNLRpWvqCjR3cYCQgwCK3Llt09M0&langRestrict=en&q=subject:' + totalGenres;
            $.ajax({
                url: queryURL2,
                method: 'GET'
            }).then(function(response) {
                console.log(queryURL2);
                console.log(response);
                searchAgainRow = $('<div class="row"><div class ="col-sm-12"><h5 id="prompt">Try another search!</h5></div></div>');
                $('.container-fluid').append(searchAgainRow);
                console.log(tvShow);
                let i = 0;
                while (i < 10) {
                    let bookAuthor = response.items[i].volumeInfo.authors[0];
                    let bookTitle = response.items[i].volumeInfo.title;
                    let bookYear = response.items[i].volumeInfo.publishedDate;
                    let bookDesc = response.items[i].volumeInfo.description;
                    let bookCover = response.items[i].volumeInfo.imageLinks.thumbnail;
                    let bookPrice = response.items[i].saleInfo.buyLink;
                    let searchResultsRow = $('<div class="row"><div class="col-sm-1"><img id = "book' + i + 'Cover" src =' + bookCover + '></img></div><div class="col-sm-2 bookDescription"><p id = "book' + i + 'Title">' + bookTitle + '</p><p id = "book' + i + 'Author">' + bookAuthor + '</p><p id = "book' + i + 'Year">' + bookYear + '</p></div><div id = "book' + i + 'Desc" class="col-sm-8">' + bookDesc + '</div><div class="col-sm-1"><a href="' + bookPrice + '" class="btn btn-link active" role="button" target="_blank" aria-pressed="true">Buy Here</a></div></div><br>');
                    $(".container-books").append(searchResultsRow);
                    i++;
                };
                $('#navTitle').on('click', function(){
                    event.preventDefault();
                    location.reload();
                });
            });
        });
      
    });
    // https://www.googleapis.com/books/v1/volumes?q=search+terms
    /* http://api.tvmaze.com/singlesearch/shows?q=Pok%C3%A9mon */
});
