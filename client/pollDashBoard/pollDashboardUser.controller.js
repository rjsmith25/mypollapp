(function(){
	"use strict";
	angular.module('app.pollDashboard')
		.controller('pollDashboardUserController',pollDashboardUserController)

		pollDashboardUserController.$inject = ['pollsService','authentication','$location'];

		function pollDashboardUserController(pollsService,authentication,$location){
			  var vm = this;
			  vm.userPolls;
			  vm.pollLink = null;

			  vm.sharePoll = function(pollid){
			  	if($location.port()){
			    	vm.pollLink = $location.protocol() + '://'+ $location.host() +':'+  $location.port() + "/dashboard/polls/share/" + pollid;
			    }else{
			    	vm.pollLink = $location.protocol() + '://'+ $location.host() + "/dashboard/polls/share/" + pollid;
			    } 
			  }

			  vm.editPoll = function(pollid){
			  	$location.path('/dashboard/polls/' + pollid); 
			  }
			  vm.deletePoll = function(pollid){
			  	return pollsService.deletePoll(pollid)
			  				.then(function(response){
			  					getpollsbyid();
			  				})
			  				.catch(function(error){
			  					console.log("unable to delete poll " + error)
			  				})
			  }
			  function getpollsbyid(){
			  		return pollsService.getPollsByUserId(authentication.currentUser().id)
			  					.then(function(response){
			  						vm.userPolls = response.data;
			  					})
			  					.catch(function(error){
			  						console.log(error);
			  					})
			  }
			  getpollsbyid();
		}
})()