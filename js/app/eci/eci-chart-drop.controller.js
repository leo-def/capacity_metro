(function(){
	"use strict";
	angular.module("app.eci")
		.controller("eciChartDropController", eciController);
		
	function eciController($scope, $routeParams, appFactory, eciFactory, chartDataAdapter){
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
			eciFactory.Data.chartDropWeek(vm.ring_name, function(response){
				var data =chartDataAdapter.toLineChart(response.data,
					'date',
					[
						{name: 'Download', key: 'download'},
						{name: 'Upload', key: 'upload'}
					]
					);
				vm.loading = false;
				vm.week = data;
			}, function(){
				vm.loading = false;
				appFactory.simpleAlert('Não foi possivel resgatar o gráfico');
			});
			
			vm.loading = true;
			eciFactory.Data.chartDropMonth(vm.ring_name, function(response){
				var data =chartDataAdapter.toLineChart(response.data,
					'date',
					[
						{name: 'Download', key: 'download'},
						{name: 'Upload', key: 'upload'}
					]
					);
				vm.loading = false;
				vm.month = data;
			}, function(){
				vm.loading = false;
				appFactory.simpleAlert('Não foi possivel resgatar o gráfico');
			});
			
			vm.loading = true;
			eciFactory.Data.chartDropYear(vm.ring_name, function(response){
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