'use strict';
app.controller('listaMarcasController', ['$scope', '$location', '$http', '$rootScope' , function ($scope, $location, $http, $rootScope) {

$scope.marcas = [];


	$scope.goToHome = function () {
      $location.path('home');
  };

  $scope.itemSelected = function(){

      for (var i = 0; i < $scope.marcas.length; i++) {
        if ($scope.marcas[i].checked ) {
          $rootScope.marcaSelecionada = $scope.marcas[i].name;
					$rootScope.brandIdSelecionada = $scope.marcas[i].brandId;
        }
      };

      $location.path('home');
  }

	$scope.loading = true;


  $http({

  	method: 'POST',
  	url: 'https://api.parse.com/1/functions/brands',
  	headers:{ "X-Parse-Application-Id" : "UYY2qh6y46aSG6H1wb7JbHbd9SFXDnUli5kRPaJd", "X-Parse-REST-API-Key" : "0zgJ3YoNVgZ3n69XBR222a4qPMMDftgaUrM4TcdS", "Content-Type" : "application/json", "X-Parse-Session-Token" : $rootScope.sessionToken}

  	})
  	.then(function(response){
			$scope.loading = false;
      $scope.marcas = response.data.result.brands;
    });






  }]);
