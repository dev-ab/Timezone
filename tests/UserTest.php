<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class UserTest extends TestCase {

    use WithoutMiddleware;

    /**
     * Test retrieving Users.
     *
     * @return void
     */
    public function testRetrievingUsers() {
        $data = $this->getUsers();

        $this->actingAs($data['admin'])->get('/api/v1/user/get')
                ->seeJsonStructure([
                    'authorized',
                    'users',
                    'roles',
        ]);
    }

    /**
     * Test updating Users.
     *
     * @return void
     */
    public function testUpdatingUsers() {
        $data = $this->getUsers();

        $this->actingAs($data['admin'])
                ->post('/api/v1/user/update/' . $data['user']->id, [
                    'name' => 'Adam Jones'])
                ->seeJson([
                    'updated' => true,
        ]);
    }

    /**
     * Test deleting Users.
     *
     * @return void
     */
    public function testDeletingUsers() {
        $data = $this->getUsers();
        $this->actingAs($data['admin'])
                ->get('/api/v1/user/delete/' . $data['user']->id)
                ->seeJson([
                    'deleted' => true,
        ]);
    }

    /**
     * Helper function to fetch users for testing
     * 
     * @return array
     */
    protected function getUsers() {
        //Get admin user for testing
        $admin = \App\User::whereHas('roles', function($query) {
                    $query->where('name', 'admin');
                })->get()[0];
        //Get regular user for testing
        $user = \App\User::orderBy('id', 'desc')->first();

        return compact('admin', 'user');
    }

}
