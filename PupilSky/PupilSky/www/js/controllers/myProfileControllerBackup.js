angular.module('starter.myProfileController', ['ionic','ionic.closePopup'])

  .controller('MyProfileCtrlBackup', function($scope, $stateParams,$state,$ionicHistory, HOST_IMAGES, $cordovaCamera, HTTP, ShowMessageAlert, LoadingScreen) {

    $scope.goBackFunction   =   function(){
      window.localStorage.removeItem('SELECTED_PROFILE');
      window.localStorage.removeItem("UPDATE_PROF_RES");
      $ionicHistory.goBack();
    };

    var login_data =  JSON.parse(window.localStorage.getItem('userData'));

    $scope.myprofileobj  =  {};

    $scope.selctedProfileObjReturned =  JSON.parse(window.localStorage.getItem('SELECTED_PROFILE'));

    var USER_TYPE = $scope.selctedProfileObjReturned.userType;

    console.log($scope.selctedProfileObjReturned);

    if(($scope.selctedProfileObjReturned != undefined) && ($scope.selctedProfileObjReturned != null)){

      $scope.myprofileobj.name    = $scope.selctedProfileObjReturned.firstName;
      $scope.myprofileobj.aboutme = $scope.selctedProfileObjReturned.aboutMe;

      if($scope.selctedProfileObjReturned.firstName == undefined){
        $scope.myprofileobj.name    = $scope.selctedProfileObjReturned.name;
      }

      if($scope.selctedProfileObjReturned.email != undefined){
        $scope.myprofileobj.email    = $scope.selctedProfileObjReturned.email;
      }

      if($scope.selctedProfileObjReturned.email == undefined){
        $scope.myprofileobj.email    = $scope.selctedProfileObjReturned.user.emailId;
      }

      $scope.proImagesArray = $scope.selctedProfileObjReturned.profilePicsDet;

      if( !($scope.proImagesArray == undefined ||$scope.proImagesArray.length <= 0) ){

        $scope.pro_image = HOST_IMAGES+$scope.proImagesArray[0].fileUrl;

      }else{

        $scope.proImagesArray = $scope.selctedProfileObjReturned.profilePics;

        if(!($scope.proImagesArray == undefined ||$scope.proImagesArray.length <= 0)){
          $scope.pro_image = HOST_IMAGES+$scope.proImagesArray[0].fileUrl;
        }
      }
    }

    $scope.updateProfile =  function(){

      var user_type_api = "";

      if(USER_TYPE == "STUDENT"){

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
          "firstName": $scope.myprofileobj.name,
          "courseId":$scope.selctedProfileObjReturned.courses.id,
          "subjectIds":$scope.profileSubjectIdReturned,
          "profileName":$scope.selctedProfileObjReturned.profileName,
          "hobbiesIds" : $scope.profileHobbyIdReturned,
          "aboutMe":$scope.myprofileobj.aboutme,
          "profilePicIds":$scope.profilePicIdReturned
        }

      }else if(USER_TYPE == "TUTOR"){

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
          $scope.specializedCoursesIdReturned.push($scope.selctedProfileObjReturned.specializedCourses[i].id);
        }

        for(var i = 0; i < $scope.selctedProfileObjReturned.specializedSubjects.length; i++ ){
          $scope.specializedSubjectsIdReturned.push($scope.selctedProfileObjReturned.specializedSubjects[i].id);
        }

        $scope.data_final_info = {
          // real info
          "firstName":$scope.myprofileobj.name,
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
          "profilePicIds": $scope.profilePicIdReturned
        }

      }else{

        USER_TYPE == "INSTITUTE";

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
          "name":  $scope.myprofileobj.name,
          "establishmentYear": $scope.selctedProfileObjReturned.establishmentYear,
          "contactNumber": $scope.selctedProfileObjReturned.contactNumber,
          "contactNumber2": $scope.selctedProfileObjReturned.contactNumber2,
          "email": $scope.myprofileobj.email,
          "website": $scope.selctedProfileObjReturned.website,
          "active": $scope.selctedProfileObjReturned.active,
          "aboutMe": $scope.myprofileobj.aboutme,
          "profilePicIds": $scope.profilePicIdReturned
        }

      }

      console.log( $scope.data_final_info);

      LoadingScreen.show();
      HTTP.put_data("user/"+user_type_api+"/profile/update/"+$scope.selctedProfileObjReturned.id, $scope.data_final_info, login_data.access_token).success(function (response) {
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
          alert("Profile updated successfully");
        }
      }).error(function (error, status) {
        LoadingScreen.hide();
      });
    };

    $scope.GetImageFromCamera = function () {

      // alertPopup.close();
      if (window.cordova) {
        var pictureSource = navigator.camera.PictureSourceType;
        var destinationType = navigator.camera.DestinationType;
        navigator.camera.getPicture(function (success) {

          $scope.pro_image = success;

          $scope.postImage();

        }, function (error) {
          //alert(error);
        }, {quality: 50, destinationType: destinationType.FILE_URI});
      }
      // $scope.signup.imgURL=$scope.signup.imgURL;
    };


    // get image from gallery
    $scope.choosePhoto = function () {
      var options = {
        quality: 75,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: false,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 300,
        targetHeight: 300,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false
      };

      $cordovaCamera.getPicture(options).then(function (imageData) {
        $scope.pro_image  = "data:image/jpeg;base64," + imageData;
        $scope.postImage();
      }, function (err) {
        // An error occured. Show a message to the user
      });
    };

    $scope.postImage = function () {
      var url = 'user/profile/pic/upload';

      if((USER_TYPE == "STUDENT") || (USER_TYPE == "TUTOR") ){
        var params = {
          "profileName": $scope.selctedProfileObjReturned.profileName,
          "profileType": $scope.selctedProfileObjReturned.userType,
          "isProfilePic": "1"
        };
      }else{
        var params = {
          "profileName": $scope.selctedProfileObjReturned.profileName,
          "profileType": "INSTITUTE",
          "isProfilePic": "1"
        };
      }

      console.log(params);

      HTTP.uploadUsingDevice(url, $scope.pro_image, params, login_data.access_token, "UPDATE_PROFILE");
    }

  })


