(function(){
	"use strict";
	angular.module("app")
		.factory("appFactory", appFactory);
		
	function appFactory($mdComponentRegistry, $rootScope, $mdToast, $mdSidenav, $location, $mdDialog){	
		var service = {

			simpleAlert: simpleAlert,
			pagination: {
				mdLabel: "{page: 'Página:', rowsPerPage: 'Filas por página:', of: 'de'}",
			},
			orderBy: {
				orders: [],
				order: orderByOrder,
				setOrder: orderBySetOrder,
			},
			page: {
				ringStatus: goRingStatus,
				ringCapacity: goRingCapacity,
				ringManage: goRingManage,
				eciTraffic: goEciTraffic,
				eciDrop: goEciDrop,
				eciManage: goEciManage,
				managerUsers: goManagerUsers,
			},
			sidenav: {
				toggle: sidenavToggle,
				title: sidenavGetTitle,
				toolbarClass: sidenavToolbarClass,
				toggleEci: sidenavToggleECI,
				isOpen: sidenavIsOpen,
				setEci :sidenavSetECI,
				eci :sidenavGetECI,
				setExists: sidenavSetExists,
				exists: sidenavGetExists,
				$$exists: false,
				$$eci:false,
			},
			checkServerResponse: checkServerResponse,
			dialog: dialog,
			simpleDialog: simpleDialog,
			serverErrorDialog: serverErrorDialog,
			DialogController: DialogController,
		}
		
		return service;
			
		
		
		function simpleAlert(msg){
			var toast = $mdToast.simple()
				.textContent(msg)
				.position('top right')
				.hideDelay(3000);
				
			$mdToast.show(toast);
		};
			
			
		//page
		function goRingStatus(){
			goPage('/ring/status');
		};
		
		function goRingCapacity(){
			goPage('/ring/traffic');
		};
		
		function goRingManage(){
			goPage('/ring/manage');
		};
		
		function goEciTraffic(){
			goPage('/eci/traffic');
		};
		
		function goEciDrop(){
			goPage('/eci/drop');
		};
		
		function goEciManage(){
			goPage('/eci/manage');
		};
		
		function goManagerUsers(){
			goPage('/user/manage');
		};
		
		function goPage(path){
			$location.path(path);
			sidenavToggle();
		};
		
		//orderBy
		function orderByOrder(page){
			if(! service.orderBy.orders[page]){
				return null;
			}
			return service.orderBy.orders[page];
		}
		function orderBySetOrder(page, order){
			if(service.orderBy.orders[page] === order){
				order  = '-'+order;
			}
			service.orderBy.orders[page] = order;
			return order;
			
		}
		
		//sidenav 
		function sidenavToggle(){
			$mdSidenav('left').toggle();
		};
		
		function sidenavGetTitle(){
			if(service.sidenav.eci()){
				return "ECI";
			}else{
				return "Anéis";
			};
		};
		
		function sidenavToolbarClass(){
			if(service.sidenav.eci()){
				return "md-accent";
			}else{
				return "md-primary";
			};
		};
		
		function sidenavToggleECI(){
			sidenavSetECI(!sidenavGetECI());
		};
		
		function sidenavIsOpen(){
			return $mdSidenav('left').isOpen();
		};
		
		function sidenavSetECI(val){
			service.sidenav.$$eci = val;
		};
		
		function sidenavGetECI(){
			if(!service.sidenav.$$eci){
				return false;
			}
			return true;
		};
		
		function sidenavSetExists(val){
			service.sidenav.$$exists = val;
		};
		
		function sidenavGetExists(){
			if(!service.sidenav.$$exists){
				return false;
			}
			return true;
		};
		
		function checkServerResponse(ev, response){
			if(true){
				return true;
			}
			serverErrorDialog(ev, response.data);
			return false;
		}
		
		//dialog
		function dialog(ev, locals, controller, templateUrl, ok, cancel){
			if(!controller){
				controller = DialogController;
			}
			return $mdDialog.show({
                  locals:locals,
                  controller: controller,
                  controllerAs: 'vm',
                  templateUrl: templateUrl,
                  parent: angular.element(document.body),
                  targetEvent: ev,
                  clickOutsideToClose:true,
                  fullscreen: false // Only for -xs, -sm breakpoints.
            })
            .then(ok, cancel);
			
		};
		function simpleDialog(ev, title, content, aria, okLabel, cancelLabel, ok, cancel){
			return $mdDialog.show( $mdDialog.confirm()
					  .title(title)
					  .textContent(content)
					  .ariaLabel(aria)
					  .targetEvent(ev)
					  .ok(okLabel)
					  .cancel(cancelLabel)
				).then(ok, cancel);
		}
		function serverErrorDialog(ev, errors){
			return $mdDialog.show({
                  locals:{errors: errors},
                  controller: DialogController,
                  controllerAs: 'vm',
                  templateUrl: 'app/dialogs/errors.tpl.html',
                  parent: angular.element(document.body),
                  targetEvent: ev,
                  clickOutsideToClose:true,
                  fullscreen: false // Only for -xs, -sm breakpoints.
            })
            .then(function(){}, function(){});
		}
		function DialogController($scope, $mdDialog, row) {
            var vm = this;
            vm.hide = hide;
            vm.cancel = cancel;
            vm.answer = answer;
            vm.row = row;
           
            function hide() {
                $mdDialog.hide();
            };

            function cancel() {
                $mdDialog.cancel();
            };

            function answer(panswer) {
                $mdDialog.hide(panswer);
            };
        };
	}
})();