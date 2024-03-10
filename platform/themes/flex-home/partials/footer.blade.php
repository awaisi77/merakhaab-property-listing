<!--FOOTER-->

{{--<div id="myFeaturedModal" class="modal fade" role="dialog">--}}




{{--</div>--}}

<footer>
    <br>
    <div class="container-fluid w90">
        <div class="row">
            <div class="col-sm-3">
                @if (theme_option('logo'))
                    <p>
                        <a href="{{ route('public.single') }}">
                            <img src="{{ RvMedia::getImageUrl(theme_option('logo'))  }}" style="max-height: 38px"
                                 alt="{{ theme_option('site_name') }}">
                        </a>
                    </p>
                @endif
                <p><i class="fas fa-map-marker-alt"></i> &nbsp;{{ theme_option('address') }}</p>
                <p><i class="fas fa-phone-square"></i> {{ __('Hotline') }}: &nbsp;<a
                        href="tel:{{ theme_option('hotline') }}">{{ theme_option('hotline') }}</a></p>
                <p><i class="fas fa-envelope"></i> {{ __('Email') }}: &nbsp;<a
                        href="mailto:{{ theme_option('email') }}">{{ theme_option('email') }}</a>
                </p>
            </div>
            <div class="col-sm-9 padtop10">
                <div class="row">
                    {!! dynamic_sidebar('footer_sidebar') !!}
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                {!! Theme::partial('language-switcher') !!}
            </div>
        </div>
        <div class="copyright">
            <div class="col-sm-12">
                <p class="text-center">
                    {!! clean(theme_option('copyright')) !!}
                </p>
            </div>
        </div>
    </div>
    <a href="#" class="float">
        <i class="lab la-whatsapp my-float"></i>
    </a>

    <a href="#" class="float">
        <i class="lab la-whatsapp my-float"></i>
    </a>
</footer>
<!--FOOTER-->

<script>
    window.trans = {
        "Price": "{{ __('Price') }}",
        "Number of rooms": "{{ __('Number of rooms') }}",
        "Number of rest rooms": "{{ __('Number of rest rooms') }}",
        "Square": "{{ __('Square') }}",
        "No property found": "{{ __('No property found') }}",
        "million": "{{ __('million') }}",
        "billion": "{{ __('billion') }}",
        "m2": "{{ __('m2') }}",
    }
    window.themeUrl = '{{ Theme::asset()->url('') }}'
</script><!--END FOOTER-->

<div class="action_footer">
    <a href="#" class="cd-top"><i class="fas fa-arrow-up"></i></a>
    <a href="tel:{{ theme_option('hotline') }}" style="color: white;font-size: 17px;"><i class="fas fa-phone"></i>
        <span>  &nbsp;{{ theme_option('hotline') }}</span></a>

    <a href="https://api.whatsapp.com/send?phone=+923468222225&text=Hello%2C%20I'm%20here%20about..." target="_blank"
       class="whatsappBtn"><i class="fab fa-whatsapp"></i></a>

    <a href="https://www.facebook.com/Merakhwabcom-103849508745355" target="_blank" class="facebookBtn"><i
            class="fab fa-facebook"></i></a>

</div>
<div id="loading">
    <div class="lds-hourglass">
    </div>
</div>

{!! Theme::footer() !!}
</body>
</html>
