<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Modules\Authentication\app\Http\Controllers\LoginController;
use Modules\Authentication\app\Http\Controllers\LogoutController;
use Modules\Authentication\app\Http\Controllers\ProfileController;
use Modules\Authentication\app\Http\Controllers\RegisterController;
use Modules\Authentication\app\Http\Controllers\UserController;

// Public auth
Route::post('/login', [LoginController::class, 'login']);
Route::post('/register', [RegisterController::class, 'register']);

// Authenticated
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [LogoutController::class, 'logout']);
    Route::get('/user', fn (Request $request) => $request->user());
    Route::get('/profile', [ProfileController::class, 'me']);
    Route::put('/profile', [ProfileController::class, 'update']);
    Route::put('/profile/password', [ProfileController::class, 'updatePassword']);
});

// Admin user management
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::get('/admin/users', [UserController::class, 'index']);
    Route::get('/admin/users/{id}', [UserController::class, 'show'])->whereNumber('id');
    Route::put('/admin/users/{id}', [UserController::class, 'update'])->whereNumber('id');
    Route::delete('/admin/users/{id}', [UserController::class, 'destroy'])->whereNumber('id');
});
