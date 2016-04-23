(function () {
    
    var app = angular.module('funwithcountries', []);

    // Define service 'countryService' via AngularJS's Factory system.
    app.factory('countryService', function($http) {
        var baseUrl = 'services/';

        // countryService is defined as providing 1 method: getCountries
        return {
            getCountries: function()
            {
                // getCountries ultimately returns a JS Promise (hard to tell without good intellisense)
                return $http.get(baseUrl + '/getCountries.php');
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

        this.newState = "";

        this.addStateTo = function(country)
        {
            if (!country.states)
            {
                country.states = [];
            }

            country.states.push({ name: this.newState });
            this.newState = "";
        }
    });
})();