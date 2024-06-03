<?php

namespace App\Http\Controllers;

use App\Http\Resources\DinhGiaCollection;
use App\Models\DinhGia;
use Illuminate\Support\Facades\Request;
use Inertia\Inertia;

class DinhGiaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function dinhgia()
    {
        return Inertia::render('Guest/DinhGia/Index');
    }

    public function index()
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
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
