	(function(){
	"use strict";
	angular.module("app.eci")
		.factory("eciFactory", eciFactory);

	function eciFactory(appFactory, dataFactory, $location, $window){
		var service = {
			create: create,
			edit: edit,
			remove: remove,
			toChart: toChart,
			toDropChart: toDropChart,
			Data: {
				manage : dataManage,
				traffic: dataTraffic,
				drop: dataDrop,
				get: dataGet,
				save: dataSave,
				chartDropWeek: dataChartDropWeek,
				chartDropMonth: dataChartDropMonth,
				chartDropYear: dataChartDropYear
			},
		};
		return service;

		function create(ev, success, error){
			appFactory.dialog(ev, {row: {}}, DialogController, 'app/eci/form.tpl.html', function(answer){
				service.Data.save(answer, success, error);
			}, function(){
				//cancelar
			});
		};
		
		function edit(ev, id, success, error){
			service.Data.get(id, function(response){
				//dialog
				appFactory.dialog(ev, {row: response.data}, DialogController, 'app/eci/form.tpl.html', function(answer){
					service.Data.save(answer, success, error);
				}, function(){
					//cancelar
				});
				
			}, error);
		};
		
			
		function remove(ev, id, success, error){
			var confirm = $mdDialog.confirm()
				  .title('Deseja excluir este eci?')
				  .textContent('Esta ação não poderá ser revertida')
				  .ariaLabel('Deseja excluir este eci?')
				  .targetEvent(ev)
				  .ok('Sim')
				  .cancel('Não');
			$mdDialog.show(confirm).then(function() {
				service.Data.remove(id, success, error);
			}, function() {
				//cancelar
			});

			
		};
			
		function toChart(ev, ring_name){
			$window.open('#/ring/chart/'+ring_name, '_blank');
			//$location.path('ring/chart/'+ring_name);
		}	
		function toDropChart(ev, ring_name){
			$window.open('#/eci/chart-drop/'+ring_name, '_blank');
			//$location.path('eci/chart-drop/'+ring_name);
		}
			
		function dataManage(success, error){
			
			return dataFactory.get('eci/getManageEci/').then(success, error);
			
		};
		
		function dataTraffic(success, error){
			
			return dataFactory.get('eci/getTrafficEci/').then(success, error);
			
		};
		
		function dataDrop(success, error){
			
			return dataFactory.get('eci/getDropEci/').then(success, error);
			
		};
		
		function dataGet(id, success, error){
			
			return dataFactory.get('eci/getCollectEci/'+id).then(success, error); 

		};
		
		function dataSave(eci, success, error){
		
			return dataFactory.post('eci/saveCollectEci/', eci).then(success, error);
		
		};
		
		function dataChartDropWeek(ring_name, success, error){
		
			return dataFactory.get('chart/drop/getChartWeek/' + ring_name).then(success, error);
		
		};
		
		function dataChartDropMonth(ring_name, success, error){
		
			return dataFactory.get('chart/drop/getChartMonth/' + ring_name).then(success, error);
		
		};
		
		function dataChartDropYear(ring_name, success, error){
		
			return dataFactory.get('chart/drop/getChartYear/' + ring_name).then(success, error);
		
		};
		
		function DialogController($scope, $mdDialog, ringFactory, appFactory, row) {
            var vm = this;
            vm.hide = hide;
            vm.cancel = cancel;
            vm.answer = answer;
            vm.row = row;
			vm.rings = [];
			vm.index = index;
			
			vm.index();
		   
			function index(){
				ringFactory.Data.names(function (response){
					vm.rings = response.data;
				}, function(){
					appFactory.simpleAlert('Não foi possivel cs nomes de anéis');
				});
				
			}
            function hide() {
                $mdDialog.hide();
            };

            function cancel() {
                $mdDialog.cancel();
            };

            function answer(panswer) {
                $mdDialog.hide(panswer);
            };
        };
	}
	
})();