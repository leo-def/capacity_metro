(function(){
    angular.module('app')
            .directive("capacityInput", directive);
			
    function directive() {
        var directive = {
            //restrict: 'EA',
            templateUrl: 'app/directive/capacity-input-directive.tpl.html',
            scope: {
                model: '=',
            },
            controller : dcontroller,
            controllerAs: 'vm',
            };
            return directive;
    };
    
   
    function dcontroller($scope, authFactory, appFactory){
		var vm = this;
		vm.model = $scope.model;
		vm.index = index;
		vm.quantityDisabled = quantityDisabled;
		
		vm.capacity_account_options = [
			{label: 'STM-1', value: 'STM-1'},
			{label: 'STM-16', value: 'STM-16'},
			{label: '1G', value: '1G'},
			{label: '10G', value: '10G'},
		];
		vm.capacity_number_options = [];
		
		vm.index();
		
		$scope.$watch(function(){
			return vm.model;
		}, function(newValue){
			quantityDisabled();
			$scope.model = newValue;
		});
		
		function index(){
			if(!vm.model){
				vm.model = {account: 'STM-1', number: 1};
			}
			for(var i  = 0; i < 17; i++){
				vm.capacity_number_options.push({label: i, value: i}); 
			}
		}	
		function quantityDisabled(){
			if(vm.model.account === 'STM-1'){
				vm.model.number = 1;
				return true
			}
			if( vm.model.account === 'STM-16'){
				return false;
			}
			vm.model.number = 0;
			return true;
		}
		
	}
})();