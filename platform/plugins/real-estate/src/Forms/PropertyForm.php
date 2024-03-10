<?php

namespace Botble\RealEstate\Forms;

use Assets;
use Botble\Base\Forms\FormAbstract;
use Botble\Location\Repositories\Interfaces\CityInterface;
use Botble\RealEstate\Enums\ModerationStatusEnum;
use Botble\RealEstate\Enums\PropertyPeriodEnum;
use Botble\RealEstate\Enums\PropertyStatusEnum;
use Botble\RealEstate\Enums\PropertyTypeEnum;
use Botble\RealEstate\Forms\Fields\LocationField;
use Botble\RealEstate\Http\Requests\PropertyRequest;
use Botble\RealEstate\Models\Property;
use Botble\RealEstate\Repositories\Interfaces\CategoryInterface;
use Botble\RealEstate\Repositories\Interfaces\CurrencyInterface;
use Botble\RealEstate\Repositories\Interfaces\FacilityInterface;
use Botble\RealEstate\Repositories\Interfaces\FeatureInterface;
use Botble\RealEstate\Repositories\Interfaces\ProjectInterface;
use Botble\RealEstate\Repositories\Interfaces\PropertyInterface;
use Throwable;

class PropertyForm extends FormAbstract
{
    /**
     * @var FacilityInterface
     */
    protected $facilityRepository;

    /**
     * @var PropertyInterface
     */
    protected $propertyRepository;

    /**
     * @var ProjectInterface
     */
    protected $projectRepository;

    /**
     * @var FeatureInterface
     */
    protected $featureRepository;

    /**
     * @var CurrencyInterface
     */
    protected $currencyRepository;

    /**
     * @var CityInterface
     */
    protected $cityRepository;

    /**
     * @var CategoryInterface
     */
    protected $categoryRepository;

    /**
     * PropertyForm constructor.
     * @param PropertyInterface $propertyRepository
     * @param ProjectInterface $projectRepository
     * @param FeatureInterface $featureRepository
     * @param CurrencyInterface $currencyRepository
     * @param CityInterface $cityRepository
     * @param CategoryInterface $categoryRepository
     * @param FacilityInterface $facilityRepository
     */
    public function __construct(
        PropertyInterface $propertyRepository,
        ProjectInterface $projectRepository,
        FeatureInterface $featureRepository,
        CurrencyInterface $currencyRepository,
        CityInterface $cityRepository,
        CategoryInterface $categoryRepository,
        FacilityInterface $facilityRepository
    ) {
        parent::__construct();
        $this->propertyRepository = $propertyRepository;
        $this->projectRepository = $projectRepository;
        $this->featureRepository = $featureRepository;
        $this->currencyRepository = $currencyRepository;
        $this->cityRepository = $cityRepository;
        $this->categoryRepository = $categoryRepository;
        $this->facilityRepository = $facilityRepository;
    }

