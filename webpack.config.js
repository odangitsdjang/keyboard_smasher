var path = require('path');

module.exports = {
  entry: './js/entry.js',
  output: {
    filename: './bundle.js',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '*']
  }
};

// run "webpack" to bundle it together
