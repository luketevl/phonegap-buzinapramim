'use strict';
app.controller('maisOpcoesController', ['$scope', '$location', '$rootScope', '$http', function ($scope, $location, $rootScope, $http) {

	$scope.cores = [];
	$rootScope.coresSelecionadas = [];

	$scope.goToHome = function () {
        $location.path('home');
  	};


		$scope.btnSalvarMaisOpcoes = function() {

			$rootScope.opcoesSelecionadas = "Editar";

			for (var i = 0; i < $scope.cores.length; i++) {
				if ($scope.cores[i].checked) {
					$rootScope.coresSelecionadas.push($scope.cores[i].colorId);
				}
			};

			$rootScope.anoMinimoSelecionado = $scope.anoInicio
			$rootScope.anoMaximoSelecionado = $scope.anoFim;
			$rootScope.valorCarroSelecionado = $scope.valorCarro;
			$rootScope.kmCarroSelecionado = $scope.kmCarro;

	    $location.path('home');
	  }

		$scope.loading = true;

  	$http({

  		method: 'POST',
  		url: 'https://api.parse.com/1/functions/otherOptions',
  		headers:{ "X-Parse-Application-Id" : "UYY2qh6y46aSG6H1wb7JbHbd9SFXDnUli5kRPaJd", "X-Parse-REST-API-Key" : "0zgJ3YoNVgZ3n69XBR222a4qPMMDftgaUrM4TcdS", "Content-Type" : "application/json",  "X-Parse-Session-Token" : $rootScope.sessionToken},
			data:{
        modelId: $rootScope.modelIdSelecionada
      }

  	})
  	.then(function(response){
			$scope.loading = false;
      $scope.cores = response.data.result.options.colors;
			$scope.anoMinimo = response.data.result.options.minYear;
			$scope.anoMaximo = response.data.result.options.maxYear;
			$scope.precoMinimo = response.data.result.options.minPrice;
			$scope.precoMaximo = response.data.result.options.maxPrice;
			$scope.precoIntervalo = response.data.result.options.priceInterval;
			$scope.kmMinimo = response.data.result.options.minKm;
			$scope.kmMaximo = response.data.result.options.maxKm;
			$scope.kmIntervalo = response.data.result.options.kmInterval;

			$scope.anoInicio = $scope.anoMinimo;
			$scope.anoFim = $scope.anoMaximo;
			$scope.valorCarro = $scope.precoMaximo;
			$scope.kmCarro = $scope.kmMaximo;

			$scope.yearList = [];
			$scope.priceList = [];
			$scope.kmList = [];
			$scope.minPriceList = $scope.precoMinimo;
			$scope.minKmList = $scope.kmMinimo;

			while($scope.anoMinimo <= $scope.anoMaximo){
			  $scope.yearList.push($scope.anoMinimo++);
			}

			while($scope.minPriceList <= $scope.precoMaximo){
			  $scope.priceList.push($scope.minPriceList);
				$scope.minPriceList += $scope.precoIntervalo;
			}

			while($scope.minKmList <= $scope.kmMaximo){
			  $scope.kmList.push($scope.minKmList);
				$scope.minKmList += $scope.kmIntervalo;
			}

    });

}]);
