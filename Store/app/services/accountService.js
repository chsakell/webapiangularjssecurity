/// <reference path="C:\workspace\blogger\GadgetStoreSecurity\Store\Scripts/angular.js" />
angular.module("gadgetsStore")
    .service('accountService', function ($http, registerUrl, tokenUrl, tokenKey) {

        this.register = function (data) {
            var request = $http.post(registerUrl, data);

            return request;
        }

        this.generateAccessToken = function (loginData) {
            var requestToken = $http({
                method: 'POST',
                url: tokenUrl,
                data: $.param(loginData),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            });

            return requestToken;
        }

        this.isUserAuthenticated = function () {
            var token = sessionStorage.getItem(tokenKey);

            if (token)
                return true;
            else
                return false;
        }

        this.logout = function () {
            sessionStorage.removeItem(tokenKey);
        }

    });