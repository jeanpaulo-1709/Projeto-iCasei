var app = angular.module('appInicio', []);

app.controller('ControllerInicio', function($scope, $http) {
	var key = 'AIzaSyCkhDgkyPJJSYCY6Z7U2jQCA0lbMVEV6E8'

	//Método responsável por fazer a requisição HTTP, passando como parâmetro a String da pesquisa.	
	$scope.submitPesquisa = function() {
				
		 $http.get('https://www.googleapis.com/youtube/v3/search?part=id,snippet&q='+$scope.busca.conteudo+'&key='+key)
		    .then(function(response) {
		    	
		    	//Limpa Array de vídeos para evitar repetições.
		    	for(var i=0; i<$scope.videos.length;i++) 
			    $scope.videos.splice(i)
			    
			    //Adiciona os vídeos no array.
		    	for(var i=0; i<response.data.items.length;i++)
		    	$scope.videos.push(response.data.items[i]);
		        $scope.nextPage = response.data.nextPageToken;
		    });
		
		
	 }
	
	$scope.submitNextPage = function() {
		
		//Método responsável por fazer a requisição HTTP, passando como parâmetro a String da pesquisa e Token de Next Page.	
		 $http.get('https://www.googleapis.com/youtube/v3/search?part=id,snippet&q='+$scope.busca.conteudo+'&pageToken='+$scope.nextPage+'&key='+key)
		    .then(function(response) {
		    	
		    	//Limpa Array de vídeos para evitar repetições.
		    	for(var i=0; i<$scope.videos.length;i++) 
		    	$scope.videos.splice(i)
		    	
		    	//Adiciona os vídeos no array e atualiza variáveis next e preview page
		    	for(var i=0; i<response.data.items.length;i++)
		    	$scope.videos.push(response.data.items[i]);
		    	$scope.nextPage = response.data.nextPageToken;
		    	$scope.prevPage = response.data.prevPageToken;
		    });
		
		
	 }
	
	$scope.submitPrevPage = function() {
		
		//Método responsável por fazer a requisição HTTP, passando como parâmetro a String da pesquisa e Token de Preview Page.	
		 $http.get('https://www.googleapis.com/youtube/v3/search?part=id,snippet&q='+$scope.busca.conteudo+'&pageToken='+$scope.prevPage+'&key='+key)
		    .then(function(response) {

		    	//Limpa Array de vídeos para evitar repetições.
		    	for(var i=0; i<$scope.videos.length;i++) 
			    	$scope.videos.splice(i)
			    
			    //Adiciona os vídeos no array e atualiza variáveis next e preview page
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