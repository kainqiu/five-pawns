var gameController = angular.module('gameController', []);
gameController.controller("gameController", function($scope, User) {
    $scope.user1 = new User("kain");
    $scope.user2 = new User("mark");
});