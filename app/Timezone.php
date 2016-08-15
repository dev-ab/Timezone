<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Timezone extends Model {

    protected $fillable = ['name', 'city_name', 'gmt_diff'];

    public function user() {
        return $this->belongsTo('App\User');
    }

}
