var functions = exports;

//
// ### function returns (value)
// #### @value Function return value
// Creates a function which alwas returns `value`
//
functions.returns = function (value) {
  return function () {
    return value;
  }
};

//
// ### function throws (error)
// #### @error Error which should be thrown
// Throws `error` when called.
//
functions.throws = function (error) {
  return function () {
    throw error;
  };
};

//
// ### function throwsIfError ()
// #### @error Value to throw when first parameter is truthy. Optional.
// Returns a function throwing `error` or first parameter when first supplied
// parameter is truthy.
//
functions.throwsIfError = function (error) {
  return function (err) {
    if (err) {
      throw (typeof error !== 'undefined') ? error : err;
    }
  };
};

//
// ### function noop ()
// Does nothing.
//
functions.noop = function () {};

//
// ### function eq (val0, val1)
// #### val0 First value
// #### val1 Second value
// Returns `val0 == val1`
//
functions.eq = function (val0, val1) {
  return val0 == val1;
};

//
// ### function strictEq (val0, val1)
// #### val0 First value
// #### val1 Second value
// Returns `val0 === val1`
//
functions.strictEq = function (val0, val1) {
  return val0 === val1;
};

//
// ### function gt (val0, val1)
// #### val0 First value
// #### val1 Second value
// Returns `val0 > val1`
//
functions.gt = function (val0, val1) {
  return val0 > val1;
};

//
// ### function lt (val0, val1)
// #### val0 First value
// #### val1 Second value
// Returns `val0 < val1`
//
functions.lt = function (val0, val1) {
  return val0 < val1;
};

//
// ### function ge (val0, val1)
// #### val0 First value
// #### val1 Second value
// Returns `val0 >= val1`
//
functions.ge = function (val0, val1) {
  return val0 >= val1;
};

//
// ### function le (val0, val1)
// #### val0 First value
// #### val1 Second value
// Returns `val0 <= val1`
//
functions.le = function (val0, val1) {
  return val0 <= val1;
};

