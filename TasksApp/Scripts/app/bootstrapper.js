define('bootstrapper', ['jquery', 'ko', 'vm'], function ($, ko, vm) {
    var
        run = function () {
            ko.applyBindings(vm.vm_task, $('#taskView').get(0));            
        };

    return {
        run: run
    }
});