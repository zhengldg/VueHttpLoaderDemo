var $$ = $$ || {};
(function ($, mini, boanda) {
    boanda.formCompare = function (opts) {
        var option = {
            changeText: " <font color='green'>变更为</font> ",
            gridDeleteText: "删除：",
            gridModifyText: "修改：",
            gridNewText: "新增：",
            oldValueStyle: "color:red",
            newValueStyle: "color:blue",
            displayNameData: []//{key:"",value:""},{key:"",value:""}
        };

        function getDisplayName(key) {
            var result = key;
            for (var i = 0; i < displayNameData.length; i++) {
                if (option.displayNameData[i].key == key) {
                    result = option.displayNameData[i].value;
                    break;
                }
            }

            return result;
        }

        option = $.extend(option, opts);
        function find(data, key) {
            var result = null;
            for (var i = 0; i < data.length; i++) {
                if (data[i]["XH"] == key) {
                    result = data[i];
                }
            }

            return result;
        }

        // 获取Grid的值
        function getGridValue(obj, value) {
            var result = value;
            if (obj instanceof mini.TextBox) {

            } else if (obj instanceof mini.Password) {

            } else if (obj instanceof mini.ComboBox) {
                for (var i = 0; i < obj.data.length; i++) {
                    if (obj.data[i].id == value) {
                        result = obj.data[i].text;
                        break;
                    }
                }
            } else if (obj instanceof mini.TextArea) {

            } else if (obj instanceof mini.DatePicker) {
                result = mini.formatDate(obj.getValue(), "yyyy-MM-dd");
            } else if (obj instanceof mini.RadioButtonList) {
                for (var i = 0; i < obj.data.length; i++) {
                    if (obj.data[i].id == value) {
                        result = obj.data[i].text;
                        break;
                    }
                }
            }

            if (result == null || result == '') {
                result = "--";
            }
            return result;
        }

        // 获取grid列名
        function findGridColumnName(element, key) {
            var result = key;
            var ele = element.getColumnField(key);
            if (ele != null) {
                result = $.trim(ele.header);
            }
            //else {
            //    result = getDisplayName(key);
            //}

            return result;
        }

        // 列表行比较
        function gridRowDiff(element, newData, oldData) {
            var result = '';
            var data = [];
            // 数据收集
            for (key in newData) {
                if (newData[key] != oldData[key]) {
                    // 获取显示名称
                    var displayName = findGridColumnName(element, key);
                    if (!(displayName == "" || displayName == null || displayName == key)) {
                        //var ele = element.getColumnField(key);
                        //if (ele.editor) {
                        //    data.push({ name: displayName, nValue: getGridValue(ele.editor, newData[key]), oValue: getGridValue(ele.editor, oldData[key]) });
                        //} else {
                        data.push({ name: displayName, nValue: newData[key], oValue: oldData[key] });
                        //}
                    }
                }
            }
            // 数据转换
            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    if (i != 0) {
                        result += "，";
                    }
                    result += data[i].name + "：<i" + (option.oldValueStyle == "" ? "" : " style='" + option.oldValueStyle + "'") + ">" + (data[i].oValue == null ? "--" : data[i].oValue) + "</i>" + option.changeText + "<i" + (option.newValueStyle == "" ? "" : " style='" + option.newValueStyle + "'") + ">" + (data[i].nValue == null ? "--" : data[i].nValue) + "</i>";
                    if (data.length == (i + 1)) {
                        result += ";";
                    }
                }
            }
            return result;
        }

        // 获取表单的值
        function getValue(obj, value) {
            var result = value;
            if (obj instanceof mini.TextBox) {

            } else if (obj instanceof mini.Password) {

            } else if (obj instanceof mini.ComboBox) {
                for (var i = 0; i < obj.data.length; i++) {
                    if (obj.data[i].id == value) {
                        result = obj.data[i].text;
                        break;
                    }
                }
            } else if (obj instanceof mini.TextArea) {

            } else if (obj instanceof mini.DatePicker) {
                result = mini.formatDate(obj.getValue(), "yyyy-MM-dd");
            } else if (obj instanceof mini.RadioButtonList) {
                for (var i = 0; i < obj.data.length; i++) {
                    if (obj.data[i].id == value) {
                        result = obj.data[i].text;
                        break;
                    }
                }
            }

            if (result == null || result == '') {
                result = "--";
            }
            return result;
        }

        // 列表行比较
        function gridRowMessage(element, newData) {
            var result = '';
            var data = [];
            // 数据收集
            for (key in newData) {
                // 获取显示名称
                var displayName = findGridColumnName(element, key);
                if (displayName != key) {
                    data.push({ name: displayName, nValue: newData[key] });
                }
            }
            // 数据转换
            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    if (result != '') {
                        result += "，";
                    }
                    result += data[i].name + ":" +  (data[i].nValue == null ? "--" : data[i].nValue);
                }
            }
            return result;
        }

        // 判断data数组中对象是否存在name的key
        function hasName(data, name) {
            var ret = false;
            for (var i = 0; i < data.length; i++) {
                if (data[i].key == name) {
                    ret = true;
                }
            }

            return ret
        }

        var result = [];

        // 列表对比
        return {
            // 表单比较
            formDiff: function (newData, oldData) {
                var data = [];
                // 数据收集
                for (key in newData) {
                    if (newData[key] != oldData[key]) {
                        var obj = mini.getbyName(key); //$("input[name="+key+"]");
                        var displayName = "";
                        if (obj instanceof mini.RadioButtonList) {
                            displayName = $("input[name=" + key + "]").parentsUntil("[class=mini-radiobuttonlist]").parent().parent().prev().text();
                        } else {
                            if ($("input[name=" + key + "]").length > 0) {
                                displayName = $("input[name=" + key + "]").parentsUntil("tr").last().prev().text();
                            } else {
                                displayName = $("textarea[name=" + key + "]").parentsUntil("tr").last().prev().text();
                            }
                        }

                        // 获取显示名称  
                        if (displayName == null || displayName == "") {
                            continue;
                        }
                        data.push({ name: displayName, nValue: getValue(obj, newData[key]), oValue: getValue(obj, oldData[key]) });
                    }
                }
                // 数据转换
                if (data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        if (hasName(result, data[i].name)) {
                           
                            for (var j = 0; j < result.length; j++) { 
                                if (result[j].key == data[i].name) {
                                    result[j].text += "，<i" + (option.oldValueStyle == "" ? "" : " style='" + option.oldValueStyle + "'") + ">" + (data[i].oValue == null ? "--" : data[i].oValue) + "</i>" + option.changeText + "<i" + (option.newValueStyle == "" ? "" : " style='" + option.newValueStyle + "'") + ">" + (data[i].nValue == null ? "--" : data[i].nValue) + "</i>";
                                }
                            }
                        } else {

                            var tMsg = "<i" + (option.oldValueStyle == "" ? "" : " style='" + option.oldValueStyle + "'") + ">" + (data[i].oValue == null ? "--" : data[i].oValue) + "</i>" + option.changeText + "<i" + (option.newValueStyle == "" ? "" : " style='" + option.newValueStyle + "'") + ">" + (data[i].nValue == null ? "--" : data[i].nValue) + "</i>";
                            result.push({ type: "form", key: data[i].name, text: tMsg });
                        }
                    }
                }
                return result;
            }
            , gridDiff: function (element, newData, oldData) {
                var tempOldData = [];
                tempOldData = oldData;
                for (var i = 0; i < newData.length; i++) {
                    // 查找历史数据中是否存在该数据
                    var oldItem = find(oldData, newData[i]["XH"]);

                    // 变更数据
                    if (oldItem != null) {  // 存在 
                        tempOldData.remove(oldItem);
                        var diffMessage = gridRowDiff(element, newData[i], oldItem);
                        if (diffMessage != "" && diffMessage != null) {
                            result.push({ type: "grid", key: option.gridModifyText, text: diffMessage });
                        }
                        // 新增数据
                    } else {				// 不存在
                        var message = gridRowMessage(element, newData[i]);
                        result.push({ type: "grid", key: option.gridNewText, text: message });
                    }
                }

                // 删除数据
                for (var i = 0; i < tempOldData.length; i++) {
                    var message = gridRowMessage(element, tempOldData[i]);
                    result.push({ type: "grid", key: option.gridDeleteText, text: message });
                }
                return result;
            }
            , getResult: function () {
                return result;
            }
        };
    }
})(jQuery, mini, $$);