(function () {

    'use strict';

    var app = angular.module('NYTBestSellers');

    app.controller('GenreController', function ($scope, $routeParams, $http) {
        //3//var url = 'http://api.nytimes.com/svc/books/v3/lists/' + $routeParams.genre + '.json?sort-by=rank&sort-order=ASC&api-key=sample-key';
        var url = 'http://localhost:57780/api/document/v1/nyt/nytgenre/'+$routeParams.genre;
        $http.get(url).then(function (response) {
            //4//add content wrapper in response
            $scope.books = response.data.content.results.books;
            $scope.genre = $routeParams.genre;
        }).catch(function (e) {
            $scope.error = e;
        });
    });

}());