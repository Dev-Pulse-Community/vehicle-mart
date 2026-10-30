<?php

namespace Modules\Authentication\database\seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            ['name' => 'Admin User', 'email' => 'admin@autodeal.com', 'password' => 'admin123', 'role' => 'admin', 'phone' => '(555) 010-0001', 'is_active' => true, 'joined' => '2024-01-15'],
            ['name' => 'John Doe', 'email' => 'john@example.com', 'password' => 'password123', 'role' => 'user', 'phone' => '(555) 010-0002', 'is_active' => true, 'joined' => '2025-03-22'],
            ['name' => 'Maria Garcia', 'email' => 'maria.garcia@gmail.com', 'password' => 'password123', 'role' => 'user', 'phone' => '(555) 010-0003', 'is_active' => true, 'joined' => '2025-08-10'],
            ['name' => 'Tom Becker', 'email' => 'tom.becker@outlook.com', 'password' => 'password123', 'role' => 'user', 'phone' => '(555) 010-0004', 'is_active' => false, 'joined' => '2026-01-05'],
            ['name' => 'Lisa Wong', 'email' => 'lisa.wong@yahoo.com', 'password' => 'password123', 'role' => 'user', 'phone' => '(555) 010-0005', 'is_active' => true, 'joined' => '2025-06-18'],
            ['name' => 'James Okafor', 'email' => 'j.okafor@gmail.com', 'password' => 'password123', 'role' => 'user', 'phone' => '(555) 010-0006', 'is_active' => true, 'joined' => '2025-11-02'],
            ['name' => 'Emma Larsson', 'email' => 'emma.larsson@icloud.com', 'password' => 'password123', 'role' => 'user', 'phone' => '(555) 010-0007', 'is_active' => true, 'joined' => '2026-02-14'],
            ['name' => 'Ahmed Hassan', 'email' => 'ahmed.hassan@gmail.com', 'password' => 'password123', 'role' => 'user', 'phone' => '(555) 010-0008', 'is_active' => true, 'joined' => '2026-04-30'],
            ['name' => 'Nicole Brown', 'email' => 'nicole.b.brown@outlook.com', 'password' => 'password123', 'role' => 'user', 'phone' => '(555) 010-0009', 'is_active' => true, 'joined' => '2026-06-21'],
            ['name' => 'Peter Kovacs', 'email' => 'p.kovacs@gmail.com', 'password' => 'password123', 'role' => 'user', 'phone' => '(555) 010-0010', 'is_active' => true, 'joined' => '2026-07-08'],
        ];

        foreach ($users as $data) {
            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => $data['password'],
                'role' => $data['role'],
                'phone' => $data['phone'],
                'is_active' => $data['is_active'],
                'has_login' => true,
            ]);

            // Backdate registrations so "member since" looks organic.
            $user->forceFill([
                'created_at' => $data['joined'] . ' ' . fake()->time('H:i:s'),
                'email_verified_at' => $data['joined'] . ' ' . fake()->time('H:i:s'),
            ])->save();
        }
    }
}
