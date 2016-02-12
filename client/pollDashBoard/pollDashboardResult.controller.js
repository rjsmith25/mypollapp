(function(){
	"use strict";
	angular.module('app.pollDashboard')
		.controller('pollDashboardResultController',pollDashboardResultController)

		pollDashboardResultController.$inject = ['$routeParams','pollsService'];

		function pollDashboardResultController($routeParams,pollsService){
			var vm = this;
			  vm.labels = [];
			  vm.data = [];
			  vm.poll;
			  function getPollById(){
			  	pollsService.getOnePoll($routeParams.pollid)
			  		.then(function(response){
			  			var data = [];
			  			vm.poll = response.data;
			  			angular.forEach(vm.poll.choices, function(choice, idx) {
							    vm.labels.push(choice.answer);
				  				data.push(choice.votes);
							});
			  			vm.data.push(data);
			  		})
			  		.catch(function(error){
			  			console.log('poll was not retrieved ' + error)
			  		})
			  }

			  getPollById();
		}
})()