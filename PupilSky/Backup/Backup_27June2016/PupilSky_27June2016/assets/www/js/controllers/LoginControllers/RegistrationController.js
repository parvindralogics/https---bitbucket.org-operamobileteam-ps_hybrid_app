/**
 * Created by mk on 27-May-16.
 */
angular.module('starter.RegistrationController', ['ionic','ionic.closePopup'])

    .controller('registerCtrl', function($scope, $stateParams,$state,$ionicModal,ShowMessageAlert,HTTP,LoadingScreen,$rootScope) {
        $scope.UserData = {};
        $scope.UserData.userName='';
        $scope.UserData.userEmail='';
        $scope.UserData.userPhoneNumber='';
        $scope.UserData.userPassword='';
        $scope.UserData.termsCondtionChecked='';

        $rootScope.firstTimelogin = false;

        $scope.submit = function(){
            var DeviceId = device.uuid;
            // var DeviceId = "an4121xjhhdds";

            if($scope.UserData.userName ==''||$scope.UserData.userEmail==''||$scope.UserData.userPhoneNumber==''||$scope.UserData.userPassword=='')
            {
                ShowMessageAlert.showMessage("Please fill all required fields");
            }
            else{
                if($scope.UserData.userEmail==null)
                {
                    ShowMessageAlert.showMessage("Please fill valid email id");
                }
                else{
                    if($scope.UserData.termsCondtionChecked == ''|| $scope.UserData.termsCondtionChecked == false)
                    {
                        ShowMessageAlert.showMessage("Please accept terms and condition");
                    }
                    else
                    {
                        LoadingScreen.show();

                        $rootScope.userMobileNumber = "+91"+$scope.UserData.userPhoneNumber;

                        $scope.data ={
                            "firstName":$scope.UserData.userName,
                            "emailId":$scope.UserData.userEmail,
                            "mobile":"+91"+$scope.UserData.userPhoneNumber,
                            "password":$scope.UserData.userPassword,
                            "deviceId":DeviceId
                        }
                        /*ShowMessageAlert.showMessage(JSON.stringify($scope.data));*/

                        HTTP.post("register", $scope.data).success(function (response) {
                            LoadingScreen.hide();

                            /*  ShowMessageAlert.showMessage(JSON.stringify(response));*/

                            $scope.resposeData = response;

                            if($scope.resposeData.errorCode == 199)
                            {
                                ShowMessageAlert.showMessage($scope.resposeData.message);
                            }
                            else if($scope.resposeData.errorCode == 69)
                            {
                                ShowMessageAlert.showMessage($scope.resposeData.message);
                            }
                            else if($scope.resposeData.errorCode == 60)
                            {
                                ShowMessageAlert.showMessage($scope.resposeData.message);
                            }
                            else{
                                $rootScope.firstTimelogin = true;
                                window.localStorage.setItem('dataFlag', true);

                                $state.go('OTP');
                                ShowMessageAlert.showMessage("register successfully ");
                            }

                        }).error(function (error, status) {
                           /* ShowMessageAlert.showMessage("error",error);*/
                            LoadingScreen.hide();

                        });


                        //alert(JSON.stringify($scope.resposeData));

                        /* "httpCode": 200,
                         "errorCode": 199,
                         "message": "User Already Registered with this Mobile."*/

                        /*"id": 225,
                         "wallet": 0,
                         "firstName": "pk",
                         "emailId": "pk.afa@gmail.com",
                         "mobile": "+919891894632",
                         "userName": "pk4709",
                         "isReferralTransfer": 0,
                         "role": "USER"*/

                        /*otp verifaction*/
                        /* "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0NjQyODI4NjcxMDIsInN1YiI6InJhYXN0ZWNoIiwiaXNzIjoicmFhc3RlY2gifQ.HZlulXffgNR8_PZzsGlmYkhU-r8A8GlM2FgQr-qO9xw",
                         "httpCode": 200,
                         "isProfileExistt": false,
                         "users": {
                         "id": 226,
                         "wallet": 0,
                         "firstName": "pk2",
                         "emailId": "pk2.afa@gmail.com",
                         "mobile": "+918947876585",
                         "userName": "pk25789",
                         "isReferralTransfer": 0,
                         "role": "USER"
                         }*/


                        /* "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0NjQyODI4NjcxMDIsInN1YiI6InJhYXN0ZWNoIiwiaXNzIjoicmFhc3RlY2gifQ.HZlulXffgNR8_PZzsGlmYkhU-r8A8GlM2FgQr-qO9xw",
                         "httpCode": 200,
                         "isProfileExistt": false,
                         "users": {
                         "id": 226,
                         "wallet": 0,
                         "firstName": "pk2",
                         "emailId": "pk2.afa@gmail.com",
                         "mobile": "+918947876585",
                         "userName": "pk25789",
                         "isReferralTransfer": 0,
                         "role": "USER"
                         }*/
                    }
                }
            }


        }

        $ionicModal.fromTemplateUrl('templates/TermsConditionPopup.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.termsConditionmodal = modal;
        });

        // Triggered in the login model to close it
        $scope.termsConditionclose = function() {
            $scope.termsConditionmodal.hide();
        };

        // Open the login model
        $scope.termsConditionshow = function() {
            $scope.termsConditionmodal.show();
        };


        $scope.login = function () {
            $state.go('loginScreen');
        }
    });
