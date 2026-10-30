<?php

namespace Modules\Authentication\app\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Response;
use Modules\Vehicle\app\Models\Favorite;
use Raza9798\LaravelCoreModules\Services\ResourceService;

class ProfileController extends ResourceService
{
    /**
     * The authenticated user's profile, including favorite car ids.
     */
    public function me(Request $request)
    {
        $user = $request->user();

        return Response::json([
            'status' => true,
            'data' => [
                ...$user->only(['id', 'name', 'email', 'role', 'phone']),
                'joined' => $user->created_at?->toDateString(),
                'favorites' => Favorite::where('user_id', $user->id)->pluck('car_id'),
            ],
        ]);
    }

    public function update(Request $request)
    {
        $user = $request->user();

        $data = $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email|max:255|unique:users,email,' . $user->id,
            'phone' => 'nullable|string|max:30',
        ]);

        $user->update($data);

        return Response::json([
            'status' => true,
            'data' => $user->only(['id', 'name', 'email', 'role', 'phone']),
            'message' => 'Profile updated',
        ]);
    }

    public function updatePassword(Request $request)
    {
        $user = $request->user();

        $data = $request->validate([
            'current_password' => 'required|string',
            'password' => 'required|string|min:6|confirmed',
        ]);

        if (!Hash::check($data['current_password'], $user->password)) {
            return Response::json([
                'status' => false,
                'message' => 'Current password is incorrect',
            ], 422);
        }

        $user->update(['password' => $data['password']]);

        return Response::json(['status' => true, 'message' => 'Password changed']);
    }
}
