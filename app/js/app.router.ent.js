'use strict';

/**
 * Config for the router
 */
angular.module('app')
    .config(
        ['$stateProvider', '$urlRouterProvider', 'JQ_CONFIG',
            function($stateProvider, $urlRouterProvider, JQ_CONFIG) {
// /app/blog/dashboard 
// /access/dashboard_enT_admin
                $urlRouterProvider
                    .otherwise('/access/login');
                $stateProvider

                    .state('app', {
                        abstract: true,
                        url: '/entreprise',
                        templateUrl: 'partials/app.html'
                    })
					//OPERATIONS OPERATIONS
                    .state('app.adminent_op_cr_spot', {
                        url: '/adminent_op_cr_spot',
                        templateUrl: 'partials/admin_entreprise/mes_operations/op_cr_spot.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/login.js',
                                        '../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    })
                    .state('app.adminent_op_ch', {
                        url: '/adminent_op_ch',
                        templateUrl: 'partials/admin_entreprise/mes_operations/op_ch.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/login.js',
                                        '../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    })
                    .state('app.adminent_op_tr', {
                        url: '/adminent_op_tr',
                        templateUrl: 'partials/admin_entreprise/mes_operations/op_tr.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/login.js',
                                        '../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    })
                    .state('app.adminent_op_dep', {
                        url: '/adminent_op_dep',
                        templateUrl: 'partials/admin_entreprise/mes_operations/op_dep.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/login.js',
                                        '../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    })  
					.state('app.adminent_op_esc', {
                        url: '/adminent_op_esc',
                        templateUrl: 'partials/admin_entreprise/mes_operations/op_esc.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/login.js',
                                        '../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    }) 
					//FIN OPERATIONS OPERATIONS
					//OPERATIONS ESPACE
                    .state('app.adminent_op_esp_mesdoc', {
                        url: '/adminent_op_esp_mesdoc',
                        templateUrl: 'partials/admin_entreprise/mes_operations/op_esp_mesdoc.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/login.js',
                                        '../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    }) 
					.state('app.adminent_op_esp_docr', {
                        url: '/adminent_op_esp_docr',
                        templateUrl: 'partials/admin_entreprise/mes_operations/op_esp_docr.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/login.js',
                                        '../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    }) 
					.state('app.adminent_op_esp_contacts', {
                        url: '/adminent_op_esp_contacts',
                        templateUrl: 'partials/admin_entreprise/mes_operations/op_esp_contacts.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/login.js',
                                        '../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    })  
					//FIN OPERATIONS ESPACE
					//OPERATIONS MARCHE
					.state('app.adminent_op_marche_tdj', {
                        url: '/adminent_op_marche_tdj',
                        templateUrl: 'partials/admin_entreprise/mes_operations/op_marche_tdj.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/login.js',
                                        '../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    })	
					.state('app.adminent_op_marche_cond', {
                        url: '/adminent_op_marche_cond',
                        templateUrl: 'partials/admin_entreprise/mes_operations/op_marche_cond.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/login.js',
                                        '../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    })	
					.state('app.adminent_op_admin_rh', {
                        url: '/adminent_op_admin_rh',
                        templateUrl: 'partials/admin_entreprise/mes_operations/op_admin_rh.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/login.js',
                                        '../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    })	
					.state('app.adminent_op_admin_v', {
                        url: '/adminent_op_admin_v',
                        templateUrl: 'partials/admin_entreprise/mes_operations/op_admin_v.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/login.js',
                                        '../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    })	
					//FIN OPERATIONS MARCHE
					//FIN OPERATIONS ADMINISTRATION
					//FIN OPERATIONS ADMINISTRATION
					//OPERATIONS REGISTER
					.state('app.adminent_register_op_cr_spot', {
                        url: '/adminent_register_op_cr_spot',
                        templateUrl: 'partials/admin_entreprise/mes_operations/register_op_cr_spot.html'
                    })  
					.state('app.adminent_register_op_ch', {
                        url: '/adminent_register_op_ch',
                        templateUrl: 'partials/admin_entreprise/mes_operations/register_op_ch.html'
                    })
					.state('app.adminent_register_op_tr', {
                        url: '/adminent_register_op_tr',
                        templateUrl: 'partials/admin_entreprise/mes_operations/register_op_tr.html'
                    })
					.state('app.adminent_register_op_dep', {
                        url: '/adminent_register_op_dep',
                        templateUrl: 'partials/admin_entreprise/mes_operations/register_op_dep.html'
                    })
					.state('app.adminent_op_esp_mesdocc', {
                        url: '/adminent_op_esp_mesdocc',
                        templateUrl: 'partials/admin_entreprise/mes_operations/register_op_esp_mesdocc.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/login.js',
                                        '../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    }) 
					.state('app.adminent_op_esp_mesdocd', {
                        url: '/adminent_op_esp_mesdocd',
                        templateUrl: 'partials/admin_entreprise/mes_operations/register_op_esp_mesdocd.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/login.js',
                                        '../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    }) 
					.state('app.adminent_op_esp_mesdoca', {
                        url: '/adminent_op_esp_mesdoca',
                        templateUrl: 'partials/admin_entreprise/mes_operations/register_op_esp_mesdoca.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/login.js',
                                        '../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    }) 
					.state('app.adminent_op_adm_rhg', {
                        url: '/adminent_op_adm_rhg',
                        templateUrl: 'partials/admin_entreprise/mes_operations/register_op_adm_rhg.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/login.js',
                                        '../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    }) 
					.state('app.adminent_op_adm_rhu', {
                        url: '/adminent_op_adm_rhu',
                        templateUrl: 'partials/admin_entreprise/mes_operations/register_op_adm_rhu.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/login.js',
                                        '../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    }) 
					.state('app.adminent_op_adm_vnb', {
                        url: '/adminent_op_adm_vnb',
                        templateUrl: 'partials/admin_entreprise/mes_operations/register_op_adm_vnb.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/login.js',
                                        '../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    }) 
					.state('app.adminent_op_adm_vch', {
                        url: '/adminent_op_adm_vch',
                        templateUrl: 'partials/admin_entreprise/mes_operations/register_op_adm_vch.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/login.js',
                                        '../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    }) 
					.state('app.adminent_op_adm_vnv', {
                        url: '/adminent_op_adm_vnv',
                        templateUrl: 'partials/admin_entreprise/mes_operations/register_op_adm_vnv.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/login.js',
                                        '../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    }) 
					.state('app.adminent_op_adm_vrc', {
                        url: '/adminent_op_adm_vrc',
                        templateUrl: 'partials/admin_entreprise/mes_operations/register_op_adm_vrc.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/login.js',
                                        '../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    }) 
					//FIN OPERATIONS REGISTER
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
                                        '../bower_components/font-awesome/css/font-awesome.css']);
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
                                        '../bower_components/font-awesome/css/font-awesome.css']);
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
//***************************CONTROLE ACCESS********************************************************************
//*************************************************************************************************************
//*********************************************************************************************************
                    .state('access', {
                        url: '/access',
                        template: '<div ui-view class=""></div>'
                    })
					//***************DASHBOARD ADMIN ENTREPRISE***************
					//********************************************************
					.state('access.dashboard_enT_admin', {
                        url: '/dashboard_enT_admin',
                        templateUrl: 'partials/admin_entreprise/dashboard.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/login.js',
                                        '../bower_components/font-awesome/css/font-awesome.css']);
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
                                        '../bower_components/font-awesome/css/font-awesome.css']);
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
                                        '../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    })
					.state('access.forgotpwd', {
                        url: '/forgotpwd',
                        templateUrl: 'partials/ui-forgotpwd.html',
						resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/login.js',
                                        '../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    })
					//***************FIN DASHBOARD ADMIN ENTREPRISE***************
					//********************************************************
//***************************FIN CONTROLE ACCESS********************************************************************
//*************************************************************************************************************
//*********************************************************************************************************

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
                    .state('app.blo-report-site', {
                        url: '/blog/report-site',
                        templateUrl: 'partials/blo-report-site.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('chart.js').then(
                                        function() {
                                            return $ocLazyLoad.load('js/controllers/blo-report-site.js');
                                        }
                                    );
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

                
            }
        ]
    );
