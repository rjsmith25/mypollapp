(function(){
	angular
	  .module('app',[
		/*third party modules*/
		'ngRoute',
		'chart.js',
		/*my modules*/
		'app.common',
		'app.auth',
		'app.landing',
		'app.home',
		'app.pollDashboard',
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