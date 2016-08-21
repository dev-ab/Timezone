var app = angular.module('MyApp', [
    'ngStorage',
    'ui.router',
    'ds.clock'
]).constant('urls', {
    BASE: 'http://timezone.localhost',
    BASE_API: 'http://timezone.localhost/api/v1'
}).run(function ($rootScope, $location, $localStorage, $state, Auth) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        //Retrieve authentication data
        var data = Auth.getData();
        //Define public states
        var public_states = ['root.login', 'root.register'];
        
        //alert(toState.name);
        //Check for restricted and private states for redirection
        if (public_states.indexOf(toState.name) == -1 && !data.token) {
            $state.transitionTo('root.login');
            event.preventDefault();
        } else if ((public_states.indexOf(toState.name) != -1 && data.token) ||
                (toState.name == 'root.timezone' && data.roles.indexOf('admin') <= -1) ||
                (toState.name == 'root.user' && data.roles.indexOf('admin') <= -1 && data.roles.indexOf('user-manager') <= -1)) {
            $state.transitionTo('root.home');
            event.preventDefault();
        }
    });
});

//Page title directive to update the title
app.directive('updateTitle', ['$rootScope', '$timeout',
    function ($rootScope, $timeout) {
        return {
            link: function (scope, element) {

                var listener = function (event, toState) {

                    var title = 'Timezone - Home';
                    if (toState.data && toState.data.pageTitle)
                        title = toState.data.pageTitle;

                    $timeout(function () {
                        element.text(title);
                    }, 0, false);
                };

                $rootScope.$on('$stateChangeSuccess', listener);
            }
        };
    }
]);