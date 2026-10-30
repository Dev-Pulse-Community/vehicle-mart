<?php

namespace Modules\Content\app\Models;

use Illuminate\Database\Eloquent\Model;

class TeamMember extends Model
{
    protected $fillable = ['name', 'role', 'image', 'bio', 'sort_order'];
}
