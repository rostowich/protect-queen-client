	'use strict';
	// create the module and name it IndexApp
    var indexApp = angular.module('indexApp', ['ngRoute','angularSpinner']);
    
    // configure our routes
    indexApp.config(function($routeProvider, $locationProvider) {
    	$locationProvider.hashPrefix('');
        $routeProvider.when('/index', {
                templateUrl : '/index.html',
                controller  : 'indexController',
            }).when('/', {
                templateUrl : 'home.html',
                controller  : 'indexController',
            }).when('/register', {
                templateUrl : 'register.html',
                controller  : 'regController',
            }).when('/login', {
                templateUrl : 'login.html',
                controller : 'logController',
            }).when('/user', {
                templateUrl : 'user.html',
                controller : 'userController',
            }).otherwise({redirectTo: '/'});
                	
    });

    // create the controller and inject Angular's $scope
    indexApp.controller('indexController',function($rootScope, $scope, $http,$window) {
    
        // create a message to display in our view
        $scope.message = 'Welcome to the game about protecting the queen!';
        $scope.logout=function(){
    		$http({
    			method: 'POST',
    			url: "http://localhost:7777/logout",
    		}).then(function successCallBack(response){
    			alert("je me deconnecte");
    			$window.localStorage.setItem('isLogged', false);
    			$rootScope.authenticated=$window.localStorage.getItem('isLogged');
    			$window.location.href = '#/login';
    			location.reload();
    		}, function errorCallBack(response){
    			
    		});
    	}
    });
    
   