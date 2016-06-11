export function Component(params) {
    return function(viewModel) {
        ko.components.register(params.name, {
            viewModel: viewModel,
            template: params.template
        })
    }
}