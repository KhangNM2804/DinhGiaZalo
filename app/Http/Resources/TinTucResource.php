<?php

namespace App\Http\Resources;


use Illuminate\Http\Resources\Json\JsonResource;

class TinTucResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        return [
            'id'=>$this->id,
            'title'=>$this->title,
            'summary_content'=>$this->summary_content,
            'content'=>$this->content,
            'photo'=>$this->photo,
            'deleted_at'=>$this->deleted_at
        ];
    }
}
