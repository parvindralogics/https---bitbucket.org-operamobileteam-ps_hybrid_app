/**
 * Created by mk on 27-May-16.
 */
angular.module('starter.ManageProfileController', ['ionic','ionic.closePopup'])

    .controller('AddProfileCtrl', function($scope,$state, $ionicHistory,$rootScope, HTTP, LoadingScreen) {

       /* $rootScope.closeGroup();*/
        //$ionicViewService.clearHistory();

    $scope.user_response = JSON.parse(window.localStorage.getItem('userData'));

    $scope.goBackFunction   =   function(){

      if($scope.user_response.isProfileExistt == true){

        $state.go('app.mainPage');
       // $ionicHistory.goBack();.

      }else{
       alert("Please fill the profile info first");
      }

    };

    $scope.isProfilesExists = false;
        $scope.createProfile=function () {
            $state.go('app.tutorProfile');
        };

        $scope.createStudentProfile = function () {
            $state.go('app.createStudentProfileSection1');
        };

        $scope.createInstituteProfile = function () {
            $state.go('app.createInstituteProfileSec1');
        };


      $scope.getAllProfiles = function(){

        LoadingScreen.show();

          var login_data =  JSON.parse(window.localStorage.getItem('userData'));

          HTTP.get_request("user/profile/all", login_data.access_token).success(function (response) {

            LoadingScreen.hide();
            $scope.profiles_created_stu = response.studentProfiles;


            if(($scope.profiles_created_stu == undefined) || ($scope.profiles_created_stu.length <= 0)){
              $scope.isProfilesExists = false;
            }else{
              $scope.isProfilesExists = true;
            }

          }).error(function (error, status) {

            LoadingScreen.hide();
            //alert(JSON.stringify(error));
          });

        }

    $scope.getAllProfiles();

    });
