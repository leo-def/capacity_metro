(function(){
	"use strict";
	angular.module("app.ring")
		.controller("ringChartController", ringController);
		
	function ringController($location, $routeParams, appFactory, ringFactory, chartDataAdapter){
		var vm = this;
		vm.index = index;
		vm.ring_name = null;
		vm.week = {series: [], categories: []};
		vm.month = {series: [], categories: []};
		vm.year = {series: [], categories: []};
		
		vm.index();
		
		function index(){
			vm.ring_name = $routeParams.ring_name;
			appFactory.sidenav.setExists(true);
			vm.loading = true;
			ringFactory.Data.chartWeek(vm.ring_name, function(response){
				var data =chartDataAdapter.toLineChart(response.data,
					'date',
					[
						{name: 'Download', key: 'download'},
						{name: 'Upload', key: 'upload'},
						{name: '80%', key: 'capacity80'},
						{name: '90%', key: 'capacity90'}
					]
					);
				vm.loading = false;
				vm.week = data;
			}, function(){
				vm.loading = false;
				appFactory.simpleAlert('Não foi possivel resgatar o gráfico');
			});
			
			vm.loading = true;
			ringFactory.Data.chartMonth(vm.ring_name, function(response){
				var data =chartDataAdapter.toLineChart(response.data,
					'date',
					[
						{name: 'Download', key: 'download'},
						{name: 'Upload', key: 'upload'},
						{name: '80%', key: 'capacity80'},
						{name: '90%', key: 'capacity90'}
					]
					);
				vm.loading = false;
				vm.month = data;
			}, function(){
				vm.loading = false;
				appFactory.simpleAlert('Não foi possivel resgatar o gráfico');
			});
			
			vm.loading = true;
			ringFactory.Data.chartYear(vm.ring_name, function(response){
				var data =chartDataAdapter.toLineChart(response.data,
					'date',
					[
						{name: 'Download', key: 'download'},
						{name: 'Upload', key: 'upload'}
					]
					);
				vm.loading = false;
				vm.year = data;
			}, function(){
				vm.loading = false;
				appFactory.simpleAlert('Não foi possivel resgatar o gráfico');
			});
			
		};
	};
	
})();