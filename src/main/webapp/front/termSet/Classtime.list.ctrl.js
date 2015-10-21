define(['app','config'], function (app,config) {
    app.registerController('ClassTimeCtrl', ['$scope','$modal','$timeout','$filter','growl','ScheduleService','TreeService',
        function ($scope,$modal,$timeout,$filter,growl,ScheduleService,TreeService) {
        //应用到机构
        $scope.applyto = function (Classtime) {
            ScheduleService.Classtimetree(Classtime).then(
                function(data){
                    $scope.treeselectList=data;
                    var modalInstance = $modal.open({
                        templateUrl: 'termSet/list/Classtime.apply.modal.html',
                        backdrop:'static',
                        controller: ApplyModalCtrl,
                        resolve: {
                            tree: function () {
                                return $scope.areaTree;
                            },
                            Classtime: function () {
                                return Classtime;
                            },
                            treeselectList : function(){
                                return $scope.treeselectList
                            }
                        }
                    }).result.then(
                        function(updata){
                            searchClasstimes("",$scope.pagination,"");
                        },
                        function(reason){
                            console.log(reason+"reason");
                        }
                    );
                }
            );
        };
        var ApplyModalCtrl = function ($scope, $modalInstance,tree,Classtime,growl,treeselectList) {
            $scope.Classtime = Classtime;
            $scope.areaTree=tree;
            $scope.SelectItem = treeselectList;
            //点击选中时设置控制的单选按钮状态
            var selectedClassrooms = [];
            $scope.areaList=[];

           /* $scope.checkAllApplys = function (node, value){
                node.isSelected = node.isSelected || false;

                node.isSelected = value === undefined? !node.isSelected : value;
                if(node.nodes){
                    $.each(node.nodes, function(index, _node){
                        $scope.checkAllApplys(_node, (node.isSelected));
                    });
                }
            };*/
            //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^不知道的改动
            //自下而上，遍历树
            $scope.checkAllParent = function(node, value){
                console.log(node);
                console.log($scope.areaTree);

                if(angular.isDefined($scope.areaTree)){
                    $.each($scope.areaTree, function(index, atree){
                        if(atree.nodes){
                            $.each(atree.nodes, function(index, _node){
                                if(node === _node){
                                    if($scope.checkParentInnerChildIsChecked(atree) && atree.isSelected){
                                    } else {
                                        atree.isSelected = !atree.isSelected;
                                    }
                                    console.log(atree.name);
                                    console.log(atree.isSelected);
                                } else {
                                    $.each(_node.nodes, function(index, __node){
                                        console.log(__node);
                                        if(node === __node){
                                            if ($scope.checkParentInnerChildIsChecked(_node) && _node.isSelected) {
                                            } else {
                                                _node.isSelected = !(_node.isSelected);
                                            }
                                            console.log(_node.name);
                                            console.log(_node.isSelected);
                                            console.log("找到的话，把找到的父节点框，作为查询条件，再查询父节点的父节点");
                                            //找到的话，把找到的父节点框，作为查询条件，再查询父节点的父节点
                                            $scope.checkAllParent(_node, node.isSelected);
                                        } else {
                                            $scope.getNodePostion(node,__node, node.isSelected);
                                        }
                                    });
                                }

                            });
                        }
                    });

                }

            };
            //反向递归查找节点
            $scope.getNodePostion = function(node, _node, value){

                if(_node.nodes) {
                    $.each(_node.nodes, function (index, __node) {
                        if (node === __node) {
                            if ($scope.checkParentInnerChildIsChecked(_node) && _node.isSelected) {
                            } else {
                                _node.isSelected = !(_node.isSelected);
                            }
                            console.log(_node.name);
                            //找到的话，把找到的父节点框，作为查询条件，再查询父节点的父节点
                            $scope.checkAllParent(_node, node.isSelected);
                        } else {
                            $scope.getNodePostion(node, __node);
                        }
                    });
                }
            };
            //验证父节点下的子节点是否有被选中的，返回值为true/false
            $scope.checkParentInnerChildIsChecked = function(_node){
                var checkParentInnerChildIsCheckedFlag = false;
                if(_node.nodes){
                    $.each(_node.nodes, function(index, nodeCheck){
                        if(nodeCheck.isSelected){
                            checkParentInnerChildIsCheckedFlag = true;
                        }
                    });
                }
                return checkParentInnerChildIsCheckedFlag;
            };
            //结构树选择（自下而上，自上而下）
            $scope.checkAllTrees = function(node, value){

                //结构树选择（自上而下）
                $scope.checkAllApplys(node, value);

                //延时加载（结构树选择（自下而上）
                $timeout(function(){
                    $scope.checkAllParent(node);
                },200);

            };
            //自上而下，遍历树
            $scope.checkAllApplys = function (node, value) {
                node.isSelected = node.isSelected || false;
                node.isSelected = value === undefined ? !node.isSelected : value;
                if(node.attribute==='Y'){
                    $scope.allItems(node);
                }
                if (node.nodes) {
                    $.each(node.nodes, function (index, _node) {
                        $scope.checkAllApplys(_node, (node.isSelected));
                        $scope.num = index;
                    });
                }
            };
            // 做数组的添加和删除
            $scope.allItems = function (tree) {
                console.log(tree);
//                alert(tree.attribute);
                var a='';
                if (tree.isSelected) {
                    if($scope.SelectItem.length>0){
                        $.each($scope.SelectItem,function(index_1,Items){
                            if(Items.areaid===tree.id){
//                                    alert('id重复');
                                a=index_1;
                            }
                        });
                    }else{
//                            alert('进入了push');
                        $scope.SelectItem.push(
                            {
                                "areaid":tree.id
                            }
                        );
                        a=1;
                    }
                    if(a===''){
                        $scope.SelectItem.push(
                            {
                                "areaid":tree.id
                            }
                        );
                    }

                } else {
//                    alert('进的splice');
                    $.each($scope.SelectItem, function (index, item) {
                        if (item.areaid === tree.id) {
//                            alert('做了删除');
                            $scope.SelectItem.splice(index,1);
                            return false;
                        }
                    });
                }
                /*if ($scope.SelectItem.length > 0) {
                    alert($scope.SelectItem.length);
                }else{
                    alert('对不起未选中');
                }*/
            };

            var getSelectClassrooms = function(node){
                if(node.attribute === "Y" && node.isSelected){
                    $scope.areaList.push(
                        {
                            "id": node.id
                        }
                    );
                }
                if(node.nodes){
                    $.each(node.nodes, function(index, _node){
                        getSelectClassrooms(_node);
                    });
                }
            };

            $scope.ok = function () {
                $scope.areaList=[];
                $scope.data=[];
                $scope.node=[];
                $scope.nodelistName=[];
                //调用树节点ID
                getSelectClassrooms(tree[0]);
                console.log($scope.areaList);
                //编辑直播课表保存接口
                Classtime.areaList = $scope.areaList;
                ScheduleService.createApply(Classtime).then(
                    function(data){
                        if(data.length>0) {
                            $scope.data=data;
                            $.each($scope.data,function(index,node){
                                $scope.node=node.name;
                                console.log("方案名称"+node.createuser);
                                // alert(node.name +" "+"已存在节次，请重新分配");
                                $scope.nodelistName.push({"nodeName":node.name,"createUser":node.createuser});
                            });
                            $scope.areaTree=tree;
                        }else{
                            growl.addSuccessMessage("应用成功");
                            $modalInstance.close(true);
                        }
                        console.log("$scope.nodelistName",$scope.nodelistName);
                    },
                    function(code){
                        //处理失败后操作
                        alert("添加失败!");
                    }
                );
                init();
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
            $scope.treeselectList = treeselectList;
            $scope.isCheckedClassroom = function(id){
                var check = false;
                    $.each($scope.treeselectList, function (index, _treeList) {
                        if (_treeList.areaid === id) {
                            check = true;
                            return false;
                        }
                    });
               return check;
            };
            //选中教室节点
//            $scope.ClassroomNode = function(num){
//                $.each(num.nodes,function(index,nums){
//                    if(nums.nodes.length === 0){
//                        $scope.calssroomNode = num;
//                    }else{
//                        $timeout(function(){
//                            $scope.ClassroomNode(nums);
//                        },100);
//                    }
//                });
//
//            };
//
//            var _temp = [];
//            //监视areaTree中是否有元素被改变状态
//            $scope.$watch('areaTree', function(){
//
//                //监测是否有元素被选中
//                var _temp = $filter('filter')($scope.areaTree[0].nodes[0].nodes, {isSelected:true});
//                $scope.selectedCount = _temp.length;
//                if(_temp.length === $scope.areaTree[0].nodes[0].nodes.length){
//                    console.log($scope.areaTree[0].nodes[0]);
//                    $scope.areaTree[0].nodes[0].isSelected = true;
//                }
//                else{
//                    $scope.areaTree[0].nodes[0].isSelected = false;
//                }
//
//            },true);
//            var init = function(){
//               $scope.ClassroomNode($scope.areaTree[0]);
//            };
//            init();

        };
        //新建方案添加
        $scope.newScheme = function (Classtime) {
            var modalInstance = $modal.open({
                templateUrl: 'termSet/list/Classtime.NeworEditScheme.modal.html',
                backdrop:'static',
                controller: newSchemeModalCtrl,
                resolve: {
                    Classtime: function () {
                        return Classtime;
                    }
                }
            }).result.then(
                function(news){
                    searchClasstimes("",$scope.pagination,"");
                },
                function(reason){
                    console.log('reason is '+ reason);
                }
            );
        };
        var newSchemeModalCtrl = function ($scope, $modalInstance,growl) {
            //新方案添加后台校验
            $scope.methodSchemeName = function(){
                var schemedata = {
                    classtype : $scope.Classtime.classtype,
                    datebegin : $scope.Classtime.datebegin,
                    dateend : $scope.Classtime.dateend
                };
                if($scope.Classtime.classtype !== '' && $scope.Classtime.datebegin !== '' && $scope.Classtime.dateend !== ''){
                    if($scope.Classtime.datebegin > $scope.Classtime.dateend){
                        $scope.showDateModel = true;
                    }else{
                        $scope.showDateModel = false;
                    }
                    ScheduleService.CheckAreaSchemeName(schemedata).then(
                        function(data){
                            $scope.showSchemeWeekError = data.id >0;
                        },
                        function(code){
                            growl.addErrorMessage('发生意外错误');
                        }
                    );
                }
            };
            //初始化查询新方案的数据
            var InitAddSchem = function(){
                ScheduleService.selectTnitAddScheme().then(
                    function(data){
                        if(data.length>0){
                            $scope.termtimeList =data;
                        }else{
                            $scope.termtimeList = [
                                {
                                    "starttime": "",
                                    "endtime": "",
                                    "iclass": 1,
                                    "name": "第一节"
                                },{
                                    "starttime": "",
                                    "endtime": "",
                                    "iclass": 2,
                                    "name": "第二节"
                                },{
                                    "starttime": "",
                                    "endtime": "",
                                    "iclass": 3,
                                    "name": "第三节"
                                },{
                                    "starttime": "",
                                    "endtime": "",
                                    "iclass": 4,
                                    "name": "第四节"
                                },{
                                    "starttime": "",
                                    "endtime": "",
                                    "iclass": 5,
                                    "name": "第五节"
                                },{
                                    "starttime": "",
                                    "endtime": "",
                                    "iclass": 6,
                                    "name": "第六节"
                                }
                            ]
                        }

                    },function(code){
                        growl.addErrorMessage('发生意外错误');
                    }
                );
            };
            $scope.Classtime = {
                classtype: '',
                datebegin: '',
                dateend: ''
            };
//          $scope.Classtime = Classtime || {name:''};
            $scope.editingMode =false;
            //增加节次
            $scope.AddTime=function(){
                var cnNumbers = ['零','一','二','三','四','五','六','七','八','九'];
                $scope.termtimeList.push(
                    {
                        "starttime": "",
                        "endtime": "",
                        "iclass": $scope.termtimeList.length + 1,
                        "name": "第" + cnNumbers[($scope.termtimeList.length + 1)] +"节"
                    }
                );
            };
            //删除节次时间
            $scope.DelTime=function(){
                $scope.termtimeList.pop({});
            };
            $scope.saveClassTime = function () {
                $.each($scope.termtimeList,function(index,termtime){
                    termtime.classtype=$scope.Classtime.classtype;
                    termtime.datebegin=$scope.Classtime.datebegin;
                    termtime.dateend=$scope.Classtime.dateend

                });
                ScheduleService.AddnewScheme($scope.termtimeList).then(
                    function(data){
                        if(data.id === '1'){
                            growl.addSuccessMessage(data.operation);
                            $modalInstance.close(true);
                        }
                        if(data.id === '0'){
                            alert(data.operation);
                        }
                    },
                    function(code){
                        //处理失败后操作
                        alert("添加失败!");
                    }
                );
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };

            //节次开始时间和结束时间比较
            $scope.CompareEndTime = function(keywords,Time){
                $scope.Time = Time;
                $scope.CopyEndTime = $scope.Time.endtime;
                if($scope.Time.endtime < $scope.Time.starttime){
                    $scope.ClassTimeName = $scope.Time;
                    $scope.showCorrectTime = true;
                }else{
                    $scope.ClassTimeName = $scope.Time;
                    $scope.showCorrectTime = false;
                }
                if(keywords <= $scope.termtimeList.length-2){
                    if(angular.isDefined($scope.termtimeList[keywords+1].starttime) && $scope.termtimeList[keywords+1].starttime){
                        if($scope.termtimeList[keywords+1].starttime < $scope.Time.endtime){
                            $scope.showCorrectDownTime = true;
                        }else{
                            $scope.showCorrectDownTime = false;
                        }
                    }
                }
            };

            //节次本节课与上一节课比较时间
            $scope.CompareStartTime = function(keywords,Time){
                $scope.StartTime = Time;
                if(keywords>0){
                    if($scope.termtimeList[keywords-1].endtime > $scope.StartTime.starttime){
                        $scope.NextClassTimeName = $scope.StartTime;
                        $scope.showCorrectClassTime = true;
                    }else{
                        $scope.NextClassTimeName = $scope.StartTime;
                        $scope.showCorrectClassTime = false;
                    }
                }
                if($scope.termtimeList[keywords].endtime){
                        if($scope.termtimeList[keywords].endtime < $scope.StartTime.starttime){
                            $scope.showCorrectTime = true;
                        }else{
                            $scope.showCorrectTime = false;
                        }
                }

            };
            var init = function(){
                InitAddSchem();
            };
            init();
        };

        //新方案编辑
        $scope.editScheme = function (Classtime) {
            var modalInstance = $modal.open({
                templateUrl: 'termSet/list/Classtime.NeworEditScheme.modal.html',
                backdrop:'static',
                controller: editSchemeModalCtrl,
                resolve: {
                    Classtime: function () {
                        return Classtime;
                    }
                }
            }).result.then(
                function(news){
                    searchClasstimes("",$scope.pagination,"");
                },
                function(reason){
                    console.log('reason is '+ reason);
                }
            );
        };
        var editSchemeModalCtrl = function ($scope, $modalInstance,Classtime,growl) {
            $scope.Classtime = angular.copy(Classtime);
            $scope.editingMode =true;
            $scope.termChange = false;
            //增加节次
            $scope.AddTime=function(){
                var cnNumbers = ['零','一','二','三','四','五','六','七','八','九'];
                $scope.termtimeList.push(
                    {
                        "classtype": "",
                        "datebegin": "",
                        "dateend": "",
                        "starttime": "",
                        "endtime": "",
                        "iclass": $scope.termtimeList.length + 1,
                        "name": "第" + cnNumbers[($scope.termtimeList.length + 1)] +"节"
                    }
                );
            };
            $scope.methodSchemeName = function(){
                if($scope.Classtime.datebegin > $scope.Classtime.dateend){
                    $scope.showDateModel = true;
                }else{
                    $scope.showDateModel = false;
                }
            };
            //删除节次
            $scope.DelTime=function(){
                $scope.termtimeList.pop({});
                $scope.termChange = true;
            };
            //节次时间显示
            ScheduleService.TermTime(Classtime).then(
                function(data){
                    $scope.termtimeList = data;
                },
                function(code) {
                    throw(code);
                }
            );
            $scope.saveClassTime = function () {
                $.each($scope.termtimeList,function(index,termtime){
                    termtime.classtype=$scope.Classtime.classtype;
                    termtime.datebegin=$scope.Classtime.datebegin;
                    termtime.dateend=$scope.Classtime.dateend;
                    termtime.classbatch=$scope.Classtime.classbatch
                });
                //方案编辑
                $scope.Classtime.times = $scope.termtimeList;
                ScheduleService.EditnewScheme($scope.Classtime.times).then(
                    function(data){
                        if(data.id === '1'){
                            growl.addSuccessMessage(data.operation);
                            $modalInstance.close(true);
                        }
                        if(data.id === '0'){
                            alert(data.operation);
                        }
                    },
                    function(code){
                        //处理失败后操作
                        alert("添加失败!");
                    }
                );
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
            //节次开始时间和结束时间比较
            $scope.CompareEndTime = function(keywords,Time){
                $scope.Time = Time;
                $scope.CopyEndTime = $scope.Time.endtime;
                if($scope.Time.endtime < $scope.Time.starttime){
                    $scope.ClassTimeName = $scope.Time;
                    $scope.showCorrectTime = true;
                }else{
                    $scope.ClassTimeName = $scope.Time;
                    $scope.showCorrectTime = false;
                }
                if(keywords <= $scope.termtimeList.length-2){
                    if(angular.isDefined($scope.termtimeList[keywords+1].starttime) && $scope.termtimeList[keywords+1].starttime){
                        if($scope.termtimeList[keywords+1].starttime < $scope.Time.endtime){
                            $scope.showCorrectDownTime = true;
                        }else{
                            $scope.showCorrectDownTime = false;
                        }
                    }
                }
            };

            //节次本节课与上一节课比较时间
            $scope.CompareStartTime = function(keywords,Time){
                $scope.StartTime = Time;
                if(keywords>0){
                    if($scope.termtimeList[keywords-1].endtime > $scope.StartTime.starttime){
                        $scope.NextClassTimeName = $scope.StartTime;
                        $scope.showCorrectClassTime = true;
                    }else{
                        $scope.NextClassTimeName = $scope.StartTime;
                        $scope.showCorrectClassTime = false;
                    }
                }
                if($scope.termtimeList[keywords].endtime){
                    if($scope.termtimeList[keywords].endtime < $scope.StartTime.starttime){
                        $scope.showCorrectTime = true;
                    }else{
                        $scope.showCorrectTime = false;
                    }
                }

            };
        };
        //节次删除
        $scope.deleteClasstime = function (Classtime) {
            var modalInstance = $modal.open({
                templateUrl: 'termSet/list/Classtime.delete.modal.html',
                backdrop:'static',
                controller: DeleteClasstimeModalCtrl,
                resolve: {
                    Classtime: function () {
                        return Classtime;
                    }
                }
            }).result.then(
                function(updata){
                    searchClasstimes("",$scope.pagination,"");
                },
                function(reason){
                    console.log('reason is '+ reason);
                }
            );
        };

        var DeleteClasstimeModalCtrl = function ($scope, $modalInstance, Classtime,growl) {
            $scope.Classtime = Classtime;
            $scope.ok = function () {
            //节次删除接口
                ScheduleService.delClasstime(Classtime).then(
                    function(data){
                        if(data.id === '1'){
                            growl.addSuccessMessage(data.operation);
                            $modalInstance.close(true);
                        }
                        if(data.id === '0'){
                            alert(data.operation);
                        }
                    },
                    function(code){
                        //处理失败后操作
                        alert("添加失败!");
                    }
                );
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        };
        //节次Json数据绑定
        var searchClasstimes=function(keywords, pagination, user) {
            ScheduleService.searchClasstime(keywords, pagination, user).then(
                function (data) {
                    $scope.ClasstimeList = data.data;
                    pagination.totalItems=data.total;
                    $scope.pagesize = parseInt(($scope.pagination.totalItems-1)/$scope.pagination.pageSize+1);
                },
                function(){

            }

            );
            //根据页码查询
            $scope.onSelectPage = function(pageIndex){
                if(!pageIndex){
                    growl.addErrorMessage("此页码不存在");
                }
                $scope.pagination.pageIndex = pageIndex;
                var _pagination = angular.copy($scope.pagination);
                if(angular.isDefined(_pagination.pageIndex.pageIndex)){
                    _pagination.pageIndex = (_pagination.pageIndex.pageIndex)*1;
                }
                searchClasstimes($scope.termset,_pagination,""); //调用查询接口
            };
        };
        //Json--Tree
        var classtimeTrees = function(keywords,areaid){
            TreeService.mainTree(keywords,areaid).then(
                function(data){
                    $scope.areaTree = data;
                    console.log('通过后台接口获取树接口');
                },
                function(){

                }
            );
        };

        var init = function(){
            classtimeTrees("deviceSet","",$scope.setTreeid);
            //分页对象
            $scope.pagination = {
                totalItems:0,
                pageIndex:1,
                pageSize:10,
                maxSize:8,
                numPages:4,
                previousText: config.pagination.previousText,
                nextText: config.pagination.nextText,
                firstText: config.pagination.firstText,
                lastText: config.pagination.lastText
            };
            $scope.$parent.active = 1;
            $scope.ClasstimeList = [];

            searchClasstimes("",$scope.pagination,"");

            $scope.areaTree = [];
        };
        init();
    }]);
});
