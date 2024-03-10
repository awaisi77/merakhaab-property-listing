<?php

namespace Botble\Paystack\Http\Controllers;

use Botble\Base\Http\Controllers\BaseController;
use Botble\Base\Http\Responses\BaseHttpResponse;
use Botble\Payment\Enums\PaymentStatusEnum;
use Botble\Payment\Services\Traits\PaymentTrait;
use Illuminate\Http\Request;
use Paystack;
use Throwable;

class PaystackController extends BaseController
{
    use PaymentTrait;

    /**
     * @param Request $request
     * @param BaseHttpResponse $response
     * @return BaseHttpResponse|\Illuminate\Http\RedirectResponse
     * @throws Throwable
     */
    public function getPaymentStatus(Request $request, BaseHttpResponse $response)
    {
        $result = Paystack::getPaymentData();

        if (!$result['status']) {
            return $response
                ->setError()
                ->setNextUrl(url($result['data']['metadata']['return_url']))
                ->setMessage($result['message']);
        }

        $this->storeLocalPayment([
            'amount'          => $result['data']['amount'] / 100,
            'currency'        => $result['data']['currency'],
            'charge_id'       => $request->input('reference'),
            'payment_channel' => PAYSTACK_PAYMENT_METHOD_NAME,
            'status'          => PaymentStatusEnum::COMPLETED,
            'customer_id'     => auth('account')->check() ? auth('account')->user()->getAuthIdentifier() : null,
            'payment_type'    => 'direct',
        ]);

        $params = [
            'charge_id' => $request->input('reference'),
        ];

        return redirect()->to(url($result['data']['metadata']['callback_url']) . '?' . http_build_query($params));
    }
}
