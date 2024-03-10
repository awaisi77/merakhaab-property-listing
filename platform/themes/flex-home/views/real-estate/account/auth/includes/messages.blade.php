@if (session()->has('status'))
    <div class="alert alert-success">
        <span>{{ session('status') }}</span>
    </div>
@endif
