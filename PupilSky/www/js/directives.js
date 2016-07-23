angular.module('starter.directives', [])

  .directive('noImage', function (settings_noImage) {

    var setDefaultImage = function (el) {
      el.attr('src', settings_noImage.noImageUrl);
    };
    return {
      restrict: 'A',
      link: function (scope, el, attr) {
        scope.$watch(function() {
          return attr.ngSrc;
        }, function () {
          var src = attr.ngSrc;

          if (!src) {
            setDefaultImage(el);
          }
        });

        el.bind('error', function() { setDefaultImage(el); });
      }
    };
  })

  .directive('noImageUpdate', function (updateNoImage) {

    var setDefaultImage = function (el) {
      el.attr('src', updateNoImage.noImageUrl);
    };
    return {
      restrict: 'A',
      link: function (scope, el, attr) {
        scope.$watch(function() {
          return attr.ngSrc;
        }, function () {
          var src = attr.ngSrc;

          if (!src) {
            setDefaultImage(el);
          }
        });

        el.bind('error', function() { setDefaultImage(el); });
      }
    };
  })

.directive('clickForOptions', ['$ionicGesture', function($ionicGesture) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      $ionicGesture.on('tap', function(e){

        // Grab the content
        var content = element.parent()[0];

        // Grab the buttons and their width
        var buttons = element.parent().parent()[0].querySelector('.item-options');

        if (!buttons) {
          console.log('There are no option buttons');
          return;
        }
        var buttonsWidth = buttons.offsetWidth;

        ionic.requestAnimationFrame(function() {
          content.style[ionic.CSS.TRANSITION] = 'all ease-out .25s';

          if (!buttons.classList.contains('invisible')) {
            console.log('close');
            content.style[ionic.CSS.TRANSFORM] = '';
            setTimeout(function() {
              buttons.classList.add('invisible');
            }, 250);
          } else {
            buttons.classList.remove('invisible');
            content.style[ionic.CSS.TRANSFORM] = 'translate3d(-' + buttonsWidth + 'px, 0, 0)';
          }
        });

      }, element);
    }
  };
}])

