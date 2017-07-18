(function(){
    "use strict";
    angular.module("utils")
            .factory("authTokenFactory", authTokenFactory);
    
    function authTokenFactory($rootScope, $cookieStore, $window ){
        var service = {
            auth: auth,
            isAuth: isAuth,
            remove: remove,
            authTokenHeader: 'x-auth-token',
            token: null,
            user: null
        };
        return service;

         $rootScope.$watch(function () {
            return $window.sessionStorage.token;
         }, function (value) {
            service.token = value;
         });
         
         $rootScope.$watch(function () {
            return $window.sessionStorage.user;
         }, function (value) {
            service.user = angular.fromJson(value);
         });
        
        function isAuth(){
			var token = $window.sessionStorage.getItem("token");
            return (token !== null
                    && token !== undefined
                    && token !== 'undefined');
        };
        function auth(user, token) {
            $window.sessionStorage.user =  angular.toJson(user);
            $window.sessionStorage.token =  token;
        };
        function remove() {
            delete $window.sessionStorage.user;
            delete $window.sessionStorage.token;
        }; 
        
        
    }
})();
