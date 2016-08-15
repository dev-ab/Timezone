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
        $admin = Role::create([
                    'name' => 'admin',
                    'display_name' => 'User Administrator',
                    'description' => 'User is allowed to manage and edit other users'
        ]);


        $createPost = new Permission();
        $createPost->name = 'edit-user';
        $createPost->display_name = 'Create Posts'; // optional
        $createPost->description = 'create new blog posts'; // optional
        $createPost->save();

        $editUser = Permission::create([
                    'name' => 'edit-users',
                    'display_name' => 'Edit Users',
                    'description' => 'Edit existing users'
        ]);

        $admin->attachPermission([$editUser]);
    }

}
