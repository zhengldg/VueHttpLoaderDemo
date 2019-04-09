angular.module("pd.cityPicker", [])
    .directive("cityPicker", ["pdActionSvr", "pdResourceSvr", "$rootScope", "$timeout", 'appRoot', function (pdActionSvr, pdResourceSvr, $rootScope, $timeout, appRoot) {
        var controllerUrl = appRoot + 'Attachment/Attachment/';
        return {
            restrict: "E",
            templateUrl: appRoot + 'App/core/directive/fileUpload/fileUploadTpl.html',
            replace: true,
            scope: {
                ngModel: '=', 
                flx: '@', 
                zlx: '@',
                glbh: '@', 
                editflag: '@'
            },
            link: function ($scope, $element, $attr) {
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
            }
        };
    }]);