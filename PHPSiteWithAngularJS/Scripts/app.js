﻿(function () {
    
    var app = angular.module('funwithcountries', ['ngRoute']);

    // Define service 'countryService' via AngularJS's Factory system.
    app.factory('countryService', function($http) {
        var baseUrl = 'services/';

        return {
            getCountries: function()
            {
                // getCountries ultimately returns a JS Promise (hard to tell without good intellisense)
                return $http.get(baseUrl + '/getcountries.php');
            },
            getCountry: function(countryCode)
            {
                return $http.get(baseUrl + '/getcountry.php?countryCode=' +
                    encodeURIComponent(countryCode));
            },
            getPlaces: function(countryCode) 
            {
                return $http.get(baseUrl + '/getplaces.php?countryCode=' +
                    encodeURIComponent(countryCode));               
            },
            addPlace: function(countryCode, place)
            {                
                return $http.get(baseUrl +
                    '/addplace.php?contryCode=' + encodeURIComponent(countryCode) +
                    '&name=' + encodeURIComponent(place.name) +
                    '&address=' + encodeURIComponent(place.address) +
                    '&lat=' + encodeURIComponent(place.lat) +
                    '&long=' + encodeURIComponent(place.long) +
                    '&zoom=' + encodeURIComponent(place.zoom));
            }
        };
    });

    // Controller takes countryService as a dependency.  AngularJS 
    // inheritly figures out which service to inject.
    app.controller('CountryController', function (countryService) {

        // Store the instance of the controller so that the Promise result delegate
        // can access it (otherwise, 'this' @ line 30 is the browser window, not the controller
        var that = this;

        countryService.getCountries().success(function (data) {

            // As soon as data is set on the controller, the data-bound HTML updates accordingly.
            that.countries = data;
        });
    });

    // Routing - when something wants to go to /places/, take everything after the / (that's what ":" means) and store it in $routeParams.countryCode
    // then, return this new route object (which looks a lot like a directive that we replaced)
    app.config(function ($routeProvider) {
        $routeProvider.when('/places/:countryCode', {
            templateUrl: 'places-view.html',
            controller: function ($routeParams, countryService) { // Same dependency injection technique as in the CountryController definition.
                this.params = $routeParams;

                // As in the countryController - this is the placesController here.
                var that = this;

                countryService.getPlaces(this.params.countryCode || "").success(function(placesData)
                {
                    that.places = placesData;
                })

                this.addPlaceTo = function () {
                    if (!this.places) {
                        this.places = [];
                    }

                    this.places.push(this.newPlace);
                    countryService.addPlace(this.params.countryCode, this.newPlace);
                    this.newPlace = null;
                };

                this.mapPlace = function (place)
                {
                    this.updateAndReturnMap(place.lat, place.long, place.zoom);
                }

                this.updateAndReturnMap = function (lat, long, zoom) {
                    var mapDiv = document.getElementById('map');
                    var map = new Microsoft.Maps.Map(mapDiv, {
                        credentials: 'AkaQaqdFaoCzpl6ccgfZT-BG2ikksp2S-8aigDC_4KJb5aydsQZY7OYeB7GADRzP',
                        center: new Microsoft.Maps.Location(lat, long),
                        mapTypeId: Microsoft.Maps.MapTypeId.aerial,
                        zoom: zoom
                    });

                    return map;
                }

                // Create the map search suggestion manager
                // TODO: Not safe to use Microsoft.Maps until defer'd JS is loaded.  Need to make this a no-op until that happens.
                // Can AngularJS be used to inject this?
                Microsoft.Maps.loadModule('Microsoft.Maps.AutoSuggest', function () {

                    var map = that.updateAndReturnMap(47.606209, -122.332071, 12);

                    var manager = new Microsoft.Maps.AutosuggestManager({ map: map });
                    manager.attachAutosuggest(
                        document.getElementById('searchBox'),
                        document.getElementById('searchBoxContainer'),
                        function (result) {

                            that.updateAndReturnMap(result.location.latitude, result.location.longitude, 12);
                            that.newPlace = {
                                name: result.title,
                                lat: result.location.latitude,
                                long: result.location.longitude,
                                zoom: 12
                            }
                        })
                });
            },
            controllerAs: 'placeCtrl'
        });
    });
})();