angular.module('starter.myProfileController', ['ionic','ionic.closePopup'])

  .controller('MyProfileCtrl', function($scope, $stateParams,$state,$ionicHistory, HOST_IMAGES, $cordovaCamera, HTTP, ShowMessageAlert, LoadingScreen) {

    $scope.goBackFunction   =   function(){
      $state.go("app.mainPage");
      $ionicHistory.goBack();
    };

    var login_data          =  JSON.parse(window.localStorage.getItem('userData'));
    var login_data_updated  =  JSON.parse(window.localStorage.getItem('userUpdatedData'));

    console.log("parvindra");
    console.log(login_data_updated);

   // console.log(login_data.users);

    $scope.myprofileobj  =  {};

    if((login_data != undefined) && (login_data!= null)){

      if(login_data_updated == null){
        $scope.myprofileobj.name      =   login_data.users.firstName;
        $scope.myprofileobj.email     =   login_data.users.emailId;
        $scope.myprofileobj.contact   =   login_data.users.mobile;
      }else{
        $scope.myprofileobj.name      =   login_data_updated.firstName;
        $scope.myprofileobj.email     =   login_data_updated.emailId;
        $scope.myprofileobj.contact   =   login_data_updated.mobile;
      }
    }


    $scope.updateProfile =  function(){

      var user_type_api = "";

        $scope.data_update_info = {
          "firstName": $scope.myprofileobj.name,
          "emailId": $scope.myprofileobj.email
        }

      console.log( $scope.data_update_info);

      if($scope.myprofileobj.name == undefined || $scope.myprofileobj.name == '' ){
        ShowMessageAlert.showMessage("Name is required");
      }else if($scope.myprofileobj.email == undefined || $scope.myprofileobj.email == ''){
        ShowMessageAlert.showMessage("Email is required");
      }else {
        LoadingScreen.show();
        HTTP.put_data("user/profile/update?userName=" + login_data.users.userName, $scope.data_update_info, login_data.access_token).success(function (response) {
          LoadingScreen.hide();
          $scope.resposeAddData = response;
          console.log(response);
          if ($scope.resposeAddData.errorCode == 199) {
            ShowMessageAlert.showMessage($scope.resposeAddData.message);
          }
          else if ($scope.resposeAddData.errorCode == 69) {
            ShowMessageAlert.showMessage($scope.resposeAddData.message);
          }
          else if ($scope.resposeAddData.errorCode == 19) {
            ShowMessageAlert.showMessage($scope.resposeAddData.message);
          }
          else {
            window.localStorage.setItem('userUpdatedData',JSON.stringify(response));
            ShowMessageAlert.showMessage("Profile updated successfully");
          }
        }).error(function (error, status) {
          LoadingScreen.hide();
        });
      }
    };

  });
