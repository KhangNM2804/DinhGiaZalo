<?php

namespace App\Http\Resources;


use Illuminate\Http\Resources\Json\JsonResource;

class DinhGiaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'price' => $this->price,
            'deleted_at' => $this->deleted_at,
            'cumdinhgia'=>$this->cumdinhgia()->orderBy('id')->pluck('tieuchi_id')
        ];
    }
}
