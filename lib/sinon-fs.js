'use strict';

var sinon = require('sinon');

var fs = module.exports = {
  readFile: function(path, cb) {
    var content = fs.readFile.__stub__(path);
    var err = content && content.__fail__ === true ? {} : null;
    content = err ? null : content;
    process.nextTick(function() {
      cb(err, content);
    });
  }
};

fs.readFile.__stub__ = sinon.stub();
fs.readFile.returns = function() {
  fs.readFile.__stub__.returns.apply(fs.readFile.__stub__, arguments);
};
fs.readFile.fails = function() {
  fs.readFile.__stub__.returns({__fail__: true});
};
