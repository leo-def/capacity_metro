(function(){
	"use strict";
	angular.module("app.ring", [])
		.config(routerConfig);
    function routerConfig($routeProvider) {
			var trafficTemplate = {
                        title: 'Capacity Rings',
                        templateUrl: 'app/ring/traffic.tpl.html',
                        controller: 'ringTrafficController',
                        controllerAs: 'vm'
                    };
			var manageTemplate = {
                        title: 'Manage Rings',
                        templateUrl: 'app/ring/manage.tpl.html',
                        controller: 'ringManageController',
                        controllerAs: 'vm'
                    };
			var statusTemplate = {
                        title: 'Status Rings',
                        templateUrl: 'app/ring/status.tpl.html',
                        controller: 'ringStatusController',
                        controllerAs: 'vm'
                    };
					
			var chartTemplate = {
                        title: 'Chart Ring',
                        templateUrl: 'app/ring/chart.tpl.html',
                        controller: 'ringChartController',
                        controllerAs: 'vm'
                    };
					
            $routeProvider
                    .when('/ring/traffic', trafficTemplate)
					.when('/ring/manage', manageTemplate)
					.when('/ring/status', statusTemplate)
					.when('/ring/chart/:ring_name', chartTemplate)
					.when('/dashboard', statusTemplate);
	}
})();