<img src="./assets/logo.png" width="50" height="50" alt="dainingu">
# dainingu

> Unfinished digital menu card system.

## Directory Layout
    bower_components/
        angular/
        angular-animate/
        angular-resource/
        angular-socket-io/
        angular-touch/
        bootstrap/
        jquery/
        socket.io-client
        ui-router/
    client/
        build/ (created on the fly)
        dist/ (created on the fly)
        src/
            assets/
            cashregister/
            components/
            dashboard/
                login/
                menus/
                sessions/
                users/
            floor/
            home/
            kitchen/
            menucard/
            scss/
            services/
            widgets/
                dish/
                menu/
                user/
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
            mongoose
                session.js
                user.js
            sequelize
                menu.js
                order.js
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
            ngTourch,
            btford.socket-io,
            ui.router
        ],

        dainingu.home,

        dainingu.cashregister,
        dainingu.floor,
        dainingu.kitchen,
        dainingu.menucard,

        dainingu.dashboard --> [
            dainingu.dashboard.login,
            dainingu.dashboard.menus,
            dainingu.dashboard.sessions,
            dainingu.dashboard.users
        ],

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
Install dependencies using npm. This will automatically run `bower install` afterwards.

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