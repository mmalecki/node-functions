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

