/**
 * Created by mk on 27-May-16.
 */
angular.module('starter.OTPController', [])

    .controller('OTPCtrl', function($scope, $stateParams,$state,$rootScope,HTTP,ShowMessageAlert,LoadingScreen, $ionicHistory) {

    $scope.goBackFunction   =   function(){
      $ionicHistory.goBack();
    };

        //$scope.flag = window.localStorage.getItem('loginFlag');

        $scope.otpData = {};
        $scope.otpData.otpCode  = null;
        $scope.otpData.otpCode1 = null;
        $scope.otpData.otpCode2 = null;
        $scope.otpData.otpCode3 = null;
        $scope.otpData.otpCode4 = null;

        $scope.submit = function () {

          console.log($scope.otpData.otpCode4);

            if($scope.otpData.otpCode1 == null)
            {
                ShowMessageAlert.showMessage("Please enter otp code");
              console.log($scope.otpData.otpCode1+''+$scope.otpData.otpCode2+''+$scope.otpData.otpCode3+''+$scope.otpData.otpCode4);
            }else if($scope.otpData.otpCode2 == null){
                ShowMessageAlert.showMessage("Please enter otp code");
              console.log($scope.otpData.otpCode1+''+$scope.otpData.otpCode2+''+$scope.otpData.otpCode3+''+$scope.otpData.otpCode4);
            }else if($scope.otpData.otpCode3 == null){
                ShowMessageAlert.showMessage("Please enter otp code");
              console.log($scope.otpData.otpCode1+''+$scope.otpData.otpCode2+''+$scope.otpData.otpCode3+''+$scope.otpData.otpCode4);
            }else if($scope.otpData.otpCode4 == null){
                ShowMessageAlert.showMessage("Please enter otp code");
              console.log($scope.otpData.otpCode1+''+$scope.otpData.otpCode2+''+$scope.otpData.otpCode3+''+$scope.otpData.otpCode4);
            }
            else
            {

              $scope.otpData.otpCode =  $scope.otpData.otpCode1+""+$scope.otpData.otpCode2+""+$scope.otpData.otpCode3+""+$scope.otpData.otpCode4;

              console.log($scope.otpData.otpCode);

                /*ShowMessageAlert.showMessage( JSON.stringify($scope.otpData)+$rootScope.userMobileNumber);*/
                $scope.data ={
                    "mobile": $rootScope.userMobileNumber,
                    "otp":$scope.otpData.otpCode
                };

              if($rootScope.isNetworkConnected()) {
                LoadingScreen.show();
                HTTP.post("activate", $scope.data).success(function (response) {
                  LoadingScreen.hide();
                  $scope.resposeData = response;

                  console.log("Login Response: " + JSON.stringify(response));
                  if ($scope.resposeData.errorCode == 199) {
                    ShowMessageAlert.showMessage($scope.resposeData.message);
                  }
                  else if ($scope.resposeData.errorCode == 69) {
                    ShowMessageAlert.showMessage($scope.resposeData.message);
                  }
                  else if ($scope.resposeData.errorCode == 19) {
                    ShowMessageAlert.showMessage($scope.resposeData.message);
                  }
                  else {
                    if ($rootScope.firstTimelogin == true) {
                      // window.localStorage.setItem('loginFlag', $scope.flag);
                      $rootScope.firstTimelogin = false;
                      window.localStorage.setItem('userData', JSON.stringify($scope.resposeData));
                      $rootScope.DataFlag = true;
                      window.localStorage.setItem('dataFlag', $rootScope.DataFlag);
                      //window.localStorage.setItem('dataFlag', true);
                      $state.go('app.AddProfile');
                      ShowMessageAlert.showMessage("login successfully ");
                    }
                    else {
                      window.localStorage.setItem('userData', JSON.stringify($scope.resposeData));
                      // $rootScope.DataFlag = true;
                      // window.localStorage.setItem('dataFlag', $rootScope.DataFlag);
                      $state.go('forgotPassword');
                    }
                  }

                }).error(function (error, status) {
                  LoadingScreen.hide();
                });
              }else{
                $rootScope.networkPopup();
              }
            }

            /* }
             else
             {
             $state.go('forgotPassword');
             }*/

        };

        $scope.reSend = function(){

            $scope.data ={
             "mobile":$rootScope.userMobileNumber
             };

         /* if($rootScope.isNetworkConnected()) {*/
            LoadingScreen.show();
            $scope.resposeData = HTTP.post("resend_otp", $scope.data).success(function (response) {
              LoadingScreen.hide();

              if ($scope.resposeData.errorCode == 69) {
                ShowMessageAlert.showMessage($scope.resposeData.message);
              }
              else {
                ShowMessageAlert.showMessage("Please check your message and enter OTP.")
              }

            }).error(function (error, status) {
              /* ShowMessageAlert.showMessage("error",error);*/
              LoadingScreen.hide();
            });
/*          }else{
            $rootScope.networkPopup();
          }*/
        };
    });
