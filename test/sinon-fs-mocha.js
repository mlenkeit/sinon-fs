/*global describe, it,*/
/*eslint no-unused-expressions: 0*/
'use strict';

var expect = require('chai').expect;
var fs = require('./../lib/sinon-fs');

describe('sinon-fs', function() {

  var path = 'some-filepath.ext';

  describe('readFile', function() {

    it('invokes the callback asyncronously', function(done) {
      var callbackInvokedSynchronously = false;
      fs.readFile(path, function() {
        callbackInvokedSynchronously = false;
      });
      callbackInvokedSynchronously = true;
      process.nextTick(function() {
        expect(callbackInvokedSynchronously).to.equal(false);
        done();
      });
    });

    it('passes a configured file content to the callback', function(done) {
      var content = 'some text';
      fs.readFile.returns(content);
      fs.readFile(path, function(err, data) {
        expect(err).to.not.be.ok;
        expect(data.toString()).to.equal(content);
        done();
      });
    });

    it('passes an error to the callback if configured to fail', function(done) {
      fs.readFile.fails();
      fs.readFile(path, function(err, data) {
        expect(err).to.be.ok;
        expect(data).to.not.be.ok;
        done();
      });
    });

  });
});
