import {Component} from './knockout/component.es6';
@Component({
    name: 'my-app',
    template: `<h1>
        My first <span data-bind="text: name"></span> App
    </h1>`
})
export class AppViewModel {
    constructor() {
        this.name = 'Knockout ES';
    }
}