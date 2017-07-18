(function(){
	"use strict";
	angular.module("app.ring")
		.factory("ringFactory", ringFactory);
		
	function ringFactory(appFactory, dataFactory, $location, $window){
		var service = {
			create: create,
			edit: edit,
			disable: disable,
			enable: enable,
			toChart: toChart,
			Data: {
				manage : dataManage,
				traffic: dataTraffic,
				byRingChart: dataByRingChart,
				byGabnetChart: dataByGabnetChart,
				get: dataGet,
				save: dataSave,
				disable: dataDisable,
				enable: dataEnable,
				chartWeek: dataChartWeek,
				chartMonth: dataChartMonth,
				chartYear: dataChartYear,
				names: dataNames,
			},
		};
		return service;
		
		function create(ev, success, error){
			appFactory.dialog(ev, {row: {}}, null, 'app/ring/form.tpl.html', function(answer){
				service.Data.save(answer, success, error);
			}, function(){
				//cancelar
			});
		};
		
		function edit(ev, ring_name, success, error){
			service.Data.get(ring_name, function(response){
				//dialog
				appFactory.dialog(ev, {row: response.data}, null, 'app/ring/form.tpl.html', 
				function(answer){
					service.Data.save(answer, success, error);
				}, function(){
					//cancelar
				});
				
			}, error);
		};
		
			
		function disable(ev, ring_name, success, error){
			return appFactory.simpleDialog(ev, 
				'Deseja desativar este anel?',
				' ', 
				'Deseja desativar este anel?', 
				'Sim',
				'Não',
				function() {
					service.Data.disable(ring_name, success, error);
				}, function() {
					//cancelar
				});
		};
		
		function enable(ev, ring_name, success, error){
			return appFactory.simpleDialog(ev, 
				'Deseja ativar este anel?',
				' ', 
				'Deseja ativar este anel?', 
				'Sim',
				'Não',
				function() {
					service.Data.enable(ring_name, success, error);
				}, function() {
					//cancelar
				});
		};
		
		function toChart(ev, ring_name){
			$window.open('#/ring/chart/'+ring_name, '_blank');
			//$location.path('ring/chart/'+ring_name);
		}
		
		//data
			//list	
			function dataManage(success, error){
				return dataFactory.get('ring/getManageRing/').then(success, error);
	
			};
				
			function dataTraffic(date_filter, success, error){
			
				return dataFactory.get('ring/getTrafficRing/'+date_filter).then(success, error);
			
			};
			
			//status
			function dataByRingChart(success, error){
			
				return dataFactory.get('vendor/getVendorsRing/').then(success, error);
			
			};
				
			function dataByGabnetChart( success, error){
			
				return dataFactory.get('vendor/getVendorsGabinet/').then(success, error);
			
			};
		
			//crud
			function dataGet(ring_name, success, error){
			
					return dataFactory.get('ring/getRingByName/'+ring_name).then(success, error); 
			 
			};
				
			function dataSave(ring, success, error){
			
				return dataFactory.post('ring/saveRing/', ring).then(success, error);
			
			};
				
			function dataDisable(ring_name, success, error){
				return dataFactory.get('ring/disable/'+ ring_name).then(success, error);
			
			};
			
			function dataEnable(ring_name, success, error){
				return dataFactory.get('ring/enable/'+ ring_name).then(success, error);
			
			};
			
			//chart
			function dataChartWeek(ring_name, success, error){
			
				return dataFactory.get('chart/ring/getChartWeek/'+ring_name).then(success, error);
			
			};
			
			function dataChartMonth(ring_name, success, error){
			
				return dataFactory.get('chart/ring/getChartMonth/'+ring_name).then(success, error);
			
			};
			
			function dataChartYear(ring_name, success, error){
			
				return dataFactory.get('chart/ring/getChartYear/'+ring_name).then(success, error);
			
			}
			
			function dataNames(success, error){
				
				return dataFactory.get('ring/getNames/').then(success, error);
			
			}
			
	};		
})();