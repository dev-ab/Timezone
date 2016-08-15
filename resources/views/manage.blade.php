@extends('layouts.app')

@section('title', 'Manage')

@section('content')
<div role="main" class="main" ng-controller="ManageController">
    <section class="page-top">
        <div class="container">
            <div class="row">
                <div class="span12">
                    <ul class="breadcrumb">
                        <li><a href="{{url('/')}}">Home</a> <span class="divider">/</span></li>
                        <li class="active">Manage</li>
                    </ul>
                </div>
            </div>
            <div class="row">
                <div class="span12">
                    <h2><i class='icon icon-cogs'></i> Manage System</h2>
                </div>
            </div>
        </div>
    </section>
    <div class="container">
        <div class="row">
            <div class="span4">

                <h4><i class='icon icon-briefcase'></i> Departments</h4>

                <h4><a href="javascript:;" class="btn btn-success" ng-click="addDepartment()">
                        <i class="icon icon-plus-sign"></i> Add</a></h4>

                <table class="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>
                                Name
                            </th>
                            <th>                            
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr ng-repeat="dep in departments">
                            <td ng-bind="dep.id"></td>
                            <td ng-bind="dep.name"></td>
                            <td style="width:200px;">
                                <a class='btn btn-default' ng-click="editDepartment(dep.id)"><i class='icon icon-pencil'></i> Edit</a>
                                <a class='btn btn-danger' ng-click="deleteDepartment(dep.id)"><i class='icon icon-trash'></i> Delete</a>
                            </td>
                        </tr>
                        <tr ng-if="!departments.length"><td colspan="3" style="text-align: center;">No departments data</td></tr>
                    </tbody>
                </table>
            </div>
            <div class="span6 offset2">

                <h4><i class='icon icon-bookmark'></i> Categories</h4>

                <h4><a class="btn btn-success" title="Add Category" ng-click="addCategory()">
                        <i class="icon icon-plus-sign"></i> Add</a></h4>
                <select ng-change="" ng-model="cat_dep">
                    <option value="all">All Departments</option>
                    <option ng-repeat="dep in departments" ng-bind="dep.name" ng-value="dep.id" ng-selected="dep.id == cat_dep"></option>
                </select>

                <table class="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>
                                Name
                            </th>
                            <th>
                                Department
                            </th>
                            <th>
                                Type
                            </th>
                            <th>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr ng-repeat="cat in categories">
                            <td ng-bind="cat.id"></td>
                            <td ng-bind="cat.name"></td>
                            <td ng-bind="cat.department.name"></td>
                            <td ng-bind="cat.type.toUpperCase()"></td>
                            <td style="width:200px;">
                                <a class='btn btn-default' ng-click="editCategory(cat.id)"><i class='icon icon-pencil'></i> Edit</a>
                                <a class='btn btn-danger' ng-click="deleteCategory(cat.id)"><i class='icon icon-trash'></i> Delete</a>
                            </td>
                        </tr>
                        <tr ng-if="!categories.length"><td colspan="5" style="text-align: center;">No categories data</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
        <hr>
        <div class='row'>
            <div class="span12">
                <h4><i class='icon icon-list-ol'></i> Objectives</h4>

                <h4><a class="btn btn-success" title="Add Objective" ng-click="addObjective()">
                        <i class="icon icon-plus-sign"></i> Add</a></h4>
                <select ng-model="obj_dep">
                    <option value="all">All Departments</option>
                    <option ng-repeat="dep in departments" ng-bind="dep.name" ng-value="dep.id" ng-selected="dep.id == obj_dep"></option>
                </select>
                <select ng-model="obj_cat">
                    <option value="all">All Categories</option>
                    <option ng-repeat="cat in getCats(obj_dep)" ng-bind="cat.name" ng-value="cat.id" ng-selected="cat.id == obj_cat"></option>
                </select>
                <table class="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>
                                Department
                            </th>
                            <th>
                                Category
                            </th>
                            <th>
                                Name
                            </th>
                            <th>
                                Description
                            </th>
                            <th>
                                Points
                            </th>
                            <th>
                                Minimum
                            </th>
                            <th>
                                Message
                            </th>
                            <th>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr ng-repeat="obj in objectives">
                            <td ng-bind="obj.id"></td>
                            <td ng-bind="obj.category.department.name"></td>
                            <td ng-bind="obj.category.name"></td>
                            <td ng-bind="obj.name"></td>
                            <td ng-bind="obj.description"></td>
                            <td ng-bind="obj.points"></td>
                            <td ng-bind="obj.minimum"></td>
                            <td ng-bind="obj.message"></td>
                            <td style="width:200px;">
                                <a class='btn btn-default' ng-click="editObjective(obj.id)"><i class='icon icon-pencil'></i> Edit</a>
                                <a class='btn btn-danger' ng-click="deleteObjective(obj.id)"><i class='icon icon-trash'></i> Delete</a>
                            </td>
                        </tr>
                        <tr ng-if="!objectives.length"><td colspan="9" style="text-align: center;">No objectives data</td></tr>
                    </tbody>
                </table>
            </div>

        </div>
        <hr>
        <div class='row'>
            <div class="span8">
                <h4><i class='icon icon-user'></i> Users</h4>

                <h4><a class="btn btn-success" title="Add User" ng-click="addUser()">
                        <i class="icon icon-plus-sign"></i> Add</a></h4>

                <table class="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>
                                Name
                            </th>
                            <th>
                                Email
                            </th>
                            <th>
                                Department
                            </th>
                            <th>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr ng-repeat="usr in users">
                            <td ng-bind="usr.id"></td>
                            <td ng-bind="usr.name"></td>
                            <td ng-bind="usr.email"></td>
                            <td ng-bind="usr.department.name"></td>
                            <td style="width: 200px">
                                <a class='btn btn-default' ng-click="editUser(usr.id)"><i class='icon icon-pencil'></i> Edit</a>
                                <a class='btn btn-danger' ng-click="deleteUser(usr.id)"><i class='icon icon-trash'></i> Delete</a>
                            </td>
                        </tr>
                        <tr ng-if="!users.length"><td colspan="5" style="text-align: center;">No users data</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- Management Modals-->

    <div id="department" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h3 id="myModalLabel"><i class='icon icon-briefcase'></i> Add / Edit Department</h3>
        </div>
        <div class="modal-body">
            <form id='dep_form'>
                <input type="hidden" ng-model='department.id' name='id'>
                <div class="row controls">
                    <div class="span3 control-group">
                        <input type="text" ng-model='department.name' name='name' placeholder="Department name" class="span3">
                    </div>
                </div>
            </form>
        </div>
        <div class="modal-footer">
            <button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>
            <a ng-click="saveDepartment()" class="btn btn-primary">Save</a>
        </div>
    </div>

    <div id="category" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h3 id="myModalLabel"><i class='icon icon-bookmark'></i> Add / Edit Category</h3>
        </div>
        <div class="modal-body">
            <form id='cat_form'>
                <input type="hidden" ng-model='category.id' name='id'>
                <div class="row controls">
                    <div class="span3 control-group">
                        <input type="text" ng-model='category.name' name='name' placeholder="Category name" class="span3">
                    </div>
                    <div class="span3 control-group">
                        <select ng-model="category.department.id" name='department' class="span3">
                            <option value="">Select Department..</option>
                            <option ng-repeat="dep in departments" ng-bind="dep.name" ng-value="dep.id" ng-selected="dep.id == category.department.id"></option>
                        </select>
                    </div>
                    <div class="span3 control-group">
                        <select ng-model="category.type" name='type' class="span3">
                            <option value="">Select Type..</option>
                            <option ng-selected="category.type == 'task'" value="task">Task Related</option>
                            <option ng-selected="category.type == 'general'" value="general">General</option>
                        </select>
                    </div>
                </div>
            </form>
        </div>
        <div class="modal-footer">
            <button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>
            <a class="btn btn-primary" ng-click="saveCategory()">Save</a>
        </div>
    </div>

    <div id="objective" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h3 id="myModalLabel"><i class='icon icon-list-ol'></i> Add / Edit Objective</h3>
        </div>
        <div class="modal-body">
            <form id='obj_form'>
                <input type="hidden" ng-model='objective.id' name='id'>
                <div class="row controls">
                    <div class="span3 control-group">
                        <input type="text" ng-model='objective.name' name='name' placeholder="Objective name" class="span3">
                    </div>
                    <div class="span3 control-group">
                        <textarea type="text" ng-model='objective.description' name='description' placeholder="Objective description" class="span3"></textarea>
                    </div>
                    <div class="span3 control-group">
                        <select ng-model="objective.category.department.id" name='department' class="span3">
                            <option value="">Select Department..</option>
                            <option ng-repeat="dep in departments" ng-bind="dep.name" ng-value="dep.id" ng-selected="dep.id == objective.category.department.id"></option>
                        </select>
                    </div>
                    <div class="span3 control-group">
                        <select ng-model="objective.category.id" name='category' class="span3">
                            <option value="">Select Category..</option>
                            <option ng-repeat="cat in getCats(objective.category.department.id)" ng-bind="cat.name" ng-value="cat.id" ng-selected="cat.id == objective.category.id"></option>
                        </select>
                    </div>
                    <div class="span3 control-group">
                        <input type="text" ng-model='objective.points' name='points' placeholder="Points" class="span3">
                    </div>
                    <div class="span3 control-group">
                        <input type="text" ng-model='objective.minimum' name='minimum' placeholder="Minimum points" class="span3">
                    </div>
                    <div class="span3 control-group">
                        <input type="text" ng-model='objective.message' name='message' placeholder="Failure Message" class="span3">
                    </div>
                </div>
            </form>
        </div>
        <div class="modal-footer">
            <button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>
            <a class="btn btn-primary" ng-click="saveObjective()">Save</a>
        </div>
    </div>

    <div id="user" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h3 id="myModalLabel"><i class='icon icon-user'></i> Add / Edit User</h3>
        </div>
        <div class="modal-body">
            <form id='user_form'>
                <input type="hidden" ng-model='user.id' name='id'>
                <div class="row controls">
                    <div class="span3 control-group">
                        <input type="text" ng-model='user.name' name='name' placeholder="User name" class="span3">
                    </div>
                    <div class="span3 control-group">
                        <input type="email" ng-model='user.email' name='email' placeholder="Email address" class="span3">
                    </div>
                    <div class="span3 control-group">
                        <input id="password" type="password" name='password' placeholder="New password" class="span3">
                    </div>
                    <div class="span3 control-group">
                        <input type="password" name='confirm_password' placeholder="Confirm password" class="span3">
                    </div>
                    <div class="span3 control-group">
                        <select ng-model="user.department.id" name='department' class="span3">
                            <option value="">Select Department..</option>
                            <option ng-repeat="dep in departments" ng-bind="dep.name" ng-value="dep.id" ng-selected="dep.id == user.department.id"></option>
                        </select>
                    </div>
                    <div class="span3 control-group">
                        <lable><input type="checkbox" value="1" ng-checked="user.superAdmin" name='superAdmin'>  Super admin</lable>
                    </div>
                </div>
            </form>
        </div>
        <div class="modal-footer">
            <button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>
            <a class="btn btn-primary" ng-click="saveUser()">Save</a>
        </div>
    </div>
</div>
@endsection

@section('controller')
<script src="vendor/jquery-validation/jquery.validate.min.js"></script>
<script src="js/manage.js"></script>
@endsection
