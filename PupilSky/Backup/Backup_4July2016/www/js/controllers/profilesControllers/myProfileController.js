angular.module('starter.myProfileController', ['ionic','ionic.closePopup'])

  .controller('MyProfileCtrl', function($scope, $stateParams,$state,$ionicHistory, HOST_IMAGES, $cordovaCamera, HTTP, ShowMessageAlert, LoadingScreen) {

    $scope.goBackFunction   =   function(){
      $ionicHistory.goBack();
    };

    var login_data =  JSON.parse(window.localStorage.getItem('userData'));
    console.log(login_data.users);

    $scope.myprofileobj  =  {};

    if((login_data != undefined) && (login_data!= null)){

      $scope.myprofileobj.name      =   login_data.users.firstName;
      $scope.myprofileobj.email     =   login_data.users.emailId;
      $scope.myprofileobj.contact   =   login_data.users.mobile;

    }

  });
