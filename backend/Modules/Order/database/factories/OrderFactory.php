<?php

namespace Modules\Order\database\factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Order\app\Models\Order;

class OrderFactory extends Factory
{
    protected $model = Order::class;

    public function definition(): array
    {
        $purchasedAt = $this->faker->dateTimeBetween('-18 months', 'now');

        return [
            'order_number' => 'ORD-' . $this->faker->unique()->numberBetween(1000, 9999),
            'user_id' => 1, // overridden by the seeder
            'car_id' => null,
            'car_name' => 'Unknown Vehicle',
            'price' => $this->faker->numberBetween(15000, 90000),
            'status' => $this->faker->randomElement(['Completed', 'Completed', 'Completed', 'Processing', 'Cancelled']),
            'purchased_at' => $purchasedAt->format('Y-m-d'),
        ];
    }
}
