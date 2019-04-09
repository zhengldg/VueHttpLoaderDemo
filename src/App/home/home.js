var pageUrl = $$.appPath + 'Home/';
var DMCache = {}; //断面缓存
var WaterAnalysis = httpVueLoader($$.appPath + 'App/home/WaterAnalysis.vue');
var GisDmDetail = httpVueLoader($$.appPath + 'App/home/GisDmDetail.vue');
module.exports = {
    components: {
        WaterAnalysis: WaterAnalysis,
        GisDmDetail: GisDmDetail
    },
    data: function () {
        return {
            dateType: 1,//数据时间类型 1 累计 2当期
            date: '2019-04',
            DMType: 'SZPM' // 当前选择的业务类型
            , waterRankList: [] // 水质断面排名数据
            , waterRankList_HZ: {} // 杭州水质排名数据
            , DBL: {
                GKDM: {Item1:'', Item2:''},
                SKDM: { Item1: '', Item2: ''},
                SHIKDM: { Item1: '', Item2: ''},
                JJDM: { Item1: '', Item2: '' },
                YYSY: { Item1: '', Item2: ''},
                DXSZ: { Item1: '', Item2: ''}
            } // 左侧达标率数据
            , gisDmShow: false // 是否显示gis弹出框
            , waterAnalsisShow: false// 是否显示水环境详情分析
        }
    },
    mounted: function () {
        initSheji();
        this.loadHomeData();
    },
    computed: {
        isDMType() { // 当前是否为断面类型业务
            return this.DMType.indexOf("DM") > 0;
        }
    },
    watch: {
    },
    methods: {
        loadHomeData() { // 加载页面数据
            $.get(pageUrl + 'GetHomeData', res => {
                var waterRankList = res.waterRankList || [];
                this.waterRankList = waterRankList;
                for (var i = 0; i < waterRankList.length; i++) {
                    if (waterRankList[i].CDMC == '杭州市') {
                        this.waterRankList_HZ = waterRankList[i];
                        break;
                    }
                }
                this.DBL = res.DBL;
            })
        },
        loadDMChart() { //加载断面统计图
            var that = this;
            this.getChartData()
                .then(res => {
                    res = res || {};
                    var data_t = [{ Item1: 'Ⅰ', Item2: 10, Item3: 1, }, { Item1: 'Ⅲ', Item2: 8, Item3: 3 }];
                    var data = [];
                    for (var i = 0; i < data_t.length; i++) {
                        var item = data_t[i];
                        var colorItem = getWaterLevel(item.Item3);

                        data.push({
                            name: item.Item1,
                            value: item.Item2,
                            itemStyle: {
                                color: colorItem && colorItem.color
                            }
                        });
                    };
                    // 水质构成分析
                    (function () {
                        var option = {
                            title: {
                                text: '',
                            },
                            tooltip: {
                                trigger: 'item',
                                formatter: "{a} <br/>{b} : {c}个 ({d}%)"
                            },
                            series: [
                                {
                                    name: '水质类别',
                                    type: 'pie',
                                    radius: ['50%', '70%'],
                                    center: ['50%', '50%'],
                                    data: data,
                                    labelLine: {
                                        length: 2,
                                        length2: 3
                                    }, 
                                    label: {
                                        normal: {
                                            show: true,
                                            formatter: '{b}: {d}%',
                                        },
                                    },
                                    itemStyle: {
                                        emphasis: {
                                            shadowBlur: 10,
                                            shadowOffsetX: 0,
                                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                                        }
                                    }
                                }
                            ]
                        };
                        that.loadChart('dmChart1', option);
                    })();

                    // 功能区达标率同比变化
                    (function () {
                        var list = [{ Item1: '2017-05-01', Item2: 50 },{ Item1: '2018-05-01', Item2: 60 }, { Item1: '2019-05-01', Item2: 70 }];
                        var xdata = [], ydata = [];
                        for (var i = 0; i < list.length; i++) {
                            xdata.push(moment(list[i].Item1).format('YYYY'));
                            ydata.push(list[i].Item2 || 0);
                        }

                        option = {
                            grid: {
                                left: 50,
                                right: 30,
                                top: 40,
                                bottom: 20,
                            },
                            tooltip: {
                                trigger: 'axis'
                            },
                            xAxis: {
                                type: 'category',
                                boundaryGap: false,

                                //splitNumber: 8,
                                data: xdata,
                                axisLabel: {
                                    textStyle: {
                                        color: '#d8f1ff'
                                    }
                                },
                                axisLine: {
                                    lineStyle: {
                                        color: '#d8f1ff'
                                    }
                                }
                            },
                            yAxis: {
                                type: 'value',
                                boundaryGap: [0, '100%'],
                                name: '达标率',
                                min: 0,
                                max: 100,
                                axisLabel: {
                                    textStyle: {
                                        color: '#d8f1ff'
                                    }
                                },
                                splitLine: {
                                    lineStyle: {
                                        opacity: 0.4
                                    }
                                },
                                axisLine: {
                                    lineStyle: {
                                        color: '#d8f1ff'
                                    }
                                }
                            },
                            series: [
                                {
                                    name: '达标率(%)',
                                    type: 'line',
                                    smooth: true,
                                    symbol: 'none',
                                    sampling: 'average',
                                    itemStyle: {
                                        normal: {
                                            color: '#69c0ff'
                                        }
                                    },
                                    areaStyle: {
                                        normal: {
                                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                                offset: 0,
                                                color: '#01F1F1'
                                            }, {
                                                offset: 1,
                                                    color: '#0E3134'
                                            }])
                                        }
                                    },
                                    data: ydata
                                }
                            ]
                        };
                        that.loadChart("dmChart2",option);
                    })();

                    // I~III达标率同比变化
                    (function () {
                        var list = [{ Item1: '2017-05-01', Item2: 80 }, { Item1: '2018-05-01', Item2: 60 }, { Item1: '2019-05-01', Item2: 90 }];
                        var xdata = [], ydata = [];
                        for (var i = 0; i < list.length; i++) {
                            xdata.push(moment(list[i].Item1).format('YYYY'));
                            ydata.push(list[i].Item2 || 0);
                        }

                        option = {
                            grid: {
                                left: 50,
                                right: 30,
                                top: 40,
                                bottom: 20,
                            },
                            tooltip: {
                                trigger: 'axis'
                            },
                            xAxis: {
                                type: 'category',
                                boundaryGap: false,

                                //splitNumber: 8,
                                data: xdata,
                                axisLabel: {
                                    textStyle: {
                                        color: '#d8f1ff'
                                    }
                                },
                                axisLine: {
                                    lineStyle: {
                                        color: '#d8f1ff'
                                    }
                                }
                            },
                            yAxis: {
                                type: 'value',
                                boundaryGap: [0, '100%'],
                                name: '达标率(%)',
                                min: 0,
                                max: 100,
                                axisLabel: {
                                    textStyle: {
                                        color: '#d8f1ff'
                                    }
                                },
                                splitLine: {
                                    lineStyle: {
                                        opacity: 0.4
                                    }
                                },
                                axisLine: {
                                    lineStyle: {
                                        color: '#d8f1ff'
                                    }
                                }
                            },
                            series: [
                                {
                                    name: '达标率',
                                    type: 'line',
                                    smooth: true,
                                    symbol: 'none',
                                    sampling: 'average',
                                    itemStyle: {
                                        normal: {
                                            color: '#69c0ff'
                                        }
                                    },
                                    areaStyle: {
                                        normal: {
                                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                                offset: 0,
                                                color: '#31F766'
                                            }, {
                                                offset: 1,
                                                    color: '#3E7155'
                                            }])
                                        }
                                    },
                                    data: ydata
                                }
                            ]
                        };
                        that.loadChart("dmChart3", option);
                    })();
                });
        },
        getChartData() { // 获取断面统计图数据
            var data = null;
            var that = this;
            return new Promise(function (resolve, rejct) {
                console.log(DMCache);
                if (DMCache[that.DMType]) {
                    resolve(DMCache[that.DMType]);
                } else {
                    $.post(pageUrl + 'GetDMChartData', { type: that.DMType }, res => {
                        DMCache[that.DMType] = res;
                        resolve(res);
                    });
                }
            });
        },
        switchDMType(type) { // 切换左侧断面类型
            this.DMType = type;
            if (this.isDMType) {
                this.loadDMChart();
            }
        },
        showAnalysis() {
            this.waterAnalsisShow = true;
        }
    },
    filters: {
    }
}

