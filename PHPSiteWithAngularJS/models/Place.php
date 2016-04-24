<?php

/**
 * Place short summary.
 *
 * Place description.
 *
 * @version 1.0
 * @author bspain
 */
class Place
{
    public $name;
    public $address;
    public $lat;
    public $long;
    public $zoom;

    public function __construct($name = '', $address = '', $lat = 0.0, $long = 0.0, $zoom = 0)
    {
        $this->name = $name;
        $this->address = $address;
        $this->lat = $lat;
        $this->long = $long;
        $this->zoom = $zoom;
    }
}