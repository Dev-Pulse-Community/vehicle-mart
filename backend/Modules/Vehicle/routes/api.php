<?php

use Illuminate\Support\Facades\Route;
use Modules\Vehicle\app\Http\Controllers\CarController;
use Modules\Vehicle\app\Http\Controllers\FavoriteController;

// Public catalog
Route::get('/cars', [CarController::class, 'index']);
Route::get('/cars/{id}', [CarController::class, 'show'])->whereNumber('id');

// Authenticated user favorites
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/favorites', [FavoriteController::class, 'index']);
    Route::post('/favorites/{carId}/toggle', [FavoriteController::class, 'toggle'])->whereNumber('carId');
});

// Admin listing management
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::post('/cars', [CarController::class, 'store']);
    Route::put('/cars/{id}', [CarController::class, 'update'])->whereNumber('id');
    Route::delete('/cars/{id}', [CarController::class, 'destroy'])->whereNumber('id');
});
