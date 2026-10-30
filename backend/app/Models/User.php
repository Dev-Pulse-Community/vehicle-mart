<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;

#[Fillable(['name', 'email', 'password', 'two_factor_secret', 'two_factor_verified_at', 'has_otp_login', 'has_login', 'is_active', 'role', 'phone'])]
#[Hidden(['password', 'remember_token', 'two_factor_secret', 'two_factor_verified_at', 'has_otp_login', 'has_login'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_active' => 'boolean',
        ];
    }

    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    public function orders()
    {
        return $this->hasMany(\Modules\Order\app\Models\Order::class);
    }

    public function favorites()
    {
        return $this->hasMany(\Modules\Vehicle\app\Models\Favorite::class);
    }

    public function favoriteCars()
    {
        return $this->belongsToMany(\Modules\Vehicle\app\Models\Car::class, 'favorites');
    }
}
