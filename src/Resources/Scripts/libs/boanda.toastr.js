var $$ = $$ || {};
(function (boanda) {

    if (!toastr) {
        return;
    }

    /* DEFAULTS *************************************************/

    toastr.options.positionClass = 'toast-bottom-right';

    /* NOTIFICATION *********************************************/

    var showNotification = function (type, message, title) {
        toastr[type](message, title);
    };

    boanda.notify.success = function (message, title) {
        toastr.options.timeOut = 2000;
        showNotification('success', message, title);
    };

    boanda.notify.info = function (message, title) {
        toastr.options.timeOut = 2000;
        showNotification('info', message, title);
    };

    boanda.notify.warn = function (message, title) {
        toastr.options.timeOut = 4000;
        showNotification('warning', message, title);
    };

    boanda.notify.error = function (message, title) {
        toastr.options.timeOut = 5000;
        showNotification('error', message, title);
    };

})($$);