<?php

namespace App\Http\Controllers;

use App\Http\Requests\TinTucStoreRequest;
use App\Http\Requests\TinTucUpdateRequest;
use App\Http\Resources\TinTucCollection;
use App\Http\Resources\TinTucResource;
use App\Models\TinTuc;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Request;
use Inertia\Inertia;
use Inertia\Response;

class TintucController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function indexGuest(){
        return Inertia::render('Guest/TinTuc/Index', [
            'tintuc' => new TinTucCollection(
                TinTuc::orderBy('created_at')
                    ->filter(Request::only('search', 'trashed'))
                    ->paginate()
                    ->appends(Request::all())
            
            ),
            'tinmoi' => new TinTucCollection(
                TinTuc::orderBy('created_at')
                    ->filter(Request::only('search', 'trashed'))
                    ->limit(10)
                    ->get()
            ),
        ]);
    }
    public function index()
    {
        return Inertia::render('Tintuc/Index', [
            'filters' => Request::all('search', 'trashed'),
            'tintuc' => new TinTucCollection(
                TinTuc::orderBy('created_at')
                    ->filter(Request::only('search', 'trashed'))
                    ->paginate()
                    ->appends(Request::all())
            )
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Tintuc/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TinTucStoreRequest $request): RedirectResponse
    {
        $data = $request->validated();

        $file = $request->file('photo');
        $imageName = time() . '.' . $file->extension();
        $file->move(public_path('images'), $imageName);
        $data['photo'] = '/images/' . $imageName;
        $tintuc = new TinTuc();
        $tintuc->create(
            $data
        );
        return Redirect::back()->with('success', 'Tạo tin tức thành công');
    }

    /**
     * Display the specified resource.
     */
    public function show(TinTuc $tintuc)
    {
        return Inertia::render('Guest/TinTuc/Show', [
            'tintuc' => new TinTucResource($tintuc),
            'tinmoi' => new TinTucCollection(
                TinTuc::orderBy('created_at')
                    ->filter(Request::only('search', 'trashed'))
                    ->limit(10)
                    ->get()
            ),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TinTuc $tintuc): Response
    {
        return Inertia::render('Tintuc/Edit', [
            'tintuc' => new TinTucResource($tintuc)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(TinTucUpdateRequest $request, TinTuc $tintuc)
    {

        $data = $request->validated();
        $data['photo'] = $tintuc->photo;
        if ($request->hasFile('photo')) {

            $file = $request->photo;
            $imageName = time() . '.' . $file->extension();
            // dd($imageName);
            $file->move(public_path('images'), $imageName);
            $data['photo'] = '/images/' . $imageName;
        }
        $tintuc->update($data);
        return Redirect::back()->with('success', 'Cập nhật tin tức thành công');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TinTuc $tintuc)
    {
        $tintuc->delete();
        return Redirect::back()->with('success', 'Xoá tin tức thành công');
    }
    public function restore(TinTuc $tintuc)
    {
        $tintuc->restore();
        return Redirect::back()->with('success', 'Phục hồi tin tức thành công');
    }
}
