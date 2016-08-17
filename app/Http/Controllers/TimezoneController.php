<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use Illuminate\Http\Request;
use JavaScript;
use JWTAuth;
use Auth;

class TimezoneController extends Controller {

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct() {
        //Load the JWT middleware to authenticate users
        $this->middleware('jwt.auth', ['except' => ['index']]);
    }

    /**
     * Show user's editable timezones and the current time.
     *
     * @return \Illuminate\Http\Response
     */
    public function index() {
        return view('home');
    }

    /**
     * Get the timezones data from the database.
     *
     * @return \Illuminate\Http\Response
     */
    public function get_timezones(Request $request, $user_id = null) {
        $user = Auth::user();

        // Check if user has permission in case of viewing other users timezones
        if ($user_id && ($user->hasRole('admin') || $user->can('edit-timezones'))) {
            $user = \App\User::findOrFail($user_id);
        }

        $timezones = $user->timezones->keyBy('id');
        //Load server gmt time
        $gmt_time = (strtotime(gmdate('Y-m-d H:i:s')) ) * 1000;
        return response()->json(compact('timezones', 'gmt_time'));
    }

    /**
     * Performs the creation or updating of a timezone for the user
     *
     * @return \Illuminate\Http\Response
     */
    public function update_timezone(Request $request, $id, $user_id = null) {
        $user = Auth::user();
        $timezones = $user->timezones->pluck('id')->toArray();

        //Prepare timezone data
        $data = $request->all();
        $data['gmt_diff'] = $data['sign'] . ($data['hour'] * 60 + $data['minute']);

        // Add / Update the timezone for the logged in user
        if ((!$user_id && $id == 'null' ) || in_array($id, $timezones)) {
            $timezone = $this->save_timezone($id, $user, $data);
            $gmt_time = (strtotime(gmdate('Y-m-d H:i:s')) ) * 1000;
            return response()->json(compact('timezone', 'gmt_time'));
        }


        // Check if user has permission in case of editing other users timezones
        if (intval($user_id) && $user->hasRole('admin')) {
            // Add / Update the timezone to the assigned user 
            $user = \App\User::findOrFail($user_id);
            $timezone = $this->save_timezone($id, $user, $data);
            $gmt_time = (strtotime(gmdate('Y-m-d H:i:s')) ) * 1000;
            return response()->json(compact('timezone', 'gmt_time'));
        } else {
            return response()->json(['error' => 'unauthorized action'], 401);
        }
    }

    /**
     * Deletes a timezone ftom the database.
     *
     * @return \Illuminate\Http\Response
     */
    public function delete_timezone(Request $request, $id) {
        $user = Auth::user();
        $timezones = $user->timezones->pluck('id')->toArray();

        //Check if user has permission in case of editting other users timezones
        if (!in_array($id, $timezones) && !$user->hasRole('admin')) {
            return response()->json(['error' => 'unauthorized action'], 401);
        }

        $timezone = \App\Timezone::findOrFail($id);
        $timezone->delete();

        return response()->json([]);
    }

    /**
     * A helper function that creates or updates timezone data
     * 
     * @param integer $id
     * @param App\User $user
     * @param array $data
     */
    protected function save_timezone($id, $user, $data) {
        if ($id == 'null') {
            $timezone = new \App\Timezone;
            $timezone->fill($data);
            $timezone->user()->associate($user)->save();
        } else {
            $timezone = \App\Timezone::findOrFail($id);
            $timezone->update($data);
        }
        return $timezone;
    }

}
