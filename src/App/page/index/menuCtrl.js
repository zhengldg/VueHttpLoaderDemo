angular.module("app.index")
    .controller('menuCtrl', ["$scope", "$http", function ($scope, $http) {

        
        $http({
            method: 'GET',
            url: url
        }).then(function successCallback(response) {
            var result = response.data;
            $scope.menuData = result.data || [];
            //console.log($scope.menuData);
            $scope.clickTopMenu(0,$scope.menuData.Childrens[0]);
        }, function errorCallback(response) {
            // 请求失败执行代码
        });

        $scope.appPath = $$.appPath;
        $scope.leftMenuData = [];
        $scope.contentUrl = "HomePage/Index";
        $scope.selected = { topMenuIndex: 0, leftParentMenuIndex: 0, leftLeafMenuIndex: 0 };
        $scope.hideLeft = true; //是否隐藏左侧菜单
        $scope.hideSecond = true; //是否隐藏二级菜单

        /* 点击顶部菜单 */
        $scope.clickTopMenu = function (index, topMenu) {
            $scope.selected = { topMenuIndex: index, leftParentMenuIndex: 0, leftLeafMenuIndex: 0 };
            if (topMenu.Childrens.length > 0) {
                $scope.hasLeftMenu = true;
                // 点点击顶部菜单时，默认加载第一个页面
                var menu = getDefaultLeafMenu(topMenu);
                if (isValiUrl(menu)) {
                    loadFrameUrl(menu.MenuUrl);
                }
                $scope.leftMenuData = topMenu.Childrens;
                menu.isDefault = true;

            }
            // 如果当前页面下面没有子页面，那么直接打开当前菜单的url 并且隐藏左侧菜单
            else if (isValiUrl(topMenu)) {
                $scope.hasLeftMenu = false;
                loadFrameUrl(topMenu.MenuUrl);
            }
        }

        function loadFrameUrl(url) {
            if (url.indexOf('http') == -1) {
                $scope.contentUrl = $$.appPath +url;
            } else {
                $scope.contentUrl =url;
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