app.controller('AuthController', ['$scope', '$window', '$localStorage', '$location', '$state', 'Auth',
    function ($scope, $window, $localStorage, $location, $state, Auth) {

        //Check if user authenticated (go to home if user authenticated)
        Auth.checkAuth(function () {
            $state.go('root.home');
        }, function () {});


        //Validate login form and if valid attempt login
        $scope.login = function () {
            $('#login_form').validate({
                rules: {
                    email: {required: true, email: true},
                    password: 'required'
                }
            });

            if (!$('#login_form').valid())
                return;

            Auth.login($('#login_form').serialize());
        }


        //Validate registeration form and if valid attempt registering a new user
        $scope.register = function () {
            $('#register_form').validate({
                rules: {
                    name: 'required',
                    email: {
                        required: true,
                        email: true,
                        remote: {
                            url: "/check-email",
                            type: "post",
                            data: {
                                email: function () {
                                    return $("#email").val();
                                }
                            }
                        }
                    },
                    password: {required: true, minlength: 6},
                    confirm_password: {equalTo: 'input[name="password"]'},
                }, messages: {email: {remote: 'Email address already registered.'}}
            });

            if (!$('#register_form').valid())
                return;

            Auth.register($('#register_form').serialize());
        }
    }]);