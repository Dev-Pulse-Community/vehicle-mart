<?php

namespace Modules\Inquiry\app\Models;

use Illuminate\Database\Eloquent\Model;
use Modules\Vehicle\app\Models\Car;

class Inquiry extends Model
{
    protected $fillable = [
        'name', 'email', 'phone', 'department', 'car_id', 'message', 'status',
    ];

    public function car()
    {
        return $this->belongsTo(Car::class);
    }
}
