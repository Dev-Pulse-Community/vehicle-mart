<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('two_factor_secret')->after('remember_token')->nullable();
            $table->string('two_factor_verified_at')->nullable()->after('two_factor_secret');
            $table->boolean('has_otp_login')->nullable()->default(false)->after('two_factor_verified_at');
            $table->boolean('has_login')->nullable()->default(false)->after('has_otp_login');
            $table->boolean('is_active')->nullable()->default(false)->after('has_login');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'two_factor_secret',
                'two_factor_verified_at',
                'has_otp_login',
                'has_login',
                'is_active'
            ]);
        });
    }
};
