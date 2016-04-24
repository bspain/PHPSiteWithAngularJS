<?php

// This syntax appears to work in both local unit testing
// and IIS Express execution.
require(dirname(__DIR__).'/models/Country.php');
require(dirname(__DIR__).'/models/Place.php');

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
            new Country('United States', 'us', array(
                new Place('Target Field', '1 Twins Way, Minneapolis, MN 55403', 44.981609, -93.277697, 16),
                new Place('Afton Alps', '6624 Peller Ave S, Hastings, MN 55033', 44.853337, -92.79118, 16)
        )));

        array_push($countries,
            new Country('Canada', 'ca', array(
                new Place('Whistler Mountain', '4545 Blackcomb Way, Whistler, BC V0N 1B4', 50.115071, -122.948743, 16),
                new Place('West Edmonton Mall', '1384 170th St, Edmonton, AB, Canada', 53.419288, -113.615067, 16)
        )));

        array_push($countries,
            new Country('Italy', 'it', array(
                new Place('Colosseum', 'Piazza del Colosseo 00184', 41.890219, 12.49222, 16)
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

    public static function getCountry($countryCode)    
    {
        if (count(self::$countries) === 0)
        {
            self::init();
        }

        $country = array_filter(self::$countries, function($c) use ($countryCode)
        {
            return $c->code === $countryCode;
        });

        if (count($country) === 0)
        {
            return array();
        }

        $firstCountry = array_shift($country);
        return $firstCountry;
    }

    public static function getPlaces($countryCode)
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
        return $firstCountry->places;
    }
}