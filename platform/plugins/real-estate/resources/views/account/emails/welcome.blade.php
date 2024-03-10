{!! EmailHandler::prepareData(str_replace('{{ verify_link }}', $link, '

{{ header }}

<strong>Hello!</strong> <br /><br />
<pre>
MeraKhwab.Com Team Welcomes you to our Portal. We will
do our best to serve you with the Best Possible Services.
As our Valued Customer, you are entitled to post 1000 free
adds during next 6 months.
Please ensure you are authorised to post whatever adds you
place on this portal. MeraKhwab.Com reserves the right to
remove any unauthorised adds.
For any complaints or suggestions, please write is on
contact@merakhwab.com. We will be happy to have your
feedback.
Truly Yours
Team MeraKhwab.Com
Office 706, 7th Floor, RBS Mall
Main Universirty Road, Karachi
Phone +92 21 348 28800
Whatsapp+ 92 346 8222225
</pre>

<a href="{{ verify_link }}">Merakhwab.com</a> <br /><br />

Regards, <br />

<strong>{{ site_title }}</strong>
<hr />
{{ footer }}

')) !!}
