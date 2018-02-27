angular.module('app')
.controller('myCtrl', ['$scope',
  function($scope) {
    $scope.wasClicked = function() {
      // //console.log('I was clicked!');
    }
  }
]);

angular.module('app')
.directive('onLoadClicker', ['$timeout', '$rootScope',
  function($timeout,$rootScope) {
    return {
      restrict: 'AC',
      priority: -1,
      link: function($scope, iElm, iAttrs, controller) {
		if(document.getElementById('selection')!=null){
			document.getElementById('selection').addEventListener('change', function() {
				var index = document.getElementById('selection').selectedIndex;
				$rootScope.$broadcast('selectindex', {index : index});
			});
		};
		
		if(document.getElementById('selectLocalite')!=null){
			document.getElementById('selectLocalite').addEventListener('change', function() {
				var index = document.getElementById('selectLocalite').selectedIndex;
				$rootScope.$broadcast('selectindexl', {index : index});
			});
		};

        if(document.getElementById('selection_profile')!=null){
            document.getElementById('selection_profile').addEventListener('change', function() {
                var index = document.getElementById('selection_profile').selectedIndex;
                $rootScope.$broadcast('selectindex_profil', {index : index});
            });
        };
		
		if(document.getElementById('selectCategorie')!=null){
			document.getElementById('selectCategorie').addEventListener('change', function() {
				var index = document.getElementById('selectCategorie').selectedIndex;
				$rootScope.$broadcast('selectindexcat', {index : index});
			});
		};
		
		if(document.getElementById('selectCategorie2')!=null){
			document.getElementById('selectCategorie2').addEventListener('change', function() {
				var index = document.getElementById('selectCategorie2').selectedIndex;
				$rootScope.$broadcast('selectindexcat2', {index : index});
			});
		};
		
		if(document.getElementById('selectBank')!=null){
			document.getElementById('selectBank').addEventListener('change', function() {
				var index = document.getElementById('selectBank').selectedIndex;
				$rootScope.$broadcast('selectBank', {index : index});
			});
		};
		// $scope.$on('hello', function(events, args){
			// //console.log("Houms ",args.bb);
		// });
		// $('#btnUploadCancel').click(function(){
			// //console.log("Houms");
			// $('#upload-avatar').modal('toggle');
		// });
		// if(document.getElementsByClassName("9").length!=0){
			// document.getElementsByClassName("9")[0].click();
		// };
		// if(document.getElementsByClassName("11").length!=0){
			// document.getElementsByClassName("11")[0].click();
		// };
		
        $('#box_toggle_more').on('click',  function(e) {
			var txt = iElm.html();
				// //console.log("You clicked me1... ",txt);
			if(txt == "expand_more"){
				 iElm.html("expand_less") && e.preventDefault();
			} else if(txt == "expand_less"){
				iElm.html("expand_more") && e.preventDefault();
			}
			iElm.parent().parent().parent().toggleClass("collapsed");
		});
      }
    };
  }
]);

