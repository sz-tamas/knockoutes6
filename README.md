# knockoutes6
This is an example how to create an application with Knockout using ES6 Features.

## Component

Before:

```javascript
ko.components.register('my-app', {
    template: '<h1>My first <span data-bind="text: name"></span> App</h1>',
    viewModel: function(Params) {
        var self = this;

        self.name = 'Knockout';
    }
})
```

After:

```javascript
import {Component} from '../../module/knockout/component.js';
import Template from './app.html';

@Component({
    name: 'my-app',
    template: Template
})
export class AppViewModel {
    constructor() {
        this.name = 'Knockout ES6';
    }
}
```

Our viewModel became a class where the constructor represents the function that is passed to the viewModel in 'Before'.
The @Component is a decorator for the ViewModel and expects two params (name: string, template: string).

## View

There is no improvements there, everything should be working how Knockout defines them.

# Usage

Install node packages then run gulp for build and to start webserver.

Webserver's configuration are in the gulpfile. To get it work within a docker container i used 0.0.0.0:8080 for host & port but if it's removed we will get localhost:8000 which is just fine for local run without docker.

```
npm install
gulp
```

# What's next

## KnockoutES5

https://github.com/SteveSanderson/knockout-es5

## Decorators

Only the component registration uses es7 decorators, but there could be much more. For reference this is a nice article: https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841#.jgypcxm93