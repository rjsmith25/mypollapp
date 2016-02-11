(function(){
	 angular
	 	.module('app.common')
		.factory('pollsService',pollsService)
		
		pollsService.$inject = ['$http','authentication'];

		function pollsService($http,authentication){

			// get polls
			function getPolls(){
				return $http.get('/api/polls');
			}

			// get one poll
			function getOnePoll(pollid){
				return $http.get('/api/polls/' + pollid);
			}

			function getPollsByUserId(userid){
				return $http.get('/api/polls/user/' + userid);
			}

			// create new poll
			function createPoll(data){
				return $http.post('/api/polls',data,{
					headers:{
						Authorization:'Bearer ' + authentication.getToken()
					}
				})
			}

			// create poll choice
			function createPollChoice(data,pollid){
				return $http.post('/api/polls/' + pollid + '/choices',data,{
					headers:{
						Authorization:'Bearer ' + authentication.getToken()
					}
				});
			} 


			// delete poll
			function deletePoll(pollid){
				return $http.delete('/api/polls/' + pollid,{
					headers:{
						Authorization:'Bearer ' + authentication.getToken()
					}
				});
			}

			// delete poll choice
			function deletePollChoice(pollid,choiceid){
				return $http.delete('/api/polls/' + pollid + '/choices/' + choiceid);
			}

			// vote on a choice
			function updateVote(pollid,choiceid){
				return $http.put('/api/polls/' + pollid + '/choices/' + choiceid);
			}

			return {
				getPolls:getPolls,
				getOnePoll:getOnePoll,
				getPollsByUserId:getPollsByUserId,
				createPoll:createPoll,
				createPollChoice:createPollChoice,
				deletePoll:deletePoll,
				deletePollChoice:deletePollChoice,
				updateVote:updateVote
			}
		}
})()