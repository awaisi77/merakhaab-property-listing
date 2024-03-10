<?php

namespace Theme\FlexHome\Http\Controllers;

use Botble\Base\Http\Responses\BaseHttpResponse;
use Botble\Blog\Repositories\Interfaces\PostInterface;
use Botble\Location\Models\City;
use Botble\Location\Repositories\Interfaces\CityInterface;
use Botble\RealEstate\Enums\ModerationStatusEnum;
use Botble\RealEstate\Enums\PropertyStatusEnum;
use Botble\RealEstate\Enums\PropertyTypeEnum;
use Botble\RealEstate\Models\Account;
use Botble\RealEstate\Repositories\Interfaces\AccountInterface;
use Botble\RealEstate\Repositories\Interfaces\CategoryInterface;
use Botble\RealEstate\Repositories\Interfaces\ProjectInterface;
use Botble\RealEstate\Repositories\Interfaces\PropertyInterface;
use Botble\Theme\Http\Controllers\PublicController;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use SeoHelper;
use Theme;
use Theme\FlexHome\Http\Resources\PostResource;
use Theme\FlexHome\Http\Resources\PropertyResource;

class FlexHomeController extends PublicController
{
    /**
     * @param BaseHttpResponse $response
     * @return BaseHttpResponse|\Response
     * @throws \Illuminate\Contracts\Filesystem\FileNotFoundException
     */
    public function getIndex(BaseHttpResponse $response)
    {
        return parent::getIndex($response);
    }

    /**
     * @param BaseHttpResponse $response
     * @param null $key
     * @return BaseHttpResponse|\Response
     * @throws \Illuminate\Contracts\Filesystem\FileNotFoundException
     */
    public function getView(BaseHttpResponse $response, $key = null)
    {
        return parent::getView($response, $key);
    }

    /**
     * @return mixed
     */
    public function getSiteMap()
    {
        return parent::getSiteMap();
    }

    /**
     * @return \Illuminate\Http\Response|\Response
     * @throws \Illuminate\Contracts\Filesystem\FileNotFoundException
     */
    public function contact()
    {
        SeoHelper::setTitle(__('Contact'));

        Theme::breadcrumb()
            ->add(__('Home'), url('/'))
            ->add(__('Contact'), route('public.contact'));

        return Theme::scope('contact')
            ->render();
    }

    /**
     * @param string $slug
     * @param Request $request
     * @param ProjectInterface $projectRepository
     * @param CategoryInterface $categoryRepository
     * @return \Response
     */
    public function getProjectsByCity(
        string $slug,
        Request $request,
        ProjectInterface $projectRepository,
        CategoryInterface $categoryRepository
    ) {
        SeoHelper::setTitle(__('Projects'));

        $filters = [
            'city' => $slug,
        ];

        $params = [
            'paginate' => [
                'per_page'      => theme_option('number_of_projects_per_page', 12),
                'current_paged' => $request->input('page', 1),
            ],
            'order_by' => ['re_projects.created_at' => 'DESC'],
        ];

        $projects = $projectRepository->getProjects($filters, $params);

        $categories = $categoryRepository->pluck('re_categories.name', 're_categories.id');

        return Theme::scope('projects', compact('projects', 'categories'))
            ->render();
    }

    /**
     * @param string $slug
     * @param Request $request
     * @param PropertyInterface $propertyRepository
     * @param CategoryInterface $categoryRepository
     * @return \Response
     */
    public function getPropertiesByCity(
        string $slug,
        Request $request,
        PropertyInterface $propertyRepository,
        CategoryInterface $categoryRepository
    ) {
        SeoHelper::setTitle(__('Properties'));

        $filters = [
            'city' => $slug,
        ];

        $params = [
            'paginate' => [
                'per_page'      => theme_option('number_of_properties_per_page', 12),
                'current_paged' => $request->input('page', 1),
            ],
            'order_by' => ['re_properties.created_at' => 'DESC'],
        ];

        $properties = $propertyRepository->getProperties($filters, $params);


        $categories = $categoryRepository->pluck('re_categories.name', 're_categories.id');

        return Theme::scope('properties', compact('properties', 'categories'))
            ->render();
    }

