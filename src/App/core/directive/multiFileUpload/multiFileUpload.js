/**
 目录式附件上传，目录请在 T_SJZX_COMN_FJML 表中进行配置
 */
angular.module("pd.multiFileUpload", [])
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
    .directive("multiFileUpload", ["pdActionSvr", "pdResourceSvr", "$rootScope", "$timeout", 'appRoot', function (pdActionSvr, pdResourceSvr, $rootScope, $timeout, appRoot) {
        var controllerUrl = appRoot + 'Attachment/Attachment/';
        return {
            restrict: "E",
            templateUrl: appRoot + 'App/core/directive/multiFileUpload/fileUploadTpl.html?d=' + (new Date()).getTime(),
            replace: true,
            scope: {
                listChanged: '&', // 当附件列表发生改变时，派发listChanged事件
                mlid: '@', // 目录id
                glbh: '@', // 业务管理编号
                editflag: '@'
            },
            link: function ($scope, $element, $attr) {
                if (!$scope.mlid) {
                    throw new Error('缺少参数mlid配置');
                    pdActionSvr.error('缺少参数mlid配置');
                }

                $scope.getFjml().then(function () {
                    // 考虑到管理编号会变更，这里监听一下
                    $scope.$watch('glbh', function (newval) {
                        if ($scope.glbh) {
                            if ($scope.editflag == 1) {
                                initControl($scope, $element, $attr);
                            }
                        }
                    })
                })

                function initControl($scope, $element, $attr) {
                    var size = $attr.size || 20000; // 默认文件大小 20M
                    setTimeout(function () {
                        var uploadInst = layui.upload.render({
                            elem: '.uploader-btn' 
                            , url: controllerUrl + 'UploadFile'
                            , accept: 'file'
                            , size: size
                            , multiple: true
                            , auto: true
                            , data: {
                            }
                            , before: function (obj) {
                                var mlid =  this.item.data('mlid');
                                this.data = {
                                    GLBH: $scope.glbh,
                                    FLX: mlid,
                                    ZLX: mlid
                                };
                            }
                            , done: function (res) {
                                if (res.isSuccess) {
                                    var mlid = this.item.data('mlid');
                                    $scope.getFileList(mlid);
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

                // 获取附件目录结构
                $scope.getFjml = function () {
                    var url = controllerUrl + 'GetFjml?MLID=' + $scope.mlid;
                    return pdResourceSvr.post(url)
                        .then(function (rs) {
                            $scope.dirData = rs || {};
                            $scope.dirListData = convertDirDataToListData($scope.dirData);
                            for (var p in $scope.dirListData) {
                                $scope.getFileList(p);
                            }
                            return null;
                        })
                }

                // 将树形结构数据转成对象
                function convertDirDataToListData(dirData) {
                    var obj = {};
                    obj[dirData.MLID] = [];
                    obj.length = 1;
                    if (dirData.Children) {
                        for (var i = 0, l = dirData.Children.length; i < l; i++) {
                            var item = dirData.Children[i];
                            obj[item.MLID] = [];
                            obj.length++;
                        }
                    }
                    return obj;
                }

                // 删除附件
                $scope.delete = function (file) {
                    var xh = file.XH;
                    top.layer.confirm('确定删除么', function (index) {
                        pdResourceSvr.post(controllerUrl + 'Delete/' + xh)
                            .then(function (rsp) {
                                if (rsp.isSuccess) {
                                    $scope.getFileList(file.ZLX);
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
                    // 获取某个附件分类下的附件列表
                    $scope.getFileList = function (mlid) {
                        var url = controllerUrl + 'GetAttachmentList?FLX=' + mlid
                            + '&ZLX=' + mlid
                            + '&GLBH=' + $scope.glbh;
                        pdResourceSvr.get(url, { FLX: mlid, ZLX: mlid, GLBH: $scope.glbh })
                            .then(function (rs) {
                                $scope.dirListData[mlid] = rs.data;
                            })
                    }
            }
        };
    }]);