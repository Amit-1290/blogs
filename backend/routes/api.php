<?php

use App\Http\Controllers\Api\BlogController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/



Route::prefix('v1')->group(function () {

    // Namespace for all APIS controller
    Route::group(['namespace' => 'Api'], function () {


        // Blog APIs
        Route::prefix('blogs')->group(function () {
            Route::post('/', 'BlogController@index');
            Route::post('/view', 'BlogController@show');
            Route::post('/store', 'BlogController@storeOrUpdate');
            Route::post('/delete', 'BlogController@destroy');
        });

        //Auth APIs
        Route::post('login', 'AuthController@login')->name('login');
        Route::post('signup', 'AuthController@signup')->name('signup');

        Route::middleware('auth:api')->group(function () {



            Route::post('get-categories','BlogController@getAllCategories');

            // After Auth APIs
            Route::post('logout', 'AuthController@logout')->name('logout');

        });
    });
});
