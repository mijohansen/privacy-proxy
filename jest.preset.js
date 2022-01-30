const nxPreset = require('@nrwl/jest/preset');
const path = require('path');

/**
 * Ensure that environment variables are loaded when running tests.
 */
['.env', '.local.env'].forEach((filename) => {
  require('dotenv').config({
    path: path.join(__dirname, filename),
  });
});

module.exports = { ...nxPreset };
