<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\Authentication\database\seeders\UserSeeder;
use Modules\Content\database\seeders\ContentSeeder;
use Modules\Inquiry\database\seeders\InquirySeeder;
use Modules\Order\database\seeders\OrderSeeder;
use Modules\Vehicle\database\seeders\CarSeeder;
use Modules\Vehicle\database\seeders\FavoriteSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database from the module seeders.
     * Order matters: users and cars first, then everything that references them.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            CarSeeder::class,
            FavoriteSeeder::class,
            OrderSeeder::class,
            ContentSeeder::class,
            InquirySeeder::class,
        ]);
    }
}
