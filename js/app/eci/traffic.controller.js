(function(){
	"use strict";
	angular.module("app.eci")
		.controller("eciTrafficController", eciController);
		
	function eciController($scope, appFactory, eciFactory){
		var vm = this;
		vm.index = index;
		vm.filter_obj = {};
		vm.pagename = 'eci_traffic';
		
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
				capacity: 'Capacidade/VC4',
				percentil_download_mbps: 'Download(Mbps)',
				percent_used_download: 'Ocupação Download(%)',
				drop_download: 'Drop(%)',
				percentil_download_cos0_mbps: 'Cos 0 (Mbps)',
				percentil_download_cos1_mbps: 'Cos 1 (Mbps)',
				percentil_download_cos2_mbps: 'Cos 2 (Mbps)',
				percentil_download_cos3_mbps: 'Cos 3 (Mbps)',
				percentil_download_cos4_mbps: 'Cos 4 (Mbps)',
				percentil_download_cos5_mbps: 'Cos 5 (Mbps)',
				percentil_download_cos6_mbps: 'Cos 6 (Mbps)',
				percentil_download_cos7_mbps: 'Cos 7 (Mbps)',
				percentil_download_cos0_packets: 'Cos 0 Packets',
				percentil_download_cos1_packets: 'Cos 1 Packets',
				percentil_download_cos2_packets: 'Cos 2 Packets',
				percentil_download_cos3_packets: 'Cos 3 Packets',
				percentil_download_cos4_packets: 'Cos 4 Packets',
				percentil_download_cos5_packets: 'Cos 5 Packets',
				percentil_download_cos6_packets: 'Cos 6 Packets',
				percentil_download_cos7_packets: 'Cos 7 Packets'
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
			eciFactory.Data.traffic(function(response){
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