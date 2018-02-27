'use strict';

/**
 * Config for the router
 */
angular.module('app')
    .config(
        ['$stateProvider', '$urlRouterProvider', 'JQ_CONFIG',
            function($stateProvider, $urlRouterProvider, JQ_CONFIG) {
                // /access/login
                // /eTreasury/tables/entreprise/entreprise
                // eTreasury/accueil
                $urlRouterProvider
                    .otherwise('/access/login');
                $stateProvider

                /*******************************************************************************************************************
                 ********************************************************************************************************************
                 ********************************ADMINISTRATEUR GENERAL**************************************************************
                 ********************************************************************************************************************
                 ********************************************************************************************************************/
                //********************* ACCUEIL ADMINISTRATION E-TREASURY **************************
                    .state('app', {
                        abstract: true,
                        url: '/eTreasury',
                        templateUrl: 'partials/app.html'
                    })
                    .state('app.accueil', {
                        url: '/accueil',
                        templateUrl: 'partials/entreprise-utilisateur.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load(['countTo',
                                        'js/controllers/countto.js',
                                        'js/controllers/vectormap.js',
                                        'js/directives/ui-todowidget.js',
                                        'js/controllers/messages-widget.js',
                                        '../bower_components/font-awesome/css/font-awesome.css'
                                    ]);
                                }
                            ]
                        }
                    })
                    //*********************FIN ACCUEIL **************************				
                    //***************************************************************************************************************************
                    //******************************************************* LES VUES ADMINISTRATION*******************************************
                    //***************************************************************************************************************************					
                    //********************* Tables Entreprise ADMIN e-Treasury **************************
                    .state('app.entrepriseeTadmin', {
                        url: '/tables',
                        template: '<div ui-view class=""></div>'
                    })
                    .state('app.entrepriseeTadmin.entreprise', {
                        url: '/entreprise/entreprise',
                        templateUrl: 'partials/admin_etreasury/entreprise/entreprise-entreprise.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/login.js',
                                        '../bower_components/font-awesome/css/font-awesome.css'
                                    ]);
                                }
                            ]
                        }
                    })
                    .state('app.entrepriseeTadmin.groupe', {
                        url: '/entreprise/groupe',
                        templateUrl: 'partials/admin_etreasury/entreprise/entreprise-groupe.html'
                    })
                    .state('app.entrepriseeTadmin.utilisateur', {
                        url: '/entreprise/utilisateur',
                        templateUrl: 'partials/admin_etreasury/entreprise/entreprise-utilisateur.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/login.js',
                                        '../bower_components/font-awesome/css/font-awesome.css'
                                    ]);
                                }
                            ]
                        }
                    })
                    .state('app.entrepriseeTadmin.journal', {
                        url: '/entreprise/journal',
                        templateUrl: 'partials/admin_etreasury/entreprise/entreprise-journal.html',
                        // resolve: {
                        // deps: ['$ocLazyLoad',
                        // function($ocLazyLoad) {
                        // return $ocLazyLoad.load('smart-table').then(
                        // function() {
                        // return $ocLazyLoad.load('js/controllers/table-smart.js');
                        // }
                        // );
                        // }
                        // ]
                        // }
                    })
                    // .state('app.entrepriseeTadmin.register', {
                    // url: '/register',
                    // templateUrl: 'partials/admin_etreasury/ui-register.html',
                    // resolve: {
                    // deps: ['uiLoad',
                    // function(uiLoad) {
                    // return uiLoad.load(['js/controllers/register.js','../bower_components/font-awesome/css/font-awesome.css']);
                    // }
                    // ]
                    // }
                    // })
                    // .state('app.entrepriseeTadmin.register_enT_enT', {
                    // url: '/register_et',
                    // templateUrl: 'partials/admin_etreasury/entreprise/registeret.html',
                    // resolve: {
                    // deps: ['uiLoad',
                    // function(uiLoad) {
                    // return uiLoad.load('js/controllers/form-validation.js');
                    // }
                    // ]
                    // }
                    // })
                    // .state('app.entrepriseeTadmin.register_enT_gr', {
                    // url: '/register_etgr',
                    // templateUrl: 'partials/admin_etreasury/entreprise/registergr.html',
                    // resolve: {
                    // deps: ['uiLoad',
                    // function(uiLoad) {
                    // return uiLoad.load('js/controllers/form-validation.js');
                    // }
                    // ]
                    // }
                    // })
                    // .state('app.entrepriseeTadmin.register_enT_u', {
                    // url: '/register_etu',
                    // templateUrl: 'partials/admin_etreasury/entreprise/registeru.html',
                    // resolve: {
                    // deps: ['uiLoad',
                    // function(uiLoad) {
                    // return uiLoad.load('js/controllers/form-validation.js');
                    // }
                    // ]
                    // }
                    // })
                    //*********************FIN Tables Entreprise ADMIN e-Treasury **************************

                //********************* Tables Banque ADMIN e-Treasury **************************
                .state('app.banqueeTadmin', {
                        url: '/tables',
                        template: '<div ui-view class=""></div>'
                    })
                    .state('app.banqueeTadmin.banque', {
                        url: '/banque/banque',
                        templateUrl: 'partials/admin_etreasury/banque/banque-banque.html'
                    })
                    .state('app.banqueeTadmin.groupe', {
                        url: '/banque/groupe',
                        templateUrl: 'partials/admin_etreasury/banque/banque-groupe.html'
                    })
                    .state('app.banqueeTadmin.utilisateur', {
                        url: '/banque/utilisateur',
                        templateUrl: 'partials/admin_etreasury/banque/banque-utilisateur.html',
                        controller: 'FormXeditableCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('xeditable').then(
                                        function() {
                                            return $ocLazyLoad.load('js/controllers/form-xeditable.js');
                                        }
                                    );
                                }
                            ]
                        }
                    })
                    .state('appa', {
                        url: '/etr3asury',
                        template: '<div ui-view class=""></div>'
                    })
                    .state('appa.logger', {
                        url: '/adminp',
                        templateUrl: 'partials/ui-ui.html'
                    })
                    .state('app.banqueeTadmin.contact', {
                        url: '/banque/contact',
                        templateUrl: 'partials/admin_etreasury/banque/banque-contact.html'
                    })
                    .state('app.banqueeTadmin.journal', {
                        url: '/banque/journal',
                        templateUrl: 'partials/admin_etreasury/banque/banque-journal.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('smart-table').then(
                                        function() {
                                            return $ocLazyLoad.load('js/controllers/table-smart.js');
                                        }
                                    );
                                }
                            ]
                        }
                    })
                    // .state('app.banqueeTadmin.register_bK_bk', {
                    // url: '/register_bk',
                    // templateUrl: 'partials/admin_etreasury/banque/registerbk.html',
                    // resolve: {
                    // deps: ['uiLoad',
                    // function(uiLoad) {
                    // return uiLoad.load('js/controllers/form-validation.js');
                    // }
                    // ]
                    // }
                    // })
                    // .state('app.banqueeTadmin.register_bK_gr', {
                    // url: '/register_bkgr',
                    // templateUrl: 'partials/admin_etreasury/banque/registergr.html',
                    // resolve: {
                    // deps: ['uiLoad',
                    // function(uiLoad) {
                    // return uiLoad.load('js/controllers/form-validation.js');
                    // }
                    // ]
                    // }
                    // })
                    // .state('app.banqueeTadmin.register_bK_u', {
                    // url: '/register_bku',
                    // templateUrl: 'partials/admin_etreasury/banque/registeru.html',
                    // resolve: {
                    // deps: ['uiLoad',
                    // function(uiLoad) {
                    // return uiLoad.load('js/controllers/form-validation.js');
                    // }
                    // ]
                    // }
                    // })
                    // .state('app.banqueeTadmin.register_bK_c', {
                    // url: '/register_bkc',
                    // templateUrl: 'partials/admin_etreasury/banque/registerc.html',
                    // resolve: {
                    // deps: ['uiLoad',
                    // function(uiLoad) {
                    // return uiLoad.load('js/controllers/form-validation.js');
                    // }
                    // ]
                    // }
                    // })
                    //*********************FIN Tables Entreprise ADMIN e-Treasury **************************

                //********************* Tables ADMINISTRATION ADMIN e-Treasury **************************
                .state('app.administrationeTadmin', {
                        url: '/tables',
                        template: '<div ui-view class=""></div>'
                    })
                    .state('app.administrationeTadmin.groupe', {
                        url: '/etreasury/groupe',
                        templateUrl: 'partials/admin_etreasury/etreasury/etreasury-groupe.html'
                    })
                    .state('app.administrationeTadmin.utilisateur', {
                        url: '/etreasury/utilisateur',
                        templateUrl: 'partials/admin_etreasury/etreasury/etreasury-utilisateur.html',
                        controller: 'FormXeditableCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('xeditable').then(
                                        function() {
                                            return $ocLazyLoad.load('js/controllers/form-xeditable.js');
                                        }
                                    );
                                }
                            ]
                        }
                    })
                    .state('app.administrationeTadmin.localite', {
                        url: '/etreasury/localite',
                        templateUrl: 'partials/admin_etreasury/etreasury/etreasury-localite.html'
                    })
                    .state('app.administrationeTadmin.produit', {
                        url: '/etreasury/produit',
                        templateUrl: 'partials/admin_etreasury/etreasury/etreasury-produit.html'
                    })
                    .state('app.administrationeTadmin.produitTaux', {
                        url: '/etreasury/produitTaux',
                        templateUrl: 'partials/admin_etreasury/etreasury/etreasury-produitTaux.html'
                    })
                    .state('app.administrationeTadmin.devises', {
                        url: '/etreasury/devises',
                        templateUrl: 'partials/admin_etreasury/etreasury/etreasury-devises.html'
                    })
                    .state('app.administrationeTadmin.conditionBanque', {
                        url: '/etreasury/conditionBanque',
                        templateUrl: 'partials/admin_etreasury/etreasury/etreasury-conditionBanque.html'
                            // resolve: {
                            // deps: ['$ocLazyLoad',
                            // function($ocLazyLoad) {
                            // return $ocLazyLoad.load('smart-table').then(
                            // function() {
                            // return $ocLazyLoad.load('js/controllers/table-smart.js');
                            // }
                            // );
                            // }
                            // ]
                            // }
                    })
                    // .state('app.administrationeTadmin.register_cond_bk', {
                    // url: '/etreasury/conBk',
                    // templateUrl: 'partials/admin_etreasury/etreasury/register_eT_admin_condBank.html'
                    // })
                    // .state('app.administrationeTadmin.register_eT_gr', {
                    // url: '/register_gr',
                    // templateUrl: 'partials/admin_etreasury/etreasury/registergr.html',
                    // resolve: {
                    // deps: ['uiLoad',
                    // function(uiLoad) {
                    // return uiLoad.load('js/controllers/form-validation.js');
                    // }
                    // ]
                    // }
                    // })
                    // .state('app.administrationeTadmin.register_eT_u', {
                    // url: '/register_u',
                    // templateUrl: 'partials/admin_etreasury/etreasury/registeru.html',
                    // resolve: {
                    // deps: ['uiLoad',
                    // function(uiLoad) {
                    // return uiLoad.load('js/controllers/form-validation.js');
                    // }
                    // ]
                    // }
                    // })
                    // .state('app.administrationeTadmin.register_eT_l', {
                    // url: '/register_l',
                    // templateUrl: 'partials/admin_etreasury/etreasury/registerl.html',
                    // resolve: {
                    // deps: ['uiLoad',
                    // function(uiLoad) {
                    // return uiLoad.load('js/controllers/form-validation.js');
                    // }
                    // ]
                    // }
                    // })
                    // .state('app.administrationeTadmin.register_eT_pr', {
                    // url: '/register_pr',
                    // templateUrl: 'partials/admin_etreasury/etreasury/registerpr.html',
                    // resolve: {
                    // deps: ['uiLoad',
                    // function(uiLoad) {
                    // return uiLoad.load('js/controllers/form-validation.js');
                    // }
                    // ]
                    // }
                    // })
                    //*********************FIN Tables ADMINISTRATION ADMIN e-Treasury **************************					
                    //*******************************************************FINS DES VUES ADMINISTRATION E-TREASURY*******************************************
                    //***************************************************************************************************************************
                    .state('app.dashboard', {
                        url: '/dashboard_old',
                        templateUrl: 'partials/app_dashboard.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('chart.js').then(
                                            function() {
                                                return $ocLazyLoad.load('js/controllers/dashboard.js');
                                            }
                                        )
                                        .then(
                                            function() {
                                                return $ocLazyLoad.load('../bower_components/font-awesome/css/font-awesome.css');
                                            }
                                        )
                                        /*.then(
                                                                                  function(){
                                                                                        return $ocLazyLoad.load('js/directives/ui-todowidget.js');
                                                                                 }
                                                                              )*/
                                    ;
                                }
                            ]
                        }
                    })

                .state('app.widgets', {
                        url: '/widgets',
                        templateUrl: 'partials/widgets.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load(['countTo',
                                        'js/controllers/countto.js',
                                        'js/controllers/vectormap.js',
                                        'js/directives/ui-todowidget.js',
                                        'js/controllers/messages-widget.js',
                                        '../bower_components/font-awesome/css/font-awesome.css'
                                    ]);
                                }
                            ]
                        }
                    })
                    .state('app.searchapp', {
                        url: '/searchapp',
                        templateUrl: 'partials/searchapp.html',
                    })
                    //***************************CONTROLE ACCESS********************************************************************
                    //*************************************************************************************************************
                    //*********************************************************************************************************
                    .state('access', {
                        url: '/access',
                        template: '<div ui-view class=""></div>'
                    })
                    //***************DASHBOARD ADMIN E-TREASURY***************
                    //********************************************************
                    .state('access.dashboard_eT_admin', {
                        url: '/dashboard_eT_admin',
                        templateUrl: 'partials/admin_etreasury/dashboard.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/login.js',
                                        '../bower_components/font-awesome/css/font-awesome.css'
                                    ]);
                                }
                            ]
                        }
                    })
                    //***************FIN DASHBOARD ADMIN E-TREASURY***************
                    //********************************************************
                    //***************DASHBOARD ADMIN ENTREPRISE***************
                    //********************************************************
                    .state('access.dashboard_enT_admin', {
                        url: '/dashboard_enT_admin',
                        templateUrl: 'partials/admin_entreprise/dashboard.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/login.js',
                                        '../bower_components/font-awesome/css/font-awesome.css'
                                    ]);
                                }
                            ]
                        }
                    })
                    //FIN DASHBOARD *****************
                    //***************DASHBOARD ADMIN BANQUE***************
                    //********************************************************
                    .state('access.dashboard_bk_admin', {
                        url: '/dashboard_bk_admin',
                        templateUrl: 'partials/admin_banque/dashboard.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/login.js',
                                        '../bower_components/font-awesome/css/font-awesome.css'
                                    ]);
                                }
                            ]
                        }
                    })
                    //FIN DASHBOARD *****************
                    .state('access.login', {
                        url: '/login',
                        templateUrl: 'partials/ui-login.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/login.js',
                                        '../bower_components/font-awesome/css/font-awesome.css'
                                    ]);
                                }
                            ]
                        }
                    })
                    .state('access.token_validation', {
                        url: '/access_confirmation',
                        templateUrl: 'partials/token-validation.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/login.js',
                                        '../bower_components/font-awesome/css/font-awesome.css'
                                    ]);
                                }
                            ]
                        }
                    })
                    // .state('access.register', {
                    // url: '/register',
                    // templateUrl: 'partials/ui-register.html',
                    // resolve: {
                    // deps: ['uiLoad',
                    // function(uiLoad) {
                    // return uiLoad.load(['js/controllers/register.js','../bower_components/font-awesome/css/font-awesome.css']);
                    // }
                    // ]
                    // }
                    // })
                    .state('access.forgotpwd', {
                        url: '/forgotpwd',
                        templateUrl: 'partials/ui-forgotpwd.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/login.js',
                                        '../bower_components/font-awesome/css/font-awesome.css'
                                    ]);
                                }
                            ]
                        }
                    })
                    .state('access.404', {
                        url: '/404',
                        templateUrl: 'partials/ui-404.html',
                    })
                    .state('access.500', {
                        url: '/500',
                        templateUrl: 'partials/ui-500.html'
                    })
                    .state('access.lockscreen', {
                        url: '/lockscreen',
                        templateUrl: 'partials/ui-lockscreen.html'
                    })
                    //***************************FIN CONTROLE ACCESS********************************************************************
                    //*************************************************************************************************************
                    //*********************************************************************************************************

                /*MODIFICATION DES INFORMATIONS ETC....*/
                .state('app.mdp', {
                        url: '/info/modifier_password',
                        templateUrl: 'partials/ui-mdp.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/login.js',
                                        '../bower_components/font-awesome/css/font-awesome.css'
                                    ]);
                                }
                            ]
                        }
                    })
                    .state('app.email', {
                        url: '/info/modifier_mail',
                        templateUrl: 'partials/ui-mail.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/login.js',
                                        '../bower_components/font-awesome/css/font-awesome.css'
                                    ]);
                                }
                            ]
                        }
                    })
                    .state('app.profile', {
                        url: '/info/profile',
                        templateUrl: 'partials/ui-profile.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    })
                    /*FIN MODIFICATION DES INFORMATIONS ETC....*/

                /*******************************************************************************************************************
                 ********************************************************************************************************************
                 ********************************FIN ADMINISTRATEUR GENERAL**************************************************************
                 ********************************************************************************************************************
                 ********************************************************************************************************************/

                /*******************************************************************************************************************
                 ********************************************************************************************************************
                 ********************************ADMINISTRATEUR ENTREPRISE**************************************************************
                 ********************************************************************************************************************
                 ********************************************************************************************************************/
                //OPERATIONS OPERATIONS
                .state('app.adminent_op_cr_spot', {
                        url: '/entreprise/adminent_op_cr_spot',
                        templateUrl: 'partials/admin_entreprise/mes_operations/op_cr_spot.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/login.js',
                                        '../bower_components/font-awesome/css/font-awesome.css'
                                    ]);
                                }
                            ]
                        }
                    })
                    .state('app.adminent_op_ch', {
                        url: '/entreprise/adminent_op_ch',
                        templateUrl: 'partials/admin_entreprise/mes_operations/op_ch.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/login.js',
                                        '../bower_components/font-awesome/css/font-awesome.css'
                                    ]);
                                }
                            ]
                        }
                    })
                    .state('app.adminent_op_tr', {
                        url: '/entreprise/adminent_op_tr',
                        templateUrl: 'partials/admin_entreprise/mes_operations/op_tr.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/login.js',
                                        '../bower_components/font-awesome/css/font-awesome.css'
                                    ]);
                                }
                            ]
                        }
                    })
                    .state('app.adminent_op_dep', {
                        url: '/entreprise/adminent_op_dep',
                        templateUrl: 'partials/admin_entreprise/mes_operations/op_dep.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/login.js',
                                        '../bower_components/font-awesome/css/font-awesome.css'
                                    ]);
                                }
                            ]
                        }
                    })
                    .state('app.adminent_op_esc', {
                        url: '/entreprise/adminent_op_esc',
                        templateUrl: 'partials/admin_entreprise/mes_operations/op_esc.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/login.js',
                                        '../bower_components/font-awesome/css/font-awesome.css'
                                    ]);
                                }
                            ]
                        }
                    })
                    //FIN OPERATIONS OPERATIONS
                    //OPERATIONS ESPACE
                    .state('app.adminent_op_esp_mesdoc', {
                        url: '/entreprise/adminent_op_esp_mesdoc',
                        templateUrl: 'partials/admin_entreprise/mes_operations/op_esp_mesdoc.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/doctors.js']);
                                }
                            ]
                        }
                    })
                    .state('app.adminent_op_esp_mesdoc.visualent', {
                        url: '/entreprise/entreprise/:fold/:id',
                        templateUrl: 'partials/admin_entreprise/mes_operations/docs-visual.html',
                        controller: 'NostauxListCtrl'
                    })
                    .state('app.adminent_op_esp_mesdoc.visualent_bynamedoc', {
                        url: '/entreprise/entreprise/:name/:named/:url_/:id',
                        templateUrl: 'partials/admin_entreprise/mes_operations/docs-visual_byid.html',
                        controller: 'DetailDocCtrlByName'
                    })
                    .state('app.docs-recus-ent', {
                        url: '/entreprise/adminent_op_esp_docr',
                        templateUrl: 'partials/admin_entreprise/mes_operations/docs-recus.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/doctors.js']);
                                }
                            ]
                        }
                    })
                    .state('app.docs-recus-ent.visualentrecus', {
                        url: '/entreprise/entreprise/docsrecus/:fold',
                        templateUrl: 'partials/admin_entreprise/mes_operations/banque-document-show.html',
                        controller: 'NostauxListCtrl'
                    })
                    .state('app.docs-recus-ent.visualent_bynamedocrecus', {
                        url: '/entreprise/entreprise/docsrecus/:name/:named/:url_/:id',
                        templateUrl: 'partials/admin_entreprise/mes_operations/docs-visual_byid2.html',
                        controller: 'DetailDocCtrlByName'
                    })
                    .state('app.adminent_op_esp_contacts', {
                        url: '/entreprise/adminent_op_esp_contacts',
                        templateUrl: 'partials/admin_entreprise/mes_operations/op_esp_contacts.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/doctors.js']);
                                }
                            ]
                        }
                    })
                    //FIN OPERATIONS ESPACE
                    //OPERATIONS MARCHE
                    .state('app.adminent_op_marche_tdj', {
                        url: '/entreprise/adminent_op_marche_tdj',
                        templateUrl: 'partials/admin_entreprise/mes_operations/op_marche_tdj.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/doctors.js']);
                                }
                            ]
                        }
                    })
                    .state('app.adminent_op_marche_cond', {
                        url: '/entreprise/adminent_op_marche_cond',
                        templateUrl: 'partials/admin_entreprise/mes_operations/op_marche_cond.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/doctors.js']);
                                }
                            ]
                        }
                    })
                    .state('app.adminent_op_admin_rh', {
                        url: '/entreprise/adminent_op_admin_rh',
                        templateUrl: 'partials/admin_entreprise/mes_operations/op_admin_rh.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/login.js',
                                        '../bower_components/font-awesome/css/font-awesome.css'
                                    ]);
                                }
                            ]
                        }
                    })
                    .state('app.adminent_op_admin_v', {
                        url: '/entreprise/adminent_op_admin_v',
                        templateUrl: 'partials/admin_entreprise/mes_operations/op_admin_v.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/login.js',
                                        '../bower_components/font-awesome/css/font-awesome.css'
                                    ]);
                                }
                            ]
                        }
                    })
                    // .state('app.doc-ent-show', {
                    // url: '/entreprise/document-show/:url_/:name/:id',
                    // templateUrl : 'partials/admin_entreprise/mes_operations/banque-document-show.html',
                    // controller : 'DetailDocCtrlr',
                    // resolve: {
                    // deps: ['uiLoad',
                    // function(uiLoad) {
                    // return uiLoad.load(['js/controllers/doctors.js']);
                    // }
                    // ]
                    // }
                    // //controller: 'DetailDocCtrl'
                    // })
                    // .state('app.docs-recus.ent', {
                    // url: '/entreprise/docs-recus',
                    // templateUrl: 'partials/admin_entreprise/mes_operations/docs-recus.html',
                    // resolve: {
                    // deps: ['uiLoad',
                    // function(uiLoad) {
                    // return uiLoad.load(['js/controllers/doctors.js']);
                    // }
                    // ]
                    // }
                    // })
                    //FIN OPERATIONS MARCHE
                    //FIN OPERATIONS ADMINISTRATION
                    //FIN OPERATIONS ADMINISTRATION
                    //OPERATIONS REGISTER
                    // .state('app.adminent_register_op_cr_spot', {
                    // url: '/adminent_register_op_cr_spot',
                    // templateUrl: 'partials/admin_entreprise/mes_operations/register_op_cr_spot.html'
                    // })  
                    // .state('app.adminent_register_op_ch', {
                    // url: '/adminent_register_op_ch',
                    // templateUrl: 'partials/admin_entreprise/mes_operations/register_op_ch.html',
                    // resolve: {
                    // deps: ['uiLoad',
                    // function(uiLoad) {
                    // return uiLoad.load(['js/controllers/login.js',
                    // '../bower_components/font-awesome/css/font-awesome.css']);
                    // }
                    // ]
                    // }
                    // })
                    // .state('app.adminent_register_op_tr', {
                    // url: '/adminent_register_op_tr',
                    // templateUrl: 'partials/admin_entreprise/mes_operations/register_op_tr.html',
                    // resolve: {
                    // deps: ['uiLoad',
                    // function(uiLoad) {
                    // return uiLoad.load(['js/controllers/login.js',
                    // '../bower_components/font-awesome/css/font-awesome.css']);
                    // }
                    // ]
                    // }
                    // })
                    // .state('app.adminent_register_op_dep', {
                    // url: '/adminent_register_op_dep',
                    // templateUrl: 'partials/admin_entreprise/mes_operations/register_op_dep.html',
                    // resolve: {
                    // deps: ['uiLoad',
                    // function(uiLoad) {
                    // return uiLoad.load(['js/controllers/login.js',
                    // '../bower_components/font-awesome/css/font-awesome.css']);
                    // }
                    // ]
                    // }
                    // })
                    // .state('app.adminent_op_esp_mesdocc', {
                    // url: '/adminent_op_esp_mesdocc',
                    // templateUrl: 'partials/admin_entreprise/mes_operations/register_op_esp_mesdocc.html',
                    // resolve: {
                    // deps: ['uiLoad',
                    // function(uiLoad) {
                    // return uiLoad.load(['js/controllers/login.js',
                    // '../bower_components/font-awesome/css/font-awesome.css']);
                    // }
                    // ]
                    // }
                    // }) 
                    // .state('app.adminent_op_esp_mesdocd', {
                    // url: '/adminent_op_esp_mesdocd',
                    // templateUrl: 'partials/admin_entreprise/mes_operations/register_op_esp_mesdocd.html',
                    // resolve: {
                    // deps: ['uiLoad',
                    // function(uiLoad) {
                    // return uiLoad.load(['js/controllers/login.js',
                    // 'js/directives/ui-sectionbox.js',
                    // '../bower_components/font-awesome/css/font-awesome.css']);
                    // }
                    // ]
                    // }
                    // }) 
                    // .state('app.adminent_op_esp_mesdoca', {
                    // url: '/adminent_op_esp_mesdoca',
                    // templateUrl: 'partials/admin_entreprise/mes_operations/register_op_esp_mesdoca.html',
                    // resolve: {
                    // deps: ['uiLoad',
                    // function(uiLoad) {
                    // return uiLoad.load(['js/controllers/login.js',
                    // '../bower_components/font-awesome/css/font-awesome.css']);
                    // }
                    // ]
                    // }
                    // }) 
                    // .state('app.adminent_op_adm_rhg', {
                    // url: '/adminent_op_adm_rhg',
                    // templateUrl: 'partials/admin_entreprise/mes_operations/register_op_adm_rhg.html',
                    // resolve: {
                    // deps: ['uiLoad',
                    // function(uiLoad) {
                    // return uiLoad.load(['js/controllers/login.js',
                    // '../bower_components/font-awesome/css/font-awesome.css']);
                    // }
                    // ]
                    // }
                    // }) 
                    // .state('app.adminent_op_adm_rhu', {
                    // url: '/adminent_op_adm_rhu',
                    // templateUrl: 'partials/admin_entreprise/mes_operations/register_op_adm_rhu.html',
                    // resolve: {
                    // deps: ['uiLoad',
                    // function(uiLoad) {
                    // return uiLoad.load(['js/controllers/login.js',
                    // '../bower_components/font-awesome/css/font-awesome.css']);
                    // }
                    // ]
                    // }
                    // }) 
                    // .state('app.adminent_op_adm_vnb', {
                    // url: '/adminent_op_adm_vnb',
                    // templateUrl: 'partials/admin_entreprise/mes_operations/register_op_adm_vnb.html',
                    // resolve: {
                    // deps: ['uiLoad',
                    // function(uiLoad) {
                    // return uiLoad.load(['js/controllers/login.js',
                    // '../bower_components/font-awesome/css/font-awesome.css']);
                    // }
                    // ]
                    // }
                    // }) 
                    // .state('app.adminent_op_adm_vch', {
                    // url: '/adminent_op_adm_vch',
                    // templateUrl: 'partials/admin_entreprise/mes_operations/register_op_adm_vch.html',
                    // resolve: {
                    // deps: ['uiLoad',
                    // function(uiLoad) {
                    // return uiLoad.load(['js/controllers/login.js',
                    // '../bower_components/font-awesome/css/font-awesome.css']);
                    // }
                    // ]
                    // }
                    // }) 
                    // .state('app.adminent_op_adm_vnv', {
                    // url: '/adminent_op_adm_vnv',
                    // templateUrl: 'partials/admin_entreprise/mes_operations/register_op_adm_vnv.html',
                    // resolve: {
                    // deps: ['uiLoad',
                    // function(uiLoad) {
                    // return uiLoad.load(['js/controllers/login.js',
                    // '../bower_components/font-awesome/css/font-awesome.css']);
                    // }
                    // ]
                    // }
                    // }) 
                    // .state('app.adminent_op_adm_vrc', {
                    // url: '/adminent_op_adm_vrc',
                    // templateUrl: 'partials/admin_entreprise/mes_operations/register_op_adm_vrc.html',
                    // resolve: {
                    // deps: ['uiLoad',
                    // function(uiLoad) {
                    // return uiLoad.load(['js/controllers/login.js',
                    // '../bower_components/font-awesome/css/font-awesome.css']);
                    // }
                    // ]
                    // }
                    // }) 
                    //FIN OPERATIONS REGISTER
                    /*******************************************************************************************************************
                     ********************************************************************************************************************
                     ********************************FIN ADMINISTRATEUR ENTREPRISE**************************************************************
                     ********************************************************************************************************************
                     ********************************************************************************************************************/

                /*******************************************************************************************************************
                 ********************************************************************************************************************
                 ********************************ADMINISTRATEUR BANQUE**************************************************************
                 ********************************************************************************************************************
                 ********************************************************************************************************************/
                // .state('app.hos-dashboard', {
                // url: '/hospital/dashboard',
                // templateUrl: 'partials/hos-dashboard.html',
                // resolve: {
                // deps: ['$ocLazyLoad',
                // function($ocLazyLoad) {
                // return $ocLazyLoad.load('chart.js').then(
                // function() {
                // return $ocLazyLoad.load('js/controllers/hos-dashboard.js');
                // }
                // ).then(
                // function() {
                // return $ocLazyLoad.load('../bower_components/font-awesome/css/font-awesome.css');
                // }
                // );
                // }
                // ]
                // }
                // })
                // .state('app.mail', {
                // abstract: true,
                // url: '/mail',
                // template: '<div ui-view class=""></div>',
                // templateUrl: 'partials/mail.html',
                // use resolve to load other dependences
                // resolve: {
                // deps: ['uiLoad',
                // function(uiLoad) {
                // return uiLoad.load(['../bower_components/font-awesome/css/font-awesome.css', 'js/controllers/mail.js',
                // 'js/services/mail-service.js',
                // JQ_CONFIG.moment
                // ]);
                // }
                // ]
                // }
                // })
                // .state('app.mail.list', {
                // url: '/{fold}',
                // templateUrl: 'partials/mail-list.html'
                // })
                // .state('app.mail.compose', {
                // url: '/compose',
                // templateUrl: 'partials/mail-compose.html'
                // })
                // .state('app.mail.view', {
                // url: '/{mailId:[0-9]{1,4}}',
                // templateUrl: 'partials/mail-view.html'
                // }) 

                .state('app.nos-taux', {
                        url: '/banque/nos-taux',
                        templateUrl: 'partials/admin_banque/nos-taux.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/login.js',
                                        '../bower_components/font-awesome/css/font-awesome.css'
                                    ]);
                                }
                            ]
                        }
                    })
                    .state('app.contact-bk', {
                        url: '/banque/mes-contacts',
                        templateUrl: 'partials/admin_banque/contact.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/app.bank.js',
                                        '../bower_components/font-awesome/css/font-awesome.css'
                                    ]);
                                }
                            ]
                        }
                    })
                    .state('app.search-document', {
                        url: '/banque/search/bank-docs',
                        templateUrl: 'partials/admin_banque/searchDocument.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/filters/search-startfrom.js',
                                        'js/controllers/search.js',
                                        'js/directives/ui-searchtabs.js',
                                        '../bower_components/font-awesome/css/font-awesome.css'
                                    ]);
                                }
                            ]
                        }
                    })
                    .state('app.search-document-recu', {
                        url: '/banque/search/bank-docs-recu',
                        templateUrl: 'partials/admin_banque/searchDocumentRecu.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/filters/search-startfrom.js', 'js/controllers/search.js', 'js/directives/ui-searchtabs.js', '../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    })
                    .state('app.search-document-entreprise', {
                        url: '/entreprise/search/entreprise-docs',
                        templateUrl: 'partials/admin_entreprise/mes_operations/searchDocument.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/filters/search-startfrom.js', 'js/controllers/search.js', 'js/directives/ui-searchtabs.js', '../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    })
                    .state('app.search-doc-entreprise-recu', {
                        url: '/entreprise/search/entreprise-docs-recu',
                        templateUrl: 'partials/admin_entreprise/mes_operations/searchDocumentRecu.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/filters/search-startfrom.js', 'js/controllers/search.js', 'js/directives/ui-searchtabs.js', '../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    })
                    .state('app.mes-docs', {
                        url: '/banque/mes-docs',
                        templateUrl: 'partials/admin_banque/mes-docs.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/doctors.js']);
                                }
                            ]
                        }
                    })
                    .state('app.mes-docs.visualbk', {
                        url: '/banque/:fold',
                        templateUrl: 'partials/admin_banque/docs-visual.html',
                        controller: 'NostauxListCtrl'
                    })
                    .state('app.mes-docs.visualbk_byname', {
                        url: '/banque/banque/:name/:named/:url_/:id',
                        templateUrl: 'partials/admin_banque/docs-visual_byid.html',
                        controller: 'DetailDocBankByName'
                    })
                    .state('app.docs-recus-bk', {
                        url: '/banque/docs-recus',
                        templateUrl: 'partials/admin_banque/docs-recus.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/doctors.js']);
                                }
                            ]
                        }
                    })
                    .state('app.docs-recus-bk.visual_recu', {
                        url: '/document/:fold',
                        templateUrl: 'partials/admin_banque/docs-visual-Recu.html',
                        controller: 'NostauxListCtrl'
                    })
                    .state('app.docs-recus-bk.visualbk_byname', {
                        url: '/banque/banque/:name/:named/:url_/:id',
                        templateUrl: 'partials/admin_banque/docs-visual_byid.html',
                        controller: 'DetailDocBankByName'
                    })
                    .state('app.adminbk_rh', {
                        url: '/banque/admin/rh',
                        templateUrl: 'partials/admin_banque/rh.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/login.js',
                                        '../bower_components/font-awesome/css/font-awesome.css'
                                    ]);
                                }
                            ]
                        }
                    })
                    .state('app.adminbk_validation', {
                        url: '/banque/admin/validation',
                        templateUrl: 'partials/admin_banque/validation.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/login.js',
                                        '../bower_components/font-awesome/css/font-awesome.css'
                                    ]);
                                }
                            ]
                        }
                    })
                    .state('app.adminbk_conditionBank', {
                        url: '/banque/admin/bank-condititon',
                        templateUrl: 'partials/admin_banque/conditionBank.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/app.bank.js',
                                        '../bower_components/font-awesome/css/font-awesome.css'
                                    ]);
                                }
                            ]
                        }
                    })
                    .state('app.facebank', {
                        url: '/admin/notifications',
                        templateUrl: 'partials/ui-notifications.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('cgNotify').then(
                                        function() {
                                            return $ocLazyLoad.load('js/controllers/notify.js');
                                        }
                                    );
                                }
                            ]
                        }
                    })
                    .state('app.statut', {
                        url: '/user/statut',
                        templateUrl: 'partials/statut-publication.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('cgNotify').then(
                                        function() {
                                            return $ocLazyLoad.load('js/controllers/statut-publication.js');
                                        }
                                    );
                                }
                            ]
                        }
                    })

                // .state('app.adminbk_esp_mesdocc', {
                // url: '/adminbk_esp_mesdocc',
                // templateUrl: 'partials/admin_banque/register_esp_mesdocc.html',
                // resolve: {
                // deps: ['uiLoad',
                // function(uiLoad) {
                // return uiLoad.load(['js/controllers/login.js',
                // '../bower_components/font-awesome/css/font-awesome.css']);
                // }
                // ]
                // }
                // }) 
                // .state('app.adminbk_esp_mesdocd', {
                // url: '/adminbk_esp_mesdocd',
                // templateUrl: 'partials/admin_banque/register_esp_mesdocd.html',
                // resolve: {
                // deps: ['uiLoad',
                // function(uiLoad) {
                // return uiLoad.load(['js/controllers/login.js',
                // '../bower_components/font-awesome/css/font-awesome.css']);
                // }
                // ]
                // }
                // }) 
                .state('app.adminbk_esp_mesdoca', {
                        url: '/banque/adminbk_esp_mesdoca',
                        templateUrl: 'partials/admin_banque/register_esp_mesdoca.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/login.js',
                                        '../bower_components/font-awesome/css/font-awesome.css'
                                    ]);
                                }
                            ]
                        }
                    })
                    // .state('app.hos-doctor-profile', {
                    // url: '/hospital/doctor-profile',
                    // templateUrl: 'partials/hos-doctor-profile.html',
                    // resolve: {
                    // deps: ['uiLoad',
                    // function(uiLoad) {
                    // return uiLoad.load(['../bower_components/font-awesome/css/font-awesome.css']);
                    // }
                    // ]
                    // }

                // })
                .state('app.op-credit-spot', {
                        url: '/banque/mes-operations/op-credit-spot',
                        templateUrl: 'partials/admin_banque/credit-spot.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/login.js',
                                        '../bower_components/font-awesome/css/font-awesome.css'
                                    ]);
                                }
                            ]
                        }
                    })
                    .state('app.change', {
                        url: '/banque/mes-operations/change',
                        templateUrl: 'partials/admin_banque/change.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/login.js',
                                        '../bower_components/font-awesome/css/font-awesome.css'
                                    ]);
                                }
                            ]
                        }
                    })
                    .state('app.transfert', {
                        url: '/banque/mes-operations/transfert',
                        templateUrl: 'partials/admin_banque/transfert.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/login.js',
                                        '../bower_components/font-awesome/css/font-awesome.css'
                                    ]);
                                }
                            ]
                        }
                    })
                    .state('app.depot-a-terme', {
                        url: '/banque/mes-operations/depot-a-terme',
                        templateUrl: 'partials/admin_banque/depot-a-terme.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/login.js',
                                        '../bower_components/font-awesome/css/font-awesome.css'
                                    ]);
                                }
                            ]
                        }
                    })
                    .state('app.escompte', {
                        url: '/banque/mes-operations/escompte',
                        templateUrl: 'partials/admin_banque/escompte.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/login.js',
                                        '../bower_components/font-awesome/css/font-awesome.css'
                                    ]);
                                }
                            ]
                        }
                    })
                    .state('app.doc-bk-show', {
                        url: '/banque/document-show/:url_/:name/:id',
                        templateUrl: 'partials/admin_banque/banque-document-show.html',
                        controller: 'DetailbankController',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/app.bank.js']);
                                }
                            ]
                        }
                        // controller: 'DetailDocCtrl'
                    })
                    // .state('app.banque-taux-cr', {
                    // url: '/banque/nostaux-cr',
                    // templateUrl: 'partials/admin_banque/register_esp_admin_cr.html',
                    // resolve: {
                    // deps: ['uiLoad',
                    // function(uiLoad) {
                    // return uiLoad.load(['js/controllers/login.js',
                    // '../bower_components/font-awesome/css/font-awesome.css']);
                    // }
                    // ]
                    // }
                    // })
                    // .state('app.banque-taux-cc', {
                    // url: '/banque/nostaux-cc',
                    // templateUrl: 'partials/admin_banque/register_esp_admin_cc.html',
                    // resolve: {
                    // deps: ['uiLoad',
                    // function(uiLoad) {
                    // return uiLoad.load(['js/controllers/login.js',
                    // '../bower_components/font-awesome/css/font-awesome.css']);
                    // }
                    // ]
                    // }
                    // })
                    // .state('app.banque-taux-dep', {
                    // url: '/banque/nostaux-dep',
                    // templateUrl: 'partials/admin_banque/register_esp_admin_dep.html',
                    // resolve: {
                    // deps: ['uiLoad',
                    // function(uiLoad) {
                    // return uiLoad.load(['js/controllers/login.js',
                    // '../bower_components/font-awesome/css/font-awesome.css']);
                    // }
                    // ]
                    // }
                    // })
                    // .state('app.banque-taux-tr', {
                    // url: '/banque/nostaux-tr',
                    // templateUrl: 'partials/admin_banque/register_esp_admin_tr.html',
                    // resolve: {
                    // deps: ['uiLoad',
                    // function(uiLoad) {
                    // return uiLoad.load(['js/controllers/login.js',
                    // '../bower_components/font-awesome/css/font-awesome.css']);
                    // }
                    // ]
                    // }
                    // })
                    // .state('app.hos-patient-profile', {
                    // url: '/hospital/patient-profile',
                    // templateUrl: 'partials/hos-patient-profile.html',
                    // resolve: {
                    // deps: ['uiLoad',
                    // function(uiLoad) {
                    // return uiLoad.load(['../bower_components/font-awesome/css/font-awesome.css']);
                    // }
                    // ]
                    // }

                // })

                // .state('app.hos-book-appointment', {
                // url: '/hospital/staff-add',
                // templateUrl: 'partials/hos-book-appointment.html'
                // })    
                // .state('app.hos-doc-schedule', {
                // url: '/hospital/doc-schedule',
                // templateUrl: 'partials/hos-doc-schedule.html',
                // resolve: {
                // deps: ['$ocLazyLoad', 'uiLoad',
                // function($ocLazyLoad, uiLoad) {
                // return uiLoad.load(
                // JQ_CONFIG.fullcalendar.concat('js/controllers/doctor-schedule.js')
                // ).then(
                // function() {
                // return $ocLazyLoad.load('ui.calendar');
                // }
                // )
                // }
                // ]
                // }
                // })

                // .state('app.hos-payments', {
                // url: '/hospital/payments',
                // templateUrl: 'partials/hos-payments.html'
                // })  
                // .state('app.hos-payment-add', {
                // url: '/hospital/payment-add',
                // templateUrl: 'partials/hos-payment-add.html',
                // controller: 'HospitalPaymentAddCtrl',
                // resolve: {
                // deps: ['$ocLazyLoad',
                // function($ocLazyLoad) {
                // return $ocLazyLoad.load('xeditable').then(
                // function() {
                // return $ocLazyLoad.load('js/controllers/hos-payment-add.js');
                // }
                // );
                // }
                // ]
                // }
                // })
                // .state('app.hos-patient-invoice', {
                // url: '/hospital/patient-invoice',
                // templateUrl: 'partials/hos-patient-invoice.html'
                // })  
                // .state('app.hos-staffs', {
                // url: '/hospital/staffs',
                // templateUrl: 'partials/hos-staffs.html',
                // resolve: {
                // deps: ['uiLoad',
                // function(uiLoad) {
                // return uiLoad.load(['js/controllers/hos-staffs.js']);
                // }
                // ]
                // }
                // })    
                // .state('app.hos-staff-add', {
                // url: '/hospital/staff-add',
                // templateUrl: 'partials/hos-staff-add.html'
                // })    
                // .state('app.hos-staff-edit', {
                // url: '/hospital/staff-edit',
                // templateUrl: 'partials/hos-staff-edit.html'
                // })
                // .state('app.hos-staff-profile', {
                // url: '/hospital/staff-profile',
                // templateUrl: 'partials/hos-staff-profile.html',
                // resolve: {
                // deps: ['uiLoad',
                // function(uiLoad) {
                // return uiLoad.load(['../bower_components/font-awesome/css/font-awesome.css']);
                // }
                // ]
                // }

                // })  
                // .state('app.hos-events', {
                // url: '/hospital/events',
                // templateUrl: 'partials/hos-events.html',
                // resolve: {
                // deps: ['$ocLazyLoad', 'uiLoad',
                // function($ocLazyLoad, uiLoad) {
                // return uiLoad.load(
                // JQ_CONFIG.fullcalendar.concat('js/controllers/hos-events.js')
                // ).then(
                // function() {
                // return $ocLazyLoad.load('ui.calendar');
                // }
                // )
                // }
                // ]
                // }
                // })

                // .state('app.hos-centres', {
                // url: '/hospital/centres',
                // templateUrl: 'partials/hos-centres.html',
                // resolve: {
                // deps: ['$ocLazyLoad',
                // function($ocLazyLoad) {
                // return $ocLazyLoad.load('js/controllers/hos-centres.js');
                // }
                // ]
                // }
                // })

                // .state('app.hos-report-patient', {
                // url: '/hospital/report-patient',
                // templateUrl: 'partials/hos-report-patient.html',
                // resolve: {
                // deps: ['$ocLazyLoad',
                // function($ocLazyLoad) {
                // return $ocLazyLoad.load('chart.js').then(
                // function() {
                // return $ocLazyLoad.load('js/controllers/hos-report-patient.js');
                // }
                // );
                // }
                // ]
                // }
                // }) 
                // .state('app.hos-report-hospital', {
                // url: '/hospital/report-hospital',
                // templateUrl: 'partials/hos-report-hospital.html',
                // resolve: {
                // deps: ['$ocLazyLoad',
                // function($ocLazyLoad) {
                // return $ocLazyLoad.load('chart.js').then(
                // function() {
                // return $ocLazyLoad.load('js/controllers/hos-report-hospital.js');
                // }
                // );
                // }
                // ]
                // }
                // })
                // .state('app.hos-report-sales', {
                // url: '/hospital/report-sales',
                // templateUrl: 'partials/hos-report-sales.html',
                // resolve: {
                // deps: ['$ocLazyLoad',
                // function($ocLazyLoad) {
                // return $ocLazyLoad.load(['js/controllers/hos-report-sales.js']);
                // }
                // ]
                // }
                // })
                // .state('app.banque_register_op_cr_spot', {
                // url: 'banque/op-credit-spot/new',
                // templateUrl: 'partials/admin_banque/new_op_cr_spot.html',
                // resolve: {
                // deps: ['uiLoad',
                // function(uiLoad) {
                // return uiLoad.load(['js/controllers/login.js',
                // '../bower_components/font-awesome/css/font-awesome.css']);
                // }
                // ]
                // }
                // })
                /*******************************************************************************************************************
                 ********************************************************************************************************************
                 ********************************FIN ADMINISTRATEUR BANQUE**************************************************************
                 ********************************************************************************************************************
                 ********************************************************************************************************************/
                .state('app.blo-blog-edit', {
                        url: '/blog/blog-edit',
                        templateUrl: 'partials/blo-blog-edit.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    })
                    .state('app.blo-search', {
                        url: '/blog/search',
                        templateUrl: 'partials/blo-search.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/filters/search-startfrom.js',
                                        'js/controllers/blo-search.js',
                                        'js/directives/ui-searchtabs.js',
                                        '../bower_components/font-awesome/css/font-awesome.css'
                                    ]);
                                }
                            ]
                        }

                    })
                    .state('app.blo-users', {
                        url: '/blog/users',
                        templateUrl: 'partials/blo-users.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/blo-users.js']);
                                }
                            ]
                        }
                    })
                    .state('app.blo-user-add', {
                        url: '/blog/user-add',
                        templateUrl: 'partials/blo-user-add.html'
                    })
                    .state('app.blo-user-edit', {
                        url: '/blog/user-edit',
                        templateUrl: 'partials/blo-user-edit.html'
                    })
                    .state('app.blo-user-profile', {
                        url: '/blog/user-profile',
                        templateUrl: 'partials/blo-user-profile.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }

                    })
                    .state('app.blo-categories', {
                        url: '/blog/categories',
                        templateUrl: 'partials/blo-categories.html'
                    })
                    .state('app.blo-category-add', {
                        url: '/blog/category-add',
                        templateUrl: 'partials/blo-category-add.html'
                    })
                    .state('app.blo-category-edit', {
                        url: '/blog/category-edit',
                        templateUrl: 'partials/blo-category-edit.html'
                    })
                    .state('app.blo-tags', {
                        url: '/blog/tags',
                        templateUrl: 'partials/blo-tags.html'
                    })
                    .state('app.blo-tag-add', {
                        url: '/blog/tag-add',
                        templateUrl: 'partials/blo-tag-add.html'
                    })
                    .state('app.blo-tag-edit', {
                        url: '/blog/tag-edit',
                        templateUrl: 'partials/blo-tag-edit.html'
                    })
                    .state('app.blo-upload', {
                        url: '/blog/upload',
                        templateUrl: 'partials/blo-upload.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('angularFileUpload').then(
                                        function() {
                                            return $ocLazyLoad.load('js/controllers/blo-upload.js');
                                        }
                                    );
                                }
                            ]
                        }
                    })
                    .state('app.blo-media', {
                        url: '/blog/media',
                        templateUrl: 'partials/blo-media.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/blo-media.js']);
                                }
                            ]
                        }
                    })
                    .state('app.blo-pages', {
                        url: '/blog/pages',
                        templateUrl: 'partials/blo-pages.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/filters/pages-startfrom.js',
                                        'js/controllers/blo-pages.js',
                                        '../bower_components/font-awesome/css/font-awesome.css'
                                    ]);
                                }
                            ]
                        }
                    })
                    .state('app.blo-pageview', {
                        url: '/blog/page/{pageId:[0-9]{1,4}}',
                        templateUrl: 'partials/blo-page-item.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load(['../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    })
                    .state('app.blo-page-view', {
                        url: '/blog/page-view',
                        templateUrl: 'partials/blo-page-item.html'
                    })
                    .state('app.blo-page-add', {
                        url: '/blog/page-add',
                        templateUrl: 'partials/blo-page-add.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    })
                    .state('app.blo-page-edit', {
                        url: '/blog/page-edit',
                        templateUrl: 'partials/blo-page-edit.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    })
                    .state('app.blo-report-visitors', {
                        url: '/blog/report-visitors',
                        templateUrl: 'partials/blo-report-visitors.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('chart.js').then(
                                        function() {
                                            return $ocLazyLoad.load('js/controllers/blo-report-visitors.js');
                                        }
                                    );
                                }
                            ]
                        }
                    })
                    .state('app.ui', {
                        url: '/ui',
                        template: '<div ui-view class=""></div>'
                    })
                    .state('app.ui.typography', {
                        url: '/typography',
                        templateUrl: 'partials/ui-typography.html'
                    })
                    .state('app.ui.accordion', {
                        url: '/accordion',
                        templateUrl: 'partials/ui-accordion.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    })
                    .state('app.ui.progress', {
                        url: '/progress',
                        templateUrl: 'partials/ui-progress.html'
                    })
                    .state('app.ui.icons', {
                        url: '/icons',
                        templateUrl: 'partials/ui-icons.html'
                    })
                    .state('app.ui.materialicons', {
                        url: '/material-icons',
                        templateUrl: 'partials/ui-icons-material.html'
                    })
                    .state('app.ui.faicons', {
                        url: '/fontawesome-icons',
                        templateUrl: 'partials/ui-icons-fa.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }

                    })
                    .state('app.ui.glyphicons', {
                        url: '/glyph-icons',
                        templateUrl: 'partials/ui-icons-glyph.html'
                    })
                    .state('app.ui.buttons', {
                        url: '/buttons',
                        templateUrl: 'partials/ui-buttons.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    })
                    .state('app.ui.modals', {
                        url: '/modals',
                        templateUrl: 'partials/ui-modals.html'
                    })
                    .state('app.ui.notifications', {
                        url: '/notifications',
                        templateUrl: 'partials/ui-notifications.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('cgNotify').then(
                                        function() {
                                            return $ocLazyLoad.load('js/controllers/notify.js');
                                        }
                                    );
                                }
                            ]
                        }
                    })
                    .state('app.ui.tooltips', {
                        url: '/tooltips',
                        templateUrl: 'partials/ui-tooltips.html'
                    })
                    .state('app.ui.sortable', {
                        url: '/sortable',
                        templateUrl: 'partials/ui-sortable.html'
                    })
                    /*.state('app.ui.navbars', {
                        url: '/navbars',
                        templateUrl: 'partials/ui-navbars.html'
                    })*/
                    /*.state('app.ui.extra', {
                        url: '/extra',
                        templateUrl: 'partials/ui-extra.html'
                    })*/
                    .state('app.ui.pagination', {
                        url: '/pagination',
                        templateUrl: 'partials/ui-pagination.html'
                    })
                    .state('app.ui.breadcrumb', {
                        url: '/breadcrumb',
                        templateUrl: 'partials/ui-breadcrumb.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    })
                    .state('app.ui.carousel', {
                        url: '/carousel',
                        templateUrl: 'partials/ui-carousel.html'
                    })
                    .state('app.ui.panels', {
                        url: '/panels',
                        templateUrl: 'partials/ui-panels.html'
                    })
                    .state('app.ui.grids', {
                        url: '/grids',
                        templateUrl: 'partials/ui-grids.html'
                    })
                    .state('app.ui.tiles', {
                        url: '/tiles',
                        templateUrl: 'partials/ui-tiles.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('countTo').then(
                                        function() {
                                            return $ocLazyLoad.load('js/controllers/countto.js');
                                        }
                                    ).then(
                                        function() {
                                            return $ocLazyLoad.load('../bower_components/font-awesome/css/font-awesome.css');
                                        }
                                    );
                                }
                            ]
                        }
                    })
                    .state('app.form', {
                        url: '/form',
                        template: '<div ui-view class=""></div>'
                    })

                .state('app.form.elements', {
                        url: '/elements',
                        templateUrl: 'partials/form-elements.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    })
                    .state('app.form.premade', {
                        url: '/premade',
                        templateUrl: 'partials/form-premade.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    })
                    .state('app.form.components', {
                        url: '/components',
                        templateUrl: 'partials/form-components.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('colorpicker.module').then(
                                        function() {
                                            return $ocLazyLoad.load('js/controllers/colorpicker.js');
                                        }
                                    ).then(
                                        function() {
                                            return $ocLazyLoad.load('../bower_components/font-awesome/css/font-awesome.css');
                                        }
                                    );
                                }
                            ]
                        }
                    })
                    .state('app.form.wizard', {
                        url: '/wizard',
                        templateUrl: 'partials/form-wizard.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    })
                    .state('app.form.validation', {
                        url: '/validation',
                        templateUrl: 'partials/form-validation.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load('js/controllers/form-validation.js');
                                }
                            ]
                        }
                    })
                    .state('app.form.fileupload', {
                        url: '/fileupload',
                        templateUrl: 'partials/form-fileupload.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('angularFileUpload').then(
                                        function() {
                                            return $ocLazyLoad.load('js/controllers/file-upload.js');
                                        }
                                    );
                                }
                            ]
                        }
                    })
                    .state('app.form.slider', {
                        url: '/slider',
                        templateUrl: 'partials/form-slider.html',
                        controller: 'FormSliderCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('vr.directives.slider').then(
                                        function() {
                                            return $ocLazyLoad.load('js/controllers/form-slider.js');
                                        }
                                    );
                                }
                            ]
                        }
                    })
                    .state('app.form.editable', {
                        url: '/editable',
                        templateUrl: 'partials/form-editable.html',
                        controller: 'FormXeditableCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('xeditable').then(
                                        function() {
                                            return $ocLazyLoad.load('js/controllers/form-xeditable.js');
                                        }
                                    );
                                }
                            ]
                        }
                    })
                    .state('app.form.editors', {
                        url: '/editors',
                        templateUrl: 'partials/form-editors.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                        /*,
                                                controller: 'FormEditorCtrl',
                                                resolve:  {
                                                    deps: ['$ocLazyLoad',
                                                      function( $ocLazyLoad ){
                                                        return $ocLazyLoad.load('textAngular').then(
                                                            function(){
                                                                return $ocLazyLoad.load('js/controllers/form-editor.js');
                                                            }
                                                        );
                                                    }]
                                                }*/
                    })
                    .state('app.form.masks', {
                        url: '/masks',
                        templateUrl: 'partials/form-masks.html'
                    })
                    .state('app.ui.calendar', {
                        url: '/calendar',
                        templateUrl: 'partials/ui-calendar.html',
                        resolve: {
                            deps: ['$ocLazyLoad', 'uiLoad',
                                function($ocLazyLoad, uiLoad) {
                                    return uiLoad.load(
                                        JQ_CONFIG.fullcalendar.concat('js/controllers/calendar.js')
                                    ).then(
                                        function() {
                                            return $ocLazyLoad.load('ui.calendar');
                                        }
                                    )
                                }
                            ]
                        }
                    })
                    .state('app.ui.pricing', {
                        url: '/pricing',
                        templateUrl: 'partials/ui-pricing.html'
                    })
                    // .state('app.ui.profile', {
                    // url: '/profile',
                    // templateUrl: 'partials/ui-profile.html',
                    // resolve: {
                    // deps: ['uiLoad',
                    // function(uiLoad) {
                    // return uiLoad.load(['../bower_components/font-awesome/css/font-awesome.css']);
                    // }
                    // ]
                    // }
                    // })
                    .state('app.ui.timeline', {
                        url: '/timeline',
                        templateUrl: 'partials/ui-timeline.html'
                    })
                    .state('app.ui.invoice', {
                        url: '/invoice',
                        templateUrl: 'partials/ui-invoice.html'
                    })
                    .state('app.ui.members', {
                        url: '/members',
                        templateUrl: 'partials/ui-members.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/members.js', '../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }

                    })
                    .state('app.ui.search', {
                        url: '/search',
                        templateUrl: 'partials/ui-search.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/filters/search-startfrom.js', 'js/controllers/search.js', 'js/directives/ui-searchtabs.js', '../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }

                    })
                    .state('app.ui.blogs', {
                        url: '/blogs',
                        templateUrl: 'partials/ui-blogs.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/filters/blogs-startfrom.js', 'js/controllers/blogs.js', '../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    })
                    .state('app.ui.blogview', {
                        url: '/blog/{blogId:[0-9]{1,4}}',
                        templateUrl: 'partials/ui-blog-item.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load(['../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    })
                    .state('app.ui.imagecrop', {
                        url: '/imagecrop',
                        templateUrl: 'partials/ui-imagecrop.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('ngImgCrop').then(
                                        function() {
                                            return $ocLazyLoad.load('js/controllers/imagecrop.js');
                                        }
                                    );
                                }
                            ]
                        }
                    })
                    // .state('app.ui.faq', {
                    // url: '/faq',
                    // templateUrl: 'partials/ui-faq.html',
                    // resolve: {
                    // deps: ['$ocLazyLoad',
                    // function($ocLazyLoad) {
                    // return $ocLazyLoad.load(['js/controllers/faq.js']);
                    // }
                    // ]
                    // }
                    // })
                    .state('app.mail', {
                        abstract: true,
                        url: '/mail',
                        //template: '<div ui-view class=""></div>',
                        templateUrl: 'partials/mail.html',
                        // use resolve to load other dependences
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['../bower_components/font-awesome/css/font-awesome.css', 'js/controllers/mail.js',
                                        'js/services/mail-service.js',
                                        JQ_CONFIG.moment
                                    ]);
                                }
                            ]
                        }
                    })
                    .state('app.mail.list', {
                        url: '/{fold}',
                        templateUrl: 'partials/mail-list.html'
                    })
                    .state('app.mail.compose', {
                        url: '/compose',
                        templateUrl: 'partials/mail-compose.html'
                    })
                    .state('app.mail.view', {
                        url: '/{mailId:[0-9]{1,4}}',
                        templateUrl: 'partials/mail-view.html'
                    })
                    .state('app.charts', {
                        url: '/charts',
                        template: '<div ui-view class=""></div>',
                    })
                    // .state('app.charts.morris', {
                    // url: '/morris',
                    // templateUrl: 'partials/charts-morris.html',
                    // resolve: {
                    // deps: ['$ocLazyLoad',
                    // function($ocLazyLoad) {
                    // return $ocLazyLoad.load('ngMorris').then(
                    // function() {
                    // return $ocLazyLoad.load('js/controllers/morris.js');
                    // }
                    // );
                    // }
                    // ]
                    // }

                // })
                // .state('app.charts.chartjs', {
                // url: '/chartjs',
                // templateUrl: 'partials/charts-chartjs.html',
                // resolve: {
                // deps: ['$ocLazyLoad',
                // function($ocLazyLoad) {
                // return $ocLazyLoad.load('chart.js').then(
                // function() {
                // return $ocLazyLoad.load('js/controllers/chartjs.js');
                // }
                // );
                // }
                // ]
                // }
                // })
                // .state('app.charts.flot', {
                // url: '/flot',
                // templateUrl: 'partials/charts-flot.html',
                // resolve: {
                // deps: ['$ocLazyLoad',
                // function($ocLazyLoad) {
                // return $ocLazyLoad.load(['js/controllers/flot-chart.js']);
                // }
                // ]
                // }
                // })
                // .state('app.charts.sparkline', {
                // url: '/sparkline',
                // templateUrl: 'partials/charts-sparkline.html'

                // })
                .state('app.charts.sparkline', {
                        url: '/dashboard',
                        templateUrl: 'partials/app_dashboard.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load(['chart.js', 'ngMorris']).then(
                                        function() {
                                            return $ocLazyLoad.load([
                                                'js/controllers/chartjs.js',
                                                'js/controllers/flot-chart.js',
                                                'js/controllers/morris.js'
                                            ]);
                                        }
                                    );
                                }
                            ]
                        }
                    })
                    // .state('app.charts.easypiechart', {
                    // url: '/easypiechart',
                    // templateUrl: 'partials/charts-easypiechart.html'

                // })
                // .state('app.charts.rickshaw', {
                // url: '/rickshaw',
                // templateUrl: 'partials/charts-rickshaw.html',
                // resolve: {
                // deps: ['$ocLazyLoad',
                // function($ocLazyLoad) {
                // return $ocLazyLoad.load(['../bower_components/d3/d3.min.js', 'angular-rickshaw'], {
                // serie: true
                // }).then(
                // function() {
                // return $ocLazyLoad.load('js/controllers/rickshaw.js');
                // }
                // );
                // }
                // ]
                // }
                // })
                .state('app.tables.nggrid', {
                        url: '/nggrid',
                        templateUrl: 'partials/tables-nggrid.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('ngGrid').then(
                                        function() {
                                            return $ocLazyLoad.load('js/controllers/table-nggrid.js');
                                        }
                                    );
                                }
                            ]
                        }
                    })
                    .state('app.tables.uigrid', {
                        url: '/uigrid',
                        templateUrl: 'partials/tables-uigrid.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('ui.grid').then(
                                        function() {
                                            return $ocLazyLoad.load('js/controllers/table-uigrid.js');
                                        }
                                    );
                                }
                            ]
                        }
                    })
                    // .state('app.tables.editable', {
                    // url: '/editable',
                    // templateUrl: 'partials/tables-editable.html',
                    // controller: 'FormXeditableCtrl',
                    // resolve: {
                    // deps: ['$ocLazyLoad',
                    // function($ocLazyLoad) {
                    // return $ocLazyLoad.load('xeditable').then(
                    // function() {
                    // return $ocLazyLoad.load('js/controllers/form-xeditable.js');
                    // }
                    // );
                    // }
                    // ]
                    // }
                    // })
                    .state('app.layout', {
                        url: '/layout',
                        template: '<div ui-view class=""></div>'
                    })
                    .state('app.layout.default', {
                        url: '/default',
                        templateUrl: 'partials/layout-default.html'
                    })
                    .state('app.layout.collapsed', {
                        url: '/collapsed',
                        templateUrl: 'partials/layout-collapsed.html'
                    })
                    .state('app.layout.chat', {
                        url: '/chat',
                        templateUrl: 'partials/layout-chat.html'
                    })
                    .state('app.layout.boxed', {
                        url: '/boxed',
                        templateUrl: 'partials/layout-boxed.html'
                    })
                    .state('app.ui.vectormaps', {
                        url: '/vectormaps',
                        templateUrl: 'partials/ui-vectormaps.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('js/controllers/vectormap.js');
                                }
                            ]
                        }
                    })
                    .state('app.ui.googlemapfull', {
                        url: '/googlemapfull',
                        templateUrl: 'partials/ui-googlemapfull.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load([
                                        'js/map/load-google-maps.js',
                                        'js/map/ui-map.js',
                                        'js/map/map.js'
                                    ]).then(
                                        function() {
                                            return loadGoogleMaps();
                                        }
                                    );
                                }
                            ]
                        }

                    })
            }
        ]
    );