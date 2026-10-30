<?php

namespace Modules\Content\app\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class NewsPost extends Model
{
    protected $fillable = [
        'title', 'slug', 'author', 'image', 'excerpt', 'content', 'published_at',
    ];

    protected function casts(): array
    {
        return [
            'published_at' => 'datetime',
        ];
    }

    protected static function booted(): void
    {
        static::creating(function (NewsPost $post) {
            $post->slug = $post->slug ?: Str::slug($post->title) . '-' . Str::lower(Str::random(5));
        });
    }

    public function scopePublished($query)
    {
        return $query->whereNotNull('published_at')->where('published_at', '<=', now());
    }
}
