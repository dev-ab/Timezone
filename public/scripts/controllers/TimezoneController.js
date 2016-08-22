app.controller('TimezoneController', ['$scope', '$compile', '$window', '$state', 'Auth',
    function ($scope, $compile, $window, $state, Auth) {
        //Check User authenticated (to check token expiration on the server)
        Auth.checkAuth(function () {
        }, function () {
            $state.go('root.login');
        });

        //Load Authentication data
        $scope.authData = Auth.getData();

        //load users data for managing users timezones
        $scope.user = {};
        $scope.users = [];
        $scope.loadUsers = function () {
            $window.Pace.restart();
            $.ajax({
                url: '/api/v1/user/get',
                type: 'get',
                headers: {'Authorization': 'Bearer ' + $scope.authData.token},
                success: function (data) {
                    $scope.users = data.users;
                    $scope.$apply();
                }, error: function (res) {
                }
            });
        }

        //Select user to manage timezones for
        $scope.selectUser = function () {
            if (!$scope.selectedUser) {
                $scope.user = {};
                return;
            }
            $scope.user = $scope.users[$scope.selectedUser];
            $scope.loadTimezones();
        }

        //Loads Timezones Data
        $scope.timezones = {};
        $scope.loadTimezones = function () {
            $window.Pace.restart();
            $.ajax({
                url: '/api/v1/timezone/get/' + $scope.user.id,
                type: 'get',
                headers: {'Authorization': 'Bearer ' + $scope.authData.token},
                success: function (data) {
                    $scope.gmt_time = data.gmt_time;
                    $scope.timezones = data.timezones;
                    $('#clock').html($compile("<ds-widget-clock class='pull-right' theme='blue-light' show-digital start-time='gmt_time' gmt-offset=\"'0'\" digital-format=\"'EEEE MMMM d,yyyy hh:mm:ss a'\"></ds-widget-clock>")($scope));
                    $scope.$apply();
                }, error: function (res) {
                    $('#clock').html('<span class="pull-right" style="font-size: 14px;color:red;">Failed to load time.</span>');
                }
            });
        }

        //Get time for a certain timezone
        $scope.getGmtTime = function (diff) {
            var val = diff * 60 * 1000;
            val += $scope.gmt_time;
            return val;
        }

        //convert gmt difference to time format
        $scope.convertGmtDiff = function (value) {
            var sign = '-';
            if (value > 0)
                sign = '+';
            value = Math.abs(value);
            var hour = Math.floor(value / 60);
            var minute = (value % 60);
            if (hour < 10)
                hour = '0' + hour;
            if (minute < 10)
                minute = '0' + minute;
            return {sign: sign, hour: hour, minute: minute};
        }

        //prepare timezones array and the view data
        $scope.timezonesArray = function () {
            var array = $.map($scope.timezones, function (value, index) {
                var gmt = $scope.convertGmtDiff(value.gmt_diff);
                value.gmt = gmt.sign + gmt.hour + ':' + gmt.minute;
                return [value];
            });
            return array;
        }

        //Prepares form data for creating a new timezone
        $scope.addTimezone = function () {
            if (typeof $scope.validator != 'undefined')
                $scope.validator.resetForm();

            $scope.timezone = {id: 'null', sign: '+'};

            $('#timezone').modal('toggle');
        }

        //Prepares form data for editting a timezone
        $scope.editTimezone = function (id) {
            if (typeof $scope.validator != 'undefined')
                $scope.validator.resetForm();
            $scope.timezone = angular.copy($scope.timezones[id]);
            var gmt = $scope.convertGmtDiff($scope.timezones[id].gmt_diff);
            $scope.timezone.sign = gmt.sign;
            $scope.timezone.hour = gmt.hour;
            $scope.timezone.minute = gmt.minute;
            $('#timezone').modal('toggle');
        }


        //Save the new or edited timezone
        $scope.saveTimezone = function () {
            //form validation rules
            $scope.validator = $('#timezone_form').validate({
                rules: {
                    name: {required: true},
                    city_name: {required: true},
                    hour: {
                        digits: true,
                        min: 0,
                        max: 14
                    },
                    minute: {
                        digits: true,
                        min: 0,
                        max: 59
                    }
                }
            });
            if (!$('#timezone_form').valid())
                return;
            else {
                $window.Pace.restart();

                $.ajax({
                    url: '/api/v1/timezone/update/' + $scope.timezone.id + '/' + $scope.user.id,
                    type: 'post',
                    data: $('#timezone_form').serialize(),
                    headers: {'Authorization': 'Bearer ' + $scope.authData.token},
                    success: function (data) {
                        if (data) {
                            $scope.gmt_time = data.gmt_time;
                            if ($scope.timezones.length == 0)
                                $scope.timezones = {};
                            $scope.timezones[data.timezone.id] = angular.copy(data.timezone);
                            $scope.$apply();
                            noty({layout: 'topLeft', type: 'success', timeout: 5000, text: 'Timezone saved successfully.'});
                        } else {
                            noty({layout: 'topLeft', type: 'error', timeout: 5000, text: 'Timezone information invalid!'});
                        }
                        $('#timezone').modal('toggle');
                    },
                    error: function (c) {
                        noty({layout: 'topLeft', type: 'error', timeout: 5000, text: "Server can't save the timezone now"});
                    }
                });
            }
        }

        //Delete a timezone
        $scope.deleteTimezone = function (id) {
            noty({
                text: 'Are you sure you want to delete "' + $scope.timezones[id].name + '" timezone?',
                layout: 'topLeft',
                type: 'information',
                buttons: [
                    {addClass: 'btn btn-danger', text: 'Yes', onClick: function ($noty) {
                            $noty.close();
                            $window.Pace.restart();
                            $.ajax({
                                url: '/api/v1/timezone/delete/' + id,
                                type: 'get',
                                headers: {'Authorization': 'Bearer ' + $scope.authData.token},
                                success: function (data) {
                                    delete $scope.timezones[id];
                                    $scope.$apply();
                                    noty({layout: 'topLeft', type: 'success', timeout: 5000, text: 'Timezone deleted successfully.'});
                                },
                                error: function (c) {
                                    noty({layout: 'topLeft', type: 'error', timeout: 5000, text: "Server can't deletee timezone now"});
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
        if ($state.current.name == 'root.timezone') {
            setTimeout(function () {
                $scope.loadUsers();
            }, 1000);
        } else {
            setTimeout(function () {
                $scope.loadTimezones();
            }, 1000);
        }
    }]);