<?php

use Illuminate\Database\Seeder;
use App\Role;
use App\Permission;

class RolesSeeder extends Seeder {

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
        //Create admin role
        $admin = Role::create([
                    'name' => 'admin',
                    'display_name' => 'User Administrator',
                    'description' => 'User is allowed to manage and edit all records and users'
        ]);
        
        //Create user manager role
        $userManager = Role::create([
                    'name' => 'user-manager',
                    'display_name' => 'User Manager',
                    'description' => 'User is allowed to manage and edit unprivileged users'
        ]);
        
        //Create user role
        $user = Role::create([
                    'name' => 'user',
                    'display_name' => 'User',
                    'description' => 'User is allowed to manage and edit his own records'
        ]);
    }

}
