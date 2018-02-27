//$.getScript("appli.js");
$.getScript("app.url.js");

app.controller('DoctorsCtrl', ['$scope', '$rootScope', '$uibModal', '$log', '$state', '$location', '$timeout', '$http','filterFilter', '$filter', 'deconnectApi',function ($scope, $rootScope, $modal, $log, $state, $location, $timeout, $http, filterFilter, $filter, deconnectApi) {
	var idADmin = sessionStorage.getItem("iduser");
	var idLoc=sessionStorage.getItem("idloc");
	var catplus=0;
	$scope.listCategories=[];
	$scope.listSubCategories=[];
	$scope.listDocsbyUserAndCats=[];
	$scope.listDocsRecus=[];
	$scope.listDocsRecusByInst=[];
	$scope.listCategoriesAll=[];
	$scope.listContacts=[];
	$scope.listTdBankOfLoaclities=[];
	$scope.listBksByLoc=[];
	$scope.listBksByLoc2 = [];
	$scope.listBksByLoc3 = [];
	$scope.listBksByLoc4 = [];
	$scope.listBksByLoc5 = [];
	$scope.listInsDocsWithMe=[];
	$scope.islistContacts=false;
	$scope.folds=[];
	$scope.separeur='';
	$scope.listSousCategorie_s=[];
	$scope.listDocsbyUserAndSubCats=[];
	$scope.selectionbank=[];
	$scope.isCatClicked=false;
	$scope.isSubCatClicked=false;
	$scope.isDocClicked=false;
	$scope.idClickedCat=0;
	$scope.idClickedDoc=0;
	$scope.separateurdel='';
	$scope.infoCatOrSubCat=null;
	$scope.infoDocumt=null;
	$scope.isOperation=false;
	$scope.nomCat='';
	$scope.nomDoc_='';
	// for dorecus
	$scope.nomEnt='';
	$scope.isopenEnt=0;
	$scope.infoEnt='';
	/* search*/
	$scope.dateDebut='';
	$scope.dateFin='';
	$scope.productSearch=null;
	$scope.deviseSearch=null;
	$scope.listDevisis=[];
	$scope.listProduitis=[];
	$scope.isTdjReady=false;
	$scope.searchTdjResponse=[];
	var idsProducts=[];
	var idsDevises=[];
	$scope.sepPubAudit='';
	$scope.listSharedUsers=[];
	var configs={
		headers:{
			'Authorization': 'Bearer '+localStorage.getItem('jeton')
		}
	};
	
	/**********RECHERCHE SUR LES DOCUMENTS*************/
	$scope.showRecherche = function(){
		//console.log('hello search is comming soon...'); 
		$state.go('app.search-document-entreprise');
	};
	function listDocumentSearch() {
		/*******************************************************************
			********************************************************************
			***@GET(mon_espace/documents/list_created/)***************
			***********************************
			***@return JsonParser***********************************************
			********************************************************************
			********************************************************************/
		$http({
			method : 'GET',
			url : baseUrl+'mon_espace/documents/list_created/'+idADmin,
			data : {},
			headers:{'Authorization': 'Bearer '+localStorage.getItem('jeton')}
		}).then(function successCallback(response) {
			$scope.resultatDocEntr = response.data.created_documents_list;
			return $scope.resultatDocEntr;
			$scope.recherche = {};
			 
			$scope.resetFilters = function () {
				// needs to be a function or it won't trigger a $watch
				$scope.recherche = {};
			};
			
			// pagination controls
			$scope.currentPage = 1;
			$scope.totalItems = $scope.resultatDocEntr.length;
			$scope.entryLimit = 8; // items per page
			$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
			
			// $watch search to update pagination
			$scope.$watch('recherche', function (newVal, oldVal) {
				$scope.filtered = filterFilter($scope.resultatDocEntr, newVal);
				$scope.totalItems = $scope.filtered.length;
				$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
				$scope.currentPage = 1;
			}, true);
		}).catch(function (err) {
			if(err.status==500 && localStorage.getItem('jeton')!='' && localStorage.getItem('jeton')!=null && localStorage.getItem('jeton')!=undefined){
				deconnectApi.logout(sessionStorage.getItem("iduser")).then(function (response) {
							$location.url('/access/login');
							$state.go('access.login');
						}).catch(function (response) {
				});
			};
		});
	};
	listDocumentSearch();
	
	$scope.searchDocRecu = function(){
		//console.log('hello search doc reçu is comming soon...'); 
		$state.go('app.search-doc-entreprise-recu');
		//listDocumentSearch();
	};
	function listDocRecuSearch(){
		$http({
			method : 'GET',
			url : baseUrl+'mon_espace/documents/list_received_search/'+idADmin,
			data : {},
			headers:{'Authorization': 'Bearer '+localStorage.getItem('jeton')}
		}).then(function successCallback(response) {
			$scope.docEntRecuListSearch = response.data.received_documents_list;
			return $scope.docEntRecuListSearch;
			////console.log($scope.docBankRecuListSearch);
			$scope.rechercheDoc = {};
			 
			$scope.resetFilters = function () {
				// needs to be a function or it won't trigger a $watch
				$scope.rechercheDoc = {};
			};
			
			// pagination controls
			$scope.currentPage = 1;
			$scope.totalItems = $scope.docEntRecuListSearch.length;
			$scope.entryLimit = 8; // items per page
			$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
			
			// $watch search to update pagination
			$scope.$watch('rechercheDoc', function (newVal, oldVal) {
				$scope.filtered = filterFilter($scope.docEntRecuListSearch, newVal);
				$scope.totalItems = $scope.filtered.length;
				$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
				$scope.currentPage = 1;
			}, true);
		}).catch(function (err) {
			if(err.status==500 && localStorage.getItem('jeton')!='' && localStorage.getItem('jeton')!=null && localStorage.getItem('jeton')!=undefined){
				deconnectApi.logout(sessionStorage.getItem("iduser")).then(function (response) {
							$location.url('/access/login');
							$state.go('access.login');
						}).catch(function (response) {
				});
			};
		});
	};
	listDocRecuSearch();
	/*********FIN RECHERCHE SUR LES DOCUMENTS***********/
	$scope.objet_search={   
		"dateDebut": ""+$scope.dateDebut,
		"dateFin": ""+$scope.dateFin,
		"idProduit": $scope.productSearch,
		"devise": $scope.deviseSearch,
		"idsBank": $scope.selectionbank
	};
	/*FIN search*/
	/************SEARCH CON STAND***********/
	var Produitis2=[];
	$scope.listProduitis2=[];
	$scope.listCondStands=[];
	$scope.searchTdjResponse2=[];
	var idsProducts2=[];
	// $scope.isCondStandReady=false;
	$scope.dateDebut2='';
	$scope.dateFin2='';
	$scope.tauxStandardSearch='';
	$scope.productSearch2=null;
	$scope.selectionbank2=[];
	
	$scope.isTdjReady2=false;
	$scope.objet_search2={   
		"dateDebut": "",
		"dateFin": "",
		"idPr": null,
		"tauxStandard": "",
		"idsBank": []
	};
	/************FIN SEARCH CON STAND***********/
	$scope.is_2=false;
	// $scope.isopenCat=false;
	// $scope.isopenSubCat=false;
	// $scope.infoDocRecu=[];
    // $http.get('data/hos-doctors.json').then(function(response) {
      // $scope.doctors = response.data;
    // });
	// $rootScope.$on('doctor', function() {
		// ////console.log("Je suis là");
	// });
	
    // $http.get('data/admin_banque/banque-documents.json').then(function(response) {
      // $scope.documents = response.data;
    // });

    // $http.get('data/admin_banque/banque-documents-recus.json').then(function(response) {
      // $scope.documents_recus = response.data;
    // });

    // $scope.folds = [
      // {name: 'Categorie_1', filter:'Categorie_1', icon:'fa-inbox', badge:'primary', count: '6', date:''},
      // {name: 'Categorie_2', filter:'Categorie_2', icon:'fa-send-o', badge: '', count: '1', date:'' },
      // {name: 'Categorie_3', filter:'Categorie_3', icon:'fa-star-o', badge: '', count: '0', date:''},
      // {name: 'Categorie_4', filter:'Categorie_4', icon:'fa-edit', badge:'accent', count: '2', date:''}
    // ];
	
	// $scope.listCategories =[ 
			// {
				// name: 'Categorie_'+0,
				// docs:[
					// {
						// name: 'Doc_'+0
					// }
				// ]
			// }
	// ];
	
	// $scope.$on('submitcat', function(events, args){
		// var folds = 
			// {
				// name: ''+args,
				// docs:[
					// {
						// name: ''
					// }
				// ]
		// };
		// $scope.folds.push(folds);
	// });
	
	// $scope.$on('submitdoc', function(events, args){
		// for(var i=0;i<$scope.folds.length;i++){
			// if($scope.folds[i].name==args.c){
				// docs={
					// name: ''+args.a
				// };
				// $scope.folds[i].docs.push(docs);
			// }
		// }
	// });
	
	// $scope.catDocBkLists=function(a){
		// $state.go('app.mes-docs.visualbk',{fold:a});
	// };
	
	// $scope.catDocBkDetail=function(a,b){
		// $state.go('app.mes-docs.visualbk_byname',{name : a, named : b, id :c});
	// };
	/*************FORMATAGE DE DATE***********/
	// function formatDate(a){
		// var mois=a.getMonth()+1;
		// var jour=a.getDate();
		// var hour=a.getHours();
		// var min=a.getMinutes();
		// var seco=a.getSeconds();
		// var mseco=a.getMilliseconds();
		// if(mois<10) {
			// mois = '0'+mois;
		// };
		// if(jour<10) {
			// jour = '0'+jour;
		// }; 
		// if(hour<10) {
			// hour = '0'+hour
		// };
		// if(min<10) {
			// min = '0'+min;
		// };
		// if(seco<10) {
			// seco = '0'+seco;
		// };
		// if(mseco<10) {
			// mseco = '0'+mseco;
		// }
		// str=a.getFullYear()+'-'+mois+'-'+jour;
	// };
	/*************FIN FORMATAGE DE DATE***********/
	/***************************POP UP ACTIONS ET  SUPPRESSION**************************/
	function popUpconfirmation(x){
		if (x != undefined) {
			var modalInstance = $modal.open({
				templateUrl: 'partials/deletionConfirm.html',
				controller: 'deletionConfirmEnCtrl_',
				resolve: {
					x: function () {
						return x;
					}
				}  
			});
		};

		modalInstance.result.then(function (selectedItem) {
			$scope.selected = selectedItem;
		}, function () {
			// $log.info('Modal dismissed at: ' + new Date());
		});
	};
	function popUpActionEspaceEn(){
	};
	function popUpPublish(){
		var modalInstance = $modal.open({
			templateUrl: 'partials/admin_entreprise/mes_operations/publishdoc.html',
			controller: 'popUpPublishCtrl',
			resolve: {
				x_info_doc: function () {
					return $scope.infoDocumt;
				},
				sepPubAudit: function () {
					return $scope.sepPubAudit;
				}
			}  
		});
		
		modalInstance.result.then(function (selectedItem) {
			$scope.selected = selectedItem;
		}, function () {
			// $log.info('Modal dismissed at: ' + new Date());
		});
	};
	function auditPopUpPublish(){
		var modalInstance = $modal.open({
			templateUrl: 'partials/admin_entreprise/mes_operations/auditDoc.html',
			controller: 'popUpAuditCtrl',
			resolve: {
				x_info_doc: function () {
					return $scope.infoDocumt;
				},
				sepPubAudit: function () {
					return $scope.sepPubAudit;
				},
				x_info_auddoc: function () {
					return $scope.listSharedUsers;
				}
			}  
		});
		
		modalInstance.result.then(function (selectedItem) {
			$scope.selected = selectedItem;
		}, function () {
			// $log.info('Modal dismissed at: ' + new Date());
		});
	};
	/***************************FIN POP UP ACTIONS ET SUPPRESSION**************************/
	$scope.classSeparator=function(a,b){
		
	};
	
	// $('element').click(function() {
		// alert($(this).attr('id'));
	// };
	
	// $(document).on("click","a", function (event) {
		// //console.log("Moi ");
	// });
	
	// $( "body" ).click(function( event ) {
	  // $( "#accords" ).html( "clicked: " + event.target.nodeName );
	// });
	
	// $( "#accords a" ).click(function() {
		// //console.log("Moi_ ");
	// });
	// $scope.isOpen=false;
	$scope.loading=false;
	$scope.catDocEntLists=function(cat_,a,b){
		$scope.loading=true;
		// if(document.getElementsByClassName("8").length!=0){
			// document.getElementsByClassName("8")[0].click();
		// };
		// for(var i=0;i<$scope.listCategories.length;i++){
			// if($scope.listCategories[i].idCategory!=parseInt(a)){
				
			// };
		// };
		// //console.log("Moi ",document.getElementsByClassName("accords"));
		$scope.nomCat=b;
		$scope.isopenCat=cat_.idCategory;
		//console.log("cat_ ",cat_);
		$scope.infoCatOrSubCat=cat_;
		$scope.isSubCatClicked=false;
		$scope.isDocClicked=false;
		$scope.isCatClicked=true;
		$scope.idClickedCat=parseInt(a);
		listSousCategories(parseInt(a));
		listDocsbyUserAndCat(parseInt(a));
		// listDocsbyUserAndSubCat(parseInt(a));
		if ($scope.$root && !$scope.$root.$$phase) {
			$scope.$apply();
		};
		$state.go('app.adminent_op_esp_mesdoc.visualent',{fold:b,id:a});
	};
	
	$scope.loading2=false;
	$scope.entDocEntLists=function(ent_,a,b){
		$scope.loading2=true;
		$scope.isDocClicked=false;
		$scope.listDocsRecusByInst=[];
		$scope.listDocsRecus=[];
		$scope.nomEnt=b;
		$scope.isopenEnt=ent_.idInstitution;
		$scope.infoEnt=ent_;
		$scope.idClickedCat=parseInt(a);
		listDocsRecus(b);
		if ($scope.$root && !$scope.$root.$$phase) {
			$scope.$apply();
		};
		$state.go('app.docs-recus-ent.visualentrecus',{fold:b});
	};
	
	$scope.subCatDocEntLists=function(subcat_,a,b){
		// $scope.loading=true;
		$scope.nomCat=b;
		$scope.isopenSubCat=subcat_.idCategory;
		//console.log("subcat_ ",subcat_);
		$scope.infoCatOrSubCat=subcat_;
		/**** 16112017*****/
		$scope.isCatClicked=false;
		$scope.isDocClicked=false;
		/**** 16112017*****/
		$scope.isSubCatClicked=true;
		$scope.idClickedCat=parseInt(a);
		// listSousCategories(parseInt(a));
		// listDocsbyUserAndCat(parseInt(a));
		listDocsbyUserAndSubCat(parseInt(a));
		if ($scope.$root && !$scope.$root.$$phase) {
			$scope.$apply();
		};
		$state.go('app.adminent_op_esp_mesdoc.visualent',{fold:b,id:a});
	};
	
	$scope.$watch("nomCat",function( newValue, oldValue ) { 
		$scope.nomCat=$scope.nomCat;
	});
	
	$scope.catDocEntDetail=function(event,docSelect,a,b,c,d){
		// console.log("event-- ",docSelect);
		// console.log("dateDoc ",$filter('date')(docSelect.dateDocument, 'dd/MM/yyyy'));
		// console.log("dateCharg ",$filter('date')(docSelect.dateChargement, 'dd/MM/yyyy'));
		$rootScope.$broadcast('docclicOk', {d:d});
		$scope.isOpen=false;
		// document.getElementById("accords").style.backgroundColor='#1065a8';
		//console.log("docSelect ",docSelect);
		$scope.nomDoc_=b;
		$scope.idClickedDoc=parseInt(d);
		$scope.infoDocumt=docSelect;
		/**** 16112017*****/
		// $scope.isCatClicked=false;
		// $scope.isSubCatClicked=false;
		/**** 16112017*****/
		$scope.isDocClicked=true;
		if ($scope.$root && !$scope.$root.$$phase) {
			$scope.$apply();
		};
		$state.go('app.adminent_op_esp_mesdoc.visualent_bynamedoc',{name : a, named : b, url_ : c, id : d});
		$rootScope.$broadcast('documentclicked', {document_ : docSelect});
	};
	
	$scope.entDocEntDetail=function(docSelect,a,b,c,d){
		// //console.log("bank_name ",a.split("/")[1]);
		if(a.split("/")[1]!=undefined && a.split("/")[1]!=null){
			a=a.split("/")[1];
		};
		$scope.nomDoc_=b;
		$scope.idClickedDoc=parseInt(d);
		$scope.infoDocumt=docSelect;
		$scope.isDocClicked=true;
		if ($scope.$root && !$scope.$root.$$phase) {
			$scope.$apply();
		};
		// //console.log("bank_name ",bank_name);
		$state.go('app.docs-recus-ent.visualent_bynamedocrecus',{name : a, named : b, url_ : c, id : d});
	};
	
	$scope.$on('DetailDocCtrlByName', function(events, args){
		//console.log("DetailDocCtrlByName ",args.documenId);
	});
	
	$scope.DocRecuEntDetail=function(doc1){
		// $scope.infoDocRecu.push(doc1);
		// //console.log("Détails doc recu ",$scope.infoDocRecu);
		// $rootScope.$broadcast('documentclicked', {document_ : doc1});
	};
	// $scope.$watch("infoDocRecu",function( newValue, oldValue ) { 
		// $scope.infoDocRecu=$scope.infoDocRecu;
		// //console.log("newValueok ",newValue);
		// //console.log("oldValueok ",oldValue);
	// });
    // $scope.pdf = [{
      // src: 'http://localhost:8000/app/data/example.pdf',
    // }];
	
	/*ADD CATEGORIE, DOCUMENT ET SUBCATEGORIE FUNCTION POPUP*/
	/*UPDATE CAT OR SUBCAT OR DOC*/
	$scope.updateCat=function(){
		$scope.separeur='UPDATE-CAT';
		var modalInstance = $modal.open({
			templateUrl: 'partials/admin_entreprise/mes_operations/register_op_esp_mesdocc.html',
			controller: 'poPenMesDocsCtrl',
			resolve: {
				listcat: function () {
					return $scope.listCategories;
				},
				listsubcat: function () {
					return $scope.listSousCategories;
				},
				listdoccat: function () {
					return $scope.listDocsbyUserAndCats;
				},
				listdoccat_recu: function () {
					return $scope.listDocsRecus;
				},
				separeur: function () {
					return $scope.separeur;
				},
				list_all_cats: function () {
					return $scope.listCategoriesAll;
				},
				infocat_sub: function () {
					return $scope.infoCatOrSubCat;
				},
				info_doc: function () {
					return $scope.infoDocumt;
				},
				isoperation: function () {
					return false;
				}
			}
		});

		modalInstance.result.then(function (selectedItem) {
			$scope.selected = selectedItem;
		}, function () {
			$log.info('Modal dismissed at: ' + new Date());
		});
	};
	$scope.updateSubCat=function(){
		$scope.separeur='UPDATE-SUBCAT';
		var modalInstance = $modal.open({
			templateUrl: 'partials/admin_entreprise/mes_operations/register_op_esp_mesdocsubc.html',
			controller: 'poPenMesDocsCtrl',
			resolve: {
				listcat: function () {
					return $scope.listCategories;
				},
				listsubcat: function () {
					return $scope.listSousCategories;
				},
				listdoccat: function () {
					return $scope.listDocsbyUserAndCats;
				},
				listdoccat_recu: function () {
					return $scope.listDocsRecus;
				},
				separeur: function () {
					return $scope.separeur;
				},
				list_all_cats: function () {
					return $scope.listCategoriesAll;
				},
				infocat_sub: function () {
					return $scope.infoCatOrSubCat;
				},
				info_doc: function () {
					return $scope.infoDocumt;
				},
				isoperation: function () {
					return false;
				}
			}
		});

		modalInstance.result.then(function (selectedItem) {
			$scope.selected = selectedItem;
		}, function () {
			$log.info('Modal dismissed at: ' + new Date());
		});
	};
	$scope.updateDoc=function(){
		$scope.separeur='UPDATE-DOC';
		var modalInstance = $modal.open({
			templateUrl: 'partials/admin_entreprise/mes_operations/register_op_esp_mesdocd.html',
			controller: 'poPenMesDocsCtrl',
			resolve: {
				listcat: function () {
					return $scope.listCategories;
				},
				listsubcat: function () {
					return $scope.listSousCategories;
				},
				listdoccat: function () {
					return $scope.listDocsbyUserAndCats;
				},
				listdoccat_recu: function () {
					return $scope.listDocsRecus;
				},
				separeur: function () {
					return $scope.separeur;
				},
				list_all_cats: function () {
					return $scope.listCategoriesAll;
				},
				infocat_sub: function () {
					return $scope.infoCatOrSubCat;
				},
				info_doc: function () {
					return $scope.infoDocumt;
				},
				isoperation: function () {
					return false;
				}
			}
		});

		modalInstance.result.then(function (selectedItem) {
			$scope.selected = selectedItem;
		}, function () {
			$log.info('Modal dismissed at: ' + new Date());
		});
	};
	/*FIN UPDATE CAT OR SUBCAT*/
	/*DELETE CAT OR SUBCAT OR DOC*/
	$scope.deleteCat=function(){
		$scope.separateurdel='DEL-CAT';
		var id_cate=$scope.idClickedCat;
		// //console.log("idcateg ",id_cate);
		popUpconfirmation(id_cate);
	};
	$scope.deleteSubCat=function(){
		$scope.separateurdel='DEL-SUBCAT';
		var id_cate=$scope.idClickedCat;
		// //console.log("idsubcateg ",id_cate);
		popUpconfirmation(id_cate);
	};
	$scope.deleteDoc=function(){
		$scope.separateurdel='DEL-DOC';
		var id_docs=$scope.idClickedDoc;
		popUpconfirmation(id_docs);
	};
	$scope.deleteDocRecu=function(){
		$scope.separateurdel='DEL-DOCRECUS';
		var id_docs=$scope.idClickedDoc;
		popUpconfirmation(id_docs);
	};
	$scope.reorderDoc = function(){
		$scope.separeur='RANGER-DOC';
		var modalInstance = $modal.open({
		templateUrl: 'partials/admin_entreprise/mes_operations/register_op_esp_mesdocd.html',
		controller: 'poPenMesDocsCtrl',
			resolve: {
				listcat: function () {
					return $scope.listCategories;
				},
				listsubcat: function () {
					return $scope.listSousCategories;
				},
				listdoccat: function () {
					return $scope.listDocsbyUserAndCats;
				},
				listdoccat_recu: function () {
					return $scope.listDocsRecus;
				},
				separeur: function () {
					return $scope.separeur;
				},
				list_all_cats: function () {
					return $scope.listCategoriesAll;
				},
				infocat_sub: function () {
					return $scope.infoCatOrSubCat;
				},
				info_doc: function () {
					return $scope.infoDocumt;
				},
				isoperation: function () {
					return false;
				}
			}
		});
	};
	/*******USERS SHARED****************/
	function listUserShared(id){
		$http({
			method : 'GET',
			url : baseUrl+'mon_espace/documents/list_users_shared/'+parseInt(idADmin)+'/'+parseInt(id),
			data : {},
			headers:{'Authorization': 'Bearer '+localStorage.getItem('jeton')}
		}).then(function successCallback(response) {
			$scope.listSharedUsers=response.data.received_documents_list;
			auditPopUpPublish();
			//console.log("Users Shared ",response);
		}).catch(function (err) {
			if(err.status==500 && localStorage.getItem('jeton')!='' && localStorage.getItem('jeton')!=null && localStorage.getItem('jeton')!=undefined){
				deconnectApi.logout(sessionStorage.getItem("iduser")).then(function (response) {
							$location.url('/access/login');
							$state.go('access.login');
						}).catch(function (response) {
				});
			};
		});
	};
	/*********FIN USERS SHARED***********/
	$scope.publishDoc=function(){
		$scope.sepPubAudit='publier';
		// $scope.infoDocumt=document_info;
		popUpPublish();
	};
	
	$scope.auditCatDoc=function(document_info){
		var id_=parseInt(document_info.idDocuments);
		$scope.sepPubAudit='audit';
		$scope.infoDocumt=document_info;
		// auditPopUpPublish();
		listUserShared(id_);
	};
	
	$scope.auditSubCatDoc=function(document_info){
		var id_=parseInt(document_info.idDocuments);
		$scope.sepPubAudit='audit';
		$scope.infoDocumt=document_info;
		// auditPopUpPublish();
		listUserShared(id_);
	};
	
	$scope.auditDocument=function(){
		$scope.sepPubAudit='audit';
		var id_=parseInt($scope.infoDocumt.idDocuments);
		listUserShared(id_);
	};
	/*FIN DELETE CAT OR SUBCAT OR DOC*/
	/*FUNCTIONS GLOBAL SUPPRESSIONS SUPPRESSION*/
	function deleteCatOrSubCat(id_categorie){
		$http({
			method : 'DELETE',
			url : baseUrl+'mon_espace/category/delete/'+parseInt(idADmin)+'/'+parseInt(id_categorie),
			data : {},
			headers:{'Authorization': 'Bearer '+localStorage.getItem('jeton')}
		}).then(function successCallback(response) {
			//console.log("Suppression Cat or subcat Success  ",response);
			$location.url('/eTreasury/entreprise/adminent_op_esp_mesdoc');
			$timeout(function () {
				$state.reload();
			},2000);
			// $state.reload();
		}).catch(function (err) {
			if(err.status==500 && localStorage.getItem('jeton')!='' && localStorage.getItem('jeton')!=null && localStorage.getItem('jeton')!=undefined){
				deconnectApi.logout(sessionStorage.getItem("iduser")).then(function (response) {
							$location.url('/access/login');
							$state.go('access.login');
						}).catch(function (response) {
				});
			};
		});
	};
	
	function deleteDocument(id_document){
		$http({
			method : 'DELETE',
			url : baseUrl+'mon_espace/documents/delete_file/'+parseInt(idADmin)+'/'+id_document,
			data : {},
			headers:{'Authorization': 'Bearer '+localStorage.getItem('jeton')}
		}).then(function successCallback(response) {
			//console.log("Suppression Doc Success  ",response);
			$location.url('/eTreasury/entreprise/adminent_op_esp_mesdoc');
			$timeout(function () {
				$state.reload();
			},2000);
			// $state.reload();
		}).catch(function (err) {
			if(err.status==500 && localStorage.getItem('jeton')!='' && localStorage.getItem('jeton')!=null && localStorage.getItem('jeton')!=undefined){
				deconnectApi.logout(sessionStorage.getItem("iduser")).then(function (response) {
							$location.url('/access/login');
							$state.go('access.login');
						}).catch(function (response) {
				});
			};
		});
	};
	
	function deleteDocumentRecu(id_document){
		$http({
			method : 'DELETE',
			url : baseUrl+'mon_espace/documents/delete/document_has_user/'+parseInt(idADmin)+'/'+id_document,
			data : {},
			headers:{'Authorization': 'Bearer '+localStorage.getItem('jeton')}
		}).then(function successCallback(response) {
			//console.log("Suppression DocRecu Success  ",response);
			$location.url('/eTreasury/entreprise/adminent_op_esp_docr');
			$timeout(function () {
				$state.reload();
			},2000);
		}).catch(function (err) {
			if(err.status==500 && localStorage.getItem('jeton')!='' && localStorage.getItem('jeton')!=null && localStorage.getItem('jeton')!=undefined){
				deconnectApi.logout(sessionStorage.getItem("iduser")).then(function (response) {
							$location.url('/access/login');
							$state.go('access.login');
						}).catch(function (response) {
				});
			};
		});
	};
	/*FIN FUNCTIONS GLOBAL SUPPRESSION*/
	$scope.EnMesDocaddCat = function () {
		$scope.separeur='ADD-CAT';
		var modalInstance = $modal.open({
			templateUrl: 'partials/admin_entreprise/mes_operations/register_op_esp_mesdocc.html',
			controller: 'poPenMesDocsCtrl',
			resolve: {
				listcat: function () {
					return $scope.listCategories;
				},
				listsubcat: function () {
					return $scope.listSousCategories;
				},
				listdoccat: function () {
					return $scope.listDocsbyUserAndCats;
				},
				listdoccat_recu: function () {
					return $scope.listDocsRecus;
				},
				separeur: function () {
					return $scope.separeur;
				},
				list_all_cats: function () {
					return $scope.listCategoriesAll;
				},
				infocat_sub: function () {
					return $scope.infoCatOrSubCat;
				},
				info_doc: function () {
					return $scope.infoDocumt;
				},
				isoperation: function () {
					return true;
				}
			}
		});

		modalInstance.result.then(function (selectedItem) {
			$scope.selected = selectedItem;
		}, function () {
			$log.info('Modal dismissed at: ' + new Date());
		});
	};
	$scope.EnMesDocaddSubCat = function () {
		$scope.separeur='ADD-SUBCAT';
		var modalInstance = $modal.open({
			templateUrl: 'partials/admin_entreprise/mes_operations/register_op_esp_mesdocsubc.html',
			controller: 'poPenMesDocsCtrl',
			resolve: {
				listcat: function () {
					return $scope.listCategories;
				},
				listsubcat: function () {
					return $scope.listSousCategories;
				},
				listdoccat: function () {
					return $scope.listDocsbyUserAndCats;
				},
				listdoccat_recu: function () {
					return $scope.listDocsRecus;
				},
				separeur: function () {
					return $scope.separeur;
				},
				list_all_cats: function () {
					return $scope.listCategoriesAll;
				},
				infocat_sub: function () {
					return $scope.infoCatOrSubCat;
				},
				info_doc: function () {
					return $scope.infoDocumt;
				},
				isoperation: function () {
					return true;
				}
			}
		});

		modalInstance.result.then(function (selectedItem) {
			$scope.selected = selectedItem;
		}, function () {
			$log.info('Modal dismissed at: ' + new Date());
		});
	};
	$scope.EnMesDocaddDoc = function () {
		$scope.separeur='ADD-DOC';
		var modalInstance = $modal.open({
			templateUrl: 'partials/admin_entreprise/mes_operations/register_op_esp_mesdocd.html',
			controller: 'poPenMesDocsCtrl',
			resolve: {
				listcat: function () {
					return $scope.listCategories;
				},
				listsubcat: function () {
					return $scope.listSousCategories;
				},
				listdoccat: function () {
					return $scope.listDocsbyUserAndCats;
				},
				listdoccat_recu: function () {
					return $scope.listDocsRecus;
				},
				separeur: function () {
					return $scope.separeur;
				},
				list_all_cats: function () {
					return $scope.listCategoriesAll;
				},
				infocat_sub: function () {
					return $scope.infoCatOrSubCat;
				},
				info_doc: function () {
					return $scope.infoDocumt;
				},
				isoperation: function () {
					return true;
				}
			}
	});

		modalInstance.result.then(function (selectedItem) {
			$scope.selected = selectedItem;
		}, function () {
			$log.info('Modal dismissed at: ' + new Date());
		});
	};
	/*FIN ADD CATEGORIE, DOCUMENT ET SUBCATEGORIE FUNCTION POPUP*/
	/*MESSAGES ERREUR POPUP*/
	$scope.$on('message_err', function(events, args){
		var statut=args.statut;
		var msn=args.message;
		var isSuccess=false;
		if(statut==0){
			isSuccess=true;
			$rootScope.$broadcast('message_err_affich', {isSuccess : isSuccess,statut : statut,msn : msn});
		}else{
			isSuccess=false;
			$rootScope.$broadcast('message_err_affich', {isSuccess : isSuccess,statut : statut,msn : msn});
		};
	});
	/*FIN MESSAGES ERREUR POPUP*/
/**********************************CATEGORIES ET DOCUMENTS ENTREPRISE*******************************************/
	
	/*LISTE DES CATEGORIES*/
	function listCategoriesAll() {
		$http({
			method : 'GET',
			url : baseUrl+'mon_espace/category/list_user/'+idADmin,
			data : {},
			headers:{'Authorization': 'Bearer '+localStorage.getItem('jeton')}
		}).then(function successCallback(response) {
			// //console.log("listCategories ",response.data.category_list);
			// for(var i =0; i< response.data.category_list.length; i++){
				// $scope.listCategoriesAll=response.data.category_list;
			// }
			$scope.listCategoriesAll=response.data.category_list;
		}).catch(function (err) {
			if(err.status==500 && localStorage.getItem('jeton')!='' && localStorage.getItem('jeton')!=null && localStorage.getItem('jeton')!=undefined){
				deconnectApi.logout(sessionStorage.getItem("iduser")).then(function (response) {
							$location.url('/access/login');
							$state.go('access.login');
						}).catch(function (response) {
				});
			};
		});
	};
	listCategoriesAll();
	$scope.loadingcat=false;
    function listCategories() {
		$scope.loadingcat=true;
		$http({
			method : 'GET',
			url : baseUrl+'mon_espace/category/list_user/'+idADmin,
			data : {},
			headers:{'Authorization': 'Bearer '+localStorage.getItem('jeton')}
		}).then(function successCallback(response) {
			$scope.loadingcat=false;
			//console.log("listCategories tout ",response.data.category_list);
			for(var i =0; i< response.data.category_list.length; i++){
				if(response.data.category_list[i].parent==null){
					$scope.listCategories.push(response.data.category_list[i]);
					// listSousCategories(response.data.category_list[i].idCategory);
				};
			}
		}).catch(function (err) {
			if(err.status==500 && localStorage.getItem('jeton')!='' && localStorage.getItem('jeton')!=null && localStorage.getItem('jeton')!=undefined){
				deconnectApi.logout(sessionStorage.getItem("iduser")).then(function (response) {
							$location.url('/access/login');
							$state.go('access.login');
						}).catch(function (response) {
				});
			};
		});
	};
	listCategories();
	/*FIN LISTE DES CATEGORIES*/
	/*LISTE DES SOUS CATEGORIES*/
	// $scope.listSousCategories_ = function(idCate) {
		// $http({
			// method : 'GET',
			// url : baseUrl+'mon_espace/category/list_sous_category/'+parseInt(idCate),
		// }).then(function successCallback(response) {
			// $scope.listSousCategorie_s = response.data.sous_category_list;
			// //console.log("$scope.listSousCategorie_s ",$scope.listSousCategorie_s);
		// }, function errorCallback(response) {
		// });
	// };
	
    function listSousCategories(idCate) {
		// idCate=21;
		$http({
			method : 'GET',
			url : baseUrl+'mon_espace/category/list_sous_category/'+parseInt(idCate),
			data : {},
			headers:{'Authorization': 'Bearer '+localStorage.getItem('jeton')}
		}).then(function successCallback(response) {
			$scope.listSousCategories = response.data.sous_category_list;
			//console.log("$scope.listSousCategories ",$scope.listSousCategories);
		}).catch(function (err) {
			if(err.status==500 && localStorage.getItem('jeton')!='' && localStorage.getItem('jeton')!=null && localStorage.getItem('jeton')!=undefined){
				deconnectApi.logout(sessionStorage.getItem("iduser")).then(function (response) {
							$location.url('/access/login');
							$state.go('access.login');
						}).catch(function (response) {
				});
			};
		});
	};
	// listSousCategories();
	/*FIN LISTE DES SOUS CATEGORIES*/
	/*LISTE DES DOCUMENTS RECUS*/
    function listDocsRecus(name_inst) {
		$scope.loading2=true;
		$http({
			method : 'GET',
			url : baseUrl+'mon_espace/documents/list_received/'+parseInt(idADmin),
			data : {},
			headers:{'Authorization': 'Bearer '+localStorage.getItem('jeton')}
		}).then(function successCallback(response) {
			$scope.loading2=false;
			$scope.listDocsRecus = response.data.received_documents_list;
			for(var i=0;i<$scope.listInsDocsWithMe.length;i++){
				for(var j=0;j<$scope.listDocsRecus.length;j++){
					var name_inst_=''+$scope.listDocsRecus[j].documents.repertoire;
					if($scope.listInsDocsWithMe[i].nom===name_inst && name_inst_.split("/")[1]===name_inst){
						$scope.listDocsRecusByInst.push($scope.listDocsRecus[j].documents);
					};
				};
			};
			// //console.log("listDocsRecusByInst ",$scope.listDocsRecusByInst);
		}).catch(function (err) {
			if(err.status==500 && localStorage.getItem('jeton')!='' && localStorage.getItem('jeton')!=null && localStorage.getItem('jeton')!=undefined){
				deconnectApi.logout(sessionStorage.getItem("iduser")).then(function (response) {
							$location.url('/access/login');
							$state.go('access.login');
						}).catch(function (response) {
				});
			};
		});
	};
	// listDocsRecus();
	/*FIN LISTE DES DOCUMENTS RECUS*/
	/*LISTE DES DOCUMENTS RECUS*/
	$scope.isMyInstitu=sessionStorage.getItem("nomInstitution");
	$scope.my_back='';
    function listInsDocsWithMe() {
		$http({
			method : 'GET',
			url : baseUrl+'mon_espace/documents/list_institution_received/'+parseInt(idADmin),
			data : {},
			headers:{'Authorization': 'Bearer '+localStorage.getItem('jeton')}
		}).then(function successCallback(response) {
			var nb_compte=0;
			// $scope.listInsDocsWithMe = response.data.received_documents_institution_list;
			for(var i=0;i<response.data.received_documents_institution_list.length;i++){
				if(response.data.received_documents_institution_list[i].nom===sessionStorage.getItem("nomInstitution")){
					nb_compte++;
					$scope.listInsDocsWithMe.push(response.data.received_documents_institution_list[i]);
				};
			};
			if(nb_compte!=0){
				for(var i=0;i<response.data.received_documents_institution_list.length;i++){
					if(response.data.received_documents_institution_list[i].nom!=sessionStorage.getItem("nomInstitution")){
						$scope.listInsDocsWithMe.push(response.data.received_documents_institution_list[i]);
					};
				};
			}else{
				$scope.listInsDocsWithMe=[];
				for(var i=0;i<response.data.received_documents_institution_list.length;i++){
					$scope.listInsDocsWithMe.push(response.data.received_documents_institution_list[i]);
				};
			};
			
			nb_compte=0;
			//console.log("$scope.listInsDocsWithMe ",response.data.received_documents_institution_list);
		}).catch(function (err) {
			if(err.status==500 && localStorage.getItem('jeton')!='' && localStorage.getItem('jeton')!=null && localStorage.getItem('jeton')!=undefined){
				deconnectApi.logout(sessionStorage.getItem("iduser")).then(function (response) {
							$location.url('/access/login');
							$state.go('access.login');
						}).catch(function (response) {
				});
			};
		});
	};
	listInsDocsWithMe();
	/*FIN LISTE DES INSTITUTIONS QUI ONT PUBLIE AVEC MOI DES DOCS*/
	/*Liste des documents par utilisateur et par categorie*/
	 function listDocsbyUserAndCat(idCate) {
		$scope.loading=true;
		$http({
			method : 'GET',
			url : baseUrl+'mon_espace/documents/list/'+parseInt(idADmin)+'/'+parseInt(idCate),
			data : {},
			headers:{'Authorization': 'Bearer '+localStorage.getItem('jeton')}
		}).then(function successCallback(response) {
			$scope.loading=false;
			//console.log("$scope.listDocsbyUserAndCats ",response.data)
			$scope.listDocsbyUserAndCats = response.data.documents_list;
		}).catch(function (err) {
			if(err.status==500 && localStorage.getItem('jeton')!='' && localStorage.getItem('jeton')!=null && localStorage.getItem('jeton')!=undefined){
				deconnectApi.logout(sessionStorage.getItem("iduser")).then(function (response) {
							$location.url('/access/login');
							$state.go('access.login');
						}).catch(function (response) {
				});
			};
		});
	};
	function listDocsbyUserAndSubCat(idSubCate) {
		// $scope.loading=true;
		$http({
			method : 'GET',
			url : baseUrl+'mon_espace/documents/list/'+parseInt(idADmin)+'/'+parseInt(idSubCate),
			data : {},
			headers:{'Authorization': 'Bearer '+localStorage.getItem('jeton')}
		}).then(function successCallback(response) {
			// $scope.loading=false;
			//console.log("$scope.listDocsbyUserAndCats ",response.data)
			$scope.listDocsbyUserAndSubCats = response.data.documents_list;
		}).catch(function (err) {
			if(err.status==500 && localStorage.getItem('jeton')!='' && localStorage.getItem('jeton')!=null && localStorage.getItem('jeton')!=undefined){
				deconnectApi.logout(sessionStorage.getItem("iduser")).then(function (response) {
							$location.url('/access/login');
							$state.go('access.login');
						}).catch(function (response) {
				});
			};
		});
	};
	// listDocsbyUserAndCat();
	/*FIN Liste des documents par utilisateur et par categorie*/
	/*liste des contacts entreprise ou banque*/
	$scope.loadingc=false;
    function listContacts() {
		$scope.loadingc=true;
		$scope.islistContacts=false;
		$http({
			method : 'GET',
			url : baseUrl+'admin/user/list_contacts/'+parseInt(idADmin),
			data : {},
			headers:{'Authorization': 'Bearer '+localStorage.getItem('jeton')}
		}).then(function successCallback(response) {
			$scope.loadingc=false;
			$scope.listContacts = response.data.bank_users_list;
			// //console.log("$scope.listContacts ",$scope.listContacts);
			$scope.islistContacts=true;
		}).catch(function (err) {
			if(err.status==500 && localStorage.getItem('jeton')!='' && localStorage.getItem('jeton')!=null && localStorage.getItem('jeton')!=undefined){
				deconnectApi.logout(sessionStorage.getItem("iduser")).then(function (response) {
							$location.url('/access/login');
							$state.go('access.login');
						}).catch(function (response) {
				});
			};
		});
	};
	listContacts();
	/*FIN liste des contacts entreprise ou banque*/
	/****************SUIVI CHANGEMENT*********************/
	// $scope.$on('selectindexprod', function(events, args){
		// //console.log("changeProduct index ",args.index);
	// });
	/****************RECHERCHE SUR LES TAUX DU JOUR*************************/
	$scope.loading2=false;
	function searchTauxOfDay(objet){
		var nbs=0;
		$scope.loading2=true;
		$scope.isTdjReady=false;
		$http({
			method: "POST",
			url: baseUrl+'mon_espace/bank/rate_of_day/rechercher/multicritere/'+parseInt(idADmin), 
			data: objet,
			headers: configs.headers
		})
		.then(function(response){
			nbs++;
			if(nbs==1){
				//console.log("RECHERCHE TAUX DU JOUR SUCCESS ",response);
				$scope.loading2=false;
				$scope.searchTdjResponse=response.data.liste_rateDays;
				$scope.isTdjReady=true;   
			};
			// $state.reload();
		}).catch(function (err) {
			if(err.status==500 && localStorage.getItem('jeton')!='' && localStorage.getItem('jeton')!=null && localStorage.getItem('jeton')!=undefined){
				deconnectApi.logout(sessionStorage.getItem("iduser")).then(function (response) {
							$location.url('/access/login');
							$state.go('access.login');
						}).catch(function (response) {
				});
			};
		});
	};
	/****************RECHERCHE SUR LES TAUX DU JOUR*************************/
	/****************RECHERCHE SUR LES COND STAND*************************/
	$scope.loading2=false;
	function searchCondStand(objet){
		var nbs=0;
		$scope.loading2=true;
		$scope.isTdjReady2=false;
		$http({
			method: "POST",
			url: baseUrl+'admin/bank_conditions/rechercher/multicritere/'+parseInt(idADmin), 
			data: objet,
			headers: configs.headers
		})
		.then(function(response){
			nbs++;
			if(nbs==1){
				$scope.loading2=false;
				$scope.searchTdjResponse2=response.data.list_bankConditions;
				$scope.isTdjReady2=true;  
				//console.log("RECHERCHE COND STAND ",response);
			};
			// $state.reload();
		}).catch(function (err) {
			if(err.status==500 && localStorage.getItem('jeton')!='' && localStorage.getItem('jeton')!=null && localStorage.getItem('jeton')!=undefined){
				deconnectApi.logout(sessionStorage.getItem("iduser")).then(function (response) {
							$location.url('/access/login');
							$state.go('access.login');
						}).catch(function (response) {
				});
			};
		});
	};
	/****************RECHERCHE SUR LES COND STAND*************************/
	/****************SUIVI CHANGEMENT*********************/
	$scope.isAllVide=false;
	$scope.changeDate_Debut=function(a){
		// console.log("Front end ",a);
		$scope.dt_deb=a;
		// $scope.isTdjReady=false;
		$scope.isAllVide=false;
		
		if(a!=undefined || a!=null){
			var mois=a.getMonth()+1;
			var jour=a.getDate();
			var hour=a.getHours();
			var min=a.getMinutes();
			var seco=a.getSeconds();
			var mseco=a.getMilliseconds();
			if(mois<10) {
				mois = '0'+mois;
			};
			if(jour<10) {
				jour = '0'+jour;
			}; 
			if(hour<10) {
				hour = '0'+hour
			};
			if(min<10) {
				min = '0'+min;
			};
			if(seco<10) {
				seco = '0'+seco;
			};
			if(mseco<10) {
				mseco = '0'+mseco;
			};
			$scope.dateDebut=a.getFullYear()+'-'+mois+'-'+jour;
		}else{
			$scope.dateDebut='';
		};
		
		if((a==undefined || a==null) && $scope.dateFin==='' && $scope.productSearch==null && $scope.deviseSearch==null &&  $scope.selectionbank.length==0) {
			$scope.isAllVide=true;
		};
		// $scope.objet_search.dateDebut = $scope.dateDebut;
		// $scope.objet_search.dateFin = $scope.dateFin;
		// $scope.objet_search.idProduit =  $scope.productSearch;
		// $scope.objet_search.devise = $scope.deviseSearch;
		// $scope.objet_search.idsBank = $scope.selectionbank;
		
		// //console.log("$scope.objet_search ",$scope.objet_search);
		// searchTauxOfDay($scope.objet_search);
	};
	$scope.changeDate_Fin=function(a){
		$scope.dt_fin=a;
		// $scope.isTdjReady=false;
		$scope.isAllVide=false;
		
		if(a!=undefined || a!=null){
			var mois=a.getMonth()+1;
			var jour=a.getDate();
			var hour=a.getHours();
			var min=a.getMinutes();
			var seco=a.getSeconds();
			var mseco=a.getMilliseconds();
			if(mois<10) {
				mois = '0'+mois;
			};
			if(jour<10) {
				jour = '0'+jour;
			}; 
			if(hour<10) {
				hour = '0'+hour
			};
			if(min<10) {
				min = '0'+min;
			};
			if(seco<10) {
				seco = '0'+seco;
			};
			if(mseco<10) {
				mseco = '0'+mseco;
			};
			$scope.dateFin=a.getFullYear()+'-'+mois+'-'+jour;
		}else{
			$scope.dateFin='';
		};
		
		if($scope.dateDebut==='' && (a==undefined || a==null) && $scope.productSearch==null && $scope.deviseSearch==null &&  $scope.selectionbank.length==0) {
			$scope.isAllVide=true;
		};
		// $scope.objet_search.dateDebut =$scope.dateDebut;
		// $scope.objet_search.dateFin = $scope.dateFin;
		// $scope.objet_search.idProduit =  $scope.productSearch;
		// $scope.objet_search.devise = $scope.deviseSearch;
		// $scope.objet_search.idsBank = $scope.selectionbank;
		
		// searchTauxOfDay($scope.objet_search);
	};
	$scope.isChange=true;
	$scope.changeProduct=function(a){
		// $scope.isTdjReady=false;
		$scope.isAllVide=false;
		
		$scope.isChange=false;
		if(a.indexOf('CHANGE')==-1 && a.indexOf('Change')==-1 && a.indexOf('change')==-1){
			$scope.devise_tdj='';
			$scope.deviseSearch==null;
			$scope.isChange=true;
		};
		
		
		if(idsProducts.indexOf(a)!=-1){
			$scope.productSearch=$scope.listProduitis[idsProducts.indexOf(a)].idProduits;
		}else{
			$scope.productSearch=null;
		};
		
		if($scope.dateDebut==='' && $scope.dateFin==='' && (a==null || a==='' )&& $scope.deviseSearch==null &&  $scope.selectionbank.length==0) {
			$scope.isAllVide=true;
		};
		// $scope.objet_search.dateDebut =$scope.dateDebut;
		// $scope.objet_search.dateFin = $scope.dateFin;
		// $scope.objet_search.idProduit =  $scope.productSearch;
		// $scope.objet_search.devise = $scope.deviseSearch;
		// $scope.objet_search.idsBank = $scope.selectionbank;
		
		// searchTauxOfDay($scope.objet_search);
	};
	$scope.changeDevise=function(a){
		// //console.log("devisiiis ",a=='');
		// $scope.isTdjReady=false;
		$scope.isAllVide=false;
		
		if(idsDevises.indexOf(a)!=-1){
			$scope.deviseSearch=$scope.listDevisis[idsDevises.indexOf(a)].idDevise;
		}else{
			$scope.deviseSearch=null;
		};
		
		if($scope.dateDebut==='' && $scope.dateFin==='' && $scope.productSearch==null && (a==null || a==='' ) &&  $scope.selectionbank.length==0) {
			$scope.isAllVide=true;
		};
		// $scope.objet_search.dateDebut =$scope.dateDebut;
		// $scope.objet_search.dateFin = $scope.dateFin;
		// $scope.objet_search.idProduit =  $scope.productSearch;
		// $scope.objet_search.devise = $scope.deviseSearch;
		// $scope.objet_search.idsBank = $scope.selectionbank;
		
		// searchTauxOfDay($scope.objet_search);
	};
	$scope.changeBanks=function(a){
		// $scope.isTdjReady=false;
		$scope.isAllVide=false;
		
		var idx = $scope.selectionbank.indexOf(a);
		if (idx > -1) {
			$scope.selectionbank.splice(idx, 1);
		}else {
			$scope.selectionbank.push(parseInt(a));
		};
		
		if($scope.dateDebut==='' && $scope.dateFin==='' && $scope.productSearch==null && $scope.deviseSearch==null &&  $scope.selectionbank.length==0) {
			$scope.isAllVide=true;
		};
		
		// $scope.objet_search.dateDebut =$scope.dateDebut;
		// $scope.objet_search.dateFin = $scope.dateFin;
		// $scope.objet_search.idProduit =  $scope.productSearch;
		// $scope.objet_search.devise = $scope.deviseSearch;
		// $scope.objet_search.idsBank = $scope.selectionbank;
		
		// searchTauxOfDay($scope.objet_search);
	};
	/****************FIN SUIVI CHANGEMENT*********************/
	/****************SUIVI SECOND CHANGEMENT*********************/
	// $scope.isAllVide=false;
	$scope.changeDate_Debut2=function(a){
		$scope.dt_deb2=a;
		$scope.isAllVide2=false;
		
		if(a!=undefined || a!=null){
			var mois=a.getMonth()+1;
			var jour=a.getDate();
			var hour=a.getHours();
			var min=a.getMinutes();
			var seco=a.getSeconds();
			var mseco=a.getMilliseconds();
			if(mois<10) {
				mois = '0'+mois;
			};
			if(jour<10) {
				jour = '0'+jour;
			}; 
			if(hour<10) {
				hour = '0'+hour
			};
			if(min<10) {
				min = '0'+min;
			};
			if(seco<10) {
				seco = '0'+seco;
			};
			if(mseco<10) {
				mseco = '0'+mseco;
			};
			$scope.dateDebut2=a.getFullYear()+'-'+mois+'-'+jour;
		}else{
			$scope.dateDebut2='';
		};
		
		if((a==undefined || a==null) && $scope.dateFinZ==='' && $scope.productSearch2==null &&  $scope.selectionbank2.length==0 && $scope.tauxStandardSearch==='') {
			$scope.isAllVide2=true;
		};
	};
	$scope.changeDate_Fin2=function(a){
		$scope.dt_fin2=a;
		$scope.isAllVide2=false;
		
		if(a!=undefined || a!=null){
			var mois=a.getMonth()+1;
			var jour=a.getDate();
			var hour=a.getHours();
			var min=a.getMinutes();
			var seco=a.getSeconds();
			var mseco=a.getMilliseconds();
			if(mois<10) {
				mois = '0'+mois;
			};
			if(jour<10) {
				jour = '0'+jour;
			}; 
			if(hour<10) {
				hour = '0'+hour
			};
			if(min<10) {
				min = '0'+min;
			};
			if(seco<10) {
				seco = '0'+seco;
			};
			if(mseco<10) {
				mseco = '0'+mseco;
			};
			$scope.dateFin2=a.getFullYear()+'-'+mois+'-'+jour;
		}else{
			$scope.dateFin2='';
		};
		
		if($scope.dateDebut2==='' && (a==undefined || a==null) && $scope.productSearch2==null &&  $scope.selectionbank2.length==0 && $scope.tauxStandardSearch==='') {
			$scope.isAllVide2=true;
		};
	};
	// $scope.isChange=true;
	$scope.changeProduct2=function(a){
		// //console.log("$scope.changeProduct2 ",a);
		// //console.log("$scope.changeProduct2_2 ",$scope.listProduitis2);
		// //console.log("$scope.changeProduct2_3 ",idsProducts2.indexOf(a));
		// //console.log("$scope.changeProduct2_4 ",idsProducts2);
		$scope.isAllVide2=false;
		
		if(idsProducts2.indexOf(a)!=-1){
			$scope.productSearch2=$scope.listProduitis2[idsProducts2.indexOf(a)].idProduits;
		}else{
			$scope.productSearch2=null;
		};
		
		if($scope.dateDebut2==='' && $scope.dateFin2==='' && (a==null || a==='' ) &&  $scope.selectionbank2.length==0 && $scope.tauxStandardSearch==='') {
			$scope.isAllVide2=true;
		};
	};
	$scope.changeBanks2=function(a){
		$scope.isAllVide2=false;
		
		var idx = $scope.selectionbank2.indexOf(a);
		if (idx > -1) {
			$scope.selectionbank2.splice(idx, 1);
		}else {
			$scope.selectionbank2.push(parseInt(a));
		};
		
		if($scope.dateDebut2==='' && $scope.dateFin2==='' && $scope.productSearch2==null &&  $scope.selectionbank2.length==0 && $scope.tauxStandardSearch==='') {
			$scope.isAllVide2=true;
		};
	};
	$scope.messageErr='';
	$scope.changeTauxStand=function(a){
		// //console.log("Number ",a);
		$scope.isAllVide2=false;
		
		$scope.messageErr='Ce champ ne doit pas être inférieur à zéro.';
		$scope.isInfZero=false;
		if(a>=0){
			$scope.tauxStandardSearch=''+a;
		}else{
			$scope.tauxStandardSearch='';
			$scope.isInfZero=true;
		};
		
		if($scope.dateDebut2==='' && $scope.dateFin2==='' && $scope.productSearch2==null &&  $scope.selectionbank2.length==0 && (a==null || a==='')) {
			$scope.isAllVide2=true;
		};
	};
	/****************FIN SUIVI SECOND CHANGEMENT*********************/
	/****************LANCEMENT RECHERCHE*********************/
	$scope.launchSearch=function(){
		$scope.objet_search.dateDebut =$scope.dateDebut;
		$scope.objet_search.dateFin = $scope.dateFin;
		$scope.objet_search.idProduit =  $scope.productSearch;
		$scope.objet_search.devise = $scope.deviseSearch;
		$scope.objet_search.idsBank = $scope.selectionbank;
		
		// console.log("$scope.objet_search ",$scope.objet_search);
		searchTauxOfDay($scope.objet_search);
	};
	$scope.launchSearch2=function(){
		$scope.objet_search2.dateDebut =$scope.dateDebut2;
		$scope.objet_search2.dateFin = $scope.dateFin2;
		$scope.objet_search2.idPr =  $scope.productSearch2;
		$scope.objet_search2.tauxStandard = $scope.tauxStandardSearch;
		$scope.objet_search2.idsBank = $scope.selectionbank2;
		
		//console.log("$scope.objet_search2 ",$scope.objet_search2);
		searchCondStand($scope.objet_search2);
	};
	/************suivre objet_search*************************/
	$scope.isVide=false;
	// $scope.isAllVide=false;
	$scope.$watch("searchTdjResponse",function( new_doc, old_doc ) { 
		// //console.log("Je vérifie ",$scope.searchTdjResponse);
		$scope.isVide=false;
		
		if($scope.dateDebut==='' && $scope.dateFin==='' && $scope.productSearch==null && $scope.deviseSearch==null &&  $scope.selectionbank.length==0) {
			// $scope.loading2=false;
			// $scope.isChange=true;
			// $scope.isAllVide=true;
			$scope.isAllVide=true;
		};
		
		if($scope.dateDebut!='' || $scope.dateFin!='' || $scope.productSearch!=null || $scope.deviseSearch!=null ||  $scope.selectionbank.length!=0) {
			if(old_doc.length==0 && new_doc.length==0){
				$scope.isVide=true;
				$scope.loading2=false;
			};
		};
		
		if(old_doc.length!=0 && new_doc.length==0){
			$scope.isVide=true;
			$scope.loading2=false;
		};
	});
	
	$scope.isVide2=false;
	$scope.$watch("searchTdjResponse2",function( new_doc, old_doc ) { 
		$scope.isVide2=false;
		
		if($scope.dateDebut2==='' && $scope.dateFin2==='' && $scope.productSearch2==null &&  $scope.selectionbank2.length==0 && $scope.tauxStandardSearch==='') {
			$scope.isAllVide2=true;
		};
		
		if($scope.dateDebut2!='' || $scope.dateFin2!='' || $scope.productSearch2!=null ||  $scope.selectionbank2.length!=0 || $scope.tauxStandardSearch!='') {
			if(old_doc.length==0 && new_doc.length==0){
				$scope.isVide2=true;
				$scope.loading2=false;
			};
		};
		
		if(old_doc.length!=0 && new_doc.length==0){
			$scope.isVide2=true;
			$scope.loading2=false;
		};
	});
	/************FIN suivre objet_search*************************/
	/*liste des taux du jour des banques de sa localités*/
    function listTdBankOfLoaclity() {
		$http({
			method : 'GET',
			url : baseUrl+'mon_espace/bank/rate_of_day/list/rate_day/'+parseInt(idADmin),
			data : {},
			headers:{'Authorization': 'Bearer '+localStorage.getItem('jeton')}
		}).then(function successCallback(response) {
			$scope.listTdBankOfLoaclities = response.data.rate_day_list_bank;
			var nb=0;
			var Devisis=[];
			var Produitis=[];
			// $scope.listDevisis=[];
			// $scope.listProduitis=[];
			if($scope.listTdBankOfLoaclities==null || $scope.listTdBankOfLoaclities==undefined){
				$scope.listTdBankOfLoaclities=[];
			};
			for(var i=0;i<$scope.listTdBankOfLoaclities.length;i++){
				nb++;
				if(i>0){
					if(Produitis.indexOf($scope.listTdBankOfLoaclities[i].produitsIdProduits.nom)==-1){
						$scope.listProduitis.push($scope.listTdBankOfLoaclities[i].produitsIdProduits);
						Produitis.push($scope.listTdBankOfLoaclities[i].produitsIdProduits.nom);
					};
					if(Devisis.indexOf($scope.listTdBankOfLoaclities[i].devise.description)==-1){
						if($scope.listTdBankOfLoaclities[i].devise.description!='XOF' && $scope.listTdBankOfLoaclities[i].devise.description!='Xof' && $scope.listTdBankOfLoaclities[i].devise.description!='xof'){
							$scope.listDevisis.push($scope.listTdBankOfLoaclities[i].devise);
							Devisis.push($scope.listTdBankOfLoaclities[i].devise.description);
						};
					};
				}else{
					Produitis.push($scope.listTdBankOfLoaclities[i].produitsIdProduits.nom);
					Devisis.push($scope.listTdBankOfLoaclities[i].devise.description);
					$scope.listProduitis.push($scope.listTdBankOfLoaclities[i].produitsIdProduits);
					if($scope.listTdBankOfLoaclities[i].devise.description!='XOF' && $scope.listTdBankOfLoaclities[i].devise.description!='Xof' && $scope.listTdBankOfLoaclities[i].devise.description!='xof'){
						$scope.listDevisis.push($scope.listTdBankOfLoaclities[i].devise);
					};
				};
			};
			
			if(nb==$scope.listTdBankOfLoaclities.length){
				for(var i=0;i<$scope.listProduitis.length;i++){
					idsProducts.push($scope.listProduitis[i].nom);
				};
				for(var i=0;i<$scope.listDevisis.length;i++){
					if($scope.listDevisis[i].description!='XOF' && $scope.listDevisis[i].description!='Xof' && $scope.listDevisis[i].description!='xof'){
						idsDevises.push($scope.listDevisis[i].description);
					};
				};
			};
			//console.log("$scope.listTdBankOfLoaclities ",$scope.listTdBankOfLoaclities);
		}).catch(function (err) {
			if(err.status==500 && localStorage.getItem('jeton')!='' && localStorage.getItem('jeton')!=null && localStorage.getItem('jeton')!=undefined){
				deconnectApi.logout(sessionStorage.getItem("iduser")).then(function (response) {
							$location.url('/access/login');
							$state.go('access.login');
						}).catch(function (response) {
				});
			};
		});
	};
	listTdBankOfLoaclity();
	/*FIN liste des taux du jour des banques de sa localités*/
	//LISTER LES CONDITIONS STANDARD
	function listCondStand() {
		// $scope.listCondStands=[];
		$http({
			method : 'GET',
			url : baseUrl+'admin/bank_conditions/locality/list_conditions/'+parseInt(idADmin),
			data : {},
			headers:{'Authorization': 'Bearer '+localStorage.getItem('jeton')}
		}).then(function successCallback(response) {
			$scope.listCondStands=response.data.list_bankConditions;
			var nb=0;
			var Produitis2=[];
			// $scope.listProduitis2=[];
			// var idsProducts2=[];
			if($scope.listCondStands==null || $scope.listCondStands==undefined){
				$scope.listCondStands=[];
			};
			for(var i=0;i<$scope.listCondStands.length;i++){
				nb++;
				if(i>0){
					if(Produitis2.indexOf($scope.listCondStands[i].product.nom)==-1){
						$scope.listProduitis2.push($scope.listCondStands[i].product);
						Produitis2.push($scope.listCondStands[i].product.nom);
					};
				}else{
					Produitis2.push($scope.listCondStands[i].product.nom);
					$scope.listProduitis2.push($scope.listCondStands[i].product);
				};
			};
			
			if(nb==$scope.listCondStands.length){
				for(var i=0;i<$scope.listProduitis2.length;i++){
					idsProducts2.push($scope.listProduitis2[i].nom);
				};
			};
			//console.log("CONDITION STANDARD ",response);
		}).catch(function (err) {
			if(err.status==500 && localStorage.getItem('jeton')!='' && localStorage.getItem('jeton')!=null && localStorage.getItem('jeton')!=undefined){
				deconnectApi.logout(sessionStorage.getItem("iduser")).then(function (response) {
							$location.url('/access/login');
							$state.go('access.login');
						}).catch(function (response) {
				});
			};
		});
	};
	listCondStand();
	//FIN LISTER DES CONDITIONS STANDARD
	//LISTER LES BANK PAR LOCALITE
	$scope.loading=true;
	function listBksByLocality() {
		$scope.loading=true;
		$http({
			method : 'GET',
			url : baseUrl+'admin/bank/locality/'+idLoc,
			data : {},
			headers:{'Authorization': 'Bearer '+localStorage.getItem('jeton')}
		}).then(function successCallback(response) {
			for(var i=0;i<response.data.list_banks.length;i++){
				$scope.loading=false;
				$scope.listBksByLoc=response.data.list_banks;
				// //console.log("response.data.list_banks.indexOf ",response.data.list_banks.indexOf(response.data.list_banks[i]));
				// if(response.data.list_banks.indexOf(response.data.list_banks[i])<=2){
					// $scope.listBksByLoc.push(response.data.list_banks[i]);
				// };
				// if(response.data.list_banks.indexOf(response.data.list_banks[i])>2 && response.data.list_banks.indexOf(response.data.list_banks[i])<=5){
					// $scope.listBksByLoc2.push(response.data.list_banks[i]);
				// };
				// if(response.data.list_banks.indexOf(response.data.list_banks[i])>5 && response.data.list_banks.indexOf(response.data.list_banks[i])<=8){
					// $scope.listBksByLoc3.push(response.data.list_banks[i]);
				// };
				// if(response.data.list_banks.indexOf(response.data.list_banks[i])>8 && response.data.list_banks.indexOf(response.data.list_banks[i])<=11){
					// $scope.listBksByLoc4.push(response.data.list_banks[i]);
				// };
				// if(response.data.list_banks.indexOf(response.data.list_banks[i])>11 && response.data.list_banks.indexOf(response.data.list_banks[i])<=14){
					// $scope.listBksByLoc5.push(response.data.list_banks[i]);
				// };
			};
			// //console.log("$scope.listBksByLocDDDD ",$scope.listBksByLoc);
		}).catch(function (err) {
			if(err.status==500 && localStorage.getItem('jeton')!='' && localStorage.getItem('jeton')!=null && localStorage.getItem('jeton')!=undefined){
				deconnectApi.logout(sessionStorage.getItem("iduser")).then(function (response) {
							$location.url('/access/login');
							$state.go('access.login');
						}).catch(function (response) {
				});
			};
		});
	};
	listBksByLocality();
	//FIN LISTER LES BANK PAR LOCALITE
	
/**********************************FIN CATEGORIES ET DOCUMENTS ENTREPRISE*******************************************/

	/*	LES OPERATIONS DE MON ESPACE ENTREPRISE	*/
	$scope.$on('operations', function(events, args){
		$state.reload(); 
		// listSousCategories(parseInt(a));
		// listDocsbyUserAndCat(parseInt(a));
		// listCategories();
		// listSousCategories(idCate);
		// switch(args.separator){
			// case 'addCat' :
				// break;
			// case 'addCat' :
				// break;
			// case 'updateCat' :
				// break;
			// case 'updateSubCat' :
				// break;
			// case 'rangeDoc' :
				// break;
			// case 'publishDoc' :
				// break;
			// default :
				// break;
		// };
	});
	$scope.$on('confirmdeletionEn_', function(events, args){
		// //console.log($scope.separateurdel!=''&&$scope.separateurdel!=null&&$scope.separateurdel!=undefined)
		if($scope.separateurdel!=''&&$scope.separateurdel!=null&&$scope.separateurdel!=undefined){
			switch($scope.separateurdel){
				case 'DEL-CAT' :
					deleteCatOrSubCat(args.x);
				break;
				
				case 'DEL-SUBCAT' :
					deleteCatOrSubCat(args.x);
				break;
				
				case 'DEL-DOC' :
					deleteDocument(args.x);
				break;
				case 'DEL-DOCRECUS' :
					deleteDocumentRecu(args.x);
					break;
			}
		};
	});
	/*FIN LES OPERATIONS DE MON ESPACE ENTREPRISE	*/
	
}]);

