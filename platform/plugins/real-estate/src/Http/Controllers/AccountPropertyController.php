<?php

namespace Botble\RealEstate\Http\Controllers;

use Assets;
use Botble\Base\Events\BeforeEditContentEvent;
use Botble\Base\Events\CreatedContentEvent;
use Botble\Base\Events\UpdatedContentEvent;
use Botble\Base\Forms\FormBuilder;
use Botble\Base\Http\Responses\BaseHttpResponse;
use Botble\RealEstate\Forms\AccountPropertyForm;
use Botble\RealEstate\Models\Property;
use Botble\RealEstate\Repositories\Interfaces\PropertyInterface;
use Botble\RealEstate\Http\Requests\PropertyRequest;
use Botble\RealEstate\Models\Account;
use Botble\RealEstate\Repositories\Interfaces\AccountActivityLogInterface;
use Botble\RealEstate\Repositories\Interfaces\AccountInterface;
use Botble\RealEstate\Tables\AccountPropertyTable;
use Exception;
use Illuminate\Contracts\Config\Repository;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use SeoHelper;
use Botble\RealEstate\Services\SaveFacilitiesService;

class AccountPropertyController extends Controller
{
    /**
     * @var AccountInterface
     */
    protected $accountRepository;

    /**
     * @var PropertyInterface
     */
    protected $propertyRepository;

    /**
     * @var AccountActivityLogInterface
     */
    protected $activityLogRepository;

    /**
     * PublicController constructor.
     * @param Repository $config
     * @param AccountInterface $accountRepository
     * @param PropertyInterface $propertyRepository
     * @param AccountActivityLogInterface $accountActivityLogRepository
     */
    public function __construct(
        Repository $config,
        AccountInterface $accountRepository,
        PropertyInterface $propertyRepository,
        AccountActivityLogInterface $accountActivityLogRepository
    ) {
        $this->accountRepository = $accountRepository;
        $this->propertyRepository = $propertyRepository;
        $this->activityLogRepository = $accountActivityLogRepository;

        Assets::setConfig($config->get('plugins.real-estate.assets'));
    }

    /**
     * @param Request $request
     * @param AccountPropertyTable $propertyTable
     * @return \Illuminate\Http\JsonResponse|\Illuminate\View\View|\Response
     * @throws \Throwable
     */
    public function index(AccountPropertyTable $propertyTable)
    {
        SeoHelper::setTitle(__('Properties'));

        return $propertyTable->render('plugins/real-estate::account.table.base');
    }

    /**
     * @param FormBuilder $formBuilder
     * @return string
     * @throws \Throwable
     */
    public function create(FormBuilder $formBuilder)
    {
        if (!auth('account')->user()->canPost()) {
            abort(403);
        }

        SeoHelper::setTitle(__('Write a property'));

        return $formBuilder->create(AccountPropertyForm::class)->renderForm();
    }

    /**
     * @param PropertyRequest $request
     * @param BaseHttpResponse $response
     * @param AccountInterface $accountRepository
     * @return BaseHttpResponse
     */
    public function store(PropertyRequest $request, BaseHttpResponse $response, AccountInterface $accountRepository,SaveFacilitiesService $saveFacilitiesService)
    {
        if (!auth('account')->user()->canPost()) {
            abort(403);
        }

        $request->merge(['expire_date' => now()->addDays(45)]);

        /**
         * @var Property $property
         */
         
         
    
         
        $property = $this->propertyRepository->createOrUpdate(array_merge($request->input(), [
            'author_id'   => auth('account')->user()->getAuthIdentifier(),
            'author_type' => Account::class,
        ]));

    //   dd($property);

        if ($property) {
            $property->features()->sync($request->input('features', []));
            
             $saveFacilitiesService->execute($property, $request->input('facilities'));
        }
        


        event(new CreatedContentEvent(PROPERTY_MODULE_SCREEN_NAME, $request, $property));

        $this->activityLogRepository->createOrUpdate([
            'action'         => 'create_property',
            'reference_name' => $property->name,
            'reference_url'  => route('public.account.properties.edit', $property->id),
        ]);

        $account = $accountRepository->findOrFail(auth('account')->user()->getAuthIdentifier());
        $account->credits--;
        $account->save();

        return $response
            ->setPreviousUrl(route('public.account.properties.index'))
            ->setNextUrl(route('public.account.properties.edit', $property->id))
            ->setMessage(trans('core/base::notices.create_success_message'));
    }

