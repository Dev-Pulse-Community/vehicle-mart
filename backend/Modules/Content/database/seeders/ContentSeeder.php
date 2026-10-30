<?php

namespace Modules\Content\database\seeders;

use Illuminate\Database\Seeder;
use Modules\Content\app\Models\NewsPost;
use Modules\Content\app\Models\TeamMember;
use Modules\Content\app\Models\Testimonial;

class ContentSeeder extends Seeder
{
    public function run(): void
    {
        $img = fn (string $id) => "https://images.unsplash.com/{$id}?auto=format&fit=crop&w=1200&q=70";

        // ---- News posts ----
        $posts = [
            [
                'title' => '2026 Electric Vehicle Buying Guide: What to Know Before You Shop',
                'author' => 'Sarah Mitchell',
                'image' => $img('photo-1593941707882-a5bba14938c7'),
                'excerpt' => 'EV range, charging networks and incentives have changed fast. Here is everything you need to know before buying an electric car this year.',
                'content' => "The EV market in 2026 looks nothing like it did three years ago. Average range on new listings now exceeds 320 miles, public fast-charging coverage has doubled, and used EV prices have stabilized after two volatile years.\n\nStart with your daily mileage: most drivers cover under 40 miles a day, which means even an older 250-mile EV comfortably covers a week of commuting between charges. If you can charge at home, running costs typically fall 60-70% versus a comparable petrol car.\n\nOn the used market, battery health reports are now standard — we provide one with every EV we sell, and anything below 90% state-of-health is priced accordingly. Federal and state incentives still apply to qualifying used EVs under $25,000, so ask our finance team to run the numbers before you settle on a budget.",
                'published_at' => now()->subDays(9),
            ],
            [
                'title' => 'AutoDeal Summer Sales Event: 0.9% APR on Certified Pre-Owned',
                'author' => 'Marcus Webb',
                'image' => $img('photo-1567818735868-e71b99932e29'),
                'excerpt' => 'Through August 31st, qualified buyers get 0.9% APR financing on every certified pre-owned vehicle in stock, plus a complimentary 2-year maintenance plan.',
                'content' => "Our biggest financing event of the year is here. Every certified pre-owned vehicle on the lot qualifies for 0.9% APR for up to 60 months for well-qualified buyers.\n\nThat's a saving of roughly $4,100 in interest on a $45,000 vehicle compared with the average market rate. Every certified car also ships with our 150-point inspection report, a 2-year complimentary maintenance plan, and the 7-day money-back guarantee we put on everything we sell.\n\nThe offer runs through August 31st and applies to in-stock vehicles only. Book a test drive online or drop by the showroom — no appointment needed.",
                'published_at' => now()->subDays(16),
            ],
            [
                'title' => '5 Maintenance Tips That Protect Your Car\'s Resale Value',
                'author' => 'Elena Torres',
                'image' => $img('photo-1487754180451-c456f719a1fc'),
                'excerpt' => 'Small habits make a big difference at trade-in time. Our service director shares the five things that matter most to appraisers.',
                'content' => "When our appraisal team evaluates a trade-in, five things consistently separate top-dollar cars from the rest: complete service records, original paint, healthy tires, a clean interior, and no warning lights.\n\n1. Keep every receipt. A folder of dated service records can add 5-8% to your appraisal.\n2. Fix paint chips early. A $150 touch-up now prevents a $900 respray conversation later.\n3. Rotate tires on schedule. Uneven wear signals skipped maintenance to any appraiser.\n4. Detail the interior twice a year. Odors and stains are the fastest way to lose value.\n5. Never ignore a warning light. A stored fault code is visible on our diagnostic scan even if the light is off.",
                'published_at' => now()->subDays(27),
            ],
            [
                'title' => 'How Our 150-Point Inspection Works — And Why We Reject 1 in 5 Cars',
                'author' => 'Elena Torres',
                'image' => $img('photo-1486262715619-67b85e0b08d3'),
                'excerpt' => 'Every car we sell passes the same 150-point inspection. Here is what our technicians check, and what sends a car back to auction.',
                'content' => "Roughly one in five vehicles we source never makes it to our lot. Our ASE Master Technicians run every candidate through a 150-point inspection covering the drivetrain, suspension, brakes, electronics, and body structure.\n\nAutomatic rejections include frame damage, flood history, odometer discrepancies, and any airbag fault. Borderline items — worn brake pads, aging tires, chipped glass — are repaired with OEM parts before the car is listed, and the work order is attached to the listing.\n\nYou'll find the full inspection sheet in the glovebox of every car in our showroom, and we're happy to walk you through it line by line.",
                'published_at' => now()->subDays(41),
            ],
            [
                'title' => 'Trade-In vs. Private Sale in 2026: The Real Math',
                'author' => 'Marcus Webb',
                'image' => $img('photo-1560179707-f14e90ef3623'),
                'excerpt' => 'Private sales average 8% more on paper — but after fees, time and risk, the gap is smaller than you think. We break down the real numbers.',
                'content' => "Selling privately typically nets 5-10% more than a trade-in on paper. But the paper number isn't the whole story.\n\nA private sale takes 3-6 weeks on average, requires listing fees, detailing, and meeting strangers for test drives. You also carry the risk of payment fraud and post-sale disputes. Meanwhile, trading in at a dealership reduces the taxable amount of your new purchase in most states — on a $30,000 purchase with a $15,000 trade-in, that's a sales tax saving of around $900 at a 6% rate.\n\nOur advice: get our written trade-in offer first. It's valid for 7 days, and you can shop it against private offers with nothing to lose.",
                'published_at' => now()->subDays(58),
            ],
        ];

        foreach ($posts as $post) {
            NewsPost::create($post);
        }

        // ---- Testimonials ----
        $testimonials = [
            ['name' => 'David Chen', 'role' => 'Bought a BMW X5', 'rating' => 5, 'quote' => 'Smoothest car purchase I\'ve ever made. No pressure, transparent pricing, and the car was exactly as described. In and out in 90 minutes.'],
            ['name' => 'Amara Johnson', 'role' => 'Bought a Tesla Model 3', 'rating' => 5, 'quote' => 'The team walked me through EV ownership, charging, and incentives. They even helped set up my home charger installation. Outstanding service.'],
            ['name' => 'Robert Alvarez', 'role' => 'Bought a Ford F-150', 'rating' => 4, 'quote' => 'Fair trade-in value and a great selection of trucks. Financing was quick and the rate beat my credit union. Would buy here again.'],
            ['name' => 'Priya Patel', 'role' => 'Bought a Honda CR-V', 'rating' => 5, 'quote' => 'As a first-time buyer I expected pressure tactics. Instead I got honest advice, a fair price, and a follow-up call a week later to check everything was fine.'],
            ['name' => 'Michael O\'Brien', 'role' => 'Bought a Porsche 911', 'rating' => 5, 'quote' => 'Flew in from out of state for this car. It was exactly as photographed, paperwork was ready, and they picked me up from the airport. First class.'],
            ['name' => 'Jennifer Walsh', 'role' => 'Serviced her Audi Q5', 'rating' => 4, 'quote' => 'The service center is as good as the sales floor. Transparent estimates, genuine parts, and they returned the car washed. My new go-to shop.'],
        ];

        foreach ($testimonials as $t) {
            Testimonial::create($t);
        }

        // ---- Team ----
        $team = [
            ['name' => 'James Rodriguez', 'role' => 'General Manager', 'image' => 'https://i.pravatar.cc/300?img=12', 'bio' => '22 years in the auto industry. James founded AutoDeal on a simple idea: honest pricing and no games.', 'sort_order' => 1],
            ['name' => 'Sarah Mitchell', 'role' => 'Sales Director', 'image' => 'https://i.pravatar.cc/300?img=47', 'bio' => 'Sarah leads our sales team and is the reason our customer satisfaction score has stayed above 4.8 for five straight years.', 'sort_order' => 2],
            ['name' => 'Marcus Webb', 'role' => 'Finance Manager', 'image' => 'https://i.pravatar.cc/300?img=33', 'bio' => 'Marcus works with 20+ lenders to find the best rate for every credit profile, from first-time buyers to business fleets.', 'sort_order' => 3],
            ['name' => 'Elena Torres', 'role' => 'Service Director', 'image' => 'https://i.pravatar.cc/300?img=26', 'bio' => 'ASE Master Technician. Elena runs our 12-bay service center and the 150-point certification inspection every car receives.', 'sort_order' => 4],
        ];

        foreach ($team as $member) {
            TeamMember::create($member);
        }
    }
}