app.controller('DetailDocCtrlr', ['$scope', '$state', '$sce', '$uibModal', '$http', '$stateParams', '$location', '$timeout', 'deconnectApi', function($scope, $state, $sce, $modal, $http, $stateParams, $location, $timeout, deconnectApi) {
  var idADmin = sessionStorage.getItem("iduser");
  $scope.id = $stateParams.id;
  //console.log("$scope.id ",$scope.id);
  $scope.url_ = $stateParams.url_;
  $scope.url_pdf = baseDocUrl+$scope.url_;
  $scope.name = $stateParams.name;
  $scope.listDocsRecus=[];
  $scope.infoDocRecu=null;
  $scope.separateurdel='';
  // var baseurlDoc="http://localhost:8000/app/";
  // //console.log("$scope.url_pdf ",$scope.url_pdf);
  $scope.trustSrc = function(src) {
		return $sce.trustAsResourceUrl(src);
  };
  
  $scope.$on('url_pdf', function(events, args){
	  $scope.url_pdf = $scope.url_pdf;
	  // $state.reload();
	  if ($scope.$root && !$scope.$root.$$phase) {
		$scope.$apply();
	  };
  });
  	/***************************POP UP ACTIONS ET  SUPPRESSION**************************/
	function popUpconfirmation(x){
		if (x != undefined) {
			var modalInstance = $modal.open({
				templateUrl: 'partials/deletionConfirm.html',
				controller: 'deletionConfirmEnCtrl_',
				resolve: {
					x: function () {
						return x;
					}
				}  
			});
		};

		modalInstance.result.then(function (selectedItem) {
			$scope.selected = selectedItem;
		}, function () {
			// $log.info('Modal dismissed at: ' + new Date());
		});
	};
	/***************************FIN POP UP ACTIONS ET SUPPRESSION**************************/
  /*LISTE DES DOCUMENTS RECUS*/
    function listDocsRecus() {
		$http({
			method : 'GET',
			url : baseUrl+'mon_espace/documents/list_received/'+parseInt(idADmin),
			data : {},
			headers:{'Authorization': 'Bearer '+localStorage.getItem('jeton')}
		}).then(function successCallback(response) {
			$scope.listDocsRecus = response.data.received_documents_list;
			//console.log("$scope.listDocsRecus2 ",response.data.received_documents_list);
			for(var i=0;i<$scope.listDocsRecus.length;i++){
				//console.log("$scope.listDocsRecus[i].documents.idDocuments==$scope.id ",$scope.listDocsRecus[i].documents.idDocuments==$scope.id);
				if($scope.listDocsRecus[i].documents.idDocuments==$scope.id){
					$scope.infoDocRecu=$scope.listDocsRecus[i];
					// //console.log("$scope.infoDocRecu ",$scope.infoDocRecu);
					break;
				};
			};
		}).catch(function (err) {
			if(err.status==500 && localStorage.getItem('jeton')!='' && localStorage.getItem('jeton')!=null && localStorage.getItem('jeton')!=undefined){
				deconnectApi.logout(sessionStorage.getItem("iduser")).then(function (response) {
							$location.url('/access/login');
							$state.go('access.login');
						}).catch(function (response) {
				});
			};
		});
	};
	listDocsRecus();
	/*FIN LISTE DES DOCUMENTS RECUS*/
	/*FUNCTIONS GLOBAL SUPPRESSION DOC RECU*/
	function deleteDocumentRecu(id_document){
		$http({
			method : 'DELETE',
			url : baseUrl+'mon_espace/documents/delete/document_has_user/'+parseInt(idADmin)+'/'+id_document,
			data : {},
			headers:{'Authorization': 'Bearer '+localStorage.getItem('jeton')}
		}).then(function successCallback(response) {
			//console.log("Suppression DocRecu Success  ",response);
			$location.url('/eTreasury/entreprise/adminent_op_esp_docr');
			$timeout(function () {
				$state.reload();
			},2000);
		}).catch(function (err) {
			if(err.status==500 && localStorage.getItem('jeton')!='' && localStorage.getItem('jeton')!=null && localStorage.getItem('jeton')!=undefined){
				deconnectApi.logout(sessionStorage.getItem("iduser")).then(function (response) {
							$location.url('/access/login');
							$state.go('access.login');
						}).catch(function (response) {
				});
			};
		});
	};
	/*FIN FUNCTIONS GLOBAL SUPPRESSION DOC RECU*/
	$scope.$watch("infoDocRecu",function( newValue, oldValue ) { 
		$scope.infoDocRecu=$scope.infoDocRecu;
		// //console.log("newValueok ",newValue);
		// //console.log("oldValueok ",oldValue);
	});
  
/**********************DELETE DOC RECU **************************************/
	$scope.deleteDocRecu=function(){
		$scope.separateurdel='DEL-DOCRECUS';
		var id_docs=$scope.id;
		popUpconfirmation(id_docs);
	};
/**********************FIN DELETE DOC RECU ***********************************/
  // $http({
      // method: 'GET',
      // url: 'data/admin_banque/banque-documents-recus.json'
    // }).then(function (response){
		  // $scope.documents_recus = response.data;
		  ////console.log($scope.documents_recus[0].nom);
		  // if($scope.id==$scope.documents_recus[0].id){
			  // $scope.pdf = {
					// srcFile: ''+$scope.documents_recus[0].src,
			  // };
			  // //console.log("$scope.pdf ",$scope.pdf.srcFile);
		  // }
    // },function (error){
		// //console.log("Erreur");
    // });
/***********************MESSAGE SUPPRESSION RECU**********************/
	$scope.$on('confirmdeletionEn_', function(events, args){
		//console.log("MESSAGE SUPPRESSION RECU ",args.x)
		if($scope.separateurdel!=''&&$scope.separateurdel!=null&&$scope.separateurdel!=undefined){
			switch($scope.separateurdel){
				case 'DEL-DOCRECUS' :
					deleteDocumentRecu(args.x);
				break;
			}
		};
	});
/***********************FIN MESSAGE SUPPRESSION RECU**********************/
}]);

