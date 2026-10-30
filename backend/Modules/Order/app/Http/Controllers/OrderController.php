<?php

namespace Modules\Order\app\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Modules\Order\app\Models\Order;
use Raza9798\LaravelCoreModules\Services\ResourceService;

class OrderController extends ResourceService
{
    /**
     * The authenticated user's purchase history.
     */
    public function index(Request $request)
    {
        $orders = Order::where('user_id', $request->user()->id)
            ->orderByDesc('purchased_at')
            ->get();

        return Response::json(['status' => true, 'data' => $orders]);
    }

    /**
     * Admin: all orders, newest first.
     */
    public function adminIndex(Request $request)
    {
        $orders = Order::with('user:id,name,email')
            ->orderByDesc('purchased_at')
            ->paginate($request->integer('per_page', 15));

        return Response::json(['status' => true, 'data' => $orders]);
    }

    /**
     * Admin: update order status.
     */
    public function update(Request $request, int $id)
    {
        $data = $request->validate([
            'status' => 'required|in:Processing,Completed,Cancelled',
        ]);

        $order = $this->modify(Order::class, $id, $data, 'id');

        if (is_array($order) && isset($order['status']) && !($order instanceof Order)) {
            return Response::json($order, $order['status']);
        }

        return Response::json(['status' => true, 'data' => $order, 'message' => 'Order updated']);
    }
}
