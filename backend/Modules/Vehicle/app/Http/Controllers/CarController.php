<?php

namespace Modules\Vehicle\app\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Modules\Vehicle\app\Models\Car;
use Raza9798\LaravelCoreModules\Services\ResourceService;

class CarController extends ResourceService
{
    /**
     * Public listing with filters, sorting and pagination.
     */
    public function index(Request $request)
    {
        $sorts = [
            'newest' => ['id', 'desc'],
            'price-asc' => ['price', 'asc'],
            'price-desc' => ['price', 'desc'],
            'mileage-asc' => ['mileage', 'asc'],
            'year-desc' => ['year', 'desc'],
        ];
        [$column, $direction] = $sorts[$request->query('sort', 'newest')] ?? $sorts['newest'];

        $query = Car::query()->filter($request->query());

        if (!filter_var($request->query('include_sold', false), FILTER_VALIDATE_BOOLEAN)) {
            $query->available();
        }

        $cars = $query->orderBy($column, $direction)
            ->paginate($request->integer('per_page', 12));

        return Response::json([
            'status' => true,
            'data' => $cars,
        ]);
    }

    public function show(int $id)
    {
        $car = $this->getById($id, Car::class);
        if (is_array($car)) {
            return Response::json(['status' => false, 'message' => $car['message']], $car['status']);
        }

        $similar = Car::available()
            ->where('id', '!=', $car->id)
            ->where('body_type', $car->body_type)
            ->limit(3)
            ->get();

        return Response::json([
            'status' => true,
            'data' => $car,
            'similar' => $similar,
        ]);
    }

    public function store(Request $request)
    {
        $data = $this->validateCar($request);
        $car = $this->insert(Car::class, $data, 'id');

        if (is_array($car) && isset($car['status'])) {
            return Response::json($car, $car['status']);
        }

        return Response::json(['status' => true, 'data' => $car, 'message' => 'Car listing created'], 201);
    }

    public function update(Request $request, int $id)
    {
        $data = $this->validateCar($request, $id);
        $car = $this->modify(Car::class, $id, $data, 'id');

        if (is_array($car) && isset($car['status'])) {
            return Response::json($car, $car['status']);
        }

        return Response::json(['status' => true, 'data' => $car, 'message' => 'Car listing updated']);
    }

    public function destroy(int $id)
    {
        $car = $this->delete(Car::class, $id, 'id');

        if (is_array($car) && isset($car['status'])) {
            return Response::json($car, $car['status']);
        }

        return Response::json(['status' => true, 'message' => 'Car listing deleted']);
    }

    private function validateCar(Request $request, ?int $id = null): array
    {
        return $request->validate([
            'make' => 'required|string|max:100',
            'model' => 'required|string|max:100',
            'year' => 'required|integer|min:1990|max:2027',
            'price' => 'required|numeric|min:0',
            'mileage' => 'required|integer|min:0',
            'body_type' => 'required|string|max:50',
            'fuel' => 'required|string|max:50',
            'transmission' => 'required|string|max:50',
            'engine' => 'nullable|string|max:100',
            'drivetrain' => 'nullable|string|max:20',
            'exterior_color' => 'nullable|string|max:50',
            'interior_color' => 'nullable|string|max:50',
            'doors' => 'nullable|integer|min:2|max:6',
            'seats' => 'nullable|integer|min:2|max:9',
            'vin' => 'required|string|max:30|unique:cars,vin' . ($id ? ",{$id}" : ''),
            'condition' => 'nullable|string|in:New,Used,Certified',
            'featured' => 'nullable|boolean',
            'status' => 'nullable|string|in:Available,Pending,Sold',
            'images' => 'nullable|array',
            'images.*' => 'string|max:500',
            'features' => 'nullable|array',
            'features.*' => 'string|max:100',
            'description' => 'nullable|string',
        ]);
    }
}
