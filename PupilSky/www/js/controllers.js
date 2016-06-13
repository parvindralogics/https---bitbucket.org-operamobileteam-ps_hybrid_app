angular.module('starter.controllers', ['ionic','ionic.closePopup','ngCordova'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicPopup, $rootScope,$state) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
        $rootScope.GetUserAddress();


    var login_data =  JSON.parse(window.localStorage.getItem('userData'));

    $scope.name = login_data.users.firstName;

  $rootScope.profileCreate = false;

/*  $rootScope.submitProfile = function(){
      $rootScope.profileCreate = true;
      $state.go("app.AddProfile");
  };*/

   $rootScope.update = function(){
       $state.go("app.AddProfile");
   };


  $rootScope.myProfileData={
      "1":"1",
      "2":"2",
      "3":"3",
      "4":"4"
  };


   $rootScope.MyProfile = function(){
     $state.go('app.MyProfile');
   };

  // Form data for the login model
  $scope.loginData = {};

  // Create the login model that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login model to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login model
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

        $ionicModal.fromTemplateUrl('templates/TermsConditionPopup.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.termsConditionmodal = modal;
        });

        // Triggered in the login model to close it
        $scope.termsConditionclose = function() {
            $scope.termsConditionmodal.hide();
        };

        // Open the login model
        $scope.termsConditionshow = function() {
            $scope.termsConditionmodal.show();
        };

        var alertPopup;
        $rootScope.showSettingAlert = function()
        {
            alertPopup = $ionicPopup.alert({
                templateUrl:'setting-popup.html',
                type: 'remove-back',
                buttons: [
                    {
                        text: '',
                        type: 'remove-back',
                        onTap: function (e)
                        {
                            if (window.cordova)
                            {
                                // cordova.plugins.diagnostic.switchToLocationSettings();
                            }
                        }
                    }
                ]
            });
            alertPopup.then(function(res) {
            });
        };

        $rootScope.closePopup=function()
        {
            alertPopup.close();
        };



        $scope.groups = [];
        $scope.groupitem =[{"name":"ECash Details"},{"name":"Refer and Earn"},{"name":"Redeem Points"},{"name":"Transaction History"}];

        for (var i=0; i<1; i++) {
            $scope.groups[i] = {
                name: i,
                items: [],
                show: false
            };
            for (var j=0; j<4; j++) {
                $scope.data = $scope.groupitem[j];
                $scope.groups[i].items.push($scope.data.name);
            }
        }


        $scope.onClick = function(group,indax){
            group.show = !group.show;
          if(indax == 0)
          {
              $state.go('app.ECash');
          }
          else if(indax == 1)
            {
                $state.go('app.ReferEarn');
            }
          else if(indax == 2)
          {
              $state.go('app.RedeemPoint');
          }
          else if(indax == 3)
          {
              $state.go('app.TransactionHistory');
          }
        };

        /*
         * if given group is the selected group, deselect it
         * else, select the given group
         */
        $scope.toggleGroup = function(group) {
            group.show = !group.show;
           /* $rootScope.groupShow = group;
            alert(JSON.stringify(group));*/
        };
        $scope.isGroupShown = function(group) {
            return group.show;
        };

      /*  $rootScope.closeGroup = function(){

            $rootScope.groupShow = false;
        }*/

})



