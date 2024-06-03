<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;
class TieuChi extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'tieuchi';

    protected static function boot()
    {
        parent::boot();

        // Sử dụng sự kiện creating để tạo slug trước khi mô hình được tạo
        static::creating(function ($tieuChi) {
            $tieuChi->slug = "#".Str::slug($tieuChi->name,"");
        });

        // Sử dụng sự kiện saving để cập nhật slug trước khi mô hình được lưu
        static::saving(function ($tieuChi) {
            $tieuChi->slug = "#".Str::slug($tieuChi->name,"");
        });
    }

    public function resolveRouteBinding($value, $field = null)
    {
        return $this->where($field ?? 'id', $value)->withTrashed()->firstOrFail();
    }

    // public function contacts(): HasMany
    // {
    //     return $this->hasMany(Contact::class);
    // }
    
    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->where('name', 'like', '%'.$search.'%');
        })->when($filters['trashed'] ?? null, function ($query, $trashed) {
            if ($trashed === 'with') {
                $query->withTrashed();
            } elseif ($trashed === 'only') {
                $query->onlyTrashed();
            }
        });
    }
}
