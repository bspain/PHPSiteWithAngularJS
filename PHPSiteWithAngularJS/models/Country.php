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
    public $states;
    public $lat;
    public $long;
    public $zoom;

    public function __construct($name = '', $code = '', $lat = '', $long = '', $zoom = '', $states = array())
    {
        $this->name = $name;
        $this->code = $code;
        $this->states = $states;
        $this->lat = $lat;
        $this->long = $long;
        $this->zoom = $zoom;
    }
}