/**设计部的初始化 */
function initSheji() {
    // 设置中间方框的高度
    var winH = $(window).height()
    var hdH = $('.header').height()
    var gap = 15
    $('#main').height(winH - hdH)


    $('.icon-slide').click(function () {
        var flag = $(this).hasClass('on')
        console.log(flag)
        if (flag) {
            $(this).removeClass('on')
            $(this).parent().animate({ right: '10px' }, 'fast')
        } else {
            $(this).addClass('on')
            $(this).parent().animate({ right: '-420px' }, 'fast')
        }
    })

    $('.btn-start').click(function () {
        var progressWidth = $('.progress-bar').width();
        $(this).toggleClass('on');
        $('.progress').animate({ width: progressWidth }, 10000)
        $('.gress-point').animate({ left: progressWidth }, 10000)
    })
    $('.xlcd-box>p').click(function (event) {
        event.stopPropagation()
        $(this).parent().addClass('on')
        $(this).siblings().toggle()
    })
    $('.xlcd-box>ul>li').click(function (event) {
        event.stopPropagation()
        $(this).addClass('on').siblings().removeClass('on')
        $(this).parent().hide()
        $(this).parent().parent().removeClass('on')
        $(this).parent().siblings().text($(this).text())
    })
    $(document).click(function () {
        $('.xlcd-box>ul').hide()
        $('.xlcd-box').removeClass('on')
    })

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

function getWaterLevel(p) {
    var res = null;
    if (p == 1) res = { name: 'Ⅰ', color: '#44c5fd' };
    else if (p == 2) res = { name: 'Ⅱ', color: '#51a5fd' };
    else if (p == 3) res = { name: 'Ⅲ', color: '#73bb31' };
    else if (p == 4) res = { name: 'Ⅳ', color: '#eebd15' };
    else if (p == 5) res = { name: 'Ⅴ', color: '#f88e17' };
    else if (p == 6) res = { name: '劣V', color: '#ee3b5b' };
    return res;
}