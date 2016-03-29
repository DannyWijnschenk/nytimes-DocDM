(function () {

    'use strict';

    var app = angular.module('NYTBestSellers');

    app.controller('GenresController', function ($scope, $routeParams, $http) {
        //1//var url = 'http://api.nytimes.com/svc/books/v3/lists/names.json?api-key=sample-key';
        var url = 'http://localhost:57780/api/document/v1/nyt/nytgenres';
        $http.get(url).then(function (response) {
            //2//$scope.genres = response.data.results;
            //add some JS code to remove the content wrapper from the documents
            $scope.genres = []; //response.data.content;
            for (var i = 0; i < response.data.content.length; i++) {
                response.data.content[i].content.list_name_encoded = response.data.content[i].documentID;
                $scope.genres.push(response.data.content[i].content);
            }
            //end of 2//
        }).catch(function (e) {
            $scope.error = e;
        });
    });

}());