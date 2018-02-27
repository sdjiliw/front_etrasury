angular.module('app').directive('capitalizeAll', function(uppercaseFilter, $parse) {
	   return {
		 require: 'ngModel',
		 link: function(scope, element, attrs, modelCtrl) {
			var capitalize = function(inputValue) {
				if(inputValue!=null){
					var capitalized = inputValue.toUpperCase();
				   if(capitalized !== inputValue) {
					  modelCtrl.$setViewValue(capitalized);
					  modelCtrl.$render();
					}         
				  return capitalized;
				}     
			  return null;
			}
			var model = $parse(attrs.ngModel);
			modelCtrl.$parsers.push(capitalize);
			capitalize(model(scope));
		 }
	   };
});