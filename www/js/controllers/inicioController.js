'use strict';
app.controller('inicioController', ['$scope', '$rootScope', '$location', 'localStorageService', '$http', 'GeofenceService',  function ($scope, $rootScope, $location, localStorageService, $http, GeofenceService) {
//  GeofenceService.initGeofence();

    var authData = localStorageService.get('authorizationData');

    if (authData != null) {
        $rootScope.sessionToken = authData.token;
        $rootScope.facebookId = authData.facebookId;
        console.log('Token:'+$rootScope.sessionToken);
        $location.path('home');
    }

    $scope.cadastro = function () {
        $location.path('cadastro');
    };

    $scope.login = function () {
        $location.path('login');
    };

    $scope.fbLoginSuccess = function(userData) {


        facebookConnectPlugin.api("me/?fields=id,email,first_name,last_name,gender", ["public_profile", "email"],
            function onSuccess(result) {


                facebookConnectPlugin.getAccessToken(function(token) {

               	$http({

				method: 'POST',
				url: 'https://api.parse.com/1/functions/facebookLogin',
				headers:{ "X-Parse-Application-Id" : "UYY2qh6y46aSG6H1wb7JbHbd9SFXDnUli5kRPaJd", "X-Parse-REST-API-Key" : "0zgJ3YoNVgZ3n69XBR222a4qPMMDftgaUrM4TcdS", "Content-Type" : "application/json" },
				data:{
					name: result.first_name+ ' '+result.last_name,
                    email: result.email,
                    facebookId: result.id,
                    accessToken: token
				}

				})
				.success(function(response){

					$location.path('home');
					$rootScope.sessionToken = response.result.sessionToken;
                    $rootScope.facebookId = result.id;
                    localStorageService.set('authorizationData', {
                        token: response.result.sessionToken,
                        facebookId:result.id,
                        useRefreshTokens: true
                    });

					//GeofenceService.syncGeofence(response.result.sessionToken);
					GeofenceService.watchPosition(response.result.sessionToken);
				})
				.error(function(erro){
					console.log(erro);
                       alert(JSON.stringify(erro));

				});

				angular.element('#botaoFacebook').html('Logado com sucesso');
                angular.element('#botaoFacebook').attr('disabled', false);

                });




            },
            function onError(error) {
                alert("Failed: ", error);

            }
        );




    }


    $scope.LogarFacebook = function() {
        angular.element('#botaoFacebook').html('Carregando...');
        angular.element('#botaoFacebook').attr('disabled', true);
                                    $scope.success = function(result) {
                                    console.log('saiu com sucesso');
                                    }
                                    $scope.failure = function(erro) {
                                    console.log('erro');
                                    }

                                    facebookConnectPlugin.logout($scope.success, $scope.failure);
        facebookConnectPlugin.login(["public_profile", "email"], $scope.fbLoginSuccess,
            function loginError(error) {
                alert(JSON.stringify(error));

                angular.element('#botaoFacebook').html('Entrar com Facebook');
                angular.element('#botaoFacebook').attr('disabled', false);
            }
        );
    }

}]);
