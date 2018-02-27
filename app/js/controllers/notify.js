'use strict';
/**
 * @author Mamadou FAYE <mamadou.faye@qualshore.com>
 * @name Wall controller 
 * @description: In this file we are going to 
 * implement all functions and services wall by locality
 * @copyright 2017-2018 Qualshore. All rights reserved.
 * */

//$.getScript("appli.js");
$.getScript("app.url.js");

app.controller('NotifyCtrl', function($scope, notify) {

    $scope.msg = 'Hello! This is a sample message!';
    $scope.template = '';

    $scope.positions = ['center', 'left', 'right'];
    $scope.position = $scope.positions[0];

    $scope.duration = 10000;

    $scope.demo = function() {
        notify({
            message: $scope.msg,
            classes: $scope.classes,
            templateUrl: $scope.template,
            position: $scope.position,
            duration: $scope.duration
        });
    };

    $scope.closeAll = function() {
        notify.closeAll();
    };

    $scope.demoMessageTemplate = function() {

        var messageTemplate = '<span>This is an example using a dynamically rendered Angular template for the message text. ' +
            'I can have <a href="" ng-click="clickedLink()">hyperlinks</a> with ng-click or any valid Angular enhanced html.</span>';

        notify({
            messageTemplate: messageTemplate,
            classes: $scope.classes,
            scope: $scope,
            templateUrl: $scope.template,
            position: $scope.position,
        });

    };

    $scope.clickedLink = function() {
        notify('You clicked a link!');
    };
});

angular.module('app').service("WallService", ['$q', '$timeout', function($q, $timeout) {

    var service = {},
        listener = $q.defer(),
        socket = {
            client: null,
            stomp: null
        },
        messageIds = [];

    //var baseUrlChat = 'http://192.168.1.80:8080';

    var idloc = sessionStorage.getItem("idloc");

    var service = {},
        listener = $q.defer(),
        socket = {
            client: null,
            stomp: null
        },
        logIds = [];

    var idloc = sessionStorage.getItem("idloc");

    service.RECONNECT_TIMEOUT = 30000;
    service.SOCKET_URL = baseUrlChat + "/stomp/wall";
    service.CHAT_TOPIC = "/topic/wall" + idloc;
    service.CHAT_BROKER = "/app/wall";

    service.receive = function() {
        return listener.promise;
    };

    service.send = function(date, idlog) {
        socket.stomp.send(service.CHAT_BROKER, {
            priority: 9
        }, JSON.stringify({
            //description: description,
            idlog: idlog,
            //dateMessage: dateMessage
        }));
        logIds.push(idlog);
    };

    var reconnect = function() {
        $timeout(function() {
            initialize();
        }, this.RECONNECT_TIMEOUT);
    };

    var getLog = function(data) {
        var log = JSON.parse(data),
            out = {};
        out.actionIdAction = log.actionIdAction;
        out.date = log.date;
        out.nom = log.user.nom;
        out.prenom = log.user.prenom;
        out.description = log.description;
        out.nomAction = log.actionIdAction.nom;
        out.time = new Date(log.time);
        if (_.contains(logIds, log.idLog)) {
            out.self = true;
            logIds = _.remove(logIds, log.idLog);
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

app.controller('WallCtrl', ['$scope', '$rootScope', '$interval', '$log', '$state', '$sce', '$http', 'WallService',
    function($scope, $rootScope, $interval, $log, $state, $sce, $http, WallService) {

        var idADmin = sessionStorage.getItem("iduser");
        var idInstitution = sessionStorage.getItem("idInstitution");
        var idloc = sessionStorage.getItem("idloc");
        var idGrp = sessionStorage.getItem("idGrp");
        var jeton = localStorage.getItem("jeton");
        $scope.errorMessage = null;
        $scope.idLocality = idloc;

        // $scope.screenHeight = window.innerHeight ;
        $scope.screenHeight = 500;

        $scope.logs = [];
        $scope.log = "";
        $scope.max = 140;

        $scope.addLog = function() {
            WallService.send($scope.log);
            $scope.log = "";
        };

        $scope.tabActionClass = [];

        /**
         * @function buildActionTbale
         * @description This function build action table .
         */
        function buildActionTbale() {
            $scope.tabActionClass['taux'] = 'accent';
            $scope.tabActionClass['offre'] = 'success';
            $scope.tabActionClass['demande'] = 'info';
            $scope.tabActionClass['condition'] = 'warning';
        }

        buildActionTbale();

        $scope.sendClass = function(description) {
            if (description.indexOf('taux') !== -1) {
                return $scope.tabActionClass['taux'];
            }

            if (description.indexOf('offre') !== -1) {
                return $scope.tabActionClass['offre'];
            }

            if (description.indexOf('demande') !== -1) {
                return $scope.tabActionClass['demande'];
            }

            if (description.indexOf('condition') !== -1) {
                return $scope.tabActionClass['condition'];
            }
        }

        // $scope.notifications = [];
        var nbNotification;

        function allNotifications() {
            //$scope.loading = true;
            $http({
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
                url: baseUrl + 'log/notifications/' + idADmin,
            }).then(function successCallback(response) {
                // $scope.loading = false;
                $scope.logs = response.data.log_list_user;
                $scope.totalItems = response.data.log_list_user.length;
                setPagingData(1);
                //console.log($scope.logs);
            }).catch(function(err) {
                console.log(err);
            });
        };

        allNotifications();

        /*$scope.filteredTodos = [], $scope.currentPage = 1, $scope.numPerPage = 10, $scope.maxSize = 5;

        $scope.numPages = function() {
            return Math.ceil($scope.logs.length / $scope.numPerPage);
        };

        $scope.$watch('currentPage + numPerPage', function() {
            var begin = (($scope.currentPage - 1) * $scope.numPerPage),
                end = begin + $scope.numPerPage;
            $scope.filteredTodos = $scope.logs.slice(begin, end);
        });*/

        var allCandidates = ["name1", "name2", "name3", "name4", "name5",
            "name6", "name7", "name8", "name9", "name10",
            "name11", "name12", "name13", "name14", "name15",
            "name16", "name17", "name18", "name19", "name20"
        ];

        //$scope.totalItems = nbNotification;
        $scope.currentPage = 1;

        $scope.itemsPerPage = 12;

        $scope.$watch("currentPage", function() {
            setPagingData($scope.currentPage);
        });

        function setPagingData(page) {
            var pagedData = $scope.logs.slice(
                (page - 1) * $scope.itemsPerPage,
                page * $scope.itemsPerPage
            );
            $scope.aCandidates = pagedData;
        }

        WallService.receive().then(null, null, function(log) {
            $scope.logs.push(log);
            //console.log($scope.logs);
        });

        $scope.alerts = [
            { type: 'success', msg: 'Well done! You successfully read this important alert message.' },
            { type: 'info', msg: 'Heads up! This alert needs your attention, but it is ok.' },
            { type: 'warning', msg: 'Warning! Best check yo self, you are not looking too good...' },
        ];

        $scope.addAlert = function() {
            $scope.alerts.push({ type: 'primary', msg: 'Oh snap! Change a few things up and try submitting again.' });
        };

        $scope.closeAlert = function(index) {
            $scope.logs.splice(index, 1);
        };

    }
]);