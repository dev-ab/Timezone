app.service('Auth', ['$rootScope', '$localStorage', '$state', function ($rootScope, $localStorage, $state) {
        //Initialize Authentication data 
        var authData = {token: $localStorage.token, user: $localStorage.user, roles: $localStorage.roles};

        return {
            //Check if user is authenticated on the server or if token has expired
            checkAuth: function (success, error) {
                Pace.restart();
                $.ajax({
                    url: '/api/v1/auth/check',
                    type: 'get',
                    headers: {'Authorization': 'Bearer ' + $localStorage.token},
                    success: function (data) {
                        success();
                    },
                    error: function (c) {
                        delete $localStorage.token;
                        delete $localStorage.user;
                        delete $localStorage.roles;
                        authData = {};
                        error();
                    }
                });
            },
            //Attempt a login using given credentials
            login: function (credentials) {
                Pace.restart();
                $.ajax({
                    url: '/api/v1/auth/login',
                    type: 'post',
                    data: credentials,
                    success: function (data) {
                        $localStorage.token = data.token;
                        $localStorage.user = data.user;
                        $localStorage.roles = data.roles;
                        authData = {token: data.token, user: data.user, roles: data.roles};
                        noty({layout: 'topLeft', type: 'success', timeout: 5000, text: 'Logged in successfully'});
                        $state.go('root.home');
                    },
                    error: function (c) {
                        noty({layout: 'topLeft', type: 'error', timeout: 5000, text: 'Wrong credentials'});
                    }
                });
            },
            //Attempt registering a new user
            register: function (userData) {
                Pace.restart();
                $.ajax({
                    url: '/api/v1/auth/register',
                    type: 'post',
                    data: userData,
                    success: function (data) {
                        if (data) {
                            noty({layout: 'topLeft', type: 'success', timeout: 5000, text: 'Registered successfully'});
                            $state.go('root.login');
                        } else {
                            noty({layout: 'topLeft', type: 'error', timeout: 5000, text: 'User information invalid!'});
                        }

                    },
                    error: function (c) {
                        noty({layout: 'topLeft', type: 'error', timeout: 5000, text: "Server can't register user now"});
                    }
                });
            },
            //Logout the user
            logout: function (success) {
                authData = {};
                delete $localStorage.token;
                delete $localStorage.user;
                delete $localStorage.roles;
                noty({layout: 'topLeft', type: 'success', timeout: 5000, text: 'Logged out successfully'});
                $state.go('root.login');
            },
            //Get the authentication data
            getData: function () {
                return authData;
            },
            //Set user data
            setUserData: function (user) {
                authData = {};
                $localStorage.user = user;
                authData = {token: $localStorage.token, user: $localStorage.user, roles: $localStorage.roles};
            },
        };
    }]);