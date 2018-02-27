app.controller('FormXeditableCtrl', ['$scope', '$filter', '$http', 'editableOptions', 'editableThemes', 
  function($scope, $filter, $http, editableOptions, editableThemes){
    editableThemes.bs3.inputClass = 'input-sm';
    editableThemes.bs3.buttonsClass = 'btn-sm';
    editableOptions.theme = 'bs3';

    $scope.html5 = {
      email: 'contact@qualshore.com',
      tel: '123-45-67',
      number: 29,
      range: 10,
      url: 'https://qualshore.com',
      search: 'blabla',
      color: '#6a4415',
      date: null,
      time: '12:30',
      datetime: null,
      month: null,
      week: null
    };

    $scope.user = {
      nom: 'Mbacke',
      desc: 'Mbacke user \ndescription!',
      tel1: 2,
      agenda: 1,
      remember: false
    }; 

    $scope.statuses = [
      {value: 1, text: 'status1'},
      {value: 2, text: 'status2'},
      {value: 3, text: 'status3'},
	  {value: 4, text: 'status4'}
    ];

    $scope.agenda = [
      {value: 1, text: 'Homme'},
      {value: 2, text: 'Femme'}
    ];

    $scope.showStatus = function() {
      var selected = $filter('filter')($scope.statuses, {value: $scope.user.tel1});
      return ($scope.user.tel1 && selected.length) ? selected[0].text : 'Non définie';
    };

    $scope.showAgenda = function() {
      var selected = $filter('filter')($scope.agenda, {value: $scope.user.agenda});
      return ($scope.user.agenda && selected.length) ? selected[0].text : 'Non définie';
    };

    // editable table
    $scope.users = [
      {id: 1, prenom: 'Mbacke', nom: 'MBACKE', email: 'mbacke@gmail.com', tel1: 1, tel2:'',gutilisateur:1,entreprise:'etreasury'},
      {id: 2, prenom: 'Usercie_ci', nom: 'CI', email: 'usercie@gmail.com', tel1: 2, tel2:'',gutilisateur:2,entreprise:'CIE_civ'},
      {id: 3, prenom: 'Bobote', nom: 'BOBOTE', email: 'bobote@gmail.com', tel1: 3, tel2:'',gutilisateur:3,entreprise:'CIE'},
	  {id: 4, prenom: 'Chris', nom: 'CHRIS', email: 'chris@gmail.com', tel1: 4, tel2:'',gutilisateur:4,entreprise:'CIE_ci'}
    ];

    $scope.groups = [];
    $scope.loadGroups = function() {
      return $scope.groups.length ? null : $http.get('data/groups').then(function(response) {
        $scope.groups = response.data;
      });
    };

    $scope.showGroup = function(user) {
      if(user.gutilisateur && $scope.groups.length) {
        var selected = $filter('filter')($scope.groups, {id: user.gutilisateur});
        return selected.length ? selected[0].text : 'Non définie';
      } else {
        return user.entreprise || 'Non définie';
      }
    };

    $scope.showStatus = function(user) {
      var selected = [];
      if(user && user.tel1) {
        selected = $filter('filter')($scope.statuses, {value: user.tel1});
      }
      return selected.length ? selected[0].text : 'Non définie';
    };

    $scope.checkName = function(data, id) {
      // if (id === 2 && data !== 'Mbacke') {
        // return "Username 2 doit être `Mbacke`";
      // }
	  //console.log("Vérification user");
    };

    $scope.saveUser = function(data, id) {
      //$scope.user not updated yet
      angular.extend(data, {id: id});
      // return $http.post('data/saveUser', data);
    };

    // remove user
    $scope.removeUser = function(index) {
      $scope.users.splice(index, 1);
    };

    // add user
    $scope.addUser = function() {
      $scope.inserted = {
        id: $scope.users.length+1,
		prenom:'',
        nom: '',
		mail:'',
        tel1: 0,
		tel2: null,
        gutilisateur: null,
		entreprise:''
      };
      $scope.users.push($scope.inserted);
    };

}]);
