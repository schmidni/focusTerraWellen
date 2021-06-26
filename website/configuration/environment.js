const path = require('path');

module.exports = {
    paths: {
        /* Path to source files directory */
        source: path.resolve(__dirname, '../src/'),

        /* Path to built files directory */
        output: path.resolve(__dirname, '../../template/static'),
    },
    server: {
        // host: 'localhost',
        host: '0.0.0.0',
        port: 8000,
    },
};
