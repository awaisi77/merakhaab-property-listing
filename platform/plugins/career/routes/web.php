<?php

use Botble\Career\Models\Career;

Route::group(['namespace' => 'Botble\Career\Http\Controllers', 'middleware' => ['web', 'core']], function () {

    Route::group(['prefix' => BaseHelper::getAdminPrefix(), 'middleware' => 'auth'], function () {

        Route::resource('careers', 'CareerController', ['names' => 'career']);

        Route::group(['prefix' => 'careers'], function () {

            Route::delete('items/destroy', [
                'as'         => 'career.deletes',
                'uses'       => 'CareerController@deletes',
                'permission' => 'career.destroy',
            ]);
        });
    });

    if (defined('THEME_MODULE_SCREEN_NAME')) {
        Route::group(apply_filters(BASE_FILTER_GROUP_PUBLIC_ROUTE, []), function () {
            Route::get(SlugHelper::getPrefix(Career::class, 'careers'), 'PublicController@careers')
                ->name('public.careers');

            Route::get(SlugHelper::getPrefix(Career::class, 'careers') . '/{slug}', 'PublicController@career');
        });
    }
});
