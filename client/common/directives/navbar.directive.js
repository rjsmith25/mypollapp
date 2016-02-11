(function(){
	'use strict';
	angular
		.module('app.common')
		.directive('plNavbar',plNavbar);

		function plNavbar(){
			return {
				templateUrl:'/common/directives/navbar.html',
				restrict:'E',
				controller:navbarController,
				controllerAs:'vm'
			}
		}

		navbarController.$inject = ['$rootScope','$location','authentication'];
		
		function navbarController($rootScope,$location,authentication){
				var vm = this;
				vm.isLoggedIn = authentication.isLoggedIn()
				vm.currentUser = authentication.currentUser()
							
				vm.logout = function(){
					authentication.logout();
					$location.path('/')
				}

				$rootScope.$on('$routeChangeSuccess',function(next,current){
					vm.isLoggedIn = authentication.isLoggedIn()
					vm.currentUser = authentication.currentUser()
				})

		}

})()