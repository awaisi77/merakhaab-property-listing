<div class="bgheadproject hidden-xs">
    <div class="description">
        <div class="container-fluid w90">
            <h1 class="text-center">{{ __('Contact') }}</h1>
            {!! Theme::partial('breadcrumb') !!}
        </div>
    </div>
</div>
<div class="container padtop50">
    <div class="row">
        <div class="col-sm-12">
            <div class="scontent" id="contact">

                <div class="row">
                        <div class="col-md-6">
                            <div class="wrapper"><h2 class="h2">{{ __('Contact information') }}</h2>
                                <div class="contact-main">
                                    <p>{{ theme_option('about-us') }}</p>
                                    <div class="contact-name" style="text-transform: uppercase">{{ theme_option('company_name') }}</div>
                                    <div class="contact-address">{{ __('Address') }}: {{ theme_option('address') }}
                                    </div>
                                    <div class="contact-phone">{{ __('Hotline') }}: {{ theme_option('hotline') }}</div>
                                    <div class="contact-email">{{ __('Email') }}: {{ theme_option('email') }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <form action="{{ route('public.send.contact') }}" method="post" class="generic-form">
                                <div class="wrapper">
                                    <h2 class="h2">{{ __('HOW WE CAN HELP YOU?') }}</h2>
                                    @csrf
                                    <div class="form-group">
                                        <input class="form-control" type="text" name="name" placeholder="{{ __('Name') }} *"
                                               required="">
                                    </div>
                                    <div class="form-group">
                                        <input class="form-control" type="text" name="email"
                                               placeholder="{{ __('Email') }} *" required="">
                                    </div>
                                    <div class="form-group">
                                        <input class="form-control" type="text" name="phone"
                                               placeholder="{{ __('Phone') }}">
                                    </div>
                                    <div class="form-group">
                                    <textarea class="form-control" name="content" rows="6" minlength="10"
                                      placeholder="{{ __('Message') }} *" required=""></textarea>
                                    </div>
                                    @if (setting('enable_captcha') && is_plugin_active('captcha'))
                                        <div class="form-group">
                                            {!! Captcha::display([], ['lang' => app()->getLocale()]) !!}
                                        </div>
                                    @endif
                                    <div class="alert alert-success text-success text-left" style="display: none;">
                                        <span></span>
                                    </div>
                                    <div class="alert alert-danger text-danger text-left" style="display: none;">
                                        <span></span>
                                    </div>
                                    <br>
                                    <div class="form-actions">
                                        <button class="btn-special" type="submit">{{ __('Send message') }}</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <br><br>
                    <h3>{{ __('Directions') }}</h3>
                    <div class="mapouter">
                        <div class="gmap_canvas">
                         
                                    
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3618.1008678634234!2d67.11045355090084!3d24.928633483943283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb339b46cec164d%3A0x97e1574e11df7b66!2sMerakhwab.com!5e0!3m2!1sen!2s!4v1637681448603!5m2!1sen!2s" width="1600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>"
                                    frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
                        </div>
                    </div>
                <br>
            </div>
        </div>
    </div>
</div>
<br>
<br>
