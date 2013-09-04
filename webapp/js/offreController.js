function OffreCtrl($scope, Offre) {


    $scope.offres = Offre.query({q:""});


    $scope.search = function(){
        criteria = {q:"", r:""};
        if($scope.searchTerm){
            criteria.q = $scope.searchTerm;
        }
        if($scope.selectedRegion){
            criteria.r = $scope.selectedRegion.id;
        }

        $scope.offres = Offre.query(criteria);
    };

    $scope.regions = [{ id: "Ile-de-France" },
        { id: "Régions voisines" },
        { id: "Toute la France" },
        { id: "Paris" },
        { id: "Seine-et-Marne" },
        { id: "Yvelines" },
        { id: "Essonne" },
        { id: "Hauts-de-Seine" },
        { id: "Seine-Saint-Denis" },
        { id: "Val-de-Marne" },
        { id: "Val-d'Oise" } ];
}