var app = angular.module('appInicio', []);

app.controller('ControllerInicio', function($scope, $http) {
	var key = 'AIzaSyCkhDgkyPJJSYCY6Z7U2jQCA0lbMVEV6E8'

	$scope.submitPesquisa = function() {
				
		 $http.get('https://www.googleapis.com/youtube/v3/search?part=id,snippet&q='+$scope.busca.conteudo+'&key='+key)
		    .then(function(response) {
		        
		    	for(var i=0; i<response.data.items.length;i++)
		    	$scope.videos.push(response.data.items[i]);
		        $scope.nextPage = response.data.nextPageToken;
		    });
		
		
	 }
	
	$scope.submitNextPage = function() {
		
		 $http.get('https://www.googleapis.com/youtube/v3/search?part=id,snippet&q='+$scope.busca.conteudo+'&pageToken='+$scope.nextPage+'&key='+key)
		    .then(function(response) {
		        
		    	for(var i=0; i<response.data.items.length;i++)
		    	$scope.videos.push(response.data.items[i]);
		    	$scope.nextPage = response.data.nextPageToken;
		    	$scope.prevPage = response.data.prevPageToken;
		    });
		
		
	 }
	
	$scope.submitPrevPage = function() {
		
		 $http.get('https://www.googleapis.com/youtube/v3/search?part=id,snippet&q='+$scope.busca.conteudo+'&pageToken='+$scope.prevPage+'&key='+key)
		    .then(function(response) {
		        
		    	for(var i=0; i<response.data.items.length;i++)
		    	$scope.videos.push(response.data.items[i]);
		    	$scope.nextPage = response.data.nextPageToken;
		    	$scope.prevPage = response.data.prevPageToken;
		    });
		
		
	 }
    
    $scope.videos = [];
    $scope.busca = {};
    $scope.conteudo = {};
    $scope.nextPage;
    $scope.prevPage;
});