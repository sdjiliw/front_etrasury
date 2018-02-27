'use strict';

/* Controllers */
  // signin controller
app.controller('LoginFormController', ['$scope', '$http', '$location', '$state', function($scope, $http, $location, $state) {
    $scope.user = {};
	$scope.localite='';
    $scope.authError = null;
	$scope.id=0;
	
}]);
