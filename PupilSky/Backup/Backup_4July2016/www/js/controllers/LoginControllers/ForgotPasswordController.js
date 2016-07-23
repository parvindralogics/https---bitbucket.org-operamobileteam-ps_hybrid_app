
angular.module('starter.ForgotPasswordController', ['ionic','ionic.closePopup'])

    .controller('forgotPasswordCtrl', function($scope, $stateParams,$state,ShowMessageAlert,LoadingScreen,HTTP) {

        $scope.passwordData = {};
        $scope.passwordData.newPassword = '';
        $scope.passwordData.RePassword = '';


      $scope.get_user_response   = JSON.parse(window.localStorage.getItem('userData'));

        $scope.submit = function () {

            if($scope.passwordData.newPassword == '' && $scope.passwordData.RePassword == '')
            {
                ShowMessageAlert.showMessage("Please fill all required fields");
            }
            else if($scope.passwordData.newPassword == '')
            {
                ShowMessageAlert.showMessage("Please enter new password");
            }
            else if($scope.passwordData.RePassword == '')
            {
                ShowMessageAlert.showMessage("Please enter Re-password");
            }
            else if($scope.passwordData.RePassword != $scope.passwordData.newPassword )
            {
                ShowMessageAlert.showMessage("Password does not  match");
            }
            else
            {
                LoadingScreen.show();
                /*ShowMessageAlert.showMessage( JSON.stringify($scope.otpData)+$rootScope.userMobileNumber);*/
                $scope.data ={
                    "password": $scope.passwordData.newPassword
                }
                HTTP.post_data("user/profile/reset_password",$scope.data,  $scope.get_user_response.access_token).success(function (response) {
                    LoadingScreen.hide();
                    $scope.resposeData = response;

                   /* ShowMessageAlert.showMessage(JSON.stringify(response));*/
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
                    else if ($scope.resposeData.errorCode == 173) {
                        ShowMessageAlert.showMessage($scope.resposeData.message);
                    }
                    else {

                      $scope.Flag = true;
                      window.localStorage.setItem('dataFlag', true);
                      $state.go('app.AddProfile');
                        ShowMessageAlert.showMessage("Password change successfully ");
                    }

                }).error(function (error, status) {
                    LoadingScreen.hide();
                });
            }

        }
    });
