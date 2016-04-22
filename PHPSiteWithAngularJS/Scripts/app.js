(function () {
    
    var app = angular.module('funwithcountries', []);

    app.controller('CountryController', function () {

        this.countries = [{
            name: 'United States',
            code: 'us',
            states: [{ name: 'Minnesota'}, {name: 'Iowa'}]
        },
        {
            name: 'Germany',
            code: 'de',
            states: [{ name: 'Bavaria' }, { name: 'Berlin' }]
        },
        {
            name: 'Luxemberg',
            code: 'lu'
        }]

    });
})();