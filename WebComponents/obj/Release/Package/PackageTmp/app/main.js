define(function (require) {
    // Load any app-specific modules
    // with a relative require call,
    // like:
    require('jquery-1.8.2');
    var ko=require('knockout-2.2.0');
    var messages = require('./messages');
    var appViewModel = require('./appViewModel');
    require('./searchresult/searchresult-view-model');
    // Load library/vendor modules using
    // full IDs, like:
    var print = require('print');

    print(messages.getHello());
    ko.applyBindings(new appViewModel());
});
