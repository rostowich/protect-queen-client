'use strict';
var app=angular.module("indexApp");
app.controller("logController", function($rootScope,$httpParamSerializer , $scope, $http, $window, usSpinnerService){
	//This function is used to authenticate a user
	$scope.login=function(){
		usSpinnerService.spin('spinner-3');
		var dataUser={
				"username":$scope.username,
				"password":$scope.password,
		};
		$http({
			method: 'POST',
			url: "http://localhost:7777/authenticate",
			data: dataUser,
			headers: {'Content-Type': 'application/json' }
		}).then(function successCallBack(response){
			$window.localStorage.setItem('userLogin',dataUser.username);
			$window.localStorage.setItem('userPassword',dataUser.password);
			$window.localStorage.setItem('isLogged', true);
			$rootScope.userEmail=$window.localStorage.getItem('userLogin');
			$rootScope.password=$window.localStorage.getItem('userPassword');
			$rootScope.authenticated=$window.localStorage.getItem('isLogged');
			$scope.getToken();
			usSpinnerService.stop('spinner-3');
			$window.location.href = '#/user';
		}, function errorCallBack(response){
			$window.localStorage.setItem('isLogged', false);
			$rootScope.authenticated=$window.localStorage.getItem('isLogged');
			usSpinnerService.stop('spinner-3');
			$scope.errorMessage="Incorrect username or password";
			
		});
	}
	
	//This function is used to get an access token to access the resources
	$scope.getToken = function() {  
		
        var dataToken = "username="+ $window.localStorage.getItem('userLogin')+"&password="+ $window.localStorage.getItem('userPassword')+ "&grant_type=password";
		$http({
			method: 'POST',
			url: "http://localhost:7777/oauth/token",
			data: dataToken,
			headers: {"Content-Type": "application/x-www-form-urlencoded",
	              "Authorization": "Basic bXlDbGllbnQ6bXlDbGllbnRTZWNyZXQ=",
	              "Cache-Control": "no-cache" }
		}).then(function successCallBack(response){
			$window.localStorage.setItem('access_token',response.data.access_token);
			$window.localStorage.setItem('refresh_token',response.data.refresh_token);
			$scope.errorMessage="";
		}, function errorCallBack(response){
			$scope.errorMessage="";
		});
        
   }
});