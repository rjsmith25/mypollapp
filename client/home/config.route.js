(function(){
	angular
	 .module('app.home')
	 .config(configFunction);

		configFunction.$inject = ['$routeProvider'];

		function configFunction($routeProvider){
			$routeProvider.when('/home',{
				templateUrl:'/home/home.html',
				controller:'homeController',
				controllerAs:'vm'
			})
			$routeProvider.when('/home/result/:pollid',{
				templateUrl:'/home/homeResult.html',
				controller:'homeResultController',
				controllerAs:'vm'
			})
		}
})()