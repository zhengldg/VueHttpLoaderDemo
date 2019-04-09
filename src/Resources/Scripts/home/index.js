/*******首页*****/

// 当前页面对应后台路径 格式: 区域/控制器/
var pagePath = $$.appPath + 'Index/';
// 根菜单
var menu = {};

var navItemTpl = Handlebars.compile($("#dg-nav-item").html());
// 顶部菜单容器
var $dgNav = $('#dg-nav');
// 左侧菜单模板
var leftItemTpl = Handlebars.compile($("#dg-left-item").html());
// 左侧菜单容器
var $dgleftMenu = $('#leftMenuList');
// 收缩左侧菜单模板
var smLeftItemTpl = Handlebars.compile($("#dg-left-item-sm").html());
// 收缩左侧菜单容器
var $smleftMenu = $('#leftMenuList-sm');

// 左侧菜单切换
function leftMenuSwitch() {
    $('#dg-main').toggleClass('active');
}

// 折叠菜单 
$dgleftMenu.on('click', '.leftMenuItem', function () {
    var $this = $(this);
    var url = $this.data('menuurl');
    if (url && url[0] != '#') {
        var parentSiblings = $this.addClass('on').parent().siblings().removeClass('on');
        parentSiblings.children('ul.leftMenu-sublist').hide();
        $dgleftMenu.find('a').removeClass('on');
        parentSiblings.children('h1').removeClass('on');
        loadMenuPage(url);
    } else {
        var parentSiblings = $this.toggleClass('on').parent().siblings().removeClass('on');
        parentSiblings.children('ul.leftMenu-sublist').hide();
        parentSiblings.children('h1').removeClass('on');
        $this.next('ul').toggle();
    }
    var idx = $this.data('idx');
    if (idx >= 1) {
        $smleftMenu.find('h1').removeClass('on');
        $smleftMenu.children().eq(idx - 1).children('h1').toggleClass('on');
    }
});

$('.leftMenuSlideBtn').click(function () {
    leftMenuSwitch();
});

getMenuData();

/* 获取菜单 */
function getMenuData(id) {
    id = id == undefined ? "ALL" : id;
        $.post(pagePath + "Menus", function (response) {
            if (response.status == "1") {
                menu = response.data;
                if (menu) {
                    if ($.boanda.isEmpty(menu.ParentId)) {
                        initTopMenus(menu);
                        if (!(menu.Childrens == null || menu.Childrens.length == 0)) {
                            initLeftMenus(menu.Childrens[0]);
                        }
                    }
                }
            }
        });
}

/* 初始化顶部菜单 */
function initTopMenus(data) {
    var html = '';
    var defaultMenu = null;
    $.each(data.Childrens, function (a, b) {
        if (defaultMenu == null) {
            defaultMenu = b;
        }
        b.idx = a + 1;
        html += navItemTpl(b);
    });
    var cd = $dgNav.children();
    if (cd.length) {
        cd.before(html);
    } else {
        $dgNav.append(html);
    }

    clickTopMenu(defaultMenu.Id, $dgNav.find('li:first'));
}

/* 点击顶部菜单 */
function clickTopMenu(id, ele) {
    $(ele).addClass('on').siblings().removeClass('on');
    if (menu.Childrens.length > 0) {
        $.each(menu.Childrens, function (a1, b1) {
            if (id == b1.Id) {
                if (b1.Childrens.length == 0) {
                    $('#dg-main').addClass('hideLeftMenu');
                    loadMenuPage(b1.MenuUrl);
                } else {
                    $('#dg-main').removeClass('hideLeftMenu');
                    var leafMenu = getDefaultLeafMenu(b1);
                    leafMenu.on = 'on';
                    loadMenuPage(leafMenu.MenuUrl);

                    initLeftMenus(b1);
                }
                return false;
            }
        });
    } else if (menu.MenuUrl) {
        $dgleftMenu.hide();
        loadMenuPage(menu.MenuUrl);
    }
}

/* 获取第一个叶子菜单节点 
 * @param menu   根菜单 
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

/* 初始时左侧菜单 */
function initLeftMenus(data) {
    if (data) {
        $dgleftMenu.html('');
        if (data.Childrens.length) {
            $smleftMenu.html('');
            for (var i = 0; i < data.Childrens.length; i++) {
                var item = data.Childrens[i];
                if (i == 0) {
                    item.on = 'on';
                    item.display = 'block';
                } else {
                    item.display = 'none';
                }
                item.idx = i + 1;
                $smleftMenu.append(smLeftItemTpl(item));
            }
        }
        var html = leftItemTpl(data);
        $dgleftMenu.append(html);
    }
}

/* 点击左侧叶子节点时 */
function clickLeftMenu(ele) {
    $dgleftMenu.find('a').removeClass('on');
    $(ele).addClass('on');
}


function loadMenuPage(url) {

   // var url = $this.data('menuurl');
    if (url) {
	    if(url.indexOf("http")==0){
        	$("#content").attr("src",url);
	    }else{
		    $("#content").attr("src",$$.appPath + url);
	    }
    }
}

// 点击收缩后的菜单时
$smleftMenu.click(function () {
    leftMenuSwitch();
})
