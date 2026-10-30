<?php

use Illuminate\Support\Facades\Route;
use Modules\Content\app\Http\Controllers\NewsPostController;
use Modules\Content\app\Http\Controllers\SiteContentController;

// Public content
Route::get('/news', [NewsPostController::class, 'index']);
Route::get('/news/{slug}', [NewsPostController::class, 'show']);
Route::get('/testimonials', [SiteContentController::class, 'testimonials']);
Route::get('/team', [SiteContentController::class, 'team']);

// Admin content management
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::post('/news', [NewsPostController::class, 'store']);
    Route::put('/news/{id}', [NewsPostController::class, 'update'])->whereNumber('id');
    Route::delete('/news/{id}', [NewsPostController::class, 'destroy'])->whereNumber('id');
});
