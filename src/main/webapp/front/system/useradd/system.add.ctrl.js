define(['app'], function (app) {
    app.registerController('SystemAddCtrl', ['$scope','$stateParams','CourseService' , function ($scope,$stateParams,CourseService) {

        //系统设置tree
        var mockLoadTrees=function(){
            CourseService.searchCourse().then(
                function(data){
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

            $scope.user = {
                userID : '',
                sex : '',
                organization : '',
                email : '',
                state : '',
                classify : '',
                year : '',
                phone : '',
                name:''
            };

            $scope.user.userID = $stateParams.userID;
            $scope.userID = $scope.user.userID;

            $scope.user.name = $stateParams.name;
            $scope.name = $scope.user.name;

            $scope.user.sex = $stateParams.sex;
            $scope.sex = $scope.user.sex;

            $scope.user.organization = $stateParams.organization;
            $scope.organization = $scope.user.organization;

            $scope.user.email = $stateParams.email;
            $scope.email = $scope.user.email;

            $scope.user.state = $stateParams.state;
            $scope.state = $scope.user.state;

            $scope.user.classify = $stateParams.classify;
            $scope.classify = $scope.user.classify;

            $scope.user.phone = $stateParams.phone;
            $scope.phone = $scope.user.phone;

            $scope.user.year = $stateParams.year;
            $scope.year = $scope.user.year;

            mockLoadTrees();
        };
        init();
    }]);
});