@extends('layouts.app')

@section('content')

    @if( Auth::user()->accountType == 0 )
        @include('layouts.sections.table')
    @else
        @include('layouts.sections.server')
    @endif

@endsection