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

