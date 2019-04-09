angular.module("pd.dropdownList", [])
    .directive("dropdownList", ["pdActionSvr", "pdResourceSvr", "$rootScope", "$timeout", function (pdActionSvr, pdResourceSvr, $rootScope, $timeout) {
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
            template: '<div class="layui-inline"><select lay-filter="{{ddlId}}" ng-model="ngModel" ng-options="tmpItem.id as tmpItem.text for tmpItem in data"><option value="">{{emptyText}}</option></select></div>',
            replace: true,
            link: function ($scope, $element, $attr) {

                $attr.valueField = $attr.valueField || "id";
                $attr.textField = $attr.textField || "text";
                $scope.ddlId = "dropdownList" + $scope.id;
                $scope.emptyText = $attr.emptytext || '请选择';
                if ($attr.jdata) {
                    try {
                        $scope.data = eval($attr.jdata);
                    }
                    catch (e) {
                        $scope.data = [];
                    }
                }

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
                layui.form.on('select(' + $scope.ddlId + ')', function (data) {
                    $timeout(function () {
                        $scope.$apply(function () {
                            var selectItem = $scope.data[parseInt(data.value)];
                            $scope.isPageClick = true;
                            if (data.value) {
                                $scope.ngModel = selectItem.id;
                                $scope.selectEvent({
                                    data: {
                                        id: selectItem.id,
                                        text: selectItem.text
                                    }
                                })
                            } else {
                                $scope.ngModel = '';
                                $scope.selectEvent({
                                    data: {
                                        id: '',
                                        text: ''
                                    }
                                })
                            }
                        });
                    });
                });

                function changeFieldName(fieldName, defualtFieldName, data) {
                    if (!(fieldName || defualtFieldName == fieldName)) {
                        data[defualtFieldName] = data[fieldName];
                    }
                }
                if ($scope.data == null || $scope.data.length == 0) {
                    pdResourceSvr.get($scope.url, null)
                        .then(function (result) {
                            for (var i = 0; i < result.length; i++) {
                                changeFieldName($attr.valueField, "id", result[i]);
                                changeFieldName($attr.textField, "text", result[i]);
                            }
                            $scope.data = result;
                            addngModelWatch();
                            if ($attr.defaultfirst && !($scope.data == null || $scope.data.length == 0)) {
                                $scope.ngModel = $scope.data[0].id;
                            }

                            $timeout(function () {
                                layui.form.render("select");
                            }, 10, false);
                        });
                } else {
                    addngModelWatch();
                    if ($attr.defaultfirst && !($scope.data == null || $scope.data.length == 0)) {
                        $scope.ngModel = $scope.data[0].id;
                    }

                    $timeout(function () {
                        layui.form.render("select");
                    }, 10, false);
                }

                function addngModelWatch() {
                    $scope.$watch("ngModel", function (newValue, oldValue) {
                        if ($scope.isPageClick) {
                            $scope.isPageClick = false;
                            return;
                        }
                        // ngModel
                        $timeout(function () {
                            if (!(newValue == null || newValue.length == 0)) {
                                var inputObj = angular.element("select[lay-filter='" + $scope.ddlId + "']");
                                inputObj.find("option").removeAttr("selected");
                                inputObj.next().find("input").val($scope.emptyText);

                                inputObj = angular.element("select[lay-filter='" + $scope.ddlId + "']");

                                for (var i = 0; i < $scope.data.length; i++) {
                                    if ($scope.data[i].id == newValue) {
                                        inputObj.find("option[value='" + newValue + "']").attr("selected", "");
                                        inputObj.next().find("dd[lay-value='" + $scope.data[i].text + "']").addClass("layui-this");
                                        inputObj.next().find("input").val($scope.data[i].text);
                                    }
                                }
                            }
                        }, 50);
                    });
                }
            },
            controller: function ($scope, appRoot) {
                $scope.data = [];
                $scope.isPageClick = false;
            }
        };
    }]);