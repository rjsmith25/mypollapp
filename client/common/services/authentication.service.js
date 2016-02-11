(function(){
	angular
		.module('app.common')
		.service('authentication',authentication)

		authentication.$inject = ['$window','$http','$q'];

		function authentication($window,$http,$q){

			function saveToken(token){
				$window.localStorage['poll-token'] = token;
			}

			function getToken(){	
				return $window.localStorage['poll-token'];
			}

			function register(user){
				var deferred = $q.defer();
				$http.post('/api/register',user)
			          .then(function(response){
			          	console.log(response);
			          	saveToken(response.data.token);
			          	deferred.resolve(response.data);
			          })
			          .catch(function(error){
			          	console.log(error);
			          	deferred.reject(error);
			          })
			    return deferred.promise;
			}
		

			function login(user){
				var deferred = $q.defer(); 
				$http.post('/api/login',user)
					   .then(function(response){
			          	 saveToken(response.data.token);
			          	 deferred.resolve(response.data);
					   })
					   .catch(function(error){
					   	 deferred.reject(error);
					   })
			    return deferred.promise;
			}

			function isLoggedIn(){
				 var token = getToken();
			      if(token){
			        var payload = JSON.parse($window.atob(token.split('.')[1]));
			        return payload.exp > Date.now() / 1000;
			      } else {
			        return false;
			      }
			}

			function currentUser(){
				if(isLoggedIn()){
			        var token = getToken();
			        var payload = JSON.parse($window.atob(token.split('.')[1]));
			        return {
			          id: payload._id,
			          email : payload.email,
			          name : payload.name
			        };
     			 }
			};

			function logout(){
				$window.localStorage.removeItem('poll-token');
			}


			return {
				saveToken:saveToken,
				getToken:getToken,
				register:register,
				login:login,
				logout:logout,
				isLoggedIn:isLoggedIn,
				currentUser:currentUser
			}
		}

})()