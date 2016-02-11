(function(){
	"use strict";
	angular
		.module('app.common')
		.directive('plFooter',plFooter);

		function plFooter(){
			return {
				templateUrl:'/common/directives/footer.html',
				restrict:'E'
			}
		}
})()