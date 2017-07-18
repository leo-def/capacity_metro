(function(){
    angular.module('app')
            .directive("inputStringDate", directive);

    function directive() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'app/directive/string-date-input-directive.tpl.html',
            //template: '<h1>Teste</h1>',
            scope: {
                model: '=',
				label: '@',
                format: '@'
            },
            
            controller : inputStringDateController,
            controllerAs: 'vm'
            };
            return directive;
         };
         function inputStringDateController($scope){
             var vm = this;
             vm.date = moment().toDate();
             vm.index = index;
             vm.format = $scope.format;
             vm.label = $scope.label;
             vm.index();
             
			$scope.$watch(function(){
                 return $scope.model;
			}, function(newValue){
				// string to date
				if(!newValue){return;}
				vm.date = moment(newValue, vm.format).toDate();

			});
			$scope.$watch(function(){
                 return vm.date;
			}, function(newValue){
				//date to string 
				if(!newValue){return;}
				$scope.model = moment(newValue).format(vm.format);

			});
             
             function index(){ 
				if(!$scope.label){
					 vm.label = 'data';
				}
				if(!$scope.format) {
					vm.format = 'DD-MM-YYYY';
				}
             };
         }
})();