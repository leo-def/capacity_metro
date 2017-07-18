(function(){
    angular.module('app')
            .directive("selectInput", directive);
    function directive() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'app/directive/select-input-directive.tpl.html',
            scope: {
                model: '=',
                options: '=',
                label: '@'
            },
            controller : dController,
            controllerAs: 'vm'
            };
            return directive;
         };
         function dController($scope){
             var vm = this;
             vm.value = $scope.model;
             vm.options = $scope.options;
             vm.label = $scope.label;
             vm.index = index;
             
             vm.index();
             
             $scope.$watch(function(){
                 return vm.value;
             }, function(newValue){
                 $scope.model = newValue;
             });
             
             function index(){
                 if(!vm.value && vm.options){
                     vm.value = vm.options[0].value;
                 }
                 if(!vm.options){
                     vm.options = [];
                 }
                 if(!vm.label){
                     vm.label = 'Selecione um valor';
                 }
             };
         }
})();



