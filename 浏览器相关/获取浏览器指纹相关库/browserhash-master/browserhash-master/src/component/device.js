var previousDevice = window.device;
var device = {};
var changeOrientationList = [];
var userAgent = window.navigator.userAgent.toLowerCase();
var television = [
    'googletv',
    'viera',
    'smarttv',
    'internet.tv',
    'netcast',
    'nettv',
    'appletv',
    'boxee',
    'kylo',
    'roku',
    'dlnadoc',
    'roku',
    'pov_tv',
    'hbbtv',
    'ce-html'
];

device.macos = function () {
    return find('mac')
};

device.ios = function () {
    return device.iphone() || device.ipod() || device.ipad()
};

device.iphone = function () {
    return !device.windows() && find('iphone')
};

device.ipod = function () {
    return find('ipod')
};

device.ipad = function () {
    return find('ipad')
};

device.android = function () {
    return !device.windows() && find('android')
};

device.androidPhone = function () {
    return device.android() && find('mobile')
};

device.androidTablet = function () {
    return device.android() && !find('mobile')
};

device.blackberry = function () {
    return find('blackberry') || find('bb10') || find('rim')
};

device.blackberryPhone = function () {
    return device.blackberry() && !find('tablet')
};

device.blackberryTablet = function () {
    return device.blackberry() && find('tablet')
};

device.windows = function () {
    return find('windows')
};

device.windowsPhone = function () {
    return device.windows() && find('phone')
};

device.windowsTablet = function () {
    return device.windows() && (find('touch') && !device.windowsPhone())
};

device.fxos = function () {
    return (find('(mobile') || find('(tablet')) && find(' rv:')
};

device.fxosPhone = function () {
    return device.fxos() && find('mobile')
};

device.fxosTablet = function () {
    return device.fxos() && find('tablet')
};

device.meego = function () {
    return find('meego')
};

device.cordova = function () {
    return window.cordova && location.protocol === 'file:'
};

device.nodeWebkit = function () {
    return typeof window.process === 'object'
};

device.mobile = function () {
    return (
        device.androidPhone() ||
        device.iphone() ||
        device.ipod() ||
        device.windowsPhone() ||
        device.blackberryPhone() ||
        device.fxosPhone() ||
        device.meego()
    )
};

device.tablet = function () {
    return (
        device.ipad() ||
        device.androidTablet() ||
        device.blackberryTablet() ||
        device.windowsTablet() ||
        device.fxosTablet()
    )
};

device.desktop = function () {
    return !device.tablet() && !device.mobile()
};

device.television = function () {
    var i = 0;
    while (i < television.length) {
        if (find(television[i])) {
            return true
        }
        i++
    }
    return false
};

device.portrait = function () {
    if (Object.prototype.hasOwnProperty.call(window, 'onorientationchange') && screen.orientation && screen.orientation.type) {
        return screen.orientation.type.includes('portrait')
    } else {
        return window.innerHeight / window.innerWidth > 1
    }
};

device.landscape = function () {
    if (Object.prototype.hasOwnProperty.call(window, 'onorientationchange') && screen.orientation && screen.orientation.type) {
        return screen.orientation.type.includes('landscape')
    } else {
        return window.innerHeight / window.innerWidth < 1
    }
};

device.noConflict = function () {
    window.device = previousDevice;
    return this
};

function find(needle) {
    return userAgent.indexOf(needle) !== -1
}

function handleOrientation() {
    if (device.landscape()) {
        walkOnChangeOrientationList('landscape')
    } else {
        walkOnChangeOrientationList('portrait')
    }
    setOrientationCache()
}

function walkOnChangeOrientationList(newOrientation) {
    for (var index in changeOrientationList) {
        changeOrientationList[index](newOrientation)
    }
}

device.onChangeOrientation = function (cb) {
    if (typeof cb === 'function') {
        changeOrientationList.push(cb)
    }
};

var orientationEvent = 'resize';

if (Object.prototype.hasOwnProperty.call(window, 'onorientationchange')) {
    orientationEvent = 'orientationchange'
}

if (window.addEventListener) {
    window.addEventListener(orientationEvent, handleOrientation, false)
} else if (window.attachEvent) {
    window.attachEvent(orientationEvent, handleOrientation)
} else {
    window[orientationEvent] = handleOrientation
}

handleOrientation();

function findMatch(arr) {
    for (var i = 0; i < arr.length; i++) {
        if (device[arr[i]]()) {
            return arr[i]
        }
    }
    return 'unknown'
}

device.type = findMatch(['mobile', 'tablet', 'desktop']);

device.os = findMatch([
    'ios',
    'iphone',
    'ipad',
    'ipod',
    'android',
    'blackberry',
    'windows',
    'fxos',
    'meego',
    'television'
]);

function setOrientationCache() {
    device.orientation = findMatch(['portrait', 'landscape'])
}

setOrientationCache();

module.exports = device;