angular.module('starter.instituteControllers', ['ionic','ionic.closePopup'])

  .controller('createInstituteProfileSec1Ctrl', function($scope, $stateParams,$state,$ionicHistory, LoadingScreen, HTTP, ShowMessageAlert) {

    $scope.goBackFunction   =   function(){
      window.localStorage.removeItem('SELECTED_PROFILE');
      window.localStorage.removeItem("INST_UPDATE_INFO_OBJ");
      $ionicHistory.goBack();
    };

    $scope.instituteObj                 = {};
    $scope.editMode                     = false;
    $scope.isEditMode                   = false;

    var login_data =  JSON.parse(window.localStorage.getItem('userData'));

    var edit_stuObj = JSON.parse(window.localStorage.getItem('SELECTED_PROFILE'));

    console.log(edit_stuObj);

    if(edit_stuObj != null && edit_stuObj!= undefined){

      $scope.isEditMode                         = true;

      $scope.profilePicIdReturned               =   [];
      $scope.editMode                           =   true;
      $scope.instituteObj.instituteName         =   edit_stuObj.name;
      $scope.instituteObj.selectedEstYear       =   edit_stuObj.establishmentYear;
      $scope.instituteObj.nameYear              =   edit_stuObj.establishmentYear;
      $scope.instituteObj.contact_numFirst      =   Number(edit_stuObj.contactNumber);
      $scope.instituteObj.contact_numSecond     =   Number(edit_stuObj.contactNumber2);
      $scope.instituteObj.email                 =   edit_stuObj.email;
      $scope.instituteObj.website               =   edit_stuObj.website;
      $scope.instituteObj.instAboutMe           =   edit_stuObj.aboutMe;

      if($scope.instituteObj.contact_numSecond == 0){
        $scope.instituteObj.contact_numSecond = null;
      }

      for(var i = 0; i < edit_stuObj.profilePics.length; i++ ){
        $scope.profilePicIdReturned.push(edit_stuObj.profilePics[i].id);
      }

    }

    $scope.changeEditMode = function(){

      $scope.isEditMode       =   false;
    }

    $scope.next = function () {

      if($scope.instituteObj.instituteName == undefined || $scope.instituteObj.instituteName == ""){

        ShowMessageAlert.showMessage("Institute name is required");
      }else if($scope.instituteObj.selectedEstYear == undefined ){

        ShowMessageAlert.showMessage("Please select the institute estabelished year");
      }else if($scope.instituteObj.contact_numFirst == undefined || $scope.instituteObj.contact_numFirst == ""){

        ShowMessageAlert.showMessage("Please enter First contact number");
      }else if($scope.instituteObj.email == undefined || $scope.instituteObj.email == ""){

        ShowMessageAlert.showMessage("Institute email is required");
      }else if($scope.instituteObj.website == undefined || $scope.instituteObj.website == ""){

        ShowMessageAlert.showMessage("Institute website is required");
      }else if($scope.instituteObj.instAboutMe == undefined || $scope.instituteObj.instAboutMe == ""){

        ShowMessageAlert.showMessage("Enter about institute");
      }else{
        //$state.go('app.InstituteAddTeacher_and_Course');


        if($scope.editMode == false) {

          console.log("not in update");

          $scope.postInstituteProfile();
        }else{

          console.log("in update");
          if($scope.instituteObj.website.startsWith("http://")){

          }else{
            $scope.instituteObj.website =  "http://"+$scope.instituteObj.website
          }

          $scope.instituteProfileObj = {
            "name":$scope.instituteObj.instituteName,
            "establishmentYear":$scope.instituteObj.selectedEstYear,
            "contactNumber":$scope.instituteObj.contact_numFirst,
            "contactNumber2":$scope.instituteObj.contact_numSecond,
            "email":$scope.instituteObj.email,
            "website":$scope.instituteObj.website,
            "aboutMe":$scope.instituteObj.instAboutMe,
            "profilePics": $scope.profilePicIdReturned,
            "active":edit_stuObj.active,
            "id":edit_stuObj.id
          };

          window.localStorage.setItem("INST_UPDATE_INFO_OBJ", JSON.stringify($scope.instituteProfileObj));
          $state.go('app.InstituteAddTeacher_and_Course');
        }
      }

      // $state.go('app.InstituteAddTeacher_and_Course');
    };

    $scope.postInstituteProfile =  function(){

      if($scope.instituteObj.website.startsWith("http://")){

      }else{
        $scope.instituteObj.website =  "http://"+$scope.instituteObj.website
      }

      $scope.instituteProfileObj = {
        "name":$scope.instituteObj.instituteName,
        "establishmentYear":$scope.instituteObj.selectedEstYear,
        "contactNumber":$scope.instituteObj.contact_numFirst,
        "contactNumber2":$scope.instituteObj.contact_numSecond,
        "email":$scope.instituteObj.email,
        "website":$scope.instituteObj.website,
        "aboutMe":$scope.instituteObj.instAboutMe,
        "active":0
      };

      LoadingScreen.show();
      HTTP.post_data("user/institute/profile/create", $scope.instituteProfileObj, login_data.access_token).success(function (response) {
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
        }else if ($scope.resposeAddData.errorCode == 53) {
          ShowMessageAlert.showMessage($scope.resposeAddData.message);
        }
        else {
          window.localStorage.setItem("INST_ADD_RES",JSON.stringify($scope.resposeAddData));
          console.log(JSON.stringify($scope.resposeAddData));
          $state.go('app.InstituteAddTeacher_and_Course');
          $scope.instituteObj = {};
        }

      }).error(function (error, status) {
        LoadingScreen.hide();
      });

    }

  })


  .controller('createInstituteProfileSec2Ctrl', function($scope, $stateParams,$state,$ionicHistory, ShowMessageAlert, HTTP, LoadingScreen) {
    $scope.goBackFunction   =   function(){
      $ionicHistory.goBack();
    };

    var login_data =  JSON.parse(window.localStorage.getItem('userData'));

    $scope.insTeacher     = {};
    $scope.modelUniv      = {};

    $scope.next = function () {

      if($scope.insTeacher.name == undefined || $scope.insTeacher.name == ""){

        ShowMessageAlert.showMessage("Please enter teacher name");
      }else if($scope.insTeacher.qualification == undefined || $scope.insTeacher.qualification == ""){
        ShowMessageAlert.showMessage("Please enter teacher qualification");
      }else if($scope.insTeacher.aboutMe == undefined || $scope.insTeacher.aboutMe == ""){
        ShowMessageAlert.showMessage("Please enter description ");
      }else if($scope.modelUniv.id == undefined){
        ShowMessageAlert.showMessage("Please select  university ");
      }else{
        $scope.postInstituteProfile();
      }
    };

    $scope.postInstituteProfile =  function(){

      $scope.instTeachProfileObj = {
        "name":$scope.insTeacher.name,
        "instituteId":"2",
        "education":$scope.insTeacher.qualification,
        "aboutTeacher":$scope.insTeacher.aboutMe,
        "universityId":$scope.modelUniv.id
      };

      LoadingScreen.show();
      HTTP.post_data("user/teacher/create", $scope.instTeachProfileObj, login_data.access_token).success(function (response) {
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
        }else if ($scope.resposeAddData.errorCode == 53) {
          ShowMessageAlert.showMessage($scope.resposeAddData.message);
        }
        else {
          window.localStorage.setItem("INSTTEACH_ADD_RES",JSON.stringify($scope.resposeAddData));
          console.log(JSON.stringify($scope.resposeAddData));
          //$state.go('app.InstituteAddTeacher_and_Course');
          $state.go('app.createInstituteProfileSec3');
          $scope.insTeacher     = {};
          $scope.modelUniv      = {};
        }
      }).error(function (error, status) {
        LoadingScreen.hide();
      });
    }
  })

  .controller('createInstituteProfileSec3Ctrl', function($scope, $stateParams,$state,$ionicHistory, HTTP, LoadingScreen, ShowMessageAlert) {
    $scope.goBackFunction   =   function(){
      $ionicHistory.goBack();
    };

    var login_data              = JSON.parse(window.localStorage.getItem('userData'));
    var edit_stuObj             = JSON.parse(window.localStorage.getItem('SELECTED_PROFILE'));
    $scope.instAddress          = {};
    $scope.inststate_model      = {};
    $scope.instcity_model       = {};
    $scope.instarea_model       = {};
    $scope.inst_profile_id      = "";
    $scope.inst_profile_type    = "";
    $scope.isEditMode           = false;
    $scope.editMode             = false;


    $scope.changeEditMode = function(){
      $scope.isEditMode           = false;
    }


    $scope.getUserAddress = function(){

      LoadingScreen.show();

      HTTP.get_request("user/address/retrieve/profile?profileId="+edit_stuObj.id+"&profileType=INSTITUTE", login_data.access_token).success(function (response) {

        LoadingScreen.hide();

        if(response != null || response != undefined){

          if(response.errorCode == 191){
            alert("address not found for this user");
          }else{
            $scope.isEditMode                   =   true;
            $scope.inststate_model.id           =   response.items[0].state.id;
            $scope.inststate_model.name         =   response.items[0].state.name;
            $scope.instcity_model.id            =   response.items[0].city.id;
            $scope.instcity_model.name          =   response.items[0].city.name;
            $scope.instarea_model.id            =   response.items[0].area.id;
            $scope.instarea_model.name          =   response.items[0].area.name;
            $scope.instAddress.address_txt      =   response.items[0].addressLine;

            window.localStorage.setItem("INST_ADDRESS_RES", JSON.stringify(response));

            $state.selectState(null);

          }
        }

      }).error(function (error, status) {

        LoadingScreen.hide();
        //alert(JSON.stringify(error));
      });

    };


    if(edit_stuObj != null && edit_stuObj!= undefined){

      $scope.editMode   =   true;

      $scope.instUpdateObjReturned = JSON.parse(window.localStorage.getItem("INST_UPDATE_INFO_OBJ"));

      console.log("in address");

      $scope.getUserAddress();

    }

    $scope.postStudentAddressInfo = function(){

      $scope.returned_instData =  JSON.parse(window.localStorage.getItem("INST_ADD_RES"));

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

              window.localStorage.setItem("INST_ADDRESS_RES", JSON.stringify($scope.resposeAddData));

              $scope.updateStuAddress($scope.resposeAddData);
              $scope.instAddress = {};
              $scope.inststate_model = {};
              $scope.instcity_model = {};
              $scope.instarea_model = {};
            }

          }).error(function (error, status) {
            LoadingScreen.hide();
          });
        }else{
         // $state.go('app.createInstituteProfileSec4');

          var obj = JSON.parse(window.localStorage.getItem("INST_ADDRESS_RES"));

          $scope.updateStuAddress(obj);
        }
      }

    };

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
          "addressLine": $scope.instAddress.address_txt,
          "locality": $scope.instAddress.address_txt,
          "areaId": $scope.instarea_model.id
        }

      }

      console.log($scope.data_final_info);

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

          $state.go('app.createInstituteProfileSec4');
          // alert("Student  address information successfully update");
        }

      }).error(function (error, status) {
        LoadingScreen.hide();
      });

    }

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
          //alert(JSON.stringify(error));
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

  .controller('createInstituteProfileSec4Ctrl', function($scope, $stateParams,$state,$ionicHistory, HTTP, LoadingScreen, $cordovaCamera,ShowMessageAlert ) {
    $scope.goBackFunction   =   function(){
      $ionicHistory.goBack();
    };

    var login_data                =  JSON.parse(window.localStorage.getItem('userData'));
    $scope.stu_data_obj           = JSON.parse(window.localStorage.getItem("INST_ADD_RES"));

   // $scope.stuUpdateObjReturned   = JSON.parse(window.localStorage.getItem("STU_UPDATE_INFO_OBJ"));

    var edit_stuObj = JSON.parse(window.localStorage.getItem('SELECTED_PROFILE'));

    // Get image from camera
    $scope.profile            = {};
    $scope.picsCaptured       = [];
    $scope.selected_picture   = "";
    $scope.editMode           = false;

    $scope.isPicUpdate        = false;

    if(edit_stuObj != null && edit_stuObj!= undefined){
      $scope.editMode   =   true;
      $scope.stuUpdateObjReturned = JSON.parse(window.localStorage.getItem("INST_UPDATE_INFO_OBJ"));
    }

    $scope.selectProfilePicture = function(index){
      $scope.selected_picture = $scope.picsCaptured[index];
      $scope.profile.imgURL   = $scope.selected_picture;
      $scope.postImageAsProfile();
    };


    $scope.GetImageFromCamera = function () {

      console.log($scope.stu_data_obj);
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
        "isProfilePic": "0"
      };

      HTTP.uploadUsingDevice(url, $scope.profile.imgURL, params, login_data.access_token, "INSTITUTE");

      $scope.isPicUpdate = true;

    };


    $scope.postImageAsProfile = function () {

      console.log($scope.stu_data_obj.userType);

      var url = 'user/profile/pic/upload';
      var params = {
        "profileName": $scope.stu_data_obj.profileName,
        "profileType": $scope.stu_data_obj.userType,
        "isProfilePic": "1"
      };

      HTTP.uploadUsingDevice(url, $scope.profile.imgURL, params, login_data.access_token, "INSTITUTE");

      $scope.isPicUpdate = true;

    };


    $scope.submitProfile = function(){

      var instid = "";

      if($scope.stuUpdateObjReturned == null || $scope.stuUpdateObjReturned == undefined) {
        $scope.stu_PROF_obj = JSON.parse(window.localStorage.getItem("INS_PROF_RES"));

        instid = $scope.stu_data_obj.id;

        var id = "";

        if($scope.stu_PROF_obj != null )
        {
          $scope.stu_objImageInfo = JSON.parse($scope.stu_PROF_obj.response);
          id    =   $scope.stu_objImageInfo.id;
        }

        $scope.data_final_info = {
          "name": $scope.stu_data_obj.name,
          "establishmentYear": $scope.stu_data_obj.establishmentYear,
          "contactNumber": $scope.stu_data_obj.contactNumber,
          "contactNumber2": "",
          "email": $scope.stu_data_obj.email,
          "website": $scope.stu_data_obj.website,
          "active": $scope.stu_data_obj.active,
          "aboutMe": $scope.stu_data_obj.aboutMe,
          "profilePicIds": [id]
        };

      }else{

        if($scope.isPicUpdate == true){
          $scope.stu_PROF_obj = JSON.parse(window.localStorage.getItem("INS_PROF_RES"));

          var id = "";

          if($scope.stu_PROF_obj != null )
          {
            $scope.stu_objImageInfo = JSON.parse($scope.stu_PROF_obj.response);
            id    =   $scope.stu_objImageInfo.id;

            id = [id];
          }
        }else{
          id  =  $scope.stuUpdateObjReturned.profilePics;
        }

        instid = $scope.stuUpdateObjReturned.id;

        $scope.data_final_info = {
          "name": $scope.stuUpdateObjReturned.name,
          "establishmentYear": $scope.stuUpdateObjReturned.establishmentYear,
          "contactNumber": $scope.stuUpdateObjReturned.contactNumber,
          "contactNumber2": $scope.stuUpdateObjReturned.contactNumber2,
          "email": $scope.stuUpdateObjReturned.email,
          "website": $scope.stuUpdateObjReturned.website,
          "active": $scope.stuUpdateObjReturned.active,
          "aboutMe": $scope.stuUpdateObjReturned.aboutMe,
          "profilePicIds": id
        };

      }
      /* if($scope.stu_info.name != undefined){*/
      LoadingScreen.show();
      HTTP.put_data("user/institute/profile/update/"+instid, $scope.data_final_info, login_data.access_token).success(function (response) {
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
          // alert("Student  address information successfully update");
          window.localStorage.setItem('IS_PROFILE_CREATED',"true");
          $state.go('app.AddProfile');
          window.localStorage.setItem("INST_ADD_RES",JSON.stringify($scope.resposeAddData));

          window.localStorage.removeItem('SELECTED_PROFILE');
          window.localStorage.removeItem("INST_UPDATE_INFO_OBJ");
        }

      }).error(function (error, status) {
        LoadingScreen.hide();
      });

    }

  })
  .controller('InstituteAddTeacher_and_CourseCtrl', function($scope, $stateParams,$state,$ionicHistory, LoadingScreen, HTTP) {
    $scope.goBackFunction   =   function(){
      $ionicHistory.goBack();
    };

    var login_data =  JSON.parse(window.localStorage.getItem('userData'));

    var instituteData = JSON.parse(window.localStorage.getItem("INST_ADD_RES"));

    console.log(instituteData);

    $scope.listInstituteCourses = [];



      $scope.getAllInstituteCourses = function () {

        if(instituteData != null) {
          LoadingScreen.show();

          HTTP.get_request("user/course/institute/retrieve?instituteId=" + instituteData.id, login_data.access_token).success(function (response) {

            LoadingScreen.hide();
            $scope.listInstituteCourses = response.items;

            console.log(response);

          }).error(function (error, status) {

            LoadingScreen.hide();
            //alert(JSON.stringify(error));
          });
        }

      };


    $scope.getAllInstituteCourses();

    $scope.teacher = function () {
      $state.go('app.createInstituteProfileSec2');
    };

    $scope.addCourse= function(){
      $state.go('app.AddCourse');
    };

    $scope.submit = function(){
      $state.go('app.createInstituteProfileSec3');
    }
  })

