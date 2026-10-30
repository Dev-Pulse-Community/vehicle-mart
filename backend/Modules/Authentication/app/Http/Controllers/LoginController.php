<?php

namespace Modules\Authentication\app\Http\Controllers;


use Raza9798\LaravelCoreModules\Services\ResourceService;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Cookie;

class LoginController extends ResourceService
{
    public function login(Request $request)
    {
        $this->validate($request->all());
        if (!Auth::attempt($request->only(['email', 'password']))) {
            return Response::json([
                'status' => false,
                'message' => 'Email & Password does not match with our record.',
            ], 401);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user->is_active) {
            return Response::json([
                'status' => false,
                'message' => 'Unable to login, user is inactive',
            ], 401);
        }

        if (!$user->has_login) {
            return Response::json([
                'status' => false,
                'message' => 'Unable to login, login permission is disabled',
            ], 401);
        }

        $token = $user->createToken('token-name')->plainTextToken;
        $cookie = Cookie::make('auth_token', $token, 1440, null, null, false, true);

        return Response::json([
            'status' => true,
            'data' => [
                ...$user->only(['id', 'name', 'email', 'role', 'phone']),
                'slug' => strtoupper(substr($user->name, 0, 2)),
            ],
            'message' => 'User Logged In Successfully',
            'token' => $token,
        ], 200)->withCookie($cookie);
    }

    public function validate($request)
    {
        return (new Request($request))->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);
    }
}
