'use strict';
app.controller('anoCarroController', ['$scope', '$location', '$rootScope', function ($scope, $location, $rootScope) {

	$scope.goToHome = function () {
    $location.path('home');
  };

  $scope.saveYear = function() {
		$rootScope.anoInicioSelecionado = $scope.anoInicio + " á ";
		$rootScope.anoFimSelecionado = $scope.anoFim;
    $location.path('home');
  }

}]);
