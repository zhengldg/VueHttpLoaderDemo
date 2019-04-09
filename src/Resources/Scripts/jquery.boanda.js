/// <reference path="../Components/jquery/jquery-1.12.4.min.js" />

/**
* 公共js处理方法
*/
$.extend({
    boanda: {
        /**
        * 获得jQuery对象
        * @param obj 参数可#+id,[name=name]等所有jquery支持对象
        * @returns 返回jquery对象
        */
        getObject: function (obj) {
            return $.isPlainObject(obj) ? obj : $(obj);
        },

        /**
        * 验证JS对象为空
        * @param obj  需要验证的对象
        * @returns 验证结果
        */
        isEmpty: function (obj) {
            if (typeof obj == 'object') return $.isEmptyObject(obj);
            obj = $.trim(obj);
            return (obj == undefined || obj == "" || obj == null);
        },
        /**
        * 验证JS对象不为空
        * @param obj  需要验证的对象
        * @returns 验证结果
        */
        isNotEmpty: function (obj) {
            return !this.isEmpty(obj);
        },
        /**
        * @private
        * 生成随机数
        * @returns 随机数
        */
        random4: function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        },
        /**
        * 生成唯一的UUID
        * @returns UUID
        */
        UUID: function () {
            return (this.random4() + this.random4() + this.random4() + this.random4() + this.random4() + this.random4() + this.random4() + this.random4());
        },
        getQueryString: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        },
        /**
        * 得到当前毫秒数
        * @returns 毫秒数
        */
        getTime: function () {
            return new Date().getTime();
        },

        /**
        * 对cookie进行处理，IE8以下不支持 localStorage，使用jquery.cookie.js
        */
        localStorage: {
            getItem: function (name) {
                if (window.localStorage) return localStorage.getItem(name);
                else return $.cookie(name);
            },
            setItem: function (name, value) {
                if (window.localStorage) localStorage.setItem(name, value);
                else $.cookie(name, value);
            },
            removeItem: function (name) {
                if (window.localStorage) localStorage.removeItem(name);
                else $.removeCookie(name);
            }
        },
        /**
        * confirm提示框
        * @param title 标题
        * @param msg 提示信息
        * @param fun 回调方法
        * @returns 返回提示框
        */
        confirm: function (title, msg, fn) {
            top.mini.confirm(msg, title, function (action) {
                if (action == "OK") {
                    if (typeof fn == "function") {
                        fn();
                    };
                }
            });
        },

        /**
        * show提示框
        * @returns 返回提示框
        */
        show: function (msg, icon, timeout, fn) {
            var messageId = mini.showMessageBox({
                title: "系统提示",
                message: msg,
                iconCls: "mini-messagebox-info"
            });
            setTimeout(function () {
                mini.hideMessageBox(messageId);
                if (typeof fn == "function") {
                    fn();
                }
            }, timeout || 2000);
        },

        /**
        * error提示框
        * @returns 返回提示框
        */
        error: function (msg, timeout) {
            var messageId = mini.showMessageBox({
                title: "系统提示",
                message: msg,
                iconCls: "mini-messagebox-error"
            });
            setTimeout(function () {
                mini.hideMessageBox(messageId);
            }, timeout || 2000);
        },
        /**
      * success提示框
      * @returns 返回提示框
      */
        success: function (msg, timeout) {
            var messageId = mini.showMessageBox({
                title: "系统提示",
                message: msg,
                iconCls: "mini-messagebox-info"
            });
            setTimeout(function () {
                mini.hideMessageBox(messageId);
            }, timeout || 2000);
        },
        load: function () {
            mini.mask({
                el: document.body,
                cls: 'mini-mask-loading',
                html: '加载中...'
            });
        },
        loading: function () {
            return mini.loading("请稍等...", "加载中");
        }
        ,
        close: function (a) {
            mini.unmask(top.document.body);
            if (a != null) {
                mini.hideMessageBox(a);
            }
        },
        closeLoading: function () {
            mini.unmask(document.body);
        },
        closeAll: function (type) {
            mini.unmask(document.body);
        },
        alert: function (msg) {
            mini.alert(msg);
        },
        /**
        * alert提示框
        * @param title 标题
        * @param msg 提示信息
        * @param icon 图标样式 
        * @param fun 回调方法
        * @returns 返回提示框
        */
        alert: function (title, msg, icon, fn) {
            mini.alert(msg, title, fn);
        },

        /**
        * 改变皮肤
        * @param _skinName 标题
        * @param msg 提示信息
        * @param icon 图标样式 
        * @param fun 回调方法
        * @returns 返回提示框
        */
        changeSkin: function (_skinName) {
            var skinName = "default";
            if (_skinName == null) {
                skinName = _skinName;
            } else {
                skinName = $.cookie("mystyle");
            }
            if (skinName == null) {
                $("link[title='default']").removeAttr("disabled");
                $("#styles li#default").addClass("cur");
            } else {
                $("link[title='" + skinName + "']").removeAttr("disabled");
                $("#styles li[id='" + skinName + "']").addClass("cur");
                $("link[title!='" + skinName + "']").attr("disabled", "disabled");
            }
            //控制皮肤按钮
            $("#styles li").click(function () {
                var style = $(this).attr("id");
                $("link[title='" + style + "']").removeAttr("disabled");
                $("link[title!='" + style + "']").attr("disabled", "disabled");
                $.cookie("mystyle", style, { expires: 365 * 24 * 3600 * 1000 });
                $(this).addClass("cur").siblings().removeClass("cur");
            });

            if (_skinName == "default") {
                layer.config({
                    skin: 'layer-ext-seaning',
                    extend: 'skin/seaning/style.css'
                });
            } else if (_skinName == "blue") {
                layer.config({
                    skin: 'layer-ext-moon',
                    extend: 'skin/moon/style.css'

                });
            }
        },

        //设置遮蔽层，并提供消息展示
        setCoverAndMessage: function (IsCover, Message) {
            if (IsCover) {
                if (Message == undefined || Message == null || Message == "") {
                    Message = "正在加载，请稍候...";
                }
                $("<div id='bodyStyle'></div>").appendTo("body");
                $("<div class=\"cover-mask\"></div>").css({ display: "block", width: "100%", height: $(window).height() }).appendTo("#bodyStyle");
                $("<div class=\"cover-mask-msg\"></div>").html(Message).appendTo("#bodyStyle").css({ display: "block", left: ($(document.body).outerWidth(true) - 190) / 2, top: ($(window).height() - 45) / 2 });
            }
            else {
                $('#bodyStyle > div.cover-mask').remove();
                $('#bodyStyle > div.cover-mask-msg').remove();
            }
        },
        /**
        * 把form表单的元素转换成属性与值对应
        * @param eleForm 表单的id号，格式：#+元素id号, 或对象
        **/
        formatElement: function (eleForm) {
            var beanForm = this.getObject(eleForm);
            var eleArray = beanForm.serializeArray();
            if (eleArray != '') {
                var eleObj = {};
                for (var i = 0; i < eleArray.length; i++) {
                    eleObj[eleArray[i].name] = eleArray[i].value;
                }
                return eleObj;
            }
            return {};
        },

        /***格式化元素中的input信息**/
        formatInputElement: function (el) {
            var obj = {};
            $("input", el).each(function () {
                var key = this.name;
                var value = this.value;
                obj[key] = value;
            });
            return obj;
        },

        /**
        * 把json对象数据赋值给表单元素，表单元素的名称要与json的属性名称一致
        * @param eleForm 表单的id号，格式：#+元素id号, 或对象
        * @data 		json对象
        **/
        serializeElement: function (eleForm, data) {
            var beanForm = this.getObject(eleForm);
            var eleArray = beanForm.serializeArray();
            if (eleArray != '') {
                for (var i = 0; i < eleArray.length; i++) {
                    var name = eleArray[i].name;
                    if (this.isNotEmpty(data[name])) beanForm.find("input[name='" + name + "']").val(data[name]);
                }
            }
        },

        /***
        * 显示格式化后的HTMLtooltip
        * @param el 需要显示tooltip的控件
        * @param direction 显示的方向
        */
        tooltipSubp: function (el, direction) {
            var obj = this.getObject(el);
            direction = direction || 'top';
            obj.each(function () {
                $(this).tooltip({
                    position: direction,
                    onShow: function () {
                        var value = this.convertSubpToHtml(this.value);
                        $(this).tooltip("update", value);
                    }
                });
            });
        },

        /***
        * 把字符串中的@符号后的字符变成下标，把^符号后的字符变成上标
        */
        convertSubpToHtml: function (str) {
            if (!str) return '';
            while (str.indexOf('@') != -1) {
                var index = str.indexOf('@');
                var num = str.charAt(index + 1);
                str = str.replace('@' + num, '<sub>' + num + '</sub>');
            }
            while (str.indexOf('^') != -1) {
                var index = str.indexOf('^');
                var subIndex = str.indexOf("</sub>");
                var ch = str.charAt(index + 1);
                if (subIndex > -1 && index - subIndex == 6) {
                    str = str.replace('^' + ch, '<sup style=\"position:relative;left:-7px;top:-2px\">' + ch + '</sup>');
                } else {
                    str = str.replace('^' + ch, '<sup>' + ch + '</sup>');
                }
            }
            return str;
        },
        /**
        * 阻止事件冒泡
        * 
        * @param eve 事件对象
        */
        stopEvent: function (eve) {
            var ev = window.event || eve;
            if (ev && ev.stopPropagation) {
                //W3C取消冒泡事件
                ev.stopPropagation();
            } else {
                //IE取消冒泡事件
                ev.cancelBubble = true;
            }
        },

        /**
        * 设置字体字号大小
        * 
        * @param objName 字体样式名称
        */
        setFontSize: function (objName) {
            var vRelName = objName == "" ? "commonSmall" : objName;
            var vFrame = $('#index').find('iframe');
            if (vFrame.length > 0) {
                setFontAll(vFrame.contents().find('link[rel=stylesheet]'), vRelName);
            }
            if (vFrame.contents().find('iframe').length > 0) {
                setFontAll(vFrame.find('iframe').contents().find('link[rel=stylesheet]'), vRelName);
            }
            setFontAll($('link[rel=stylesheet]'), vRelName);
            this.localStorage.setItem("20140801101612db59108a321a4894bac26a7fd9202216", vRelName);

            function setFontAll(obj, vRelName) {
                obj.each(function () {
                    var vName = $(this).attr('href');
                    vName = vName.substring(vName.lastIndexOf('/') + 1, vName.length);
                    if (vName == "commonSmall.css" || vName == "commonMiddle.css" || vName == "commonBig.css") {
                        var ss = $(this).attr('href').substring(0, $(this).attr('href').lastIndexOf('/') + 1);
                        $(this).attr('href', ss + vRelName + '.css');
                    }
                });
            }
        },

        /**
        * 对数组去重
        * @param arr  数组
        */
        unique: function (arr) {
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
        },

        /**
        * 操作panel，新增或编辑
        * @param oper 操作 add or edit
        * @param
        * @param params 新增或编辑需要的参数，参数为JSON格式，
        *		如：{datagrid:'#datagrid',panel:'#panel',basicUrl:'${ctx}/pages/platform/demo.jsp',param:'YHMC=SYSTEM'}
        *		参数 datagrid: 	代表添加时需要清空选择的datagrid表格
        *			basicUrl： 	代表基本路径
        *			param:		代表连接时需要的参数
        *			panel: 		需要操作的面板
        */
        operPanel: function (oper, params) {
            if (this.isNotEmpty(params)) {
                var $panel = params.panel;
                $panel = this.getObject($panel);
                var path = $panel.panel("options").basicUrl;
                path = this.isEmpty(path) ? params.basicUrl : path;
                var $table = params.datagrid, param = params.param;
                if ("add" == oper) {
                    $table = this.getObject($table);
                    $table.datagrid("clearSelections");
                    $panel.panel("refresh", this.appendAddr(path, param));
                } else if ("edit" == oper) {
                    $panel.panel("refresh", this.appendAddr(path, param));
                } else {
                    $panel.panel("refresh", this.appendAddr(path, param));
                }
            }
        },

        /**
        * 防止Iframe内存溢出，清空Iframe占用的内存
        * @param validForm  需要验证的表单对象
        */
        cleanIframe: function (iframe) {
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
        },

        /**
        * 拼接地址,如果原地址中包含?,则拼接&符号，否则拼接?
        * @param addr 需要拼接的地址
        * @param param 需要拼接的参数
        * @returns 返回拼接后的地址
        */
        appendAddr: function (addr, param) {
            if (this.isEmpty(addr)) {
                this.alert("提示信息", "拼接地址为空或未定义！", "warning");
                return;
            }
            if (this.isEmpty(param)) return addr;
            return addr.indexOf("?") != -1 ? addr + "&" + param + "&" + this.getTime() : addr + "?" + param + "&" + this.getTime();
        },

        /**
        * 更改Iframe访问地址,通过basicUrl属性的值与params参数拼接出新的地址
        * @param iframe iframe对象
        * @param parame 初始化的参数
        */
        changeIframeSrc: function (iframe, params) {
            iframe = this.getObject(iframe);
            iframe.attr("src", this.appendAddr(iframe.attr("basicUrl"), params));
        },

        /**
        * 加入收藏
        */
        addFavorites: function () {
            try {
                window.external.AddFavorite(window.location.href, document.title)
            } catch (e) {
                try {
                    window.sidebar.addPanel(document.title, window.location, "");
                } catch (e) {
                    this.alert("提示信息", "加入收藏失败，请使用Ctrl+D进行添加", "info");
                }
            }
        },

        /**
        * @private
        */
        forms: "#autoform", values: "",
        /**
        * 将页面的初始值保存到JSON中缓存，监控页面数据时使用
        * @param forms 需要监控的form对象，默认为id为“autoform”的的表单，如果有多个表单对象需要验证
        * 	多个参数间需要用“,”分割，如："#autoform_1,form[name=autoform_2]"
        * 	参数为jQuery支持的对象
        */
        monitorDataChange: function (_forms) {
            this.values = {};
            var names = new Array();
            if (this.isNotEmpty(forms)) this.forms = _forms;
            var $form = this.getObject(this.forms);
            if ($form.length > 1) {
                $form.each(function (index, value) {
                    getInitValue(value);
                });
            } else {
                getInitValue(this.forms);
            }

            /**
            * 将元素值放入JSON中，此方法不对外使用
            * @param form 需要入值的form对象
            */
            function getInitValue(form) {
                var json = this.formatElement(form);
                this.values[form] = json;
            }
        },

        /**
        * 获取页面数据是否已经改变
        */
        isChange: function () {
            var change = false;
            var $form = this.getObject(this.forms);
            if ($form.length > 1) {
                $form.each(function (index, value) {
                    if (isChangeValue(value)) { change = true; return; }
                });
            } else {
                if (isChangeValue(this.forms)) { return true; }
            }
            return change;

            /**
            * 比较值是否改变，此方法不对外使用
            * @param form form对象
            */
            function isChangeValue(form) {
                var json = this.formatElement(form);
                var values = this.values[form];
                var change = false;
                $.each(values, function (key, value) {
                    if (json[key] != value) {
                        change = true;
                        return;
                    }
                });
                return change;
            }
        },

        /**
        * 根据输入框的值查询并改变select的值，可根据首字母，拼音，汉字查询select中的值
        * @param select 下拉框对象，可支持ID等多种方式，jquery能取到些对象即可,如：#select
        * @param content 输入框对象，可支持ID等多种方式，jquery能取到些对象即可, 如: #content
        */
        searchSelect: function (select, content) {
            var $select = this.getObject(select);
            var $content = this.getObject(content);
            var $options = $select.find("option"), $value, $text, datas = "[";
            $options.each(function (index, data) {
                $value = $(data).val(); $text = $(data).text();
                datas += '{"value":"' + $value + '","text":"' + $text + '","textPy":"' + $text.toPinYin() + '","textSzm":"' + $text.toShouZiMu() + '"},';
            });
            if ($options.length > 0) {
                datas = datas.substring(0, datas.length - 1);
            }
            datas += "]";
            datas = eval("(" + datas + ")");
            $content.live("keyup", function () {
                var $inputVal = $.trim($(this).val()).toLowerCase();
                var options = "";
                $(datas).each(function (index, data) {
                    if (data["textPy"].startWith($inputVal) || data["textSzm"].startWith($inputVal) || data["text"].startWith($inputVal)) {
                        options += '<option value="' + data["value"] + '">' + data["text"] + '</option>';
                    }
                    if (this.isEmpty($inputVal)) {
                        options += '<option value="' + data["value"] + '">' + data["text"] + '</option>';
                    }
                });
                $select.html(""); $select.html(options);
            });
        },

        /**
        * 对Date的扩展，将 Date 转化为指定格式的String   
        * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
        * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)  
        *  例子：    
        *  (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
        *  (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18   
        *  @param fmt 格式
        */
        dateFormat: function (date, fmt) {
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
        },
        /**
        * 根据指定的时间或指定间隔前的时间(cycle > 0)，得到指定前的时间（cycle < 0）
        * 如，得到指定间隔后的时间：time = "2014-03-10", cycle = 1, unit = "year", 返回结果 2015-03-10
        * 如，得到指定间隔前的时间：time = "2014-03-10", cycle = -1, unit = "year", 返回结果 2013-03-10
        * 
        * @param 	time 初始时间， 默认为当前时间
        * @param 	cycle 周期
        * @param 	unit 时间单位，默认为"year",可取值（ year:年，month:月，week:周，day:天，hour:时，minute:分，second:秒）
        * @param	format 格式化，默认"yyyy-MM-dd HH:mm:ss"
        * @return 	计算后的日期（字符串格式）
        * 
        * @author 	江梁斌
        * @version 2014-03-10
        * @since 	V0.1.0
        */
        getAfterByTime: function (time, cycle, unit, format) {
            var date = new Date();
            if (this.isEmpty(time)) {
                time = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
					+ " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
            }
            if (this.isEmpty(cycle)) cycle = 0;
            if (this.isEmpty(unit)) unit = "year";
            if (this.isEmpty(format)) format = "yyyy-MM-dd hh:mm:ss";
            date = new Date(time);
            return date.dateAdd(unit, cycle).dateFormat(format);
        },
        /**
        * 按enter键调用查询功能
        */
        enterSearch: function (evt, fn) {
            evt = (evt) ? evt : window.event;
            if (evt.srcElement.tagName == "INPUT") {
                if (evt.keyCode == 13) {
                    if ($.isFunction(fn)) fn();
                }
            }
            return false;
        },

        /**
        * 用户输入值进行提示
        * 
        *  @param obj 需要添加提示条件的对象
        *  @param param {position:['top'|'left'|'right'|'bottom'],width:宽度,height:高度,top:距上距离，left:距左距离，bodyStyle:面板样式}
        */
        tooltip: function (obj, param) {
            obj = this.getObject(obj);
            if (obj.length > 0) {
                var param = param || {};
                obj.bind("keydown focus keyup", function (e) {
                    e.stopPropagation();
                    var el = this;
                    var h1 = $(el)._outerHeight();
                    var position = "bottom" || param.position;
                    var top = $(el).offset().top;
                    var left = $(el).offset().left;
                    var width = $(el).width() || param.width;
                    var height = 30 || param.height;
                    //var bodyStyle = $.extend({color:'#fff',fontWeight:'bold',fontFamily:'微软雅黑',fontSize:20,padding:'5px',textAlign:'center',border: "solid 1px #CCCCCC",background: "#00AFE8"},param.bodyStyle || {});
                    var bodyStyle = $.extend({ color: '#FB6902', fontWeight: 'bold', fontFamily: '微软雅黑', fontSize: 22, padding: '0', textAlign: 'center', border: "solid 1px #dfdfdf", background: "#fff" }, param.bodyStyle || {});
                    switch (position) {
                        case "right":
                            left += $(el)._outerWidth() + 1;
                            break;
                        case "left":
                            left -= $(el)._outerWidth();
                            break;
                        case "top":
                            top -= $(el)._outerHeight() + 5;
                            break;
                        case "bottom":
                            top += $(el)._outerHeight();
                            break;
                    }
                    //自定义显示位置
                    left = param.left || left;
                    top = param.top || top;
                    var defaultStyle = { top: top, left: left, position: 'absolute', zIndex: 9999999, 'min-height': height, 'width': '500px' };
                    var tipDiv = $(".msg-toolTip");
                    if (tipDiv.length < 1) {
                        tipDiv = $('<div class= "msg-toolTip" style="box-shadow: 0px 2px 3px #dfdfdf;-moz-border-radius:10px; -webkit-border-radius:10px;border-radius:10px;word-break: break-all;"></div>').appendTo($(window.parent.parent.parent.document).find("body").first());
                    }
                    tipDiv.text($(el).val());
                    var css = $.extend({}, bodyStyle, defaultStyle);
                    tipDiv.css(css);
                    if (param.left == undefined) {
                        if (position == "top" || position == "bottom") {
                            if (tipDiv.width() > width) {
                                var tempWidth = (tipDiv.width() - width) / 2;
                                var _left = tipDiv.offset().left - tempWidth;
                                tipDiv.css({ left: _left > 0 ? _left : 0 });
                            }
                        }
                    }
                    tipDiv.show();
                }).bind("blur", function (e) {
                    $(window.parent.parent.parent.document).find("body").first().find(".msg-toolTip").hide().remove;
                });
            }
        },

        /**
        * 字段中加"*"号的添加验证。
        * @param forms 需要验证的form，默认为页面中最后一个form。多个form可通过","分隔。如:"#form1,#form2"
        */
        isValidate: function (forms) {
            var names = new Array();
            if (this.isEmpty(forms)) {
                check($('form').last());
            } else {
                forms = this.getObject(forms);
                if (forms.length > 1) {
                    forms.each(function () {
                        check(this);
                    });
                } else {
                    check(forms);
                }
            }

            /**
            * 将元素值放入JSON中，此方法不对外使用
            * @param form 需要入值的form对象
            */
            function check(form) {
                var tempForm = this.getObject(form), validCls = "easyui-validatebox";

                /**
                * 遍历form下可见input控件
                */
                tempForm.find("input:visible").each(function () {
                    var $this = $(this);
                    var type = $this.attr("type") ? $this.attr("type") : "text";
                    var name = $this.attr("name");
                    var label = returnLabel($this);
                    if ("radio" == type) {
                        if (label != null && "*" === label.charAt(0)) {
                            if (!isExistName(name)) {
                                $("input:radio[name=" + name + "]").each(function () {
                                    addValidCls($(this), "radio");
                                });
                            }
                        }
                    } else if ("checkbox" == type) {
                        if (label != null && "*" === label.charAt(0)) {
                            if (!isExistName(name)) {
                                $("input:checkbox[name=" + name + "]").each(function () {
                                    addValidCls($(this), "checkbox");
                                });
                            }
                        }
                    } else if ("text" == type || "password" == type || "file" == type) {
                        addValidCls($this);
                    }
                });


                /**
                * 遍历form下可见的select控件
                */
                tempForm.find("select:visible").each(function () {
                    addValidCls($(this));
                });

                /**
                * 遍历form下可见的textarea控件
                */
                tempForm.find("textarea:visible").each(function () {
                    addValidCls($(this));
                });

                /**
                * 添加验证样式与必填属性
                */
                function addValidCls(obj, type) {
                    var label = returnLabel(obj);
                    if (label != null && "*" === label.charAt(0)) {
                        var thisClass = obj.attr("class");
                        if (thisClass == undefined || thisClass.indexOf("easyui-") < 0) {
                            obj.addClass(validCls);
                        }
                        if (obj.attr("data-options")) {
                            var opts = obj.attr("data-options");
                            if ("checkbox" == type || "radio" == type) {
                                obj.attr("data-options", "validType:'checked'," + opts);
                            } else {
                                obj.attr("data-options", "required:true," + opts);
                            }
                        } else {
                            if ("checkbox" == type || "radio" == type) {
                                obj.attr("validType", "checked");
                            } else {
                                obj.attr("required", true);
                            }
                        }
                    }
                }

                /**
                * 返回文本控label中的text
                */
                function returnLabel(obj) {
                    return this.getObject(obj).parents("td").prev("td").text();
                }
            }


            /**
            * @private
            * 判断JSON数据中是否存在name，此方法不对外使用。
            * @name 需要验证的name属性
            * @return true 存在  false 不存在
            */
            function isExistName(name) {
                if (names.length == 0) {
                    names.push(name);
                    return false;
                }
                $(names).each(function (index, data) {
                    if (name != data) {
                        names.push(name);
                        return false;
                    }
                });
                return true;
            }
        },

        /**
        * 对表单数据进行自动填充
        * @param 填充数据的json数据
        * @param 不需要填充数据的name，多个用“,”连接
        * @param 需要填充数据的表单，多个用“,”连接
        */
        fillForm: function (data, exceptName, form) {
            if (data) {
                var $form = form ? this.getObject(form) : $("form").last();
                exceptName = exceptName ? exceptName.split(",") : [];
                for (var i = 0; i < exceptName.length; i++) {
                    delete data[exceptName[i]];
                }

                $form.find("select,textarea,input").each(function () {
                    var name = $(this).attr("name");
                    if (data[name] != undefined) {
                        var typeName = $(this).attr("type") || this.type;

                        if (typeof data[name] == "object" && data[name].time) {
                            var date = new Date(data[name].time);
                            var value = date.dateFormat("yyyy-MM-dd");
                            $(this).val(value);
                            $(this).prevAll("input").first().val(value);
                        } else if (typeName == "radio") {
                            $form.find("input[name=" + name + "]").each(function () {
                                if ($(this).val() === data[name]) {
                                    $(this).attr("checked", true);
                                }
                            });
                        } else if (typeName == "checkbox") {
                            $table.find("input[name=" + name + "]").each(function () {
                                $this = $(this);
                                var tempValue = data[name] || "";
                                tempValue = tempValue.split(",");
                                for (var i = 0; i < tempValue; i++) {
                                    if ($this.val() == tempValue[i]) {
                                        $this.attr("checked", true);
                                    }
                                }
                                if ($(this).val() === data[name]) {
                                    $(this).attr("checked", true);
                                }
                            });
                        } else if (typeName == "hidden") {
                            var $nbox = $(this).prev(".easyui-numberbox");
                            var $cbox = $(this).parent('span').prev();
                            if ($nbox.length > 0) {
                                $nbox.numberbox("setValue", data[name]);
                            } else if ($cbox.length > 0 && $cbox.hasClass("combobox-f")) {
                                $cbox.combobox("setValue", data[name]);
                            } else {
                                $(this).val(data[name]);
                            }
                        } else if (typeName == "select-one") {
                            $(this).val(data[name]).trigger('change');
                        } else {
                            $(this).val(data[name]);
                        }
                    }
                });
            }
        },
        post: function (ajaxUrl, ajaxData, callBack, async) {
            var ajaxSetting = {
                async: async || false,
                type: "POST",
                url: ajaxUrl,
                data: JSON.stringify(ajaxData),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    if (callBack != null) {
                        callBack(data);
                    }
                    $.boanda.closeLoading();
                }
            };
            this.ajax(ajaxSetting);
        },
        get: function (ajaxUrl, ajaxData, callBack, async) {
            var ajaxSetting = {
                async: async || false,
                type: "GET",
                url: ajaxUrl,
                data: JSON.stringify(ajaxData),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    if (callBack != null) {
                        callBack(data);
                    }
                    $.boanda.closeLoading();
                }
            };
            this.ajax(ajaxSetting);
        },

        ajax: function (tagret) {
            this.load();
            var ajaxSetting = {
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                error: function () {
                    $.boanda.closeLoading();
                    try {
                        if (this.error.arguments[0].responseText != null) {
                            $.boanda.error(this.error.arguments[0].responseText);
                        }
                    } catch (e) {
                        $.boanda.error("提交出错，请重新提交或联系系统管理员!");
                    }
                }
            };
            // ajax MMDLID
            var menuId = $.boanda.getQueryString("MMDLID");
            if (!(menuId == null || menuId == "")) {
                if (tagret.url.indexOf("?") == -1) {
                    tagret.url = tagret.url + "?MMDLID=" + menuId;
                } else {
                    tagret.url = tagret.url + "&MMDLID=" + menuId;
                }
            }

            ajaxSetting = $.extend(ajaxSetting, tagret);
            $.ajax(ajaxSetting);
        }
    }
});

