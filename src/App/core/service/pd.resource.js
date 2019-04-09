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
angular.module("pd.resource", ["pd.action"])
    .service("pdResourceSvr", ["$q", "pdActionSvr", "$http", function ($q, pdActionSvr, $http) {
        this.get = function (serviceName, param, setting) {
            if (serviceName.indexOf('?') > -1) {
                serviceName = serviceName + '&t=' + (new Date()).getTime();
            } else {
                serviceName = serviceName + '?t=' + (new Date()).getTime();
            }
            var deferred = $q.defer();
            var option = {
                method: 'GET',
                url: encodeURI(serviceName),
                data: param,
                async: false
            };
            if (setting != null) {
                angular.extend(option, setting);
            }

            $http(option).then(function successCallback(response) {
                deferred.resolve(response.data);

            }, function errorCallback(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

        this.post = function (serviceName, param, setting) {
            var deferred = $q.defer();
            var option = {
                method: 'POST',
                url: serviceName,
                data: param,
                async: false
            };
            if (setting != null) {
                angular.extend(option, setting);
            }

            $http(option).then(function successCallback(response) {
                deferred.resolve(response.data);
            }, function errorCallback(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }

        this.safeApply = function ($scope, fn) {
            var phase = $scope.$root.$$phase;
            if (phase == "$apply" || phase == "$digest") {
                if (fn && typeof fn === "function") {
                    fn();
                }
            } else {
                $scope.$apply(fn);
            }
        }
    }]);