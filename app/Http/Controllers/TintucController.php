<?php

namespace App\Http\Controllers;

use App\Http\Resources\TinTucCollection;
use App\Models\TinTuc;
use Illuminate\Support\Facades\Request;
use Inertia\Inertia;

class TintucController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
    return Inertia::render('Tintuc/Index',[
        'filters'=>Request::all('search','trashed'),
        'tintuc'=>new TinTucCollection(
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
    public function store(Request $request)
    {
        
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
