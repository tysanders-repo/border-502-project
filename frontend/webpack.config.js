const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@services': path.resolve(__dirname, 'src/services'),
    },
    extensions: ['.js', '.jsx'], // Make sure to include the file extensions
  },
  // Other configurations...
};
