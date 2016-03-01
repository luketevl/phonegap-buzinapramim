'use strict';
app.controller('loginController', ['$scope', '$location', '$timeout', '$http', '$rootScope', 'GeofenceService', 'localStorageService', function ($scope, $location, $timeout, $http, $rootScope, GeofenceService, localStorageService) {

	$scope.mensagem = false;

	$scope.entrar = function () {

		var userLogin = $scope.userName.toLowerCase();
		var userPassword = $scope.password.toLowerCase();

		$('#btn-login').html('<div class="sk-circle"><div class="sk-circle1 sk-child"></div><div class="sk-circle2 sk-child"></div><div class="sk-circle3 sk-child"></div><div class="sk-circle4 sk-child"></div><div class="sk-circle5 sk-child"></div><div class="sk-circle6 sk-child"></div><div class="sk-circle7 sk-child"></div><div class="sk-circle8 sk-child"></div><div class="sk-circle9 sk-child"></div><div class="sk-circle10 sk-child"></div><div class="sk-circle11 sk-child"></div><div class="sk-circle12 sk-child"></div></div>');
		$('#btn-login').attr('disabled', true);

			$http({

				method: 'POST',
				url: 'https://api.parse.com/1/functions/login',
				headers:{ "X-Parse-Application-Id" : "UYY2qh6y46aSG6H1wb7JbHbd9SFXDnUli5kRPaJd", "X-Parse-REST-API-Key" : "0zgJ3YoNVgZ3n69XBR222a4qPMMDftgaUrM4TcdS", "Content-Type" : "application/json" },
				data:{
					"username": userLogin,
	    		"password": userPassword
				}

				})
				.success(function(response){
					$location.path('home');
					$rootScope.sessionToken = response.result.sessionToken;

					localStorageService.set('authorizationData', {
                        token: response.result.sessionToken,
                        useRefreshTokens: true
                    });


					//GeofenceService.syncGeofence(response.result.sessionToken);
					GeofenceService.watchPosition(response.result.sessionToken);
				})
				.error(function(erro){
					console.log(erro);
					$scope.mensagem = true;
					$scope.password = '';
					$('#btn-login').attr('disabled', false);
					$('#btn-login').html('Entrar');
				});

    };


		$scope.voltarInicio = function(){
			$location.path('inicio');
		};

		GeofenceService.initGeofence();


}]);
