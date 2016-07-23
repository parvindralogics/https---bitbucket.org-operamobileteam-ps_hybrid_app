angular.module('starter.controllers', ['ionic','ionic.closePopup','ngCordova'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicPopup, $rootScope,$state, HOST_IMAGES) {

    $rootScope.GetUserAddress();

    var login_data =  JSON.parse(window.localStorage.getItem('userData'));

    $scope.profiles_array         = [];

    $scope.isMenuChecked = {};

    $scope.name = login_data.users.firstName;

    $rootScope.profileCreate = false;

    $scope.selected_name = "";

    $scope.allProfileReturned     =  JSON.parse(window.localStorage.getItem('ALL_PROFILES'));

    $scope.setProfilePic =   function(object){

      $scope.menuProfilePic   = "";

      $scope.proImagesArray = object.profilePicsDet;

      if( !($scope.proImagesArray == undefined ||$scope.proImagesArray.length <= 0) ){
          $scope.menuProfilePic = HOST_IMAGES+$scope.proImagesArray[0].fileUrl;
      }else{
        $scope.proImagesArray = object.profilePics;
        if(!($scope.proImagesArray == undefined ||$scope.proImagesArray.length <= 0)){
            $scope.menuProfilePic = HOST_IMAGES+$scope.proImagesArray[0].fileUrl;
        }
      }
    }

    $scope.setupSelectedMenu =  function(object){

      $scope.isMenuChecked = {};

      var selected_menuProfileReturned = JSON.parse(window.localStorage.getItem('SELECTED_MENU_PROFILE'));

      $rootScope.rootProfileMenuData    =   selected_menuProfileReturned;

      console.log(selected_menuProfileReturned);

      if(selected_menuProfileReturned  != null){
        if(selected_menuProfileReturned.name != undefined){
          $scope.selected_name  = selected_menuProfileReturned.name;
        }else{
          $scope.selected_name  = selected_menuProfileReturned.firstName;
        }

        $scope.setProfilePic(selected_menuProfileReturned);
      }else{
        selected_menuProfileReturned    =   object;

        if(selected_menuProfileReturned.name != undefined){
          $scope.selected_name  = selected_menuProfileReturned.name;
        }else{
          $scope.selected_name  = selected_menuProfileReturned.firstName;
        }
        $scope.setProfilePic(selected_menuProfileReturned);
      }
    }

    if($scope.allProfileReturned != null){

      $rootScope.profiles_created_stu   = $scope.allProfileReturned.studentProfiles;
      $rootScope.profiles_created_inst  = $scope.allProfileReturned.instituteProfiles;
      $rootScope.profiles_created_tut   = $scope.allProfileReturned.tutorProfiles;

      window.localStorage.setItem('SELECTED_MENU_PROFILE', JSON.stringify($rootScope.profiles_created_stu[0]));

      $scope.setupSelectedMenu($rootScope.profiles_created_stu[0]);
    }


    $ionicModal.fromTemplateUrl('templates/model/changeProfile.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(comment) {
      $scope.selectMenuModel = comment;
    });

    $scope.openMenuModal  = function(){
      $scope.isMenuChecked = {};
        $scope.selectMenuModel.show();
    }

    $scope.closeMenuModal  = function(){
      $scope.selectMenuModel.hide();
    }

    $scope.selectMenuUser = function(item, index){
      console.log(item.name);
      if(item.name != undefined){
        $scope.selected_name  = item.name;
      }else{
        $scope.selected_name  = item.firstName;
      }

      window.localStorage.setItem('SELECTED_MENU_PROFILE', JSON.stringify(item));


      $scope.setupSelectedMenu(null);

      $scope.selectMenuModel.hide();
    }




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

  .controller('mainPageCtrl', function($scope, $stateParams, LoadingScreen, HTTP, $window, $state, $ionicScrollDelegate, $rootScope) {

    var login_data =  JSON.parse(window.localStorage.getItem('userData'));

/*    $scope.scrollSmallToBottom = function() {
      $ionicScrollDelegate.$getByHandle('tab_scroll').scrollBottom();
    };*/


    var selected_menuProfileReturned = JSON.parse(window.localStorage.getItem('SELECTED_MENU_PROFILE'));

    console.log(selected_menuProfileReturned);

    if($rootScope.rootProfileMenuData != null){

      selected_menuProfileReturned = $rootScope.rootProfileMenuData;
    }


    $scope.otherTabsList  =  [];
    $scope.getHomeProfiles = function(){
      LoadingScreen.show();

      HTTP.get_request("user/search/student?profileName="+selected_menuProfileReturned.profileName+"&profileType="+USER_TYPE+"&offset=0&limit=5", login_data.access_token).success(function (response) {

        LoadingScreen.hide();

        console.log(response.otherTabs.length);

        if(response.otherTabs.length > 0){

          $scope.selected_position      =  window.localStorage.getItem('SELECTED_TAB_INDEX');
          $scope.selected_position_obj  =  JSON.parse(window.localStorage.getItem('SELECTED_TAB_OBJECT'));

          console.log($scope.selected_position);
          if(($scope.selected_position != null)||($scope.selected_position != undefined)){
            $scope.isSelected   =   $scope.selected_position;

            var tab_name =  $scope.selected_position_obj;
            console.log(tab_name);
            $scope.profileGetOnTabSelect(tab_name);

          }else{
            $scope.isSelected   =   0;
            $scope.listHomeProfiles = response.events;
            $scope.otherTabsList    = response.otherTabs;
          }

        }

        console.log(response);

      }).error(function (error, status) {
        LoadingScreen.hide();
        alert("Something went wrong");
      });

    };


    $scope.getAllProfiles = function(){

      LoadingScreen.show();

      var login_data =  JSON.parse(window.localStorage.getItem('userData'));

      HTTP.get_request("user/profile/all", login_data.access_token).success(function (response) {

        LoadingScreen.hide();

        $scope.profiles_created_stu   = response.studentProfiles;
        window.localStorage.setItem('ALL_PROFILES', JSON.stringify(response));

        selected_menuProfileReturned($scope.profiles_created_stu[0]);

        if(selected_menuProfileReturned.userType == "STUDENT"){
          USER_TYPE   =   "STUDENT";
        }else if(selected_menuProfileReturned.userType == "TUTOR"){
          USER_TYPE   =   "TUTOR";
        }else{
          USER_TYPE   =   "INSTITUTE";
        }

        $scope.getHomeProfiles();

      }).error(function (error, status) {

        LoadingScreen.hide();
        //alert(JSON.stringify(error));
      });

    }




    var USER_TYPE = "";

    if(selected_menuProfileReturned != null ){

      if(selected_menuProfileReturned.userType == "STUDENT"){
        USER_TYPE   =   "STUDENT";
      }else if(selected_menuProfileReturned.userType == "TUTOR"){
        USER_TYPE   =   "TUTOR";
      }else{
        USER_TYPE   =   "INSTITUTE";
      }

      $scope.getHomeProfiles();

    }else{
      $scope.getAllProfiles();
    }



    $scope.profileGetOnTabSelect = function(tab_name){
      LoadingScreen.show();

      HTTP.get_request("user/search/student?profileName="+selected_menuProfileReturned.profileName+"&profileType="+USER_TYPE+"&tabName="+tab_name+"&offset=0&limit=5", login_data.access_token).success(function (response) {

        LoadingScreen.hide();

        $scope.listHomeProfiles = response.events;
        $scope.otherTabsList    = response.otherTabs;

      }).error(function (error, status) {
        LoadingScreen.hide();
        alert("Something went wrong");
      });

    };

    $scope.onClickTabItem = function(object, index){
      $scope.isSelected   =  index;
      $scope.selected_position = index;
      window.localStorage.setItem('SELECTED_TAB_INDEX', $scope.selected_position );
      window.localStorage.setItem('SELECTED_TAB_OBJECT', JSON.stringify(object));

      if(object != null){
        console.log(object);
        $scope.profileGetOnTabSelect(object);
      }


      console.log(index);
     // $scope.scrollSmallToBottom();
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

    .controller('TransactionHistoryCtrl', function($scope, $stateParams,$state,$ionicHistory) {
        /*$scope.goBackFunction   =   function(){
            $ionicHistory.goBack();
        };*/
    })
    .controller('MyProfileCtrl', function($scope, $stateParams,$state,$ionicHistory, HOST_IMAGES, $cordovaCamera, HTTP, ShowMessageAlert, LoadingScreen) {

        $scope.goBackFunction   =   function(){
          window.localStorage.removeItem('SELECTED_PROFILE');
          window.localStorage.removeItem("UPDATE_PROF_RES")
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
         USER_TYPE == "INSTITUTE"
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
    }

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

  });
