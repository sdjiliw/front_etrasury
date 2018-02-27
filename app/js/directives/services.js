angular.module('app')
	.controller('defilmtCtrl', function ItemsCtrl($scope, $timeout, $interval, $http, $location, $state, $rootScope, deconnectApi){
	$scope.items = [];
	var counter=0;
	$scope.incId=0;
	
	/***Authorization*********/
	var configs={
		headers:{
			'Authorization': 'Bearer '+localStorage.getItem('jeton')
		}
	};
	/***FIN Authorization*********/
	$scope.listCours=[];
	$scope.itemsis=[];
	
	$scope.items_ = [
			{
				"id" : $scope.incId+1,
				"money" : "USD",
				"value" : "3,08$",
				"color" : "#ff8000"
			},
			{
				"id" : $scope.incId+2,
				"money" : "EURO",
				"value" : "3,08€",
				"color" : "#1f93f6"
			},
			{
				"id" : $scope.incId+3,
				"money" : "CAD",
				"value" : "",
				"color" : "#ff8000"
			},
			{
				"id" : $scope.incId+4,
				"money" : "CHF",
				"value" : "",
				"color" : "#1f93f6"
			},
			{
				"id" : $scope.incId+5,
				"money" : "GBP",
				"value" : "",
				"color" : "#ff8000"
			},
			{
				"id" : $scope.incId+6,
				"money" : "USD",
				"value" : "3,08$",
				"color" : "#ff8000"
			},
			{
				"id" : $scope.incId+7,
				"money" : "EURO",
				"value" : "3,08€",
				"color" : "#1f93f6"
			},
			{
				"id" : $scope.incId+8,
				"money" : "CAD",
				"value" : "",
				"color" : "#ff8000"
			},
			{
				"id" : $scope.incId+9,
				"money" : "CHF",
				"value" : "",
				"color" : "#1f93f6"
			},
			{
				"id" : $scope.incId+10,
				"money" : "GBP",
				"value" : "",
				"color" : "#ff8000"
			},
			{
				"id" : $scope.incId+1,
				"money" : "USD",
				"value" : "3,08$",
				"color" : "#ff8000"
			},
			{
				"id" : $scope.incId+2,
				"money" : "EURO",
				"value" : "3,08€",
				"color" : "#1f93f6"
			},
			{
				"id" : $scope.incId+3,
				"money" : "CAD",
				"value" : "",
				"color" : "#ff8000"
			},
			{
				"id" : $scope.incId+4,
				"money" : "CHF",
				"value" : "",
				"color" : "#1f93f6"
			},
			{
				"id" : $scope.incId+5,
				"money" : "GBP",
				"value" : "",
				"color" : "#ff8000"
			},
			{
				"id" : $scope.incId+6,
				"money" : "USD",
				"value" : "3,08$",
				"color" : "#ff8000"
			},
			{
				"id" : $scope.incId+7,
				"money" : "EURO",
				"value" : "3,08€",
				"color" : "#1f93f6"
			},
			{
				"id" : $scope.incId+8,
				"money" : "CAD",
				"value" : "",
				"color" : "#ff8000"
			},
			{
				"id" : $scope.incId+9,
				"money" : "CHF",
				"value" : "",
				"color" : "#1f93f6"
			},
			{
				"id" : $scope.incId+10,
				"money" : "GBP",
				"value" : "",
				"color" : "#ff8000"
			}
		];
		
    /*****LISTE DEFILEMENT COURS API**********
	**@GET(cours/v2/convertToJson)************
	**@return JsonParser**********************
	******************************************/
	function listCourses(){
		$http({
			method: "GET", 
			url: baseUrl+'cours/v2/convertToJson', 
			data: {},
			headers: configs.headers
		}).then(function (response) {
			// console.log("Success cours ",response.data.Rates.Rate);
			$scope.listCours=[];
			var nb=0;
			
			if(response.data==undefined || response.data==null){
				response.data.Rates.Rate=[];
			};
			
			for(var i=0;i<response.data.Rates.Rate.length;i++){
				nb++;
				if(response.data.Rates.Rate[i].Symbol.length==6 &&
					(response.data.Rates.Rate[i].Symbol.indexOf("EUR")!=-1 || response.data.Rates.Rate[i].Symbol.indexOf("Eur")!=-1 || response.data.Rates.Rate[i].Symbol.indexOf("eur")!=-1) &&
					(
						(response.data.Rates.Rate[i].Symbol.indexOf("USD")!=-1 || response.data.Rates.Rate[i].Symbol.indexOf("Usd")!=-1 || response.data.Rates.Rate[i].Symbol.indexOf("usd")!=-1) ||
						(response.data.Rates.Rate[i].Symbol.indexOf("GBP")!=-1 || response.data.Rates.Rate[i].Symbol.indexOf("Gbp")!=-1 || response.data.Rates.Rate[i].Symbol.indexOf("gbp")!=-1) ||
						(response.data.Rates.Rate[i].Symbol.indexOf("CAD")!=-1 || response.data.Rates.Rate[i].Symbol.indexOf("Cad")!=-1 || response.data.Rates.Rate[i].Symbol.indexOf("cad")!=-1) ||
						(response.data.Rates.Rate[i].Symbol.indexOf("JPY")!=-1 || response.data.Rates.Rate[i].Symbol.indexOf("Jpy")!=-1 || response.data.Rates.Rate[i].Symbol.indexOf("jpy")!=-1) ||
						(response.data.Rates.Rate[i].Symbol.indexOf("CHF")!=-1 || response.data.Rates.Rate[i].Symbol.indexOf("Chf")!=-1 || response.data.Rates.Rate[i].Symbol.indexOf("Chf")!=-1)
					)
				){
					$scope.listCours.push(response.data.Rates.Rate[i]);
				};
			};
			if(nb==response.data.Rates.Rate.length){
				$rootScope.$broadcast('listCours', {objet : $scope.listCours});
			};
		}).catch(function (response) {
			if(response.status==500 && localStorage.getItem('jeton')!='' && localStorage.getItem('jeton')!=null && localStorage.getItem('jeton')!=undefined){
				deconnectApi.logout(sessionStorage.getItem("iduser")).then(function (response) {
						$location.url('/access/login');
						$state.go('access.login');
					}).catch(function (response) {
				});
			};
		});
	};
	listCourses();
	/*****FIN LISTE DEFILEMENT COURS API******/
	$scope.$on('listCours', function(events, args) {
		$scope.itemsis=[];
		var moyenne= 0.000;
		var courses=null;
		var couleur='';
		var name_='';
		var name_0='';
		var name_1='';
		// console.log("reçu OK ",args.objet);
		for(var j=0;j<args.objet.length;j++){
			name_='';
			name_0='';
			name_1='';
			moyenne= (((args.objet[j].Ask + args.objet[j].Bid)/2.000)*655.957).toFixed(3);
			
			if(j%2==0){
				couleur='#1f93f6';
			};
					
			if(j%2!=0){
				couleur='#ff8000';
			};
			
			for(var k=0;k<args.objet[j].Symbol.length;k++){
				if(k<3){
					name_0+=args.objet[j].Symbol[k];
				}else{
					name_1+=args.objet[j].Symbol[k];
				};
			};
			
			name_=name_0+' - ' +name_1;
			courses={
				nom : ""+name_,
				value : moyenne+"FCFA",
				separator : ", ",
				color : ""+couleur
			};
					
			if(j==args.objet.length-1){
				courses={
					nom : ""+name_,
					value : moyenne+"FCFA",
					separator : "",
					color : ""+couleur
				};
			};
			$scope.itemsis.push(courses);
		};
		// console.log("$scope.itemsis ",$scope.itemsis);
	});
	/***********REFRESH COURSES**********/
	$interval(function() {
		
	}, 15000);
	/***********FIN REFRESH COURSES**********/
    // var counter = $scope.items.slice(-1)[0];
    $scope.glued = true;
	
    // function addItem(){
			// $scope.items_ = [
			// {
				// "id" : $scope.incId+1,
				// "money" : "USD",
				// "value" : "3,08$",
				// "color" : "#ff8000"
			// },
			// {
				// "id" : $scope.incId+2,
				// "money" : "EURO",
				// "value" : "3,08€",
				// "color" : "#1f93f6"
			// },
			// {
				// "id" : $scope.incId+3,
				// "money" : "CAD",
				// "value" : "",
				// "color" : "#ff8000"
			// },
			// {
				// "id" : $scope.incId+4,
				// "money" : "CHF",
				// "value" : "",
				// "color" : "#1f93f6"
			// },
			// {
				// "id" : $scope.incId+5,
				// "money" : "GBP",
				// "value" : "",
				// "color" : "#ff8000"
			// }
		// ];
	
		// $scope.incId=$scope.incId+5+1;
		// if(counter>$scope.items_.length-1){
			// counter=0;
			// $scope.items.push($scope.items_[counter]);
		// }else{
			// $scope.items.push($scope.items_[counter]);
		// };
		// ++counter;
        // $timeout(addItem, 1000);
    // }
          
    // $timeout(addItem, 1000);
});
