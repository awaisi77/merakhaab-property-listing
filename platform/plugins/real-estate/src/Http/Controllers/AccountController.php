<?php

namespace Botble\RealEstate\Http\Controllers;

use Botble\Base\Events\CreatedContentEvent;
use Botble\Base\Events\DeletedContentEvent;
use Botble\Base\Events\UpdatedContentEvent;
use Botble\Base\Forms\FormBuilder;
use Botble\Base\Http\Controllers\BaseController;
use Botble\Base\Http\Responses\BaseHttpResponse;
use Botble\Base\Traits\HasDeleteManyItemsTrait;
use Botble\RealEstate\Forms\AccountForm;
use Botble\RealEstate\Http\Requests\AccountCreateRequest;
use Botble\RealEstate\Http\Requests\AccountEditRequest;
use Botble\RealEstate\Http\Resources\AccountResource;
use Botble\RealEstate\Repositories\Interfaces\AccountInterface;
use Botble\RealEstate\Tables\AccountTable;
use Exception;
use Illuminate\Http\Request;

class AccountController extends BaseController
{
    use HasDeleteManyItemsTrait;

    /**
     * @var AccountInterface
     */
    protected $accountRepository;

    /**
     * @param AccountInterface $accountRepository
     */
    public function __construct(AccountInterface $accountRepository)
    {
        $this->accountRepository = $accountRepository;
    }

    /**
     * @param AccountTable $dataTable
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     * @throws \Throwable
     */
    public function index(AccountTable $dataTable)
    {

        page_title()->setTitle(trans('plugins/real-estate::account.name'));

//        dd($dataTable);
        return $dataTable->renderTable();
    }

    /**
     * @param FormBuilder $formBuilder
     * @return string
     */
    public function create(FormBuilder $formBuilder)
    {
        page_title()->setTitle(trans('plugins/real-estate::account.create'));

        return $formBuilder
            ->create(AccountForm::class)
            ->remove('is_change_password')
            ->renderForm();
    }

    /**
     * @param AccountCreateRequest $request
     * @param BaseHttpResponse $response
     * @return BaseHttpResponse
     */
    public function store(AccountCreateRequest $request, BaseHttpResponse $response)
    {
        $request->merge([
            'password'     => bcrypt($request->input('password')),
            'confirmed_at' => now(),
        ]);

        $account = $this->accountRepository->createOrUpdate($request->input());

        event(new CreatedContentEvent(ACCOUNT_MODULE_SCREEN_NAME, $request, $account));

        return $response
            ->setPreviousUrl(route('account.index'))
            ->setNextUrl(route('account.edit', $account->id))
            ->setMessage(trans('core/base::notices.create_success_message'));
    }

    /**
     * @param $id
     * @param FormBuilder $formBuilder
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View|string
     */
    public function edit($id, FormBuilder $formBuilder)
    {
        $account = $this->accountRepository->findOrFail($id);
        page_title()->setTitle(trans('plugins/real-estate::account.edit', ['name' => $account->getFullName()]));

        $account->password = null;

        $countries = \Botble\Location\Models\Country::all();

        $country_list = array();
        foreach ($countries as $key=>$country){
            $country_list[$country->id] = $country->name;
        }


        return $formBuilder
            ->create(AccountForm::class, ['model' => $account])
            ->renderForm();
    }

    /**
     * @param $id
     * @param AccountEditRequest $request
     * @param BaseHttpResponse $response
     * @return BaseHttpResponse
     */
    public function update($id, AccountEditRequest $request, BaseHttpResponse $response)
    {
        if ($request->input('is_change_password') == 1) {
            $request->merge(['password' => bcrypt($request->input('password'))]);
            $data = $request->input();
        } else {
            $data = $request->except('password');
        }

        $type_user = strtolower($data['type']);

        $data['type'] = $type_user;

        $account = $this->accountRepository->createOrUpdate($data, ['id' => $id]);

        event(new UpdatedContentEvent(ACCOUNT_MODULE_SCREEN_NAME, $request, $account));

        return $response
            ->setPreviousUrl(route('account.index'))
            ->setMessage(trans('core/base::notices.update_success_message'));
    }

    /**
     * @param Request $request
     * @param $id
     * @param BaseHttpResponse $response
     * @return BaseHttpResponse
     */
    public function destroy(Request $request, $id, BaseHttpResponse $response)
    {
        try {
            $account = $this->accountRepository->findOrFail($id);
            $this->accountRepository->delete($account);
            event(new DeletedContentEvent(ACCOUNT_MODULE_SCREEN_NAME, $request, $account));

            return $response->setMessage(trans('core/base::notices.delete_success_message'));
        } catch (Exception $exception) {
            return $response
                ->setError()
                ->setMessage(trans('core/base::notices.cannot_delete'));
        }
    }

    /**
     * @param Request $request
     * @param BaseHttpResponse $response
     * @return BaseHttpResponse
     * @throws Exception
     */
    public function deletes(Request $request, BaseHttpResponse $response)
    {
        return $this->executeDeleteItems($request, $response, $this->accountRepository, ACCOUNT_MODULE_SCREEN_NAME);
    }

    /**
     * @param Request $request
     * @param BaseHttpResponse $response
     */
    public function getList(Request $request, BaseHttpResponse $response)
    {
        $keyword = $request->input('q');

        if (!$keyword) {
            return $response->setData([]);
        }

        $data = $this->accountRepository->getModel()
            ->where('re_accounts.first_name', 'LIKE', '%' . $keyword . '%')
            ->orWhere('re_accounts.last_name', 'LIKE', '%' . $keyword . '%')
            ->select(['re_accounts.id', 're_accounts.first_name', 're_accounts.last_name'])
            ->take(10)
            ->get();

        return $response->setData(AccountResource::collection($data));
    }
}
