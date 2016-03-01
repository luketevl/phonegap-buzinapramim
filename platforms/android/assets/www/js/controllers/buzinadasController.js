'use strict';
app.controller('buzinadasController', ['$scope', '$location', '$http', '$rootScope', function ($scope, $location, $http, $rootScope) {

	$scope.goToHome = function () {
		$location.path('home');
	};

	$scope.profile = function () {
		$location.path('profile');
	};

	// rota para lista de carros da buzinada
	$scope.buzinadaList = function(id){
		$rootScope.buzinadaId = id;
		$location.path('internaBuzinada');
	}

	$scope.formatReal = function( valor ){

		var inteiro = null, decimal = null, c = null, j = null;
		var aux = [];
		valor = ""+valor;
		c = valor.indexOf(".",0);

		if(c > 0){

			inteiro = valor.substring(0,c);
			decimal = valor.substring(c+1,valor.length);
		}else{
			inteiro = valor;
		}

		for (j = inteiro.length, c = 0; j > 0; j-=3, c++){
			aux[c]=inteiro.substring(j-3,j);
		}

		inteiro = "";
		for(c = aux.length-1; c >= 0; c--){
			inteiro += aux[c]+'.';
		}

		inteiro = inteiro.substring(0,inteiro.length-1);

		decimal = parseInt(decimal);
		if(isNaN(decimal)){
			decimal = "00";
		}else{
			decimal = ""+decimal;
			if(decimal.length === 1){
				decimal = "0"+decimal;
			}
		}
		valor = inteiro+","+decimal;
		return valor;

	}

	$scope.loading = true;

	$http({

		method: 'POST',
		url: 'https://api.parse.com/1/functions/toots',
		headers:{ "X-Parse-Application-Id" : "UYY2qh6y46aSG6H1wb7JbHbd9SFXDnUli5kRPaJd", "X-Parse-REST-API-Key" : "0zgJ3YoNVgZ3n69XBR222a4qPMMDftgaUrM4TcdS", "Content-Type" : "application/json", "X-Parse-Session-Token" : $rootScope.sessionToken}

	})
	.success(function(response){
		$scope.loading = false;
		$scope.buzinadas = response.result.toots;
	})
	.error(function(erro){
		console.log(erro);
	});

	// rotina para atualizar os em caso de desmarcar o recebimento de notificação
	$scope.CheckBoxChanged = function (status,tootId) {

		$('.label-switch').css('display', 'none');
		$('.checkbox-loader').css('display', 'block');
		$('.checkbox-loader').html('<div class="sk-circle"><div class="sk-circle1 sk-child"></div><div class="sk-circle2 sk-child"></div><div class="sk-circle3 sk-child"></div><div class="sk-circle4 sk-child"></div><div class="sk-circle5 sk-child"></div><div class="sk-circle6 sk-child"></div><div class="sk-circle7 sk-child"></div><div class="sk-circle8 sk-child"></div><div class="sk-circle9 sk-child"></div><div class="sk-circle10 sk-child"></div><div class="sk-circle11 sk-child"></div><div class="sk-circle12 sk-child"></div></div>')

		var apiOperation;
		if(status){
			apiOperation = "enableToot";
		}else{
			apiOperation = "disableToot";
		}
		$http({

			method: 'POST',
			url: 'https://api.parse.com/1/functions/'+apiOperation,
			headers:{ "X-Parse-Application-Id" : "UYY2qh6y46aSG6H1wb7JbHbd9SFXDnUli5kRPaJd", "X-Parse-REST-API-Key" : "0zgJ3YoNVgZ3n69XBR222a4qPMMDftgaUrM4TcdS", "Content-Type" : "application/json", "X-Parse-Session-Token" : $rootScope.sessionToken},
			data:{
				"tootId":tootId
			}

		})
		.success(function(response){
			$('.checkbox-loader').css('display', 'none');
			$('.label-switch').css('display', 'inline-block');
		})
		.error(function(erro){
			console.log(erro);
		});

	};


}]);
