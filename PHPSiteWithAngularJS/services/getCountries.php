<?php

require(dirname(__DIR__).'/repositories/CountryRepository.php');

header('Content-type: application/json');

// Special char, recognized by AngularJS.  Prevents JSON from getting executed by script.
// Security mechanism for older (very older) browsers.
echo ")]}'\n";

$countries = CountryRepository::getCountries();
echo json_encode($countries);