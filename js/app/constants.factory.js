(function(){
	"use strict";
	angular.module("app")
		.factory("constantsFactory", constantsFactory);
		
		function constantsFactory(){
			var service = {
				vendor_options: [
					{label: 'ALCATEL', value: 1},
					{label: 'CISCO', value: 2},
					{label: 'DATACOM', value: 3},
					{label: 'ECI', value: 4},
					{label: 'EXTREME', value: 5},
					{label: 'NORTEL', value: 6},
					{label: 'TELLABS', value: 7},
					{label: 'HUAWEI', value: 8},
				]
				
			};
			return service;
			
		
		}
	
})();