.controller('PlaylistCtrl', function($scope, $stateParams) {
})

  .controller('mainPageCtrl', function($scope, $stateParams) {


  })
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

      console.log($scope.teacherInfo.teachName+"  "+$scope.teacherInfo.teacDOB+"  "+$scope.teacherInfo.gender
      +"  "+$scope.model.id+"  "+$scope.modelUniv.id+"  "+$scope.teacherInfo.teacIdentityValue+"  "+$scope.teacherInfo.teacIdentityType
      +"  "+$scope.teacherInfo.teacPasYear);

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


    $scope.selectCourse = function(){

      LoadingScreen.show();

      HTTP.get_request("superadmin/subjects/retrieve/course/"+tutor_info_first_retrieved.courseId, login_data.access_token).success(function (response) {

        LoadingScreen.hide();
        $scope.subjectData = response.items;

      }).error(function (error, status) {
        LoadingScreen.hide();
        //alert(JSON.stringify(error));
      });

    }

    $scope.selectCourse();

    $scope.postTutorInfo = function(){


      $scope.tutorFinalInfo =  {
        "firstName":tutor_info_first_retrieved.firstName,
        "courseId":tutor_info_first_retrieved.courseId,
        "universityId":tutor_info_first_retrieved.universityId,
        "passingYear":tutor_info_first_retrieved.passingYear,
        "specializedCourses":$scope.totalSelectedCourses,
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
      console.log(JSON.stringify($scope.tutorFinalInfo));

/*      if(($scope.totalSelectedCourses == undefined) || ($scope.totalSelectedSub == undefined)){
        LoadingScreen.hide();
        if(($scope.tutorInfoTwoObj.amountHomeTu == undefined) && ($scope.tutorInfoTwoObj.amountGroupTu == undefined)){
          LoadingScreen.hide();*/
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
            }else if ($scope.resposeData.errorCode == 46) {
              ShowMessageAlert.showMessage($scope.resposeData.message);
            }else if($scope.resposeData.errorCode != undefined){
              ShowMessageAlert.showMessage($scope.resposeData.message);
            }
            else {
              $state.go('app.tutorProfilePic');
               window.localStorage.setItem("TUTER_INFO_RES",JSON.stringify($scope.resposeData));
            }

          }).error(function (error, status) {
            LoadingScreen.hide();
          });
