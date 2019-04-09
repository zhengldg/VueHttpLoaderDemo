"use strict";
/******************************************************************************
* Copyright (C) 2017 ShenZhen Powerdata Information Technology Co.,Ltd
* All Rights Reserved.
* 本软件为深圳博安达开发研制。未经本公司正式书面同意，其他任何个人、团体不得使用、
* 复制、修改或发布本软件.
*****************************************************************************/
/**
 * @desc app的公共动作放在这里,如等待框.
 */
angular.module("pd.action", [])
    .service("pdActionSvr", ["$q", function ($q) {

        if (!toastr) {
            return;
        }

        // option 默认设置
        toastr.options.positionClass = 'toast-bottom-right';
        var showNotification = function (type, message, title) {
            toastr[type](message, title);
        };

        /**
         * 显示原生等待框，
         * 如果已经存在一个等待框则修改等待框的信息否则生成一个新的等待框。
         * @param {any} message 等待框显示的信息
         * @param {any} flag 为false时，每次都生成一个新的等待框
         */
        this.showWait = function (message, flag) {
            
        }

        /**
         * 关闭等待框
         */
        this.closeWait = function () {
           
        }

        /**
         * 成功
         * @param {any} message 提示的消息
         * @param {any} title 标题
         */
        this.success = function (message, title) {
            toastr.options.timeOut = 2000;
            showNotification('success', message, title);
        }

        /**
         * 信息
         * @param {any} message 提示的消息
         */
        this.info = function (message, title) {
            toastr.options.timeOut = 2000;
            showNotification('info', message, title || "系统提示");
        }

        /**
          * 警告
          * @param {any} message 提示的消息
          */
        this.warn = function (message, title) {
            toastr.options.timeOut = 4000;
            showNotification('warn', message, title || '警告');
        }

        /**
         * 错误
         * @param {any} message
         */
        this.error = function (message, title) {
            toastr.options.timeOut = 5000;
            showNotification('error', message, title || '错误');
        }

        /**
         * 弹出框 return promise对象
         * @param { any } message 弹出框消息
         * @param { any } title 弹出框标头
         * @param { any } btnText 按钮文字
        */
        this.alert = function (message, title, btnText) {
            layer.alert(message);
        }

        /**
         * 弹出系统输入框 return promise对象
         * @param url:地址(必须)
         * @param title:弹出框标头（可选）
         * @param area: ['893px', '600px'] 弹出框大小
         */
        this.open = function (url, title, area) {
            var deferred = $q.defer();
            layer.open({
                type: 2,
                title: title,
                shadeClose: true,
                shade: false,
                maxmin: true, //开启最大化最小化按钮
                area: area||['850px', '450px'],
                content: url,
                yes: function (index, layero) {
                    deferred.resolve(layero);
                    layer.close(index);
                },
                cancel: function (index, layero) {
                    deferred.reject();
                }
            });

            return deferred.promise;
        }

        /**
         * 顶层弹出系统输入框 return promise对象
         * @param url:地址(必须)
         * @param title:弹出框标头（可选）
         * @param area: ['893px', '600px'] 弹出框大小
         * @param options: layer.open的可选参数
         */
        this.topOpen = function (url, title, area, options) {
            var deferred = $q.defer();
            var params = {
                type: 2,
                title: title,
                shadeClose: true,
                //shade: false,
                maxmin: true, //开启最大化最小化按钮
                area: area || ['850px', '450px'],
                content: url,
                yes: function (index, layero) {
                    deferred.resolve(layero);
                    layer.close(index);
                },
                cancel: function (index, layero) {
                    deferred.reject();
                }
            };
            angular.extend(params, options);
            top.layer.open(params);

            return deferred.promise;
        }

        /**
         * 显示确认框
         * @param 
         * options{
         * 	text:提示文本
         * 	title:提示标题
         *  btnArr:选择按钮(数组)
         *  btn0Cb:第一个按钮的回调
         *  btn1Cb:第二个按钮的回调
         * }
         */
        this.confirm = function (options) {
            var deferred = $q.defer();
            layer.confirm(options.message, {
                btn: options.btn || ['确定', '取消']
            }, function () {
                deferred.resolve();
            }, function () {
                deferred.reject();
            });
        };

        this.tab = function (option) {
            layer.tab(option);
        }
    }]);