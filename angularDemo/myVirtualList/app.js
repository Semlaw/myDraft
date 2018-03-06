angular
	.module('myApp', ['ui.router','myVirtualList'])
	.config(function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/home');
		$stateProvider
			.state('home', {
				url:'/home',
				templateUrl: 'views/main.html',
				controller: 'MainCtrl'
			});
		
	})
	.controller('MainCtrl', function($scope) {
		var dp = [];

		for(var i = 0; i < 99999; i++) {
			dp.push({
				nickName: '用户' + i,
				value: 'value' + i,
				imgUrl:'./img/zan_logo.jpg',
				userName:'@'+i
			});
		}
		console.dir(dp)
		$scope.mydata = {
			name: "pikachu"
		}
		$scope.currentUser = null;
		$scope.dataProvider = dp;
		$scope.selectedOption = null;

		$scope.onSelect = function(option) {
			console.log('this.onSelect',option)
		};
	});