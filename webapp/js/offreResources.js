angular.module('offreResources', ['ngResource']).
    factory('Offre', function($resource){
        return $resource('offres/', {}, {
            query: {method:'GET', isArray:true}
        });
    });