<?php

use Illuminate\Database\Seeder;

class UserSeeder extends Seeder {

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
        //Create admin user
        $admin = App\User::create(['name' => 'Abdou Habibi', 'email' => 'abdou@zwaar.org', 'password' => bcrypt('secret')]);
        $admin->roles()->attach(App\Role::where('name', 'admin')->get()[0]->id);
        
        //Create user manager
        $manager = App\User::create(['name' => 'John Doe', 'email' => 'john@email.com', 'password' => bcrypt('secret')]);
        $manager->roles()->attach(App\Role::where('name', 'user-manager')->get()[0]->id);
        
        //Create a regular user
        $user = App\User::create(['name' => 'Sam Smith ', 'email' => 'sam@email.com', 'password' => bcrypt('secret')]);
        $user->roles()->attach(App\Role::where('name', 'user')->get()[0]->id);
    }

}
