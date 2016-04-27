var app = angular.module('MVLDApp', []);

app.controller('MVLDController', ['$scope', function($scope) {
    
    $scope.testtext = 'asdfasdf';

    var pictureNames = [];
    $scope.allNames = [];

    var inMotion = false;

    var NAME_START = 'main/g';
    var NAME_END = '.jpg'
    var FIRST_PIC_NUM = 1;
    var LAST_PIC_NUM = 11;

    for (var i = FIRST_PIC_NUM; i <= LAST_PIC_NUM; i++) {
        var pictureName = NAME_START + i + NAME_END;
        pictureNames.push(pictureName);
        $scope.allNames.push(pictureName);        
    }

    var picArrLength = pictureNames.length;

    var startIndex = -2;
    
    function initializeSources() {
        $scope.picSources = [];
        var LOADED_IMAGES = 5;
        for (var i = startIndex; i < startIndex + LOADED_IMAGES; i++) {
            
            var index = i;

            console.log('real = ' + index);

            if (index > picArrLength - 1) index = index % picArrLength;
            if (index <= (picArrLength * -1)) index = (index % picArrLength) + picArrLength - 1;
            if (index < 0) index = (index % picArrLength) + picArrLength;

            console.log('adjusted = ' + index);
            
            var source = {
                name: pictureNames[index],
                shiftedLeft: false,
                shiftedRight: false
            };
            $scope.picSources.push(source);
        }
        console.log(' ');
    }

    initializeSources();

    $scope.slide = function(inc) {

        if (inMotion) return;
        inMotion = true;

        $scope.picSources.forEach(function(source) {
            if (inc === 1) source.shiftedLeft = true;
            if (inc === -1) source.shiftedRight = true;
        });

        setTimeout(function() {
            startIndex += inc;
            initializeSources();
            $scope.$apply();
            inMotion = false;
        }, 1300);
    };


}]);
