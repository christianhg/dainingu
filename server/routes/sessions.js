(function () {
    'use strict';

    module.exports = function(app, io, jwtCheck) {
        var sessions = require('./../controllers/sessions');

        app.route('/api/sessions')
            .get(jwtCheck, function(req, res) {
                sessions.index(req, res, function(data) {

                });
            })
            .post(jwtCheck, function(req, res) {
                sessions.store(req, res, function(data) {
                    io.sockets.emit('sessionsUpdated');
                    io.sockets.emit('alert', { type: 'success', message: data.message });
                });
            });
        app.route('/api/sessions/:id')
            .get(jwtCheck, function(req, res) {
                sessions.show(req, res, function(data) {

                });
            })
            .put(jwtCheck, function(req, res) {
                sessions.update(req, res, function(data) {
                    io.sockets.emit('sessionsUpdated');
                    io.sockets.emit('alert', { type: 'warning', message: data.message });
                });
            })
            .delete(jwtCheck, function(req, res) {
                sessions.destroy(req, res, function(data) {
                    io.sockets.emit('sessionsUpdated');
                    io.sockets.emit('alert', { type: 'danger', message: data.message });
                });
            });

        /**
         * Add og remove active-flag from sessions
         */
        app.route('/api/sessions/:sessionId/activate')
            .put(jwtCheck, function(req, res) {
                sessions.activate(req, res, function(data) {
                    io.sockets.emit('sessionsUpdated');
                    io.sockets.emit('alert', { type: 'success', message: data.message });
                });
            })
            .delete(jwtCheck, function(req, res) {
                sessions.deactivate(req, res, function(data) {
                    io.sockets.emit('sessionsUpdated');
                    io.sockets.emit('alert', { type: 'warning', message: data.message });
                });
            });

        /**
         * Add og remove expire-flag from sessions
         */
        app.route('/api/sessions/:sessionId/expire')
            .put(jwtCheck, function(req, res) {
                sessions.expire(req, res, function(data) {
                    io.sockets.emit('sessionsUpdated');
                    io.sockets.emit('alert', { type: 'warning', message: data.message });
                });
            })
            .delete(jwtCheck, function(req, res) {
                sessions.resume(req, res, function(data) {
                    io.sockets.emit('sessionsUpdated');
                    io.sockets.emit('alert', { type: 'warning', message: data.message });
                });
            });
    };

})();