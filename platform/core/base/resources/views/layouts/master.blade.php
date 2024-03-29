@extends('core/base::layouts.base')

@section ('page')
    @include('core/base::layouts.partials.svg-icon')

    <div class="page-wrapper">

        @include('core/base::layouts.partials.top-header')
        <div class="clearfix"></div>
        <div class="page-container">
            <div class="page-sidebar-wrapper">
                <div class="page-sidebar navbar-collapse collapse">
                    <div class="sidebar">
                        <div class="sidebar-content">
                            <ul class="page-sidebar-menu page-header-fixed" data-keep-expanded="false" data-auto-scroll="true" data-slide-speed="200">
                                @include('core/base::layouts.partials.sidebar')
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div class="page-content-wrapper">
                <div class="page-content @if (Route::currentRouteName() == 'media.index') rv-media-integrate-wrapper @endif">
                    {!! Breadcrumbs::render('main', page_title()->getTitle(false)) !!}
                    <div class="clearfix"></div>
                    <div id="main">
                        @yield('content')
                    </div>
                </div>
            </div>
            <div class="clearfix"></div>
        </div>
        @include('core/base::layouts.partials.footer')
    </div>
@stop

@section('javascript')
    @include('core/media::partials.media')
    <script>
        $(document).on('ready', function () {

            $("#category_id").on('select2:select', function () {
                var el = $(this);
                alert(el.val())
                if (el.val() === "Home") {
                    $("#sub_cat").append("<option>SHIPPED</option>");
                } else if (el.val() === "MANUAL") {
                    $("#status option:last-child").remove();
                }
            });

        });
    </script>
@endsection

@push('footer')
    @routes
@endpush
