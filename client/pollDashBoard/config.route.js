(function(){
	"use strict";
	angular.module('app.pollDashboard')
	 .config(configFunction)

	 configFunction.$inject = ['$routeProvider'] 

	 function configFunction($routeProvider){
	 	$routeProvider.when('/dashboard',{
	 		templateUrl:'/pollDashBoard/pollDashboard.html',
	 		controller:'pollDashboardController',
	 		controllerAs:'vm',
	 		resolve:{user:resolveUser}
	 	})
	 	$routeProvider.when('/dashboard/polls',{
	 		templateUrl:'/pollDashBoard/pollDashboardUser.html',
	 		controller:'pollDashboardUserController',
	 		controllerAs:'vm',
	 		resolve:{user:resolveUser} 
	 	})	 	
	 	$routeProvider.when('/dashboard/polls/:pollid',{
	 		templateUrl:'/pollDashBoard/pollDashboardEdit.html',
	 		controller:'pollDashboardEditController',
	 		controllerAs:'vm',
	 		resolve:{user:resolveUser}
	 	})
	 	$routeProvider.when('/dashboard/polls/share/:pollid',{
	 		templateUrl:'/pollDashBoard/pollDashboardShare.html',
	 		controller:'pollDashboardShareController',
	 		controllerAs:'vm'	
	 	})
	 	$routeProvider.when('/dashboard/polls/share/result/:pollid',{
	 		templateUrl:'/pollDashBoard/pollDashboardResult.html',
	 		controller:'pollDashboardResultController',
	 		controllerAs:'vm'	
	 	})
	 }
	 
	 // check if user is logged in 
	 resolveUser.$inject = ['authentication','$q'];

	 function resolveUser(authentication,$q){
	 	var deferred = $q.defer(); 
        if(authentication.isLoggedIn()){
        	deferred.resolve(true);
        }else{
        	deferred.reject("Authorization Required");
        }
        return deferred.promise;
	 }


})();