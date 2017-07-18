(function(){
	"use strict";
	angular.module("app.auth")
		.factory("authFactory", authFactory);
		
		function authFactory(dataFactory, authTokenFactory, $location){
			var service = {
				login: login,
				logout: logout,
				isAuth: isAuth,
				redirectLogin: redirectLogin,
				redirectLogout: redirectLogout,
				authToken: 'authToken',
			}
			return service;
		
			function login(user, success, error){
				
				dataFactory.post('user/auth/', user).then(function(response){
					authTokenFactory.auth(response.data, service.authToken);
					success();
				},error);
			}
			function logout(success, error){
				authTokenFactory.remove();
				success();
			}
			function redirectLogin(){
				if(!authTokenFactory.isAuth()){return ;}
				$location.path('/dashboard');					
			}
			function redirectLogout(){
				$location.path('/');
			}
			function isAuth(){
				return authTokenFactory.isAuth();
			}
		}
	
})();