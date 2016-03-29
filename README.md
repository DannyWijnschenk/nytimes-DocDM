# NYT Book Reviews
This simple project makes use of [AngularJS](https://angularjs.org/) to browse best-seller books by means of the [New York Times API](http://developer.nytimes.com/page).

Original project : 
https://kalimadev.wordpress.com/2016/02/05/hands-on-angularjs-browse-nyt-best-sellers/

Modified to use the Caché Document Store :

<b>genres-controller.js :</b>

change: var url = 'http://api.nytimes.com/svc/books/v3/lists/names.json?api-key=sample-key';

into:   var url = 'http://localhost:57780/api/document/v1/nyt/nytgenres';

change: $scope.genres = response.data;

into:   $scope.genres = []; //response.data.content;
            for (var i = 0; i < response.data.content.length; i++) {
                response.data.content[i].content.list_name_encoded = response.data.content[i].documentID;
                $scope.genres.push(response.data.content[i].content);
            }

<b>genre-controller.js :</b>

change: var url = 'http://api.nytimes.com/svc/books/v3/lists/' + $routeParams.genre + '.json?sort-by=rank&sort-order=ASC&api-key=sample-key';

into:   var url = 'http://localhost:57780/api/document/v1/nyt/nytgenre/'+$routeParams.genre;

change: $scope.books = response.data.results.books;

into:   $scope.books = response.data.content.results.books;

<b>book-controller.js :</b>

change: var url = 'http://api.nytimes.com/svc/books/v3/lists/' + $routeParams.genre + '.json?sort-by=rank&sort-order=ASC&api-key=sample-key',

into:   var url = 'http://localhost:57780/api/document/v1/nyt/nytgenre/'+$routeParams.genre,       

change: for (i = 0; i < response.data.results.books.length; i += 1) {
        b = response.data.results.content.books[i];
        
into:   for (i = 0; i < response.data.results.books.length; i += 1) {
        b = response.data.results.content.books[i];

<b>book.js :</b>

change: var url = 'http://api.nytimes.com/svc/books/v3/lists/' + $routeParams.genre + '.json?sort-by=rank&sort-order=ASC&api-key=sample-key',

into:   var url = 'http://localhost:57780/api/document/v1/nyt/nytgenre/'+$routeParams.genre,

change: for (i = 0; i < response.data.results.books.length; i += 1) {
        b = response.data.results.books[i];
        
into:   for (i = 0; i < response.data.content.results.books.length; i += 1) {
        b = response.data.content.results.books[i];

Added ImportApp.html + import.js to import data from NYT to DocDM