.controller('AddCourseCtrl', function($scope, $stateParams,$state,$ionicHistory, LoadingScreen, HTTP, ShowMessageAlert) {
  $scope.goBackFunction   =   function(){
    $ionicHistory.goBack();
  };

  var login_data =  JSON.parse(window.localStorage.getItem('userData'));

  $scope.addCourseDetails = {};

  $scope.next = function () {

    if($scope.addCourseDetails.courseName == undefined || $scope.addCourseDetails.courseName == ""){

    }else if($scope.addCourseDetails.duration == undefined){

    }else if($scope.addCourseDetails.totalSeat == undefined || $scope.addCourseDetails.totalSeat == ""){

    }else if($scope.addCourseDetails.courseFee == undefined || $scope.addCourseDetails.courseFee == ""){

    }else if($scope.addCourseDetails.timeSlot == undefined || $scope.addCourseDetails.timeSlot == ""){

    }else if($scope.addCourseDetails.aboutMe == undefined || $scope.addCourseDetails.aboutMe == ""){

    }else{

      $scope.postAddCourse();

    }
  };


  $scope.postAddCourse =  function(){

    $scope.returned_instData =  JSON.parse(window.localStorage.getItem("INST_ADD_RES"));

    $scope.addCourseObj = {

      "name":$scope.addCourseDetails.courseName,
      "instituteId":$scope.returned_instData.id,
      "duration":$scope.addCourseDetails.duration,
      "totalSeat":$scope.addCourseDetails.totalSeat,
      "weekendBatch":"0",
      "description":$scope.addCourseDetails.aboutMe,
      "courseFees":$scope.addCourseDetails.courseFee

    };

    LoadingScreen.show();
    HTTP.post_data("user/course/create", $scope.addCourseObj, login_data.access_token).success(function (response) {
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
      }else if ($scope.resposeAddData.errorCode == 53) {
        ShowMessageAlert.showMessage($scope.resposeAddData.message);
      }
      else {
        window.localStorage.setItem("INST_COURSE",JSON.stringify($scope.resposeAddData));
        console.log(JSON.stringify($scope.resposeAddData));
       // $state.go('app.createInstituteProfileSec3');
        $state.go('app.InstituteAddTeacher_and_Course');
      }

    }).error(function (error, status) {
      LoadingScreen.hide();
    });

  }

});
