var assert = require('assert'),
    vows = require('vows'),
    functions = require('../');

var N = 1024; // this is a bit silly

vows.describe('functions').addBatch({
  '`returns` function result': {
    topic: function () {
      return functions.returns(42);
      //
      // This is cause by a bug/feature in vows. When vows is given a function
      // as a topic, it executes it. Since our functions return functions, this
      // behavior results in unexpected results and has to be prevented.
      //
    },
    'should be a function': function (topic) {
      assert.isFunction(topic);
    },
    'should always return given value': function (topic) {
      for (var i = 0; i < N; i++) {
        assert.equal(topic(), 42);
      }
    }
  }
}).export(module);

