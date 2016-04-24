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

    public function __construct($name = '', $code = '', $places = array())
    {
        $this->name = $name;
        $this->code = $code;
        $this->places = $places;
    }
}