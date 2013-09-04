function OffreCtrl($scope, Offre) {


    //$scope.offres = Offre.query();

    $scope.offres = [{image:"", description:"desc", price:"10"}, {image:"", description:"desc2", price:"15"} ];


    $scope.search = function(){
        $scope.offres = Offre.query({q:$scope.searchTerm});
    };
}