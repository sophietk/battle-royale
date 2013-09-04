function OffreCtrl($scope, Offre) {


    $scope.offres = Offre.query({q:""});


    $scope.search = function(){
        $scope.offres = Offre.query({q:$scope.searchTerm});
    };
}