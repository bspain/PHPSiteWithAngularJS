(function () {
    
    var app = angular.module('funwithcountries', []);

    app.controller('CountryController', function ($http) {

        //this.countries = [{
        //    name: 'United States',
        //    code: 'us',
        //    states: [{ name: 'Minnesota'}, {name: 'Iowa'}]
        //},
        //{
        //    name: 'Germany',
        //    code: 'de',
        //    states: [{ name: 'Bavaria' }, { name: 'Berlin' }]
        //},
        //{
        //    name: 'Luxemberg',
        //    code: 'lu'
        //}]

        var that = this;

        $http({
            method: 'GET',
            url: 'services/getCountries.php'
        }).success(function (data) {
            that.countries = data;
        });

    });
})();