angular.module('app', [])
.controller('demoController', function($scope) {
  const mainDom = document.querySelector('#main')

  $scope.alignItems = 'stretch'
  $scope.flexWrap = 'wrap'

  $scope.change = function(styleAtrrbiute)  {
    if (styleAtrrbiute === 'alignItems') {
      mainDom.style.alignItems = $scope.alignItems
    }
    if (styleAtrrbiute === 'wrap') {
      mainDom.style.flexWrap = $scope.flexWrap
    }
  }
})
