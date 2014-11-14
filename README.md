<img src="./assets/logo@2x.png" width="50" height="50" alt="dainingu">
# dainingu

> Unfinished digital menu card system.

## Directory Layout
    bower_components/
        angular/
        angular-animate/
        angular-resource/
        bootstrap/
        jquery/
        reset-css/
        ui-router/
    client/
        build/ (created on the fly)
        dist/ (created on the fly)
        src/
    node_modules/
    server/
    .bowerrc
    .gitignore
    .jshintrc
    bower.json
    gulpfile.js
    karma.conf.js
    package.json
    README.md



## Overview of AngularJS modules
    dainingu --> [
        dainingu.core --> [
            ngAnimate,
            ngResource,
            ui.router
        ],

        dainingu.home,

        dainingu.cashregister,
        dainingu.dashboard,
        dainingu.floor,
        dainingu.kitchen,
        dainingu.menucard,

        dainingu.templates,
        dainingu.widgets
    ]

Overview of REST interactions with backend API
-------------------
![Site Overview](assets/rest-interactions.png)

Technologies
-------------------
- [AngularJS](http://angularjs.org) (Frontend JS framework)
- ...

Prerequisites
-------------------
Be sure to have the following prerequisites installed.

- [Node.js](http://nodejs.org/) (0.10.x)
- [npm](https://www.npmjs.org/) (1.4.x)
- [gulp](http://gulpjs.com/) (3.8.10)
- ...

Installation
-------------------
Install application using npm.

```
$ npm install
```

Run
-------------------
Run application using gulp.

```
$ gulp
```

To-do
-------------------
- Add server application to the stack.