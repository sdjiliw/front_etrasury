/**
 * @author Mamadou FAYE <mamadou.faye@qualshore.com>
 * @name Chat controller 
 * @description: In this file we are going to 
 * implement all functions and services chat between users by locality
 * @copyright 2017-2018 Qualshore. All rights reserved.
 * */
angular.module('app').service("ChatService", ['$q', '$timeout', function($q, $timeout) {

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
    service.SOCKET_URL = baseUrlChat + "/stomp/chat";
    service.CHAT_TOPIC = "/topic/message" + idloc;
    service.CHAT_BROKER = "/app/chat";

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
    service.send = function(contenuMessage, idUser) {
        //var id = Math.floor(Math.random() * 1000000);
        socket.stomp.send(service.CHAT_BROKER, {
            priority: 9
        }, JSON.stringify({
            contenuMessage: contenuMessage,
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
     * @description This service allow to list all messages
     * on format json.
     * @returns data:{}
     */
    var getMessage = function(data) {
        var message = JSON.parse(data),
            out = {};
        //if (message.user.groupeIdGroupe.institution.localityIdLocalite.idLocalite === idloc) {
        //conso$.log("in the if");
        out.contenuMessage = message.contenuMessage;
        out.dateMessage = message.dateMessage;
        out.time = new Date(message.time);
        out.nom = message.user.nom;
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

angular.module('app').controller('chatController', ['$scope', '$rootScope', '$interval', '$log', '$state', '$sce', '$http', 'filterFilter', 'ChatService',
    function($scope, $rootScope, $interval, $log, $state, $sce, $http, filterFilter, ChatService) {

        var idADmin = sessionStorage.getItem("iduser");
        var idInstitution = sessionStorage.getItem("idInstitution");
        var idloc = sessionStorage.getItem("idloc");
        var idGrp = sessionStorage.getItem("idGrp");
        var jeton = localStorage.getItem("jeton");
        $scope.errorMessage = null;

        $scope.idLocality = idloc;
        //$scope.iframeHeight = 800;
        var heightTest = $('#heightTest');
        var tailleDiv = heightTest.height() + 50;
        //console.log("heightTest.height():::" + tailleDiv);
        $scope.iframeHeight = window.innerHeight - 250;
        // console.log("iframeHeight:::" + $scope.iframeHeight);
        //$scope.hauteurDiv = 100;
        //$scope.hauteurDiv = document.getElementById("hauteurDiv").offsetHeight;


        //var element = angular.element(document.querySelector('#typearea'));
        //$scope.heightDiv = element[0].offsetHeight;

        $scope.messages = [];
        $scope.message = "";
        $scope.max = 140;
        $scope.nbMessage = 0;

        /**
         * @function allMessages
         * @description This function allow to list all messages.
         */
        function allMessages() {
            //$scope.loading = true;
            $http({
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + jeton
                },
                url: baseUrl + 'message/tchat/' + idADmin,
            }).then(function successCallback(response) {
                $scope.messages = response.data.list_message_tchat;
                $scope.nbMessage = response.data.list_message_tchat.length;
            }).catch(function(err) {
                console.log(err);
            });
        };

        allMessages();

        /**
         * @function addMessage
         * @description This function allow to add message
         * on the chat and clear the input text.
         */
        $scope.addMessage = function() {
            ChatService.send($scope.message, parseInt(idADmin));
            $scope.message = "";
        };

        /**
         * @function receive
         * @description This function allow to push all messages
         * on the chat and increment the counter.
         * 
         */
        ChatService.receive().then(null, null, function(message) {
            //$scope.messages.push(message);
            /*for (var i = 0; i < $scope.messages.length; i++) {
                if ($scope.messages[i].user.groupeIdGroupe.institution.localityIdLocalite.idLocalite == idloc) {
                    console.log("in the if");
                    $scope.messages.push(message);
                }
            }*/
            $scope.messages.push(message);

            $scope.nbMessage = $scope.nbMessage + 1;
        });

    }
]);