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

