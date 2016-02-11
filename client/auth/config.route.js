(function(){
	'use strict';
	angular
		.module('app.auth')
		.config(configFunction);

		configFunction.$inject = ['$routeProvider'];

		function configFunction($routeProvider){
			$routeProvider.when('/register',{
				templateUrl:'/auth/register.html',
				controller:'registerController',
				controllerAs:'vm'
			})
			$routeProvider.when('/login',{
				templateUrl:'/auth/login.html',
				controller:'loginController',
				controllerAs:'vm'
			})
		}
})()