<?php

namespace App\Http\Controllers;

use App\Http\Requests\DinhGiaStoreRequest;
use App\Http\Requests\DinhGiaUpdateRequest;
use App\Http\Resources\DinhGiaCollection;
use App\Http\Resources\DinhGiaResource;
use App\Http\Resources\TieuChiCollection;
use App\Models\DinhGia;
use App\Models\TieuChi;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Request;
use Inertia\Inertia;
use Inertia\Response;

class DinhGiaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function dinhgia()
    {
        return Inertia::render('Guest/DinhGia/Index');
    }

    public function index(): Response
    {
        return Inertia::render('DinhGia/Index', [
            'filters' => Request::all('search', 'trashed'),
            'dinhgia' => new DinhGiaCollection(
                DinhGia::orderBy('id')
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
        return Inertia::render('DinhGia/Create', [
            'tieuchi' => new TieuChiCollection(
                TieuChi::orderBy('id')
                    ->get()
            )

        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(DinhGiaStoreRequest $request): RedirectResponse
    {
        $validatedData = $request->validated();
        unset($validatedData['cumdinhgia']);
        $dinhGia = DinhGia::create($validatedData);
        foreach ($request->cumdinhgia as $item) {
            $dinhGia->cumdinhgia()->create(['tieuchi_id' => $item]);
        }
        return Redirect::back()->with('success', 'Tạo mới định giá thành công');
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
    public function edit(DinhGia $dinhgium): Response
    {
        
        return Inertia::render('DinhGia/Edit', [
            'dinhGia' => new DinhGiaResource($dinhgium),
            'tieuChi' => new TieuChiCollection(
                TieuChi::orderBy('id')
                    ->get()
            )
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(DinhGiaUpdateRequest $request, DinhGia $dinhgium)
    {
        $validatedData = $request->validated();
        unset($validatedData['cumdinhgia']);
        $dinhgium->update($validatedData);
        $dinhgium->cumdinhgia()->delete();
        foreach ($request->cumdinhgia as $item) {
            $dinhgium->cumdinhgia()->create(['tieuchi_id' => $item]);
        }
        return Redirect::back()->with('success', 'Cập nhật định giá thành công');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DinhGia $dinhgium)
    {
        $dinhgium->delete();
        return Redirect::back()->with('success', 'Định giá đã được xoá');
    }
    public function restore(DinhGia $dinhgia)
    {
        $dinhgia->restore();
        return Redirect::back()->with('success', 'Định giá đã được xoá');
    }
}
