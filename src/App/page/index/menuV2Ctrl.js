angular.module("app.index")
    .controller('menuCtrl', ["$scope", "$http", function ($scope, $http) {
        $http({
            method: 'GET',
            url: url
        }).then(function successCallback(response) {
            var result = response.data;
            $scope.menuData = result.data || [];
            if ($scope.menuData.Childrens.length > 0) {
                $scope.clickTopMenu(0, $scope.menuData.Childrens[0]);   //选中第一个菜单；
            }
        }, function errorCallback(response) {
        });

        $scope.leftMenuData = [];
        $scope.contentUrl = "";
        $scope.selected = { topMenuIndex: 0 };
        $scope.level1Index = 0;
        $scope.bFlag = false;
        $scope.topMenuNumber = 7;   //头部一级菜单的数量，超出会折叠在更多按钮里；
        /* 点击顶部菜单 */
        $scope.clickTopMenu = function (index, topMenu) {
            $scope.selected = { topMenuIndex: index };
            $scope.level1Index = 0;
            $scope.leftMenuData = topMenu.Childrens;
            if (topMenu.MenuId == 'Root_PZGL') {
                //window.open($$.appPath + topMenu.MenuUrl);
                $scope.bFlag = true;    //显示左侧菜单
            } else {
                $scope.bFlag = false;
            }
            if (topMenu.Childrens.length > 0) {
                // 点点击顶部菜单时，默认加载第一个页面
                var menu = getDefaultLeafMenu(topMenu);
                if (isValiUrl(menu)) {
                    $scope.contentUrl = menu.MenuUrl;
                }
                menu.isDefault = true;
            }
            // 如果当前页面下面没有子页面，那么直接打开当前菜单的url 并且隐藏左侧菜单
            else if (isValiUrl(topMenu)) {
                $scope.contentUrl =  topMenu.MenuUrl;
            }
            //计算iframe的高度
            setTimeout(function () {
                setHeight();
            },0);
        }

        /**
         * 点击第二级菜单
         * @param {number} index 菜单索引
         * @param {object} menu 菜单项
         */
        $scope.clickLevel1 = function (index, menu) {
            $scope.level1Index = index;
            if (isValiUrl(menu)) {
                $scope.contentUrl = menu.MenuUrl;
            }
        }

        function isValiUrl(menu) {
            return menu && menu.MenuUrl && menu.MenuUrl.indexOf('#') < 0;
        }

        /**
         * 获取菜单下第一个叶子菜单
         * @param {object} menu 根菜单
         */
        function getDefaultLeafMenu(menu) {
            if (menu.Childrens.length <= 0 && menu.MenuUrl) {
                return menu;
            } else {
                for (var i = 0; i < menu.Childrens.length; i++) {
                    return getDefaultLeafMenu(menu.Childrens[i]);
                }
            }
        }

        //退出系统
        $scope.logOut = function () {
            layer.confirm('是否确定离开系统？', function (index) {
                window.parent.location.href = $$.appPath + 'Account/Logout';
                layer.close(index);
            });
        }

        //修改密码
        $scope.changePassword = function () {
            layer.open({
                title: '修改密码',
                type: 2,
                area: '600px', 
                content: $$.appPath + 'Account/ChangePassword' 
            });
        } 

        $scope.getMenuIconClass = function (idx, menu) {
            return 'sdNav-icon-' + (menu.Tpwz || 'default');
        }
    }]);