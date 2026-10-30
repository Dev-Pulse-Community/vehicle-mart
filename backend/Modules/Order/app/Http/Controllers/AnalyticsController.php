<?php

namespace Modules\Order\app\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Response;
use Modules\Order\app\Models\Order;
use Modules\Vehicle\app\Models\Car;
use Raza9798\LaravelCoreModules\Services\ResourceService;

class AnalyticsController extends ResourceService
{
    /**
     * Admin dashboard statistics: stat cards, monthly sales,
     * sales by body type and newest users.
     */
    public function index()
    {
        $monthlySales = Order::where('status', 'Completed')
            ->whereYear('purchased_at', now()->year)
            ->select(
                DB::raw('MONTH(purchased_at) as month'),
                DB::raw('COUNT(*) as sales'),
                DB::raw('SUM(price) as revenue')
            )
            ->groupBy('month')
            ->orderBy('month')
            ->get()
            ->map(fn ($row) => [
                'month' => now()->startOfYear()->addMonths($row->month - 1)->format('M'),
                'sales' => (int) $row->sales,
                'revenue' => (float) $row->revenue,
            ]);

        $salesByBodyType = Order::where('orders.status', 'Completed')
            ->join('cars', 'cars.id', '=', 'orders.car_id')
            ->select('cars.body_type as type', DB::raw('COUNT(*) as value'))
            ->groupBy('cars.body_type')
            ->orderByDesc('value')
            ->get();

        return Response::json([
            'status' => true,
            'data' => [
                'stats' => [
                    'active_listings' => Car::available()->count(),
                    'total_listings' => Car::count(),
                    'registered_users' => User::count(),
                    'active_users' => User::where('is_active', true)->count(),
                    'inventory_value' => (float) Car::available()->sum('price'),
                    'ytd_revenue' => (float) Order::where('status', 'Completed')
                        ->whereYear('purchased_at', now()->year)
                        ->sum('price'),
                    'ytd_sales' => Order::where('status', 'Completed')
                        ->whereYear('purchased_at', now()->year)
                        ->count(),
                ],
                'monthly_sales' => $monthlySales,
                'sales_by_body_type' => $salesByBodyType,
                'newest_users' => User::orderByDesc('created_at')
                    ->limit(5)
                    ->get(['id', 'name', 'email', 'is_active', 'created_at']),
            ],
        ]);
    }
}
