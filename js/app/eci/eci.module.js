(function(){
	"use strict";
	angular.module("app.eci", [])
		.config(routerConfig);
    function routerConfig($routeProvider) {
			var dropTemplate = {
                        title: 'Drop Eci',
                        templateUrl: 'app/eci/drop.tpl.html',
                        controller: 'eciDropController',
                        controllerAs: 'vm'
                    };
			var trafficTemplate = {
                        title: 'Traffic Eci',
                        templateUrl: 'app/eci/traffic.tpl.html',
                        controller: 'eciTrafficController',
                        controllerAs: 'vm'
                    };
			var manageTemplate = {
                        title: 'Manage ECI',
                        templateUrl: 'app/eci/manage.tpl.html',
                        controller: 'eciManageController',
                        controllerAs: 'vm'
                    };
			var chartDropTemplate = {
                        title: 'ChartDrop ECI',
                        templateUrl: 'app/eci/chart-drop.tpl.html',
                        controller: 'eciChartDropController',
                        controllerAs: 'vm'
                    };
					
            $routeProvider
                    .when('/eci/drop', dropTemplate)
					.when('/eci/traffic', trafficTemplate)
					.when('/eci/manage', manageTemplate)
					.when('/eci/chart-drop/:ring_name', chartDropTemplate)
        };
		
	
	
})();