    /**
     * @param Request $request
     * @param BaseHttpResponse $response
     * @return BaseHttpResponse
     */
    public function ajaxGetProperties(Request $request, BaseHttpResponse $response)
    {
        $properties = [];
        switch ($request->input('type')) {
            case 'related':
                $properties = app(PropertyInterface::class)
                    ->getRelatedProperties($request->input('property_id'),
                        theme_option('number_of_related_properties', 8));
                break;
            case 'rent':
                $properties = app(PropertyInterface::class)->getPropertiesByConditions(
                    [
                        're_properties.is_featured'       => true,
                        're_properties.type'              => PropertyTypeEnum::RENT,
                        ['re_properties.status', 'NOT_IN', [PropertyStatusEnum::NOT_AVAILABLE]],
                        're_properties.moderation_status' => ModerationStatusEnum::APPROVED,
                    ],
                    theme_option('number_of_properties_for_sale', 8),
                    ['currency']
                );
                break;
            case 'sale':
                $properties = app(PropertyInterface::class)->getPropertiesByConditions(
                    [
                        're_properties.is_featured'       => true,
                        're_properties.type'              => PropertyTypeEnum::SALE,
                        ['re_properties.status', 'NOT_IN', [PropertyStatusEnum::NOT_AVAILABLE]],
                        're_properties.moderation_status' => ModerationStatusEnum::APPROVED,
                    ],
                    theme_option('number_of_properties_for_sale', 8),
                    ['currency']
                );
                break;
            case 'project-properties-for-sell':
                $properties = app(PropertyInterface::class)->getPropertiesByConditions(
                    [
                        're_properties.project_id'        => $request->input('project_id'),
                        're_properties.type'              => PropertyTypeEnum::SALE,
                        ['re_properties.status', 'NOT_IN', [PropertyStatusEnum::NOT_AVAILABLE]],
                        're_properties.moderation_status' => ModerationStatusEnum::APPROVED,
                    ],
                    theme_option('number_of_properties_for_sale', 8),
                    ['currency']
                );
                break;
            case 'project-properties-for-rent':
                $properties = app(PropertyInterface::class)->getPropertiesByConditions(
                    [
                        're_properties.project_id'        => $request->input('project_id'),
                        're_properties.type'              => PropertyTypeEnum::RENT,
                        ['re_properties.status', 'NOT_IN', [PropertyStatusEnum::NOT_AVAILABLE]],
                        're_properties.moderation_status' => ModerationStatusEnum::APPROVED,
                    ],
                    theme_option('number_of_properties_for_sale', 8),
                    ['currency']
                );
                break;
        }

        return $response
            ->setData(PropertyResource::collection($properties))
            ->toApiResponse();
    }

    /**
     * @param BaseHttpResponse $response
     * @return BaseHttpResponse|\Illuminate\Http\RedirectResponse|\Illuminate\Http\Resources\Json\JsonResource
     */
    public function ajaxGetPosts(BaseHttpResponse $response)
    {
        $posts = app(PostInterface::class)->getFeatured(4);

        return $response
            ->setData(PostResource::collection($posts))
            ->toApiResponse();
    }

    /**
     * @param string $slug
     * @param Request $request
     * @param PropertyInterface $propertyRepository
     * @param CategoryInterface $categoryRepository
     * @return \Response
     */
    public function getAgent(
        string $username,
        Request $request,
        AccountInterface $accountRepository,
        PropertyInterface $propertyRepository
    ) {
        $account = $accountRepository->getFirstBy(['username' => $username]);

        if (!$account) {
            abort(404);
        }

        SeoHelper::setTitle($account->getFullName());

        $properties = $propertyRepository->advancedGet([
            'condition' => [
                'author_id'   => $account->id,
                'author_type' => Account::class,
            ],
            'paginate'  => [
                'per_page'      => 12,
                'current_paged' => $request->input('page'),
            ],
        ]);

        return Theme::scope('real-estate.agent', compact('properties', 'account'))
            ->render();
    }

    /**
     * @param Request $request
     * @param CityInterface $cityRepository
     * @param BaseHttpResponse $response
     * @return mixed
     */
    public function ajaxGetCities(Request $request, CityInterface $cityRepository, BaseHttpResponse $response)
    {
        $keyword = $request->input('k');

        $cities = $cityRepository->getModel()
            ->join('states', 'states.id', '=', 'cities.state_id')
            ->where(function (Builder $query) use ($keyword) {
                return $query
                    ->where('cities.name', 'LIKE', '%' . $keyword . '%')
                    ->orWhere('states.name', 'LIKE', '%' . $keyword . '%');
            })
            ->limit(10)
            ->get(['cities.*']);

        return $response->setData(Theme::partial('city-suggestion', ['items' => $cities]));
    }

    public function getCityfromCountry(Request $request)
    {
        $cities = City::where('country_id',$request['country'])->get();
        return response()->json($cities);
    }
}