app.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);

app.controller('DetailDocCtrlByName', ['$scope', '$rootScope', '$state', '$sce', '$http', '$stateParams', 'deconnectApi', function($scope, $rootScope, $state, $sce, $http, $stateParams, deconnectApi) {
  var idADmin = sessionStorage.getItem("iduser");
  var ids = $stateParams.id;
  $scope.name = $stateParams.name;
  $scope.named = $stateParams.named;
  $scope.url_ = $stateParams.url_;
  $scope.isDocClicked=true;
  $scope.listDocsbyUserAndCats=[];
  $scope.docClickedSrc = baseDocUrl+$scope.url_;
  //console.log("$scope.docClickedSrc ",$scope.docClickedSrc);
  $scope.listSharedUsers=[];
  // var baseurlDoc="http://localhost:8000/app/";
  // ////console.log("$stateParams.id ",$stateParams.id);
  /*******USERS SHARED****************/
	function listUserShared(){
		$http({
			method : 'GET',
			url : baseUrl+'mon_espace/documents/list_users_shared/'+parseInt(idADmin)+'/'+parseInt(ids),
			data : {},
			headers:{'Authorization': 'Bearer '+localStorage.getItem('jeton')}
		}).then(function successCallback(response) {
			$scope.listSharedUsers=response.data.received_documents_list;
			auditPopUpPublish();
			//console.log("Users Shared2 ",response);
		}).catch(function (err) {
			if(err.status==500 && localStorage.getItem('jeton')!='' && localStorage.getItem('jeton')!=null && localStorage.getItem('jeton')!=undefined){
				deconnectApi.logout(sessionStorage.getItem("iduser")).then(function (response) {
							$location.url('/access/login');
							$state.go('access.login');
						}).catch(function (response) {
				});
			};
		});
	};
	/*********FIN USERS SHARED***********/
	// $scope.auditDocument=function(){
		// $scope.sepPubAudit='audit';
		// var id_=parseInt($scope.infoDocumt.idDocuments);
		// listUserShared(id_);
	// };
	
	$scope.trustSrc = function(src) {
		return $sce.trustAsResourceUrl(src);
	};
	
	$rootScope.$broadcast('DetailDocCtrlByName', {documenId : $scope.id});
	
	$scope.$watch("docClickedSrc",function( newValue, oldValue ) { 
		$scope.docClickedSrc=$scope.docClickedSrc;
		// $state.reload();
		if ($scope.$root && !$scope.$root.$$phase) {
			$scope.$apply();
		};
	});
	/*Liste des documents par utilisateur et par categorie*/
	 // function listDocsbyUserAndCat(idCate) {
		// $http({
			// method : 'GET',
			// url : baseUrl+'mon_espace/documents/list/'+parseInt(idADmin)+'/'+parseInt($scope.idcat),
		// }).then(function successCallback(response) {
			// //console.log("$scope.listDocsbyUserAndCats ",response.data.data.documents_list)
			// $scope.listDocsbyUserAndCats = response.data.documents_list;
		// }, function errorCallback(response) {
			// //console.log(response.statusText);
		// });
	// };
	// listDocsbyUserAndCat();
	/*FIN Liste des documents par utilisateur et par categorie*/
	
	$scope.$on('nom_cat', function(events, args){
		//console.log("nom_cat ",args.nom_cat);
		$scope.name = args.nom_cat;
		if ($scope.$root && !$scope.$root.$$phase) {
			$scope.$apply();
		};
	});
	
	// $http({
      // method: 'GET',
      // url: 'data/admin_banque/banque-documents-recus.json'
    // }).then(function (response){
		  // $scope.documents_recus = response.data;
		  ////console.log($scope.documents_recus[0].nom);
		  // if($scope.id==$scope.documents_recus[0].id){
			  // $scope.pdf = {
					// srcFile: ''+$scope.documents_recus[0].src,
			  // };
			 ////console.log("$scope.pdf ",$scope.pdf.srcFile);
		  // }
    // },function (error){
		////console.log("Erreur");
    // });
}]);

