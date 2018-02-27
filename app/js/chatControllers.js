angular.module('app').controller('chatController', ['$scope', '$rootScope', '$interval', '$log', '$state', '$sce', '$http', 'filterFilter', 'ChatService',
    function($scope, $rootScope, $interval, $log, $state, $sce, $http, filterFilter, ChatService) {

        var idADmin = sessionStorage.getItem("iduser");
        var idInstitution = sessionStorage.getItem("idInstitution");
        var idloc = sessionStorage.getItem("idloc");
        var idGrp = sessionStorage.getItem("idGrp");
        var jeton = sessionStorage.getItem("jeton");
        $scope.isuserInsessionLine = 0;
        $scope.errorMessage = null;
        $scope.audjourdhui = new Date();

        $scope.messages = [];
        $scope.message = "";
        $scope.max = 140;

        $scope.addMessage = function() {
            ChatService.send($scope.message);
            $scope.message = "";
        };

        ChatService.receive().then(null, null, function(message) {
            $scope.messages.push(message);
        });
    }
]);
angular.module('app').service("ChatService", function($q, $timeout) {

    var service = {},
        listener = $q.defer(),
        socket = {
            client: null,
            stomp: null
        },
        messageIds = [];

    service.RECONNECT_TIMEOUT = 30000;
    service.SOCKET_URL = "http://192.168.1.24:8080/chat";
    service.CHAT_TOPIC = "/topic/message";
    service.CHAT_BROKER = "/app/chat";

    service.receive = function() {
        return listener.promise;
    };

    service.send = function(contenuMessage, dateMessage, idMessage) {
        //var id = Math.floor(Math.random() * 1000000);
        socket.stomp.send(service.CHAT_BROKER, {
            priority: 9
        }, JSON.stringify({
            contenuMessage: contenuMessage,
            idMessage: idMessage,
            dateMessage: dateMessage
        }));
        messageIds.push(idMessage);
    };

    var reconnect = function() {
        $timeout(function() {
            initialize();
        }, this.RECONNECT_TIMEOUT);
    };

    var getMessage = function(data) {
        var message = JSON.parse(data),
            out = {};
        out.contenuMessage = message.contenuMessage;
        out.dateMessage = message.dateMessage;
        out.time = new Date(message.time);
        if (_.contains(messageIds, message.idMessage)) {
            out.self = true;
            messageIds = _.remove(messageIds, message.idMessage);
        }
        return out;
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
});