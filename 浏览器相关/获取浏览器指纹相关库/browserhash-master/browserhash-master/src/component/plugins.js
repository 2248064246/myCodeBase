function isIE() {
    if (navigator.appName === 'Microsoft Internet Explorer') {
        return true;
    } else if (navigator.appName === 'Netscape' && /Trident/.test(navigator.userAgent)) { // IE 11
        return true;
    }
    return false;
}

function getIEPlugins() {
    var result = [];
    if ((Object.getOwnPropertyDescriptor && Object.getOwnPropertyDescriptor(window, 'ActiveXObject')) || ('ActiveXObject' in window)) {
        var names = [
            'AcroPDF.PDF',
            'Adodb.Stream',
            'AgControl.AgControl',
            'DevalVRXCtrl.DevalVRXCtrl.1',
            'MacromediaFlashPaper.MacromediaFlashPaper',
            'Msxml2.DOMDocument',
            'Msxml2.XMLHTTP',
            'PDF.PdfCtrl',
            'QuickTime.QuickTime',
            'QuickTimeCheckObject.QuickTimeCheck.1',
            'RealPlayer',
            'RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)',
            'RealVideo.RealVideo(tm) ActiveX Control (32-bit)',
            'Scripting.Dictionary',
            'SWCtl.SWCtl',
            'Shell.UIHelper',
            'ShockwaveFlash.ShockwaveFlash',
            'Skype.Detection',
            'TDCCtl.TDCCtl',
            'WMPlayer.OCX',
            'rmocx.RealPlayer G2 Control',
            'rmocx.RealPlayer G2 Control.1'
        ]
        result = names.map(function (name) {
            try {
                new window.ActiveXObject(name);
                return name;
            } catch (e) {
                return null
            }
        })
    }
    if (navigator.plugins) {
        result = result.concat(getRegularPlugins())
    }
    return result
}

function getRegularPlugins() {
    var plugins = [];
    if (navigator.plugins) {
        for (var i = 0, l = navigator.plugins.length; i < l; i++) {
            if (navigator.plugins[i]) {
                plugins.push(navigator.plugins[i])
            }
        }
    }
    plugins = plugins.sort(function (a, b) {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
    });
    return plugins.map(function (p) {
        var mimeTypes = [].slice.call(p).map(function (mt) {
            return [mt.type, mt.suffixes].join('~');
        }).join(',');
        return [p.name, p.description, mimeTypes].join('::');
    });
}

exports.getBrowserPlugins = function () {
    if (isIE()) {
        return getIEPlugins();
    } else {
        return getRegularPlugins();
    }
}
