<?php

namespace Modules\Inquiry\database\seeders;

use Illuminate\Database\Seeder;
use Modules\Inquiry\app\Models\Inquiry;
use Modules\Vehicle\app\Models\Car;

class InquirySeeder extends Seeder
{
    public function run(): void
    {
        $carIds = Car::where('status', 'Available')->pluck('id');

        $inquiries = [
            ['name' => 'Kevin Nguyen', 'email' => 'kevin.nguyen@gmail.com', 'phone' => '(555) 201-3345', 'department' => 'sales', 'car' => true, 'message' => 'Hi, is this car still available? I\'d like to schedule a test drive this Saturday morning if possible.', 'status' => 'contacted', 'days_ago' => 2],
            ['name' => 'Rachel Kim', 'email' => 'rachel.kim87@outlook.com', 'phone' => '(555) 887-2210', 'department' => 'finance', 'car' => true, 'message' => 'What would the monthly payment look like with $8,000 down and a 60-month term? My credit score is around 720.', 'status' => 'new', 'days_ago' => 1],
            ['name' => 'Carlos Mendez', 'email' => 'cmendez.work@yahoo.com', 'phone' => null, 'department' => 'sales', 'car' => true, 'message' => 'Does this vehicle have a clean title? Can you send me the inspection report and the vehicle history report?', 'status' => 'new', 'days_ago' => 1],
            ['name' => 'Emily Thompson', 'email' => 'emily.t@company.com', 'phone' => '(555) 445-9087', 'department' => 'sales', 'car' => false, 'message' => 'I\'m looking for a 3-row SUV under $40k for a family of six. What do you currently have in stock that fits?', 'status' => 'contacted', 'days_ago' => 3],
            ['name' => 'Daniel Foster', 'email' => 'dfoster22@gmail.com', 'phone' => '(555) 310-6721', 'department' => 'service', 'car' => false, 'message' => 'Do you service vehicles that weren\'t purchased at your dealership? I need a brake job and inspection on a 2021 Accord.', 'status' => 'closed', 'days_ago' => 6],
            ['name' => 'Sophia Martinez', 'email' => 'sophia.mtz@icloud.com', 'phone' => '(555) 590-1123', 'department' => 'sales', 'car' => true, 'message' => 'Would you take $2,000 below asking if I pay cash and pick it up this week?', 'status' => 'contacted', 'days_ago' => 4],
            ['name' => 'Brian Walsh', 'email' => 'bwalsh@constructco.com', 'phone' => '(555) 233-8876', 'department' => 'sales', 'car' => false, 'message' => 'Looking to buy 3 work trucks for my construction company. Do you offer fleet pricing or business financing?', 'status' => 'new', 'days_ago' => 0],
            ['name' => 'Aisha Mohammed', 'email' => 'aisha.m.dev@gmail.com', 'phone' => null, 'department' => 'finance', 'car' => false, 'message' => 'I\'m a first-time buyer with limited credit history. What financing options do you have for someone in my situation?', 'status' => 'new', 'days_ago' => 0],
        ];

        foreach ($inquiries as $item) {
            Inquiry::create([
                'name' => $item['name'],
                'email' => $item['email'],
                'phone' => $item['phone'],
                'department' => $item['department'],
                'car_id' => $item['car'] && $carIds->isNotEmpty() ? $carIds->random() : null,
                'message' => $item['message'],
                'status' => $item['status'],
                'created_at' => now()->subDays($item['days_ago'])->subHours(rand(1, 12)),
            ]);
        }
    }
}
