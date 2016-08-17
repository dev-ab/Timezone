app.controller('TimezoneController', ['$scope', '$compile', '$window', '$localStorage', '$state', 'Auth',
    function ($scope, $compile, $window, $localStorage, $state, Auth) {
        //Check User authenticated
        Auth.checkAuth(function () {
        }, function () {
            $state.go('root.login');
        });

        //Loads Timezones Data
        $scope.timezones = {};
        $scope.loadTimezones = function () {
            $.ajax({
                url: '/get-timezones',
                type: 'get',
                headers: {'Authorization': 'Bearer ' + $localStorage.token},
                success: function (data) {
                    console.log(JSON.stringify(data));
                    $scope.timezones = data.timezones;
                    $scope.gmt_time = data.gmt_time;
                    $('#clock').html($compile("<ds-widget-clock class='pull-right' theme='blue-light' show-digital start-time='gmt_time' gmt-offset=\"'0'\" digital-format=\"'EEEE MMMM d,yyyy hh:mm:ss a'\"></ds-widget-clock>")($scope));
                    $scope.$apply();
                }, error: function (res) {
                    console.log(res.responseText);
                    $('#clock').html('<span class="pull-right" style="font-size: 14px;color:red;">Failed to load time.</span>');
                }
            });
        }

        //Get time for a certain timezone
        $scope.getgmttime = function (diff) {
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

        //Prepares form data for adding a new timezone
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
            $scope.timezone = $scope.timezones[id];
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

            $.ajax({
                url: '/update-timezone/' + $scope.timezone.id,
                type: 'post',
                data: $('#timezone_form').serialize(),
                headers: {'Authorization': 'Bearer ' + $localStorage.token},
                success: function (data) {
                    console.log(JSON.stringify(data));
                    if (data) {
                        $scope.gmt_time = data.gmt_time;
                        $scope.timezones[data.timezone.id] = data.timezone;
                        noty({layout: 'topLeft', type: 'success', timeout: 5000, text: 'Timezone saved successfully.'});
                    } else {
                        noty({layout: 'topLeft', type: 'error', timeout: 5000, text: 'Timezone information invalid!'});
                    }
                    $('#timezone').modal('toggle');
                },
                error: function (c) {
                    console.log(c.responseText);
                    noty({layout: 'topLeft', type: 'error', timeout: 5000, text: "Server can't save the timezone now"});
                }
            });
        }

        //Delete a timezone
        $scope.deleteTimezone = function (id) {
            if (!confirm('Are you sure you want to delete "' + $scope.timezones[id].name + '" timezone?'))
                return;
            $.ajax({
                url: '/delete-timezone/' + id,
                type: 'get',
                headers: {'Authorization': 'Bearer ' + $localStorage.token},
                success: function (data) {
                    console.log(JSON.stringify(data));
                    delete $scope.timezones[id];
                    noty({layout: 'topLeft', type: 'success', timeout: 5000, text: 'Timezone deleted successfully.'});
                },
                error: function (c) {
                    console.log(c.responseText);
                    noty({layout: 'topLeft', type: 'error', timeout: 5000, text: "Server can't register user now"});
                }
            });
        }

        //Perform lazy loading of required view data
        setTimeout(function () {
            $scope.loadTimezones();
        }, 1000);
    }]);