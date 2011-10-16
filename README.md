# node-functions [![Build Status](https://secure.travis-ci.org/mmalecki/node-functions.png)](http://travis-ci.org/mmalecki/node-functions)
Copyright (C) 2011 by Maciej Małecki  
MIT License (see LICENSE file)

node-functions is a library for dealing with functions in JavaScript.

## Usage

```javascript
var assert = require('assert'),
    functions = require('functions');

// `functions.returns`
var get42 = functions.returns(42);
// get42 always returns `42`
assert.equal(get42(), 42);

// `functions.throws`
var throwMeAnError = functions.throws(new Error());
// throwMeAnError will always throw an Error when called
assert.throws(throwMeAnError, Error);

// `functions.throwsIfError`
var throwIfError = functions.throwsIfError();
// throwIfError will always throw first parameter it gets if it's truthy
assert.throws(function () { throwIfError(new Error()); });
assert.doesNotThrow(function () { throwsIfError(0); });

functions.noop(); // this call does nothing
```

## Installation

    npm install functions

