<?php

namespace Modules\Order\app\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Modules\Order\database\factories\OrderFactory;
use Modules\Vehicle\app\Models\Car;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_number', 'user_id', 'car_id', 'car_name', 'price', 'status', 'purchased_at',
    ];

    protected function casts(): array
    {
        return [
            'price' => 'float',
            'purchased_at' => 'date:Y-m-d',
        ];
    }

    protected static function newFactory(): OrderFactory
    {
        return OrderFactory::new();
    }

    public function user()
    {
        return $this->belongsTo(\App\Models\User::class);
    }

    public function car()
    {
        return $this->belongsTo(Car::class);
    }
}
