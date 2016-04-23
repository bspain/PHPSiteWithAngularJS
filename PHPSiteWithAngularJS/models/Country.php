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

    public function __construct($name = '', $code = '', $states = array())
    {
        $this->name = $name;
        $this->code = $code;
        $this->states = $states;
    }
}