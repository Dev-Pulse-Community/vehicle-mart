<?php

namespace Modules\Vehicle\app\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Modules\Vehicle\app\Models\Car;
use Modules\Vehicle\app\Models\Favorite;
use Raza9798\LaravelCoreModules\Services\ResourceService;

class FavoriteController extends ResourceService
{
    /**
     * The authenticated user's saved cars.
     */
    public function index(Request $request)
    {
        $cars = Car::whereIn('id', function ($query) use ($request) {
            $query->select('car_id')->from('favorites')->where('user_id', $request->user()->id);
        })->get();

        return Response::json(['status' => true, 'data' => $cars]);
    }

    /**
     * Add or remove a car from the user's favorites.
     */
    public function toggle(Request $request, int $carId)
    {
        $car = Car::find($carId);
        if (!$car) {
            return Response::json(['status' => false, 'message' => 'Car not found'], 404);
        }

        $existing = Favorite::where('user_id', $request->user()->id)
            ->where('car_id', $carId)
            ->first();

        if ($existing) {
            $existing->delete();
            $favorited = false;
        } else {
            Favorite::create(['user_id' => $request->user()->id, 'car_id' => $carId]);
            $favorited = true;
        }

        return Response::json([
            'status' => true,
            'favorited' => $favorited,
            'message' => $favorited ? 'Added to favorites' : 'Removed from favorites',
        ]);
    }
}
