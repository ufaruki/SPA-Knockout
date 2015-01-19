(function () {
    var root = this;

    defineNonAppModules();
    Boot();

    function defineNonAppModules() {        
        define('jquery', [], function () { return root.jQuery; });
        define('ko', [], function () { return root.ko; });          
        define('underscore', [], function () { return root._; });
        define('moment', [], function () { return root.moment; });
    }

    function Boot() {       
        require(['bootstrapper'], function (bs) { bs.run(); });
    }
})();
