'use strict';
app.controller('cadastroController', ['$scope', '$location', '$http', '$rootScope', function ($scope, $location, $http, $rootScope) {

	$scope.voltarInicio = function(){
		$location.path('inicio');
	}


	$('.sonums').keypress(function(event) {
			 var tecla = (window.event) ? event.keyCode : event.which;
			 if ((tecla > 47 && tecla < 58)) return true;
			 else {
					 if (tecla != 8) return false;
					 else return true;
			 }
	 });



	$scope.btnRegister = function(){

		var userNome = $scope.nome.toLowerCase();
		var userMail = $scope.email.toLowerCase();
		var userPassword = $scope.senha.toLowerCase();

		$('#btn-register').html('<div class="sk-circle"><div class="sk-circle1 sk-child"></div><div class="sk-circle2 sk-child"></div><div class="sk-circle3 sk-child"></div><div class="sk-circle4 sk-child"></div><div class="sk-circle5 sk-child"></div><div class="sk-circle6 sk-child"></div><div class="sk-circle7 sk-child"></div><div class="sk-circle8 sk-child"></div><div class="sk-circle9 sk-child"></div><div class="sk-circle10 sk-child"></div><div class="sk-circle11 sk-child"></div><div class="sk-circle12 sk-child"></div></div>');
		$('#btn-register').attr('disabled', true);

		$http({

      method: 'POST',
      url: 'https://api.parse.com/1/functions/register',
      headers:{ "X-Parse-Application-Id" : "UYY2qh6y46aSG6H1wb7JbHbd9SFXDnUli5kRPaJd", "X-Parse-REST-API-Key" : "0zgJ3YoNVgZ3n69XBR222a4qPMMDftgaUrM4TcdS", "Content-Type" : "application/json", "X-Parse-Session-Token" : $rootScope.sessionToken},
			data: {
				name: userNome,
    		email: userMail,
				password: userPassword
			}

      })
      .success(function(response){
        console.log('sucesso');
				$rootScope.sessionToken = response.result.sessionToken;
				$location.path('home');
      })
      .error(function(erro){
        alert('Insira um e-mail válido');
				$('#btn-register').attr('disabled', false);
				$('#btn-register').html('Cadastrar');
      });

	}

}]);
