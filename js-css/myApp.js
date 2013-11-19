var app = angular.module('myApp', ['ngSanitize']);
app.controller('MyCtrl', function MyCtrl($scope) {
    $scope.subject = 'ТПР';
    $scope.lab = 'Лаба 2 (Критерий Сэвиджа)';
    var rows = 0, columns = 0;

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

    $scope.changeTable = function() {

        //Копирование массива
        $scope.resTable = [];
        for (var i=0; i<rows; i++) {
            $scope.resTable[i] = [];
            for (var j=0; j<columns; j++) {
                $scope.resTable[i][j] = new Data($scope.table[i][j].val, $scope.table[i][j].title);
            }
        }

        for (j=1; j<columns; j++) {
            //Поиск макс. по столбцам
            var maxRow = 1;
            for (i=1; i<rows; i++) {
                if ($scope.resTable[i][j].val > $scope.resTable[maxRow][j].val) maxRow = i;
            }

            //Вычитание из max значение столбца
            var max = $scope.resTable[maxRow][j].val;
            for (i=1; i<rows; i++) {
                $scope.resTable[i][j].val = max - $scope.resTable[i][j].val;
            }
        }
    };

    /** Заполнение значениями по умолчанию */
    $scope.stdFill = function() {
        $scope.rows = 4;
        $scope.columns = 4;
        $scope.changeParams();
        loadData([
            50,100,180,250,
            80,70,80,230,
            40,180,120,210,
            300,220,150,150
        ]);
        $scope.changeTable();
    };

    /** Загрузка данных в таблицу */
    function loadData(data) {
        for (var i=1; i<rows; i++) {
            for (var j=1; j<columns; j++) {
                var val = data[(i-1)*(columns-1)+(j-1)];
                $scope.table[i][j] = new Data(val, false);
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