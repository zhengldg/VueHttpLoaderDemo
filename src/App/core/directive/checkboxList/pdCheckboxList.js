angular.module("pd.checkboxList", [])
    .directive("checkboxList", ["pdActionSvr", "pdResourceSvr", "$rootScope", "$timeout", function (pdActionSvr, pdResourceSvr, $rootScope, $timeout) {
        return {
            restrict: "E",
            require: 'ngModel',
            scope: {
                id: "@",
                ngModel: "=",
                url: "@",
                valueField: "@",
                textField: "@"
            },
            template: '<div><input type="checkbox" name="{{chkId}}" ng-repeat="tmpItem in data" value="{{tmpItem.id}}" title="{{tmpItem.text}}" ng-checked="ngModel" lay-filter="{{chkId}}" lay-skin="primary" /></div>',
            replace: true,
            link: function ($scope, $element, $attr) {
                $scope.chkId = "checkbox" + $scope.id;
                $attr.valueField = $attr.valueField || "id";
                $attr.textField = $attr.textField || "text";

                function changeFieldName(fieldName, defualtFieldName, data) {
                    if (!(fieldName || defualtFieldName == fieldName)) {
                        data[defualtFieldName] = data[fieldName];
                    }
                }

                layui.form.on('checkbox(' + $scope.chkId + ')', function (data) {
                    $timeout(function () {
                        $scope.$apply(function () {
                            if ($scope.selectValues.length == 0 && !($scope.ngModel == null || $scope.ngModel.length == 0)) {
                                $scope.selectValues = $scope.ngModel.split(",");
                            }
                            if (data.elem.checked) {
                                if (!$scope.selectValues.inArray(data.value)) {
                                    $scope.selectValues.push(data.value);
                                }
                            } else {
                                for (var i = 0; i < $scope.selectValues.length; i++) {
                                    if ($scope.selectValues[i] == data.value) {
                                        $scope.selectValues.splice(i, 1);
                                    }
                                }
                            }
                            $scope.isPageClick = true;
                            $scope.ngModel = $scope.selectValues.join(",");
                        });
                    });
                });

                pdResourceSvr.get($scope.url, null)
                    .then(function (result) {
                        for (var i = 0; i < result.length; i++) {
                            changeFieldName($attr.valueField, "id", result[i]);
                            changeFieldName($attr.textField, "text", result[i]);
                        }

                        $scope.data = result;
                        $timeout(function () {
                            layui.form.render("checkbox");
                        });
                    });

                $scope.$watch("ngModel", function (newValue, oldValue) {
                    if ($scope.isPageClick) {
                        $scope.isPageClick = false;
                        return;
                    }
                    // ngModel
                    $timeout(function () {
                        angular.element("input[lay-filter=" + $scope.chkId + "]").removeAttr("checked");
                        angular.element("input[lay-filter=" + $scope.chkId + "]").next().removeClass("layui-form-checked");
                        if (!(newValue == null || newValue.length == 0)) {
                            var selectData = newValue.split(",");
                            $scope.selectValues = selectData;
                            for (var i = 0; i < selectData.length; i++) {
                                var inputObj = angular.element("input[lay-filter=" + $scope.chkId + "][value=" + selectData[i] + "]");
                                inputObj.attr("checked", "checked");
                                inputObj.next().addClass("layui-form-checked");
                            }
                        }
                    }, 50);
                });
            },
            controller: function ($scope, appRoot) {
                $scope.data = [];
                $scope.selectValues = [];
                $scope.isPageClick = false;
            }
        };
    }]);