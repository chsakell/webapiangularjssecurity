/// <reference path="C:\workspace\blogger\GadgetStoreSecurity\Store\Scripts/angular.js" />
angular.module("gadgetsStore")
    .service('storeService', function ($http, gadgetsUrl, categoriesUrl, tempOrdersUrl, ordersUrl, tokenKey) {

        this.getGadgets = function () {
            var request = $http.get(gadgetsUrl);

            return request;
        }

        this.getCategories = function () {
            var request = $http.get(categoriesUrl);

            return request;
        }

        this.submitOrder = function (order) {
            var token = sessionStorage.getItem(tokenKey);
            console.log(token);

            var headers = {};
            if (token) {
                headers.Authorization = 'Bearer ' + token;
            }

            var request = $http.post(ordersUrl, order, { headers: { 'Authorization': 'Bearer ' + token } });

            return request;
        }

        this.saveTempOrder = function (currentProducts) {
            var request = $http.post(tempOrdersUrl, currentProducts);

            return request;
        }

        this.loadTempOrder = function () {
            var request = $http.get(tempOrdersUrl);

            return request;
        }

    });