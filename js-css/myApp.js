var app = angular.module('myApp', ['ngSanitize']);
app.controller('MyCtrl', function MyCtrl($scope) {

    $scope.changeParams = function() {

        if ($scope.rows != null && $scope.columns != null) {

            $scope.table = [];

            for (var i=0; i<$scope.rows; i++) {
                $scope.table[i] = [];
                for (var j=0; j<$scope.columns; j++) {
                    $scope.table[i][j] = new Data(0);
                }
            }
        }
    };

    $scope.changeTable = function() {
        //console.log('table', $scope.table);

        $scope.sum = 0;
        $scope.sums = [];

        for (var i=0; i<$scope.rows; i++) {
            $scope.sums[i] = 0;
            for (var j=0; j<$scope.columns; j++) {
                $scope.sum += parseInt($scope.table[i][j].val);
                $scope.sums[i] += parseInt($scope.table[i][j].val);
            }
        }
    };

    //Начальная инициализация
    $scope.rows = 5;
    $scope.columns = 6;
    $scope.changeParams();
    $scope.changeTable();
});
/** Структура для хранения данных ячейки */
function Data(val) { this.val = val }