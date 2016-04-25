<?php

require(dirname(__DIR__).'/repositories/CountryRepository.php');

header('Content-type: application/json');
echo ")]}'\n";

if (isset($_GET['name']) && is_string($_GET['name']) &&
    isset($_GET['countryCode']) && is_string($_GET['countryCode'])) {

    $address = "";
    if (isset($_GET['address']) && is_string($_GET['address']))
    {
        $address = $_GET['address'];
    }

    $long = 0.0;
    if (isset($_GET['long']) && is_string($_GET['long']))
    {
        $long = floatval($_GET['long']);
    }
    
    $lat = 0.0;
    if (isset($_GET['lat']) && is_string($_GET['lat']))
    {
        $lat = floatval($_GET['lat']);
    }
     
    $zoom = 0;
    if (isset($_GET['zoom']) && is_string($_GET['zoom']))
    {
        $zoom = intval($_GET['zoom']);
    }

    $place = new Place(
        $_GET['name'],
        $address,
        $lat,
        $long,
        $zoom);

    CountryRepository::addPlace($_GET['countryCode'], $place);
    echo json_encode(true);
}