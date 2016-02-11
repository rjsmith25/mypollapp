(function(){
	angular.module('app.home')
		.controller('homeResultController',homeResultController)

		homeResultController.$inject = ['$routeParams','pollsService'];

		function homeResultController($routeParams,pollsService){
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