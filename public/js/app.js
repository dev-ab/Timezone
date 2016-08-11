var app = angular.module('MyApp', ["ui.bootstrap"]);
app.controller('MainController', ['$scope', '$window', function ($scope, $window) {
        $scope.user = $window.user;
    }]);
app.run(function () {

});