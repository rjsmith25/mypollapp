(function(){
	"use strict";
	angular.module('app.pollDashboard')
		.controller('userPollsController',userPollsController)

		userPollsController.$inject = ['pollsService','authentication','$location'];

		function userPollsController(pollsService,authentication,$location){
			  var vm = this;
			  vm.userPolls;
			  vm.editPoll = function(pollid){
			  	$location.path('/dashboard/polls/edit/' + pollid);
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