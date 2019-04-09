angular.module("pd.tabs", [])
    .directive("tabs", ["$timeout", function ($timeout) {
        return {
            restrict: 'E', //定义标签属性
            template:
                "<div class='layui-tab' id='{{id}}' ng-init='selected=0'>" +
                "<ul class='layui-tab-title layui-form'>" +
                "<li ng-class='{\"layui-this\":selected==$index}' ng-click='show($index)' ng-repeat='item in data track by $index'>{{item.name}}" +
                "<span ng-if='item.status==1'>✔</span>" +
                "</li>" +
                "</ul>" +
                "<div class='layui-tab-content' style='padding:0;'>" +
                "<div ng-class='{\"layui-show\":selected==$index}' ng-show='selected==$index' ng-repeat='item in data track by $index'>" +
                "<iframe ng-src='{{item.url}}' width='100%' frameborder='0' fullscreen=yes name='ifHeight' id='{{id}}frame{{$index}}' class='ifHeight' style='background: #fff;'></iframe>" +
                "</div>" +
                "</div>" +
                "</div>",
            replace: true,      // 把当前自定义的指令标签替换成引入的标签
            scope: {            // 作用域隔离 ： 每个作用域执行的是自己的功能
                id: '@',        // 拿所有Id的字符串
                data: '=',      // 拿所有Data属性的变量名
                theme: "@",     // brief,card
            },
            link: function (scope, element, attr) { //dom操作		
                if (scope.theme == "brief") {
                    element.addClass("layui-tab-brief");
                } else if (scope.theme == "card") {
                    element.addClass("layui-tab-card");
                }
                element.bind('click', function (event) {
                    scope.changeFrameHeight();
                });
                $timeout(function () {
                    scope.$apply("changeFrameHeight()");
                }, 0);

                scope.changeFrameHeight = function () {
                    var ifrValue = angular.element(window.top).height() - element[0].offsetTop -5- element.find('.layui-tab-title').height() + "px";
                    //console.log(ifrValue);
                    angular.element(".ifHeight").height(ifrValue);
                };

                scope.show = function (index) {
                    scope.selected = index;
                };

                layui.use('element', function () {
                    var element = layui.element;
                });
            }
        };
    }]);