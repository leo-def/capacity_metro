(function(){
	"use strict";
	angular.module("app.auth", [])
		.config(routerConfig);
    function routerConfig($routeProvider) {
			var loginTemplate = {
                        title: 'Login',
                        templateUrl: 'app/auth/login.tpl.html',
                        controller: 'authController',
                        controllerAs: 'vm'
                    };
					
            $routeProvider
                    .when('/login', loginTemplate);
        };
		
	
})();