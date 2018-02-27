/**
 * @author Mamadou FAYE <mamadou.faye@qualshore.com>
 * @copyright 2017-2018 Qualshore. All rights reserved.
 */

//$.getScript("appli.js");
$.getScript("app.url.js");

/************************CONTROLLER ENTREPRISE************************/
/*********************************************************************/
angular.module('app').controller('entrepriseController', ['$scope', '$uibModal', '$rootScope', '$log', '$state', '$http', 'deconnectApi',
    function($scope, $modal, $rootScope, $log, $state, $http, deconnectApi) {

        var idADmin = sessionStorage.getItem("iduser");
        var idInstitution = sessionStorage.getItem("idInstitution");
        var idloc = sessionStorage.getItem("idloc");
        $scope.isuserInsessionLine = 0;
        $scope.errorMessage = null;

        /****************DEBUT CHAINE DE VALIDATION******************/

        /**
         * @function addNouvelleChaine
         * @description This function allow to show template add chane.
         */
        $scope.addNouvelleChaine = function() {
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_entreprise/mes_operations/register_op_adm_vnb.html',
                controller: 'popupEntrepriseController',
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

        $rootScope.$on("CallListValidationLevel", function() {
            $scope.listValidationLevelCall();
        });

        /**
         * @function listValidationLevelCall
         * @description This function allow to list all validation level.
         * this function is used in CUD operations
         * @returns $scope.validationLevelList:[]
         */
        $scope.listValidationLevelCall = function() {
            $http({
                method: 'GET',
                url: baseUrl + 'validation_level/list_institution/' + idInstitution,
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function successCallback(response) {
                $scope.validationLevelList = response.data.validation_level_list;
                if ($scope.validationLevelList != undefined) {
                    for (var i = 0; i < $scope.validationLevelList.length; i++) {
                        //					if ($scope.validationLevelList[i].sens==='request') {
                        //						$scope.validationLevelList[i].sens="Demande";
                        //					}
                        //					if ($scope.validationLevelList[i].sens==='offer') {
                        //						$scope.validationLevelList[i].sens="Offre";
                        //					}
                        if ($scope.validationLevelList[i].allsRequired === true) {
                            $scope.validationLevelList[i].allsRequired = "Toute la chaine";
                        }
                        if ($scope.validationLevelList[i].allsRequired === false) {
                            $scope.validationLevelList[i].allsRequired = "Pas toute la chaine";
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
        }

        /**
         * @function listValidationLevel
         * @description This function allow to list all validation level.
         * @returns $scope.validationLevelList:[]
         */
        function listValidationLevel() {
            $scope.isReadyDataEnvalidationLevelList = false;
            $http({
                method: 'GET',
                url: baseUrl + 'validation_level/list_institution/' + idInstitution,
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function successCallback(response) {
                $scope.validationLevelList = response.data.validation_level_list;
                if ($scope.validationLevelList != undefined) {
                    for (var i = 0; i < $scope.validationLevelList.length; i++) {
                        //					if ($scope.validationLevelList[i].sens==='request') {
                        //						$scope.validationLevelList[i].sens="Demande";
                        //					}
                        //					if ($scope.validationLevelList[i].sens==='offer') {
                        //						$scope.validationLevelList[i].sens="Offre";
                        //					}
                        if ($scope.validationLevelList[i].allsRequired === true) {
                            $scope.validationLevelList[i].allsRequired = "Toute la chaine";
                        }
                        if ($scope.validationLevelList[i].allsRequired === false) {
                            $scope.validationLevelList[i].allsRequired = "Pas toute la chaine";
                        }
                    }
                }
                ////console.log($scope.validationLevelList);
                $scope.isReadyDataEnvalidationLevelList = true;
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
         * @description This function allow to show template update validation level.
         * @param validation:{}
         */
        $scope.editVlevel = function(validation) {
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_entreprise/mes_operations/register_update_vnb.html',
                controller: 'popupEntrepriseController',
                resolve: {
                    selectedRow: function() {
                        return validation;
                    }
                }
            });
        };

        /**
         * @function suppVlevel
         * @description This function allow to show template delete validation level.
         * @param validation:{}
         */
        $scope.suppVlevel = function(validation) {
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_banque/deleteVlevel.html',
                controller: 'entSuppController',
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
         * @description This function allow to show template add validation level group.
         */
        $scope.addNiveauValidation = function() {
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_entreprise/mes_operations/register_op_adm_vnv.html',
                controller: 'popupEntrepriseController',
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
        $scope.niveauValidList = [];

        $rootScope.$on("CallListNivauValid", function() {
            $scope.listNivauValidCall();
        });

        /**
         * @function listNivauValidCall
         * @description This function allow to show list all validation level group.
         * this function is used in CUD operations.
         * @returns $scope.niveauValidList:[]
         */
        $scope.listNivauValidCall = function() {
            $http({
                method: 'GET',
                url: baseUrl + 'validation_level_groupe/list/' + idInstitution,
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function successCallback(response) {
                $scope.niveauValidList = response.data.validation_level_groupe_list;
                for (var i = 0; i < $scope.niveauValidList.length; i++) {
                    //				if ($scope.niveauValidList[i].validationLevel.sens==='request') {
                    //					$scope.niveauValidList[i].validationLevel.sens="Demande";
                    //				}
                    //				if ($scope.niveauValidList[i].validationLevel.sens==='offer') {
                    //					$scope.niveauValidList[i].validationLevel.sens="Offre";
                    //				}
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
        };

        /**
         * @function listNivauValid
         * @description This function allow to show list all validation level group.
         * @returns $scope.niveauValidList:[]
         */
        function listNivauValid() {
            $scope.isReadyDataEnniveauValidList = false;
            $http({
                method: 'GET',
                url: baseUrl + 'validation_level_groupe/list/' + idInstitution,
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function successCallback(response) {
                $scope.niveauValidList = response.data.validation_level_groupe_list;
                //if($scope.niveauValidList.length!=undefined){
                for (var i = 0; i < $scope.niveauValidList.length; i++) {
                    //				if ($scope.niveauValidList[i].validationLevel.sens==='request') {
                    //					$scope.niveauValidList[i].validationLevel.sens="Demande";
                    //				}
                    //				if ($scope.niveauValidList[i].validationLevel.sens==='offer') {
                    //					$scope.niveauValidList[i].validationLevel.sens="Offre";
                    //				}
                    if ($scope.niveauValidList[i].validationLevel.allsRequired === true) {
                        $scope.niveauValidList[i].validationLevel.allsRequired = "Toute la chaine";
                    }
                    if ($scope.niveauValidList[i].validationLevel.allsRequired === false) {
                        $scope.niveauValidList[i].validationLevel.allsRequired = "Pas toute la chaine";
                    }
                }
                //}
                ////console.log($scope.niveauValidList);
                $scope.isReadyDataEnniveauValidList = true;
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

        /**
         * @function editNlevel
         * @description This function allow to show template update validation level group.
         * @param nvalidation:{}
         */
        $scope.editNlevel = function(nvalidation) {
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_entreprise/mes_operations/register_op_adm_vnv.html',
                controller: 'popupEntrepriseController',
                resolve: {
                    selectedRow: function() {
                        return nvalidation;
                    }
                }
            });
        };

        /**
         * @function suppNlevel
         * @description This function allow to show template delete validation level group.
         * @param nvalidation:{}
         */
        $scope.suppNlevel = function(nvalidation) {
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_banque/deleteNlevel.html',
                controller: 'entSuppController',
                resolve: {
                    selectedRow: function() {
                        return nvalidation;
                    }
                }
            });
        };
        /****************FIN NIVEAU DE VALIDATION**************/

        /*****************DEBUT NOTIFICATIONS*****************/

        /**
         * @function addNotification
         * @description This function allow to show template add notification.
         */
        $scope.addNotification = function() {
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_entreprise/mes_operations/register_op_adm_vrc.html',
                controller: 'NotificationController',
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
         * @function editNotification
         * @description This function allow to show template update notification.
         * @param notifie:{}
         */
        $scope.editNotification = function(notifie) {
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_entreprise/mes_operations/register_op_adm_vrc.html',
                controller: 'NotificationController',
                resolve: {
                    selectedRow: function() {
                        return notifie;
                    }
                }
            });
        };

        /**
         * @function suppNotification
         * @description This function allow to show template delete notification.
         * @param notifie:{}
         */
        $scope.suppNotification = function(notifie) {
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_banque/deleteNotification.html',
                controller: 'entSuppController',
                resolve: {
                    selectedRow: function() {
                        return notifie;
                    }
                }
            });
        };
        $scope.notificationList = [];

        $rootScope.$on("CalllistNotification", function() {
            $scope.listNotificationCall();
        });

        $scope.listNotificationCall = function() {
            //$scope.isReadyDataEnnotificationList=false;
            $http({
                method: 'GET',
                url: baseUrl + 'validation/notifications/list/' + idADmin + '/' + idInstitution,
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function successCallback(response) {
                $scope.notificationList = response.data.notification;
                //$scope.isReadyDataEnnotificationList=true;
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
         * @function listNotification
         * @description This function allow to list all notification.
         * @returns $scope.notificationList:[]
         */
        function listNotification() {
            $scope.isReadyDataEnnotificationList = false;
            $http({
                method: 'GET',
                //    baseUrl+'validation/notifications/list/'+idADmin+'/'+idInstitution,
                url: baseUrl + 'validation/notifications/list/' + idADmin + '/' + idInstitution,
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function successCallback(response) {
                $scope.notificationList = response.data.notification;
                ////console.log($scope.notificationList);
                $scope.isReadyDataEnnotificationList = true;
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
    }
]);

/*********************************************************************/
/************************CONTROLLER POPUP BANK************************/
/*********************************************************************/
angular.module('app').controller('popupEntrepriseController', ['$scope', '$rootScope', '$uibModalInstance', '$filter', '$interval', '$log', '$state', '$http', 'selectedRow', 'deconnectApi',
    function($scope, $rootScope, $modalInstance, $filter, $interval, $log, $state, $http, selectedRow, deconnectApi) {

        var idADmin = sessionStorage.getItem("iduser");
        var idInstitution = sessionStorage.getItem("idInstitution");
        var idloc = sessionStorage.getItem("idloc");
        $scope.isuserInsessionLine = 0;
        $scope.errorMessage = null;
        $scope.spinner = "img/loading.gif";
        $scope.loading = false;
        /******************SUBMIT CHAINE DE VALIDATION********************************/
        $scope.etreasuryProduit = [];

        /**
         * @function listProduits
         * @description This function allow to list all product.
         * @returns $scope.etreasuryProduit:[]
         */
        function listProduits() {
            $http({
                method: 'GET',
                url: baseUrl + 'admin/product/list',
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
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

        function listValidationLevel() {
            $http({
                method: 'GET',
                url: baseUrl + 'validation_level/list_institution/' + idInstitution,
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function successCallback(response) {
                $scope.validationLevelList = response.data.validation_level_list;
                for (var i = 0; i < $scope.validationLevelList.length; i++) {
                    if ($scope.validationLevelList[i].sens === 'request') {
                        $scope.validationLevelList[i].sens = "Demande";
                    }
                    if ($scope.validationLevelList[i].sens === 'select') {
                        $scope.validationLevelList[i].sens = "Offre";
                    }
                    //				if ($scope.validationLevelList[i].allsRequired===true) {
                    //					$scope.validationLevelList[i].allsRequired="Toute la chaine";
                    //				}
                    //				if ($scope.validationLevelList[i].allsRequired===false) {
                    //					$scope.validationLevelList[i].allsRequired="Pas toute la chaine";
                    //				}
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

            $scope.sensVL = $scope.selectedRowVlevel.sens;
            //console.log("$scope.sens.."+$scope.sensVL);
            //		if($scope.selectedRowVlevel.sens.indexOf('Demande')!=-1){
            //			$scope.sens="request";
            //		}
            //		if($scope.selectedRowVlevel.sens.indexOf('Offre')!=-1){
            //			$scope.sens="select";
            //		}
            $scope.selectedRowVlevel.allsRequired;
            if ($scope.selectedRowVlevel.allsRequired.indexOf('Toute la chaine') != -1) {
                $scope.valider = "true";
            }
            if ($scope.selectedRowVlevel.allsRequired.indexOf('Pas') != -1) {
                $scope.valider = "false";
            }
            $scope.nb_validation = $scope.selectedRowVlevel.nombreValidation;
            //$scope.validationLevel.institution=parseInt(idInstitution);

        } else {
            $scope.valider = true;
        }

        /**
         * @function submitVlevel
         * @description This function allow to submit or update validation level.
         * @param sensVL:string
         */
        $scope.submitVlevel = function(sensVL) {
            ////console.log("le sens.."+sensVL);
            $scope.loading = true;
            $scope.disabl = true;
            $scope.validationLevel.sens = $scope.sensVL;
            $scope.validationLevel.allsRequired = $scope.valider;
            //console.log($scope.valider);
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
                    'Authorization': 'Bearer ' + localStorage.getItem('jeton')
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
            ////console.log(response.data);
            $scope.stat = response.data.status;
            if ($scope.stat === 0) {
                $scope.loading = false;
                $scope.errorMessage = null;
                $scope.ok();
                $rootScope.$emit("CallListValidationLevel", {});
            } else {
                $scope.errorMessage = response.data.message;
            }
        };
        /*********************FIN CHAINE DE VALIDATION**************************/

        /******************SUBMIT NIVEAU DE VALIDATION**********************/
        $scope.entrepriseGrps = [];

        function listGrpeEnt() {
            $http({
                method: 'GET',
                url: baseUrl + '/admin/groupe/admin_entreprise/list/' + idADmin,
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function successCallback(response) {
                $scope.entrepriseGrps = response.data.group_list;
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
        listGrpeEnt();
        $scope.deviseslist = [];

        function listDevises() {
            //$scope.isReadyDevise=false;
            $http({
                method: 'GET',
                url: baseUrl + '/admin/devise/list',
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function successCallback(response) {
                $scope.deviseslist = response.data.devise_list;
                for (var i = 0; i < response.data.devise_list.length; i++) {
                    if (response.data.devise_list[i].valeur == 1) {
                        $scope.devise_ = response.data.devise_list[i].description;
                        $scope.valDevise_ = response.data.devise_list[i];
                    }
                }
                //console.log($scope.devise_);
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
        $scope.niveauValidList = [];

        function listNivauValid() {
            $http({
                method: 'GET',
                url: baseUrl + 'validation_level_groupe/list/' + idInstitution,
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function successCallback(response) {
                $scope.niveauValidList = response.data.validation_level_groupe_list;
                for (var i = 0; i < $scope.niveauValidList.length; i++) {
                    //				if ($scope.niveauValidList[i].validationLevel.sens==='request') {
                    //					$scope.niveauValidList[i].validationLevel.sens="Demande";
                    //				}
                    //				if ($scope.niveauValidList[i].validationLevel.sens==='offer') {
                    //					$scope.niveauValidList[i].validationLevel.sens="Offre";
                    //				}
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

        $scope.niveauValidation = { groupe: -1, validationLevel: -1, valeurMin: null, valeurMax: null, niveau: null, devise: '' };
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

        /**
         * @function submitNlevel
         * @description This function allow to submit or update validation level group.
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
            //console.log($scope.groupe);
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
                    'Authorization': 'Bearer ' + localStorage.getItem('jeton')
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

        function reloadNlevel(response) {
            //console.log(response.data);
            $scope.stat = response.data.status;
            if ($scope.stat === 0) {
                $scope.loading = false;
                $scope.errorMessage = null;
                $scope.ok();
                $rootScope.$emit("CallListNivauValid", {});
            } else {
                $scope.errorMessage = response.data.message;
            }
        };
        /*********************FIN NIVEAU DE VALIDATION******************************/

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

angular.module('app').controller('NotificationController', ['$scope', '$rootScope', '$uibModalInstance', '$filter', '$interval', '$log', '$state', '$http', 'selectedRow', 'deconnectApi',
    function($scope, $rootScope, $modalInstance, $filter, $interval, $log, $state, $http, selectedRow, deconnectApi) {

        var idADmin = sessionStorage.getItem("iduser");
        var idInstitution = sessionStorage.getItem("idInstitution");
        var idloc = sessionStorage.getItem("idloc");
        $scope.isuserInsessionLine = 0;
        $scope.errorMessage = null;
        var today = new Date();
        $scope.spinner = "img/loading.gif";

        /*********************DEBUT NOTIFICATIONS**********************************/
        $scope.etreasuryProduit = [];

        function listProduits() {
            $http({
                method: 'GET',
                url: baseUrl + 'admin/product/list',
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
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
        $scope.bankLocal = [];

        function listBankbyLocal() {
            //console.log(today);
            $http({
                method: 'GET',
                url: baseUrl + 'admin/bank/locality/' + idloc,
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
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
        $scope.bankUsers = [];
        $scope.listBankUsers = function(banque) {
            $scope.idBanque = banque.idInstitution;
            //console.log($scope.idBanque);
            $http({
                method: 'GET',
                url: baseUrl + 'admin/bank/users/list/' + banque.idInstitution,
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function successCallback(response) {
                $scope.bankUsers = response.data.list_users;
                ////console.log($scope.bankUsers);
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

        function listEntrpriseUser() {
            //console.log("id..."+idInstitution);
            $http({
                method: 'GET',
                url: baseUrl + 'admin/entreprise/users/list/' + idInstitution,
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function successCallback(response) {
                $scope.listEntUsers = response.data.list_users;
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
        listEntrpriseUser();
        /*SELECTION DES USERS*/
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
        /*FIN*/

        $scope.selectedNotific = selectedRow;
        if ($scope.selectedNotific != undefined) {
            $scope.produit = $scope.selectedNotific.products;
            $scope.userEntrepris = $scope.selectedNotific.user;
            //console.log("userEntrepris..."+$scope.userEntrepris);
            //		if($scope.selectedNotific.user!=undefined){
            //			$scope.banqueNotif=$scope.selectedNotific.user.groupeIdGroupe.institution;
            //		}
            //		function listBankUsersUpdate(){
            //			if($scope.selectedNotific.user!=undefined){
            //			$scope.banqueUpdate=$scope.selectedNotific.user.groupeIdGroupe.institution.idInstitution;
            //			}
            //			if($scope.banqueUpdate!=undefined){
            //				$http({
            //					method : 'GET',
            //					url : baseUrl+'admin/bank/users/list/'+parseInt($scope.banqueUpdate)
            //				}).then(function successCallback(response) {
            //					$scope.bankUsers=response.data.list_users;
            //					////console.log($scope.bankUsers);
            //				}, function errorCallback(response) {
            //					//////console.log(response.statusText);
            //				});
            //			}
            //		};
            //		listBankUsersUpdate();
        }

        $scope.notification = { idProduct: -1, idsUser: -1 };

        /**
         * @function saveNotific
         * @description This function allow to submit notification.
         */
        $scope.saveNotific = function() {
            $scope.loading = true;
            $scope.notification.idProduct = $scope.produit.idProduits;
            $scope.notification.idsUser = $scope.selectionb;
            var method = "";
            var url = "";
            method = "POST";
            url = baseUrl + 'validation/notifications/add/' + parseInt(idADmin) + '/' +
                parseInt(idInstitution);
            $http({
                method: method,
                url: url,
                data: angular.toJson($scope.notification),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('jeton')
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
        $scope.submitNotif = function(userbnk) {
            //$scope.loading = true;
            $scope.disabl = true;
            if ($scope.selectedNotific.institution === undefined) {
                $scope.saveNotific();
            } else {
                $scope.updateNotific(userbnk);
            }
        };
        $scope.changeUserEn = function(user) {
            $scope.userEntrepris = user;
        }
        $scope.notificationUpdate = { user: -1, products: -1, institution: -1 };

        /**
         * @function updateNotific
         * @description This function allow to update notification.
         */
        $scope.updateNotific = function(userEntrepris) {
            //console.log("new ...",userEntrepris);
            //console.log("new new...",$scope.userEntrepris);

            $scope.notificationUpdate.user = $scope.userEntrepris;
            $scope.notificationUpdate.products = parseInt($scope.selectedNotific.products.idProduits);
            $scope.notificationUpdate.institution = $scope.selectedNotific.user.groupeIdGroupe.institution.idInstitution;
            var method = "";
            var url = "";
            method = "PUT";
            url = baseUrl + 'validation/notifications/update/' + parseInt(idADmin) + '/' +
                parseInt($scope.selectedNotific.user.idUtilisateur);
            $http({
                method: method,
                url: url,
                data: angular.toJson($scope.notificationUpdate),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('jeton')
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
            //console.log(response.data);
            if ($scope.idStatus === 0) {
                $scope.loading = false;
                $scope.errorMessage = null;
                $scope.ok();
                $rootScope.$emit("CalllistNotification", {});
                //			if($scope.selectedNotific!=undefined){
                //			//listBankUsersUpdate();
                //			}else{
                //				listNotification();
                //			}
                //$state.reload();
            } else {
                $scope.errorMessage = response.data.message;
            }
        };

        function listNotification() {
            $http({
                method: 'GET',
                url: baseUrl + 'validation/notifications/list/' + idADmin + '/' + idInstitution,
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
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
app.controller('entSuppController', ['$scope', '$rootScope', '$state', '$http', '$uibModalInstance', 'selectedRow', 'deconnectApi',
    function($scope, $rootScope, $state, $http, $modalInstance, selectedRow, deconnectApi) {

        var idADmin = sessionStorage.getItem("iduser");
        var idInstitution = sessionStorage.getItem("idInstitution");
        $scope.spinner = "img/loading.gif";
        $scope.selectedRow = selectedRow;
        $scope.selectedRowVlevel = selectedRow;
        $scope.confirmSuppVlevel = function() {
            $scope.loading = true;
            $http({
                method: 'DELETE',
                url: baseUrl + 'validation_level/delete/' + idADmin + '/' + $scope.selectedRowVlevel.idNiveauValidation,
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
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
            $scope.loading = false;
            $scope.ok();
            $rootScope.$emit("CallListValidationLevel", {});
        };
        $scope.validationLevelList = [];

        function listValidationLevel() {
            $http({
                method: 'GET',
                url: baseUrl + 'validation_level/list_institution/' + idInstitution,
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function successCallback(response) {
                $scope.validationLevelList = response.data.validation_level_list;
                for (var i = 0; i < $scope.validationLevelList.length; i++) {
                    //				if ($scope.validationLevelList[i].sens==='request') {
                    //					$scope.validationLevelList[i].sens="Demande";
                    //				}
                    //				if ($scope.validationLevelList[i].sens==='offer') {
                    //					$scope.validationLevelList[i].sens="Offre";
                    //				}
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
        $scope.confirmSuppNlevel = function() {
            $scope.loading = true;
            $http({
                method: 'DELETE',
                url: baseUrl + 'validation_level_groupe/delete/' + idADmin + '/' +
                    $scope.selectedRowNlevel.groupe.idGroupe + '/' +
                    $scope.selectedRowNlevel.validationLevel.idNiveauValidation,
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
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
            $scope.loading = false;
            //console.log(response.data);
            $scope.ok();
            $rootScope.$emit("CallListNivauValid", {});
        };
        $scope.niveauValidList = [];

        function listNivauValid() {
            $http({
                method: 'GET',
                url: baseUrl + 'validation_level_groupe/list/' + idInstitution,
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
            }).then(function successCallback(response) {
                $scope.niveauValidList = response.data.validation_level_groupe_list;
                //			for (var i = 0; i < $scope.niveauValidList.length; i++) {
                //				if ($scope.niveauValidList[i].validationLevel.sens==='request') {
                //					$scope.niveauValidList[i].validationLevel.sens="Demande";
                //				}
                //				if ($scope.niveauValidList[i].validationLevel.sens==='offer') {
                //					$scope.niveauValidList[i].validationLevel.sens="Offre";
                //				}
                //			}
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


        $scope.confirmNotif = function() {
            $scope.loading = true;
            $http({
                method: 'DELETE',
                url: baseUrl + 'validation/notifications/delete/' + idADmin + '/' +
                    $scope.selectedRowNotif.products.idProduits + '/' +
                    $scope.selectedRowNotif.user.idUtilisateur + '/' +
                    $scope.selectedRowNotif.institution.idInstitution,
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
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
            $scope.loading = false;
            $scope.ok();
            $rootScope.$emit("CalllistNotification", {});
        };

        function listNotification() {
            $http({
                method: 'GET',
                url: baseUrl + 'validation/notifications/list/' + idADmin + '/' + idInstitution,
                data: {},
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jeton') }
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