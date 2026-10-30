<?php

namespace Modules\Vehicle\database\factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Vehicle\app\Models\Car;

class CarFactory extends Factory
{
    protected $model = Car::class;

    /**
     * Realistic make/model/body/price data so factory cars read like real listings.
     */
    private const CATALOG = [
        ['make' => 'Toyota', 'model' => 'Corolla SE', 'body' => 'Sedan', 'fuel' => 'Petrol', 'engine' => '2.0L I4', 'base' => 23000],
        ['make' => 'Toyota', 'model' => 'Highlander XLE', 'body' => 'SUV', 'fuel' => 'Hybrid', 'engine' => '2.5L Hybrid I4', 'base' => 43000],
        ['make' => 'Honda', 'model' => 'Accord EX-L', 'body' => 'Sedan', 'fuel' => 'Hybrid', 'engine' => '2.0L Hybrid I4', 'base' => 33000],
        ['make' => 'Honda', 'model' => 'CR-V EX', 'body' => 'SUV', 'fuel' => 'Petrol', 'engine' => '1.5L Turbo I4', 'base' => 31000],
        ['make' => 'Ford', 'model' => 'Escape Titanium', 'body' => 'SUV', 'fuel' => 'Hybrid', 'engine' => '2.5L Hybrid I4', 'base' => 34000],
        ['make' => 'Ford', 'model' => 'Mustang GT', 'body' => 'Coupe', 'fuel' => 'Petrol', 'engine' => '5.0L V8', 'base' => 46000],
        ['make' => 'Chevrolet', 'model' => 'Silverado LT', 'body' => 'Truck', 'fuel' => 'Petrol', 'engine' => '5.3L V8', 'base' => 48000],
        ['make' => 'Chevrolet', 'model' => 'Equinox RS', 'body' => 'SUV', 'fuel' => 'Petrol', 'engine' => '1.5L Turbo I4', 'base' => 29000],
        ['make' => 'BMW', 'model' => '330i xDrive', 'body' => 'Sedan', 'fuel' => 'Petrol', 'engine' => '2.0L Turbo I4', 'base' => 46000],
        ['make' => 'Mercedes-Benz', 'model' => 'GLC 300', 'body' => 'SUV', 'fuel' => 'Petrol', 'engine' => '2.0L Turbo I4', 'base' => 49000],
        ['make' => 'Audi', 'model' => 'A4 Premium Plus', 'body' => 'Sedan', 'fuel' => 'Petrol', 'engine' => '2.0L TFSI I4', 'base' => 44000],
        ['make' => 'Hyundai', 'model' => 'Tucson SEL', 'body' => 'SUV', 'fuel' => 'Hybrid', 'engine' => '1.6L Turbo Hybrid', 'base' => 32000],
        ['make' => 'Kia', 'model' => 'Telluride SX', 'body' => 'SUV', 'fuel' => 'Petrol', 'engine' => '3.8L V6', 'base' => 47000],
        ['make' => 'Nissan', 'model' => 'Rogue SL', 'body' => 'SUV', 'fuel' => 'Petrol', 'engine' => '1.5L Turbo I3', 'base' => 33000],
        ['make' => 'Tesla', 'model' => 'Model Y Long Range', 'body' => 'SUV', 'fuel' => 'Electric', 'engine' => 'Dual Motor Electric', 'base' => 45000],
        ['make' => 'Subaru', 'model' => 'Outback Limited', 'body' => 'Wagon', 'fuel' => 'Petrol', 'engine' => '2.5L Boxer H4', 'base' => 36000],
        ['make' => 'Mazda', 'model' => 'CX-5 Carbon Edition', 'body' => 'SUV', 'fuel' => 'Petrol', 'engine' => '2.5L I4', 'base' => 31000],
        ['make' => 'Volkswagen', 'model' => 'Golf GTI SE', 'body' => 'Hatchback', 'fuel' => 'Petrol', 'engine' => '2.0L Turbo I4', 'base' => 34000],
    ];

    private const COLORS = [
        'Midnight Black', 'Pearl White', 'Silver Metallic', 'Deep Blue', 'Ruby Red',
        'Graphite Gray', 'Champagne Gold', 'Forest Green', 'Arctic White', 'Storm Gray',
    ];

    private const FEATURE_POOL = [
        'Apple CarPlay', 'Android Auto', 'Heated Seats', 'Sunroof', 'Adaptive Cruise Control',
        'Blind Spot Monitor', 'Lane Keep Assist', 'Backup Camera', 'Keyless Entry',
        'Remote Start', 'Premium Audio', 'Leather Seats', 'Navigation', 'Wireless Charging',
        'Power Liftgate', 'Dual-Zone Climate', 'LED Headlights', 'Parking Sensors',
    ];

    private const IMAGE_POOL = [
        'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=70',
        'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=70',
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=70',
        'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=70',
        'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=70',
        'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=70',
        'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=70',
        'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=70',
    ];

    public function definition(): array
    {
        $spec = $this->faker->randomElement(self::CATALOG);
        $year = $this->faker->numberBetween(2019, 2026);
        $age = 2026 - $year;
        $mileage = $age === 0
            ? $this->faker->numberBetween(50, 5000)
            : $this->faker->numberBetween(4000, 15000) * $age;

        // Depreciate roughly 9% per year with some spread, keep a sane floor.
        $price = round($spec['base'] * pow(0.91, $age) * $this->faker->randomFloat(2, 0.92, 1.08), -2);

        return [
            'make' => $spec['make'],
            'model' => $spec['model'],
            'year' => $year,
            'price' => max($price, 9500),
            'mileage' => $mileage,
            'body_type' => $spec['body'],
            'fuel' => $spec['fuel'],
            'transmission' => $spec['fuel'] === 'Electric' ? 'Automatic' : $this->faker->randomElement(['Automatic', 'Automatic', 'Automatic', 'CVT', 'Manual']),
            'engine' => $spec['engine'],
            'drivetrain' => $spec['body'] === 'Truck' ? '4WD' : $this->faker->randomElement(['FWD', 'AWD', 'RWD']),
            'exterior_color' => $this->faker->randomElement(self::COLORS),
            'interior_color' => $this->faker->randomElement(['Black', 'Gray', 'Beige', 'Brown']),
            'doors' => in_array($spec['body'], ['Coupe']) ? 2 : 4,
            'seats' => $spec['body'] === 'Coupe' ? 4 : ($spec['model'] === 'Telluride SX' ? 7 : 5),
            'vin' => strtoupper($this->faker->unique()->bothify('?##?########?####')),
            'condition' => $this->faker->randomElement(['Used', 'Used', 'Used', 'Certified']),
            'featured' => $this->faker->boolean(20),
            'status' => $this->faker->randomElement(['Available', 'Available', 'Available', 'Available', 'Pending', 'Sold']),
            'images' => $this->faker->randomElements(self::IMAGE_POOL, 2),
            'features' => $this->faker->randomElements(self::FEATURE_POOL, $this->faker->numberBetween(5, 8)),
            'description' => sprintf(
                '%d %s %s in %s with %s miles. %s One owner, clean history report, fully inspected by our service team and backed by our 7-day money-back guarantee.',
                $year,
                $spec['make'],
                $spec['model'],
                $this->faker->randomElement(self::COLORS),
                number_format($mileage),
                $this->faker->randomElement([
                    'Well maintained with complete service records.',
                    'Non-smoker vehicle, garage kept.',
                    'New tires and brakes fitted at the last service.',
                    'Remaining factory warranty transfers to the new owner.',
                ])
            ),
        ];
    }
}
