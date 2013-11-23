'use strict';

var app = angular.module('myApp', ['ngSanitize']);
app.controller('MyCtrl', function MyCtrl($scope) {
    $scope.subject = 'ТПР';
    $scope.lab = 'Лаба 2 (Критерий Сэвиджа)';
    var rows = 0, columns = 0;

    /** Срабатывает при изменении строк и столбцов */
    $scope.changeParams = function() {

        if ($scope.rows != null && $scope.columns != null) {
            //Заголовки
            rows = $scope.rows+1;
            columns = $scope.columns+1;

            //Заполнение заголовков
            $scope.table = [];
            $scope.table[0] = [];
            $scope.table[0][0] = new Data('X', true);
            for (var j=1; j<columns; j++) {
                $scope.table[0][j] = new Data('Param '+j, true);
            }
            for (var i=1; i<rows; i++) {
                $scope.table[i] = [];
                $scope.table[i][0] = new Data(i, true);
            }

            //Заполнение нулями
            for (i=1; i<rows; i++) {
                for (j=1; j<columns; j++) {
                    $scope.table[i][j] = new Data(0, false);
                }
            }

            //Изменение таблицы с результатами
            $scope.changeTable();
        }
    };

    /** Срабатывает при изменении значений в таблице */
    $scope.changeTable = function() {

        //Копирование массива
        var rt = [];
        for (var i=0; i<rows; i++) {
            rt[i] = [];
            for (var j=0; j<columns; j++) {
                rt[i][j] = new Data($scope.table[i][j].val, $scope.table[i][j].title);
            }
        }

        //Подсчет промежуточных результатов
        for (j=1; j<columns; j++) {
            //Поиск макс. по столбцам
            var maxRow = 1;
            for (i=1; i<rows; i++) {
                if (rt[i][j].val > rt[maxRow][j].val) maxRow = i;
            }

            //Вычитание из max значение столбца
            var max = rt[maxRow][j].val;
            for (i=1; i<rows; i++) {
                rt[i][j].val = max - rt[i][j].val;
            }
        }
        //Подсчет мин из макс по строкам
        rt[0][columns] = new Data('MAX', true);
        var minRow = 1, maxColumn = 1;
        var firstTime = true;
        for (i=1; i<rows; i++) {
            var maxCol = 1;
            for (j=1; j<columns; j++) {
                if (rt[i][j].val > rt[i][maxCol].val) {
                    maxCol = j;
                }
            }
            rt[i][columns] = rt[i][maxCol];

            if (firstTime || rt[i][maxCol].val < rt[minRow][maxColumn].val) {
                firstTime = false;
                minRow = i;
                maxColumn = maxCol;
            }
        }

        //Отображение результатов на форме
        $scope.resTable = rt;
        $scope.minRow = minRow;
        $scope.minMax = $scope.table[minRow][maxColumn].val;
        //Количество рабочих
        $scope.countR = rt[minRow][0].val;
        //Количество станков
        $scope.countC = rt[0][maxColumn].val;
    };

    /** Заполнение значениями по умолчанию */
    $scope.stdFill = function() {
        $scope.rows = 4;
        $scope.columns = 4;
        $scope.rowsName = 'рабочих';
        $scope.columnsName = 'станков';
        $scope.valueSum = 'прибылью';

        $scope.changeParams();
        loadData([
            'x', 40, 30, 20, 10,
            5, 50,100,180,250,
            4, 80,70,80,230,
            3, 40,180,120,210,
            2, 300,220,150,150
        ]);
        $scope.changeTable();
    };

    /** Загрузка данных в таблицу */
    function loadData(data) {
        for (var i=0; i<rows; i++) {
            for (var j=0; j<columns; j++) {
                var val = data[(i)*(columns)+(j)];
                var title = i == 0 || j == 0;
                $scope.table[i][j] = new Data(val, title);
            }
        }
    }

    //Начальная инициализация
    $scope.stdFill();
});

/** Структура для хранения данных ячейки */
function Data(val, title) {
    this.val = val;
    this.title = title;
}