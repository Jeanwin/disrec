define(['app'], function (app) {
    app.registerController('CourseTourMainCtrl', ['$scope','$modal','CourseService' , function ($scope,$modal,CourseService) {
        $scope.openPatrolOptionModal = function () {
            var modalInstance = $modal.open({
                templateUrl: 'course/coursetourmain/coursetourmain.html',
                controller: PatrolOptionModalCtrl,
                resolve: {
                    tree: function () {
                        return $scope.areaTree;
                    }
                }
            });
        };
        var PatrolOptionModalCtrl = function ($scope, $modalInstance, tree) {
            $scope.data = tree;
            $scope.save = function () {
                $modalInstance.close();
            };
        };

        //课程巡视tree
        var mockLoadTrees=function(){
            CourseService.searchCourse().then(
                function(data){
                    $scope.videoList=data;
                    $scope.areaTree =[{
                        "id": 1,
                        "title": "一校区",
                        "nodes": [
                            {
                                "id": 11,
                                "title": "一号楼",
                                "nodes": [
                                    {
                                        "id": 111,
                                        "title": "001教室-初一1班",
                                        "nodes": []
                                    },
                                    {
                                        "id": 112,
                                        "title": "002教室-初一2班",
                                        "nodes": []
                                    },
                                    {
                                        "id": 113,
                                        "title": "003教室-初一3班",
                                        "nodes": []
                                    }
                                ]
                            },
                            {
                                "id": 12,
                                "title": "二号楼",
                                "nodes": [
                                    {
                                        "id": 121,
                                        "title": "001教室-初二1班",
                                        "nodes": []
                                    },
                                    {
                                        "id": 122,
                                        "title": "002教室-初二2班",
                                        "nodes": []
                                    },
                                    {
                                        "id": 123,
                                        "title": "003教室-初三2班",
                                        "nodes": []
                                    }
                                ]
                            }
                        ]
                    }];
                },
                function(){

                }
            );
        };
        var init = function(){
            $scope.areaTree =[];
            $scope.videoList=[];
            $scope.hideAdvancedSearch = true;
            mockLoadTrees();
        };

        init();
    }]);
});