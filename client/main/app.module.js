(function(){
	"use strict";
	angular
	  .module('app',[
		/*third party modules*/
		'ngRoute',
		'chart.js',
		/*my modules*/
		'app.auth',
		'app.common',
		'app.pollDashboard', 
		'app.landing',
		'app.home',
	 
	]) 
	.config(configFunction)
	.run(runFunction)

	configFunction.$inject = ['$routeProvider', '$locationProvider'];

	function configFunction($routeProvider,$locationProvider){
		$locationProvider.html5Mode(true);
		$routeProvider.otherwise({
			redirectTo:'/'
		})
	}

	runFunction.$inject = ['$rootScope','$location'];

	function runFunction($rootScope,$location){
		$rootScope.$on('$routeChangeError',function(event,next,previous,error){
			if(error === "Authorization Required"){
				$location.path('/login');
			}
		})
	}


})()