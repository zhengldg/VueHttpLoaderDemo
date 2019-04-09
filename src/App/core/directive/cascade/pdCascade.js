angular.module("pd.cascade", [])
    .directive("cascade", ["pdActionSvr", "pdResourceSvr", "$rootScope", "$timeout", function (pdActionSvr, pdResourceSvr, $rootScope, $timeout) {
        return {
           
            restrict: "E",
            scope: {
                id: "@",
                url: "@",
                valueField: "@",
                textField: "@",
                firstModel: "=?",
                secondModel: "=?",
                thirdModel: "=?",
                fourthModel: "=?",
                selectEvent: "&"
            },

            template:
                "<div ng-show='first' class='layui-inline' style='width:25%;'><select lay-filter='{{firstCascadeId}}' ng-model='firstModel' ng-options='item.id as item.text for item in firstSelect'><option></option></select></div>" +
                "<div ng-show='second'  class='layui-inline' style='width:25%;'><select lay-filter='{{secondCascadeId}}' ng-model='secondModel' ng-options='item.id as item.text for item in secondSelect' ng-show='secondSelect.length>0'><option></option></select></div>" +
                "<div ng-show='third' class='layui-inline' style='width:25%;'><select lay-filter='{{thirdCascadeId}}' ng-model='thirdModel' ng-options='item.id as item.text for item in thirdSelect' ng-show='thirdSelect.length>0'><option></option></select></div>" +
                "<div ng-show='fourth' class='layui-inline' style='width:25%;'><select lay-filter='{{fourthCascadeId}}' ng-model='fourthModel' ng-options='item.id as item.text for item in fourthSelect' ng-show='fourthSelect.length>0'><option></option></select></div>",
            replace: false,
            link: function ($scope, $element, $attr) {
                var layVerify = $element.attr("lay-verify");
                var layVertype = $element.attr("lay-vertype");
                if ($element.children().length > 0) {
                    if (layVerify != undefined) {
                        $element.children()[0].children[0].setAttribute("lay-verify", layVerify);
                    }

                    if (layVerify != undefined) {
                        $element.children()[0].children[0].setAttribute("lay-vertype", layVertype);
                    }
                }

                $element.removeAttr("lay-verify");
                $element.removeAttr("lay-vertype");

                $attr.valueField = $attr.valueField || "id";
                $attr.textField = $attr.textField || "text";
                $attr.pidField = $attr.pidField || "pid";
                $attr.pid = ($attr.pid == null || $attr.pid == "") ? null : $attr.pid;

                $scope.firstCascadeId = "firstCascade" + $scope.id;
                $scope.secondCascadeId = "secondCascade" + $scope.id;
                $scope.thirdCascadeId = "thirdCascade" + $scope.id;
                $scope.fourthCascadeId = "fourthCascade" + $scope.id;
                pdResourceSvr.get($scope.url, null)
                    .then(function (result) {
                        $scope.data = result;
                        var firstSelect = [];
                        var secondSelect = [];
                        var thirdSelect = [];
                        var fourthSelect = [];

                        for (i = 0; i < $scope.data.length; i++) {
                            if ($scope.data[i][$attr.pidField] == $attr.pid) {
                                firstSelect.push({ id: $scope.data[i][$attr.valueField], text: $scope.data[i][$attr.textField], pid: $scope.data[i][$attr.pidField] });
                            }
                            if (!($scope.firstModel == null || $scope.firstModel.length == 0 ) && $scope.data[i][$attr.pidField] == $scope.firstModel) {
                                secondSelect.push({ id: $scope.data[i][$attr.valueField], text: $scope.data[i][$attr.textField], pid: $scope.data[i][$attr.pidField] });
                            }
                            if ($scope.data[i][$attr.pidField] == $scope.secondModel && !($scope.secondModel == null || $scope.secondModel.length == 0)) {
                                thirdSelect.push({ id: $scope.data[i][$attr.valueField], text: $scope.data[i][$attr.textField], pid: $scope.data[i][$attr.pidField] });
                            }
                            if ($scope.data[i][$attr.pidField] == $scope.thirdModel && !($scope.thirdModel == null || $scope.thirdModel.length == 0)) {
                                fourthSelect.push({ id: $scope.data[i][$attr.valueField], text: $scope.data[i][$attr.textField], pid: $scope.data[i][$attr.pidField] });
                            }
                        }

                        $scope.firstSelect = firstSelect;
                        $scope.secondSelect = secondSelect;
                        $scope.thirdSelect = thirdSelect;
                        $scope.fourthSelect = fourthSelect;

                        $timeout(function () {
                            layui.form.render("select");
                        });
                    });


                $scope.$watch('firstModel', function (newVal, oldVal) {
                    var secondSelect = [];
                    if (newVal) {
                        for (i = 0; i < $scope.data.length; i++) {
                            if ($scope.data[i][$attr.pidField] == newVal) {
                                secondSelect.push({ id: $scope.data[i][$attr.valueField], text: $scope.data[i][$attr.textField], pid: $scope.data[i][$attr.pidField] });
                            }
                        }
                    }
                    $scope.secondSelect = secondSelect;
                    $scope.thirdSelect = [];
                    $scope.fourthSelect = [];
                    $timeout(function () {
                        layui.form.render("select");
                    }, 50);
                });

                layui.form.on('select(' + $scope.firstCascadeId + ')', function (data) {
                    $timeout(function () {
                        $scope.$apply(function () {
                            var selectItem = $scope.firstSelect[parseInt(data.value)] || {};
                            if ($scope.selectEvent != null) {
                                $scope.selectEvent({
                                    index: 0,
                                    data: {
                                        id: selectItem.id,
                                        text: selectItem.text,
                                    }
                                })
                            };
                            $scope.isPageClick = true;
                            $scope.firstModel = selectItem.id;
                            $scope.secondModel = $scope.thirdModel = $scope.fourthModel = null;
                        });
                    });
                });

                layui.form.on('select(' + $scope.secondCascadeId + ')', function (data) {
                    $timeout(function () {
                        $scope.$apply(function () {
                            var selectItem = $scope.secondSelect[parseInt(data.value)] || {};
                            if ($scope.selectEvent != null) {
                                $scope.selectEvent({
                                    index: 1,
                                    data: {
                                        id: selectItem.id,
                                        text: selectItem.text,
                                    }
                                })
                            };
                            $scope.isPageClick = true;
                            $scope.secondModel = selectItem.id;
                            $scope.thirdModel = null;
                            $scope.fourthModel = null;
                        });
                    });
                });

                $scope.$watch('secondModel', function (newVal, oldVal) {
                    var thirdSelect = [];
                    if (newVal) {
                        for (i = 0; i < $scope.data.length; i++) {
                            if ($scope.data[i][$attr.pidField] == newVal) {
                                thirdSelect.push({ id: $scope.data[i][$attr.valueField], text: $scope.data[i][$attr.textField], pid: $scope.data[i][$attr.pidField] });
                            }
                        }
                    }
                    $scope.thirdSelect = thirdSelect;
                    $scope.fourthSelect = [];
                    $timeout(function () {
                        layui.form.render("select");
                    }, 50);
                });

                layui.form.on('select(' + $scope.thirdCascadeId + ')', function (data) {
                    $timeout(function () {
                        $scope.$apply(function () {
                            var selectItem = $scope.thirdSelect[parseInt(data.value)] || {};
                            if ($scope.selectEvent != null) {
                                $scope.selectEvent({
                                    index: 2,
                                    data: {
                                        id: selectItem.id,
                                        text: selectItem.text,
                                    }
                                })
                            };
                            $scope.isPageClick = true;
                            $scope.thirdModel = selectItem.id;
                            $scope.fourthModel = null;
                        });
                    });
                });

                $scope.$watch('thirdModel', function (newVal, oldVal) {
                    var fourthSelect = [];
                    if ($scope.thirdModel) {
                        for (i = 0; i < $scope.data.length; i++) {
                            if ($scope.data[i][$attr.pidField] == $scope.thirdModel) {
                                fourthSelect.push({ id: $scope.data[i][$attr.valueField], text: $scope.data[i][$attr.textField], pid: $scope.data[i][$attr.pidField] });
                            }
                        }
                    }

                    $scope.fourthSelect = fourthSelect;
                    $timeout(function () {
                        layui.form.render("select");
                    }, 100);
                });

                layui.form.on('select(' + $scope.fourthCascadeId + ')', function (data) {
                    $timeout(function () {
                        $scope.$apply(function () {
                            var selectItem = $scope.fourthSelect[parseInt(data.value)] || {};
                            if ($scope.selectEvent != null) {
                                $scope.selectEvent({
                                    index: 3,
                                    data: {
                                        id: selectItem.id,
                                        text: selectItem.text,
                                    }
                                })
                            };
                            $scope.isPageClick = true;
                            $scope.fourthModel = selectItem.id;
                        });
                    }, 50);
                });

                $scope.$watch('fourthModel', function (newVal, oldVal) {
                    $timeout(function () {
                        layui.form.render("select");
                    }, 50);
                });
            },
            controller: function ($scope) {
                $scope.data = [];
                $scope.firstSelect = [];
                $scope.secondSelect = [];
                $scope.thirdSelect = [];
                $scope.fourthSelect = [];

                $scope.first = $scope.hasOwnProperty('firstModel');
                $scope.second = $scope.hasOwnProperty('secondModel');
                $scope.third = $scope.hasOwnProperty('thirdModel');
                $scope.fourth = $scope.hasOwnProperty('fourthModel');
            }
        };
    }]);