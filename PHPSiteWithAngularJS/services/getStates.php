<?php

require(dirname(__DIR__).'/repositories/CountryRepository.php');

// Think in terms of writing back out to the HTTP response (hence, header() has meaning, and isset($_GET[]) is looking at the request query string)

header('Content-type: application/json');

echo ")]}'\n";

// HTTP GET ../services/getStates.php?countryCode=ca
if (isset($_GET['countryCode']) && is_string($_GET['countryCode']))
{
    $states = CountryRepository::getStates($_GET['countryCode']);
    echo json_encode($states);
}