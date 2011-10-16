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

