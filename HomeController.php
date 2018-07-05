<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Redis;

// Models...
use App\Doctor;

class HomeController extends Controller
{
    private $key;
    private $page;
    private const EXP = 7*24*60;

    public function __construct()
    {
        $this->key = 'doctor';
        $this->page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
    }

    /**
     * Show doctor list.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $doctors = Cache::remember($this->key.'.'.$this->page, self::EXP, function () {
            return Doctor::paginate(10);
        });

        return view('home', compact('doctors'));
    }

    /**
     * Show doctor details.
     *
     * @param $slug
     * @return \Illuminate\Http\Response
     */
    public function doctor($slug)
    {
        $id = Doctor::where('slug', $slug)->first()->id;

        $doctor = Cache::remember($this->key.'.'.$id.'.details', self::EXP, function () use($id) {
            return Doctor::findOrFail($id);
        });

        return view('doctor_details', compact('doctor'));
    }
}
