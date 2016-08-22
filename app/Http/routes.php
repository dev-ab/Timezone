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
 * Api routes
 */
Route::group(['prefix' => 'api/v1'], function () {

    /*
     * Authentication & Registration Routes
     */
    Route::get('auth/check', 'AuthController@check_auth');
    Route::post('auth/login', 'AuthController@login');
    Route::post('auth/register', 'AuthController@register');
    Route::post('auth/email', 'AuthController@check_email');

    /*
     * Timezone Management Routes 
     */
    Route::get('timezone/get/{id}', 'TimezoneController@get_timezones');
    Route::post('timezone/update/{id}/{user_id}', 'TimezoneController@update_timezone');
    Route::get('timezone/delete/{id}', 'TimezoneController@delete_timezone');

    /*
     * User Management Routes
     */
    Route::post('user/update/{id}', 'UserController@update_user');
    Route::get('user/delete/{id}', 'UserController@delete_user');
    Route::get('user/get', 'UserController@get_users');
});
