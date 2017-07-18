(function(){
	"use strict";
	angular.module("app.ring")
		.controller("ringTrafficController", ringController);
		
	function ringController($scope, $mdDialog, appFactory, ringFactory, chartDataAdapter){
		var vm = this;
		vm.index = index;
		vm.getErrorLabel = getErrorLabel;
		vm.date_filter = null;
		vm.filter_obj = {};
		vm.pagename = 'ring_traffic';
		
		//appFactory
			vm.pagination = appFactory.pagination;
			vm.orderBy = appFactory.orderBy;
			
		//ringFactory		
			vm.toChart = ringFactory.toChart;
			
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
				vendor: 'Fabricante',
				traffic: 'Capacidade/VC4',
				percentil_download_mbps: 'Download(Mbps)',
				percent_used_download: 'Ocupação Download(%)',
				percentil_upload_mbps: 'Upload(Mbps)',
				percent_used_upload: 'Ocupação Upload(%)',
				problem_ring: 'Falha'
			}
		

		vm.index();

		$scope.$watch(function(){
			return vm.printcontrol;
		}, function(newValue){
			//quando alguma ação executada no table toolbar
		});
		
		$scope.$watch(function(){
			return vm.date_filter;
		}, function(newValue){
			all();
		});
		
		function index(){
			appFactory.sidenav.setExists(true);
		}
		

		
		function all(){
			vm.loading = true;
			ringFactory.Data.traffic(vm.date_filter, function(response){
				vm.loading = false;
				vm.list.data = response.data;
			}, function(){
				vm.loading = false;
				vm.list.data = [];
				appFactory.simpleAlert('Não foi possivel resgatar os anéis');
			});
			
		};
		function getErrorLabel(error){
			if(error == 1){
				return 'Sim';
			}
			return 'Não';
		}

	};
	
})();