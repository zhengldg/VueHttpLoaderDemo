$$.chart = {
    splitLine: {
        lineStyle: {
            opacity: 0.2
        },

    },
    axisLabel: {
        color: '#9ECEF2'
    }
};


$$.configs = {
    winMax: ["1000px", "580px"],
    winArea: ["950px", "450px"],
    winMiddle: ["750px", "350px"],
    winSmall: ["400px", "200px"]
}

function marquee(id, option) {
    option = option || {};
    if (top["sc_timer"]) {
        clearInterval(top["sc_timer"]);
    }

    try { document.execCommand("BackgroundImageCache", false, true); } catch (e) { };
    var sc_container = document.getElementById(id);
    if (sc_container == null) return;
    var original = sc_container.getElementsByTagName("dt")[0],
        clone = sc_container.getElementsByTagName("dd")[0],
        speed = option.speed || 80;
    clone.innerHTML = original.innerHTML;
    var rolling = function () {
        if (sc_container.scrollTop == clone.offsetTop) {
            sc_container.scrollTop = 0;
        } else {
            sc_container.scrollTop++;
        }
    }
    top["sc_timer"] = setInterval(rolling, speed)//设置定时器
    sc_container.onmouseover = function () { clearInterval(top["sc_timer"]) }//鼠标移到marquee上时，清除定时器，停止滚动
    sc_container.onmouseout = function () { top["sc_timer"] = setInterval(rolling, speed) }//鼠标移开时重设定时器
    return top["sc_timer"];
}