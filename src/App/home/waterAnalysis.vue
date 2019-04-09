<!-- 水环境分析详情 -->
<template>
    <div>
        <div class="mask" style="display: block;" ></div>
        <div class="dlg dlg-2" style="display: block;" >
            <p class="dlg-tit">水环境详情分析 <em class="date" v-text="date"></em></p>
            <i class="dlg-clo" v-on:click="$emit('close')"></i>
            <ul class="ul-6">
                <li :class="{on:tabType=='Dbs'}" v-on:click="switchTab('Dbs')"><span class="fx-1">地表水水质分析</span></li>
                <li :class="{on:tabType=='Yys'}" v-on:click="switchTab('Yys')"><span class="fx-2">饮用水源地水质分析</span></li>
                <li :class="{on:tabType=='Jjdm'}" v-on:click="switchTab('Jjdm')"><span class="fx-3">交接断面水质分析</span></li>
                <li :class="{on:tabType=='Wryzx'}" v-on:click="switchTab('Wryzx')"><span class="fx-4">污染源在线排放分析</span></li>
                <li :class="{on:tabType=='Ndqk'}" v-on:click="switchTab('Ndqk')"><span class="fx-5">年度任务完成情况</span></li>
            </ul>
            <water-analysis-dbs ref="refWaterAnalysisDbs"  :date-type="dateType" :date="date" v-bind:tab-type="tabType" v-show="tabType=='Dbs'||tabType=='Yys'"></water-analysis-dbs> <!--地表水-->
            <water-analysis-jjdm ref="refWaterAnalysisJjdm"  :date-type="dateType" :date="date" v-bind:tab-type="tabType" v-show="tabType=='Jjdm'"></water-analysis-jjdm> <!--交接断面-->
            <water-analysis-wryzx ref="refWaterAnalysisWryzx"  :date-type="dateType" :date="date" v-bind:tab-type="tabType" v-show="tabType=='Wryzx'"></water-analysis-wryzx> <!--污染源在线排放分析-->
        </div>
    </div>
</template>
<script>
    var pageUrl = $$.appPath + 'Home/';
    var WaterAnalysisDbs = httpVueLoader($$.appPath + 'App/home/WaterAnalysisDbs.vue');
    var WaterAnalysisJjdm = httpVueLoader($$.appPath + 'App/home/WaterAnalysisJjdm.vue');
    var WaterAnalysisWryzx = httpVueLoader($$.appPath + 'App/home/WaterAnalysisWryzx.vue');
    module.exports = {
        props:['dateType', 'date'],
        components: {
            WaterAnalysisDbs: WaterAnalysisDbs,
            WaterAnalysisJjdm: WaterAnalysisJjdm,
            WaterAnalysisWryzx: WaterAnalysisWryzx
        },
        data: function () {
            return {
                visible: false,
                tabType: 'Dbs',// 选项卡当前类型
            }
        },
        mounted: function () {
            initSheji();
        },
        computed: {
        },
        watch: {
        },
        methods: {
            toggle() { //关闭或者显示弹出框
                this.visible = !this.visible;
            },
            switchTab(tabType) {
                this.tabType = tabType;
            }
        },
        filters: {
        }
    }

    /**设计部的初始化 */
    function initSheji() {
        // 滚动条美化插件
        $(".nice-scroll").niceScroll({
            touchbehavior: false,
            cursorcolor: "#2c84de",
            cursoropacitymax: 1,
            cursorwidth: 4,
            cursorborder: 'none',
            background: "#001d3d",
            enableobserver: true
        })
    }
</script>