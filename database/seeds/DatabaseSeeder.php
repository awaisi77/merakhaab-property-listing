<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        Artisan::call('cms:plugin:activate', ['name' => 'real-estate']);

        $this->call(CurrencySeeder::class);
        $this->call(CategorySeeder::class);
        $this->call(FacilitySeeder::class);
        $this->call(PackageSeeder::class);
        $this->call(AccountSeeder::class);
    }
}
