(function(){
	"use strict";
	angular.module('app.pollDashboard')
		.controller('editPollController',editPollController)

		editPollController.$inject = ['$routeParams','pollsService'];

		function editPollController($routeParams,pollsService){
			 var vm = this;
			 vm.poll;
			 vm.newChoice = {
			 	answer:'',
			 	votes:0
			 }

			 vm.addChoice = function(){
			 	if(vm.newChoice.answer!==''){
			 		pollsService.createPollChoice(vm.newChoice,$routeParams.pollid)
			 			.then(function(response){
			 				getPollById();
			 				vm.newChoice = {
			 					answer:'',
			 					votes:0
			 				}
			 			})
			 			.catch(function(error){
			 				console.log(error);
			 			})
			 	}
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