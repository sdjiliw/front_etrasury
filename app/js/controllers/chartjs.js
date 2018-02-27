(function() {
    'use strict';

    /*  var app = angular.module('examples', ['chart.js', 'ui.bootstrap']);*/

    app.config(function(ChartJsProvider) {
        // Configure all charts
        ChartJsProvider.setOptions({
            colours: ['#FF6E40', '#FBC02E', '#673AB7', '#66bd78', '#f05050'],
            responsive: true
        });
        // Configure all doughnut charts
        ChartJsProvider.setOptions('Doughnut', {
            animateScale: true
        });
    });

    app.controller('MenuCtrl', function($scope) {
        $scope.isCollapsed = true;
        $scope.charts = ['Line', 'Bar', 'Doughnut', 'Pie', 'Polar Area', 'Radar', 'Base'];
    });

    app.controller('LineCtrl', ['$scope', '$timeout', function($scope, $timeout) {
        $scope.labels = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Jui', 'Juillet'];
        $scope.series = ['Series A', 'Series B'];
        $scope.data = [
            [65, 59, 80, 81, 56, 55, 40],
            [28, 48, 40, 19, 86, 27, 90]
        ];
        $scope.onClick = function(points, evt) {
            //console.log(points, evt);
        };
        $scope.onHover = function(points) {
            if (points.length > 0) {
                //console.log('Point', points[0].value);
            } else {
                //console.log('No point');
            }
        };
        $scope.colours = [{ // grey
                fillColor: "rgba(255,110,64,1)",
                strokeColor: "rgba(255,110,64,1)",
                pointColor: "rgba(255,110,64,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(255,110,64,1)"
        }, { // dark grey
                fillColor: "rgba(103,58,183,1)",
                strokeColor: "rgba(103,58,183,1.0)",
                pointColor: "rgba(103,58,183,1.0)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(103,58,183,1.0)"
        }];

        $timeout(function() {
            $scope.labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            $scope.data = [
                [28, 48, 40, 19, 86, 27, 90],
                [65, 59, 80, 81, 56, 55, 40]
            ];
            $scope.series = ['Series C', 'Series D'];
        }, 3000);
    }]);

    app.controller('BarCtrl', ['$scope', '$location', '$state', '$timeout', '$http', 'deconnectApi', function($scope, $location, $state, $timeout, $http, deconnectApi) {
		/***Authorization*********/
		var configs={
			headers:{
				'Authorization': 'Bearer '+localStorage.getItem('jeton')
			}
		};
		/***FIN Authorization*********/
		/*******ORIGINAL******************************/
        $scope.options = {
            scaleShowVerticalLines: false
        };
        // $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
        $scope.series = ['Series A', 'Series B'];
        // $scope.data = [
            // [65, 59, 80, 81, 56, 55, 40],
            // [28, 48, 40, 19, 86, 27, 90]
        // ];
        $scope.colours = [{ // grey
                fillColor: "rgba(255,110,64,1)",
                strokeColor: "rgba(255,110,64,1)",
                highlightFill: "rgba(255,110,64,1)",
                highlightStroke: "rgba(255,110,64,1)"
        }, { // dark grey
                fillColor: "rgba(103,58,183,1.0)",
                strokeColor: "rgba(103,58,183,1)",
                highlightFill: "rgba(103,58,183,1)",
                highlightStroke: "rgba(103,58,183,1.0)"
        }];

        $timeout(function() {
            $scope.options = {
                scaleShowVerticalLines: true
            };
        }, 3000);
		/*******FIN ORIGINA******************************/
		$scope.labels = [
			['']
		];
		$scope.data = [
			[0]
		];
		$scope.colours = [{
				fillColor: "rgba(255,128,0,1)",
				strokeColor: "rgba(255,128,0,1)",
				highlightFill: "rgba(255,128,0,1)",
				highlightStroke: "rgba(255,128,0,1)"
			}
		];
		$scope.labels_1 = [
			['']
		];
		$scope.data_1 = [
			[0]
		];
		$scope.colours_1 = [{
                fillColor: "rgba(16,101,168,1.0)",
                strokeColor: "rgba(16,101,168,1)",
                highlightFill: "rgba(16,101,168,1)",
                highlightStroke: "rgba(16,101,168,1.0)"
			}
		];
		/*************LISTE ALL LOCALITY*************************/
		$scope.lisAllLocs=[];
		function listAllLocalities(){
			$http({
				method: 'GET',
				url: baseUrl + 'locality/list',
				data: {},
				headers: configs.headers
			}).then(function successCallback(response) {
				// console.log("Liste des Localité ",response.data.locality_list);
				$scope.lisAllLocs=response.data.locality_list;
			}).catch(function(err) {
				if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
					deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
						$location.url('/access/login');
						$state.go('access.login');
					}).catch(function(response) {});
				};
			});
		};
		listAllLocalities();
		/*************FIN LISTE ALL LOCALITY*************************/
		/*****Le taux de réponse d’une banque******/
		$scope.loading=false;
		function listN1(id_1){
			$scope.loading=true;
			$http({
				method: "GET", 
				url: baseUrl+'admin/taux-reponse-banks?locality='+id_1, 
				data: {},
				headers: configs.headers
			}).then(function (response) {
				$scope.loading=false;
				// console.log("Success n°1 ",response.data.retour);
				var bk='';
				var taux=[];
				var color=null;
				$scope.labels = [];
				$scope.data = [];
				
				if(response.data.retour.length==0){
					bk='';
					$scope.labels.push(bk);
				};
				
				for(var i=0;i<response.data.retour.length;i++){
					bk=''+response.data.retour[i].bank.nom;
					taux.push(response.data.retour[i].tauxReponse);
					$scope.labels.push(bk);
					// if(i%2==0){
						// color={
							// fillColor: "rgba(255,110,64,1)",
							// strokeColor: "rgba(255,110,64,1)",
							// highlightFill: "rgba(255,110,64,1)",
							// highlightStroke: "rgba(255,110,64,1)"
						// }
					// };
					
					// if(i%2!=0){
						// color={
							// fillColor: "rgba(103,58,183,1.0)",
							// strokeColor: "rgba(103,58,183,1)",
							// highlightFill: "rgba(103,58,183,1)",
							// highlightStroke: "rgba(103,58,183,1.0)"
						// }
					// };
					// $scope.colours[0]=color;
				};
				
				if(taux.length==0){
					taux=[0];
					$scope.data.push(taux);
				};
				if(taux.length!=0){
					$scope.data.push(taux);
				};
			}).catch(function (response) {
				// console.log("Error n°1 ",response);
				$scope.loading=false;
				if(response.status==500 && localStorage.getItem('jeton')!='' && localStorage.getItem('jeton')!=null && localStorage.getItem('jeton')!=undefined){
					deconnectApi.logout(sessionStorage.getItem("iduser")).then(function (response) {
						$location.url('/access/login');
						$state.go('access.login');
					}).catch(function (response) {
					});
				};
			});
		};
		// listN1();
		$scope.changeLocality1=function(a){
			// console.log("Change localité ",a);
			if(a!='' && a!=null && a!=undefined){
				listN1(a);
			};
		};
		/*****FIN Le taux de réponse d’une banque)******/
		/*****Le taux de succès d’une banque (offres retenues)******/
		$scope.loading_1=false;
		function listN2(id_2){
			$scope.loading_1=true;
			$http({
				method: "GET", 
				url: baseUrl+'admin/taux-success-banks?locality='+id_2, 
				data: {},
				headers: configs.headers
			}).then(function (response) {
				$scope.loading_1=false;
				// console.log("Success n°2 ",response);
				var bk_1='';
				var taux_1=[];
				var color_1=null;
				$scope.labels_1 = [];
				$scope.data_1 = [];
				
				if(response.data.retour.length==0){
					bk_1='';
					$scope.labels_1.push(bk_1);
				};
				
				for(var i=0;i<response.data.retour.length;i++){
					bk_1=''+response.data.retour[i].bank.nom;
					taux_1.push(response.data.retour[i].tauxReponse);
					$scope.labels_1.push(bk_1);
				};
				if(taux_1.length==0){
					taux_1=[0];
					$scope.data_1.push(taux_1);
				};
				if(taux_1.length!=0){
					$scope.data_1.push(taux_1);
				};
			}).catch(function (response) {
				// console.log("Error n°2 ",response);
				$scope.loading_1=false;
				if(response.status==500 && localStorage.getItem('jeton')!='' && localStorage.getItem('jeton')!=null && localStorage.getItem('jeton')!=undefined){
					deconnectApi.logout(sessionStorage.getItem("iduser")).then(function (response) {
						$location.url('/access/login');
						$state.go('access.login');
					}).catch(function (response) {
					});
				};
			});
		};
		// listN2();
		$scope.changeLocality2=function(a){
			// console.log("Change localité 2 ",a);
			if(a!='' && a!=null && a!=undefined){
				listN2(a);
			};
		};
		/*****FIN Le taux de succès d’une banque (offres retenues)******/
		/*****Le nombre d'offres par banque (toutes, acceptées et refusées)******/
		$scope.choiceFilter='';
		$scope.locId3=0;
		$scope.filters3=[
			{
				id : 1,
				reponse : "toutes"
			},
			{
				id : 2,
				reponse : "acceptées"
			},
			{
				id : 3,
				reponse : "refusées"
			}
		];
		$scope.labels_3 = [
			['']
		];
		$scope.data_3 = [
			[0]
		];
		$scope.colours_3 = [{
                fillColor: "rgba(16,101,168,1.0)",
                strokeColor: "rgba(16,101,168,1)",
                highlightFill: "rgba(16,101,168,1)",
                highlightStroke: "rgba(16,101,168,1.0)"
			}
		];
		$scope.loading_3=false;
		function listN3(id_3){
			// console.log("$scope.choiceFilter ",$scope.choiceFilter);
			$scope.loading_3=true;
			$http({
				method: "GET", 
				url: baseUrl+'mon_espace/bank/request/offer/banks?locality='+id_3+'&filtre='+$scope.choiceFilter, 
				data: {},
				headers: configs.headers
			}).then(function (response) {
				$scope.loading_3=false;
				// console.log("Success n°3 ",response.data.retour);
				
				var bk_3='';
				var taux_3=[];
				var color_3=null;
				$scope.labels_3 = [];
				$scope.data_3 = [];
				
				if(response.data.retour.length==0){
					bk_3='';
					$scope.labels_3.push(bk_3);
				};
				
				for(var i=0;i<response.data.retour.length;i++){
					bk_3=''+response.data.retour[i].bank.nom;
					taux_3.push(response.data.retour[i].nombreOffre);
					$scope.labels_3.push(bk_3);
				};
				if(taux_3.length==0){
					taux_3=[0];
					$scope.data_3.push(taux_3);
				};
				if(taux_3.length!=0){
					$scope.data_3.push(taux_3);
				}; 
			}).catch(function (response) {
				$scope.loading_3=false;
				// console.log("Error n°4 ",response);
				if(response.status==500 && localStorage.getItem('jeton')!='' && localStorage.getItem('jeton')!=null && localStorage.getItem('jeton')!=undefined){
					deconnectApi.logout(sessionStorage.getItem("iduser")).then(function (response) {
						$location.url('/access/login');
						$state.go('access.login');
					}).catch(function (response) {
					});
				};
			});
		};
		$scope.changeLocality3=function(a){
			// console.log("Change localité ",a);
			if(a!='' && a!=null && a!=undefined){
				$scope.locId3=a;
				listN3(a);
			};
		};
		$scope.filTrer3=function(a){
			// console.log("Filtre ",a);
			if(a==1){
				$scope.choiceFilter='all';
			};
			if(a==2){
				$scope.choiceFilter='acceptee';
			};
			if(a==3){
				$scope.choiceFilter='refusee';
			};
			listN3($scope.locId3);
		};
		/*****FIN Le nombre d'offres par banque (toutes, acceptées et refusées)******/
		/*****Liste Banques par localité******/
		$scope.listBksByLocs=[];
		var idLoc=sessionStorage.getItem("idloc");
		function listBksByLoc(idloc){
			$scope.loading_4=true;
			$http({
				method: "GET", 
				url: baseUrl+'admin/bank/locality/'+idLoc, 
				data: {},
				headers: configs.headers
			}).then(function (response) {
				// console.log("Success listBksByLoc ",response.data.list_banks);
				$scope.listBksByLocs=response.data.list_banks;
			}).catch(function (response) {
				// console.log("Error listBksByLoc ",response);
				if(response.status==500 && localStorage.getItem('jeton')!='' && localStorage.getItem('jeton')!=null && localStorage.getItem('jeton')!=undefined){
					deconnectApi.logout(sessionStorage.getItem("iduser")).then(function (response) {
						$location.url('/access/login');
						$state.go('access.login');
					}).catch(function (response) {
					});
				};
			});
		};
		// listBksByLoc(idLoc);
		/*****FIN Liste Banques par localité******/
		//LISTER LES PRODUITS
		$scope.listProduits = [];
		$scope.idsProducts=[];
		$scope.nomsProducts=[];
        function listProducts() {
            /*******************************************************************
             ********************************************************************
             ***@GET(admin/product/list/)***************
             *******************************************************************
             ***@return JsonParser***********************************************
             ********************************************************************
             ********************************************************************/
            $http({
                method: 'GET',
                url: baseUrl + 'admin/product/list/',
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function successCallback(response) {
                $scope.listProduits = response.data.list_products;
				for(var i=0;i<response.data.list_products.length;i++){
					$scope.idsProducts.push(response.data.list_products[i].idProduits);
					$scope.nomsProducts.push(response.data.list_products[i].nom);
				};
				// console.log("$scope.idsProducts ",$scope.idsProducts);
				// console.log("$scope.nomsProducts ",$scope.nomsProducts);
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        listProducts();
        //FIN LISTER LES PRODUITS
		//LISTER LES DEVISES
		$scope.listmois=[
			{
				id : 1,
				value : "Janvier"
			},
			{
				id : 2,
				value : "Février"
			},
			{
				id : 3,
				value : "Mars"
			},
			{
				id : 4,
				value : "Avril"
			},
			{
				id : 5,
				value : "Mai"
			},
			{
				id : 6,
				value : "Juin"
			},
			{
				id : 7,
				value : "Juillet"
			},
			{
				id : 8,
				value : "Aout"
			},
			{
				id : 9,
				value : "Septembre"
			},
			{
				id : 10,
				value : "Octobre"
			},
			{
				id : 11,
				value : "Novembre"
			},
			{
				id : 12,
				value : "Décembre"
			}
		];
		$scope.listDevises=[];
        function listDevises() {
            $http({
                method: 'GET',
                url: baseUrl + 'admin/devise/list',
                data: {},
                headers: configs.headers
            }).then(function successCallback(response) {
                $scope.listDevises = response.data.devise_list;
				// console.log("Devises success ",response);
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        listDevises();
        //FIN LISTER LES DEVISES
		/*****COMPARATIF DES TAUX DES JOURS DES BANQUES******/
		$scope.barData_4 = [
			{ y: "", a: 0}
		];
		$scope.ykeys_4 = ["a"];
		$scope.labels_4 = [""];
		$scope.colors_4 = ["#673AB7", "#FF6E40", "#1f93f6"];
		
		$scope.loading_4=false;
		$scope.idloc_4='';
		$scope.idp_4='';
		$scope.listN4=[];
		$scope.listN4_2=[];
		$scope.moisTableau=[];
		$scope.mois_='';
		$scope.devise_='';
		var objCh={
			nom : "",
			achat : "",
			vente : "",
			datee : ""
		};
		var nbBanks=0;
		
		function shorten(arr, obj) {
		  arr.forEach(function(key) {
			delete obj[key];
		  });
		  return obj;
		};
		
		function listN4(idp_4,idloc_4){
			$scope.loading_4=true;
			$http({
				method: "GET", 
				url: baseUrl+'mon_espace/bank/rate_of_day/comparatif-rateday-bank/products/'+idp_4+'?locality='+idloc_4, 
				data: {},
				headers: configs.headers
			}).then(function (response) {
				$scope.loading_4=false;
				$scope.listN4=[];
				$scope.moisTableau=[];
				var nb=0;
				var nb_coor=0;
				
				var coordonnees={y : ""};
				var bk_name='';
				var barData_4_2=[
					{ y: "", a: 0}
				];
				var ykeys_4_2='a';
				$scope.barData_4 = [];
				$scope.ykeys_4 = [];
				$scope.labels_4 = [];
				
				console.log("Success n°4 ",response.data);
				if(response.data.retour==null || response.data.retour==undefined){
					$scope.labels_4.push(bk_name);
					$scope.barData_4.push(barData_4_2);
					$scope.ykeys_4.push(ykeys_4_2);
				}else{
					if(response.data.retour.length==0){
						$scope.labels_4.push(bk_name);
						$scope.barData_4.push(barData_4_2);
						$scope.ykeys_4.push(ykeys_4_2);
					};
				};
				
				for(var i=0;i<response.data.retour.length;i++){
					nb_coor++;
					
					if(nb_coor==1){
						var arrA = ['y'];
						shorten(arrA, coordonnees);
					};
					
					nbBanks=response.data.retour[i].bankTauxes.length;
					for(var j=0;j<response.data.retour[i].bankTauxes.length;j++){
						nb++;
						
						bk_name=response.data.retour[i].bankTauxes[j].bank.nom;
						$scope.labels_4.push(bk_name);
						
						if($scope.mois_!='' && $scope.mois_===response.data.retour[i].month){
							for(var k=0;k<response.data.retour[i].bankTauxes[j].rateDays.length;k++){
								if($scope.devise_!='' && $scope.devise_===response.data.retour[i].bankTauxes[j].rateDays[k].devise.description){
									objCh.nom=response.data.retour[i].bankTauxes[j].bank.nom;
									objCh.achat=response.data.retour[i].bankTauxes[j].rateDays[k].achat;
									objCh.vente=response.data.retour[i].bankTauxes[j].rateDays[k].vente;
									objCh.datee=response.data.retour[i].bankTauxes[j].rateDays[k].dateDebutValidite;
									$scope.listN4.push(objCh);
								};
							};
						};
						
						if(nb==1){
							$scope.moisTableau.push(response.data.retour[i].month);
						};
						
						if(nb>1){
							if($scope.moisTableau.indexOf(response.data.retour[i].month)==-1){
								$scope.moisTableau.push(response.data.retour[i].month);
							};
						};
					};
				};
				// console.log("$scope.moisTableau ",$scope.moisTableau);
				console.log("$scope.labels_4 ",$scope.labels_4);
				console.log("nbBanks ",nbBanks);
			}).catch(function (response) {
				$scope.loading_4=false;
				// console.log("Error n°4 ",response);
				if(response.status==500 && localStorage.getItem('jeton')!='' && localStorage.getItem('jeton')!=null && localStorage.getItem('jeton')!=undefined){
					deconnectApi.logout(sessionStorage.getItem("iduser")).then(function (response) {
						$location.url('/access/login');
						$state.go('access.login');
					}).catch(function (response) {
					});
				};
			});
		};
		$scope.changeLocality4=function(a){
			// console.log("Change localité ",a);
			$scope.idloc_4=a;
			if($scope.isChange){
				if(a!=null && a!=undefined && $scope.idp_4!='' && $scope.mois_!=''){
					listN4($scope.idp_4,a);
				};
			};
			if(!$scope.isChange){
				if(a!=null && a!=undefined && $scope.idp_4!=''){
					listN4($scope.idp_4,a);
				};
			};
		};
		$scope.isChange=false;
		$scope.changeProduit4=function(a){
			// console.log("Change Produit ",a);
			$scope.isChange=false;
			if($scope.nomsProducts.indexOf(a)!=-1){
				$scope.idp_4=$scope.idsProducts[$scope.nomsProducts.indexOf(a)];
			};
			
			if($scope.nomsProducts.indexOf('CHANGE')!=-1 || $scope.nomsProducts.indexOf('Change')!=-1 || $scope.nomsProducts.indexOf('change')!=-1){
				$scope.isChange=true;
			};
			
			if(a!=null && a!=undefined && $scope.idloc_4!=''){
				listN4($scope.idp_4,$scope.idloc_4);
			};
		};
		$scope.changeMois4=function(a){
			// console.log("Change mois 4 ",a);
			$scope.mois_=a
			if(a!=null && a!=undefined && $scope.idp_4!='' && $scope.idloc_4!='' && $scope.devise_!=''){
				listN4($scope.idp_4,$scope.idloc_4);
			};
		};
		$scope.changeDevise4=function(a){
			// console.log("Change devise 4 ",a);
			$scope.devise_=a;
			if(a!=null && a!=undefined && $scope.idp_4!='' && $scope.idloc_4!='' && $scope.mois_!=''){
				listN4($scope.idp_4,$scope.idloc_4);
			};
		};
		/*****FIN Le comparatif de l’évolution des taux des banques d’une localité******/
		/*****La courbe d'évolution des taux du jour d’une banque******/
		$scope.loading_5=false;
		function listN5(id_5){
			$scope.loading_5=true;
			$http({
				method: "GET", 
				url: baseUrl+'mon_espace/bank/rate_of_day/bank/'+id_5, 
				data: {},
				headers: configs.headers
			}).then(function (response) {
				$scope.loading_5=false;
				// console.log("Success n°5 ",response.data);
			}).catch(function (response) {
				$scope.loading_5=false;
				// console.log("Error n°5 ",response);
				if(response.status==500 && localStorage.getItem('jeton')!='' && localStorage.getItem('jeton')!=null && localStorage.getItem('jeton')!=undefined){
					deconnectApi.logout(sessionStorage.getItem("iduser")).then(function (response) {
						$location.url('/access/login');
						$state.go('access.login');
					}).catch(function (response) {
					});
				};
			});
		};
		$scope.changeLocality5=function(a){
			// console.log("Change localité 5 ",a);
			if(a!='' && a!=null && a!=undefined){
				listN5(a);
			};
		};
		/*****FIN La courbe d'évolution des taux du jour d’une banque******/
		/*****Le nombre de demandes par entreprise (reprendre les états de la demande : initiale à clôturée)******/
		$scope.loading_6=false;
		$scope.locId6=0;
		$scope.choiceFilter6='';
		$scope.labels_6 = [
			['']
		];
		$scope.data_6 = [
			[0]
		];
		$scope.colours_6 = [{
				fillColor: "rgba(255,128,0,1)",
				strokeColor: "rgba(255,128,0,1)",
				highlightFill: "rgba(255,128,0,1)",
				highlightStroke: "rgba(255,128,0,1)"
			}
		];
		$scope.filters6=[
			{
				id : 1,
				reponse : "Offre Initiée"
			},
			{
				id : 2,
				reponse : "Offre Soumise"
			},
			{
				id : 3,
				reponse : "Offre Positionnée"
			},
			{
				id : 4,
				reponse : "Offre Sélectionnée"
			},
			{
				id : 5,
				reponse : "Offre Pré-sélectionnée"
			},
			{
				id : 6,
				reponse : "Offre Acceptée"
			},
			{
				id : 7,
				reponse : "Demande Clôturée"
			}
		];
		function listN6(id_6){
			$scope.loading_6=true;
			$http({
				method: "GET", 
				url: baseUrl+'mes_operations/entreprise/request/nombre-demandes-entreprise?locality='+id_6+'&filtre='+$scope.choiceFilter6, 
				data: {},
				headers: configs.headers
			}).then(function (response) {
				$scope.loading_6=false;
				// console.log("Success n°6 ",response.data);
				var bk_6='';
				var taux_6=[];
				var color_6=null;
				$scope.labels_6 = [];
				$scope.data_6 = [];
				
				if(response.data.retour.length==0){
					bk_6='';
					$scope.labels_6.push(bk_6);
				};
				
				for(var i=0;i<response.data.retour.length;i++){
					bk_6=''+response.data.retour[i].entreprise.nom;
					taux_6.push(response.data.retour[i].nombre);
					$scope.labels_6.push(bk_6);
				};
				if(taux_6.length==0){
					taux_6=[0];
					$scope.data_6.push(taux_6);
				};
				if(taux_6.length!=0){
					$scope.data_6.push(taux_6);
				};
			}).catch(function (response) {
				$scope.loading_6=false;
				// console.log("Error n°6 ",response);
				if(response.status==500 && localStorage.getItem('jeton')!='' && localStorage.getItem('jeton')!=null && localStorage.getItem('jeton')!=undefined){
					deconnectApi.logout(sessionStorage.getItem("iduser")).then(function (response) {
						$location.url('/access/login');
						$state.go('access.login');
					}).catch(function (response) {
					});
				};
			});
		};
		$scope.changeLocality6=function(a){
			// console.log("Change localité 6 ",a);
			if(a!='' && a!=null && a!=undefined){
				$scope.locId6=a;
				listN6(a);
			};
		};
		$scope.filTrer6=function(a){
			// console.log("Filtre 6 ",a);
			switch(a){
				case 1 :
					$scope.choiceFilter6='initiee';
				break;
				case 2 :
					$scope.choiceFilter6='soumise';
				break;
				case 3 :
					$scope.choiceFilter6='op';
				break;
				case 4 :
					$scope.choiceFilter6='tos';
				break;
				case 5 :
					$scope.choiceFilter6='ops';
				break;
				case 6 :
					$scope.choiceFilter6='oa';
				break;
				case 7 :
					$scope.choiceFilter6='clocturee';
				break;
				default :
				break;
			};
			listN6($scope.locId6);
		};
		/*****FIN Le nombre de demandes par entreprise (reprendre les états de la demande : initiale à clôturée)******/
		/**LISTE DES DOCUMENTS*/
		$scope.listDocuments=[];
		var userId=sessionStorage.getItem("iduser");
        function listsDocuments() {
            /*******************************************************************
             ********************************************************************
             ***@GET(mon_espace/documents/list_user/)******************
             ***@Params(@id de l'utilisateur en session**************************
             ***@return JsonParser***********************************************
             ********************************************************************
             ********************************************************************/
            $http({
                method: 'GET',
                url: baseUrl + 'mon_espace/documents',
                data: {},
                headers: configs.headers
            }).then(function successCallback(response) {
                $scope.listDocuments = response.data.retour;
				// console.log("$scope.listDocuments  ",response);
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        listsDocuments();
        /**FIN LISTE DES DOCUMENTS**/
		/*****Le La courbe d'évolution des taux du jour d’une banque******/
		$scope.loading_7=false;
		$scope.docsPiste=[];
		function listN7(id_7){
			$scope.loading_7=true;
			$http({
				method: "GET", 
				url: baseUrl+'mon_espace/documents/'+id_7, 
				data: {},
				headers: configs.headers
			}).then(function (response) {
				$scope.loading_7=false;
				$scope.docsPiste=response.data.retour;
				// console.log("Success n°7 ",response.data);
			}).catch(function (response) {
				$scope.loading_7=false;
				// console.log("Error n°7 ",response);
				if(response.status==500 && localStorage.getItem('jeton')!='' && localStorage.getItem('jeton')!=null && localStorage.getItem('jeton')!=undefined){
					deconnectApi.logout(sessionStorage.getItem("iduser")).then(function (response) {
						$location.url('/access/login');
						$state.go('access.login');
					}).catch(function (response) {
					});
				};
			});
		};
		$scope.isChanged7=false;
		$scope.changeLocality7=function(a){
			// console.log("Change localité 7 ",a);
			$scope.isChanged7=true;
			if(a==''){
				$scope.isChanged7=false;
			};
			if(a!='' && a!=null && a!=undefined){
				listN7(a);
			};
		};
		/*****FIN La courbe d'évolution des taux du jour d’une banque******/
		/*************INITIALISE*********************************/
		function initialise(){
			$scope.locality1='all';
			$scope.locality2='all';
			$scope.locality3='all';
			$scope.locality4='all';
			// $scope.locality5='all';
			$scope.mychc3=1;
			$scope.changeLocality1($scope.locality1);
			$scope.changeLocality2($scope.locality2);
			$scope.changeLocality3($scope.locality3);
			$scope.filTrer3($scope.mychc3);
			$scope.changeLocality4($scope.locality4);
			// $scope.changeLocality5($scope.locality5);
			$scope.mychc6=1;
			$scope.locality6='all';
			$scope.changeLocality6($scope.locality6);
			$scope.filTrer6($scope.mychc6);
		};
		initialise();
		/*************FIN INITIALISE*********************************/
		/***SUIVI CHANGEMENT********************/
		// $scope.$watch("labels", function(a, b) {
			// console.log("labels ",a);
			// $scope.labels=a;
			// if ($scope.$root && !$scope.$root.$$phase) {
				// $scope.$apply();
			// };
        // });
		// $scope.$watch("data", function(a, b) {
			// console.log("data ",a);
			// $scope.data=a;
        // });
		// $scope.$watch("labels_1", function(a, b) {
			// console.log("labels_1 ",a);
			// $scope.labels_1=a;
        // });
		// $scope.$watch("data_1", function(a, b) {
			// console.log("data_1 ",a);
			// $scope.data_1=a;
        // });
		/***FIN SUIVI CHANGEMENT********************/
    }]);

    app.controller('DoughnutCtrl', ['$scope', '$timeout', function($scope, $timeout) {
        $scope.labels = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
        $scope.data = [0, 0, 0];
        $scope.colours = [{ // grey
                fillColor: "rgba(255,110,64,1)",
                strokeColor: "rgba(255,110,64,1.0)",
                highlightFill: "rgba(255,110,64,1.0)",
                highlightStroke: "rgba(255,110,64,1)"
        }, { // dark grey
                fillColor: "rgba(103,58,183,1.0)",
                strokeColor: "rgba(103,58,183,1.0)",
                highlightFill: "rgba(103,58,183,1.0)",
                highlightStroke: "rgba(103,58,183,1.0)"
        }, { // dark grey
                fillColor: "rgba(253,216,53,1.0)",
                strokeColor: "rgba(253,216,53,1.0)",
                highlightFill: "rgba(253,216,53,1.0)",
                highlightStroke: "rgba(253,216,53,1.0)"
        }];

        $timeout(function() {
            $scope.data = [350, 450, 100];
        }, 500);
    }]);

    app.controller('PieCtrl', function($scope) {
        $scope.labels = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
        $scope.data = [300, 500, 100];
        $scope.colours = [{ // grey
                fillColor: "rgba(255,110,64,1)",
                strokeColor: "rgba(255,110,64,1.0)",
                highlightFill: "rgba(255,110,64,1.0)",
                highlightStroke: "rgba(255,110,64,1)"
        }, { // dark grey
                fillColor: "rgba(103,58,183,1.0)",
                strokeColor: "rgba(103,58,183,1.0)",
                highlightFill: "rgba(103,58,183,1.0)",
                highlightStroke: "rgba(103,58,183,1.0)"
        }, { // dark grey
                fillColor: "rgba(253,216,53,1.0)",
                strokeColor: "rgba(253,216,53,1.0)",
                highlightFill: "rgba(253,216,53,1.0)",
                highlightStroke: "rgba(253,216,53,1.0)"
        }];
    });

    app.controller('PolarAreaCtrl', function($scope) {
        $scope.labels = ['Download Sales', 'In-Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales'];
        $scope.data = [300, 500, 100, 40, 120];
        $scope.colours = [{ // grey
                fillColor: "rgba(255,110,64,1)",
                strokeColor: "rgba(255,110,64,1.0)",
                highlightFill: "rgba(255,110,64,1.0)",
                highlightStroke: "rgba(255,110,64,1)"
        }, { // dark grey
                fillColor: "rgba(103,58,183,1.0)",
                strokeColor: "rgba(103,58,183,1.0)",
                highlightFill: "rgba(103,58,183,1.0)",
                highlightStroke: "rgba(103,58,183,1.0)"
        }, { // dark grey
                fillColor: "rgba(253,216,53,1.0)",
                strokeColor: "rgba(253,216,53,1.0)",
                highlightFill: "rgba(253,216,53,1.0)",
                highlightStroke: "rgba(253,216,53,1.0)"
        }, { // dark grey
                fillColor: "rgba(76,175,80,1.0)",
                strokeColor: "rgba(76,175,80,1.0)",
                highlightFill: "rgba(76,175,80,1.0)",
                highlightStroke: "rgba(76,175,80,1.0)"
        }, { // dark grey
                fillColor: "rgba(244,67,54,1.0)",
                strokeColor: "rgba(244,67,54,1.0)",
                highlightFill: "rgba(244,67,54,1.0)",
                highlightStroke: "rgba(244,67,54,1.0)"
        }];
    });

    app.controller('BaseCtrl', function($scope) {
        $scope.labels = ['Download Sales', 'Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales'];
        $scope.data = [300, 500, 100, 40, 120];
        $scope.type = 'PolarArea';

        $scope.toggle = function() {
            $scope.type = $scope.type === 'PolarArea' ? 'Pie' : 'PolarArea';
        };
        $scope.colours = [{ // grey
                fillColor: "rgba(255,110,64,1)",
                strokeColor: "rgba(255,110,64,1.0)",
                highlightFill: "rgba(255,110,64,1.0)",
                highlightStroke: "rgba(255,110,64,1)"
        }, { // dark grey
                fillColor: "rgba(103,58,183,1.0)",
                strokeColor: "rgba(103,58,183,1.0)",
                highlightFill: "rgba(103,58,183,1.0)",
                highlightStroke: "rgba(103,58,183,1.0)"
        }, { // dark grey
                fillColor: "rgba(253,216,53,1.0)",
                strokeColor: "rgba(253,216,53,1.0)",
                highlightFill: "rgba(253,216,53,1.0)",
                highlightStroke: "rgba(253,216,53,1.0)"
        }, { // dark grey
                fillColor: "rgba(76,175,80,1.0)",
                strokeColor: "rgba(76,175,80,1.0)",
                highlightFill: "rgba(76,175,80,1.0)",
                highlightStroke: "rgba(76,175,80,1.0)"
        }, { // dark grey
                fillColor: "rgba(244,67,54,1.0)",
                strokeColor: "rgba(244,67,54,1.0)",
                highlightFill: "rgba(244,67,54,1.0)",
                highlightStroke: "rgba(244,67,54,1.0)"
        }];
    });

    app.controller('RadarCtrl', function($scope) {
        $scope.labels = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];

        $scope.data = [
            [65, 59, 90, 81, 56, 55, 40],
            [28, 48, 40, 19, 96, 27, 100]
        ];

        $scope.onClick = function(points, evt) {
            //console.log(points, evt);
        };
        $scope.colours = [{ // grey
                fillColor: "rgba(255,110,64,0.5)",
                strokeColor: "rgba(255,110,64,1)",
                pointColor: "rgba(255,110,64,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(255,110,64,1)"
        }, { // dark grey
                fillColor: "rgba(103,58,183,0.5)",
                strokeColor: "rgba(103,58,183,1.0)",
                pointColor: "rgba(103,58,183,1.0)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(103,58,183,1.0)"
        }];
    });

    app.controller('StackedBarCtrl', function($scope) {
        $scope.labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        $scope.type = 'StackedBar';

        $scope.data = [
            [65, 59, 90, 81, 56, 55, 40],
            [28, 48, 40, 19, 96, 27, 100]
        ];
    });

    app.controller('DataTablesCtrl', function($scope) {
        $scope.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
        $scope.data = [
            [65, 59, 80, 81, 56, 55, 40],
            [28, 48, 40, 19, 86, 27, 90]
        ];
        $scope.colours = [{ // grey
                fillColor: "rgba(255,110,64,0.5)",
                strokeColor: "rgba(255,110,64,1)",
                pointColor: "rgba(255,110,64,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(255,110,64,1)"
        }, { // dark grey
                fillColor: "rgba(103,58,183,0.5)",
                strokeColor: "rgba(103,58,183,1.0)",
                pointColor: "rgba(103,58,183,1.0)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(103,58,183,1.0)"
        }];
        $scope.randomize = function() {
            $scope.data = $scope.data.map(function(data) {
                return data.map(function(y) {
                    y = y + Math.random() * 10 - 5;
                    return parseInt(y < 0 ? 0 : y > 100 ? 100 : y);
                });
            });
        };
    });

    app.controller('TicksCtrl', ['$scope', '$interval', function($scope, $interval) {
        var maximum = document.getElementById('container').clientWidth / 2 || 300;
        $scope.data = [
            []
        ];
        $scope.labels = [];
        $scope.options = {
            animation: false,
            showScale: false,
            showTooltips: false,
            pointDot: false,
            datasetStrokeWidth: 0.5
        };

        // Update the dataset at 25FPS for a smoothly-animating chart
        $interval(function() {
            getLiveChartData();
        }, 40);

        function getLiveChartData() {
            if ($scope.data[0].length) {
                $scope.labels = $scope.labels.slice(1);
                $scope.data[0] = $scope.data[0].slice(1);
            }

            while ($scope.data[0].length < maximum) {
                $scope.labels.push('');
                $scope.data[0].push(getRandomValue($scope.data[0]));
            }
        }
    }]);

    function getRandomValue(data) {
        var l = data.length,
            previous = l ? data[l - 1] : 50;
        var y = previous + Math.random() * 10 - 5;
        return y < 0 ? 0 : y > 100 ? 100 : y;
    }

})();
