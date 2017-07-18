(function(){
    angular.module('app')
            .directive("tableToolbar", directive);
			
    function directive() {
        var directive = {
            //restrict: 'EA',
            templateUrl: 'app/directive/table-toolbar-directive.tpl.html',
            scope: {
				options: '=?',
				tablename: '@',
				data: '=',
				headers: '=',
            },
            controller : dcontroller,
            controllerAs: 'vm',
            };
            return directive;
    };
   
    function dcontroller($scope){
		var vm = this;
		vm.tablename = $scope.tablename;
		vm.headers = $scope.headers;
		vm.data = $scope.data
		
		
		vm.index = index;		
		vm.excel = excel;
		vm.txt = txt;
		vm.xml = xml;
		vm.csv = csv;
		
		vm.index();
		
		
		$scope.$watch(function(){
			return $scope.data;
		},function(newValue){
			vm.data = newValue;
		});
		
		$scope.$watch(function(){
			return $scope.headers;
		},function(newValue){
			vm.headers = newValue;
		});
		
		function index(){
			if($scope.tablename){
				vm.tablename = $scope.tablename;
			}else{
				vm.tablename = 'Download-Capacity-Metro'
			}
		};
		
		function excel(){
			alasql('SELECT '+getHeadersQuery()+' INTO XLSX("'+vm.tablename+'.xlsx",{headers:true}) FROM ?',[vm.data]);
		};
		
		function txt(){
			var data = angular.copy(vm.data);
			data.unshift(vm.headers);
			alasql('SELECT '+concateAllColumns()+' INTO TXT("'+vm.tablename+'.txt") FROM ?',[data]);
		};
		
		function xml(){
			alasql('SELECT '+getHeadersQuery()+' INTO XLSXML("'+vm.tablename+'.xml",{headers:true}) FROM ?',[vm.data]);
		};
		
		function csv(){
			alasql('SELECT '+getHeadersQuery()+' INTO CSV("'+vm.tablename+'.csv",{headers:true}) FROM ?',[vm.data]);
		};
		
		function concateAllColumns(columnSeparator, lineSeparator){
			if(!columnSeparator){columnSeparator = ' \t ';}
			if(!lineSeparator){lineSeparator = "\n\r";}
			
			
			var query = 'CONCAT(';
			angular.forEach(vm.headers, function(element, index){
				query  += ' '+index+', "'+columnSeparator+'" , '; 
			});
			query += ' "'+lineSeparator+'" ) ';
			return query;
		};
		
		function getHeadersQuery(){
			if(!vm.headers){
				return '*'
			}
			var query = '';
			angular.forEach(vm.headers, function(element, index){
				query += ' '+index+' AS ['+element+'], ';
			});
			query= query.substring(0, query.lastIndexOf(','));
			return query;
		};
	}
	
	
})();