(function(){
    angular.module('app')
            .directive("elementNetworkInput", directive);
			
    function directive() {
        var directive = {
            //restrict: 'EA',
            templateUrl: 'app/directive/element-network-input-directive.tpl.html',
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
		
		vm.vendor_options = [
				{label: '-', value: 1},
				{label: 'TELLABS', value: 2},
				{label: 'ALCATEL', value: 3},
				{label: 'ECI', value: 4},
				{label: 'NORTEL', value: 5},
				{label: 'DATACOM', value: 6},
				{label: 'CISCO', value: 7},
		];
		/*
		 vm.vendor_options = [
			{label: 'ALCATEL', value: 'ALCATEL'},
			{label: 'CISCO', value: 'CISCO'},
			{label: 'DATACOM', value: 'DATACOM'},
			{label: 'ECI', value: 'ECI'},
			{label: 'EXTREME', value: 'EXTREME'},
			{label: 'NORTEL', value: 'NORTEL'},
			{label: 'TELLABS', value: 'TELLABS'},
			{label: 'HUAWEI', value: 'HUAWEI'},
		];
		 */
		vm.index();
		
		$scope.$watch(function(){
			return vm.model;
		}, function(newValue){
			$scope.model = newValue;
		});
		
		function index(){
			if(!vm.model){
			}
		}	
	}
})();