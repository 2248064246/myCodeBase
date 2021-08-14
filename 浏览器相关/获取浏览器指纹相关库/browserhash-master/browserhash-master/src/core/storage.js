(function (isStorage) {
    if (isStorage() === false) {
        var data = {}, undef;
        window['localStorage'] = {
            setItem     : function(id, val) { return data[id] = String(val); },
            getItem     : function(id) { return data.hasOwnProperty(id) ? data[id] : undef; },
            removeItem  : function(id) { return delete data[id]; },
            clear       : function() { return data = {}; }
        };
    }
})(function(){
    try {
        localStorage.setItem('test',new Array(10000).join('0'));
        localStorage.removeItem('test');
        return true;
    } catch(e){
        console.log('error',e);
        return false;
    }
});

module.exports = {};