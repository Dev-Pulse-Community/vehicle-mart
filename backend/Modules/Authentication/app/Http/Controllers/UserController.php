<?php

namespace Modules\Authentication\app\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Raza9798\LaravelCoreModules\Services\ResourceService;

class UserController extends ResourceService
{
    /**
     * Admin: list user accounts with search.
     */
    public function index(Request $request)
    {
        $users = User::query()
            ->when($request->query('q'), function ($query, $term) {
                $query->where(function ($sub) use ($term) {
                    $sub->where('name', 'like', "%{$term}%")
                        ->orWhere('email', 'like', "%{$term}%");
                });
            })
            ->withCount(['orders', 'favorites'])
            ->orderByDesc('created_at')
            ->paginate($request->integer('per_page', 15));

        return Response::json(['status' => true, 'data' => $users]);
    }

    /**
     * Admin: single user with purchase history.
     */
    public function show(int $id)
    {
        $user = User::with(['orders' => fn ($q) => $q->orderByDesc('purchased_at')])
            ->withCount('favorites')
            ->find($id);

        if (!$user) {
            return Response::json(['status' => false, 'message' => 'User not found'], 404);
        }

        return Response::json(['status' => true, 'data' => $user]);
    }

    /**
     * Admin: activate/suspend or change role.
     */
    public function update(Request $request, int $id)
    {
        if ($request->user()->id === $id) {
            return Response::json(['status' => false, 'message' => 'You cannot modify your own account here'], 422);
        }

        $data = $request->validate([
            'is_active' => 'sometimes|boolean',
            'role' => 'sometimes|in:user,admin',
        ]);

        $user = $this->modify(User::class, $id, $data, 'id');

        if (is_array($user) && isset($user['status'])) {
            return Response::json($user, $user['status']);
        }

        return Response::json(['status' => true, 'data' => $user, 'message' => 'User updated']);
    }

    /**
     * Admin: delete a user account.
     */
    public function destroy(Request $request, int $id)
    {
        if ($request->user()->id === $id) {
            return Response::json(['status' => false, 'message' => 'You cannot delete your own account'], 422);
        }

        $user = $this->delete(User::class, $id, 'id');

        if (is_array($user) && isset($user['status'])) {
            return Response::json($user, $user['status']);
        }

        return Response::json(['status' => true, 'message' => 'User deleted']);
    }
}
