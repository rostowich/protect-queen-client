'use strict';
var app=angular.module("indexApp");
app.controller("userController", function($rootScope, $scope, $http, $window, usSpinnerService){
	
	$rootScope.authenticated=$window.localStorage.getItem('isLogged');
	$rootScope.userEmail=$window.localStorage.getItem('userLogin');
	$rootScope.password=$window.localStorage.getItem('userPassword');
	$scope.play=function(){
		$http({
			method: 'POST',
			url: "http://localhost:7777/api/perform",
			headers: {"Authorization": "Bearer "+$window.localStorage.getItem('access_token'),
	              "Cache-Control": "no-cache" },
	        data: $scope.input
		}).then(function successCallBack(response){
				$scope.output=response.data.position.x+", "+response.data.position.y+", "+response.data.position.direction;
				$scope.errorMessageCommand="";
		}, function errorCallBack(response){
				$scope.errorMessageCommand=response.data.message;
				$scope.output="";
			    alert("Error : "+response.data.message);
		});
	}
	
	  
	
	
	
	
	
	
	
	});