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
                                    $scope.roles = value.roles;
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
                //Set up login route and controller
                .state('root.login', {
                    url: '/login',
                    data: {pageTitle: 'Timezone - Login'},
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
                    data: {pageTitle: 'Timezone - Register'},
                    views: {
                        'container@': {
                            templateUrl: 'partials/register.html',
                            controller: 'AuthController'
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
                //Set up profile route and controller
                .state('root.account', {
                    url: '/account',
                    data: {pageTitle: 'Timezone - My Account'},
                    views: {
                        'container@': {
                            templateUrl: 'partials/account.html',
                            controller: 'AccountController',
                        }
                    }
                })
                //Set up timezones managing route and controller
                .state('root.timezone', {
                    url: '/manage-timezones',
                    data: {pageTitle: 'Timezone - Timezones Manager'},
                    views: {
                        'container@': {
                            templateUrl: 'partials/timezone.html',
                            controller: 'TimezoneController'
                        }
                    }
                })
                //Set up users managing route and controller
                .state('root.user', {
                    url: '/manage-users',
                    data: {pageTitle: 'Timezone - Users Manager'},
                    views: {
                        'container@': {
                            templateUrl: 'partials/user.html',
                            controller: 'UserController'
                        }
                    }
                })
                //Try CSV Files Handling
                .state('root.csv', {
                    url: '/manage-csv',
                    data: {pageTitle: 'Timezone - CSV Files'},
                    views: {
                        'container@': {
                            templateUrl: 'partials/csv.html',
                            controller: 'TimezoneController'
                        }
                    }
                });
    }]);