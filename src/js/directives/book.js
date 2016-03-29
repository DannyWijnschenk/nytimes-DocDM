(function () {

    'use strict';

    var app = angular.module('NYTBestSellers');

    app.directive('book', function () {
        return {
            restrict: 'E',
            templateUrl: 'src/html/directives/book.html',
            controller: function ($scope, $routeParams, $http) {
                $scope.id = $routeParams.id;
                $scope.isbn = $routeParams.isbn;
                //7//var url = 'http://api.nytimes.com/svc/books/v3/lists/' + $routeParams.genre + '.json?sort-by=rank&sort-order=ASC&api-key=sample-key',
                var url = 'http://localhost:57780/api/document/v1/nyt/nytgenre/'+$routeParams.genre,
                    i,
                    b;
                $http.get(url).then(function (response) {
                    //8//add content wrapper in response
                    for (i = 0; i < response.data.content.results.books.length; i += 1) {
                        b = response.data.content.results.books[i];
                        if (b.isbns[0].isbn13 === $routeParams.isbn) {
                            $scope.book = b;
                            break;
                        }
                    }
                }).catch(function (e) {
                    $scope.error = e;
                });
            }
        };
    });

}());