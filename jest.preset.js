const nxPreset = require('@nrwl/jest/preset').default;
const path = require('path');

process.env.LOG_LEVEL = 'debug';
/**
 * Ensure that environment variables are loaded when running tests.
 */
['.env', '.local.env'].forEach((filename) => {
  require('dotenv').config({
    path: path.join(__dirname, filename),
  });
});

module.exports = { ...nxPreset };
