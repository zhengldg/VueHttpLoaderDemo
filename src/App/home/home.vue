<template>
    <div>
        <div class="header">
            <img src="Resources/skins/images/logo.png" alt="" class="hd-logo">
            <div class="wrap-1">
                <label>数据时间：</label>
                <ul class="ul-1">
                    <li :class="{on:dateType==1}" v-on:click="dateType=1">累计</li>
                    <li :class="{on:dateType==2}" v-on:click="dateType=2">当期</li>
                    <li :class="{on:dateType==3}" v-on:click="dateType=3">自定义</li>
                </ul>
                <span class="date-zdy">2019/01~2019/02</span>
                <!--<label style="padding-left: 10px;">数据时间：</label>
            <ul class="ul-1">
                <li>累计</li>
                <li>当期</li>
            </ul>-->
                <label style="padding-left: 10px;">水系：</label>
                <div class="xlcd-box">
                    <p class="result">水系选择</p>
                    <ul class="xlcd-itmes">
                        <li class="on">水系选择</li>
                        <li>水系选择-2</li>
                        <li>水系选择-3</li>
                    </ul>
                </div>
                <label style="padding-left: 10px;">图层选择：</label>
                <div class="xlcd-box" style="width: 150px;">
                    <p class="result">图层选择</p>
                    <ul class="xlcd-itmes">
                        <li class="on">图层选择</li>
                        <li>图层选择-2</li>
                        <li>图层选择-3</li>
                    </ul>
                </div>
            </div>
            <a class="shjfx-detail" v-on:click="showAnalysis()" href="#">
                <em>水环境详情分析</em>
            </a>
        </div>
        <div class="cont rel" id="main">
            <div class="left-list-wrap nice-scroll">
                <div class="list-item" v-bind:class="{on:DMType=='SZPM'}" v-on:click="switchDMType('SZPM')">
                    <h4 class="tit">水质排名</h4>
                    <div class="sma-item">
                        <p>全省排名</p>
                        <b v-text="waterRankList_HZ.QNPM"></b>
                    </div>
                    <div class="sma-item">
                        <p>水质指数</p>
                        <b v-text="waterRankList_HZ.YZZ"></b>
                    </div>
                </div>
                <div class="list-item" :class="{on:DMType=='GKDM'}" v-on:click="switchDMType('GKDM')">
                    <h4 class="tit">国考断面</h4>
                    <div class="sma-item">
                        <p>功能区达标率</p>
                        <b v-text="DBL.GKDM.Item1"><em>%</em></b>
                    </div>
                    <div class="sma-item">
                        <p>Ⅰ~Ⅲ类达标率</p>
                        <b v-text="DBL.GKDM.Item2">82.3<em>%</em></b>
                    </div>
                </div>
                <div class="list-item" :class="{on:DMType=='SKDM'}" v-on:click="switchDMType('SKDM')">
                    <h4 class="tit">省考断面</h4>
                    <div class="sma-item">
                        <p>功能区达标率</p>
                        <b v-text="DBL.SKDM.Item1">82.3<em>%</em></b>
                    </div>
                    <div class="sma-item">
                        <p>Ⅰ~Ⅲ类达标率</p>
                        <b v-text="DBL.SKDM.Item2">82.3<em>%</em></b>
                    </div>
                </div>
                <div class="list-item" :class="{on:DMType=='SHIKDM'}" v-on:click="switchDMType('SHIKDM')">
                    <h4 class="tit">市控断面</h4>
                    <div class="sma-item">
                        <p>功能区达标率</p>
                        <b v-text="DBL.SHIKDM.Item1">82.3<em>%</em></b>
                    </div>
                    <div class="sma-item">
                        <p>Ⅰ~Ⅲ类达标率</p>
                        <b class="color-dangerous" v-text="DBL.SHIKDM.Item2">82.3<em>%</em></b>
                    </div>
                </div>
                <div class="list-item" :class="{on:DMType=='JJDM'}" v-on:click="switchDMType('JJDM')">
                    <h4 class="tit">交接断面</h4>
                    <div class="sma-item">
                        <p>考核等级</p>
                        <b v-text="DBL.JJDM.Item1"></b>
                    </div>
                    <div class="sma-item">
                        <p>Ⅰ~Ⅲ类达标率</p>
                        <b class="color-dangerous" v-text="DBL.JJDM.Item2"><em>%</em></b>
                    </div>
                </div>
                <div class="list-item" :class="{on:DMType=='YYSY'}" v-on:click="switchDMType('YYSY')">
                    <h4 class="tit">饮用水源</h4>
                    <div class="gap" style="height: 50px;"></div>
                    <div class="big-item">
                        <label>达标率</label>
                        <b>{{DBL.YYSY.Item1}}%</b>
                    </div>
                </div>
                <div class="list-item" :class="{on:DMType=='DXSZ'}" v-on:click="switchDMType('DXSZ')">
                    <h4 class="tit">地下水质</h4>
                    <div class="gap" style="height: 50px;"></div>
                    <div class="big-item">
                        <label>评价结果</label>
                        <b v-text="DBL.DXSZ.Item1"></b>
                    </div>
                </div>
            </div>
            <button class="btn-reset-map" v-on:click="gisDmShow=true">重置地图</button>
            <img :src="getImg('map.png')" class="map">
            <img :src="getImg('tuli.png')" alt="" class="imt-tuli">
            <div class="progress-bar-wrap">
                <i class="btn-start"></i>
                <div class="progress-bar">
                    <div class="progress"></div>
                    <i class="gress-point">
                        <div class="pop-info">2018-01-22 11:52</div>
                    </i>
                    <ul class="date-list">
                        <li>2018/01/18</li>
                        <li>2018/01/19</li>
                        <li class="curr-day">2018/01/20</li>
                        <li>2018/01/21</li>
                        <li>2018/01/22</li>
                        <li>2018/01/23</li>
                        <li>2018/01/24</li>
                        <li>2018/01/25</li>
                    </ul>
                </div>
            </div>

            <!-- 右侧滑动弹窗部分 3 个 -->
            <div class="rtbox rtbox-1" style="display: none;">
                <i class="icon-slide"></i>
                <h4 class="rt-hd">杭州水系总览</h4>
                <div class="rt-bd">
                    <p class="txtcont">杭州市河流纵横，湖荡密布，平原地区水网密度约达每平方公里10公里，水资源和水利资源丰富。杭州市主要河流有钱塘江、苕溪、城市内河等。</p>
                    <ul class="ul-2">
                        <li class="on"><span>钱塘江</span></li>
                        <li><span>苕溪</span></li>
                        <li><span>城市内河</span></li>
                    </ul>

                    <div class="tb-wrap">
                        <table class="table-1">
                            <tr>
                                <td class="label">流域面积（km²）：</td>
                                <td>3257</td>
                                <td class="label">流域面积（km²）：</td>
                                <td>238</td>
                            </tr>
                            <tr>
                                <td class="label">河口流量（m³/s）：</td>
                                <td>3257</td>
                                <td class="label">河口流量（m³/s）：</td>
                                <td>3257</td>
                            </tr>
                            <tr>
                                <td class="label">省考断面（个）：</td>
                                <td>3257</td>
                                <td class="label">省考断面（个）：</td>
                                <td>3257</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            <div class="rtbox rtbox-2" style="display: none;">
                <i class="icon-slide"></i>
                <h4 class="rt-hd">国考断面水质构成分析</h4>
                <div class="ec-wrap">
                    <img :src="getImg('pie_1.png')" />
                </div>
                <h4 class="rt-hd">功能区达标率同比变化</h4>
                <div class="ec-wrap">
                    <img :src="getImg('pie_2.png')" />
                </div>
                <h4 class="rt-hd">Ⅰ~Ⅲ类达标率同比变化</h4>
                <div class="ec-wrap">
                    <img :src="getImg('pie_3.png')" />
                </div>
            </div>
            <div class="rtbox rtbox-3" v-show="DMType=='SZPM'">
                <i class="icon-slide"></i>
                <h4 class="rt-hd">城市水质排名</h4>
                <p class="curr-rank">浙江省排名 <b v-text="waterRankList_HZ.QNPM"></b> <!--同比<i class="ic-zz"></i> 1--></p>
                <h4 class="rt-hd">全省水质指数排名({{waterRankList_HZ.PMSJ}})</h4>
                <div class="more-rank">
                    <table class="table-2">
                        <colgroup>
                            <col width="33.3%" />
                            <col width="33.3%" />
                            <col width="33.3%" />
                        </colgroup>
                        <thead>
                            <tr>
                                <td>排序</td>
                                <td>区县名称</td>
                                <td>水质指数</td>
                            </tr>
                        </thead>
                    </table>
                    <div style="height: 460px;" class="nice-scroll">
                        <table class="table-2">
                            <colgroup>
                                <col width="33.3%" />
                                <col width="33.3%" />
                                <col width="33.3%" />
                            </colgroup>
                            <tbody>
                                <tr v-for="item in waterRankList">
                                    <td><img :src="getImg('rank_'+ item.QNPM+'.png')" v-if="item.QNPM<=3"> <span v-if="item.QNPM>3" v-text="item.QNPM"></span> </td>
                                    <td v-text="item.CDMC"></td>
                                    <td v-text="item.YZZ"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div class="rtbox rtbox-3" v-show="isDMType">
                <i class="icon-slide"></i>
                <!--<h4 class="rt-hd">城市水质排名</h4>-->
                <h4 class="rt-hd">断面水质构成分析</h4>
                <div id="dmChart1" style="width:420px;height:170px"></div>
                <h4 class="rt-hd">功能达标率同比变化</h4>
                <div id="dmChart2" style="width:420px;height:170px"></div>
                <h4 class="rt-hd">Ⅰ~Ⅲ类达标率同比变化</h4>
                <div id="dmChart3" style="width:420px;height:170px"></div>
            </div>
        </div>
        <water-analysis ref="refWaterAnalysis" :date-type="dateType" :date="date" v-if="waterAnalsisShow" v-on:close="waterAnalsisShow=false"></water-analysis>
        <gis-dm-detail ref="refGisDmDetail" :date-type="dateType" :date="date" v-on:close="gisDmShow=false" v-if="gisDmShow"></gis-dm-detail>
    </div>
</template>
<script src="App/home/home.js">
</script>