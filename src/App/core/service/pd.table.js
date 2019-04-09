"use strict";
/******************************************************************************
 * Copyright (C) 2017 ShenZhen Powerdata Information Technology Co.,Ltd
 * All Rights Reserved.
 * 本软件为深圳博安达开发研制。未经本公司正式书面同意，其他任何个人、团体不得使用、
 * 复制、修改或发布本软件.
 *****************************************************************************/
/**
 * @desc 发起请求的服务,该模块需要在顶级模块定义常量TIMEOUT,SERVICEPATH 
 */
angular.module("pd.table", ["pd.action"])
    .service("pdTableSvr", ["$q", "pdActionSvr", "$http", function ($q, pdActionSvr, $http) {
        this.render = function (option) {
            var defaultOption = {
                height: 'full-60', 
                method: "post",
                page: true,
                //request: {
                //    pageName: 'pageIndex',
                //    limitName: 'pageSize' //每页数据量的参数名，默认：limit
                //},
                response: {
                    statusName: 'isSuccess', //数据状态的字段名称，默认：code
                    statusCode: null,       //成功的状态码，默认：0
                    msgName: 'message',    //状态信息的字段名称，默认：msg
                    countName: 'Total',    //数据总数的字段名称，默认：count
                    dataName: 'Items'     //数据列表的字段名称，默认：data
                }
            };
            option = angular.extend(defaultOption, option);
            if (option.url == null) {
                throw "table option.url is null";
            }

            var table = layui.table.render(option);

            var gridFilter = option.filter || $(option.elem).attr('lay-filter');
            if (gridFilter) {
                layui.table.on('sort(' + gridFilter.replace('#', '') + ')', function (obj) {
                    var where = table.config.where || {};
                    where.sortfield = obj.field;
                    where.sortorder = obj.type == 'desc' ? 'desc' : 'asc';
                    console.log(where)
                    table.reload();
                })
            }

            var t_reload = table.reload;

            table.reload = function (option) {
                if (option && option.page === true) {
                    option.page = {
                        curr : 1
                    }
                }

                t_reload(option);
            }

            return table;
        }
    }]);