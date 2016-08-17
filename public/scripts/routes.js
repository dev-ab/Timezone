app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        //Set default route for unkown routes
        $urlRouterProvider.otherwise("/");

        $stateProvider
                //Define header route and controller setup
                .state('root', {
                    url: '',
                    abstract: true,
                    views: {
                        'header': {
                            templateUrl: 'partials/header.html',
                            controller: function ($scope, Auth) {
                                //Update header view if user authentication status changes
                                $scope.$watch(function () {
                                    return Auth.getData();
                                }, function (value) {
                                    $scope.user = value.user;
                                    $scope.token = value.token;
                                }
                                );

                                //Logout the user
                                $scope.logout = function () {
                                    Auth.logout()
                                };
                            }
                        }
                    }
                })
                //Set up home route and controller
                .state('root.home', {
                    url: '/',
                    views: {
                        'container@': {
                            templateUrl: 'partials/home.html',
                            controller: 'TimezoneController'
                        }
                    }
                })
                //Set up login route and controller
                .state('root.login', {
                    url: '/login',
                    views: {
                        'container@': {
                            templateUrl: 'partials/login.html',
                            controller: 'AuthController'
                        }
                    }
                })
                //Set up registeration route and controller
                .state('root.register', {
                    url: '/register',
                    views: {
                        'container@': {
                            templateUrl: 'partials/register.html',
                            controller: 'AuthController'
                        }
                    }
                });
    }
]);