/**
 * Created by mk on 27-May-16.
 */

angular.module('starter.SplashController', ['ionic','ionic.closePopup'])
.controller('SplashScreenCtrl', function($scope, $stateParams,$state,$timeout,$rootScope) {
    $scope.like = function () {
        $scope.Bounces = "animated bounceIn";

        $timeout(function () {
            $scope.Bounces = "";
        }, 1000);
    };
    $scope.like();

        $scope.data = window.localStorage.getItem('dataFlag');
       /* alert($scope.data);*/
        console.log($scope.data);
        if($scope.data)
        {
            $state.go('app.mainPage');
        }
        else
        {
           // $state.go("SliderScreen");
          $state.go('loginScreen');
        }

    /* $rootScope.login = function () {
     $state.go('loginScreen');
     }*/

});
