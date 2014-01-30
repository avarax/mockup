mockupApp
  .directive('elementImage', ["contextService", "layerService", function(contextService, layerService) {
      return {
        restrict: 'AE',
        transclude: true,
        scope: false,
        replace: true,
        require: 'ngModel',
        controller: function($scope, $element) {
           console.log("layers de la merde 2", $scope.layer);
            console.log("content", $scope.$content);
            $scope.selected = contextService.getSelected();
            $scope.$content = $element.parent().parent();
            $scope.fileupload = $scope.$content.find('.fileupload');
            $scope.image = $scope.$content.find(".picture");
            if($scope.layer.content != undefined) {
              $scope.image.src = $scope.layer.content;
            }

            $scope.$watch('layer.filters', function() {
              console.log("filter change", $scope.image);
              //var $img = $scope.$content.find(".image");
              Pixastic.revert($scope.image[0]);
              //$img = $scope.$content.find(".image");
              $scope.image.pixastic("blurfast", {amount:$scope.layer.filters.blur})
                    .pixastic("lighten", {amount:$scope.layer.filters.lighten})
                    .pixastic("brightness", {brightness:$scope.layer.filters.brightness,contrast:$scope.layer.filters.contrast});
            }, true);


            $scope.fileupload.fileupload({
              url: "http://127.0.0.1:3000/files",
              method: "post",
              done: function (e, data) {
                  console.log($scope.layer);
                  $scope.layer.content = "http://127.0.0.1:3000/files/"+data.files[0].name;
                  $scope.$apply();
                  console.log("Image upload done", data);                   
              }
            });
        },
        templateUrl : '/views/element/elementImage.html'
      }

  }]);