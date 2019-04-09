angular.module("app", [
    "ngSanitize",
    "pd.action",
    "pd.resource",
    "pd.dropdownTree",
    "pd.dropdownList",
    "pd.radioList",
    "pd.checkboxList",
    "pd.checkboxFilter",
    "pd.formReadonly",
    "pd.fileUpload",
    "pd.multiFileUpload",
    "pd.cityPicker",
    "pd.datepicker",
    "pd.cascade",
    "pd.table",
    "app.rms",
    "app.index",
    "app.ydyd",
    "app.pzgl",
    "app.jgfs",
    "app.wryzx",
    "app.sjzx"
])

angular.module("app.rms", []); 
angular.module("app.index", []); 
angular.module("app.ydyd", []); 
angular.module("app.pzgl", []); 
angular.module("app.sjzx", []); 
angular.module("app.wryzx", []); 
angular.module("app.jgfs", []); 


/**
 * array是否存在e
 * @param {any} e
 */
Array.prototype.inArray = function (e) {
    for (i = 0; i < this.length; i++) {
        if (this[i] == e)
            return true;
    }

    return false;
}

/**
 *  array去重
 */
Array.prototype.unique = function () {
    return this.filter(function (v, i, m) {
        return i <= m.indexOf(v);
    });
};
