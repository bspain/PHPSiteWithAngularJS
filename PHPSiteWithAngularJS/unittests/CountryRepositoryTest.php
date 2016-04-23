<?php

require '/repositories/CountryRepository.php';

/**
 * CountryRepositoryTest short summary.
 *
 * CountryRepositoryTest description.
 *
 * @version 1.0
 * @author bspain
 */
class CountryRepositoryTest extends PHPUnit_Framework_TestCase
{
    public function test_getCountries()
    {
        $countries = CountryRepository::getCountries();
        $this->assertCount(3, $countries);
    }
}

?>