/*MON ESPACE POPUP OPEN*/
app.controller('poPenMesDocsCtrl', ['$scope', '$rootScope', '$uibModalInstance', '$timeout', '$state', '$location', '$http', 'listcat', 'listsubcat', 'listdoccat', 'listdoccat_recu', 'separeur', 'list_all_cats', 'infocat_sub', 'info_doc', 'isoperation', 'deconnectApi',function($scope, $rootScope, $modalInstance, $timeout, $state, $location, $http, listcat, listsubcat, listdoccat, listdoccat_recu, separeur, list_all_cats, infocat_sub, info_doc, isoperation, deconnectApi) {
	var idADmin = sessionStorage.getItem("iduser");
	$scope.isSuccess=false;
	$scope.loading=false;
	$scope.erreurReady=false;
	// //console.log("listcat ",listcat);
	$scope.listCategories=listcat;
	$scope.listSubCategories=listsubcat; 
	$scope.listDocsbyUserAndCats=listdoccat;
	$scope.listDocsRecus=listdoccat_recu;
	$scope.listCategoriesAll=list_all_cats;
	// $scope.loading=false;
	var statut=0;
	var idCategoriedoc=0;
	var idCategoriedoc2=0;
	var idCategoriedoc22=0;
	var message='';
	var catSelected=null;
	var catSelected2=null;
	var catSelectedDoc=null
	var catSelected22=null;
	$scope.isOperations=isoperation;
	$scope.info_doc=info_doc;
	var str='';
	var configs={
		headers:{
			'Authorization': 'Bearer '+localStorage.getItem('jeton')
		}
	};
	// infocat_sub
	// info_doc
	//console.log("infocat_sub ",infocat_sub);
	
	/*FORMATE DATE*/
	function formatDate(a){
		var mois=a.getMonth()+1;
		var jour=a.getDate();
		var hour=a.getHours();
		var min=a.getMinutes();
		var seco=a.getSeconds();
		var mseco=a.getMilliseconds();
		if(mois<10) {
			mois = '0'+mois;
		};
		if(jour<10) {
			jour = '0'+jour;
		}; 
		if(hour<10) {
			hour = '0'+hour
		};
		if(min<10) {
			min = '0'+min;
		};
		if(seco<10) {
			seco = '0'+seco;
		};
		if(mseco<10) {
			mseco = '0'+mseco;
		}
		str=a.getFullYear()+'-'+mois+'-'+jour+'T'+hour+':'+min+':'+seco+'.'+mseco+'Z';
		// //console.log("Str ",str);
	};
	/*FIN FORMATE DATE*/
	
	$timeout(function () {
        $scope.erreurReady=true;
    }, 6000);
	
	$scope.$on('selectindexcat', function(events, args){
		// //console.log("ChangCat index ",args.index);
		if(args.index>0){
			idCategoriedoc2=$scope.listCategories[args.index-1].idCategory;
			catSelected2=$scope.listCategories[args.index-1];
		};
	});
	$scope.$on('selectindexcat2', function(events, args){
		// //console.log("args.index ",args.index);
		if(args.index>0){
			idCategoriedoc22=$scope.listCategoriesAll[args.index-1].idCategory;
			catSelected22=$scope.listCategoriesAll[args.index-1];
		};
	});
	
	$scope.changeCatDoc=function(a){
		//console.log("changeCatDoc ",a);
		if(idCategoriedoc2==0){
			for(var i=0;i<$scope.listCategories.length;i++){
				if($scope.listCategories[i].libelle===a){
					idCategoriedoc2=$scope.listCategories[i].idCategory;
					catSelected=$scope.listCategories[i];
					break;
				}
			};
		}else{
			// //console.log("ChangCat2 ",catSelected2);
			// idLocality=idCategoriedoc2;
			catSelected=catSelected2;
			catSelected2=null;
			idCategoriedoc2=0;
		};
	};
	
	$scope.changeCatDoc2=function(a){
		//console.log("changeCatDoc ",a);
		if(idCategoriedoc22==0){
			for(var i=0;i<$scope.listCategoriesAll.length;i++){
				if($scope.listCategoriesAll[i].libelle===a){
					idCategoriedoc22=$scope.listCategoriesAll[i].idCategory;
					catSelectedDoc=$scope.listCategoriesAll[i];
					break;
				}
			};
		}else{
			// idLocality=idCategoriedoc2;
			catSelectedDoc=catSelected22;
			catSelected22=null;
			idCategoriedoc22=0;
		};
	};

	/*ADD CATEGORIES ET SUB CATEGORIES*/
	function addCatOrSubcat(object){
		$scope.loading=true;
	$http({
		method: "POST",
		url: baseUrl+'mon_espace/category/add/'+idADmin, 
		data: object,
		headers: configs.headers
	})
		.then(function(response){
			$scope.loading=false;
		    statut=response.data.status;
			message=response.data.message;
			if(response.data.status==0){
				$modalInstance.dismiss('cancel');
			}else{
				// $scope.loading=false;
				$scope.isSuccess=true;
				$scope.message=message;
				// $rootScope.$broadcast('message_err', {statut : statut,message : message});
			};
			//console.log("ADD CAT ET SUBCAT SUCCESS ",response);
			$state.reload();   
		}).catch(function (err) {
			if(err.status==500 && localStorage.getItem('jeton')!='' && localStorage.getItem('jeton')!=null && localStorage.getItem('jeton')!=undefined){
				deconnectApi.logout(sessionStorage.getItem("iduser")).then(function (response) {
							$location.url('/access/login');
							$state.go('access.login');
						}).catch(function (response) {
				});
			};
		});
	};
	/*FIN ADD CATEGORIES ET SUB CATEGORIES*/
	/*ADD DOCUMENTS*/
	function addDocument(object){
		$scope.loading=true;
		var url = baseUrl+'mon_espace/documents/add/'+idADmin;
		// var data = new FormData();
		// data.append('file', file);
		// data.append('nom', nomDoc);
		// data.append('category', idcat);
		var config = {
		    transformRequest: angular.identity,
		    transformResponse: angular.identity,
		 	headers :{
		 	    'Content-Type': undefined,
				'Authorization': 'Bearer '+localStorage.getItem('jeton')
		 	}
		}
		$http({
			method: "POST",
			url: baseUrl+'mon_espace/documents/add/'+idADmin, 
			data: object, 
			headers: config.headers
		})
		.then(function (response) {
			$scope.loading=false;
			$scope.okResponse=JSON.stringify(response);
			// console.log("ADD DOC SUCCESS status.."+JSON.stringify(response).indexOf('\"status\":-1'));
			if($scope.okResponse.indexOf('\"status\":-1')==-1){
				// $state.reload();
				$modalInstance.dismiss('cancel');
			}else{
				message=$scope.okResponse.split("\"")[3];
				// $scope.loading=false;
				$scope.isSuccess=true;
				$scope.message=message;
				// $rootScope.$broadcast('message_err', {statut : statut,message : message});
			};
			$state.reload();
			//console.log("ADD DOC SUCCESS ",response);
		}).catch(function (err) {
			console.log("Errr ADD DOC SUCCESS ",err);
			if(err.status==500 && localStorage.getItem('jeton')!='' && localStorage.getItem('jeton')!=null && localStorage.getItem('jeton')!=undefined){
				deconnectApi.logout(sessionStorage.getItem("iduser")).then(function (response) {
							$location.url('/access/login');
							$state.go('access.login');
						}).catch(function (response) {
				});
			};
		});
	};
	/*FIN ADD DOCUMENTS*/
	/*FUNCTIONS GLOBAL UPDATE CATEGORIE*/
	function updateCatOrSubCat(id_categorie, object){
		$scope.loading=true;
		$http({
			method: "PUT",
			url: baseUrl+'mon_espace/category/update/'+parseInt(idADmin)+'/'+parseInt(id_categorie),
			data: object,
			headers: configs.headers
		})
		.then(function(response){
			$scope.loading=false;
			statut=response.data.status;
			message=response.data.message;
			if(response.data.status==0){
				//console.log("Update cat success. ",response);
				$modalInstance.dismiss('cancel');
			}else{
				// $scope.loading=false;
				$scope.isSuccess=true;
				$scope.message=message;
				// $rootScope.$broadcast('message_err', {statut : statut,message : message});
			};
			//console.log("Update cat success. ",response);
			$state.reload();
		}).catch(function (err) {
			if(err.status==500 && localStorage.getItem('jeton')!='' && localStorage.getItem('jeton')!=null && localStorage.getItem('jeton')!=undefined){
				deconnectApi.logout(sessionStorage.getItem("iduser")).then(function (response) {
							$location.url('/access/login');
							$state.go('access.login');
						}).catch(function (response) {
				});
			};
		});
	};
	/*FIN FUNCTIONS GLOBAL UPDATE CATEGORIE*/
	/*FUNCTIONS GLOBAL UPDATE DOCUMENT*/
	function updateDocument(object){
		$scope.loading=true;
		$http({
			method: "PUT",
			url: baseUrl+'mon_espace/documents/update/'+parseInt(idADmin),
			data: object,
			headers: configs.headers
		})
		.then(function(response){
			$scope.loading=false;
			statut=response.data.status;
			message=response.data.message;
			if(response.data.status==0){
				//console.log("Update doc success. ",response);
				$modalInstance.dismiss('cancel');
			}else{
				// $scope.loading=false;
				$scope.isSuccess=true;
				$scope.message=message;
				// $rootScope.$broadcast('message_err', {statut : statut,message : message});
			};
			//console.log("Update doc success. ",response);
			$state.reload();
		}).catch(function (err) {
			if(err.status==500 && localStorage.getItem('jeton')!='' && localStorage.getItem('jeton')!=null && localStorage.getItem('jeton')!=undefined){
				deconnectApi.logout(sessionStorage.getItem("iduser")).then(function (response) {
							$location.url('/access/login');
							$state.go('access.login');
						}).catch(function (response) {
				});
			};
		});
	};
	/*FIN FUNCTIONS GLOBAL UPDATE DOCUMENT*/
	/*FUNCTIONS GLOBAL RANGER DOCUMENT*/
	function rangeDocument(object){
		$scope.loading=true;
		/*******************************************************************
			********************************************************************
			***@PUT(admin/bank/locality/)***************
			***@Params (@id user en session)****************
			***@return JsonParser***********************************************
			********************************************************************
			********************************************************************/
		$http({
			method: "PUT",
			url: baseUrl+'mon_espace/documents/ranger/'+parseInt(idADmin),
			data: object,
			headers: configs.headers
		})
		.then(function(response){
			$scope.loading=false;
			statut=response.data.status;
			message=response.data.message;
			if(response.data.status==0){
				//console.log("Ranger doc success. ",response);
				$modalInstance.dismiss('cancel');
				$location.url('/eTreasury/entreprise/adminent_op_esp_mesdoc');
				$timeout(function () {
					$state.reload();
				},2000);
			}else{
				// $scope.loading=false;
				$scope.isSuccess=true;
				$scope.message=message;
			};
			//console.log("Ranger doc success. ",response);
			$state.reload();
		}).catch(function (err) {
			if(err.status==500 && localStorage.getItem('jeton')!='' && localStorage.getItem('jeton')!=null && localStorage.getItem('jeton')!=undefined){
				deconnectApi.logout(sessionStorage.getItem("iduser")).then(function (response) {
							$location.url('/access/login');
							$state.go('access.login');
						}).catch(function (response) {
				});
			};
		});
	};
	/*FIN FUNCTIONS GLOBAL RANGER DOCUMENT*/
	switch(separeur){
		case 'ADD-CAT' :
			$scope.loading=false;
			$scope.submitCat = function (libelle) {
				$scope.loading=true;
				var separator='addCat';
				var objet={
					libelle : ""+libelle,
					userIdUtilisateur : parseInt(idADmin)
				};
				// $rootScope.$broadcast('operations', {separator : separator, objet : objet});
				addCatOrSubcat(objet);
				// $modalInstance.close();
			};
		break;
		
		case 'ADD-SUBCAT' :
			$scope.loading=false;
			$scope.submitSubCat = function (libelle) {
				$scope.loading=true;
				var separator='addSubCat';
				var objet={
					libelle : ""+libelle,
					parent : catSelected, 
					userIdUtilisateur : parseInt(idADmin)
				};
				// $rootScope.$broadcast('operations', {separator : separator, objet : objet});
				addCatOrSubcat(objet);
				// $modalInstance.close();
			};
		break;
		
		case 'ADD-DOC' :
			$scope.loading=false;
			$scope.submitDoc = function(nom_doc,mot_cle,categorie,fichs,dt){
				// //console.log("ADD Doc mot_cle ",mot_cle);
				if($scope.theFile!=undefined && $scope.theFile!=null){
					fichs=$scope.theFile;
					formatDate(fichs.lastModifiedDate);
				};
				$scope.loading=true;
				// var d_ = new Date();
				// var annee=d_.getFullYear()
				// var mois=d_.getMonth()+1;
				// var jour=d_.getDate();
				// if(mois<10) {
					// mois = '0'+mois;
				// };
				// if(jour<10) {
					// jour = '0'+jour;
				// }; 
				// var fichsName=fichs.name.split(".")[0];
				// fichs.name=fichsName+'_'+jour+''+mois+''+annee+'.pdf';
				// var xx=fichs;
				var separator='addDoc';
				// //console.log("Xxx ",str);
				//console.log(fichs);
				// //console.log((new Date(fichs.lastModified)).getDate());
				// //console.log(fichs.lastModifiedDate.getFullYear());
				// $scope.docBank.category=parseInt(idcat);
				// $scope.docBank.nom=nomDoc; 
				// //console.log($scope.docBank.nom);
				// $scope.docBank.file=file;
				var data = new FormData();
				data.append('file', fichs);
				data.append('nom', nom_doc);
				data.append('mots_cles', mot_cle);
				data.append('date_document', str);
				data.append('category', catSelectedDoc.idCategory);
				// var objet={
					// file : ""+ fichs
					// nom : ""+ nom_doc,
					// mots_cles : ""+ mot_cle,
					// date_document : ""+ str,
					// category : catSelectedDoc.idCategory
				// };
				var objet=data;
				// $rootScope.$broadcast('operations', {separator : separator, objet : objet});
				addDocument(data);
			};
		break;
		
		case 'UPDATE-CAT' :
			$scope.loading=false;
			$scope.libelle=infocat_sub.libelle;
			$scope.submitCat = function (libelle) {
				$scope.loading=true;
				var separator='updateCat';
				var objet={
					libelle : ""+libelle,
					userIdUtilisateur : parseInt(idADmin)
				};
				// $rootScope.$broadcast('operations', {separator : separator, objet : objet});
				updateCatOrSubCat(infocat_sub.idCategory, objet);
			};
		break;
		
		case 'UPDATE-SUBCAT' :
			$scope.loading=false;
			$scope.libelle=infocat_sub.libelle;
			$scope.categorie_doc=infocat_sub.parent.libelle;
			// //console.log("$scope.categorie_doc ",$scope.categorie_doc);
			$scope.changeCatDoc($scope.categorie_doc);
			$scope.submitSubCat = function (libelle) {
				$scope.loading=true;
				var separator='updateSubCat';
				var objet={
					libelle : ""+libelle,
					parent : catSelected, 
					userIdUtilisateur : parseInt(idADmin)
				};
				//console.log("catSelected ",catSelected);
				// $rootScope.$broadcast('operations', {separator : separator, objet : objet});
				updateCatOrSubCat(infocat_sub.idCategory, objet);
			};
		break;
		
		case 'RANGER-DOC' :
			$scope.loading=false;
			$scope.nom_doc=info_doc.nom;
			if(info_doc.motsCles==null || info_doc.motsCles==undefined){
				$scope.mot_cle='';
			}else{
				// //console.log("Ranger info_doc.motsCles ",info_doc.motsCles);
				$scope.mot_cle=info_doc.motsCles;
			};
			$scope.categorie=info_doc.category.libelle;
			$scope.changeCatDoc2($scope.categorie);
			
			$scope.submitDoc = function(nom_doc,mot_cle,categorie,fichs,dt){
				$scope.loading=true;
				var separator='rangeDoc';
				if(catSelectedDoc.idCategory!=info_doc.category.idCategory){
					info_doc.category=catSelectedDoc;
				};
				
				var objet=info_doc;
				// $rootScope.$broadcast('operations', {separator : separator, objet : objet});
				rangeDocument(objet);
			};
		break;
		
		case 'UPDATE-DOC' :
			// $scope.nom_doc=info_doc.nom;
			// if(info_doc.motsCles==null){
				// $scope.mot_cle='';
			// }else{
				// $scope.mot_cle=info_doc.motsCles;
			// };
			// $scope.categorie=info_doc.category.libelle;
			// $scope.fichs=info_doc;
			// $scope.changeCatDoc($scope.categorie);
			// $scope.submitDoc = function(nom_doc,mot_cle,categorie,fichs,dt){
				// $scope.loading=true;
				// var separator='addDoc';
				// //console.log(fichs.size);
				// var data = new FormData();
				// data.append('idDocuments', info_doc.idDocuments);
				// data.append('file', fichs);
				// data.append('nom', nom_doc);
				// data.append('category', catSelectedDoc.idCategory);
				
				// var objet=data;
				// $rootScope.$broadcast('operations', {separator : separator, objet : objet});
				// updateDocument(objet);
			// };
		break;
		
		default :
		break;
	};

	// $scope.submitDoc = function (nom_doc,mot_cle,categorie,fichs,dt) {
		// var separator='addDoc';
		// var objet={
			// nom : nom_doc,
			// motCle : mot_cle,
			// categorie : categorie,
			// fichier : fichs,
			// date : dt
		// };
		// $rootScope.$broadcast('operations', {separator : separator, objet : objet});
		// $modalInstance.close();
	// };

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
	
	/*MESSAGES */
	$scope.$on('message_err_affich', function(events, args){
		if(args.statut==0){
			$scope.isSuccess=false;
			$modalInstance.close();
		}else{
			$scope.loading=false;
			$scope.isSuccess=true;
			$scope.message=args.msn;
		};
	});
	/*FIN MESSAGES */
	
	/************************** FICHIERS **********************************/
	$scope.name = '';
	$scope.isPdf = false;
	$scope.isPdf2 = true;
	var cntrl = this;

	$scope.setFile = function(element) {
		$scope.$apply(function($scope) {
			$scope.theFile = element.files[0];
			// //console.log("Hi programmer ",$scope.theFile);
			$scope.FileMessage = '';
			if($scope.theFile!=undefined){
				var filename = $scope.theFile.name;
				var index = filename.lastIndexOf(".");
			};
			var strsubstring = filename.substring(index, filename.length);
			if (strsubstring == '.pdf'){
				$scope.isPdf = false;
				$scope.isPdf2 = false;
			}else {
				$scope.isPdf = true;
				$scope.isPdf2 = true;
				$scope.theFile = '';
				$scope.FileMessage = 'Fichier non .pdf';
			}
		});
	};
	
	$scope.$watch("theFile",function( newValue, oldValue ) { 
		$scope.theFile=$scope.theFile;
	});
	
	cntrl.submitForm = function(){
		var file = cntrl.form.payloadFile;
		if($scope.uploadedFileType=== undefined) {
			return;
		} if($scope.uploadedFileType != 'pdf') {
			$scope.isPdf = true;
			$scope.isPdf2 = true;
			document.getElementById('payloadFile').setCustomValidity('Seulement les fichiers pdf sont supportés *.pdf');

		} else{
			document.getElementById('payloadFile').setCustomValidity('');
		}
	};
	/*******************************FIN FICHIERS*******************************/
}]); 
/*FIN MON ESPACE POPUP OPEN*/

