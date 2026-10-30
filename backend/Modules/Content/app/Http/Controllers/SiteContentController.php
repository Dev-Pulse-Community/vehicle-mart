<?php

namespace Modules\Content\app\Http\Controllers;

use Illuminate\Support\Facades\Response;
use Modules\Content\app\Models\TeamMember;
use Modules\Content\app\Models\Testimonial;
use Raza9798\LaravelCoreModules\Services\ResourceService;

class SiteContentController extends ResourceService
{
    public function testimonials()
    {
        return Response::json([
            'status' => true,
            'data' => Testimonial::where('approved', true)->orderByDesc('id')->get(),
        ]);
    }

    public function team()
    {
        return Response::json([
            'status' => true,
            'data' => TeamMember::orderBy('sort_order')->get(),
        ]);
    }
}
