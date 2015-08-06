var gameServices = angular.module('gameServices', []);

gameServices.factory('User', function() {
  var user = function(name) {
    this.id = null;
    this.isPlay = false;
    this.isWin = false;
    this.name = name;
  }
  return user;
});

gameServices.factory('Board', function() {
  var board = function(size) {
    this.size = size;
  }
  return board;
});