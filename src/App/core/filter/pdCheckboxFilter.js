angular.module("pd.checkboxFilter", [])
    //.filter("checkboxFilter", function () {
    //    return function (item,input) {
    //        var result = "";
    //        if (!(input == null || item == null)) {
    //            if (item.lastIndexOf(input + ",") != -1) {
    //                result = "checked";
    //            }
    //        }

    //        return result;
    //    };
    //});
 .filter("checkboxFilter", function () {
    return function (input, item) {
        var result = "";
        if (!(input == null || item == null)) {
            if (item.lastIndexOf(input + ",") != -1) {
                result = "checked";
            }
        }

        return result;
    };
});