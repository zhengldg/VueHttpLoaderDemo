/// <reference path="../../jquery.powerdata.js" />
window.workflow = window.workflow || {};
workflow.start = workflow.start || {};
workflow.underway = workflow.underway || {};//待办任务
workflow.url = workflow.url || {};
workflow.underway.currentBtn = workflow.underway.currentBtn || {};
(function (workflow) {
    
    workflow.token = token;//
    workflow.webRoot = webRoot;//"/web";
    workflow.ajax = function (ajaxUrl, ajaxData, callBack) {
        if (ajaxUrl.indexOf("?") == -1) {
            ajaxUrl += "?token=" + workflow.token;
        } else {
            ajaxUrl += "&token=" + workflow.token;
        }

        ajaxData = $.extend(ajaxData, { token: workflow.token });
        $.ajax({
            async: false,
            type: "POST",
            url: ajaxUrl,
            data: JSON.stringify(ajaxData),
            traditional: true,
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            error: function () {

            },
            success: function (data) {
                if (callBack != null) {
                    callBack(data);
                }
            }
        });
    }

    //查询总数、正常、超时、报警的数量
    workflow.queryWorkflowCount = function () {

    }
    //显示待办任务
    workflow.queryUnderwayWorkflow = function (func) {
        workflow.ajax(boanda.webRoot + "/platform/workflow/workbench/workbenchcontroller/queryUnderwayWorkflow", null, function (data) {
            var workflows = data;
            if (workflows) {
                var underways = [];
                var underwayWorkflows = [{ label: "全部任务", value: '' }];
                //初始化查询条件 
                for (var i in workflows) {
                    var workflow = { label: i.split('###')[1] + '(' + workflows[i].total + ')', value: i.split('###')[0] };
                    underwayWorkflows.push(workflow);
                    var obj = {
                        LCLXBH: i.split('###')[0],
                        LCMC: i.split('###')[1],
                        total: workflows[i].total,
                        rows: workflows[i].rows
                    };
                    underways.push(obj);
                }
            }
            if (func != null) {
                func({ underways: underways, underwayWorkflows: underwayWorkflows });
            }
        });
    }

    //批量流转
    workflow.queryBtUnderwayWorkflowTypes = function () {

    }
    //查找工作流信息
    workflow.findWorkflowInfo = function (bzbh) {
        var result = null;
        var reqData = {
            stepId: bzbh,
            types1: 'home, historyList',
            types2: 'autoTransition, transition, finish',
            types3: 'turnDeal, helper, reader, copyReader, attachmentInfo, sendBack, singleFinish'
        };
        
        workflow.ajax(workflow.webRoot + "/platform/workflow/workbench/workbenchcontroller/findworkflowinfo", reqData, function (data) { 
            result = data;
        });

        return result;
    }
    //用户能发起的流程
    workflow.userStartWorkflow = function (el) {
        var result = null;
        workflow.ajax(webRoot + "/platform/workflowassistcontroller/userstartworkflow", null, function (data) {
            var underwayTask = data.underwayTask;   //已办任务
            var startWorkflow = data.startWorkflow; //可发起流程 
            result = data;
        });

        return result;
    }

    workflow.startWorkflow = function () {
        var result = null; 
        var data = { 
            LCBH: '6381558214231470080',
            //BWBH: '',
            DWMC: 'net 开启流程'
            //TABLENAME: 'T_HJJC_WTJCGZDJ',
            //BUSINESSCOLUMN: 'RWBH',
            //WORKFLOWCOLUMN: 'WRYBH'
        }; 
        workflow.ajax(webRoot + "/platform/workflow/definition/defaultworkflowcontroller/startworkflow", data, function (data) {
            result = data;
        });
        return result;
    }
 
    workflow.alert = function (msg, fn) {
        $.powerdata.alert('提示信息', msg, 'info', fn);
    }

    /**
     * 调用人员树的方法，传递参数对象
     * 
     * @param 	userId  		已选中的用户编号，多个用","分隔
     * @param 	operateType 	操作类型：流转 transition，流程其它操作 workflow
     * @param 	stepId 	         流转时表示当前步骤编号，退回时表示退回的步骤编号
     * @param 	nextStepId 		子步骤定义编号
     * @param 	defaultTab   	打开选择页面时默认展示方式，workflow：流程定义，department：部门，letter：字母
     * @param 	inputType 		按钮的类型，radio：单选，checkbox：多选
     * @param 	resDept 		是否返回部门信息，true：返回部门信息
     * @param 	maxNum			选中的最多人员数，数字类型
     * 
     * @return 	选择的人员对象 	userId:用户编号，userName:用户名称
     * 
     * 实例：var resultValue = workflow.selectUsers({"userId" : "SYSTEM","operateType" : "transition","stepId" : "123","nextStepId" : "122"});
     * 		 if(resultValue != null){
     * 			var userIds     = resultValue.userId;
     * 			var userNames   = resultValue.userName;
     * 			var userDeptIds = resultValue.userDeptId;
     * 			var userDeptName   = resultValue.userDeptName;
     * 		 }
     */
    workflow.selectUsers = function (params) {
        var userId = "";
        var operateType = "";
        var stepId = "";
        var nextStepId = "";
        var defaultTab = "";
        var inputType = "";
        var maxNum = "";
        var resDept = "";
        if (params != null) {
            userId = params['userId'] != undefined ? params['userId'] : '';
            operateType = params['operateType'] != undefined ? params['operateType'] : '';
            stepId = params['stepId'] != undefined ? params['stepId'] : '';
            nextStepId = params['nextStepId'] != undefined ? params['nextStepId'] : '';
            defaultTab = params['defaultTab'] != undefined ? params['defaultTab'] : '';
            inputType = params['inputType'] != undefined ? params['inputType'] : '';
            resDept = params['resDept'] != undefined ? params['resDept'] : '';
            maxNum = params['maxNum'] != undefined ? params['maxNum'] : '';
        }
        var url = workflow.webRoot + "/Platform/workflow-v2/common/users.aspx?maxNum=" + maxNum + "&defaultTab=" + defaultTab + "&operateType=" + operateType + "&type=" + inputType + "&resDept=" + resDept + "&BZBH=" + stepId + "&ZBZDYBH=" + nextStepId;
        var sFeatures = "dialogHeight:510px;dialogWidth:710px;status:no;help:no;scroll:no;resizable:no;location:no;toolbar:no;";
        var arrValue = window.showModalDialog(url, { users: $.trim(userId) }, sFeatures);
        if (arrValue == undefined) { //谷歌
            arrValue = window.returnValue;
        }
        return arrValue == '' ? null : eval('(' + arrValue + ')');
    }
    /***
     * 选择处理意见
     * 
     * @param 	subject		代码集编号
     */
    workflow.selectOpinion = function (subject) {
        var url = workflow.webRoot + "/Platform/workflow-v2/opinions.aspx?subject=" + subject;
        var sFeatures = "dialogHeight:505px;dialogWidth:520px;status:no;help:no;scroll:no;resizable:no;location:no;toolbar:no;";
        var arrValue = window.showModalDialog(url, {}, sFeatures);
        if (arrValue == undefined) { //谷歌
            arrValue = window.returnValue;
        }
        return arrValue;
    }
    /** 获取加载页面的body标签内容*/
    workflow.load = function (id, url, params, flag) {
        if ($(id).val() != '' && flag == false && $(id).find(".error").length == 0) {
            return;
        }
        if (id.indexOf("#") > -1) {
            document.getElementById(id.replace("#", "")).innerHTML = "";
        }
        $(id).empty();
        $.powerdata.load();
        //$.messager.progress({text : '正在努力加载...'});
        $(id).load(url + " body", params, function (data) {
            var contentData = data;
            var pattern = /<body[^>]*>((.|[\n\r])*)<\/body>/im;
            var matches = pattern.exec(data);
            if (matches) {
                contentData = matches[1];
            } 
            $.powerdata.closeLoading();
            $(this).html(contentData);
            //$.messager.progress("close");
        });
    }

    /**
    * 流程处理
    */
    workflow.transition2 = function (stepId) {
        var params = { 'BZBH': stepId, 'byWorkflowInfo': "true" };
        $("#stepDiv").empty();
        underway.changeUrl('transition', params, 'transition');
    }
    /**
     * 流程处理
     */
    workflow.processWorkflowAction = function (type, stepId, obj) {
        var params = { 'BZBH': stepId, 'byWorkflowInfo': "true" };
        try {
            if (type == 'sendBack') {
                workflow.underway.changeUrl('sendback', params, type);
            } else if (type == 'autoTransition') {
                workflow.callAutoTransition(stepId);
            } else if (type == 'transition') {
                $("#stepDiv").empty();
                workflow.underway.changeUrl(obj, params, type);
            } else if (type == 'helper') {
                workflow.callAutoTransition(stepId);
            } else if (type == 'reader') {
                workflow.underway.changeUrl('reader', params);
            } else if (type == 'copyReader') {
                workflow.underway.changeUrl(obj, params, type);
            } else if (type == 'historyList') {
                workflow.underway.changeUrl(obj, params);
            } else if (type == 'imageView') {
                var url1 = workflow.webRoot + '/Platform/workflow/workflowView.aspx?';
                url1 += ('BZBH=' + stepId);
                if (obj != null && obj.show != null) {
                    url1 += '&SHOW=' + obj.show;
                }
                workflow.reDirectUrl(url1);
            } else if (type == 'singleFinish') {
                workflow.underway.changeUrl('singleFinish', params, type);
            } else if (type == 'finish') {
                workflow.underway.changeUrl('finish', params, type);
            } else if (type == 'attachmentInfo') {
                workflow.underway.changeUrl('workflowAttachments', params);
            } else if (type == 'turnDeal') {
                workflow.underway.changeUrl('transition-turnDeal', params, type);
            }
        } catch (e) { }
    }
    /**
     * 显示任务详情
     */ 
    workflow.reDirectUrl = function (url) {
        $(".group").hide();
        document.getElementById('workflowOperateFrameDiv').style.display = 'none';
        document.getElementById('workflowOperateFrame').src = '';
        $("#iframeContent").show();
    }
    /**
     * 自动流转
     */
    workflow.callAutoTransition = function (stepId) {
        var params = { 'BZBH': stepId };
        var ret = DomUtils.ajaxRequest(workflow.autoTransition, params);
        if (ret != null && ret.result == 'true') {
            window.parent.underway.refresh('流转成功！');
        } else {
            var error = $("<div><div>" + ret.result + "</div></div>");
            var message = "";
            error.find(".actionError").each(function (index) {
                var message = (index + 1) + "、" + $(this).text() + "，<a href='javascript:void(0)' onclick=\"$('.transitionError2').window('close');underway.gotoAction('" + $(this).text() + "')\">点此</a>办理。";
                $(this).html(message);
            });
            error.find(".stepAttachmentsError").each(function () {
                var message = $(this).text() + "<a href='javascript:void(0)' onclick=\"$('.transitionError2').window('close');$('#btnAttachmentInfo').click()\">点此</a>上传。";
                $(this).html(message);
            });
            error.find("div").css("color", "red").css("padding", "10px");
            var errorWindow = $(".transitionError2");
            if (errorWindow.length == 0) {
                errorWindow = $("<div class='transitionError2'></div>")
                $(".underwayMain").append(errorWindow);
                error.appendTo(errorWindow);
                errorWindow.dialog({
                    title: '提示信息',
                    width: 330,
                    closable: true,
                    height: 200,
                    modal: true
                });
            } else {
                errorWindow.empty();
                error.appendTo(errorWindow);
                errorWindow.dialog('open');
            }
        }
    }
    /** 
     * 步骤处理 
     */
    workflow.processStepTransition = function (target, stepId, childrenId, isCountersignStep, isJointProcessStep) {
        var params = { "BZBH": stepId, "ZBZDYBH": childrenId, "byWorkflowInfo": "true" };
        if (isCountersignStep) {
            var url = '/Platform/workflow-v2/transition-countersign.aspx';
        } else if (isJointProcessStep) {
            var url = '/Platform/workflow-v2/transition-jointProcess.aspx';
        } else {
            var url = '/Platform/workflow-v2/transition.aspx';
        }
        $("#transitionDiv").empty();
        underway.changeUrl(url, params, "step");
    }

    /** 
     * 加签及返回处理
     */
    workflow.processSignStepTransition = function (target, stepId, operate) {
        var params = { "BZBH": stepId };
        if ('endorse' == operate) {
            var url = '/Platform/workflow-v2/transition-endorse.aspx';
        } else if ('feedback' == operate) {
            var url = '/Platform/workflow-v2/feedback.aspx';
        }
        $("#transitionDiv").empty();
        underway.changeUrl(url, params, "step");
    }

    /** 
     * 会办步骤处理 
     */
    workflow.jointProcessStepTransition = function (target, stepId, operate) {
        var params = { "BZBH": stepId };
        if ('transition' == operate) {
            var url = '/Platform/workflow-v2/transition-jointProcessTransition.aspx?';
        } else if ('feedback' == operate) {
            var url = '/Platform/workflow-v2/feedback-jointProcess.aspx?';
        }
        $("#transitionDiv").empty();
        underway.changeUrl(url, params, "step");
    }

    /** 设置iframe的高度 */
    workflow.setFrameAutoHeight = function (obj) {
        var frame = document.getElementById('workflowOperateFrame');
        win = frame.contentWindow,
        doc = win.document,
        html = doc.documentElement,
        body = doc.body;
        $("#workflowOperateFrame").css("height", (html.scrollHeight + 10) + "px");

        /*if(obj){
             if(obj.Document && obj.Document.body.scrollHeight){
                obj.height = obj.Document.body.scrollHeight;
             }else if (obj.contentDocument && obj.contentDocument.body.offsetHeight){
                obj.height = obj.contentDocument.body.offsetHeight;
             }
         }
         if(obj.height){
            obj.style.height = (parseFloat(obj.height)) + "px";
         }*/
    }

    /** 
     * 修改发起新任务的Url
     */
    workflow.start.changeUrl = function (url) {
        $(".center").css({ width: $(window).width() - 515 }).show();
        $(".right").show();
        $(".finishedContent").hide();
        if (url != '' && url != null) {
            if (url.charAt(0) != '/') {
                url = '/' + url;
            }
            //url = workflow.webRoot + url;
            url += (url.indexOf('?') >= 0 ? '&' : '?') + 'tmprandom=' + (Math.random() * 100000);
            $('#startFrame').height($(".center").height());
            $.powerdata.load();
            //$.messager.progress({text : '正在努力加载...'});
            $("#startFrame").on("load", function () {
                //$.messager.progress("close");
                $.powerdata.closeLoading();
            });
            document.getElementById('startFrame').src = url;
        }
    }

    /**
     * 进入待办任务页面
     */
    workflow.start.gotoUnderway = function (from) {
        window.location.href = workflow.webRoot + '/Platform/workflow-v2/underwayMain.aspx?from=' + from;
    }
    /** 修改流程操作的页面 */
    workflow.underway.changeUrl = function (url, params, type) {
        if (url != '' && url != null) {
            if (url.charAt(0) != '/') {
                url = '/' + url;
            } 
            url += (url.indexOf('?') >= 0 ? '&' : '?') + 'tmprandom=' + (Math.random() * 100000);

            var div = $("div[class='group'][id='" + type + "Div']");
            var flag = false;
            if (div.length != 1) {
                div = $("#workflowOperate");
                flag = true;
            }
            if (type == 'step') {
                flag = true;
            }
            div.show();
            $("div[class='group'][id!='" + div.attr("id") + "']").hide();
            workflow.load("#" + div.attr("id"), url, params, flag);
            $(".promptMessage").hide();
            document.getElementById('workflowOperateFrameDiv').style.display = 'none';
            document.getElementById('workflowOperateFrame').src = '';
            $("#iframeContent").hide();
        }
    }

    /**选中任务*/
    workflow.underway.selectWorkflow = function (bzbh) {

        //$.messager.progress({text : '正在努力加载...'});
        $.powerdata.load();
        $("#workflowInfoFrame").on("load", function () {
            //$.messager.progress("close");
            $.powerdata.closeLoading();
        });
        document.getElementById('workflowInfoFrame').src = workflow.webRoot + '/Platform/workflow-v2/workflowInfo.aspx?btnType=btnHome&BZBH=' + bzbh;
        if (underway.currentBtn != undefined) {
            underway.currentBtn = "btnHome";
        }
    }

    /**进入批量流转页面*/
    workflow.underway.gotoBatchTransition = function (lclxbh) {
        document.getElementById('workflowInfoFrame').src = workflow.webRoot + '/Platform/workflow-v2/batchTransition.aspx?LCLXBH=' + lclxbh;
    }

    /** 跳转到发起页面 */
    workflow.underway.gotoStart = function (from) {
        window.location.href = workflow.webRoot + '/Platform/workflow-v2/startMain.aspx?from=' + from;
    }

    /** 显示没有待办任务页面 */
    workflow.underway.noContent = function () {
        var url = workflow.webRoot + '/Platform/workflow-v2/noContent.aspx?type=underway';
        document.getElementById('workflowInfoFrame').src = url;
    }

    /** 选择用户 */
    workflow.underway.selectUsers = function (id, params) {
        var user = { "userId": $(id).val() };
        if (!params) {
            var params = user;
        } else if (!params.userId) {
            params.userId = user.userId;
        }
        var selectValue = workflow.selectUsers(params);
        if (selectValue != null) {
            this.createShowUsers(id, selectValue.userId.split(","), selectValue.userName.split(","));
        }
    }
    /**生成用户信息*/
    workflow.underway.createShowUsers = function (id, userIds, userNames) {
        var showElement = $(".user-select[valueTag=" + id + "]");
        showElement.find(".user-li").remove();
        if (userIds != "") {
            for (var i = 0; i < userIds.length; i++) {
                this.createShowUser(showElement, userIds[i], userNames[i]);
            }
        }
        this.resetUserValue(showElement);
    }
    /**生成一个用户信息*/
    workflow.underway.createShowUser = function (obj, userId, userName) {
        var addElement = obj.find(".user-add");
        var addUser = '<span class="user-li" userId="' + userId + '" userName="' + userName + '">' + userName + '<span class="user-cut">&nbsp;</span></span>';
        if (addElement.length > 0) {
            addElement.before(addUser);
        } else {
            obj.append(addUser);
        }
    }
    /**重置用户值*/
    workflow.underway.resetUserValue = function (obj) {
        var valueTag = obj.attr("valueTag");
        var desc = obj.attr("desc");
        var opinionObj = $(obj.attr("opinionTag"));
        var userLi = obj.find(".user-li");
        var addElement = obj.find(".user-add");
        var reader = obj.attr("reader");
        var userIds = [];
        var userNames = [];
        var readerUserNames = [];
        userLi.each(function () {
            userIds.push($(this).attr("userId"));
            userNames.push($(this).attr("userName"));
        });
        $(valueTag).val(userIds.join(","));
        if (userIds.length == 0) {
            if (reader != "true") {
                addElement.addClass("user-select-add");
                opinionObj.attr("masterOpinion", "");
            } else {
                opinionObj.attr("readerOpinion", "");
            }
        } else {
            if (reader != "true") {
                var masterOpinion = "请" + userNames.join("，") + desc;
                opinionObj.attr("masterOpinion", masterOpinion);
                addElement.removeClass("user-select-add");
            } else {
                var readerOpinion = "，请" + userNames.join("，") + "共阅";
                opinionObj.attr("readerOpinion", readerOpinion);
            }
        }
        underway.resetOpinion(opinionObj);
    }
    /**设置意见*/
    workflow.underway.resetOpinion = function (obj) {
        var modify = obj.attr("modify");
        var opinion = "";
        if (obj.attr("signatureOpinion")) {
            opinion += obj.attr("signatureOpinion");
        }
        if (obj.attr("masterOpinion")) {
            opinion += obj.attr("masterOpinion");
        }
        if (obj.attr("readerOpinion")) {
            opinion += obj.attr("readerOpinion");
        }
        if (modify != "1") {
            obj.val(opinion);
        }
    }
    /**添加主办人*/
    workflow.underway.addMasterUser = function (obj, id) {
        var masterDiv = $(".master-user-div[valueTag='" + id + "']");
        masterDiv.find(".close-div").remove();
        masterDiv.prepend("<div class='close-div'>&nbsp;</div>");
        var userId = $(id).val();
        masterDiv.find(".master-user").removeClass("master-user-checked").attr("checked", false);
        if (userId != "") {
            var userIds = userId.split(",");
            for (var i = 0; i < userIds.length; i++) {
                masterDiv.find(".master-user[userId='" + userIds[i] + "']").addClass("master-user-checked").attr("checked", true);
            }
        }
        var top = $(obj).offset().top + $(obj).height(); // $(obj).height();
        masterDiv.find(".close-div").css("left", $(obj).parent().width() - 30);
        var oldH = masterDiv.height();
        var newH = $(window).height() - top - 10;
        masterDiv.css("height", oldH > newH ? newH : oldH).css("width", $(obj).parent().width() - 15).css("top", top + "px").show();
    }
    workflow.underway.initUser = function () {
        try {
            $("body").on("click", ".master-user", function (event) {
                var type = $(this).attr("type");
                var userId = $(this).attr("userId");
                var checked = $(this).attr("checked");
                var userName = $(this).attr("userName");
                var valueTag = $(this).attr("valueTag");
                var showElement = $(".user-select[valueTag='" + valueTag + "']");
                if (type == 'SINGLE_MASTER') {
                    var wrapElement = $(this).parent().parent().parent();
                    wrapElement.find(".master-user").removeClass("master-user-checked").attr("checked", false);
                    showElement.find(".user-li").remove();
                }
                if (checked) {
                    showElement.find(".user-li[userId='" + userId + "']").remove();
                    $(this).removeClass("master-user-checked");
                } else {
                    underway.createShowUser(showElement, userId, userName);
                    $(this).addClass("master-user-checked");
                }
                $(this).attr("checked", !checked);
                underway.resetUserValue(showElement);
            });
            $("body").on("click", ".master-dept", function (event) {
                var deptId = $(this).attr("deptId");
                var deptChecked = $(this).attr("checked");
                var wrapElement = $(this).parent().parent();
                if (deptChecked) {
                    $(this).removeClass("master-dept-checked");
                } else {
                    $(this).addClass("master-dept-checked");
                }
                $(this).attr("checked", !deptChecked);
                wrapElement.find(".master-user[deptId='" + deptId + "']").each(function () {
                    var checked = $(this).attr("checked");
                    if (deptChecked) {
                        $(this).attr("checked", true);
                        $(this).click();
                    } else {
                        if (!checked) $(this).click();
                    }
                });
            });
            $("body").on("click", ".user-cut", function (event) {
                var userElement = $(this).parent();
                var wrapElement = userElement.parent();
                var userId = userElement.attr("userId");
                var valueTag = wrapElement.attr("valueTag");
                $(".master-user[valueTag='" + valueTag + "'][userId='" + userId + "']").removeClass("master-user-checked").attr("checked", false);
                userElement.remove();
                underway.resetUserValue(wrapElement);
            });
            $("body").on("mouseleave", ".master-div", function (event) {
                var userDiv = $(this).find(".master-user-div");
                var userSelect = $(this).find(".user-select")
                var valueTag = userSelect.attr("valueTag");
                var addElement = $(this).find(".user-add");
                userDiv.hide();
                if ($(valueTag).val() != "") {
                    addElement.removeClass("user-select-add");
                } else {
                    addElement.addClass("user-select-add");
                }
            });
            $("body").on("mouseenter", ".user-add", function (event) {
                if (!$(this).attr("onmouseenter")) {
                    underway.addMasterUser(this, $(this).attr("valueTag"));
                }
            });
            $("body").on("keyup", ".process-opinion", function (event) {
                var opinionVal = $(this).val();
                if (opinionVal != "") {
                    $(this).attr("modify", "1");
                } else {
                    $(this).attr("modify", "0");
                }
            });
            $("body").on("click", ".close-div", function (event) {
                $(this).parent().mouseleave();
            });
        } catch (e) {

        }
    }
    /** 选择处理意见 */
    workflow.underway.selectOpinion = function (id, subject, type) {
        workflow.selectOpinion(subject, function (res) {
            if (res != null) {
                if ('shortCut' == type) {
                    workflow.underway.renderShortCuts(id, subject, res);
                } else {
                    if (res != "") $(id).val(res);
                }
            } else {
                if ('shortCut' == type) {
                    workflow.underway.renderShortCuts(id, subject);
                }
            }
        }); 
    }

    /** 快捷键显示渲染、刷新 */
    workflow.underway.renderShortCuts = function (id, stepDefId, opinion) {
        var url = workflow.webRoot + "/Platform/workflow/AjaxLoadShortCuts.aspx?random=" + Math.random();
        var data; //= DomUtils.ajaxRequest(url,{dmjbh:stepDefId});
        var html = '';
        var newId = id.replace("#", "@");
        if (data && data.length) {
            $(".shortCuts").empty();
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                var currentOpinion = '';
                if (item.value == opinion) {
                    currentOpinion = 'currentOpinion';
                }
                html += '<label class="opin"><input id="' + item.codeId + newId + '" class="' + currentOpinion + '" type="radio" name="op" onclick="$(\'' + id + '\').val(\'' + item.value + '\');"/>' + item.value + "</label>";
            }
            $(".shortCuts[opinionTag='" + id + "']").append(html);
            $(".shortCuts[opinionTag='" + id + "']").find(".currentOpinion").click();
        }
    }

    /** 进入动作页面 */
    workflow.underway.gotoAction = function (actionName) {
        $(".rightBtn").each(function () {
            if ($(this).find("span").text() == actionName) {
                $(this).click();
            }
        });
    }

    /** 获取未完成的动作和附件 */
    workflow.underway.queryUnfinishedActionAndAttachment = function (url, bzbh) {
        var obj = DomUtils.ajaxRequest(url, { 'BZBH': bzbh });
        if (obj) {
            if ((obj.actions != null && obj.actions.length > 0)
                    || (obj.attachments != null && obj.attachments.length > 0)) {
                $(".promptMessage").addClass("error").append("<span>您有以下必须处理的事项尚未处理：</span><ul></ul>");
            } else {
                $(".promptMessage").removeClass("error");
            }
            var index = 1;
            if (obj.actions != null && obj.actions.length > 0) {
                for (var i = 0; i < obj.actions.length; i++) {
                    $(".promptMessage ul").append("<li>").append(index++).append("、")
                        .append(obj.actions[i].DZMC)
                        .append("，<a href='javascript:void(0)' onclick=\"underway.gotoAction('" + obj.actions[i].DZMC + "')\"'>点此</a>办理。")
                        .append("</li>");
                }
            }
            if (obj.attachments != null && obj.attachments.length > 0) {
                var str = '';
                for (var i = 0; i < obj.attachments.length; i++) {
                    str += obj.attachments[i] + '，';
                }
                if (str != '') {
                    str = str.substring(0, str.length - 1);
                }
                $(".promptMessage ul").append("<li>").append(index++).append("、附件（").append(str).append("），<a href='javascript:void(0)' onclick=\"$('#btnAttachmentInfo').click()\">点此</a>上传。</li>");
            }
        }
    }

    /**
    * 验证步骤中动作的连接
    * 
     url 地址, 
     lcbh 流程编号, 
     lcdybh 流程定义编号, 
     bzbh 步骤编号,  
     bzdybh 步骤定义编号, 
     businessId 业务编号 , 
     actionType 动作处理类型，如弹出窗口,
     actionBxcl 动作必须处理, 
     readOnly 页面是否只读 , 
     LCZTM 流程状态码, 
     dzgxbh 动作Id （步骤关联编号）
    */
    workflow.validateActionUrl2 = function (obj, url, lcbh, lcdybh, bzbh, bzdybh, businessId, actionType, actionBxcl, readOnly, LCZTM, dzgxbh) {
        if (url != "") {
            url += "&LCBH=" + lcbh;
            url += "&LCDYBH=" + lcdybh;
            url += "&businessId=" + businessId;
            url += "&BZBH=" + bzbh;
            url += "&BZDYBH=" + bzdybh;
            url += "&actionType=" + actionType;
            url += "&BXCL=" + actionBxcl;
            url += "&SFZD=" + readOnly;
            url += "&LCZTM=" + LCZTM;
            url += "&dzgxbh=" + dzgxbh;
            if (url.indexOf("openNewWindow=true") != -1) {
                workflow.openWin(url, 800, 600);
            } else {
                $(".group").hide();
                $(".promptMessage").hide();
                document.getElementById('workflowOperateFrameDiv').style.display = '';
                //$('#workflowOperateFrame').height($(window).height() - $(".contentDiv").offset().top - $(".showSteps").height());
                document.getElementById('workflowOperateFrame').src = url;
                $('#workflowOperateFrame').height($(".contentDiv").height());
                $("#iframeContent").hide();
            }
            return true;
        } else {
            var text = obj.innerText || obj.textContent;
            workflow.alert("尚未配置 [" + text + "] 的链接");
            return false;
        }
    }

    /** 
     * 刷新页面
     */
    workflow.refresh = function (type) {
        try {
            if (window.parent) {
                if (window.parent.parent) {
                    if (window.parent.parent.underway.refresh) {
                        window.parent.parent.underway.refresh();
                    }
                } else if (window.parent.underway.refresh) {
                    window.parent.underway.refresh();
                }
            }
        } catch (e1) {
            try {
                if (window.opener) {
                    if (window.opener.parent) {
                        if (window.opener.parent.underway.refresh) {
                            window.opener.parent.underway.refresh();
                        }
                    }
                }
            } catch (e2) {
                if (window.parent.start) {
                    window.parent.PageTo(1);
                }
            }
        }
        try {
            if ("start" == type) {
                window.parent.PageTo(1);
            }
        } catch (e3) {
        }
    }


    /**
     * 打开窗口
     */
    workflow.openWin = function (url, width, height, isMax, scrollbars) {
        var l = (window.screen.availWidth - width) / 2;
        var t = (window.screen.availHeight - height) / 2;
        var WinName = "";
        var sFeatures = 'left=' + l + ',top=' + t + ',height=' + height + ',width=' + width + ',help=no,status=yes,toolbar=no,directories=no,resizable=yes,location=0,menubar=0,scrollbars=' + ((scrollbars === undefined) ? 'yes' : scrollbars);
        var w = window.open(url, WinName, sFeatures);
        if (isMax) {
            w.moveTo(-4, -4);
            w.resizeTo(screen.availWidth + 9, screen.availHeight + 9);
        }
        return w;
    }
    /**完成步骤事件*/
    workflow.finishedSteps = {};
    workflow.finishedSteps.init = function () {
        $(".opinion").each(function () {
            var reader = $(this).find(".reader");
            var flag = reader.attr("flag");
            if (!flag) {
                reader.attr("flag", true)
            } else {
                return;
            }
            if (reader.length > 0) {
                reader.hide();
                reader.not(':first').find(".step-processer").addClass("reader-indent");
                var firstReader = reader.first();
                firstReader.show();
                firstReader.find(".step-processer").prepend("传阅：");
                if (reader.length > 1) {
                    var more = '<div class="desc"><span class="step-processer">&nbsp;</span><span class="reader-list" onclick="finishedSteps.showReader(this);">查看更多(' + (reader.length - 1) + ')</span></div>';
                    firstReader.parent().append(more);
                    $(this).parent().find(".step-line").css("height", "40px");
                }
            }
        });
        $("tr[parallel=true]").each(function () {
            var cur = $(this);
            var prev = cur.prev();
            if ("true" != prev.attr("parallel")) {
                cur.find(".step-line").css("background", "none").empty();
                cur.find(".time-span").empty();
                prev.find(".step-line").css("background", "none").empty();
                prev.find(".time-span").empty();
            }
        });
        $(".agree .desc").each(function () {
            var maxWidth = $(window).width() - 580;
            $(this).css("max-width", (maxWidth > 120 ? maxWidth : 120) + "px");
        });
        $(".step-revoke").each(function () {
            var text = $(this).text();
            if (text.indexOf("{") > -1) {
                var res = eval('(' + text + ')');
                if (res.result == 'yes') {
                    $(this).html("撤回");
                    $(this).css("display", "inline-block");
                } else {
                    $(this).remove();
                }
            }
        });
    }
    workflow.finishedSteps.showReader = function (obj) {
        $(obj).parent().find("span").show();
        var trParent = $(obj).parent().parent().parent();
        trParent.find(".reader").show();
        trParent.find(".step-line").height(trParent.height() - 80);
        $(obj).parent().remove();
    }
    workflow.finishedSteps.revoke = function (params) {
        var url = workflow.webRoot + '/Platform/workflow-V2/autoRevoke.aspx?' + params;
        var obj = DomUtils.ajaxRequest(url);
        if (obj.Result) {
            try {
                window.parent.underway.refresh("撤回成功!");
            } catch (e) { }
            try {
                window.parent.finishedWorkflows.renderTable();
            } catch (e) { }
        } else {
            workflow.alert(obj.Message);
        }
    }
})(window.workflow);
