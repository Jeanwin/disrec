define(
    {
        menu: {
            "1": {
                "id" : "reins.reinsout",
                "label": "比例分出",
                "url": "",
                "menus": {
                    "1.1": {
                        "id" : "reins.reinsout.ttyacc",
                        "label": "合同分出账务",
                        "url": "#/contracts/prop/1"
                    }
                }
            },
            "3": {
                "id" : "reins.nonpropout",
                "label": "超赔分出",
                "url": "",
                "menus": {
                    "3.2": {
                        "id" : "reins.nonpropout.xlacc",
                        "label": "超赔合同账务",
                        "url": "#/contracts/nprop/bill"
                    }
                }
            }
        } ,
        admin: {
            "1": {
                "id": "reins.product.treaty",
                "label": "比例合同管理",
                "url": "#/admin/contracts/prop/admin"
            },
            "2": {
                "id": "reins.nonpropout.xtreaty",
                "label": "非比例合同管理",
                "url": "#/admin/contracts/nprop/admin"
            },
            "3": {
                "id": "reins.product.treaty.level",
                "label": "合同关系",
                "url": "#/admin/relationships"
            },
            "4": {
                "id": "reins.product.managecode.accept",
                "label": "再保人管理",
                "url": "#/admin/reinsurers"
            },
            "5": {
                "id": "reins.product.treaty.planmaintenance",
                "label": "自留额管理",
                "url": "#/admin/retentions"
            },
            "6":{
                "id":"",
                "label":"用户管理",
                "url":"/reins/user/prepareQuery.do"
            },
            "7":{
                "id":"",
                "label":"机构管理",
                "url":"/reins/company/prepareQuery.do"
            },
            "8":{
                "id":"",
                "label":"岗位代码",
                "url":"/reins/saaGrade/config.do "
            },
            "9":{
                "id":"",
                "label":"功能代码",
                "url":"/reins/saa/task/prepareFindTask.do"
            },
            "10":{
                "id":"",
                "label":"权限设置",
                "url":"/reins/saaUserPower/prepareUserPowerAllConfig.do"
            }

        }
    }
);