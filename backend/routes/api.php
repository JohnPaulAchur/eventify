<?php

use App\Http\Controllers\Api\V1\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\GroupController;
use App\Http\Controllers\Api\V1\EventController;
use App\Http\Controllers\Api\V1\MembersController;
use App\Http\Controllers\Api\V1\UserEventController;
use App\Models\UserEvent;

// Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::group([ 'middleware' => ['auth:sanctum']], function () {
    Route::get('/events/get_all_upcoming',[EventController::class, 'getAllUpcomingEvents']);
    Route::get('/events/get_my_upcoming_this_month/{user_id}',[EventController::class, 'getUserEventsThisMonth']);

});
Route::group(['prefix' => 'v1', 'namespace' => 'App\Http\Controllers\Api\V1' ,'middleware' => ['auth:sanctum']], function () {
    Route::apiResource('groups', GroupController::class);
    Route::get('groups/getusergroup/{user_id}', [GroupController::class, 'getUserGroups']);
    Route::apiResource('events', EventController::class);
    Route::apiResource('userevents', UserEvent::class);
    Route::get('events/getuserevents/{user_id}', [UserEventController::class, 'getUserEvents']);
    /********************************************************
     * ******************************************************
     ********************************************************/
    Route::get('/events/get_all_upcoming',[EventController::class, 'index']);
    // Route::get('events/get_all_upcoming',[EventController::class, 'getGroupsEvents']);
    /********************************************************
     * ******************************************************
     ********************************************************/
    // Route::get('events/getmonthlyevents/{user_id}', [UserEventController::class, 'getmonthlyevents']);
    Route::get('events/getmonthlyevents/{user_id}', [EventController::class, 'getUserEventsThisMonth']);

    Route::get('events/geteventsusers/{user_id}/', [UserEventController::class, 'getEventUsers']);
    Route::get('statistics/', [UserEventController::class, 'getStatstics']);

    Route::get('events/getGroupEvents/{group_id}',[EventController::class, 'getGroupsEvents']);


    Route::apiResource('members', MembersController::class);
    Route::get('members/getMembersByUser/{user_id}',[MembersController::class, 'getMembersByUser']);
    Route::post('/membersGroup', [MembersController::class, 'addEventMembersByGroup']);
    Route::post('/membersEvent', [MembersController::class, 'addEventMembers']);


    Route::delete('/membersEvent/{id}', [MembersController::class, 'deleteEventMembers']);

    Route::get('/membersEvent/{event_id}', [MembersController::class, 'getMembersByEvent']);


    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::group(['prefix' => 'v1', 'namespace' => 'App\Http\Controllers\Api\V1','middleware' => 'api'], function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/isLoggedIn', [AuthController::class, 'isLoggedIn']);
    Route::get('/getCalnderEvent/{id}/{code}', [EventController::class, 'getCalnderEvent']);

});



