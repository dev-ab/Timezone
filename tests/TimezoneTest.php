<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class TimezoneTest extends TestCase {

    use WithoutMiddleware;

    /**
     * Test application home page
     *  
     * @return void
     */
    public function testApplication() {
        $response = $this->call('GET', '/');

        $this->assertEquals(200, $response->status());
    }

    /**
     * Test retrieving Timezones.
     *
     * @return void
     */
    public function testRetrievingTimeZones() {
        $data = $this->getUsers();

        $this->actingAs($data['admin'])->get('/api/v1/timezone/get/' . $data['user']->id)
                ->seeJsonStructure([
                    'timezones',
                    'gmt_time',
        ]);
    }

    /**
     * Test updating Timezones.
     *
     * @return void
     */
    public function testUpdatingTimeZones() {
        $data = $this->getUsers();

        $this->actingAs($data['admin'])
                ->post('/api/v1/timezone/update/null/' . $data['user']->id, [
                    'name' => 'USA', 'city_name' => 'Chicago', 'sign' => '+', 'hour' => 2, 'minute' => 30])
                ->seeJson([
                    'updated' => true,
        ]);
    }

    /**
     * Test deleting Timezones.
     *
     * @return void
     */
    public function testDeletingTimeZones() {
        $data = $this->getUsers();
        $timezone = App\Timezone::first();
        $this->actingAs($data['admin'])
                ->get('/api/v1/timezone/delete/' . $timezone->id)
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
        $user = \App\User::first();

        return compact('admin', 'user');
    }

}
