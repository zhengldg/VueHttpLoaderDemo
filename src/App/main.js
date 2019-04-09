var Home = httpVueLoader($$.appPath + 'App/home/home.vue')
var router = new VueRouter({
    routes: [
        { path: '/', component: Home }
    ]
});

// 公用的
Vue.mixin({
    methods: {
        getImg(fileName, basePath) {
            if (!basePath) {
                basePath = this.$root.appPath + "Resources/Skins/images/";
            }
            return basePath + fileName;
        },
        loadChart(id, option) {
            var myChart = echarts.init(document.getElementById(id));
            myChart.setOption(option);
            return myChart;
        }
    }
});

//vuex
Vue.use(Vuex);
var store = new Vuex.Store({
    modules: {
        user: { // 用户模块
            state: {
                yhid: 'SYSTEM'
            }
        },
        home: { // Home模块
            state: {
                dateType: 1,
                date: '2019-05'
            },
            mutations: {
                changeDateType(sta,dateType) {
                    sta.dateType = dateType;
                },
                changeDate(date) {
                    state.date = date;
                }
            }
        }
    }
});

var app = new Vue({
    router: router,
    data: {
        appPath: $$.appPath
    },
    store: store,
    filters: {
        fmtDate(input, format) {
            if (!input) return '';
            if (!format) {
                format = 'YYYY-MM-DD';
            }
            return moment(input).format(format);
        }
    }
}).$mount('#app')