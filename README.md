<img src="./assets/logo.png" width="50" height="50" alt="dainingu">
# dainingu

> Digital menu card system.

Technologies
-------------------
- [Angular](http://angularjs.org) (Frontend JS framework)
- [Express](http://expressjs.com) (Backend JS framework)
- [MongoDB](http://mongodb.com) (NoSQL database)
- [MySQL](http://mysqk.com) (RDBMS)
- [Node](http://nodejs.org) (Runtime)

Prerequisites
-------------------
Be sure to have the following prerequisites installed.

- [Bower](http://bower.io)
- [Gulp](http://gulpjs.com/) (3.8.10)
- [MongoDB](http://mongodb.org) (2.4 or newer)
- [MySQL](http://mysqk.com) (2.5 or newer)
- [Node](http://nodejs.org/) (0.10.x)
- [NPM](https://www.npmjs.org/) (1.4.x)

Installation
-------------------
### Clone GitHub repository

```
$ git clone https://github.com/christianhg/dainingu.git dainingu
```

This will clone the latest version of the project to a **dainingu** folder.

### Install needed dependencies
Install dependencies using npm. This will automatically run `bower install` afterwards.

```
$ npm install
```

### Setup databases
Create the a `server/config/secrets.js` file with the following content:

    module.exports = {

        port: process.env.Port || 2000,

        mongodb: {
            database: '',
            user: '',
            host: '',
            password: ''
        },

        mysql: {
            database: '',
            user: '',
            host: '',
            password: ''
        },

        jwtSecrets: {
            auth: '',
            authMenucard: ''
        }

    };

Insert desired port number, database secrets and JWT secrets.

### Build
Build frontend using Gulp. This will minify all files from `client/src` and place them in `client/build`.

```
$ gulp build
```

### Run
Run application using node or nodemon.

```
$ nodemon server/server
```

### Open application
Go to `http://localhost:2000/`

## Dist
Distribute frontend using gulp.

```
$ gulp dist
```

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

## Directory Layout
    bower_components/
    client/
        build/ (created on the fly)
        dist/ (created on the fly)
        src/
            assets/
            cashregister/
                login/
                orders/
            core/
            dashboard/
                dishes/
                login/
                menus/
                orders/
                sessions/
                statistics/
                users/
            floor/
                login/
                menus/
                orders/
                sessions/
            home/
            kitchen/
                login/
                menus/
                orders/
            menucard/
                activate/
                menus/
                nav/
                orders/
                titleCard/
            scss/
            services/
            widgets/
                dish/
                    form/
                    info/
                loginForm/
                mainNav/
                order/
                    labels/
                session/
                    alerts/
                    create/
                    info/
                    labels/
                    title/
    node_modules/
    server/
        config/
            passport.js
            secrets.js
            sequelize.js
        controllers/
            auth.js
            authMenucard.js
            dishes.js
            menucard.js
            menus.js
            menusDishes.js
            orders.js
            sessions.js
            sessionsOrders.js
            sessionsOrdersDishes.js
            users.js
        models/
            mongoose
                session.js
                user.js
            sequelize
                menu.js
                order.js
        routes/
            auth.js
            authMenucard.js
            dishes.js
            menucard.js
            menus.js
            menusDishes.js
            orders.js
            sessions.js
            sessionsOrders.js
            sessionsOrdersDishes.js
            users.js
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


Overview of REST interactions with backend API
-------------------
![Site Overview](assets/rest-interactions.png)