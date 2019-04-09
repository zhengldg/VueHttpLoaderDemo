/********此文件是针对本系统，一些页面通用方法 ****/
var log = function () {
    console.log.apply(this, arguments);
}

/**miniui验证扩展*/

//是否手机号码
function isCellphoneNumber(v) {
    var re = /^1\d{10}$/;
    if (re.test(v)) {
        return true;
    }
    return false;
}
//是否电话号码
function isTelphoneNumber(v) {
    re = /^0\d{2,3}-?\d{7,8}$/;
    if (re.test(v)) {
        return true;
    }
    return false;
}

/* 是否英文 */
function isEnglish(v) {
    var re = new RegExp("^[a-zA-Z\_]+$");
    if (re.test(v)) return true;
    return false;
}

/* 是否英文+数字 */
function isEnglishAndNumber(v) {

    var re = new RegExp("^[0-9a-zA-Z\_]+$");
    if (re.test(v)) return true;
    return false;
}

/* 是否汉字 */
function isChinese(v) {
    var re = new RegExp("^[\u4e00-\u9fa5]+$");
    if (re.test(v)) return true;
    return false;
}

/* 是否身份证号码 */
function isIDCard(v) {
    var pattern1 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
    var pattern2 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$/;
    if (pattern1.test(v) || pattern2.test(v)) return true;
    return false;
}

/* 身份证号码 */
function onIDCardsValidation(e) {
    if (!e.value) return true;

    if (e.isValid) {
        if (isIDCard(e.value) == false) {
            e.errorText = "请输入15~18位数字";
            e.isValid = false;
        }
    }
}

function onPhoneNumberValidation(e) {
    if (!e.value) return true;

    if (e.isValid) {
        if (isCellphoneNumber(e.value) == false && isTelphoneNumber(e.value) == false) {
            e.errorText = "手机或座机号码格式不正确";
            e.isValid = false;
        }
    }
}

function onCellphoneNumberValidation(e) {
    if (!e.value) return true;

    if (e.isValid) {
        if (isCellphoneNumber(e.value) == false) {
            e.errorText = "手机号码格式不正确";
            e.isValid = false;
        }
    }
}

function onTelphoneNumberValidation(e) {
    if (!e.value) return true;

    if (e.isValid) {
        if (isTelphoneNumber(e.value) == false) {
            e.errorText = "座机号码格式不正确";
            e.isValid = false;
        }
    }
}


function onEnglishValidation(e) {
    if (!e.value) return true;
    if (e.isValid) {
        if (isEnglish(e.value) == false) {
            e.errorText = "请输入英文";
            e.isValid = false;
        }
    }
}
function onEnglishAndNumberValidation(e) {
    if (!e.value) return true;
    if (e.isValid) {
        if (isEnglishAndNumber(e.value) == false) {
            e.errorText = "请输入英文、数字或者下划线";
            e.isValid = false;
        }
    }
}
function onChineseValidation(e) {
    if (!e.value) return true;
    if (e.isValid) {
        if (isChinese(e.value) == false) {
            e.errorText = "请输入中文";
            e.isValid = false;
        }
    }
}

/**miniui 扩展 **/
if (typeof (mini) != 'undefined') {
    mini.validateForm = function (form) {
        form.validate();
        if (form.isValid() == false) {
            var errorTexts = form.getErrorTexts();
            var s = errorTexts.join('<br/>');
            top.mini.alert(s);
            return false;
        };
        return true;
    }

    mini.validateGrid = function (grid) {
        grid.commitEdit();
        grid.validate();
        if (grid.isValid() == false) {
            var error = grid.getCellErrors();
            var errorTexts = [];
            var J = grid.getCellErrors();
            for (var H = 0, I = J.length; H < I; H++) {
                var F = J[H];
                errorTexts.push(F.errorText)
            }
            var s = errorTexts.join('<br/>');

            var error = grid.getCellErrors()[0];
            grid.beginEditRow(error.record);
            top.mini.alert(s);
            return false;
        } else {
            return true;
        }
    }

    /* miniui 控件全局初始化*/
    if (mini.DataGrid) {
        mini.copyTo(mini.DataGrid.prototype, {
            emptyText: "暂无数据可供显示",
            showEmptyText: true
        });
    }

    if (mini.DatePicker) {
        mini.copyTo(mini.DatePicker.prototype, {
            allowInput: false
        })
    }

    if (mini.ComboBox) {
        mini.copyTo(mini.ComboBox.prototype, {
            showNullItem: true,
            emptyText: '请选择'
        })
    }

    if (mini.TextBox) {
        mini.copyTo(mini.TextBox.prototype, {
            //maxLength: 50
        })
    }
    if (mini.Pager) {
        mini.copyTo(mini.Pager.prototype, {
            sizeList: [15, 30, 50, 100]
        });
    }

    if (mini.DataTable) {
        mini.copyTo(mini.DataTable.prototype, {
            pageSize: 15
        });
    }
}

