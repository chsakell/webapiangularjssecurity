﻿angular.module("gadgetsStore", ["storeFilters", "storeCart", "ngRoute", "chieffancypants.loadingBar","ngAnimate"])
			.config(function ($routeProvider) {
			    $routeProvider.when("/gadgets", {
			        templateUrl: "app/views/gadgets.html"
			    });
			    $routeProvider.when("/checkout", {
			        templateUrl: "app/views/checkout.html"
			    });
			    $routeProvider.when("/submitorder", {
			        templateUrl: "app/views/submitOrder.html"
			    });
			    $routeProvider.when("/complete", {
			        templateUrl: "app/views/orderSubmitted.html"
			    });
			    $routeProvider.when("/login", {
			        templateUrl: "app/views/login.html"
			    });
			    $routeProvider.when("/register", {
			        templateUrl: "app/views/register.html"
			    });
			    $routeProvider.otherwise({
			        templateUrl: "app/views/gadgets.html"
			    });
			});