    /**
     * @return mixed|void
     * @throws Throwable
     */
    public function buildForm()
    {
        Assets::addStyles(['datetimepicker'])
            ->addScripts(['input-mask'])
            ->addScriptsDirectly([
                'vendor/core/plugins/real-estate/js/real-estate.js',
                'vendor/core/plugins/real-estate/js/components.js',
            ])
            ->addStylesDirectly('vendor/core/plugins/real-estate/css/real-estate.css');

        $projects = $this->projectRepository->pluck('re_projects.name', 're_projects.id');

        $currencies = $this->currencyRepository->pluck('re_currencies.title', 're_currencies.id');
        $cities = $this->cityRepository->pluck('cities.name', 'cities.id');

        $categories = $this->categoryRepository->pluck('re_categories.name', 're_categories.id');

        $selectedFeatures = [];
        if ($this->getModel()) {
            $selectedFeatures = $this->getModel()->features()->pluck('re_features.id')->all();
        }

        $features = $this->featureRepository->allBy([], [], ['re_features.id', 're_features.name']);

        $facilities = $this->facilityRepository->allBy([], [], ['re_facilities.id', 're_facilities.name']);
        $selectedFacilities = [];
        if ($this->getModel()) {
            $selectedFacilities = $this->getModel()->facilities()->select('re_facilities.id', 'distance')->get();
        }

        $this
            ->setupModel(new Property)
            ->setValidatorClass(PropertyRequest::class)
            ->withCustomFields()
            ->addCustomField('location', LocationField::class)
            ->add('name', 'text', [
                'label'      => trans('plugins/real-estate::property.form.name'),
                'label_attr' => ['class' => 'control-label required'],
                'attr'       => [
                    'placeholder'  => trans('plugins/real-estate::property.form.name'),
                    'data-counter' => 120,
                ],
            ])
            ->add('type', 'customSelect', [
                'label'      => trans('plugins/real-estate::property.form.type'),
                'label_attr' => ['class' => 'control-label required'],
                'choices'    => PropertyTypeEnum::labels(),
            ])
            ->add('is_featured', 'onOff', [
                'label'         => trans('core/base::forms.is_featured'),
                'label_attr'    => ['class' => 'control-label'],
                'default_value' => false,
            ])
            ->add('description', 'textarea', [
                'label'      => trans('core/base::forms.description'),
                'label_attr' => ['class' => 'control-label'],
                'attr'       => [
                    'rows'         => 4,
                    'placeholder'  => trans('core/base::forms.description_placeholder'),
                    'data-counter' => 350,
                ],
            ])
            ->add('content', 'editor', [
                'label'      => trans('core/base::forms.content'),
                'label_attr' => ['class' => 'control-label required'],
                'attr'       => [
                    'rows' => 4,
                ],
            ])
            ->add('images[]', 'mediaImages', [
                'label'      => trans('plugins/real-estate::property.form.images'),
                'label_attr' => ['class' => 'control-label'],
                'values' => $this->getModel()->id ? $this->getModel()->images : [],
            ])
            ->add('city_id', 'customSelect', [
                'label'      => trans('plugins/real-estate::property.form.city'),
                'label_attr' => ['class' => 'control-label'],
                'attr'       => [
                    'class' => 'form-control select-search-full',
                ],
                'choices'    => $cities,
            ])
            ->add('location', 'location', [
                'label'      => trans('plugins/real-estate::property.form.location'),
                'label_attr' => ['class' => 'control-label required'],
                'attr'       => [
                    'placeholder'  => trans('plugins/real-estate::property.form.location'),
                    'data-counter' => 300,
                ],
            ])
            ->add('rowOpen1', 'html', [
                'html' => '<div class="row">',
            ])
            ->add('number_bedroom', 'number', [
                'label'      => trans('plugins/real-estate::property.form.number_bedroom'),
                'label_attr' => ['class' => 'control-label'],
                'wrapper'    => [
                    'class' => 'form-group col-md-3',
                ],
                'attr'       => [
                    'placeholder' => trans('plugins/real-estate::property.form.number_bedroom'),
                ],
            ])
            ->add('number_bathroom', 'number', [
                'label'      => trans('plugins/real-estate::property.form.number_bathroom'),
                'label_attr' => ['class' => 'control-label'],
                'wrapper'    => [
                    'class' => 'form-group col-md-3',
                ],
                'attr'       => [
                    'placeholder' => trans('plugins/real-estate::property.form.number_bathroom'),
                ],
            ])
            ->add('number_floor', 'number', [
                'label'      => trans('plugins/real-estate::property.form.number_floor'),
                'label_attr' => ['class' => 'control-label'],
                'wrapper'    => [
                    'class' => 'form-group col-md-3',
                ],
                'attr'       => [
                    'placeholder' => trans('plugins/real-estate::property.form.number_floor'),
                ],
            ])
            ->add('size_type', 'customSelect', [
                'label'      => __('Size Type'),
                'label_attr' => ['class' => 'control-label'],
                'attr'       => [
                    'class' => 'form-control col-md-3',
                ],
                'choices'    => ['Kanal'=>'Kanal','Square Ft'=>'Sq/ft','Marla'=>'Marla','Square m2'=>'Sq/m2','Square yd'=>'Sq/yd'],
            ])
            ->add('square', 'number', [
                'label'      => __('Marla/Sq m2/Sq yd'),
                'label_attr' => ['class' => 'control-label'],
                'wrapper'    => [
                    'class' => 'form-group col-md-3',
                ],
                'attr'       => [
                    'placeholder' => trans('plugins/real-estate::property.form.square'),
                ],
            ])
            ->add('rowClose1', 'html', [
                'html' => '</div>',
            ])
            ->add('rowOpen2', 'html', [
                'html' => '<div class="row">',
            ])
            ->add('price', 'text', [
                'label'      => trans('plugins/real-estate::property.form.price'),
                'label_attr' => ['class' => 'control-label'],
                'wrapper'    => [
                    'class' => 'form-group col-md-4',
                ],
                'attr'       => [
                    'id'          => 'price-number',
                    'placeholder' => trans('plugins/real-estate::property.form.price'),
                    'class'       => 'form-control input-mask-number',
                ],
            ])
            ->add('currency_id', 'customSelect', [
                'label'      => trans('plugins/real-estate::project.form.currency'),
                'label_attr' => ['class' => 'control-label'],
                'wrapper'    => [
                    'class' => 'form-group col-md-4',
                ],
                'attr'       => [
                    'class' => 'form-control select-full',
                ],
                'choices'    => $currencies,
            ])
            ->add('period', 'customSelect', [
                'label'      => trans('plugins/real-estate::property.form.period'),
                'label_attr' => ['class' => 'control-label required'],
                'wrapper'    => [
                    'class' => 'form-group col-md-4' . ($this->getModel()->type != PropertyTypeEnum::RENT ? ' hidden' : null),
                ],
                'attr'       => [
                    'class' => 'form-control select-search-full',
                ],
                'choices'    => PropertyPeriodEnum::labels(),
            ])
            ->add('rowClose2', 'html', [
                'html' => '</div>',
            ])
            ->add('never_expired', 'onOff', [
                'label'         => __('Never expired?'),
                'label_attr'    => ['class' => 'control-label'],
                'default_value' => true,
            ])
            ->add('auto_renew', 'onOff', [
                'label'         => __('Renew automatically (you will be charged again in :days days)?',
                    ['days' => config('plugins.real-estate.real-estate.property_expired_after_x_days')]),
                'label_attr'    => ['class' => 'control-label'],
                'default_value' => false,
                'wrapper'       => [
                    'class' => 'form-group ' . (!$this->getModel()->id || $this->getModel()->never_expired == true ? ' hidden' : null),
                ],
            ])
            ->addMetaBoxes([
                'features'   => [
                    'title'    => trans('plugins/real-estate::property.form.features'),
                    'content'  => view('plugins/real-estate::partials.form-features',
                        compact('selectedFeatures', 'features'))->render(),
                    'priority' => 1,
                ],
                'facilities' => [
                    'title'    => __('Distance key between facilities'),
                    'content'  => view('plugins/real-estate::partials.form-facilities',
                        compact('facilities', 'selectedFacilities')),
                    'priority' => 0,
                ],
            ])
            ->add('status', 'customSelect', [
                'label'      => trans('core/base::tables.status'),
                'label_attr' => ['class' => 'control-label required'],
                'attr'       => [
                    'class' => 'form-control select-search-full',
                ],
                'choices'    => PropertyStatusEnum::labels(),
            ])
            ->add('moderation_status', 'customSelect', [
                'label'      => trans('plugins/real-estate::property.moderation_status'),
                'label_attr' => ['class' => 'control-label required'],
                'attr'       => [
                    'class' => 'form-control select-full',
                ],
                'choices'    => ModerationStatusEnum::labels(),
            ])
            ->add('category_id', 'customSelect', [
                'label'      => trans('plugins/real-estate::property.form.category'),
                'label_attr' => ['class' => 'control-label'],
                'attr'       => [
                    'class' => 'form-control select-search-full',
                    'id' => 'category_id',
                ],
                'choices'    => $categories,
            ])
            ->add('sub_cat', 'customSelect', [
                'label'      => __('Sub Category'),
                'label_attr' => ['class' => 'control-label'],
                'attr'       => [
                    'class' => 'form-control select-search-full',
                    'id'=>'sub_cat'
                ],
                 'choices' => array('Homes' => array(
                        'Flat' => 'Flat', 'Upper Portion' => 'Upper Portion',
                        'Farm house' => 'Farm house',
                        'Room' => 'Room',
                        'Penthouse' => 'Penthouse',
                    ),
                        'Plot' => array(
                            'Resdidential plot' => 'Resdidential plot',
                            'Commercial plot' => 'Commercial plot',
                            'Agriculture land' => 'Agriculture land',
                            'Industrial land' => 'Industrial land',
                            'Plot file' => 'Plot file',
                            'Plot Form' => ' Plot Form'),
                        'Commercial' => array(
                            'Office' => 'Office',
                            'Shop' => 'Shop',
                            'Warehouse' => 'Warehouse',
                            'Factory' => 'Factory',
                            'Building' => 'Building',
                            'Other' => 'Other')
                    ),
            ])
            ->add('project_id', 'customSelect', [
                'label'      => trans('plugins/real-estate::property.form.project'),
                'label_attr' => ['class' => 'control-label'],
                'choices'    => [0 => __('Select a project...')] + $projects,
            ])
            ->setBreakFieldPoint('status')
            ->add('author_id', 'autocomplete', [
                'label'      => __('Account'),
                'label_attr' => [
                    'class' => 'control-label',
                ],
                'attr'       => [
                    'id'       => 'author_id',
                    'data-url' => route('account.list'),
                ],
                'choices'    => $this->getModel()->author_id ?
                    [
                        $this->model->author->id => $this->model->author->getFullName(),
                    ]
                    :
                    ['' => __('Select account...')],
            ]);
    }
}
