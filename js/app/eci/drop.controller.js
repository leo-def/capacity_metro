(function(){
	"use strict";
	angular.module("app.eci")
		.controller("eciDropController", eciController);
		
	function eciController($scope, appFactory, eciFactory){
		var vm = this;
		vm.index = index;
		vm.filter_obj = {};
		vm.pagename = 'eci_drop';
		
		//appFactory
			vm.pagination = appFactory.pagination;
			vm.orderBy = appFactory.orderBy;
		
		//eciFactory
			vm.toChart = eciFactory.toChart;
			vm.toDropChart = eciFactory.toDropChart;
			
		//vars
			vm.printcontrol = false;
			vm.loading = false;
			vm.list = {
				limit: 5,
				page: 1,
				data: [],
			};
			
			vm.headers = {
				ring_name: 'Anel',
				drop_download: 'Drop(%)',
				percent_drop_cos0: 'Cos 0 Drop(%)',
				percent_drop_cos1: 'Cos 1 Drop(%)',
				percent_drop_cos2: 'Cos 2 Drop(%)',
				percent_drop_cos3: 'Cos 3 Drop(%)',
				percent_drop_cos4: 'Cos 4 Drop(%)',
				percent_drop_cos5: 'Cos 5 Drop(%)',
				percent_drop_cos6: 'Cos 6 Drop(%)',
				percent_drop_cos7: 'Cos 7 Drop(%)',										
			};

		
		vm.index();
		
		$scope.$watch(function(){
			return vm.printcontrol;
		}, function(newValue){
			//quando alguma ação executada no table toolbar
		});
		
		function index(){
			appFactory.sidenav.setExists(true);
			vm.loading = true;
			eciFactory.Data.drop(function(response){
				vm.loading = false;
				vm.list.data = response.data;
			}, function(){
				vm.loading = false;
				vm.list.data = [];
				appFactory.simpleAlert('Não foi possivel resgatar os anéis');
			});
		};
		
	};
	
})();