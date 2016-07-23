angular.module('starter.mainPageControllers', ['ionic','ionic.closePopup'])
.controller('mainPageCtrl', function($scope, $stateParams, LoadingScreen, HTTP, $window, $state, $ionicScrollDelegate, $rootScope, ShowMessageAlert) {

  var login_data =  JSON.parse(window.localStorage.getItem('userData'));

  /*    $scope.scrollSmallToBottom = function() {
   $ionicScrollDelegate.$getByHandle('tab_scroll').scrollBottom();
   };*/

  var selected_menuProfileReturned = JSON.parse(window.localStorage.getItem('SELECTED_MENU_PROFILE'));

  //console.log(selected_menuProfileReturned);

  if($rootScope.rootProfileMenuData != null){
    selected_menuProfileReturned = $rootScope.rootProfileMenuData;
  }

    console.log($rootScope.rootProfileMenuData);
    console.log(selected_menuProfileReturned);

  $scope.otherTabsList  =  [];
  $scope.getHomeProfiles = function(){
    LoadingScreen.show();

    var url = "user/search/student?profileName="+selected_menuProfileReturned.profileName+"&profileType="+USER_TYPE+"&offset=0&limit=5";

    console.log(url);

    HTTP.get_request("user/search/student?profileName="+selected_menuProfileReturned.profileName+"&profileType="+USER_TYPE+"&offset=0&limit=5", login_data.access_token).success(function (response) {

      LoadingScreen.hide();

      console.log(response);

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
      ShowMessageAlert.showMessage("Something went wrong");
    });

  };


  $scope.getAllProfiles = function(){

    LoadingScreen.show();

    var login_data =  JSON.parse(window.localStorage.getItem('userData'));

    HTTP.get_request("user/profile/all", login_data.access_token).success(function (response) {

      LoadingScreen.hide();

      $scope.profiles_created_stu   = response.studentProfiles;
      window.localStorage.setItem('ALL_PROFILES', JSON.stringify(response));

      // selected_menuProfileReturned($scope.profiles_created_stu[0]);
      if($scope.profiles_created_stu != null) {
       /* if ($scope.profiles_created_stu.errorCode != undefined && $scope.profiles_created_stu.errorCode != "191") {*/

          selected_menuProfileReturned = $scope.profiles_created_stu[0];

          if (selected_menuProfileReturned.userType == "STUDENT") {
            USER_TYPE = "STUDENT";
          } else if (selected_menuProfileReturned.userType == "TUTOR") {
            USER_TYPE = "TUTOR";
          } else {
            USER_TYPE = "INSTITUTE";
          }

          $scope.getHomeProfiles();
      }

    }).error(function (error, status) {

      LoadingScreen.hide();
      //alert(JSON.stringify(error));
    });

  };


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

    console.log(tab_name);

    HTTP.get_request("user/search/student?profileName="+selected_menuProfileReturned.profileName+"&profileType="+USER_TYPE+"&tabName="+tab_name+"&offset=0&limit=5", login_data.access_token).success(function (response) {

      LoadingScreen.hide();

      console.log(response);

      var val = "";
      for( n in response)
      {
        if(n == "otherTabs"){
          $scope.otherTabsList = response[n];
        }else if(n == "limit"){
          //$scope.listHomeProfiles  = response[n];
        }else if(n == "total"){
          //$scope.listHomeProfiles  = response[n];
        }else if(n == "offset"){
          //$scope.listHomeProfiles  = response[n];
        }else{
          $scope.listHomeProfiles  = response[n];
        }

        console.log('par');
      }

      console.log($scope.listHomeProfiles);

    }).error(function (error, status) {
      LoadingScreen.hide();
      ShowMessageAlert.showMessage("Something went wrong");
    });

  };

    $scope.goHomeDetail   =   function(object){
      window.localStorage.setItem('HOME_DETAIL_OBJ', JSON.stringify(object));
      $state.go('app.mainPageDetail');
    }

  $scope.onClickTabItem = function(object, index){
    $scope.isSelected   =  index;
    $scope.selected_position = index;
    window.localStorage.setItem('SELECTED_TAB_INDEX', $scope.selected_position );
    window.localStorage.setItem('SELECTED_TAB_OBJECT', JSON.stringify(object));

    if(object != null){
      console.log(object);
      console.log(index);
      $scope.profileGetOnTabSelect(object);
    }

    // $scope.scrollSmallToBottom();
  }
})

  .controller('mainPageDetailCtrl', function($scope, $stateParams, HOST_IMAGES, LoadingScreen, HTTP, $window, $state, $ionicScrollDelegate, $rootScope, $ionicHistory) {

    $scope.goBackFunction   =   function(){
      $ionicHistory.goBack();
    };

    $scope.detailObjReturned = "";

    $scope.name     = "";
    $scope.address  = "";
    $scope.full_address  = "";

    $scope.detailObjReturned = JSON.parse(window.localStorage.getItem('HOME_DETAIL_OBJ'));
    console.log($scope.detailObjReturned);

    $scope.proImagesArray = $scope.detailObjReturned.profilePicsDet;

    if( !($scope.proImagesArray == undefined ||$scope.proImagesArray.length <= 0) ){

      $scope.pro_image = HOST_IMAGES+$scope.proImagesArray[0].fileUrl;

    }else{

      $scope.proImagesArray = $scope.detailObjReturned.profilePics;

      if(!($scope.proImagesArray == undefined ||$scope.proImagesArray.length <= 0)){
        $scope.pro_image = HOST_IMAGES+$scope.proImagesArray[0].fileUrl;
      }
    }


    if($scope.detailObjReturned.name != undefined){
      $scope.name     =   $scope.detailObjReturned.name;
    }else if($scope.detailObjReturned.body != undefined){
      $scope.name     =   $scope.detailObjReturned.body;
    }else if($scope.detailObjReturned.firstName != undefined){
      $scope.name     =   $scope.detailObjReturned.firstName;
    }


    if($scope.detailObjReturned.address != undefined){
      $scope.address        =    $scope.detailObjReturned.address.area.name+","+$scope.detailObjReturned.address.state.name;
      $scope.full_address   =    $scope.detailObjReturned.address.addressLine+","+$scope.detailObjReturned.address.area.name+","+$scope.detailObjReturned.address.city.name+","+$scope.detailObjReturned.address.state.name
    }


    $scope.ratingsObject = {
      iconOn: 'ion-ios-star', //Optional
      iconOff: 'ion-ios-star',  //Optional
      iconOnColor: 'rgb(255, 46, 102)',  //Optional
      iconOffColor: 'rgb(89, 88, 104)', //Optional
      rating: 4,  //Optional
      minRating: 0, //Optional
      readOnly:true, //Optional
      callback: function(rating) {  //Mandatory
        $scope.ratingsCallback(rating);
      }
    };

    $scope.ratingsCallback = function(rating) {
      console.log('Selected rating is : ', rating);
    };

  });
