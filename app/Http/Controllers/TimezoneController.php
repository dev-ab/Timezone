<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use Illuminate\Http\Request;
use JavaScript;

class TimezoneController extends Controller {

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct() {
        //$this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index() {

        JavaScript::put([
            "gmt_time" => (strtotime(gmdate('Y-m-d H:i:s'))) * 1000,
        ]);
        return view('home');
    }

}
