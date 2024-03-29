<?php

namespace Botble\RealEstate\Http\Resources;

use Botble\RealEstate\Models\Account;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Account
 */
class AccountResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param Request $request
     *
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id'          => $this->id,
            'name'        => $this->getFullName(),
            'first_name'  => $this->first_name,
            'last_name'   => $this->last_name,
            'email'       => $this->email,
            'phone'       => $this->phone,
            'country_id'  => $this->country_id,
            'phone'       => $this->phone,
            'avatar'      => $this->avatar_url,
            'dob'         => $this->dob,
            'gender'      => $this->gender,
            'description' => $this->description,
            'credits'     => $this->credits,
        ];
    }
}
