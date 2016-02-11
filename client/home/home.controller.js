(function(){
	angular
	  .module('app.home')
	  .controller('homeController',homeController)

	  homeController.$inject = ['pollsService','$location'];

	  function homeController(pollsService,$location){
	  	  var vm = this;
			  vm.polls;
			  //userchoice for each poll 
			  vm.userChoices = [];
			  vm.vote = function(poll,index){
			  	var poll_id;
			  	var choice_id;
			  	 if(typeof vm.userChoices[index] !== 'object'){
			  	 	choice_id = poll.choices[parseInt(vm.userChoices[index])]._id;
			  	 	poll_id = poll._id;
			  	 	pollsService.updateVote(poll_id,choice_id)
			  	 		.then(function(response){
			  	 		   $location.path('/home/result/' + poll._id);
			  	 		})
			  	 		.catch(function(error){
			  	 		})
			  	 }	
			  }
			  vm.results = function(poll){
			  	$location.path('/home/result/' + poll._id);
			  }
			  function getPolls(){
				 return pollsService.getPolls()
					.then(function(response){
						vm.polls = response.data;
						angular.forEach(vm.polls,function(){
							vm.userChoices.push({});
						})
					})
					.catch(function(error){
						console.log('Polls were not able to be returned ' + error)
					})
			}
			getPolls();
	  }
})()