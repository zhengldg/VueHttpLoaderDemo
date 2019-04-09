angular.module("pd.fileUpload", [])
    .filter('fmtFilesize', function () {
        return function (dx) {
            if (dx && !isNaN(dx)) {
                if (dx < 1024) {
                    return dx + ' B';
                }
                else if (dx < 1024 * 1024) {
                    return (dx / 1024).toFixed(2) + ' KB';
                } else {
                    return (dx / 1024 / 1024).toFixed(2) + ' MB';
                }
            }
        }
    })
    .directive("fileUpload", ["pdActionSvr", "pdResourceSvr", "$rootScope", "$timeout", 'appRoot', function (pdActionSvr, pdResourceSvr, $rootScope, $timeout, appRoot) {
        var controllerUrl = appRoot + 'Attachment/Attachment/';
        return {
            restrict: "E",
            templateUrl: appRoot + 'App/core/directive/fileUpload/fileUploadTpl.html',
            replace: true,
            scope: {
                listChanged: '&', // 当附件列表发生改变时，派发listChanged事件
                flx: '@', // 父类型
                zlx: '@', // 子类型
                glbh: '@', // 业务管理编号
                editflag: '@'
            },
            link: function ($scope, $element, $attr) {
                if (!$scope.flx) {
                    throw new Error('缺少参数flx配置');
                    pdActionSvr.error('缺少参数flx配置');
                }
                if (!$scope.zlx) {
                    throw new Error('缺少参数zlx配置');
                    pdActionSvr.error('缺少参数zlx配置');
                }
                // 考虑到管理编号会变更，这里监听一下
                $scope.$watch('glbh', function (newval) {
                    if ($scope.glbh) {
                        if ($scope.editflag == 1) {
                            initControl($scope, $element, $attr);
                        }
                        $scope.getFileList();
                    }
                })

                function initControl($scope, $element, $attr) {
                    var size = $attr.size || 20000; // 默认文件大小 20M
                    $scope.btnId = 'btnUpload_' + $scope.flx + $scope.zlx;
                    setTimeout(function () {
                        var uploadInst = layui.upload.render({
                            elem: '#' + $scope.btnId
                            , url: controllerUrl + 'UploadFile'
                            , accept: 'file'
                            , size: size
                            , multiple: true
                            , auto: true
                            , data: {
                                FLX: $scope.flx,
                                ZLX: $scope.zlx,
                                GLBH: $scope.glbh
                            }
                            , before: function (obj) {
                            }
                            , done: function (res) {
                                if (res.isSuccess) {
                                    $scope.getFileList();
                                    pdActionSvr.success('上传成功');
                                }
                            }
                            , error: function () {
                            }
                        });
                    }, 0);
                }
            },
            controller: function ($scope, appRoot) {
                $scope.downloadUrl = controllerUrl + 'Download';
                $scope.fileList = [];
                $scope.delete = function (xh) {
                    top.layer.confirm('确定删除么', function (index) {
                        pdResourceSvr.post(controllerUrl + 'Delete/' + xh)
                            .then(function (rsp) {
                                if (rsp.isSuccess) {
                                    for (var i = 0; i < $scope.fileList.length; i++) {
                                        var item = $scope.fileList[i];
                                        if (item.XH == xh) {
                                            $scope.fileList.splice(i, 1);
                                            continue;
                                        }
                                    }
                                    pdActionSvr.success('删除成功');
                                } else {
                                    pdActionSvr.error('删除失败');
                                }
                            })
                            .finally(function () {
                                top.layer.close(index);
                            })
                    });
                },
                    $scope.getFileList = function () {
                        var url = controllerUrl + 'GetAttachmentList?FLX=' +
                            $scope.flx
                            + '&ZLX=' + $scope.zlx
                            + '&GLBH=' + $scope.glbh;
                        pdResourceSvr.get(url, { FLX: $scope.flx, ZLX: $scope.zlx, GLBH: $scope.glbh })
                            .then(function (rs) {
                                $scope.fileList = rs.data;
                                $scope.listChanged({ files: $scope.fileList });
                            })
                    }
            }
        };
    }]);