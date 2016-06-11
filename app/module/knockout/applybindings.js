export function ApplyBindings(viewModelOrBindingContext, rootNode) {
    ko.applyBindings(viewModelOrBindingContext || function() {}, rootNode);
}