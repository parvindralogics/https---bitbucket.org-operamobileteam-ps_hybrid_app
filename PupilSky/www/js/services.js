
angular.module('starter.services', [])

   /* .factory('MapLoadingScreen', function ($ionicLoading) {
        return {
            loading: null,
            show: function () {
                $ionicLoading.show({
                    content: '',
*//*
                    template: '<div class="row" style="color: #55B750;"><div><ion-spinner icon="android" style="color: #55B750!important;"></ion-spinner></div><div style="padding-left: 10px;font-weight: 500;vertical-align: middle;padding-top: 5px;font-size: 12px;">Authenticating...</div></div>',
*//*
                    template: '<div><img src="img/giphy.gif" width="200px" height="200px"></div>',
                    animation: 'fade-in',
                    noBackdrop: true,
                    showBackdrop: false,
                    maxWidth: 400,
                    maxHeight: 100,
                    showDelay: 200
                });
            },
            hide: function () {
                $ionicLoading.hide();
            }
        }
    })*/

  .factory('LoadingScreen', function ($ionicLoading) {
    return {
      loading: null,
      show: function () {
        $ionicLoading.show({
          content: '',
          /*
           template: '<div class="row" style="color: #55B750;"><div><ion-spinner icon="android" style="color: #55B750!important;"></ion-spinner></div><div style="padding-left: 10px;font-weight: 500;vertical-align: middle;padding-top: 5px;font-size: 12px;">Authenticating...</div></div>',
           */
          template: '<div class="loading-bacground"><ion-spinner icon="android"></ion-spinner></div>',
          animation: 'fade-in',
          noBackdrop: true,
          showBackdrop: false,
          maxWidth: 400,
          maxHeight: 100,
          showDelay: 200
        });
      },
      hide: function () {
        $ionicLoading.hide();
      }
    }
  })

  .filter('parseUrl', function() {
    var    //URLs starting with http://, https://, or ftp://
      replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim,
    //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
      replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim,
    //Change email addresses to mailto:: links.
      replacePattern3 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;

    return function(text, target, otherProp) {
      angular.forEach(text.match(replacePattern1), function(url) {
        text = text.replace(replacePattern1, "<a href=\"$1\" target=\"_blank\">$1</a>");
      });
      angular.forEach(text.match(replacePattern2), function(url) {
        text = text.replace(replacePattern2, "$1<a href=\"http://$2\" target=\"_blank\">$2</a>");
      });
      angular.forEach(text.match(replacePattern3), function(url) {
        text = text.replace(replacePattern3, "<a href=\"mailto:$1\">$1</a>");
      });

      return text;
    };
  })


.factory('ShowMessageAlert',function($window){
        return{
           showMessage: function (message) {
               if($window.cordova)
               {
                   window.plugins.toast.showLongBottom(message);
               }
               else{
                    alert(message);
               }
           }
        }
    })

    .factory('HTTP', function ($http, HOST, $rootScope, $ionicLoading, HOST_BASE) {
        return {
            get: function (url) {

                return $http({
                    method: 'GET',
                    url: url
                });
            },
            get_request: function (url,access_token) {

              return $http({
                method: 'GET',
                url: HOST_BASE+url,
                headers: {'Content-type': 'application/json','secretToken':access_token}
              });
            },
            post: function (url, params) {
                var promise = $http({
                    method: 'POST',
                    url: HOST+url,
                    headers: {'Content-type': 'application/json'},
                    data: params
                });
                return promise;
            },
            post_data: function (url, params, access_token) {
              var promise = $http({
                method: 'POST',
                url: HOST_BASE+url,
                headers: {'Content-type': 'application/json','secretToken':access_token},
                data: params
              });
              return promise;
            },
          put_data: function (url, params, access_token) {
            var promise = $http({
              method: 'PUT',
              url: HOST_BASE+url,
              headers: {'Content-type': 'application/json','secretToken':access_token},
              data: params
            });
            return promise;
          },
            uploadUsingDevice : function(url,file,params,access_token){
              $ionicLoading.show();
                // alert(JSON.stringify(params));
                var options = new FileUploadOptions();
                options.fileKey = "file";
                options.chunkedMode = false;
                options.httpMethod = 'POST';
                options.params = params;
                options.headers = {'Content-Type': undefined, 'secretToken': access_token};
                var ft = new FileTransfer();
                ft.upload(file, encodeURI(HOST_BASE + url) , function(success){
                    $ionicLoading.hide();

                  console.log(success);
                  window.localStorage.setItem("STU_PROF_RES", JSON.stringify(success.response));
                }, function(err){
                    $ionicLoading.hide();
                     alert("Something went wrong");
                }, options);
            }
        }
    })

.factory('settings', function() {
    return {
        noImageUrl: "img/dummy_profile_pic.png"
    };
})

  .factory('settings_noImage', function() {
    return {
      noImageUrl: "img/no_image.png"
    };
  })

.factory('settings_events', function() {
    return {
        noImageUrlEvent: "img/takepic.png"
    };
})


.directive('dir', function($compile, $parse) {
  return {
    restrict: 'E',
    link: function(scope, element, attr) {
      scope.$watch(attr.content, function() {
        element.html($parse(attr.content)(scope));
        $compile(element.contents())(scope);
      }, true);
    }
  }
})

.directive("limitTo", [function() {
    return {
        restrict: "A",
        link: function(scope, elem, attrs) {
            var limit = parseInt(attrs.limitTo);
            angular.element(elem).on("keypress", function(e) {
                if (this.value.length == limit) e.preventDefault();
            });
        }
    }
}]);

