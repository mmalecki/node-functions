var util = require('util'),
    assert = require('assert'),
    vows = require('vows'),
    functions = require('../');

var N = 1024; // this is a bit silly

var OurError = function () {};
util.inherits(OurError, Error);

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
  },
  '`throws` function result': {
    topic: function () {
      return functions.throws(new OurError('Expected error'));
    },
    'should be a function': function (topic) {
      assert.isFunction(topic);
    },
    'should always throw given error': function (topic) {
      for (var i = 0; i < N; i++) {
        assert.throws(topic, OurError);
      }
    }
  },
  '`throwsIfError` function result': {
    'without `exception` parameter': {
      topic: function () {
        return functions.throwsIfError();
      },
      'should be a function': function (topic) {
        assert.isFunction(topic);
      },
      "should always throw first parameter if it's truthy": function (topic) {
        for (var i = 0; i < N; i++) {
          assert.throws(topic.bind(topic, new OurError('Expected error')),
                        OurError);
        }
      },
      'should never throw if first parameter is falsy': function (topic) {
        for (var i = 0; i < N; i++) {
          assert.doesNotThrow(topic.bind(topic, false));
        }
      }
    },
    'with `exception` parameter': {
      topic: function () {
        return functions.throwsIfError(new OurError('Expected error'));
      },
      'should be a function': function (topic) {
        assert.isFunction(topic);
      },
      'should always throw provided error if first parameter is truthy': function (topic) {
        for (var i = 0; i < N; i++) {
          assert.throws(topic.bind(topic, true), OurError);
        }
      },
      'should never throw if first parameter is falsy': function (topic) {
        for (var i = 0; i < N; i++) {
          assert.doesNotThrow(topic.bind(topic, false), Error);
        }
      }
    }
  },
  '`noop` function': {
    topic: function () {
      return functions.noop;
    },
    'should be a function': function (topic) {
      assert.isFunction(topic);
    },
    'when called': {
      'should never return anything': function (result) {
        for (var i = 0; i < N; i++) {
          assert.isUndefined(result());
        }
      }
    }
  }
}).export(module);

