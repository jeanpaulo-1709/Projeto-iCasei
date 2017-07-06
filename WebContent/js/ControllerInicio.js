var app = angular.module('appInicio',[]);

/*app.config(function($routeProvider) {
    $routeProvider.when('/detalhes/:videoId',
{
      templateUrl: "/detalhes.html",
      controller: "ControllerDetalhes"
      })
    .otherwise({redirect:'/'})
    ;
});
*/

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
		    	$scope.prevPage = response.data.prevPageToken;
		        $scope.resultOk = true;
		        
		        if(response.data.nextPageToken != null){	    	
		    		$scope.resultProxPage = true;
		    	}else{
		    		 $scope.resultProxPage = false;
		    	}
		    	
		    	if(response.data.prevPageToken != null){	    	
		    		$scope.resultPrevPage = true;
		    	}else{
		    		 $scope.resultPrevPage = false;
		    	}
		        
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
		    	
		    	if(response.data.nextPageToken != null){	    	
		    		$scope.resultProxPage = true;
		    	}else{
		    		 $scope.resultProxPage = false;
		    	}
		    	
		    	if(response.data.prevPageToken != null){	    	
		    		$scope.resultPrevPage = true;
		    	}else{
		    		 $scope.resultPrevPage = false;
		    	}
		    	
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
		    	
		    	if(response.data.nextPageToken != null){	    	
		    		$scope.resultProxPage = true;
		    	}else{
		    		 $scope.resultProxPage = false;
		    	}
		    	
		    	if(response.data.prevPageToken != null){	    	
		    		$scope.resultPrevPage = true;
		    	}else{
		    		 $scope.resultPrevPage = false;
		    	}
		    	
		    });
		
		
	 }
	
	
	$scope.submitDetalhe = function() {
		
		 $http.get('https://www.googleapis.com/youtube/v3/videos?id='+$scope.videoid+'&part=snippet,statistics&key='+key)
		    .then(function(response) {
		    	
		    	
		    	$scope.embed.push(response.data.items[0]);
		    	console.log(embed);
		        
		    });
		
		
	 }
	
	
	$scope.embed = [];
    $scope.videos = [];
    $scope.busca = {};
    $scope.conteudo = {};
    $scope.nextPage;
    $scope.prevPage;
    $scope.resultOk = false;
    $scope.resultNextPage;
    $scope.resultPrevPage;
    
});

