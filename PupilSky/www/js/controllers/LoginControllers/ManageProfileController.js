/**
 * Created by mk on 27-May-16.
 */
angular.module('starter.ManageProfileController', ['ionic','ionic.closePopup'])

    .controller('AddProfileCtrl', function($scope,$state, $ionicHistory,$rootScope, HTTP, LoadingScreen, ShowMessageAlert, $rootScope) {

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
          console.log("in add");
          //console.log(login_data);

          HTTP.get_request("user/profile/all", login_data.access_token).success(function (response) {

            LoadingScreen.hide();

          //  console.log($scope.profiles_created_stu);

            $scope.profiles_created_stu   = response.studentProfiles;
            $scope.profiles_created_inst  = response.instituteProfiles;
            $scope.profiles_created_tut   = response.tutorProfiles;

            console.log(response);

            $rootScope.allProfileReturned     =   response;

            window.localStorage.setItem('ALL_PROFILES', JSON.stringify(response));

            if(($scope.profiles_created_stu == undefined) || ($scope.profiles_created_stu.length <= 0)){

              if($scope.isProfilesExists == true){
                $scope.isProfilesExists = true
              }else{
                $scope.isProfilesExists = false;
              }

            }else{
              $scope.isProfilesExists = true;
              console.log($scope.isProfilesExists);
            }

            if(($scope.profiles_created_inst == undefined) || ($scope.profiles_created_inst.length <= 0)){

              if($scope.isProfilesExists == true){
                $scope.isProfilesExists = true
              }else{
                $scope.isProfilesExists = false;
              }

            }else{
              $scope.isProfilesExists = true;
            }

            if(($scope.profiles_created_tut == undefined) || ($scope.profiles_created_tut.length <= 0)){

              if($scope.isProfilesExists == true){
                $scope.isProfilesExists = true
              }else{
                $scope.isProfilesExists = false;
              }

            }else{
              $scope.isProfilesExists = true;
            }

            console.log($scope.isProfilesExists);

          }).error(function (error, status) {

            LoadingScreen.hide();
            //alert(JSON.stringify(error));
          });

        };

    $scope.getAllProfiles();

    $scope.deleteProfile = function(pro_object, profile_type){
      console.log(pro_object);

      var USER_TYPE = '';

      var user_type_api = '';

      //window.localStorage.setItem('SELECTED_DEL_PROFILE', JSON.stringify(pro_object));

      $scope.selctedProfileObjReturned    =   pro_object;

      if(profile_type == "STUDENT"){

        USER_TYPE == "STUDENT";

        console.log("in student");

        user_type_api    =   "student";

        $scope.profilePicIdReturned = [];
        $scope.profileHobbyIdReturned = [];
        $scope.profileSubjectIdReturned = [];

        $scope.profile_pic_uploaded_data = JSON.parse(window.localStorage.getItem("UPDATE_PROF_RES"));

        console.log($scope.profile_pic_uploaded_data);

        if($scope.profile_pic_uploaded_data == null){
          for(var i = 0; i < $scope.selctedProfileObjReturned.profilePics.length; i++ ){
            $scope.profilePicIdReturned.push($scope.selctedProfileObjReturned.profilePics[i].id);
          }
        }else{

          $scope.profile_pic_uploaded_data = JSON.parse($scope.profile_pic_uploaded_data.response);
          $scope.profilePicIdReturned.push($scope.profile_pic_uploaded_data.id);

          console.log($scope.profile_pic_uploaded_data.id+"  "+$scope.profilePicIdReturned.length);
        }

        for(var i = 0; i < $scope.selctedProfileObjReturned.hobbyList.length; i++ ){
          $scope.profileHobbyIdReturned.push($scope.selctedProfileObjReturned.hobbyList[i].id);
        }

        for(var i = 0; i < $scope.selctedProfileObjReturned.subjectsList.length; i++ ){
          $scope.profileSubjectIdReturned.push($scope.selctedProfileObjReturned.subjectsList[i].id);
        }


        $scope.data_final_info = {
          "firstName": $scope.selctedProfileObjReturned.firstName,
          "courseId":$scope.selctedProfileObjReturned.courses.id,
          "subjectIds":$scope.profileSubjectIdReturned,
          "profileName":$scope.selctedProfileObjReturned.profileName,
          "hobbiesIds" : $scope.profileHobbyIdReturned,
          "aboutMe":$scope.selctedProfileObjReturned.aboutme,
          "profilePicIds":$scope.profilePicIdReturned,
          "active":0
        }

      }else if(profile_type == "TUTOR"){

        user_type_api    =   "tutor";

        $scope.profilePicIdReturned          = [];
        $scope.specializedCoursesIdReturned  = [];
        $scope.specializedSubjectsIdReturned = [];

        $scope.profile_pic_uploaded_data = JSON.parse(window.localStorage.getItem("UPDATE_PROF_RES"));


        console.log($scope.profile_pic_uploaded_data);

        if($scope.profile_pic_uploaded_data == null){
          for(var i = 0; i < $scope.selctedProfileObjReturned.profilePicsDet.length; i++ ){
            $scope.profilePicIdReturned.push($scope.selctedProfileObjReturned.profilePicsDet[i].id);
          }
        }else{
          $scope.profile_pic_uploaded_data = JSON.parse($scope.profile_pic_uploaded_data.response);
          $scope.profilePicIdReturned.push($scope.profile_pic_uploaded_data.id);
          console.log($scope.profile_pic_uploaded_data.id+"  "+$scope.profilePicIdReturned.length);
        }

        for(var i = 0; i < $scope.selctedProfileObjReturned.specializedCourses.length; i++ ){
          $scope.specializedCoursesIdReturned.push($scope.selctedProfileObjReturned.specializedCourses[i]);
        }

        for(var i = 0; i < $scope.selctedProfileObjReturned.specializedSubjects.length; i++ ){
          $scope.specializedSubjectsIdReturned.push($scope.selctedProfileObjReturned.specializedSubjects[i]);
        }

        $scope.data_final_info = {
          // real info
          "firstName":$scope.selctedProfileObjReturned.firstName,
          "courseId":$scope.selctedProfileObjReturned.courses.id,
          "universityId":$scope.selctedProfileObjReturned.univeristyList.id,
          "passingYear":$scope.selctedProfileObjReturned.passingYear,
          "specializedCourses":$scope.specializedCoursesIdReturned,
          "specializedSubjects":$scope.specializedSubjectsIdReturned,
          "individualSrvc":$scope.selctedProfileObjReturned.individualSrvc,
          "groupSrvc":$scope.selctedProfileObjReturned.groupSrvc,
          "individualSrvcChrgRange":$scope.selctedProfileObjReturned.individualSrvcChrgRange,
          "groupSrvcChargRange":$scope.selctedProfileObjReturned.groupSrvcChargRange,
          "gender":$scope.selctedProfileObjReturned.gender,
          "freeTrial":$scope.selctedProfileObjReturned.freeTrial,
          "idProofType":$scope.selctedProfileObjReturned.idProofType,
          "idProofValue":$scope.selctedProfileObjReturned.idProofValue,
          "dateOfBirth":$scope.selctedProfileObjReturned.dateOfBirth,
          "supportingAreaCodeIds" :[1],
          "profilePicIds": $scope.profilePicIdReturned,
          "active":0
        }


      }else if(profile_type == "INSTITUTE"){

        console.log("in institute");

        user_type_api    =   "institute";

        $scope.profilePicIdReturned = [];
        $scope.profile_pic_uploaded_data = JSON.parse(window.localStorage.getItem("UPDATE_PROF_RES"));

        console.log($scope.profile_pic_uploaded_data);

        if($scope.profile_pic_uploaded_data == null){
          for(var i = 0; i < $scope.selctedProfileObjReturned.profilePics.length; i++ ){
            $scope.profilePicIdReturned.push($scope.selctedProfileObjReturned.profilePics[i].id);
          }
        }else{
          $scope.profile_pic_uploaded_data = JSON.parse($scope.profile_pic_uploaded_data.response);
          $scope.profilePicIdReturned.push($scope.profile_pic_uploaded_data.id);
          console.log($scope.profile_pic_uploaded_data.id+"  "+$scope.profilePicIdReturned.length);
        }

        $scope.data_final_info = {
          "name":  $scope.selctedProfileObjReturned.name,
          "establishmentYear": $scope.selctedProfileObjReturned.establishmentYear,
          "contactNumber": $scope.selctedProfileObjReturned.contactNumber,
          "contactNumber2": $scope.selctedProfileObjReturned.contactNumber2,
          "email": $scope.selctedProfileObjReturned.email,
          "website": $scope.selctedProfileObjReturned.website,
          "active": $scope.selctedProfileObjReturned.active,
          "aboutMe": $scope.selctedProfileObjReturned.aboutme,
          "profilePicIds": $scope.profilePicIdReturned,
          "active":0
        }
      }

      console.log( $scope.data_final_info);
      if($rootScope.isNetworkConnected()) {
        LoadingScreen.show();
        HTTP.put_data("user/" + user_type_api + "/profile/update/" + $scope.selctedProfileObjReturned.id, $scope.data_final_info, $scope.user_response.access_token).success(function (response) {
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
            console.log($scope.resposeAddData);
            alert("Profile deleted successfully");
          }
        }).error(function (error, status) {
          LoadingScreen.hide();
        });
      }else{
        $rootScope.networkPopup();
      }

    };

    $scope.goToMyProfile  = function(pro_object, profile_type) {
      if ($rootScope.isNetworkConnected()) {

        window.localStorage.setItem('SELECTED_PROFILE', JSON.stringify(pro_object));

        if (profile_type == "STUDENT") {
          $scope.createStudentProfile();
        } else if (profile_type == "TUTOR") {
          $scope.createProfile();
        } else if (profile_type == "INSTITUTE") {
          $scope.createInstituteProfile();
        }
        //$state.go('app.MyProfile');
      }else{
        $rootScope.networkPopup();
      }
    }
  });
