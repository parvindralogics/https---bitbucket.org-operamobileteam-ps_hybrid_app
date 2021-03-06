angular.module('starter.studentControllers', ['ionic','ionic.closePopup'])


  .controller('createStudentProfileSection1Ctrl', function($scope, $ionicHistory, $stateParams,$state, HTTP, LoadingScreen, ShowMessageAlert, $ionicModal, $rootScope, $timeout) {

    $scope.goBackFunction   =   function(){
      window.localStorage.removeItem('SELECTED_PROFILE');
      window.localStorage.removeItem("STU_UPDATE_INFO_OBJ");
      $ionicHistory.goBack();
    };

    $scope.stu_info                     = {};
    $scope.model                        = {};
    $scope.sub_model                    = {};
    $scope.hob_model                    = {};
    $scope.isSubChecked                 = {};
    $scope.isSubChecked.checked         = [];

    $scope.profileHobbyIdReturned       = [];
    $scope.profileSubjectIdReturned     = [];
    $scope.totalSelectedSub             = [];
    $scope.totalSelectedSubName         = [];
    $scope.profilePicIdReturned         = [];
    $scope.totalSubjectId               = [];

    $scope.editMode                     = false;


    var login_data                      =  JSON.parse(window.localStorage.getItem('userData'));

    var edit_stuObj                     = JSON.parse(window.localStorage.getItem('SELECTED_PROFILE'));

    $scope.selectCourse = function(){

      LoadingScreen.show();

      HTTP.get_request("superadmin/subjects/retrieve/course/"+$scope.model.id, login_data.access_token).success(function (response) {

        LoadingScreen.hide();
        $scope.subjectData = response.items;

        for(var i = 0; i < $scope.subjectData.length; i++){

          $scope.isSubChecked.checked[i] = false;

          $scope.totalSubjectId.push($scope.subjectData[i].id);
        }

        for (var i = 0; i < $scope.totalSelectedSub.length; i++) {

          var index =  $scope.totalSubjectId.indexOf($scope.totalSelectedSub[i]);

          if(index != -1){
            console.log(index);
            $scope.isSubChecked.checked[index] = true;
          }
        }

      }).error(function (error, status) {
        LoadingScreen.hide();
        //alert(JSON.stringify(error));
      });

    }


    if(edit_stuObj != null && edit_stuObj!= undefined){

      $scope.editMode   =   true;

      for(var i = 0; i < edit_stuObj.hobbyList.length; i++ ){
        $scope.profileHobbyIdReturned.push(edit_stuObj.hobbyList[i].id);
      }

      for(var i = 0; i < edit_stuObj.profilePics.length; i++ ){
        $scope.profilePicIdReturned.push(edit_stuObj.profilePics[i].id);
      }

      for(var i = 0; i < edit_stuObj.subjectsList.length; i++ ){
        $scope.profileSubjectIdReturned.push(edit_stuObj.subjectsList[i].id);

        $scope.totalSelectedSubName.push(edit_stuObj.subjectsList[i].name);
      }

      $scope.stu_info.name          =   edit_stuObj.firstName;
      $scope.model.id               =   edit_stuObj.courses.id;
      $scope.totalSelectedSub       =   $scope.profileSubjectIdReturned;
      $scope.hob_model.id           =   $scope.profileHobbyIdReturned[0];
      $scope.stu_info.about_me_txt  =   edit_stuObj.aboutMe;

      $scope.selectCourse();

    }

    $scope.postStudentProfileInfo = function(){

      if($scope.editMode == false) {

        $scope.data_profile_info = {
          "firstName": $scope.stu_info.name,
          "courseId": $scope.model.id,
          "subjectIds": $scope.totalSelectedSub,
          "hobbiesIds": [$scope.hob_model.id],
          "aboutMe": $scope.stu_info.about_me_txt
        }

        if ($scope.stu_info.name == undefined || $scope.stu_info.name.trim() == "") {
          ShowMessageAlert.showMessage("Please fill student name");
        } else if ($scope.model.id == undefined) {
          ShowMessageAlert.showMessage("Select course please");
        } else if ($scope.totalSelectedSub == undefined) {
          ShowMessageAlert.showMessage("Select subjects please");
        } else if ($scope.hob_model.id == undefined) {
          ShowMessageAlert.showMessage("Please select any hobby");
        } else if ($scope.stu_info.about_me_txt == undefined || $scope.stu_info.about_me_txt.trim() == "") {
          ShowMessageAlert.showMessage("Write something about student");
        } else {
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
              console.log("in create");
              console.log(JSON.stringify($scope.resposeData));
              window.localStorage.setItem("STU_INFO_RES", JSON.stringify($scope.resposeData));

              window.localStorage.setItem("STU_UPDATE_INFO_OBJ",null);
              $scope.stu_info = {};
              $scope.model = {};
            }

          }).error(function (error, status) {
            LoadingScreen.hide();
          });
        }

      }else{

        $scope.data_profile_info = {
          "firstName": $scope.stu_info.name,
          "courseId": $scope.model.id,
          "subjectIds": $scope.totalSelectedSub,
          "hobbiesIds": [$scope.hob_model.id],
          "aboutMe": $scope.stu_info.about_me_txt,
          "profilePics": $scope.profilePicIdReturned,
          "id": edit_stuObj.id,
          "profileName":edit_stuObj.profileName
        }

        window.localStorage.setItem("STU_UPDATE_INFO_OBJ", JSON.stringify($scope.data_profile_info));
        $state.go('app.createStudentProfileSection2');
      }
    }


    $scope.selectSubject = function(){
      //alert($scope.sub_model.id);
    }

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
      if(edit_stuObj != null && edit_stuObj!= undefined) {
        $scope.selectSubjectModel.hide();
      }else{
        $scope.totalSelectedSub = [];
        $scope.totalSelectedSubName = [];
        $scope.isSubChecked= {};
        $scope.selectSubjectModel.hide();
      }
    }

  })

  .controller('createStudentProfileSection2Ctrl', function($scope, $stateParams,$state,$ionicHistory, HTTP, LoadingScreen, ShowMessageAlert) {

    $scope.goBackFunction   =   function(){
      $ionicHistory.goBack();
    };

    var login_data      =   JSON.parse(window.localStorage.getItem('userData'));

    var edit_stuObj     =   JSON.parse(window.localStorage.getItem('SELECTED_PROFILE'));

    $scope.editMode     =   false;

    $scope.studAddress  = {};
    $scope.state_model  = {};
    $scope.city_model   = {};
    $scope.area_model   = {};

    $scope.profile_id   = "";
    $scope.profile_type = "";

    $scope.isEditMode   = false;



    $scope.getUserAddress = function(){

      LoadingScreen.show();

      HTTP.get_request("user/address/retrieve/profile?profileId="+edit_stuObj.id+"&profileType="+edit_stuObj.userType, login_data.access_token).success(function (response) {

        LoadingScreen.hide();

        if(response != null || response != undefined){

          if(response.errorCode == 191){
            ShowMessageAlert.showMessage("address not found for this user");
          }else{

           // $scope.isEditMode               = false;
            $scope.state_model.id           =   response.items[0].state.id;
            $scope.state_model.name         =   response.items[0].state.name;
            $scope.city_model.id            =   response.items[0].city.id;
            $scope.city_model.name          =   response.items[0].city.name;
            $scope.area_model.id            =   response.items[0].area.id;
            $scope.area_model.name          =   response.items[0].area.name;
            $scope.studAddress.address_txt  =   response.items[0].addressLine;

            window.localStorage.setItem("STU_ADDRESS_RES", JSON.stringify(response));

            $scope.selectState(null);

            console.log(response);

          }
        }


      }).error(function (error, status) {

        LoadingScreen.hide();
        //alert(JSON.stringify(error));
      });

    };

    if(edit_stuObj != null && edit_stuObj!= undefined){

      $scope.editMode   =   true;

      $scope.stuUpdateObjReturned = JSON.parse(window.localStorage.getItem("STU_UPDATE_INFO_OBJ"));

      console.log("in address");

      $scope.getUserAddress();

    }

    $scope.changeEditMode   = function(){
      $scope.isEditMode  = false;
    }

    $scope.postStudentAddressInfo = function(){

      $scope.stu_data_obj = JSON.parse(window.localStorage.getItem("STU_INFO_RES"));

        if ($scope.area_model.id == undefined) {
          ShowMessageAlert.showMessage("Please select address");
        } else if ($scope.studAddress.address_txt == undefined || $scope.studAddress.address_txt.trim() == "") {
          ShowMessageAlert.showMessage("Please address locality");
        } else {

          if(edit_stuObj == null || edit_stuObj == undefined) {

            $scope.data_address_info = {
              "profileId": $scope.stu_data_obj.id,
              "profileType": $scope.stu_data_obj.userType,
              "addressLine": $scope.studAddress.address_txt,
              "locality": $scope.studAddress.address_txt,
              "areaId": $scope.area_model.id
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
                //$state.go('app.createStudentProfileSection3');
                window.localStorage.setItem("STU_ADD_RES", JSON.stringify($scope.resposeAddData));

                $scope.updateStuAddress($scope.resposeAddData);

                $scope.city_model   = {};
                $scope.state_model  = {};
                $scope.area_model   = {};
                $scope.studAddress  = {};
              }

            }).error(function (error, status) {
              LoadingScreen.hide();
            });
          }else{
           // $state.go('app.createStudentProfileSection3');

            var obj = JSON.parse(window.localStorage.getItem("STU_ADDRESS_RES"));

            console.log(obj);

            $scope.updateStuAddress(obj);

          }

        }
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
      }else {
        id = addObj.items[0].id;

        $scope.data_final_info = {
          "profileId": addObj.items[0].profileId,
          "profileType": addObj.items[0].profileType,
          "addressLine": $scope.studAddress.address_txt,
          "locality": $scope.studAddress.address_txt,
          "areaId": $scope.area_model.id
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
          // alert("Student  address information successfully update");

          $state.go('app.createStudentProfileSection3');
        }

      }).error(function (error, status) {
        LoadingScreen.hide();
      });

    }

    $scope.selectState      = function(origin){
      LoadingScreen.show();
      HTTP.get_request("superadmin/city/retrieve/state/"+$scope.state_model.id, login_data.access_token).success(function (response) {
        LoadingScreen.hide();
        $scope.cityData = response.items;


        if(origin == "SELECTION"){
          $scope.areaData = null;
        }else{
          if($scope.city_model.id != null){
            $scope.selectCity();
          }
        }

      }).error(function (error, status) {
        LoadingScreen.hide();
        alert(JSON.stringify(error));
      });

    }

    $scope.selectCity = function(){

      if($scope.city_model.id != null){
        LoadingScreen.show();
        HTTP.get_request("superadmin/area/retrieve/city/"+$scope.city_model.id, login_data.access_token).success(function (response) {
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
    }


    $scope.selectArea = function(){
    }

    $scope.next = function () {
      $scope.postStudentAddressInfo();
    };

  })
  .controller('createStudentProfileSection3Ctrl', function($scope, $cordovaCamera, $stateParams,$state,$ionicHistory, $scope, HTTP, LoadingScreen, ShowMessageAlert) {

    $scope.goBackFunction   =   function(){
      $ionicHistory.goBack();
    };

    var login_data =  JSON.parse(window.localStorage.getItem('userData'));
    $scope.stu_data_obj = JSON.parse(window.localStorage.getItem("STU_INFO_RES"));

   // $scope.stuUpdateObjReturned = JSON.parse(window.localStorage.getItem("STU_UPDATE_INFO_OBJ"));

    var edit_stuObj = JSON.parse(window.localStorage.getItem('SELECTED_PROFILE'));

    // Get image from camera
    $scope.profile = {};
    $scope.picsCaptured = [];
    $scope.selected_picture = "";

    $scope.editMode   =   false;

    if(edit_stuObj != null && edit_stuObj!= undefined){

      $scope.editMode   =   true;
      $scope.stuUpdateObjReturned = JSON.parse(window.localStorage.getItem("STU_UPDATE_INFO_OBJ"));

    }

    $scope.selectProfilePicture = function(index){
      console.log("index is  "+ index);
      $scope.selected_picture = $scope.picsCaptured[index];
      $scope.profile.imgURL   = $scope.selected_picture;
      console.log($scope.profile.imgURL);
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
        "isProfilePic": "0"
      };

      HTTP.uploadUsingDevice(url, $scope.profile.imgURL, params, login_data.access_token, "STUDENT");

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
      var stuid = "";

      if($scope.stuUpdateObjReturned == null || $scope.stuUpdateObjReturned == undefined) {

        var id = "";

        $scope.stu_data_obj     = JSON.parse(window.localStorage.getItem("STU_INFO_RES"));
        $scope.stu_PROF_obj     = JSON.parse(window.localStorage.getItem("STU_PROF_RES"));

        if($scope.stu_PROF_obj != null )
        {
          $scope.stu_objImageInfo = JSON.parse($scope.stu_PROF_obj.response);
          id    =   $scope.stu_objImageInfo.id;
        }

        stuid = $scope.stu_data_obj.id;

        $scope.data_final_info = {
          "firstName": $scope.stu_data_obj.firstName,
          "courseId": $scope.stu_data_obj.courses.id,
          "subjectIds": [$scope.stu_data_obj.subjectsList[0].id],
          "profileName": $scope.stu_data_obj.profileName,
          "hobbiesIds": [$scope.stu_data_obj.hobbyList[0].id],
          "aboutMe": $scope.stu_data_obj.aboutMe,
          "profilePicIds": [id]
        }

      }else{

        stuid = $scope.stuUpdateObjReturned.id;

        $scope.data_final_info = {
          "firstName": $scope.stuUpdateObjReturned.firstName,
          "courseId": $scope.stuUpdateObjReturned.courseId,
          "subjectIds": $scope.stuUpdateObjReturned.subjectIds,
          "profileName": $scope.stuUpdateObjReturned.profileName,
          "hobbiesIds": $scope.stuUpdateObjReturned.hobbiesIds,
          "aboutMe": $scope.stuUpdateObjReturned.aboutMe,
          "profilePicIds": $scope.stuUpdateObjReturned.profilePics
        }

      }

      LoadingScreen.show();
      HTTP.put_data("user/student/profile/update/"+stuid, $scope.data_final_info, login_data.access_token).success(function (response) {
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
          window.localStorage.setItem("STU_ADD_RES",JSON.stringify($scope.resposeAddData));
          window.localStorage.removeItem('SELECTED_PROFILE');
          window.localStorage.removeItem("STU_UPDATE_INFO_OBJ");
          $scope.profile = {};
        }

      }).error(function (error, status) {
        LoadingScreen.hide();
      });

    }

  });

