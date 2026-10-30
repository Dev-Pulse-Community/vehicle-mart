<?php

namespace Modules\Inquiry\app\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Modules\Inquiry\app\Models\Inquiry;
use Raza9798\LaravelCoreModules\Services\ResourceService;

class InquiryController extends ResourceService
{
    /**
     * Public: submit a contact-form or car-listing inquiry.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:30',
            'department' => 'nullable|in:sales,service,finance,other',
            'car_id' => 'nullable|integer|exists:cars,id',
            'message' => 'required|string|max:5000',
        ]);

        $inquiry = $this->insert(Inquiry::class, $data, 'id');

        if (is_array($inquiry) && isset($inquiry['status'])) {
            return Response::json($inquiry, $inquiry['status']);
        }

        return Response::json([
            'status' => true,
            'data' => $inquiry,
            'message' => 'Inquiry received. Our team will contact you within one business day.',
        ], 201);
    }

    /**
     * Admin: list inquiries, newest first.
     */
    public function index(Request $request)
    {
        $inquiries = Inquiry::with('car:id,make,model,year')
            ->when($request->query('status'), fn ($q, $s) => $q->where('status', $s))
            ->orderByDesc('created_at')
            ->paginate($request->integer('per_page', 15));

        return Response::json(['status' => true, 'data' => $inquiries]);
    }

    /**
     * Admin: update inquiry status.
     */
    public function update(Request $request, int $id)
    {
        $data = $request->validate(['status' => 'required|in:new,contacted,closed']);
        $inquiry = $this->modify(Inquiry::class, $id, $data, 'id');

        if (is_array($inquiry) && isset($inquiry['status'])) {
            return Response::json($inquiry, $inquiry['status']);
        }

        return Response::json(['status' => true, 'data' => $inquiry, 'message' => 'Inquiry updated']);
    }
}
