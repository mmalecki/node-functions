var util = require('util'),
    assert = require('assert'),
    vows = require('vows'),
    functions = require('../');

var N = 1024; // this is a bit silly

var OurError = function () {};
util.inherits(OurError, Error);

function testFunction(func, tests) {
  return {
    topic: function () {
      return func;
      //
      // This is caused by a bug/feature in vows. When vows is given a function
      // as a topic, it executes it. Since our functions return functions, this
      // behavior results in unexpected results and has to be prevented.
      //
    },
    'should be a function': function (topic) {
      assert.isFunction(topic);
    },
    'when called': tests
  };
};

vows.describe('functions').addBatch({
  '`returns` function result': testFunction(functions.returns(42), {
    'should always return given value': function (topic) {
      for (var i = 0; i < N; i++) {
        assert.equal(topic(), 42);
      }
    }
  }),
  '`throws` function result': testFunction(functions.throws(new OurError('Expected error')), {
    'should always throw given error': function (topic) {
      for (var i = 0; i < N; i++) {
        assert.throws(topic, OurError);
      }
    }
  }),
  '`throwsIfError` function result': {
    'without `exception` parameter': testFunction(functions.throwsIfError(), {
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
    }),
    'with `exception` parameter': testFunction(functions.throwsIfError(new OurError('Expected error')), {
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
    })
  },
  '`noop` function': testFunction(functions.noop, {
    'should never return anything': function (result) {
      for (var i = 0; i < N; i++) {
        assert.isUndefined(result());
      }
    }
  }),
  '`eq` function': testFunction(functions.eq, {
    'with equal values': {
      topic: functions.eq(42, 42),
      'should return true': function (result) {
        assert.isTrue(result);
      }
    },
    'with equalish values': {
      topic: functions.eq('42', 42),
      'should return true': function (result) {
        assert.isTrue(result);
      }
    }
  }),
  '`strictEq` function': testFunction(functions.strictEq, {
    'with equal values': {
      topic: functions.strictEq(42, 42),
      'should return true': function (result) {
        assert.isTrue(result);
      }
    },
    'with equalish values': {
      topic: functions.strictEq('42', 42),
      'should return false': function (result) {
        assert.isFalse(result);
      }
    }
  }),
  '`gt` function': testFunction(functions.gt, {
    'with first argument greater than second': {
      topic: functions.gt(42, -42),
      'should return true': function (result) {
        assert.isTrue(result);
      }
    },
    'with first argument less than second': {
      topic: functions.gt(42, 84),
      'should return false': function (result) {
        assert.isFalse(result);
      }
    },
    'with equal arguments': {
      topic: functions.gt(42, 42),
      'should return false': function (result) {
        assert.isFalse(result);
      }
    }
  }),
  '`lt` function': testFunction(functions.lt, {
    'with first argument less than second': {
      topic: functions.lt(-42, 42),
      'should return true': function (result) {
        assert.isTrue(result);
      }
    },
    'with first argument greater than second': {
      topic: functions.lt(42, -42),
      'should return false': function (result) {
        assert.isFalse(result);
      }
    },
    'with equal arguments': {
      topic: functions.lt(42, 42),
      'should return false': function (result) {
        assert.isFalse(result);
      }
    }
  }),
  '`ge` function': testFunction(functions.ge, {
    'with first argument greater than second': {
      topic: functions.ge(42, -42),
      'should return true': function (result) {
        assert.isTrue(result);
      }
    },
    'with first argument less than second': {
      topic: functions.ge(42, 84),
      'should return false': function (result) {
        assert.isFalse(result);
      }
    },
    'with equal arguments': {
      topic: functions.ge(42, 42),
      'should return true': function (result) {
        assert.isTrue(result);
      }
    }
  }),
  '`le` function': testFunction(functions.le, {
    'with first argument less than second': {
      topic: functions.le(-42, 42),
      'should return true': function (result) {
        assert.isTrue(result);
      }
    },
    'with first argument greater than second': {
      topic: functions.le(42, -42),
      'should return false': function (result) {
        assert.isFalse(result);
      }
    },
    'with equal arguments': {
      topic: functions.le(42, 42),
      'should return true': function (result) {
        assert.isTrue(result);
      }
    }
  })
}).export(module);

