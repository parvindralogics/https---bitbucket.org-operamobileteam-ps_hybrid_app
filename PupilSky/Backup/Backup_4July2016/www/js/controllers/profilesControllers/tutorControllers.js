angular.module('starter.tutorControllers', ['ionic','ionic.closePopup'])

.controller('tutorProfileCtrl', function($scope, $stateParams,$state,$ionicHistory, HTTP, LoadingScreen) {

  $scope.goBackFunction   =   function(){
    $ionicHistory.goBack();
  };

  // Create tutor profile
  var login_data =  JSON.parse(window.localStorage.getItem('userData'));

  $scope.teacherInfo      = {};
  $scope.model            = {};
  $scope.modelUniv        = {};


  $scope.postTutorProfileInfo = function(){
    $scope.tutor_info_first = {
      "firstName":$scope.teacherInfo.teachName,
      "courseId":$scope.model.id,
      "universityId":$scope.modelUniv.id,
      "passingYear":$scope.teacherInfo.teacPasYear,
      "gender":$scope.teacherInfo.gender,
      "idProofType":$scope.teacherInfo.teacIdentityType,
      "idProofValue":$scope.teacherInfo.teacIdentityValue,
      "dateOfBirth":$scope.teacherInfo.teacDOB
    }
  }

  $scope.next = function () {

    if($scope.teacherInfo.teachName == undefined ||$scope.teacherInfo.teachName.trim() == ""){
      alert("Please fill your name");
    }else if($scope.model.id == undefined){
      alert("Please select your course");
    }else if($scope.modelUniv.id == undefined){
      alert("Please select  university");
    }else if($scope.teacherInfo.gender == undefined || $scope.teacherInfo.gender == "" ){
      alert("Please select your gender");
    }else if($scope.teacherInfo.teacIdentityType == undefined || $scope.teacherInfo.teacIdentityType.trim() == ""){
      alert("Please fill your identity proof information");
    }else if($scope.teacherInfo.teacIdentityValue == undefined || $scope.teacherInfo.teacIdentityValue.trim() == ""){
      alert("Please fill your identity proof value");
    }else if($scope.teacherInfo.teacDOB == undefined || $scope.teacherInfo.teacDOB.trim() == ""){
      alert("Please provide your DOB");
    }else if($scope.teacherInfo.teacPasYear == undefined || $scope.teacherInfo.teacPasYear.trim() == ""){
      alert("Please select your passing year");
    }
    else{
      $scope.postTutorProfileInfo();
      window.localStorage.setItem('TUTOR_INFO_FIRST', JSON.stringify($scope.tutor_info_first));
      $state.go('app.tutorInfo');
      $scope.teacherInfo      = {};
      $scope.model            = {};
      $scope.modelUniv        = {};
    }

  };

})
  .controller('tutorInfoCtrl', function($scope, $stateParams,$state,$ionicHistory, LoadingScreen, HTTP, $ionicModal, ShowMessageAlert) {

    $scope.goBackFunction   =   function(){
      $ionicHistory.goBack();
    };

    var tutor_info_first_retrieved =  JSON.parse(window.localStorage.getItem('TUTOR_INFO_FIRST'));
    var login_data =  JSON.parse(window.localStorage.getItem('userData'));

    $scope.tutorInfoTwoObj  = {};
    $scope.tutorInfoGroup   = {};
    $scope.tutorInfoHome    = {};
    $scope.tutorInfoFree    = {};

    $scope.isFree           = 0;
    $scope.isHome           = 0;
    $scope.isGroup          = 0;

    $scope.setFreeCharge = function(){
      if($scope.tutorInfoFree.checked == true){
        $scope.isFree   =   1;
      }else{
        $scope.isFree   =   0;
      }
    }

    $scope.setHomeCharge = function(){
      if($scope.tutorInfoHome.checked == true){
        $scope.isHome   =   1;
      }else{
        $scope.isHome   =   0;
      }
    }

    $scope.setGroupCharge = function(){
      if($scope.tutorInfoGroup.checked == true){
        $scope.isGroup   =   1;
      }else{
        $scope.isGroup   =   0;
      }
    }


    $scope.model = {};
    $scope.selectCourse = function(){

      LoadingScreen.show();

      HTTP.get_request("superadmin/subjects/retrieve/course/"+$scope.model.id, login_data.access_token).success(function (response) {

        LoadingScreen.hide();
        $scope.subjectData = response.items;

      }).error(function (error, status) {
        LoadingScreen.hide();
        //alert(JSON.stringify(error));
      });

    }

    $scope.postTutorInfo = function(){

      $scope.tutorFinalInfo =  {
        "firstName":tutor_info_first_retrieved.firstName,
        "courseId":tutor_info_first_retrieved.courseId,
        "universityId":tutor_info_first_retrieved.universityId,
        "passingYear":tutor_info_first_retrieved.passingYear,
        "specializedCourses":[$scope.model.id],
        "specializedSubjects":$scope.totalSelectedSub,
        "individualSrvc":$scope.isHome,
        "groupSrvc": $scope.isGroup,
        "individualSrvcChrgRange":$scope.tutorInfoTwoObj.amountHomeTu,
        "groupSrvcChargRange":$scope.tutorInfoTwoObj.amountGroupTu,
        "gender":tutor_info_first_retrieved.gender,
        "freeTrial": $scope.isFree,
        "idProofType":tutor_info_first_retrieved.idProofType,
        "idProofValue":tutor_info_first_retrieved.idProofValue,
        "dateOfBirth":tutor_info_first_retrieved.dateOfBirth,
        "supportingAreaCodeIds" :[1]

      }

      if($scope.model.id == undefined){
        alert("Please select specilized course ");
      }else if($scope.totalSelectedSub.length ==  0){
        alert("Please select subject");
      }else {

        HTTP.post_data("user/tutor/profile/create", $scope.tutorFinalInfo, login_data.access_token).success(function (response) {
          LoadingScreen.hide();
          $scope.resposeData = response;

          if ($scope.resposeData.errorCode == 199) {
            ShowMessageAlert.showMessage($scope.resposeData.message);
          }
          else if ($scope.resposeData.errorCode == 69) {
            ShowMessageAlert.showMessage($scope.resposeData.message);
          }
          else if ($scope.resposeData.errorCode == 19) {
            ShowMessageAlert.showMessage($scope.resposeData.message);
          } else if ($scope.resposeData.errorCode == 46) {
            ShowMessageAlert.showMessage($scope.resposeData.message);
          } else if ($scope.resposeData.errorCode != undefined) {
            ShowMessageAlert.showMessage($scope.resposeData.message);
          }
          else {
            //$state.go('app.tutorProfilePic');
            $state.go('app.tutorAddress');
            window.localStorage.setItem("TUTER_INFO_RES", JSON.stringify($scope.resposeData));

            $scope.tutorInfoTwoObj = {};
            $scope.tutorInfoGroup = {};
            $scope.tutorInfoHome = {};
            $scope.tutorInfoFree = {};

            $scope.isFree = 0;
            $scope.isHome = 0;
            $scope.isGroup = 0;
          }

        }).error(function (error, status) {
          LoadingScreen.hide();
          console.log(error);
        });
      }

    }

    // Select Subjects modal
    $ionicModal.fromTemplateUrl('templates/model/selectSubjects.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(comment) {
      $scope.selectSubjectModel = comment;
    });

    $scope.openSubjectsModal  = function(){

      if($scope.subjectData == undefined){
        alert("Select course first");
      }else{
        $scope.selectSubjectModel.show();
      }
    }

    $scope.closeSubjectsModal  = function(){
      $scope.selectSubjectModel.hide();
    }

// Subjects selectins logic
    $scope.totalSelectedSub = [];
    $scope.totalSelectedSubName = [];
    $scope.isSubChecked = {};

    $scope.selectSubjectCheckbox = function(item, index){
      if($scope.isSubChecked.checked[index] == true){
        $scope.totalSelectedSub.push(item.id);
        $scope.totalSelectedSubName.push(item.name);
      }else{
        var index = $scope.totalSelectedSub.indexOf(item.id);
        $scope.totalSelectedSub.splice(index, 1);
        $scope.totalSelectedSubName.splice(index, 1);
      }
    }

    $scope.cancelSelection = function(){
      $scope.totalSelectedSub = [];
      $scope.totalSelectedSubName = [];
      $scope.isSubChecked= {};
      $scope.selectSubjectModel.hide();
    }

  })

  .controller('teacherAddressCtrl', function($scope, $stateParams,$state,$ionicHistory, HTTP, LoadingScreen, ShowMessageAlert) {
    $scope.goBackFunction   =   function(){
      $ionicHistory.goBack();
    };


    var login_data =  JSON.parse(window.localStorage.getItem('userData'));

    $scope.instAddress = {};

    $scope.inst_profile_id = "";
    $scope.inst_profile_type = "";

    $scope.postStudentAddressInfo = function(){

      $scope.returned_instData =  JSON.parse(window.localStorage.getItem("TUTER_INFO_RES"));

      console.log($scope.returned_instData);

      $scope.data_address_info = {
        "profileId":$scope.returned_instData.id,
        "profileType":$scope.returned_instData.userType,
        "addressLine":$scope.instAddress.address_txt,
        "locality":$scope.instAddress.address_txt,
        "areaId":$scope.instarea_model.id
      }

      if($scope.instarea_model.id == undefined){
        alert("Please select address");
      }else if($scope.instAddress.address_txt == undefined ||$scope.instAddress.address_txt.trim() == ""){
        alert("Please address locality");
      }else {

        HTTP.post_data("user/address/create", $scope.data_address_info, login_data.access_token).success(function (response) {
          LoadingScreen.hide();
          $scope.resposeAddData = response;

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
            // alert("Student  address information successfully saved");
            $state.go('app.tutorProfilePic');
            window.localStorage.setItem("TUTER_ADD_RES", JSON.stringify($scope.resposeAddData));
            $scope.instAddress = {};
            $scope.inststate_model = {};
            $scope.instcity_model = {};
            $scope.instarea_model = {};
          }

        }).error(function (error, status) {
          LoadingScreen.hide();
        });

      }
    }

    $scope.inststate_model  = {};
    $scope.selectState      = function(){
      LoadingScreen.show();
      HTTP.get_request("superadmin/city/retrieve/state/"+$scope.inststate_model.id, login_data.access_token).success(function (response) {
        LoadingScreen.hide();
        $scope.cityData = response.items;
      }).error(function (error, status) {
        LoadingScreen.hide();
        alert(JSON.stringify(error));
      });

    }

    $scope.instcity_model = {};
    $scope.selectCity = function(){
      LoadingScreen.show();
      HTTP.get_request("superadmin/area/retrieve/city/"+$scope.instcity_model.id, login_data.access_token).success(function (response) {
        LoadingScreen.hide();
        if(response.errorCode == 191){
          alert('Area not found for this location');
        }else{
          $scope.areaData = response.items;
        }

      }).error(function (error, status) {
        LoadingScreen.hide();
        alert(JSON.stringify(error));
      });
    }

    $scope.instarea_model = {};
    $scope.selectArea = function(){
    }

    $scope.next = function () {
      $scope.postStudentAddressInfo();
    };

  })


  .controller('tutorProfilePicCtrl', function($scope, $stateParams,$state,$ionicHistory, LoadingScreen, HTTP, ShowMessageAlert, $cordovaCamera) {
    $scope.goBackFunction   =   function(){
      $ionicHistory.goBack();
    };

    var login_data =  JSON.parse(window.localStorage.getItem('userData'));
    $scope.stu_data_obj = JSON.parse(window.localStorage.getItem("TUTER_INFO_RES"));
    // Get image from camera
    $scope.profile = {};
    $scope.picsCaptured = [];
    $scope.selected_picture = "";


    $scope.selectProfilePicture = function(index){
      $scope.selected_picture = $scope.picsCaptured[index];
      $scope.profile.imgURL   = $scope.selected_picture;
      $scope.postImageAsProfile();
    }

    $scope.GetImageFromCamera = function () {

      // alertPopup.close();
      if (window.cordova) {
        var pictureSource = navigator.camera.PictureSourceType;
        var destinationType = navigator.camera.DestinationType;
        navigator.camera.getPicture(function (success) {

          $scope.profile.imgURL = success;
          $scope.picsCaptured.push($scope.profile.imgURL);
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
        $scope.profile.imgURL  = "data:image/jpeg;base64," + imageData;
        var isAlreadyChoosen = false;
        for(var i = 0; i < $scope.picsCaptured.length; i++){
          if($scope.picsCaptured[i] == $scope.profile.imgURL){
            alert("This piture is already choosen by you. Select different picture");
            isAlreadyChoosen = true;
            break;
          }
        }

        if(isAlreadyChoosen == false){
          $scope.picsCaptured.push($scope.profile.imgURL);
          $scope.postImage();
        }
      }, function (err) {
        // An error occured. Show a message to the user
      });
    };

    $scope.postImage = function () {

      var url = 'user/profile/pic/upload';
      var params = {
        "profileName": $scope.stu_data_obj.profileName,
        "profileType": $scope.stu_data_obj.userType,
        "isProfilePic": "1"
      };

      HTTP.uploadUsingDevice(url, $scope.profile.imgURL, params, login_data.access_token, "TUTOR");

    }

    $scope.postImageAsProfile = function () {
      var url = 'user/profile/pic/upload';
      var params = {
        "profileName": $scope.stu_data_obj.profileName,
        "profileType": $scope.stu_data_obj.userType,
        "isProfilePic": "1"
      };

      HTTP.uploadUsingDevice(url, $scope.profile.imgURL, params, login_data.access_token, "STUDENT");

    }


    $scope.submitProfile = function(){

      $scope.stu_PROF_obj     = JSON.parse(window.localStorage.getItem("TUTER_PROF_RES"));

      console.log($scope.stu_data_obj);
      console.log($scope.stu_data_obj.univeristyList.id);

      $scope.stu_objImageInfo = JSON.parse($scope.stu_PROF_obj.response);

      $scope.data_final_info = {

        // real info
        "firstName":$scope.stu_data_obj.firstName,
        "courseId":$scope.stu_data_obj.courses.id,
        "universityId":$scope.stu_data_obj.univeristyList.id,
        "passingYear":$scope.stu_data_obj.passingYear,
        "specializedCourses":$scope.stu_data_obj.specializedCourses,
        "specializedSubjects":$scope.stu_data_obj.specializedSubjects,
        "individualSrvc":$scope.stu_data_obj.individualSrvc,
        "groupSrvc":$scope.stu_data_obj.groupSrvc,
        "individualSrvcChrgRange":$scope.stu_data_obj.individualSrvcChrgRange,
        "groupSrvcChargRange":$scope.stu_data_obj.groupSrvcChargRange,
        "gender":$scope.stu_data_obj.gender,
        "freeTrial":$scope.stu_data_obj.freeTrial,
        "idProofType":$scope.stu_data_obj.idProofType,
        "idProofValue":$scope.stu_data_obj.idProofValue,
        "dateOfBirth":$scope.stu_data_obj.dateOfBirth,
        "supportingAreaCodeIds" :[1],
        "profilePicIds":[$scope.stu_objImageInfo.id]

      }

      /* if($scope.stu_info.name != undefined){*/
      LoadingScreen.show();
      HTTP.put_data("user/tutor/profile/update/"+$scope.stu_data_obj.id, $scope.data_final_info, login_data.access_token).success(function (response) {
        LoadingScreen.hide();
        $scope.resposeAddData = response;

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

          window.localStorage.setItem('IS_PROFILE_CREATED',"true");
          $state.go('app.AddProfile');
          window.localStorage.setItem("TUTER_ADD_RES",JSON.stringify($scope.resposeAddData));
          $scope.stu_data_obj = {};
          $scope.profile = {};
        }

      }).error(function (error, status) {
        LoadingScreen.hide();
      });

    }
  })

