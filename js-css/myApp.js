var app = angular.module('myApp', ['ngSanitize']);
app.controller('MyCtrl', function MyCtrl($scope) {
    $scope.title = 'ТПР Лаба 2';

    $scope.changeParams = function() {

        if ($scope.rows != null && $scope.columns != null) {
            //Вероятность (события равновероятны)
            $scope.p = 1/$scope.rows;

            //Заголовки
            $scope.rows++;
            $scope.columns++;

            //Заполнение заголовков
            $scope.table = [];
            $scope.table[0] = [];
            $scope.table[0][0] = new Data('X', true);
            for (var j=1; j<$scope.columns; j++) {
                $scope.table[0][j] = new Data('Param '+j, true);
            }
            for (i=1; i<$scope.rows; i++) {
                $scope.table[i] = [];
                $scope.table[i][0] = new Data(i, true);
            }

            //Заполнение нулями
            for (var i=1; i<$scope.rows; i++) {
                for (j=1; j<$scope.columns; j++) {
                    $scope.table[i][j] = new Data(0, false);
                }
            }
        }
    };

    $scope.changeTable = function() {
        //console.log('table', $scope.table);

        $scope.sums = [];

        for (var i=1; i<$scope.rows; i++) {
            var rowSum = 0;
            $scope.sums[i] = '(';
            for (var j=1; j<$scope.columns; j++) {
                var val = parseInt($scope.table[i][j].val);
                rowSum += val;
                $scope.sums[i] += val;
                if (j < $scope.columns-1) $scope.sums[i] += ' + '
            }
            $scope.sums[i] += ') * ' + $scope.p + ' = ' + rowSum*$scope.p;
        }
    };

    //Начальная инициализация
    $scope.rows = 4;
    $scope.columns = 4;
    $scope.changeParams();
    $scope.changeTable();
});
/** Структура для хранения данных ячейки */
function Data(val, title) {
    this.val = val;
    this.title = title;
}