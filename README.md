<img src="./assets/logo.png" width="50" height="50" alt="dainingu">
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
        config/
            passport.js
            secrets.js
        controllers/
            menus.js
            sessions.js
            users.js
        models/
            menu.js
            order.js
            session.js
            user.js
        routes.js
        server.js
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
            btford.socket-io,
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
- [Express](http://expressjs.com) (Backend JS framework)
- [MongoDB](http://mongodb.com) (NoSQL database)
- [Node.js](http://nodejs.org) (Server platform)

Prerequisites
-------------------
Be sure to have the following prerequisites installed.

- [gulp](http://gulpjs.com/) (3.8.10)
- [MongoDB](http://mongodb.org)
- [Node.js](http://nodejs.org/) (0.10.x)
- [npm](https://www.npmjs.org/) (1.4.x)

- ...

## Installation
Install application using npm.

```
$ npm install
```

### Build
Build frontend using gulp.

```
$ gulp build
```

### Dist
Distribute frontend using gulp.

```
$ gulp dist
```

## Run
Run application using node or nodemon.

```
$ nodemon server/server.js
```

To-do
-------------------
- ...