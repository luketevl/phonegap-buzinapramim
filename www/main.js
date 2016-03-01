var app = angular.module('buzina', ['ngRoute', 'LocalStorageModule', 'angularRipple']);

//var localDB;

app.config(function ($routeProvider) {

	$routeProvider.otherwise({ redirectTo: "/inicio" });

	$routeProvider.when("/inicio", {
		controller: "inicioController",
		templateUrl: "inicio.html"
	});

	$routeProvider.when("/internaBuzinada", {
		controller: "internaBuzinadaController",
		templateUrl: "interna-buzinada.html"
	});

	$routeProvider.when("/cadastro", {
		controller: "cadastroController",
		templateUrl: "cadastro.html"
	});

	$routeProvider.when("/login", {
		controller: "loginController",
		templateUrl: "login.html"
	});

	$routeProvider.when("/home", {
		controller: "homeController",
		templateUrl: "home.html"
	});

	$routeProvider.when("/buzinadas", {
		controller: "buzinadasController",
		templateUrl: "buzinadas.html"
	});

	$routeProvider.when("/anoCarro", {
		controller: "anoCarroController",
		templateUrl: "ano-carro.html"
	});

	$routeProvider.when("/listaMarcas", {
		controller: "listaMarcasController",
		templateUrl: "lista-marcas.html"
	});

	$routeProvider.when("/listaModelos", {
		controller: "listaModelosController",
		templateUrl: "lista-modelos.html"
	});

	$routeProvider.when("/maisOpcoes", {
		controller: "maisOpcoesController",
		templateUrl: "mais-opcoes.html"
	});

	$routeProvider.when("/profile", {
		controller: "profileController",
		templateUrl: "profile.html"
	});

	$routeProvider.when("/resultadoBusca", {
		controller: "resultadoBuscaController",
		templateUrl: "resultado-busca.html"
	});

});


app.directive('transicao', function($timeout){
	return {
		restrict: 'A',

		link: function(scope, element, attrs) {

			element.bind('click', function() {
                    var url = element.attr('transicao-url');
                    var direction = element.attr('transicao-direction');

                    if (url && direction) {
                    	window.plugins.nativepagetransitions.slide({
					        "androiddelay"     :  -1,
					        "direction": direction,
					        "href" : url
						});
					    $timeout(function() {
					        window.plugins.nativepagetransitions.executePendingTransition();
					    }, 400);
			        }

                });





		}
	};
});




app.directive('backButton', function(){
	return {
		restrict: 'A',

		link: function(scope, element, attrs) {
			element.bind('click', goBack);

			function goBack() {
				history.back();
				scope.$apply();
			}
		}
	};
});

//Código para gerenciar o geofence
app.factory('GeofenceService',function($rootScope, $location, $http, $window){
	return {
		initGeofence: function(){
			navigator.geolocation.getCurrentPosition(
      function(position) {
          console.log(position.coords.latitude + ',' + position.coords.longitude);
      },
      function() {
          console.log('Error getting location');
      });
			//localDB = $window.sqlitePlugin.openDatabase({name: 'buzina.db'});
			cordova.plugins.notification.local.registerPermission(function (granted) {
    		console.log('Permission has been granted: ' + granted);
			});
			cordova.plugins.notification.local.on("click", function (notification) {
				var dados = JSON.parse(notification.data);
    		$rootScope.buzinadaId = dados.tootId;
				$location.path('internaBuzinada');
			});


			//CÓDIGO RESPONSÁVEL POR LEVAR O USUÁRIO PARA A LISTA DE CARROS DA BUZINADA QUANDO ELE CLICA NA NOTIFICAÇÃO
			cordova.plugins.notification.local.registerPermission(function (granted) {
    		console.log('Permission has been granted: ' + granted);
				if(granted){
					cordova.plugins.notification.local.on("click", function (notification) {
						var dados = JSON.parse(notification.data);
		    		$rootScope.buzinadaId = dados.tootId;
						$location.path('internaBuzinada');
					});
				}
			});
			// ---------------------------------------------------------------------

			cordova.plugins.backgroundMode.enable();
		},
		watchPosition : function(token){
			var idNotification, userLatitude, userLongitude;
			cordova.plugins.notification.local.clearAll(function() {
					console.log('done');
			}, this);

			navigator.geolocation.getCurrentPosition(
				function(position) {
					userLatitude = position.coords.latitude;
					userLongitude = position.coords.longitude;
				},
				function() {
					console.log('Error getting location');
				}
			);

			setInterval(function(){
				$http({
					method: 'POST',
					url: 'https://api.parse.com/1/functions/toots',
					headers:{ "X-Parse-Application-Id" : "UYY2qh6y46aSG6H1wb7JbHbd9SFXDnUli5kRPaJd", "X-Parse-REST-API-Key" : "0zgJ3YoNVgZ3n69XBR222a4qPMMDftgaUrM4TcdS", "Content-Type" : "application/json", "X-Parse-Session-Token" : token}
				})
				.success(function(response){
					response.result.toots.forEach(function(toot){
						if(toot.receiveNotification){
							$http({

								method: 'POST',
								url: 'https://api.parse.com/1/functions/tootVehicles',
								headers:{ "X-Parse-Application-Id" : "UYY2qh6y46aSG6H1wb7JbHbd9SFXDnUli5kRPaJd", "X-Parse-REST-API-Key" : "0zgJ3YoNVgZ3n69XBR222a4qPMMDftgaUrM4TcdS", "Content-Type" : "application/json", "X-Parse-Session-Token" : token},
								data:{
									tootId: toot.tootId
								}

							})
							.success(function(response){
								response.result.stores.forEach(function(store) {
									store.vehicles.forEach(function (vehicle) {
										//Fórmula de Harvesine
										var R = 6373; //raio da terra
										var latR1 = userLatitude * .017453292519943295;
						        var lonR1 = userLongitude * .017453292519943295;
						        var latR2 = store.latitude * .017453292519943295;
						        var lonR2 = store.longitude * .017453292519943295;

						        var latDifference = latR2 - latR1;
						        var lonDifference = lonR2 - lonR1;
						        var a  = Math.pow(Math.sin(latDifference / 2), 2) + Math.cos(latR1) * Math.cos(latR2) * Math.pow(Math.sin(lonDifference / 2), 2);
						        var c  = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
										var dk = c * R;
										// fim -- Fórmula de Harvesine
						        var distance = Math.round(dk * 10) / 10;
										//alert("Raio: "+distance+"km | Raio para ser notificado: "+toot.geoRadius+"km");
										if(distance <= toot.geoRadius){
											//alert("enviar notificação");
											idNotification = Math.floor((Math.random() * 100) + 1);

											cordova.plugins.notification.local.registerPermission(function (granted) {
							      		if(granted){
													cordova.plugins.notification.local.schedule({
															id: idNotification,
															title: vehicle.brand,
															message: vehicle.modelDescription,
															data: {
																tootId: toot.tootId
															}
													});
							          }
							  			});

										}

									});
								});
							})
							.error(function(erro){
								console.log(erro);
							});
						}
					});
				})
				.error(function(erro){
					console.log("error: "+erro);
				});
			}, 1000);
		}
	};
});

app.directive('loading', function () {
	return {
		restrict: 'E',
		replace:true,
		template: '<div class="spinner"><div class="double-bounce1"></div><div class="double-bounce2"></div></div>',
		link: function (scope, element, attr) {
			scope.$watch('loading', function (val) {
				if (val)
				$(element).show();
				else
				$(element).hide();
			});
		}
	};
});