/*
        }else{
          LoadingScreen.hide();
          alert("Your fee information is required");
        }

      }else{
        LoadingScreen.hide();
        alert("Subject and course information required");
      }*/

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


    // Select Courses Model

    $ionicModal.fromTemplateUrl('templates/model/selectCourses.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(comment) {
      $scope.selectCoursesModel = comment;
    });

    $scope.openCoursesModal  = function(){
        $scope.selectCoursesModel.show();
    }

    $scope.closeCoursesModal  = function(){
      $scope.selectCoursesModel.hide();
    }

    //Courses selection logic

    $scope.totalSelectedCourses = [];
    $scope.totalSelectedCourseName = [];
    $scope.isCourseChecked = {};

    $scope.selectCoursesCheckbox = function(item, index){
      if($scope.isCourseChecked.checked[index] == true){
        $scope.totalSelectedCourses.push(item.id);
        $scope.totalSelectedCourseName.push(item.name);
      }else{
        var index = $scope.totalSelectedCourses.indexOf(item.id);
        $scope.totalSelectedCourses.splice(index, 1);
        $scope.totalSelectedCourseName.splice(index, 1);
      }

    }

    $scope.cancelCoursesSelection = function(){
      $scope.totalSelectedCourses = [];
      $scope.totalSelectedCourseName = [];
      $scope.isCourseChecked= {};
      $scope.selectCoursesModel.hide();
    }

  })
  .controller('tutorProfilePicCtrl', function($scope, $stateParams,$state,$ionicHistory) {
        $scope.goBackFunction   =   function(){
            $ionicHistory.goBack();
        };

  })
  .controller('createStudentProfileSection1Ctrl', function($scope, $ionicHistory, $stateParams,$state, HTTP, LoadingScreen, ShowMessageAlert, $ionicModal, $rootScope) {

    $scope.stu_info = {};

        $scope.goBackFunction   =   function(){
            $ionicHistory.goBack();
        };

    var login_data =  JSON.parse(window.localStorage.getItem('userData'));


    $scope.postStudentProfileInfo = function(){

      $scope.data_profile_info = {
        "firstName":$scope.stu_info.name,
        "courseId":$scope.model.id,
        "subjectIds":$scope.totalSelectedSub,
        "hobbiesIds" :[$scope.hob_model.id],
        "aboutMe":$scope.stu_info.about_me_txt
      }

      if($scope.stu_info.name != undefined){

        HTTP.post_data("user/student/profile/create", $scope.data_profile_info, login_data.access_token).success(function (response) {
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
          }
          else {
            $state.go('app.createStudentProfileSection2');
            console.log(JSON.stringify($scope.resposeData));
            window.localStorage.setItem("STU_INFO_RES",JSON.stringify($scope.resposeData));
          }

        }).error(function (error, status) {
          LoadingScreen.hide();
        });

      }else{
        alert('Please enter your name');
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

    $scope.sub_model = {};
    $scope.selectSubject = function(){
      //alert($scope.sub_model.id);
    }
    $scope.hob_model = {};
    $scope.selectHobbies = function(){
      //alert($scope.hob_model.id);
    }


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

  .controller('createStudentProfileSection2Ctrl', function($scope, $stateParams,$state,$ionicHistory, HTTP, LoadingScreen, ShowMessageAlert) {

        $scope.goBackFunction   =   function(){
            $ionicHistory.goBack();
        };

        var login_data =  JSON.parse(window.localStorage.getItem('userData'));



    $scope.studAddress = {};

    $scope.profile_id = "";
    $scope.profile_type = "";

    $scope.postStudentAddressInfo = function(){

      $scope.stu_data_obj = JSON.parse(window.localStorage.getItem("STU_INFO_RES"));

      $scope.data_address_info = {
        "profileId":$scope.stu_data_obj.id,
        "profileType":$scope.stu_data_obj.userType,
        "addressLine":$scope.studAddress.address_txt,
        "locality":"Tilak Nagar",
        "areaId":$scope.area_model.id
      }

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
            $state.go('app.createStudentProfileSection3');
            window.localStorage.setItem("STU_ADD_RES",JSON.stringify($scope.resposeAddData));
          }

        }).error(function (error, status) {
          LoadingScreen.hide();
        });
    }

        $scope.state_model  = {};
        $scope.selectState      = function(){
          LoadingScreen.show();
          HTTP.get_request("superadmin/city/retrieve/state/"+$scope.state_model.id, login_data.access_token).success(function (response) {
            LoadingScreen.hide();
            $scope.cityData = response.items;
           // alert(JSON.stringify(response));

          }).error(function (error, status) {
            LoadingScreen.hide();
            alert(JSON.stringify(error));
          });

        }

      $scope.city_model = {};
        $scope.selectCity = function(){

          HTTP.get_request("superadmin/area/retrieve/city/"+$scope.city_model.id, login_data.access_token).success(function (response) {

            if(response.errorCode == 191){
              alert('Area not found for this location');
            }else{

              $scope.areaData = response.items;
            }

            // alert(JSON.stringify(response));

          }).error(function (error, status) {

            alert(JSON.stringify(error));
          });
        }

      $scope.area_model = {};
      $scope.selectArea = function(){
       // alert($scope.area_model.id);
      }

        $scope.next = function () {
          $scope.postStudentAddressInfo();
     // $state.go('app.createStudentProfileSection3');
      };

  })
  .controller('createStudentProfileSection3Ctrl', function($scope, $cordovaCamera, $stateParams,$state,$ionicHistory, $scope, HTTP, LoadingScreen, ShowMessageAlert) {

        $scope.goBackFunction   =   function(){
            $ionicHistory.goBack();
        };

    var login_data =  JSON.parse(window.localStorage.getItem('userData'));

    // Get image from camera
    $scope.profile = {};
    $scope.GetImageFromCamera = function (page_name) {

      $scope.stu_data_obj = JSON.parse(window.localStorage.getItem("STU_INFO_RES"));
      // alertPopup.close();
      if (window.cordova) {
        var pictureSource = navigator.camera.PictureSourceType;
        var destinationType = navigator.camera.DestinationType;
        navigator.camera.getPicture(function (success) {

          $scope.profile.imgURL = success;

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
        $scope.postImage();
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

      HTTP.uploadUsingDevice(url, $scope.profile.imgURL, params, login_data.access_token);
    }


    $scope.submitProfile = function(){

      $scope.stu_data_obj = JSON.parse(window.localStorage.getItem("STU_INFO_RES"));
      $scope.stu_PROF_obj = JSON.parse(window.localStorage.getItem("STU_PROF_RES"));


      console.log(JSON.stringify($scope.stu_add_obj));

      $scope.data_final_info = {
        "firstName":$scope.stu_data_obj.firstName,
        "courseId":$scope.stu_data_obj.courses.id,
        "subjectIds":[$scope.stu_data_obj.subjectsList[0].id],
        "profileName":$scope.stu_data_obj.profileName,
        "hobbiesIds" :[$scope.stu_data_obj.hobbyList[0].id],
        "aboutMe":$scope.stu_data_obj.aboutMe,
        "profilePicIds":[$scope.stu_PROF_obj.id]
      }

      /* if($scope.stu_info.name != undefined){*/
      LoadingScreen.show();
      HTTP.put_data("user/student/profile/update/"+$scope.stu_data_obj.id, $scope.data_final_info, login_data.access_token).success(function (response) {
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
          $state.go('app.AddProfile');
          window.localStorage.setItem("STU_ADD_RES",JSON.stringify($scope.resposeAddData));
        }

      }).error(function (error, status) {
        LoadingScreen.hide();
      });

    }

  })

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
        }

      }).error(function (error, status) {
        LoadingScreen.hide();
      });

    }

  })
  .controller('createInstituteProfileSec2Ctrl', function($scope, $stateParams,$state,$ionicHistory) {
        $scope.goBackFunction   =   function(){
            $ionicHistory.goBack();
        };

    $scope.next = function () {
      $state.go('app.createInstituteProfileSec3');
    };
  })

  .controller('createInstituteProfileSec3Ctrl', function($scope, $stateParams,$state,$ionicHistory) {
        $scope.goBackFunction   =   function(){
            $ionicHistory.goBack();
        };

    $scope.next = function () {
      $state.go('app.createInstituteProfileSec4');
    };
  })

  .controller('createInstituteProfileSec4Ctrl', function($scope, $stateParams,$state,$ionicHistory) {
        $scope.goBackFunction   =   function(){
            $ionicHistory.goBack();
        };

  })
  .controller('InstituteAddTeacher_and_CourseCtrl', function($scope, $stateParams,$state,$ionicHistory) {
        $scope.goBackFunction   =   function(){
            $ionicHistory.goBack();
        };

    $scope.teacher = function () {
      $state.go('app.createInstituteProfileSec2');
    };

        $scope.addCourse= function(){
            $state.go('app.AddCourse');
        }
  })

  .controller('settingsCtrl', function($scope, $stateParams,$state, $rootScope, HTTP, $window, $ionicHistory, LoadingScreen) {

    $scope.goBackFunction   =   function(){
      $state.go("app.mainPage");
      $ionicHistory.goBack();
    };

    var login_data =  JSON.parse(window.localStorage.getItem('userData'));

        $scope.logout = function(){
          LoadingScreen.show();

            HTTP.get_request("user/profile/logout", login_data.access_token).success(function (response) {
              LoadingScreen.hide();
              $window.localStorage.clear();
              $ionicHistory.clearCache();
              $ionicHistory.clearHistory();
              $state.go('loginScreen');


            }).error(function (error, status) {
              LoadingScreen.hide();
              alert("Something went wrong");
            });

        };

  })
  .controller('ECashCtrl', function($scope, $stateParams,$state,$ionicHistory) {

       /* $scope.goBackFunction   =   function(){
            $ionicHistory.goBack();
        };*/

  })
  .controller('ReferEarnCtrl', function($scope, $stateParams,$state,$ionicHistory) {

      /*  $scope.goBackFunction   =   function(){
            $ionicHistory.goBack();
        };*/

    })
  .controller('AboutUsCtrl', function($scope, $stateParams,$state, $ionicHistory) {

    $scope.goBackFunction   =   function(){
      $state.go("app.mainPage");
      $ionicHistory.goBack();
    };

    })
    .controller('ECashOptionCtrl', function($scope, $stateParams,$state) {
       /* $scope.eCash = function () {
            $state.go('app.ECash');
        };
        $scope.referEarn = function () {
            $state.go('app.ReferEarn');
        };
        $scope.redeemPoint = function () {
            $state.go('app.RedeemPoint');
        };

        $scope.transactionHistory = function () {
            $state.go('app.TransactionHistory');
        };*/
    })

    .controller('RedeemPointCtrl', function($scope, $stateParams,$state,$ionicHistory) {

       /* $scope.goBackFunction   =   function(){
            $ionicHistory.goBack();
        };*/

        $scope.switchTab  = function(tabName){

            if(tabName  ==  'All Posts'){
                $scope.allPostsTab  = true;
                $scope.allPohots  = false;
            }
            else{
                $scope.allPostsTab  = false;
                $scope.allPohots  = true;
            }
        };
        $scope.switchTab('All Posts');
    })
    .controller('OrderListCtrl', function($scope, $stateParams,$state,$rootScope) {

    $scope.goBackFunction   =   function(){
      $state.go("app.mainPage");
      $ionicHistory.goBack();
    };


        $rootScope.listData = {
        };
        $rootScope.listData.image={
            "img" : "..img/logo.png",
            "img" : "..img/logo.png",
            "img" : "..img/logo.png",
            "img" : "..img/logo.png"
        };
        $rootScope.listData.prodName={
            "prod":"Mobile",
        "prod":"book",
        "prod":"Iphone",
        "prod":"Android Phone"
        };

        $rootScope.listData.price={
            "price":"100",
            "price":"500",
            "price":"1000",
            "price":"800"
        };

        //alert( JSON.stringify( $rootScope.listData))
    })
    .controller('notificationCtrl', function($scope, $stateParams,$state) {

    })
    .controller('getReviewCtrl', function($scope, $stateParams,$state, $ionicHistory) {

    $scope.goBackFunction   =   function(){
      $state.go("app.mainPage");
      $ionicHistory.goBack();
    };

    })
    .controller('favoriteCtrl', function($scope, $stateParams,$state, $ionicHistory) {

    $scope.goBackFunction   =   function(){
      $state.go("app.mainPage");
      $ionicHistory.goBack();
    };

    })
    .controller('contactUsCtrl', function($scope, $stateParams,$state, $ionicHistory) {

    $scope.goBackFunction   =   function(){
      $state.go("app.mainPage");
      $ionicHistory.goBack();
    };

    })
    .controller('helpCtrl', function($scope, $stateParams,$state, $ionicHistory) {
    $scope.goBackFunction   =   function(){
      $state.go("app.mainPage");
      $ionicHistory.goBack();
    };
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

      console.log($scope.returned_instData.id);

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
          $state.go('app.createInstituteProfileSec3');
        }

      }).error(function (error, status) {
        LoadingScreen.hide();
      });

    }

    })
    .controller('TransactionHistoryCtrl', function($scope, $stateParams,$state,$ionicHistory) {
        /*$scope.goBackFunction   =   function(){
            $ionicHistory.goBack();
        };*/
    })
    .controller('MyProfileCtrl', function($scope, $stateParams,$state,$ionicHistory) {
        $scope.goBackFunction   =   function(){
            $ionicHistory.goBack();
        };
    })


;
