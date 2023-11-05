module.exports = class ErrorHandler {
    static ErrorTypes = {
        bad_param: 'bad_param',
        no_session: 'no_session',
        server_error: 'server_error',
        authentication: 'authentication',
        data: 'data',
        conflict: 'conflict'
    }

    static GenerateError(code, type, message) {
        if (!ErrorHandler.ErrorTypes[type]) type = 'not_supported';
        return { code: code, type: type, msg: message };
    }
}