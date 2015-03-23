angular.module('gadgetsStore')
	.constant('gadgetsUrl', 'http://localhost:61691/api/gadgets')
	.constant('ordersUrl', 'http://localhost:61691/api/orders')
	.constant('categoriesUrl', 'http://localhost:61691/api/categories')
    .constant('tempOrdersUrl', 'http://localhost:61691/api/sessions/temporders')
    .constant('registerUrl', '/api/Account/Register')
    .constant('tokenUrl', '/Token')
    .constant('tokenKey', 'accessToken')
	.controller('gadgetStoreCtrl', function ($scope, $http, $location, storeService, accountService, cart) {

	    $scope.data = {};

	    // Callbacks
	    var gadgetsLoadedCallback = function (data) {
	        $scope.data.gadgets = data;
	    }

	    var gadgetsNotLoadedError = function (error) {
	        console.log(error);
	        $scope.data.error = error;
	    }

	    var categoriesLoadedCallback = function (data) {
	        $scope.data.categories = data;
	    }

	    var categoriesNotLoadedCallback = function (error) {
	        $scope.data.error = error;
	    }

	    var orderSubmittedCallback = function (data, status, headers, config) {
	        $scope.data.OrderLocation = headers('Location');
	        $scope.data.OrderID = data.OrderID;
	        cart.getProducts().length = 0;
	        $scope.saveOrder();
	        $location.path("/complete");
	    }

	    var orderSubmittionFailedCallback = function (data, status, headers, config) {
	        if (status != 401)
	            $scope.data.orderError = data.Message;
	        else {
	            $location.path("/login");
	        }
	    }

	    var tempOrderLoadedCallback = function (data) {
	        if (data) {
	            for (var i = 0; i < data.length; i++) {
	                var item = data[i];
	                cart.pushItem(item);
	            }
	        }
	    }

	    storeService.getGadgets()
            .success(gadgetsLoadedCallback)
            .error(gadgetsNotLoadedError);

	    storeService.getCategories()
        .success(categoriesLoadedCallback)
        .error(categoriesNotLoadedCallback);

	    $scope.sendOrder = function (shippingDetails) {
	        var order = angular.copy(shippingDetails);
	        order.gadgets = cart.getProducts();
	        storeService.submitOrder(order)
			.success(orderSubmittedCallback)
			.error(orderSubmittionFailedCallback);
	    }

	    $scope.saveOrder = function () {
	        var currentProducts = cart.getProducts();

	        storeService.saveTempOrder(currentProducts)
			    .success(function (data, status, headers, config) {
			    }).error(function (error) {
			    }).finally(function () {
			    });
	    }

	    $scope.checkSessionGadgets = function () {
	        storeService.loadTempOrder()
	        .success(tempOrderLoadedCallback)
	        .error(function (error) {
	            console.log('error checking session: ' + error);
	        });
	    }

	    $scope.showFilter = function () {
	        return $location.path() == '';
	    }

	    $scope.checkoutComplete = function () {
	        return $location.path() == '/complete';
	    }

	    $scope.createAccount = function () {
	        $location.path("/register");
	    }

	    $scope.isUserAuthenticated = function () {
	        return accountService.isUserAuthenticated();
	    }

	    $scope.logout = function () {
	        accountService.logout();
	    }

	});