/*扩展momentjs，使默认使用统一格式*/
moment.fn.normalDate = function () {
    if (!this) return '';
    return this.format('YYYY-MM-DD');
}

moment.fn.normalTime = function () {
    if (!this) return '';
    return this.format('YYYY-MM-DD HH:MM:SS');
}

// 点击高级查询
$(document).on('click', '.btn-more', function () {
    //var offset = $(this).offset();
    var sub = $('.sub-select');
    if (!sub.is(':visible')) {
        //var left = Math.max(2, offset.left - $('.sub-select').width() / 2 + $(this).width() / 2);
        sub.css('left', 0);
    }
    sub.toggle();
    return false;
})

$(document).on('click', '.sub-select', function () {
    return false;
})

$(document).on('click', function (e) {
    var sub = $('.sub-select');
    if (sub.is(':visible')) {
        var ele = $(e.target).parents('.mini-popup');
        if (!ele.length) {
            sub.hide();
        }
    }
})

// 显示miniui表头的提示信息
function showHintInDatagrid() {
    setTimeout(function () {
        $('.tooltip-link').parents('.mini-grid-columns,.mini-grid-headerCell-inner,.mini-grid-columns-view')
            .css('overflow', 'initial');
    }, 500);
}

//miniui表头 添加提示效果
$(document).on('mouseover', '.mini-datagrid .tooltip-link', function () {
    var $this = $(this);
    var $ele = $this.next('.tb-tip');
    if ($ele.length) {
        $ele.show();
    } else {
        var of = $this.offset();
        var $t = $('<div class="tb-tip" style="left:' + (of.left - 75) + 'px;display:none;"> ' + $this.data('tip')
            + '<span class="tb-sj"></span>'
            + '  </div>');
        $this.after($t);
        $t.css('top', (of.top + 26) + 'px');
        $t.show();
    }
}).on('mouseout', '.mini-datagrid .tooltip-link', function () {
    var $this = $(this);
    var $ele = $this.next('.tb-tip');
    if ($ele.length) {
        $ele.hide();
    }
});

/* 行政区划级联 */
// 配置行政区划级联控件
// 按顺序传递要级联的miniui控件,例如：configXzqhControls([mini.get('sheng'), mini.get('shi'), mini.get('quxian')])
// 也可以：configXzqhControls([mini.get('shi'), mini.get('quxian')])
// 也可以传递控件、id混合传递，如：configXzqhControls(['shi', 'quxian', mini.get('ssjd')])
var configXzqhControls = function (args) {
    if (args.length) {
        var controls = _parseControls(args);

        for (var i = 0; i < controls.length - 1; i++) {
            var current = controls[i];
            var next = controls[i + 1];
            _configCombCurrentAndNext(controls, current, next, i, 'Tool/GetXzqhData?FDM=');
        }
        for (var i = 0; i < controls.length ; i++) {
            controls[i].fire('valuechanged', 1);
        }
    }
}

var _parseControls = function (args) {
    var controls = [];
    for (var i = 0; i < args.length; i++) {
        if (mini.isControl(args[i])) {
            controls.push(args[i]);
            //values.push(controls[i].getValue());
        } else if (typeof args[i] == 'string') {
            var c = mini.get(args[i]);
            if (c) {
                controls.push(c);
            }
        }
    }
    return controls;
}
function _configCombCurrentAndNext(controls, current, next, idx, req) {
    current.on('valuechanged', function (args) {
        if (args != 1) {
            for (var i = idx + 1; i < controls.length; i++) {
                controls[i].setValue('');
                controls[i].set({ data: [] });
            }
        }
        var fdm = current.value;
        if (fdm) {
            var url = $$.appPath + req + fdm;
            next.setUrl(url);
            //next.select(0);
        }
    })
}
// 配置行业类型
var configHylxControls = function (args) {
    if (args.length) {
        var controls = _parseControls(args);

        for (var i = 0; i < controls.length - 1; i++) {
            var current = controls[i];
            var next = controls[i + 1];
            _configCombCurrentAndNext(controls, current, next, i, 'Tool/GetHylxData?FDM=');
        }
        for (var i = 0; i < controls.length; i++) {
            controls[i].fire('valuechanged', 1);
        }
    }
}
