/**
 * Created by mk on 27-May-16.
 */
angular.module('starter.ManageProfileController', ['ionic','ionic.closePopup'])

    .controller('AddProfileCtrl', function($scope,$state, $ionicHistory,$rootScope, HTTP, LoadingScreen) {

       /* $rootScope.closeGroup();*/
        //$ionicViewService.clearHistory();

    $scope.user_response = JSON.parse(window.localStorage.getItem('userData'));

   // console.log($scope.user_response);

    $scope.goBackFunction   =   function(){

      var profile_flag = window.localStorage.getItem('IS_PROFILE_CREATED');

      if(($scope.user_response.isProfileExistt == true) || (profile_flag == "true")){

        $state.go('app.mainPage');
       // $ionicHistory.goBack();.

      }else{
       alert("Please create at least one profile first");
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

            $scope.profiles_created_stu   = response.studentProfiles;
            $scope.profiles_created_inst  = response.instituteProfiles;
            $scope.profiles_created_tut   = response.tutorProfiles;

            $rootScope.allProfileReturned     =   response;

            window.localStorage.setItem('ALL_PROFILES', JSON.stringify(response));

            if(($scope.profiles_created_stu == undefined) || ($scope.profiles_created_stu.length <= 0)){
              $scope.isProfilesExists = false;
            }else{
              $scope.isProfilesExists = true;
            }

            if(($scope.profiles_created_inst == undefined) || ($scope.profiles_created_inst.length <= 0)){
              $scope.isProfilesExists = false;
            }else{
              $scope.isProfilesExists = true;
            }

            if(($scope.profiles_created_tut == undefined) || ($scope.profiles_created_tut.length <= 0)){
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

    $scope.deleteProfile = function(pro_object){
      console.log(pro_object);
    }

    $scope.goToMyProfile  = function(pro_object){
      window.localStorage.setItem('SELECTED_PROFILE', JSON.stringify(pro_object));
      $state.go('app.MyProfile');
    }

    });
