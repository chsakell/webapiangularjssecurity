angular.module("gadgetsStore")
    .controller('accountController', function ($scope, $http, $location, registerUrl, tokenUrl, tokenKey) {

        $scope.hasLoginError = false;
        $scope.hasRegistrationError = false;

        // Registration
        $scope.register = function () {

            $scope.hasRegistrationError = false;
            $scope.result = '';

            var data = {
                Email: $scope.registerEmail,
                Password: $scope.registerPassword,
                ConfirmPassword: $scope.registerPassword2
            };

            $http.post(registerUrl, JSON.stringify(data))
                    .success(function (data, status, headers, config) {
                        $location.path("/login");
                    }).error(function (data, status, headers, config) {
                        $scope.hasRegistrationError = true;
                        var errorMessage = data.Message;
                        console.log(data);
                        $scope.registrationErrorDescription = errorMessage;

                        if (data.ModelState['model.Email'])
                            $scope.registrationErrorDescription += data.ModelState['model.Email'];

                        if (data.ModelState['model.Password'])
                            $scope.registrationErrorDescription += data.ModelState['model.Password'];

                        if (data.ModelState['model.ConfirmPassword'])
                            $scope.registrationErrorDescription += data.ModelState['model.ConfirmPassword'];

                        if (data.ModelState[''])
                            $scope.registrationErrorDescription +=  data.ModelState[''];

                    }).finally(function () {
                    });
        }

        $scope.login = function () {
            $scope.result = '';

            var loginData = {
                grant_type: 'password',
                username: $scope.loginEmail,
                password: $scope.loginPassword
            };

            $http({
                method: 'POST',
                url: tokenUrl,
                data: $.param(loginData),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            }).then(function (result) {
                console.log(result);
                $location.path("/submitorder");
                sessionStorage.setItem(tokenKey, result.data.access_token);
                $scope.hasLoginError = false;
                $scope.isAuthenticated = true;
            }, function (data, status, headers, config) {
                $scope.hasLoginError = true;
                $scope.loginErrorDescription = data.data.error_description;
            });

        }

    });