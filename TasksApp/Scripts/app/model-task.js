define('model-task', ['ko'], function (ko) {
    var
        Task = function () {
            var self = this;

            self.Id = 0;
            self.Order = 0;
            self.Done = ko.observable(false);
            self.Text = ko.observable('');
            self.Date = ko.observable(new Date());
        };

    return Task;
});

