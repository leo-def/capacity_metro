(function(){
    "use strict";
    angular.module("utils")
            .factory("dataConverterFactory", dataConverterFactory);
			
		function dataConverterFactory(){
			var service = {
				convertNumbers : convertNumbers,
			};
			return service;
			
			function convertNumbers(data){
				forEach(data, function(collection, value, key){
					if(!isNaN(value)){
						collection[key] = Number(value);
					}
				});
				return data;
			}
			
			function forEach(data, callback){
				angular.forEach(data, function(value, key){
					if(isIterable(value)){
						forEach(value, callback);
					}else{
						callback(data, value, key);
					}
				});
			}
			
			function isIterable(obj) {
					// checks for null and undefined
					if (obj == null) {
						return false;
					}
					return typeof obj[Symbol.iterator] === 'function';
			}
		}			
})();