var app = angular.module('signUpApp', []);
app.controller('validateCtrl', function($scope) {
    $scope.firstname ='';
    $scope.lastname= '';
    $scope.email='';
    $scope.password='';
});