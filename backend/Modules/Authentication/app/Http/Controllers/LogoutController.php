<?php

namespace Modules\Authentication\app\Http\Controllers;


use Raza9798\LaravelCoreModules\Services\ResourceService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;

class LogoutController extends ResourceService
{
    public function logout()
    {
        $user = Auth::guard('sanctum')->user();
        if (!$user) {
            return Response::json(['error' => 'Unauthenticated'], 401);
        }
        $user->tokens()->delete();
        $cookie = cookie('auth_token', '', -1, '/', null, false, true);

        return Response::json(['message' => 'User Logged Out Successfully'], 200)->withCookie($cookie);
    }
}