    /**
     * @param int $id
     * @param FormBuilder $formBuilder
     * @param Request $request
     * @return string
     *
     * @throws \Throwable
     */
    public function edit($id, FormBuilder $formBuilder, Request $request)
    {
        $property = $this->propertyRepository->getFirstBy([
            'id'          => $id,
            'author_id'   => auth('account')->user()->getAuthIdentifier(),
            'author_type' => Account::class,
        ]);

        if (!$property) {
            abort(404);
        }

        event(new BeforeEditContentEvent($request, $property));

        SeoHelper::setTitle(trans('plugins/real-estate::property.edit') . ' "' . $property->name . '"');

        return $formBuilder
            ->create(AccountPropertyForm::class, ['model' => $property])
            ->renderForm();
    }

    /**
     * @param int $id
     * @param PropertyRequest $request
     * @param BaseHttpResponse $response
     * @return BaseHttpResponse
     *
     * @throws \Illuminate\Contracts\Filesystem\FileNotFoundException
     */
    public function update($id, PropertyRequest $request, BaseHttpResponse $response,SaveFacilitiesService $saveFacilitiesService)
    {
        $property = $this->propertyRepository->getFirstBy([
            'id'          => $id,
            'author_id'   => auth('account')->user()->getAuthIdentifier(),
            'author_type' => Account::class,
        ]);

        if (!$property) {
            abort(404);
        }

        $property->fill($request->except(['expire_date']));

        $this->propertyRepository->createOrUpdate($property);

        $property->features()->sync($request->input('features', []));
        
         $saveFacilitiesService->execute($property, $request->input('facilities'));


        event(new UpdatedContentEvent(PROPERTY_MODULE_SCREEN_NAME, $request, $property));

        $this->activityLogRepository->createOrUpdate([
            'action'         => 'update_property',
            'reference_name' => $property->name,
            'reference_url'  => route('public.account.properties.edit', $property->id),
        ]);

        return $response
            ->setPreviousUrl(route('public.account.properties.index'))
            ->setNextUrl(route('public.account.properties.edit', $property->id))
            ->setMessage(trans('core/base::notices.update_success_message'));
    }

    /**
     * @param $id
     * @param BaseHttpResponse $response
     * @return BaseHttpResponse
     * @throws Exception
     */
    public function destroy($id, BaseHttpResponse $response)
    {
        $property = $this->propertyRepository->getFirstBy([
            'id'          => $id,
            'author_id'   => auth('account')->user()->getAuthIdentifier(),
            'author_type' => Account::class,
        ]);

        if (!$property) {
            abort(404);
        }

        $this->propertyRepository->delete($property);

        $this->activityLogRepository->createOrUpdate([
            'action'         => 'delete_property',
            'reference_name' => $property->name,
        ]);

        return $response->setMessage(__('Delete property successfully!'));
    }

    /**
     * @param $id
     * @param BaseHttpResponse $response
     * @return BaseHttpResponse
     */
    public function renew($id, BaseHttpResponse $response)
    {
        $job = $this->propertyRepository->findOrFail($id);

        $account = auth('account')->user();

        if ($account->credits < 1) {
            return $response->setError(true)->setMessage(__('You don\'t have enough credit to renew this property!'));
        }

        $job->expire_date = $job->expire_date->addDays(config('plugins.real-estate.real-estate.property_expired_after_x_days'));
        $job->save();

        $account->credits--;
        $account->save();

        return $response->setMessage(__('Renew property successfully'));
    }
}
