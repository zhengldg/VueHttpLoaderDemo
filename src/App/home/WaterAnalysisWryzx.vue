<!-- 水环境分析详情 -->
<template>
    <div>
        <p class="pdesc" >{{date}}，杭州市污染源排放量，污水259.12万吨，同比上升3.5个百分点。</p>
        <div class="row" style="margin: 0 10px;">
            <div class="col col-4">
                <div class="dlgbox" style="height: 230px;">
                    <h4 class="tit">污染源概况</h4>
                    <p class="pdesc-2">全市废水污染源共有350家，监控点数共390个</p>
                    <ul class="ul-10">
                        <li class="wr-1"><label>国控</label><b>100</b></li>
                        <li class="wr-2"><label>省控</label><b>100</b></li>
                        <li class="wr-3"><label>市控</label><b>100</b></li>
                        <li class="wr-4"><label>区控及<br />其他</label><b>100</b></li>
                    </ul>
                </div>
                <div class="gap"></div>
                <div class="dlgbox" style="height: 230px;">
                    <h4 class="tit">累计排放量</h4>
                    <ul class="ul-9">
                        <li class="pf-1">
                            <b>污水</b>
                            <h4>289.15<em>万吨</em></h4>
                        </li>
                        <li class="pf-2">
                            <b>COD</b>
                            <h4>289.15<em>万吨</em></h4>
                        </li>
                        <li class="pf-3">
                            <b>氨氮</b>
                            <h4>289.15<em>万吨</em></h4>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col col-4">
                <div class="dlgbox" style="height: 472px;">
                    <h4 class="tit">
                        区县污染源排放分析
                        <ul class="ul-8">
                            <li class="on">废水</li>
                            <li>COD</li>
                            <li>氨氮</li>
                        </ul>
                    </h4>
                    <div class="ec-wrap" style="margin: 10px 0">
                        <img :src="getImg('ec_7.png')" style="max-width: 97%;" />
                    </div>
                </div>
            </div>
            <div class="col col-4">
                <div class="dlgbox" style="height: 230px;">
                    <h4 class="tit">
                        排放量行业分析
                        <ul class="ul-8">
                            <li class="on">废水</li>
                            <li>COD</li>
                            <li>氨氮</li>
                        </ul>
                    </h4>
                    <div class="ec-wrap">
                        <img :src="getImg('ec_8.png')" style="max-width: 97%;" />
                    </div>
                </div>
                <div class="gap"></div>
                <div class="dlgbox" style="height: 230px;">
                    <h4 class="tit">
                        排放大户
                        <ul class="ul-8">
                            <li class="on">废水</li>
                            <li>COD</li>
                            <li>氨氮</li>
                        </ul>
                    </h4>
                    <div class="ec-wrap">
                        <img :src="getImg('ec_9.png')" style="max-width: 97%;" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    var pageUrl = $$.appPath + 'Home/';
    module.exports = {
        props: ['tabType', 'dateType', 'date'],
        data: function () {
            return {
                visible: false
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
            loadHomeData() { // 加载页面数据
            },
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