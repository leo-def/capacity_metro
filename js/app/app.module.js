(function(){
	"use strict";
	angular.module("app",
			['ngCookies',
            'base64',
            'reTree',
            'ng.deviceDetector',
            'utils',
            'ngRoute',
            'ngAnimate',
            'ngSanitize',
            'ngMask',
			'ngMaterial',
			
			'md.data.table',
			'highchartsAngular',
			
			'app.auth',
			'app.ring',
			'app.eci',
			
			])
		.run(utilsConfig)
		.config(routeConfig)
		.config(angularMaterialDateProvider)
		.run(authCheckRun);
			/*
			'ngCsv',
			'ngExcel',
			'ngPrint',
			'angular-google-chart'
				'googlechart'
			*/
	function routeConfig($routeProvider){
			$routeProvider
                .when('/',{
                    redirectTo: '/dashboard'
                });
				/*.otherwise({
                    redirectTo: '/dashboard'
                });*/
    }
   
    function angularMaterialDateProvider($mdDateLocaleProvider) {
		$mdDateLocaleProvider.formatDate = function(date) {
		   return moment(date).format('DD-MM-YYYY');
		};
	};
	function utilsConfig(dataFactory){
		dataFactory.baseUrl = 'http://SVUXPOPEWS13/CapacityMetro/rest/';
		//'/capacitymetro/rest/';
	}
	
    function authCheckRun($rootScope, $location, authTokenFactory, deviceDetector) {
            $rootScope.$on("$routeChangeStart", function(event, next, current) {
                if (deviceDetector.browser == 'chrome') {
                    //Verifica se os cookies do navegador estão habilitados
                    if (!navigator.cookieEnabled || navigator.cookieEnabled === null) {
                        $location.path('/error/CookieDesabilitado');
                        return;
                    }
                    //Verifica se o usuário está logado
                    if (!authTokenFactory.isAuth()) {
                      $location.path('/login');
                    }
                } else {
                    $location.path('/error/NavegadorNaoSuportado');
                    return;
                }
            });
        };
	
})();