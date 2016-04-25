<?php

/**
 * Country short summary.
 *
 * Country description.
 *
 * @version 1.0
 * @author bspain
 */
class Country
{
    public $name;
    public $code;
    public $places;
    public $lat;
    public $long;
    public $zoom;

    public function __construct($name = '', $code = '', $lat = 0.0, $long = 0.0, $zoom = 0, $places = array())
    {
        $this->name = $name;
        $this->code = $code;
        $this->places = $places;
        $this->lat = $lat;
        $this->long = $long;
        $this->zoom = $zoom;
    }
}