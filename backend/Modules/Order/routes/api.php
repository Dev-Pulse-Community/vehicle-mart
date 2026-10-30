<?php

use Illuminate\Support\Facades\Route;
use Modules\Order\app\Http\Controllers\AnalyticsController;
use Modules\Order\app\Http\Controllers\OrderController;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/orders', [OrderController::class, 'index']);
});

Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::get('/admin/orders', [OrderController::class, 'adminIndex']);
    Route::put('/admin/orders/{id}', [OrderController::class, 'update'])->whereNumber('id');
    Route::get('/admin/analytics', [AnalyticsController::class, 'index']);
});
