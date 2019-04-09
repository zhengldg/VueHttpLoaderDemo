<!-- 水环境分析详情 -->
<template>
    <div>
        <div class="mask" style="display: block;"></div>
        <div class="dlg dlg-1">
            <p class="dlg-tit">断面详情</p>
            <i class="dlg-clo" v-on:click="$emit('close')"></i>
            <div class="dlg-lf">
                <h4 class="dmdd">西溪湿地</h4>
                <ul class="ul-3">
                    <li>国考断面</li>
                    <li>省控断面</li>
                </ul>
                <div class="tb-wrap-2">
                    <table class="table-3">
                        <tr>
                            <td class="label">所在区县：</td>
                            <td>杭州市上城区</td>
                        </tr>
                        <tr>
                            <td class="label">所属水系：</td>
                            <td>钱塘江</td>
                        </tr>
                        <tr>
                            <td class="label">所在河流：</td>
                            <td>钱塘江</td>
                        </tr>
                        <tr>
                            <td class="label">经度：</td>
                            <td>202.11</td>
                        </tr>
                        <tr>
                            <td class="label">纬度：</td>
                            <td>12.121</td>
                        </tr>
                    </table>
                </div>
                <img :src="getImg('pic_xc.png')" alt="" class="img-xc" />
                <button class="btn-fjwry">附近污染源</button>
            </div>
            <div class="dlg-rt">
                <p class="pppanel">
                    <span class="tit tit-1">当期水质（2019-03）</span>
                    <em class="level-3">Ⅲ类</em>
                </p>
                <ul class="ul-4">
                    <li>
                        <label>功能区：Ⅱ类</label>
                        <img :src="getImg('ic_st_1.png')">
                        <em class="st-1 bgcolor-2">达标</em>
                    </li>
                    <li>
                        <label>功能区：Ⅱ类</label>
                        <img :src="getImg('ic_st_2.png')">
                        <em class="st-1 bgcolor-0">不达标</em>
                    </li>
                    <li>
                        <label>平均综合污染指数：</label>
                        <b>0.126</b>
                    </li>
                </ul>
                <p class="dm-data">断面污染物数据</p>
                <table class="table-4">
                    <tr>
                        <td>
                            <label>pH 酸碱度：<b>1.23</b></label>
                            <em class="st-1 bgcolor-1">Ⅰ类</em>
                        </td>
                        <td>
                            <label>DO 溶解氧：<b>2.23</b></label>
                            <em class="st-1 bgcolor-1">Ⅱ类</em>
                        </td>
                        <td>
                            <label>CODMn 高锰酸盐指数：<b>3.23</b></label>
                            <em class="st-1 bgcolor-1">Ⅲ类</em>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>TP 总磷：<b>1.23</b></label>
                            <em class="st-1 bgcolor-2">Ⅰ类</em>
                        </td>
                        <td colspan="2">
                            <label>NH3-N 氨氮：<b>2.23</b></label>
                            <em class="st-1 bgcolor-3">Ⅰ类</em>
                        </td>
                    </tr>
                </table>
                <div class="gap"></div>
                <p class="pppanel" style="border-top: 1px solid #1d4383;">
                    <span class="tit tit-2">历年水质变化</span>
                </p>
                <img :src="getImg('pic_sz.png')" />
                <p class="pppanel">
                    <span class="tit tit-3">污染物浓度变化趋势</span>
                </p>
                <ul class="ul-5">
                    <li class="on">电导率</li>
                    <li>高锰酸钾</li>
                    <li>氨氮</li>
                    <li>PH值</li>
                    <li>溶解氧</li>
                    <li>浊度</li>
                </ul>
                <div class="gap"></div>
                <img :src="getImg('ec_4.png')" />
                <p class="pppanel">
                    <span class="tit tit-4">监测数据查询</span>
                </p>
                <div class="wrap-2">
                    <label>监测时间：</label>
                    <div class="xlcd-box">
                        <p class="result">2019-01</p>
                        <ul class="xlcd-itmes">
                            <li class="on">2019-01</li>
                            <li>2019-02</li>
                            <li>2019-03</li>
                        </ul>
                    </div>
                    <label style="color: #1793e6;">----</label>
                    <div class="xlcd-box">
                        <p class="result">2019-01</p>
                        <ul class="xlcd-itmes">
                            <li class="on">2019-01</li>
                            <li>2019-02</li>
                            <li>2019-03</li>
                        </ul>
                    </div>
                    <button class="btn-srh">查询</button>
                </div>
                <table class="table-5">
                    <thead>
                        <tr>
                            <td>监测时间</td>
                            <td>当期水质</td>
                            <td>电导率</td>
                            <td>高锰酸钾</td>
                            <td>氨氮</td>
                            <td>PH值</td>
                            <td>溶解氧</td>
                            <td>浊度</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>2019-01</td>
                            <td>Ⅱ类</td>
                            <td>1.23</td>
                            <td>1.23</td>
                            <td>1.23</td>
                            <td>1.23</td>
                            <td>1.23</td>
                            <td>1.23</td>
                        </tr>
                        <tr>
                            <td>2019-01</td>
                            <td>Ⅱ类</td>
                            <td>1.23</td>
                            <td>1.23</td>
                            <td>1.23</td>
                            <td>1.23</td>
                            <td>1.23</td>
                            <td>1.23</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
    var pageUrl = $$.appPath + 'Home/';
    module.exports = {
        props: ['dateType', 'date'],
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
            toggle() {
                this.visible = !this.visible;
            },
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