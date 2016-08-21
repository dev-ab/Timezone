app.controller('UserController', ['$scope', '$window', '$state', 'Auth',
    function ($scope, $window, $state, Auth) {
        //Check User authenticated (to check token expiration on the server)
        Auth.checkAuth(function () {
        }, function () {
            $state.go('root.login');
        });

        //Load Authentication data
        $scope.authData = Auth.getData();

        //load users data for managing users
        $scope.users = [];
        $scope.loadUsers = function () {
            $window.Pace.restart();
            $.ajax({
                url: '/get-users',
                type: 'get',
                headers: {'Authorization': 'Bearer ' + $scope.authData.token},
                success: function (data) {
                    console.log(JSON.stringify(data));
                    $scope.users = data.users;
                    $scope.roles = data.roles;
                    $scope.$apply();
                }, error: function (res) {
                    console.log(res.responseText);
                }
            });
        }

        //prepare users array and the view data
        $scope.usersArray = function () {
            var array = $.map($scope.users, function (value, index) {
                return [value];
            });
            return array;
        }

        //Prepares form data for creating a new user
        $scope.createUser = function () {
            if (typeof $scope.validator != 'undefined')
                $scope.validator.resetForm();
            $scope.cur_user = {id: 'null'};
            $('#user').modal('toggle');
        }

        //Prepares form data for editting a user
        $scope.editUser = function (id) {
            if (typeof $scope.validator != 'undefined')
                $scope.validator.resetForm();

            $scope.cur_user = angular.copy($scope.users[id]);
            $('#user').modal('toggle');
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
                            url: "/check-email",
                            type: "POST",
                            data: {
                                email: function () {
                                    return $("#email").val();
                                },
                                id: function () {
                                    return $scope.cur_user.id;
                                }
                            }
                        }
                    },
                    password: {minlength: 6},
                    confirm_password: {equalTo: 'input[name="password"]'},
                }, messages: {email: {remote: 'Email address already registered.'}}
            });

            //Check if adding a new user then require a password
            if ($scope.cur_user.id != 'null') {
                $('input[name="password"]').rules("remove", "required");
            } else {
                $('input[name="password"]').rules("add", "required");
            }

            //check if for is valid or not
            if (!$('#user_form').valid())
                return;
            else {
                $window.Pace.restart();
                $.ajax({
                    url: '/update-user/' + $scope.cur_user.id,
                    type: 'post',
                    data: $('#user_form').serialize(),
                    headers: {'Authorization': 'Bearer ' + $scope.authData.token},
                    success: function (data) {
                        console.log(JSON.stringify(data));
                        if (data) {
                            if ($scope.users.length == 0)
                                $scope.users = {};
                            $scope.users[data.user.id] = angular.copy(data.user);
                            $scope.$apply();
                            noty({layout: 'topLeft', type: 'success', timeout: 5000, text: 'User saved successfully.'});
                        } else {
                            noty({layout: 'topLeft', type: 'error', timeout: 5000, text: 'User information invalid!'});
                        }
                        $('#user').modal('toggle');
                    },
                    error: function (c) {
                        console.log(c.responseText);
                        noty({layout: 'topLeft', type: 'error', timeout: 5000, text: "Server can't save the user now"});
                    }
                });
            }
        }

        //Delete a user
        $scope.deleteUser = function (id) {
            noty({
                text: 'Are you sure you want to delete the user "' + $scope.users[id].name + '"?',
                layout: 'topLeft',
                type: 'information',
                buttons: [
                    {addClass: 'btn btn-danger', text: 'Yes', onClick: function ($noty) {
                            $noty.close();
                            $window.Pace.restart();
                            $.ajax({
                                url: '/delete-user/' + id,
                                type: 'get',
                                headers: {'Authorization': 'Bearer ' + $scope.authData.token},
                                success: function (data) {
                                    console.log(JSON.stringify(data));
                                    delete $scope.users[id];
                                    $scope.$apply();
                                    noty({layout: 'topLeft', type: 'success', timeout: 5000, text: 'User deleted successfully.'});
                                },
                                error: function (c) {
                                    console.log(c.responseText);
                                    noty({layout: 'topLeft', type: 'error', timeout: 5000, text: "Server can't delete user now"});
                                }
                            });
                        }
                    },
                    {addClass: 'btn btn-default', text: 'No', onClick: function ($noty) {
                            $noty.close();
                        }
                    }
                ]
            });
        }

        //Perform lazy loading of required view data
        setTimeout(function () {
            $scope.loadUsers();
        }, 1000);

    }
]);