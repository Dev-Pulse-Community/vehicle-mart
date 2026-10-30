<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_number')->unique();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('car_id')->nullable()->constrained()->nullOnDelete();
            $table->string('car_name'); // denormalized so history survives car deletion
            $table->decimal('price', 12, 2);
            $table->enum('status', ['Processing', 'Completed', 'Cancelled'])->default('Processing')->index();
            $table->date('purchased_at')->index();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
