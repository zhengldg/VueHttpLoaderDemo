angular.module("pd.dropdownTree", [])
    .directive("dropdownTree", ["pdActionSvr", "pdResourceSvr", "$rootScope", "$timeout", function (pdActionSvr, pdResourceSvr, $rootScope, $timeout) {
        return {
            restrict: "EA",
            scope: {
                ngModel: "=",
                text: "=text",
                data: "@",
                valueField: "@",
                textField: "@"
            },
            template: "<div class='pr fl'><input value='{{display}}' type=text ng-click='toggle()' ng-disabled='disabled' readonly />" +
                "<div class='ztree zt-select' style='display:block' ng-show='showMe'><ul class='ztree'></ul></div>" +
                "<input type=hidden value={{ngModel}} type=text /></div>",
            replace: true,
            link: function ($scope, $element, $attr) {
                $element[0].children[1].id = "ztree" + $attr.id;
                $scope.display = "";

                $attr.valueField = $attr.valueField || "id";
                $attr.textField = $attr.textField || "text";

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

                var setting = {
                    view: {
                        showIcon: false,
                        showLine: true
                    },
                    data: {
                        simpleData: {
                            enable: true,
                            idKey: "id",
                            pIdKey: "pId",
                            rootPId: null
                        }
                    },
                    callback: {
                        onClick: function (event, treeId, treeNode) {
                            $scope.ngModel = treeNode.id;
                            $scope.display = treeNode.name;
                            $scope.toggle();
                            $scope.$apply();
                        }
                    }
                };
                $scope.showMe = false;
                $scope.disabled = false;
                $scope.toggle = function toggle() {
                    $scope.showMe = !$scope.showMe;
                };

                function changeFieldName(fieldName, defualtFieldName, data) {
                    if (!(fieldName || defualtFieldName == fieldName)) {
                        data[defualtFieldName] = data[fieldName];
                    }
                }

                // 初始化ztree
                if ($scope.data.length == 0) {
                    pdResourceSvr.post($attr.url, null).then(function (result) {
                        for (i = 0; i < result.length; i++) {
                            changeFieldName($attr.valueField, "id", result[i]);
                            changeFieldName($attr.textField, "name", result[i]);
                        }

                        $scope.zTree = $.fn.zTree.init($("#ztree" + $attr.id), setting, result);
                        $timeout(function () {
                            var node = $scope.zTree.getNodeByParam("id", $scope.ngModel);
                            $scope.display = node.name;
                            $scope.zTree.selectNode(node);
                        }, 0);
                    });
                } else {
                    $scope.zTree = $.fn.zTree.init($("#ztree" + $attr.id), setting, $scope.data);
                }

                $scope.$watch("item", function () {
                    $timeout(function () {
                        $scope.$apply(function () {
                            if (!($scope.item == null || $scope.item.length == 0)) {
                                var node = $scope.zTree.getNodeByParam('id', $scope.item);
                                $scope.ngModel = node.id;
                                $scope.display = node.name;
                                pdResourceSvr.safeApply($rootScope, function () {
                                    $scope.$apply()
                                });
                            }
                        });
                    });
                })
            },
            controller: function ($scope, appRoot) {
                $scope.data = [];
                $scope.zTree = null;
            }
        };
    }]);