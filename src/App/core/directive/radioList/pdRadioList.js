angular.module("pd.radioList", [])
    .directive("radioList", ["pdActionSvr", "pdResourceSvr", "$rootScope", "$timeout", function (pdActionSvr, pdResourceSvr, $rootScope, $timeout) {
        return {
            restrict: "E",
            require: 'ngModel',
            scope: {
                id: "@",
                ngModel: "=",
                url: "@",
                valueField: "@",
                textField: "@",
                selectEvent:"&"
            },
            template: '<div><input type="radio" name="{{id}}" ng-repeat="tmpItem in data" value="{{tmpItem.id}}" ng-checked="tmpItem.isSelect" title="{{tmpItem.text}}" lay-filter="{{rdoId}}" /></div>',
            replace: true,
            link: function ($scope, $element, $attr) {
                $scope.rdoId = "radio" + $scope.id;
                $attr.valueField = $attr.valueField || "id";
                $attr.textField = $attr.textField || "text";
                $scope.selectId = "";
                if ($attr.jdata) {
                    try {
                        $scope.data = eval($attr.jdata);
                    }
                    catch (e) {
                        $scope.data = [];
                    }
                }

                function changeFieldName(fieldName, defualtFieldName, data) {
                    if (!(fieldName || defualtFieldName == fieldName)) {
                        data[defualtFieldName] = data[fieldName];
                    }
                }

                layui.form.on('radio(' + $scope.rdoId + ')', function (data) {
                    $timeout(function () {
                        $scope.$apply(function () {
                            $scope.isPageClick = true;
                            $scope.ngModel = data.value;
                            var selectItem = {};
                            var isSelf = false;
                            for (var i = 0; i < $scope.data.length; i++) {
                                if ($scope.ngModel == $scope.data[i][$attr.valueField]) {
                                    selectItem = $scope.data[i];
                                }
                            }
                            if (!selectItem.isSelect) {
                                for (var i = 0; i < $scope.data.length; i++) {
                                    if ($scope.ngModel == $scope.data[i][$attr.valueField]) {
                                        $scope.data[i].isSelect = true;
                                    } else {
                                        $scope.data[i].isSelect = false;
                                    }
                                }
                            }
                            $scope.selectEvent(
                                {data:
                                    {id:selectItem.id,text:selectItem.text}
                                }
                            );
                        });
                    }, 200);
                });
                if ($scope.data == null || $scope.data.length == 0) {
                    pdResourceSvr.get($scope.url, null)
                        .then(function (result) {
                            var data = [];
                            //$scope.data.push({ id: null, name: "请选择" });
                            for (var i = 0; i < result.length; i++) {
                                if ($scope.ngModel == result[i][$attr.valueField]) {
                                    result[i].isSelect = true;
                                } else {
                                    result[i].isSelect = false;
                                }
                                changeFieldName($attr.valueField, "id", result[i]);
                                changeFieldName($attr.textField, "text", result[i]);

                                data.push(result[i]);
                            }
                            $scope.data = data;
                            addngModelWatch();
                            if ($attr.defaultfirst && !($scope.data == null || $scope.data.length == 0)) {
                                $scope.ngModel = $scope.data[0].id;
                            }
                            $timeout(function () {
                                layui.form.render("radio");
                            }, 10);
                        });
                } else {
                    addngModelWatch();
                    if ($attr.defaultfirst && !($scope.data == null || $scope.data.length == 0)) {
                        $scope.ngModel = $scope.data[0].id;
                    }
                    $timeout(function () {
                        layui.form.render("radio");
                    }, 10);
                }

                function addngModelWatch() {
                    $scope.$watch("ngModel", function (newValue, oldValue) {
                        if ($scope.isPageClick) {
                            $scope.isPageClick = false;
                            return;
                        }
                        if (newValue == null) {
                            return;
                        }
                        // ngModel
                            if (!(newValue == null || newValue.length == 0)) {
                                var data = [];
                                for (var i = 0; i < $scope.data.length; i++) {
                                    if ($scope.ngModel == $scope.data[i][$attr.valueField]) {
                                        $scope.data[i].isSelect = true;
                                    } else {
                                        $scope.data[i].isSelect = false;
                                    }

                                    data.push($scope.data[i]);
                                }
                                $scope.data = data;

                                for (var i = 0; i < $scope.data.length; i++) {
                                    var inputObj = angular.element("input[lay-filter=" + $scope.rdoId + "][value=" + $scope.data[i].id + "]");
                                    if (newValue == $scope.data[i].id) {
                                        //inputObj.("checked");
                                        inputObj.next().addClass("layui-form-radioed");
                                        inputObj.next().find("i").html("&#xe643;");
                                    } else {
                                        inputObj.next().removeClass("layui-form-radioed");
                                        inputObj.next().find("i").html("&#xe63f;");
                                    }
                                }
                            } else {
                                var inputObj = angular.element("input[lay-filter=" + $scope.rdoId + "]");
                                inputObj.removeAttr("checked");
                                inputObj.next().removeClass("layui-form-radioed");
                                inputObj.next().find("i").html("&#xe63f;");
                            }

                    });
                }

               
            },
            controller: function ($scope, appRoot) {
                $scope.data = [];
                $scope.isPageClick = false;
            }
        };
    }]);