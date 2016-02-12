(function(){
	"use strict";
	angular.module('app.pollDashboard')
		.controller('pollDashboardShareController',pollDashboardShareController)

		pollDashboardShareController.$inject = ['pollsService','$location','$routeParams'];

		function pollDashboardShareController(pollsService,$location,$routeParams){
			  var vm = this;
			  vm.poll;

			  vm.userChoice = {}
			  vm.vote = function(){
			    if(typeof vm.userChoice === 'string'){
			    	var choiceId = vm.poll.choices[parseInt(vm.userChoice)]._id;
			    	pollsService.updateVote(vm.poll._id,choiceId)
			  	 		.then(function(response){
			  	 			console.log(response);
			  	 		   $location.path('/dashboard/polls/share/result/' + vm.poll._id);
			  	 		})
			  	 		.catch(function(error){
			  	 			console.log(error);
			  	 		})
			    }
			  }

			  vm.results = function(){
			  	$location.path('/dashboard/polls/share/result/' + vm.poll._id);
			  }

			   function getPollById(){
			  	pollsService.getOnePoll($routeParams.pollid)
			  		.then(function(response){
			  			vm.poll = response.data;
			  		})
			  		.catch(function(error){
			  			console.log(error);
			  		})
			  } 

			  getPollById();


		}
})()