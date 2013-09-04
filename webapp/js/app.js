'use strict';

/* App Module */

angular.module('battle', ['offreResources']).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider.
            when('/offres', {templateUrl: 'html/offres.html',   controller: OffreCtrl}).
            when('/offres/:addId', {templateUrl: 'html/offre-detail.html', controller: OffreDetailCtrl}).
            otherwise({redirectTo: '/offres'});
    }]);