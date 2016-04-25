(function () {
    
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

                //countryService.getCountry(this.params.countryCode || "").success(function (countryData) {
                //    // TODO: use google maps with AngularJS reference
                //    var mapDiv = document.getElementById('map');
                //    var map = new google.maps.Map(mapDiv, {
                //        center: {
                //            lat: Number(countryData.lat),
                //            lng: Number(countryData.long)
                //        },
                //        zoom: Number(countryData.zoom)
                //    });
                //    //var map = new google.maps.Map(mapDiv, {
                //    //    center: {
                //    //        lat: -34.397,
                //    //        lng: 150.644
                //    //    },
                //    //    zoom: 8
                //    //});
                //})

                this.addPlaceTo = function () {
                    if (!this.places) {
                        this.places = [];
                    }

                    this.places.push({ name: this.newPlace });
                    this.newPlace = "";
                };

                this.mapPlace = function (place)
                {
                    var mapDiv = document.getElementById('map');
                    var map = new google.maps.Map(mapDiv, {
                        center: {
                            lat: place.lat,
                            lng: place.long
                        },
                        zoom: place.zoom
                    });
                }
            },
            controllerAs: 'placeCtrl'
        });
    });
})();