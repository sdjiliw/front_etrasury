'use strict';

/* Controllers */
  // signin controller
app.controller('LogoutFormController', ['$scope', '$http', '$location', '$state', function($scope, $http, $location, $state) {
	function preventBack(){
		window.history.forward();
		history.pushState(null, null, document.URL);
			window.addEventListener('popstate', function () {
			history.pushState(null, null, document.URL);
		});
	};
	
		$rootScope.$on('logout', function() {
			$location.path('/');
			preventBack();
		});
  }])
;