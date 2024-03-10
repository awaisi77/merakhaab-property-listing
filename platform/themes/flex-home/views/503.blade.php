@php
    SeoHelper::setTitle(__('Service Unavailable'));
    Theme::fire('beforeRenderTheme', app(\Botble\Theme\Contracts\Theme::class));
@endphp

<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=5, user-scalable=1" name="viewport"/>
    <meta name="format-detection" content="telephone=no">
    <meta name="apple-mobile-web-app-capable" content="yes">

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
    <style>
        .container {
            width: 1170px;
            margin: 0 auto;
            position: relative;
        }

        .error-border {
            background-color: var(--primary-color);
            height: .25rem;
            width: 6rem;
            margin-bottom: 1.5rem;
        }

        .error-page h1 {
            color: #22292f;
            font-size : 6rem;
            margin-bottom: 2.5rem;
        }

        .error-page ul li {
            margin-bottom : 5px;
        }

        .error-page {
            margin-top: 150px;
        }

        .error-page a {
            color: var(--primary-color);
        }
    </style>
</head>

<body @if (BaseHelper::siteLanguageDirection() == 'rtl') dir="rtl" @endif>
    <div class="container">
        <div class="error-page">
            <div class="error-code">
                <h1>503</h1>
            </div>

            <div class="error-border"></div>

            <h4>{{ __($exception->getMessage() ?: 'Sorry, we are doing some maintenance. Please check back soon.') }}</h4>
        </div>
    </div>
    {!! Theme::footer() !!}
</body>

</html>

