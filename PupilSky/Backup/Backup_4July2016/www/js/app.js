// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ngCordova','starter.controllers','starter.directives','starter.services','starter.ForgotPasswordController','starter.LoginController','starter.ManageProfileController','starter.OTPController','starter.RegistrationController','starter.SlideControllers','starter.SplashController'
,'starter.instituteControllers', 'starter.studentControllers', 'starter.myProfileController', 'starter.tutorControllers','tabSlideBox' ])

    .constant('HOST',"http://ec2-52-201-214-115.compute-1.amazonaws.com:8080/educators/api/v1/user/profile/")
    .constant('HOST_BASE',"http://ec2-52-201-214-115.compute-1.amazonaws.com:8080/educators/api/v1/")
    .constant('HOST_IMAGES',"http://ec2-52-201-214-115.compute-1.amazonaws.com:8080/educators")


.run(function($ionicPlatform,$rootScope, $state, HTTP) {


/*  $rootScope.courseData = [{"course":"Class want to Teach"},{"course":"BA"},{"course":"BBA"},{"course":"BCA"}];

  $rootScope.status_post = $rootScope.courseData[0];

  $rootScope.subject =[{"subj":"math"},{"subj":"commerce"}];


    $rootScope.hobbiesData=[{"hobbies":"play cricket"},{"hobbies":"play outdoor game"},{"hobbies":"play indoor game"}]

  $rootScope.stateData = [{"state":"Choose state"},{"state":"Rajasthan"},{"state":"Delhi"},{"state":"MP"}];

  $rootScope.stateData_post = $rootScope.stateData[0];

  $rootScope.cityData = [{"city":"Choose city"},{"city":"Jaipur"},{"city":"Ajamer"},{"city":"Jodhopur"}];

  $rootScope.cityData_post = $rootScope.cityData[0];

  $rootScope.locationData = [{"location":"Choose Location"},{"location":"Jaipur"},{"location":"Ajamer"},{"location":"Jodhopur"}];

  $rootScope.locationData_post = $rootScope.locationData[0];*/


   $rootScope.fistTimeLoginFlag = false;

    $rootScope.allProfileReturned = [];

    $rootScope.profiles_created_stu   = [];
    $rootScope.profiles_created_inst  = [];
    $rootScope.profiles_created_tut   = [];

    $rootScope.rootProfileMenuData = null;

    window.localStorage.setItem('loginFlag',$rootScope.fistTimeLoginFlag);

        $rootScope.to = [{"id":"1","category":"+91"},{"id":"2","category":"+47"},{"id":"3","category":"+42"},{"id":"4","category":"+45"}];
        $rootScope.status_post = $rootScope.to[0];

        $rootScope.selectedStatusCategory = function(id){
            $rootScope.selectedStatus = id;
            //alert($rootScope.selectedStatus);
        };


        $rootScope.positionAddress='';

        $rootScope.address=[];
        $rootScope.address.city='';
        $rootScope.location='';

        $rootScope.GetUserAddress = function () {
            navigator.geolocation.getCurrentPosition(function (pos) {
                 var lat = pos.coords.latitude;
                 var lng = pos.coords.longitude;
                var geocoder = new google.maps.Geocoder();
                var latLng = new google.maps.LatLng(lat, lng);
                geocoder.geocode({
                        latLng: latLng
                    },
                    function (responses) {
                        if (responses[0]) {

                            console.log("Address " + JSON.stringify(responses[0].formatted_address));
                            var add = responses[0].formatted_address;
                            var value = add.split(",");
                            // alert(responses[0].formatted_address);
                             count = value.length;
                             country = value[count - 1];
                             state = value[count - 2];
                             city = value[count - 3];
                            $rootScope.CounteryName = country;

                          $rootScope.getCountryData($rootScope.CounteryName);

                        }
                        else {
                            alert("address not found");
                        }
                    }
                );
            });
        };



    // all years

    $rootScope.years = [];

    $rootScope.getYears = function(){

      for(var i = 1940; i < 2016; i++){

        years.push[i];

      }
    }


    $rootScope.getCountryData = function(county_name){

      $rootScope.url = "http://ec2-52-201-214-115.compute-1.amazonaws.com:8080/educators/api/v1/user/startup/retrieve/";

      HTTP.get($rootScope.url+county_name).success(function (response) {

        $rootScope.studentCourseData    = response.coursesListData;
        $rootScope.hobbiesData          = response.hobbiesList;
        $rootScope.statesData           = response.states;
        $rootScope.universityData       = response.universityLists;

        window.localStorage.setItem("COUNTRY_RESPONSE",JSON.stringify(response));


      }).error(function (error, status) {
      });

    }


        $rootScope.GetUserAddress();

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

  });

        $ionicPlatform.registerBackButtonAction(function (event) {
            var state = $state.current.name;

            switch (state) {

               case "app.mainPage":

                navigator.app.exitApp();
                break;

                case "app.AddProfile":

                    navigator.app.exitApp();
                    break;

                case "loginScreen":
                    navigator.app.exitApp();
                    break;

                default :
                    navigator.app.backHistory();
                    break;
            }

        }, 100);



    })

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.AddProfile', {
      url: '/AddProfile',
      views: {
        'menuContent': {
          templateUrl: 'templates/AddProfile.html',
          controller: 'AddProfileCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  })

    .state('SplashScreen', {
      url: '/SplashScreen',
      templateUrl: 'templates/SplashScreen.html',
      controller: 'SplashScreenCtrl'
    })
    .state('SliderScreen', {
      url: '/SliderScreen',
      templateUrl: 'templates/SliderScreen.html',
      controller: 'SliderScreenCtrl'
    })

    .state('loginScreen', {
      url: '/loginScreen',
      templateUrl: 'templates/loginScreen.html',
      controller: 'loginScreenCtrl'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'templates/Register.html',
      controller: 'registerCtrl'
    })
    .state('forgotPassword', {
      url: '/forgotPassword',
      templateUrl: 'templates/ForgotPassword.html',
      controller: 'forgotPasswordCtrl'
    })

    .state('OTP', {
      url: '/OTP',
      templateUrl: 'templates/OTPScreen.html',
      controller: 'OTPCtrl'
    })
    .state('app.tutorProfile', {
      url: '/tutorProfile',
      views: {
        'menuContent': {
          templateUrl: 'templates/TutorProfile.html',
          controller: 'tutorProfileCtrl'
        }
      }

    })
    .state('app.mainPage', {
      url: '/mainPage',
      views: {
        'menuContent': {
          templateUrl: 'templates/MainPage.html',
          controller: 'mainPageCtrl'
        }
      }

    })
    .state('app.tutorInfo', {
      url: '/tutorInfo',
      views: {
        'menuContent': {
          templateUrl: 'templates/TutorInfo.html',
          controller: 'tutorInfoCtrl'
        }
      }

    })
    .state('app.tutorProfilePic', {
      url: '/tutorProfilePic',
      views: {
        'menuContent': {
          templateUrl: 'templates/TutorProfilePic.html',
          controller: 'tutorProfilePicCtrl'
        }
      }

    })

    .state('app.tutorAddress', {
      url: '/tutorAddress',
      views: {
        'menuContent': {
          templateUrl: 'templates/TeacherAddress.html',
          controller: 'teacherAddressCtrl'
        }
      }

    })

    .state('app.createStudentProfileSection1', {
      url: '/createStudentProfileSection1',
      views: {
        'menuContent': {
          templateUrl: 'templates/CreateStudentProfileSection1.html',
          controller: 'createStudentProfileSection1Ctrl'
        }
      }

    })

    .state('app.createStudentProfileSection2', {
      url: '/createStudentProfileSection2',
      views: {
        'menuContent': {
          templateUrl: 'templates/CreateStudentProfileSection2.html',
          controller: 'createStudentProfileSection2Ctrl'
        }
      }

    })
    .state('app.createStudentProfileSection3', {
      url: '/createStudentProfileSection3',
      views: {
        'menuContent': {
          templateUrl: 'templates/CreateStudentProfileSection3.html',
          controller: 'createStudentProfileSection3Ctrl'
        }
      }

    })

    .state('app.createInstituteProfileSec1', {
      url: '/createInstituteProfileSec1',
      views: {
        'menuContent': {
          templateUrl: 'templates/CreateInstituteProfileSec1.html',
          controller: 'createInstituteProfileSec1Ctrl'
        }
      }

    })
    .state('app.createInstituteProfileSec2', {
      url: '/createInstituteProfileSec2',
      views: {
        'menuContent': {
          templateUrl: 'templates/CreateInstituteProfileSec2.html',
          controller: 'createInstituteProfileSec2Ctrl'
        }
      }

    })
    .state('app.createInstituteProfileSec3', {
      url: '/createInstituteProfileSec3',
      views: {
        'menuContent': {
          templateUrl: 'templates/CreateInstituteProfileSec3.html',
          controller: 'createInstituteProfileSec3Ctrl'
        }
      }

    })
    .state('app.createInstituteProfileSec4', {
      url: '/createInstituteProfileSec4',
      views: {
        'menuContent': {
          templateUrl: 'templates/CreateInstituteProfileSec4.html',
          controller: 'createInstituteProfileSec4Ctrl'
        }
      }

    })
    .state('app.InstituteAddTeacher_and_Course', {
      url: '/InstituteAddTeacher_and_Course',
      views: {
        'menuContent': {
          templateUrl: 'templates/InstituteAddTeacher_and_Course.html',
          controller: 'InstituteAddTeacher_and_CourseCtrl'
        }
      }

    })

    .state('app.settings', {
      url: '/settings',
      views: {
        'menuContent': {
          templateUrl: 'templates/Settings.html',
          controller: 'settingsCtrl'
        }
      }

    })

      .state('app.AboutUs', {
          url: '/AboutUs',
          views: {
              'menuContent': {
                  templateUrl: 'templates/AboutUs.html',
                  controller: 'AboutUsCtrl'
              }
          }

      })
      .state('app.ECashOption', {
          url: '/ECashOption',
          views: {
              'menuContent': {
                  templateUrl: 'templates/ECashOptionScreen.html',
                  controller: 'ECashOptionCtrl'
              }
          }

      })
    .state('app.ECash', {
      url: '/ECash',
      views: {
        'menuContent': {
          templateUrl: 'templates/ECash.html',
          controller: 'ECashCtrl'
        }
      }

    })
    .state('app.ReferEarn', {
      url: '/ReferEarn',
      views: {
        'menuContent': {
          templateUrl: 'templates/ReferEarn.html',
          controller: 'ReferEarnCtrl'
        }
      }

    })
      .state('app.RedeemPoint', {
          url: '/RedeemPoint',
          views: {
              'menuContent': {
                  templateUrl: 'templates/RedeemPoint.html',
                  controller: 'RedeemPointCtrl'
              }
          }

      })
      .state('app.OrderList', {
          url: '/OrderList',
          views: {
              'menuContent': {
                  templateUrl: 'templates/OrderList.html',
                  controller: 'OrderListCtrl'
              }
          }

      })

      .state('app.notification', {
          url: '/notification',
          views: {
              'menuContent': {
                  templateUrl: 'templates/Notification.html',
                  controller: 'notificationCtrl'
              }
          }

      })
      .state('app.getReview', {
          url: '/getReview',
          views: {
              'menuContent': {
                  templateUrl: 'templates/GetReview.html',
                  controller: 'getReviewCtrl'
              }
          }

      })

      .state('app.favorite', {
          url: '/favorite',
          views: {
              'menuContent': {
                  templateUrl: 'templates/Favorite.html',
                  controller: 'favoriteCtrl'
              }
          }

      })
      .state('app.contactUs', {
          url: '/contactUs',
          views: {
              'menuContent': {
                  templateUrl: 'templates/ContactUs.html',
                  controller: 'contactUsCtrl'
              }
          }

      })

      .state('app.help', {
          url: '/help',
          views: {
              'menuContent': {
                  templateUrl: 'templates/Help.html',
                  controller: 'helpCtrl'
              }
          }

      })

      .state('app.AddCourse', {
          url: '/AddCourse',
          views: {
              'menuContent': {
                  templateUrl: 'templates/AddCourse.html',
                  controller: 'AddCourseCtrl'
              }
          }

      })
      .state('app.TransactionHistory', {
          url: '/TransactionHistory',
          views: {
              'menuContent': {
                  templateUrl: 'templates/TransactionHistory.html',
                  controller: 'TransactionHistoryCtrl'
              }
          }

      })

      .state('app.MyProfile', {
          url: '/MyProfile',
          views: {
              'menuContent': {
                  templateUrl: 'templates/MyProfile.html',
                  controller: 'MyProfileCtrl'
              }
          }

      })
  ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/SplashScreen');
  $ionicConfigProvider.navBar.alignTitle("center");
  /*$ionicConfigProvider.form.checkbox("square");*/
});