angular.module('app')
.directive('onLoadClicker_', ['$timeout', '$rootScope',
  function($timeout,$rootScope) {
    return {
      restrict: 'AC',
      priority: -1,
      link: function($scope, iElm, iAttrs, controller) {
        $timeout(function() {
          // iElm.triggerHandler('click');
		    // $('.2').trigger('click');
			if(document.getElementsByClassName("1").length!=0){
				document.getElementsByClassName("1")[0].click();
			};
			if(document.getElementsByClassName("4").length!=0){
				document.getElementsByClassName("4")[0].click();
			};
			if(document.getElementsByClassName("5").length!=0){
				document.getElementsByClassName("5")[0].click();
			};
			if(document.getElementsByClassName("8").length!=0){
				document.getElementsByClassName("8")[0].click();
			};
			if(document.getElementsByClassName("14").length!=0){
				document.getElementsByClassName("14")[0].click();
			};
			if(document.getElementsByClassName("9").length!=0){
				document.getElementsByClassName("9")[0].click();
			};
			if(document.getElementsByClassName("11").length!=0){
				document.getElementsByClassName("11")[0].click();
			};
			if(document.getElementsByClassName("17").length!=0){
				document.getElementsByClassName("17")[0].click();
			};
			if(document.getElementsByClassName("18").length!=0){
				document.getElementsByClassName("18")[0].click();
			};
			if(document.getElementsByClassName("23").length!=0){
				document.getElementsByClassName("23")[0].click();
			};
			if(document.getElementsByClassName("25").length!=0){
				document.getElementsByClassName("25")[0].click();
			};
			$rootScope.$broadcast('readyData', {});
		    // angular.element('#2').triggerHandler('click');
		    angular.element('#box_toggle_less').triggerHandler('click');
			iElm.html("expand_less");
			iElm.parent().parent().parent().toggleClass("collapsed");
			$('#box_toggle_less').on('click',  function(e) {
				var txt = iElm.html();
				// //console.log("You clicked me... ",txt);
                if(txt == "expand_more"){
                    iElm.html("expand_less") && e.preventDefault();
                } else if(txt == "expand_less"){
                    iElm.html("expand_more") && e.preventDefault();
                }
                iElm.parent().parent().parent().toggleClass("collapsed");
			});
        }, 0);
      }
    };
  }
]);

// angular.module('app')
// .directive('onLoadClicker_2', ['$timeout',
  // function($timeout) {
    // return {
      // restrict: 'AC',
      // priority: -1,
      // link: function($scope, iElm, iAttrs, controller) {
        // $timeout(function() {
			// if(document.getElementsByClassName("1").length!=0){
				// document.getElementsByClassName("1")[0].click();
			// };
			// if(document.getElementsByClassName("4").length!=0){
				// document.getElementsByClassName("4")[0].click();
			// };
			// if(document.getElementsByClassName("5").length!=0){
				// document.getElementsByClassName("5")[0].click();
			// };
			// if(document.getElementsByClassName("8").length!=0){
				// document.getElementsByClassName("8")[0].click();
			// };
			// if(document.getElementsByClassName("14").length!=0){
				// document.getElementsByClassName("14")[0].click();
			// };
			// if(document.getElementsByClassName("9").length!=0){
				// document.getElementsByClassName("9")[0].click();
			// };
			// if(document.getElementsByClassName("11").length!=0){
				// document.getElementsByClassName("11")[0].click();
			// };
			// if(document.getElementsByClassName("17").length!=0){
				// document.getElementsByClassName("17")[0].click();
			// };
			// if(document.getElementsByClassName("18").length!=0){
				// document.getElementsByClassName("18")[0].click();
			// };
		    // angular.element('#box_toggle_less').triggerHandler('click');
			// iElm.html("expand_less");
			// iElm.parent().parent().parent().toggleClass("collapsed");
			// $('#box_toggle_less').on('click',  function(e) {
				// var txt = iElm.html();
                // if(txt == "expand_more"){
                    // iElm.html("expand_less") && e.preventDefault();
                // } else if(txt == "expand_less"){
                    // iElm.html("expand_more") && e.preventDefault();
                // }
                // iElm.parent().parent().parent().toggleClass("collapsed");
			// });
        // }, 0);
      // }
    // };
  // }
// ]);