app.controller('NostauxListCtrl', ['$scope', '$sce', '$stateParams', '$rootScope', 'deconnectApi', function($scope, $sce, $stateParams, $rootScope, deconnectApi) {
  $scope.fold = $stateParams.fold;
  $scope.id = $stateParams.id;
  $rootScope.$broadcast('nom_cat', {nomcat : $scope.fold});
  var iddocClicked=0;
  $scope.docClickedSrc='';
  // ////console.log("$stateParams.fold ",$stateParams.fold);
  // ////console.log($scope.fold);
  // $scope.folds = [
    // {duree: '12 M', valeur:'4'}
  // ];
  
  $scope.trustSrc = function(src) {
		return $sce.trustAsResourceUrl(src);
  };
	
  $scope.$on('documentclicked', function(events, args){
	  $scope.docClickedSrc=baseDocUrl+args.document_.urlDocument;
	  // //console.log("Je suis le docs NostauxListCtrl ",$scope.docClickedSrc);
  });
  //change au comptant
  // $scope.folds_change = [
    // {devise: 'USD' , achat: '580', vente: '587'},
    // {devise: 'CAD' , achat: '485', vente: '492'},
    // {devise: 'CHF' , achat: '525', vente: '532'},
    // {devise: 'GBP' , achat: '815', vente: '822'},
    // {devise: 'JPY' , achat: '5', vente: '5.5'},
  // ];
  
  //Dépot à terme
  // $scope.folds_depot = [
    // {duree: '12 M', valeur:'4'}
  // ];


  //transfer
  //Dépot à terme
  // $scope.folds_transfert = [
    // {valeur : 0.25}
  // ];
  
  
  // $scope.date_publication = $scope.date_selected;
}]);

