function waterfall(stack, callback, context) {
    var list = stack, result = {};
    var total = stack.length;
    var index = 0;
    //var timestamp  = function(){ return new Date().getTime() };
    //context.timing = {};
    (function (index) {
        var next, key, call;
        if (!list[index]) return callback.call(context, result);
        key = list[index].key;
        call = list[index].callback;
        next = arguments.callee;
        try {
            //var date  = timestamp();
            call(function (value) {
                result[key] = value;
                //context.timing[key] = timestamp() - date;
                next(++index);
            });
        } catch (e) {
            result[key] = e;
            next(++index);
        }
    })(0);
};


module.exports = waterfall;