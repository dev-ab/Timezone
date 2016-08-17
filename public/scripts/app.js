var app = angular.module('MyApp', [
    'ngStorage',
    'ui.router',
    'ds.clock'
]).constant('urls', {
    BASE: 'http://timezone.localhost',
    BASE_API: 'http://timezone.localhost/api/v1'
}).run(function ($rootScope, $location, $localStorage, $state, Auth) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

        var data = Auth.getData();
        var public_states = ['root.login', 'root.register'];

        if (public_states.indexOf(toState.name) == -1 && !data.token) {
            $state.go('root.login');
        } else if (public_states.indexOf(toState.name) != -1 && data.token) {
            $state.go('root.home');
        }
    });
    /*$rootScope.$on("$routeChangeStart", function (event, next) {
     if ($localStorage.token == null) {
     if (next.templateUrl === "partials/restricted.html") {
     $location.path("/signin");
     }
     }
     });*/
});