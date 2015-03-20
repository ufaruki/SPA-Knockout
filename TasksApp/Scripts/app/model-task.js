define('model-task', ['ko'], function (ko) {
    var
        Task = function () {
            var self = this;

            self.id = 0;
            self.order = 0;
            self.done = ko.observable(false);
            self.text = ko.observable('');
            self.date = ko.observable(new Date());
        };

    return Task;
});

