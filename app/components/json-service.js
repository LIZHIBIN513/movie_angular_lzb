
// 自己编写一个跨域的jsonp方法
(function(angular){
  'use strict';
  
  // 1.创建服务模块
  var app = angular.module('moviecat.jsonp',[]);

  // 2.创建服务器
  app.service('MyService',['$window',function($window){
    this.jsonp=function (url,arg,fn){
          // 1.拼接url参数
          var queryString = '?';
          for(var key in arg){
              queryString+=key+'='+arg[key]+'&'
          }
          
          url+=queryString;
          // 动态创建成功的回调方法

          // 不能够写死数据，需要动态的设置
          // 一定要保持回调函数不一样，用随机数生成（开始我没有想到）
          var myCallbackName = 'myJsonp_'+$window.Math.random().toString().substr(2);

          $window[myCallbackName]=fn;
          // window.myCallbackName
          // window.mycallback=fn;



          url+='callback='+myCallbackName;

          // 2.动态的创建script标签（设计到了jsonp的原理）
          var scrip = $window.document.createElement('script');
          scrip.src=url;
          $window.document.body.appendChild(scrip);
       }

  }])

})(angular)
