var app = angular.module('appResultado', []);

app.controller('ControllerResultado', function($scope,$location,$http,$rootScope) {
	
//Pegando id do video pela URL
var query = location.search.slice(1);
var partes = query.split('&');

var chaveValor;
var chave;
var valor;
var busca;

partes.forEach(function (parte) {

 chaveValor = parte.split('=');
 chave = chaveValor[0];
 parametro = chaveValor[1];



});

var key = 'AIzaSyCkhDgkyPJJSYCY6Z7U2jQCA0lbMVEV6E8'

	//Método responsável por fazer a requisição HTTP, passando como parâmetro a String da pesquisa.	
	 $http.get('https://www.googleapis.com/youtube/v3/search?part=id,snippet&q='+parametro+'&key='+key)
	    .then(function(response) {
	    	
	    	//Limpa Array de vídeos para evitar repetições.
	    	for(var i=0; i<$scope.videos.length;i++) 
		    $scope.videos.splice(i)
		    
		    //Adiciona os vídeos no array.
		    //Verifica se é video ou canal, só adiciona se for video.
	    	for(var i=0; i<response.data.items.length;i++){
	    	if(response.data.items[i].id.kind != "youtube#channel" && response.data.items[i].id.kind != "youtube#playlist")	
	    	$scope.videos.push(response.data.items[i]);
	    	}
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
	
$scope.submitNextPage = function() {
	
	//Método responsável por fazer a requisição HTTP, passando como parâmetro a String da pesquisa e Token de Next Page.	
	 $http.get('https://www.googleapis.com/youtube/v3/search?part=id,snippet&q='+parametro+'&pageToken='+$scope.nextPage+'&key='+key)
	    .then(function(response) {
	    	
	    	//Limpa Array de vídeos para evitar repetições.
	    	for(var i=0; i<$scope.videos.length;i++) 
	    	$scope.videos.splice(i)
	    	
	    	//Adiciona os vídeos no array e atualiza variáveis next e preview page.
	    	//Verifica se é video ou canal, só adiciona se for video.
	    	for(var i=0; i<response.data.items.length;i++){
		    	if(response.data.items[i].id.kind != "youtube#channel" && response.data.items[i].id.kind != "youtube#playlist")	
		    	$scope.videos.push(response.data.items[i]);
		    	}
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
	 $http.get('https://www.googleapis.com/youtube/v3/search?part=id,snippet&q='+parametro+'&pageToken='+$scope.prevPage+'&key='+key)
	    .then(function(response) {

	    	//Limpa Array de vídeos para evitar repetições.
	    	for(var i=0; i<$scope.videos.length;i++) 
		    	$scope.videos.splice(i)
		    
		    //Adiciona os vídeos no array e atualiza variáveis next e preview page
		    //Verifica se é video ou canal, só adiciona se for video.
		    for(var i=0; i<response.data.items.length;i++){
		    	if(response.data.items[i].id.kind != "youtube#channel" && response.data.items[i].id.kind != "youtube#playlist")	
		    	$scope.videos.push(response.data.items[i]);
			}
	    	
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


$scope.videos = [];
$scope.busca = {};
$scope.conteudo = {};
$scope.nextPage;
$scope.prevPage;
$scope.resultOk = false;
$scope.resultNextPage;
$scope.resultPrevPage;



});





