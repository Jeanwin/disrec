define(['app'], function (app) {
    app.registerController('SampleMainCtrl', ['$scope', '$modal', function ($scope, $modal) {

        $scope.openModal = function () {
            $modal.open({
                templateUrl: 'classrooms/setup/classrooms.editArea.modal.html',
                backdrop:'static',
                controller: function($scope, $modalInstance){
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                }
            });
        };

        var init = function(){
            var date = new Date();
            var d = date.getDate();
            var m = date.getMonth();
            var y = date.getFullYear();

            $scope.events = [
                {title: 'All Day Event',start: new Date(y, m, 1)},
                {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date()},
                {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
                {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
                {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
                {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
            ];

            /* event source that calls a function on every view switch */
            $scope.eventsF = function (start, end, timezone, callback) {
                var s = new Date(start).getTime() / 1000;
                var e = new Date(end).getTime() / 1000;
                var m = new Date(start).getMonth();
                var events = [{title: 'Feed Me ' + m,start: s + (50000),end: s + (100000),allDay: false, className: ['customFeed']}];
                callback(events);
            };

            $scope.uiConfig = {
                calendar:{
                    height: 450,
                    editable: true,
                    lang: 'zh-cn',
                    allDaySlot: false,
                    minTime: '07:00:00',
                    maxTime: '20:00:00',
                    header:{
                        left: 'month agendaWeek agendaDay',
                        center: 'title',
                        right: 'today prev,next'
                    }

                    //dayClick: $scope.alertEventOnClick,
                    //eventDrop: $scope.alertOnDrop,
                    //eventResize: $scope.alertOnResize
                }
            };
            $scope.eventSources = [$scope.events];

        };





        init();
    }]);
});
