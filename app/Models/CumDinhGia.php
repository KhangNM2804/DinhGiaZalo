<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CumDinhGia extends Model
{
    use HasFactory;
    protected $table = 'cumdinhgia';
    public function dinhgia(): BelongsTo
    {
        return $this->belongsTo(DinhGia::class);
    }
    public function tieuchi(): BelongsTo
    {
        return $this->belongsTo(TieuChi::class);
    }
}