app.controller('deletionConfirmEnCtrl_', ['$scope', '$rootScope', '$uibModalInstance', 'x', 'deconnectApi', function($scope, $rootScope, $modalInstance, x, deconnectApi) {
	$scope.sms=x;
	
	$scope.confirmDelete = function(){
		$rootScope.$broadcast('confirmdeletionEn_', {x : x});
		$modalInstance.close();
	};
	
	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
}]); 

app.controller('popUpPublishCtrl', ['$scope', '$rootScope', '$state', '$uibModalInstance', '$http', 'x_info_doc', 'sepPubAudit', 'deconnectApi', function($scope, $rootScope, $state, $modalInstance, $http, x_info_doc, sepPubAudit, deconnectApi) {
	var idADmin = sessionStorage.getItem("iduser");
	var idLoc = sessionStorage.getItem("idloc");
	var idInstitution=sessionStorage.getItem("idInstitution");
	$scope.nom_doc=x_info_doc.nom;
	$scope.doc_information=x_info_doc;
	// $scope.isAllMy=false;
	// $scope.isAllInLocaliy=false;
	// $scope.isAllSpecific=false;
	// //console.log("x_info_doc ",x_info_doc);
	$scope.publishSeparator='';
	$scope.loading=false;
	var statut=0;
	var message='';
	$scope.selectionmyu=[];
	$scope.selectionbk=[];
	$scope.selectionbk2=[];
	$scope.selectionbku=[];
	$scope.selectionbku2=[];
	$scope.listBkByLoc=[];
	$scope.listBkUsers=[];
	$scope.listMyUsers=[];
	$scope.infoDocPublishArray=null;
	$scope.infoDocPublishArray_2=null;
	$scope.infoDocPublishIdUser=[];
	// $scope.ischangeBkUser=false;
	// $scope.ischangeBankDoc=false;
	// $scope.ischangeBankDoc=false;
	$scope.ischangeMyEntUsers=false;
	$scope.ischangeBanks=false;
	$scope.ischangeBkUsers=false;
	$scope.compter=false;
	$scope.suiviTabInsUtils=[];
	var idBank=0;
	var idBank2=0;
	$scope.nb_2=0;
	$scope.arrayTabInsUtils=null;
	$scope.separotorChangeBkAttach2=0;
	var nb_infoDocPublish=0;
	var nb_infoDocPublish2=0;
	$scope.isInfoDocPublish=false;
	$scope.auditTrue=false;
	
	$scope.datePublication=null;
	var configs={
		headers:{
			'Authorization': 'Bearer '+localStorage.getItem('jeton')
		}
	};
	
	var objet={
		"document": x_info_doc.idDocuments,
		"tabUtils": $scope.selectionmyu,
		"tabIns": $scope.selectionbk,
		"tabInsUtils": []
	};
	
	if(sepPubAudit==='audit'){
		$scope.auditTrue=true;
	};
	// $scope.publishs = [
		// {
			// "id": 22,
			// "value" : "Aux utilisateurs de mon entreprise?"
		// }, 
		// {
			// "id": 23,
			// "value" : "Aux banques de ma localité?"
		// }, 
		// {
			// "id": 24,
			// "value" : "Aux utilisateurs spécifiques d'une banque?"
		// }
	// ];
	
	$scope.$on('selectBank', function(events, args){
		if(args.index>0){
			// idBank2=$scope.listBkByLoc[args.index-1].idInstitution;
			// //console.log("idBank2 ",$scope.listBkByLoc[args.index-1]);
		};
	});
	
	$scope.changeMyEntUser=function(a){
		//console.log("changeMyEntUser ",a);
		var idx = $scope.selectionmyu.indexOf(a);
		if (idx > -1) {
			$scope.selectionmyu.splice(idx, 1);
		}else {
			$scope.selectionmyu.push(parseInt(a));
		};
		objet.tabUtils=$scope.selectionmyu;
	};
	
	// $scope.changeBkAttach=function(a){
		// //console.log("$scope.changeBkAttach ",a);
		// var idx = $scope.selectionbk.indexOf(a);
		// if (idx > -1) {
			// $scope.selectionbk.splice(idx, 1);
		// }else {
			// $scope.selectionbk.push(parseInt(a));
		// }
	// };
	
	$scope.changeBkAttach2=function(a){
		// //console.log("$scope.changeBkAttach ",a);
		var idx = $scope.selectionbk2.indexOf(a);
		// if($scope.separotorChangeBkAttach2==0){
			// //console.log("333333333_3 ",$scope.separotorChangeBkAttach2);
		// };
		if (idx > -1) {
			listUsersByBankDel(parseInt(a));
			$scope.selectionbk2.splice(idx, 1);
		}else {
			if($scope.separotorChangeBkAttach2!=1 && $scope.separotorChangeBkAttach2!=2 && $scope.separotorChangeBkAttach2!=3){
				listUsersByBank(parseInt(a));
			};
			$scope.selectionbk2.push(parseInt(a));
		};
		$scope.separotorChangeBkAttach2=0;
		objet.tabIns=$scope.selectionbk2;
		// //console.log("changeBkAttach2 ",$scope.selectionbk2);
	};
	
	var nb_s=0;
	var nb_s2=0;
	var Lselectionbk2=0;
	var Lselectionbk2_2=0;
	var compteLong2=0;
	var id_institu=0
	var nb_notzero=0;
	var nb_notzero2=0;
	var nb_a=0;
	$scope.changeBkUser=function(a){
		// //console.log("$scope.changeBkUser ",a);
		$scope.isEmptyListUsers=false;
		var insti=0;
		var listInsUtils=null;
		objet.tabInsUtils=[];
		var idx = $scope.selectionbku.indexOf(a);
		if (idx > -1) {
			$scope.selectionbku.splice(idx, 1);
		}else {
			$scope.selectionbku.push(parseInt(a));
		};
		
		if($scope.infoDocPublishArray.tabUtils.length!=0 || $scope.infoDocPublishArray.tabInsUtils.length!=0){
			// //console.log("Vérification success ");
		};
		
		if(!$scope.is_2){
		// //console.log("ooooooooooooooKKK");
		if($scope.listBkUsers.length!=0){
			for(var k=0;k<$scope.selectionbk2.length;k++){
				$scope.selectionbku2=[];
				for(var i=0;i<$scope.listBkUsers.length;i++){
					if($scope.listBkUsers[i].groupeIdGroupe.institution.idInstitution==$scope.selectionbk2[k]){
						for(var j=0;j<$scope.selectionbku.length;j++){
							if($scope.selectionbku[j]==$scope.listBkUsers[i].idUtilisateur){
								$scope.selectionbku2.push($scope.selectionbku[j]);
								insti=$scope.selectionbk2[k];
							};
						};
					};
				};
				
				if(insti!=0 && $scope.selectionbku2.length!=0){
					listInsUtils={
						"ins": insti,
						"utils": $scope.selectionbku2
					};
					objet.tabInsUtils.push(listInsUtils);
				};
				// //console.log("objet.tabInsUtils ",objet.tabInsUtils);
			};
			
			for(var i=0;i<objet.tabInsUtils.length;i++){
				if(objet.tabInsUtils[i].utils.length==0){
					objet.tabInsUtils.splice(i, 1);
				};
			};
		};
		// //console.log("$scope.selectionbku.length---- ",$scope.selectionbku.length);
		
		if($scope.listBkUsers.length!=0){
			if($scope.selectionbku.length==0 && $scope.selectionbk2.length!=0){
				var nb_nb=0;
				var longueur=$scope.selectionbk2.length;
				// nb_notzero=0;
				// nb_notzero2=0;
				$scope.separotorChangeBkAttach2=1;
				$scope.isEmptyListUsers=true;
				// $rootScope.$broadcast('selectionbku', {});
				for(var i=0;i<$scope.selectionbk2.length;i++){
					nb_nb++;
					$scope.changeBkAttach2($scope.selectionbk2[i]);
					// listUsersByBankDel($scope.selectionbk2[i]);
				};
				if(nb_nb==longueur){
					$scope.separotorChangeBkAttach2=0;
					nb_nb=0;
				};
				$scope.listBkUsers=[];
				$scope.selectionbku=0;
				nb_a=0;
			}else{
				if(objet.tabInsUtils.length!=0 && $scope.selectionbk2.length!=0){
					// //console.log("ooooooooooooooKKK22222222");
					// nb_notzero++;
					var nb_nb=0;
					var longueur=$scope.selectionbk2.length;
					var indexNotExit=[];
					var indexNotExit2=[];
					for(var i=0;i<objet.tabInsUtils.length;i++){
						indexNotExit.push(objet.tabInsUtils[i].ins);
						for(var j=0;j<objet.tabInsUtils[i].utils.length;j++){
							indexNotExit2.push(objet.tabInsUtils[i].utils[j]);
						};
					};
					
					
					for(var i=0;i<$scope.selectionbk2.length;i++){
						nb_nb++;
						if(indexNotExit.indexOf($scope.selectionbk2[i])==-1){
							$scope.separotorChangeBkAttach2=2;
							$scope.changeBkAttach2($scope.selectionbk2[i]);
						};
					};
					
					if(nb_nb==longueur){
						$scope.separotorChangeBkAttach2=0;
						nb_nb=0;
					};
					// if(nb_notzero==$scope.listBkUsers.length){
						// nb_notzero2++;
					// };
					// if(nb_notzero2>1){
						// for(var i=0;i<$scope.selectionbk2.length;i++){
							// if(indexNotExit.indexOf($scope.selectionbk2[i])==-1){
								// // $scope.separotorChangeBkAttach2=2;
								// $rootScope.$broadcast('tabInsUtils', {});
								// $scope.changeBkAttach2($scope.selectionbk2[i]);
							// };
						// };
						// nb_notzero=0;
						// nb_notzero2=0;
					// };
					nb_a=0;
				}else if(objet.tabInsUtils.length==0 && $scope.selectionbk2.length!=0){
					// if($scope.selectionbk2.length==1){
						// var nb_nb=0;
						// var longueur=$scope.selectionbk2.length;
						// $scope.separotorChangeBkAttach2=3;
						// for(var i=0;i<$scope.selectionbk2.length;i++){
							// nb_nb++;
							// $scope.changeBkAttach2($scope.selectionbk2[i]);
						// };
						
						// if(nb_nb==longueur){
							// $scope.separotorChangeBkAttach2=0;
							// nb_nb=0;
						// };
						// $scope.changeBkAttach2($scope.selectionbk2[0]);
					// };
					nb_a++;
					if(nb_a==1){
						var nb_nb=0;
						var longueur=$scope.selectionbk2.length;
						$scope.separotorChangeBkAttach2=3;
						for(var i=0;i<$scope.selectionbk2.length;i++){
							nb_nb++;
							$scope.changeBkAttach2($scope.selectionbk2[i]);
						};
						
						if(nb_nb==longueur){
							$scope.separotorChangeBkAttach2=0;
							nb_nb=0;
						};
						// $scope.changeBkAttach2($scope.selectionbk2[0]);
						// listUsersByBankDel($scope.selectionbk2[0]);
						$scope.listBkUsers=[];
						$scope.selectionbku=[];
					};
					// if(nb_a>1 && $scope.selectionbku.length==0){
						// //console.log("NNNNNNNNN ",$scope.listBkUsers);
						// //console.log("NNNNNNNNN2 ",$scope.selectionbku);
					// };
					// $scope.changeBkAttach2($scope.selectionbk2[0]);
					// $scope.separotorChangeBkAttach2=0;
					// $scope.selectionbk2=[];
				};
			};
			
			$scope.suiviTabInsUtils=objet.tabInsUtils;
		};
		
		};
		
		//console.log("objet.tabInsUtils ",objet);
		// //console.log("$scope.selectionbku ",$scope.selectionbku);
	};
	
	// var compteLong=0;
	// $rootScope.$on('selectionbku', function() {
		// compteLong++;
		
		// if(compteLong==1){
			// Lselectionbk2=$scope.selectionbk2.length;
		// };
		
		// $scope.isEmptyListUsers=true;
		// $scope.listBkUsers=[];
		// objet.tabInsUtils=[];
		
		// for(var i=0;i<$scope.selectionbk2.length;i++){
			// nb_s++;
			// $scope.changeBkAttach2($scope.selectionbk2[i]);
		// };
		// if(nb_s<Lselectionbk2){
			// $scope.selectionbku=[];
			// for(var i=0;i<$scope.selectionbk2.length;i++){
				// nb_s++;
				// $scope.changeBkAttach2($scope.selectionbk2[i]);
			// };
		// }else{
			// nb_s=0;
			// Lselectionbk2=0;
			// compteLong=0;
		// };
		
	// });
	
	// $rootScope.$on('tabInsUtils', function() {
		// compteLong2++;
		// var idBkNotExist=[];
		// if(compteLong2==1){
			// Lselectionbk2_2=$scope.selectionbk2.length;
		// };
		
		// //console.log("Compteurs à zéro compteLong2 ",compteLong2);	
		// //console.log("Compteurs à zéro Lselectionbk2_2 ",Lselectionbk2_2);
		// for(var j=0;j<objet.tabInsUtils.length;j++){
			// idBkNotExist.push(objet.tabInsUtils[j].ins);
		// };
		// for(var i=0;i<$scope.selectionbk2.length;i++){
			// if(idBkNotExist.indexOf($scope.selectionbk2[i])==-1){
				// $scope.changeBkAttach2($scope.selectionbk2[i]);
			// };
			
			// for(var j=0;j<objet.tabInsUtils.length;j++){
				// if(objet.tabInsUtils[j].ins==$scope.selectionbk2[i]){
					// nb_s2++;
					// id_institu=0;
				// }else{
					// id_institu=$scope.selectionbk2[i];
				// };
			// };
			// if(nb_s2==0){
				// $scope.changeBkAttach2(id_institu);
			// };
			// nb_s2=0;
		// };
			
		// if(compteLong2==Lselectionbk2_2){
			// nb_notzero2=0;
			// nb_notzero2=0;
			// nb_s2=0;
			// compteLong2=0;
			// Lselectionbk2_2=0;
			// id_institu=0;
		// };
	// });
	
	// $scope.$watch("selectionbku",function(newValue, oldValue ) {
		// //console.log("Je chhange selectionbku ",newValue);
	// });
	
	// $scope.$watch("suiviTabInsUtils",function( newValue, oldValue ) { 
	// });
	
	// $scope.changeBankDoc=function(a){
		// if(parseInt(a)!=null && parseInt(a)!=undefined && parseInt(a)!=0){
			// listBankUsers(parseInt(a));
			// $scope.ischangeBankDoc=true;
		// };
	// };
	
	//LISTER LES BANK PAR LOCALITE
	$scope.loadBk=false;
	function listLocalityByIdLoc() {
		$scope.loadBk=true;
		/*******************************************************************
			********************************************************************
			***@GET(admin/bank/locality/)***************
			***@Params (@id Localité)****************
			***@return JsonParser***********************************************
			********************************************************************
			********************************************************************/
		$http({
			method : 'GET',
			url : baseUrl+'admin/bank/locality/'+idLoc,
			data : {},
			headers:{'Authorization': 'Bearer '+localStorage.getItem('jeton')}
		}).then(function successCallback(response) {
			$scope.loadBk=false;
			$scope.listBkByLoc = response.data.list_banks;
			// // //console.log("$scope.listBkByLoc ",$scope.listBkByLoc);
		}).catch(function (err) {
			if(err.status==500 && localStorage.getItem('jeton')!='' && localStorage.getItem('jeton')!=null && localStorage.getItem('jeton')!=undefined){
				deconnectApi.logout(sessionStorage.getItem("iduser")).then(function (response) {
							$location.url('/access/login');
							$state.go('access.login');
						}).catch(function (response) {
				});
			};
		});
	};
	listLocalityByIdLoc();
	//FIN LISTER LES BANK PAR LOCALITE
	/*Vous avez choisi tous les utilisateurs de votre institution, Veuillez valider le choix ou annuler.*/
	// function publishMine(){
		// var idDc=x_info_doc.idDocuments;
		// $http.post(baseUrl+'mon_espace/documents/publish_institution_default/'+parseInt(idADmin)+'/'+parseInt(idDc))
		// .then(function(response){
		    // statut=response.data.status;
			// message=response.data.message;
			// if(response.data.status==0){
				// $modalInstance.dismiss('cancel');
			// }else{
				// $scope.loading=false;
				// $scope.isSuccess=true;
				// $scope.message=message;
				// $rootScope.$broadcast('message_err', {statut : statut,message : message});
			// };
			// //console.log("PUBLICATION n°1 SUCCESS ",response);
			// $state.reload();   
		// }),(function(err){
		// });
	// };
	/*FIN Vous avez choisi tous les utilisateurs de votre institution, Veuillez valider le choix ou annuler.*/
	
	/* Aux banques de ma localité*/
	// function publishOthers(object){
		// $http.post(baseUrl+'mon_espace/documents/publier/institution/'+parseInt(idADmin), object)
		// .then(function(response){
		    // statut=response.data.status;
			// message=response.data.message;
			// if(response.data.status==0){
				// $modalInstance.dismiss('cancel');
			// }else{
				// $scope.loading=false;
				// $scope.isSuccess=true;
				// $scope.message=message;
				// $rootScope.$broadcast('message_err', {statut : statut,message : message});
			// };
			// //console.log("PUBLICATION n°2 SUCCESS ",response);
			// $state.reload();   
		// }),(function(err){
		// });
	// };
	/*FIN  Aux banques de ma localité*/
	
	/*Aux utilisateurs spécifiques d'une banque*/
	// function publishSpecific(object){
		// $http.post(baseUrl+'mon_espace/documents/publier/'+parseInt(idADmin), object)
		// .then(function(response){
		    // statut=response.data.status;
			// message=response.data.message;
			// if(response.data.status==0){
				// $modalInstance.dismiss('cancel');
			// }else{
				// $scope.loading=false;
				// $scope.isSuccess=true;
				// $scope.message=message;
				// $rootScope.$broadcast('message_err', {statut : statut,message : message});
			// };
			// //console.log("PUBLICATION n°3 SUCCESS ",response);
			// $state.reload();   
		// }),(function(err){
		// });
	// };
	/*FIN Aux utilisateurs spécifiques d'une banque*/
	/*FUNCTION GLOBALE DE PUBLICATION DE DOCUMENTS.*/
	function publishDocument(objet_pub){
		$scope.loading=true;
		var idDc=x_info_doc.idDocuments;
		/*******************************************************************
			********************************************************************
			***@POST(mon_espace/documents/publier/)***************
			***@Params (@id user en session)****************
			***@return JsonParser***********************************************
			********************************************************************
			********************************************************************/
		$http({
			method: "POST",
			url: baseUrl+'mon_espace/documents/publier/'+parseInt(idADmin),
			data: objet_pub,
			headers: configs.headers
		})
		.then(function(response){
			$scope.loading=false;
		    statut=response.data.status;
			message=response.data.message;
			if(response.data.status==0){
				//console.log("PUBLICATION SUCCESS ",response);
				$modalInstance.dismiss('cancel');
			}else{
				// $scope.loading=false;
				$scope.isSuccess=true;
				$scope.message=message;
			};
			//console.log("PUBLICATION SUCCESS 2 ",response);
			$state.reload();   
		}).catch(function (err) {
			if(err.status==500 && localStorage.getItem('jeton')!='' && localStorage.getItem('jeton')!=null && localStorage.getItem('jeton')!=undefined){
				deconnectApi.logout(sessionStorage.getItem("iduser")).then(function (response) {
							$location.url('/access/login');
							$state.go('access.login');
						}).catch(function (response) {
				});
			};
		});
	};
	/*FIN FUNCTION GLOBALE DE PUBLICATION DE DOCUMENTS*/
	
	/*LISTE DES UTILISATEURS*/
	// function listUsersConnected(){
		// $http({
			// method : 'GET',
			// url : baseUrl+'admin/user_entreprise/list/'+parseInt(idInstitution)+'/'+parseInt(idADmin),
		// }).then(function successCallback(response) {
			// for(var i=0;i<response.data.entreprise_users_list.length;i++){
				// if(response.data.entreprise_users_list[i].idUtilisateur!=parseInt(idADmin)){
					// $scope.listMyUsers.push(response.data.entreprise_users_list[i]);
				// };
			// };
			// $scope.listMyUsers=$scope.listMyUsers;
			// for(var i=0;i<$scope.listMyUsers.length;i++){
				// $scope.changeMyEntUser($scope.listMyUsers[i].idUtilisateur);
			// };
		// }, function errorCallback(response) {
		// });
	// };
	// listUsersConnected();
	
	// $scope.$watch("listMyUsers",function( newValue, oldValue ) { 
		// //console.log("je change listMyUsers",newValue);
	// });
	/*FIN LISTE DES UTILISATEURS*/
	//LIST DES UTILSATEURS D4UNE BANQUE
	$scope.loadUserBk=false;
	function listUsersByBank(id) {
		$scope.loadUserBk=true;
		$scope.compter=false;
		/*******************************************************************
			********************************************************************
			***@GET(admin/bank/users/list/)***************
			***@Params (@id banque)****************
			***@return JsonParser***********************************************
			********************************************************************
			********************************************************************/
		$http({
			method : 'GET',
			url : baseUrl+'admin/bank/users/list/'+id,
			data : {},
			headers:{'Authorization': 'Bearer '+localStorage.getItem('jeton')}
		}).then(function successCallback(response) {
			$scope.loadUserBk=false;
			$scope.compter=false;
			nb_cas3=response.data.list_users;
			// $scope.listBkUsers=response.data.list_users;
			// //console.log("BBBBBKKK ",response.data);
			// //console.log("!$scope.isInfoDocPublish && !$scope.is_2_ ",!$scope.isInfoDocPublish && !$scope.is_2);
			// //console.log("nb_infoDocPublish_ ",nb_infoDocPublish);
			
			if(!$scope.isInfoDocPublish && (!$scope.is_2 || $scope.is_2==undefined || $scope.is_2==null) || $scope.isInfoDocPublish && ($scope.is_2==undefined || $scope.is_2==null)){
				var n1=0;
				for(var i=0;i<response.data.list_users.length;i++){
					n1++;
					$scope.listBkUsers.push(response.data.list_users[i]);
					// $scope.changeBkUser(response.data.list_users[i].idUtilisateur);
					// if(i==response.data.list_users.length-1){
						// $scope.compter=true;
					// };
				};
				
				if(n1==response.data.list_users.length){
					for(var i=0;i<response.data.list_users.length;i++){
						$scope.changeBkUser(response.data.list_users[i].idUtilisateur);
					};
				};
			};
			
			if($scope.isInfoDocPublish && $scope.is_2){
				// console.log("222222222222222 ",$scope.is_2);
				nb_infoDocPublish2++;
				var n1=0;
				for(var i=0;i<response.data.list_users.length;i++){
					n1++;
					$scope.listBkUsers.push(response.data.list_users[i]);
				};
				
				if(n1==response.data.list_users.length){
					for(var i=0;i<response.data.list_users.length;i++){
						$scope.changeBkUser(response.data.list_users[i].idUtilisateur);
					};
				};
				
				if(nb_infoDocPublish2<$scope.infoDocPublishArray_2.tabIns.length){
					$scope.changeBkAttach2($scope.infoDocPublishArray_2.tabIns[nb_infoDocPublish2]);
				}else{
					nb_infoDocPublish2=0;
					$scope.isInfoDocPublish=false;
					$scope.is_2=false;
				};
			};
			
			if($scope.isInfoDocPublish && !$scope.is_2){
				nb_infoDocPublish++;
				// $scope.infoDocPublishIdUser
				var n1=0;
				for(var i=0;i<response.data.list_users.length;i++){
					n1++;
					$scope.listBkUsers.push(response.data.list_users[i]);
					// if($scope.infoDocPublishIdUser.indexOf(response.data.list_users[i].idUtilisateur)!=-1){
						// $scope.changeBkUser(response.data.list_users[i].idUtilisateur);
					// };
					// if(i==response.data.list_users.length-1){
						// $scope.compter=true;
					// };
				};
				
				if(n1==response.data.list_users.length){
					for(var i=0;i<response.data.list_users.length;i++){
						if($scope.infoDocPublishIdUser.indexOf(response.data.list_users[i].idUtilisateur)!=-1){
							$scope.changeBkUser(response.data.list_users[i].idUtilisateur);
						};
					};
				};
				
				if(nb_infoDocPublish<$scope.infoDocPublishArray.tabInsUtils.length){
					// //console.log("response.data.list_users.length ",response.data.list_users);
					// if(nb_infoDocPublish==$scope.infoDocPublishArray.tabInsUtils.length-1){
						// $scope.changeBkAttach2($scope.infoDocPublishArray.tabInsUtils[nb_infoDocPublish].ins);
						// nb_infoDocPublish=0;
						// $scope.isInfoDocPublish=false;
					// }else{
						// $scope.changeBkAttach2($scope.infoDocPublishArray.tabInsUtils[nb_infoDocPublish].ins);
					// }
					$scope.changeBkAttach2($scope.infoDocPublishArray.tabInsUtils[nb_infoDocPublish].ins);
				}else{
					nb_infoDocPublish=0;
					$scope.isInfoDocPublish=false;
				};
				
			};
			
			// //console.log("!$scope.isInfoDocPublish && !$scope.is_2 ",!$scope.isInfoDocPublish && !$scope.is_2);
			// //console.log("nb_infoDocPublish ",nb_infoDocPublish);
			// if(!$scope.isInfoDocPublish && !$scope.is_2){
				// var n1=0;
				// for(var i=0;i<response.data.list_users.length;i++){
					// n1++;
					// $scope.listBkUsers.push(response.data.list_users[i]);
					// $scope.changeBkUser(response.data.list_users[i].idUtilisateur);
					// if(i==response.data.list_users.length-1){
						// $scope.compter=true;
					// };
				// };
				
				// if(n1==response.data.list_users.length){
					// for(var i=0;i<response.data.list_users.length;i++){
						// if($scope.infoDocPublishIdUser.indexOf(response.data.list_users[i].idUtilisateur)!=-1){
							// $scope.changeBkUser(response.data.list_users[i].idUtilisateur);
						// };
					// };
				// };
			// };
			
			if($scope.isInfoDocPublish){
				if($scope.infoDocPublishArray_2.tabIns.length>0 && nb_infoDocPublish2>0){
					if(nb_infoDocPublish2==$scope.infoDocPublishArray_2.tabIns.length){
						nb_infoDocPublish2=0;
						$scope.is_2=false;
						$scope.isInfoDocPublish=false;
					};
				};
				
				if($scope.infoDocPublishArray.tabInsUtils.length>0 && nb_infoDocPublish>0){
					if(nb_infoDocPublish==$scope.infoDocPublishArray.tabInsUtils.length){
						nb_infoDocPublish=0;
						$scope.isInfoDocPublish=false;
					};
				};
			};
				// console.log("résultat ",$scope.is_2);
			// $scope.listBkUsers=$scope.listBkUsers;
		}).catch(function (err) {
			if(err.status==500 && localStorage.getItem('jeton')!='' && localStorage.getItem('jeton')!=null && localStorage.getItem('jeton')!=undefined){
				deconnectApi.logout(sessionStorage.getItem("iduser")).then(function (response) {
							$location.url('/access/login');
							$state.go('access.login');
						}).catch(function (response) {
				});
			};
		});
	};
	function listUsersByBankDel(id) {
		$scope.compter=false;
		/*******************************************************************
			********************************************************************
			***@GET(admin/bank/users/list/)***************
			***@Params (@id banque)****************
			***@return JsonParser***********************************************
			********************************************************************
			********************************************************************/
		$http({
			method : 'GET',
			url : baseUrl+'admin/bank/users/list/'+id,
			data : {},
			headers:{'Authorization': 'Bearer '+localStorage.getItem('jeton')}
		}).then(function successCallback(response) {
			$scope.compter=false;
			for(var i=0;i<response.data.list_users.length;i++){
				for(var j=0;j<$scope.listBkUsers.length;j++){
					if($scope.listBkUsers[j].idUtilisateur==response.data.list_users[i].idUtilisateur){
						// if(i==response.data.list_users.length-1){
							// $scope.compter=true;
						// };
						$scope.changeBkUser($scope.listBkUsers[j].idUtilisateur);
						$scope.listBkUsers.splice(j, 1);
					};
				};
			};
			// $scope.listBkUsers=$scope.listBkUsers;
		}).catch(function (err) {
			if(err.status==500 && localStorage.getItem('jeton')!='' && localStorage.getItem('jeton')!=null && localStorage.getItem('jeton')!=undefined){
				deconnectApi.logout(sessionStorage.getItem("iduser")).then(function (response) {
							$location.url('/access/login');
							$state.go('access.login');
						}).catch(function (response) {
				});
			};
		});
	};
	//FIN LIST DES UTILSATEURS D'UNE BANQUE
	/*RETRIEVE PUBLISH DOCUMENT INFO*/
	$scope.isPublish=false;
	 function infoDocPublish() {
		$scope.loadUserMy=true;
		/*******************************************************************
			********************************************************************
			***@GET(mon_espace/documents/publish_list/)***************
			***@Params (@id user en session, @id document)****************
			***@return JsonParser***********************************************
			********************************************************************
			********************************************************************/
		$http({
			method : 'GET',
			url : baseUrl+'mon_espace/documents/publish_list/'+parseInt(idADmin)+'/'+parseInt(x_info_doc.idDocuments),
			data : {},
			headers:{'Authorization': 'Bearer '+localStorage.getItem('jeton')}
		}).then(function successCallback(response) {
			$scope.isPublish=false;
			//console.log("PUBLISH DOCUMENT INFO ",response.data.document_publish_list);
			$scope.datePublication=response.data.document_publish_list.datePublication;
			$scope.infoDocPublishArray=response.data.document_publish_list;
			$scope.infoDocPublishArray_2=response.data.document_publish_list;
			// var nb_3=0;
			// objet={
				// "document": x_info_doc.idDocuments,
				// "tabUtils": response.data.document_publish_list.tabUtils,
				// "tabIns": $scope.selectionbk,
				// "tabInsUtils": response.data.document_publish_list.tabInsUtils
			// };
			if($scope.infoDocPublishArray==null || $scope.infoDocPublishArray==undefined){
				$scope.infoDocPublishArray=[];
			};
			if($scope.infoDocPublishArray_2==null || $scope.infoDocPublishArray_2==undefined){
				$scope.infoDocPublishArray_2=[];
			};
			
			if(response.data.document_publish_list.tabUtils.length!=0){
				$scope.is_2=undefined;
				$scope.isPublish=true;
				$scope.isInfoDocPublish=true;
				for(var i=0;i<response.data.document_publish_list.tabUtils.length;i++){
					$scope.changeMyEntUser(response.data.document_publish_list.tabUtils[i]);
				};
			};
			
			if(response.data.document_publish_list.tabIns.length!=0 && response.data.document_publish_list.tabInsUtils.length==0){
				// //console.log("111111111111111");
				$scope.isPublish=true;
				$scope.is_2=true;
				$scope.isInfoDocPublish=true;
				$scope.changeBkAttach2(response.data.document_publish_list.tabIns[0]);
			};
			
			if(response.data.document_publish_list.tabInsUtils.length!=0){
				$scope.is_2=false;
				$scope.isPublish=true;
				$scope.isInfoDocPublish=true;
				
				for(var i=0;i<response.data.document_publish_list.tabInsUtils.length;i++){
					for(var j=0;j<response.data.document_publish_list.tabInsUtils[i].utils.length;j++){
						$scope.infoDocPublishIdUser.push(response.data.document_publish_list.tabInsUtils[i].utils[j]);
						// //console.log("Hé ",$scope.infoDocPublishIdUser);
					};
				};
				$scope.changeBkAttach2(response.data.document_publish_list.tabInsUtils[0].ins);
				// for(var i=0;i<response.data.document_publish_list.tabInsUtils.length;i++){
					// $scope.nb_2++;
					// $scope.changeBkAttach2(response.data.document_publish_list.tabInsUtils[i].ins);
				// };
				// if($scope.nb_2==response.data.document_publish_list.tabInsUtils.length){
					// $scope.selectionbku=[];
					// for(var i=0;i<response.data.document_publish_list.tabInsUtils.length;i++){
						// nb_3++;
						// for(var j=0;j<response.data.document_publish_list.tabInsUtils[i].utils.length;j++){
							// $scope.changeBkUser(response.data.document_publish_list.tabInsUtils[i].utils[j]);
						// };
					// };
					// if(nb_3==response.data.document_publish_list.tabInsUtils.length){
						// $scope.nb_2=0;
						// nb_3=0;
					// };
				// };
			};
			listUsersConnected();
		}).catch(function (err) {
			if(err.status==500 && localStorage.getItem('jeton')!='' && localStorage.getItem('jeton')!=null && localStorage.getItem('jeton')!=undefined){
				deconnectApi.logout(sessionStorage.getItem("iduser")).then(function (response) {
							$location.url('/access/login');
							$state.go('access.login');
						}).catch(function (response) {
				});
			};
		});
	};
	infoDocPublish();
	/*FIN RETRIEVE PUBLISH DOCUMENT INFO*/
	/*LISTE DES UTILISATEURS*/
	$scope.loadUserMy=false;
	function listUsersConnected(){
		$scope.loadUserMy=true;
		/*******************************************************************
			********************************************************************
			***@GET(admin/user_entreprise/list/)***************
			***@Params (@id institution, @id user en session****************
			***@return JsonParser***********************************************
			********************************************************************
			********************************************************************/
		$http({
			method : 'GET',
			url : baseUrl+'admin/user_entreprise/list/'+parseInt(idInstitution)+'/'+parseInt(idADmin),
			data : {},
			headers:{'Authorization': 'Bearer '+localStorage.getItem('jeton')}
		}).then(function successCallback(response) {
			$scope.loadUserMy=false;
			// console.log("Hé toi ",response.data);
			if(response.data.entreprise_users_list==null || response.data.entreprise_users_list==undefined){
				response.data.entreprise_users_list=[];
			};
			for(var i=0;i<response.data.entreprise_users_list.length;i++){
				if(response.data.entreprise_users_list[i].idUtilisateur!=parseInt(idADmin)){
					$scope.listMyUsers.push(response.data.entreprise_users_list[i]);
				};
			};
			$scope.listMyUsers=$scope.listMyUsers;
			if($scope.infoDocPublishArray.tabUtils.length==0 && ($scope.infoDocPublishArray.tabInsUtils.length==0 && $scope.infoDocPublishArray.tabIns.length==0 &&
			$scope.infoDocPublishArray_2.tabUtils.length==0 && $scope.infoDocPublishArray_2.tabInsUtils.length==0 && $scope.infoDocPublishArray_2.tabIns.length==0) ){
				for(var i=0;i<$scope.listMyUsers.length;i++){
					$scope.changeMyEntUser($scope.listMyUsers[i].idUtilisateur);
				};
			};
		}).catch(function (err) {
			if(err.status==500 && localStorage.getItem('jeton')!='' && localStorage.getItem('jeton')!=null && localStorage.getItem('jeton')!=undefined){
				deconnectApi.logout(sessionStorage.getItem("iduser")).then(function (response) {
							$location.url('/access/login');
							$state.go('access.login');
						}).catch(function (response) {
				});
			};
		});
	};
	// listUsersConnected();
	/*FIN LISTE DES UTILISATEURS*/
	
	$scope.confirmDelete = function(){
		// $rootScope.$broadcast('confirmdeletionEn_', {x : x});
		// $modalInstance.close();
	};
	
	// $scope.choixPublish=function(a){
		// //console.log("choixPublish ",a);
		// if(parseInt(a)==22){
			// $scope.publishSeparator='MINE';
			// $scope.isAllInLocaliy=false;
			// $scope.isAllSpecific=false;
			// $scope.isAllMy=true;
		// }else if(parseInt(a)==23){
			// $scope.publishSeparator='OTHERS';
			// $scope.isAllMy=false;
			// $scope.isAllSpecific=false;
			// $scope.isAllInLocaliy=true;
		// }else if(parseInt(a)==24){
			// $scope.publishSeparator='SPECIFIC';
			// $scope.isAllMy=false;
			// $scope.isAllInLocaliy=false;
			// $scope.isAllSpecific=true;
		// };
	// };
	
	// $scope.$watch("ischangeBankDoc",function( newValue, oldValue ) { 
		
	// });
	
	// $scope.$watch("ischangeBkUser",function( newValue, oldValue ) { 
		
	// });
	
	// $scope.$watch("isAllMy",function( newValue, oldValue ) { 
		// $scope.isAllMy=$scope.isAllMy;
		// $scope.isAllInLocaliy=$scope.isAllInLocaliy;
		// $scope.isAllSpecific=$scope.isAllSpecific;
		// if ($scope.$root && !$scope.$root.$$phase) {
			// $scope.$apply();
		// };
	// });
	
	// $scope.$watch("publishSeparator",function( newValue, oldValue ) { 
		// switch(newValue){
			// case 'MINE' :
				// $scope.publishFunction=function(){
					// $scope.loading=true;
					// publishMine();
				// };
			// break;
			
			// case 'OTHERS' :
				// $scope.publishFunction=function(){
					// $scope.loading=true;
					// var objet={    
						// "idDoc" : x_info_doc.idDocuments,
						// "idsInstitution" : $scope.selectionbk
					// };
					// publishOthers(objet);
				// };
			// break;
			
			// case 'SPECIFIC' :
				// $scope.publishFunction=function(){
					// $scope.loading=true;
					// var objet={
						// "idDocument" : x_info_doc.idDocuments,
						// "objectList" : $scope.selectionbu
					// };
					// publishSpecific(objet);
				// };
			// break;
		// };
	// });
	
	$scope.publishFunction=function(){
		var nbc=0;
		var concat=0;
		var separator='publishDoc';
		$scope.loading=true;
		$rootScope.$broadcast('operations', {separator : separator, objet : objet});
		// for(var i=0;i<objet.tabInsUtils.length;i++){
			// nbc++;
			// concat = concat+objet.tabInsUtils.utils.length;
		// };
		// if(nbc==objet.tabInsUtils.length){
			// if(concat!=$scope.listBkUsers.length){
				// objet.tabIns=[];
			// };
		// };
		// //console.log("gttt ",$scope.selectionbku.length);
		// //console.log("gddd ",$scope.listBkUsers.length);
		if($scope.selectionbku.length!=$scope.listBkUsers.length){
			objet.tabIns=[];
		}else{
			objet.tabInsUtils=[];
		};
		publishDocument(objet);
	};
	
	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
}]); 

