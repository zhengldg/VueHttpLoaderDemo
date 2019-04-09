var $$ = $$ || {};
(function ($, boanda) {
    if (!mini || !$) {
        return;
    }

    /* DEFAULTS *************************************************/

    boanda.libs = boanda.libs || {};
    boanda.libs.miniAlert = {
        config: {
            'default': {

            },
            info: {
                type: 'info'
            },
            success: {
                type: 'success'
            },
            warn: {
                type: 'warning'
            },
            error: {
                type: 'error'
            },
            confirm: {
                type: 'warning',
                title: 'Are you sure?',
                showCancelButton: true,
                cancelButtonText: 'Cancel',
                confirmButtonColor: "#DD6B55",
                confirmButtonText: 'Yes'
            }
        }
    };

    /* MESSAGE **************************************************/

    var showMessage = function (type, message, title) {
        debugger;
        if (!title) {
            title = message;
            message = undefined;
        }

        var opts = $.extend(
            {},
            boanda.libs.miniAlert.config['default'],
            boanda.libs.miniAlert.config[type],
            {
                title: title,
                text: message
            }
        );
        if (top.mini) {
            top.mini.alert(message, title);
        } else {
            mini.alert(message, title);
        }

        //return $.Deferred(function ($dfd) {
        //    miniAlert(opts, function () {
        //        $dfd.resolve();
        //    });
        //});
    };

    boanda.message.info = function (message, title) {
        return showMessage('info', message, title || "提示");
    };

    boanda.message.success = function (message, title) {
        return showMessage('success', message, title || "提示");
    };

    boanda.message.warn = function (message, title) {
        return showMessage('warn', message, title || "警告");
    };

    boanda.message.error = function (message, title) {
        return showMessage('error', message, title || "错误");
    };

    boanda.message.confirm = function (message, titleOrCallback, callback) {
        var userOpts = {
            text: message
        };

        if ($.isFunction(titleOrCallback)) {
            callback = titleOrCallback;
        } else if (titleOrCallback) {
            userOpts.title = titleOrCallback;
        };

        mini.confirm(userOpts.text, userOpts.title, function (action) {
            callback && callback(action);
        });
    };

})(jQuery, $$);