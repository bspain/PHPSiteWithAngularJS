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
            new Country('United States', 'us', 39.734717, -98.750163, 3, array(
                new Place('Target Field', '1 Twins Way, Minneapolis, MN 55403', 44.981609, -93.277697, 16),
                new Place('Afton Alps', '6624 Peller Ave S, Hastings, MN 55033', 44.853337, -92.79118, 16)
        )));

        array_push($countries,
            new Country('Canada', 'ca', 58.254033, -105.700803, 3, array(
                new Place('Whistler-Blackcomb Ski Resort', '4350 Skiers Plz, Squamish-Lillooet, BC V0N', 50.113279, -122.954247, 16),
                new Place('West Edmonton Mall', '1384 170th St, Edmonton, AB, Canada', 53.419288, -113.615067, 16)
        )));

        array_push($countries,
            new Country('Italy', 'it', 42.818102, 12.420802, 5, array(
                new Place('Colosseum', 'Piazza del Colosseo 00184', 41.890219, 12.49222, 16)
        )));

        array_push($countries,
            new Country('Luxembourg', 'lu', 49.617361, 6.169283, 10)
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
        return $firstCountry;
    }

    public static function getPlaces($countryCode)
    {
        $country = CountryRepository::getCountry($countryCode);
        return $country->places;
    }

    public static function addPlace($countryCode, $place)
    {
        if (count(self::$countries) === 0)
        {
            self::init();
        }

        $country = CountryRepository::getCountry($countryCode);
        array_push($country->places, $place);
    }
}