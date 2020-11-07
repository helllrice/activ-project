const { validate } = require("webpack");

let validateForm = function(selector, rules, successModel, yaGoal) {
    new window.JustValidate(selector, {
        rules: rules,
        submitHandler: function(form) {

        }
    });
}




export default validate;