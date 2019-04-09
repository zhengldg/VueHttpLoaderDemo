angular.module("app.rms")
    .controller("indexCtrl", ["$scope", "pdActionSvr", "pdResourceSvr", "$rootScope", function ($scope, pdActionSvr, pdResourceSvr, $rootScope) {
        var vm = this;
        vm.eventClick = function () {

        }

        vm.search = {
            YHMC: "",
            BMBH: null
        };

        vm.treeSearch = null;
        var allTreeNode = [];
        vm.userInfo = {};

        vm.searchUser = function (where) {
            layui.table.render({
                elem: '#userTable',
                height: 'full-20',
                url: url,
                method: "post",
                where: where,
                page: { curr: "0" },
                cols: [[
                    { type: 'checkbox', title: '序号', width: "5%" },
                    { field: 'YHID', title: '用户ID', width: "15%" },
                    { field: 'YHMC', title: '用户名', width: "15%" },
                    { field: 'ZZQC', title: '部门名称', width: "15%", sort: true },
                    { field: 'XB', title: '性别', width: "10%", sort: true },
                    { field: 'PXH', title: '排序号', width: "10%" },
                    { field: 'SFYX', title: '状态', width: "10%", sort: true },
                    { title: '操作', fixed: 'right', width: "20%", align: 'center', toolbar: '#barDemo' }

                ]], request: {
                    pageName: 'pageIndex',
                    limitName: 'pageSize' //每页数据量的参数名，默认：limit
                },
                response: {
                    statusName: 'isSuccess' //数据状态的字段名称，默认：code
                    , statusCode: null      //成功的状态码，默认：0
                    , msgName: 'message'    //状态信息的字段名称，默认：msg
                    , countName: 'Total'    //数据总数的字段名称，默认：count
                    , dataName: 'Items'     //数据列表的字段名称，默认：data
                }
            });

            layui.table.on('tool(demo)', function (obj) {
                var data = obj.data;
                if (obj.event === 'detail') {
                    pdResourceSvr.post(userUrl + "/" + data.YHID, null).then(function (result) {
                        pdResourceSvr.safeApply($rootScope, function () {
                            vm.userInfo = result.data;
                        });
                        
                        setTimeout(function () { layui.form.render("radio"); }, 100);
                    });

                    layer.open({
                        type: 1,
                        area: '900px',
                        content: $('#editWindow')
                    });
                } else if (obj.event === 'del') {
                    layer.confirm('真的删除行么', function (index) {
                        obj.del();
                        layer.close(index);
                    });
                } else if (obj.event === 'edit') {
                    pdResourceSvr.post(userUrl + "/" + data.YHID, null).then(function (result) { 
                        pdResourceSvr.safeApply($rootScope, function () {
                            vm.userInfo = result.data;
                        }); 

                        setTimeout(function () { layui.form.render("radio"); }, 100);
                    });

                    layer.open({
                        type: 1,
                        area: '900px',
                        content: $('#editWindow')
                    });
                }
            });
        }

        vm.initDepartmentTree = function (data) {
            var setting = {
                async: {
                    enable: true,
                    url: treeUrl,
                    dataFilter: vm.filter
                },
                callback: {
                    onClick: function (event, treeId, treeNode) {
                        vm.search.BMBH = treeNode.id;
                        vm.searchUser(vm.search);
                    }
                },
                data: {
                    simpleData: {
                        enable: true,
                        idKey: "id",
                        pIdKey: "pId",
                        rootPId: null
                    }
                }
            };
            if (data != null) {
                setting.async.enable = false;
                $.fn.zTree.init($("#departmnetTree"), setting, data);
            } else {
                $.fn.zTree.init($("#departmnetTree"), setting);
            }
        }

        vm.initDropdownlistDepartment = function (data) {
            var setting = {
                async: {
                    enable: true,
                    url: departmentUrl,
                },
                callback: {
                    onClick: function (event, treeId, treeNode) {
                        vm.searchUser({ BMBH: treeNode.id });
                    }
                }
            };
            if (data != null) {
                setting.async.enable = false;
                $.fn.zTree.init($("#treeBMBH"), setting, data);
            } else {
                $.fn.zTree.init($("#treeBMBH"), setting);
            }
        }

        vm.filter = function (treeId, parentNode, childNodes) {
            if (!childNodes) return null;
            for (var i = 0, l = childNodes.length; i < l; i++) {
                childNodes[i].name = childNodes[i].name.replace(/\.n/g, '.');
            }
            return childNodes;
        }

        var hiddenNodes = []; //用于存储被隐藏的结点
        vm.searchNode = function (e) {
            var keycode = window.event ? e.keyCode : e.which;
            if (keycode == 13) {
                var zTree = $.fn.zTree.getZTreeObj("departmnetTree");
                if (!(vm.treeSearch == null || vm.treeSearch.length == 0)) {
                    //显示上次搜索后背隐藏的结点
                    zTree.showNodes(hiddenNodes);

                    //查找不符合条件的叶子节点
                    function filterFunc(node) {
                        var _keywords = vm.treeSearch;
                        if (node.isParent || node.name.indexOf(_keywords) != -1) return false;
                        return true;
                    };

                    //获取不符合条件的叶子结点
                    hiddenNodes = zTree.getNodesByFilter(filterFunc);

                    //隐藏不符合条件的叶子结点
                    zTree.hideNodes(hiddenNodes);
                } else {
                    zTree.showNodes(hiddenNodes);
                }
            }
        }

        vm.init = function () {
            vm.searchUser();
            vm.initDepartmentTree();
            vm.initDropdownlistDepartment();
        }


        vm.init();
    }]); 