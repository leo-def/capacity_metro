(function(){
    angular.module('app')
            .directive("orderButton", directive);
			
    function directive() {
        var directive = {
            //restrict: 'EA',
            templateUrl: 'app/directive/order-button-directive.tpl.html',
            scope: {
				field: '@',
				pagename: '@',
            },
            controller : dcontroller,
            controllerAs: 'vm',
            };
            return directive;
    };
   
    function dcontroller($scope, appFactory){
		var vm = this;
		vm.index = index;
		vm.order = order;
		vm.index();
		
		function index(){
			
		};
		function order(){
			appFactory.orderBy.setOrder($scope.pagename, $scope.field);
		}
		

	}
	
})();