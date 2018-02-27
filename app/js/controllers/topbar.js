/**
 * @author Mamadou FAYE <mamadou.faye@qualshore.com>
 * @name topbar.js 
 * @description: In this file we are going to 
 * implement all functions the notifications
 * @copyright 2017-2018 Qualshore. All rights reserved.
 * */


//$.getScript("appli.js");
$.getScript("app.url.js");
app.controller('MessagesDropDownCtrl', ['$scope', '$http', 'deconnectApi', 'notify',
    function($scope, $http, deconnectApi, notify) {
        $http.get('data/messages.json').then(function(response) {
            $scope.messages = response.data;
        });
    }
]);

angular.module('app').service("NotificationsServiceGrp", ['$q', '$timeout', function($q, $timeout) {

    var idADmin = sessionStorage.getItem("iduser");
    var idInstitution = sessionStorage.getItem("idInstitution");
    var idloc = sessionStorage.getItem("idloc");
    var idGrp = sessionStorage.getItem("idGrp");

    var service = {},
        listener = $q.defer(),
        socket = {
            client: null,
            stomp: null
        },
        logIds = [];
    service.RECONNECT_TIMEOUT = 30000;
    service.SOCKET_URL = baseUrlChat + "/stomp/notify";
    service.CHAT_TOPIC = "/topic/notify" + idGrp;
    service.CHAT_BROKER = "/app/notify";

    service.receive = function() {
        return listener.promise;
    };

    service.send = function(idNotificationsGroup) {
        socket.stomp.send(service.CHAT_BROKER, {
            priority: 9
        }, JSON.stringify({
            //description: description,
            idNotificationsGroup: idNotificationsGroup,
            //dateMessage: dateMessage
        }));
        logIds.push(idNotificationsGroup);
    };

    var reconnect = function() {
        $timeout(function() {
            initialize();
        }, this.RECONNECT_TIMEOUT);
    };

    var getLog = function(data) {
        var not = JSON.parse(data),
            out = {};
        out.idNotificationsGroup = not.idNotificationsGroup;
        out.description = not.description;
        out.dateNotification = not.dateNotification;
        //out.time = new Date(log.time);
        if (_.contains(logIds, not.idNotificationsGroup)) {
            out.self = true;
            logIds = _.remove(logIds, not.idNotificationsGroup);
        }
        return out;
    };


    var startListener = function() {
        socket.stomp.subscribe(service.CHAT_TOPIC, function(data) {
            listener.notify(getLog(data.body));
        });
    };



    var initialize = function() {
        socket.client = new SockJS(service.SOCKET_URL);
        socket.stomp = Stomp.over(socket.client);
        socket.stomp.connect({}, startListener);
        socket.stomp.onclose = reconnect;
    };

    initialize();
    return service;

}]);
angular.module('app').service("NotificationsServiceUser", ['$q', '$timeout', function($q, $timeout) {

    var idADmin = sessionStorage.getItem("iduser");
    var idInstitution = sessionStorage.getItem("idInstitution");
    var idloc = sessionStorage.getItem("idloc");
    var idGrp = sessionStorage.getItem("idGrp");

    var service = {},
        listener = $q.defer(),
        socket = {
            client: null,
            stomp: null
        },
        logIds = [];
    service.RECONNECT_TIMEOUT = 30000;
    service.SOCKET_URL = baseUrlChat + "/stomp/notify";
    service.CHAT_TOPIC = "/topic/notify/user" + idADmin;
    service.CHAT_BROKER = "/app/notify";

    service.receive = function() {
        return listener.promise;
    };

    service.send = function(idNotificationsGroup) {
        socket.stomp.send(service.CHAT_BROKER, {
            priority: 9
        }, JSON.stringify({
            //description: description,
            idNotificationsGroup: idNotificationsGroup,
            //dateMessage: dateMessage
        }));
        logIds.push(idNotificationsGroup);
    };

    var reconnect = function() {
        $timeout(function() {
            initialize();
        }, this.RECONNECT_TIMEOUT);
    };

    var getLog = function(data) {
        var not = JSON.parse(data),
            out = {};
        out.idNotificationsGroup = not.idNotificationsGroup;
        out.description = not.description;
        out.dateNotification = not.dateNotification;
        //out.time = new Date(log.time);
        if (_.contains(logIds, not.idNotificationsGroup)) {
            out.self = true;
            logIds = _.remove(logIds, not.idNotificationsGroup);
        }
        return out;
    };

    var startListener = function() {
        socket.stomp.subscribe(service.CHAT_TOPIC, function(data) {
            listener.notify(getLog(data.body));
        });
    };



    var initialize = function() {
        socket.client = new SockJS(service.SOCKET_URL);
        socket.stomp = Stomp.over(socket.client);
        socket.stomp.connect({}, startListener);
        socket.stomp.onclose = reconnect;
    };

    initialize();
    return service;

}]);


