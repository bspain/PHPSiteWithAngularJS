<?php

// This syntax appears to work in both local unit testing
// and IIS Express execution.
require(dirname(__DIR__).'../models/Country.php');
require(dirname(__DIR__).'../models/State.php');

/**
 * CountryRepository short summary.
 *
 * CountryRepository description.
 *
 * @version 1.0
 * @author bspain
 */
class CountryRepository
{
    private static $countries = array();

    protected static function init()
    {
        // local array
        $countries = array();
        array_push($countries,
            new Country('Austria', 'at', array(
                new State('Styria'), 
                new State('Tyrol')
        )));

        array_push($countries,
        new Country('Canada', 'ca', array(
            new State('Ontario'),
            new State('Quebec')
        )));

        array_push($countries,
            new Country('Luxembourg', 'lu')
        );

        self::$countries = $countries;
    }

    public static function getCountries()
    {
        if (count(self::$countries) === 0)
        {
            self::init();
        }

        // eq. CountryRepository.countries in C#
        // static accessor
        return self::$countries;
    }

    public static function getStates($countryCode)
    {
        if (count(self::$countries) === 0)
        {
            self::init();
        }

        // Think of this as Array.TakeAny(array, (a) => (...));
        $country = array_filter(self::$countries, function($c) use ($countryCode)
        {
            return $c->code === $countryCode;   
        });

        if (count($country) === 0)
        {
            return array();
        }

        // This strongly suggests $firstCountry[0] isn't an option.
        $firstCountry = array_shift($country);
        return $firstCountry->states;
    }
}