/**
 * @author Mamadou FAYE <mamadou.faye@qualshore.com>
 * @name Statut-publication controller 
 * @description: In this file we are going to 
 * implement all functions and services publication between users by locality
 * @copyright 2017-2018 Qualshore. All rights reserved.
 * */
angular.module('app').service("StatutService", ['$q', '$timeout', function($q, $timeout) {

    var service = {},
        listener = $q.defer(),
        socket = {
            client: null,
            stomp: null
        },
        messageIds = [];

    //var baseUrlChat = 'http://192.168.1.80:8080';

    var idloc = sessionStorage.getItem("idloc");
    // console.log("idloc...." + idloc);
    service.RECONNECT_TIMEOUT = 30000;
    service.SOCKET_URL = baseUrlChat + "/stomp/publication";
    service.CHAT_TOPIC = "/topic/publication" + idloc;
    service.CHAT_BROKER = "/app/publication";

    /**
     * @function receive
     * @description This service allow to listen on the api websocket.
     * @return listener.promise;
     */
    service.receive = function() {
        return listener.promise;
    };

    /**
     * @function send
     * @description This service allow to send message in api websocket.
     * 
     */
    service.send = function(contenu, idUser) {
        //var id = Math.floor(Math.random() * 1000000);
        socket.stomp.send(service.CHAT_BROKER, {
            priority: 9
        }, JSON.stringify({
            contenu: contenu,
            user: idUser,
            //idMessage: idMessage,
            //dateMessage: dateMessage,

        }));
        // messageIds.push(idMessage);
    };
    /*service.send = function(contenuMessage, dateMessage, idMessage) {
        //var id = Math.floor(Math.random() * 1000000);
        socket.stomp.send(service.CHAT_BROKER, {
            priority: 9,
            custom: 42
        }, JSON.stringify({
            contenuMessage: contenuMessage,
            idMessage: idMessage,
            dateMessage: dateMessage
        }));
        messageIds.push(idMessage);
    };*/

    /**
     * @function reconnect
     * @description This service allow to reconnect user in session
     * and initializ the socket Listener every 30 second.
     * 
     */
    var reconnect = function() {
        $timeout(function() {
            initialize();
        }, this.RECONNECT_TIMEOUT);
    };

    /**
     * @function getMessage
     * @description This service allow to list all statuts
     * on format json.
     * @returns data:{}
     */
    var getMessage = function(data) {
        var message = JSON.parse(data),
            out = {};
        out.contenu = message.contenu;
        out.datePublication = message.datePublication;
        out.username = message.user.prenom;
        out.name = message.user.nom;
        out.institution = message.user.groupeIdGroupe.institution.nom;
        //out.prenom = message.user.prenom;

        if (_.contains(messageIds, message.idMessage)) {
            out.self = true;
            messageIds = _.remove(messageIds, message.idMessage);
        }
        //return out;
        return message;
        //}
    };

    var startListener = function() {
        socket.stomp.subscribe(service.CHAT_TOPIC, function(data) {
            listener.notify(getMessage(data.body));
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

angular.module('app').controller('statutController', ['$scope', '$rootScope', '$interval', '$log', '$state', '$sce', '$http', 'filterFilter', 'StatutService', 'notify',
    function($scope, $rootScope, $interval, $log, $state, $sce, $http, filterFilter, StatutService, notify) {

        var idADmin = sessionStorage.getItem("iduser");
        var idInstitution = sessionStorage.getItem("idInstitution");
        var idloc = sessionStorage.getItem("idloc");
        var idGrp = sessionStorage.getItem("idGrp");
        var jeton = localStorage.getItem("jeton");
        $scope.errorMessage = null;

        $scope.idLocality = idloc;

        $scope.statuts = [];
        $scope.message = "";
        $scope.max = 140;
        $scope.nbMessage = 0;

        /**
         * @function allStatuts
         * @description This function allow to list all statuts.
         */
        function allStatuts() {
            //$scope.loading = true;
            $http({
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
                url: baseUrl + 'publication/list/' + idADmin,
            }).then(function successCallback(response) {
                $scope.statuts = response.data.list_publication;
                $scope.nbMessage = response.data.list_publication.length;
            }).catch(function(err) {
                console.log(err);
            });
        };

        allStatuts();

        /**
         * @function addStatut
         * @description This function allow to add message
         * on the chat and clear the input text.
         */
        $scope.addStatut = function() {
            StatutService.send($scope.statut, parseInt(idADmin));
            $scope.statut = "";
        };

        /**
         * @function receive
         * @description This function allow to push all statuts
         * on the chat and increment the counter.
         * 
         */
        StatutService.receive().then(null, null, function(message) {
            $scope.statuts.push(message);
            $scope.nbMessage = $scope.nbMessage + 1;
        });

        $scope.closeAlertOLD = function(index) {
            $scope.statuts.splice(index, 1);
        };

        function showNotify() {
            notify("Vous ne pouvez pas supprimer cette publication.");
        };


        /**
         * @function closeAlert
         * @param idTauxJour in url
         * @description This function allow to delete publication
         */
        $scope.closeAlert = function(publication) {
            $http({
                    method: "DELETE",
                    url: baseUrl + 'publication/delete/' + parseInt(idADmin) + '/' + parseInt(publication.idPublication),
                    data: {},
                    headers: { 'Authorization': 'Bearer ' + jeton }
                })
                .then(function(data) {
                    //console.log(data);
                    if (data.data.status === 0) {
                        allStatuts();
                        $scope.nbMessage = $scope.nbMessage - 1;
                    } else {
                        showNotify();
                    }
                }).catch(function(err) {
                    console.log(err);
                });
        };

    }
]);