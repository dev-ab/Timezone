<?php

/*
  |--------------------------------------------------------------------------
  | Application Routes
  |--------------------------------------------------------------------------
  |
  | Here is where you can register all of the routes for an application.
  | It's a breeze. Simply tell Laravel the URIs it should respond to
  | and give it the controller to call when that URI is requested.
  |
 */

//Route::auth();

/*
 * Home Route
 */
Route::get('/', 'TimeZoneController@index');

/*
 * Authentication & Registration Routes
 */
Route::get('check-auth', 'AuthController@check_auth');
Route::post('login', 'AuthController@login');
Route::post('register', 'AuthController@register');
Route::post('check-email', 'AuthController@check_email');

/*
 * Timezone Management Routes 
 */
Route::get('get-timezones/{id}', 'TimezoneController@get_timezones');
Route::post('update-timezone/{id}/{user_id}', 'TimezoneController@update_timezone');
Route::get('delete-timezone/{id}', 'TimezoneController@delete_timezone');

/*
 * User Management Routes
 */
Route::post('update-user/{id}', 'UserController@update_user');
Route::get('delete-user/{id}', 'UserController@delete_user');
Route::get('get-users', 'UserController@get_users');
