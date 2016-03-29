var ImportApp = angular.module('ImportApp', ['ngResource']);


 HostURL = function() {
    return "http://"+document.domain+"\\:"+location.port+"/";
 };

ImportApp.factory('restNYTGenres', function ($resource) {
    return $resource(
		"http://api.nytimes.com/svc/books/v3/lists/names.json?api-key=475ceb119c05393c516cddafdd218ad3:3:74356924", {}, {
		query: {method: 'GET', isArray: false},
		});
 });

ImportApp.factory('restNYTGenre', function ($resource) {
    return $resource(
		"http://api.nytimes.com/svc/books/v3/lists/:genre.json?api-key=475ceb119c05393c516cddafdd218ad3:3:74356924", {}, {
		query: {method: 'GET', isArray: false},
		});
 });

ImportApp.factory('restDocDBGenres', function ($resource) {
    return $resource(
		HostURL() + "api/document/v1/NYT/nytgenres", {}, {
		update: { method: "POST",
		         isArray: false,
		         headers:{'accept':'application/json'} }
		});	
   });

ImportApp.factory('restDocDBGenre', function ($resource) {
    return $resource(
		HostURL() + "api/document/v1/NYT/nytgenre", {}, {
		update: { method: "POST",
		         isArray: false,
		         headers:{'accept':'application/json'} }
		});	
   });
   
ImportApp.controller('ImportController', ['$scope','$resource','restNYTGenres','restNYTGenre','restDocDBGenres','restDocDBGenre',
                                  function($scope,  $resource,  restNYTGenres,  restNYTGenre,  restDocDBGenres,  restDocDBGenre) {
  
    
  $scope.importGenres = function() {
  	console.log(" importing ...");
    
  	restNYTGenres.query( function(dataGenres) {
	   $scope.response = dataGenres.results;
	   for (var i=0; i < dataGenres.results.length; i++) {
         restDocDBGenres.update(dataGenres.results[i], function(dataGenre) {
			console.log('updated genre in docstore',dataGenre);
         });
	   }
	  
	  //we need to wait a bit between each rest call to NYT !!!
	   var offset = 500;
	   dataGenres.results.forEach(function(genre) {
		   setTimeout(function() {
			   console.log(genre.list_name_encoded);
		       restNYTGenre.query( {genre:genre.list_name_encoded}, function(dataGenre) {
                  restDocDBGenre.update(dataGenre, function(dataGenre) {
			      console.log("to docstore : ",dataGenre);
               });
		   });

		   }, 500+offset);
		   offset += 1500;
	   });
	   

 	});
  };

                                           
}]);
