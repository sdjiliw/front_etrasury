//$.getScript("appli.js");
$.getScript("app.url.js");
'use strict';

// Declare app level module which depends on views, and components
angular.module('app', [
        'ngAnimate',
        //    'ngCookies',
        //    'ngResource',
        'ngSanitize',
        'ngTouch',
        //    'ngStorage',
        'ui.router',
        'ui.bootstrap',
        'ui.utils',
        'ui.load',
        'ui.jq',
        'oc.lazyLoad',
        'perfect_scrollbar',
        'angular-inview',
        'angular-loading-bar',
        'pdfjsViewer',
        'cgNotify',
        'infinite-scroll'
    ])
    .factory('beforeUnload', function($rootScope, $window) {
        // Events are broadcast outside the Scope Lifecycle

        $window.onbeforeunload = function(e) {
            var confirmation = {};
            var event = $rootScope.$broadcast('onBeforeUnload', confirmation);
            if (event.defaultPrevented) {
                return confirmation.message;
            }
        };

        $window.onunload = function() {
            $rootScope.$broadcast('onUnload');
        };
        return {};
    })
    .run(function($window, $rootScope, beforeUnload) {
        $rootScope.online = navigator.onLine;
        $window.addEventListener("offline", function() {
            $rootScope.$apply(function() {
                $rootScope.online = false;
                //$('#myModal').modal('show');
            });
        }, false);
        $window.addEventListener("online", function() {
            $rootScope.$apply(function() {
                $rootScope.online = true;
                //$('#myModal').modal('hide');
            });
        }, false);
    })
    // .factory('errorInterceptor', function ($q) {
    // var canceller = $q.defer();
    // var interceptor = {

// request: function(config) {
// config.timeout = canceller.promise;
// return config;
// },

// responseError: function(response) {

// if(response.status === 500) {
// canceller.resolve('server error');
// }

// return $q.reject(response);
// }
// }

// return interceptor;
// })
.factory('deconnectApi', function($http, $q, $location, $state, $timeout) {
    var BASE_URL = baseUrl + 'login/logout';
    var id = 0;

    function preventBack() {
        window.history.forward();
        history.pushState(null, null, document.URL);
        window.addEventListener('popstate', function() {
            history.pushState(null, null, document.URL);
        });
    };

    function clearAllStorage() {
        localStorage.setItem('login', '');
        localStorage.setItem('nav', '');
        localStorage.setItem('profile', '');
        localStorage.setItem('username', '');
        localStorage.setItem('username_2', '');
        localStorage.setItem('email', '');
        localStorage.setItem('tel1', '');
        localStorage.setItem('pagetitle', '');
        localStorage.setItem('jeton', '');
        localStorage.setItem('url', '');
        localStorage.setItem('success', 0);
        localStorage.setItem('pagetitle', '');
        sessionStorage.setItem("iduser", '');
        sessionStorage.setItem("ND_qs", '');
        sessionStorage.setItem("idInstitution", '');
        sessionStorage.setItem("idGrp", '');
        sessionStorage.setItem("idloc", '');
        sessionStorage.setItem("nomInstitution", '');
        // remove items
        localStorage.removeItem('login');
        localStorage.removeItem('nav');
        localStorage.removeItem('profile');
        localStorage.removeItem('username');
        localStorage.removeItem('username_2');
        localStorage.removeItem('email');
        localStorage.removeItem('tel1');
        localStorage.removeItem('pagetitle');
        localStorage.removeItem('jeton');
        localStorage.removeItem('url');
        localStorage.removeItem('success');
        localStorage.removeItem('pagetitle');
        sessionStorage.removeItem("iduser");
        sessionStorage.removeItem("ND_qs");
        sessionStorage.removeItem("idInstitution");
        sessionStorage.removeItem("idGrp");
        sessionStorage.removeItem("idloc");
        sessionStorage.removeItem("nomInstitution");

    };
    return {
        logout: function(id) {
            var defer = $q.defer();
            var obj = {
                "idUser": parseInt(id)
            };

            if (id != null && id != undefined && id != '') {
                $http({
                    method: "POST",
                    url: BASE_URL,
                    data: obj
                }).then(function(response) {
                    // console.log("Good bye success ",response);
                    clearAllStorage();
                    $location.url('/access/login');
                    $state.go('access.login');
                    preventBack();
                    defer.resolve(response.data);
                    $timeout(function() {
                        window.location.reload();
                    }, 2000);
                }).catch(function(reason) {
                    clearAllStorage();
                    $location.url('/access/login');
                    $state.go('access.login');
                    preventBack();
                    defer.resolve(reason);
                    $timeout(function() {
                        window.location.reload();
                    }, 2000);
                });
            };

            return defer.promise;
        }
    }
});
// .factory('SecurityHttpInterceptor', function($q) {
// return function (promise) {
// return promise.then(function (response) {
// return response;
// },
// function (response) {
// if (response.status === 500) {
// }
// return $q.reject(response);
// });
// };
// })
// .config(['$httpProvider', function($httpProvider) {
// $httpProvider.interceptors.push('errorInterceptor');  
// console.log("Intercept ",$httpProvider.interceptors);
// $httpProvider.defaults.headers.common = {};
// $httpProvider.defaults.headers.post = {};
// $httpProvider.defaults.headers.put = {};
// $httpProvider.defaults.headers.patch = {};
// $httpProvider.defaults.useXDomain = true;
// delete $httpProvider.defaults.headers.common['X-Requested-With'];
// }
// ]);

/**********IEEEEEEE*************/
// angular.element(document).ready(function () {  
// angular.bootstrap(document, ['app']);
// });
/**********IEEEEEEE*************/

// .run(['$route', function($route)  {
// $route.reload();
// }]);
// 'pdfjsViewer' 'pdf-viewer' 'luegg.directives'
// .run(function($rootScope, $templateCache) {
// $rootScope.$on('$viewContentLoaded', function() {
// $templateCache.removeAll();
// });
// $templateCache.removeAll();
// });