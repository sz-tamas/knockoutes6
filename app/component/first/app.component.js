import {Component} from '../../module/knockout/component.js';
import Template from './app.html';

@Component({
    name: 'my-app',
    // template: `<h1>
    //     My first <span data-bind="text: name"></span> App
    // </h1>`
    template: Template
})
export class AppViewModel {
    constructor() {
        this.name = 'Knockout ES6';
    }
}