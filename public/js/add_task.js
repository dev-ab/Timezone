app.controller('AddTaskController', ['$scope', '$window', function ($scope, $window) {

        $scope.task = $window.task;
        $scope.users = $window.users;
        $scope.processing = false;

        $scope.search = function () {

        }

        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        //Manage Departments
        $scope.addDepartment = function () {
            if ($scope.validator)
                $scope.validator.resetForm();
            $scope.department = {id: null, name: ''}
            $('#department').modal('toggle');
        }

        $scope.editDepartment = function (id) {
            if ($scope.validator)
                $scope.validator.resetForm();

            var go = true;
            angular.forEach($scope.departments, function (d, k) {
                if (go) {
                    if (d.id == id) {
                        $scope.department = angular.copy(d);
                        $scope.department.key = k;
                        go = false;
                    }
                }
            });
            $('#department').modal('toggle');
        }

        $scope.saveDepartment = function () {
            $scope.validator = $('#dep_form').validate({
                rules: {
                    name: {
                        required: true
                    },
                }
            });

            if (!$('#dep_form').valid())
                return;

            $scope.processing = true;
            $.ajax({
                url: '/departments/update-department/' + $scope.department.id,
                type: 'post',
                data: $('#dep_form').serialize(),
                success: function (data) {
                    console.log(JSON.stringify(data));
                    $scope.processing = false;
                    var new_dep = angular.copy($scope.department);
                    if ($scope.department.key != null) {
                        $scope.departments[$scope.department.key] = new_dep;
                    } else {
                        new_dep.id = data.id;
                        $scope.departments[$scope.departments.length] = new_dep;
                    }

                    $scope.$apply();
                    $('#department').modal('toggle');
                },
                error: function (c) {
                    console.log(c.responseText);
                    $scope.processing = false;
                    $scope.$apply();
                }
            });
        }

        $scope.deleteDepartment = function (id) {
            if (!confirm('Are you sure?'))
                return;
            $scope.processing = true;
            $.ajax({
                url: '/departments/delete-department/' + id,
                type: 'get',
                success: function (data) {
                    console.log(JSON.stringify(data));
                    $scope.processing = false;
                    var go = true;
                    angular.forEach($scope.departments, function (d, k) {
                        if (go) {
                            if (d.id == id) {
                                $scope.departments.splice(k, 1);
                                go = false;
                            }
                        }
                    });
                    $scope.$apply();
                },
                error: function (c) {
                    console.log(c.responseText);
                    $scope.processing = false;
                    $scope.$apply();
                }
            });
        }

        //Manage Categories
        $scope.addCategory = function () {
            if ($scope.validator)
                $scope.validator.resetForm();
            $scope.category = {id: null, name: ''}
            $('#category').modal('toggle');
        }

        $scope.editCategory = function (id) {
            if ($scope.validator)
                $scope.validator.resetForm();
            var go = true;
            angular.forEach($scope.categories, function (d, k) {
                if (go) {
                    if (d.id == id) {
                        $scope.category = angular.copy(d);
                        $scope.category.key = k;
                        go = false;
                    }
                }
            });
            $('#category').modal('toggle');
        }

        $scope.saveCategory = function () {
            $scope.validator = $('#cat_form').validate({
                rules: {
                    name: {
                        required: true
                    },
                    department: {
                        required: true
                    },
                    type: {
                        required: true
                    },
                }
            });

            if (!$('#cat_form').valid())
                return;

            $scope.processing = true;
            $.ajax({
                url: '/categories/update-category/' + $scope.category.id,
                type: 'post',
                data: $('#cat_form').serialize(),
                success: function (data) {
                    console.log(JSON.stringify(data));
                    $scope.processing = false;
                    var new_cat = angular.copy($scope.category);

                    var result = $.grep($scope.departments, function (e) {
                        return e.id == new_cat.department.id;
                    });

                    if (result.length > 0)
                        new_cat.department = result[0];


                    if ($scope.category.key != null) {
                        $scope.categories[$scope.category.key] = new_cat;
                    } else {
                        new_cat.id = data.id;
                        $scope.categories[$scope.categories.length] = new_cat;
                    }

                    $scope.$apply();
                    $('#category').modal('toggle');
                },
                error: function (c) {
                    console.log(c.responseText);
                    $scope.processing = false;
                    $scope.$apply();
                }
            });
        }

        $scope.deleteCategory = function (id) {
            if (!confirm('Are you sure?'))
                return;
            $scope.processing = true;
            $.ajax({
                url: '/categories/delete-category/' + id,
                type: 'get',
                success: function (data) {
                    console.log(JSON.stringify(data));
                    $scope.processing = false;
                    var go = true;
                    angular.forEach($scope.categories, function (d, k) {
                        if (go) {
                            if (d.id == id) {
                                $scope.categories.splice(k, 1);
                                go = false;
                            }
                        }
                    });
                    $scope.$apply();
                },
                error: function (c) {
                    console.log(c.responseText);
                    $scope.processing = false;
                    $scope.$apply();
                }
            });
        }

        //Manage Objectives

        $scope.getCats = function (dep_id) {
            var result = $.grep($scope.categories, function (e) {
                return e.department.id == dep_id;
            });
            return result;
        }

        $scope.addObjective = function () {
            if ($scope.validator)
                $scope.validator.resetForm();
            $scope.objective = {id: null}
            $('#objective').modal('toggle');
        }

        $scope.editObjective = function (id) {
            if ($scope.validator)
                $scope.validator.resetForm();
            var go = true;
            angular.forEach($scope.objectives, function (d, k) {
                if (go) {
                    if (d.id == id) {
                        $scope.objective = angular.copy(d);
                        $scope.objective.key = k;
                        go = false;
                    }
                }
            });
            $('#objective').modal('toggle');
        }

        $scope.saveObjective = function () {
            $scope.validator = $('#obj_form').validate({
                rules: {
                    name: {
                        required: true
                    },
                    description: {
                        required: true
                    },
                    department: {
                        required: true
                    },
                    category: {
                        required: true
                    },
                    points: {
                        required: true,
                        digits: true
                    },
                    points: {
                        required: true,
                        digits: true
                    },
                    minimum: {
                        required: true,
                        digits: true
                    },
                    message: {
                        required: true,
                    },
                }
            });

            if (!$('#obj_form').valid())
                return;

            $scope.processing = true;
            $.ajax({
                url: '/objectives/update-objective/' + $scope.objective.id,
                type: 'post',
                data: $('#obj_form').serialize(),
                success: function (data) {
                    console.log(JSON.stringify(data));
                    $scope.processing = false;
                    var new_obj = angular.copy($scope.objective);

                    var result = $.grep($scope.categories, function (e) {
                        return e.id == new_obj.category.id;
                    });

                    if (result.length > 0)
                        new_obj.category = result[0];


                    if ($scope.objective.key != null) {
                        $scope.objectives[$scope.objective.key] = new_obj;
                    } else {
                        new_obj.id = data.id;
                        $scope.objectives[$scope.objectives.length] = new_obj;
                    }

                    $scope.$apply();
                    $('#objective').modal('toggle');
                },
                error: function (c) {
                    console.log(c.responseText);
                    $scope.processing = false;
                    $scope.$apply();
                }
            });
        }

        $scope.deleteObjective = function (id) {
            if (!confirm('Are you sure?'))
                return;
            $scope.processing = true;
            $.ajax({
                url: '/objectives/delete-objective/' + id,
                type: 'get',
                success: function (data) {
                    console.log(JSON.stringify(data));
                    $scope.processing = false;
                    var go = true;
                    angular.forEach($scope.objectives, function (d, k) {
                        if (go) {
                            if (d.id == id) {
                                $scope.objectives.splice(k, 1);
                                go = false;
                            }
                        }
                    });
                    $scope.$apply();
                },
                error: function (c) {
                    console.log(c.responseText);
                    $scope.processing = false;
                    $scope.$apply();
                }
            });
        }
        //Manage Users

        $scope.addUser = function () {
            if ($scope.validator)
                $scope.validator.resetForm();
            $scope.user = {id: null}
            $('#user').modal('toggle');
        }

        $scope.editUser = function (id) {
            if ($scope.validator)
                $scope.validator.resetForm();
            var go = true;
            angular.forEach($scope.users, function (d, k) {
                if (go) {
                    if (d.id == id) {
                        $scope.user = angular.copy(d);
                        $scope.user.key = k;
                        go = false;
                    }
                }
            });
            $('#user').modal('toggle');
        }

        $scope.saveUser = function () {
            $scope.validator = $('#user_form').validate({
                rules: {
                    name: {
                        required: true
                    },
                    email: {
                        required: true,
                        email: true,
                    },
                    password: {
                        minlength: 6
                    },
                    confirm_password: {
                        equalTo: '#password'
                    },
                    department: {
                        required: true,
                    },
                }
            });

            if (!$('#user_form').valid())
                return;

            $scope.processing = true;
            $.ajax({
                url: '/users/update-user/' + $scope.user.id,
                type: 'post',
                data: $('#user_form').serialize(),
                success: function (data) {
                    console.log(JSON.stringify(data));
                    $scope.processing = false;
                    var new_user = angular.copy($scope.user);

                    var result = $.grep($scope.departments, function (e) {
                        return e.id == new_user.department.id;
                    });

                    if (result.length > 0)
                        new_user.department = result[0];


                    if ($scope.user.key != null) {
                        $scope.users[$scope.user.key] = new_user;
                    } else {
                        new_user.id = data.id;
                        $scope.users[$scope.users.length] = new_user;
                    }

                    $scope.$apply();
                    $('#user').modal('toggle');
                },
                error: function (c) {
                    console.log(c.responseText);
                    $scope.processing = false;
                    $scope.$apply();
                }
            });
        }

        $scope.deleteUser = function (id) {
            if (!confirm('Are you sure?'))
                return;
            $scope.processing = true;
            $.ajax({
                url: '/users/delete-user/' + id,
                type: 'get',
                success: function (data) {
                    console.log(JSON.stringify(data));
                    $scope.processing = false;
                    var go = true;
                    angular.forEach($scope.users, function (d, k) {
                        if (go) {
                            if (d.id == id) {
                                $scope.users.splice(k, 1);
                                go = false;
                            }
                        }
                    });
                    $scope.$apply();
                },
                error: function (c) {
                    console.log(c.responseText);
                    $scope.processing = false;
                    $scope.$apply();
                }
            });
        }
    }]);