<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use Illuminate\Http\Request;
use JWTAuth;
use Auth;
use Validator;

class AuthController extends Controller {

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct() {
        $this->middleware('jwt.auth', ['only' => ['check_auth']]);
    }

    /**
     * Check if user is authenticated.
     *
     * @return \Illuminate\Http\Response
     */
    public function check_auth(Request $request) {
        return response()->json(true);
    }

    /**
     * Log in user to the application.
     *
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request) {
        $credentials = $request->only('email', 'password');

        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(false, 401);
        }

        $user = Auth::user();
        $roles = $user->roles->pluck('name');

        return response()->json(compact('token', 'user', 'roles'));
    }

    /**
     * Register a new user.
     *
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request) {
        $user_data = $request->all();
        $validator = $this->validator($user_data);

        if ($validator->fails())
            return response()->json(false);

        $user_data['password'] = bcrypt($user_data['password']);
        $user = \App\User::create($user_data);
        $user->roles()->attach(\App\Role::where('name', 'user')->get()[0]->id);

        return response()->json(true);
    }

    /**
     * Check email address registered to a user.
     *
     * @return \Illuminate\Http\Response
     */
    public function check_email(Request $request) {
        $email = $request->input('email');
        $id = $request->input('id');

        $user = \App\User::where('id', '!=', $id)->where('email', $email)->get();

        if ($user->count() > 0)
            return response()->json(false);
        else
            return response()->json(true);
    }

    /**
     * Helper to get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data) {
        return Validator::make($data, [
                    'name' => 'required|max:255',
                    'email' => 'required|email|max:255|unique:users',
                    'password' => 'required|min:6',
        ]);
    }

}
