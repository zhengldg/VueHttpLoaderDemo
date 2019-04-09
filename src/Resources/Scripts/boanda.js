/// <reference path="jquery-1.12.4.min.js" />
var $$ = $$ || {};

(function ($, boanda) {

    boanda.appPath = boanda.appPath || '/';

    boanda.pageLoadTime = new Date();

    //Converts given path to absolute path using boanda.appPath variable.
    boanda.toAbsAppPath = function (path) {
        if (path.indexOf('/') == 0) {
            path = path.substring(1);
        }

        return boanda.appPath + path;
    };

    //[log] s
    boanda.log = boanda.log || {};

    boanda.log.levels = {
        DEBUG: 1,
        INFO: 2,
        WARN: 3,
        ERROR: 4,
        FATAL: 5
    };

    boanda.log.level = boanda.log.levels.DEBUG;

    /**
     * 日志
     * @param logObject 日志信息
     * @param logLevel 日志级别
     */
    boanda.log.log = function (logObject, logLevel) {
        if (!window.console || !window.console.log) {
            return;
        }

        if (logLevel != undefined && logLevel < boanda.log.level) {
            return;
        }

        console.log(logObject);
    };

    /**
     * debug
     * @param logObject  
     */
    boanda.log.debug = function (logObject) {
        boanda.log.log("DEBUG: ", boanda.log.levels.DEBUG);
        boanda.log.log(logObject, boanda.log.levels.DEBUG);
    };

    /**
     * info
     * @param logObject
     */
    boanda.log.info = function (logObject) {
        boanda.log.log("INFO: ", boanda.log.levels.INFO);
        boanda.log.log(logObject, boanda.log.levels.INFO);
    };

    /**
     * warn
     * @param logObject
     */
    boanda.log.warn = function (logObject) {
        boanda.log.log("WARN: ", boanda.log.levels.WARN);
        boanda.log.log(logObject, boanda.log.levels.WARN);
    };

    /**
     * error
     * @param logObject
     */
    boanda.log.error = function (logObject) {
        boanda.log.log("ERROR: ", boanda.log.levels.ERROR);
        boanda.log.log(logObject, boanda.log.levels.ERROR);
    };

    /**
     * fatal
     * @param logObject
     */
    boanda.log.fatal = function (logObject) {
        boanda.log.log("FATAL: ", boanda.log.levels.FATAL);
        boanda.log.log(logObject, boanda.log.levels.FATAL);
    };

    //[notification]

    boanda.notify = boanda.notify || {};

    /**
     * 成功信息
     * @param message 消息
     * @param title 标题
     */
    boanda.notify.success = function (message, title) {
        boanda.log.warn('boanda.notify.success is not implemented!');
    };

    /**
     * 信息
     * @param message 消息
     * @param title 标题
     */
    boanda.notify.info = function (message, title) {
        boanda.log.warn('boanda.notify.info is not implemented!');
    };

    /**
    * 警告信息
    * @param message 消息
    * @param title 标题
    */
    boanda.notify.warn = function (message, title) {
        boanda.log.warn('boanda.notify.warn is not implemented!');
    };

    /**
     * 错误消息
     * @param message 消息
     * @param title 标题
     */
    boanda.notify.error = function (message, title) {
        boanda.log.warn('boanda.notify.error is not implemented!');
    };

    //[message] 
    boanda.message = boanda.message || {};

    var showMessage = function (message, title) {
        alert((title || '') + ' ' + message);

        if (!$) {
            boanda.log.warn('boanda.message can not return promise since jQuery is not defined!');
            return null;
        }

        return $.Deferred(function ($dfd) {
            $dfd.resolve();
        });
    };

    /**
     * 信息
     * @param message 消息
     * @param title 标题
     */
    boanda.message.info = function (message, title) {
        boanda.log.warn('boanda.message.info is not implemented!');
        return showMessage(message, title);
    };


    /**
     * 成功信息
     * @param message 消息
     * @param title 标题
     */
    boanda.message.success = function (message, title) {
        boanda.log.warn('boanda.message.success is not implemented!');
        return showMessage(message, title);
    };

    /**
     * 警告信息
     * @param message 消息
     * @param title 标题
     */
    boanda.message.warn = function (message, title) {
        boanda.log.warn('boanda.message.warn is not implemented!');
        return showMessage(message, title);
    };

    /**
     * 错误消息
     * @param message 消息
     * @param title 标题
     */
    boanda.message.error = function (message, title) {
        boanda.log.warn('boanda.message.error is not implemented!');
        return showMessage(message, title);
    };

    /**
     * 确认框
     * @param message 消息
     * @param titleOrCallback 标题或回调，
     */
    boanda.message.confirm = function (message, titleOrCallback, callback) {
        boanda.log.warn('boanda.message.confirm is not implemented!');

        if (titleOrCallback && !(typeof titleOrCallback == 'string')) {
            callback = titleOrCallback;
        }

        var result = confirm(message);
        callback && callback(result);

        if (!$) {
            boanda.log.warn('boanda.message can not return promise since jQuery is not defined!');
            return null;
        }

        return $.Deferred(function ($dfd) {
            $dfd.resolve();
        });
    };

    //[UI]

    boanda.ui = boanda.ui || {};

    boanda.ui.block = function (elm) {
        boanda.log.warn('boanda.ui.block is not implemented!');
    };

    boanda.ui.unblock = function (elm) {
        boanda.log.warn('boanda.ui.unblock is not implemented!');
    };

    // 弹出框
    boanda.win = boanda.win || {};

    // 弹出框，传递一个参数时，传递一个对象。传递三个参数，分别是弹出框页面地址,标题，弹出框关闭时的回调函数
    boanda.win.open = function (url, title, ondestroy) {
        boanda.log.warn('弹出框方法没有实现，请引入实现js');
    }

    boanda.win.alert = function (message, title, callback) {
        alert(message);
    }

    /**
     * 设置加载状态
     * @param elm html元素
     * @param optionsOrPromise
     */
    boanda.ui.setBusy = function (elm, optionsOrPromise) {
        boanda.log.warn('boanda.ui.setBusy is not implemented!');
    };

    /**
     * 取消加载状态
     * @param elm html元素
     */
    boanda.ui.clearBusy = function (elm) {
        boanda.log.warn('boanda.ui.clearBusy is not implemented!');
    };

    // [simple event bus]

    boanda.event = (function () {

        var _callbacks = {};

        var on = function (eventName, callback) {
            if (!_callbacks[eventName]) {
                _callbacks[eventName] = [];
            }

            _callbacks[eventName].push(callback);
        };

        var trigger = function (eventName) {
            var callbacks = _callbacks[eventName];
            if (!callbacks || !callbacks.length) {
                return;
            }

            var args = Array.prototype.slice.call(arguments, 1);
            for (var i = 0; i < callbacks.length; i++) {
                callbacks[i].apply(this, args);
            }
        };

        // Public interface  

        return {
            on: on,
            trigger: trigger
        };
    })();

    // [utils]

    boanda.utils = boanda.utils || {};

    /**
     * 创建命名空间
     * @param root 父命名空间
     * @param ns 命名空 utils.Js
     */
    boanda.utils.createNamespace = function (root, ns) {
        var parts = ns.split('.');
        for (var i = 0; i < parts.length; i++) {
            if (typeof root[parts[i]] == 'undefined') {
                root[parts[i]] = {};
            }

            root = root[parts[i]];
        }

        return root;
    };

    /**
   * 对数组去重
   * @param arr  数组
   */
    boanda.utils.unique = function (arr) {
        var ret = [];
        var hash = {};
        for (var i = 0; i < arr.length; i++) {
            var item = arr[i];
            var key = typeof (item) + item;
            if (hash[key] !== 1) {
                ret.push(item);
                hash[key] = 1;
            }
        }
        return ret;
    }

    /**
    * 防止Iframe内存溢出，清空Iframe占用的内存
    * @param validForm  需要验证的表单对象
    */
    boanda.utils.cleanIframe = function (iframe) {
        if (this.isEmpty(iframe) && iframe.length == 0) return;
        iframe = this.getObject(iframe);
        //清空iframe的内容
        iframe[0].contentWindow.document.write('');
        //避免iframe内存泄漏
        iframe[0].contentWindow.close();
        //删除iframe
        iframe.remove();
        //ie浏览器下回收内存
        if ($.browser.msie) {
            CollectGarbage();
        }
    }

    /**
    * 对Date的扩展，将 Date 转化为指定格式的String   
    * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
    * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)  
    *  例子：    
    *  (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
    *  (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18   
    *  @param fmt 格式
    */
    boanda.utils.dateFormat = function (date, fmt) {
        var o = {
            "M+": date.getMonth() + 1,                 //月份   
            "d+": date.getDate(),                    //日   
            "h+": date.getHours(),                   //小时   
            "m+": date.getMinutes(),                 //分   
            "s+": date.getSeconds(),                 //秒   
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
            "S": date.getMilliseconds()             //毫秒   
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o) if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

    /**
    * 拼接地址,如果原地址中包含?,则拼接&符号，否则拼接?
    * @param addr 需要拼接的地址
    * @param param 需要拼接的参数
    * @returns 返回拼接后的地址
    */
    boanda.utils.appendAddr = function (addr, param) {
        if (this.isEmpty(addr)) {
            this.alert("提示信息", "拼接地址为空或未定义！", "warning");
            return;
        }
        if (this.isEmpty(param)) return addr;
        return addr.indexOf("?") != -1 ? addr + "&" + param + "&" + this.getTime() : addr + "?" + param + "&" + this.getTime();
    }

    /**
    * 按enter键调用查询功能
    * @param evt Element
    * @param fn 回调函数
    */
    boanda.utils.enterSearch = function (evt, fn) {
        evt = (evt) ? evt : window.event;
        if (evt.srcElement.tagName == "INPUT") {
            if (evt.keyCode == 13) {
                if ($.isFunction(fn)) fn();
            }
        }
        return false;
    }

    /**
     * 获取url参数
     * @param name 参数名称
     * @returns 值
     */
    boanda.utils.getQueryString = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }

    /**
     * 验证JS对象为空
     * @param obj  需要验证的对象
     * @returns 验证结果
     */
    boanda.utils.isEmpty = function (obj) {
        if (typeof obj == 'object') return $.isEmptyObject(obj);
        obj = $.trim(obj);
        return (obj == undefined || obj == "" || obj == null);
    }

    /*
     * 格式化字符串
     */
    boanda.utils.formatString = function () {
        if (arguments.length < 1) {
            return null;
        }

        var str = arguments[0];

        for (var i = 1; i < arguments.length; i++) {
            var placeHolder = '{' + (i - 1) + '}';
            str = str.replace(placeHolder, arguments[i]);
        }

        return str;
    };

    /**
     * 汉字转拼音
     */
    boanda.utils.pinyin = function (value) {
        return {
            getFullChars: function (value) {
                return pinyin.getFullChars(this.value);
            },
            getCamelChars: function (value) {
                return pinyin.getCamelChars(this.value);
            }
        };
    }
    // 判断是否有jquery引用
    if (!$) {
        return;
    }

    //[jquery ajax]

    /*
     * ajax
     */
    boanda.ajax = function (userOptions) {
        userOptions = userOptions || {};

        var options = $.extend({}, boanda.ajax.defaultOpts, userOptions);

        // ajax MMDLID
        var menuId = boanda.utils.getQueryString("MMDLID");
        if (!(menuId == null || menuId == "")) {
            if (options.url.indexOf("?") == -1) {
                options.url = options.url + "?MMDLID=" + menuId;
            } else {
                options.url = options.url + "&MMDLID=" + menuId;
            }
        }

        options.success = undefined;
        options.error = undefined;

        return $.Deferred(function ($dfd) {
            $.ajax(options)
                .done(function (data) {
                    boanda.ajax.handleResponse(data, userOptions, $dfd);
                }).fail(function () {
                    $dfd.reject.apply(this, arguments);
                });
        });
    };
    boanda.ajax.errorMsg = "请求发生错误,请稍后再试";

    /*
     * ajax扩展
     */
    $.extend(boanda.ajax, {
        defaultOpts: {
            dataType: 'json',
            type: 'POST',
            contentType: 'application/json'
        },

        defaultError: {
            message: 'Ajax request did not succeed!',
            details: 'Error detail not sent by server.'
        },

        logError: function (error) {
            boanda.log.error(error);
        },

        showError: function (error) {
            if (error.details) {
                return boanda.message.error(error.details, error.message);
            } else {
                return boanda.message.error(error.message);
            }
        },

        handleTargetUrl: function (targetUrl) {
            if (!targetUrl) {
                location.reload();
            } else {
                location.href = targetUrl;
            }
        },

        handleUnAuthorizedRequest: function (messagePromise, targetUrl) {
            if (messagePromise) {
                messagePromise.done(function () {
                    boanda.ajax.handleTargetUrl(targetUrl);
                });
            } else {
                boanda.ajax.handleTargetUrl(targetUrl);
            }
        },

        handleResponse: function (data, userOptions, $dfd) {
            if (data) {
                if (!data.isSuccess) {
                    //console.log(data.data);
                    data.message = data.message || boanda.ajax.errorMsg;
                }
                $dfd && $dfd.resolve(data);
                userOptions.success && userOptions.success(data);
            } else { //no data sent to back
                $dfd && $dfd.resolve();
                userOptions.success && userOptions.success();
            }
        },

        blockUI: function (options) {
            if (options.blockUI) {
                if (options.blockUI === true) { //block whole page
                    boanda.ui.setBusy();
                } else { //block an element
                    boanda.ui.setBusy(options.blockUI);
                }
            }
        },

        unblockUI: function (options) {
            if (options.blockUI) {
                if (options.blockUI === true) { //unblock whole page
                    ab$$p.ui.clearBusy();
                } else { //unblock an element
                    boanda.ui.clearBusy(options.blockUI);
                }
            }
        }
    });

    /*
     * ajax From
     */
    if ($.fn.ajaxForm) {
        $.fn.AjaxForm = function (userOptions) {
            userOptions = userOptions || {};

            var options = $.extend({}, $.fn.abpAjaxForm.defaults, userOptions);

            options.beforeSubmit = function () {
                boanda.ajax.blockUI(options);
                userOptions.beforeSubmit && userOptions.beforeSubmit.apply(this, arguments);
            };

            options.success = function (data) {
                boanda.ajax.handleResponse(data, userOptions);
            };

            //TODO: Error?

            options.complete = function () {
                boanda.ajax.unblockUI(options);
                userOptions.complete && userOptions.complete.apply(this, arguments);
            };

            return this.ajaxForm(options);
        };

        $.fn.AjaxForm.defaults = {
            method: 'POST'
        };
    }

})(jQuery, $$);


