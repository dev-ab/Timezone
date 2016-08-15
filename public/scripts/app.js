var app = angular.module('MyApp', [
    'ui.bootstrap',
    'ngStorage',
    'ngRoute',
    'angular-loading-bar',
    'ds.clock'
]).constant('urls', {
    BASE: 'http://timezone.localhost',
    BASE_API: 'http://timezone.localhost/api/v1'
}).run(function ($rootScope, $location, $localStorage) {
    $rootScope.$on("$routeChangeStart", function (event, next) {
        if ($localStorage.token == null) {
            if (next.templateUrl === "partials/restricted.html") {
                $location.path("/signin");
            }
        }
    });
});

app.controller('HomeController', ['$scope', '$window', function ($scope, $window) {
        $scope.user = $window.user;
        $scope.gmt_time = $window.gmt_time;
        //$scope.gmtoff = -1.0;
    }]);