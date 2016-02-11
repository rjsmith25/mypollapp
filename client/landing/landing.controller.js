(function(){
	angular
	 .module('app.landing')
	 .controller('landingController',landingController)

	 landingController.$inject = ['authentication'];

	 function landingController(authentication){
	 	vm.isLoggedIn = authentication.isLoggedIn();
	 }

})()