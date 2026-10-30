<?php

use Illuminate\Support\Facades\Route;
use Modules\Inquiry\app\Http\Controllers\InquiryController;

// Public: contact form / car listing inquiry
Route::post('/inquiries', [InquiryController::class, 'store']);

// Admin: inquiry management
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::get('/admin/inquiries', [InquiryController::class, 'index']);
    Route::put('/admin/inquiries/{id}', [InquiryController::class, 'update'])->whereNumber('id');
});
