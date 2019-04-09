<!-- 水环境分析详情 -->
<template>
    <div>
        <p class="pdesc">{{date}}，全市52个市控以上断面中，Ⅰ-Ⅲ类水质断面45个，占86.5%，同比下降3.8个百分点；满足功能要求的断面47个，达标率为90.4%，同比下降1.9个百分点。</p>
        <div class="row" style="margin: 0 10px;">
            <div class="col col-4">
                <div class="dlgbox" style="height: 240px;">
                    <h4 class="tit">断面水质构成分析</h4>
                    <h4 class="khjg"><b>优秀</b> <em>去年同期 良好</em></h4>
                    <ul class="ul-7">
                        <li>
                            <b>高锰酸盐</b>
                            <p><label class="ic-ss">同比</label><b>2.4%</b></p>
                        </li>
                        <li>
                            <b>总磷</b>
                            <p><label class="ic-xj">同比</label><b>2.4%</b></p>
                        </li>
                        <li>
                            <b>氨氮</b>
                            <p><label class="ic-xj">同比</label><b>2.4%</b></p>
                        </li>
                    </ul>
                </div>
                <div class="gap"></div>
                <div class="dlgbox" style="height: 240px;">
                    <h4 class="tit">主要污染物及超标率</h4>
                    <p style="text-align: center;">
                        <img :src="getImg('tuli_3.png')">
                    </p>
                    <div class="wrap-4">
                        <div class="cir-1">
                            <b>8.78%</b>
                        </div>
                        <div class="cir-2">
                            <b>8.78%</b>
                        </div>
                        <div class="cir-3">
                            <b>72.33%</b>
                        </div>
                        <div class="cir-4">
                            <b>8.78%</b>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col col-4">
                <div class="dlgbox" style="height: 492px;">
                    <h4 class="tit">逐月水质分析</h4>
                    <div class="ec-wrap">
                        <img :src="getImg('ec_6.png')" style="max-width: 98%" />
                    </div>
                </div>
            </div>
            <div class="col col-4">
                <div class="dlgbox" style="height: 492px;">
                    <h4 class="tit">断面超标清单</h4>
                    <div class="tb-wrap">
                        <table class="table-2">
                            <thead>
                                <tr>
                                    <td>断面名称</td>
                                    <td>目标</td>
                                    <td>本期</td>
                                    <td>同比</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>渔山</td>
                                    <td><em class="level bgcolor-1">Ⅰ类</em></td>
                                    <td><em class="level bgcolor-2">Ⅱ类</em></td>
                                    <td><em class="level bgcolor-3">Ⅲ类</em></td>
                                </tr>
                                <tr>
                                    <td>萧山进化</td>
                                    <td><em class="level bgcolor-3">Ⅲ类</em></td>
                                    <td><em class="level bgcolor-4">Ⅳ类</em></td>
                                    <td><em class="level bgcolor-5">Ⅴ类</em></td>
                                </tr>
                                <tr>
                                    <td>街口</td>
                                    <td><em class="level bgcolor-3">Ⅲ类</em></td>
                                    <td><em class="level bgcolor-4">Ⅳ类</em></td>
                                    <td><em class="level bgcolor-5">Ⅴ类</em></td>
                                </tr>
                                <tr>
                                    <td>渔山</td>
                                    <td><em class="level bgcolor-1">Ⅰ类</em></td>
                                    <td><em class="level bgcolor-2">Ⅱ类</em></td>
                                    <td><em class="level bgcolor-3">Ⅲ类</em></td>
                                </tr>
                                <tr>
                                    <td>萧山进化</td>
                                    <td><em class="level bgcolor-3">Ⅲ类</em></td>
                                    <td><em class="level bgcolor-4">Ⅳ类</em></td>
                                    <td><em class="level bgcolor-5">Ⅴ类</em></td>
                                </tr>
                                <tr>
                                    <td>街口</td>
                                    <td><em class="level bgcolor-3">Ⅲ类</em></td>
                                    <td><em class="level bgcolor-4">Ⅳ类</em></td>
                                    <td><em class="level bgcolor-5">Ⅴ类</em></td>
                                </tr>
                                <tr>
                                    <td>渔山</td>
                                    <td><em class="level bgcolor-1">Ⅰ类</em></td>
                                    <td><em class="level bgcolor-2">Ⅱ类</em></td>
                                    <td><em class="level bgcolor-3">Ⅲ类</em></td>
                                </tr>
                                <tr>
                                    <td>萧山进化</td>
                                    <td><em class="level bgcolor-3">Ⅲ类</em></td>
                                    <td><em class="level bgcolor-4">Ⅳ类</em></td>
                                    <td><em class="level bgcolor-5">Ⅴ类</em></td>
                                </tr>
                                <tr>
                                    <td>街口</td>
                                    <td><em class="level bgcolor-3">Ⅲ类</em></td>
                                    <td><em class="level bgcolor-4">Ⅳ类</em></td>
                                    <td><em class="level bgcolor-5">Ⅴ类</em></td>
                                </tr>
                                <tr>
                                    <td>渔山</td>
                                    <td><em class="level bgcolor-1">Ⅰ类</em></td>
                                    <td><em class="level bgcolor-2">Ⅱ类</em></td>
                                    <td><em class="level bgcolor-3">Ⅲ类</em></td>
                                </tr>
                                <tr>
                                    <td>渔山</td>
                                    <td><em class="level bgcolor-1">Ⅰ类</em></td>
                                    <td><em class="level bgcolor-2">Ⅱ类</em></td>
                                    <td><em class="level bgcolor-3">Ⅲ类</em></td>
                                </tr>
                            </tbody>
                        </table>
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
            console.log(this.tabType,'----');
            initSheji();
        },
        computed: {
        },
        watch: {
            tabType(newVal, oldVal) {
            }
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