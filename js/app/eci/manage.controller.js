(function(){
	"use strict";
	angular.module("app.eci")
		.controller("eciManageController", eciController);
		
	function eciController($scope, appFactory, eciFactory){
		var vm = this;
		vm.index = index;
		vm.filter_obj = {};
		vm.pagename = 'eci_manager';
		
		//appFactory
			vm.pagination = appFactory.pagination;
			vm.orderBy = appFactory.orderBy;
			
		//eciFactory
			vm.toChart = eciFactory.toChart;
			vm.toDropChart = eciFactory.toDropChart;

		//local
			vm.all = all;
			vm.create = create;
			vm.edit = edit;
			vm.remove = remove;
		//vars
			vm.printcontrol = false;
			vm.loading = false;
			vm.list = {
				limit: 5,
				page: 1,
				data: [],
			};
			
			vm.headers = {
				ring: 'Anel',
				collect: 'Concentrador',
				mot: 'Mot',
			};

		
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
			eciFactory.Data.manage(function(response){
				vm.loading = false;
				vm.list.data = response.data;
			}, function(){
				vm.loading = false;
				vm.list.data = [];
				appFactory.simpleAlert('Não foi possivel resgatar os anéis');
			});
		};
		
		function create(ev){
			return eciFactory.create(ev, function(){
				appFactory.simpleAlert('ECI criado com sucesso');
				all();
			}, function (){
				appFactory.simpleAlert('Erro ao criar ECI');
			});
		};
		function edit(ev, row){
			return eciFactory.edit(ev, row.id,  function(){
				appFactory.simpleAlert('ECI editado com sucesso');
				all();
			}, function (){
				appFactory.simpleAlert('Erro ao editar ECI');
			});
		};
		
		function remove(ev, row){
			eciFactory.remove(ev, row.id, function(){
				appFactory.simpleAlert('ECI removido com sucesso');
				all();
			}, function (){
				appFactory.simpleAlert('Erro ao remover ECI');
			});
		};
	};
	
})();