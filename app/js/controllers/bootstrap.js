'use strict';

/* Controllers */

// bootstrap controller
app.controller('AccordionDemoCtrl', ['$scope', function($scope) {
    $scope.oneAtATime = true;

    $scope.groups = [{
            title: 'Accordion group header - #1',
            content: 'Dynamic group body - #1'
        },
        {
            title: 'Accordion group header - #2',
            content: 'Dynamic group body - #2'
        }
    ];

    $scope.items = ['Item 1', 'Item 2', 'Item 3'];

    $scope.addItem = function() {
        var newItemNo = $scope.items.length + 1;
        $scope.items.push('Item ' + newItemNo);
    };

    $scope.status = {
        isFirstOpen: true,
        isFirstDisabled: false
    };

    // $scope.$watch("oneAtATime",function( newValue, oldValue ) { 
    // //console.log("oneAtATimeNew ",newValue);
    // //console.log("oneAtATimeOld ",oldValue);
    // });
    // $scope.$watch("groups",function( newValue, oldValue ) { 
    // //console.log("groupsNew ",newValue);
    // //console.log("groupsOld ",oldValue);
    // });
    // $scope.$watch("items",function( newValue, oldValue ) { 
    // //console.log("itemsNew ",newValue);
    // //console.log("itemsOld ",oldValue);
    // });
    // $scope.$watch("addItem",function( newValue, oldValue ) { 
    // //console.log("addItemNew ",newValue);
    // //console.log("addItemOld ",oldValue);
    // });
    // $scope.$watch("status",function( newValue, oldValue ) { 
    // //console.log("statusNew ",newValue);
    // //console.log("statusOld ",oldValue);
    // });
    $scope.$on('docclicOk', function(events, args) {
        // //console.log("Hello bootrap.js doc ",document.getElementsByClassName('span'+args.d));
        // if(document.getElementsByClassName('span'+args.d).length!=0){
        // document.getElementsByClassName('span'+args.d)[0].click();
        // };
    });
}]);
/*app.controller('AlertDemoCtrl', ['$scope', function($scope) {
    $scope.alerts = [
        { type: 'success', msg: 'Well done! You successfully read this important alert message.' },
        { type: 'info', msg: 'Heads up! This alert needs your attention, but it is ok.' },
        { type: 'warning', msg: 'Warning! Best check yo self, you are not looking too good...' },
    ];

    $scope.addAlert = function() {
        $scope.alerts.push({ type: 'primary', msg: 'Oh snap! Change a few things up and try submitting again.' });
    };

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };
}]);*/
app.controller('ButtonsDemoCtrl', ['$scope', function($scope) {
    $scope.singleModel = 1;

    $scope.radioModel = 'Middle';

    $scope.checkModel = {
        left: false,
        middle: true,
        right: false
    };
}]);
app.controller('CarouselDemoCtrl', ['$scope', function($scope) {
    $scope.myInterval = 5000;
    var slides = $scope.slides = [];
    $scope.addSlide = function() {
        slides.push({
            image: 'img/c' + [slides.length % 4] + '.png',
            text: ['Carousels require the use of an id in the slide data caption',
                'Contrast and Similarity in Graphic Design are necessary to go',
                'Bacon ipsum dolor sit amet nulla dolor sit amet nulla',
                'Responsive treatment of angular apps'
            ][slides.length % 4]
        });
    };
    for (var i = 0; i < 4; i++) {
        $scope.addSlide();
    }
}]);
app.controller('DropdownDemoCtrl', ['$scope', function($scope) {
    $scope.items = [
        'The first choice!',
        'And another choice for you.',
        'but wait! A third!'
    ];

    $scope.status = {
        isopen: false
    };

    $scope.toggled = function(open) {
        ////console.log('Dropdown is now: ', open);
    };

    $scope.toggleDropdown = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopen = !$scope.status.isopen;
    };
}]);
app.controller('ModalInstanceCtrl', ['$scope', '$rootScope', '$uibModalInstance', 'items', function($scope, $rootScope, $modalInstance, items) {
    $scope.items = items;
    $scope.isPdf = false;
    $scope.idLocalite = -1;
    $scope.idGroupeEtG = -1;
    $scope.idEtreasuryUSER = -1;
    $scope.idEntreprise = -1;
    $scope.idGroupEntreprise = -1;
    $scope.idUserEntreprise = -1;
    $scope.idProduits = -1;
    $scope.idConditionBanque = -1;
    $scope.selected = {
        item: $scope.items[0]
    };

    $scope.ok = function() {
        $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };

    // $scope.submitCat = function (a) {
    // //$scope.$emit('doctor');
    // $rootScope.$broadcast('submitcat', {a : a})
    // $modalInstance.close($scope.selected.item);
    // };

    // $scope.submitDoc = function (a,b,c,d,e) {
    // $rootScope.$broadcast('submitdoc', {a : a,b : b,c : c,d : d,e : e});
    // $modalInstance.close($scope.selected.item);
    // };
}]);
app.controller('ModalDemoCtrl', ['$scope', '$uibModal', '$log', '$state', function($scope, $modal, $log, $state) {
    $scope.items = ['item1', 'item2', 'item3'];
    $scope.open = function(size, windowClass) {
        var modalInstance = $modal.open({
            templateUrl: 'partials/ui-modal-list.html',
            controller: 'ModalInstanceCtrl',
            windowClass: windowClass,
            size: size,
            resolve: {
                items: function() {
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


    $scope.openform = function(type) {
        var modalInstance = $modal.open({
            templateUrl: 'partials/ui-modal-form' + type + '.html',
            controller: 'ModalInstanceCtrl',
            resolve: {
                items: function() {
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

    $scope.section_modal = function() {
        var modalInstance = $modal.open({
            templateUrl: 'partials/ui-modal-section.html',
            controller: 'ModalInstanceCtrl',
            resolve: {
                items: function() {
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


    // $scope.section_modal_add = function () {
    // var modalInstance = $modal.open({
    // templateUrl: 'partials/admin_banque/add-document.html',
    // controller: 'ModalInstanceCtrl',
    // resolve: {
    // items: function () {
    // return $scope.items;
    // }
    // }
    // });
    // modalInstance.result.then(function (selectedItem) {
    // $scope.selected = selectedItem;
    // }, function () {
    // $log.info('Modal dismissed at: ' + new Date());
    // });
    // };

    /*****************************/
    /*SECTION MODAL ADMIN GENERAL*/
    $scope.addeTu = function() {
        var modalInstance = $modal.open({
            templateUrl: 'partials/admin_etreasury/etreasury/registeru.html',
            controller: 'ModalInstanceCtrl',
            resolve: {
                items: function() {
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
    $scope.addeTpr = function() {
        var modalInstance = $modal.open({
            templateUrl: 'partials/admin_etreasury/etreasury/registerpr.html',
            controller: 'ModalInstanceCtrl',
            resolve: {
                items: function() {
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
    $scope.addeTl = function() {
        var modalInstance = $modal.open({
            templateUrl: 'partials/admin_etreasury/etreasury/registerl.html',
            controller: 'ModalInstanceCtrl',
            resolve: {
                items: function() {
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
    $scope.addeTgr = function() {
        var modalInstance = $modal.open({
            templateUrl: 'partials/admin_etreasury/etreasury/registergr.html',
            controller: 'ModalInstanceCtrl',
            resolve: {
                items: function() {
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
    $scope.addeTcondBk = function() {
        var modalInstance = $modal.open({
            templateUrl: 'partials/admin_etreasury/etreasury/register_eT_admin_condBank.html',
            controller: 'ModalInstanceCtrl',
            resolve: {
                items: function() {
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
    $scope.addeTenTu = function() {
        var modalInstance = $modal.open({
            templateUrl: 'partials/admin_etreasury/entreprise/registeru.html',
            controller: 'ModalInstanceCtrl',
            resolve: {
                items: function() {
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
    $scope.updatePassword = function() {
        var modalInstance = $modal.open({
            templateUrl: 'partials/admin_etreasury/updatePassword.html',
            controller: 'ModalInstanceCtrl',
            resolve: {
                items: function() {
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

    $scope.updateProfil = function() {
        var modalInstance = $modal.open({
            templateUrl: 'partials/admin_etreasury/updateProdfil.html',
            controller: 'ModalInstanceCtrl',
            resolve: {
                items: function() {
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
    $scope.addeTenTj = function() {
        var modalInstance = $modal.open({
            templateUrl: 'partials/admin_etreasury/entreprise/registerj.html',
            controller: 'ModalInstanceCtrl',
            resolve: {
                items: function() {
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
    $scope.addeTenTgr = function() {
        var modalInstance = $modal.open({
            templateUrl: 'partials/admin_etreasury/entreprise/registergr.html',
            controller: 'ModalInstanceCtrl',
            resolve: {
                items: function() {
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
    $scope.addeTenTenT = function() {
        var modalInstance = $modal.open({
            templateUrl: 'partials/admin_etreasury/entreprise/registeret.html',
            controller: 'ModalInstanceCtrl',
            resolve: {
                items: function() {
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
    // $scope.addeTbKu = function () {
    // var modalInstance = $modal.open({
    // templateUrl: 'partials/admin_etreasury/banque/registeru.html',
    // controller: 'ModalInstanceCtrl',
    // resolve: {
    // items: function () {
    // return $scope.items;
    // }
    // }
    // });

    // modalInstance.result.then(function (selectedItem) {
    // $scope.selected = selectedItem;
    // }, function () {
    // $log.info('Modal dismissed at: ' + new Date());
    // });
    // };
    // $scope.addeTbKj = function () {
    // var modalInstance = $modal.open({
    // templateUrl: 'partials/admin_etreasury/banque/registerj.html',
    // controller: 'ModalInstanceCtrl',
    // resolve: {
    // items: function () {
    // return $scope.items;
    // }
    // }
    // });

    // modalInstance.result.then(function (selectedItem) {
    // $scope.selected = selectedItem;
    // }, function () {
    // $log.info('Modal dismissed at: ' + new Date());
    // });
    // };
    // $scope.addeTbKgr = function () {
    // var modalInstance = $modal.open({
    // templateUrl: 'partials/admin_etreasury/banque/registergr.html',
    // controller: 'ModalInstanceCtrl',
    // resolve: {
    // items: function () {
    // return $scope.items;
    // }
    // }
    // });

    // modalInstance.result.then(function (selectedItem) {
    // $scope.selected = selectedItem;
    // }, function () {
    // $log.info('Modal dismissed at: ' + new Date());
    // });
    // };
    // $scope.addeTbKc = function () {
    // var modalInstance = $modal.open({
    // templateUrl: 'partials/admin_etreasury/banque/registerc.html',
    // controller: 'ModalInstanceCtrl',
    // resolve: {
    // items: function () {
    // return $scope.items;
    // }
    // }
    // });

    // modalInstance.result.then(function (selectedItem) {
    // $scope.selected = selectedItem;
    // }, function () {
    // $log.info('Modal dismissed at: ' + new Date());
    // });
    // };
    // $scope.addeTbKbK = function () {
    // var modalInstance = $modal.open({
    // templateUrl: 'partials/admin_etreasury/banque/registerbk.html',
    // controller: 'ModalInstanceCtrl',
    // resolve: {
    // items: function () {
    // return $scope.items;
    // }
    // }
    // });

    // modalInstance.result.then(function (selectedItem) {
    // $scope.selected = selectedItem;
    // }, function () {
    // $log.info('Modal dismissed at: ' + new Date());
    // });
    // };
    /*FIN SECTION MODAL ADMIN GENERAL*/

    /*****************************/
    /*SECTION MODAL ADMIN ENTREPRISE*/
    $scope.addenToPesPc = function() {
        var modalInstance = $modal.open({
            templateUrl: 'partials/admin_entreprise/mes_operations/register_op_esp_mesdocc.html',
            controller: 'ModalInstanceCtrl',
            resolve: {
                items: function() {
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
    $scope.addenToPesPd = function() {
        var modalInstance = $modal.open({
            templateUrl: 'partials/admin_entreprise/mes_operations/register_op_esp_mesdocd.html',
            controller: 'ModalInstanceCtrl',
            resolve: {
                items: function() {
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
    // $scope.addenToPcRsPot = function () {
    // var modalInstance = $modal.open({
    // templateUrl: 'partials/admin_entreprise/mes_operations/register_op_cr_spot.html',
    // controller: 'ModalInstanceCtrl',
    // resolve: {
    // items: function () {
    // return $scope.items;
    // }
    // }
    // });

    // modalInstance.result.then(function (selectedItem) {
    // $scope.selected = selectedItem;
    // }, function () {
    // $log.info('Modal dismissed at: ' + new Date());
    // });
    // };
    // $scope.addenToPcH = function () {
    // var modalInstance = $modal.open({
    // templateUrl: 'partials/admin_entreprise/mes_operations/register_op_ch.html',
    // controller: 'ModalInstanceCtrl',
    // resolve: {
    // items: function () {
    // return $scope.items;
    // }
    // }
    // });

    // modalInstance.result.then(function (selectedItem) {
    // $scope.selected = selectedItem;
    // }, function () {
    // $log.info('Modal dismissed at: ' + new Date());
    // });
    // };
    // $scope.addenToPtR = function () {
    // var modalInstance = $modal.open({
    // templateUrl: 'partials/admin_entreprise/mes_operations/register_op_tr.html',
    // controller: 'ModalInstanceCtrl',
    // resolve: {
    // items: function () {
    // return $scope.items;
    // }
    // }
    // });

    // modalInstance.result.then(function (selectedItem) {
    // $scope.selected = selectedItem;
    // }, function () {
    // $log.info('Modal dismissed at: ' + new Date());
    // });
    // };
    // $scope.addenToPdeP = function () {
    // var modalInstance = $modal.open({
    // templateUrl: 'partials/admin_entreprise/mes_operations/register_op_dep.html',
    // controller: 'ModalInstanceCtrl',
    // resolve: {
    // items: function () {
    // return $scope.items;
    // }
    // }
    // });

    // modalInstance.result.then(function (selectedItem) {
    // $scope.selected = selectedItem;
    // }, function () {
    // $log.info('Modal dismissed at: ' + new Date());
    // });
    // };
    // $scope.addenToadMrHg = function () {
    // var modalInstance = $modal.open({
    // templateUrl: 'partials/admin_entreprise/mes_operations/register_op_adm_rhg.html',
    // controller: 'ModalInstanceCtrl',
    // resolve: {
    // items: function () {
    // return $scope.items;
    // }
    // }
    // });

    // modalInstance.result.then(function (selectedItem) {
    // $scope.selected = selectedItem;
    // }, function () {
    // $log.info('Modal dismissed at: ' + new Date());
    // });
    // };
    // $scope.addenToadMrHu = function () {
    // var modalInstance = $modal.open({
    // templateUrl: 'partials/admin_entreprise/mes_operations/register_op_adm_rhu.html',
    // controller: 'ModalInstanceCtrl',
    // resolve: {
    // items: function () {
    // return $scope.items;
    // }
    // }
    // });

    // modalInstance.result.then(function (selectedItem) {
    // $scope.selected = selectedItem;
    // }, function () {
    // $log.info('Modal dismissed at: ' + new Date());
    // });
    // };
    $scope.addenToadMvNb = function() {
        var modalInstance = $modal.open({
            templateUrl: 'partials/admin_entreprise/mes_operations/register_op_adm_vnb.html',
            controller: 'ModalInstanceCtrl',
            resolve: {
                items: function() {
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
    $scope.addenToadMvCh = function() {
        var modalInstance = $modal.open({
            templateUrl: 'partials/admin_entreprise/mes_operations/register_op_adm_vch.html',
            controller: 'ModalInstanceCtrl',
            resolve: {
                items: function() {
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
    $scope.addenToadMvNv = function() {
        var modalInstance = $modal.open({
            templateUrl: 'partials/admin_entreprise/mes_operations/register_op_adm_vnv.html',
            controller: 'ModalInstanceCtrl',
            resolve: {
                items: function() {
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
    $scope.addenToadMvRc = function() {
        var modalInstance = $modal.open({
            templateUrl: 'partials/admin_entreprise/mes_operations/register_op_adm_vrc.html',
            controller: 'ModalInstanceCtrl',
            resolve: {
                items: function() {
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
    /*FIN SECTION MODAL ADMIN ENTREPRISE*/

    /*****************************/
    /*SECTION MODAL ADMIN BANQUE*/
    //	$scope.bKesPtauxCr = function () {
    //		var modalInstance = $modal.open({
    //			templateUrl: 'partials/admin_banque/register_esp_admin_cr.html',
    //			controller: 'ModalInstanceCtrl',
    //			resolve: {
    //				items: function () {
    //					return $scope.items;
    //				}
    //			}
    //		});
    //
    //		modalInstance.result.then(function (selectedItem) {
    //			$scope.selected = selectedItem;
    //		}, function () {
    //			$log.info('Modal dismissed at: ' + new Date());
    //		});
    //	};
    //	$scope.bKesPtauxCc = function () {
    //		var modalInstance = $modal.open({
    //			templateUrl: 'partials/admin_banque/register_esp_admin_cc.html',
    //			controller: 'ModalInstanceCtrl',
    //			resolve: {
    //				items: function () {
    //					return $scope.items;
    //				}
    //			}
    //		});
    //
    //		modalInstance.result.then(function (selectedItem) {
    //			$scope.selected = selectedItem;
    //		}, function () {
    //			$log.info('Modal dismissed at: ' + new Date());
    //		});
    //	};
    //	$scope.bKesPtauxDep = function () {
    //		var modalInstance = $modal.open({
    //			templateUrl: 'partials/admin_banque/register_esp_admin_dep.html',
    //			controller: 'ModalInstanceCtrl',
    //			resolve: {
    //				items: function () {
    //					return $scope.items;
    //				}
    //			}
    //		});
    //		modalInstance.result.then(function (selectedItem) {
    //			$scope.selected = selectedItem;
    //		}, function () {
    //			$log.info('Modal dismissed at: ' + new Date());
    //		});
    //	};
    //	$scope.bKesPauxTr = function () {
    //		var modalInstance = $modal.open({
    //			templateUrl: 'partials/admin_banque/register_esp_admin_tr.html',
    //			controller: 'ModalInstanceCtrl',
    //			resolve: {
    //				items: function () {
    //					return $scope.items;
    //				}
    //			}
    //		});
    //
    //		modalInstance.result.then(function (selectedItem) {
    //			$scope.selected = selectedItem;
    //		}, function () {
    //			$log.info('Modal dismissed at: ' + new Date());
    //		});
    //	};

    // $scope.EnMesDocaddCat = function () {
    // var modalInstance = $modal.open({
    // templateUrl: 'partials/admin_entreprise/mes_operations/register_op_esp_mesdocc.html',
    // controller: 'ModalInstanceCtrl',
    // resolve: {
    // items: function () {
    // return $scope.items;
    // }
    // }
    // });

    // modalInstance.result.then(function (selectedItem) {
    // $scope.selected = selectedItem;
    // }, function () {
    // $log.info('Modal dismissed at: ' + new Date());
    // });
    // };
    // $scope.EnMesDocaddDoc = function () {
    // var modalInstance = $modal.open({
    // templateUrl: 'partials/admin_entreprise/mes_operations/register_op_esp_mesdocd.html',
    // controller: 'ModalInstanceCtrl',
    // resolve: {
    // items: function () {
    // return $scope.items;
    // }
    // }
    // });

    // modalInstance.result.then(function (selectedItem) {
    // $scope.selected = selectedItem;
    // }, function () {
    // $log.info('Modal dismissed at: ' + new Date());
    // });
    // };
    // $scope.bKesPmesDocaddCat = function () {
    // var modalInstance = $modal.open({
    // templateUrl: 'partials/admin_banque/register_esp_mesdocc.html',
    // controller: 'ModalInstanceCtrl',
    // resolve: {
    // items: function () {
    // return $scope.items;
    // }
    // }
    // });

    // modalInstance.result.then(function (selectedItem) {
    // $scope.selected = selectedItem;
    // }, function () {
    // $log.info('Modal dismissed at: ' + new Date());
    // });
    // };
    // $scope.bKesPmesDocaddDoc = function () {
    // var modalInstance = $modal.open({
    // templateUrl: 'partials/admin_banque/register_esp_mesdocd.html',
    // controller: 'ModalInstanceCtrl',
    // resolve: {
    // items: function () {
    // return $scope.items;
    // }
    // }
    // });

    // modalInstance.result.then(function (selectedItem) {
    // $scope.selected = selectedItem;
    // }, function () {
    // $log.info('Modal dismissed at: ' + new Date());
    // });
    // };
    $scope.addbKoadMrHg = function() {
        var modalInstance = $modal.open({
            templateUrl: 'partials/admin_banque/register_op_adm_rhg.html',
            controller: 'ModalInstanceCtrl',
            resolve: {
                items: function() {
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
    $scope.addbKoadMrHu = function() {
        var modalInstance = $modal.open({
            templateUrl: 'partials/admin_banque/register_op_adm_rhu.html',
            controller: 'ModalInstanceCtrl',
            resolve: {
                items: function() {
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
    $scope.addbKoadMvNb = function() {
        var modalInstance = $modal.open({
            templateUrl: 'partials/admin_banque/register_op_adm_vnb.html',
            controller: 'ModalInstanceCtrl',
            resolve: {
                items: function() {
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
    $scope.addbKoadMvCh = function() {
        var modalInstance = $modal.open({
            templateUrl: 'partials/admin_banque/register_op_adm_vch.html',
            controller: 'ModalInstanceCtrl',
            resolve: {
                items: function() {
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
    $scope.addbKoadMvNv = function() {
        var modalInstance = $modal.open({
            templateUrl: 'partials/admin_banque/register_op_adm_vnv.html',
            controller: 'ModalInstanceCtrl',
            resolve: {
                items: function() {
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
    $scope.addbKoadMvRc = function() {
        var modalInstance = $modal.open({
            templateUrl: 'partials/admin_banque/register_op_adm_vrc.html',
            controller: 'ModalInstanceCtrl',
            resolve: {
                items: function() {
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
    /*FIN SECTION MODAL ADMIN BANQUE*/


    $scope.new_demande_credit_spot = function() {
        $state.go('app.banque_register_op_cr_spot');
    };


    // $scope.section_modal_add_cat = function () {
    // var modalInstance = $modal.open({
    // templateUrl: 'partials/admin_banque/add-categorie.html',
    // controller: 'ModalInstanceCtrl',
    // resolve: {
    // items: function () {
    // return $scope.items;
    // }
    // }
    // });

    // modalInstance.result.then(function (selectedItem) {
    // $scope.selected = selectedItem;
    // }, function () {
    // $log.info('Modal dismissed at: ' + new Date());
    // });
    // };

    // $scope.$on('internet', function(events, args){
    // //console.log("Message problème internet reçu ",args.message);
    // var modalInstance = $modal.open({
    // templateUrl: 'partials/notificationnet.html',
    // controller: 'ModalInstanceCtrl',
    // resolve: {
    // items: function () {
    // return $scope.items;
    // }
    // }
    // });

    // modalInstance.result.then(function (selectedItem) {
    // $scope.selected = selectedItem;
    // }, function () {
    // $log.info('Modal dismissed at: ' + new Date());
    // });
    // });

}]);
app.controller('PaginationDemoCtrl', ['$scope', '$log', function($scope, $log) {
    $scope.totalItems = 64;
    $scope.currentPage = 4;

    $scope.setPage = function(pageNo) {
        $scope.currentPage = pageNo;
    };

    $scope.pageChanged = function() {
        $log.info('Page changed to: ' + $scope.currentPage);
    };

    $scope.maxSize = 5;
    $scope.bigTotalItems = 175;
    $scope.bigCurrentPage = 1;
}]);
app.controller('PopoverDemoCtrl', ['$scope', function($scope) {
    $scope.dynamicPopover = 'Hello, World!';
    $scope.dynamicPopoverTitle = 'Title';
}]);
app.controller('ProgressDemoCtrl', ['$scope', function($scope) {
    $scope.max = 200;

    $scope.random = function() {
        var value = Math.floor((Math.random() * 100) + 1);
        var type;

        if (value < 25) {
            type = 'success';
        } else if (value < 50) {
            type = 'info';
        } else if (value < 75) {
            type = 'warning';
        } else {
            type = 'danger';
        }

        $scope.showWarning = (type === 'danger' || type === 'warning');

        $scope.dynamic = value;
        $scope.type = type;
    };
    $scope.random();

    $scope.randomStacked = function() {
        $scope.stacked = [];
        var types = ['success', 'info', 'warning', 'danger'];

        for (var i = 0, n = Math.floor((Math.random() * 4) + 1); i < n; i++) {
            var index = Math.floor((Math.random() * 4));
            $scope.stacked.push({
                value: Math.floor((Math.random() * 30) + 1),
                type: types[index]
            });
        }
    };
    $scope.randomStacked();
}]);
app.controller('TabsDemoCtrl', ['$scope', function($scope) {
    $scope.tabs = [
        { title: 'Profile', icon: 'user', content: 'You can use all Bootstrap plugins purely through the markup API without writing a single line of JavaScript. This is Bootstrap&apos;s first-class API and should be your first consideration when using in a plugin.' },
        { title: 'Messages', icon: 'envelope', content: 'That said, in some situations it may be desirable to turn this functionality off. Therefore, we also provide the ability to.', disabled: true },
        { title: 'Settings', icon: 'cog', content: 'We also believe you should be able to use all Bootstrap plugins purely through the JavaScript API. All public APIs are single, chainable methods, and return the collection acted upon.' },
    ];
}]);
app.controller('RatingDemoCtrl', ['$scope', function($scope) {
    $scope.rate = 7;
    $scope.max = 10;
    $scope.isReadonly = false;

    $scope.hoveringOver = function(value) {
        $scope.overStar = value;
        $scope.percent = 100 * (value / $scope.max);
    };

    $scope.ratingStates = [
        { stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle' },
        { stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty' },
        { stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle' },
        { stateOn: 'glyphicon-heart' },
        { stateOff: 'glyphicon-off' }
    ];

}]);
app.controller('TooltipDemoCtrl', ['$scope', function($scope) {
    $scope.dynamicTooltip = 'Hello, World!';
    $scope.dynamicTooltipText = 'dynamic';
    $scope.htmlTooltip = 'I\'ve been made <b>bold</b>!';
}]);
app.controller('TypeaheadCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.selected = undefined;
    $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
    // Any function returning a promise object can be used to load values asynchronously
    $scope.getLocation = function(val) {
        return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: val,
                sensor: false
            }
        }).then(function(res) {
            var addresses = [];
            angular.forEach(res.data.results, function(item) {
                addresses.push(item.formatted_address);
            });
            return addresses;
        });
    };
}]);

app.controller('DatepickerDemoCtrl', ['$scope', function($scope) {
    $scope.today = function() {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function() {
        $scope.dt = null;
    };

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
        return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
    };

    $scope.toggleMin = function() {
        $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.dtpick = {
        opened: false,
        opened2: false
    }

    $scope.open = function($event, type) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.dtpick[type] = true;
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 2);
    $scope.events = [{
            date: tomorrow,
            status: 'full'
        },
        {
            date: afterTomorrow,
            status: 'partially'
        }
    ];

    $scope.getDayClass = function(date, mode) {
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    };
}]);

app.controller('TimepickerDemoCtrl', ['$scope', function($scope) {
    $scope.mytime = new Date();

    $scope.hstep = 1;
    $scope.mstep = 15;

    $scope.options = {
        hstep: [1, 2, 3],
        mstep: [1, 5, 10, 15, 25, 30]
    };

    $scope.ismeridian = true;
    $scope.toggleMode = function() {
        $scope.ismeridian = !$scope.ismeridian;
    };

    $scope.update = function() {
        var d = new Date();
        d.setHours(14);
        d.setMinutes(0);
        $scope.mytime = d;
    };

    $scope.changed = function() {
        ////console.log('Time changed to: ' + $scope.mytime);
    };

    $scope.clear = function() {
        $scope.mytime = null;
    };
}]);