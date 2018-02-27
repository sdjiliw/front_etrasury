'use strict';

app.controller('MorrisCtrl', function($scope, $rootScope, $http, $filter, deconnectApi){
	/***Authorization*********/
	var configs={
		headers:{
			'Authorization': 'Bearer '+localStorage.getItem('jeton')
		}
	};
	/***FIN Authorization*********/
	/*************ORIGINAL******************/
	// $scope.barData = [
        // { y: "2009", a: 175,  b: 165, c: 160, d: 140},
        // { y: "2010", a: 150,  b: 140, c: 120, d: 110 },
        // { y: "2011", a: 175,  b: 165, c: 60, d: 190 },
        // { y: "2012", a: 60, b: 190, c: 60, d: 190 }
    // ];
	/*************FIN ORIGINAL******************/
	var Alphabet='abcdefghijklmnopqrstuvwxyz';
	$scope.barData_8 = [
        { y: "", a: 0}
    ];
	$scope.ykeys_8 = ["a"];
	$scope.labels_8 = [""];
	$scope.colors_8 = ["#673AB7", "#FF6E40", "#1f93f6"];
	/******************LIST ALL LOCALITY************************/
	$scope.lisAllLocs8=[];
	function listAllLocalities8(){
		$http({
			method: 'GET',
			url: baseUrl + 'locality/list',
			data: {},
			headers: configs.headers
		}).then(function successCallback(response) {
			// console.log("Liste des Localité8 ",response.data.locality_list);
			$scope.lisAllLocs8=response.data.locality_list;
		}).catch(function(err) {
			if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
				deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
					$location.url('/access/login');
					$state.go('access.login');
				}).catch(function(response) {});
			};
		});
	};
	listAllLocalities8();
	/******************FIN LIST ALL LOCALITY************************/
	/*****Le comparatif des conditions standard des banques******/
	$scope.loading_8=false;
	$scope.listN8=[];
	function listN8(id_8){
		$scope.loading_8=true;
		$http({
				method: "GET", 
				url: baseUrl+'admin/bank_conditions/comparatif-condition-bank?locality='+id_8, 
				data: {},
				headers: configs.headers
		}).then(function (response) {
				console.log("Success n°8 ",response.data.retour);
				$scope.loading_8=false;
				// var date8char='';
				var date8='';
				var label8="";
				var dateTableau=[];
				var tauxTableau=[];
				var nb=0;
				var nb_0=0;
				// $scope.barData_8 = [];
				// $scope.ykeys_8 = [];
				$scope.labels_8 = [];
				
				if(response.data.retour.length==0){
					$scope.barData_8 = [
						{ y: "", a: 0}
					];
					$scope.ykeys_8 = ["a"];
					$scope.labels_8 = [""];
				};
				$scope.listN8=response.data.retour;
				for(var i=0;i<response.data.retour.length;i++){
					nb_0++;
					// console.log("DDt ",$filter('date')(response.data.retour[].bankConditions[].dateCondition, 'dd/MM/yyyy'));
					label8=""+response.data.retour[i].bank.nom; 
					$scope.labels_8.push(label8);
					for(var j=0;j<response.data.retour[i].bankConditions.length;j++){
						nb++;
						// response.data.retour[i].bankConditions[j].valeurCondition;
						// date8=""+response.data.retour[i].bankConditions[j].condition;
						// $scope.labels_8.push(label8);
						
						tauxTableau.push(response.data.retour[i].bankConditions[j].valeurCondition);
						if(nb==1){
							dateTableau.push(response.data.retour[i].bankConditions[j].condition);
						};
						
						if(nb>1){
							if(dateTableau.indexOf(response.data.retour[i].bankConditions[j].condition)==-1){
								dateTableau.push(response.data.retour[i].bankConditions[j].condition);
							};
						};
					};
				};
				
				if(nb_0==response.data.retour.length){
					$rootScope.$broadcast('listN8', {objet : $scope.listN8, tab : dateTableau});
				};
				
				// console.log("$scope.labels_8 ",$scope.labels_8);
				// console.log("dateTableau ",dateTableau);
				// console.log("tauxTableau ",tauxTableau);
		}).catch(function (response) {
			// console.log("Error n°8 ",response);
			$scope.loading_8=false;
			if(response.status==500 && localStorage.getItem('jeton')!='' && localStorage.getItem('jeton')!=null && localStorage.getItem('jeton')!=undefined){
				deconnectApi.logout(sessionStorage.getItem("iduser")).then(function (response) {
					$location.url('/access/login');
					$state.go('access.login');
				}).catch(function (response) {
				});
			};
		});
	};
	$scope.$on('listN8', function(events, args) {
		// console.log("Rçu letter ",args.copy);
		var obj=[];
		var obj_bk={
			nom_bk : "",
			valeurCond : 0
		};
		var bk_={
			date_cond : "",
			nom_bk : [],
			condition_list : [
			]
		};
		var copy=[];
		
		for(var i=0;i<args.tab.length;i++){
			bk_.date_cond=args.tab[i];
			for(var j=0;j<args.objet.length;j++){
				bk_.nom_bk.push(args.objet[j].bank.nom);
				for(var k=0;k<args.objet[j].bankConditions.length;k++){
					if(args.tab[i]===args.objet[j].bankConditions[k].condition){
						bk_.condition_list.push(args.objet[j].bankConditions[k].valeurCondition);
					};
				};
			};
		};
		// console.log("obj ",obj);
	});
	// listN8();
	$scope.changeLocality8=function(a){
		// console.log("Change n°8 ",a);
		if(a!='' && a!=null && a!=undefined){
			listN8(a);
		};
	};
	/*****FIN Le comparatif des conditions standard des banques******/
	/*****Le comparatif des conditions standard des banques******/
	$scope.loading_8=false;
	$scope.listN8=[];
	function listN8(id_8){
		$scope.loading_8=true;
		$http({
				method: "GET", 
				url: baseUrl+'admin/bank_conditions/comparatif-condition-bank?locality='+id_8, 
				data: {},
				headers: configs.headers
		}).then(function (response) {
				console.log("Success n°8 ",response.data.retour);
				$scope.loading_8=false;
				// var date8char='';
				var date8='';
				var label8="";
				var dateTableau=[];
				var tauxTableau=[];
				var nb=0;
				var nb_0=0;
				// $scope.barData_8 = [];
				// $scope.ykeys_8 = [];
				$scope.labels_8 = [];
				
				if(response.data.retour.length==0){
					$scope.barData_8 = [
						{ y: "", a: 0}
					];
					$scope.ykeys_8 = ["a"];
					$scope.labels_8 = [""];
				};
				$scope.listN8=response.data.retour;
				for(var i=0;i<response.data.retour.length;i++){
					nb_0++;
					// console.log("DDt ",$filter('date')(response.data.retour[].bankConditions[].dateCondition, 'dd/MM/yyyy'));
					label8=""+response.data.retour[i].bank.nom; 
					$scope.labels_8.push(label8);
					for(var j=0;j<response.data.retour[i].bankConditions.length;j++){
						nb++;
						// response.data.retour[i].bankConditions[j].valeurCondition;
						// date8=""+response.data.retour[i].bankConditions[j].condition;
						// $scope.labels_8.push(label8);
						
						tauxTableau.push(response.data.retour[i].bankConditions[j].valeurCondition);
						if(nb==1){
							dateTableau.push(response.data.retour[i].bankConditions[j].condition);
						};
						
						if(nb>1){
							if(dateTableau.indexOf(response.data.retour[i].bankConditions[j].condition)==-1){
								dateTableau.push(response.data.retour[i].bankConditions[j].condition);
							};
						};
					};
				};
				
				if(nb_0==response.data.retour.length){
					$rootScope.$broadcast('listN8', {objet : $scope.listN8, tab : dateTableau});
				};
				
				// console.log("$scope.labels_8 ",$scope.labels_8);
				// console.log("dateTableau ",dateTableau);
				// console.log("tauxTableau ",tauxTableau);
		}).catch(function (response) {
			// console.log("Error n°8 ",response);
			$scope.loading_8=false;
			if(response.status==500 && localStorage.getItem('jeton')!='' && localStorage.getItem('jeton')!=null && localStorage.getItem('jeton')!=undefined){
				deconnectApi.logout(sessionStorage.getItem("iduser")).then(function (response) {
					$location.url('/access/login');
					$state.go('access.login');
				}).catch(function (response) {
				});
			};
		});
	};
	/*************INITIALISE*********************************/
	function initialise(){
		$scope.locality8='all';
		$scope.changeLocality8($scope.locality8);;
	};
	initialise();
	/*************FIN INITIALISE*********************************/
});