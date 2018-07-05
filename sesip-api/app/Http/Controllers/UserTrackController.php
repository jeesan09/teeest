<?php

namespace App\Http\Controllers;

use App\UserTrack;
use Illuminate\Http\Request;

class UserTrackController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $userTrack = new UserTrack;
        $userTrack->user_id         = $request->user_id;
        $userTrack->page_no         = $request->page_no;
        $userTrack->chapter_name    = $request->chapter_name;
        $userTrack->topic_name      = $request->topic_name;

        if($userTrack->save())
        {
            return response()->json(['message' => 'phonebook correctly added'], 201); 
        }
    }

    public function saveUserInformation(Request $request)
    {
        //return "ok";
        $userTrack = new UserTrack;
        $userTrack->user_id         = $request->user_id;
        $userTrack->page_no         = $request->page_no;
        $userTrack->chapter_name    = $request->chapter_name;
        $userTrack->topic_name      = $request->topic_name;

        if($userTrack->save())
        {
            return response()->json(['message' => 'phonebook correctly added'], 201); 
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\UserTrack  $userTrack
     * @return \Illuminate\Http\Response
     */
    public function show(UserTrack $userTrack)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\UserTrack  $userTrack
     * @return \Illuminate\Http\Response
     */
    public function edit(UserTrack $userTrack)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\UserTrack  $userTrack
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, UserTrack $userTrack)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\UserTrack  $userTrack
     * @return \Illuminate\Http\Response
     */
    public function destroy(UserTrack $userTrack)
    {
        //
    }
}
