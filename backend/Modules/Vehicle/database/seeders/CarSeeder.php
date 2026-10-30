<?php

namespace Modules\Vehicle\database\seeders;

use Illuminate\Database\Seeder;
use Modules\Vehicle\app\Models\Car;

class CarSeeder extends Seeder
{
    /**
     * Curated showcase listings (mirrors the storefront's featured stock),
     * plus factory-generated inventory for volume.
     */
    public function run(): void
    {
        $img = fn (string $id) => "https://images.unsplash.com/{$id}?auto=format&fit=crop&w=1200&q=70";

        $showcase = [
            [
                'make' => 'BMW', 'model' => 'M4 Competition', 'year' => 2024, 'price' => 84900,
                'mileage' => 3200, 'body_type' => 'Coupe', 'fuel' => 'Petrol', 'transmission' => 'Automatic',
                'engine' => '3.0L Twin-Turbo I6', 'drivetrain' => 'RWD', 'exterior_color' => 'Alpine White',
                'interior_color' => 'Black Merino', 'doors' => 2, 'seats' => 4, 'vin' => 'WBS33AZ01RCK12341',
                'condition' => 'Used', 'featured' => true, 'status' => 'Available',
                'images' => [$img('photo-1617531653332-bd46c24f2068'), $img('photo-1555215695-3004980ad54e')],
                'features' => ['Adaptive M Suspension', 'Harman Kardon Audio', 'Head-Up Display', 'Carbon Fiber Trim', 'Heated Seats', '360° Camera'],
                'description' => 'A near-new M4 Competition with the full M Driver\'s Package. Carbon bucket seats, laser headlights, and a dealer-fitted M Performance exhaust. One owner, full BMW service history.',
            ],
            [
                'make' => 'Mercedes-Benz', 'model' => 'C300 AMG Line', 'year' => 2023, 'price' => 52500,
                'mileage' => 12800, 'body_type' => 'Sedan', 'fuel' => 'Petrol', 'transmission' => 'Automatic',
                'engine' => '2.0L Turbo I4', 'drivetrain' => 'AWD', 'exterior_color' => 'Obsidian Black',
                'interior_color' => 'Macchiato Beige', 'doors' => 4, 'seats' => 5, 'vin' => 'W1KAF4HB1PR123402',
                'condition' => 'Certified', 'featured' => true, 'status' => 'Available',
                'images' => [$img('photo-1618843479313-40f8afb4b4d8'), $img('photo-1503376780353-7e6692767b70')],
                'features' => ['Panoramic Sunroof', 'Burmester 3D Sound', 'MBUX Navigation', 'Wireless Charging', 'Blind Spot Assist', 'Memory Seats'],
                'description' => 'Elegant C300 with the AMG Line exterior and premium plus package. Panoramic roof, Burmester 3D sound and Digital Light headlamps. Certified pre-owned with warranty until 2027.',
            ],
            [
                'make' => 'Audi', 'model' => 'Q7 55 TFSI', 'year' => 2024, 'price' => 71200,
                'mileage' => 6500, 'body_type' => 'SUV', 'fuel' => 'Petrol', 'transmission' => 'Automatic',
                'engine' => '3.0L V6 TFSI', 'drivetrain' => 'AWD', 'exterior_color' => 'Glacier White',
                'interior_color' => 'Okapi Brown', 'doors' => 5, 'seats' => 7, 'vin' => 'WA1LXBF70RD123403',
                'condition' => 'Used', 'featured' => true, 'status' => 'Available',
                'images' => [$img('photo-1606664515524-ed2f786a0bd6'), $img('photo-1614026480209-cd9934144671')],
                'features' => ['Adaptive Air Suspension', 'Bang & Olufsen Audio', 'Virtual Cockpit', '7 Seats', 'Tow Package', 'Matrix LED Headlights'],
                'description' => 'Seven-seat luxury with quattro all-wheel drive. Adaptive air suspension, Bang & Olufsen audio and the full driver assistance package. Ideal family flagship.',
            ],
            [
                'make' => 'Toyota', 'model' => 'RAV4 Hybrid XLE', 'year' => 2023, 'price' => 33900,
                'mileage' => 18400, 'body_type' => 'SUV', 'fuel' => 'Hybrid', 'transmission' => 'CVT',
                'engine' => '2.5L Hybrid I4', 'drivetrain' => 'AWD', 'exterior_color' => 'Silver Sky',
                'interior_color' => 'Black Fabric', 'doors' => 5, 'seats' => 5, 'vin' => 'JTMB6RFV1PD123404',
                'condition' => 'Used', 'featured' => false, 'status' => 'Available',
                'images' => [$img('photo-1568605117036-5fe5e7bab0b7'), $img('photo-1533473359331-0135ef1b58bf')],
                'features' => ['Toyota Safety Sense 2.5', 'Apple CarPlay', 'Android Auto', 'Dual-Zone Climate', 'Power Liftgate', 'Adaptive Cruise'],
                'description' => '41 MPG combined and Toyota reliability. One owner, clean history report, remaining factory hybrid battery warranty until 2033.',
            ],
            [
                'make' => 'Tesla', 'model' => 'Model 3 Long Range', 'year' => 2024, 'price' => 42800,
                'mileage' => 8900, 'body_type' => 'Sedan', 'fuel' => 'Electric', 'transmission' => 'Automatic',
                'engine' => 'Dual Motor Electric', 'drivetrain' => 'AWD', 'exterior_color' => 'Deep Blue Metallic',
                'interior_color' => 'Black Vegan Leather', 'doors' => 4, 'seats' => 5, 'vin' => '5YJ3E1EB1RF123405',
                'condition' => 'Used', 'featured' => true, 'status' => 'Available',
                'images' => [$img('photo-1560958089-b8a1929cea89'), $img('photo-1536700503339-1e4b06520771')],
                'features' => ['Autopilot', '341mi Range', 'Glass Roof', 'Ventilated Seats', 'Sentry Mode', 'Over-the-Air Updates'],
                'description' => 'Highland refresh Model 3 with 341 miles of EPA range. Autopilot included, ventilated seats, and free Supercharging credits transferable to the new owner.',
            ],
            [
                'make' => 'Ford', 'model' => 'F-150 Lariat', 'year' => 2022, 'price' => 47500,
                'mileage' => 27600, 'body_type' => 'Truck', 'fuel' => 'Petrol', 'transmission' => 'Automatic',
                'engine' => '3.5L EcoBoost V6', 'drivetrain' => '4WD', 'exterior_color' => 'Antimatter Blue',
                'interior_color' => 'Black Leather', 'doors' => 4, 'seats' => 5, 'vin' => '1FTFW1E85NF123406',
                'condition' => 'Used', 'featured' => false, 'status' => 'Available',
                'images' => [$img('photo-1605893477799-b99e3b8b93fe'), $img('photo-1533106418989-88406c7cc8ca')],
                'features' => ['Max Tow Package', 'Pro Power Onboard', 'B&O Sound', '360° Camera', 'Heated & Cooled Seats', 'Tailgate Step'],
                'description' => 'Lariat SuperCrew with the 3.5L EcoBoost and Max Tow package — rated to 13,200 lbs. Pro Power Onboard generator, spray-in bedliner, and tonneau cover included.',
            ],
            [
                'make' => 'Honda', 'model' => 'Civic Sport Touring', 'year' => 2024, 'price' => 31200,
                'mileage' => 4100, 'body_type' => 'Hatchback', 'fuel' => 'Petrol', 'transmission' => 'CVT',
                'engine' => '1.5L Turbo I4', 'drivetrain' => 'FWD', 'exterior_color' => 'Boost Blue Pearl',
                'interior_color' => 'Black Leather', 'doors' => 5, 'seats' => 5, 'vin' => '19XFL1H80RE123407',
                'condition' => 'Used', 'featured' => false, 'status' => 'Available',
                'images' => [$img('photo-1590362891991-f776e747a588'), $img('photo-1494976388531-d1058494cdd8')],
                'features' => ['Honda Sensing', 'Bose Premium Audio', 'Wireless CarPlay', 'Sunroof', 'Heated Seats', 'LED Headlights'],
                'description' => 'Top-trim Civic hatch with Bose audio, leather, and Honda Sensing. Basically new — 4,100 miles and the balance of the factory warranty.',
            ],
            [
                'make' => 'Porsche', 'model' => '911 Carrera S', 'year' => 2021, 'price' => 129900,
                'mileage' => 14300, 'body_type' => 'Coupe', 'fuel' => 'Petrol', 'transmission' => 'PDK',
                'engine' => '3.0L Twin-Turbo Flat-6', 'drivetrain' => 'RWD', 'exterior_color' => 'GT Silver',
                'interior_color' => 'Bordeaux Red', 'doors' => 2, 'seats' => 4, 'vin' => 'WP0AB2A91MS123408',
                'condition' => 'Certified', 'featured' => true, 'status' => 'Available',
                'images' => [$img('photo-1503736334956-4c8f8e92946d'), $img('photo-1544636331-e26879cd4d9b')],
                'features' => ['Sport Chrono Package', 'Sport Exhaust', 'Rear-Axle Steering', 'PASM Suspension', 'Bose Audio', '18-way Sport Seats'],
                'description' => '992-generation Carrera S with Sport Chrono, sport exhaust and rear-axle steering. Porsche Approved certified with a 2-year unlimited-mile warranty.',
            ],
            [
                'make' => 'Jeep', 'model' => 'Wrangler Rubicon', 'year' => 2023, 'price' => 49800,
                'mileage' => 15700, 'body_type' => 'SUV', 'fuel' => 'Petrol', 'transmission' => 'Automatic',
                'engine' => '3.6L V6', 'drivetrain' => '4WD', 'exterior_color' => 'Firecracker Red',
                'interior_color' => 'Black Cloth', 'doors' => 4, 'seats' => 5, 'vin' => '1C4HJXFG1PW123410',
                'condition' => 'Used', 'featured' => false, 'status' => 'Available',
                'images' => [$img('photo-1533558701576-23c65e0272fb'), $img('photo-1519641471654-76ce0107ad1b')],
                'features' => ['Front & Rear Lockers', 'Sway Bar Disconnect', '35" Tires', 'LED Lighting Group', 'Hard + Soft Tops', 'Rock Rails'],
                'description' => 'Trail-ready Rubicon 4-door with lockers front and rear, disconnecting sway bar, and 35" tires on Method wheels. Hard top and soft top both included.',
            ],
            [
                'make' => 'Hyundai', 'model' => 'IONIQ 5 Limited', 'year' => 2024, 'price' => 46700,
                'mileage' => 5300, 'body_type' => 'SUV', 'fuel' => 'Electric', 'transmission' => 'Automatic',
                'engine' => 'Dual Motor Electric', 'drivetrain' => 'AWD', 'exterior_color' => 'Cyber Gray',
                'interior_color' => 'Gray Eco Leather', 'doors' => 5, 'seats' => 5, 'vin' => 'KM8KRDAF1RU123412',
                'condition' => 'Used', 'featured' => true, 'status' => 'Available',
                'images' => [$img('photo-1617788138017-80ad40651399'), $img('photo-1593941707882-a5bba14938c7')],
                'features' => ['800V Fast Charging', 'Vision Roof', 'Relaxation Seats', 'Highway Drive Assist 2', 'V2L Power Outlet', 'Bose Audio'],
                'description' => 'Award-winning IONIQ 5 Limited AWD with 800V ultra-fast charging (10-80% in 18 minutes), vision roof, and relaxation seats.',
            ],
        ];

        foreach ($showcase as $car) {
            Car::create($car);
        }

        // Volume inventory generated from the realistic catalog.
        Car::factory()->count(30)->create();
    }
}
