
(function(angular){
  'use strict';
  // 这里是正在热模块
  var app = angular.module('moviecat.movie_list',[
    'ngRoute',
    'moviecat.jsonp']);

  // 自己管理自己的路由
  app.config(['$routeProvider',function($routeProvider){
    $routeProvider.when('/:movieType/:page?',{
      // 注意这时路径是相当app.js（主模块）所在目录
      templateUrl:'./movie_list/view.html',
      controller:'movie_listController'
    })

  }]);
  // 创建控制器
  app.controller('movie_listController',[
    '$scope','$http','$routeParams','$route','$window','MyService'
    ,function($scope,$http,$routeParams,$route,$window,MyService){
    console.log($routeParams);
     $scope.loading=false;//这个值是用来表示动画是否显示的。

     var page = ($routeParams.page||'1')-0;//是字符串
     $scope.page=page;
     // console.log(page);
     // count = 5
     // page=1 ,start 0,  0,1,2,3,4
     // page=2 ,start 5,  5,6,7,8,9
     // page=3 ,start 10  

     var start = (page-1)*5;

      // MyService.jsonp('http://api.douban.com/v2/movie/movie_list',
      // 不应该写死
      MyService.jsonp('http://api.douban.com/v2/movie/'+$routeParams.movieType+'?q='+$routeParams.q,
        {start:start,count:5},function(data){
          // console.log(data);
          $scope.data=data;
          // 在异步中的对数据模型的更改，angular无法监视，要通知它改变了
          $scope.total=data.total; // 总的数量，  // 5, 6
          $scope.totalPage= $window.Math.ceil($scope.total/data.count); // 总的页数
          $scope.loading=true;
          // setTimout,setInterval;
          $scope.$apply();//通知angular的数据模型发生了改变。

        });



      // 下一页按钮的点击事件
      $scope.getPage=function(nowPage){
          // 在这里也需要做验证：
        
        if(nowPage<=1||nowPage>$scope.totalPage){
          return;
        }

        // MyService.jsonp
        // 使用一个变通方法，在点击事件里改变锚点值。
        // 这里我们需要注入$route,它有个方法，updataParams用来更新url中锚点的参数，一旦改变，就会重新匹配规则。
        $route.updateParams({page:nowPage});
      }

    
  }]);
})(angular);