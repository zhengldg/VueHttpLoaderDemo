angular.module("app")
    .filter('to_trusted', ['$sce', function ($sce) { return function (text) { return $sce.trustAsHtml(text); }; }])
    /**格式化日期*/
    .filter('formatDate', function () {
        return function (input, fmt) {
            if (input) {
                return layui.util.toDateString(input, fmt || 'yyyy-MM-dd');
            }
            return '';
        }
    })
    /**格式化时间*/
    .filter('formatTime', function () {
        return function (input, fmt) {
            if (input) {
                return layui.util.toDateString(input, fmt || 'yyyy-MM-dd HH时');
            }
            return '';
        }
    })
    /**格式化时间*/
    .filter('formatFullTime', function () {
        return function (input, fmt) {
            if (input) {
                return layui.util.toDateString(input, fmt || 'yyyy-MM-dd HH:mm:ss');
            }
            return '';
        }
    })
    /**格式化 是,否*/
    .filter('formatSF', function () {
        return function (input, deft) {
            if (input) {
                deft = deft || 1; // 默认1是 是
                return input == deft ? '是' : '否';
            }
        }
    });

