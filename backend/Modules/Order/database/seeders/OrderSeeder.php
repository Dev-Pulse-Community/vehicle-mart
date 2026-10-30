<?php

namespace Modules\Order\database\seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Modules\Order\app\Models\Order;
use Modules\Vehicle\app\Models\Car;

class OrderSeeder extends Seeder
{
    /**
     * Build an 18-month sales history. Sold cars get real orders;
     * additional historic orders reference vehicles already off the lot.
     */
    public function run(): void
    {
        $customers = User::where('role', 'user')->pluck('id');
        if ($customers->isEmpty()) {
            return;
        }

        $orderNo = 1000;

        // Every car marked Sold in inventory gets a matching completed order.
        foreach (Car::where('status', 'Sold')->get() as $car) {
            Order::create([
                'order_number' => 'ORD-' . $orderNo++,
                'user_id' => $customers->random(),
                'car_id' => $car->id,
                'car_name' => "{$car->year} {$car->make} {$car->model}",
                'price' => $car->price,
                'status' => 'Completed',
                'purchased_at' => fake()->dateTimeBetween('-6 months', '-1 week')->format('Y-m-d'),
            ]);
        }

        // Historic sales spread over the past 18 months (cars no longer listed).
        $historic = [
            ['2021 Toyota Camry SE', 24500], ['2023 Honda CR-V EX', 31900],
            ['2022 Mazda CX-5 Touring', 27800], ['2020 Ford Explorer XLT', 29500],
            ['2023 Kia Sportage EX', 28900], ['2021 BMW X3 xDrive30i', 38700],
            ['2022 Toyota Tacoma TRD', 39900], ['2023 Hyundai Elantra SEL', 22400],
            ['2021 Chevrolet Traverse LT', 31200], ['2024 Subaru Crosstrek Premium', 28600],
            ['2020 Honda Pilot EX-L', 30100], ['2022 Volkswagen Tiguan SE', 26700],
            ['2023 Nissan Altima SV', 24900], ['2021 Jeep Grand Cherokee Limited', 35800],
            ['2024 Tesla Model 3 LR', 42800], ['2022 Audi Q5 Premium', 39400],
        ];

        for ($i = 0; $i < 90; $i++) {
            [$name, $basePrice] = fake()->randomElement($historic);
            $date = fake()->dateTimeBetween('-18 months', 'now');
            $isRecent = $date > now()->subWeeks(2);

            Order::create([
                'order_number' => 'ORD-' . $orderNo++,
                'user_id' => $customers->random(),
                'car_id' => null,
                'car_name' => $name,
                'price' => round($basePrice * fake()->randomFloat(2, 0.95, 1.05), -2),
                'status' => $isRecent
                    ? fake()->randomElement(['Processing', 'Completed'])
                    : fake()->randomElement(['Completed', 'Completed', 'Completed', 'Completed', 'Cancelled']),
                'purchased_at' => $date->format('Y-m-d'),
            ]);
        }
    }
}
