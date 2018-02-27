/**
 * @author Mamadou FAYE <mamadou.faye@qualshore.com>
 * @copyright 2017-2018 Qualshore. All rights reserved.
 */

//$.getScript("appli.js");
$.getScript("app.url.js");

/*********************************************************************/
/************************CONTROLLER BANK************************/
/*********************************************************************/
angular.module('app').controller('bankController', ['$scope', '$uibModal', '$rootScope', '$interval', '$log', '$state', '$sce', '$http', '$stateParams', 'filterFilter', 'deconnectApi',
    function($scope, $modal, $rootScope, $interval, $log, $state, $sce, $http, $stateParams, filterFilter, deconnectApi) {

        var idADmin = sessionStorage.getItem("iduser");
        var idInstitution = sessionStorage.getItem("idInstitution");
        var idloc = sessionStorage.getItem("idloc");
        var idGrp = sessionStorage.getItem("idGrp");
        var jeton = localStorage.getItem('jeton');
        $scope.isuserInsessionLine = 0;
        $scope.errorMessage = null;
        $scope.audjourdhui = new Date();


        //headers: {'Authorization': "'"+jeton+"'"}

        /****************DEBUT OFFRE BANK*****************************/
        var pageTitile = localStorage.getItem('pagetitle');
        var idDemande;
        $scope.demandes = [];
        $scope.demandesbyProduit = [];
        /*******************************OFFRE BANK**************************/
        $scope.idProduit = 0;
        $scope.idProduitSpot = 0;
        $scope.idProduitDepot = 0;
        $scope.idProduitChang = 0;
        $scope.idProduitTrans = 0;
        $scope.idProduitEscom = 0;
        $rootScope.booleanEscom = false;
        $rootScope.booleanChan = false;
        $rootScope.booleanTrans = false;
        $rootScope.booleanSpot = false;
        $rootScope.booleanDepot = false;

        /***************JOURNAL ENTREPRISE**********/
        $scope.journalEntreprise = [];
        /**
         * @function journalEntreprise
         * @description This function allow to list all entreprise logs 
         * @return journalEntreprise;
         */
        function journalEntreprise() {
            $scope.loading = true;
            $scope.islistJournalEntre = false;
            $http({
                method: 'GET',
                url: baseUrl + 'log/admin/user/enterprise_logs/' + parseInt(idADmin),
                headers: {
                    'Authorization': 'Bearer ' + jeton
                }
            }).then(function successCallback(response) {
                // $scope.loading = false;
                $scope.journalEntreprise = response.data.enterprise_users_log_list;
                // console.log(response);
                $scope.islistJournalEntre = true;
            }).catch(function(err) {
                console.log(err);
            });
        };
        journalEntreprise();
        /***************END JOURNAL ENTREPRISE**********/

        /**
         * @function showPiste
         * @param doc:{}
         * @description This function allow to show piste d'audit form.
         */
        $scope.showPiste = function(doc) {
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_banque/pisteAudit.html',
                controller: 'DocsBankController',
                resolve: {
                    selectedRow: function() {
                        return doc;
                    }
                }
            });
        };
        /**
         * @function showPiste2
         * @description This function allow to show piste d'audit form 2.
         */
        $scope.showPiste2 = function() {
            var docuss = $scope.recupDocc;
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_banque/pisteAudit.html',
                controller: 'DocsBankController',
                resolve: {
                    selectedRow: function() {
                        return docuss;
                    }
                }
            });
        };
        /**
         * @function showPistedocRecu
         * @param doc:{}
         * @description This function allow to show piste d'audit form 
         * in docs recu.
         */
        $scope.showPistedocRecu = function(doc) {
            console.log(doc.documents.idDocuments);
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_banque/pisteAudit.html',
                controller: 'DocsBankControllerRecu',
                resolve: {
                    selectedRow: function() {
                        return doc;
                    }
                }
            });
        };
        /**
         * @function showPistedocRecu2
         * @description This function allow to show piste d'audit form 2 
         * in docs recu.
         */
        $scope.showPistedocRecu2 = function() {
            var docuss = $scope.getDocAudit;
            console.log(docuss);
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_banque/pisteAudit.html',
                controller: 'DocsBankControllerRecu',
                resolve: {
                    selectedRow: function() {
                        return docuss;
                    }
                }
            });
        };
        $scope.goToshowPiste = function(doc) {
            $scope.boolDocRecu = true;
        };


        /*************BANK CONDITIONS***********************/
        $scope.etreasuryBankCondition = [];

        /**
         * @function listBankConditions
         * @description This function allow to list all bank condition
         * @return etreasuryBankCondition:[];
         */
        function listBankConditions() {
            $scope.loading = true;
            $scope.isDataReadyEtbkCond = false;
            $http({
                method: 'GET',
                url: baseUrl + 'admin/bank_conditions/list_conditions/' + idADmin,
                //headers: {'Authorization': "'"+jeton+"'"}
                headers: {
                    'Authorization': 'Bearer ' + jeton
                }
            }).then(function successCallback(response) {
                $scope.loading = false;
                $scope.etreasuryBankCondition = response.data.list_bankConditions;
                //			//console.log($scope.etreasuryBankCondition);
                $scope.isDataReadyEtbkCond = true;
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        listBankConditions();

        /**
         * @function addecondBank
         * @description This function allow to show add bank condition
         * form.
         */
        $scope.addecondBank = function() {
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_banque/register_condBank.html',
                controller: 'BankConditionCtroller',
                resolve: {
                    selectedRow: function() {
                        return $scope.items;
                    }
                }
            });
            modalInstance.result.then(function(selectedItem) {
                $scope.selected = selectedItem;
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        /**
         * @function editBankCondition
         * @param bankCond:{}
         * @description This function allow to show update bank condition
         * form.
         */
        $scope.editBankCondition = function(bankCond) {
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_banque/register_condBank.html',
                controller: 'BankConditionCtroller',
                resolve: {
                    selectedRow: function() {
                        return bankCond;
                    }
                }
            });
        };
        /**
         * @function suppBankCondition
         * @param bankCond:{}
         * @description This function allow to show delete bank condition
         * form.
         */
        $scope.suppBankCondition = function(bankCond) {
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_banque/deleteBankCond.html',
                controller: 'BankConditionCtroller',
                resolve: {
                    selectedRow: function() {
                        return bankCond;
                    }
                }
            });
        };
        /*************END BANK CONDITION*********************/
        $scope.listContacts = [];


        /**
         * @function contactBank
         * @description This function allow to list all contacts entreprise
         * @return listContacts:[];
         */
        function contactBank() {
            $scope.loading = true;
            $scope.islistContacts = false;
            $http({
                method: 'GET',
                url: baseUrl + 'admin/user/list_contacts/' + parseInt(idADmin),
                //headers: {'Authorization': "'"+jeton+"'"}
                headers: {
                    'Authorization': 'Bearer ' + jeton
                }
            }).then(function successCallback(response) {
                $scope.loading = false;
                $scope.listContacts = response.data.bank_users_list;
                ////console.log($scope.listContacts);
                $scope.islistContacts = true;
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };

        contactBank();

        $rootScope.$on("ProduitCall", function() {
            $scope.listProduitCall();
        });

        /**
         * @function listProduitCall
         * @description This function allow to list all product and set 
         * booleans variable true switch indexOf result.
         * This function is used in CUD operations. 
         * @return etreasuryProduit:[];
         */
        $scope.listProduitCall = function() {
            $http({
                method: 'GET',
                url: baseUrl + 'admin/product/list',
                //headers: {'Authorization': "'"+jeton+"'"}
                headers: {
                    'Authorization': 'Bearer ' + jeton
                }
            }).then(function successCallback(response) {
                $scope.etreasuryProduit = response.data.list_products;
                for (var i = 0; i < $scope.etreasuryProduit.length; i++) {
                    if ($scope.etreasuryProduit[i].nom.indexOf('CHANGE') !== -1) {
                        ////console.log("Change ok");
                        $rootScope.booleanChan = true;
                        $scope.idProduitChang = $scope.etreasuryProduit[i].idProduits;
                    }
                    if ($scope.etreasuryProduit[i].nom.indexOf('TRANSFERT') !== -1) {
                        ////console.log("Change ok");
                        $rootScope.booleanTrans = true;
                        $scope.idProduitTrans = $scope.etreasuryProduit[i].idProduits;
                    }
                    if ($scope.etreasuryProduit[i].nom.indexOf('SPOT') !== -1) {
                        $rootScope.booleanSpot = true;
                        $scope.idProduitSpot = $scope.etreasuryProduit[i].idProduits;
                    }
                    if ($scope.etreasuryProduit[i].nom.indexOf('TERME') !== -1) {
                        $rootScope.booleanDepot = true;
                        $scope.idProduitDepot = $scope.etreasuryProduit[i].idProduits;
                    }
                    if ($scope.etreasuryProduit[i].nom.indexOf('ESCOMPTE') !== -1) {
                        $rootScope.booleanEscom = true;
                        $scope.idProduitEscom = $scope.etreasuryProduit[i].idProduits;
                    }
                }
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        listProduits();

        /**
         * @function listProduits
         * @description This function allow to list all product and set 
         * booleans variable true switch indexOf result 
         * @return etreasuryProduit:[];
         */
        function listProduits() {
            $http({
                method: 'GET',
                url: baseUrl + 'admin/product/list',
                //headers: {'Authorization': "'"+jeton+"'"}
                headers: {
                    'Authorization': 'Bearer ' + jeton
                }
            }).then(function successCallback(response) {
                $scope.etreasuryProduit = response.data.list_products;
                for (var i = 0; i < $scope.etreasuryProduit.length; i++) {
                    if ($scope.etreasuryProduit[i].nom.indexOf('CHANGE') !== -1) {
                        ////console.log("Change ok");
                        $rootScope.booleanChan = true;
                        $scope.idProduitChang = $scope.etreasuryProduit[i].idProduits;
                    }
                    if ($scope.etreasuryProduit[i].nom.indexOf('TRANSFERT') !== -1) {
                        ////console.log("Change ok");
                        $rootScope.booleanTrans = true;
                        $scope.idProduitTrans = $scope.etreasuryProduit[i].idProduits;
                    }
                    if ($scope.etreasuryProduit[i].nom.indexOf('SPOT') !== -1) {
                        $rootScope.booleanSpot = true;
                        $scope.idProduitSpot = $scope.etreasuryProduit[i].idProduits;
                    }
                    if ($scope.etreasuryProduit[i].nom.indexOf('TERME') !== -1) {
                        $rootScope.booleanDepot = true;
                        $scope.idProduitDepot = $scope.etreasuryProduit[i].idProduits;
                    }
                    if ($scope.etreasuryProduit[i].nom.indexOf('ESCOMPTE') !== -1) {
                        $rootScope.booleanEscom = true;
                        $scope.idProduitEscom = $scope.etreasuryProduit[i].idProduits;
                    }
                }
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        }

        $scope.$watch('booleanEscom', function(bool1, bool2) {
            if (bool1) {
                allDemandListByProduitEscompte();
            };
        });
        $scope.$watch('booleanChan', function(bool1, bool2) {
            if (bool1) {
                allDemandListByProduitChang();
            };
        });
        $scope.$watch('booleanTrans', function(bool1, bool2) {
            if (bool1) {
                allDemandListByProduitTrans();
            };
        });

        $scope.demandesbyProduitTrans = [];
        /**
         * @function allDemandListByProduitTrans
         * @description This function allow to list all request_has_bank transfert 
         * @return demandesbyProduitTrans:[];
         */
        function allDemandListByProduitTrans() {
            $scope.loading = true;
            $scope.isDataReadyBkReqbyProduitTr = false;
            $http({
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
                url: baseUrl + 'mes_operations/entreprise/request_has_bank/lists/' + idInstitution + '/' + $scope.idProduitTrans,
                //headers: {'Authorization': "'"+jeton+"'"}

            }).then(function successCallback(response) {
                $scope.loading = false;
                $scope.demandesbyProduitTrans = response.data.list_request_has_bank;
                //console.log($scope.demandesbyProduitTrans);
                $scope.isDataReadyBkReqbyProduitTr = true;
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        $scope.demandesValid = [];
        $scope.entrepriseIDPr = null;
        //cette methode permet de retourner la liste des demandes par produit et banque
        $scope.demandesbyProduitChang = [];
        /**
         * @function allDemandListByProduitChang
         * @description This function allow to list all request_has_bank Change 
         * @return demandesbyProduitTrans:[];
         */
        function allDemandListByProduitChang() {
            $scope.loading = true;
            $scope.isDataReadyBkReqbyProduitCh = false;
            $http({
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
                url: baseUrl + 'mes_operations/entreprise/request_has_bank/lists/' + idInstitution + '/' + $scope.idProduitChang,
                //headers: {'Authorization': "'"+jeton+"'"}

            }).then(function successCallback(response) {
                $scope.loading = false;
                $scope.demandesbyProduitChang = response.data.list_request_has_bank;
                //console.log($scope.demandesbyProduitChang);
                $scope.isDataReadyBkReqbyProduitCh = true;
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        $scope.demandesbyProduitEscompte = [];
        /**
         * @function allDemandListByProduitEscompte
         * @description This function allow to list all request_has_bank Escompte 
         * @return demandesbyProduitTrans:[];
         */
        function allDemandListByProduitEscompte() {
            $scope.loading = true;
            $scope.isDataReadyBkReqbyProduitEsc = false;
            $http({
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
                url: baseUrl + 'mes_operations/entreprise/request_has_bank/lists/' + idInstitution + '/' + $scope.idProduitEscom,
                //headers: {'Authorization': "'"+jeton+"'"}

            }).then(function successCallback(response) {
                $scope.loading = false;
                $scope.demandesbyProduitEscompte = response.data.list_request_has_bank;
                //console.log($scope.demandesbyProduitEscompte);
                $scope.isDataReadyBkReqbyProduitEsc = true;
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        //	$scope.$watch('entrepriseIDPr', function (b1,b2) {
        //	if(b1){
        //	allUsersNotifiedPr();
        //	};
        //	});
        //	function allUsersNotifiedPr(){
        //	$http({
        //	method : 'GET',
        //	url :baseUrl+'validation/notifications/list_notification_users/'+idADmin+'/'+$scope.entrepriseIDPr+'/'+$scope.idProduit
        //	}).then(function successCallback(response) {
        //	$scope.usersNotified = response.data.notification;
        //	////console.log($scope.usersNotified);
        //	for(var i=0; i<response.data.notification.length; i++){
        //	//console.log(response.data.notification[i].user.idUtilisateur);
        //	if(response.data.notification[i].user.idUtilisateur===parseInt(idADmin)){
        //	$scope.etatChange = $scope.demandesbyProduit.length;
        //	break;
        //	}
        //	}

        //	}, function errorCallback(response) {
        //	//console.log(response.statusText);
        //	});
        //	};
        $scope.$watch('booleanSpot', function(bool3, bool4) {
            if (bool3) {
                allDemandListByProduitSpot();
                //allDemandListByProduitSpot2();
            };
        });
        $scope.demandesbyProduitSpot = [];
        $scope.demandSpotValidate = [];
        $scope.usersNotified = [];
        $scope.entrepriseID = null;
        /**
         * @function allDemandListByProduitSpot
         * @description This function allow to list all request_has_bank SPOT 
         * @return demandesbyProduitTrans:[];
         */
        function allDemandListByProduitSpot2() {
            $http({
                method: 'GET',
                //headers: {'Authorization': "'"+jeton+"'"},
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
                url: baseUrl + 'mes_operations/entreprise/request_has_bank/lists/' + idInstitution + '/' + $scope.idProduitSpot
            }).then(function successCallback(response) {
                $scope.demandesbyProduitSpot = response.data.list_request_has_bank;
                //console.log($scope.demandesbyProduitSpot);
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };

        /**
         * @function allDemandListByProduitSpot
         * @description This function allow to list all request_has_bank SPOT 
         * @return demandesbyProduitTrans:[];
         */
        function allDemandListByProduitSpot() {
            $scope.loading = true;
            $scope.isDataReadyBkReqbyProduitSpo = false;
            $http({
                method: 'GET',
                //headers: {'Authorization': "'"+jeton+"'"},
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
                url: baseUrl + 'mes_operations/entreprise/request_has_bank/lists/' + idInstitution + '/' + $scope.idProduitSpot
            }).then(function successCallback(response) {
                $scope.loading = false;
                $scope.demandesbyProduitSpot = response.data.list_request_has_bank;
                //console.log($scope.demandesbyProduitSpot);
                $scope.isDataReadyBkReqbyProduitSpo = true;
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };

        //$scope.msgNotific = "";
        //	function allDemandListByInstitution() {
        //	$http({
        //	method : 'GET',
        //	url :baseUrl+'mes_operations/entreprise/request_has_bank/list_by_enterprise/'+idInstitution
        //	}).then(function successCallback(response) {
        //	////console.log(response);
        //	$scope.demandesbyInstitution = response.data.list_request_has_bank;
        //	////console.log($scope.demandesbyInstitution.message);
        //	compteur++;
        //	if(compteur===1){ 
        //	if($scope.demandesbyInstitution!=undefined){
        //	initial=response.data.list_request_has_bank.length;
        //	}
        //	};
        //	if($scope.demandesbyInstitution!=undefined){
        //	$scope.etatDemande=response.data.list_request_has_bank.length;
        //	}
        //	//$scope.msgNotific = response.data.message; 
        //	////console.log($scope.msgNotific);
        //	}, function errorCallback(response) {
        //	//console.log(response.statusText);
        //	});
        //	};
        //	setInterval(function(){
        //	allDemandListByInstitution();
        //	}, 1000);

        //	$scope.add = function(dataDmd) {
        //	var index = $scope.notificationsToAdd.indexOf(dataDmd);
        //	$scope.notificationsToAdd.splice(index, 1);
        //	$scope.notifications.push(dataDmd);
        //	}
        //	$scope.$watch("etatDemande",function( bool1, bool2 ) {
        //	if(bool1>initial && bool1!=undefined){
        //	$scope.nbNotification = $scope.nbNotification +1;
        //	$scope.add(dataDmd);
        //	$scope.notificationPopup();
        //	compteur=0;
        //	};
        //	});

        $scope.$watch('booleanDepot', function(bool5, bool6) {
            if (bool5) {
                allDemandListByProduitDepot();
            };
        });
        $scope.demandesbyProduitDepot = [];
        $scope.entrepriseIDDepot = null;
        /**
         * @function allDemandListByProduitDepot
         * @description This function allow to list all request_has_bank DEPOT A TERME 
         * @return demandesbyProduitTrans:[];
         */
        function allDemandListByProduitDepot() {
            $scope.loading = true;
            $scope.isDataReadyBkdemandesbyProduitDepot = false;
            $http({
                method: 'GET',
                //headers: {'Authorization': "'"+jeton+"'"},
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
                url: baseUrl + 'mes_operations/entreprise/request_has_bank/lists/' + idInstitution + '/' + $scope.idProduitDepot
            }).then(function successCallback(response) {
                $scope.loading = false;
                $scope.demandesbyProduitDepot = response.data.list_request_has_bank;
                //console.log($scope.demandesbyProduitDepot);
                $scope.isDataReadyBkdemandesbyProduitDepot = true;
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };

        $scope.offreEnAttentesListen = [];
        var initialOff = 0;
        var compteurOff = 0;
        var nb = 0;
        //	function allOfferAttentesListen() {
        //	$http({
        //	method : 'GET',
        //	url :baseUrl+'validation_offer/list_notification_attente/'+idADmin
        //	}).then(function successCallback(response) {
        //	$scope.offreEnAttentesListen = response.data.requestNotifyList;
        //	compteurOff++;
        //	if(compteurOff==1){
        //	if($scope.offreEnAttentesListen!=undefined){
        //	initialOff=response.data.requestNotifyList.length;
        //	};
        //	};
        //	if($scope.offreEnAttentesListen!=undefined){
        //	$scope.etatOff=response.data.requestNotifyList.length;
        //	};
        //	}, function errorCallback(response) {
        //	//console.log(response.statusText);
        //	});
        //	};

        //$scope.notifications.push(dataOffer,dataDmd);
        //$scope.nbNotification = $scope.notifications.length;
        //	setInterval(function(){
        //	allOfferAttentesListen();
        //	}, 1000);

        //	$scope.addOff = function(dataOffer) {
        //	var index = $scope.notificationsToAdd.indexOf(dataOffer);
        //	$scope.notificationsToAdd.splice(index, 1);
        //	$scope.notifications.push(dataOffer);
        //	}
        //	$scope.$watch("etatOff",function( bool1, bool2 ) {
        //	if(bool1>initialOff && bool1!=undefined){
        //	$scope.nbNotification = $scope.nbNotification +1;
        //	$scope.addOff(dataOffer);
        //	$scope.notificationOffre();
        //	compteurOff=0;
        //	};
        //	});

        $scope.offreEnAttentes = [];
        $scope.offreEnAttentesSPOT = [];
        $scope.offreEnAttentesDepot = [];
        $scope.offreEnAttentesChange = [];
        $scope.offreEnAttentesTransfert = [];
        $scope.offreEnAttentesEscompte = [];

        $rootScope.$on("OfferAttentesCall", function() {
            $scope.allOfferAttentesCall();
        });

        /**
         * @function allOfferAttentesCall
         * @description This function allow to list all validation_offer waiting 
         * this function is used in CUD operations
         * @return offreEnAttentesSPOT, offreEnAttentesChange, 
         * offreEnAttentesDepot, offreEnAttentesTransfert, offreEnAttentesEscompte
         */
        $scope.allOfferAttentesCall = function() {
            $http({
                method: 'GET',
                //headers: {'Authorization': "'"+jeton+"'"},
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
                url: baseUrl + 'validation_offer/list_notification_attente/' + idADmin
            }).then(function successCallback(response) {
                $scope.offreEnAttentes = response.data.requestNotifyList;
                //console.log($scope.offreEnAttentes);
                $scope.offreEnAttentesSPOT = $scope.offreEnAttentes.filter(function(offer) {
                    return offer.demandeIdDemande.product.nom == 'SPOT';
                });
                $scope.offreEnAttentesChange = $scope.offreEnAttentes.filter(function(offer) {
                    return offer.demandeIdDemande.product.nom == 'CHANGE';
                });
                $scope.offreEnAttentesDepot = $scope.offreEnAttentes.filter(function(offer) {
                    return offer.demandeIdDemande.product.nom == 'DEPOT A TERME';
                });
                $scope.offreEnAttentesTransfert = $scope.offreEnAttentes.filter(function(offer) {
                    return offer.demandeIdDemande.product.nom == 'TRANSFERT';
                });
                $scope.offreEnAttentesEscompte = $scope.offreEnAttentes.filter(function(offer) {
                    return offer.demandeIdDemande.product.nom == 'ESCOMPTE';

                });
                //console.log($scope.offreEnAttentesEscompte);
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        }

        /**
         * @function allOfferAttentes
         * @description This function allow to list all validation_offer waiting 
         * this function is used in CUD operations.
         * We used angularJs filter.
         * @return offreEnAttentesSPOT, offreEnAttentesChange, 
         * offreEnAttentesDepot, offreEnAttentesTransfert, offreEnAttentesEscompte
         */
        function allOfferAttentes() {
            $scope.isDataReadyOffTrans = false;
            $http({
                method: 'GET',
                //headers: {'Authorization': "'"+jeton+"'"},
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
                url: baseUrl + 'validation_offer/list_notification_attente/' + idADmin
            }).then(function successCallback(response) {
                $scope.offreEnAttentes = response.data.requestNotifyList;
                //console.log($scope.offreEnAttentes);
                $scope.offreEnAttentesSPOT = $scope.offreEnAttentes.filter(function(offer) {
                    return offer.demandeIdDemande.product.nom == 'SPOT';
                });
                $scope.offreEnAttentesChange = $scope.offreEnAttentes.filter(function(offer) {
                    return offer.demandeIdDemande.product.nom == 'CHANGE';
                });
                $scope.offreEnAttentesDepot = $scope.offreEnAttentes.filter(function(offer) {
                    return offer.demandeIdDemande.product.nom == 'DEPOT A TERME';
                });
                $scope.offreEnAttentesTransfert = $scope.offreEnAttentes.filter(function(offer) {
                    return offer.demandeIdDemande.product.nom == 'TRANSFERT';
                });
                $scope.offreEnAttentesEscompte = $scope.offreEnAttentes.filter(function(offer) {
                    return offer.demandeIdDemande.product.nom == 'ESCOMPTE';
                });
                //console.log($scope.offreEnAttentesEscompte);
                $scope.isDataReadyOffTrans = true;
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        allOfferAttentes();

        /**
         * @function offreBank
         * @param demand:{}
         * @description This function allow to show form Offer add. 
         */
        $scope.offreBank = function(demand) {
            //$scope.idDemande = demand.idDemande;
            ////console.log($scope.demand);
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_banque/offre.html',
                controller: 'popupBankController',
                resolve: {
                    selectedRow: function() {
                        return demand;
                    }
                }
            });
        };

        /**
         * @function vueOffre
         * @param demand:{}
         * @description This function allow to show form Offer view. 
         */
        $scope.vueOffre = function(demand) {
            //$scope.idDemande = demand.idDemande;
            ////console.log($scope.demand);
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_banque/viewOffre.html',
                controller: 'popupBankController',
                resolve: {
                    selectedRow: function() {
                        return demand;
                    }
                }
            });
        };

        /**
         * @function validerOffre
         * @param demand:{}
         * @description This function allow to show form Offer validate. 
         */
        $scope.validerOffre = function(demand) {
            //$scope.idDemande = demand.idDemande;
            ////console.log($scope.demand);
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_banque/validerOffre.html',
                controller: 'popupBankController',
                resolve: {
                    selectedRow: function() {
                        return demand;
                    }
                }
            });
        };

        /**
         * @function suppOffreBank
         * @param demand:{}
         * @description This function allow to show form Offer delete. 
         */
        $scope.suppOffreBank = function(demand) {
            //$scope.idDemande = demand.idDemande;
            ////console.log($scope.idDemande);
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_banque/deleteOffre.html',
                controller: 'bankSuppController',
                resolve: {
                    selectedRow: function() {
                        return demand;
                    }
                }
            });

        };


        /****************FIN OFFRE BANK*******************************/

        /****************DEBUT CHAINE DE VALIDATION******************/

        /**
         * @function addNouvelleChaine
         * @description This function allow to show form Validation level. 
         */
        $scope.addNouvelleChaine = function() {
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_banque/register_op_adm_vnb.html',
                controller: 'popupBankController',
                resolve: {
                    selectedRow: function() {
                        return $scope.items;
                    }
                }
            });
            modalInstance.result.then(function(selectedItem) {
                $scope.selected = selectedItem;
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
        $scope.validationLevelList = [];
        /**
         * @function listValidationLevel
         * @description This function allow to list all validation_level. 
         * @return validationLevelList
         */
        function listValidationLevel() {
            $scope.loading = true;
            $scope.isDataReadyBkoffreEnAttentesV = false;
            $http({
                method: 'GET',
                //headers: {'Authorization': "'"+jeton+"'"},
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
                url: baseUrl + 'validation_level/list_institution/' + idInstitution,
            }).then(function successCallback(response) {
                $scope.loading = false;
                $scope.validationLevelList = response.data.validation_level_list;
                $scope.isDataReadyBkoffreEnAttentesV = true;
                if ($scope.validationLevelList != undefined) {
                    for (var i = 0; i < $scope.validationLevelList.length; i++) {
                        if ($scope.validationLevelList[i].sens === 'request') {
                            $scope.validationLevelList[i].sens = "Demande";
                        }
                        if ($scope.validationLevelList[i].sens === 'offer') {
                            $scope.validationLevelList[i].sens = "Offre";
                        }
                        if ($scope.validationLevelList[i].allsRequired === true) {
                            $scope.validationLevelList[i].allsRequired = "Toute la chaine";
                        }
                        if ($scope.validationLevelList[i].allsRequired === false) {
                            $scope.validationLevelList[i].allsRequired = "Pas toute la chaine";
                        }
                    }
                }
                ////console.log($scope.validationLevelList);
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        listValidationLevel();
        /**
         * @function editVlevel
         * @param validation:{}
         * @description This function allow to show form Validation level edit. 
         */
        $scope.editVlevel = function(validation) {
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_banque/update-vnb.html',
                controller: 'popupBankController',
                resolve: {
                    selectedRow: function() {
                        return validation;
                    }
                }
            });
        };

        /**
         * @function suppVlevel
         * @param validation:{}
         * @description This function allow to show form Validation level edit. 
         */
        $scope.suppVlevel = function(validation) {
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_banque/deleteVlevel.html',
                controller: 'bankSuppController',
                resolve: {
                    selectedRow: function() {
                        return validation;
                    }
                }
            });
        };
        /****************FIN CHAINE DE VALIDATION******************/

        /**************** DEBUT NIVEAU DE VALIDATION******************/

        /**
         * @function addNiveauValidation
         * @description This function allow to show form Validation level group. 
         */
        $scope.addNiveauValidation = function() {
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_banque/register_op_adm_vnv.html',
                controller: 'popupBankController',
                resolve: {
                    selectedRow: function() {
                        return $scope.items;
                    }
                }
            });
            modalInstance.result.then(function(selectedItem) {
                $scope.selected = selectedItem;
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        $rootScope.$on("CallNiveauValidation", function() {
            $scope.listNivauValidCall();
        });

        $scope.listNivauValidCall = function() {
            //$scope.isReadyDataBkniveauValidListV = false;
            $http({
                method: 'GET',
                //headers: {'Authorization': "'"+jeton+"'"},
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
                url: baseUrl + 'validation_level_groupe/list/' + idInstitution,
            }).then(function successCallback(response) {
                $scope.niveauValidList = response.data.validation_level_groupe_list;
                //$scope.isReadyDataBkniveauValidListV = true;
                for (var i = 0; i < $scope.niveauValidList.length; i++) {
                    if ($scope.niveauValidList[i].validationLevel.sens === 'request') {
                        $scope.niveauValidList[i].validationLevel.sens = "Demande";
                    }
                    if ($scope.niveauValidList[i].validationLevel.sens === 'offer') {
                        $scope.niveauValidList[i].validationLevel.sens = "Offre";
                    }
                    if ($scope.niveauValidList[i].validationLevel.allsRequired === true) {
                        $scope.niveauValidList[i].validationLevel.allsRequired = "Toute la chaine";
                    }
                    if ($scope.niveauValidList[i].validationLevel.allsRequired === false) {
                        $scope.niveauValidList[i].validationLevel.allsRequired = "Pas toute la chaine";
                    }
                }
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });

        }

        $scope.niveauValidList = [];

        function listNivauValid() {
            $scope.loading = true;
            $scope.isReadyDataBkniveauValidListV = false;
            $http({
                method: 'GET',
                //headers: {'Authorization': "'"+jeton+"'"},
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
                url: baseUrl + 'validation_level_groupe/list/' + idInstitution,
            }).then(function successCallback(response) {
                $scope.loading = false;
                $scope.niveauValidList = response.data.validation_level_groupe_list;
                $scope.isReadyDataBkniveauValidListV = true;
                //if($scope.niveauValidList.length!=undefined){
                for (var i = 0; i < $scope.niveauValidList.length; i++) {
                    if ($scope.niveauValidList[i].validationLevel.sens === 'request') {
                        $scope.niveauValidList[i].validationLevel.sens = "Demande";
                    }
                    if ($scope.niveauValidList[i].validationLevel.sens === 'offer') {
                        $scope.niveauValidList[i].validationLevel.sens = "Offre";
                    }
                    if ($scope.niveauValidList[i].validationLevel.allsRequired === true) {
                        $scope.niveauValidList[i].validationLevel.allsRequired = "Toute la chaine";
                    }
                    if ($scope.niveauValidList[i].validationLevel.allsRequired === false) {
                        $scope.niveauValidList[i].validationLevel.allsRequired = "Pas toute la chaine";
                    }
                }
                //}
                ////console.log($scope.niveauValidList);
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        listNivauValid();
        $scope.editNlevel = function(nvalidation) {
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_banque/register_op_adm_vnv.html',
                controller: 'popupBankController',
                resolve: {
                    selectedRow: function() {
                        return nvalidation;
                    }
                }
            });
        };
        $scope.suppNlevel = function(nvalidation) {
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_banque/deleteNlevel.html',
                controller: 'bankSuppController',
                resolve: {
                    selectedRow: function() {
                        return nvalidation;
                    }
                }
            });
        };
        /******************DEBUT NOTIFICATIONS*****************/
        $scope.addNotification = function() {
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_banque/register_op_adm_vrc.html',
                controller: 'popupBankController',
                resolve: {
                    selectedRow: function() {
                        return $scope.items;
                    }
                }
            });
            modalInstance.result.then(function(selectedItem) {
                $scope.selected = selectedItem;
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
        $scope.editNotification = function(notifie) {
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_banque/register_op_adm_vrc.html',
                controller: 'popupBankController',
                resolve: {
                    selectedRow: function() {
                        return notifie;
                    }
                }
            });
        };
        $scope.suppNotification = function(notifie) {
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_banque/deleteNotification.html',
                controller: 'bankSuppController',
                resolve: {
                    selectedRow: function() {
                        return notifie;
                    }
                }
            });
        };
        $rootScope.$on("CallNotification", function() {
            $scope.listNotificationCall();
        });
        $scope.listNotificationCall = function() {
            //$scope.isReadyDataBknotfic = false;
            $http({
                method: 'GET',
                url: baseUrl + 'validation/notifications/list/' + idADmin + '/' + idInstitution,
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
            }).then(function successCallback(response) {
                $scope.notificationList = response.data.notification;
                //$scope.isReadyDataBknotfic = true;
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        $scope.notificationList = [];

        function listNotification() {
            $scope.loading = true;
            $scope.isReadyDataBknotfic = false;
            $http({
                method: 'GET',
                //headers: {'Authorization': "'"+jeton+"'"},
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
                url: baseUrl + 'validation/notifications/list/' + idADmin + '/' + idInstitution,
            }).then(function successCallback(response) {
                $scope.loading = false;
                $scope.notificationList = response.data.notification;
                $scope.isReadyDataBknotfic = true;
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        listNotification();

        /******************FIN NOTIFICATIONS******************/
        /**********************USER & GROUP BANK********************************/

        $rootScope.$on("CallUserBank", function() {
            $scope.listUsersBankCall();
        });
        $scope.listUsersBankCall = function() {
            $http({
                method: 'GET',
                //headers: {'Authorization': "'"+jeton+"'"},
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
                url: baseUrl + 'admin/user_bank/list/' + idInstitution + '/' + idADmin
            }).then(function successCallback(response) {
                $scope.bankUsers = response.data.bank_users_list;
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };

        $scope.bankUsers = [];

        function listUsersBank() {
            $scope.loading = true;
            $scope.isDataReadyBkbankUsers = false;
            $http({
                method: 'GET',
                //headers: {'Authorization': "'"+jeton+"'"},
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
                url: baseUrl + 'admin/user_bank/list/' + idInstitution + '/' + idADmin
            }).then(function successCallback(response) {
                $scope.loading = false;
                $scope.bankUsers = response.data.bank_users_list;
                ////console.log($scope.bankUsers);
                $scope.isDataReadyBkbankUsers = true;
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        listUsersBank();
        $scope.bankGrps = []
            //$scope.bankGrps= communicate.getCurrentUserInfo();

        function listGrpeBank() {
            $scope.loading = true;
            $scope.isReadyDataBkbankGrps = false;
            $http({
                method: 'GET',
                //headers: {'Authorization': "'"+jeton+"'"},
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
                url: baseUrl + 'admin/groupe/admin_banque/list/' + idADmin
            }).then(function successCallback(response) {
                $scope.loading = false;
                $scope.bankGrps = response.data.group_list;
                ////console.log($scope.bankGrps);
                $scope.isReadyDataBkbankGrps = true;
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        listGrpeBank();

        $scope.editUserBank = function(users) {
            //$scope.idLocality = locality.idLocalite;
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_banque/updateUserBank.html',
                controller: 'popupBankController',
                resolve: {
                    selectedRow: function() {
                        return users;
                    }
                }
            });

        };

        $scope.suppUserBank = function(users) {
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_banque/deleteUserBank.html',
                controller: 'popupBankController',
                resolve: {
                    selectedRow: function() {
                        return users;
                    }
                }
            });

        };

        /**********************FIN USER BANK****************************/

        /*************************GROUP BANK****************************/
        $scope.addbKGroupe = function() {
            $scope.idGrpe = -1;
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_banque/register_op_adm_rhg.html',
                controller: 'popupBankController',
                resolve: {
                    selectedRow: function() {
                        return $scope.items;
                    }
                }
            });

            modalInstance.result.then(function(selectedItem) {
                $scope.selected = selectedItem;
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.editGroupeBank = function(groups) {
            $scope.idGrpe = groups.idGroupe;
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_banque/register_op_adm_rhg.html',
                controller: 'popupBankController',
                resolve: {
                    selectedRow: function() {
                        return groups;
                    }
                }
            });

        };
        $scope.suppGroupBank = function(groups) {
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_banque/deleteGroupeBank.html',
                controller: 'popupBankController',
                resolve: {
                    selectedRow: function() {
                        return groups;
                    }
                }
            });

        };

        $scope.openJuridiction = function(groups) {
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_banque/juridictionBank.html',
                controller: 'popupBankController',
                resolve: {
                    selectedRow: function() {
                        return groups;
                    }
                }
            });

            modalInstance.result.then(function(selectedItem) {
                $scope.selected = selectedItem;
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.addSpot = false;
        $scope.editSpot = false;
        $scope.suppSpot = false;
        $scope.addChang = false;
        $scope.editChang = false;
        $scope.suppChang = false;
        $scope.addDepot = false;
        $scope.editDepot = false;
        $scope.suppDepot = false;
        $scope.addEscom = false;
        $scope.editEscom = false;
        $scope.suppEscom = false;
        $scope.addTrans = false;
        $scope.editTrans = false;
        $scope.suppTrans = false;
        $scope.addChaine = false;
        $scope.editChaine = false;
        $scope.suppChaine = false;
        $scope.addNiv = false;
        $scope.editNiv = false;
        $scope.suppNiv = false;
        $scope.addGr = false;
        $scope.editGr = false;
        $scope.suppGr = false;


        /**
         * @function juridictionsUserSessionBank
         * @description This function allow to defined the rules and 
         * priority of the platform switch the user profil.
         */
        function juridictionsUserSessionBank() {
            $http({
                method: 'GET',
                //headers: {'Authorization': "'"+jeton+"'"},
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
                url: baseUrl + 'admin/juridiction_groupe/list/groupe/' + idGrp
            }).then(function successCallback(response) {
                //			//console.log(response.data.list_juridiction_groupe);
                for (var i = 0; i < response.data.list_juridiction_groupe.length; i++) {
                    switch (response.data.list_juridiction_groupe[i].juridictionId) {
                        case 10:
                            $scope.addGr = true;
                            break;
                        case 11:
                            $scope.editGr = true;
                            break;
                        case 12:
                            $scope.suppGr = true;
                            break;
                        case 13:
                            $scope.addChaine = true;
                            break;
                        case 14:
                            $scope.editChaine = true;
                            break;
                        case 15:
                            $scope.suppChaine = true;
                            break;
                        case 16:
                            $scope.addNiv = true;
                            break;
                        case 17:
                            $scope.editNiv = true;
                            break;
                        case 18:
                            $scope.suppNiv = true;
                            break;
                        case 37:
                            $scope.addEscom = true;
                            break;
                        case 38:
                            $scope.editEscom = true;
                            break;
                        case 39:
                            $scope.suppEscom = true;
                            break;
                        case 40:
                            $scope.addChang = true;
                            break;
                        case 41:
                            $scope.editChang = true;
                            break;
                        case 42:
                            $scope.suppChang = true;
                            break;
                        case 43:
                            $scope.addDepot = true;
                            break;
                        case 44:
                            $scope.editDepot = true;
                            break;
                        case 45:
                            $scope.suppDepot = true;
                            break;
                        case 46:
                            $scope.addTrans = true;
                            break;
                        case 47:
                            $scope.editTrans = true;
                            break;
                        case 48:
                            $scope.suppTrans = true;
                            break;
                        case 49:
                            $scope.addSpot = true;
                            break;
                        case 50:
                            $scope.editSpot = true;
                            break;
                        case 51:
                            $scope.suppSpot = true;
                            break;
                    }

                };
                ////console.log($scope.idJuridiction);
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        juridictionsUserSessionBank();
        /*************************FIN GROUP BANK************************/

        /******************CATEGORIES ET DOCUMENTS BANK****************/

        /**
         * @function addCategorieBank
         * @description This function allow to show form addCategorie.
         */
        $scope.addCategorieBank = function() {
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_banque/register_esp_mesdocc.html',
                controller: 'popupBankController',
                resolve: {
                    selectedRow: function() {
                        return $scope.items;
                    }
                }
            });
            modalInstance.result.then(function(selectedItem) {
                $scope.selected = selectedItem;
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
        //$scope.folder = '';

        /**
         * @function editCategorie
         * @description This function allow to show template editCategorie.
         */
        $scope.editCategorie = function() {
            var categorie = $scope.recupCateg;
            //		//console.log("categorie.........."+categorie);
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_banque/register_esp_mesdocc.html',
                controller: 'popupBankController',
                resolve: {
                    selectedRow: function() {
                        return categorie;
                    }
                }
            });
            modalInstance.result.then(function(selectedItem) {
                $scope.selected = selectedItem;
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        /**
         * @function suppCategorie
         * @description This function allow to show template suppCategorie.
         */
        $scope.suppCategorie = function() {
            var categorie = $scope.recupCateg;
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_banque/deleteCategorie.html',
                controller: 'bankSuppController',
                resolve: {
                    selectedRow: function() {
                        return categorie;
                    }
                }
            });

        };

        /**
         * @function editSsCategorie
         * @description This function allow to show template editSsCategorie.
         */
        $scope.editSsCategorie = function() {
            var sscategorie = $scope.recupSscat;
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_banque/registerSousCategorie.html',
                controller: 'popupBankController',
                resolve: {
                    selectedRow: function() {
                        return sscategorie;
                    }
                }
            });
            modalInstance.result.then(function(selectedItem) {
                $scope.selected = selectedItem;
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
        $scope.suppSsCategorie = function() {
            var sscategorie = $scope.recupSscat;
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_banque/deleteCategorie.html',
                controller: 'bankSuppController',
                resolve: {
                    selectedRow: function() {
                        return sscategorie;
                    }
                }
            });
        };
        $scope.addSousCategorieBank = function() {
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_banque/registerSousCategorie.html',
                controller: 'popupBankController',
                resolve: {
                    selectedRow: function() {
                        return $scope.items;
                    }
                }
            });
            modalInstance.result.then(function(selectedItem) {
                $scope.selected = selectedItem;
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
        $scope.addDocumentBank = function() {
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_banque/register_esp_mesdocd.html',
                controller: 'popupBankController',
                resolve: {
                    selectedRow: function() {
                        return $scope.items;
                    }
                }
            });
            modalInstance.result.then(function(selectedItem) {
                $scope.selected = selectedItem;
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
        $scope.publishBankdoc = function() {
            ////console.log("get document..."+$scope.getDoc);
            var docuss = $scope.recupDocc;
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_banque/publishDocBank.html',
                controller: 'DocsBankController',
                resolve: {
                    selectedRow: function() {
                        return docuss;
                    }
                }
            });
            modalInstance.result.then(function(selectedItem) {
                $scope.selected = selectedItem;
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
        $scope.rangerBankdoc = function() {
            ////console.log("get document..."+$scope.getDoc);
            var docuss = $scope.recupDocc;
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_banque/rangerDocumentBank.html',
                controller: 'popupBankController',
                resolve: {
                    selectedRow: function() {
                        return docuss;
                    }
                }
            });
            modalInstance.result.then(function(selectedItem) {
                $scope.selected = selectedItem;
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
        $scope.suppDocs = function() {
            var docuss = $scope.recupDocc;
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_banque/deleteDocs.html',
                controller: 'DocsBankController',
                resolve: {
                    selectedRow: function() {
                        return docuss;
                    }
                }
            });
        };
        $scope.suppDocRecu = function() {
            var docuss = $scope.getDoc;
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_banque/deleteDocRecu.html',
                controller: 'SuppDocsBankController',
                resolve: {
                    selectedRow: function() {
                        return docuss;
                    }
                }
            });
        };
        /********************Recherche doc*****************************/
        //$scope.resultatDocBank = [];
        function listDocumentSearch() {
            //$scope.recupIdcat=idCat;
            $http({
                method: 'GET',
                //headers: {'Authorization': "'"+jeton+"'"},
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
                url: baseUrl + 'mon_espace/documents/list_created/' + idADmin,
            }).then(function successCallback(response) {
                $scope.resultatDocBank = response.data.created_documents_list;
                return $scope.resultatDocBank;
                ////console.log($scope.resultatDocBank);
                $scope.recherche = {};

                $scope.resetFilters = function() {
                    // needs to be a function or it won't trigger a $watch
                    $scope.recherche = {};
                };

                // pagination controls
                $scope.currentPage = 1;
                $scope.totalItems = $scope.resultatDocBank.length;
                $scope.entryLimit = 8; // items per page
                $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);

                // $watch search to update pagination
                $scope.$watch('recherche', function(newVal, oldVal) {
                    $scope.filtered = filterFilter($scope.resultatDocBank, newVal);
                    $scope.totalItems = $scope.filtered.length;
                    $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
                    $scope.currentPage = 1;
                }, true);
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
            //return $scope.recupIdcat;
        };

        $scope.show = false;

        listDocumentSearch();

        function listDocRecuSearch() {
            $http({
                method: 'GET',
                //headers: {'Authorization': "'"+jeton+"'"},
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
                url: baseUrl + 'mon_espace/documents/list_received_search/' + idADmin,
            }).then(function successCallback(response) {
                $scope.docBankRecuListSearch = response.data.received_documents_list;
                return $scope.docBankRecuListSearch;
                ////console.log($scope.docBankRecuListSearch);
                $scope.rechercheDoc = {};

                $scope.resetFilters = function() {
                    // needs to be a function or it won't trigger a $watch
                    $scope.rechercheDoc = {};
                };

                // pagination controls
                $scope.currentPage = 1;
                $scope.totalItems = $scope.docBankRecuListSearch.length;
                $scope.entryLimit = 8; // items per page
                $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);

                // $watch search to update pagination
                $scope.$watch('rechercheDoc', function(newVal, oldVal) {
                    $scope.filtered = filterFilter($scope.docBankRecuListSearch, newVal);
                    $scope.totalItems = $scope.filtered.length;
                    $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
                    $scope.currentPage = 1;
                }, true);
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        listDocRecuSearch();

        $scope.showRecherche = function() {
            //console.log('hello search is comming soon...'); 
            $state.go('app.search-document');
            //listDocumentSearch();
        };

        $scope.showRechercheDocRecu = function() {
            //console.log('hello search doc reçu is comming soon...'); 
            $state.go('app.search-document-recu');
            //listDocumentSearch();
        };

        //$scope.docBankRecuListSearch = []

        /********************END Recherche doc************************/
        $scope.entCategorie = [];

        function listCategorie() {
            $http({
                method: 'GET',
                //headers: {'Authorization': "'"+jeton+"'"},
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
                url: baseUrl + 'mon_espace/category/list_user/' + idADmin,
            }).then(function successCallback(response) {
                //$scope.entCategorie = response.data.category_list;
                for (var i = 0; i < response.data.category_list.length; i++) {
                    if (response.data.category_list[i].parent === null) {
                        $scope.entCategorie.push(response.data.category_list[i]);
                    }
                }
                ////console.log($scope.entCategorie);
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        listCategorie();

        $scope.sousCatList = [];
        $scope.listSousCategorie = function(idCat) {
            //console.log(idCat);
            $http({
                method: 'GET',
                //headers: {'Authorization': "'"+jeton+"'"},
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
                url: baseUrl + 'mon_espace/category/list_sous_category/' + parseInt(idCat),
            }).then(function successCallback(response) {
                $scope.sousCatList = response.data.sous_category_list;
                //			//console.log($scope.sousCatList);
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        $scope.recupCateg = '';
        $scope.listSsCatandDocByCat = function(idCat, categ, fold) {
            $scope.recupCateg = fold;
            //		//console.log(fold);
            $scope.nomCate = categ;
            $scope.boolSsCat = false;
            $scope.boolDoc = false;
            $scope.boolCat = true;
            $state.go('app.mes-docs.visualbk', { fold: categ });
            $scope.listSousCategorie(idCat);
            $scope.listDocumentByCat(idCat);
        };

        /*****************DOCS VISUAL***********************/
        $scope.loadDoc = '';

        $scope.id = $stateParams.id;
        $scope.name = $stateParams.name;
        $scope.named = $stateParams.named;
        $scope.url_ = $stateParams.url_;
        $scope.docClickedSrc = baseDocUrl + $scope.url_;

        $scope.trustSrc = function(src) {
            return $sce.trustAsResourceUrl(src);
        };
        /*****************END DOCS VISUAL*******************/
        $scope.getUrldoc = null;
        $scope.boolDoc = false;
        $scope.boolCat = false;
        $scope.boolSsCat = false;
        $scope.getDoc = '';
        $scope.recupDocc = '';
        //	$scope.catDocEntDetail=function(docSelect,a,b,c,d){
        //	// document.getElementById("accords").style.backgroundColor='#1065a8';
        //	//console.log("docSelect ",docSelect);
        //	$scope.nomDoc_=b;
        //	$scope.idClickedDoc=parseInt(d);
        //	$scope.infoDocumt=docSelect;
        //	$scope.isCatClicked=false;
        //	$scope.isSubCatClicked=false;
        //	$scope.isDocClicked=true;
        //	if ($scope.$root && !$scope.$root.$$phase) {
        //	$scope.$apply();
        //	};
        //	$state.go('app.adminent_op_esp_mesdoc.visualent_bynamedoc',{name : a, named : b, url_ : c, id : d});
        //	$rootScope.$broadcast('documentclicked', {document_ : docSelect});
        //	};

        $scope.boolAudit = false;
        $scope.goToVisual = function(event, doc) {
            $scope.boolDoc = true;
            $scope.boolAudit = true;
            console.log($scope.boolDoc);
            $rootScope.$broadcast('docclicOk', { d: doc.idDocuments });
            //$rootScope.$emit("boolDocumentAudit", {});
            console.log(doc);
            $scope.getDoc = doc.idDocuments;
            $scope.recupDocc = doc;
            //$scope.boolDoc = true;
            $scope.idClickedDoc = parseInt(doc.idDocuments);
            $scope.infoDocumt = doc;
            $scope.getUrldoc = doc.urlDocument;
            if ($scope.$root && !$scope.$root.$$phase) {
                $scope.$apply();
            };
            $state.go('app.mes-docs.visualbk_byname', { name: $scope.nom, named: doc.nom, url_: doc.urlDocument, id: doc.idDocuments });
            $rootScope.$broadcast('documentclicked', { document_: doc });
        };
        $scope.catDocBankDetail = function(doc, nom, id, url, cat) {
            //console.log(url);
            $scope.getDoc = id;
            $scope.recupDocc = doc;
            //console.log($scope.getDoc);
            $scope.nameDoc = nom;
            $scope.boolCat = false;
            $scope.boolSsCat = false;
            $scope.boolDoc = true;
            $scope.idClickedDoc = parseInt(id);
            $scope.infoDocumt = doc;
            $scope.getUrldoc = url;
            if ($scope.$root && !$scope.$root.$$phase) {
                $scope.$apply();
            };
            $state.go('app.mes-docs.visualbk_byname', { name: cat, named: nom, url_: url, id: id });
            $rootScope.$broadcast('documentclicked', { document_: doc });
        };
        $scope.boolDocRecu = false;
        $scope.docBankRecuDetail = function(doc, nom, url, id) {
            $scope.boolDocRecu = true;
            $scope.getDocAudit = doc;
            $scope.getDoc = id;
            $scope.recupDocc = doc;
            $scope.nameDoc = nom;
            $scope.idClickedDoc = parseInt(id);
            //$scope.infoDocumt=doc;
            $scope.getUrldoc = url;
            if ($scope.$root && !$scope.$root.$$phase) {
                $scope.$apply();
            };
            $state.go('app.docs-recus-bk.visualbk_byname', { name: 'named', named: nom, url_: url, id: id });
            $rootScope.$broadcast('documentclicked', { document_: doc });

        };

        //	$scope.$watch('getUrldoc', function (rec1,rec2) {
        //	if(rec1){
        //	$scope.loadDoc =baseDocUrl+rec1;
        //	//console.log($scope.loadDoc);
        //	};
        //	});


        $scope.DocsCatList = [];
        $scope.recupIdcat = null;
        $scope.listDocumentByCat = function(idCat) {
            $scope.recupIdcat = idCat;
            ////console.log($scope.recupIdcat);
            $http({
                method: 'GET',
                //headers: {'Authorization': "'"+jeton+"'"},
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
                url: baseUrl + 'mon_espace/documents/list/' + idADmin + '/' + parseInt($scope.recupIdcat),
            }).then(function successCallback(response) {
                $scope.DocsCatList = response.data.documents_list;
                //			//console.log($scope.DocsCatList);
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
            return $scope.recupIdcat;
        };
        //$scope.docSsCatList = [];
        $scope.recupSscat = '';
        $scope.listDocbySscat = function(idssCat, sscateg, sscat) {
            $scope.recupSscat = sscat;
            $scope.nomSsCat = sscateg;
            $scope.boolCat = false;
            $scope.boolDoc = false;
            $scope.boolSsCat = true;
            $state.go('app.mes-docs.visualbk', { fold: sscateg });
            //console.log(idssCat);
            $http({
                method: 'GET',
                //headers: {'Authorization': "'"+jeton+"'"},
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
                url: baseUrl + 'mon_espace/documents/list/' + idADmin + '/' + parseInt(idssCat),
            }).then(function successCallback(response) {
                $scope.documentsUserBank = response.data.documents_list;
                ////console.log($scope.documentsUserBank);
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
            return $scope.recupIdcat;
        };
        //$scope.documentsUserBank = [];
        $scope.$watch('recupIdcat', function(rec1, rec2) {
            if (rec1) {
                $http({
                    method: "GET",
                    url: baseUrl + 'mon_espace/documents/list/' + idADmin + '/' + rec1,
                    data: {},
                    headers: { 'Authorization': 'Bearer ' + jeton }
                }).then(function(response) {
                    $scope.documentsUserBank = response.data.documents_list;
                    ////console.log($scope.documentsUserBank);
                }).catch(function(err) {
                    if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                        deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                            $location.url('/access/login');
                            $state.go('access.login');
                        }).catch(function(response) {});
                    };
                });
            };
        });
        $scope.boolRecu = false;
        $scope.listEntrpriseDoc = [];

        function listEntrepriseLocality() {
            $http({
                method: 'GET',
                //headers: {'Authorization': "'"+jeton+"'"},
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
                url: baseUrl + 'mon_espace/documents/list_institution_received/' + idADmin,
            }).then(function successCallback(response) {
                $scope.listEntrpriseDoc = response.data.received_documents_institution_list;
                ////console.log($scope.listEntrpriseDoc);
                //			if(response.data.received_documents_institution_list!=undefined){

                //			}
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        listEntrepriseLocality();

        $scope.docBankRecuList = [];
        $scope.mesdocRecus = [];
        $scope.getDocsRecu = function(nomInstitut, idEntreprise) {
            $scope.boolDocRecu = false;
            //console.log("idEntreprise::"+idEntreprise)
            $state.go('app.docs-recus-bk.visual_recu', { fold: nomInstitut });
            //listDocsBankRecu();
            $http({
                method: 'GET',
                //headers: {'Authorization': "'"+jeton+"'"},
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
                url: baseUrl + 'mon_espace/documents/list_received/' + idADmin,
            }).then(function successCallback(response) {
                $scope.docBankRecuList = response.data.received_documents_list;
                $scope.lesdocRecus = $scope.docBankRecuList.filter(function(idIns) {
                    return idIns.documents.category.userIdUtilisateur.groupeIdGroupe.institution.idInstitution === parseInt(idEntreprise);
                });
                //			$scope.mesdocRecus = $scope.docBankRecuList.filter(function(idIns) {
                //			return idIns.documents.category.userIdUtilisateur.groupeIdGroupe.institution.idInstitution ===parseInt(idEntreprise);
                //			});
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };

        function listDocsBankRecu() {
            //		$http({
            //		method : 'GET',
            //		url : baseUrl+'mon_espace/documents/list_received/'+idADmin,
            //		}).then(function successCallback(response) {
            //		//$scope.docBankRecuList = response.data.received_documents_list;
            //		for(var i=0; i<response.data.received_documents_list.length; i++){
            //		if(response.data.received_documents_list[i].documents.category.userIdUtilisateur.groupeIdGroupe.institution.idInstitution ===parseInt(idEntreprise)){ 
            //		$scope.docBankRecuList.push(response.data.bank_users_list[i]);
            //		}
            //		}
            //		}, function errorCallback(response) {
            //		//console.log(response.statusText);
            //		});
            //		return $scope.recupIdcat;
        };

        /***************FIN CATEGORIES ET DOCUMENTS BANK**********************/

        /*******************DEBUT NOS TAUX BANK***************************/
        $scope.tauxduJour = [];
        //	$scope.tauxSpot = [];
        //	$scope.tauxChange = [];
        //	$scope.tauxTransfert = [];
        //	$scope.tauxDepot = [];
        //	$scope.tauxEscompte = [];
        $rootScope.$on("CallTaux", function() {
            $scope.listTauxduJourCall();
        });

        $scope.listTauxduJourCall = function() {
            //$scope.isDataReadyTaux = false;
            $http({
                method: 'GET',
                //headers: {'Authorization': "'"+jeton+"'"},
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
                url: baseUrl + 'mon_espace/bank/rate_of_day/list/' + idADmin
            }).then(function successCallback(response) {
                $scope.tauxduJour = response.data.rate_day_list;
                //console.log("taux.."+$scope.tauxduJour);
                $scope.tauxSpot = $scope.tauxduJour.filter(function(taux) {
                    return taux.produitsIdProduits.nom == 'SPOT';
                });
                ////console.log("taux.."+$scope.tauxSpot);
                $scope.tauxChange = $scope.tauxduJour.filter(function(taux) {
                    return taux.produitsIdProduits.nom == 'CHANGE';
                });
                $scope.tauxDepot = $scope.tauxduJour.filter(function(taux) {
                    return taux.produitsIdProduits.nom == 'DEPOT A TERME';
                });
                $scope.tauxTransfert = $scope.tauxduJour.filter(function(taux) {
                    return taux.produitsIdProduits.nom == 'TRANSFERT';
                });
                $scope.tauxEscompte = $scope.tauxduJour.filter(function(taux) {
                    return taux.produitsIdProduits.nom == 'ESCOMPTE';
                });
                $scope.isDataReadyTaux = true;
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };

        function listTauxduJour() {
            $scope.loading = true;
            $scope.isDataReadyTaux = false;
            $http({
                method: 'GET',
                //headers: {'Authorization': "'"+jeton+"'"},
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
                url: baseUrl + 'mon_espace/bank/rate_of_day/list/' + idADmin
            }).then(function successCallback(response) {
                $scope.loading = false;
                $scope.tauxduJour = response.data.rate_day_list;
                if ($scope.tauxduJour != undefined) {
                    $scope.tauxSpot = $scope.tauxduJour.filter(function(taux) {
                        return taux.produitsIdProduits.nom == 'SPOT';
                    });
                    ////console.log("taux.."+$scope.tauxSpot);
                    $scope.tauxChange = $scope.tauxduJour.filter(function(taux) {
                        return taux.produitsIdProduits.nom == 'CHANGE';
                    });
                    $scope.tauxDepot = $scope.tauxduJour.filter(function(taux) {
                        return taux.produitsIdProduits.nom == 'DEPOT A TERME';
                    });
                    $scope.tauxTransfert = $scope.tauxduJour.filter(function(taux) {
                        return taux.produitsIdProduits.nom == 'TRANSFERT';
                    });
                    $scope.tauxEscompte = $scope.tauxduJour.filter(function(taux) {
                        return taux.produitsIdProduits.nom == 'ESCOMPTE';
                    });
                }
                //			//console.log("taux.."+$scope.tauxduJour);

                $scope.isDataReadyTaux = true;
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        listTauxduJour();
        /****************SHOW TAUX SPOT***********/
        $scope.addTauxSpot = function() {
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_banque/register_esp_admin_cr.html',
                controller: 'MarcheBankController',
                resolve: {
                    selectedRow: function() {
                        return $scope.items;
                    }
                }
            });
            modalInstance.result.then(function(selectedItem) {
                $scope.selected = selectedItem;
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
        $scope.editTauxSpot = function(taux) {
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_banque/register_esp_admin_cr.html',
                controller: 'MarcheBankController',
                resolve: {
                    selectedRow: function() {
                        return taux;
                    }
                }
            });
        };
        $scope.suppTauxSpot = function(taux) {
            //$scope.idDemande = demand.idDemande;
            ////console.log($scope.idDemande);
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_banque/deleteTauxSpot.html',
                controller: 'MarcheBankController',
                resolve: {
                    selectedRow: function() {
                        return taux;
                    }
                }
            });

        };
        /*****************END TAUX SPOT**************/

        /*****************DEBUT TAUX CHANGE*********/
        $scope.addTauxChange = function() {
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_banque/register_esp_admin_cc.html',
                controller: 'MarcheBankController',
                resolve: {
                    selectedRow: function() {
                        return $scope.items;
                    }
                }
            });
            modalInstance.result.then(function(selectedItem) {
                $scope.selected = selectedItem;
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
        $scope.editTauxChange = function(taux) {
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_banque/register_esp_admin_cc.html',
                controller: 'MarcheBankController',
                resolve: {
                    selectedRow: function() {
                        return taux;
                    }
                }
            });
        };
        $scope.suppTauxChange = function(taux) {
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_banque/deleteTauxChange.html',
                controller: 'MarcheBankController',
                resolve: {
                    selectedRow: function() {
                        return taux;
                    }
                }
            });
        };
        /*****************END TAUX CHANGE**********/

        /**************DEBUT TAUX DEPOT************/
        $scope.addTauxDepot = function() {
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_banque/register_esp_admin_dep.html',
                controller: 'MarcheBankController',
                resolve: {
                    selectedRow: function() {
                        return $scope.items;
                    }
                }
            });
            modalInstance.result.then(function(selectedItem) {
                $scope.selected = selectedItem;
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
        $scope.editTauxDepot = function(taux) {
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_banque/register_esp_admin_dep.html',
                controller: 'MarcheBankController',
                resolve: {
                    selectedRow: function() {
                        return taux;
                    }
                }
            });
        };
        $scope.suppTauxDepot = function(taux) {
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_banque/deleteTauxDepot.html',
                controller: 'MarcheBankController',
                resolve: {
                    selectedRow: function() {
                        return taux;
                    }
                }
            });
        };
        /**************FIN TAUX DEPOT**************/

        /**************DEBUT TAUX TRANSFERT*********/
        $scope.addTauxTransfert = function() {
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_banque/register_esp_admin_tr.html',
                controller: 'MarcheBankController',
                resolve: {
                    selectedRow: function() {
                        return $scope.items;
                    }
                }
            });
            modalInstance.result.then(function(selectedItem) {
                $scope.selected = selectedItem;
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
        $scope.editTauxTransfert = function(taux) {
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_banque/register_esp_admin_tr.html',
                controller: 'MarcheBankController',
                resolve: {
                    selectedRow: function() {
                        return taux;
                    }
                }
            });
        };
        $scope.suppTauxTransfert = function(taux) {
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_banque/deleteTauxTransfert.html',
                controller: 'MarcheBankController',
                resolve: {
                    selectedRow: function() {
                        return taux;
                    }
                }
            });
        };
        /**************FIN TAUX TRANSFERT***********/
        /*******************FIN NOS TAUX BANK****************************/
    }
]);
/*********************************************************************/

app.controller('DocsBankControllerRecu', ['$scope', '$rootScope', '$uibModalInstance', '$filter', '$interval', '$log', '$state', '$http', 'selectedRow', 'deconnectApi',
    function($scope, $rootScope, $modalInstance, $filter, $interval, $log, $state, $http, selectedRow, deconnectApi) {

        var idADmin = sessionStorage.getItem("iduser");
        var idInstitution = sessionStorage.getItem("idInstitution");
        var idloc = sessionStorage.getItem("idloc");
        var idGrp = sessionStorage.getItem("idGrp");
        $scope.spinner = "loading.gif";
        $scope.selectedRowDoc = selectedRow;
        $scope.errorMessage = null;

        $scope.allUserShared = [];
        listUserShared();

        if ($scope.selectedRowDoc != undefined) {
            $scope.auteur = $scope.selectedRowDoc.documents.category.userIdUtilisateur.nom + "  " +
                $scope.selectedRowDoc.documents.category.userIdUtilisateur.prenom;
            $scope.cree = $scope.selectedRowDoc.documents.dateDocument;
        }

        function listUserShared() {
            $http({
                method: 'GET',
                //headers: {'Authorization': "'"+jeton+"'"},
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
                url: baseUrl + 'mon_espace/documents/list_users_shared/' + parseInt(idADmin) + '/' + $scope.selectedRowDoc.documents.idDocuments,
            }).then(function successCallback(response) {
                $scope.allUserShared = response.data.received_documents_list;
                if ($scope.allUserShared.length != 0) {
                    if (response.data.received_documents_list[0].datePublication != null) {
                        $scope.publier = response.data.received_documents_list[0].datePublication;
                    } else {
                        $scope.publier = " ";
                    }
                }
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };

        function _error(response) {
            console.log(response.statusText);
        };
        $scope.ok = function() {
            $scope.selectedRow = null;
            $modalInstance.close();
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    }
]);
/************************CONTROLLER DOCS BANK*************************/
/*********************************************************************/
app.controller('DocsBankController', ['$scope', '$rootScope', '$uibModalInstance', '$filter', '$interval', '$log', '$state', '$http', 'selectedRow', 'deconnectApi',
    function($scope, $rootScope, $modalInstance, $filter, $interval, $log, $state, $http, selectedRow, deconnectApi) {

        var idADmin = sessionStorage.getItem("iduser");
        var idInstitution = sessionStorage.getItem("idInstitution");
        var idloc = sessionStorage.getItem("idloc");
        var idGrp = sessionStorage.getItem("idGrp");
        $scope.spinner = "loading.gif";
        $scope.selectedRowDoc = selectedRow;
        var jeton = localStorage.getItem("jeton");
        $scope.errorMessage = null;
        ////console.log("selected doc..."+$scope.selectedRowDoc);
        $scope.listEntrpriseLocal = [];
        $scope.listEntrprise = [];

        function listEntrepriseLocality() {
            $http({
                method: 'GET',
                //headers: {'Authorization': "'"+jeton+"'"},
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
                url: baseUrl + 'admin/entreprise/locality/' + idloc,
            }).then(function successCallback(response) {
                $scope.listEntrpriseLocal = response.data.list_enterprises;
                $scope.listEntrprise = response.data.list_enterprises;
                //$scope.changeEntSPEC([74,88]);
                //					//console.log($scope.listEntrprise);
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        listEntrepriseLocality();

        function listEntrepriseLocalitySupp() {
            $http({
                method: 'GET',
                //headers: {'Authorization': "'"+jeton+"'"},
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
                url: baseUrl + 'admin/entreprise/locality/' + idloc,
            }).then(function successCallback(response) {
                $scope.listEntrpriseLocal = response.data.list_enterprises;
                $scope.listEntrprise = response.data.list_enterprises;
                for (var i = 0; i < response.data.list_enterprises.length; i++) {
                    for (var j = 0; j < $scope.listEntrprise.length; j++) {
                        if ($scope.listEntUsers[j].idUtilisateur == response.data.list_users[i].idUtilisateur) {
                            if (i == response.data.list_users.length - 1) {
                                $scope.compter = true;
                            };
                            //$scope.changeUserEnt($scope.listEntUsers[j].idUtilisateur);
                            $scope.listEntUsers.splice(j, 1);
                        };
                    };
                };
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };

        $scope.allUserShared = [];
        listUserShared();

        if ($scope.selectedRowDoc != undefined) {
            $scope.auteur = $scope.selectedRowDoc.category.userIdUtilisateur.nom + "  " +
                $scope.selectedRowDoc.category.userIdUtilisateur.prenom;
            $scope.cree = $scope.selectedRowDoc.dateChargement;
        }

        function listUserShared() {
            $http({
                method: 'GET',
                //headers: {'Authorization': "'"+jeton+"'"},
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
                url: baseUrl + 'mon_espace/documents/list_users_shared/' + parseInt(idADmin) + '/' + $scope.selectedRowDoc.idDocuments,
            }).then(function successCallback(response) {
                $scope.allUserShared = response.data.received_documents_list;
                if ($scope.allUserShared.length != 0) {
                    if (response.data.received_documents_list[0].datePublication != null) {
                        $scope.publier = response.data.received_documents_list[0].datePublication;
                    } else {
                        $scope.publier = " ";
                    }
                }
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };

        $scope.docRecup = [];
        $scope.tabUtils = [];
        $scope.tabInsUtils = [];
        $scope.isInfoDocPublish = false;
        $scope.infoDocPublishIdUser = [];

        function recupPublish() {
            $http({
                method: 'GET',
                //headers: {'Authorization': "'"+jeton+"'"},
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
                url: baseUrl + 'mon_espace/documents/publish_list/' + parseInt(idADmin) + '/' + $scope.selectedRowDoc.idDocuments
            }).then(function successCallback(response) {
                ////console.log("response.data...",response);

                $scope.tabUtils = response.data.document_publish_list.tabUtils;
                $scope.tabIns = response.data.document_publish_list.tabIns;
                if ($scope.tabUtils.length != 0) {
                    for (var i = 0; i < $scope.tabUtils.length; i++) {
                        $scope.changeUser($scope.tabUtils[i]);
                    }
                } else {
                    for (var i = 0; i < $scope.bankUsers.length; i++) {
                        $scope.changeUser($scope.bankUsers[i].idUtilisateur);
                    }
                };
                if ($scope.tabIns.length != 0) {
                    for (var i = 0; i < $scope.tabIns.length; i++) {
                        $scope.changeEntSPEC($scope.tabIns[i]);
                    }
                }
                $scope.tabInsUtils = response.data.document_publish_list.tabInsUtils;
                if ($scope.tabInsUtils.length != 0) {
                    $scope.isInfoDocPublish = true;
                    //						for(var i = 0; i<$scope.tabInsUtils.length;i++){
                    //						$scope.changeEntSPEC($scope.tabInsUtils[i].ins);
                    //						//console.log($scope.tabInsUtils[i].ins);
                    //						$scope.changeUserEnt($scope.tabInsUtils[i].utils);
                    //						//console.log($scope.tabInsUtils[i].utils);
                    //						};
                    for (var i = 0; i < response.data.document_publish_list.tabInsUtils.length; i++) {
                        for (var j = 0; j < response.data.document_publish_list.tabInsUtils[i].utils.length; j++) {
                            $scope.infoDocPublishIdUser.push(response.data.document_publish_list.tabInsUtils[i].utils[j]);
                        };

                        //							for(var k=0;k<response.data.document_publish_list.tabInsUtils[i].ins.length;k++){
                        //							$scope.changeEntSPEC(response.data.document_publish_list.tabInsUtils[i].ins[k]);
                        //							//$scope.infoDocPublishIdUser.push(response.data.document_publish_list.tabInsUtils[i].utils[j]);
                        //							};

                        $scope.changeEntSPEC(response.data.document_publish_list.tabInsUtils[i].ins);

                    };

                }

            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        recupPublish();

        //			if($scope.tabUtils.length<=0){
        //			//console.log("in if tabUtils...");
        //			listBankUsers();
        //			}else{
        //			//console.log("in else tabUtils...");
        //			listBankUsersUpdate();
        //			}
        listBankUsers();
        $scope.bankUsers = [];

        function listBankUsers() {
            $http({
                method: 'GET',
                //headers: {'Authorization': "'"+jeton+"'"},
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
                url: baseUrl + 'admin/bank/users/list/' + idInstitution
            }).then(function successCallback(response) {
                for (var i = 0; i < response.data.list_users.length; i++) {
                    if (response.data.list_users[i].idUtilisateur != idADmin) {
                        $scope.bankUsers.push(response.data.list_users[i]);
                        //$scope.changeUser(response.data.list_users[i].idUtilisateur);
                        //$scope.changeUser($scope.tabUtils);
                    }
                }
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        //listBankUsers();
        function listBankUsersUpdate() {
            $http({
                method: 'GET',
                //headers: {'Authorization': "'"+jeton+"'"},
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
                url: baseUrl + 'admin/bank/users/list/' + idInstitution
            }).then(function successCallback(response) {
                for (var i = 0; i < response.data.list_users.length; i++) {
                    if (response.data.list_users[i].idUtilisateur != idADmin) {
                        $scope.bankUsers.push(response.data.list_users[i]);
                        //$scope.changeUser(response.data.list_users[i].idUtilisateur);
                        $scope.changeUser($scope.tabUtils);
                    }
                }
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };

        $scope.listEntUsers = [];
        $scope.listEntrpriseUser = function(idINS) {
            //console.log("id..."+idINS);
            $scope.compter = false;
            $http({
                method: 'GET',
                //headers: {'Authorization': "'"+jeton+"'"},
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
                url: baseUrl + 'admin/entreprise/users/list/' + idINS
            }).then(function successCallback(response) {
                if ($scope.isInfoDocPublish) {
                    for (var i = 0; i < response.data.list_users.length; i++) {
                        $scope.listEntUsers.push(response.data.list_users[i]);
                        if ($scope.infoDocPublishIdUser.indexOf(response.data.list_users[i].idUtilisateur) != -1) {
                            $scope.changeUserEnt(response.data.list_users[i].idUtilisateur);
                        };
                    };
                } else {
                    for (var i = 0; i < response.data.list_users.length; i++) {
                        if (i == response.data.list_users.length - 1) {
                            $scope.compter = true;
                        };
                        $scope.listEntUsers.push(response.data.list_users[i]);
                        $scope.changeUserEnt(response.data.list_users[i].idUtilisateur);
                    };
                }
                ////console.log("Entreprise users......... ",response.data);
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };

        function listUsersEntrprisSupp(id) {
            $scope.compter = false;
            $http({
                method: 'GET',
                //headers: {'Authorization': "'"+jeton+"'"},
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
                url: baseUrl + 'admin/entreprise/users/list/' + id
            }).then(function successCallback(response) {
                $scope.compter = false;
                for (var i = 0; i < response.data.list_users.length; i++) {
                    for (var j = 0; j < $scope.listEntUsers.length; j++) {
                        if ($scope.listEntUsers[j].idUtilisateur == response.data.list_users[i].idUtilisateur) {
                            if (i == response.data.list_users.length - 1) {
                                $scope.compter = true;
                            };
                            //$scope.changeUserEnt($scope.listEntUsers[j].idUtilisateur);
                            $scope.listEntUsers.splice(j, 1);
                        };
                    };
                };
                // $scope.listBkUsers=$scope.listBkUsers;
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };

        /*SELECTION OF USERS MY BANK*/
        $scope.selectionb = [];
        $scope.changeUser = function(a) {
            var idx = $scope.selectionb.indexOf(a);
            if (idx > -1) {
                $scope.selectionb.splice(idx, 1);
            } else {
                $scope.selectionb.push(parseInt(a));
            }
            //console.log($scope.selectionb);
        };
        /*SELECTION OF ENTREPRISE LOCALITY*/
        $scope.selectionEN = [];
        $scope.changeENt = function(a) {
            var idx = $scope.selectionEN.indexOf(a);
            if (idx > -1) {
                $scope.selectionEN.splice(idx, 1);
            } else {
                $scope.selectionEN.push(parseInt(a));
            }
            //console.log($scope.selectionEN);

        };
        /*SELECTION OF ENTREPRISE SPECIFIQ*/
        $scope.selectionEntSpec = [];
        $scope.idInsDSpecific = null;
        $scope.changeEntSPEC = function(a) {
            var idx = $scope.selectionEntSpec.indexOf(a);
            if (idx > -1) {
                listUsersEntrprisSupp(parseInt(a));
                $scope.selectionEntSpec.splice(idx, 1);
            } else {
                $scope.listEntrpriseUser(a);
                $scope.selectionEntSpec.push(parseInt(a));
            }
            //console.log($scope.selectionEntSpec);
        };
        /*SELECTION OF USERS ENTREPRISE SPECIFIQ*/
        $scope.selectionUserEnt = [];
        $scope.changeUserEnt00 = function(a) {
            var idx = $scope.selectionUserEnt.indexOf(a);
            if (idx > -1) {
                $scope.selectionUserEnt.splice(idx, 1);
            } else {
                $scope.selectionUserEnt.push(parseInt(a));
            }
            //console.log($scope.selectionUserEnt);
        };
        $scope.tabInsUtilsPushed = [];

        $scope.changeUserEnt = function(a) {
            var insti = 0;
            var listInsUtils = null;
            modelPub.tabInsUtils = [];
            var idx = $scope.selectionUserEnt.indexOf(a);
            if (idx > -1) {
                $scope.selectionUserEnt.splice(idx, 1);
            } else {
                $scope.selectionUserEnt.push(parseInt(a));
            };
            if ($scope.compter) {
                for (var k = 0; k < $scope.selectionEntSpec.length; k++) {
                    $scope.selectionbku2 = [];
                    for (var i = 0; i < $scope.listEntUsers.length; i++) {
                        if ($scope.listEntUsers[i].groupeIdGroupe.institution.idInstitution == $scope.selectionEntSpec[k]) {
                            for (var j = 0; j < $scope.selectionUserEnt.length; j++) {
                                if ($scope.selectionUserEnt[j] == $scope.listEntUsers[i].idUtilisateur) {
                                    $scope.selectionbku2.push($scope.selectionUserEnt[j]);
                                    insti = $scope.selectionEntSpec[k];
                                };
                            };
                        };
                    };
                    if (insti != 0) {
                        listInsUtils = {
                            "ins": insti,
                            "utils": $scope.selectionbku2
                        };
                        modelPub.tabInsUtils.push(listInsUtils);
                    };
                    //console.log("$scope.tabInsUtilsPushed ",modelPub.tabInsUtils);
                };
            };
        };
        /*FIN*/
        var nb_s = 0;
        var nb_s2 = 0;
        var Lselectionbk2 = 0;
        var Lselectionbk2_2 = 0;
        var compteLong2 = 0;
        var id_institu = 0
        var nb_notzero = 0;
        var nb_notzero2 = 0;
        var nb_a = 0;
        $scope.changeBkUser = function(a) {
            $scope.isEmptyListUsers = false;
            var insti = 0;
            var listInsUtils = null;
            objet.tabInsUtils = [];
            var idx = $scope.selectionbku.indexOf(a);
            if (idx > -1) {
                $scope.selectionbku.splice(idx, 1);
            } else {
                $scope.selectionbku.push(parseInt(a));
            };

            if ($scope.infoDocPublishArray.tabUtils.length != 0 || $scope.infoDocPublishArray.tabInsUtils.length != 0) {
                // //console.log("Vérification success ");
            };

            if ($scope.listBkUsers.length != 0) {
                for (var k = 0; k < $scope.selectionbk2.length; k++) {
                    $scope.selectionbku2 = [];
                    for (var i = 0; i < $scope.listBkUsers.length; i++) {
                        if ($scope.listBkUsers[i].groupeIdGroupe.institution.idInstitution == $scope.selectionbk2[k]) {
                            for (var j = 0; j < $scope.selectionbku.length; j++) {
                                if ($scope.selectionbku[j] == $scope.listBkUsers[i].idUtilisateur) {
                                    $scope.selectionbku2.push($scope.selectionbku[j]);
                                    insti = $scope.selectionbk2[k];
                                };
                            };
                        };
                    };

                    if (insti != 0 && $scope.selectionbku2.length != 0) {
                        listInsUtils = {
                            "ins": insti,
                            "utils": $scope.selectionbku2
                        };
                        objet.tabInsUtils.push(listInsUtils);
                    };
                };

                for (var i = 0; i < objet.tabInsUtils.length; i++) {
                    if (objet.tabInsUtils[i].utils.length == 0) {
                        objet.tabInsUtils.splice(i, 1);
                    };
                };
            };
            if ($scope.listBkUsers.length != 0) {
                if ($scope.selectionbku.length == 0 && $scope.selectionbk2.length != 0) {
                    var nb_nb = 0;
                    var longueur = $scope.selectionbk2.length;
                    $scope.separotorChangeBkAttach2 = 1;
                    $scope.isEmptyListUsers = true;
                    for (var i = 0; i < $scope.selectionbk2.length; i++) {
                        nb_nb++;
                        $scope.changeBkAttach2($scope.selectionbk2[i]);
                    };
                    if (nb_nb == longueur) {
                        $scope.separotorChangeBkAttach2 = 0;
                        nb_nb = 0;
                    };
                    $scope.listBkUsers = [];
                    $scope.selectionbku = 0;
                    nb_a = 0;
                } else {
                    if (objet.tabInsUtils.length != 0 && $scope.selectionbk2.length != 0) {
                        var nb_nb = 0;
                        var longueur = $scope.selectionbk2.length;
                        var indexNotExit = [];
                        for (var i = 0; i < objet.tabInsUtils.length; i++) {
                            indexNotExit.push(objet.tabInsUtils[i].ins);
                        };

                        for (var i = 0; i < $scope.selectionbk2.length; i++) {
                            nb_nb++;
                            if (indexNotExit.indexOf($scope.selectionbk2[i]) == -1) {
                                $scope.separotorChangeBkAttach2 = 2;
                                $scope.changeBkAttach2($scope.selectionbk2[i]);
                            };
                        };

                        if (nb_nb == longueur) {
                            $scope.separotorChangeBkAttach2 = 0;
                            nb_nb = 0;
                        };
                        nb_a = 0;
                    } else if (objet.tabInsUtils.length == 0 && $scope.selectionbk2.length != 0) {
                        nb_a++;
                        if (nb_a == 1) {
                            var nb_nb = 0;
                            var longueur = $scope.selectionbk2.length;
                            $scope.separotorChangeBkAttach2 = 3;
                            for (var i = 0; i < $scope.selectionbk2.length; i++) {
                                nb_nb++;
                                $scope.changeBkAttach2($scope.selectionbk2[i]);
                            };

                            if (nb_nb == longueur) {
                                $scope.separotorChangeBkAttach2 = 0;
                                nb_nb = 0;
                            };
                            $scope.listBkUsers = [];
                            $scope.selectionbku = [];
                        };
                    };
                };

                $scope.suiviTabInsUtils = objet.tabInsUtils;
            };
        };

        $scope.modelPublish = {
            document: '',
            tabUtils: null,
            tabIns: null,
            tabInsUtils: []
        };
        var modelPub = {
            "document": parseInt($scope.selectedRowDoc.idDocuments),
            "tabUtils": $scope.selectionb,
            "tabIns": $scope.selectionEN,
            "tabInsUtils": []
        };

        $scope.disabl = false;
        $scope.publishDocument = function() {
            $scope.disabl = true;
            //console.log("publishDocument object.............loading "+$scope.selectedRowDoc.idDocuments);
            $scope.loading = true;
            //				$scope.modelPublish.document = parseInt($scope.selectedRowDoc.idDocuments);
            //				$scope.modelPublish.tabUtils = $scope.selectionb;
            //				$scope.modelPublish.tabIns = $scope.selectionEN;
            //				$scope.modelPublish.tabInsUtils= $scope.tabInsUtilsPushed;
            $http({
                    method: "POST",
                    url: baseUrl + 'mon_espace/documents/publier/' + parseInt(idADmin),
                    data: modelPub,
                    headers: { 'Authorization': 'Bearer ' + jeton }
                })
                .then(function(response) {
                    //console.log(response);
                    if (response.data.status == 0) {
                        $scope.loading = false;
                        $scope.errorMessage = null;
                        $modalInstance.dismiss('cancel');
                    } else {
                        $scope.errorMessage = response.data.message;
                    };
                    //console.log("success !!! ",response);
                    $state.reload();
                }).catch(function(err) {
                    if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                        deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                            $location.url('/access/login');
                            $state.go('access.login');
                        }).catch(function(response) {});
                    };
                });
        };

        $scope.confirmDeleteDocs = function() {
            $scope.loading = true;
            $scope.disabl = true;
            $http({
                    method: "DELETE",
                    url: baseUrl + 'mon_espace/documents/delete_file/' + parseInt(idADmin) + '/' + parseInt($scope.selectedRowDoc.idDocuments),
                    data: {},
                    headers: { 'Authorization': 'Bearer ' + jeton }
                })
                .then(function(data) {
                    //console.log(data);
                    if (data.data.status === 0) {
                        $scope.loading = false;
                        $state.reload();
                        $scope.ok();
                    } else {
                        //console.log("erreur de suppression..."+response);
                        $scope.errorMessage = response.data.message;
                    }
                }).catch(function(err) {
                    if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                        deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                            $location.url('/access/login');
                            $state.go('access.login');
                        }).catch(function(response) {});
                    };
                });
            //$scope.selectedRow = selectedRow;
        };

        function _error(response) {
            //console.log(response.statusText);
        };
        $scope.ok = function() {
            $scope.selectedRow = null;
            $modalInstance.close();
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };

    }
]);
/*********************************************************************/
/************************CONTROLLER POPUP BANK************************/
/*********************************************************************/
angular.module('app').controller('popupBankController', ['$scope', '$rootScope', '$uibModalInstance', '$filter', '$interval', '$log', '$state', '$http', '$timeout', 'selectedRow', 'deconnectApi',
    function($scope, $rootScope, $modalInstance, $filter, $interval, $log, $state, $http, $timeout, selectedRow, deconnectApi) {

        var idADmin = sessionStorage.getItem("iduser");
        var idInstitution = sessionStorage.getItem("idInstitution");
        var idloc = sessionStorage.getItem("idloc");
        var idGrp = sessionStorage.getItem("idGrp");
        var jeton = localStorage.getItem("jeton");

        $scope.isuserInsessionLine = 0;
        $scope.errorMessage = null;
        $scope.spinner = "loading.gif";
        var nomInstitution = sessionStorage.getItem("nomInstitution");
        $scope.disabl = false;

        /****************DEBUT OFFRE BANK*****************************/
        var pageTitile = localStorage.getItem('pagetitle');
        var idDemande;
        $scope.demandes = [];
        $scope.demandesbyProduit = [];

        $scope.idProduit = 0;
        $scope.idProduitSpot = 0;
        $scope.idProduitDepot = 0;
        $rootScope.boolean = false;
        $rootScope.booleanSpot = false;
        $rootScope.booleanDepot = false;

        listProduits();

        /**
         * @function listProduits
         * @description This function allow to list all products.
         * @returns $scope.etreasuryProduit:[]
         */
        function listProduits() {
            $http({
                method: 'GET',
                url: baseUrl + 'admin/product/list',
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
            }).then(function successCallback(response) {
                $scope.etreasuryProduit = response.data.list_products;
                for (var i = 0; i < $scope.etreasuryProduit.length; i++) {
                    if ($scope.etreasuryProduit[i].nom.indexOf(pageTitile.toUpperCase()) !== -1) {
                        $rootScope.boolean = true;
                        $scope.idProduit = $scope.etreasuryProduit[i].idProduits;
                    }
                    if ($scope.etreasuryProduit[i].nom.indexOf('SPOT') !== -1) {
                        $rootScope.booleanSpot = true;
                        $scope.idProduitSpot = $scope.etreasuryProduit[i].idProduits;
                    }
                    if ($scope.etreasuryProduit[i].nom.indexOf('TERME') !== -1) {
                        $rootScope.booleanDepot = true;
                        $scope.idProduitDepot = $scope.etreasuryProduit[i].idProduits;
                    }
                }
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        }

        $scope.$watch('boolean', function(bool1, bool2) {
            if (bool1) {
                allDemandListByProduit();
            };
        });

        $scope.demandesValid = [];
        //cette methode permet de retourner la liste des demandes par produit et banque

        /**
         * @function allDemandListByProduit
         * @description This function allow to list all request by product.
         * @returns $scope.etreasuryProduit:[]
         */
        function allDemandListByProduit() {
            $scope.isDataReadyBkReqbyProduitCh = false;
            $http({
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
                url: baseUrl + 'mes_operations/entreprise/request_has_bank/lists/' + idInstitution + '/' + $scope.idProduit
            }).then(function successCallback(response) {
                $scope.demandesbyProduit = response.data.list_request_has_bank;
                $scope.isDataReadyBkReqbyProduitCh = true;
                //					for(var i=0; i<$scope.demandesbyProduit.length; i++){
                //					if($scope.demandesbyProduit[i].isValid===true){
                //					$scope.demandesValid=$scope.demandesbyProduit[i];
                //					}
                //					}
                ////console.log($scope.demandesbyProduit);
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };

        $scope.$watch('booleanSpot', function(bool3, bool4) {
            if (bool3) {
                allDemandListByProduitSpot();
            };
        });
        $scope.demandesbyProduitSpot = [];

        function allDemandListByProduitSpot() {
            //$scope.isDataReadyBkReqbyProduitSpo = false;
            $http({
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
                url: baseUrl + 'mes_operations/entreprise/request_has_bank/lists/' + idInstitution + '/' + $scope.idProduitSpot
            }).then(function successCallback(response) {
                //$scope.isDataReadyBkReqbyProduitSpo = true;
                $scope.demandesbyProduitSpot = response.data.list_request_has_bank;
                ////console.log($scope.demandesbyProduitSpot);
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };


        $scope.$watch('booleanDepot', function(bool5, bool6) {
            if (bool5) {
                allDemandListByProduitDepot();
            };
        });
        $scope.demandesbyProduitDepot = [];

        /**
         * @function allDemandListByProduitDepot
         * @description This function allow to list all request by product Depot.
         * @returns $scope.demandesbyProduitDepot:[]
         */
        function allDemandListByProduitDepot() {
            $scope.isDataReadyBkdemandesbyProduitDepot = false;
            $http({
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
                url: baseUrl + 'mes_operations/entreprise/request_has_bank/lists/' + idInstitution + '/' + $scope.idProduitDepot
            }).then(function successCallback(response) {
                $scope.isDataReadyBkdemandesbyProduitDepot = true;
                $scope.demandesbyProduitDepot = response.data.list_request_has_bank;
                ////console.log($scope.demandesbyProduit);
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };

        /******************SUBMIT OFFRE BANK*******************************************/
        //var nomInstitution = sessionStorage.getItem("nomInstitution");

        /*********************Recuperation des details sur la demande*********************/

        $scope.offreByRequest = [];
        $scope.comiss = [];
        $scope.docus = [];
        $scope.idDoc = [];
        $scope.boolTest = false;

        $scope.offre = {
            offer: {
                taux: "",
                demandeIdDemande: -1,
                userBanqueIdUserBanque: -1,
                hasDocument: true
            },
            documents: -1,
            commissions: -1
        };

        $scope.offreEnAttentes = [];

        /**
         * @function lesOffresEnattente
         * @description This function allow to list all notification en attente.
         * @returns $scope.offreEnAttentes:[]
         */
        function lesOffresEnattente() {
            $http({
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
                url: baseUrl + 'validation_offer/list_notification_attente/' + idADmin
            }).then(function successCallback(response) {
                $scope.offreEnAttentes = response.data.requestNotifyList;
                //console.log($scope.offreEnAttentes);
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        /*********DEBUT RECUPERATION DES DETAILS DE LA DEMANDES QUR LA VALIDATION **********/
        $scope.selectedRowOffer = selectedRow;
        if ($scope.selectedRowOffer.demandeIdDemande != undefined) {
            $scope.idDemande = $scope.selectedRowOffer.demandeIdDemande.idDemande;
            //console.log($scope.idDemande);
            $scope.entOff = $scope.selectedRowOffer.demandeIdDemande.userEntreprise.groupeIdGroupe.institution.nom;
            $scope.datevallOff = $scope.selectedRowOffer.demandeIdDemande.dateValeur;
            $scope.datevallOffEscomp = $scope.selectedRowOffer.demandeIdDemande.dateEscompte;
            $scope.prdtOff = $scope.selectedRowOffer.demandeIdDemande.product.nom;
            $scope.monttOff = $scope.selectedRowOffer.demandeIdDemande.montant;
            $scope.deviseOff = $scope.selectedRowOffer.demandeIdDemande.devise.description;
            $scope.dateMatOff = $scope.selectedRowOffer.demandeIdDemande.dateMaturite;
            $scope.dateEchOff = $scope.selectedRowOffer.demandeIdDemande.dateEcheance;
            $scope.tauxMaxOff = $scope.selectedRowOffer.demandeIdDemande.tauxMax;
            $scope.tauxMinOff = $scope.selectedRowOffer.demandeIdDemande.tauxMin;
            $scope.courMaxOff = $scope.selectedRowOffer.demandeIdDemande.coursMax;
            $scope.banqueV = nomInstitution;

            $scope.$watch('dateMatOff', function(newValue) {
                $scope.dateMatOff = $filter('date')(newValue, 'dd/MM/yyyy');
            });
            $scope.$watch('dateEchOff', function(newValue) {
                $scope.dateEchOff = $filter('date')(newValue, 'dd/MM/yyyy');
            });
            $scope.$watch('datevallOff', function(newValue) {
                $scope.datevallOff = $filter('date')(newValue, 'dd/MM/yyyy');
            });
            $scope.$watch('datevallOffEscomp', function(newValue) {
                $scope.datevallOffEscomp = $filter('date')(newValue, 'dd/MM/yyyy');
            });

            /**
             * @function offreByIdDemdIdInstitut
             * @description This function allow to return object Offer by idDemande and idInstitution.
             * @returns $scope.offre, $scope.items,$scope.selectionDoc.
             */
            function offreByIdDemdIdInstitut() {
                $http({
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + jeton
                    },
                    url: baseUrl + 'mes_operations/entreprise/request_has_bank/list_offer/' + $scope.idDemande + '/' + idInstitution,
                }).then(function successCallback(response) {
                    $scope.offreByRequest = response.data.list_offer_by_request;
                    for (var i = 0; i <= $scope.offreByRequest.length; i++) {
                        $scope.offre = $scope.offreByRequest[i].offer;
                        $scope.items = $scope.offreByRequest[i].commissions;
                        $scope.selectionDoc = $scope.offreByRequest[i].documents;
                        break;
                    };
                    ////console.log($scope.selectionDoc)
                    $scope.notretaux = $scope.offre.taux;
                    $scope.doc = parseInt(1);
                    $scope.IsVisible = true;
                    ////console.log($scope.items);
                    ////console.log($scope.selectiond);
                    if ($scope.selectionDoc != undefined) {
                        for (var i = 0; i <= $scope.selectionDoc.length; i++) {
                            if ($scope.selectionDoc[i] != undefined) {
                                $scope.changeDocus($scope.selectionDoc[i].idDocuments);
                            }
                        }
                    }
                    //						for(var i=0;i<=$scope.selectionb.length;i++){
                    //						$scope.idDoc = $scope.selectionb[i].idDocuments;
                    //						break;
                    //						};

                }).catch(function(err) {
                    if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                        deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                            $location.url('/access/login');
                            $state.go('access.login');
                        }).catch(function(response) {});
                    };
                });
            };
            offreByIdDemdIdInstitut();


            $scope.offreUpdV = {
                offer: {
                    idOffre: -1,
                    taux: "",
                    demandeIdDemande: -1,
                    userBanqueIdUserBanque: -1,
                    hasDocument: true
                },
                documents: -1,
                commissions: -1
            };

            /**
             * @function updateOfferValid
             * @param notretaux
             * @description This function allow to update offer in tab validation.
             *
             */
            $scope.updateOfferValid = function(notretaux) {
                    $scope.disabl = true;
                    $scope.loading = true;
                    //console.log("ok........."+notretaux);
                    $scope.offreUpdV.offer.idOffre = $scope.selectedRowOffer.idOffre;
                    $scope.offreUpdV.offer.taux = notretaux;
                    $scope.offreUpdV.documents = $scope.selectiond;
                    $scope.offreUpdV.commissions = $scope.items;
                    $scope.offreUpdV.offer.demandeIdDemande = parseInt($scope.idDemande);
                    //console.log($scope.offreUpdV.offer.demandeIdDemande);
                    $scope.offreUpdV.offer.userBanqueIdUserBanque = parseInt(idADmin);
                    $scope.offreUpdV.offer.hasDocument = true;
                    $http({
                        method: "PUT",
                        url: baseUrl + 'mon_espace/bank/request/offer/update/' + parseInt(idADmin),
                        data: $scope.offreUpdV,
                        headers: { 'Authorization': 'Bearer ' + jeton }
                    }).then(function(response) {
                        $scope.status = response.data.status;
                        if ($scope.status === 0) {
                            $scope.loading = false;
                            //$state.reload();
                            $scope.ok();
                            $rootScope.$emit("OfferAttentesCall", {});
                            $scope.errorMessage = null;
                        } else {
                            $scope.errorMessage = response.data.message;
                        }
                        //console.log(response.data);
                    }).catch(function(err) {
                        if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                            deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                                $location.url('/access/login');
                                $state.go('access.login');
                            }).catch(function(response) {});
                        };
                    });
                }
                /******************DEBUT VALIDATION OFFRE***************************/
                //$scope.valider = {};
            $scope.validerOff = {
                offer: {
                    idOffre: -1,
                    taux: "",
                    demandeIdDemande: -1,
                    userBanqueIdUserBanque: -1,
                    hasDocument: true
                },
                status: null
            }

            /**
             * @function validerOffer
             * @description This function allow to validate offer in tab validation.
             *
             */
            $scope.validerOffer = function() {
                $scope.loading = true;
                $scope.disabl = true;
                $scope.validerOff.offer.taux = $scope.notretaux;
                $scope.validerOff.offer.hasDocument = true;
                $scope.validerOff.offer.demandeIdDemande = parseInt($scope.idDemande);
                $scope.validerOff.offer.userBanqueIdUserBanque = parseInt(idADmin);
                $scope.validerOff.offer.idOffre = $scope.selectedRowOffer.idOffre;
                $scope.validerOff.status = 1;
                console.log($scope.validerOff.offer.idOffre);
                $http({
                    method: "POST",
                    url: baseUrl + 'validation_offer/add/' + parseInt(idADmin),
                    data: $scope.validerOff,
                    headers: { 'Authorization': 'Bearer ' + jeton }
                }).then(function(response) {
                    $scope.status = response.data.status;
                    if ($scope.status === 0) {
                        $scope.loading = false;
                        $scope.errorMessage = null;
                        $scope.ok();
                        $rootScope.$emit("OfferAttentesCall", {});
                    } else {
                        $scope.errorMessage = response.data.message;
                    }
                    //console.log(response.data);
                }).catch(function(err) {
                    if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                        deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                            $location.url('/access/login');
                            $state.go('access.login');
                        }).catch(function(response) {});
                    };
                });
            };
            $scope.refuserOffer = function() {
                //					$scope.valider.offer.taux=$scope.notretaux;
                //					$scope.valider.offer.hasDocument =true;
                //					$scope.valider.offer.demandeIdDemande=parseInt($scope.idDemande);
                //					$scope.valider.offer.userBanqueIdUserBanque=parseInt(idADmin);
                //					$scope.valider.offer.idOffre = $scope.offre.idOffre;
                //					$scope.valider.status = 0;
                //					//console.log($scope.valider.offer.idOffre);
                //					$http.post(baseUrl+'validation_offer/add/'+parseInt(idADmin), $scope.valider)
                //					.then(function(response){
                //					$scope.status = response.data.status;
                //					if($scope.status===0){
                //					allDemandListByProduitSpot ();
                //					$state.reload();
                //					$scope.ok();
                //					$scope.errorMessage=null;
                //					}else{
                //					$scope.errorMessage=response.data.message;
                //					}
                //					//console.log(response.data);
                //					}),(function(err){
                //					consol.log(err);
                //					});
            };

            /******************FIN VALIDATION OFFRE***************************************/
        }
        $scope.selectedRowDmd = selectedRow;

        $scope.offreUpd = {
            offer: {
                idOffre: -1,
                taux: "",
                demandeIdDemande: -1,
                userBanqueIdUserBanque: -1,
                hasDocument: true
            },
            documents: -1,
            commissions: -1
        };

        $scope.changeNotreTaux = function(notretaux) {
            $scope.notretaux = notretaux;
        };

        /**
         * @function updateOffer
         * @description This function allow to update offer in tab Demande.
         *
         */
        $scope.updateOffer = function(notretaux) {
            //				$scope.changeNotreTaux();
            ////console.log("NEW TAUX........."+notretaux);
            $scope.disabl = true;
            $scope.loading = true;
            $scope.offreUpd.offer.idOffre = $scope.offre.idOffre;
            ////console.log("update offer........."+$scope.offreUpd.offer.idOffre);
            $scope.offreUpd.offer.taux = notretaux;
            ////console.log("update TAUX........."+$scope.offreUpd.offer.taux);
            $scope.offreUpd.documents = $scope.selectiond;
            $scope.offreUpd.commissions = $scope.items;
            $scope.offreUpd.offer.demandeIdDemande = parseInt($scope.idDemande);
            //console.log($scope.offreUpd.offer.demandeIdDemande);
            $scope.offreUpd.offer.userBanqueIdUserBanque = parseInt(idADmin);
            $scope.offreUpd.offer.hasDocument = true;
            $http({
                method: "PUT",
                url: baseUrl + 'mon_espace/bank/request/offer/update/' + parseInt(idADmin),
                data: $scope.offreUpd,
                headers: { 'Authorization': 'Bearer ' + jeton }
            }).then(function(response) {
                $scope.status = response.data.status;
                if ($scope.status === 0) {
                    $scope.loading = false;
                    $state.reload();
                    $scope.ok();
                    $scope.errorMessage = null;
                } else {
                    $scope.errorMessage = response.data.message;
                }
                //console.log(response.data);
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };

        if ($scope.selectedRowDmd.requestHasBank != undefined) {
            $scope.idDemande = $scope.selectedRowDmd.requestHasBank.request.idDemande;
            ////console.log($scope.idDemande);
            $scope.entO = $scope.selectedRowDmd.requestHasBank.request.userEntreprise.groupeIdGroupe.institution.nom;
            $scope.datevallO = $scope.selectedRowDmd.requestHasBank.request.dateValeur;
            $scope.prdtO = $scope.selectedRowDmd.requestHasBank.request.product.nom;
            $scope.monttO = $scope.selectedRowDmd.requestHasBank.request.montant;
            $scope.deviseO = $scope.selectedRowDmd.requestHasBank.request.devise.description;
            $scope.dateMatO = $scope.selectedRowDmd.requestHasBank.request.dateMaturite;
            $scope.dateMatOSPOT = $scope.selectedRowDmd.requestHasBank.request.dateEcheance;
            //console.log(" $scope.dateMatO:::" + $scope.dateMatO);
            $scope.dateVallOEscomp = $scope.selectedRowDmd.requestHasBank.request.dateEscompte;
            $scope.tauxMaxO = $scope.selectedRowDmd.requestHasBank.request.tauxMax;
            $scope.coursMaxO = $scope.selectedRowDmd.requestHasBank.request.coursMax;
            $scope.tauxMin = $scope.selectedRowDmd.requestHasBank.request.tauxMin;

            if ($scope.selectedRowDmd.requestHasBank.hasOffer) {
                ////console.log("hello Offer updating...");
                offreByIdRequestIdInstitut();
                //$scope.taux=$scope.offre.
            }

            function offreByIdRequestIdInstitut() {
                $http({
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + jeton
                    },
                    url: baseUrl + 'mes_operations/entreprise/request_has_bank/list_offer/' + $scope.idDemande + '/' + idInstitution,
                }).then(function successCallback(response) {
                    $scope.offreByRequest = response.data.list_offer_by_request;
                    //						//console.log($scope.offreByRequest);
                    for (var i = 0; i <= $scope.offreByRequest.length; i++) {
                        $scope.offre = $scope.offreByRequest[i].offer;
                        $scope.items = $scope.offreByRequest[i].commissions;
                        $scope.selectionDoc = $scope.offreByRequest[i].documents;
                        break;
                    };
                    //						//console.log($scope.selectionDoc);
                    $scope.notretaux = $scope.offre.taux;
                    $scope.doc = parseInt(1);
                    $scope.IsVisible = true;
                    if ($scope.selectionDoc != undefined) {
                        for (var i = 0; i <= $scope.selectionDoc.length; i++) {
                            if ($scope.selectionDoc[i] != undefined) {
                                $scope.changeDocus($scope.selectionDoc[i].idDocuments);
                            }
                        }
                    }
                }).catch(function(err) {
                    if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                        deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                            $location.url('/access/login');
                            $state.go('access.login');
                        }).catch(function(response) {});
                    };
                });
            };
        }

        $scope.enchere = "Enchere anonyme et à un tour";
        $scope.banqueO = nomInstitution;
        //$scope.banqueV = nomInstitution;
        $scope.$watch('dateMatO', function(newValue) {
            $scope.dateMatO = $filter('date')(newValue, 'dd/MM/yyyy');
        });
        $scope.$watch('dateMatOSPOT', function(newValue) {
            $scope.dateMatOSPOT = $filter('date')(newValue, 'dd/MM/yyyy');
        });
        $scope.$watch('datevallO', function(newValue) {
            $scope.datevallO = $filter('date')(newValue, 'dd/MM/yyyy');
        });
        $scope.$watch('dateVallOEscomp', function(newValue) {
            $scope.dateVallOEscomp = $filter('date')(newValue, 'dd/MM/yyyy');
        });

        /************Fin Recuperation des details sur la demande**********************/

        /**
         * @function submitOffre
         * @description This function allow to save offer in tab Demande.
         *
         */
        $scope.submitOffre = function() {
            $scope.disabl = true;
            $scope.loading = true;
            $scope.offre.offer.taux = $scope.notretaux;
            $scope.offre.documents = $scope.selectiond;
            $scope.offre.commissions = $scope.items;
            $scope.offre.offer.demandeIdDemande = parseInt($scope.idDemande);
            //console.log($scope.offre.offer.demandeIdDemande);
            $scope.offre.offer.userBanqueIdUserBanque = parseInt(idADmin);
            $scope.offre.offer.hasDocument = true;
            $http({
                    method: "POST",
                    url: baseUrl + 'mon_espace/bank/request/offer/add/' + parseInt(idADmin),
                    data: $scope.offre,
                    headers: { 'Authorization': 'Bearer ' + jeton }
                })
                .then(function(response) {
                    //console.log(response);
                    $scope.status = response.data.status;
                    if ($scope.status === 0) {
                        $scope.loading = false;
                        //allDemandListByProduitSpot ();
                        $state.reload();
                        $scope.ok();
                        $scope.errorMessage = null;
                    } else {
                        $scope.errorMessage = response.data.message;
                    }
                    //console.log(response.data);
                }).catch(function(err) {
                    if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                        deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                            $location.url('/access/login');
                            $state.go('access.login');
                        }).catch(function(response) {});
                    };
                });
        };

        $scope.saveOffer = function() {
            if ($scope.selectedRowDmd.hasOffer) {
                //console.log("update loading....");
                offreByIdRequestIdInstitut();
                $scope.$watch('boolTest', function(b1, b2) {
                    if (b1) {
                        $scope.updateOffer
                    };
                });
                $scope.updateOffer();
            } else {
                //console.log("submit loading....");
                $scope.submitOffre();
            }
        };

        //$scope.offerUpdate={taux:"", demandeIdDemande:-1, userBanqueIdUserBanque:-1, hasDocument:true};

        $scope.selectiond = [];
        $scope.changeDocus = function(a) {
            // tabDocs.push(parseInt(a));
            var idx = $scope.selectiond.indexOf(a);
            if (idx > -1) {
                $scope.selectiond.splice(idx, 1);
            } else {
                $scope.selectiond.push(parseInt(a));
            }
            $scope.doc_attach = a;
            //				//console.log($scope.selectiond);
        };

        //cette method recuper la list des docs d'un user
        /**
         * @function listDocumentByUser
         * @description This function allow to list all document by user.
         * @returns $scope.documentsbyUser:[]
         */
        function listDocumentByUser() {
            $http({
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
                url: baseUrl + 'mon_espace/documents/list_user/' + idADmin
            }).then(function successCallback(response) {
                $scope.documentsbyUser = response.data.document_list;
                //					//console.log($scope.documentsbyUser);
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };

        $scope.IsVisible = false;

        $scope.ShowTable = function(value) {
            $scope.IsVisible = value == "Y";
        }

        $scope.documentsbyUser = [];
        $scope.selectionb = [];
        listDocumentByUser();

        //cette method permet de recuperer les id des documesnts cochés
        $scope.selectionb = [];
        $scope.changeDoc = function(a) {
            var idx = $scope.selectionb.indexOf(a);
            if (idx > -1) {
                $scope.selectionb.splice(idx, 1);
            } else {
                $scope.selectionb.push(parseInt(a));
            }
            //console.log($scope.selectionb);
        };
        //			$scope.selectedDoc = function selectedDoc(event) {
        //			$scope.selectionb = [];
        //			for (var i = 0; i < $scope.documentsbyUser.length; i++) {
        //			if ($scope.documentsbyUser[i].selected) 
        //			$scope.selectionb[i] = parseInt($scope.documentsbyUser[i].idDocuments);
        //			}
        //			//console.log( $scope.selectionb);
        //			};

        /***************************Liste des commissions************************/
        $scope.items = [];

        $scope.itemsToAdd = [{ type: '', nature: '', valeur: '', detail: '' }];
        $scope.boolPercent = false;
        //			if(itemToAdd.type===1){
        //			$scope.boolPercent = true;
        //			}else{
        //			$scope.boolPercent = false;
        //			}

        /**
         * @function add
         * @param itemToAdd
         * @description This function allow to add a commission.
         * 
         */
        $scope.add = function(itemToAdd) {
            if (itemToAdd.type === 1) {
                itemToAdd.type = "Oui";
            } else {
                itemToAdd.type = "Non";
            }
            var index = $scope.itemsToAdd.indexOf(itemToAdd);

            $scope.itemsToAdd.splice(index, 1);

            $scope.items.push(angular.copy(itemToAdd))
            $scope.addNew();
        };

        /**
         * @function addNew
         * @description This function allow to add a new row in the table.
         * 
         */
        $scope.addNew = function() {
            $scope.itemsToAdd.push({
                type: '',
                nature: '',
                valeur: '',
                detail: ''
            })
        };

        //permet de supprimer une ligne du tableau des commissions
        $scope.remove = function(item) {
            var index = $scope.items.indexOf(item);
            $scope.items.splice(index, 1);
        }

        /**************************Fin Liste des commissions*********************/

        /******************FIN SUBMIT OFFRE BANK**************************************/

        /******************SUBMIT CHAINE DE VALIDATION********************************/
        $scope.etreasuryProduit = [];

        function listProduits() {
            $http({
                method: 'GET',
                url: baseUrl + 'admin/product/list',
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
            }).then(function successCallback(response) {
                $scope.etreasuryProduit = response.data.list_products;
                //$log.info($scope.etreasuryProduit);
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        listProduits();
        $scope.validationLevelList = [];

        /**
         * @function listValidationLevel
         * @description This function allow to list all validation_level
         */
        function listValidationLevel() {
            $scope.isDataReadyBkoffreEnAttentesV = false;
            $http({
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
                url: baseUrl + 'validation_level/list_institution/' + idInstitution,
            }).then(function successCallback(response) {
                $scope.validationLevelList = response.data.validation_level_list;
                $scope.isDataReadyBkoffreEnAttentesV = true;
                if ($scope.validationLevelList != undefined) {
                    for (var i = 0; i < $scope.validationLevelList.length; i++) {
                        if ($scope.validationLevelList[i].sens === 'request') {
                            $scope.validationLevelList[i].sens = "Demande";
                        }
                        if ($scope.validationLevelList[i].sens === 'offer') {
                            $scope.validationLevelList[i].sens = "Offre";
                        }
                    }
                }
                ////console.log($scope.validationLevelList);
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        listValidationLevel();
        $scope.validationLevel = { idNiveauValidation: -1, sens: '', nombreValidation: '', allsRequired: '', product: -1, institution: -1 };
        $scope.stat = null;

        $scope.selectedRowVlevel = selectedRow;
        if ($scope.selectedRowVlevel.idNiveauValidation != undefined) {
            $scope.produitVL = $scope.selectedRowVlevel.product;

            $scope.selectedRowVlevel.sens;
            if ($scope.selectedRowVlevel.sens.indexOf('Demande') != -1) {
                $scope.sens = "request";
            }
            if ($scope.selectedRowVlevel.sens.indexOf('Offre') != -1) {
                $scope.sens = "offer";
            }
            $scope.selectedRowVlevel.allsRequired;
            ////console.log($scope.valider);
            if ($scope.selectedRowVlevel.allsRequired.indexOf('Toute la chaine') != -1) {
                $scope.valider = "true";
            }
            if ($scope.selectedRowVlevel.allsRequired.indexOf('Pas') != -1) {
                $scope.valider = "false";
            }
            $scope.nb_validation = $scope.selectedRowVlevel.nombreValidation;
            //$scope.validationLevel.institution=parseInt(idInstitution);

        };
        if ($scope.selectedRowVlevel.idNiveauValidation === undefined) {
            $scope.valider = true;
        }

        $scope.disabl = false;

        /**
         * @function submitVlevel
         * @description This function allow to add validation_level
         */
        $scope.submitVlevel = function(valid) {
            ////console.log(valid);
            $scope.disabl = true;
            $scope.loading = true;
            $scope.validationLevel.sens = 'offer';
            $scope.validationLevel.allsRequired = $scope.valider;
            //console.log("allsRequired..."+$scope.validationLevel.allsRequired);
            $scope.validationLevel.product = $scope.produitVL;
            $scope.validationLevel.institution = parseInt(idInstitution);
            $scope.validationLevel.nombreValidation = $scope.nb_validation;
            var method = "";
            var url = "";
            if ($scope.selectedRowVlevel.idNiveauValidation === undefined) {
                method = "POST";
                url = baseUrl + "validation_level/add/" + idADmin;
            } else {
                $scope.validationLevel.idNiveauValidation = $scope.selectedRowVlevel.idNiveauValidation;
                method = "PUT";
                url = baseUrl + "validation_level/update/" + idADmin;
            }
            $http({
                method: method,
                url: url,
                data: angular.toJson($scope.validationLevel),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + jeton
                }

            }).then(reloadVlevel).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };

        function reloadVlevel(response) {
            //console.log(response);
            $scope.stat = response.data.status;
            if ($scope.stat === 0) {
                $scope.loading = false;
                $scope.errorMessage = null;
                $state.reload();
                //listValidationLevel();
                $scope.ok();
            } else {
                $scope.errorMessage = response.data.message;
            }
        };
        /*********************FIN CHAINE DE VALIDATION**************************/

        /******************SUBMIT NIVEAU DE VALIDATION**********************/
        $scope.bankGrps = [];

        /**
         * @function listGrpeBank
         * @description This function allow to list all group bank.
         * @returns $scope.bankGrps:[]
         */
        function listGrpeBank() {
            $http({
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
                url: baseUrl + 'admin/groupe/admin_banque/list/' + idADmin
            }).then(function successCallback(response) {
                $scope.bankGrps = response.data.group_list;
                ////console.log($scope.bankGrps);
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        listGrpeBank();
        $scope.niveauValidList = [];

        /**
         * @function listNivauValid
         * @description This function allow to list all validation_level_groupe
         */
        function listNivauValid() {
            $scope.isReadyDataBkniveauValidListV = false;
            $http({
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
                url: baseUrl + 'validation_level_groupe/list/' + idInstitution,
            }).then(function successCallback(response) {
                //$scope.niveauValidList.push(response.data.validation_level_groupe_list);
                $scope.niveauValidList = response.data.validation_level_groupe_list;
                $scope.isReadyDataBkniveauValidListV = true;
                for (var i = 0; i < $scope.niveauValidList.length; i++) {
                    if ($scope.niveauValidList[i].validationLevel.sens === 'request') {
                        $scope.niveauValidList[i].validationLevel.sens = "Demande";
                    }
                    if ($scope.niveauValidList[i].validationLevel.sens === 'offer') {
                        $scope.niveauValidList[i].validationLevel.sens = "Offre";
                    }
                    if ($scope.niveauValidList[i].validationLevel.allsRequired === true) {
                        $scope.niveauValidList[i].validationLevel.allsRequired = "Toute la chaine";
                    }
                    if ($scope.niveauValidList[i].validationLevel.allsRequired === false) {
                        $scope.niveauValidList[i].validationLevel.allsRequired = "Pas toute la chaine";
                    }
                }
                ////console.log($scope.niveauValidList);
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        listNivauValid();
        $scope.deviseslist = [];


        /**
         * @function listDevises
         * @description This function allow to list all devise
         */
        function listDevises() {
            //$scope.isReadyDevise=false;
            $http({
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
                url: baseUrl + '/admin/devise/list',

            }).then(function successCallback(response) {
                $scope.deviseslist = response.data.devise_list;
                for (var i = 0; i < response.data.devise_list.length; i++) {
                    if (response.data.devise_list[i].valeur == 1) {
                        $scope.devise_ = response.data.devise_list[i].description;
                        $scope.valDevise_ = response.data.devise_list[i];
                    }
                }
                //					//console.log($scope.devise_ +"........"+$scope.valDevise_);
                //					$scope.deviseslist = response.data.devise_list.filter(function(devise) {
                //					return devise.valeur != 1;
                //					});
                //					//console.log($scope.deviseslist);
                //$scope.isReadyDevise=true;
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

        $scope.niveauValidation = { groupe: -1, validationLevel: -1, valeurMin: null, valeurMax: null, niveau: null, devise: null };
        $scope.selectedRowNlevel = selectedRow;

        if ($scope.selectedRowNlevel.groupe != undefined) {
            $scope.validation = $scope.selectedRowNlevel.validationLevel;
            ////console.log($scope.selectedRowNlevel.validationLevel);
            $scope.niveau = $scope.selectedRowNlevel.niveau;
            $scope.groupe = $scope.selectedRowNlevel.groupe;
            $scope.val_min = parseInt($scope.selectedRowNlevel.valeurMin);
            $scope.val_max = parseInt($scope.selectedRowNlevel.valeurMax);
            $scope.devise_ = $scope.selectedRowNlevel.devise;
        }

        //$scope.valider = true;

        /**
         * @function submitNlevel
         * @description This function allow to save validation_level_groupe
         */
        $scope.submitNlevel = function() {
            $scope.loading = true;
            $scope.disabl = true;
            $scope.niveauValidation.groupe = $scope.groupe;
            $scope.niveauValidation.validationLevel = $scope.validation;
            $scope.niveauValidation.valeurMin = $scope.val_min;
            $scope.niveauValidation.valeurMax = $scope.val_max;
            $scope.niveauValidation.niveau = $scope.niveau;
            $scope.niveauValidation.devise = $scope.valDevise_;
            var method = "";
            var url = "";
            if ($scope.selectedRowNlevel.groupe === undefined) {
                method = "POST";
                url = baseUrl + "validation_level_groupe/add/" + idADmin;
            } else {
                $scope.niveauValidation.validationLevel.idNiveauValidation =
                    $scope.selectedRowNlevel.validationLevel.idNiveauValidation;
                if ($scope.niveauValidation.validationLevel.allsRequired.indexOf('Toute la chaine') != -1) {
                    $scope.niveauValidation.validationLevel.allsRequired = "true";
                }
                if ($scope.niveauValidation.validationLevel.allsRequired.indexOf('Pas') != -1) {
                    $scope.niveauValidation.validationLevel.allsRequired = "false";
                }
                method = "PUT";
                url = baseUrl + "validation_level_groupe/update/" + idADmin + '/' +
                    $scope.selectedRowNlevel.groupe.idGroupe;
            }
            $http({
                method: method,
                url: url,
                data: angular.toJson($scope.niveauValidation),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + jeton
                }

            }).then(reloadNlevel).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        $scope.boolNV = false;

        function reloadNlevel(response) {
            //console.log(response.data);
            $scope.stat = response.data.status;
            if ($scope.stat === 0) {
                $scope.loading = false;
                $scope.errorMessage = null;
                $scope.ok();
                $rootScope.$emit("CallNiveauValidation", {});
            } else {
                $scope.errorMessage = response.data.message;
            }
        };

        /*********************FIN NIVEAU DE VALIDATION******************************/

        /*********************DEBUT NOTIFICATIONS**********************************/
        $scope.bankLocal = [];

        function listBankbyLocal() {
            $http({
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
                url: baseUrl + 'admin/bank/locality/' + idloc,
            }).then(function successCallback(response) {
                $scope.bankLocal = response.data.list_banks;
                ////console.log($scope.bankLocal);
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        listBankbyLocal();
        $scope.idBanque = null;

        //			$scope.bankUsers=[];
        //			function listBankUsers(){
        //			$http({
        //			method : 'GET',
        //			url : baseUrl+'admin/bank/users/list/'+idInstitution
        //			}).then(function successCallback(response) {
        //			$scope.bankUsers=response.data.list_users;
        ////			//console.log($scope.bankUsers);
        //			}, function errorCallback(response) {
        //			//////console.log(response.statusText);
        //			});
        //			};
        //			listBankUsers();
        //			$scope.listEntrpriseUsers = function(id) {
        //			//console.log("id..."+id);
        //			$http({
        //			method : 'GET',
        //			url : baseUrl+'admin/entreprise/users/list/'+id
        //			}).then(function successCallback(response) {
        //			$scope.listEntUsers=response.data.list_users;
        //			////console.log("Entreprise users......... ",response.data);
        //			}, function errorCallback(response) {
        //			});
        //			};
        listBankUsersNotif();

        $scope.bankUsersNotif = [];

        function listBankUsersNotif() {
            $http({
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
                url: baseUrl + 'admin/bank/users/list/' + idInstitution
            }).then(function successCallback(response) {
                for (var i = 0; i < response.data.list_users.length; i++) {
                    $scope.bankUsersNotif.push(response.data.list_users[i]);
                }
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };

        $scope.selectionN = [];
        $scope.changeUserNf = function(a) {
            var idx = $scope.selectionN.indexOf(a);
            if (idx > -1) {
                $scope.selectionN.splice(idx, 1);
            } else {
                $scope.selectionN.push(parseInt(a));
            }
            //console.log($scope.selectionN);
        };

        $scope.selectedNotific = selectedRow;
        if ($scope.selectedNotific != undefined) {
            $scope.entNotif = $scope.selectedNotific.institution;
            $scope.produit = $scope.selectedNotific.products;
            $scope.userBnk = $scope.selectedNotific.user;
            //				//console.log("userBank..."+$scope.userBank);
            //				function listBankUsersUpdate(){
            //				$scope.banqueUpdate=$scope.selectedNotific.institution;
            //				if($scope.banqueUpdate!=undefined){
            //				$http({
            //				method : 'GET',
            //				url : baseUrl+'admin/bank/users/list/'+$scope.banqueUpdate.idInstitution
            //				}).then(function successCallback(response) {
            //				$scope.bankUsers=response.data.list_users;
            //				////console.log($scope.bankUsers);
            //				}, function errorCallback(response) {
            //				//////console.log(response.statusText);
            //				});
            //				}
            //				};
            //				listBankUsersUpdate();
        };

        function listEntrepriseLocality() {
            $http({
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
                url: baseUrl + 'admin/entreprise/locality/' + idloc,
            }).then(function successCallback(response) {
                $scope.listEntrprise = response.data.list_enterprises;
                //					//console.log($scope.listEntrprise);
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        listEntrepriseLocality();

        $scope.notification = { idProduct: -1, idsUser: -1 };

        $scope.saveNotific = function(entNotif) {
            $scope.disabl = true;
            $scope.notification.idProduct = $scope.produit.idProduits;
            $scope.notification.idsUser = $scope.selectionN;
            var method = "";
            var url = "";
            method = "POST";
            url = baseUrl + 'validation/notifications/add/' + parseInt(idADmin) + '/' +
                parseInt(entNotif.idInstitution);
            $http({
                method: method,
                url: url,
                data: angular.toJson($scope.notification),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + jeton
                }

            }).then(reloadNotifcation).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };

        $scope.changeUserBnk = function(user) {
            $scope.userBnk = user;
        }
        $scope.submitNotif = function(entNotif) {
            $scope.disabl = true;
            //console.log("entNotif..."+entNotif.idInstitution);
            if ($scope.selectedNotific.institution === undefined) {
                $scope.saveNotific(entNotif);
            } else {
                $scope.updateNotific();
            }
        };

        $scope.notificationUpdate = { user: -1, products: -1, institution: -1 };

        $scope.updateNotific = function() {
            $scope.notificationUpdate.user = $scope.userBnk;
            $scope.notificationUpdate.products = parseInt($scope.selectedNotific.products.idProduits);
            $scope.notificationUpdate.institution = $scope.entNotif;
            var method = "";
            var url = "";
            method = "PUT";
            url = baseUrl + 'validation/notifications/bank/update/' + parseInt(idADmin) + '/' +
                parseInt($scope.selectedNotific.user.idUtilisateur) + '/' + parseInt($scope.selectedNotific.institution.idInstitution);
            $http({
                method: method,
                url: url,
                data: angular.toJson($scope.notificationUpdate),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + jeton
                }

            }).then(reloadNotifcation).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        }

        function reloadNotifcation(response) {
            $scope.idStatus = response.data.status;
            //console.log(response);
            if ($scope.idStatus === 0) {
                $scope.errorMessage = null;
                $scope.ok();
                $rootScope.$emit("CallNotification", {});
            } else {
                $scope.errorMessage = response.data.message;
            }
        };

        function listNotification() {
            $http({
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
                url: baseUrl + 'validation/notifications/list/' + idADmin + '/' + idInstitution,

            }).then(function successCallback(response) {
                $scope.notificationList = response.data.notification;
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        listNotification();
        $scope.submitNotification = function() {
            $scope.notification.idProduct = $scope.produit.idProduits;
            $scope.notification.idsUser = $scope.selectionb;
            $http({
                    method: "POST",
                    url: baseUrl + 'validation/notifications/add/' + parseInt(idADmin) + '/' + parseInt($scope.idBanque),
                    data: $scope.notification,
                    headers: { 'Authorization': 'Bearer ' + jeton }
                })
                .then(function(response) {
                    //console.log(response);
                }).catch(function(err) {
                    if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                        deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                            $location.url('/access/login');
                            $state.go('access.login');
                        }).catch(function(response) {});
                    };
                });
        };
        /*********************FIN NOTIFICATIONS***********************************/

        /************************USER BANK**********************/
        $scope.selectedRowUbank = selectedRow;
        $scope.nomUB = $scope.selectedRowUbank.nom;
        $scope.prenomUB = $scope.selectedRowUbank.prenom;
        $scope.login_UB = $scope.selectedRowUbank.login;
        $scope.telmobileUB = parseInt($scope.selectedRowUbank.telephone);
        $scope.telfixeUB = $scope.selectedRowUbank.telephoneFixe;
        //$scope.profil=$scope.selectedRow.profilIdProfil;
        $scope.grpeUB = $scope.selectedRowUbank.groupeIdGroupe;
        $scope.mailUB = $scope.selectedRowUbank.email;
        $scope.idUserBk = $scope.selectedRowUbank.idUtilisateur;

        $scope.userBank = {
            idUtilisateur: -1,
            email: '',
            nom: '',
            prenom: '',
            login: '',
            telephone: '',
            telephoneFixe: '',
            groupeIdGroupe: -1
        };

        $scope.loading = false;

        /**
         * @function updateUserBank
         * @description This function allow to update user bank
         */
        $scope.updateUserBank = function() {
            $scope.loading = true;
            $scope.userBank.idUtilisateur = $scope.idUserBk;
            $scope.userBank.email = $scope.mailUB;
            $scope.userBank.nom = $scope.nomUB;
            $scope.userBank.prenom = $scope.prenomUB;
            $scope.userBank.login = $scope.login_UB;
            $scope.userBank.groupeIdGroupe = $scope.grpeUB;
            $scope.userBank.telephone = '+' + parseInt($scope.telmobileUB);
            if ($scope.telfixeUB != null) {
                //console.log($scope.telfixeUB);
                if ($scope.telfixeUB.toString().indexOf('NaN') != -1) {
                    //console.log($scope.telfixeUB);
                    if ($scope.telfixeUB.toString().indexOf('+') != -1) {
                        //console.log($scope.telfixeUB);
                        $scope.userBank.telephoneFixe = $scope.telfixeUB;
                    } else {
                        //console.log($scope.telfixeUB);
                        $scope.userBank.telephoneFixe = "+" + $scope.telfixeUB;
                    }

                } else {
                    $scope.userBank.telephoneFixe = null;
                }
            } else {
                //console.log($scope.telfixeUB);
                $scope.userBank.telephoneFixe = null;
            }
            //$scope.userBank.profilIdProfil=$scope.profil;
            $http({
                method: "PUT",
                url: baseUrl + "admin/user_bank/update/" + idADmin,
                data: $scope.userBank,
                headers: { 'Authorization': 'Bearer ' + jeton }
            }).then(function(data) {
                $scope.stat = data.data.status;
                if ($scope.stat === 0) {
                    $scope.loading = false;
                    $scope.errorMessage = null;
                    $scope.ok();
                    $rootScope.$emit("CallUserBank", {});
                } else {
                    $scope.errorMessage = data.data.message;
                }
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };

        /**
         * @function confirmUserBank
         * @description This function allow to delete user bank
         */
        $scope.confirmUserBank = function() {
            $http({
                    method: "DELETE",
                    url: baseUrl + 'admin/user_bank/delete/' + idADmin + '/' + $scope.selectedRowUbank.idUtilisateur,
                    data: {},
                    headers: { 'Authorization': 'Bearer ' + jeton }
                })
                .then(function(data) {
                    reloadListUserBank();
                }).catch(function(err) {
                    if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                        deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                            $location.url('/access/login');
                            $state.go('access.login');
                        }).catch(function(response) {});
                    };
                });
            //$scope.selectedRow = selectedRow;
        };

        function _errorSup(response) {
            //console.log(response.statusText);
        }

        function reloadListUserBank() {
            $scope.cancel();
            $rootScope.$emit("CallUserBank", {});
        }

        $scope.bankUsers = [];
        $scope.usersGroupbyId = [];
        $scope.testUser;

        /**
         * @function listUsersBank
         * @description This function allow to list all users bank by 
         * Group selected and limit this list in 5
         */
        function listUsersBank() {
            $http({
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
                url: baseUrl + 'admin/user_bank/list/' + idInstitution + '/' + idADmin
            }).then(function successCallback(response) {
                $scope.bankUsers.push(response.data.bank_users_list);
                for (var i = 0; i < response.data.bank_users_list.length; i++) {
                    if (response.data.bank_users_list[i].groupeIdGroupe.idGroupe === $scope.selectedRowGrBk.idGroupe) {
                        $scope.usersGroupbyId.push(response.data.bank_users_list[i]);
                        $scope.testUser = 1;
                    }
                    if ($scope.usersGroupbyId.length === 5)
                        break;
                }
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        listUsersBank();

        $scope.bankGrps = [];

        /**
         * @function listGrpeBank
         * @description This function allow to list all group bank
         */
        function listGrpeBank() {
            $scope.isReadyDataBkbankGrps = false;
            $http({
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
                url: baseUrl + 'admin/groupe/admin_banque/list/' + idADmin
            }).then(function successCallback(response) {
                $scope.bankGrps = response.data.group_list;
                $scope.isReadyDataBkbankGrps = true;
                ////console.log($scope.bankGrps);
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        listGrpeBank();

        $scope.userbankProfil = [];
        $scope.errorMessage = null;

        function listUserBANKProfil() {
            $http({
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
                url: baseUrl + 'admin/profile/list/' + idADmin
            }).then(function successCallback(response) {
                for (var i = 0; i < response.data.profile_list.length; i++) {
                    if (response.data.profile_list[i].type === 'ADMIN_BANQUE' || response.data.profile_list[i].type === 'USER_HABILITY') {
                        $scope.userbankProfil.push(response.data.profile_list[i]);
                    };
                };
                ////console.log($scope.userbankProfil);
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        listUserBANKProfil();
        /************************FIN USER BANK***************************/
        /************************GROUP BANK******************************/
        $scope.grpeBank = { idGroupe: -1, nom: '', description: '', institution: -1 };
        $scope.idGrpe = -1;
        $scope.loading = false;

        /**
         * @function saveGroupBank
         * @description This function allow to save group bank
         */
        $scope.saveGroupBank = function() {
            $scope.loading = true;
            $scope.grpeBank.nom = $scope.nomGB;
            $scope.grpeBank.description = $scope.descriptGB;
            $scope.grpeBank.institution = parseInt(idInstitution);
            $http({
                    method: "POST",
                    url: baseUrl + "admin/groupe/admin_banque/add/" + idADmin,
                    data: $scope.grpeBank,
                    headers: { 'Authorization': 'Bearer ' + jeton },
                })
                .then(function(data) {
                    $scope.stat = data.data.status;
                    //console.log(data);
                    if ($scope.stat === 0) {
                        $scope.loading = true;
                        $scope.errorMessage = null;
                        reloadGrpBank();
                    } else {
                        $scope.errorMessage = data.data.message;
                    }
                }).catch(function(err) {
                    if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                        deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                            $location.url('/access/login');
                            $state.go('access.login');
                        }).catch(function(response) {});
                    };
                });
        };

        $scope.selectedRowGrBk = selectedRow;
        $scope.nomGB = $scope.selectedRowGrBk.nom;
        $scope.descriptGB = $scope.selectedRowGrBk.description;
        if ($scope.selectedRowGrBk != undefined) {
            $scope.idGrpe = $scope.selectedRowGrBk.idGroupe;
        };

        /**
         * @function updateGroupBank
         * @description This function allow to update group bank
         */
        $scope.updateGroupBank = function() {
            $scope.loading = true;
            $scope.grpeBank.idGroupe = $scope.idGrpe;
            $scope.grpeBank.nom = $scope.nomGB;
            $scope.grpeBank.description = $scope.descriptGB;
            $scope.grpeBank.institution = parseInt(idInstitution);
            $http({
                    method: "PUT",
                    url: baseUrl + "admin/groupe/admin_banque/update/" + idADmin,
                    data: $scope.grpeBank,
                    headers: { 'Authorization': 'Bearer ' + jeton },
                })
                .then(function(data) {
                    $scope.stat = data.data.status;
                    //console.log(data);
                    if ($scope.stat === 0) {
                        $scope.loading = false;
                        $scope.errorMessage = null;
                        reloadGrpBank();
                    } else {
                        $scope.errorMessage = data.data.message;
                    }
                }).catch(function(err) {
                    if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                        deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                            $location.url('/access/login');
                            $state.go('access.login');
                        }).catch(function(response) {});
                    };
                });
        };

        $scope.submitGroupBank = function() {
            if ($scope.selectedRowGrBk.idGroupe === undefined) {
                $scope.saveGroupBank();
            } else {
                $scope.updateGroupBank();
            }
        }

        /**
         * @function confirmGrpeBank
         * @param idGroupe in url
         * @description This function allow to delete group bank
         */
        $scope.confirmGrpeBank = function() {
            $scope.loading = true;
            $scope.disabl = true;
            $http({
                    method: "DELETE",
                    url: baseUrl + 'admin/groupe/admin_banque/delete/' + idADmin + '/' + $scope.selectedRowGrBk.idGroupe,
                    dat: {},
                    headers: { 'Authorization': 'Bearer ' + jeton }
                })
                .then(function(data) {
                    reloadGrpBank();
                }).catch(function(err) {
                    if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                        deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                            $location.url('/access/login');
                            $state.go('access.login');
                        }).catch(function(response) {});
                    };
                });
        };


        //			$scope.listGrpeBank = function(){
        //				$scope.isReadyDataBkbankGrps=false;
        //				$http({
        //					method : 'GET',
        //					url :baseUrl+'/admin/groupe/admin_banque/list/'+idADmin
        //				}).then(function successCallback(response) {
        //					$scope.bankGrps = response.data.group_list;
        //					////console.log($scope.bankGrps);
        //					$scope.isReadyDataBkbankGrps=true;
        //				}, function errorCallback(response) {
        //					//console.log(response.statusText);
        //				});
        //			};
        function reloadGrpBank() {
            $state.reload();
            $scope.ok();
        };


        /************************ FIN GROUP BANK***************************/

        /*************************JURIDICTIONS GROUPE*****************************/

        $scope.selectionb = [];
        /*SELECTION DE JURIDICTION*/
        $scope.changeJuridictionBank = function(a) {
            var idx = $scope.selectionb.indexOf(a);
            if (idx > -1) {
                $scope.selectionb.splice(idx, 1);
            } else {
                $scope.selectionb.push(parseInt(a));
            }
            //console.log($scope.selectionb);
        };
        /*FIN SELECTION DE JURIDICTION*/
        $scope.listJuridictionBank = [];

        /**
         * @function listJuridictionsBank
         * @param a:idJuridiction
         * @description This function allow to filter listJuridictionBank
         * switch items to defined juridiction
         */
        function listJuridictionsBank() {
            $http({
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
                url: baseUrl + '/admin/juridictions/list/' + idADmin
            }).then(function successCallback(response) {
                $scope.listJuridictionBank = response.data.list_juridictions;
                $scope.juriductionChange = $scope.listJuridictionBank.filter(function(jurdic) {
                    return jurdic.groupage == 'change';
                });
                $scope.juriductionEscom = $scope.listJuridictionBank.filter(function(jurdic) {
                    return jurdic.groupage == 'escompte';
                });
                $scope.juriductionTrans = $scope.listJuridictionBank.filter(function(jurdic) {
                    return jurdic.groupage == 'transfert';
                });
                $scope.juriductionSpot = $scope.listJuridictionBank.filter(function(jurdic) {
                    return jurdic.groupage == 'spot';
                });
                $scope.juriductionDepot = $scope.listJuridictionBank.filter(function(jurdic) {
                    return jurdic.groupage == 'dépôt à terme';
                });
                $scope.juriductionUsers = $scope.listJuridictionBank.filter(function(jurdic) {
                    return jurdic.groupage == 'utilisateur';
                });
                $scope.juriductionGroup = $scope.listJuridictionBank.filter(function(jurdic) {
                    return jurdic.groupage == 'groupe';
                });
                $scope.juriductionParam = $scope.listJuridictionBank.filter(function(jurdic) {
                    return jurdic.groupage == 'chaine de validation';
                });
                $scope.juriductionTauxEscom = $scope.listJuridictionBank.filter(function(jurdic) {
                    return jurdic.groupage == 'taux banque escompte';
                });
                $scope.juriductionTauxChang = $scope.listJuridictionBank.filter(function(jurdic) {
                    return jurdic.groupage == 'taux banque change';
                });
                $scope.juriductionTauxDepot = $scope.listJuridictionBank.filter(function(jurdic) {
                    return jurdic.groupage == 'taux banque dépôt à terme';
                });
                $scope.juriductionTauxTrans = $scope.listJuridictionBank.filter(function(jurdic) {
                    return jurdic.groupage == 'taux banque transfert';
                });
                $scope.juriductionTauxSpot = $scope.listJuridictionBank.filter(function(jurdic) {
                    return jurdic.groupage == 'taux banque spot';
                });
                $scope.juriductionCommEscom = $scope.listJuridictionBank.filter(function(jurdic) {
                    return jurdic.groupage == 'commission escompte';
                });
                $scope.juriductionCommChang = $scope.listJuridictionBank.filter(function(jurdic) {
                    return jurdic.groupage == 'commission change';
                });
                $scope.juriductionCommDepot = $scope.listJuridictionBank.filter(function(jurdic) {
                    return jurdic.groupage == 'commission dépôt à terme';
                });
                $scope.juriductionCommTrans = $scope.listJuridictionBank.filter(function(jurdic) {
                    return jurdic.groupage == 'commission transfert';
                });
                $scope.juriductionCommSpot = $scope.listJuridictionBank.filter(function(jurdic) {
                    return jurdic.groupage == 'commission spot';
                });

            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        listJuridictionsBank();
        $scope.selectionb = [];

        /**
         * @function changeJuridictionBank
         * @param a:idJuridiction
         * @description This function allow to select juridiction
         */
        $scope.changeJuridiction = function(a) {
            var idx = $scope.selectionb.indexOf(a);
            if (idx > -1) {
                $scope.selectionb.splice(idx, 1);
            } else {
                $scope.selectionb.push(parseInt(a));
            }
            ////console.log($scope.selectionb);
        };
        /*FIN SELECTION DE JURIDICTION*/

        $scope.selectedRowGroupJurd = selectedRow;

        $scope.juridictionList = [];
        if ($scope.selectedRowGroupJurd.hasJuridiction === true) {
            juridictionsByGroup();
        };


        /**
         * @function juridictionsByGroup
         * @description This function allow to check all juridiction by idGroup
         * using the function @$scope.changeJuridictionBank()
         */
        function juridictionsByGroup() {
            $http({
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
                url: baseUrl + 'admin/juridiction_groupe/list/groupe/' + $scope.selectedRowGroupJurd.idGroupe
            }).then(function successCallback(response) {
                for (var i = 0; i < response.data.list_juridiction_groupe.length; i++) {
                    $scope.changeJuridictionBank(response.data.list_juridiction_groupe[i].juridiction.id);
                };
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };

        /**
         * @function updateJuridictionGroup
         * @description This function allow to update juridiction
         */
        $scope.updateJuridictionGroup = function() {
            $scope.loading = true;
            $scope.disabl = true;
            $scope.juridictionGroup.idGroupes = parseInt($scope.selectedRowGroupJurd.idGroupe);
            $scope.juridictionGroup.idJuridiction = $scope.selectionb;
            $http({
                    method: "PUT",
                    url: baseUrl + "admin/juridiction_groupe/update/" + idADmin,
                    data: $scope.juridictionGroup,
                    headers: { 'Authorization': 'Bearer ' + jeton }
                })
                .then(function(data) {
                    $scope.stat = data.data.status;
                    if ($scope.stat === 0) {
                        $scope.loading = false;
                        $scope.errorMessage = null;
                        $modalInstance.dismiss('cancel');
                    } else {
                        //console.log(data.data.message);
                        $scope.errorMessage = data.data.message;
                    }
                }).catch(function(err) {
                    if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                        deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                            $location.url('/access/login');
                            $state.go('access.login');
                        }).catch(function(response) {});
                    };
                });
        };

        $scope.juridictionGroup = { idGroupes: -1, idJuridiction: null };

        $scope.stat = null;
        $scope.errorMessage = null;
        $scope.disabl = false;

        /**
         * @function saveJuridictionGroup
         * @description This function allow to add juridiction
         */
        $scope.saveJuridictionGroup = function() {
            $scope.loading = true;
            $scope.disabl = true;
            $scope.juridictionGroup.idGroupes = parseInt($scope.selectedRowGroupJurd.idGroupe);
            $scope.juridictionGroup.idJuridiction = $scope.selectionb;
            $http({
                    method: "POST",
                    url: baseUrl + "admin/juridiction_groupe/add/" + idADmin,
                    data: $scope.juridictionGroup,
                    headers: { 'Authorization': 'Bearer ' + jeton }
                })
                .then(function(data) {
                    $scope.stat = data.data.status;
                    if ($scope.stat === 0) {
                        $state.reload();
                        $scope.loading = false;
                        $scope.errorMessage = null;
                        $modalInstance.dismiss('cancel');
                    } else {
                        //console.log(data.data.message);
                        $scope.errorMessage = data.data.message;
                    }
                }).catch(function(err) {
                    if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                        deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                            $location.url('/access/login');
                            $state.go('access.login');
                        }).catch(function(response) {});
                    };
                });
        };
        /***********************Fin juridiction**************************/

        /***************DEBUT SUBMIT CATEGORIE ET DOCS*******************/


        $scope.categorie = { libelle: "", userIdUtilisateur: -1 };

        /**
         * @function saveCategorie
         * @description This function allow to add categorie
         */
        $scope.saveCategorie = function() {
            $scope.loading = true;
            $scope.categorie.libelle = $scope.libelleCat;
            $scope.categorie.userIdUtilisateur = parseInt(idADmin);
            $http({
                    method: "POST",
                    url: baseUrl + 'mon_espace/category/add/' + idADmin,
                    data: $scope.categorie,
                    headers: { 'Authorization': 'Bearer ' + jeton },
                })
                .then(function(response) {
                    //console.log(response);
                    if (response.data.status === 0) {
                        $scope.loading = false;
                        $scope.errorMessage = null;
                        $state.reload();
                        listCategorie();
                        $modalInstance.dismiss('cancel');
                    } else {
                        $scope.errorMessage = response.data.message;
                    }
                }).catch(function(err) {
                    if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                        deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                            $location.url('/access/login');
                            $state.go('access.login');
                        }).catch(function(response) {});
                    };
                });
        };

        $scope.submitCategorie = function() {
            $scope.disabl = true;
            if ($scope.selectedRowCategorie.idCategory != undefined) {
                $scope.updateCategorie();
            } else {
                $scope.saveCategorie();
            }
        }
        $scope.selectedRowCategorie = selectedRow;
        ////console.log("cate..........."+$scope.selectedRowCategorie);
        $scope.libelleCat = $scope.selectedRowCategorie.libelle;

        /**
         * @function updateCategorie
         * @param idCategory in url
         * @description This function allow to update categorie
         */
        $scope.updateCategorie = function() {
            $scope.loading = true;
            $scope.categorie.libelle = $scope.libelleCat;
            $scope.categorie.userIdUtilisateur = parseInt(idADmin);
            $http({
                    method: "PUT",
                    url: baseUrl + 'mon_espace/category/update/' + idADmin + '/' + $scope.selectedRowCategorie.idCategory,
                    data: $scope.categorie,
                    headers: { 'Authorization': 'Bearer ' + jeton }
                })
                .then(function(response) {
                    //console.log(response);
                    if (response.data.status === 0) {
                        $scope.loading = false;
                        $scope.errorMessage = null;
                        $state.reload();
                        listCategorie();
                        $modalInstance.dismiss('cancel');
                    } else {
                        $scope.errorMessage = response.data.message;
                    }
                }).catch(function(err) {
                    if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                        deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                            $location.url('/access/login');
                            $state.go('access.login');
                        }).catch(function(response) {});
                    };
                });
        };
        $scope.sousCategorie = { libelle: "", parent: -1, userIdUtilisateur: -1 };

        $scope.selectedRowSsCategorie = selectedRow;
        $scope.libelleSscat = $scope.selectedRowSsCategorie.libelle;
        $scope.categorieSs = $scope.selectedRowSsCategorie.parent;
        //			//console.log($scope.selectedRowSsCategorie.parent);

        /**
         * @function saveSsCategorie
         * @description This function allow to save sous-categorie
         */
        $scope.saveSsCategorie = function() {
            $scope.loading = true;
            $scope.sousCategorie.libelle = $scope.libelleSscat;
            $scope.sousCategorie.parent = $scope.categorieSs;
            $scope.sousCategorie.userIdUtilisateur = parseInt(idADmin);
            $http({
                    method: "POST",
                    url: baseUrl + 'mon_espace/category/add/' + idADmin,
                    data: $scope.sousCategorie,
                    headers: { 'Authorization': 'Bearer ' + jeton }
                })
                .then(function(response) {
                    //console.log(response);
                    if (response.data.status === 0) {
                        $scope.loading = false;
                        $scope.errorMessage = null;
                        $state.reload();
                        //listCategorie();
                        $modalInstance.dismiss('cancel');
                    } else {
                        $scope.errorMessage = response.data.message;
                    }
                }).catch(function(err) {
                    if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                        deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                            $location.url('/access/login');
                            $state.go('access.login');
                        }).catch(function(response) {});
                    };
                });
        };
        $scope.disabl = false;
        $scope.submitSsCategorie = function() {
            $scope.disabl = true;
            if ($scope.selectedRowSsCategorie.idCategory != undefined) {
                $scope.updateSousCategorie();
            } else {
                $scope.saveSsCategorie();
            }
        };

        /**
         * @function updateSousCategorie
         * @param idCategory in url
         * @description This function allow to update sous-categorie
         */
        $scope.updateSousCategorie = function() {
            $scope.loading = true;
            $scope.sousCategorie.libelle = $scope.libelleSscat;
            $scope.sousCategorie.parent = $scope.categorieSs;
            $scope.sousCategorie.userIdUtilisateur = parseInt(idADmin);
            $http({
                    method: "PUT",
                    url: baseUrl + 'mon_espace/category/update/' + idADmin + '/' + $scope.selectedRowSsCategorie.idCategory,
                    data: $scope.sousCategorie,
                    headers: { 'Authorization': 'Bearer ' + jeton }
                })
                .then(function(response) {
                    //console.log(response);
                    if (response.data.status === 0) {
                        $scope.loading = false;
                        $scope.errorMessage = null;
                        $state.reload();
                        //listCategorie();
                        $modalInstance.dismiss('cancel');
                    } else {
                        $scope.errorMessage = response.data.message;
                    }
                }).catch(function(err) {
                    if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                        deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                            $location.url('/access/login');
                            $state.go('access.login');
                        }).catch(function(response) {});
                    };
                });
        };
        $scope.entCategorie = [];

        /**
         * @function listCategorie
         * @description This function allow to list all folder and
         * create list of received document by folder with entreprise name 
         * @return entCategorie
         */
        function listCategorie() {
            $http({
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
                url: baseUrl + 'mon_espace/category/list_user/' + idADmin,
            }).then(function successCallback(response) {
                //$scope.entCategorie = response.data.category_list;
                for (var i = 0; i < response.data.category_list.length; i++) {
                    if (response.data.category_list[i].parent === null) {
                        $scope.entCategorie.push(response.data.category_list[i]);
                    }
                }
                ////console.log(response);
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        listCategorie();

        $scope.docsCategorie = [];

        /**
         * @function listdocsCategorie
         * @description This function allow to list all folder by user 
         * @return docsCategorie:[]
         */
        function listdocsCategorie() {
            $http({
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
                url: baseUrl + 'mon_espace/category/list_user/' + idADmin,
            }).then(function successCallback(response) {
                $scope.docsCategorie = response.data.category_list;
                ////console.log($scope.entCategorie);
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        listdocsCategorie();

        $scope.docBank = { nom: "", category: -1, file: -1 };

        var str = '';
        /*FORMATE DATE*/
        /**
         * @function formatDate
         * @param a
         * @description This function allow to convert datefile.
         */
        function formatDate(a) {
            var mois = a.getMonth() + 1;
            var jour = a.getDate();
            var hour = a.getHours();
            var min = a.getMinutes();
            var seco = a.getSeconds();
            var mseco = a.getMilliseconds();
            if (mois < 10) {
                mois = '0' + mois;
            };
            if (jour < 10) {
                jour = '0' + jour;
            };
            if (hour < 10) {
                hour = '0' + hour
            };
            if (min < 10) {
                min = '0' + min;
            };
            if (seco < 10) {
                seco = '0' + seco;
            };
            if (mseco < 10) {
                mseco = '0' + mseco;
            }
            str = a.getFullYear() + '-' + mois + '-' + jour + 'T' + hour + ':' + min + ':' + seco + '.' + mseco + 'Z';
            //console.log("Str ",str);
        };
        /*FIN FORMATE DATE*/
        $scope.fileNameChanged = function(ele) {
            var files = ele.files;
            //console.log(files);
            var l = files.length;
            var namesArr = [];
            for (var i = 0; i < l; i++) {
                namesArr.push(files[i].name);
            }
        };

        /**
         * @function submitDocCategorie
         * @param mots_cles,nomDoc,idcat,file
         * @description This function allow to submit document.
         */
        $scope.submitDocCategorie = function(mots_cles, nomDoc, idcat, file) {
            //console.log(file.lastModifiedDate);
            $scope.disabl = true;
            if (file != undefined && file != null) {
                formatDate(file.lastModifiedDate);
            };
            $scope.loading = true;
            var url = baseUrl + 'mon_espace/documents/add/' + idADmin;
            var data = new FormData();
            data.append('file', file);
            data.append('nom', nomDoc);
            data.append('mots_cles', mots_cles);
            data.append('category', idcat);
            data.append('date_document', str);
            var config = {
                transformRequest: angular.identity,
                transformResponse: angular.identity,
                headers: {
                    'Content-Type': undefined,
                    'Authorization': 'Bearer ' + jeton
                }
            }
            $http({ method: "POST", url: url, data: data, headers: config.headers }).then(function(response) {
                if (response.data.status != -1) {
                    $state.reload();
                    $scope.ok();
                    $scope.loading = false;
                } else {
                    message = response.data.message;
                    $scope.errorMessage = message;
                };
            }).catch(function(err) {
                console.log(err);
            });
        };

        $scope.selectedRowDocs = selectedRow;
        if ($scope.selectedRowDocs.idDocuments != undefined) {
            //console.log($scope.selectedRowDocs.mots_cles);
            $scope.nomDocumentR = $scope.selectedRowDocs.nom;
            $scope.categorieDocR = $scope.selectedRowDocs.category;
            $scope.mots_cles = $scope.selectedRowDocs.mots_cles;
        };
        $scope.docRange = { idDocuments: -1, nom: '', category: null, isPrivate: false };
        $scope.disabl = false;

        /**
         * @function rangerDocument
         * @param nomDoc, catego
         * @description This function allow to move a document 
         * between two folders
         */
        $scope.rangerDocument = function(nomDoc, catego) {
            ////console.log(catego);
            $scope.disabl = true;
            $scope.docRange.idDocuments = $scope.selectedRowDocs.idDocuments;
            $scope.docRange.nom = nomDoc;
            $scope.docRange.category = catego;
            $scope.docRange.isPrivate = $scope.selectedRowDocs.isPrivate;
            var method = "";
            var url = "";
            method = "PUT";
            url = baseUrl + 'mon_espace/documents/ranger/' + parseInt(idADmin);
            $http({
                method: method,
                url: url,
                data: angular.toJson($scope.docRange),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + jeton
                }
            }).then(reloadDoc).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };

        function reloadDoc(response) {
            //console.log(response);
            $scope.idStatus = response.data.status;
            //console.log(response);
            if ($scope.idStatus === 0) {
                $scope.errorMessage = null;
                $scope.ok();
                //listNotification();
                $state.reload();
            } else {
                $scope.errorMessage = response.data.message;
            }
        };


        /***************FIN SUBMIT CATEGORIE ET DOCS********************/
        function _error(response) {
            //console.log(response.statusText);
        };
        $scope.ok = function() {
            $scope.selectedRow = null;
            $modalInstance.close();
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };

    }
]);

/*************************SUPPRESSION CONTROLLER  BANK**********************************/
app.controller('bankSuppController', ['$scope', '$rootScope', '$state', '$http', '$uibModalInstance', 'selectedRow', 'deconnectApi',
    function($scope, $rootScope, $state, $http, $modalInstance, selectedRow, deconnectApi) {

        var idADmin = sessionStorage.getItem("iduser");
        var idInstitution = sessionStorage.getItem("idInstitution");
        var jeton = localStorage.getItem('jeton');

        $scope.spinner = "loading.gif";
        /****************DEBUT OFFRE BANK*****************************/
        var pageTitile = localStorage.getItem('pagetitle');
        var idDemande;
        $scope.demandes = [];
        $scope.demandesbyProduit = [];
        /*******************************OFFRE BANK**************************/
        $scope.idProduit = 0;
        $scope.idProduitSpot = 0;
        $scope.idProduitDepot = 0;
        $rootScope.boolean = false;
        $rootScope.booleanSpot = false;
        $rootScope.booleanDepot = false;

        listProduits();

        /**
         * @function listProduits
         * @description This function allow to list all request SPOT.
         * @return etreasuryProduit:[]
         */
        function listProduits() {
            $http({
                method: 'GET',
                url: baseUrl + 'admin/product/list',
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
            }).then(function successCallback(response) {
                $scope.etreasuryProduit = response.data.list_products;
                for (var i = 0; i < $scope.etreasuryProduit.length; i++) {
                    if ($scope.etreasuryProduit[i].nom.indexOf(pageTitile.toUpperCase()) !== -1) {
                        $rootScope.boolean = true;
                        $scope.idProduit = $scope.etreasuryProduit[i].idProduits;
                    }
                    if ($scope.etreasuryProduit[i].nom.indexOf('SPOT') !== -1) {
                        $rootScope.booleanSpot = true;
                        $scope.idProduitSpot = $scope.etreasuryProduit[i].idProduits;
                    }
                    if ($scope.etreasuryProduit[i].nom.indexOf('TERME') !== -1) {
                        $rootScope.booleanDepot = true;
                        $scope.idProduitDepot = $scope.etreasuryProduit[i].idProduits;
                    }
                }
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        }

        $scope.$watch('boolean', function(bool1, bool2) {
            if (bool1) {
                allDemandListByProduit();
            };
        });

        $scope.demandesValid = [];
        //cette methode permet de retourner la liste des demandes par produit et banque
        function allDemandListByProduit() {
            $scope.isDataReadyBkReqbyProduitCh = false;
            $http({
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
                url: baseUrl + 'mes_operations/entreprise/request_has_bank/lists/' + idInstitution + '/' + $scope.idProduit
            }).then(function successCallback(response) {
                $scope.demandesbyProduit = response.data.list_request_has_bank;
                $scope.isDataReadyBkReqbyProduitCh = true;
                //			for(var i=0; i<$scope.demandesbyProduit.length; i++){
                //			if($scope.demandesbyProduit[i].isValid===true){
                //			$scope.demandesValid=$scope.demandesbyProduit[i];
                //			}
                //			}
                ////console.log($scope.demandesbyProduit);
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };

        $scope.$watch('booleanSpot', function(bool3, bool4) {
            if (bool3) {
                allDemandListByProduitSpot();
            };
        });
        $scope.demandesbyProduitSpot = [];

        /**
         * @function allDemandListByProduitSpot
         * @description This function allow to list all request SPOT.
         * @return demandesbyProduitDepot:[]
         */
        function allDemandListByProduitSpot() {
            //$scope.isDataReadyBkReqbyProduitSpo = false;
            $http({
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
                url: baseUrl + 'mes_operations/entreprise/request_has_bank/lists/' + idInstitution + '/' + $scope.idProduitSpot
            }).then(function successCallback(response) {
                //$scope.isDataReadyBkReqbyProduitSpo = true;
                $scope.demandesbyProduitSpot = response.data.list_request_has_bank;
                ////console.log($scope.demandesbyProduit);
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };

        $scope.$watch('booleanDepot', function(bool5, bool6) {
            if (bool5) {
                allDemandListByProduitDepot();
            };
        });
        $scope.demandesbyProduitDepot = [];

        /**
         * @function offreByIdRequestIdInstitut
         * @description This function allow to list all request DAT.
         * @return demandesbyProduitDepot:[]
         */
        function allDemandListByProduitDepot() {
            $scope.isDataReadyBkdemandesbyProduitDepot = false;
            $http({
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
                url: baseUrl + 'mes_operations/entreprise/request_has_bank/lists/' + idInstitution + '/' + $scope.idProduitDepot
            }).then(function successCallback(response) {
                $scope.demandesbyProduitDepot = response.data.list_request_has_bank;
                $scope.isDataReadyBkdemandesbyProduitDepot = true;
                ////console.log($scope.demandesbyProduit);
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        /*************FIN OFFRE BANK*******************/
        $scope.selectedRowRequest = selectedRow;
        $scope.selectedRow = selectedRow;
        $scope.selectedRowVlevel = selectedRow;
        $scope.offreByRequest = [];

        if ($scope.selectedRowRequest.requestHasBank != undefined) {
            $scope.idDemande = $scope.selectedRowRequest.requestHasBank.request.idDemande;
            //console.log($scope.idDemande);
            if ($scope.selectedRowRequest.requestHasBank.hasOffer) {

                /**
                 * @function offreByIdRequestIdInstitut
                 * @param idDemande, idInstitution
                 * @description This function allow to set offer.
                 * @return offre:{}
                 */
                function offreByIdRequestIdInstitut() {
                    $http({
                        method: 'GET',
                        headers: {
                            'Authorization': 'Bearer ' + jeton
                        },
                        url: baseUrl + 'mes_operations/entreprise/request_has_bank/list_offer/' + $scope.idDemande + '/' + idInstitution,
                    }).then(function successCallback(response) {
                        $scope.offreByRequest = response.data.list_offer_by_request;
                        for (var i = 0; i <= $scope.offreByRequest.length; i++) {
                            if ($scope.offreByRequest[i] != undefined) {
                                $scope.offre = $scope.offreByRequest[i].offer;
                                break;
                            }
                        };
                        ////console.log($scope.offre);
                    }).catch(function(err) {
                        if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                            deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                                $location.url('/access/login');
                                $state.go('access.login');
                            }).catch(function(response) {});
                        };
                    });
                };
                offreByIdRequestIdInstitut();

                /**
                 * @function confirmSuppOffre
                 * @param idOffre
                 * @description This function allow to delete offer.
                 */
                $scope.confirmSuppOffre = function() {
                    $scope.loading = true;
                    $scope.disabl = true;
                    if ($scope.offre != undefined) {
                        $http({
                            method: 'DELETE',
                            headers: {
                                'Authorization': 'Bearer ' + jeton
                            },
                            url: baseUrl + 'mon_espace/bank/request/offer/delete/' +
                                idADmin + '/' + $scope.offre.idOffre,
                        }).then(reloadRequest).catch(function(err) {
                            if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                                deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                                    $location.url('/access/login');
                                    $state.go('access.login');
                                }).catch(function(response) {});
                            };
                        });
                    }
                };
            }
        };

        function reloadRequest(response) {
            //console.log(response.data);
            $state.reload();
            //allDemandListByProduitSpot();
            $scope.ok();
        };

        /**
         * @function confirmSuppVlevel
         * @param idNiveauValidation
         * @description This function allow to delete validation_level.
         */
        $scope.confirmSuppVlevel = function() {
            $scope.loading = true;
            $scope.disabl = true;
            $http({
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
                url: baseUrl + 'validation_level/delete/' + idADmin + '/' + $scope.selectedRowVlevel.idNiveauValidation,
            }).then(reloadVlevel).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };

        function reloadVlevel() {
            //listValidationLevel();
            $state.reload();
            $scope.ok();
        };
        $scope.validationLevelList = [];

        /**
         * @function listValidationLevel
         * @description This function allow to list all validation_level.
         * @return validationLevelList
         */
        function listValidationLevel() {
            $scope.isDataReadyBkoffreEnAttentesV = false;
            $http({
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
                url: baseUrl + 'validation_level/list_institution/' + idInstitution,
            }).then(function successCallback(response) {
                $scope.validationLevelList = response.data.validation_level_list;
                $scope.isDataReadyBkoffreEnAttentesV = true;
                for (var i = 0; i < $scope.validationLevelList.length; i++) {
                    if ($scope.validationLevelList[i].sens === 'request') {
                        $scope.validationLevelList[i].sens = "Demande";
                    }
                    if ($scope.validationLevelList[i].sens === 'offer') {
                        $scope.validationLevelList[i].sens = "Offre";
                    }
                    if ($scope.validationLevelList[i].allsRequired === true) {
                        $scope.validationLevelList[i].allsRequired = "Toute la chaine";
                    }
                    if ($scope.validationLevelList[i].allsRequired === false) {
                        $scope.validationLevelList[i].allsRequired = "Pas toute la chaine";
                    }
                }
                ////console.log($scope.validationLevelList);
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };

        $scope.selectedRowNlevel = selectedRow;

        /**
         * @function confirmSuppNlevel
         * @param idGroupe, idNiveauValidation
         * @description This function allow to delete validation_level_groupe.
         */
        $scope.confirmSuppNlevel = function() {
            $scope.loading = true;
            $scope.disabl = true;
            $http({
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
                url: baseUrl + 'validation_level_groupe/delete/' + idADmin + '/' +
                    $scope.selectedRowNlevel.groupe.idGroupe + '/' +
                    $scope.selectedRowNlevel.validationLevel.idNiveauValidation,
            }).then(reloadNlevel).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };

        function reloadNlevel(response) {
            //console.log(response.data);
            //		listNivauValid();
            //		$state.reload();
            $scope.ok();
            $rootScope.$emit("CallNiveauValidation", {});
        };
        $scope.niveauValidList = [];

        /**
         * @function listNivauValid
         * @description This function allow to list all validation_level_groupe.
         * @return niveauValidList.
         */
        function listNivauValid() {
            $scope.isReadyDataBkniveauValidListV = false;
            $http({
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
                url: baseUrl + 'validation_level_groupe/list/' + idInstitution,
            }).then(function successCallback(response) {
                $scope.niveauValidList = response.data.validation_level_groupe_list;
                $scope.isReadyDataBkniveauValidListV = true;
                for (var i = 0; i < $scope.niveauValidList.length; i++) {
                    if ($scope.niveauValidList[i].validationLevel.sens === 'request') {
                        $scope.niveauValidList[i].validationLevel.sens = "Demande";
                    }
                    if ($scope.niveauValidList[i].validationLevel.sens === 'offer') {
                        $scope.niveauValidList[i].validationLevel.sens = "Offre";
                    }
                }
                ////console.log($scope.niveauValidList);
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };

        $scope.selectedRowNotif = selectedRow;


        /**
         * @function confirmNotif
         * @param idProduits, idUtilisateur, idInstitution in the url
         * @description This function allow to delete notification.
         */
        $scope.confirmNotif = function() {
            $scope.loading = true;
            $scope.disabl = true;
            $http({
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
                url: baseUrl + 'validation/notifications/delete/' + idADmin + '/' +
                    $scope.selectedRowNotif.products.idProduits + '/' +
                    $scope.selectedRowNotif.user.idUtilisateur + '/' +
                    $scope.selectedRowNotif.institution.idInstitution,
            }).then(reloadNotif).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };

        function reloadNotif(response) {
            //console.log(response.data);
            //		listNotification();
            //		$state.reload();
            $scope.ok();
            $rootScope.$emit("CallNotification", {});
        };

        /**
         * @function listNotification
         * @description This function allow to list all notification.
         * @return notificationList
         */
        function listNotification() {
            $http({
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
                url: baseUrl + 'validation/notifications/list/' + idADmin + '/' + idInstitution,

            }).then(function successCallback(response) {
                $scope.notificationList = response.data.notification;
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        /********************Suppression Categorie***********************/
        $scope.selectedRowCat = selectedRow;

        /**
         * @function confirDeleteCategorie
         * @param idCategorie in url
         * @description This function allow to delete categorie.
         */
        $scope.confirDeleteCategorie = function() {
            $scope.loading = true;
            $scope.disabl = true;
            $http({
                    method: "DELETE",
                    url: baseUrl + 'mon_espace/category/delete/' + idADmin + '/' + $scope.selectedRowCat.idCategory,
                    data: {},
                    headers: { 'Authorization': 'Bearer ' + jeton }
                })
                .then(function(data) {
                    //console.log(data);
                    if (data.data.status === 0) {
                        $scope.loading = false;
                        $state.reload();
                        $scope.ok();
                    } else {
                        //console.log("erreur de suppression..."+response);
                        //$scope.errorMessage=response.data.message;
                    }
                }).catch(function(err) {
                    if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                        deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                            $location.url('/access/login');
                            $state.go('access.login');
                        }).catch(function(response) {});
                    };
                });
            //$scope.selectedRow = selectedRow;
        };
        /********************FIN Suppression Categorie******************/

        function _errorSup(response) {
            //console.log(response.statusText);
        };
        $scope.ok = function() {
            $modalInstance.close();
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };

    }
]);

angular.module('app').controller('ctrlFilebank', function($scope, deconnectApi) {
    $scope.name = '';
    $scope.isPdf = false;
    var cntrl = this;

    $scope.setFile = function(element) {
        // //////console.log("ssss ",element);
        $scope.$apply(function($scope) {
            $scope.theFile = element.files[0];
            $scope.FileMessage = '';
            var filename = $scope.theFile.name;
            // //////console.log(filename.length)
            var index = filename.lastIndexOf(".");
            var strsubstring = filename.substring(index, filename.length);
            if (strsubstring == '.pdf') {
                $scope.isPdf = false;
                //////console.log('Fichier chargé avec succès');
            } else {
                $scope.isPdf = true;
                $scope.theFile = '';
                $scope.FileMessage = 'Fichier non .pdf';
            }
        });
    };
});

app.controller('DetailbankController', ['$scope', '$state', '$sce', '$uibModal', '$http', '$stateParams', '$location', '$timeout', 'deconnectApi', function($scope, $state, $sce, $modal, $http, $stateParams, $location, $timeout, deconnectApi) {
    var idADmin = sessionStorage.getItem("iduser");
    $scope.id = $stateParams.id;
    //console.log("$scope.id ",$scope.id);
    $scope.url_ = $stateParams.url_;
    //console.log("$scope.url_.."+$scope.url_);
    $scope.url_pdf = baseDocUrl + $scope.url_;
    //console.log("$scope.url_pdf ",$scope.url_pdf);
    $scope.name = $stateParams.name;
    $scope.listDocsRecus = [];
    $scope.infoDocRecu = null;
    $scope.separateurdel = '';
    // var baseurlDoc="http://localhost:8000/app/";
    // //console.log("$scope.url_pdf ",$scope.url_pdf);
    $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    };

    $scope.$on('url_pdf', function(events, args) {
        $scope.url_pdf = $scope.url_pdf;
        // $state.reload();
        if ($scope.$root && !$scope.$root.$$phase) {
            $scope.$apply();
        };
    });
    //	$scope.suppDocRecu = function () {
    //	var docuss = $scope.getDoc;
    //	var modalInstance = $modal.open({
    //	templateUrl: 'partials/admin_banque/deleteDocRecu.html',
    //	controller: 'SuppDocsBankController',
    //	resolve: {
    //	selectedRow : function () {
    //	return docuss;
    //	}
    //	}
    //	});
    //	};
    /*LISTE DES DOCUMENTS RECUS*/

    /**
     * @function listDocsRecus
     * @description This function allow to list all document received.
     * @return listDocsRecus
     */
    function listDocsRecus() {
        $http({
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + jeton
            },
            url: baseUrl + 'mon_espace/documents/list_received/' + parseInt(idADmin),
        }).then(function successCallback(response) {
            $scope.listDocsRecus = response.data.received_documents_list;
            for (var i = 0; i < $scope.listDocsRecus.length; i++) {
                if ($scope.listDocsRecus[i].documents.idDocuments == $scope.id) {
                    $scope.infoDocRecu = $scope.listDocsRecus[i];
                    break;
                };
            };
        }).catch(function(err) {
            if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                    $location.url('/access/login');
                    $state.go('access.login');
                }).catch(function(response) {});
            };
        });
    };
    listDocsRecus();
    /*FIN LISTE DES DOCUMENTS RECUS*/
    $scope.$watch("infoDocRecu", function(newValue, oldValue) {
        $scope.infoDocRecu = $scope.infoDocRecu;
        ////console.log("newValueok ",newValue);
        ////console.log("oldValueok ",oldValue);
    });
}]);
app.controller('SuppDocsBankController', ['$scope', '$rootScope', '$uibModalInstance', '$location', '$filter', '$interval', '$log', '$state', '$http', 'selectedRow', 'deconnectApi',
    function($scope, $rootScope, $modalInstance, $location, $filter, $interval, $log, $state, $http, selectedRow, deconnectApi) {

        var idADmin = sessionStorage.getItem("iduser");
        var idInstitution = sessionStorage.getItem("idInstitution");
        var idloc = sessionStorage.getItem("idloc");
        var idGrp = sessionStorage.getItem("idGrp");

        $scope.selectedRowDoc = selectedRow;
        //console.log($scope.selectedRowDoc);
        /**
         * @function confirmDeleteDocs
         * @param idDocument in url
         * @description This function allow to delete document.
         */
        $scope.confirmDeleteDocs = function() {
            $scope.loading = true;
            $scope.loading = true;
            $http({
                    method: "DELETE",
                    url: baseUrl + 'mon_espace/documents/delete_file/' + parseInt(idADmin) + '/' + parseInt($scope.selectedRowDoc),
                    data: {},
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
                })
                .then(function(data) {
                    //console.log(data);
                    if (data.data.status === 0) {
                        $scope.loading = false;
                        $state.reload();
                        $location.url('/eTreasury/banque/docs-recus');
                        $scope.ok();
                    } else {
                        //console.log("erreur de suppression..."+response);
                    }
                }).catch(function(err) {
                    if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                        deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                            $location.url('/access/login');
                            $state.go('access.login');
                        }).catch(function(response) {});
                    };
                });
        };

        function _error(response) {
            //console.log(response.statusText);
        };
        $scope.ok = function() {
            $scope.selectedRow = null;
            $modalInstance.close();
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };

    }
]);
app.controller('DetailDocBankByName', ['$scope', '$rootScope', '$state', '$sce', '$http', '$stateParams', 'deconnectApi', function($scope, $rootScope, $state, $sce, $http, $stateParams, deconnectApi) {
    var idADmin = sessionStorage.getItem("iduser");
    $scope.id = $stateParams.id;
    $scope.name = $stateParams.name;
    $scope.named = $stateParams.named;
    $scope.url_ = $stateParams.url_;
    $scope.boolAudit = true;
    $scope.isDocClicked = true;
    $scope.listDocsbyUserAndCats = [];
    //console.log($scope.url_);
    $scope.docClickedSrc = baseDocUrl + $scope.url_;

    console.log("$scope.docClickedSrc ", $scope.docClickedSrc);

    $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    };

    $rootScope.$broadcast('DetailDocBankByName', { documenId: $scope.id });

    $scope.$watch("docClickedSrc", function(newValue, oldValue) {
        $scope.docClickedSrc = $scope.docClickedSrc;
        // $state.reload();
        if ($scope.$root && !$scope.$root.$$phase) {
            $scope.$apply();
        };
    });

    $scope.$on('nom_cat', function(events, args) {
        //console.log("nom_cat ",args.nom_cat);
        $scope.name = args.nom_cat;
        if ($scope.$root && !$scope.$root.$$phase) {
            $scope.$apply();
        };
    });

}]);

app.filter('trusted', ['$sce', function($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);
/**********************************************************************/
/***************************CONTROLLER MARCHE BANK*********************/
/**********************************************************************/
angular.module('app').controller('MarcheBankController', ['$scope', '$rootScope', '$uibModalInstance', '$filter', '$interval', '$log', '$state', '$http', '$timeout', 'selectedRow', 'deconnectApi',
    function($scope, $rootScope, $modalInstance, $filter, $interval, $log, $state, $http, $timeout, selectedRow, deconnectApi) {

        var idADmin = sessionStorage.getItem("iduser");
        var idInstitution = sessionStorage.getItem("idInstitution");
        var idloc = sessionStorage.getItem("idloc");
        var idGrp = sessionStorage.getItem("idGrp");
        var jeton = localStorage.getItem('jeton');
        $scope.spinner = "loading.gif";
        $scope.sucessMessage = null;
        $scope.errorMessage = null;

        $scope.idProduitChang = '';
        $scope.idProduitTrans = '';
        $scope.idProduitDepot = '';
        $scope.idProduitSpot = '';
        $scope.idProduitEscom = '';

        //$rootScope.$emit("ProduitCall", {});

        listProduits();

        /**
         * @function listProduits
         * @description This function allow to liste all product.
         * @return etreasuryProduit:[]
         */
        function listProduits() {
            $http({
                method: 'GET',
                url: baseUrl + 'admin/product/list',
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
            }).then(function successCallback(response) {
                $scope.etreasuryProduit = response.data.list_products;
                for (var i = 0; i < $scope.etreasuryProduit.length; i++) {
                    if ($scope.etreasuryProduit[i].nom.indexOf('CHANGE') !== -1) {
                        $scope.idProduitChang = $scope.etreasuryProduit[i].idProduits;
                    }
                    if ($scope.etreasuryProduit[i].nom.indexOf('TRANSFERT') !== -1) {
                        $scope.idProduitTrans = $scope.etreasuryProduit[i].idProduits;
                    }
                    if ($scope.etreasuryProduit[i].nom.indexOf('SPOT') !== -1) {
                        $scope.idProduitSpot = $scope.etreasuryProduit[i].idProduits;
                    }
                    if ($scope.etreasuryProduit[i].nom.indexOf('TERME') !== -1) {
                        $scope.idProduitDepot = $scope.etreasuryProduit[i].idProduits;
                    }
                    if ($scope.etreasuryProduit[i].nom.indexOf('ESCOMPTE') !== -1) {
                        $scope.idProduitEscom = $scope.etreasuryProduit[i].idProduits;
                    }
                }
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        /**************DEBUT TAUX SPOT*******************/
        $scope.selectedSpot = selectedRow;
        var str = $scope.selectedSpot.duree;
        if ($scope.selectedSpot != undefined) {
            if (str != null) {
                if (str.length === 2) {
                    $scope.dureeSpot = parseInt(str.substring(0, 1));
                    $scope.maSpot = str.substring(1, 2);
                };
                if (str.length === 3) {
                    $scope.dureeSpot = parseInt(str.substring(0, 2));
                    $scope.maSpot = str.substring(2, 3);
                }
            }
            $scope.valTauxSpot = parseInt($scope.selectedSpot.valeur);
            $scope.dateSpot = $scope.selectedSpot.dateValeur;
        };


        /**
         * @function listDevises
         * @description This function allow to liste all devise.
         * @return deviseslist:[]
         */
        function listDevises() {
            $http({
                method: 'GET',
                url: baseUrl + '/admin/devise/list',
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
            }).then(function successCallback(response) {
                //$scope.deviseslist = response.data.devise_list
                $scope.deviseslist = response.data.devise_list.filter(function(devise) {
                    return devise.valeur != 1;
                });

                ////console.log($scope.deviseslist);
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

        //day today
        $scope.dateSpot = new Date();

        $scope.changeDateSpot = function(date) {
            $scope.dateSpot = date;
        }

        $scope.spot = { duree: "", valeur: "", dateDebutValidite: "", produitsIdProduits: -1, idTauxJour: '' };

        /**
         * @function submitTauxSpot
         * @param duree,taux,date,maSpot
         * @description This function allow to add and update rate Spot
         */
        $scope.submitTauxSpot = function(duree, taux, date, maSpot) {
            $scope.disabl = true;
            ////console.log(duree,taux,date,$scope.idProduitSpot);
            $scope.loading = true;
            $scope.spot.duree = duree + "" + maSpot;
            $scope.spot.valeur = taux;
            $scope.spot.dateDebutValidite = $scope.dateSpot;
            $scope.spot.produitsIdProduits = parseInt($scope.idProduitSpot);
            var method = "";
            var url = "";
            if ($scope.selectedSpot.idTauxJour === undefined) {
                method = "POST";
                url = baseUrl + 'mon_espace/bank/rate_of_day/add/' + idADmin;
            } else {
                $scope.spot.idTauxJour = $scope.selectedSpot.idTauxJour;
                method = "PUT";
                url = baseUrl + 'mon_espace/bank/rate_of_day/update/' + idADmin;
            }
            $http({
                method: method,
                url: url,
                data: angular.toJson($scope.spot),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + jeton
                }
            }).then(reloadZ).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };

        function reloadZ(response) {
            $scope.idStatus = response.data.status;
            if ($scope.idStatus === 0) {
                $scope.loading = false;
                $scope.errorMessage = null;
                $state.reload();
                $scope.ok();
            } else {
                $scope.sucessMessage = null;
                $scope.errorMessage = response.data.message;
            }
        };

        /**
         * @function confirmDeleteTaux
         * @param idTauxJour in url
         * @description This function allow to delete rate Spot
         */
        $scope.confirmDeleteTaux = function() {
            $scope.loading = true;
            $http({
                    method: "DELETE",
                    url: baseUrl + 'mon_espace/bank/rate_of_day/delete/' + parseInt(idADmin) + '/' + parseInt($scope.selectedSpot.idTauxJour),
                    headers: { 'Authorization': 'Bearer ' + jeton }
                })
                .then(function(data) {
                    //console.log(data);
                    if (data.data.status === 0) {
                        $scope.loading = false;
                        $scope.ok();
                        $rootScope.$emit("CallTaux", {});
                    } else {
                        //console.log("erreur de suppression..."+response);
                    }
                }).catch(function(err) {
                    if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                        deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                            $location.url('/access/login');
                            $state.go('access.login');
                        }).catch(function(response) {});
                    };
                });
        };

        function reloadSpot(response) {
            //console.log(response);
            $scope.idStatus = response.data.status;
            if ($scope.idStatus === 0) {
                $scope.loading = false;
                $scope.errorMessage = null;
                //$state.reload();
                $rootScope.$emit("CallTaux", {});
                $scope.ok();
            } else {
                $scope.sucessMessage = null;
                $scope.errorMessage = response.data.message;
            }
        };
        /*************FIN TAUX SPOT***************************/

        /*************DEBUT TAUX CHANG***************************/
        $scope.selectedChange = selectedRow;

        if ($scope.selectedChange.produitsIdProduits != undefined) {
            $scope.deviseChang = $scope.selectedChange.devise;
            $scope.achatChang = $scope.selectedChange.achat;
            $scope.venteChang = $scope.selectedChange.vente;
            $scope.dateChang = $scope.selectedChange.dateDebutValidite;
        }
        $scope.dateChang = new Date();
        $scope.changeDateChang = function(date) {
            $scope.dateChang = date;
        }
        $scope.change = { devise: '', achat: '', duree: '', vente: '', dateDebutValidite: '', produitsIdProduits: -1, idTauxJour: '' };

        /**
         * @function submitTauxChange
         * @param deviseChang,achatChang,venteChang,dateChang
         * @description This function allow to add and update rate change
         */
        $scope.submitTauxChange = function(deviseChang, achatChang, venteChang, dateChang) {
            ////console.log(deviseChang,achatChang,venteChang,dateChang);
            $scope.loading = true;
            $scope.disabl = true;
            $scope.change.devise = deviseChang;
            $scope.change.achat = achatChang;
            $scope.change.vente = venteChang;
            $scope.change.duree = "";
            $scope.change.dateDebutValidite = $scope.dateChang;
            $scope.change.produitsIdProduits = parseInt($scope.idProduitChang);
            var method = "";
            var url = "";
            if ($scope.selectedChange.idTauxJour === undefined) {
                method = "POST";
                url = baseUrl + 'mon_espace/bank/rate_of_day/add/' + idADmin;
            } else {
                $scope.change.idTauxJour = $scope.selectedChange.idTauxJour;
                method = "PUT";
                url = baseUrl + 'mon_espace/bank/rate_of_day/update/' + idADmin;
            }
            $http({
                method: method,
                url: url,
                data: angular.toJson($scope.change),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + jeton
                }
            }).then(reloadSpot).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };

        /**
         * @function confirmDeleteTauxChang
         * @param idTauxJour in url
         * @description This function allow to delete rate change
         */
        $scope.confirmDeleteTauxChang = function() {
            $scope.loading = true;
            $scope.disabl = true;
            $http({
                    method: "DELETE",
                    url: baseUrl + 'mon_espace/bank/rate_of_day/delete/' + parseInt(idADmin) + '/' + parseInt($scope.selectedChange.idTauxJour),
                    data: {},
                    headers: { 'Authorization': 'Bearer ' + jeton }
                })
                .then(function(data) {
                    //console.log(data);
                    if (data.data.status === 0) {
                        $scope.loading = false;
                        $scope.ok();
                        $rootScope.$emit("CallTaux", {});
                    } else {
                        //console.log("erreur de suppression..."+response);
                    }
                }).catch(function(err) {
                    if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                        deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                            $location.url('/access/login');
                            $state.go('access.login');
                        }).catch(function(response) {});
                    };
                });
        };
        /*************FIN TAUX CHANG***************************/
        /*************DEBUT TAUX DEPOT*************************/

        $scope.depot = { duree: "", valeur: "", dateDebutValidite: "", produitsIdProduits: -1, idTauxJour: '' };

        $scope.selectedDepot = selectedRow;
        $scope.date_d = new Date();
        $scope.changeDateDep = function(date) {
            $scope.date_d = date;
        };
        var strDp = $scope.selectedDepot.duree;
        if ($scope.selectedDepot != undefined) {
            if (strDp != null) {
                if (strDp.length === 2) {
                    $scope.dureeD = parseInt(strDp.substring(0, 1));
                    $scope.maD = strDp.substring(1, 2);
                };
                if (strDp.length === 3) {
                    $scope.dureeD = parseInt(strDp.substring(0, 2));
                    $scope.maD = strDp.substring(2, 3);
                }
            }
            $scope.val_tauxD = parseInt($scope.selectedDepot.valeur);
            $scope.date_ = $scope.selectedDepot.dateDebutValidite;
        }


        /**
         * @function submitTauxDepot
         * @param dureeDepot,val_tauxDepot,date_,maDepot
         * @description This function allow to add and update rate Depot a terme
         */
        $scope.submitTauxDepot = function(dureeDepot, val_tauxDepot, date_, maDepot) {
            ////console.log(duree,taux,new Date(),$scope.idProduitDepot);
            $scope.loading = true;
            $scope.disabl = true;
            $scope.depot.duree = dureeDepot + "" + maDepot;
            $scope.depot.valeur = val_tauxDepot;
            $scope.depot.dateDebutValidite = $scope.date_d;
            $scope.depot.produitsIdProduits = parseInt($scope.idProduitDepot);
            var method = "";
            var url = "";
            if ($scope.selectedDepot.idTauxJour === undefined) {
                method = "POST";
                url = baseUrl + 'mon_espace/bank/rate_of_day/add/' + idADmin;
            } else {
                $scope.depot.idTauxJour = $scope.selectedDepot.idTauxJour;
                method = "PUT";
                url = baseUrl + 'mon_espace/bank/rate_of_day/update/' + idADmin;
            }
            $http({
                method: method,
                url: url,
                data: angular.toJson($scope.depot),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + jeton
                }
            }).then(reloadSpot).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };

        /**
         * @function confirmTauxDepot
         * @param idTauxJour in url
         * @description This function allow to delete rate Depot a terme
         */
        $scope.confirmTauxDepot = function() {
            $scope.loading = true;
            $scope.disabl = true;
            $http({
                    method: "DELETE",
                    url: baseUrl + 'mon_espace/bank/rate_of_day/delete/' + parseInt(idADmin) + '/' + parseInt($scope.selectedDepot.idTauxJour),
                    data: {},
                    headers: { 'Authorization': 'Bearer ' + jeton }
                })
                .then(function(data) {
                    //console.log(data);
                    if (data.data.status === 0) {
                        $scope.loading = false;
                        $scope.ok();
                        $rootScope.$emit("CallTaux", {});
                    } else {
                        //console.log("erreur de suppression..."+response);
                    }
                }).catch(function(err) {
                    if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                        deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                            $location.url('/access/login');
                            $state.go('access.login');
                        }).catch(function(response) {});
                    };
                });
        };
        /*************FIN TAUX DEPOT***************************/

        /****************DEBUT TAUX TRANSFERT*******************/
        $scope.selectedTransfert = selectedRow;

        $scope.dateTrans = new Date();
        /*if ($scope.selectedTransfert.produitsIdProduits != undefined) {
            $scope.tauxTrans = parseInt($scope.selectedTransfert.valeur);
            $scope.dateTrans = $scope.selectedTransfert.dateValeur;
        }*/

        $scope.changeDateTrans = function(dateT) {
            $scope.dateTransfer = dateT;
        };
        if ($scope.selectedTransfert != undefined) {
            $scope.tauxTrans = parseInt($scope.selectedTransfert.valeur);
            $scope.dateTransfer = $scope.selectedTransfert.dateDebutValidite;
            console.log($scope.dateTransfer);
        }
        $scope.transfert = { duree: "", valeur: "", dateDebutValidite: "", produitsIdProduits: -1, idTauxJour: '' };
        $scope.disabl = false;
        /**
         * @function submitTauxTrans
         * @param dateTrans,tauxTrans
         * @description This function allow to add and update rate transfert
         */
        $scope.submitTauxTrans = function(dateTrans, tauxTrans) {
            $scope.disabl = true;
            //console.log(dateTrans,tauxTrans,$scope.idProduitTrans);
            $scope.loading = true;
            $scope.transfert.valeur = tauxTrans;
            $scope.transfert.dateDebutValidite = $scope.dateTransfer;
            $scope.transfert.produitsIdProduits = parseInt($scope.idProduitTrans);
            var method = "";
            var url = "";
            if ($scope.selectedTransfert.idTauxJour === undefined) {
                method = "POST";
                url = baseUrl + 'mon_espace/bank/rate_of_day/add/' + idADmin;
            } else {
                $scope.spot.idTauxJour = $scope.selectedTransfert.idTauxJour;
                method = "PUT";
                url = baseUrl + 'mon_espace/bank/rate_of_day/update/' + idADmin;
            }
            $http({
                method: method,
                url: url,
                data: angular.toJson($scope.transfert),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + jeton
                }
            }).then(reloadSpot).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };

        /**
         * @function confirmTauxTransfert
         * @param idTauxJour in url
         * @description This function allow to delete rate transfert
         */
        $scope.confirmTauxTransfert = function() {
            $scope.loading = true;
            $scope.disabl = true;
            $http({
                    method: "DELETE",
                    url: baseUrl + 'mon_espace/bank/rate_of_day/delete/' + parseInt(idADmin) + '/' + parseInt($scope.selectedTransfert.idTauxJour),
                    data: {},
                    headers: { 'Authorization': 'Bearer ' + jeton }
                })
                .then(function(data) {
                    //console.log(data);
                    if (data.data.status === 0) {
                        $scope.loading = false;
                        $scope.ok();
                        $rootScope.$emit("CallTaux", {});
                    } else {
                        //console.log("erreur de suppression..."+response);
                    }
                }).catch(function(err) {
                    if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                        deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                            $location.url('/access/login');
                            $state.go('access.login');
                        }).catch(function(response) {});
                    };
                });
        };
        /****************FIN TAUX TRANSFERT*******************/
        function _error(response) {
            //console.log(response);
        };
        $scope.ok = function() {
            $scope.selectedRow = null;
            $modalInstance.close();
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    }
]);

/**********************************************************************/
/***************************DEVISES CONTROLLER*************************/
/**********************************************************************/
angular.module('app').controller('DeviseController', ['$scope', '$uibModal', '$rootScope', '$interval', '$log', '$state', '$sce', '$http', '$stateParams', 'deconnectApi',
    function($scope, $modal, $rootScope, $interval, $log, $state, $sce, $http, $stateParams, deconnectApi) {

        var idADmin = sessionStorage.getItem("iduser");
        var idInstitution = sessionStorage.getItem("idInstitution");
        var idloc = sessionStorage.getItem("idloc");
        var idGrp = sessionStorage.getItem("idGrp");
        var jeton = localStorage.getItem('jeton');
        $scope.isuserInsessionLine = 0;
        $scope.errorMessage = null;
        $scope.audjourdhui = new Date();

        $scope.deviseslist = [];

        /**
         * @function addDevise
         * @description This function allow to list all divice
         * @return deviseslist:[]
         */
        function listDevises() {
            $scope.isReadyDevise = false;
            $http({
                method: 'GET',
                url: baseUrl + '/admin/devise/list',
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
            }).then(function successCallback(response) {
                $scope.deviseslist = response.data.devise_list;
                //			//console.log($scope.deviseslist);
                $scope.isReadyDevise = true;
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
        /**
         * @function addDevise
         * @description This function allow to show modal devise add
         */
        $scope.addDevise = function() {
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_etreasury/etreasury/addDevise.html',
                controller: 'DevisesActionController',
                resolve: {
                    selectedRow: function() {
                        return $scope.items;
                    }
                }
            });
            modalInstance.result.then(function(selectedItem) {
                $scope.selected = selectedItem;
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
        /**
         * @function editDevise
         * @param devise:{}
         * @description This function allow to show modal devise update
         */
        $scope.editDevise = function(devise) {
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_etreasury/etreasury/addDevise.html',
                controller: 'DevisesActionController',
                resolve: {
                    selectedRow: function() {
                        return devise;
                    }
                }
            });

        };

        /**
         * @function suppDevise
         * @param devise:{}
         * @description This function allow to show modal devise delete
         */
        $scope.suppDevise = function(devise) {
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_etreasury/etreasury/deleteDevise.html',
                controller: 'DevisesActionController',
                resolve: {
                    selectedRow: function() {
                        return devise;
                    }
                }
            });

        };

    }
]);
/**********************************************************************/
/***************************SUBMIT DEVISES CONTROLL********************/
/**********************************************************************/
angular.module('app').controller('DevisesActionController', ['$scope', '$rootScope', '$uibModalInstance', '$filter', '$interval', '$log', '$state', '$http', '$timeout', 'selectedRow', 'deconnectApi',
    function($scope, $rootScope, $modalInstance, $filter, $interval, $log, $state, $http, $timeout, selectedRow, deconnectApi) {

        var idADmin = sessionStorage.getItem("iduser");
        var idInstitution = sessionStorage.getItem("idInstitution");
        var idloc = sessionStorage.getItem("idloc");
        var idGrp = sessionStorage.getItem("idGrp");
        var jeton = localStorage.getItem("jeton");
        $scope.spinner = "loading.gif";
        $scope.sucessMessage = null;
        $scope.errorMessage = null;
        $scope.disabl = false;
        $scope.selectedDevise = selectedRow;

        if ($scope.selectedDevise != undefined) {
            $scope.valeur = $scope.selectedDevise.valeur;
            $scope.description = $scope.selectedDevise.description;
        }

        $scope.deviseModel = { description: "", valeur: "", idDevise: '' };

        /**
         * @function submitDevise
         * @param descr,valeur
         * @description This function allow to add and update devise
         * switch idDevise is undefined or not
         */
        $scope.submitDevise = function(descr, valeur) {
            //console.log(descr,valeur);
            $scope.loading = true;
            $scope.disabl = true;
            $scope.deviseModel.description = descr;
            $scope.deviseModel.valeur = valeur;
            $scope.deviseModel.idDevise = $scope.selectedDevise.idDevise;
            var method = "";
            var url = "";
            if ($scope.selectedDevise.idDevise === undefined) {
                method = "POST";
                url = baseUrl + 'admin/devise/add/' + idADmin;
            } else {
                $scope.deviseModel.idDevise = $scope.selectedDevise.idDevise;
                method = "PUT";
                url = baseUrl + 'admin/devise/update/' + idADmin;
            }
            $http({
                method: method,
                url: url,
                data: angular.toJson($scope.deviseModel),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + jeton
                }
            }).then(reloadDevis).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };

        function reloadDevis(response) {
            console.log(response);
            $scope.idStatus = response.data.status;
            if ($scope.idStatus === 0) {
                $scope.loading = false;
                $scope.errorMessage = null;
                $state.reload();
                $scope.ok();
                listDevises();
            } else {
                $scope.sucessMessage = null;
                $scope.errorMessage = response.data.message;
            }
        };

        /**
         * @function listDevises
         * @param idDevise in url
         * @description This function allow to list all devise
         */
        function listDevises() {
            $scope.isReadyDevise = false;
            $http({
                method: 'GET',
                url: baseUrl + '/admin/devise/list',
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
            }).then(function successCallback(response) {
                $scope.deviseslist = response.data.devise_list;
                //					//console.log($scope.deviseslist);
                $scope.isReadyDevise = true;
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };

        /**
         * @function confirmSuppDevise
         * @param idDevise in url
         * @description This function allow to delete object devise
         */
        $scope.confirmSuppDevise = function() {
            $scope.loading = true;
            $http({
                    method: "DELETE",
                    url: baseUrl + 'admin/devise/delete/' + parseInt(idADmin) + '/' + parseInt($scope.selectedDevise.idDevise),
                    data: {},
                    headers: { 'Authorization': 'Bearer ' + jeton }
                })
                .then(function(data) {
                    //console.log(data);
                    if (data.data.status === 0) {
                        $scope.loading = false;
                        $state.reload();
                        $scope.ok();
                        $scope.errorMessage = null;
                        //listDevises();
                        //$rootScope.$emit("CallDevise", {});
                    } else {
                        $scope.sucessMessage = null;
                        $scope.errorMessage = data.data.message;
                    }
                }).catch(function(err) {
                    if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                        deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                            $location.url('/access/login');
                            $state.go('access.login');
                        }).catch(function(response) {});
                    };
                });
        };
        /****************FIN TAUX TRANSFERT*******************/
        function _error(response) {
            //console.log(response);
        };
        $scope.ok = function() {
            $scope.selectedRow = null;
            $modalInstance.close();
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    }
]);
/**********************************************************************/
/***************************SUBMIT DEVISES CONTROLL********************/
/**********************************************************************/
angular.module('app').controller('BankConditionCtroller', ['$scope', '$rootScope', '$uibModalInstance', '$filter', '$interval', '$log', '$state', '$http', '$timeout', 'selectedRow', 'deconnectApi',
    function($scope, $rootScope, $modalInstance, $filter, $interval, $log, $state, $http, $timeout, selectedRow, deconnectApi) {
        var idADmin = sessionStorage.getItem("iduser");
        var idInstitution = sessionStorage.getItem("idInstitution");
        var idloc = sessionStorage.getItem("idloc");
        var idGrp = sessionStorage.getItem("idGrp");
        var jeton = localStorage.getItem("jeton");
        $scope.spinner = "loading.gif";
        $scope.sucessMessage = null;
        $scope.errorMessage = null;

        $scope.selectedBkCondition = selectedRow;
        $scope.boolFile = false;
        if ($scope.selectedBkCondition != undefined) {
            ////console.log(nom,famille,categorie,taux,produit.idProduits,file);
            $scope.nom = $scope.selectedBkCondition.nom;
            $scope.famille = $scope.selectedBkCondition.famille;
            $scope.categorie = $scope.selectedBkCondition.categorie;
            $scope.taux = $scope.selectedBkCondition.tauxStandard;
            $scope.produit = $scope.selectedBkCondition.product;

            if ($scope.selectedBkCondition.isAttachedFile === true) {
                var indexFile = $scope.selectedBkCondition.urlFile.lastIndexOf(".");
                var strsubstring = $scope.selectedBkCondition.urlFile.substring(indexFile,
                    $scope.selectedBkCondition.urlFile.length);
                $scope.nomFile = $scope.selectedBkCondition.nomDocument + strsubstring;
                $scope.boolFile = true;
                //console.log("$scope.nomFile..."+$scope.nomFile);
                $scope.urlCSV = baseDocCSV + $scope.selectedBkCondition.urlFile;
            } else {
                $scope.IsVisible = true;
            }
            //$scope.file = $scope.selectedBkCondition.file;
        };

        $scope.etreasuryProduit = [];
        /**
         * @function listProduits
         * @description This function allow to list all produit
         * @return etreasuryProduit:[]
         */
        function listProduits() {
            $http({
                method: 'GET',
                url: baseUrl + 'admin/product/list',
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
            }).then(function successCallback(response) {
                $scope.etreasuryProduit = response.data.list_products;
                //$log.info($scope.etreasuryProduit);
            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        listProduits();
        //$scope.bankCondition={idConditionBanque:-1, famille:"",categorie:"",specificite:"" ,produit:""};
        var message = '';
        $scope.disabl = false;

        /**
         * @function submitBanqueCondition
         * @param nom,famille,categorie,taux,produit,fileDocbk
         * @description This function allow to add bank Condition
         */
        $scope.submitBanqueCondition = function(nom, famille, categorie, taux, produit, fileDocbk) {
            if (fileDocbk != undefined) {
                //console.log(nom,famille,categorie,taux,produit,fileDocbk[0]);
            }

            $scope.loading = true;
            $scope.disabl = true;
            var url = baseUrl + 'admin/bank_conditions/add/' + parseInt(idADmin);
            var data = new FormData();
            data.append('nom', nom);
            if (fileDocbk != undefined) {
                data.append('file', fileDocbk[0]);
            }
            data.append('famille', famille);
            data.append('categorie', categorie);
            data.append('taux_standard', taux);
            data.append('id_banque', parseInt(idInstitution));
            data.append('id_product', parseInt(produit.idProduits));
            var config = {
                transformRequest: angular.identity,
                transformResponse: angular.identity,
                headers: {
                    'Content-Type': undefined,
                    'Authorization': 'Bearer ' + jeton
                }
            }
            $http({ method: "POST", url: url, data: data, headers: config.headers }).then(function(response) {
                $scope.okResponse = response;
                //console.log(response);
                if (response.data.status != -1) {
                    $state.reload();
                    $scope.ok();
                    $scope.loading = false;
                } else {
                    message = response.data.message;
                    $scope.errorMessage = message;
                };

            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };

        /**
         * @function updateBanqueCondition
         * @param nom,famille,categorie,taux,produit,fileDocbk
         * @description This function allow to update bank Condition
         */
        $scope.updateBanqueCondition = function(nom, famille, categorie, taux, produit, fileDocbk) {
            //console.log(nom,famille,categorie,taux,produit.idProduits);
            $scope.loading = true;
            $scope.disabl = true;
            var url = baseUrl + 'admin/bank_conditions/update/' + parseInt(idADmin) + '/' + $scope.selectedBkCondition.idConditionBanque;
            var data = new FormData();
            data.append('nom', nom);
            if (fileDocbk != undefined) {
                data.append('file', fileDocbk[0]);
            }
            data.append('famille', famille);
            data.append('categorie', categorie);
            data.append('taux_standard', taux);
            data.append('id_banque', parseInt(idInstitution));
            data.append('id_product', parseInt(produit.idProduits));
            var config = {
                transformRequest: angular.identity,
                transformResponse: angular.identity,
                headers: {
                    'Content-Type': undefined,
                    'Authorization': 'Bearer ' + jeton
                }
            }
            $http({ method: "POST", url: url, data: data, headers: config.headers }).then(function(response) {
                $scope.okResponse = response.data;
                //console.log($scope.okResponse);
                if (response.data.status != -1) {
                    $state.reload();
                    $scope.ok();
                    $scope.loading = false;
                } else {
                    message = response.data.message;
                    $scope.errorMessage = message;
                };

            }).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };
        $scope.IsVisible = false;

        $scope.ShowTable = function(value) {
            $scope.IsVisible = value == "Y";
        }
        $scope.confirmSuppBankCond = function() {
            $scope.disabl = true;
            $scope.loading = true;
            $http({
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
                url: baseUrl + 'admin/bank_conditions/delete/' + parseInt(idADmin) + '/' + $scope.selectedBkCondition.idConditionBanque,
            }).then(reloadListBankCond).catch(function(err) {
                if (err.status == 500 && localStorage.getItem('jeton') != '' && localStorage.getItem('jeton') != null && localStorage.getItem('jeton') != undefined) {
                    deconnectApi.logout(sessionStorage.getItem("iduser")).then(function(response) {
                        $location.url('/access/login');
                        $state.go('access.login');
                    }).catch(function(response) {});
                };
            });
        };

        function _errorSup(response) {
            //console.log(response.statusText);
        };

        function reloadListBankCond(response) {
            if (response.data.status === 0) {
                $state.reload();
                $scope.ok();
                $scope.errorMessage = null;
            } else {
                $scope.errorMessage = response.data.message;
            }
            //listBankConditions();
            //$state.reload();
        }

        //			$scope.submitBanqueCondition = function(){
        //			$scope.bankCondition.nom=$scope.nomU;
        //			$scope.bankCondition.idConditionBanque=$scope.idConditionBanque;

        //			var method = "";
        //			var url = "";
        //			if($scope.idUserEntreprise === -1){
        //			method = "POST";
        //			url = baseUrl+'admin/user_admin/add/entreprise/'+$scope.entrepriseU.idInstitution;
        //			} else {
        //			method = "PUT";
        //			url = baseUrl+'admin/user_admin/update/entreprise/'+$scope.idUserEntreprise;
        //			}

        //			$http({
        //			method : method,
        //			url : url,
        //			data : angular.toJson($scope.userEntreprise),
        //			headers : {
        //			'Content-Type' : 'application/json'
        //			}
        //			}).then( reloadLBK, _error );
        //			};
        function reloadLBK() {
            $scope.errorMessage = response.data.message;
            listBankConditions();
            $state.reload();
        };
        $scope.upload = function() {
                //console.log($scope.fileDocbk)

            }
            /****************FIN BANK CONDITIONS*******************/
        function _error(response) {
            //console.log(response);
        };
        $scope.ok = function() {
            $scope.selectedRow = null;
            $modalInstance.close();
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };

    }
]);
/* CONTROLE FILE OPERATION */
angular.module('app').controller('ctrlFileBANK', function($scope, deconnectApi) {
    /**********************************************/
    $scope.name = '';
    $scope.isPdf = false;
    var cntrl = this;

    /**
     * @function setFile
     * @param element:{}
     * @description This function allow verify .csv, .xls and .xlsx file 
     */
    $scope.setFile = function(element) {
        // //////console.log("ssss ",element);
        $scope.$apply(function($scope) {
            $scope.theFile = element.files[0];
            $scope.FileMessage = '';
            var filename = $scope.theFile.name;
            // //////console.log(filename.length)
            var index = filename.lastIndexOf(".");
            var strsubstring = filename.substring(index, filename.length);
            if (strsubstring == '.csv' || strsubstring == '.xls' || strsubstring == '.xlsx') {
                $scope.isPdf = false;
                //////console.log('Fichier chargé avec succès');
            } else {
                $scope.isPdf = true;
                $scope.theFile = '';
                $scope.FileMessage = 'Fichier non pris en compte';
            }
        });
    };
    cntrl.submitForm = function() {
        var file = cntrl.form.payloadFile;
        if ($scope.uploadedFileType === undefined) {
            return;
        }
        if ($scope.uploadedFileType != 'csv' || $scope.uploadedFileType != 'xls' || $scope.uploadedFileType != 'xlsx') {
            $scope.isPdf = true;
            document.getElementById('payloadFile').setCustomValidity('Seulement les fichiers csv, xls ou xlsx sont supportés');

        } else {
            // $scope.$emit('closemodal');
            //////console.log("Cooooooooo");
            $scope.ok();
            // $rootScope.$broadcast('a');
            document.getElementById('payloadFile').setCustomValidity('');
        }
    };

    /**********************************************/
});
/*FIN CONTROLE FILE OPERATION */
app.directive("filesInput", function() {
    return {
        require: "ngModel",
        link: function postLink(scope, elem, attrs, ngModel) {
            elem.on("change", function(e) {
                var files = elem[0].files;
                ngModel.$setViewValue(files);
            })
        }
    }
})