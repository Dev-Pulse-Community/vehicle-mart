<?php

namespace Modules\Content\app\Models;

use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    protected $fillable = ['name', 'role', 'rating', 'quote', 'approved'];

    protected function casts(): array
    {
        return [
            'approved' => 'boolean',
        ];
    }
}
