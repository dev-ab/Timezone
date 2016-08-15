app.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
        $routeProvider.
                when('/', {
                    templateUrl: 'partials/home.html',
                    controller: 'HomeController'
                }).
                when('/login', {
                    templateUrl: 'partials/login.html',
                    controller: 'HomeController'
                }).
                when('/register', {
                    templateUrl: 'partials/register.html',
                    controller: 'HomeController'
                }).
                otherwise({
                    redirectTo: '/'
                });

        $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function ($q, $location, $localStorage) {
                return {
                    'request': function (config) {
                        config.headers = config.headers || {};
                        if ($localStorage.token) {
                            config.headers.Authorization = 'Bearer ' + $localStorage.token;
                        }
                        return config;
                    },
                    'responseError': function (response) {
                        if (response.status === 401 || response.status === 403) {
                            delete $localStorage.token;
                            $location.path('/login');
                        }
                        return $q.reject(response);
                    }
                };
            }]);
    }
]);