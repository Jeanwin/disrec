define(['app', 'codes'], function (app, codes) {
     app.filter('code', ['CodeService', function(codeService) {
            return function(input, codeType) {
                if(angular.isDefined(codes[codeType])) {
                    var _value =  input ;
                    $.each(codes[codeType], function(index, code){
                        if (angular.equals(input,code.id)){
                            _value = code.value;
                            return false;
                        }
                    });
                    return _value;

                }else {
                    var keywords = {id:"",value:""};
                    var arr = codeType.split(".");
                    keywords.id = arr[0];
                    if(arr.length > 1){
                        keywords.value = arr[1];
                    }
                    var _value = input;
                    var con = keywords.id+"."+keywords.value;

                    if(angular.isDefined(codes[con]) && codes[con].length>0){
                        $.each(codes[con], function(index, c){
                            if (angular.equals(input, c.id)){
                                _value = c.value;
                                return false;
                            }
                        });
                        return  _value;
                    }else{
                        return _value;
                    }
                }
            };
        }]);
     app.filter('formatPercent',function(){
    	 return function(input){
             var t = /^((\-)?((([0-9]{1,2})(\.[0-9]{1,4})?)|(100(\.[0]{1,4})?)))$/;
             var blank = /^\s*$/;
             if(t.test(input)){
                 var temp = (input+"").split(".");
                 var result = "";
                 if(temp.length>1){
                     for(var i = temp[1].length; i < 4; i++){
                         temp[1] = temp[1]+""+0;
                     }
                     result = temp[0]+"."+temp[1];
                     return (result);

                 }else{
                     return   (input +".0000");
                 }
             }else{
            	 if(isNaN(input) || blank.test(input)){
            		 return "0.0000";
            	 }else
            		 return input;
             }
         };
     });
});

