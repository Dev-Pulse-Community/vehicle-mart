<?php

namespace Modules\Vehicle\database\seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Modules\Vehicle\app\Models\Car;
use Modules\Vehicle\app\Models\Favorite;

class FavoriteSeeder extends Seeder
{
    public function run(): void
    {
        $carIds = Car::where('status', 'Available')->pluck('id');
        if ($carIds->isEmpty()) {
            return;
        }

        foreach (User::where('role', 'user')->get() as $user) {
            $count = fake()->numberBetween(0, 4);
            foreach ($carIds->random(min($count, $carIds->count())) as $carId) {
                Favorite::firstOrCreate(['user_id' => $user->id, 'car_id' => $carId]);
            }
        }
    }
}
