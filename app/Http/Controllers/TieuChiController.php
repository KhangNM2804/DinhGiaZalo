<?php

namespace App\Http\Controllers;

use App\Http\Requests\TieuChiStoreRequest;
use App\Http\Requests\TieuChiUpdateRequest;
use App\Http\Resources\TieuChiCollection;
use App\Http\Resources\TieuChiResource;
use App\Models\TieuChi;

use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Request;
use Inertia\Inertia;
use Inertia\Response;

class TieuChiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('TieuChi/Index', [
            'filters' => Request::all('search', 'trashed'),
            'tieuchi' => new TieuChiCollection(
                TieuChi::orderBy('id')
                    ->filter(Request::only('search', 'trashed'))
                    ->paginate()
                    ->appends(Request::all())
            ),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('TieuChi/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TieuChiStoreRequest $request): RedirectResponse
    {
        // Validate the request using the validated() method
        $validatedData = $request->validated();
        $tieuChi = TieuChi::create($validatedData);

        // Return a JSON response indicating success
        return Redirect::back()->with('success', 'Organization updated.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TieuChi $tieuchi): Response
    {
        return Inertia::render('TieuChi/Edit', [
            'tieuChi' => new TieuChiResource($tieuchi)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(TieuChiUpdateRequest $request, TieuChi $tieuchi): RedirectResponse
    {
        $tieuchi->update($request->validated());
        return Redirect::back()->with('success', 'Tiêu chí được cập nhật thành công');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TieuChi $tieuchi): RedirectResponse
    {
        $tieuchi->delete();
        return Redirect::back()->with('success', 'Tiêu chí đã được xoá');
    }
    public function restore(TieuChi $tieuchi): RedirectResponse
    {
        $tieuchi->restore();
        return Redirect::back()->with('success', 'Đã hồi phục thành công');
    }
}
