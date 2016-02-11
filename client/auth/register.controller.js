(function(){
	'use strict';
	angular
		.module('app.auth')
		.controller('registerController',registerController);

		registerController.$inject = ['$location','authentication'];

		function registerController($location,authentication){
                	var vm = this;

                	vm.user = {
                          name:'',
                          email:'',
                          password:''
                	};

                	vm.error = null;

                	vm.register = function(){
            		   authentication
            			.register(vm.user)
            			.then(function(response){
            				$location.path('/dashboard')
            			})
            			.catch(function(error){
            				vm.error = error.statusText;
            			})
                	}

		}

})()