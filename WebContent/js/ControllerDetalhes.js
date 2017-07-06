var app = angular.module('appDetalhes', ['ngRoute']).
config(function ($routeProvider, $locationProvider){
	
	 // configure the routing rules here
    $routeProvider.when('/detalhe/:videoId', {
    	templateUrl:'detalhe.html',
        controller: 'ControllerDetalhes'
        	
    });
    
	
    $locationProvider.html5Mode(true);
	
})

   


app.controller('ControllerDetalhes', function($scope,$routeParams) {
	
	console.log($routeParams.videoId);
	
});

