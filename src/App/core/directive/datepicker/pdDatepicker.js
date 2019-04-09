angular.module("pd.datepicker", [])
    .directive("datepicker", ["pdActionSvr", "pdResourceSvr", "$rootScope", "$timeout", "$filter", function (pdActionSvr, pdResourceSvr, $rootScope, $timeout, $filter) {
        return {
            restrict: "E",
            //require: 'ngModel',
            scope: {
                id: "@",
                startDate: "=",
                ngModel: "=",
                endDate: "=",
                type: '@',
                format: '@'
            },
            template: '<div><input type="text" placeholder="{{placeholder}}" value="{{ngModel}}" class="layui-input"></div>',
            replace: true,
            link: function ($scope, $element, $attr, ngModel) {
                //是否是范围选择控件
                $scope.isRange = !!$attr.range;
                $scope.placeholder = $attr.placeholder || '请选择';
                var layVerify = $element.attr("lay-verify");
                var layVertype = $element.attr("lay-vertype");

                if (layVerify != undefined) {
                    $element.children()[0].setAttribute("lay-verify", layVerify);
                }

                if (layVertype != undefined) {
                    $element.children()[0].setAttribute("lay-vertype", layVertype);
                }

                $element.removeAttr("lay-verify");
                $element.removeAttr("lay-vertype");

                $element[0].children[0].id = 'laydate' + $scope.id;
                $timeout(function () {
                    $scope.option = {
                        elem: '#laydate' + $scope.id,
                        showBottom: true,
                        range: $attr.range || false,
                        type:  $scope.type || 'date',
                        calendar: false,
                        format: $scope.format|| 'yyyy-MM-dd',
                        done: function (value, date, endDate) {
                            if ($scope.isRange) {
                                var arrDate = [];
                                if ($scope.option.range) {
                                    arrDate = value.split($scope.option.range);
                                } else {
                                    arrDate = value.split($scope.option.range);
                                }
                                $scope.startDate = arrDate[0];
                                $scope.endDate = arrDate[1];
                            } else {
                                $scope.ngModel = value
                            }
                            $scope.$apply();
                            $('#laydate' + $scope.id).blur();
                        }
                    };

                    try {
                        if (!($attr.setting == null || $attr.setting.length == 0)) {
                            var setting = eval('(' + $attr.setting + ')');
                            angular.extend($scope.option, setting);
                        }

                    } catch (e) {
                        console.log("解析日期控件setting错误" + e);
                    }

                    $scope.$watch('ngModel', function (newValue, oldValue) {
                        if (needFormat()) {
                            $scope.ngModel = layui.util.toDateString($scope.ngModel, $scope.option.format);
                        }  
                    })

                    function needFormat() {
                        return $scope.ngModel && (new Date($scope.ngModel) != 'Invalid Date')  && ($scope.option.type == 'date' || $scope.option.type == 'datetime');
                    }

                   setTimeout(function () {
                        // 设置初始值
                        if ($scope.isRange) {
                            var val = '';
                            if ($scope.startDate || $scope.endDate) {
                                if ($scope.startDate) {
                                    val += layui.util.toDateString($scope.startDate, $scope.option.format);
                                }
                                val += ' ' + $attr.range + '  ';
                                if ($scope.endDate) {
                                    val += layui.util.toDateString($scope.endDate, $scope.option.format);
                                }
                            }

                            $($element.children()[0]).val(val);
                        }
                        else if (needFormat()) {
                            $scope.ngModel = layui.util.toDateString($scope.ngModel, $scope.option.format);
                        }  

                        layui.laydate.render($scope.option);
                    },0);
                });
            },
            controller: function ($scope, appRoot) {
            }
        };
    }]); 