(function(){
	angular.module('app.pollDashboard')
	 .config(configFunction)

	 configFunction.$inject = ['$routeProvider'] 

	 function configFunction($routeProvider){
	 	$routeProvider.when('/dashboard',{
	 		templateUrl:'/pollDashBoard/pollDashboard.html',
	 		controller:'pollDashboardController',
	 		controllerAs:'vm',
	 		resolve:{user:resolveUser}
	 	});
	 	$routeProvider.when('/dashboard/polls',{
	 		templateUrl:'/pollDashBoard/userPolls.html',
	 		controller:'userPollsController',
	 		controllerAs:'vm',
	 		resolve:{user:resolveUser} 
	 	});
	 	
	 	$routeProvider.when('/dashboard/polls/edit/:pollid',{
	 		templateUrl:'/pollDashBoard/editPoll.html',
	 		controller:'editPollController',
	 		controllerAs:'vm',
	 		resolve:{user:resolveUser}
	 	})
	 }	

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