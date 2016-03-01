'use strict';
app.controller('homeController', ['$scope', '$location', '$http', '$rootScope', function ($scope, $location, $http , $rootScope) {

    $scope.load = function () {

        $('.flexslider').flexslider({
           animation: "slide",
           start: function(slider){
           $('body').removeClass('loading');
          }
       });
    };

    $scope.marca = $rootScope.marcaSelecionada || 'Selecione';

    $scope.outrasOpcoes = $rootScope.opcoesSelecionadas || 'Selecione';

    $scope.modelo = $rootScope.modeloSelecionado || 'Selecione';

    if ($scope.marca == 'Selecione' || $scope.modelo == 'Selecione' || $scope.outrasOpcoes == 'Selecione') {
      $('.search-btn').prop('disabled', true);
    }

    if ($rootScope.marcaSelecionada){
        $('#brand-selected').addClass( "changedContent" );
    };

    if ($rootScope.modeloSelecionado == null || $rootScope.modeloSelecionado == 'Selecione'){
        $('#model-car-selected').removeClass( "changedContent" );
    }else{
        $('#model-car-selected').addClass( "changedContent" );
    }

    if ($rootScope.opcoesSelecionadas == null || $rootScope.opcoesSelecionadas == 'Selecione'){
          $('#more-selected').removeClass( "changedContent" );
    }else{
          $('#more-selected').addClass( "changedContent" );
    }


    $scope.marcaDoCarro = function () {

        if ($rootScope.modeloSelecionado) {
          $rootScope.modeloSelecionado = 'Selecione';
        }

        if ($rootScope.opcoesSelecionadas) {
          $rootScope.opcoesSelecionadas = 'Selecione';
        }

        $location.path('listaMarcas');
    };

    $scope.modeloDoCarro = function () {
        $location.path('listaModelos');
    };

    $scope.maisOpcoes = function () {
        $location.path('maisOpcoes');
    };

    $scope.buzinadas = function () {
        $location.path('buzinadas');
    };

    $scope.goToHome = function () {
        $location.path('home');
    };

    $scope.profile = function () {
        $location.path('profile');
    };

    $scope.resultadoBusca = function () {

      $('#btn-busca').html('<div class="sk-circle"><div class="sk-circle1 sk-child"></div><div class="sk-circle2 sk-child"></div><div class="sk-circle3 sk-child"></div><div class="sk-circle4 sk-child"></div><div class="sk-circle5 sk-child"></div><div class="sk-circle6 sk-child"></div><div class="sk-circle7 sk-child"></div><div class="sk-circle8 sk-child"></div><div class="sk-circle9 sk-child"></div><div class="sk-circle10 sk-child"></div><div class="sk-circle11 sk-child"></div><div class="sk-circle12 sk-child"></div></div>');
  		$('#btn-busca').attr('disabled', true);

      $location.path('resultadoBusca');
    };



}]);
