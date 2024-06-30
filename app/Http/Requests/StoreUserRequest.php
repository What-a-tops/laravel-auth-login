<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class StoreUserRequest extends FormRequest
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
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|string|unique:users,email',
            'company' => 'required|string|max:255',
            'phone' => 'required|digits:11',
            'password' => [
                'required',
                'confirmed',
                Password::min(5)->letters()
            ],
            'password_confirmation' => [
                'required',
                Password::min(5)->letters()
            ]
        ];
    }
}
