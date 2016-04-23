(function () {
    
    var app = angular.module('funwithcountries', ['ngRoute']);

    // Define service 'countryService' via AngularJS's Factory system.
    app.factory('countryService', function($http) {
        var baseUrl = 'services/';

        // countryService is defined as providing 1 method: getCountries
        return {
            getCountries: function()
            {
                // getCountries ultimately returns a JS Promise (hard to tell without good intellisense)
                return $http.get(baseUrl + '/getCountries.php');
            },
            getStates: function(countryCode) 
            {
                return $http.get(baseUrl + '/getStates.php?countryCode=' +
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

    // Routing - when something wants to go to /states/, take everything after the / (that's what ":" means) and store it in $routeParams.countryCode
    // then, return this new route object (which looks a lot like a directive that we replaced)
    app.config(function ($routeProvider) {
        $routeProvider.when('/states/:countryCode', {
            templateUrl: 'state-view.html',
            controller: function ($routeParams, countryService) { // Same dependency injection technique as in the CountryController definition.
                this.params = $routeParams;

                // As in the countryController - this is the stateController here.
                var that = this;

                countryService.getStates(this.params.countryCode || "").success(function(data)
                {
                    that.states = data;
                })

                this.addStateTo = function () {
                    if (!this.states) {
                        this.states = [];
                    }

                    this.states.push({ name: this.newState });
                    this.newState = "";
                };
            },
            controllerAs: 'stateCtrl'
        });
    });
})();