<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DinhGiaUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'name' => ['required', 'max:100', 'unique:dinhgia,name,' . $this->dinhgium->id],
            'price' => ['required', 'numeric', 'min:0'],
        ];

        // Conditionally add the cumdinhgia rule
        if ($this->dinhgium->id != 49) {
            $rules['cumdinhgia'] = ['required', 'array'];
        }

        return $rules;
    }
}
