/**
 * Created by mk on 27-May-16.
 */
angular.module('starter.SlideControllers', ['ionic','ionic.closePopup'])
    .controller('SliderScreenCtrl', function($scope, $stateParams,$state,$rootScope) {

        $scope.slideIndex = function(index){
            $rootScope.index = index;
            /* alert($rootScope.index );*/
        };

        $scope.skip = function () {
            $state.go("loginScreen");
        }
    });
