(function(){
	"use strict";
	angular.module("app.auth")
		.controller("authController", authController);
		
		function authController(appFactory, authFactory){
			var vm = this;
			vm.index = index;
			vm.login = login;
			vm.logout = logout;
			
			vm.user = {};
			vm.loading = false;
			
			vm.index();
			
			function index(){
				appFactory.sidenav.setExists(false);
			}
			
			function login(){
				vm.loading = true;
				authFactory.login(vm.user,
					function(){
						vm.loading = false;
						appFactory.simpleAlert('Bem vindo');
						authFactory.redirectLogin();
					}, function(){
						vm.loading = false;
						appFactory.simpleAlert('Não foi possivel realizar login');
					});
			}
			
			function logout(success, error){
				vm.loading = true;
				authFactory.logout(
					function(){
						vm.loading = false;
						appFactory.simpleAlert('Até mais');
					},function(){
						vm.loading = false;
						appFactory.simpleAlert('Não foi possivel realizar logout');
					});
			}
			function isAuth(){
				return authFactory.isAuth();
			}
			
		}
	
})();