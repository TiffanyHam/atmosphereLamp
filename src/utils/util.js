export const format = (date, fmt) => {
    let ret;
    let o = {
        'y+': date.getFullYear(),
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'H+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'W+': date.getDay()
    };
    for (let k in o) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            let str = o[k].toString();
            let len = ret[1].length;
            str = len === 1 ? str : str.padStart(len, "0");
            fmt = fmt.replace(ret[1], str);
        };
    };
    return fmt;
};

export const getLanguage = () => {
    let language;
    let defualtLanguage = 'zh';
    // let language = window.hilink.getAppLanguage();
    let reg = /^zh-/i;
    if (navigator && navigator.language) {
        language = reg.test(navigator.language) ? defualtLanguage : 'en';
    } else {
        language = defualtLanguage;
    }
    return language;
};

export const replaceDateString = function (str) {
    let _str = str.replace(/-/g, '');
    _str = _str.replace(/:/g, '');
    _str = _str.replace(/\.\d*/g, '');
    return _str;
};
export const callHilinkFn = function (eventName, options) {
    // console.log('callHilinkFn', options)
    let _o = options || [];
    window.hilink && window.hilink[eventName] && window.hilink[eventName].apply(window.hilink, _o);
};

export const praseResponseData = function (resData) {
    // 解析返回的数据
    try {
        return JSON.parse(resData);
    } catch (error) {
        var dataStr = resData.replace(/:"{/g, ':{');
        dataStr = dataStr.replace(/}",/g, '},');
        dataStr = dataStr.replace(/\\/g, '');
        return JSON.parse(dataStr);
    }
};

export const createCb = function (t, cbArr) {
    // 创建回调函数到window对象下，其他页面引入调用方式如下，页面中menthods需存在数组中对应的函数
    // createCb(this, ['resultCallback']);
    let i = 0,
        len = cbArr.length;
    for (; i < len; i++) {
        let cb = cbArr[i];
        window[cb] = function (res) {
            t[cb] && t[cb](praseResponseData(res));
        };
    }
};
export const formatWeek = function (num) {
    let arr = [
        {
            text: 'cycle.monday1',
            week: 1
        },
        {
            text: 'cycle.tuesday1',
            week: 2
        },
        {
            text: 'cycle.wednesday1',
            week: 4
        },
        {
            text: 'cycle.thursday1',
            week: 8
        },
        {
            text: 'cycle.friday1',
            week: 16
        },
        {
            text: 'cycle.saturday1',
            week: 32
        },
        {
            text: 'cycle.sunday1',
            week: 64
        }
    ];
    let weekArr = [];
    for (let i = 6; i >= 0; i--) {
        if (num >= arr[i].week) {
            num -= arr[i].week;
            weekArr.push(arr[i].text);
        }
    }
    return weekArr;
};

export const formatWeekMsg = function (item) {
    let obj = {
        0: 'cycle.once',
        31: 'cycle.dayTime',
        96: 'cycle.weekTime',
        127: 'cycle.everyDay'
    };
    if ([0, 31, 96, 127].includes(item.week)) {
        return this.$t(obj[item.week]);
    }
    let arr = formatWeek(item.week).reverse();
    arr = arr.map(item => this.$t(item));
    return arr.join(' ');
};
export const formatMsg = function (str) {
    if (str) {
        let h = (+str.slice(0, 2) + 8) % 24;
        h = h < 10 ? `0${h}` : h;
        return `${h}:${str.slice(2, 4)}`;
    }
    return '';
};
export const getDayCountOfMonth = (date) => {
    let d = new Date(date);
    let month = d.getMonth();
    let year = d.getFullYear();
    if (month === 3 || month === 5 || month === 8 || month === 10) {
        return 30;
    }
    if (month === 1) {
        return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0 ? 29 : 28;
    }
    return 31;
};

export const calcTotalPower = (arr) => {
    let obj = {};
    let total = 0;
    arr.forEach(item => {
        total += (item.data && item.data.consumption) || 0;
    });
    obj.data = {};
    obj.data.consumption = total;
    obj.sid = arr[0].sid;
    obj.timestamp = arr[0].timestamp;
    return obj;
};
export const toFixed = (num, len) => {
    return +num.toFixed(len);
};

// 将02:45换成秒数
export const changeSec = (time) => {
    const $time = time
    const min = $time.split(':')[0] * 1
    const sec = $time.split(':')[1] * 1
    return min * 60 + sec
}

// 小于10的数字补零
export const addZero = (num) => {
    const $num = num * 1
    if ($num < 10) {
        return '0' + $num
    } else {
        return $num
    }
}

// 将2021/4/15转化为20210415
export const formatDate = (date) => {
    const $date = date
    const arr = $date.split('/')
    const yyyy = arr[0]
    const mm = addZero(arr[1])
    const dd = addZero(arr[2])
    return yyyy + mm + dd
}

// 将1,2,3,4,5,6,7转化为星期一到星期日
export const changeNumToWeek = (num) => {
    const obj_zh = {
        1: '星期一',
        2: '星期二',
        3: '星期三',
        4: '星期四',
        5: '星期五',
        6: '星期六',
        0: '星期日'
    }
    const obj_en = {
        1: 'Monday',
        2: 'Tuesday',
        3: 'Wednesday',
        4: 'Thursday',
        5: 'Friday',
        6: 'Saturday',
        0: 'Sunday'
    }
    const lan = getLanguage()
    if (lan === 'zh') {
        return obj_zh[num]
    } else {
        return obj_en[num]
    }
}