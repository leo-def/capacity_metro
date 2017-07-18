(function(){
	"use strict";
	angular.module("app")
		.controller('appController', appController);

	function appController(appFactory, authFactory){
		var vm = this;
		vm.isAuth = authFactory.isAuth;
		vm.index = index;
		vm.page = appFactory.page;
		vm.sidenav = appFactory.sidenav;
		
		vm.logout = logout;
		
		vm.index();
		
		function logout(){
			authFactory.logout(function(){	
				authFactory.redirectLogout();
			}, function(){
			});
		};
		
		function index(){
		}
	}
})();