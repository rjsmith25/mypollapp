(function(){
	'use strict';
	angular
		.module('app.auth')
		.controller('loginController',loginController);

		loginController.$inject = ['$location','authentication'];

		function loginController($location,authentication){
                var vm = this;

                    vm.user = {
                        email:'',
                        password:''
                    };

                    vm.error = null;

                    vm.login = function(){
                        authentication
                            .login(vm.user)
                            .then(function(response){
                                $location.path('/dashboard/polls')
                            })
                            .catch(function(error){
                                vm.error = error.statusText;
                            })
                    }

       }

})()