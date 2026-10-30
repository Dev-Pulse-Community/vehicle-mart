<?php

namespace Modules\Vehicle\app\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Modules\Vehicle\database\factories\CarFactory;

class Car extends Model
{
    use HasFactory;

    protected $fillable = [
        'make', 'model', 'year', 'price', 'mileage', 'body_type', 'fuel',
        'transmission', 'engine', 'drivetrain', 'exterior_color', 'interior_color',
        'doors', 'seats', 'vin', 'condition', 'featured', 'status',
        'images', 'features', 'description',
    ];

    protected function casts(): array
    {
        return [
            'images' => 'array',
            'features' => 'array',
            'featured' => 'boolean',
            'price' => 'float',
        ];
    }

    protected static function newFactory(): CarFactory
    {
        return CarFactory::new();
    }

    public function favoritedBy()
    {
        return $this->belongsToMany(\App\Models\User::class, 'favorites');
    }

    public function scopeAvailable($query)
    {
        return $query->where('status', '!=', 'Sold');
    }

    public function scopeFilter($query, array $filters)
    {
        return $query
            ->when($filters['q'] ?? null, function ($q, $term) {
                $q->where(function ($sub) use ($term) {
                    $sub->where('make', 'like', "%{$term}%")
                        ->orWhere('model', 'like', "%{$term}%")
                        ->orWhere('year', 'like', "%{$term}%");
                });
            })
            ->when($filters['make'] ?? null, fn ($q, $v) => $q->where('make', $v))
            ->when($filters['model'] ?? null, fn ($q, $v) => $q->where('model', 'like', "%{$v}%"))
            ->when($filters['body_type'] ?? null, fn ($q, $v) => $q->where('body_type', $v))
            ->when($filters['fuel'] ?? null, fn ($q, $v) => $q->where('fuel', $v))
            ->when($filters['year'] ?? null, fn ($q, $v) => $q->where('year', $v))
            ->when($filters['max_price'] ?? null, fn ($q, $v) => $q->where('price', '<=', $v))
            ->when($filters['max_mileage'] ?? null, fn ($q, $v) => $q->where('mileage', '<=', $v))
            ->when(isset($filters['featured']), fn ($q) => $q->where('featured', filter_var($filters['featured'], FILTER_VALIDATE_BOOLEAN)));
    }
}
