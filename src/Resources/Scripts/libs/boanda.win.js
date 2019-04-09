/*基于miniui实现的弹出框*/

var $$ = $$ || {};
(function (boanda) {
    if (!mini) {
        return;
    }
    boanda.win = boanda.win || {};
    boanda.win.open = function (url, title, ondestroy) {
        if (url) {
            if (arguments.length == 1 && Object.prototype.toString({})) {
                return mini.open(url);
            } else {
                return mini.open({
                    showMaxButton: true,
                    url: url,
                    title: title, width: 850, height: 500,
                    ondestroy: function (action) {
                        ondestroy && ondestroy(action);
                    }
                });
            }
        }
    }
})($$);