app.controller('internaBuzinadaController', ['$scope', '$location', '$http', '$rootScope', function ($scope, $location, $http, $rootScope) {

	$scope.goToHome = function () {
		$location.path('home');
	};

	$scope.openModal = function(event){
		$(event.currentTarget).parent().parent().parent().children('.car-modal').show("fast");
		$(event.currentTarget).parent().parent().parent().children('.car-modal').children('.car-modal-content').show();
	}

	$scope.closeModal = function(){
		$(".car-modal-content").hide();
		$(".car-modal").hide();
	}

	$scope.abrirOpcoesBuzinadas = function(event){
		$(event.currentTarget).hide();
		$('.buzinada-modal').css( "display", "block" );
		$('.kilometragem-buzinadas').show();
	}

	$scope.fecharOpcoesBuzinadas = function(){
		$('.buzinada-modal').css( "display", "none" );
		$('.btnBuzinadas').show();
	}

	$scope.loading = true;

	$scope.formatReal = function( valor ){

		var inteiro = null, decimal = null, c = null, j = null;
		var aux = new Array();
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

	$http({

		method: 'POST',
		url: 'https://api.parse.com/1/functions/tootVehicles',
		headers:{ "X-Parse-Application-Id" : "UYY2qh6y46aSG6H1wb7JbHbd9SFXDnUli5kRPaJd", "X-Parse-REST-API-Key" : "0zgJ3YoNVgZ3n69XBR222a4qPMMDftgaUrM4TcdS", "Content-Type" : "application/json", "X-Parse-Session-Token" : $rootScope.sessionToken},
		data:{
			tootId: $rootScope.buzinadaId
		}

	})
	.success(function(response){
		$scope.loading = false;

		var cars = [];
		response.result.stores.forEach(function(store) {
			store.vehicles.forEach(function (vehicle) {
                                   assembleCars  =  {
                                   "latitude": store.latitude,
                                   "longitude": store.longitude,
                                   "phone": store.phone,
                                   "storeId": store.storeId,
                                   "brand": vehicle.brand,
                                   "color": vehicle.color,
                                   "imageURL": vehicle.imageURL,
                                   "km": vehicle.km,
                                   "model": vehicle.model,
                                   "modelDescription": vehicle.modelDescription,
                                   "price": vehicle.price,
                                   "year": vehicle.year

                                   }
				vehicle.phone = store.phone;
				cars.push(vehicle);
			});
		});
		$scope.cars = cars;
	})
	.error(function(erro){
		alert(JSON.stringify(erro));
	});

                                             $scope.tracarRota = function(latitude, longitude){

                                             launchnavigator.navigate(
                                                                      [latitude, longitude],
                                                                      null,
                                                                      function(){
                                                                      //alert("Plugin success");
                                                                      },
                                                                      function(error){
                                                                      alert("Erro: "+ error);
                                                                      });
                                             }
}]);
