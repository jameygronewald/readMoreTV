$(document).ready(function () {
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
            $('.container').empty();
            $('.container-books').empty();
            //API call to google books
            let queryURL2 = 'https://www.googleapis.com/books/v1/volumes?&langRestrict=en&maxResults=40&q=' + tvShow + '+' + totalGenres + '&key=AIzaSyDQcHbPNLRpWvqCjR3cYCQgwCK3Llt09M0';
            $.ajax({
                url: queryURL2,
                method: 'GET'
            }).then(function(response) {
                console.log(queryURL2);
                console.log(response);
                searchAgainRow = $('<div class="row"><div class ="col-sm-12"><h5 id="prompt">Still browsing? Try another search!</h5></div></div>');
                $('.container').append(searchAgainRow);
                console.log(tvShow);
                let i = 0;
                while (i < 40) {
                    let bookAuthor = response.items[i].volumeInfo.authors;
                    let bookTitle = response.items[i].volumeInfo.title;
                    let bookYear = response.items[i].volumeInfo.publishedDate;
                    let bookDesc = response.items[i].volumeInfo.description;
                    let bookCover = response.items[i].volumeInfo.imageLinks.thumbnail;
                    let bookPrice = response.items[i].saleInfo.buyLink;
                    let searchResultsRow = $('<div class="row searchRow"><div class="col-lg-2"><img id = "book' + i + 'Cover" src =' + bookCover + '></img></div><div class="col-md-2 bookDescription"><p id = "book' + i + 'Title">' + "Title: "+ bookTitle + '</p><p id = "book' + i + 'Author">' + "Author: " + bookAuthor + '</p><p id = "book' + i + 'Year">' + "Release Date: " + bookYear + '</p><a href="' + bookPrice + '" class="btn btn-dark active rounded-pill" role="button" target="_blank" aria-pressed="true">Buy Here</a></div><div id = "book' + i + 'Desc" class="col-sm-8">' + bookDesc + '</div></div><br>');
                    $(".container-books").append(searchResultsRow);
                    i++;
                   
                };
if (bookDesc.length > 50)   {
    
}

                $('#navTitle').on('click', function(){
                    event.preventDefault();
                    $('.container-books').empty();
                    location.reload();
                });
            });
        });
      
    });
    // https://www.googleapis.com/books/v1/volumes?q=search+terms
    /* http://api.tvmaze.com/singlesearch/shows?q=Pok%C3%A9mon */
});
