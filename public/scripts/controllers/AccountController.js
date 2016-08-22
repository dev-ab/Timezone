app.controller('AccountController', ['$scope', '$window', '$state', 'Auth',
    function ($scope, $window, $state, Auth) {
        //Check User authenticated (to check token expiration on the server)
        Auth.checkAuth(function () {
        }, function () {
            $state.go('root.login');
        });

        //Load Authentication data
        $scope.authData = Auth.getData();
        $scope.user = angular.copy($scope.authData.user);

        $scope.changeImg = function (as) {
            var reader = new FileReader();
            reader.onload = function (e) {
                // get loaded data and render thumbnail.
                document.getElementById("image").src = e.target.result;
            };
            // read the image file as a data URL.
            reader.readAsDataURL(as.files[0]);
        }

        //Save the new or edited user
        $scope.saveUser = function () {
            //form validation rules
            $scope.validator = $('#user_form').validate({
                rules: {
                    name: 'required',
                    email: {
                        required: true,
                        email: true,
                        remote: {
                            url: "/api/v1/auth/email",
                            type: "POST",
                            data: {
                                email: function () {
                                    return $("#email").val();
                                },
                                id: function () {
                                    return $scope.user.id;
                                }
                            }
                        }
                    },
                    password: {minlength: 6},
                    confirm_password: {equalTo: 'input[name="password"]'},
                }, messages: {email: {remote: 'Email address already registered.'}}
            });

            //check if form is valid or not
            if (!$('#user_form').valid())
                return;
            else {
                var form = $('form')[0]; 
                var data = new FormData(form);
                data.append('img', $('#file')[0].files[0]);
                $window.Pace.restart();
                $.ajax({
                    url: '/api/v1/user/update/' + $scope.user.id,
                    type: 'post',
                    data: data,
                    processData: false,
                    contentType: false,
                    headers: {'Authorization': 'Bearer ' + $scope.authData.token},
                    success: function (data) {
                        if (data) {
                            $scope.user = data.user;
                            Auth.setUserData(angular.copy(data.user));
                            $scope.$apply();
                            noty({layout: 'topLeft', type: 'success', timeout: 5000, text: 'Info saved successfully.'});
                        } else {
                            noty({layout: 'topLeft', type: 'error', timeout: 5000, text: 'User information invalid!'});
                        }
                        $('#user').modal('toggle');
                    },
                    error: function (c) {
                        noty({layout: 'topLeft', type: 'error', timeout: 5000, text: "Server can't save the info now"});
                    }
                });
            }
        }
    }
]);