angular.module('app')
    .directive('uiSectionbox', ['$timeout', '$rootScope', '$location', function($timeout,$rootScope,$location) {
        return {
            restrict: 'AC',
            link: function(scope, el, attr) {
				$timeout(function() {
					if(document.getElementById('selectProduct')!=null){
						document.getElementById('selectProduct').addEventListener('change', function() {
							var index = document.getElementById('selectProduct').selectedIndex;
							$rootScope.$broadcast('selectindexprod', {index : index});
						});
					};
				}, 0);
				// //console.log("scope ",scope);
				// //console.log("el ",el);
				// //console.log("attr ",attr);
				// var item1=1;
				// var item2=2;
				// $rootScope.$broadcast('event_', { a: item1, b: item2 });
				var comptNbOffline2=0;
				scope.$watch('online', function(a,b) {
					// comptNbOffline2++;
					var path_ = $location.path();
					var x='Oups problème d\'internet.';
					if(!a && (path_!='/access/login' || path_!='/access/forgotpwd' || path_!='/access/access_confirmation')){
						$rootScope.$broadcast('message_internet', {x : x});
					};
				});
				if (scope.$root && !scope.$root.$$phase) {
					//console.log("Apply");
					scope.$apply();
				};
                el.on('click', '.box header .actions i.box_toggle', function(e) {
                    var _this = $(this);
                    var txt = _this.html();
                    if(txt == "expand_more"){
                        _this.html("expand_less") && e.preventDefault();
                    } else if(txt == "expand_less"){
                        _this.html("expand_more") && e.preventDefault();
                    }
                    _this.parent().parent().parent().toggleClass("collapsed");
                });

                el.on('click', '.box header .actions i.box_close', function(e) {
                    var _this = $(this);
                    _this.parent().parent().parent().addClass("hide").hide() && e.preventDefault();
                });

                angular.element(document).ready(function() {});
            }

        };
    }]);



angular.module('app').directive('menuheight', ['$timeout', function($window) {
    return function(scope, element, attrs) {
        var w = angular.element($window);
        var changeNavHeight = function() {
          ////console.log($scope.settings.menuProfile);
            if (angular.element(".page-sidebar.collapseit").length || angular.element(".page-sidebar.chat_shift").length) {
              var navHeight = angular.element("#main-content section.wrapper .content-wrapper").innerHeight() + 90;              
            } else {
              var navHeight = $(window).innerHeight() - 60;
              ////console.log("hi1 "+navHeight);
            }
            ////console.log("hi "+navHeight);
            element.height(navHeight);
        };
        w.bind('resize', function() {
            changeNavHeight();
        });
        changeNavHeight();
    }
}]);

angular.module('app')
    .directive('searchgroup', ['$timeout', function($timeout) {
        return {
            restrict: 'AC',
            link: function(scope, el, attr) {

                el.on('focus', 'input.form-control', function(e) {
                    var _this = $(this);
                    _this.parent().parent().parent().addClass("focus");
                });
                el.on('blur', 'input.form-control', function(e) {
                    var _this = $(this);
                    _this.parent().parent().parent().removeClass("focus");
                });

                el.on('click', '.input-focus', function(e) {
                    var _this = $(this);
                    _this.parent().find(".form-control").focus();
                    _this.parent().parent().addClass("focus");
                });


            }

        };
    }]);


angular.module('app')
    .directive('inputgroup', ['$timeout', function($timeout) {
        return {
            restrict: 'AC',
            link: function(scope, el, attr) {

                el.on('focus', 'input.form-control', function(e) {
                    var _this = $(this);
                    _this.parent().addClass("focus");
                });
                el.on('blur', 'input.form-control', function(e) {
                    var _this = $(this);
                    _this.parent().removeClass("focus");
                });

                el.on('click', '.input-group-addon', function(e) {
                    var _this = $(this);
                    _this.parent().find(".form-control").focus();
                    _this.parent().addClass("focus");
                });


            }

        };
    }]);


angular.module('app')
    .directive('chatapifocus', ['$timeout', function($timeout) {
        return {
            restrict: 'AC',
            link: function(scope, el, attr) {

                el.on('focus', 'input.form-control', function(e) {
                    var _this = $(this);
                    _this.parent().find("i").addClass("primary");
                });
                el.on('blur', 'input.form-control', function(e) {
                    var _this = $(this);
                    _this.parent().find("i").removeClass("primary");
                });

                el.on('click', 'i', function(e) {
                    var _this = $(this);
                    _this.parent().find(".form-control").focus();
                    _this.addClass("primary");
                });


            }

        };
    }]);


angular.module('app')
    .directive('verticalrhythm', ['$timeout', function($timeout) {
        return {
            restrict: 'AC',
            link: function(scope, el, attr) {

                el.on('click', 'i', function(e) {
                    var _this = $(this);
                    _this.parent().toggleClass("vertical-test-on");
                });
            }

        };
    }]);