app.controller('NotificationsDropDownCtrl', ['$scope', '$rootScope', '$uibModal', '$interval', '$log', '$state', '$sce', '$http', 'NotificationsServiceGrp', 'NotificationsServiceUser', 'notify',
    function($scope, $rootScope, $modal, $interval, $log, $state, $sce, $http, NotificationsServiceGrp, NotificationsServiceUser, notify) {

        var idADmin = sessionStorage.getItem("iduser");
        var idInstitution = sessionStorage.getItem("idInstitution");
        var idloc = sessionStorage.getItem("idloc");
        var idGrp = sessionStorage.getItem("idGrp");
        var jeton = localStorage.getItem("jeton");
        $scope.errorMessage = null;
        $scope.idLocality = idloc;

        var initNotif = 0;
        var compteur = 0;
        //var notify = null;
        $scope.nbNotifs = 0;
        //$scope.notifUsers = [];

        $scope.logs = [];
        $scope.log = "";
        $scope.max = 140;

        function showNotify() {
            notify('Vous avez reçu une nouvelle notification');
        };

        $scope.addLog = function() {
            NotificationsServiceGrp.send($scope.log);
            $scope.log = "";
        };


        /**
         * @function notificationsList
         * @description This function allow to list all notification.
         * @returns $scope.notifUsers:[]
         */
        function notificationsList() {
            $http({
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
                url: baseUrl + 'notifications_user/notifications/' + idADmin
            }).then(function successCallback(response) {
                $scope.notifUsers = response.data.notifications_list;
                $scope.nbNotifs = response.data.notifications_list.length;
                // console.log(response);
                /** if ($scope.notifUsers != undefined) {
                     compteur++;
                     if (compteur === 1) {
                         initNotif = response.data.notifications_list.length;
                     };
                     $scope.etatNotif = response.data.notifications_list.length;
                     $scope.nbNotifs = $scope.notifUsers.length;
                 }*/
            }).catch(function(err) {
                console.log("err --> " + err);
            });
        };

        notificationsList();

        NotificationsServiceGrp.receive().then(null, null, function(log) {
            if ($scope.notifUsers != undefined) {
                $scope.notifUsers.push(log);
                compteur++;
                if (compteur === 1) {
                    initNotif = $scope.notifUsers.length;
                };
                $scope.etatNotif = $scope.notifUsers.length;
                $scope.nbNotifs = $scope.notifUsers.length;
            }
        });

        NotificationsServiceUser.receive().then(null, null, function(log) {
            if ($scope.notifUsers != undefined) {
                $scope.notifUsers.push(log);
                compteur++;
                if (compteur === 1) {
                    initNotif = $scope.notifUsers.length;
                };
                $scope.etatNotif = $scope.notifUsers.length;
                $scope.nbNotifs = $scope.notifUsers.length;
            }
        });

        $scope.$watch("etatNotif", function(bool1, bool2) {
            if (bool1 > initNotif && bool1 != undefined) {
                //$scope.notificationPopup();
                showNotify();
                $scope.nbNotifs = bool1;
                compteur = 0;
            };
        });

        $scope.supp = function() {
                $scope.nbNotifs = $scope.nbNotifs - 1;
                return $scope.numberNotif;
            }
            //notificationsList();
            /**
             * @function supprimerNotification
             * @description This function allow delete notification .
             */
        $scope.supprimerNotification = function(idNotification) {
            //showNotify();
            $http({
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
                url: baseUrl + 'notifications_user/delete/' + idNotification + '/' + idADmin
            }).then(_successSup).catch(function(err) {
                console.log(err);
            });
        };

        function _successSup(response) {
            console.log(response);
            $scope.nbNotifs = $scope.nbNotifs - 1;
            notificationsList();
            //console.log("suppression ok !!!");
        };

        function _errorSup(response) {
            //console.log(response);
        };
        $scope.notificationPopup = function() {
            var modalInstance = $modal.open({
                templateUrl: 'partials/admin_banque/notification.html',
                controller: 'notifControllerTopBar',
                resolve: {
                    selectedRow: function() {
                        return $scope.demand;
                    }
                }
            });

        };

        /**  NotificationsServiceUser.receive().then(null, null, function(log) {
              $scope.notifUsers.push(log);
              //console.log($scope.logs);
          });

        NotificationsServiceGrp.receive().then(null, null, function(log) {
            $scope.notifUsers.push(log);
            //console.log($scope.logs);
        });**/

    }
]);


angular.module('app').controller('notifControllerTopBar', ['$scope', '$rootScope', '$uibModalInstance', '$filter', '$interval', '$log', '$state', '$http', 'selectedRow', 'notify',
    function($scope, $rootScope, $modalInstance, $filter, $interval, $log, $state, $http, selectedRow, notify) {

        $scope.ok = function() {
            $modalInstance.close();
        };
        $scope.reloading = function() {
            window.location.reload();
            $modalInstance.close();
        }
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    }
]);