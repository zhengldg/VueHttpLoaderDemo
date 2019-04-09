angular.module("pd.formReadonly", [])
    .directive("formReadonly", ["pdActionSvr", "pdResourceSvr", "$rootScope", "$timeout", function (pdActionSvr, pdResourceSvr, $rootScope, $timeout) {
        return {
            restrict: "A",
            compile: function ($scope, $element, $attr) {
                var $ele = $element.$$element;
                // 禁用文本框
                $ele.find(':text').attr('ng-readonly', true).attr('placeholder','');
                return {
                    pre: function (scope, iElem, iAttrs) {
                    },
                    post: function (scope, iElem, iAttrs) {
                        // 待优化
                        setTimeout(function () {
                            //// 禁用单选
                            //iElem.find(':radio').attr('disabled', true);
                            //// 禁用多选
                            //iElem.find(':checkbox').attr('disabled', true);
                            //禁用下拉
                            iElem.find('.layui-unselect').css('pointer-events', 'none');
                            //禁用时间
                            iElem.find('.layui-input').css('pointer-events', 'none');
                            iElem.find('input').attr('placeholder', '');
                        }, 400);
                    }
                }
            },
            controller: function ($scope, appRoot) {
            }
        };
    }]);