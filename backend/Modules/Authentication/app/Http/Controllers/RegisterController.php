<?php

namespace Modules\Authentication\app\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Response;
use Raza9798\LaravelCoreModules\Services\ResourceService;

class RegisterController extends ResourceService
{
    public function register(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email|max:255|unique:users,email',
            'password' => 'required|string|min:6|confirmed',
            'phone' => 'nullable|string|max:30',
        ]);

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => $data['password'],
            'phone' => $data['phone'] ?? null,
            'role' => 'user',
            'is_active' => true,
            'has_login' => true,
        ]);

        $token = $user->createToken('token-name')->plainTextToken;
        $cookie = Cookie::make('auth_token', $token, 1440, null, null, false, true);

        return Response::json([
            'status' => true,
            'data' => [
                ...$user->only(['id', 'name', 'email', 'role', 'phone']),
                'slug' => strtoupper(substr($user->name, 0, 2)),
            ],
            'message' => 'Account created successfully',
            'token' => $token,
        ], 201)->withCookie($cookie);
    }
}
