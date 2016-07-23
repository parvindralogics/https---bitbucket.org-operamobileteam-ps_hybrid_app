angular.module('starter.instituteControllers', ['ionic','ionic.closePopup'])

  .controller('createInstituteProfileSec1Ctrl', function($scope, $stateParams,$state,$ionicHistory, LoadingScreen, HTTP, ShowMessageAlert) {

    $scope.goBackFunction   =   function(){
      $ionicHistory.goBack();
    };

    var login_data =  JSON.parse(window.localStorage.getItem('userData'));

    $scope.instituteObj = {};


    $scope.next = function () {

      if($scope.instituteObj.instituteName == undefined || $scope.instituteObj.instituteName == ""){

        alert("Institute name is required");
      }else if($scope.instituteObj.selectedEstYear == undefined ){

        alert("Please select the institute estabelished year");
      }else if($scope.instituteObj.contact_numFirst == undefined || $scope.instituteObj.contact_numFirst == ""){

        alert("Please enter First contact number");
      }else if($scope.instituteObj.email == undefined || $scope.instituteObj.email == ""){

        alert("Institute email is required");
      }else if($scope.instituteObj.website == undefined || $scope.instituteObj.website == ""){

        alert("Institute website is required");
      }else if($scope.instituteObj.instAboutMe == undefined || $scope.instituteObj.instAboutMe == ""){

        alert("Enter about institute");
      }else{
        //$state.go('app.InstituteAddTeacher_and_Course');
        $scope.postInstituteProfile();
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
      }

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

    $scope.insTeacher = {};
    $scope.modelUniv = {};

    $scope.next = function () {

      if($scope.insTeacher.name == undefined || $scope.insTeacher.name == ""){

        alert("Please enter teacher name");
      }else if($scope.insTeacher.qualification == undefined || $scope.insTeacher.qualification == ""){
        alert("Please enter teacher qualification");
      }else if($scope.insTeacher.aboutMe == undefined || $scope.insTeacher.aboutMe == ""){
        alert("Please enter description ");
      }else if($scope.modelUniv.id == undefined){
        alert("Please select  university ");
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
      }

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
          $scope.insTeacher = {};
          $scope.modelUniv = {};
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


    var login_data =  JSON.parse(window.localStorage.getItem('userData'));

    $scope.instAddress = {};
    $scope.inst_profile_id = "";
    $scope.inst_profile_type = "";

    $scope.postStudentAddressInfo = function(){

      $scope.returned_instData =  JSON.parse(window.localStorage.getItem("INST_ADD_RES"));

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
            $state.go('app.createInstituteProfileSec4');
            window.localStorage.setItem("INST_ADDRESS_RES", JSON.stringify($scope.resposeAddData));
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

  .controller('createInstituteProfileSec4Ctrl', function($scope, $stateParams,$state,$ionicHistory, HTTP, LoadingScreen, $cordovaCamera,ShowMessageAlert ) {
    $scope.goBackFunction   =   function(){
      $ionicHistory.goBack();
    };

    var login_data =  JSON.parse(window.localStorage.getItem('userData'));
    $scope.stu_data_obj = JSON.parse(window.localStorage.getItem("INST_ADD_RES"));
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

    }


    $scope.postImageAsProfile = function () {

      console.log($scope.stu_data_obj.userType);

      var url = 'user/profile/pic/upload';
      var params = {
        "profileName": $scope.stu_data_obj.profileName,
        "profileType": $scope.stu_data_obj.userType,
        "isProfilePic": "1"
      };

      HTTP.uploadUsingDevice(url, $scope.profile.imgURL, params, login_data.access_token, "STUDENT");

    }


    $scope.submitProfile = function(){

      $scope.stu_PROF_obj     = JSON.parse(window.localStorage.getItem("INS_PROF_RES"));
      $scope.stu_objImageInfo = JSON.parse($scope.stu_PROF_obj.response);

      $scope.data_final_info = {
        "name": $scope.stu_data_obj.name,
        "establishmentYear": $scope.stu_data_obj.establishmentYear,
        "contactNumber": $scope.stu_data_obj.contactNumber,
        "contactNumber2": "",
        "email": $scope.stu_data_obj.email,
        "website": $scope.stu_data_obj.website,
        "active": $scope.stu_data_obj.active,
        "aboutMe": $scope.stu_data_obj.aboutMe,
        "profilePicIds": [$scope.stu_objImageInfo.id]
      }
      /* if($scope.stu_info.name != undefined){*/
      LoadingScreen.show();
      HTTP.put_data("user/institute/profile/update/"+$scope.stu_data_obj.id, $scope.data_final_info, login_data.access_token).success(function (response) {
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
    $scope.getAllInstituteCourses = function(){

      LoadingScreen.show();

      HTTP.get_request("user/course/institute/retrieve?instituteId="+instituteData.id, login_data.access_token).success(function (response) {

        LoadingScreen.hide();
        $scope.listInstituteCourses = response.items;

        console.log(response);

      }).error(function (error, status) {

        LoadingScreen.hide();
        //alert(JSON.stringify(error));
      });

    }

    $scope.getAllInstituteCourses();

    $scope.teacher = function () {
      $state.go('app.createInstituteProfileSec2');
    };

    $scope.addCourse= function(){
      $state.go('app.AddCourse');
    }

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

    }

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
