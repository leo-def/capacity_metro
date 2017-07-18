
  (function(){
    angular.module('app')
            .directive("elementNetworkManage", directive);
    function directive() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'app/directive/element-network-manage-directive.tpl.html',
            scope: {
                ring: '=',
            },
            controller : dController,
            controllerAs: 'vm'
            };
            return directive;
         };
         function dController($scope, $mdDialog, appFactory, ringFactory ){
             var vm = this;
             vm.title = 'Armários';
             vm.ring = $scope.ring;
			 
             vm.getVendorLabel = getVendorLabel;
             vm.index = index;
			 vm.all = all;
             vm.toggle = toggle;
             vm.isExtended = isExtended;
             vm.create = create;
             vm.save = save;
             vm.remove = remove;
             vm.persist =persist;
			 vm.vendor = null;
			 
		
		vm.vendor_options = [
				{label: '-', value: 1},
				{label: 'TELLABS', value: 2},
				{label: 'ALCATEL', value: 3},
				{label: 'ECI', value: 4},
				{label: 'NORTEL', value: 5},
				{label: 'DATACOM', value: 6},
				{label: 'CISCO', value: 7},
		];
			/*
				 vm.vendor_options = [
					{label: 'ALCATEL', value: 'ALCATEL'},
					{label: 'CISCO', value: 'CISCO'},
					{label: 'DATACOM', value: 'DATACOM'},
					{label: 'ECI', value: 'ECI'},
					{label: 'EXTREME', value: 'EXTREME'},
					{label: 'NORTEL', value: 'NORTEL'},
					{label: 'TELLABS', value: 'TELLABS'},
					{label: 'HUAWEI', value: 'HUAWEI'},
				];
				 */
             vm.index();
             
			 
			$scope.$watch(function(){
				return vm.vendor;
            }, function(newValue){
				for(var index in vm.ring.gabnets){
					vm.ring.gabnets[index].vendor = vm.vendor;
				}
			}); 
			
            $scope.$watch(function(){
				return $scope.ring;
            }, function(newValue){
				vm.ring = newValue;
				vm.all();
			});
             
             function index(){
				vm.ring = $scope.ring; 
				all();
             };
			 
			 function getVendorLabel(id){
				for(index in vm.vendor_options){
					if(vm.vendor_options[index].value == vm.vendor){
						return vm.vendor_options[index].label;
					}
				}	 
			 };
			 
			 function all(){
				
				/*if(!vm.persist()){*/
					if(! vm.ring.gabnets){ // novo
						vm.ring.gabnets = [];
					}else{
						for(index in vm.ring.gabnets){
							vm.vendor = vm.ring.gabnets[index].vendor;
						}
					}
					return;
				/*}
				
				 ringFactory.Data.gabnets(
						vm.ring,
						function(response){
							vm.ring.gabnets = response.data;
							for(index in vm.ring.gabnets){
								if(!vm.vendor){
									vm.vendor = vm.ring.gabnets[index].vendor;
								}else{
									return;
								}
							}
						},function(){
							vm.simpleAlert('Erro ao carregar armários');
						});		
				*/
				 
			 }
             
            function toggle(ev, rowIndex, save){
				var row = vm.ring.gabnets[rowIndex];
				var original = angular.copy(row.$$extend);
				for(var index in vm.ring.gabnets){
                    vm.ring.gabnets[index].$$extend = false;
					if(!vm.ring.gabnets[index].id){
						//current
						if(index == rowIndex){
							// is cancel action and form is open
							if(!save && original){
								vm.ring.gabnets.splice(index, 1);
							}
						}
					}
                    
                }
				row.$$extend = !original;
               	
			};
           
			function isExtended(ev, rowIndex){
				var row = vm.ring.gabnets[rowIndex];
				if(!row.$$extend){row.$$extend = false;}
				return row.$$extend; 
           };

            function create(ev){
				if(!vm.ring.gabnets){
					vm.ring.gabnets = angular.copy(array());
				}
                vm.ring.gabnets.unshift(angular.copy({$$extend:false, vendor: vm.vendor}));
				vm.toggle(ev, 0, true);
				
            };

            function save(ev, rowIndex){
				
				var row = getRow(rowIndex);
				
				/*if(!vm.persist()){*/
					vm.toggle(ev, rowIndex, true);
					return;
				/*}
				
                vm.loading = true;
                networkElementFactory.Data.save(row,
                    function(response){
                        vm.loading = false;
                        vm.ring.gabnets = response.data;
                        appFactory.simpleAlert('Armário salvo com sucesso');
                    }, function(error){
                        vm.loading = false;
						appFactory.simpleAlert('Erro ao salvar Armário');
                    });
					*/
            };

            function remove(ev, rowIndex){
				//var row = getRow(rowIndex);
				/*if(!vm.persist()){*/
					vm.ring.gabnets.splice(rowIndex,1);
					return;
				/*}
				
                vm.loading = true;
                networkElementFactory.remove(ev, row,
                    function(response){
                        vm.loading = false;
                        vm.ring.gabnets = response.data;
                        appFactory.simpleAlert('Armário removido com sucesso');
                    }, function(error){
                        vm.loading = false;
                        appFactory.simpleAlert('Erro ao remover Armário');
                    });
					*/
            };
            
            function getRow(indexRow){
				var row = angular.copy(vm.ring.gabnets[indexRow]);
                var ring = angular.copy(vm.ring);
                delete ring.gabnets;
                row.ring = ring;
                return row;
            }
			
			function persist(){
				if(vm.ring.id){
					return true;
				}else{
					return false;
				}
				
			}
  	};
})();


