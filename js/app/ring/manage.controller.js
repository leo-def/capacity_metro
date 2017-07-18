(function(){
	"use strict";
	angular.module("app.ring")
		.controller("ringManageController", ringController);
		
	function ringController($scope,  appFactory, ringFactory, chartDataAdapter){
		var vm = this;
		vm.index = index;
		vm.pagename = 'ring_manager';
		vm.filter_obj = {};
		
		//appFactory
			vm.pagination = appFactory.pagination;
			vm.orderBy = appFactory.orderBy;
			
		//ringFactory		
			vm.toChart = ringFactory.toChart;

		//local
			vm.all = all;
			vm.create = create;
			vm.edit = edit;
			vm.enable = enable;
			vm.disable = disable;
			vm.uploadMask = uploadMask;
			vm.downloadMask = downloadMask;
		
		//vars
			vm.printcontrol = true;
			vm.loading = false;
			
			vm.list = {
				limit: 5,
				page: 1,
				data: [],
			};
			vm.headers = {
				ring_name: 'Anel',
				capacity: 'Capacidade/VC4',
				gabnet_name: 'Armário(s)',
				gabnet_vendor: 'Fabricantes Armários',
				collect_name: 'Concentrador',
				collect_vendor: 'Fabricante Concentrador',
				headend_name: 'Headend',
				headend_vendor: 'Fabricante Headend'
			}

		vm.index();
		
		$scope.$watch(function(){
			return vm.printcontrol;
		}, function(newValue){
			//quando alguma ação executada no table toolbar
		});

		function index(){
			appFactory.sidenav.setExists(true);
			all();
		};
		
		function all(){
			vm.loading = true;
			ringFactory.Data.manage(function(response){
				vm.loading = false;
				vm.list.data = response.data;
			}, function(){
				vm.loading = false;
				vm.list.data = [];
				appFactory.simpleAlert('Não foi possivel carregar anéis');
			});
		}

		function uploadMask(){
			
		};
		function downloadMask(){
			
		};
		
		
		function create(ev){
			ringFactory.create(ev, function(){
				all();
				appFactory.simpleAlert('Anel criado com sucesso');
			}, function (){
				appFactory.simpleAlert('Erro ao criar anel');
			});
		};
		function edit(ev, row){
			ringFactory.edit(ev, row.ring_name,  function(){
				all();
				appFactory.simpleAlert('Anel editado com sucesso');
			}, function (){
				appFactory.simpleAlert('Erro ao editar anel');
			});
		};
		
		function disable(ev, row){
			ringFactory.disable(ev, row.ring_name, function(){
				all();
				appFactory.simpleAlert('Anel desativado com sucesso com sucesso');
			}, function (){
				appFactory.simpleAlert('Erro ao desativar o anél anel');
			});
		};
		
		function enable(ev, row){
			ringFactory.enable(ev, row.ring_name, function(){
				all();
				appFactory.simpleAlert('Anel ativado com sucesso com sucesso');
				
			}, function (){
				appFactory.simpleAlert('Erro ao ativar o anél anel');
			});
		};
		
	};
	
})();