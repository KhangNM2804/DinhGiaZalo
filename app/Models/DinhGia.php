<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use NumberFormatter;

class DinhGia extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'dinhgia';
    protected static function boot()
    {
        parent::boot();

        // Sử dụng sự kiện creating để tạo slug trước khi mô hình được tạo
        static::deleting(function ($item) {
            $item->cumdinhgia()->delete();
        });

        
    }
    public function resolveRouteBinding($value, $field = null)
    {
        return $this->where($field ?? 'id', $value)->withTrashed()->firstOrFail();
    }

    public function getPriceAttribute($value)
    {
        // Sử dụng NumberFormatter để định dạng giá trị
        $formatter = new NumberFormatter('vi-VN', NumberFormatter::CURRENCY);
        $formattedPrice = $formatter->format($value);

        return $formattedPrice;
    }
    
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

    public function cumdinhgia():HasMany{
        return $this->hasMany(CumDinhGia::class,'dinhgia_id');
    }
}
