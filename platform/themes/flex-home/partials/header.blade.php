<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=5, user-scalable=1" name="viewport"/>

    <!-- Fonts-->
    <link href="https://fonts.googleapis.com/css?family={{ urlencode(theme_option('primary_font', 'Nunito Sans')) }}:300,600,700,800" rel="stylesheet" type="text/css">
    <!-- CSS Library-->

    <style>
        :root {
            --primary-color: {{ theme_option('primary_color', '#1d5f6f') }};
            --primary-color-hover: {{ theme_option('primary_color_hover', '#063a5d') }};
            --primary-font: '{{ theme_option('primary_font', 'Nunito Sans') }}';
        }
    </style>

    {!! Theme::header() !!}
</head>
<body @if (BaseHelper::siteLanguageDirection() == 'rtl') dir="rtl" @endif>

<div class="bravo_topbar">
    <div class="container-fluid w90">
        <div class="row">
            <div class="col-12">
                <div class="content">
                    <div class="topbar-left d-none d-sm-block">
                        <div class="top-socials">
                            <a href="{{ theme_option('facebook') }}" title="Facebook" class="fab fa-facebook-f"></a>
                            <a href="{{ theme_option('twitter') }}" title="Twitter" class="fab fa-twitter"></a>
                            <a href="{{ theme_option('youtube') }}" title="Youtube" class="fab fa-youtube"></a>
                        </div>
                        <span class="line"></span>
                        <a href="mailto:{{ theme_option('email') }}">{{ theme_option('email') }}</a>
                    </div>
                    <div class="topbar-right">
                        {!! Theme::partial('language-switcher') !!}
                        <ul class="topbar-items">
                            @if (auth('account')->check())
                                <li class="login-item"><a href="{{ route('public.account.dashboard') }}" rel="nofollow"><i class="fas fa-user"></i> <span>{{ auth('account')->user()->getFullName() }}</span></a></li>
                                <li class="login-item"><a href="#" onclick="event.preventDefault(); document.getElementById('logout-form').submit();" rel="nofollow"><i class="fas fa-sign-out-alt"></i> {{ __('Logout') }}</a></li>
                            @else
                                <li class="login-item">
                                    <a href="{{ route('public.account.login') }}"><i class="fas fa-sign-in-alt"></i>  {{ __('Login') }}</a>
                                </li>
                                <li class="login-item">
                                    <a href="{{ route('public.account.register') }}"><i class="fas fa-user-plus"></i> {{ __('Register') }}</a>
                                </li>
                            @endif
                        </ul>
                        @auth('account')
                            <form id="logout-form" action="{{ route('public.account.logout') }}" method="POST" style="display: none;">
                                @csrf
                            </form>
                        @endauth
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<header class="topmenu bg-light">
    <div class="container-fluid w90">
        <div class="row">
            <div class="col-12">
                <nav class="navbar navbar-expand-lg navbar-light">
                    @if (theme_option('logo'))
                        <a class="navbar-brand" href="{{ route('public.single') }}">
                            <img src="{{ RvMedia::getImageUrl(theme_option('logo')) }}"
                                 class="logo" height="40" alt="{{ theme_option('site_name') }}">
                        </a>
                    @endif
                    <button class="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span class="fas fa-bars"></span>
                    </button>
                    <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                        {!!
                            Menu::renderMenuLocation('main-menu', [
                                'options' => ['class' => 'navbar-nav justify-content-end'],
                                'view'    => 'main-menu',
                            ])
                        !!}
                        <a class="btn btn-primary add-property" href="{{ route('public.account.properties.index') }}">
                            <i class="fas fa-plus-circle"></i> {{ __('Add Property') }}
                        </a>
                    </div>
                </nav>
            </div>
        </div>
    </div>
    @php
        $page = Theme::get('page');
    @endphp
    @if (url()->current() == route('public.single') || ($page && $page->template === 'homepage'))
        <div class="home_banner" style="background-image: url({{ theme_option('home_banner') ? RvMedia::getImageUrl(theme_option('home_banner')) : Theme::asset()->url('images/banner.jpg') }})">
            <div class="topsearch">
                @if (theme_option('home_banner_description'))<h1 class="text-center text-white mb-4" style="font-size: 36px; font-weight: 600;">{{ theme_option('home_banner_description') }}</h1>@endif
                <form action="{{ route('public.projects') }}" method="GET" id="frmhomesearch">
                    <div class="typesearch" id="hometypesearch">
                        <a href="javascript:void(0)" class="active" rel="project" data-url="{{ route('public.projects') }}">{{ __('Projects') }}</a>
                        <a href="javascript:void(0)" rel="sale" data-url="{{ route('public.properties') }}">{{ __('Sale') }}</a>
                        <a href="javascript:void(0)" rel="rent" data-url="{{ route('public.properties') }}">{{ __('Rent') }}</a>
                    </div>
                    <div class="input-group input-group-lg">
                        <input type="hidden" name="type" value="project" id="txttypesearch">
                        <div class="input-group-prepend">
                            <span class="input-group-text"><i class="far fa-search"></i></span>
                        </div>
                        <div class="keyword-input">
                            <input type="text" class="form-control" name="k" placeholder="{{ __('Enter keyword...') }}" id="txtkey" autocomplete="off">
                        </div>
                        <div class="input-group-prepend">
                            <span class="input-group-text"><i class="far fa-location"></i></span>
                        </div>
                        <div class="location-input">
                            <input type="hidden" name="city_id">
                            <input class="select-city-state form-control" name="location" value="{{ request()->input('location') }}" placeholder="{{ __('City, State') }}" autocomplete="off">
                            <div class="spinner-icon">
                                <i class="fas fa-spin fa-spinner"></i>
                            </div>
                            <div class="suggestion">

                            </div>
                        </div>
                        <div class="input-group-append">
                            <button class="btn btn-orange" type="submit">{{ __('Search') }}</button>
                        </div>
                    </div>
                    <div class="listsuggest stylebar">

                    </div>
                </form>
            </div>
        </div>
        </div>
    @endif
</header>
