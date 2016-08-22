<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use Illuminate\Http\Request;
use Auth;
use Storage;

class UserController extends Controller {

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct() {
        $this->middleware('jwt.auth');
    }

    /**
     * Get users for managing timezones || managing users info.
     *
     * @return \Illuminate\Http\Response
     */
    public function get_users() {
        //Get authenticated user
        $user = Auth::user();

        //Check user role to get appropriate users group 
        if ($user->hasRole('admin')) {
            $users = \App\User::where('id', '!=', $user->id)->with('roles')->get()->keyBy('id');
            $roles = \App\Role::all();
        } else if ($user->hasRole('user-manager')) {
            $users = \App\User::where('id', '!=', $user->id)->whereHas('roles', function ($query) {
                        $query->whereNotIn('name', ['admin', 'user-manager']);
                    })->get()->keyBy('id');
            $roles = \App\Role::whereNotIn('name', ['admin', 'user-manager'])->get();
        } else {
            return response()->json(['authorized' => false, 'error' => 'unauthorized action'], 401);
        }

        //Return the retrieved users
        $authorized = true;
        return response()->json(compact('authorized', 'users', 'roles'));
    }

    /**
     * Save || Update user info.
     *
     * @return \Illuminate\Http\Response
     */
    public function update_user(Request $request, $id) {
        //Get authenticated user
        $authUser = Auth::user();

        //Check if creating a new user
        if (intval($id)) {
            $user = \App\User::findOrFail($id);
        } else if ($authUser->hasRole(['admin', 'user-manager'])) {
            $user = $this->save_user('null', $request->all());
            $updated = true;
            //Return the saved user
            return response()->json(compact('updated', 'user'));
        }

        //Check authenticated user role
        if ($authUser->hasRole('admin') ||
                ($authUser->hasRole('user-manager') && !$user->hasRole(['admin', 'user-manager'])) ||
                $authUser->id == $id) {

            $user = $this->save_user($id, $request->all());
            $updated = true;
            //Return the saved user
            return response()->json(compact('updated', 'user'));
        } else {
            return response()->json(['updated' => false, 'error' => 'unauthorized action'], 401);
        }
    }

    /**
     * Delete a user from the database.
     *
     * @return \Illuminate\Http\Response
     */
    public function delete_user(Request $request, $id) {
        //Get authenticated user
        $authUser = Auth::user();

        //Get the user to delete
        $user = \App\User::findOrFail($id);

        //Check authenticated user role
        if ($authUser->hasRole('admin') ||
                ($authUser->hasRole('user-manager') && !$user->hasRole(['admin', 'user-manager']))) {

            $user->roles()->sync([]);
            $user->delete();

            return response()->json(['deleted' => true]);
        } else {
            return response()->json(['deleted' => false, 'error' => 'unauthorized action'], 401);
        }
    }

    /**
     * A helper function that creates or updates user data
     * 
     * @param integer $id
     * @param array $data
     * @return App\User $user
     */
    protected function save_user($id, $data) {
        //encrypt password if set
        if (!empty($data['password']))
            $data['password'] = bcrypt($data['password']);
        else
            unset($data['password']);

        //check if creating new user or updating an existing one
        if ($id == 'null') {
            $user = new \App\User;
            $user->fill($data);
            $user->save();
        } else {
            $user = \App\User::findOrFail($id);
            $user->update($data);
        }

        //find user's role
        if (isset($data['role'])) {
            $role = \App\Role::findOrFail($data['role']);
            $user->roles()->sync([$role->id]);
        }

        //update user's image
        if (isset($data['img']) && $data['img'] != 'undefined') {
            $image = $data['img'];
            $res = fopen($image->path(), 'r+');
            $filename = md5($user->id) . '/' . $image->getClientOriginalName();
            Storage::disk('profiles')->put($filename, $res);
            $user->img = 'profiles/' . $filename;
            $user->save();
        }


        $user->load('roles');
        return $user;
    }

}
