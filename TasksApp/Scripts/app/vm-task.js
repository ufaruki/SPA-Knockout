define('vm-task', ['ko', 'model', 'moment'], function (ko, models, moment) {
    var
        taskList = ko.observableArray([]),
        currentTaskName = ko.observable(''),
        baseUrl = 'http://localhost:50355/',
        allDone = ko.observable(false),
        currentTaskDate = ko.observable(new Date()),
        fetchTasks = function () {
            var doneCount = 0;
            taskList([]);

            $.ajax({
                url: baseUrl + 'task/tasks',
                dataType: 'json',
                type: 'GET',
                success: function (data) {
                    ko.utils.arrayForEach(data, function (d) {
                        var task = new models.model_task();

                        task.id = d.Id;
                        task.order = d.Order;
                        task.done(d.Done);
                        task.text(d.Text);

                        var date = new Date(d.Date);
                        date = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();

                        task.date(date);

                        if (task.done())
                            doneCount++;

                        taskList.push(task);
                    });

                    if (doneCount === taskList().length)
                        allDone(true);
                    else
                        allDone(false);

                    return true;
                },
                error: function (response) {
                    alert($.parseJSON(response));
                }
            });
        },
        addNewTask = function () {
            if ($.trim(currentTaskName()).length === 0) {
                alert('Task name is required.');
                return;
            }

            var dateValue = $('#taskDate').val();

            if (dateValue === '') {
                alert('Task date is required.');
                return;
            }

            var startDate = moment(dateValue, 'YYYY-MM-DD');

            if (startDate.isAfter(moment())) {
                alert('Task date cannot be greater then current date.');
                return;
            }

            if (startDate.isBefore(moment('2011-07-16', 'YYYY-MM-DD'))) {
                alert('Task date cannot be less then July 16, 2011.');
                return;
            }

            var task = new models.model_task();
            task.order = 1;
            task.text = currentTaskName();
            task.done(false);
            task.date(dateValue);

            $.ajax({
                url: baseUrl + 'task/addtask',
                data: ko.toJSON(task),
                contentType: 'application/json',
                type: 'POST',
                success: function (response, status) {
                    currentTaskName('');
                    currentTaskDate('');
                    fetchTasks();
                },
                error: function (response, status, r) {
                    alert($.parseJSON(response));
                }
            });
        },
        loadTasks = ko.computed(function () {
            fetchTasks();
        }),
        deleteTask = function (task) {
            $.ajax({
                url: baseUrl + 'task/deletetask',
                data: ko.toJSON(task),
                contentType: 'application/json',
                type: 'POST',
                success: function (response, status) {
                    fetchTasks();
                },
                error: function (response, status, r) {
                    alert($.parseJSON(response));
                }
            });
        },
        updateStatus = function (data) {
            var listOfIds = [], taskStatus = false;

            listOfIds.push(data.id);
            taskStatus = data.done();

            $.ajax({
                url: baseUrl + 'task/updatestatus',
                data: ko.toJSON({ taskIds: listOfIds, status: taskStatus }),
                contentType: 'application/json',
                type: 'POST',
                success: function (response, status) {
                    
                },
                error: function (response, status, r) {
                    alert($.parseJSON(response));
                }
            });
           
            return true;
        },
        updateStatusForAll = function () {
            var listOfIds = [], taskStatus = false;

            ko.utils.arrayForEach(taskList(), function (task) {
                listOfIds.push(task.id);
            });

            taskStatus = allDone();

            $.ajax({
                url: baseUrl + 'task/updatestatus',
                data: ko.toJSON({ taskIds: listOfIds, status: taskStatus }),
                contentType: 'application/json',
                type: 'POST',
                success: function (response, status) {                   
                    ko.utils.arrayForEach(taskList(), function (task) {
                        task.done(taskStatus);
                    });
                },
                error: function (response, status, r) {
                    alert($.parseJSON(response));
                }
            });

            return true;
        },
        numItemsNotDone = ko.computed(function () {
            var itemsNotDone = _.filter(taskList(), function (task) { return !task.done(); });

            if (itemsNotDone)
                return itemsNotDone.length;
        });

    return {
        currentTaskName: currentTaskName,
        taskList: taskList,       
        addNewTask: addNewTask,        
        deleteTask: deleteTask,
        updateStatus: updateStatus,
        allDone: allDone,
        currentTaskDate: currentTaskDate,
        numItemsNotDone: numItemsNotDone,
        updateStatusForAll: updateStatusForAll
    };
});