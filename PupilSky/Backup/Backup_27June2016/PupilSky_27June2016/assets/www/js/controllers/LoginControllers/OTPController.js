/**
 * Created by mk on 27-May-16.
 */
angular.module('starter.OTPController', [])

    .controller('OTPCtrl', function($scope, $stateParams,$state,$rootScope,HTTP,ShowMessageAlert,LoadingScreen) {
        $scope.flag = window.localStorage.getItem('loginFlag');

        $scope.otpData = {};
        $scope.otpData.otpCode ='';

        $scope.submit = function () {

            if($scope.otpData.otpCode == '')
            {
                ShowMessageAlert.showMessage("Please enter otp code");
            }
            else
            {

                LoadingScreen.show();
                /*ShowMessageAlert.showMessage( JSON.stringify($scope.otpData)+$rootScope.userMobileNumber);*/
                $scope.data ={
                    "mobile": $rootScope.userMobileNumber,
                    "otp":$scope.otpData.otpCode
                }
                HTTP.post("activate",$scope.data).success(function (response) {
                    LoadingScreen.hide();
                    $scope.resposeData = response;

                    console.log("Login Response: "+JSON.stringify(response));
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

                            $state.go('app.AddProfile')
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
            }

            /* }
             else
             {
             $state.go('forgotPassword');
             }*/

        };

        $scope.reSend = function(){
            LoadingScreen.show();
            $scope.data ={
             "mobile":$rootScope.userMobileNumber
             }
             $scope.resposeData = HTTP.post("resend_otp",$scope.data).success(function (response) {
                 LoadingScreen.hide();

                 if($scope.resposeData.errorCode == 69)
                 {
                     ShowMessageAlert.showMessage($scope.resposeData.message);
                 }
                 else{
                     ShowMessageAlert.showMessage("Please check your message and enter OTP.")
                 }

             }).error(function (error, status) {
                /* ShowMessageAlert.showMessage("error",error);*/
                 LoadingScreen.hide();
             });
        };
    });
