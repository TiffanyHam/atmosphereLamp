//import store from "@/store";
(function (global, factory) {
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        global.Ble = factory;
    }
})(window, (function () {

    function praseData (resData) {
        try {
            return JSON.parse(resData);
        } catch (error) {
            var dataStr = resData.replace(/:"{/g, ':{');
            dataStr = dataStr.replace(/}",/g, '},');
            dataStr = dataStr.replace(/\\/g, '');
            return JSON.parse(dataStr);
        }
    }

    function callHilink (op) {
        var _op = op || {},
            fn = window.hilink && window.hilink[_op.name],
            _options = _op.options || [];
        if (_op.cb) {
            var cbName = _op.cbName || _op.name + 'Cb';
            window[cbName] = res => {
                _op.cb(praseData(res));
            };
            _options.push(cbName);
        }
        if (_op.needReturn) {
            return fn && fn.apply(window.hilink, _options);
        }
        fn && fn.apply(window.hilink, _options);
    }

    function analysisMac (str) {
        if (str) {
            var result = [];
            for (let i = 0; i < str.length; i += 2) {
                result.push(str[i] + str[i + 1]);
            }
            return result.join(':');
        }
        return '';
    }

    function Ble (options) {
        var op = options || {};
        this.serviceId = op.serviceId || ''; // 蓝牙协议ID
        this.characteristicId = op.characteristicId || ''; // 蓝牙协议读取ID
        this.writeCharacteristicId = op.writeCharacteristicId || ''; // 蓝牙协议写入ID
        this.status = 0; // 0：初始未连接状态 1：连接中 2：已连接 3: 连接超时
        this.devInfo = {}; // 设备在云端的信息

        this.watchStatus = op.watchStatus; // 监听连接状态函数
        this.getDevInfo = op.getDevInfo;
        this.watchVal = op.watchVal; // 监听连接状态函数

        this.isIOS = false;
        this.deviceId = ''; // 蓝牙设备连接ID
        this.iosDeviceId = '';
        this.timer = null;
        this.isBleAdapterOpened = true; // 手机蓝牙是否打开
    }

    /* 初始化 获取手机系统 */
    Ble.prototype.init = function () {
        var _this = this;
        callHilink({
            name: 'getSystemInfoSync',
            cb: function (res) {
                _this.isIOS = res.platform === 'iOS';
               // console.log('手机系统---ios', _this.isIOS, res);
                _this.listeningBleChange();
                _this.getBleState();
            }
        });
    }

    /* 监听手机蓝牙状态 */
    Ble.prototype.listeningBleChange = function () {
        var _this = this;
        callHilink({
            name: 'onBluetoothAdapterStateChange',
            cb: function (data) {
                //console.log('监听蓝牙状态变化', data);
                if (data.available) {
                    _this.isBleAdapterOpened = true;
                    _this.getRegisteredDevice();
                } else {
                    _this.isBleAdapterOpened = false;
                    _this.changeStatus(0);
                    _this.clearTimer();
                }
            }
        });
    }

    /* 获取手机蓝牙状态 */
    Ble.prototype.getBleState = function () {
        var _this = this;
        callHilink({
            name: 'getBluetoothAdapterState',
            cb: function (data) {
               // console.log('手机蓝牙当前状态', data);
                if (data.available) {
                    _this.getRegisteredDevice();
                } else {
                    _this.openBlueTooth();
                }
            }
        });
    }

    /* 宫格页面中选择的已注册的设备 */
    Ble.prototype.getRegisteredDevice = function () {
        var _this = this;
        _this.changeStatus(1);
        callHilink({
            name: 'getCurrentRegisteredDevice',
            cb: function (data) {
               // console.log('宫格页面中选择的已注册的设备', data);
                _this.devInfo = data.hilinkDeviceEntity || {};
                _this.getDevInfo && _this.getDevInfo(_this.devInfo);
                if (_this.isIOS) {
                    _this.iosDeviceId = data.deviceId;
                    _this.getIosDevices();
                } else {
                    _this.deviceId = data.deviceId;
                    _this.connect();
                }
            }
        });
        _this.createTimer();
    }

    Ble.prototype.getIosDevices = function () {
        var _this = this;

        callHilink({
            name: 'onBluetoothDeviceFound',
            cb: function (data) {
                var mac = '';
                if (data.advertisData) {
                    var advertisData = data.advertisData;
                    advertisData = advertisData.replace(/\s+/g, '');
                    advertisData = advertisData.slice(-13, -1).toLocaleUpperCase();
                    mac = analysisMac(advertisData);
                }
                // console.log('扫描到的设备', data, _this.iosDeviceId);
                if (_this.iosDeviceId === data.deviceId || mac === _this.iosDeviceId) {
                   // console.log('匹配到的设备', data, mac, _this.iosDeviceId);
                    _this.stopBleDevicesDiscovery();
                    _this.deviceId = data.deviceId;
                    _this.connect();
                }
            }
        });

        callHilink({
            name: 'startBluetoothDevicesDiscovery',
            options: [[], false, 1]
        });
    }

    /* 连接设备 */
    Ble.prototype.connect = function () {
        var _this = this;
       // deviceId = 
       // console.log('连接设备');
        callHilink({
            name: 'onBLEConnectionStateChange',
            cb: function (data) {
               // console.log('data',data);
                if (data.connected) {
                   // console.log('连接成功');
                    _this.bleServicesDiscovered();
                } else {
                  //  console.log('断开连接');
                    if (_this.status !== 3 && _this.isBleAdapterOpened) {
                        _this.reConnect();
                    }
                }
            }
        });
       // console.log('>>>>>>>>>>>>>>', _this.deviceId);
        callHilink({
            name: 'createBLEConnection',
            options: [_this.deviceId]
        });
    }

    /* 重新连接 */
    Ble.prototype.reConnect = function () {
        this.createTimer();
        this.changeStatus(1);
        if (this.deviceId) {
            this.connect();
            return;
        }
        this.init();
    }

    /* 设备连接成功通知上层 */
    Ble.prototype.bleServicesDiscovered = function () {
        var _this = this;
        callHilink({
            name: 'onBLEServicesDiscovered',
            cb: function (res) {
                if (res == 0 || res.errCode == 0) {
                    var status = callHilink({
                        name: 'notifyBLECharacteristicValueChange',
                        options: [_this.deviceId, _this.serviceId, _this.characteristicId, true],
                        needReturn: true
                    });
                   // console.log('连接成功------------notify', status, _this.deviceId, _this.serviceId, _this.characteristicId);
                    if (status === 0) {
                        _this.watchBleData(_this.watchVal);
                        _this.changeStatus(2);
                        _this.clearTimer();
                    }
                }
            }
        });
    }

    /* 发送蓝牙数据 */
    Ble.prototype.send = function (data) {
        //console.log('this.deviceId, this.serviceId, this.writeCharacteristicId, data',this.deviceId, this.serviceId, this.writeCharacteristicId, data)
        callHilink({
            name: 'writeBLECharacteristicValue',
            options: [this.deviceId, this.serviceId, this.writeCharacteristicId, data],
            cb: function (res) {
                if (res === 0) {
                    console.log('写数据成功', res);
                }
            }
        });
    }
    
    Ble.prototype.watchBleData = function (fn) {
        var _this = this;
        callHilink({
            name: 'onBLECharacteristicValueChange',
            cb: function (res) {
                fn && fn(res);
            }
        });
    }

    /* 断开蓝牙连接 */
    Ble.prototype.closeBLEConnection = function () {
        callHilink({
            name: 'closeBLEConnection',
            options: [this.deviceId]
        });
    }

    /* 打开手机蓝牙 */
    Ble.prototype.openBlueTooth = function () {
        callHilink({name: 'openBluetoothAdapter'});
    }

    /* 停止搜索蓝牙设备 */
    Ble.prototype.stopBleDevicesDiscovery = function () {
        callHilink({name: 'stopBluetoothDevicesDiscovery'});
    }

    /* 设置超时 */
    Ble.prototype.createTimer = function () {
       // console.log('设置定时器');
        var _this = this;
        if (_this.timer) clearTimeout(_this.timer);
        _this.timer = setTimeout(function () {
            if (_this.isIOS) {
                _this.stopBleDevicesDiscovery();
            }
            _this.changeStatus(3);
            _this.clearTimer();
            _this.timer = null;
        }, 30 * 1000);
    }

    Ble.prototype.clearTimer = function () {
       // console.log('清除定时器');
        clearTimeout(this.timer);
    }

    /* 改变状态 */
    Ble.prototype.changeStatus = function (val) {
        this.status = val;
        this.watchStatus && this.watchStatus(val);
    }

    return Ble;
})())