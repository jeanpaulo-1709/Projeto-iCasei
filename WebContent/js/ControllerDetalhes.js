var app = angular.module('appDetalhes', []);

app.controller('ControllerDetalhes', function($scope,$location,$http,$rootScope) {
	
//Pegando id do video pela URL
var query = location.search.slice(1);
var partes = query.split('&');
var videoId = {};
partes.forEach(function (parte) {
var chaveValor = parte.split('=');
var chave = chaveValor[0];
var valor = chaveValor[1];
var idvideo = valor;

var key = 'AIzaSyCkhDgkyPJJSYCY6Z7U2jQCA0lbMVEV6E8'

$scope.videos =[{"url":"https://www.youtube.com/watch?v="+idvideo}];

$http.get('https://www.googleapis.com/youtube/v3/videos?id='+idvideo+'&part=snippet,statistics&key='+key)
	    .then(function(response) {
		   
	    	  $scope.id = response.data.items[0];
	    	  $scope.title = response.data.items[0].snippet.title;
	    	  $scope.description = response.data.items[0].snippet.description;
	    	  $scope.visualizacoes = response.data.items[0].statistics.viewCount;
	    
	    });

var history = [];

$rootScope.$on('$routeChangeSuccess', function() {
    history.push($location.$$path);
});

$rootScope.back = function () {
    var prevUrl = history.length > 1 ? history.splice(-2)[0] : "/";
    $location.path(prevUrl);
};
    
   
});

});


//Filtra e prepara o link
app.filter("GetYouTubeID", function () {
  return function (text) {
      var video_id = text.split('v=')[1].split('&')[0];
      return video_id;
  }
})




