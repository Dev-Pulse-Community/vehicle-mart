<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('cars', function (Blueprint $table) {
            $table->id();
            $table->string('make')->index();
            $table->string('model')->index();
            $table->unsignedSmallInteger('year')->index();
            $table->decimal('price', 12, 2)->index();
            $table->unsignedInteger('mileage')->default(0);
            $table->string('body_type')->index();
            $table->string('fuel')->index();
            $table->string('transmission');
            $table->string('engine')->nullable();
            $table->string('drivetrain')->nullable();
            $table->string('exterior_color')->nullable();
            $table->string('interior_color')->nullable();
            $table->unsignedTinyInteger('doors')->default(4);
            $table->unsignedTinyInteger('seats')->default(5);
            $table->string('vin')->unique();
            $table->string('condition')->default('Used');
            $table->boolean('featured')->default(false)->index();
            $table->enum('status', ['Available', 'Pending', 'Sold'])->default('Available')->index();
            $table->json('images')->nullable();
            $table->json('features')->nullable();
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cars');
    }
};
