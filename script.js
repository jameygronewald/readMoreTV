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
            genres = [];
            let i = 0;
            while (i < response.genres.length) {
                let showGenre = response.genres[i];
                genres.push(showGenre);
                i++;
            };
            console.log(genres);
            $('.container-fluid').empty();
            //API call to google books
            let queryURL2 = 'https://www.googleapis.com/books/v1/volumes?key=AIzaSyDQcHbPNLRpWvqCjR3cYCQgwCK3Llt09M0&q=subject:' + genres[0];
            $.ajax({
                url: queryURL2,
                method: 'GET'
            }).then(function(response) {
                console.log(response);
                let i = 0;
                while (i < 10) {
                    let bookAuthor = response.items[i].volumeInfo.authors[0];
                    let bookTitle = response.items[i].volumeInfo.title;
                    let bookYear = response.items[i].volumeInfo.publishedDate;
                    let bookDesc = response.items[i].volumeInfo.description;
                    let bookCover = response.items[i].volumeInfo.imageLinks.thumbnail;
                    console.log(bookAuthor, bookTitle, bookYear, bookDesc, bookCover);

                    let searchResultsRow = $('<div class="row"><div class="col-sm-1"><img id = "book1Cover" src =' + bookCover + '></img></div><div class="col-sm-2"><p id = "book1Title">' + bookTitle + '</p><p id = "book1Author">' + bookAuthor + '</p><p id = "book1Year">' + bookYear + '</p></div><div id = "book1Desc" class="col-sm-8">' + bookDesc + '</div><div class="col-sm-1"><button type="button" class="btn btn-link" id = "book1BuyBtn">Buy Here</button></div></div><br>');
                    $(".container-fluid").append(searchResultsRow);
                    i++;
                }
            });
        });
        $('#book1BuyBtn').on('click', function(event) {
            event.preventDefault();
           let amazonURL = 'https://www.amazon.com/s?k=' + bookTitle[i] + '&ref=nb_sb_noss_2';
         

    });
    });
    // https://www.googleapis.com/books/v1/volumes?q=search+terms
    /* http://api.tvmaze.com/singlesearch/shows?q=Pok%C3%A9mon */
});
