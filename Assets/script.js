$(document).ready(function () {
  // INITIALIZING GLOBAL VARIABLES
  let genres = [];
    // EVENT LISTENER FOR SEARCH BUTTON
    $('#searchButton').on('click', function(event) {
        event.preventDefault();
        // API CALL TO TVMAZE; INCLUDES A VARIABLE BASED ON TEXT INPUT FROM USER SEARCH AND A DYNAMIC URL USING THAT INPUT TEXT
        let tvShow = $('#inputSearch').val();
        let queryURL = 'https://api.tvmaze.com/singlesearch/shows?q=' + tvShow;
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function(response){
            console.log(response);
            console.log(response.summary);
            genres = [];
            // LOOP GATHERING GENRE DATA FROM API CALL AND PUSHING EACH ONE INTO AN ARRAY
            let i = 0;
            while (i < response.genres.length) {
                let showGenre = response.genres[i];
                genres.push(showGenre);
                i++;
            };
            // LOOP FOR CREATING A STRING TO BE USED IN THE NEXT API CALL THAT CONCATENATES THE GENRES TOGETHER WITH A CONDITIONAL THAT ADDS A '+' BETWEEN EACH GENRE UNTIL THE LAST ONE IS ADDED WITHOUT A FLOATING '+'
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
            };
            $('.container-books').empty();
            //API CALL TO GOOGLE BOOKS WITH DYNAMIC URL USING INPUT FROM USER AND VARIABLES FORMULATED FROM TVMAZE DATA
            let queryURL2 = 'https://www.googleapis.com/books/v1/volumes?&langRestrict=en&maxResults=40&q=' + tvShow + '+' + totalGenres + '&key=AIzaSyDQcHbPNLRpWvqCjR3cYCQgwCK3Llt09M0';
            $.ajax({
                url: queryURL2,
                method: 'GET'
            }).then(function(response) {
                // LOOP THAT GATHERS DATA FROM GOOGLE BOOKS API CALL AND DYNAMICALLY GENERATES ROWS FOR EACH SEARCH RESULT AND APPENDS EACH TO A CONTAINER
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
                // EVENT LISTENER FOR NAV HOME TEXT THAT CLEARS OUT SEARCH FROM ITS CONTAINER AND RELOADS PAGE
                $('#navTitle').on('click', function(){
                    event.preventDefault();
                    $('.container-books').empty();
                    location.reload();
                });
            });
        });
    });
});