app.controller('popUpAuditCtrl', ['$scope', '$rootScope', '$state', '$uibModalInstance', '$http', 'x_info_doc', 'sepPubAudit', 'x_info_auddoc', 'deconnectApi', function($scope, $rootScope, $state, $modalInstance, $http, x_info_doc, sepPubAudit, x_info_auddoc, deconnectApi) {
	$scope.doc_information=x_info_doc;
	$scope.listSharedUsers=x_info_auddoc;
	//console.log("$scope.listSharedUsers ",$scope.listSharedUsers);
	for(var i=0;i<x_info_auddoc.length;i++){
		if(x_info_auddoc[i].datePublication!='' && x_info_auddoc[i].datePublication!='null' && x_info_auddoc[i].datePublication!=null && x_info_auddoc[i].datePublication!=undefined && x_info_auddoc[i].datePublication!='undefined'){
			$scope.datePub=x_info_auddoc[i].datePublication;
			break;
		};
	};
	
	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
}]);

app.directive('valideFile', function valideFile($parse) {

	return {
		restrict : 'A',
		require: 'ngModel',
		link: function (scope, element, attrs, ngModelCtrl) {

			ngModelCtrl.$validators.valideFile = function() {

				element.on('change', function () {

					var value = element.val(),
					model = $parse(attrs.ngModel),
					modelSetter = model.assign;

					scope.uploadedFileType = null;

					if(!value) {

						modelSetter(scope, '');

					} else {

						var ext = value.substring(value.lastIndexOf('.') + 1).toLowerCase();

						if(attrs.valideFile.indexOf(ext) !== -1) {

							scope.uploadedFileType = ext;
							modelSetter(scope, element[0].files[0]);

						} else {

							scope.uploadedFileType = 'other';
							modelSetter(scope, '');
						}
					}
				});
			};
		}
	};
});
