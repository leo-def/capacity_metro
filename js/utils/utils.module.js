(function(){
    "use strict";
    angular.module("utils",
            ['ngCookies',
            'ng.deviceDetector',
            'ngRoute']);
            //.config(dataFactoryConfig);
    
    function dataFactoryConfig($httpProvider){
        
        $httpProvider.interceptors.push(function(authTokenFactory) {
            return {
                'request': function(config) {
                    if(authTokenFactory.auth()){
                        config.headers[authTokenFactory.authTokenHeader] = authTokenFactory.token 
                    }
                    return config;
                }
            };
        });
    }
})();

