<?php

require(dirname(__DIR__).'../repositories/CountryRepository.php');

header('Content-type: application/json');

$countries = CountryRepository::getCountries();
echo json_encode($countries);