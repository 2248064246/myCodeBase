function getWebglCanvas() {
    var canvas = document.createElement('canvas');
    var gl = null;
    try {
        gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    } catch (e) { /* squelch */
    }
    if (!gl) {
        gl = null
    }
    return gl;
}

function fa2s(fa) {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    return '[' + fa[0] + ', ' + fa[1] + ']';
}

function maxAnisotropy(gl) {
    var ext = gl.getExtension('EXT_texture_filter_anisotropic') || gl.getExtension('WEBKIT_EXT_texture_filter_anisotropic') || gl.getExtension('MOZ_EXT_texture_filter_anisotropic');
    if (ext) {
        var anisotropy = gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
        if (anisotropy === 0) {
            anisotropy = 2
        }
        return anisotropy
    } else {
        return null
    }
}


exports.getCanvasHash = function () {
    var result = [];
    var canvas = document.createElement('canvas');
    canvas.width = 2000;
    canvas.height = 200;
    canvas.style.display = 'inline';
    var ctx = canvas.getContext('2d');
    ctx.rect(0, 0, 10, 10);
    ctx.rect(2, 2, 6, 6);
    result.push('canvas winding:' + ((ctx.isPointInPath(5, 5, 'evenodd') === false) ? 'yes' : 'no'));
    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = '#f60';
    ctx.fillRect(125, 1, 62, 20);
    ctx.fillStyle = '#069';
    ctx.font = '11pt no-real-font-123';
    ctx.fillText('Cwm fjordbank glyphs vext quiz, \ud83d\ude03', 2, 15);
    ctx.fillStyle = 'rgba(102, 204, 0, 0.2)'
    ctx.font = '18pt Arial'
    ctx.fillText('Cwm fjordbank glyphs vext quiz, \ud83d\ude03', 4, 45);
    ctx.globalCompositeOperation = 'multiply';
    ctx.fillStyle = 'rgb(255,0,255)';
    ctx.beginPath();
    ctx.arc(50, 50, 50, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = 'rgb(0,255,255)';
    ctx.beginPath();
    ctx.arc(100, 50, 50, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = 'rgb(255,255,0)';
    ctx.beginPath();
    ctx.arc(75, 100, 50, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = 'rgb(255,0,255)';
    ctx.arc(75, 75, 75, 0, Math.PI * 2, true);
    ctx.arc(75, 75, 25, 0, Math.PI * 2, true);
    ctx.fill('evenodd');
    if (canvas.toDataURL) {
        result.push('canvas fp:' + canvas.toDataURL())
    }
    return result.join('~');
};


exports.getWebglHash = function () {
    var gl = getWebglCanvas();
    var fa2s = function(fa) {
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        return '[' + fa[0] + ', ' + fa[1] + ']';
    };
    if (!gl) {
        return null;
    }
    var result = [];
    var vShaderTemplate = 'attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}';
    var fShaderTemplate = 'precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}';
    var vertexPosBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPosBuffer);
    var vertices = new Float32Array([-0.2, -0.9, 0, 0.4, -0.26, 0, 0, 0.732134444, 0]);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    vertexPosBuffer.itemSize = 3;
    vertexPosBuffer.numItems = 3;
    var program = gl.createProgram();
    var vshader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vshader, vShaderTemplate);
    gl.compileShader(vshader);
    var fshader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fshader, fShaderTemplate);
    gl.compileShader(fshader);
    gl.attachShader(program, vshader);
    gl.attachShader(program, fshader);
    gl.linkProgram(program);
    gl.useProgram(program);
    program.vertexPosAttrib = gl.getAttribLocation(program, 'attrVertex');
    program.offsetUniform = gl.getUniformLocation(program, 'uniformOffset');
    gl.enableVertexAttribArray(program.vertexPosArray);
    gl.vertexAttribPointer(program.vertexPosAttrib, vertexPosBuffer.itemSize, gl.FLOAT, !1, 0, 0);
    gl.uniform2f(program.offsetUniform, 1, 1);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertexPosBuffer.numItems);
    try {
        result.push(gl.canvas.toDataURL());
    } catch (e) {

    }
    result.push((gl.getSupportedExtensions() || []).join(';'));
    result.push(fa2s(gl.getParameter(gl.ALIASED_LINE_WIDTH_RANGE)));
    result.push(fa2s(gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE)));
    result.push(gl.getParameter(gl.ALPHA_BITS));
    result.push((gl.getContextAttributes().antialias ? 'yes' : 'no'));
    result.push(gl.getParameter(gl.BLUE_BITS));
    result.push(gl.getParameter(gl.DEPTH_BITS));
    result.push(gl.getParameter(gl.GREEN_BITS));
    result.push(maxAnisotropy(gl));
    result.push(gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS));
    result.push(gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE));
    result.push(gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS));
    result.push(gl.getParameter(gl.MAX_RENDERBUFFER_SIZE));
    result.push(gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS));
    result.push(gl.getParameter(gl.MAX_TEXTURE_SIZE));
    result.push(gl.getParameter(gl.MAX_VARYING_VECTORS));
    result.push(gl.getParameter(gl.MAX_VERTEX_ATTRIBS));
    result.push(gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS));
    result.push(gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS));
    result.push(fa2s(gl.getParameter(gl.MAX_VIEWPORT_DIMS)));
    result.push(gl.getParameter(gl.RED_BITS));
    result.push(gl.getParameter(gl.RENDERER));
    result.push(gl.getParameter(gl.SHADING_LANGUAGE_VERSION));
    result.push(gl.getParameter(gl.STENCIL_BITS));
    result.push(gl.getParameter(gl.VENDOR));
    result.push(gl.getParameter(gl.VERSION));
    try {
        var extensionDebugRendererInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (extensionDebugRendererInfo) {
            result.push(gl.getParameter(extensionDebugRendererInfo.UNMASKED_VENDOR_WEBGL));
            result.push(gl.getParameter(extensionDebugRendererInfo.UNMASKED_RENDERER_WEBGL))
        }
    } catch (e) { /* squelch */
    }
    if (!gl.getShaderPrecisionFormat) {
        return result.join('~');
    }
    result.push(gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_FLOAT).precision);
    result.push(gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_FLOAT).rangeMin);
    result.push(gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_FLOAT).rangeMax);
    result.push(gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_FLOAT).precision);
    result.push(gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_FLOAT).rangeMin);
    result.push(gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_FLOAT).rangeMax);
    result.push(gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_FLOAT).precision);
    result.push(gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_FLOAT).rangeMin);
    result.push(gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_FLOAT).rangeMax);
    result.push(gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT).precision);
    result.push(gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT).rangeMin);
    result.push(gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT).rangeMax);
    result.push(gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT).precision);
    result.push(gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT).rangeMin);
    result.push(gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT).rangeMax);
    result.push(gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_FLOAT).precision);
    result.push(gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_FLOAT).rangeMin);
    result.push(gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_FLOAT).rangeMax);
    result.push(gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_INT).precision);
    result.push(gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_INT).rangeMin);
    result.push(gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_INT).rangeMax);
    result.push(gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_INT).precision);
    result.push(gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_INT).rangeMin);
    result.push(gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_INT).rangeMax);
    result.push(gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_INT).precision);
    result.push(gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_INT).rangeMin);
    result.push(gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_INT).rangeMax);
    result.push(gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_INT).precision);
    result.push(gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_INT).rangeMin);
    result.push(gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_INT).rangeMax);
    result.push(gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_INT).precision);
    result.push(gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_INT).rangeMin);
    result.push(gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_INT).rangeMax);
    result.push(gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_INT).precision);
    result.push(gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_INT).rangeMin);
    result.push(gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_INT).rangeMax);
    return result.join('~');
};

exports.getWebglVendor = function () {
    var result;
    try {
        var glContext = getWebglCanvas();
        var extensionDebugRendererInfo = glContext.getExtension('WEBGL_debug_renderer_info');
        result = glContext.getParameter(extensionDebugRendererInfo.UNMASKED_VENDOR_WEBGL) + '~' + glContext.getParameter(extensionDebugRendererInfo.UNMASKED_RENDERER_WEBGL);
    } catch (e) {
        result = null;
    }
    return result;
};


