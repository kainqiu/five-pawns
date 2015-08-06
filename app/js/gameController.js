var gameController = angular.module('gameController', []);
gameController.controller("gameController", function($scope, $http, User, Board) {
    $scope.user1 = new User("kain");
    $scope.user2 = new User("mark");
    var size = 15;
    $scope.board = new Board(size);

    var canvas;
    var context;
    var isWhite = true;//设置是否该轮到白棋
    var isWell = false;//设置该局棋盘是否赢了，如果赢了就不能再走了
    var img_b = new Image();
    img_b.src = "img/w.png";//白棋图片
    var img_w = new Image();
    img_w.src = "img/b.png";//黑棋图片

    var chessData = new Array(15);
    for (var x = 0; x < 15; x++) {
        chessData[x] = new Array(15);
        for (var y = 0; y < 15; y++) {
            chessData[x][y] = 0;
        }
    }

    $scope.initializeGrid = function () {
        canvas = document.getElementById("canvas");
        context = canvas.getContext("2d");

        for (var i = 0; i <= 640; i += 40) {
            context.beginPath();
            context.moveTo(0, i);
            context.lineTo(640, i);
            context.closePath();
            context.stroke();

            context.beginPath();
            context.moveTo(i, 0);
            context.lineTo(i, 640);
            context.closePath();
            context.stroke();
        }
    };

    $scope.play = function (e) {
        var x = parseInt((e.offsetX - 20) / 40);//计算鼠标点击的区域，如果点击了（65，65），那么就是点击了（1，1）的位置
        var y = parseInt((e.offsetY - 20) / 40);

        if (chessData[x][y] != 0) {//判断该位置是否被下过了
            alert("你不能在这个位置下棋");
            return;
        }

        if (isWhite) {
            isWhite = false;
            $scope.drawChess(1, x, y);
        }
        else {
            isWhite = true;
            $scope.drawChess(2, x, y);
        }
    };

    $scope.drawChess = function (chess, x, y) {//参数为，棋（1为白棋，2为黑棋），数组位置
        if (isWell == true) {
            alert("已经结束了，如果需要重新玩，请刷新");
            return;
        }
        if (x >= 0 && x < 15 && y >= 0 && y < 15) {
            if (chess == 1) {
                context.drawImage(img_w, x * 40 + 20, y * 40 + 20);//绘制白棋
                chessData[x][y] = 1;
            }
            else {
                context.drawImage(img_b, x * 40 + 20, y * 40 + 20);
                chessData[x][y] = 2;
            }
            $scope.judge(x, y, chess);
        }
    };

    $scope.judge = function (x, y, chess) {//判断该局棋盘是否赢了
        var count1 = 0;
        var count2 = 0;
        var count3 = 0;
        var count4 = 0;

        //左右判断
        for (var i = x; i >= 0; i--) {
            if (chessData[i][y] != chess) {
                break;
            }
            count1++;
        }
        for (var i = x + 1; i < 15; i++) {
            if (chessData[i][y] != chess) {
                break;
            }
            count1++;
        }
        //上下判断
        for (var i = y; i >= 0; i--) {
            if (chessData[x][i] != chess) {
                break;
            }
            count2++;
        }
        for (var i = y + 1; i < 15; i++) {
            if (chessData[x][i] != chess) {
                break;
            }
            count2++;
        }
        //左上右下判断
        for (var i = x, j = y; i >= 0, j >= 0; i--, j--) {
            if (chessData[i][j] != chess) {
                break;
            }
            count3++;
        }
        for (var i = x + 1, j = y + 1; i < 15, j < 15; i++, j++) {
            if (chessData[i][j] != chess) {
                break;
            }
            count3++;
        }
        //右上左下判断
        for (var i = x, j = y; i >= 0, j < 15; i--, j++) {
            if (chessData[i][j] != chess) {
                break;
            }
            count4++;
        }
        for (var i = x + 1, j = y - 1; i < 15, j >= 0; i++, j--) {
            if (chessData[i][j] != chess) {
                break;
            }
            count4++;
        }

        if (count1 >= 5 || count2 >= 5 || count3 >= 5 || count4 >= 5) {
            if (chess == 1) {
                alert("白棋赢了");
            }
            else {
                alert("黑棋赢了");
            }
            isWell = true;//设置该局棋盘已经赢了，不可以再走了
        }
    };
});