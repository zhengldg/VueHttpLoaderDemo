/// <reference path="jquery-1.12.4.min.js" />

(function ($, $$) {
    $$.webRoot = "/web"
    $$.token = "ce59f33c-8d43-4e28-a4a5-a1e1dfbd72ca"
    $$.Control = $$.Control || {};
    $$.Page = $$.Page || {};
    $$.Page.rows = 10;
    $$.Page.current = 1;
    $$.Page.addParams = function (params) {
        params['rows'] = $$.Page.rows;
        params['page'] = $$.Page.current;
        return params;
    };
    $$.Page.up = function () {
        this.to(this.current - 1);
    }
    /** 下一页*/
    $$.Page.down = function () {
        this.to(this.current + 1);
    }
    /**跳转到指定页*/
    $$.Page.to = function (pageNum) {
        this.current = pageNum;
        PageTo();
    }
    /**展示分页*/
    $$.Page.show = function (total) {
        if (total > this.rows) {
            $(".page").empty();
            var pageSize = Math.ceil(total / this.rows);
            var pageBtnHtml = '<input class="pageBtn" type="button" id="pageup" value="上一页" onclick="Page.up()" />';
            pageBtnHtml += '<input class="pageBtn" type="button" id="pagedown" value="下一页" onclick="Page.down()" />';
            pageBtnHtml += '(页：<span id="currentPage">' + Page.current + '</span>/<span id="pageSize">' + pageSize + '</span>';
            pageBtnHtml += '记录数：<span id="total">' + total + '</span>)';
            $(".page").append(pageBtnHtml);
            $("#pageup").attr("disabled", this.current == 1 ? true : false);
            $("#pagedown").attr("disabled", this.current == pageSize ? true : false);
            $(".pageBtn").hover(function () {
                if (!$(this).attr("disabled")) $(this).addClass("pageBtnHover");
            }, function () {
                if (!$(this).attr("disabled")) $(this).removeClass("pageBtnHover");
            });
            $(".page").show();
        } else {
            this.hide();
        }
    }
    /**隐藏分页*/
    $$.Page.hide = function () {
        this.current = 1;
        $(".page").empty();
        $(".page").hide();
    }
    /**初始化*/
    $$.Control.init = function () {
        this.initFormControl();
        this.initDropdownControl();
    }
    /**初始化表单控件*/
    $$.Control.initFormControl = function () {
        $(".formControl").each(function () {
            var control = $(this);
            var placeword = control.attr("placeword");
            control.val(placeword);
            control.bind("click", function () {
                control.addClass("formControlFocus");
                if ($(this).attr("placeword") == control.val()) {
                    control.val("");
                }
            }).blur(function () {
                if (control.val() == "") {
                    control.removeClass("formControlFocus");
                    control.val($(this).attr("placeword"));
                }
            });
        });
    }
    /**初始化下拉控件*/
    $$.Control.initDropdownControl = function () {
        $(".dropdownControl").each(function () {
            var dropdownControl = $(this);
            var formControl = dropdownControl.attr("formControl");
            var loadMethod = dropdownControl.attr("loadMethod");
            var loadTag = dropdownControl.attr("loadTag");
            var all = dropdownControl.attr("all");
            var initClick = dropdownControl.attr("initClick");
            var initValue = dropdownControl.attr("initValue");
            var id = dropdownControl.attr("flag");
            var allContent = "";
            if (all != "false") allContent = "全部";
            var dropdownContent = '<div class="dropdown-wrapper">';
            dropdownContent += '   <span class="dropdown-btn"></span>';
            if (formControl != undefined) {
                $(formControl).addClass("dropdown-text");
                dropdownContent += $(formControl)[0].outerHTML;
                $(formControl).remove();
            } else {
                dropdownContent += '   <input type="text" class="dropdown-text" id="' + id + '" value="' + allContent + '" readonly="readonly"/>';
            }
            dropdownContent += '   <div class="dropdown-list">';
            if (all != "false") dropdownContent += '<p  class="dropdown-li" onclick="' + all + '">' + allContent + '</p>';
            dropdownContent += '   </div>';
            dropdownContent += '</div>';
            dropdownControl.append(dropdownContent);
            if (formControl != undefined) {
                $(formControl).attr("defaultPlaceword", $(formControl).attr("placeword"));
                Control.initFormControl();
            }
            var dropdownWidth = dropdownControl.width();
            var dropdownWrapper = dropdownControl.find(".dropdown-wrapper");
            var dropdownList = dropdownControl.find(".dropdown-list");
            var dropdownBtn = dropdownControl.find(".dropdown-btn");
            var dropdownText = dropdownControl.find(".dropdown-text");
            if (loadMethod != undefined) {
                var loadtext = eval(loadMethod);
                dropdownList.append(loadtext);

            }
            if (loadTag != undefined) {
                dropdownList.append($(loadTag).html());
                $(loadTag).remove();
            }
            dropdownList.width(dropdownWidth);
            //设置dropdownList的高度
            var _winHeight = $(window).height();
            var _top = dropdownList.offset().top;
            var _height = dropdownList.children().length * 20;

            if (_winHeight - _top - 30 < _height) {
                dropdownList.css({ 'height': (_winHeight - _top - 30), 'overflow': 'auto' });
            }
            dropdownWrapper.width(dropdownWidth);
            dropdownText.width(dropdownWidth).css({ 'height': '16px', 'line-height': '16px' });
            dropdownBtn.css("left", (dropdownWidth - 14) + "px");
            var dropdownLi = dropdownControl.find(".dropdown-li");
            dropdownWrapper.hover(function (e) {
                if (!$.support.leadingWhitespace) {
                    if (_winHeight - e.clientY < _height) {
                        dropdownList.css({ 'height': (_winHeight - e.clientY - 40), 'overflow': 'auto' });
                    }
                }
                // if ($.browser.msie && ($.browser.version == "7.0")) {
                //     if (_winHeight - e.clientY < _height) {
                //         dropdownList.css({ 'height': (_winHeight - e.clientY - 40), 'overflow': 'auto' });
                //     }
                // }
                dropdownList.show();
                dropdownList.children().each(function () {
                    if (typeof ($(this).attr('unde')) != 'undefined') {
                        $(this).addClass('dropdown-hover');
                    }
                });
            }, function () {
                dropdownList.hide();
            });
            dropdownLi.hover(function () {
                $(this).siblings().removeClass('dropdown-hover');
                $(this).addClass('dropdown-hover');
            }, function () {
                $(this).removeClass('dropdown-hover');
            }).bind("click", function () {
                dropdownText.val($(this).text());
                if (formControl != undefined) $(formControl).val($(this).text()).attr("placeword", $(this).text());
                $(this).addClass('dropdown-hover').attr('unde', 'unde');
                $(this).siblings().removeClass('dropdown-hover').removeAttr('unde');
                dropdownList.hide();
                var onclick = $(this).attr("onclick");
                if (onclick != "") {
                    $(this).attr("clickEvent", onclick);
                    $(this).attr("onclick", "");
                }
                var clickEvent = $(this).attr("clickEvent");
                eval(clickEvent);
            });
            if (initValue != undefined) {
                dropdownText.val($(initValue).text());
                $(initValue).addClass('dropdown-hover').attr('unde', 'unde');
                $(initValue).siblings().removeClass('dropdown-hover').removeAttr('unde');
            }
            if (initClick != undefined) $(initClick).click();
        });
    }
    /**得到控件值*/
    $$.Control.getValue = function (id) {
        var queryObj = $(id);
        var placeword = queryObj.attr("placeword");
        var controlValue = queryObj.val();
        if (controlValue == placeword) {
            return "";
        }
        return controlValue;
    }


    /* utils ***************************************************/

    $$.utils = $$.utils || {};

    /* Creates a name namespace.
    *  Example:
    *  var taskService = abp.utils.createNamespace(abp, 'services.task');
    *  taskService will be equal to abp.services.task
    *  first argument (root) must be defined first
    ************************************************************/
    $$.utils.createNamespace = function (root, ns) {
        var parts = ns.split('.');
        for (var i = 0; i < parts.length; i++) {
            if (typeof root[parts[i]] == 'undefined') {
                root[parts[i]] = {};
            }

            root = root[parts[i]];
        }

        return root;
    };

    $$.utils.formatString = function () {
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

    if (!$) {
        return;
    }

    /* JQUERY ENHANCEMENTS ***************************************************/

    // abp.ajax -> uses $.ajax ------------------------------------------------

    $$.ajax = function (userOptions) {
        userOptions = userOptions || {};

        var options = $.extend({}, $$.ajax.defaultOpts, userOptions);
        options.success = undefined;
        options.error = undefined;

        return $.Deferred(function ($dfd) {
            $.ajax(options)
                .done(function (data) {
                    $$.ajax.handleResponse(data, userOptions, $dfd);
                }).fail(function () {
                    $dfd.reject.apply(this, arguments);
                });
        });
    };
    $$.ajax.errorMsg = "请求发生错误,请稍后再试";

    $.extend($$.ajax, {
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
            $$.log.error(error);
        },

        showError: function (error) {
            if (error.details) {
                return $$.message.error(error.details, error.message);
            } else {
                return $$.message.error(error.message);
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
                    $$.ajax.handleTargetUrl(targetUrl);
                });
            } else {
                $$.ajax.handleTargetUrl(targetUrl);
            }
        },

        handleResponse: function (data, userOptions, $dfd) {
            if (data) {
                if (!data.isSuccess) {
                    console.log(data.data);
                    data.message = data.message || $$.ajax.errorMsg;
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
                    $$.ui.setBusy();
                } else { //block an element
                    $$.ui.setBusy(options.blockUI);
                }
            }
        },

        unblockUI: function (options) {
            if (options.blockUI) {
                if (options.blockUI === true) { //unblock whole page
                    ab$$p.ui.clearBusy();
                } else { //unblock an element
                    $$.ui.clearBusy(options.blockUI);
                }
            }
        }
    });

    if ($.fn.ajaxForm) {
        $.fn.AjaxForm = function (userOptions) {
            userOptions = userOptions || {};

            var options = $.extend({}, $.fn.abpAjaxForm.defaults, userOptions);

            options.beforeSubmit = function () {
                $$.ajax.blockUI(options);
                userOptions.beforeSubmit && userOptions.beforeSubmit.apply(this, arguments);
            };

            options.success = function (data) {
                $$.ajax.handleResponse(data, userOptions);
            };

            //TODO: Error?

            options.complete = function () {
                $$.ajax.unblockUI(options);
                userOptions.complete && userOptions.complete.apply(this, arguments);
            };

            return this.ajaxForm(options);
        };

        $.fn.AjaxForm.defaults = {
            method: 'POST'
        };
    }

})(jQuery, window);
