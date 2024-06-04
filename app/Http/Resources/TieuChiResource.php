<?php

namespace App\Http\Resources;


use Illuminate\Http\Resources\Json\JsonResource;

class TieuChiResource extends JsonResource
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
            'slug' => $this->slug,
            'deleted_at' => $this->deleted_at,
        ];
    }
}
