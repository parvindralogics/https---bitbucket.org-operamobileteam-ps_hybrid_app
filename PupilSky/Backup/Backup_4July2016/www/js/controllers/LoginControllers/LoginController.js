/**
 * Created by mk on 27-May-16.
 */
angular.module('starter.LoginController', [])

.controller('loginScreenCtrl', function($scope, $stateParams,$state,HTTP,ShowMessageAlert,$rootScope,LoadingScreen) {

    $scope.goBackFunction   =   function(){
      navigator.app.exitApp();
      //q$ionicHistory.goBack();
    };

        $scope.flag = window.localStorage.getItem('loginFlag');

        $rootScope.loginUserData = {};
        $scope.loginUserData.countryCode = $rootScope.status_post;
        $scope.loginUserData.mobileNumber='';
        $scope.loginUserData.password='';

        $scope.country_data =   JSON.parse(window.localStorage.getItem("COUNTRY_RESPONSE"));

        $scope.register=function () {
            $state.go('register');
        }

        $scope.forgotPassword = function () {
            if($scope.loginUserData.mobileNumber == '' )
            {
                ShowMessageAlert.showMessage("Please enter mobile number");
            }
            else
            {
                if($rootScope.selectedStatus == undefined)
                {
                    $rootScope.status_post = $rootScope.to[0];
                }
                else
                {
                    $rootScope.status_post = $rootScope.to[$rootScope.selectedStatus - 1];
                }

                $rootScope.userMobileNumber = $rootScope.status_post.category+$scope.loginUserData.mobileNumber;

                LoadingScreen.show();

                $scope.data ={
                    "mobile": $rootScope.userMobileNumber
                }

                HTTP.post("forgot_password", $scope.data).success(function (response) {
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

                        $state.go('OTP');
                    }

                }).error(function (error, status) {
                    LoadingScreen.hide();
                });

            }
        }


        $scope.home = function () {

            /* var DeviceId = device.uuid;*/

            var DeviceId = "Mobile";

            if ($scope.loginUserData.mobileNumber == '' && $scope.loginUserData.password == '') {
                ShowMessageAlert.showMessage("Please fill all required fields");
            }
            else if ($scope.loginUserData.mobileNumber == '') {
                ShowMessageAlert.showMessage("Please enter mobile number");
            }
            else if ($scope.loginUserData.password == '') {
                ShowMessageAlert.showMessage("Please enter password");
            }
            /* else if($scope.loginUserData.countryCode== '')
             {
             ShowMessageAlert.showMessage("Please select country code");
             }*/
            else {
                LoadingScreen.show();


                /*  ShowMessageAlert.showMessage($rootScope.selectedStatus);*/

                if ($rootScope.selectedStatus == undefined) {
                    /* ShowMessageAlert.showMessage($rootScope.selectedStatus);*/
                    $rootScope.status_post = $rootScope.to[0];
                }
                else {
                    $rootScope.status_post = $rootScope.to[$rootScope.selectedStatus - 1];
                    /* ShowMessageAlert.showMessage($rootScope.selectedStatus);*/
                }
                /*ShowMessageAlert.showMessage($rootScope.status_post.category);*/

                /*ShowMessageAlert.showMessage(JSON.stringify($rootScope.loginUserData));*/

                $rootScope.userMobileNumber = $rootScope.status_post.category + $scope.loginUserData.mobileNumber;
                /* ShowMessageAlert.showMessage( $rootScope.userMobileNumber);*/

                /* $state.go('OTP');*/

                $scope.data = {
                    "mobile": $rootScope.status_post.category + $scope.loginUserData.mobileNumber,
                    "password": $scope.loginUserData.password,
                    "deviceId": DeviceId
                }
                /*ShowMessageAlert.showMessage(JSON.stringify($scope.data))*/
                HTTP.post("login", $scope.data).success(function (response) {


                    LoadingScreen.hide();
                    /* ShowMessageAlert.showMessage(JSON.stringify(response));*/
                    $scope.resposeData = response;
                    if ($scope.resposeData.errorCode == 119) {
                        /*  if($scope.flag  == false)
                         {
                         $state.go('OTP');
                         }*/

                        ShowMessageAlert.showMessage($scope.resposeData.message);
                    }else if($scope.resposeData.errorCode == 12){
                       ShowMessageAlert.showMessage($scope.resposeData.message);

                        $state.go('OTP');

                    } else if ($scope.resposeData.errorCode == 198) {
                        /*  if($scope.flag  == false)
                         {
                         $state.go('OTP');
                         }*/

                        ShowMessageAlert.showMessage($scope.resposeData.message);
                    }
                    else if ($scope.resposeData.errorCode == 69) {
                        ShowMessageAlert.showMessage($scope.resposeData.message);
                    }
                    else {

                        ShowMessageAlert.showMessage("login successfully ");
                        $scope.Flag = true;
                        window.localStorage.setItem('dataFlag', true);

                        window.localStorage.setItem('userData', JSON.stringify($scope.resposeData));

                      if($scope.resposeData.isProfileExistt == true){
                        $state.go('app.mainPage');
                      }else{
                        $state.go('app.AddProfile');
                      }

                        /* ShowMessageAlert.showMessage(JSON.stringify(response));*/
                    }

                }).error(function (error, status) {
                    /*ShowMessageAlert.showMessage("error",error);*/
                    LoadingScreen.hide();
                });

            }
        }


/*            $scope.callSplashApi = function(){
                LoadingScreen.show();

                $scope.url = "http://ec2-52-201-214-115.compute-1.amazonaws.com:8080/educators/api/v1/user/startup/retrieve/";
                ShowMessageAlert.showMessage($rootScope.CounteryName);

                HTTP.get($scope.url+$rootScope.CounteryName).success(function (response) {


                    LoadingScreen.hide();
                    /!* ShowMessageAlert.showMessage(JSON.stringify(response));*!/
                    $scope.resposeData = response;
                    if($scope.resposeData.errorCode == 119)
                    {
                        /!*  if($scope.flag  == false)
                         {
                         $state.go('OTP');
                         }*!/

                        ShowMessageAlert.showMessage($scope.resposeData.message);
                    }
                    if($scope.resposeData.errorCode == 198)
                    {
                        /!*  if($scope.flag  == false)
                         {
                         $state.go('OTP');
                         }*!/

                        ShowMessageAlert.showMessage($scope.resposeData.message);
                    }
                    else if($scope.resposeData.errorCode == 69)
                    {
                        ShowMessageAlert.showMessage($scope.resposeData.message);
                    }
                    else{

                        ShowMessageAlert.showMessage(JSON.stringify($scope.resposeData));

                        window.localStorage.setItem("splashData",$scope.resposeData);
                    }

                }).error(function (error, status) {
                    /!*ShowMessageAlert.showMessage("error",error);*!/
                    LoadingScreen.hide();
                });

            };


        $scope.callSplashApi();*/


    });
