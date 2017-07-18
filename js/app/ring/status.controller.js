(function(){
	"use strict";
	angular.module("app.ring")
		.controller("ringStatusController", ringController);
		
	function ringController($scope, $mdDialog, appFactory, ringFactory, chartDataAdapter){
		var vm = this;
		

		vm.index = index;
		//factories
			vm.pagination = appFactory.pagination;
		//ringFactory		
			vm.toChart = ringFactory.toChart;
			
		//vars 
			vm.printcontrol = false;
			vm.loading = false;
			vm.by_ring_chart = [{name:'TOTAL', y:50}, {name:'OBJ', y:30}];
			vm.by_ring_table = [];
			vm.by_gabnet_chart = [{name:'TOTAL', y:50}, {name:'OBJ', y:30}];
			vm.by_gabnet_table = [];

		vm.index();
		
		$scope.$watch(function(){
			return vm.printcontrol;
		}, function(newValue){
			//quando alguma ação executada no table toolbar
		});

		function index(){
			appFactory.sidenav.setExists(true);
			ringFactory.Data.byRingChart(function(response){
					vm.by_ring_chart = chartDataAdapter.toPieChart(response.data, 'vendor', 'count', ['TOTAL']);
					vm.by_ring_table = response.data;
				}, function (){
					appFactory.simpleAlert('Não foi possivel carregar o gráfico');
				});
				
			ringFactory.Data.byGabnetChart(function(response){
					vm.by_gabnet_chart = chartDataAdapter.toPieChart(response.data, 'vendor', 'count', ['TOTAL']);
					vm.by_gabnet_table = response.data;
				}, function (){
					appFactory.simpleAlert('Não foi possivel carregar o gráfico');
				});
			
		};
	
	};
	
})();