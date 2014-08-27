// Main viewmodel class
define(['knockout-2.2.0'], function (ko) {
    return function appViewModel() {
        this.firstName = ko.observable('Bert');
        this.firstNameCaps = ko.computed(function () {
            return this.firstName().toUpperCase();
        }, this);
        this.giftWrap = ko.observable(true);

        ko.bindingHandlers.withProperties = {
            init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                // Make a modified binding context, with a extra properties, and apply it to descendant elements
                var innerBindingContext = bindingContext.extend(valueAccessor);
                ko.applyBindingsToDescendants(innerBindingContext, element);

                // Also tell KO *not* to bind the descendants itself, otherwise they will be bound twice
                return { controlsDescendantBindings: true };
            }
        };
    };
});