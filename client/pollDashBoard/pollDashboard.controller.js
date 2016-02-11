(function(){
	"use strict";
	angular.module('app.pollDashboard')
		.controller('pollDashboardController',pollDashboardController)

		pollDashboardController.$inject = ['pollsService','$timeout'];

		function pollDashboardController(pollsService,$timeout){
			var vm = this;
			vm.poll = {
				question:'',
				choices: [{answer:'',votes:0},{answer:'',votes:0}]
			};

			vm.isCreated = null;

			vm.addMoreChoice = function(){ 
			  if(vm.poll.choices.length < 5){
				  vm.poll.choices.push({answer:'',votes:0});
			  }	
			}

			vm.removeChoice = function(idx){
				if(vm.poll.choices.length > 2){
				  vm.poll.choices.splice(idx,1);
				}
			}

			vm.submitPoll = function(){
			   return pollsService.createPoll(vm.poll)
					.then(function(response){
						console.log("poll was created");
						vm.poll = {
							question:'',
							choices: [{answer:'',votes:0},{answer:'',votes:0}]
						};
						vm.isCreated = true;
						$timeout(function(){
							vm.isCreated = null;
						},1500)
					})
					.catch(function(error){
						console.log(error);
						vm.poll = {
							question:'',
							choices: [{answer:'',votes:0},{answer:'',votes:0}]
						};
						vm.isCreated = false;
						$timeout(function(){
							vm.isCreated = null;
						},1500)
					})
			}

		}
})()