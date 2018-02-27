app.controller('ChatCtrl', ['$scope', '$http',function ($scope, $http) {
	var id=0;
	var d = new Date();
	$scope.messages=[
		{
			"id": 1,
			"avatar": "data/profile/avatar-1.png",
			"status": "available",
			"statusclass":"Available", 
			"temps": "Il y\'a "+ d.getMinutes() +" mn(s)",
			"message":"Wow! C\'est un joli thème!"
		}
	];
	
	$scope.repondant={
				"idrep": 2,
				"avatarrep": "data/profile/avatar-1.png",
				"statusrep": "available",
				"statusclassrep":"Available", 
				"tempsrep": "Maintenant",
				"messagerep":"Oui! c\'est un thème choisi par qualshore."
	};
    // $http.get('data/chat-users.json').then(function(response) {
      // $scope.users = response.data;
    // });
	// $scope.messages.push($scope.repondant);
	// $scope.$watch("repondant",function( newValue, oldValue ) { 
		// //console.log("newValue ",newValue);
		// //console.log("oldValue ",oldValue);
	// });
	
	id=$scope.messages[0].id;
	
	$scope.addComment = function (msn) {
		// //console.log("Iddd ",id);
		id++;
        // $scope.users.push($scope.msn);
		var message={
			"id": id,
			"avatar": "data/profile/avatar-1.png",
			"status": "available",
			"statusclass":"Available", 
			"temps":"Il y\'a "+d.getMinutes()+" mn(s)",
			"message":""+msn
		};
		if($scope.msn!=''){
			$scope.messages.push(message);
			$scope.msn='';
		}else{
			//console.log("Vouz n'\avez rien saisie ");
		}
    } 
  }]);
