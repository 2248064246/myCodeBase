var platform = require('./component/platform');
var fonts = require('./component/fonts');
var canvas = require('./component/canvas');
var lied = require('./component/lied');
var audio = require('./component/audio');
var plugins = require('./component/plugins');
var component = require('./core/component');
var x64hash128 = require('./core/x64hash128');
var device = require('./component/device');
var hash = new component();

hash.add('user_agent', function (next) {
    next(navigator.userAgent);
});

hash.add('hardware_concurrency', function (next) {
    next(navigator.hardwareConcurrency || 'unknown');
});


hash.add('language', function (next) {
    next(navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage || '');
});

hash.add('languages', function (next) {
    next(navigator.languages || []);
});

hash.add('color_depth', function (next) {
    next(window.screen.colorDepth || -1);
});

hash.add('device_memory', function (next) {
    next(navigator.deviceMemory || -1);
});

hash.add('pixel_ratio', function (next) {
    next(window.devicePixelRatio || '');
});

hash.add('resolution', function (next) {
    next((window.screen.height > window.screen.width) ? [window.screen.height, window.screen.width] : [window.screen.width, window.screen.height]);
});

hash.add('available_resolution', function (next) {
    next((window.screen.availHeight > window.screen.availWidth) ? [window.screen.availHeight, window.screen.availWidth] : [window.screen.availWidth, window.screen.availHeight]);
});

hash.add('timezone_offset', function (next) {
    next(new Date().getTimezoneOffset());
});

hash.add('cookie_enabled', function (next) {
    next(!!navigator.cookieEnabled);
});

hash.add('session_storage', function (next) {
    var result;
    try {
        result = !!window.sessionStorage
    } catch (e) {
        result = true
    }
    next(result);
});

hash.add('local_storage', function (next) {
    var result;
    try {
        result = !!window.localStorage
    } catch (e) {
        result = true
    }
    next(result);
});

hash.add('indexed_db', function (next) {
    var result;
    try {
        result = !!window.indexedDB
    } catch (e) {
        result = true
    }
    next(result);
});

hash.add('add_behavior', function (next) {
    next(!!(document.body && document.body.addBehavior));
});

hash.add('open_database', function (next) {
    var result;
    try {
        result = !!window.openDatabase
    } catch (e) {
        result = true
    }
    next(result);
});

hash.add('cpu_class', function (next) {
    next(navigator.cpuClass || 'unknown');
});

hash.add('navigator_platform', function (next) {
    next(navigator.platform || 'unknown');
});

hash.add('plugins', function (next) {
    next(plugins.getBrowserPlugins());
});

hash.add('canvas', function (next) {
    next(x64hash128(canvas.getCanvasHash(), 31));
});

hash.add('webgl', function (next) {
    next(x64hash128(canvas.getWebglHash(), 31));
});

hash.add('audio_hash', function (next) {
    audio.audioFingerprint(next);
});

hash.add('adblock', function (next) {
    var result = false;
    var ads = document.createElement('div'), className = 'adsbox';
    ads.innerHTML = '&nbsp;';
    ads.className = className;
    try {
        document.body.appendChild(ads);
        result = document.getElementsByClassName(className)[0].offsetHeight === 0;
        document.body.removeChild(ads);
    } catch (e) {
        result = false
    }
    next(result);
});

hash.add('has_lied_languages', function (next) {
    next(lied.getHasLiedLanguages());
});

hash.add('has_lied_resolution', function (next) {
    next(lied.getHasLiedResolution());
});

hash.add('has_lied_os', function (next) {
    next(lied.getHasLiedOs());
});

hash.add('has_lied_browser', function (next) {
    next(lied.getHasLiedBrowser());
});

hash.add('touch_support', function (next) {
    var maxTouchPoints = 0;
    var touchEvent = false;
    if (typeof navigator.maxTouchPoints !== 'undefined') {
        maxTouchPoints = navigator.maxTouchPoints;
    } else if (typeof navigator.msMaxTouchPoints !== 'undefined') {
        maxTouchPoints = navigator.msMaxTouchPoints;
    }
    try {
        document.createEvent('TouchEvent');
        touchEvent = true;
    } catch (e) {
    }
    var touchStart = 'ontouchstart' in window;
    next([maxTouchPoints, touchEvent, touchStart]);
});

hash.add('do_not_track', function (next) {
    var result;
    if (navigator.doNotTrack) {
        result = navigator.doNotTrack;
    } else if (navigator.msDoNotTrack) {
        result = navigator.msDoNotTrack;
    } else if (window.doNotTrack) {
        result = window.doNotTrack;
    } else {
        result = 'unknown'
    }
    next(result);
});

hash.add('fonts', function (next) {
    next(fonts.getAvailableFonts());
});

hash.add('platform_name', function (next) {
    next(String(platform.name || 'unknown').toLowerCase());
});

hash.add('platform_version', function (next) {
    next(String(platform.version || 'unknown').toLowerCase());
});

hash.add('platform_os', function (next) {
    next(String(platform.os.family || 'unknown').toLowerCase());
});

hash.add('platform_product', function (next) {
    next(String(platform.product || 'unknown').toLowerCase());
});

hash.add('platform_type', function (next) {
    next(device.type || 'unknown');
});

module.exports = hash;