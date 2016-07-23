angular.module('starter.tutorControllers', ['ionic','ionic.closePopup'])

.controller('tutorProfileCtrl', function($scope, $stateParams,$state,$ionicHistory, HTTP, LoadingScreen, ShowMessageAlert) {

  $scope.goBackFunction   =   function(){
    window.localStorage.removeItem('SELECTED_PROFILE');
    window.localStorage.removeItem("TUTOR_INFO_FIRST");
    $ionicHistory.goBack();
  };

  // Create tutor profile
  var login_data =  JSON.parse(window.localStorage.getItem('userData'));

  $scope.teacherInfo      = {};
  $scope.model            = {};
  $scope.modelUniv        = {};
  $scope.editMode         = false;

    var edit_stuObj = JSON.parse(window.localStorage.getItem('SELECTED_PROFILE'));

   // console.log(edit_stuObj);

    if(edit_stuObj != null && edit_stuObj!= undefined){

      $scope.editMode                             =       true;

      $scope.teacherInfo.teachName                =       edit_stuObj.firstName;
      $scope.model.id                             =       edit_stuObj.courses.id;
      $scope.modelUniv.id                         =       edit_stuObj.univeristyList.id;
      $scope.teacherInfo.teacPasYear              =       edit_stuObj.passingYear;
      $scope.teacherInfo.gender                   =       edit_stuObj.gender,
      $scope.teacherInfo.teacIdentityType         =       edit_stuObj.idProofType,
      $scope.teacherInfo.teacIdentityValue        =       edit_stuObj.idProofValue,
      $scope.teacherInfo.teacDOB                  =       edit_stuObj.dateOfBirth

    }

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
  };


    $scope.getTutorProfile = function(){

      LoadingScreen.show();

      $scope.url = "superadmin/courses/retrieveAll?isHighestQualification=1";

      HTTP.get_request($scope.url, login_data.access_token).success(function (response) {
        LoadingScreen.hide();
        console.log(response);
        $scope.tutorCourseData    = response.items;

      }).error(function (error, status) {
        console.log(error);
        LoadingScreen.hide();
      });

    };

    $scope.getTutorProfile();

  $scope.next = function () {

    if($scope.teacherInfo.teachName == undefined ||$scope.teacherInfo.teachName.trim() == ""){
      ShowMessageAlert.showMessage("Please fill your name");
    }else if($scope.model.id == undefined){
      ShowMessageAlert.showMessage("Please select your course");
    }else if($scope.modelUniv.id == undefined){
      ShowMessageAlert.showMessage("Please select  university");
    }else if($scope.teacherInfo.gender == undefined || $scope.teacherInfo.gender == "" ){
      ShowMessageAlert.showMessage("Please select your gender");
    }else if($scope.teacherInfo.teacIdentityType == undefined || $scope.teacherInfo.teacIdentityType.trim() == ""){
      ShowMessageAlert.showMessage("Please fill your identity proof information");
    }else if($scope.teacherInfo.teacIdentityValue == undefined || $scope.teacherInfo.teacIdentityValue.trim() == ""){
      ShowMessageAlert.showMessage("Please fill your identity proof value");
    }else if($scope.teacherInfo.teacDOB == undefined || $scope.teacherInfo.teacDOB.trim() == ""){
      ShowMessageAlert.showMessage("Please provide your DOB");
    }else if($scope.teacherInfo.teacPasYear == undefined || $scope.teacherInfo.teacPasYear.trim() == ""){
      ShowMessageAlert.showMessage("Please select your passing year");
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
  .controller('tutorInfoCtrl', function($scope, $stateParams,$state,$ionicHistory, LoadingScreen, HTTP, $ionicModal, ShowMessageAlert, HOST_BASE) {

    $scope.goBackFunction   =   function(){
      $ionicHistory.goBack();
    };

    var tutor_info_first_retrieved =  JSON.parse(window.localStorage.getItem('TUTOR_INFO_FIRST'));
    var login_data =  JSON.parse(window.localStorage.getItem('userData'));

    var edit_stuObj = JSON.parse(window.localStorage.getItem('SELECTED_PROFILE'));

    $scope.tutorInfoTwoObj                  = {};
    $scope.tutorInfoGroup                   = {};
    $scope.tutorInfoHome                    = {};
    $scope.tutorInfoFree                    = {};

    $scope.isFree                           = 0;
    $scope.isHome                           = 0;
    $scope.isGroup                          = 0;

    $scope.model                            = {};

    $scope.editMode                         = false;

    // Subjects selectins logic
    $scope.totalSelectedSub                 = [];
    $scope.totalSelectedSubName             = [];
    $scope.isSubChecked                     = {};

    $scope.profileSubjectIdReturned         = [];

    $scope.totalSubjectId                   = [];

    $scope.isSubChecked.checked             = [];

    $scope.profilePicIdReturned             = [];


    $scope.selectCourse = function(){

      LoadingScreen.show();

      HTTP.get_request("superadmin/subjects/retrieve/course/"+$scope.model.id, login_data.access_token).success(function (response) {

        LoadingScreen.hide();
        $scope.subjectData = response.items;


        for(var i = 0; i < $scope.subjectData.length; i++){

          $scope.isSubChecked.checked[i] = false;

          $scope.totalSubjectId.push($scope.subjectData[i].id);
        }


        console.log($scope.totalSelectedSub[0]);

        for (var i = 0; i < $scope.totalSelectedSub.length; i++) {

          var index =  $scope.totalSubjectId.indexOf($scope.totalSelectedSub[i]);
          console.log(index);

          if(index != -1){
            console.log(index);
            $scope.isSubChecked.checked[index] = true;
          }
        }


      }).error(function (error, status) {
        LoadingScreen.hide();
        //alert(JSON.stringify(error));
      });

    };


    if(edit_stuObj != null && edit_stuObj!= undefined){

      console.log(edit_stuObj);

      for(var i = 0; i < edit_stuObj.specializedSubjects.length; i++ ){
        $scope.profileSubjectIdReturned.push(edit_stuObj.specializedSubjects[i]);
       // $scope.totalSelectedSubName.push(edit_stuObj.specializedSubjects[i].name);
      }


      for(var i = 0; i < edit_stuObj.profilePicsDet.length; i++ ){
        $scope.profilePicIdReturned.push(edit_stuObj.profilePicsDet[i].id);
      }


      $scope.editMode                               =       true;
      $scope.model.id                               =       edit_stuObj.specializedCourses[0];
      //$scope.model.id                             =
      $scope.isHome                                 =       edit_stuObj.individualSrvc;
      $scope.isGroup                                =       edit_stuObj.groupSrvc;
      $scope.isFree                                 =       edit_stuObj.freeTrial;
      $scope.tutorInfoTwoObj.amountHomeTu           =       Number(edit_stuObj.individualSrvcChrgRange);
      $scope.tutorInfoTwoObj.amountGroupTu          =       Number(edit_stuObj.groupSrvcChargRange);


      $scope.totalSelectedSub                       =   $scope.profileSubjectIdReturned;

      $scope.selectCourse();

      // set is free
      if($scope.isFree == 1){
        $scope.tutorInfoFree.checked = true;
      }else{
        $scope.tutorInfoFree.checked = false;
      }

      // set is home
      if($scope.isHome == 1){
        $scope.tutorInfoHome.checked = true;
      }else{
        $scope.tutorInfoHome.checked = false;
      }

      // set is Group
      if($scope.isGroup == 1){
        $scope.tutorInfoGroup.checked = true;
      }else{
        $scope.tutorInfoGroup.checked = false;
      }

    }


    $scope.setFreeCharge = function(){
      if($scope.tutorInfoFree.checked == true){
        $scope.isFree   =   1;
      }else{
        $scope.isFree   =   0;
      }
    };

    $scope.setHomeCharge = function(){
      if($scope.tutorInfoHome.checked == true){
        $scope.isHome   =   1;
      }else{
        $scope.isHome   =   0;
      }
    };

    $scope.setGroupCharge = function(){
      if($scope.tutorInfoGroup.checked == true){
        $scope.isGroup   =   1;
      }else{
        $scope.isGroup   =   0;
      }
    };


    $scope.postTutorInfo = function(){

      if($scope.editMode == false) {

        console.log("in create");

        $scope.tutorFinalInfo = {
          "firstName": tutor_info_first_retrieved.firstName,
          "courseId": tutor_info_first_retrieved.courseId,
          "universityId": tutor_info_first_retrieved.universityId,
          "passingYear": tutor_info_first_retrieved.passingYear,
          "specializedCourses": [$scope.model.id],
          "specializedSubjects": $scope.totalSelectedSub,
          "individualSrvc": $scope.isHome,
          "groupSrvc": $scope.isGroup,
          "individualSrvcChrgRange": $scope.tutorInfoTwoObj.amountHomeTu,
          "groupSrvcChargRange": $scope.tutorInfoTwoObj.amountGroupTu,
          "gender": tutor_info_first_retrieved.gender,
          "freeTrial": $scope.isFree,
          "idProofType": tutor_info_first_retrieved.idProofType,
          "idProofValue": tutor_info_first_retrieved.idProofValue,
          "dateOfBirth": tutor_info_first_retrieved.dateOfBirth,
          "supportingAreaCodeIds": [1]

        };

        if ($scope.model.id == undefined) {
          ShowMessageAlert.showMessage("Please select specilized course ");
        } else if ($scope.totalSelectedSub.length == 0) {
          ShowMessageAlert.showMessage("Please select subject");
        } else {

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
      }else{

        console.log("in update");

        $scope.tutorFinalInfo = {
          "firstName": tutor_info_first_retrieved.firstName,
          "courseId": tutor_info_first_retrieved.courseId,
          "universityId": tutor_info_first_retrieved.universityId,
          "passingYear": tutor_info_first_retrieved.passingYear,
          "specializedCourses": [$scope.model.id],
          "specializedSubjects": $scope.totalSelectedSub,
          "individualSrvc": $scope.isHome,
          "groupSrvc": $scope.isGroup,
          "individualSrvcChrgRange": $scope.tutorInfoTwoObj.amountHomeTu,
          "groupSrvcChargRange": $scope.tutorInfoTwoObj.amountGroupTu,
          "gender": tutor_info_first_retrieved.gender,
          "freeTrial": $scope.isFree,
          "idProofType": tutor_info_first_retrieved.idProofType,
          "idProofValue": tutor_info_first_retrieved.idProofValue,
          "dateOfBirth": tutor_info_first_retrieved.dateOfBirth,
          "supportingAreaCodeIds": [1],
          "profilePicIds": $scope.profilePicIdReturned,
          "id":edit_stuObj.id

        };

        window.localStorage.setItem("TUTO_UPDATE_INFO_OBJ", JSON.stringify($scope.tutorFinalInfo));

        $state.go('app.tutorAddress');
      }

    };

    // Select Subjects modal
    $ionicModal.fromTemplateUrl('templates/model/selectSubjects.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(comment) {
      $scope.selectSubjectModel = comment;
    });

    $scope.openSubjectsModal  = function(){

      if($scope.subjectData == undefined){
        ShowMessageAlert.showMessage("Select course first");
      }else{
        $scope.selectSubjectModel.show();
      }
    };

    $scope.closeSubjectsModal  = function(){
      $scope.selectSubjectModel.hide();
    };



    $scope.selectSubjectCheckbox = function(item, index){
      if($scope.isSubChecked.checked[index] == true){
        $scope.totalSelectedSub.push(item.id);
        $scope.totalSelectedSubName.push(item.name);
      }else{
        var index = $scope.totalSelectedSub.indexOf(item.id);
        $scope.totalSelectedSub.splice(index, 1);
        $scope.totalSelectedSubName.splice(index, 1);
      }
    };

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

    var edit_stuObj     = JSON.parse(window.localStorage.getItem('SELECTED_PROFILE'));

    $scope.instAddress          = {};

    $scope.inst_profile_id      = "";
    $scope.inst_profile_type    = "";

    $scope.inststate_model      = {};
    $scope.instcity_model       = {};
    $scope.instarea_model       = {};
    $scope.isEditMode           =   false;


    $scope.changeEditMode       =   function(){

      $scope.isEditMode         =   false;

    }


    $scope.getUserAddress = function(){

      LoadingScreen.show();

      HTTP.get_request("user/address/retrieve/profile?profileId="+edit_stuObj.id+"&profileType=TUTOR", login_data.access_token).success(function (response) {

        LoadingScreen.hide();

        if(response != null || response != undefined){

          if(response.errorCode == 191){
            ShowMessageAlert.showMessage("address not found for this user");
          }else{

            $scope.isEditMode                   =   true;
            $scope.inststate_model.id           =   response.items[0].state.id;
            $scope.inststate_model.name         =   response.items[0].state.name;
            $scope.instcity_model.id            =   response.items[0].city.id;
            $scope.instcity_model.name          =   response.items[0].city.name;
            $scope.instarea_model.id            =   response.items[0].area.id;
            $scope.instarea_model.name          =   response.items[0].area.name;
            $scope.instAddress.address_txt      =   response.items[0].addressLine;

            window.localStorage.setItem("TUTO_ADDRESS_RES", JSON.stringify(response));

            $scope.selectState(null);

          }
        }


      }).error(function (error, status) {

        LoadingScreen.hide();
        //alert(JSON.stringify(error));
      });

    };

    if(edit_stuObj != null && edit_stuObj!= undefined){

      $scope.editMode   =   true;

      $scope.stuUpdateObjReturned = JSON.parse(window.localStorage.getItem("TUTO_UPDATE_INFO_OBJ"));

      $scope.getUserAddress();

    }


    $scope.updateStuAddress = function(addObj){
      console.log(addObj);

      var id = "";

      if (edit_stuObj == null || edit_stuObj == undefined) {

        id  = addObj.id;

        $scope.data_final_info = {
          "profileId": addObj.profileId,
          "profileType": addObj.profileType,
          "addressLine": addObj.addressLine,
          "locality": addObj.locality,
          "areaId": addObj.area.id
        }
      }else{

        id  = addObj.items[0].id;
        $scope.data_final_info = {
          "profileId": addObj.items[0].profileId,
          "profileType": addObj.items[0].profileType,
          "addressLine":  $scope.instAddress.address_txt,
          "locality":  $scope.instAddress.address_txt,
          "areaId": $scope.instarea_model.id
        }

      }

      LoadingScreen.show();
      HTTP.put_data("user/address/update/"+id, $scope.data_final_info, login_data.access_token).success(function (response) {
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

          $state.go('app.tutorProfilePic');

          console.log(response);
          // alert("Student  address information successfully update");
        }

      }).error(function (error, status) {
        LoadingScreen.hide();
      });

    }

    $scope.postStudentAddressInfo = function(){

      $scope.returned_instData =  JSON.parse(window.localStorage.getItem("TUTER_INFO_RES"));

      console.log($scope.returned_instData);


      if($scope.instarea_model.id == undefined){
        ShowMessageAlert.showMessage("Please select address");
      }else if($scope.instAddress.address_txt == undefined ||$scope.instAddress.address_txt.trim() == ""){
        ShowMessageAlert.showMessage("Please address locality");
      }else {
        if (edit_stuObj == null || edit_stuObj == undefined) {

          $scope.data_address_info = {
            "profileId":$scope.returned_instData.id,
            "profileType":$scope.returned_instData.userType,
            "addressLine":$scope.instAddress.address_txt,
            "locality":$scope.instAddress.address_txt,
            "areaId":$scope.instarea_model.id
          };

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
              $scope.updateStuAddress($scope.resposeAddData);
              window.localStorage.setItem("TUTER_ADD_RES", JSON.stringify($scope.resposeAddData));
              $scope.instAddress = {};
              $scope.inststate_model = {};
              $scope.instcity_model = {};
              $scope.instarea_model = {};
            }

          }).error(function (error, status) {
            LoadingScreen.hide();
          });
        }else{
          var obj = JSON.parse(window.localStorage.getItem("TUTO_ADDRESS_RES"));
          $scope.updateStuAddress(obj);
        }
      }
    };


    $scope.selectState      = function(origin){
      LoadingScreen.show();
      HTTP.get_request("superadmin/city/retrieve/state/"+$scope.inststate_model.id, login_data.access_token).success(function (response) {
        LoadingScreen.hide();
        $scope.cityData = response.items;

        if(origin == "SELECTION"){
          $scope.areaData = null;
        }else{
          if($scope.instcity_model.id != null){
            $scope.selectCity();
          }
        }


      }).error(function (error, status) {
        LoadingScreen.hide();
        alert(JSON.stringify(error));
      });

    };


    $scope.selectCity = function() {

      if ($scope.instcity_model.id != null) {
        LoadingScreen.show();
        HTTP.get_request("superadmin/area/retrieve/city/" + $scope.instcity_model.id, login_data.access_token).success(function (response) {
          LoadingScreen.hide();
          if (response.errorCode == 191) {
            ShowMessageAlert.showMessage('Area not found for this location');
          } else {
            $scope.areaData = response.items;
          }

        }).error(function (error, status) {
          LoadingScreen.hide();
         // alert(JSON.stringify(error));
          console.log(error);
        });
      }

    }

    $scope.selectArea = function(){
    };

    $scope.next = function () {
      $scope.postStudentAddressInfo();
    };

  })


  .controller('tutorProfilePicCtrl', function($scope, $stateParams,$state,$ionicHistory, LoadingScreen, HTTP, ShowMessageAlert, $cordovaCamera) {
    $scope.goBackFunction   =   function(){
      $ionicHistory.goBack();
    };

    var login_data          =  JSON.parse(window.localStorage.getItem('userData'));
    var edit_stuObj         = JSON.parse(window.localStorage.getItem('SELECTED_PROFILE'));
    $scope.stu_data_obj     = JSON.parse(window.localStorage.getItem("TUTER_INFO_RES"));
    // Get image from camera
    $scope.profile          = {};
    $scope.picsCaptured     = [];
    $scope.selected_picture = "";

    if(edit_stuObj != null && edit_stuObj!= undefined){
      $scope.editMode   =   true;
      $scope.tutUpdateObjReturned = JSON.parse(window.localStorage.getItem("TUTO_UPDATE_INFO_OBJ"));
    }

    $scope.selectProfilePicture = function(index){
      $scope.selected_picture = $scope.picsCaptured[index];
      $scope.profile.imgURL   = $scope.selected_picture;
      $scope.postImageAsProfile();
    };

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
            ShowMessageAlert.showMessage("This piture is already choosen by you. Select different picture");
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

    };

    $scope.postImageAsProfile = function () {
      var url = 'user/profile/pic/upload';
      var params = {
        "profileName": $scope.stu_data_obj.profileName,
        "profileType": $scope.stu_data_obj.userType,
        "isProfilePic": "1"
      };

      HTTP.uploadUsingDevice(url, $scope.profile.imgURL, params, login_data.access_token, "STUDENT");

    };


    $scope.submitProfile = function(){

      var stuid = "";

      if($scope.tutUpdateObjReturned == null || $scope.tutUpdateObjReturned == undefined) {

        var id = "";

        $scope.stu_PROF_obj = JSON.parse(window.localStorage.getItem("TUTER_PROF_RES"));
        //$scope.stu_objImageInfo = JSON.parse($scope.stu_PROF_obj.response);

        if($scope.stu_PROF_obj != null )
        {
          $scope.stu_objImageInfo = JSON.parse($scope.stu_PROF_obj.response);
          id    =   $scope.stu_objImageInfo.id;
        }

        stuid = $scope.stu_data_obj.id;

        $scope.data_final_info = {

          // real info
          "firstName": $scope.stu_data_obj.firstName,
          "courseId": $scope.stu_data_obj.courses.id,
          "universityId": $scope.stu_data_obj.univeristyList.id,
          "passingYear": $scope.stu_data_obj.passingYear,
          "specializedCourses": $scope.stu_data_obj.specializedCourses,
          "specializedSubjects": $scope.stu_data_obj.specializedSubjects,
          "individualSrvc": $scope.stu_data_obj.individualSrvc,
          "groupSrvc": $scope.stu_data_obj.groupSrvc,
          "individualSrvcChrgRange": $scope.stu_data_obj.individualSrvcChrgRange,
          "groupSrvcChargRange": $scope.stu_data_obj.groupSrvcChargRange,
          "gender": $scope.stu_data_obj.gender,
          "freeTrial": $scope.stu_data_obj.freeTrial,
          "idProofType": $scope.stu_data_obj.idProofType,
          "idProofValue": $scope.stu_data_obj.idProofValue,
          "dateOfBirth": $scope.stu_data_obj.dateOfBirth,
          "supportingAreaCodeIds": [1],
          "profilePicIds": [id]

        };
      }else{

        stuid = $scope.tutUpdateObjReturned.id;
        $scope.data_final_info = {
          "firstName": $scope.tutUpdateObjReturned.firstName,
          "courseId": $scope.tutUpdateObjReturned.courseId,
          "universityId": $scope.tutUpdateObjReturned.universityId,
          "passingYear": $scope.tutUpdateObjReturned.passingYear,
          "specializedCourses": $scope.tutUpdateObjReturned.specializedCourses,
          "specializedSubjects": $scope.tutUpdateObjReturned.specializedSubjects,
          "individualSrvc": $scope.tutUpdateObjReturned.individualSrvc,
          "groupSrvc": $scope.tutUpdateObjReturned.groupSrvc,
          "individualSrvcChrgRange": $scope.tutUpdateObjReturned.individualSrvcChrgRange,
          "groupSrvcChargRange": $scope.tutUpdateObjReturned.groupSrvcChargRange,
          "gender": $scope.tutUpdateObjReturned.gender,
          "freeTrial": $scope.tutUpdateObjReturned.freeTrial,
          "idProofType": $scope.tutUpdateObjReturned.idProofType,
          "idProofValue": $scope.tutUpdateObjReturned.idProofValue,
          "dateOfBirth": $scope.tutUpdateObjReturned.dateOfBirth,
          "supportingAreaCodeIds": [1],
          "profilePicIds": $scope.tutUpdateObjReturned.profilePicIds
        }

      }

      /* if($scope.stu_info.name != undefined){*/
      LoadingScreen.show();
      HTTP.put_data("user/tutor/profile/update/"+stuid, $scope.data_final_info, login_data.access_token).success(function (response) {
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
          window.localStorage.removeItem('SELECTED_PROFILE');
          window.localStorage.removeItem("TUTOR_INFO_FIRST");
          $scope.stu_data_obj = {};
          $scope.profile = {};
        }

      }).error(function (error, status) {
        LoadingScreen.hide();
      });

    }
  });

