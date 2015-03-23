angular.module("gadgetsStore")
    .controller('accountController', function ($scope, $http, $location, tokenKey, accountService) {

        $scope.hasLoginError = false;
        $scope.hasRegistrationError = false;

        // Callbacks
        var successRegistrationCallback = function (data, status, headers, config) {
            $location.path("/login");
        }

        var successLoginCallback = function (result) {
            console.log(result);
            $location.path("/submitorder");
            sessionStorage.setItem(tokenKey, result.access_token);
            $scope.hasLoginError = false;
            $scope.isAuthenticated = true;
        }

        var errorRegistrationCallback = function (result, status, headers, config) {
            $scope.hasRegistrationError = true;
            var errorMessage = result.Message;
            console.log(result);
            $scope.registrationErrorDescription = errorMessage + ':';

            if (result.ModelState['model.Email'])
                $scope.registrationErrorDescription += result.ModelState['model.Email'];

            if (result.ModelState['model.Password'])
                $scope.registrationErrorDescription += result.ModelState['model.Password'];

            if (result.ModelState['model.ConfirmPassword'])
                $scope.registrationErrorDescription += result.ModelState['model.ConfirmPassword'];

            if (result.ModelState[''])
                $scope.registrationErrorDescription += result.ModelState[''];
        }

        var errorLoginCallback = function (data, status, headers, config) {
            console.log(data);
            $scope.hasLoginError = true;
            $scope.loginErrorDescription = data.error_description;
        }

        // Registration
        $scope.register = function () {

            $scope.hasRegistrationError = false;
            $scope.result = '';

            var data = {
                Email: $scope.registerEmail,
                Password: $scope.registerPassword,
                ConfirmPassword: $scope.registerPassword2
            };

            accountService.register(JSON.stringify(data))
                .success(successRegistrationCallback).error(errorRegistrationCallback);
        }

        // Generate Token - Login
        $scope.login = function () {
            $scope.result = '';

            var loginData = {
                grant_type: 'password',
                username: $scope.loginEmail,
                password: $scope.loginPassword
            };

            accountService.generateAccessToken(loginData)
                .success(successLoginCallback)
                    .error(errorLoginCallback);

        }

    });