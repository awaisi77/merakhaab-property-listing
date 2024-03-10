<?php

namespace Botble\RealEstate\Tables;

use Botble\RealEstate\Models\Account;
use Botble\RealEstate\Models\Country;
use Html;
use Illuminate\Support\Facades\Auth;
use Botble\RealEstate\Repositories\Interfaces\AccountInterface;
use Botble\Table\Abstracts\TableAbstract;
use Illuminate\Contracts\Routing\UrlGenerator;
use Yajra\DataTables\DataTables;

class AccountTable extends TableAbstract
{

    /**
     * @var bool
     */
    protected $hasActions = true;

    /**
     * @var bool
     */
    protected $hasFilter = true;

    /**
     * AccountTable constructor.
     * @param DataTables $table
     * @param UrlGenerator $urlGenerator
     * @param AccountInterface $accountRepository
     */
    public function __construct(DataTables $table, UrlGenerator $urlGenerator, AccountInterface $accountRepository)
    {
        $this->repository = $accountRepository;
        $this->setOption('id', 'table-accounts');
        parent::__construct($table, $urlGenerator);

        if (!Auth::user()->hasAnyPermission(['account.edit', 'account.destroy'])) {
            $this->hasOperations = false;
            $this->hasActions = false;
        }
    }

    /**
     * Display ajax response.
     *
     * @return \Illuminate\Http\JsonResponse
     *
     * @since 2.1
     */
    public function ajax()
    {

        $data = $this->table
            ->eloquent($this->query())
            ->editColumn('first_name', function ($item) {
                if (!Auth::user()->hasPermission('account.edit')) {
                    return $item->getFullName();
                }

                return Html::link(route('account.edit', $item->id), $item->getFullName());
            })
            ->editColumn('phone', function($item){
                return $item->phone;
            })
            ->editColumn('country', function($item){
                return $item->country->name;
            })
            ->editColumn('city', function($item){
                return $item->city->name;
            })
            ->editColumn('checkbox', function ($item) {
                return $this->getCheckbox($item->id);
            })
            ->editColumn('created_at', function ($item) {
                return \BaseHelper::formatDate($item->created_at);
            });

        return apply_filters(BASE_FILTER_GET_LIST_DATA, $data, $this->repository->getModel())
            ->addColumn('operations', function ($item) {
                return $this->getOperations('account.edit', 'account.destroy', $item);
            })
            ->escapeColumns([])
            ->make(true);
    }

    /**
     * Get the query object to be processed by the table.
     *
     * @return \Illuminate\Database\Query\Builder|\Illuminate\Database\Eloquent\Builder
     *
     * @since 2.1
     */
    public function query()
    {
        $model = app(AccountInterface::class)->getModel();
        $select = [
            're_accounts.id',
            're_accounts.first_name',
            're_accounts.last_name',
            're_accounts.email',
            're_accounts.phone',
            're_accounts.country_id',
            're_accounts.city_id',
            're_accounts.type',
            're_accounts.created_at',
        ];

        $query = $model->select($select);

        return $this->applyScopes(apply_filters(BASE_FILTER_TABLE_QUERY, $query, $model, $select));
    }

    /**
     * @return array
     *
     * @since 2.1
     */
    public function columns()
    {
        return [
            'id'         => [
                'name'  => 're_accounts.id',
                'title' => trans('core/base::tables.id'),
                'width' => '20px',
            ],
            'first_name' => [
                'name'  => 're_accounts.first_name',
                'title' => trans('core/base::tables.name'),
                'class' => 'text-left',
            ],
             'type' => [
                'name'  => 're_accounts.type',
                'title' => __('Type'),
                'class' => 'text-left',
            ],
            'phone' => [
                'name'  => 're_accounts.phone',
                'title' => __('Phone'),
                'class' => 'text-left',
            ],
            'country' => [
                'name'  => 're_accounts.country_id',
                'title' => __('Country'),
                'class' => 'text-left',
            ],
            'city' => [
                'name'  => 're_accounts.city_id',
                'title' => __('City'),
                'class' => 'text-left',
            ],

            'email'      => [
                'name'  => 're_accounts.email',
                'title' => trans('core/base::tables.email'),
                'class' => 'text-left',
            ],
            'created_at' => [
                'name'  => 're_accounts.created_at',
                'title' => trans('core/base::tables.created_at'),
                'width' => '100px',
            ],
        ];
    }

    /**
     * @return array
     *
     * @since 2.1
     * @throws \Throwable
     */
    public function buttons()
    {
        $buttons = $this->addCreateButton(route('account.create'), 'account.create');

        return apply_filters(BASE_FILTER_TABLE_BUTTONS, $buttons, Account::class);
    }

    /**
     * @return array
     * @throws \Throwable
     */
    public function bulkActions(): array
    {
        return $this->addDeleteAction(route('account.deletes'), 'account.destroy', parent::bulkActions());
    }

    /**
     * @return array
     */
    public function getBulkChanges(): array
    {
        return [
            're_accounts.first_name' => [
                'title'    => __('First name'),
                'type'     => 'text',
                'validate' => 'required|max:120',
            ],
            're_accounts.last_name' => [
                'title'    => __('Last name'),
                'type'     => 'text',
                'validate' => 'required|max:120',
            ],
                're_accounts.type' => [
                'title'    => __('Type'),
                'type'     => 'text',
                'validate' => 'required|max:120',
            ],
            're_accounts.email'      => [
                'title'    => trans('core/base::tables.email'),
                'type'     => 'text',
                'validate' => 'required|max:120|email',
            ],
            're_accounts.created_at' => [
                'title' => trans('core/base::tables.created_at'),
                'type'  => 'date',
            ],
        ];
    }
}
