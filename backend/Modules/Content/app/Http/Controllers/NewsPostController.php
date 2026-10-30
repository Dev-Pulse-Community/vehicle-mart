<?php

namespace Modules\Content\app\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Modules\Content\app\Models\NewsPost;
use Raza9798\LaravelCoreModules\Services\ResourceService;

class NewsPostController extends ResourceService
{
    public function index(Request $request)
    {
        $query = filter_var($request->query('all', false), FILTER_VALIDATE_BOOLEAN) && $request->user('sanctum')?->role === 'admin'
            ? NewsPost::query()
            : NewsPost::published();

        $posts = $query->orderByDesc('published_at')
            ->paginate($request->integer('per_page', 9));

        return Response::json(['status' => true, 'data' => $posts]);
    }

    public function show(string $slug)
    {
        $post = NewsPost::published()->where('slug', $slug)->first();
        if (!$post) {
            return Response::json(['status' => false, 'message' => 'Post not found'], 404);
        }

        return Response::json(['status' => true, 'data' => $post]);
    }

    public function store(Request $request)
    {
        $data = $this->validatePost($request);
        $data['published_at'] = $data['published_at'] ?? now();
        $post = $this->insert(NewsPost::class, $data, 'id');

        if (is_array($post) && isset($post['status'])) {
            return Response::json($post, $post['status']);
        }

        return Response::json(['status' => true, 'data' => $post, 'message' => 'Post published'], 201);
    }

    public function update(Request $request, int $id)
    {
        $data = $this->validatePost($request);
        $post = $this->modify(NewsPost::class, $id, $data, 'id');

        if (is_array($post) && isset($post['status'])) {
            return Response::json($post, $post['status']);
        }

        return Response::json(['status' => true, 'data' => $post, 'message' => 'Post updated']);
    }

    public function destroy(int $id)
    {
        $post = $this->delete(NewsPost::class, $id, 'id');

        if (is_array($post) && isset($post['status'])) {
            return Response::json($post, $post['status']);
        }

        return Response::json(['status' => true, 'message' => 'Post deleted']);
    }

    private function validatePost(Request $request): array
    {
        return $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:100',
            'image' => 'nullable|string|max:500',
            'excerpt' => 'required|string',
            'content' => 'nullable|string',
            'published_at' => 'nullable|date',
        ]);
    }
}
