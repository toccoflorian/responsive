/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../node_modules/core-js/internals/a-callable.js":
/*!**********************************************************!*\
  !*** ../../node_modules/core-js/internals/a-callable.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var isCallable = __webpack_require__(/*! ../internals/is-callable */ "../../node_modules/core-js/internals/is-callable.js");
var tryToString = __webpack_require__(/*! ../internals/try-to-string */ "../../node_modules/core-js/internals/try-to-string.js");

var $TypeError = TypeError;

// `Assert: IsCallable(argument) is true`
module.exports = function (argument) {
  if (isCallable(argument)) return argument;
  throw $TypeError(tryToString(argument) + ' is not a function');
};


/***/ }),

/***/ "../../node_modules/core-js/internals/a-possible-prototype.js":
/*!********************************************************************!*\
  !*** ../../node_modules/core-js/internals/a-possible-prototype.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var isCallable = __webpack_require__(/*! ../internals/is-callable */ "../../node_modules/core-js/internals/is-callable.js");

var $String = String;
var $TypeError = TypeError;

module.exports = function (argument) {
  if (typeof argument == 'object' || isCallable(argument)) return argument;
  throw $TypeError("Can't set " + $String(argument) + ' as a prototype');
};


/***/ }),

/***/ "../../node_modules/core-js/internals/add-to-unscopables.js":
/*!******************************************************************!*\
  !*** ../../node_modules/core-js/internals/add-to-unscopables.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");
var create = __webpack_require__(/*! ../internals/object-create */ "../../node_modules/core-js/internals/object-create.js");
var defineProperty = (__webpack_require__(/*! ../internals/object-define-property */ "../../node_modules/core-js/internals/object-define-property.js").f);

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] === undefined) {
  defineProperty(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create(null)
  });
}

// add a key to Array.prototype[@@unscopables]
module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "../../node_modules/core-js/internals/advance-string-index.js":
/*!********************************************************************!*\
  !*** ../../node_modules/core-js/internals/advance-string-index.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var charAt = (__webpack_require__(/*! ../internals/string-multibyte */ "../../node_modules/core-js/internals/string-multibyte.js").charAt);

// `AdvanceStringIndex` abstract operation
// https://tc39.es/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? charAt(S, index).length : 1);
};


/***/ }),

/***/ "../../node_modules/core-js/internals/an-object.js":
/*!*********************************************************!*\
  !*** ../../node_modules/core-js/internals/an-object.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var isObject = __webpack_require__(/*! ../internals/is-object */ "../../node_modules/core-js/internals/is-object.js");

var $String = String;
var $TypeError = TypeError;

// `Assert: Type(argument) is Object`
module.exports = function (argument) {
  if (isObject(argument)) return argument;
  throw $TypeError($String(argument) + ' is not an object');
};


/***/ }),

/***/ "../../node_modules/core-js/internals/array-includes.js":
/*!**************************************************************!*\
  !*** ../../node_modules/core-js/internals/array-includes.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "../../node_modules/core-js/internals/to-indexed-object.js");
var toAbsoluteIndex = __webpack_require__(/*! ../internals/to-absolute-index */ "../../node_modules/core-js/internals/to-absolute-index.js");
var lengthOfArrayLike = __webpack_require__(/*! ../internals/length-of-array-like */ "../../node_modules/core-js/internals/length-of-array-like.js");

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = lengthOfArrayLike(O);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el !== el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value !== value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ "../../node_modules/core-js/internals/classof-raw.js":
/*!***********************************************************!*\
  !*** ../../node_modules/core-js/internals/classof-raw.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "../../node_modules/core-js/internals/function-uncurry-this.js");

var toString = uncurryThis({}.toString);
var stringSlice = uncurryThis(''.slice);

module.exports = function (it) {
  return stringSlice(toString(it), 8, -1);
};


/***/ }),

/***/ "../../node_modules/core-js/internals/classof.js":
/*!*******************************************************!*\
  !*** ../../node_modules/core-js/internals/classof.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var TO_STRING_TAG_SUPPORT = __webpack_require__(/*! ../internals/to-string-tag-support */ "../../node_modules/core-js/internals/to-string-tag-support.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "../../node_modules/core-js/internals/is-callable.js");
var classofRaw = __webpack_require__(/*! ../internals/classof-raw */ "../../node_modules/core-js/internals/classof-raw.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var $Object = Object;

// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) === 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) === 'Object' && isCallable(O.callee) ? 'Arguments' : result;
};


/***/ }),

/***/ "../../node_modules/core-js/internals/copy-constructor-properties.js":
/*!***************************************************************************!*\
  !*** ../../node_modules/core-js/internals/copy-constructor-properties.js ***!
  \***************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "../../node_modules/core-js/internals/has-own-property.js");
var ownKeys = __webpack_require__(/*! ../internals/own-keys */ "../../node_modules/core-js/internals/own-keys.js");
var getOwnPropertyDescriptorModule = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "../../node_modules/core-js/internals/object-get-own-property-descriptor.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "../../node_modules/core-js/internals/object-define-property.js");

module.exports = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};


/***/ }),

/***/ "../../node_modules/core-js/internals/correct-prototype-getter.js":
/*!************************************************************************!*\
  !*** ../../node_modules/core-js/internals/correct-prototype-getter.js ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");

module.exports = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
  return Object.getPrototypeOf(new F()) !== F.prototype;
});


/***/ }),

/***/ "../../node_modules/core-js/internals/create-iter-result-object.js":
/*!*************************************************************************!*\
  !*** ../../node_modules/core-js/internals/create-iter-result-object.js ***!
  \*************************************************************************/
/***/ ((module) => {


// `CreateIterResultObject` abstract operation
// https://tc39.es/ecma262/#sec-createiterresultobject
module.exports = function (value, done) {
  return { value: value, done: done };
};


/***/ }),

/***/ "../../node_modules/core-js/internals/create-non-enumerable-property.js":
/*!******************************************************************************!*\
  !*** ../../node_modules/core-js/internals/create-non-enumerable-property.js ***!
  \******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../node_modules/core-js/internals/descriptors.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "../../node_modules/core-js/internals/object-define-property.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "../../node_modules/core-js/internals/create-property-descriptor.js");

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "../../node_modules/core-js/internals/create-property-descriptor.js":
/*!**************************************************************************!*\
  !*** ../../node_modules/core-js/internals/create-property-descriptor.js ***!
  \**************************************************************************/
/***/ ((module) => {


module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "../../node_modules/core-js/internals/define-built-in.js":
/*!***************************************************************!*\
  !*** ../../node_modules/core-js/internals/define-built-in.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var isCallable = __webpack_require__(/*! ../internals/is-callable */ "../../node_modules/core-js/internals/is-callable.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "../../node_modules/core-js/internals/object-define-property.js");
var makeBuiltIn = __webpack_require__(/*! ../internals/make-built-in */ "../../node_modules/core-js/internals/make-built-in.js");
var defineGlobalProperty = __webpack_require__(/*! ../internals/define-global-property */ "../../node_modules/core-js/internals/define-global-property.js");

module.exports = function (O, key, value, options) {
  if (!options) options = {};
  var simple = options.enumerable;
  var name = options.name !== undefined ? options.name : key;
  if (isCallable(value)) makeBuiltIn(value, name, options);
  if (options.global) {
    if (simple) O[key] = value;
    else defineGlobalProperty(key, value);
  } else {
    try {
      if (!options.unsafe) delete O[key];
      else if (O[key]) simple = true;
    } catch (error) { /* empty */ }
    if (simple) O[key] = value;
    else definePropertyModule.f(O, key, {
      value: value,
      enumerable: false,
      configurable: !options.nonConfigurable,
      writable: !options.nonWritable
    });
  } return O;
};


/***/ }),

/***/ "../../node_modules/core-js/internals/define-global-property.js":
/*!**********************************************************************!*\
  !*** ../../node_modules/core-js/internals/define-global-property.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");

// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;

module.exports = function (key, value) {
  try {
    defineProperty(global, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ "../../node_modules/core-js/internals/descriptors.js":
/*!***********************************************************!*\
  !*** ../../node_modules/core-js/internals/descriptors.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] !== 7;
});


/***/ }),

/***/ "../../node_modules/core-js/internals/document-all.js":
/*!************************************************************!*\
  !*** ../../node_modules/core-js/internals/document-all.js ***!
  \************************************************************/
/***/ ((module) => {


var documentAll = typeof document == 'object' && document.all;

// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
// eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
var IS_HTMLDDA = typeof documentAll == 'undefined' && documentAll !== undefined;

module.exports = {
  all: documentAll,
  IS_HTMLDDA: IS_HTMLDDA
};


/***/ }),

/***/ "../../node_modules/core-js/internals/document-create-element.js":
/*!***********************************************************************!*\
  !*** ../../node_modules/core-js/internals/document-create-element.js ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "../../node_modules/core-js/internals/is-object.js");

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ "../../node_modules/core-js/internals/dom-iterables.js":
/*!*************************************************************!*\
  !*** ../../node_modules/core-js/internals/dom-iterables.js ***!
  \*************************************************************/
/***/ ((module) => {


// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
module.exports = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};


/***/ }),

/***/ "../../node_modules/core-js/internals/dom-token-list-prototype.js":
/*!************************************************************************!*\
  !*** ../../node_modules/core-js/internals/dom-token-list-prototype.js ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


// in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`
var documentCreateElement = __webpack_require__(/*! ../internals/document-create-element */ "../../node_modules/core-js/internals/document-create-element.js");

var classList = documentCreateElement('span').classList;
var DOMTokenListPrototype = classList && classList.constructor && classList.constructor.prototype;

module.exports = DOMTokenListPrototype === Object.prototype ? undefined : DOMTokenListPrototype;


/***/ }),

/***/ "../../node_modules/core-js/internals/engine-user-agent.js":
/*!*****************************************************************!*\
  !*** ../../node_modules/core-js/internals/engine-user-agent.js ***!
  \*****************************************************************/
/***/ ((module) => {


module.exports = typeof navigator != 'undefined' && String(navigator.userAgent) || '';


/***/ }),

/***/ "../../node_modules/core-js/internals/engine-v8-version.js":
/*!*****************************************************************!*\
  !*** ../../node_modules/core-js/internals/engine-v8-version.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");
var userAgent = __webpack_require__(/*! ../internals/engine-user-agent */ "../../node_modules/core-js/internals/engine-user-agent.js");

var process = global.process;
var Deno = global.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

module.exports = version;


/***/ }),

/***/ "../../node_modules/core-js/internals/enum-bug-keys.js":
/*!*************************************************************!*\
  !*** ../../node_modules/core-js/internals/enum-bug-keys.js ***!
  \*************************************************************/
/***/ ((module) => {


// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ "../../node_modules/core-js/internals/export.js":
/*!******************************************************!*\
  !*** ../../node_modules/core-js/internals/export.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");
var getOwnPropertyDescriptor = (__webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "../../node_modules/core-js/internals/object-get-own-property-descriptor.js").f);
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "../../node_modules/core-js/internals/create-non-enumerable-property.js");
var defineBuiltIn = __webpack_require__(/*! ../internals/define-built-in */ "../../node_modules/core-js/internals/define-built-in.js");
var defineGlobalProperty = __webpack_require__(/*! ../internals/define-global-property */ "../../node_modules/core-js/internals/define-global-property.js");
var copyConstructorProperties = __webpack_require__(/*! ../internals/copy-constructor-properties */ "../../node_modules/core-js/internals/copy-constructor-properties.js");
var isForced = __webpack_require__(/*! ../internals/is-forced */ "../../node_modules/core-js/internals/is-forced.js");

/*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || defineGlobalProperty(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.dontCallGetSet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    defineBuiltIn(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ "../../node_modules/core-js/internals/fails.js":
/*!*****************************************************!*\
  !*** ../../node_modules/core-js/internals/fails.js ***!
  \*****************************************************/
/***/ ((module) => {


module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ "../../node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js":
/*!**********************************************************************************!*\
  !*** ../../node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


// TODO: Remove from `core-js@4` since it's moved to entry points
__webpack_require__(/*! ../modules/es.regexp.exec */ "../../node_modules/core-js/modules/es.regexp.exec.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this-clause */ "../../node_modules/core-js/internals/function-uncurry-this-clause.js");
var defineBuiltIn = __webpack_require__(/*! ../internals/define-built-in */ "../../node_modules/core-js/internals/define-built-in.js");
var regexpExec = __webpack_require__(/*! ../internals/regexp-exec */ "../../node_modules/core-js/internals/regexp-exec.js");
var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "../../node_modules/core-js/internals/create-non-enumerable-property.js");

var SPECIES = wellKnownSymbol('species');
var RegExpPrototype = RegExp.prototype;

module.exports = function (KEY, exec, FORCED, SHAM) {
  var SYMBOL = wellKnownSymbol(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) !== 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    if (KEY === 'split') {
      // We can't use real regex here since it causes deoptimization
      // and serious performance degradation in V8
      // https://github.com/zloirock/core-js/issues/306
      re = {};
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
      re.flags = '';
      re[SYMBOL] = /./[SYMBOL];
    }

    re.exec = function () { execCalled = true; return null; };

    re[SYMBOL]('');
    return !execCalled;
  });

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    FORCED
  ) {
    var uncurriedNativeRegExpMethod = uncurryThis(/./[SYMBOL]);
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      var uncurriedNativeMethod = uncurryThis(nativeMethod);
      var $exec = regexp.exec;
      if ($exec === regexpExec || $exec === RegExpPrototype.exec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: uncurriedNativeRegExpMethod(regexp, str, arg2) };
        }
        return { done: true, value: uncurriedNativeMethod(str, regexp, arg2) };
      }
      return { done: false };
    });

    defineBuiltIn(String.prototype, KEY, methods[0]);
    defineBuiltIn(RegExpPrototype, SYMBOL, methods[1]);
  }

  if (SHAM) createNonEnumerableProperty(RegExpPrototype[SYMBOL], 'sham', true);
};


/***/ }),

/***/ "../../node_modules/core-js/internals/function-apply.js":
/*!**************************************************************!*\
  !*** ../../node_modules/core-js/internals/function-apply.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var NATIVE_BIND = __webpack_require__(/*! ../internals/function-bind-native */ "../../node_modules/core-js/internals/function-bind-native.js");

var FunctionPrototype = Function.prototype;
var apply = FunctionPrototype.apply;
var call = FunctionPrototype.call;

// eslint-disable-next-line es/no-reflect -- safe
module.exports = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND ? call.bind(apply) : function () {
  return call.apply(apply, arguments);
});


/***/ }),

/***/ "../../node_modules/core-js/internals/function-bind-native.js":
/*!********************************************************************!*\
  !*** ../../node_modules/core-js/internals/function-bind-native.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");

module.exports = !fails(function () {
  // eslint-disable-next-line es/no-function-prototype-bind -- safe
  var test = (function () { /* empty */ }).bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});


/***/ }),

/***/ "../../node_modules/core-js/internals/function-call.js":
/*!*************************************************************!*\
  !*** ../../node_modules/core-js/internals/function-call.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var NATIVE_BIND = __webpack_require__(/*! ../internals/function-bind-native */ "../../node_modules/core-js/internals/function-bind-native.js");

var call = Function.prototype.call;

module.exports = NATIVE_BIND ? call.bind(call) : function () {
  return call.apply(call, arguments);
};


/***/ }),

/***/ "../../node_modules/core-js/internals/function-name.js":
/*!*************************************************************!*\
  !*** ../../node_modules/core-js/internals/function-name.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../node_modules/core-js/internals/descriptors.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "../../node_modules/core-js/internals/has-own-property.js");

var FunctionPrototype = Function.prototype;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn(FunctionPrototype, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));

module.exports = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};


/***/ }),

/***/ "../../node_modules/core-js/internals/function-uncurry-this-accessor.js":
/*!******************************************************************************!*\
  !*** ../../node_modules/core-js/internals/function-uncurry-this-accessor.js ***!
  \******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "../../node_modules/core-js/internals/function-uncurry-this.js");
var aCallable = __webpack_require__(/*! ../internals/a-callable */ "../../node_modules/core-js/internals/a-callable.js");

module.exports = function (object, key, method) {
  try {
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    return uncurryThis(aCallable(Object.getOwnPropertyDescriptor(object, key)[method]));
  } catch (error) { /* empty */ }
};


/***/ }),

/***/ "../../node_modules/core-js/internals/function-uncurry-this-clause.js":
/*!****************************************************************************!*\
  !*** ../../node_modules/core-js/internals/function-uncurry-this-clause.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var classofRaw = __webpack_require__(/*! ../internals/classof-raw */ "../../node_modules/core-js/internals/classof-raw.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "../../node_modules/core-js/internals/function-uncurry-this.js");

module.exports = function (fn) {
  // Nashorn bug:
  //   https://github.com/zloirock/core-js/issues/1128
  //   https://github.com/zloirock/core-js/issues/1130
  if (classofRaw(fn) === 'Function') return uncurryThis(fn);
};


/***/ }),

/***/ "../../node_modules/core-js/internals/function-uncurry-this.js":
/*!*********************************************************************!*\
  !*** ../../node_modules/core-js/internals/function-uncurry-this.js ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var NATIVE_BIND = __webpack_require__(/*! ../internals/function-bind-native */ "../../node_modules/core-js/internals/function-bind-native.js");

var FunctionPrototype = Function.prototype;
var call = FunctionPrototype.call;
var uncurryThisWithBind = NATIVE_BIND && FunctionPrototype.bind.bind(call, call);

module.exports = NATIVE_BIND ? uncurryThisWithBind : function (fn) {
  return function () {
    return call.apply(fn, arguments);
  };
};


/***/ }),

/***/ "../../node_modules/core-js/internals/get-built-in.js":
/*!************************************************************!*\
  !*** ../../node_modules/core-js/internals/get-built-in.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "../../node_modules/core-js/internals/is-callable.js");

var aFunction = function (argument) {
  return isCallable(argument) ? argument : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global[namespace]) : global[namespace] && global[namespace][method];
};


/***/ }),

/***/ "../../node_modules/core-js/internals/get-method.js":
/*!**********************************************************!*\
  !*** ../../node_modules/core-js/internals/get-method.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var aCallable = __webpack_require__(/*! ../internals/a-callable */ "../../node_modules/core-js/internals/a-callable.js");
var isNullOrUndefined = __webpack_require__(/*! ../internals/is-null-or-undefined */ "../../node_modules/core-js/internals/is-null-or-undefined.js");

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
module.exports = function (V, P) {
  var func = V[P];
  return isNullOrUndefined(func) ? undefined : aCallable(func);
};


/***/ }),

/***/ "../../node_modules/core-js/internals/get-substitution.js":
/*!****************************************************************!*\
  !*** ../../node_modules/core-js/internals/get-substitution.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "../../node_modules/core-js/internals/function-uncurry-this.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "../../node_modules/core-js/internals/to-object.js");

var floor = Math.floor;
var charAt = uncurryThis(''.charAt);
var replace = uncurryThis(''.replace);
var stringSlice = uncurryThis(''.slice);
// eslint-disable-next-line redos/no-vulnerable -- safe
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

// `GetSubstitution` abstract operation
// https://tc39.es/ecma262/#sec-getsubstitution
module.exports = function (matched, str, position, captures, namedCaptures, replacement) {
  var tailPos = position + matched.length;
  var m = captures.length;
  var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
  if (namedCaptures !== undefined) {
    namedCaptures = toObject(namedCaptures);
    symbols = SUBSTITUTION_SYMBOLS;
  }
  return replace(replacement, symbols, function (match, ch) {
    var capture;
    switch (charAt(ch, 0)) {
      case '$': return '$';
      case '&': return matched;
      case '`': return stringSlice(str, 0, position);
      case "'": return stringSlice(str, tailPos);
      case '<':
        capture = namedCaptures[stringSlice(ch, 1, -1)];
        break;
      default: // \d\d?
        var n = +ch;
        if (n === 0) return match;
        if (n > m) {
          var f = floor(n / 10);
          if (f === 0) return match;
          if (f <= m) return captures[f - 1] === undefined ? charAt(ch, 1) : captures[f - 1] + charAt(ch, 1);
          return match;
        }
        capture = captures[n - 1];
    }
    return capture === undefined ? '' : capture;
  });
};


/***/ }),

/***/ "../../node_modules/core-js/internals/global.js":
/*!******************************************************!*\
  !*** ../../node_modules/core-js/internals/global.js ***!
  \******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var check = function (it) {
  return it && it.Math === Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof __webpack_require__.g == 'object' && __webpack_require__.g) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || this || Function('return this')();


/***/ }),

/***/ "../../node_modules/core-js/internals/has-own-property.js":
/*!****************************************************************!*\
  !*** ../../node_modules/core-js/internals/has-own-property.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "../../node_modules/core-js/internals/function-uncurry-this.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "../../node_modules/core-js/internals/to-object.js");

var hasOwnProperty = uncurryThis({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es/no-object-hasown -- safe
module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};


/***/ }),

/***/ "../../node_modules/core-js/internals/hidden-keys.js":
/*!***********************************************************!*\
  !*** ../../node_modules/core-js/internals/hidden-keys.js ***!
  \***********************************************************/
/***/ ((module) => {


module.exports = {};


/***/ }),

/***/ "../../node_modules/core-js/internals/html.js":
/*!****************************************************!*\
  !*** ../../node_modules/core-js/internals/html.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "../../node_modules/core-js/internals/get-built-in.js");

module.exports = getBuiltIn('document', 'documentElement');


/***/ }),

/***/ "../../node_modules/core-js/internals/ie8-dom-define.js":
/*!**************************************************************!*\
  !*** ../../node_modules/core-js/internals/ie8-dom-define.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../node_modules/core-js/internals/descriptors.js");
var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");
var createElement = __webpack_require__(/*! ../internals/document-create-element */ "../../node_modules/core-js/internals/document-create-element.js");

// Thanks to IE8 for its funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a !== 7;
});


/***/ }),

/***/ "../../node_modules/core-js/internals/indexed-object.js":
/*!**************************************************************!*\
  !*** ../../node_modules/core-js/internals/indexed-object.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "../../node_modules/core-js/internals/function-uncurry-this.js");
var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");
var classof = __webpack_require__(/*! ../internals/classof-raw */ "../../node_modules/core-js/internals/classof-raw.js");

var $Object = Object;
var split = uncurryThis(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !$Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) === 'String' ? split(it, '') : $Object(it);
} : $Object;


/***/ }),

/***/ "../../node_modules/core-js/internals/inspect-source.js":
/*!**************************************************************!*\
  !*** ../../node_modules/core-js/internals/inspect-source.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "../../node_modules/core-js/internals/function-uncurry-this.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "../../node_modules/core-js/internals/is-callable.js");
var store = __webpack_require__(/*! ../internals/shared-store */ "../../node_modules/core-js/internals/shared-store.js");

var functionToString = uncurryThis(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable(store.inspectSource)) {
  store.inspectSource = function (it) {
    return functionToString(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ "../../node_modules/core-js/internals/internal-state.js":
/*!**************************************************************!*\
  !*** ../../node_modules/core-js/internals/internal-state.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var NATIVE_WEAK_MAP = __webpack_require__(/*! ../internals/weak-map-basic-detection */ "../../node_modules/core-js/internals/weak-map-basic-detection.js");
var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "../../node_modules/core-js/internals/is-object.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "../../node_modules/core-js/internals/create-non-enumerable-property.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "../../node_modules/core-js/internals/has-own-property.js");
var shared = __webpack_require__(/*! ../internals/shared-store */ "../../node_modules/core-js/internals/shared-store.js");
var sharedKey = __webpack_require__(/*! ../internals/shared-key */ "../../node_modules/core-js/internals/shared-key.js");
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "../../node_modules/core-js/internals/hidden-keys.js");

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError = global.TypeError;
var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  /* eslint-disable no-self-assign -- prototype methods protection */
  store.get = store.get;
  store.has = store.has;
  store.set = store.set;
  /* eslint-enable no-self-assign -- prototype methods protection */
  set = function (it, metadata) {
    if (store.has(it)) throw TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    store.set(it, metadata);
    return metadata;
  };
  get = function (it) {
    return store.get(it) || {};
  };
  has = function (it) {
    return store.has(it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    if (hasOwn(it, STATE)) throw TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ "../../node_modules/core-js/internals/is-callable.js":
/*!***********************************************************!*\
  !*** ../../node_modules/core-js/internals/is-callable.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var $documentAll = __webpack_require__(/*! ../internals/document-all */ "../../node_modules/core-js/internals/document-all.js");

var documentAll = $documentAll.all;

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
module.exports = $documentAll.IS_HTMLDDA ? function (argument) {
  return typeof argument == 'function' || argument === documentAll;
} : function (argument) {
  return typeof argument == 'function';
};


/***/ }),

/***/ "../../node_modules/core-js/internals/is-forced.js":
/*!*********************************************************!*\
  !*** ../../node_modules/core-js/internals/is-forced.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "../../node_modules/core-js/internals/is-callable.js");

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value === POLYFILL ? true
    : value === NATIVE ? false
    : isCallable(detection) ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ "../../node_modules/core-js/internals/is-null-or-undefined.js":
/*!********************************************************************!*\
  !*** ../../node_modules/core-js/internals/is-null-or-undefined.js ***!
  \********************************************************************/
/***/ ((module) => {


// we can't use just `it == null` since of `document.all` special case
// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
module.exports = function (it) {
  return it === null || it === undefined;
};


/***/ }),

/***/ "../../node_modules/core-js/internals/is-object.js":
/*!*********************************************************!*\
  !*** ../../node_modules/core-js/internals/is-object.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var isCallable = __webpack_require__(/*! ../internals/is-callable */ "../../node_modules/core-js/internals/is-callable.js");
var $documentAll = __webpack_require__(/*! ../internals/document-all */ "../../node_modules/core-js/internals/document-all.js");

var documentAll = $documentAll.all;

module.exports = $documentAll.IS_HTMLDDA ? function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it) || it === documentAll;
} : function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it);
};


/***/ }),

/***/ "../../node_modules/core-js/internals/is-pure.js":
/*!*******************************************************!*\
  !*** ../../node_modules/core-js/internals/is-pure.js ***!
  \*******************************************************/
/***/ ((module) => {


module.exports = false;


/***/ }),

/***/ "../../node_modules/core-js/internals/is-symbol.js":
/*!*********************************************************!*\
  !*** ../../node_modules/core-js/internals/is-symbol.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "../../node_modules/core-js/internals/get-built-in.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "../../node_modules/core-js/internals/is-callable.js");
var isPrototypeOf = __webpack_require__(/*! ../internals/object-is-prototype-of */ "../../node_modules/core-js/internals/object-is-prototype-of.js");
var USE_SYMBOL_AS_UID = __webpack_require__(/*! ../internals/use-symbol-as-uid */ "../../node_modules/core-js/internals/use-symbol-as-uid.js");

var $Object = Object;

module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
};


/***/ }),

/***/ "../../node_modules/core-js/internals/iterator-create-constructor.js":
/*!***************************************************************************!*\
  !*** ../../node_modules/core-js/internals/iterator-create-constructor.js ***!
  \***************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var IteratorPrototype = (__webpack_require__(/*! ../internals/iterators-core */ "../../node_modules/core-js/internals/iterators-core.js").IteratorPrototype);
var create = __webpack_require__(/*! ../internals/object-create */ "../../node_modules/core-js/internals/object-create.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "../../node_modules/core-js/internals/create-property-descriptor.js");
var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "../../node_modules/core-js/internals/set-to-string-tag.js");
var Iterators = __webpack_require__(/*! ../internals/iterators */ "../../node_modules/core-js/internals/iterators.js");

var returnThis = function () { return this; };

module.exports = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(+!ENUMERABLE_NEXT, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  Iterators[TO_STRING_TAG] = returnThis;
  return IteratorConstructor;
};


/***/ }),

/***/ "../../node_modules/core-js/internals/iterator-define.js":
/*!***************************************************************!*\
  !*** ../../node_modules/core-js/internals/iterator-define.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");
var call = __webpack_require__(/*! ../internals/function-call */ "../../node_modules/core-js/internals/function-call.js");
var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "../../node_modules/core-js/internals/is-pure.js");
var FunctionName = __webpack_require__(/*! ../internals/function-name */ "../../node_modules/core-js/internals/function-name.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "../../node_modules/core-js/internals/is-callable.js");
var createIteratorConstructor = __webpack_require__(/*! ../internals/iterator-create-constructor */ "../../node_modules/core-js/internals/iterator-create-constructor.js");
var getPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ "../../node_modules/core-js/internals/object-get-prototype-of.js");
var setPrototypeOf = __webpack_require__(/*! ../internals/object-set-prototype-of */ "../../node_modules/core-js/internals/object-set-prototype-of.js");
var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "../../node_modules/core-js/internals/set-to-string-tag.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "../../node_modules/core-js/internals/create-non-enumerable-property.js");
var defineBuiltIn = __webpack_require__(/*! ../internals/define-built-in */ "../../node_modules/core-js/internals/define-built-in.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");
var Iterators = __webpack_require__(/*! ../internals/iterators */ "../../node_modules/core-js/internals/iterators.js");
var IteratorsCore = __webpack_require__(/*! ../internals/iterators-core */ "../../node_modules/core-js/internals/iterators-core.js");

var PROPER_FUNCTION_NAME = FunctionName.PROPER;
var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME === 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf) {
          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (!isCallable(CurrentIteratorPrototype[ITERATOR])) {
          defineBuiltIn(CurrentIteratorPrototype, ITERATOR, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
    }
  }

  // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
  if (PROPER_FUNCTION_NAME && DEFAULT === VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    if (!IS_PURE && CONFIGURABLE_FUNCTION_NAME) {
      createNonEnumerableProperty(IterablePrototype, 'name', VALUES);
    } else {
      INCORRECT_VALUES_NAME = true;
      defaultIterator = function values() { return call(nativeIterator, this); };
    }
  }

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        defineBuiltIn(IterablePrototype, KEY, methods[KEY]);
      }
    } else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  // define iterator
  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
    defineBuiltIn(IterablePrototype, ITERATOR, defaultIterator, { name: DEFAULT });
  }
  Iterators[NAME] = defaultIterator;

  return methods;
};


/***/ }),

/***/ "../../node_modules/core-js/internals/iterators-core.js":
/*!**************************************************************!*\
  !*** ../../node_modules/core-js/internals/iterators-core.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "../../node_modules/core-js/internals/is-callable.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "../../node_modules/core-js/internals/is-object.js");
var create = __webpack_require__(/*! ../internals/object-create */ "../../node_modules/core-js/internals/object-create.js");
var getPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ "../../node_modules/core-js/internals/object-get-prototype-of.js");
var defineBuiltIn = __webpack_require__(/*! ../internals/define-built-in */ "../../node_modules/core-js/internals/define-built-in.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");
var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "../../node_modules/core-js/internals/is-pure.js");

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

// `%IteratorPrototype%` object
// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

/* eslint-disable es/no-array-prototype-keys -- safe */
if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

var NEW_ITERATOR_PROTOTYPE = !isObject(IteratorPrototype) || fails(function () {
  var test = {};
  // FF44- legacy iterators case
  return IteratorPrototype[ITERATOR].call(test) !== test;
});

if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {};
else if (IS_PURE) IteratorPrototype = create(IteratorPrototype);

// `%IteratorPrototype%[@@iterator]()` method
// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
if (!isCallable(IteratorPrototype[ITERATOR])) {
  defineBuiltIn(IteratorPrototype, ITERATOR, function () {
    return this;
  });
}

module.exports = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};


/***/ }),

/***/ "../../node_modules/core-js/internals/iterators.js":
/*!*********************************************************!*\
  !*** ../../node_modules/core-js/internals/iterators.js ***!
  \*********************************************************/
/***/ ((module) => {


module.exports = {};


/***/ }),

/***/ "../../node_modules/core-js/internals/length-of-array-like.js":
/*!********************************************************************!*\
  !*** ../../node_modules/core-js/internals/length-of-array-like.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var toLength = __webpack_require__(/*! ../internals/to-length */ "../../node_modules/core-js/internals/to-length.js");

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
module.exports = function (obj) {
  return toLength(obj.length);
};


/***/ }),

/***/ "../../node_modules/core-js/internals/make-built-in.js":
/*!*************************************************************!*\
  !*** ../../node_modules/core-js/internals/make-built-in.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "../../node_modules/core-js/internals/function-uncurry-this.js");
var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "../../node_modules/core-js/internals/is-callable.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "../../node_modules/core-js/internals/has-own-property.js");
var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../node_modules/core-js/internals/descriptors.js");
var CONFIGURABLE_FUNCTION_NAME = (__webpack_require__(/*! ../internals/function-name */ "../../node_modules/core-js/internals/function-name.js").CONFIGURABLE);
var inspectSource = __webpack_require__(/*! ../internals/inspect-source */ "../../node_modules/core-js/internals/inspect-source.js");
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "../../node_modules/core-js/internals/internal-state.js");

var enforceInternalState = InternalStateModule.enforce;
var getInternalState = InternalStateModule.get;
var $String = String;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;
var stringSlice = uncurryThis(''.slice);
var replace = uncurryThis(''.replace);
var join = uncurryThis([].join);

var CONFIGURABLE_LENGTH = DESCRIPTORS && !fails(function () {
  return defineProperty(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
});

var TEMPLATE = String(String).split('String');

var makeBuiltIn = module.exports = function (value, name, options) {
  if (stringSlice($String(name), 0, 7) === 'Symbol(') {
    name = '[' + replace($String(name), /^Symbol\(([^)]*)\)/, '$1') + ']';
  }
  if (options && options.getter) name = 'get ' + name;
  if (options && options.setter) name = 'set ' + name;
  if (!hasOwn(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
    if (DESCRIPTORS) defineProperty(value, 'name', { value: name, configurable: true });
    else value.name = name;
  }
  if (CONFIGURABLE_LENGTH && options && hasOwn(options, 'arity') && value.length !== options.arity) {
    defineProperty(value, 'length', { value: options.arity });
  }
  try {
    if (options && hasOwn(options, 'constructor') && options.constructor) {
      if (DESCRIPTORS) defineProperty(value, 'prototype', { writable: false });
    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
    } else if (value.prototype) value.prototype = undefined;
  } catch (error) { /* empty */ }
  var state = enforceInternalState(value);
  if (!hasOwn(state, 'source')) {
    state.source = join(TEMPLATE, typeof name == 'string' ? name : '');
  } return value;
};

// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
// eslint-disable-next-line no-extend-native -- required
Function.prototype.toString = makeBuiltIn(function toString() {
  return isCallable(this) && getInternalState(this).source || inspectSource(this);
}, 'toString');


/***/ }),

/***/ "../../node_modules/core-js/internals/math-trunc.js":
/*!**********************************************************!*\
  !*** ../../node_modules/core-js/internals/math-trunc.js ***!
  \**********************************************************/
/***/ ((module) => {


var ceil = Math.ceil;
var floor = Math.floor;

// `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
// eslint-disable-next-line es/no-math-trunc -- safe
module.exports = Math.trunc || function trunc(x) {
  var n = +x;
  return (n > 0 ? floor : ceil)(n);
};


/***/ }),

/***/ "../../node_modules/core-js/internals/object-create.js":
/*!*************************************************************!*\
  !*** ../../node_modules/core-js/internals/object-create.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


/* global ActiveXObject -- old IE, WSH */
var anObject = __webpack_require__(/*! ../internals/an-object */ "../../node_modules/core-js/internals/an-object.js");
var definePropertiesModule = __webpack_require__(/*! ../internals/object-define-properties */ "../../node_modules/core-js/internals/object-define-properties.js");
var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "../../node_modules/core-js/internals/enum-bug-keys.js");
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "../../node_modules/core-js/internals/hidden-keys.js");
var html = __webpack_require__(/*! ../internals/html */ "../../node_modules/core-js/internals/html.js");
var documentCreateElement = __webpack_require__(/*! ../internals/document-create-element */ "../../node_modules/core-js/internals/document-create-element.js");
var sharedKey = __webpack_require__(/*! ../internals/shared-key */ "../../node_modules/core-js/internals/shared-key.js");

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    activeXDocument = new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = typeof document != 'undefined'
    ? document.domain && activeXDocument
      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
      : NullProtoObjectViaIFrame()
    : NullProtoObjectViaActiveX(activeXDocument); // WSH
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
// eslint-disable-next-line es/no-object-create -- safe
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
};


/***/ }),

/***/ "../../node_modules/core-js/internals/object-define-properties.js":
/*!************************************************************************!*\
  !*** ../../node_modules/core-js/internals/object-define-properties.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../node_modules/core-js/internals/descriptors.js");
var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(/*! ../internals/v8-prototype-define-bug */ "../../node_modules/core-js/internals/v8-prototype-define-bug.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "../../node_modules/core-js/internals/object-define-property.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "../../node_modules/core-js/internals/an-object.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "../../node_modules/core-js/internals/to-indexed-object.js");
var objectKeys = __webpack_require__(/*! ../internals/object-keys */ "../../node_modules/core-js/internals/object-keys.js");

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe
exports.f = DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var props = toIndexedObject(Properties);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], props[key]);
  return O;
};


/***/ }),

/***/ "../../node_modules/core-js/internals/object-define-property.js":
/*!**********************************************************************!*\
  !*** ../../node_modules/core-js/internals/object-define-property.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../node_modules/core-js/internals/descriptors.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ "../../node_modules/core-js/internals/ie8-dom-define.js");
var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(/*! ../internals/v8-prototype-define-bug */ "../../node_modules/core-js/internals/v8-prototype-define-bug.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "../../node_modules/core-js/internals/an-object.js");
var toPropertyKey = __webpack_require__(/*! ../internals/to-property-key */ "../../node_modules/core-js/internals/to-property-key.js");

var $TypeError = TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE = 'configurable';
var WRITABLE = 'writable';

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);
    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  } return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw $TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "../../node_modules/core-js/internals/object-get-own-property-descriptor.js":
/*!**********************************************************************************!*\
  !*** ../../node_modules/core-js/internals/object-get-own-property-descriptor.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../node_modules/core-js/internals/descriptors.js");
var call = __webpack_require__(/*! ../internals/function-call */ "../../node_modules/core-js/internals/function-call.js");
var propertyIsEnumerableModule = __webpack_require__(/*! ../internals/object-property-is-enumerable */ "../../node_modules/core-js/internals/object-property-is-enumerable.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "../../node_modules/core-js/internals/create-property-descriptor.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "../../node_modules/core-js/internals/to-indexed-object.js");
var toPropertyKey = __webpack_require__(/*! ../internals/to-property-key */ "../../node_modules/core-js/internals/to-property-key.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "../../node_modules/core-js/internals/has-own-property.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ "../../node_modules/core-js/internals/ie8-dom-define.js");

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};


/***/ }),

/***/ "../../node_modules/core-js/internals/object-get-own-property-names.js":
/*!*****************************************************************************!*\
  !*** ../../node_modules/core-js/internals/object-get-own-property-names.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var internalObjectKeys = __webpack_require__(/*! ../internals/object-keys-internal */ "../../node_modules/core-js/internals/object-keys-internal.js");
var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "../../node_modules/core-js/internals/enum-bug-keys.js");

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ "../../node_modules/core-js/internals/object-get-own-property-symbols.js":
/*!*******************************************************************************!*\
  !*** ../../node_modules/core-js/internals/object-get-own-property-symbols.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "../../node_modules/core-js/internals/object-get-prototype-of.js":
/*!***********************************************************************!*\
  !*** ../../node_modules/core-js/internals/object-get-prototype-of.js ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "../../node_modules/core-js/internals/has-own-property.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "../../node_modules/core-js/internals/is-callable.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "../../node_modules/core-js/internals/to-object.js");
var sharedKey = __webpack_require__(/*! ../internals/shared-key */ "../../node_modules/core-js/internals/shared-key.js");
var CORRECT_PROTOTYPE_GETTER = __webpack_require__(/*! ../internals/correct-prototype-getter */ "../../node_modules/core-js/internals/correct-prototype-getter.js");

var IE_PROTO = sharedKey('IE_PROTO');
var $Object = Object;
var ObjectPrototype = $Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
// eslint-disable-next-line es/no-object-getprototypeof -- safe
module.exports = CORRECT_PROTOTYPE_GETTER ? $Object.getPrototypeOf : function (O) {
  var object = toObject(O);
  if (hasOwn(object, IE_PROTO)) return object[IE_PROTO];
  var constructor = object.constructor;
  if (isCallable(constructor) && object instanceof constructor) {
    return constructor.prototype;
  } return object instanceof $Object ? ObjectPrototype : null;
};


/***/ }),

/***/ "../../node_modules/core-js/internals/object-is-prototype-of.js":
/*!**********************************************************************!*\
  !*** ../../node_modules/core-js/internals/object-is-prototype-of.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "../../node_modules/core-js/internals/function-uncurry-this.js");

module.exports = uncurryThis({}.isPrototypeOf);


/***/ }),

/***/ "../../node_modules/core-js/internals/object-keys-internal.js":
/*!********************************************************************!*\
  !*** ../../node_modules/core-js/internals/object-keys-internal.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "../../node_modules/core-js/internals/function-uncurry-this.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "../../node_modules/core-js/internals/has-own-property.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "../../node_modules/core-js/internals/to-indexed-object.js");
var indexOf = (__webpack_require__(/*! ../internals/array-includes */ "../../node_modules/core-js/internals/array-includes.js").indexOf);
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "../../node_modules/core-js/internals/hidden-keys.js");

var push = uncurryThis([].push);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn(O, key = names[i++])) {
    ~indexOf(result, key) || push(result, key);
  }
  return result;
};


/***/ }),

/***/ "../../node_modules/core-js/internals/object-keys.js":
/*!***********************************************************!*\
  !*** ../../node_modules/core-js/internals/object-keys.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var internalObjectKeys = __webpack_require__(/*! ../internals/object-keys-internal */ "../../node_modules/core-js/internals/object-keys-internal.js");
var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "../../node_modules/core-js/internals/enum-bug-keys.js");

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),

/***/ "../../node_modules/core-js/internals/object-property-is-enumerable.js":
/*!*****************************************************************************!*\
  !*** ../../node_modules/core-js/internals/object-property-is-enumerable.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;


/***/ }),

/***/ "../../node_modules/core-js/internals/object-set-prototype-of.js":
/*!***********************************************************************!*\
  !*** ../../node_modules/core-js/internals/object-set-prototype-of.js ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


/* eslint-disable no-proto -- safe */
var uncurryThisAccessor = __webpack_require__(/*! ../internals/function-uncurry-this-accessor */ "../../node_modules/core-js/internals/function-uncurry-this-accessor.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "../../node_modules/core-js/internals/an-object.js");
var aPossiblePrototype = __webpack_require__(/*! ../internals/a-possible-prototype */ "../../node_modules/core-js/internals/a-possible-prototype.js");

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es/no-object-setprototypeof -- safe
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    setter = uncurryThisAccessor(Object.prototype, '__proto__', 'set');
    setter(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);


/***/ }),

/***/ "../../node_modules/core-js/internals/ordinary-to-primitive.js":
/*!*********************************************************************!*\
  !*** ../../node_modules/core-js/internals/ordinary-to-primitive.js ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var call = __webpack_require__(/*! ../internals/function-call */ "../../node_modules/core-js/internals/function-call.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "../../node_modules/core-js/internals/is-callable.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "../../node_modules/core-js/internals/is-object.js");

var $TypeError = TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  throw $TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "../../node_modules/core-js/internals/own-keys.js":
/*!********************************************************!*\
  !*** ../../node_modules/core-js/internals/own-keys.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "../../node_modules/core-js/internals/get-built-in.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "../../node_modules/core-js/internals/function-uncurry-this.js");
var getOwnPropertyNamesModule = __webpack_require__(/*! ../internals/object-get-own-property-names */ "../../node_modules/core-js/internals/object-get-own-property-names.js");
var getOwnPropertySymbolsModule = __webpack_require__(/*! ../internals/object-get-own-property-symbols */ "../../node_modules/core-js/internals/object-get-own-property-symbols.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "../../node_modules/core-js/internals/an-object.js");

var concat = uncurryThis([].concat);

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ "../../node_modules/core-js/internals/regexp-exec-abstract.js":
/*!********************************************************************!*\
  !*** ../../node_modules/core-js/internals/regexp-exec-abstract.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var call = __webpack_require__(/*! ../internals/function-call */ "../../node_modules/core-js/internals/function-call.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "../../node_modules/core-js/internals/an-object.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "../../node_modules/core-js/internals/is-callable.js");
var classof = __webpack_require__(/*! ../internals/classof-raw */ "../../node_modules/core-js/internals/classof-raw.js");
var regexpExec = __webpack_require__(/*! ../internals/regexp-exec */ "../../node_modules/core-js/internals/regexp-exec.js");

var $TypeError = TypeError;

// `RegExpExec` abstract operation
// https://tc39.es/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (isCallable(exec)) {
    var result = call(exec, R, S);
    if (result !== null) anObject(result);
    return result;
  }
  if (classof(R) === 'RegExp') return call(regexpExec, R, S);
  throw $TypeError('RegExp#exec called on incompatible receiver');
};


/***/ }),

/***/ "../../node_modules/core-js/internals/regexp-exec.js":
/*!***********************************************************!*\
  !*** ../../node_modules/core-js/internals/regexp-exec.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


/* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
/* eslint-disable regexp/no-useless-quantifier -- testing */
var call = __webpack_require__(/*! ../internals/function-call */ "../../node_modules/core-js/internals/function-call.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "../../node_modules/core-js/internals/function-uncurry-this.js");
var toString = __webpack_require__(/*! ../internals/to-string */ "../../node_modules/core-js/internals/to-string.js");
var regexpFlags = __webpack_require__(/*! ../internals/regexp-flags */ "../../node_modules/core-js/internals/regexp-flags.js");
var stickyHelpers = __webpack_require__(/*! ../internals/regexp-sticky-helpers */ "../../node_modules/core-js/internals/regexp-sticky-helpers.js");
var shared = __webpack_require__(/*! ../internals/shared */ "../../node_modules/core-js/internals/shared.js");
var create = __webpack_require__(/*! ../internals/object-create */ "../../node_modules/core-js/internals/object-create.js");
var getInternalState = (__webpack_require__(/*! ../internals/internal-state */ "../../node_modules/core-js/internals/internal-state.js").get);
var UNSUPPORTED_DOT_ALL = __webpack_require__(/*! ../internals/regexp-unsupported-dot-all */ "../../node_modules/core-js/internals/regexp-unsupported-dot-all.js");
var UNSUPPORTED_NCG = __webpack_require__(/*! ../internals/regexp-unsupported-ncg */ "../../node_modules/core-js/internals/regexp-unsupported-ncg.js");

var nativeReplace = shared('native-string-replace', String.prototype.replace);
var nativeExec = RegExp.prototype.exec;
var patchedExec = nativeExec;
var charAt = uncurryThis(''.charAt);
var indexOf = uncurryThis(''.indexOf);
var replace = uncurryThis(''.replace);
var stringSlice = uncurryThis(''.slice);

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  call(nativeExec, re1, 'a');
  call(nativeExec, re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y = stickyHelpers.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;

if (PATCH) {
  patchedExec = function exec(string) {
    var re = this;
    var state = getInternalState(re);
    var str = toString(string);
    var raw = state.raw;
    var result, reCopy, lastIndex, match, i, object, group;

    if (raw) {
      raw.lastIndex = re.lastIndex;
      result = call(patchedExec, raw, str);
      re.lastIndex = raw.lastIndex;
      return result;
    }

    var groups = state.groups;
    var sticky = UNSUPPORTED_Y && re.sticky;
    var flags = call(regexpFlags, re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = replace(flags, 'y', '');
      if (indexOf(flags, 'g') === -1) {
        flags += 'g';
      }

      strCopy = stringSlice(str, re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt(str, re.lastIndex - 1) !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      }
      // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.
      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = call(nativeExec, sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = stringSlice(match.input, charsAdded);
        match[0] = stringSlice(match[0], charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn't work for /(.?)?/
      call(nativeReplace, match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    if (match && groups) {
      match.groups = object = create(null);
      for (i = 0; i < groups.length; i++) {
        group = groups[i];
        object[group[0]] = match[group[1]];
      }
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),

/***/ "../../node_modules/core-js/internals/regexp-flags.js":
/*!************************************************************!*\
  !*** ../../node_modules/core-js/internals/regexp-flags.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var anObject = __webpack_require__(/*! ../internals/an-object */ "../../node_modules/core-js/internals/an-object.js");

// `RegExp.prototype.flags` getter implementation
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.hasIndices) result += 'd';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.unicodeSets) result += 'v';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ "../../node_modules/core-js/internals/regexp-sticky-helpers.js":
/*!*********************************************************************!*\
  !*** ../../node_modules/core-js/internals/regexp-sticky-helpers.js ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");
var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");

// babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
var $RegExp = global.RegExp;

var UNSUPPORTED_Y = fails(function () {
  var re = $RegExp('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') !== null;
});

// UC Browser bug
// https://github.com/zloirock/core-js/issues/1008
var MISSED_STICKY = UNSUPPORTED_Y || fails(function () {
  return !$RegExp('a', 'y').sticky;
});

var BROKEN_CARET = UNSUPPORTED_Y || fails(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = $RegExp('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') !== null;
});

module.exports = {
  BROKEN_CARET: BROKEN_CARET,
  MISSED_STICKY: MISSED_STICKY,
  UNSUPPORTED_Y: UNSUPPORTED_Y
};


/***/ }),

/***/ "../../node_modules/core-js/internals/regexp-unsupported-dot-all.js":
/*!**************************************************************************!*\
  !*** ../../node_modules/core-js/internals/regexp-unsupported-dot-all.js ***!
  \**************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");
var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");

// babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
var $RegExp = global.RegExp;

module.exports = fails(function () {
  var re = $RegExp('.', 's');
  return !(re.dotAll && re.exec('\n') && re.flags === 's');
});


/***/ }),

/***/ "../../node_modules/core-js/internals/regexp-unsupported-ncg.js":
/*!**********************************************************************!*\
  !*** ../../node_modules/core-js/internals/regexp-unsupported-ncg.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");
var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");

// babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
var $RegExp = global.RegExp;

module.exports = fails(function () {
  var re = $RegExp('(?<a>b)', 'g');
  return re.exec('b').groups.a !== 'b' ||
    'b'.replace(re, '$<a>c') !== 'bc';
});


/***/ }),

/***/ "../../node_modules/core-js/internals/require-object-coercible.js":
/*!************************************************************************!*\
  !*** ../../node_modules/core-js/internals/require-object-coercible.js ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var isNullOrUndefined = __webpack_require__(/*! ../internals/is-null-or-undefined */ "../../node_modules/core-js/internals/is-null-or-undefined.js");

var $TypeError = TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (isNullOrUndefined(it)) throw $TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ "../../node_modules/core-js/internals/set-to-string-tag.js":
/*!*****************************************************************!*\
  !*** ../../node_modules/core-js/internals/set-to-string-tag.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var defineProperty = (__webpack_require__(/*! ../internals/object-define-property */ "../../node_modules/core-js/internals/object-define-property.js").f);
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "../../node_modules/core-js/internals/has-own-property.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

module.exports = function (target, TAG, STATIC) {
  if (target && !STATIC) target = target.prototype;
  if (target && !hasOwn(target, TO_STRING_TAG)) {
    defineProperty(target, TO_STRING_TAG, { configurable: true, value: TAG });
  }
};


/***/ }),

/***/ "../../node_modules/core-js/internals/shared-key.js":
/*!**********************************************************!*\
  !*** ../../node_modules/core-js/internals/shared-key.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var shared = __webpack_require__(/*! ../internals/shared */ "../../node_modules/core-js/internals/shared.js");
var uid = __webpack_require__(/*! ../internals/uid */ "../../node_modules/core-js/internals/uid.js");

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ "../../node_modules/core-js/internals/shared-store.js":
/*!************************************************************!*\
  !*** ../../node_modules/core-js/internals/shared-store.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");
var defineGlobalProperty = __webpack_require__(/*! ../internals/define-global-property */ "../../node_modules/core-js/internals/define-global-property.js");

var SHARED = '__core-js_shared__';
var store = global[SHARED] || defineGlobalProperty(SHARED, {});

module.exports = store;


/***/ }),

/***/ "../../node_modules/core-js/internals/shared.js":
/*!******************************************************!*\
  !*** ../../node_modules/core-js/internals/shared.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "../../node_modules/core-js/internals/is-pure.js");
var store = __webpack_require__(/*! ../internals/shared-store */ "../../node_modules/core-js/internals/shared-store.js");

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.32.1',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2014-2023 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.32.1/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});


/***/ }),

/***/ "../../node_modules/core-js/internals/string-multibyte.js":
/*!****************************************************************!*\
  !*** ../../node_modules/core-js/internals/string-multibyte.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "../../node_modules/core-js/internals/function-uncurry-this.js");
var toIntegerOrInfinity = __webpack_require__(/*! ../internals/to-integer-or-infinity */ "../../node_modules/core-js/internals/to-integer-or-infinity.js");
var toString = __webpack_require__(/*! ../internals/to-string */ "../../node_modules/core-js/internals/to-string.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "../../node_modules/core-js/internals/require-object-coercible.js");

var charAt = uncurryThis(''.charAt);
var charCodeAt = uncurryThis(''.charCodeAt);
var stringSlice = uncurryThis(''.slice);

var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = toString(requireObjectCoercible($this));
    var position = toIntegerOrInfinity(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = charCodeAt(S, position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = charCodeAt(S, position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING
          ? charAt(S, position)
          : first
        : CONVERT_TO_STRING
          ? stringSlice(S, position, position + 2)
          : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

module.exports = {
  // `String.prototype.codePointAt` method
  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};


/***/ }),

/***/ "../../node_modules/core-js/internals/symbol-constructor-detection.js":
/*!****************************************************************************!*\
  !*** ../../node_modules/core-js/internals/symbol-constructor-detection.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__(/*! ../internals/engine-v8-version */ "../../node_modules/core-js/internals/engine-v8-version.js");
var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");
var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");

var $String = global.String;

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol('symbol detection');
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
  // of course, fail.
  return !$String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});


/***/ }),

/***/ "../../node_modules/core-js/internals/to-absolute-index.js":
/*!*****************************************************************!*\
  !*** ../../node_modules/core-js/internals/to-absolute-index.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var toIntegerOrInfinity = __webpack_require__(/*! ../internals/to-integer-or-infinity */ "../../node_modules/core-js/internals/to-integer-or-infinity.js");

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toIntegerOrInfinity(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ "../../node_modules/core-js/internals/to-indexed-object.js":
/*!*****************************************************************!*\
  !*** ../../node_modules/core-js/internals/to-indexed-object.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ "../../node_modules/core-js/internals/indexed-object.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "../../node_modules/core-js/internals/require-object-coercible.js");

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ "../../node_modules/core-js/internals/to-integer-or-infinity.js":
/*!**********************************************************************!*\
  !*** ../../node_modules/core-js/internals/to-integer-or-infinity.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var trunc = __webpack_require__(/*! ../internals/math-trunc */ "../../node_modules/core-js/internals/math-trunc.js");

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
module.exports = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- NaN check
  return number !== number || number === 0 ? 0 : trunc(number);
};


/***/ }),

/***/ "../../node_modules/core-js/internals/to-length.js":
/*!*********************************************************!*\
  !*** ../../node_modules/core-js/internals/to-length.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var toIntegerOrInfinity = __webpack_require__(/*! ../internals/to-integer-or-infinity */ "../../node_modules/core-js/internals/to-integer-or-infinity.js");

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ "../../node_modules/core-js/internals/to-object.js":
/*!*********************************************************!*\
  !*** ../../node_modules/core-js/internals/to-object.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "../../node_modules/core-js/internals/require-object-coercible.js");

var $Object = Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return $Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ "../../node_modules/core-js/internals/to-primitive.js":
/*!************************************************************!*\
  !*** ../../node_modules/core-js/internals/to-primitive.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var call = __webpack_require__(/*! ../internals/function-call */ "../../node_modules/core-js/internals/function-call.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "../../node_modules/core-js/internals/is-object.js");
var isSymbol = __webpack_require__(/*! ../internals/is-symbol */ "../../node_modules/core-js/internals/is-symbol.js");
var getMethod = __webpack_require__(/*! ../internals/get-method */ "../../node_modules/core-js/internals/get-method.js");
var ordinaryToPrimitive = __webpack_require__(/*! ../internals/ordinary-to-primitive */ "../../node_modules/core-js/internals/ordinary-to-primitive.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");

var $TypeError = TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call(exoticToPrim, input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw $TypeError("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};


/***/ }),

/***/ "../../node_modules/core-js/internals/to-property-key.js":
/*!***************************************************************!*\
  !*** ../../node_modules/core-js/internals/to-property-key.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "../../node_modules/core-js/internals/to-primitive.js");
var isSymbol = __webpack_require__(/*! ../internals/is-symbol */ "../../node_modules/core-js/internals/is-symbol.js");

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};


/***/ }),

/***/ "../../node_modules/core-js/internals/to-string-tag-support.js":
/*!*********************************************************************!*\
  !*** ../../node_modules/core-js/internals/to-string-tag-support.js ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';


/***/ }),

/***/ "../../node_modules/core-js/internals/to-string.js":
/*!*********************************************************!*\
  !*** ../../node_modules/core-js/internals/to-string.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var classof = __webpack_require__(/*! ../internals/classof */ "../../node_modules/core-js/internals/classof.js");

var $String = String;

module.exports = function (argument) {
  if (classof(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
  return $String(argument);
};


/***/ }),

/***/ "../../node_modules/core-js/internals/try-to-string.js":
/*!*************************************************************!*\
  !*** ../../node_modules/core-js/internals/try-to-string.js ***!
  \*************************************************************/
/***/ ((module) => {


var $String = String;

module.exports = function (argument) {
  try {
    return $String(argument);
  } catch (error) {
    return 'Object';
  }
};


/***/ }),

/***/ "../../node_modules/core-js/internals/uid.js":
/*!***************************************************!*\
  !*** ../../node_modules/core-js/internals/uid.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "../../node_modules/core-js/internals/function-uncurry-this.js");

var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.0.toString);

module.exports = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};


/***/ }),

/***/ "../../node_modules/core-js/internals/use-symbol-as-uid.js":
/*!*****************************************************************!*\
  !*** ../../node_modules/core-js/internals/use-symbol-as-uid.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__(/*! ../internals/symbol-constructor-detection */ "../../node_modules/core-js/internals/symbol-constructor-detection.js");

module.exports = NATIVE_SYMBOL
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';


/***/ }),

/***/ "../../node_modules/core-js/internals/v8-prototype-define-bug.js":
/*!***********************************************************************!*\
  !*** ../../node_modules/core-js/internals/v8-prototype-define-bug.js ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../node_modules/core-js/internals/descriptors.js");
var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
module.exports = DESCRIPTORS && fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
    value: 42,
    writable: false
  }).prototype !== 42;
});


/***/ }),

/***/ "../../node_modules/core-js/internals/weak-map-basic-detection.js":
/*!************************************************************************!*\
  !*** ../../node_modules/core-js/internals/weak-map-basic-detection.js ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "../../node_modules/core-js/internals/is-callable.js");

var WeakMap = global.WeakMap;

module.exports = isCallable(WeakMap) && /native code/.test(String(WeakMap));


/***/ }),

/***/ "../../node_modules/core-js/internals/well-known-symbol.js":
/*!*****************************************************************!*\
  !*** ../../node_modules/core-js/internals/well-known-symbol.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");
var shared = __webpack_require__(/*! ../internals/shared */ "../../node_modules/core-js/internals/shared.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "../../node_modules/core-js/internals/has-own-property.js");
var uid = __webpack_require__(/*! ../internals/uid */ "../../node_modules/core-js/internals/uid.js");
var NATIVE_SYMBOL = __webpack_require__(/*! ../internals/symbol-constructor-detection */ "../../node_modules/core-js/internals/symbol-constructor-detection.js");
var USE_SYMBOL_AS_UID = __webpack_require__(/*! ../internals/use-symbol-as-uid */ "../../node_modules/core-js/internals/use-symbol-as-uid.js");

var Symbol = global.Symbol;
var WellKnownSymbolsStore = shared('wks');
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol['for'] || Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!hasOwn(WellKnownSymbolsStore, name)) {
    WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn(Symbol, name)
      ? Symbol[name]
      : createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ "../../node_modules/core-js/modules/es.array.iterator.js":
/*!***************************************************************!*\
  !*** ../../node_modules/core-js/modules/es.array.iterator.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "../../node_modules/core-js/internals/to-indexed-object.js");
var addToUnscopables = __webpack_require__(/*! ../internals/add-to-unscopables */ "../../node_modules/core-js/internals/add-to-unscopables.js");
var Iterators = __webpack_require__(/*! ../internals/iterators */ "../../node_modules/core-js/internals/iterators.js");
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "../../node_modules/core-js/internals/internal-state.js");
var defineProperty = (__webpack_require__(/*! ../internals/object-define-property */ "../../node_modules/core-js/internals/object-define-property.js").f);
var defineIterator = __webpack_require__(/*! ../internals/iterator-define */ "../../node_modules/core-js/internals/iterator-define.js");
var createIterResultObject = __webpack_require__(/*! ../internals/create-iter-result-object */ "../../node_modules/core-js/internals/create-iter-result-object.js");
var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "../../node_modules/core-js/internals/is-pure.js");
var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../node_modules/core-js/internals/descriptors.js");

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.es/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.es/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.es/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.es/ecma262/#sec-createarrayiterator
module.exports = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return createIterResultObject(undefined, true);
  }
  switch (kind) {
    case 'keys': return createIterResultObject(index, false);
    case 'values': return createIterResultObject(target[index], false);
  } return createIterResultObject([index, target[index]], false);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
// https://tc39.es/ecma262/#sec-createmappedargumentsobject
var values = Iterators.Arguments = Iterators.Array;

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

// V8 ~ Chrome 45- bug
if (!IS_PURE && DESCRIPTORS && values.name !== 'values') try {
  defineProperty(values, 'name', { value: 'values' });
} catch (error) { /* empty */ }


/***/ }),

/***/ "../../node_modules/core-js/modules/es.regexp.exec.js":
/*!************************************************************!*\
  !*** ../../node_modules/core-js/modules/es.regexp.exec.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");
var exec = __webpack_require__(/*! ../internals/regexp-exec */ "../../node_modules/core-js/internals/regexp-exec.js");

// `RegExp.prototype.exec` method
// https://tc39.es/ecma262/#sec-regexp.prototype.exec
$({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
  exec: exec
});


/***/ }),

/***/ "../../node_modules/core-js/modules/es.string.replace.js":
/*!***************************************************************!*\
  !*** ../../node_modules/core-js/modules/es.string.replace.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


var apply = __webpack_require__(/*! ../internals/function-apply */ "../../node_modules/core-js/internals/function-apply.js");
var call = __webpack_require__(/*! ../internals/function-call */ "../../node_modules/core-js/internals/function-call.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "../../node_modules/core-js/internals/function-uncurry-this.js");
var fixRegExpWellKnownSymbolLogic = __webpack_require__(/*! ../internals/fix-regexp-well-known-symbol-logic */ "../../node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js");
var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "../../node_modules/core-js/internals/an-object.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "../../node_modules/core-js/internals/is-callable.js");
var isNullOrUndefined = __webpack_require__(/*! ../internals/is-null-or-undefined */ "../../node_modules/core-js/internals/is-null-or-undefined.js");
var toIntegerOrInfinity = __webpack_require__(/*! ../internals/to-integer-or-infinity */ "../../node_modules/core-js/internals/to-integer-or-infinity.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "../../node_modules/core-js/internals/to-length.js");
var toString = __webpack_require__(/*! ../internals/to-string */ "../../node_modules/core-js/internals/to-string.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "../../node_modules/core-js/internals/require-object-coercible.js");
var advanceStringIndex = __webpack_require__(/*! ../internals/advance-string-index */ "../../node_modules/core-js/internals/advance-string-index.js");
var getMethod = __webpack_require__(/*! ../internals/get-method */ "../../node_modules/core-js/internals/get-method.js");
var getSubstitution = __webpack_require__(/*! ../internals/get-substitution */ "../../node_modules/core-js/internals/get-substitution.js");
var regExpExec = __webpack_require__(/*! ../internals/regexp-exec-abstract */ "../../node_modules/core-js/internals/regexp-exec-abstract.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");

var REPLACE = wellKnownSymbol('replace');
var max = Math.max;
var min = Math.min;
var concat = uncurryThis([].concat);
var push = uncurryThis([].push);
var stringIndexOf = uncurryThis(''.indexOf);
var stringSlice = uncurryThis(''.slice);

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// IE <= 11 replaces $0 with the whole match, as if it was $&
// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
var REPLACE_KEEPS_$0 = (function () {
  // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
  return 'a'.replace(/./, '$0') === '$0';
})();

// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
  if (/./[REPLACE]) {
    return /./[REPLACE]('a', '$0') === '';
  }
  return false;
})();

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  // eslint-disable-next-line regexp/no-useless-dollar-replacements -- false positive
  return ''.replace(re, '$<a>') !== '7';
});

// @@replace logic
fixRegExpWellKnownSymbolLogic('replace', function (_, nativeReplace, maybeCallNative) {
  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

  return [
    // `String.prototype.replace` method
    // https://tc39.es/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = requireObjectCoercible(this);
      var replacer = isNullOrUndefined(searchValue) ? undefined : getMethod(searchValue, REPLACE);
      return replacer
        ? call(replacer, searchValue, O, replaceValue)
        : call(nativeReplace, toString(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
    function (string, replaceValue) {
      var rx = anObject(this);
      var S = toString(string);

      if (
        typeof replaceValue == 'string' &&
        stringIndexOf(replaceValue, UNSAFE_SUBSTITUTE) === -1 &&
        stringIndexOf(replaceValue, '$<') === -1
      ) {
        var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
        if (res.done) return res.value;
      }

      var functionalReplace = isCallable(replaceValue);
      if (!functionalReplace) replaceValue = toString(replaceValue);

      var global = rx.global;
      var fullUnicode;
      if (global) {
        fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }

      var results = [];
      var result;
      while (true) {
        result = regExpExec(rx, S);
        if (result === null) break;

        push(results, result);
        if (!global) break;

        var matchStr = toString(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }

      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];

        var matched = toString(result[0]);
        var position = max(min(toIntegerOrInfinity(result.index), S.length), 0);
        var captures = [];
        var replacement;
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) push(captures, maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = concat([matched], captures, position, S);
          if (namedCaptures !== undefined) push(replacerArgs, namedCaptures);
          replacement = toString(apply(replaceValue, undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += stringSlice(S, nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }

      return accumulatedResult + stringSlice(S, nextSourcePosition);
    }
  ];
}, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);


/***/ }),

/***/ "../../node_modules/core-js/modules/web.dom-collections.iterator.js":
/*!**************************************************************************!*\
  !*** ../../node_modules/core-js/modules/web.dom-collections.iterator.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");
var DOMIterables = __webpack_require__(/*! ../internals/dom-iterables */ "../../node_modules/core-js/internals/dom-iterables.js");
var DOMTokenListPrototype = __webpack_require__(/*! ../internals/dom-token-list-prototype */ "../../node_modules/core-js/internals/dom-token-list-prototype.js");
var ArrayIteratorMethods = __webpack_require__(/*! ../modules/es.array.iterator */ "../../node_modules/core-js/modules/es.array.iterator.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "../../node_modules/core-js/internals/create-non-enumerable-property.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");

var ITERATOR = wellKnownSymbol('iterator');
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var ArrayValues = ArrayIteratorMethods.values;

var handlePrototype = function (CollectionPrototype, COLLECTION_NAME) {
  if (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype[ITERATOR] !== ArrayValues) try {
      createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
    } catch (error) {
      CollectionPrototype[ITERATOR] = ArrayValues;
    }
    if (!CollectionPrototype[TO_STRING_TAG]) {
      createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
    }
    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
      }
    }
  }
};

for (var COLLECTION_NAME in DOMIterables) {
  handlePrototype(global[COLLECTION_NAME] && global[COLLECTION_NAME].prototype, COLLECTION_NAME);
}

handlePrototype(DOMTokenListPrototype, 'DOMTokenList');


/***/ }),

/***/ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./assets/styles/responsive-styles.scss":
/*!***********************************************************************************************************************************!*\
  !*** ../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./assets/styles/responsive-styles.scss ***!
  \***********************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "../../node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/getUrl.js */ "../../node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/-W_8XJnvUD7dzB2Ck_kIaWMu.woff2 */ "./assets/fonts/-W_8XJnvUD7dzB2Ck_kIaWMu.woff2"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ../images/trefle.webp */ "./assets/images/trefle.webp"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(/*! ../images/cropped-image_2023-08-10_142556159-removebg-preview.webp */ "./assets/images/cropped-image_2023-08-10_142556159-removebg-preview.webp"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_2___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* portrait phones and down */
/* Landscape phone to portrait tablet */
/* Portrait tablet to landscape and desktop */
/* desktop */
/* Large desktop */
:root {
  --background-color-primary: #15171C;
  --background-color-primary-opacity: #15171ccb;
  --text-color-primary: rgba(255, 255, 255, 0.75);
  --input-border-color: #6A6B6D;
  --blue-primary: #4A81F7;
}

.point-bleu-avec-trait {
  /* Style pour le conteneur de point et de trait */
}

.point-bleu-avec-trait .point-et-trait {
  height: fit-content;
  display: flex;
  align-items: center;
  /* Style pour la ligne grise */
  /* Style pour le point bleu */
}

.point-bleu-avec-trait .point-et-trait .trait {
  width: 3rem;
  height: 1px;
  background-color: var(--input-border-color);
  margin-left: 1rem;
}

.point-bleu-avec-trait .point-et-trait .trait-column {
  width: 1px;
  height: 3rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-left: 0;
}

.point-bleu-avec-trait .point-et-trait .point-bleu {
  min-width: 10px;
  min-height: 10px;
  background-color: var(--blue-primary);
  border-radius: 50%;
  margin-left: 1rem;
}

.point-bleu-avec-trait .point-et-trait p {
  font-size: 1.5rem;
  margin-left: 1rem;
}

.point-bleu-avec-trait .column {
  flex-direction: column;
}

.point-bleu-avec-trait .column .point-bleu {
  margin-left: 0;
  margin-top: 1rem;
}

.point-bleu-avec-trait .column > p {
  rotate: -90deg;
  margin-top: 2rem;
  margin-left: auto;
  margin-right: auto;
}

.blue-word {
  color: var(--blue-primary);
  width: min-content;
}

input,
select {
  display: block;
  background-color: var(--background-color-general);
  border: none;
  border-bottom: var(--input-border-color) solid 1px;
  font-size: 15px;
  color: var(--text-color-primary);
  text-align: center;
}

input:focus,
select:focus {
  outline: none;
}

p.submit-button {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--blue-primary);
  border-radius: 15px;
  min-height: 48px;
}

/* thai */
/* latin */
@font-face {
  font-display: swap;
  font-family: "Prompt";
  font-style: normal;
  font-weight: 300;
  src: url(${___CSS_LOADER_URL_REPLACEMENT_0___}) format("woff2");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
:root {
  font-family: "Prompt";
  font-weight: normal;
  cursor: default;
}
:root body {
  margin: 0;
  display: grid;
  background-color: var(--background-color-primary);
}
:root body .blur {
  transition: 0.5s;
  background-color: var(--background-color-primary-opacity);
  filter: blur(10px);
}
:root body.header-menu-open {
  overflow: hidden;
}
:root body header {
  z-index: 1;
  color: white;
  position: fixed;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.76);
  width: 100%;
  max-height: 100vh;
}
:root body header .active {
  color: var(--blue-primary);
}
:root body header a {
  text-decoration: none;
  color: white;
}
:root body header .header-container-1 {
  display: flex;
  max-height: 75px;
}
:root body header .header-container-1 .logo-container img {
  cursor: pointer;
}
:root body header .header-container-1 .menu-container .span-icon {
  cursor: pointer;
}
:root body header .header-container-1 .menu-container .span-icon .bar {
  height: 10px;
  width: 50px;
  background-color: white;
  border-radius: 5px;
}
:root body header .header-container-1 .menu-container .span-icon .bar.milieu {
  margin-top: 8px;
  margin-bottom: 8px;
}
:root body header .header-container-1 .menu-container .span-icon.active * {
  background-color: var(--blue-primary);
}
:root body header .header-container-1 .menu-container .span-icon.active .milieu {
  margin-left: 0.5rem;
}
:root body header .header-container-1 .nous-rejoindre {
  border-top: var(--blue-primary) solid 2px;
  border-left: var(--blue-primary) solid 2px;
  border-bottom: #FF3131 solid 2px;
  border-right: #FF3131 solid 2px;
  border-radius: 5px;
  display: flex;
}
:root body header .header-container-1 .nous-rejoindre span.point {
  background-color: var(--blue-primary);
  border-radius: 50%;
  height: 12px;
  width: 12px;
  margin-right: 10px;
  margin-top: auto;
  margin-bottom: auto;
}
:root body header .header-container-1 .nous-rejoindre:hover {
  transition: 0.2s;
  border: var(--blue-primary) solid 2px;
  color: var(--blue-primary);
}
:root body header .header-container-1 .nous-rejoindre:hover span.point {
  transition: 1.2s;
  background-color: white;
}
:root body header .header-container-1 .nous-rejoindre, :root body header .header-container-1 .nous-rejoindre * {
  cursor: pointer;
}
:root body header.down-scroll {
  position: fixed;
  top: 0px;
  width: 100%;
  transition: top 0.5s ease-out;
  background-color: var(--background-color-primary-opacity);
  backdrop-filter: blur(5px);
}
:root body header.mobil-menu-open {
  overflow: scroll;
}
:root body header.open .header-container-mobil {
  background-color: black;
  border-top: 1px white solid;
  padding: 7.5% 0;
}
:root body header.open .header-container-mobil.sous-menu .sous-menu-mobil .titre-container p {
  display: flex;
  align-items: center;
}
:root body header.open .header-container-mobil.sous-menu .sous-menu-mobil .titre-container .nouveau {
  position: absolute;
  color: white;
  text-shadow: 5px -4px 2px blue;
  opacity: 0.75;
}
:root body header.open .header-container-mobil.sous-menu .sous-menu-mobil .titre-container .green-word {
  color: #01FF01;
  text-shadow: 0px 1px 2px #01FF01;
  opacity: 0.85;
}
:root body header.open .header-container-mobil.sous-menu .sous-menu-mobil .titre-container .span-image {
  background: url(${___CSS_LOADER_URL_REPLACEMENT_1___}) center/contain no-repeat;
  display: block;
}
:root body .content {
  padding: 0 2.5%;
  max-width: 2000px;
  margin-right: auto;
  margin-left: auto;
}
:root body .content h1,
:root body .content h2,
:root body .content h3 {
  color: white;
}
:root body .content p,
:root body .content a {
  text-align: center;
}
:root body .content a,
:root body .content p,
:root body .content li {
  color: var(--text-color-primary);
}
:root body .content ul {
  text-decoration: none;
  padding: 0 0 0 0;
}
:root body .content ul li {
  list-style-type: none;
}
:root body .content ul.with-blue-puce li {
  list-style-type: disc;
}
:root body .content ul.with-blue-puce li::marker {
  color: var(--blue-primary);
}
:root body .content .marqueur {
  height: 10px;
}
:root body footer {
  padding: 1vh 1vh;
}
:root body footer h3 {
  color: white;
}
:root body footer a,
:root body footer p,
:root body footer li {
  color: var(--text-color-primary);
}
:root body footer a {
  text-decoration: none;
}
:root body footer ul {
  list-style-type: none;
  padding-left: 0;
}
:root body footer .footer-container .footer-register h3 {
  text-align: center;
  font-size: 65px;
}
:root body footer .footer-container .footer-register p:not([id=footer-submit]) {
  text-align: center;
}
:root body footer .footer-container .footer-coordonnees {
  display: flex;
  flex-direction: column;
  text-align: center;
}
:root body footer .footer-container .footer-coordonnees span p:first-child {
  color: white;
}
:root body footer .footer-container .footer-coordonnees span p {
  margin: 0 0 0 0;
}
:root body footer .footer-container .footer-services {
  text-align: center;
}
:root body footer .footer-separator {
  height: 2px;
  background-color: var(--text-color-primary);
}
:root body footer .footer-container2 .footer-links {
  text-align: center;
}
:root body footer .footer-container2 .footer-icons {
  display: flex;
}
:root body footer .footer-container2 .footer-icons img {
  cursor: pointer;
  height: 48px;
}
:root body footer .footer-container2 .footer-mention {
  color: white;
  text-align: center;
}

/* Large desktop */
@media (min-width: 1200px) {
  header .header-container-1 {
    height: 100%;
    width: 100%;
    display: flex;
    letter-spacing: 3px;
    justify-content: space-between;
    padding-left: 1%;
  }
  header .header-container-1 img {
    cursor: pointer;
    max-width: 200px;
    transition: transform 0.3s;
  }
  header .header-container-1 img:hover {
    transform: scale(1.05);
  }
  header .header-container-1 .menu-container {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
  }
  header .header-container-1 .menu-container p {
    width: fit-content;
    padding: 0 15px;
    margin: 0.5rem 0;
    cursor: pointer;
    font-size: 0.65rem;
  }
  header .header-container-1 .menu-container p a {
    margin: 0;
  }
  header .header-container-1 .menu-container p a:hover {
    transition: 0.25s;
    color: var(--blue-primary);
  }
  header .header-container-1 .menu-container .span-icon {
    display: none;
  }
  header .header-container-1 .nous-rejoindre {
    padding: 0 2rem 0 2rem;
    margin: auto 3rem auto 1.5rem;
    letter-spacing: normal;
  }
  header .header-container-1 .nous-rejoindre p {
    min-width: 8rem;
    margin: 0;
    font-size: 0.65rem;
  }
  header .header-container-mobil {
    display: none;
  }
  header.open {
    z-index: 1;
  }
  header.open div {
    background-color: black;
    z-index: 1;
    transition: 0.25s ease-out;
    transform: perspective();
  }
  header.open .header-container-1 {
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  }
  header.open .header-container-2 {
    height: fit-content;
    position: absolute;
    width: 100%;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.76);
    display: flex;
  }
  header.open .header-container-2 .description-container {
    flex: 1;
  }
  header.open .header-container-2 .description-container .span-image {
    height: 7.5rem;
    width: 10rem;
    display: block;
    margin: 3rem auto 3rem 3rem;
  }
  header.open .header-container-2 .description-container p {
    font-size: 0.65rem;
    opacity: 0.75;
    padding: 0 0 0 1rem;
  }
  header.open .header-container-2 .description-container p.description-titre {
    font-size: 1rem;
    opacity: 1;
  }
  header.open .header-container-2 .sous-menu-container {
    flex: 3;
    padding: 3rem 2rem 8rem 2rem;
    margin-left: auto;
    display: flex;
    justify-content: end;
    flex-wrap: wrap;
    transition: flex-wrap 0.25s ease-out;
    transform: perspective();
  }
  header.open .header-container-2 .sous-menu-container .sous-menu {
    flex: 1;
    letter-spacing: 0.1rem;
    padding: 2rem 1rem;
  }
  header.open .header-container-2 .sous-menu-container .sous-menu .titre-container {
    display: flex;
    justify-content: start;
  }
  header.open .header-container-2 .sous-menu-container .sous-menu .titre-container * {
    color: white;
    margin: 0 0;
    padding: 0 0;
    text-align: left;
  }
  header.open .header-container-2 .sous-menu-container .sous-menu .titre-container div.icon-container .span-icon {
    position: absolute;
    width: 1rem;
    height: 1rem;
    display: block;
    background-color: #01FF01;
  }
  header.open .header-container-2 .sous-menu-container .sous-menu .titre-container p {
    font-size: 0.65rem;
    width: max-content;
    padding-left: 23px;
    padding-bottom: 0.5rem;
    display: flex;
  }
  header.open .header-container-2 .sous-menu-container .sous-menu .titre-container p .green-word {
    color: #01FF01;
    text-shadow: 0px 1px 2px #01FF01;
    opacity: 0.85;
    margin: 0 5px 0 5px;
  }
  header.open .header-container-2 .sous-menu-container .sous-menu .titre-container p .nouveau {
    position: absolute;
    margin-top: -1.5rem;
    margin-left: 2rem;
    text-shadow: 5px -4px 2px blue;
    opacity: 0.75;
  }
  header.open .header-container-2 .sous-menu-container .sous-menu .titre-container p .span-image {
    background: url(${___CSS_LOADER_URL_REPLACEMENT_1___}) center/contain no-repeat;
    display: block;
    width: 1rem;
    height: 1rem;
  }
  header.open .header-container-2 .sous-menu-container nav {
    display: flex;
    flex-direction: column;
  }
  header.open .header-container-2 .sous-menu-container nav a {
    cursor: pointer;
    height: 2rem;
    width: max-content;
    min-width: 8rem;
    display: flex;
    align-items: center;
    opacity: 0.75;
    font-size: 0.6rem;
    transition: all 0.25s ease-in-out;
  }
  header.open .header-container-2 .sous-menu-container nav a:hover {
    color: var(--blue-primary);
    text-shadow: 5px 5px 2px blue;
    opacity: 1;
  }
  .content {
    margin-top: 90px;
  }
  .content h1 {
    font-size: 3rem;
    margin-top: 8rem;
    text-align: center;
  }
  .content h2 {
    font-size: 1.75rem;
  }
  .content h3 {
    font-size: 1.2rem;
  }
  .content h1,
  .content h2,
  .content h3 {
    letter-spacing: 0.2rem;
  }
  .contenta,
  .content p,
  .content li {
    letter-spacing: 2px;
    font-size: 0.75rem;
  }
  .content section {
    margin-top: 2rem;
    margin-bottom: 15rem;
  }
  .content section .span-image {
    border-radius: 5px;
  }
  .content section .tab p {
    padding-left: 2rem;
  }
  footer {
    margin-top: 60px;
  }
  footer a,
  footer p,
  footer li {
    font-size: 20px;
  }
  footer .footer-container .footer-register input {
    margin: 120px auto 20px auto;
    width: 50%;
  }
  footer .footer-container .footer-register p[id=footer-submit] {
    width: 25%;
    margin: 0 auto 0 auto;
  }
  footer .footer-container .infos-services {
    display: flex;
    flex-wrap: nowrap;
    width: 75%;
    margin-left: auto;
    margin-right: auto;
  }
  footer .footer-container .infos-services .footer-coordonnees {
    flex: 1;
    margin-top: 80px;
  }
  footer .footer-container .infos-services .footer-coordonnees h3 {
    font-size: 40px;
  }
  footer .footer-container .infos-services .footer-coordonnees span {
    margin: 20px 0 20px 0;
  }
  footer .footer-container .infos-services .footer-services {
    flex: 1;
    margin-top: 80px;
  }
  footer .footer-container .infos-services .footer-services h3 {
    font-size: 40px;
  }
  footer .footer-container .infos-services .footer-services ul {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  footer .footer-container .infos-services .footer-services ul li {
    margin: 10px 0 10px 0;
    width: max-content;
    min-height: 48px;
    min-width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  footer .footer-separator {
    margin: 40px 0;
  }
  footer .footer-container2 .footer-links {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 50%;
    margin-left: auto;
    margin-right: auto;
  }
  footer .footer-container2 .footer-links p {
    display: flex;
    justify-content: center;
    align-items: center;
    width: max-content;
    min-height: 48px;
    min-width: 50%;
  }
  footer .footer-container2 .footer-icons {
    justify-content: space-evenly;
    margin: 60px auto 60px auto;
    width: 50%;
  }
}
/*  desktop */
@media (min-width: 980px) and (max-width: 1199.9px) {
  .loading-screen {
    position: fixed;
    height: 100%;
    width: 100%;
    z-index: 10;
  }
  .loading-screen .section-0 {
    width: 100%;
    height: 100%;
    background-color: black;
    padding: 4rem 0 10rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .loading-screen .section-0 .span-image {
    background: url(${___CSS_LOADER_URL_REPLACEMENT_2___}) no-repeat;
    background-size: contain;
    display: block;
    height: 12.5rem;
    width: 25rem;
    margin: 4rem auto 0 auto;
    overflow: hidden;
  }
  .loading-screen .section-0 h1 {
    background-image: linear-gradient(to left, #94A4B0, #5F82A0, #3F6D97, #486078);
    -webkit-background-clip: text;
    color: transparent;
    font-size: 1.5rem;
    margin: 0;
  }
  .loading-screen .section-0 p {
    width: 35%;
    text-align: center;
    font-size: 0.8rem;
    color: white;
  }
  .loading-screen .section-0 .span-icon {
    margin-top: 3rem;
    display: flex;
    justify-content: space-evenly;
    width: 35%;
  }
  .loading-screen .section-0 .span-icon * {
    height: 2.5rem;
  }
  header .header-container-1 {
    height: 100%;
    width: 100%;
    display: flex;
    letter-spacing: 3px;
    justify-content: space-between;
  }
  header .header-container-1 img {
    cursor: pointer;
    height: 2.75rem;
    margin-top: 0.8rem;
    margin-left: 3rem;
    transition: transform 0.3s;
  }
  header .header-container-1 img:hover {
    transform: scale(1.05);
  }
  header .header-container-1 .menu-container {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
  }
  header .header-container-1 .menu-container p {
    width: fit-content;
    padding: 0 15px;
    margin: 0.5rem 0;
    cursor: pointer;
    font-size: 0.65rem;
  }
  header .header-container-1 .menu-container p a {
    margin: 0;
  }
  header .header-container-1 .menu-container p a:hover {
    transition: 0.5s;
    color: var(--blue-primary);
  }
  header .header-container-1 .menu-container .span-icon {
    display: none;
  }
  header .header-container-1 .nous-rejoindre {
    padding: 0 2rem 0 2rem;
    margin: auto 3rem auto 1.5rem;
    letter-spacing: normal;
  }
  header .header-container-1 .nous-rejoindre p {
    min-width: 8rem;
    margin: 0;
    font-size: 0.65rem;
  }
  header .header-container-mobil {
    display: none;
  }
  header.open div {
    background-color: black;
    z-index: 1;
    transition: all 0.5s ease-out;
    transform: perspective();
  }
  header.open .header-container-1 {
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  }
  header.open .header-container-2 {
    height: fit-content;
    position: absolute;
    width: 100%;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.76);
    display: flex;
  }
  header.open .header-container-2 .description-container {
    flex: 1;
  }
  header.open .header-container-2 .description-container .span-image {
    height: 7.5rem;
    width: 10rem;
    display: block;
    margin: 3rem auto 3rem 3rem;
  }
  header.open .header-container-2 .description-container p {
    font-size: 0.65rem;
    opacity: 0.75;
    padding: 0 0 0 1rem;
  }
  header.open .header-container-2 .description-container p.description-titre {
    font-size: 1rem;
    opacity: 1;
  }
  header.open .header-container-2 .sous-menu-container {
    flex: 3;
    padding: 3rem 2rem 8rem 2rem;
    margin-left: auto;
    display: flex;
    justify-content: end;
    flex-wrap: wrap;
    transition: flex-wrap 0.5s ease-out;
    transform: perspective();
  }
  header.open .header-container-2 .sous-menu-container .sous-menu {
    flex: 1;
    letter-spacing: 0.1rem;
    padding: 2rem 1rem;
  }
  header.open .header-container-2 .sous-menu-container .sous-menu .titre-container {
    display: flex;
    justify-content: start;
  }
  header.open .header-container-2 .sous-menu-container .sous-menu .titre-container * {
    color: white;
    margin: 0 0;
    padding: 0 0;
    text-align: left;
  }
  header.open .header-container-2 .sous-menu-container .sous-menu .titre-container div.icon-container .span-icon {
    position: absolute;
    width: 1rem;
    height: 1rem;
    display: block;
    background-color: #01FF01;
  }
  header.open .header-container-2 .sous-menu-container .sous-menu .titre-container p {
    font-size: 0.65rem;
    width: max-content;
    padding-left: 23px;
    padding-bottom: 0.5rem;
    display: flex;
  }
  header.open .header-container-2 .sous-menu-container .sous-menu .titre-container p .green-word {
    color: #01FF01;
    text-shadow: 0px 1px 2px #01FF01;
    opacity: 0.85;
    margin: 0 5px 0 5px;
  }
  header.open .header-container-2 .sous-menu-container .sous-menu .titre-container p .nouveau {
    position: absolute;
    margin-top: -1.5rem;
    margin-left: 2rem;
    text-shadow: 5px -4px 2px blue;
    opacity: 0.75;
  }
  header.open .header-container-2 .sous-menu-container .sous-menu .titre-container p .span-image {
    background: url(${___CSS_LOADER_URL_REPLACEMENT_1___}) center/contain no-repeat;
    display: block;
    width: 1rem;
    height: 1rem;
  }
  header.open .header-container-2 .sous-menu-container nav {
    display: flex;
    flex-direction: column;
  }
  header.open .header-container-2 .sous-menu-container nav a {
    cursor: pointer;
    height: 2rem;
    width: max-content;
    min-width: 8rem;
    display: flex;
    align-items: center;
    opacity: 0.75;
    font-size: 0.6rem;
    transition: all 0.5s;
  }
  header.open .header-container-2 .sous-menu-container nav a:hover {
    color: var(--blue-primary);
    text-shadow: 5px 5px 2px blue;
    opacity: 1;
  }
  .content {
    margin-top: 90px;
  }
  .content h1 {
    font-size: 3rem;
    margin-top: 8rem;
    text-align: center;
  }
  .content h2 {
    font-size: 1.75rem;
  }
  .content h3 {
    font-size: 1.2rem;
  }
  .content h1,
  .content h2,
  .content h3 {
    letter-spacing: 0.2rem;
  }
  .contenta,
  .content p,
  .content li {
    letter-spacing: 2px;
    font-size: 0.75rem;
  }
  .content section {
    margin-top: 2rem;
    margin-bottom: 180px;
  }
  .content section .span-image {
    border-radius: 5px;
  }
  .content section .tab p {
    padding-left: 2rem;
  }
  footer a,
  footer p,
  footer li {
    font-size: 20px;
  }
  footer .footer-container .footer-register input {
    margin: 120px auto 20px auto;
    width: 50%;
  }
  footer .footer-container .footer-register p[id=footer-submit] {
    width: 25%;
    margin: 0 auto 0 auto;
  }
  footer .footer-container .infos-services {
    display: flex;
    flex-wrap: nowrap;
  }
  footer .footer-container .infos-services .footer-coordonnees {
    flex: 1;
    margin-top: 80px;
  }
  footer .footer-container .infos-services .footer-coordonnees h3 {
    font-size: 40px;
  }
  footer .footer-container .infos-services .footer-coordonnees span {
    margin: 20px 0 20px 0;
  }
  footer .footer-container .infos-services .footer-services {
    flex: 1;
    margin-top: 80px;
  }
  footer .footer-container .infos-services .footer-services h3 {
    font-size: 40px;
  }
  footer .footer-container .infos-services .footer-services ul {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  footer .footer-container .infos-services .footer-services ul li {
    margin: 10px 0 10px 0;
    width: max-content;
    min-height: 48px;
    min-width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  footer .footer-separator {
    margin: 40px 0;
  }
  footer .footer-container2 .footer-links {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  footer .footer-container2 .footer-links p {
    display: flex;
    justify-content: center;
    align-items: center;
    width: max-content;
    min-height: 48px;
    min-width: 50%;
  }
  footer .footer-container2 .footer-icons {
    justify-content: space-evenly;
    margin: 60px 0 60px 0;
  }
}
/* Portrait tablet to landscape and desktop */
@media (min-width: 767px) and (max-width: 979.9px) {
  header .header-container-1 {
    margin-top: 1rem;
  }
  header .header-container-1 div {
    flex: 1;
  }
  header .header-container-1 .logo-container {
    display: flex;
    align-items: center;
  }
  header .header-container-1 .logo-container img {
    max-height: 70px;
    width: 110%;
  }
  header .header-container-1 .menu-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  header .header-container-1 .menu-container p {
    display: none;
  }
  header .header-container-1 .nous-rejoindre {
    height: fit-content;
    width: fit-content;
    margin: auto 1rem auto 0;
    padding: 0.5rem 1rem;
    display: flex;
    justify-content: center;
  }
  header .header-container-1 .nous-rejoindre p {
    font-size: 0.8rem;
    margin: 0;
  }
  header .header-container-2 {
    display: none;
  }
  header.open .header-container-mobil.menu {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }
  header.open .header-container-mobil.menu .menu-mobil {
    width: 75%;
    margin: 0;
    font-size: 1.2rem;
    border: 1px solid white;
    margin: 1rem 0;
    border-radius: 15px;
  }
  header.open .header-container-mobil.menu .menu-mobil p {
    text-align: center;
    margin: 0.5rem 0;
  }
  header.open .header-container-mobil.sous-menu .span-icon {
    display: block;
  }
  header.open .header-container-mobil.sous-menu .span-icon.retour {
    position: absolute;
    right: 1rem;
    width: 60px;
    height: 60px;
    margin-right: 7.5%;
    margin-left: auto;
  }
  header.open .header-container-mobil.sous-menu .sous-menu-mobil {
    margin: 1.5rem 0 0.5rem 0;
    padding-left: 7.5%;
    padding-right: 7.5%;
  }
  header.open .header-container-mobil.sous-menu .sous-menu-mobil .titre-container {
    display: flex;
    align-items: center;
  }
  header.open .header-container-mobil.sous-menu .sous-menu-mobil .titre-container .icon-container {
    padding: 0 5px;
  }
  header.open .header-container-mobil.sous-menu .sous-menu-mobil .titre-container .icon-container .span-icon {
    height: 1.5rem;
    width: 1.5rem;
  }
  header.open .header-container-mobil.sous-menu .sous-menu-mobil .titre-container p {
    color: var(--blue-primary);
    margin: 0;
    font-size: 1.25rem;
  }
  header.open .header-container-mobil.sous-menu .sous-menu-mobil .titre-container .nouveau {
    margin-top: -3rem;
  }
  header.open .header-container-mobil.sous-menu .sous-menu-mobil .titre-container .green-word {
    margin: 0 8px 0 8px;
  }
  header.open .header-container-mobil.sous-menu .sous-menu-mobil .titre-container .span-image {
    width: 1.5rem;
    height: 1.5rem;
  }
  header.open .header-container-mobil.sous-menu .sous-menu-mobil nav {
    display: flex;
    flex-direction: column;
    padding: 0 0 0 3rem;
  }
  header.open .header-container-mobil.sous-menu .sous-menu-mobil nav a {
    width: max-content;
    min-width: 50%;
    height: 48px;
    display: flex;
    align-items: center;
    margin: 2.5px 0 2.5px 0;
  }
  .content {
    margin-top: 90px;
    padding: 0 20px;
  }
  .content h1 {
    font-size: 40px;
    margin-top: 8rem;
    text-align: center;
  }
  .content h2 {
    font-size: 1.75rem;
  }
  .content h3 {
    font-size: 1.2rem;
  }
  .content h1,
  .content h2,
  .content h3 {
    letter-spacing: 0.2rem;
  }
  .contenta,
  .content p,
  .content li {
    letter-spacing: 2px;
    font-size: 0.75rem;
  }
  .content section {
    margin-top: 2rem;
    margin-bottom: 125px;
  }
  .content section .span-image {
    border-radius: 5px;
  }
  .content section .tab p {
    padding-left: 2rem;
  }
  footer {
    margin-top: 60px;
  }
  footer a,
  footer p,
  footer li {
    font-size: 20px;
  }
  footer .footer-container .footer-register input {
    margin: 100px auto 20px auto;
    width: 80%;
  }
  footer .footer-container .footer-register p#footer-submit {
    margin: 0 auto 0 auto;
    width: 60%;
  }
  footer .footer-container .footer-coordonnees {
    margin-top: 60px;
  }
  footer .footer-container .footer-coordonnees h3 {
    font-size: 40px;
  }
  footer .footer-container .footer-coordonnees span {
    margin: 20px 0 20px 0;
  }
  footer .footer-container .footer-services {
    margin-top: 80px;
  }
  footer .footer-container .footer-services h3 {
    font-size: 40px;
  }
  footer .footer-container .footer-services ul {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  footer .footer-container .footer-services ul li {
    margin: 10px 0 10px 0;
    width: max-content;
    min-height: 48px;
    min-width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  footer .footer-separator {
    margin: 40px 0;
  }
  footer .footer-container2 .footer-links {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  footer .footer-container2 .footer-links p {
    display: flex;
    justify-content: center;
    align-items: center;
    width: max-content;
    min-height: 48px;
    min-width: 50%;
  }
  footer .footer-container2 .footer-icons {
    justify-content: space-evenly;
    margin: 60px 0 60px 0;
  }
}
/* Landscape phone to portrait tablet */
@media (min-width: 481px) and (max-width: 767.9px) {
  header .header-container-1 {
    margin-top: 1rem;
  }
  header .header-container-1 div {
    flex: 1;
  }
  header .header-container-1 .logo-container {
    display: flex;
    align-items: center;
  }
  header .header-container-1 .logo-container img {
    max-height: 70px;
    width: 110%;
  }
  header .header-container-1 .menu-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  header .header-container-1 .menu-container p {
    display: none;
  }
  header .header-container-1 .nous-rejoindre {
    height: fit-content;
    width: fit-content;
    margin: auto 1rem auto 0;
    padding: 0.5rem 1rem;
    display: flex;
    justify-content: center;
  }
  header .header-container-1 .nous-rejoindre p {
    font-size: 0.8rem;
    margin: 0;
  }
  header .header-container-2 {
    display: none;
  }
  header.open .header-container-mobil.menu {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }
  header.open .header-container-mobil.menu .menu-mobil {
    width: 75%;
    margin: 0;
    font-size: 1.2rem;
    border: 1px solid white;
    margin: 1rem 0;
    border-radius: 15px;
  }
  header.open .header-container-mobil.menu .menu-mobil p {
    text-align: center;
    margin: 0.5rem 0;
  }
  header.open .header-container-mobil.sous-menu .span-icon {
    display: block;
  }
  header.open .header-container-mobil.sous-menu .span-icon.retour {
    position: absolute;
    right: 1rem;
    width: 60px;
    height: 60px;
    margin-right: 7.5%;
    margin-left: auto;
  }
  header.open .header-container-mobil.sous-menu .sous-menu-mobil {
    margin: 1.5rem 0 0.5rem 0;
    padding-left: 7.5%;
    padding-right: 7.5%;
  }
  header.open .header-container-mobil.sous-menu .sous-menu-mobil .titre-container {
    display: flex;
    align-items: center;
  }
  header.open .header-container-mobil.sous-menu .sous-menu-mobil .titre-container .icon-container {
    padding: 0 5px;
  }
  header.open .header-container-mobil.sous-menu .sous-menu-mobil .titre-container .icon-container .span-icon {
    height: 1.5rem;
    width: 1.5rem;
  }
  header.open .header-container-mobil.sous-menu .sous-menu-mobil .titre-container p {
    color: var(--blue-primary);
    margin: 0;
    font-size: 1.25rem;
  }
  header.open .header-container-mobil.sous-menu .sous-menu-mobil .titre-container .nouveau {
    margin-top: -3rem;
  }
  header.open .header-container-mobil.sous-menu .sous-menu-mobil .titre-container .green-word {
    margin: 0 8px 0 8px;
  }
  header.open .header-container-mobil.sous-menu .sous-menu-mobil .titre-container .span-image {
    width: 1.5rem;
    height: 1.5rem;
  }
  header.open .header-container-mobil.sous-menu .sous-menu-mobil nav {
    display: flex;
    flex-direction: column;
    padding: 0 0 0 3rem;
  }
  header.open .header-container-mobil.sous-menu .sous-menu-mobil nav a {
    width: max-content;
    min-width: 50%;
    height: 48px;
    display: flex;
    align-items: center;
    margin: 2.5px 0 2.5px 0;
  }
  .content {
    margin-top: 90px;
    padding: 0 20px;
  }
  .content h1 {
    margin-top: 8rem;
    text-align: center;
    font-size: 30px;
    margin-bottom: 50px;
  }
  .content h2 {
    font-size: 1.75rem;
  }
  .content h3 {
    font-size: 1.2rem;
  }
  .content h1,
  .content h2,
  .content h3 {
    letter-spacing: 0.2rem;
  }
  .contenta,
  .content p,
  .content li {
    letter-spacing: 2px;
    font-size: 0.75rem;
  }
  .content section {
    margin-top: 2rem;
    margin-bottom: 100px;
  }
  .content section .span-image {
    border-radius: 5px;
  }
  .content section .tab p {
    padding-left: 2rem;
  }
  footer {
    margin-top: 60px;
  }
  footer .footer-container .footer-register input {
    margin: 100px auto 20px auto;
    width: 95%;
  }
  footer .footer-container .footer-register p#footer-submit {
    margin: 0 auto 0 auto;
    width: 80%;
  }
  footer .footer-container .footer-coordonnees {
    margin-top: 60px;
  }
  footer .footer-container .footer-coordonnees h3 {
    font-size: 30px;
  }
  footer .footer-container .footer-coordonnees span {
    margin: 10px 0 10px 0;
  }
  footer .footer-container .footer-services {
    margin-top: 60px;
  }
  footer .footer-container .footer-services h3 {
    font-size: 30px;
  }
  footer .footer-container .footer-services ul {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  footer .footer-container .footer-services ul li {
    margin: 10px 0 10px 0;
    width: max-content;
    min-height: 48px;
    min-width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  footer .footer-separator {
    margin: 40px 0;
  }
  footer .footer-container2 .footer-links {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  footer .footer-container2 .footer-links p {
    display: flex;
    justify-content: center;
    align-items: center;
    width: max-content;
    min-height: 48px;
    min-width: 50%;
  }
  footer .footer-container2 .footer-icons {
    justify-content: space-evenly;
    margin: 60px 0 60px 0;
  }
}
/* portrait phones and down */
@media (max-width: 480.9px) {
  header .header-container-1 div {
    flex: 1;
  }
  header .header-container-1 .logo-container {
    display: flex;
    align-items: center;
  }
  header .header-container-1 .logo-container img {
    max-height: 70px;
    width: 110%;
  }
  header .header-container-1 .menu-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  header .header-container-1 .menu-container p {
    display: none;
  }
  header .header-container-1 .nous-rejoindre {
    height: fit-content;
    margin: auto 0.25rem auto 0;
  }
  header .header-container-1 .nous-rejoindre p {
    font-size: 0.65rem;
    margin: 0;
  }
  header .header-container-2 {
    display: none;
  }
  header.open .header-container-mobil.menu {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }
  header.open .header-container-mobil.menu .menu-mobil {
    width: 75%;
    margin: 0;
    font-size: 1.2rem;
    border: 1px solid white;
    margin: 1rem 0;
    border-radius: 15px;
  }
  header.open .header-container-mobil.menu .menu-mobil p {
    text-align: center;
    margin: 0.5rem 0;
  }
  header.open .header-container-mobil.sous-menu .span-icon {
    display: block;
  }
  header.open .header-container-mobil.sous-menu .span-icon.retour {
    position: absolute;
    right: 1rem;
    width: 60px;
    height: 60px;
    margin-right: 1rem;
    margin-left: auto;
  }
  header.open .header-container-mobil.sous-menu .sous-menu-mobil {
    margin: 1.5rem 0 0.5rem 0;
    padding-left: 1rem;
    padding-right: 1rem;
  }
  header.open .header-container-mobil.sous-menu .sous-menu-mobil .titre-container {
    display: flex;
    align-items: center;
  }
  header.open .header-container-mobil.sous-menu .sous-menu-mobil .titre-container .icon-container {
    padding: 0 5px;
  }
  header.open .header-container-mobil.sous-menu .sous-menu-mobil .titre-container .icon-container .span-icon {
    height: 1.5rem;
    width: 1.5rem;
  }
  header.open .header-container-mobil.sous-menu .sous-menu-mobil .titre-container p {
    color: var(--blue-primary);
    margin: 0;
    font-size: 1.25rem;
  }
  header.open .header-container-mobil.sous-menu .sous-menu-mobil .titre-container .nouveau {
    margin-top: -3rem;
    font-size: 0.65rem;
  }
  header.open .header-container-mobil.sous-menu .sous-menu-mobil .titre-container .green-word {
    margin: 0 8px 0 8px;
  }
  header.open .header-container-mobil.sous-menu .sous-menu-mobil .titre-container .span-image {
    width: 1.5rem;
    height: 1.5rem;
  }
  header.open .header-container-mobil.sous-menu .sous-menu-mobil nav {
    display: flex;
    flex-direction: column;
    padding: 0 0 0 3rem;
  }
  header.open .header-container-mobil.sous-menu .sous-menu-mobil nav a {
    width: max-content;
    min-width: 50%;
    height: 48px;
    display: flex;
    align-items: center;
    margin: 2.5px 0 2.5px 0;
  }
  .content {
    margin-top: 90px;
  }
  .content h1 {
    margin-top: 8rem;
    text-align: center;
    font-size: 30px;
    margin-bottom: 50px;
  }
  .content h2 {
    font-size: 1.75rem;
  }
  .content h3 {
    font-size: 1.2rem;
  }
  .content h1,
  .content h2,
  .content h3 {
    letter-spacing: 0.2rem;
  }
  .contenta,
  .content p,
  .content li {
    letter-spacing: 2px;
    font-size: 0.75rem;
  }
  .content section {
    margin-top: 2rem;
    margin-bottom: 80px;
  }
  .content section .span-image {
    border-radius: 5px;
  }
  .content section .span-text ul li {
    margin-bottom: 35px;
  }
  .content section .tab p {
    padding-left: 2rem;
  }
  footer {
    margin-top: 60px;
  }
  footer .footer-container .footer-register input {
    margin: 100px 0 20px 0;
    width: 99%;
  }
  footer .footer-container .footer-register p#footer-submit {
    width: 99%;
  }
  footer .footer-container .footer-coordonnees {
    margin-top: 60px;
  }
  footer .footer-container .footer-coordonnees h3 {
    font-size: 30px;
  }
  footer .footer-container .footer-coordonnees span {
    margin: 10px 0 10px 0;
  }
  footer .footer-container .footer-services {
    margin-top: 60px;
  }
  footer .footer-container .footer-services h3 {
    font-size: 30px;
  }
  footer .footer-container .footer-services ul {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  footer .footer-container .footer-services ul li {
    margin: 10px 0 10px 0;
    width: max-content;
    min-height: 48px;
    min-width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  footer .footer-separator {
    margin: 40px 0;
  }
  footer .footer-container2 .footer-links {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  footer .footer-container2 .footer-links p {
    display: flex;
    justify-content: center;
    align-items: center;
    width: max-content;
    min-height: 48px;
    min-width: 50%;
  }
  footer .footer-container2 .footer-icons {
    justify-content: space-evenly;
    margin: 60px 0 60px 0;
  }
}`, "",{"version":3,"sources":["webpack://./assets/styles/_media-queries.scss","webpack://./assets/styles/_variables.scss","webpack://./assets/styles/responsive-styles.scss","webpack://./assets/styles/_classes.scss","webpack://./assets/styles/responsive/all-display.scss","webpack://./assets/styles/responsive/_xl-styles.scss","webpack://./assets/styles/responsive/_standard-styles.scss","webpack://./assets/styles/responsive/_md-styles.scss","webpack://./assets/styles/responsive/_sm-styles.scss","webpack://./assets/styles/responsive/_xs-styles.scss"],"names":[],"mappings":"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","sourcesContent":["/* portrait phones and down */\r\n@mixin xs {\r\n    @media (max-width: 480.9px) {\r\n        @content;\r\n    }\r\n}\r\n\r\n/* Landscape phone to portrait tablet */\r\n@mixin sm {\r\n    @media (min-width: 481px) and (max-width: 767.9px) {\r\n        @content;\r\n    }\r\n}\r\n\r\n/* Portrait tablet to landscape and desktop */\r\n@mixin md {\r\n    @media (min-width: 767px) and (max-width: 979.9px) {\r\n        @content;\r\n    }\r\n}\r\n\r\n/* desktop */\r\n@mixin standard {\r\n    @media (min-width: 980px) and (max-width: 1199.9px) {\r\n        @content;\r\n    }\r\n}\r\n\r\n/* Large desktop */\r\n@mixin xl {\r\n    @media (min-width: 1200px) {\r\n        @content;\r\n    }\r\n}",":root {\r\n    --background-color-primary: #15171C;\r\n    --background-color-primary-opacity: #15171ccb;\r\n    --text-color-primary: rgba(255, 255, 255, 0.75);\r\n    --input-border-color: #6A6B6D;\r\n    --blue-primary: #4A81F7;\r\n}","@use 'media-queries' as MQueries;\r\n@import \"./responsive/all-display.scss\";\r\n\r\n\r\n/* Large desktop */\r\n@include MQueries.xl {\r\n    @import \"./responsive/xl-styles\";\r\n}\r\n\r\n\r\n/*  desktop */\r\n@include MQueries.standard {\r\n    @import \"./responsive/standard-styles\";\r\n}\r\n\r\n\r\n/* Portrait tablet to landscape and desktop */\r\n@include MQueries.md {\r\n    @import \"./responsive/md-styles\";\r\n}\r\n\r\n\r\n/* Landscape phone to portrait tablet */\r\n@include MQueries.sm {\r\n    @import \"./responsive/sm-styles\";\r\n}\r\n\r\n\r\n/* portrait phones and down */\r\n@include MQueries.xs {\r\n    @import \"./responsive/xs-styles\";\r\n}",".point-bleu-avec-trait {\r\n\r\n    /* Style pour le conteneur de point et de trait */\r\n    .point-et-trait {\r\n        height: fit-content;\r\n        display: flex;\r\n        align-items: center;\r\n\r\n\r\n\r\n        /* Style pour la ligne grise */\r\n        .trait {\r\n            width: 3rem;\r\n            height: 1px;\r\n            background-color: var(--input-border-color);\r\n            margin-left: 1rem;\r\n\r\n            &-column {\r\n                width: 1px;\r\n                height: 3rem;\r\n                margin-top: 1rem;\r\n                margin-bottom: 1rem;\r\n                margin-left: 0;\r\n            }\r\n        }\r\n\r\n        /* Style pour le point bleu */\r\n        .point-bleu {\r\n            min-width: 10px;\r\n            min-height: 10px;\r\n            background-color: var(--blue-primary);\r\n            border-radius: 50%;\r\n            margin-left: 1rem;\r\n        }\r\n\r\n        p {\r\n            font-size: 1.5rem;\r\n            margin-left: 1rem;\r\n        }\r\n    }\r\n\r\n    .column {\r\n        flex-direction: column;\r\n\r\n        .point-bleu {\r\n            margin-left: 0;\r\n            margin-top: 1rem;\r\n        }\r\n\r\n        &>p {\r\n            // writing-mode: vertical-rl;\r\n            rotate: -90deg;\r\n            margin-top: 2rem;\r\n            margin-left: auto;\r\n            margin-right: auto;\r\n        }\r\n    }\r\n}\r\n\r\n\r\n\r\n.blue-word {\r\n    color: var(--blue-primary);\r\n    width: min-content;\r\n}\r\n\r\ninput,\r\nselect {\r\n    display: block;\r\n\r\n    background-color: var(--background-color-general);\r\n    border: none;\r\n    border-bottom: var(--input-border-color) solid 1px;\r\n    font-size: 15px;\r\n    color: var(--text-color-primary);\r\n    text-align: center;\r\n\r\n    &:focus {\r\n        outline: none;\r\n    }\r\n}\r\n\r\n\r\n\r\np.submit-button {\r\n    display: flex;\r\n    justify-content: center;\r\n    align-items: center;\r\n    background-color: var(--blue-primary);\r\n    border-radius: 15px;\r\n    min-height: 48px;\r\n}","@use '../variables';\r\n@use '../classes';\r\n\r\n\r\n/* thai */\r\n/* latin */\r\n@font-face {\r\n    font-display: swap;\r\n    font-family: 'Prompt';\r\n    font-style: normal;\r\n    font-weight: 300;\r\n    src: url('../fonts/-W_8XJnvUD7dzB2Ck_kIaWMu.woff2') format('woff2');\r\n    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\r\n}\r\n\r\n\r\n\r\n\r\n:root {\r\n    font-family: 'Prompt';\r\n    font-weight: normal;\r\n    cursor: default;\r\n\r\n    body {\r\n        margin: 0;\r\n        display: grid;\r\n        background-color: var(--background-color-primary);\r\n\r\n        .blur {\r\n            transition: 0.5s;\r\n            background-color: var(--background-color-primary-opacity);\r\n            filter: blur(10px);\r\n        }\r\n\r\n        &.header-menu-open {\r\n            overflow: hidden;\r\n        }\r\n\r\n        // header\r\n        header {\r\n            z-index: 1;\r\n            color: white;\r\n            position: fixed;\r\n            box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.76);\r\n            width: 100%;\r\n            max-height: 100vh;\r\n\r\n            // general header\r\n            .active {\r\n                color: var(--blue-primary);\r\n            }\r\n\r\n            a {\r\n                text-decoration: none;\r\n                color: white;\r\n            }\r\n\r\n            .header-container-1 {\r\n                display: flex;\r\n                max-height: 75px;\r\n\r\n                div {}\r\n\r\n                .logo-container {\r\n\r\n                    img {\r\n                        cursor: pointer;\r\n\r\n                    }\r\n                }\r\n\r\n                .menu-container {\r\n                    .span-icon {\r\n                        cursor: pointer;\r\n\r\n                        .bar {\r\n                            height: 10px;\r\n                            width: 50px;\r\n                            background-color: white;\r\n                            border-radius: 5px;\r\n\r\n                            &.milieu {\r\n                                margin-top: 8px;\r\n                                margin-bottom: 8px;\r\n                            }\r\n                        }\r\n\r\n                        &.active {\r\n\r\n                            * {\r\n\r\n                                background-color: var(--blue-primary);\r\n                            }\r\n\r\n                            .milieu {\r\n                                margin-left: 0.5rem;\r\n                            }\r\n\r\n                        }\r\n\r\n                    }\r\n\r\n                    p {}\r\n                }\r\n\r\n                .nous-rejoindre {\r\n                    border-top: var(--blue-primary) solid 2px;\r\n                    border-left: var(--blue-primary) solid 2px;\r\n                    border-bottom: #FF3131 solid 2px;\r\n                    border-right: #FF3131 solid 2px;\r\n                    border-radius: 5px;\r\n                    display: flex;\r\n\r\n\r\n\r\n                    span.point {\r\n                        background-color: var(--blue-primary);\r\n                        border-radius: 50%;\r\n                        height: 12px;\r\n                        width: 12px;\r\n                        margin-right: 10px;\r\n                        margin-top: auto;\r\n                        margin-bottom: auto;\r\n                    }\r\n\r\n                    p {}\r\n\r\n                    &:hover {\r\n                        transition: 0.2s;\r\n                        border: var(--blue-primary) solid 2px;\r\n                        color: var(--blue-primary);\r\n\r\n                        span.point {\r\n                            transition: 1.2s;\r\n                            background-color: white;\r\n                        }\r\n                    }\r\n\r\n                    &,\r\n                    & * {\r\n                        cursor: pointer;\r\n                    }\r\n                }\r\n            }\r\n\r\n            &.down-scroll {\r\n                // apparition/disparition de la top-bar\r\n                position: fixed;\r\n                top: 0px;\r\n                width: 100%;\r\n                transition: top 0.5s ease-out;\r\n                background-color: var(--background-color-primary-opacity);\r\n                backdrop-filter: blur(5px);\r\n            }\r\n\r\n            &.mobil-menu-open {\r\n                overflow: scroll;\r\n            }\r\n\r\n            // mobil & tablet\r\n            &.open {\r\n\r\n                .header-container-mobil {\r\n                    background-color: black;\r\n                    border-top: 1px white solid;\r\n                    padding: 7.5% 0;\r\n\r\n\r\n                    &.menu {\r\n\r\n\r\n                        .menu-mobil {\r\n\r\n\r\n                            p {}\r\n                        }\r\n                    }\r\n\r\n                    &.sous-menu {\r\n\r\n                        .span-icon {}\r\n\r\n                        .span-icon.retour {}\r\n\r\n                        .sous-menu-mobil {\r\n\r\n\r\n                            .titre-container {\r\n\r\n\r\n                                .icon-container {\r\n\r\n\r\n                                    .span-icon {}\r\n                                }\r\n\r\n                                p {\r\n                                    display: flex;\r\n                                    align-items: center;\r\n\r\n                                }\r\n\r\n                                .nouveau {\r\n                                    position: absolute;\r\n                                    color: white;\r\n                                    text-shadow: 5px -4px 2px blue;\r\n                                    opacity: 0.75;\r\n                                }\r\n\r\n                                .green-word {\r\n                                    color: #01FF01;\r\n                                    text-shadow: 0px 1px 2px #01FF01;\r\n                                    opacity: 0.85;\r\n                                }\r\n\r\n                                .span-image {\r\n                                    background: url('../images/trefle.webp') center/contain no-repeat;\r\n                                    display: block;\r\n\r\n                                }\r\n                            }\r\n\r\n                            nav {\r\n\r\n\r\n                                a {}\r\n                            }\r\n                        }\r\n                    }\r\n                }\r\n            }\r\n        }\r\n\r\n        // content\r\n        .content {\r\n            padding: 0 2.5%;\r\n            max-width: 2000px;\r\n            margin-right: auto;\r\n            margin-left: auto;\r\n\r\n            // titres\r\n            h1,\r\n            h2,\r\n            h3 {\r\n                color: white;\r\n            }\r\n\r\n            // textes\r\n            p,\r\n            a {\r\n                text-align: center;\r\n            }\r\n\r\n            a,\r\n            p,\r\n            li {\r\n                color: var(--text-color-primary);\r\n            }\r\n\r\n            // listes\r\n            ul {\r\n                text-decoration: none;\r\n                padding: 0 0 0 0;\r\n\r\n                li {\r\n\r\n                    list-style-type: none;\r\n                }\r\n\r\n                &.with-blue-puce {\r\n                    li {\r\n                        list-style-type: disc;\r\n                    }\r\n\r\n                    li::marker {\r\n                        color: var(--blue-primary);\r\n                    }\r\n                }\r\n            }\r\n\r\n            // sections\r\n            section {}\r\n\r\n            // marqueurs\r\n            .marqueur {\r\n                height: 10px;\r\n            }\r\n        }\r\n\r\n        // footer\r\n        footer {\r\n            padding: 1vh 1vh;\r\n\r\n            h3 {\r\n                color: white;\r\n            }\r\n\r\n            a,\r\n            p,\r\n            li {\r\n                color: var(--text-color-primary);\r\n\r\n            }\r\n\r\n            a {\r\n                text-decoration: none;\r\n            }\r\n\r\n            ul {\r\n                list-style-type: none;\r\n                padding-left: 0;\r\n            }\r\n\r\n            .footer-container {\r\n                .footer-register {\r\n                    h3 {\r\n                        text-align: center;\r\n                        font-size: 65px;\r\n                    }\r\n\r\n                    p:not([id=\"footer-submit\"]) {\r\n                        text-align: center;\r\n                    }\r\n\r\n                    input {}\r\n\r\n                    p.submit-button {}\r\n                }\r\n\r\n                .footer-coordonnees {\r\n                    display: flex;\r\n                    flex-direction: column;\r\n                    text-align: center;\r\n\r\n                    h3 {}\r\n\r\n\r\n\r\n\r\n                    span {\r\n\r\n                        & p:first-child {\r\n                            color: white;\r\n                        }\r\n\r\n                        p {\r\n                            margin: 0 0 0 0;\r\n                        }\r\n                    }\r\n\r\n\r\n                }\r\n\r\n                .footer-services {\r\n                    text-align: center;\r\n\r\n                    h3 {}\r\n\r\n                    ul {\r\n                        li {}\r\n                    }\r\n                }\r\n            }\r\n\r\n            .footer-separator {\r\n                height: 2px;\r\n                background-color: var(--text-color-primary);\r\n            }\r\n\r\n            .footer-container2 {\r\n                .footer-links {\r\n                    text-align: center;\r\n\r\n                    p {}\r\n                }\r\n\r\n                .footer-icons {\r\n                    display: flex;\r\n\r\n                    img {\r\n                        cursor: pointer;\r\n                        height: 48px;\r\n\r\n                    }\r\n                }\r\n\r\n                .footer-mention {\r\n                    color: white;\r\n                    text-align: center;\r\n                }\r\n            }\r\n\r\n        }\r\n\r\n    }\r\n\r\n}","header {\r\n    .header-container-1 {\r\n        height: 100%;\r\n        width: 100%;\r\n        display: flex;\r\n        letter-spacing: 3px;\r\n        justify-content: space-between;\r\n        padding-left: 1%;\r\n\r\n\r\n        img {\r\n            cursor: pointer;\r\n\r\n            max-width: 200px;\r\n            transition: transform 0.3s;\r\n\r\n            &:hover {\r\n                transform: scale(1.05);\r\n            }\r\n        }\r\n\r\n        .menu-container {\r\n\r\n            width: 100%;\r\n            display: flex;\r\n            justify-content: space-evenly;\r\n            align-items: center;\r\n            flex-wrap: wrap;\r\n\r\n\r\n            p {\r\n                width: fit-content;\r\n                padding: 0 15px;\r\n                margin: .5rem 0;\r\n                cursor: pointer;\r\n                font-size: 0.65rem;\r\n\r\n                a {\r\n                    margin: 0;\r\n                }\r\n\r\n\r\n                & a:hover {\r\n                    transition: 0.25s;\r\n                    color: var(--blue-primary);\r\n                }\r\n            }\r\n\r\n            .span-icon {\r\n                display: none;\r\n            }\r\n        }\r\n\r\n        .nous-rejoindre {\r\n\r\n            padding: 0 2rem 0 2rem;\r\n            margin: auto 3rem auto 1.5rem;\r\n            letter-spacing: normal;\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n            p {\r\n                min-width: 8rem;\r\n                margin: 0;\r\n                font-size: 0.65rem;\r\n            }\r\n\r\n\r\n        }\r\n    }\r\n\r\n    .header-container-mobil {\r\n        display: none;\r\n    }\r\n\r\n    &.open {\r\n        z-index: 1;\r\n\r\n\r\n        div {\r\n            background-color: black;\r\n            z-index: 1;\r\n\r\n            transition: 0.25s ease-out;\r\n            transform: perspective();\r\n\r\n        }\r\n\r\n        .header-container-1 {\r\n            border-bottom: 1px solid rgba(255, 255, 255, 0.5);\r\n\r\n        }\r\n\r\n        .header-container-2 {\r\n            height: fit-content;\r\n            position: absolute;\r\n            width: 100%;\r\n            box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.76);\r\n            display: flex;\r\n\r\n            .description-container {\r\n\r\n                flex: 1;\r\n\r\n\r\n                .span-image {\r\n                    height: 7.5rem;\r\n                    width: 10rem;\r\n                    display: block;\r\n                    margin: 3rem auto 3rem 3rem;\r\n                }\r\n\r\n\r\n                p {\r\n                    font-size: 0.65rem;\r\n                    opacity: 0.75;\r\n                    padding: 0 0 0 1rem;\r\n\r\n                    &.description-titre {\r\n                        font-size: 1rem;\r\n                        opacity: 1;\r\n                    }\r\n                }\r\n            }\r\n\r\n            .sous-menu-container {\r\n                flex: 3;\r\n                padding: 3rem 2rem 8rem 2rem;\r\n\r\n                margin-left: auto;\r\n\r\n                display: flex;\r\n                justify-content: end;\r\n                flex-wrap: wrap;\r\n\r\n                transition: flex-wrap 0.25s ease-out;\r\n                transform: perspective();\r\n\r\n\r\n\r\n                .sous-menu {\r\n                    flex: 1;\r\n                    letter-spacing: 0.1rem;\r\n                    padding: 2rem 1rem;\r\n\r\n\r\n\r\n                    .titre-container {\r\n                        display: flex;\r\n                        justify-content: start;\r\n\r\n                        * {\r\n                            color: white;\r\n                            margin: 0 0;\r\n                            padding: 0 0;\r\n                            text-align: left;\r\n\r\n                        }\r\n\r\n                        div.icon-container {\r\n\r\n                            .span-icon {\r\n                                position: absolute;\r\n                                width: 1rem;\r\n                                height: 1rem;\r\n                                display: block;\r\n                                background-color: #01FF01;\r\n                            }\r\n                        }\r\n\r\n\r\n                        p {\r\n                            font-size: 0.65rem;\r\n                            // transition: 0.75s;\r\n                            width: max-content;\r\n                            padding-left: 23px;\r\n                            padding-bottom: 0.5rem;\r\n                            display: flex;\r\n\r\n                            .green-word {\r\n                                color: #01FF01;\r\n                                text-shadow: 0px 1px 2px #01FF01;\r\n                                opacity: 0.85;\r\n                                margin: 0 5px 0 5px\r\n                            }\r\n\r\n                            .nouveau {\r\n                                position: absolute;\r\n                                margin-top: -1.5rem;\r\n                                margin-left: 2rem;\r\n                                text-shadow: 5px -4px 2px blue;\r\n                                opacity: 0.75;\r\n                            }\r\n\r\n                            .span-image {\r\n                                background: url('../images/trefle.webp') center/contain no-repeat;\r\n                                display: block;\r\n                                width: 1rem;\r\n                                height: 1rem;\r\n                            }\r\n                        }\r\n                    }\r\n\r\n                }\r\n\r\n                nav {\r\n                    display: flex;\r\n                    flex-direction: column;\r\n\r\n                    a {\r\n                        cursor: pointer;\r\n                        height: 2rem;\r\n                        width: max-content;\r\n                        min-width: 8rem;\r\n                        display: flex;\r\n                        align-items: center;\r\n                        opacity: 0.75;\r\n                        font-size: 0.6rem;\r\n                        transition: all 0.25s ease-in-out;\r\n\r\n                        &:hover {\r\n                            color: var(--blue-primary);\r\n                            text-shadow: 5px 5px 2px blue;\r\n                            opacity: 1;\r\n                        }\r\n                    }\r\n                }\r\n            }\r\n        }\r\n    }\r\n}\r\n\r\n// content\r\n.content {\r\n    margin-top: 90px;\r\n\r\n    // titres\r\n    h1 {\r\n        font-size: 3rem;\r\n        margin-top: 8rem;\r\n        text-align: center;\r\n    }\r\n\r\n    h2 {\r\n        font-size: 1.75rem;\r\n    }\r\n\r\n    h3 {\r\n        font-size: 1.2rem;\r\n    }\r\n\r\n    h1,\r\n    h2,\r\n    h3 {\r\n        letter-spacing: 0.2rem;\r\n\r\n    }\r\n\r\n    // textes\r\n\r\n    &a,\r\n    p,\r\n    li {\r\n        letter-spacing: 2px;\r\n        font-size: 0.75rem;\r\n    }\r\n\r\n\r\n\r\n    // sections\r\n    section {\r\n        margin-top: 2rem;\r\n        margin-bottom: 15rem;\r\n\r\n        .span-image {\r\n            border-radius: 5px;\r\n        }\r\n\r\n        .tab p {\r\n            padding-left: 2rem;\r\n        }\r\n    }\r\n}\r\n\r\nfooter {\r\n    margin-top: 60px;\r\n\r\n    h3 {}\r\n\r\n    a,\r\n    p,\r\n    li {\r\n        font-size: 20px;\r\n    }\r\n\r\n    ul {}\r\n\r\n    .footer-container {\r\n        .footer-register {\r\n            h3 {}\r\n\r\n            p:not([id=\"footer-submit\"]) {}\r\n\r\n            input {\r\n                margin: 120px auto 20px auto;\r\n                width: 50%;\r\n            }\r\n\r\n            p[id=\"footer-submit\"] {\r\n                width: 25%;\r\n                margin: 0 auto 0 auto;\r\n            }\r\n        }\r\n\r\n        .infos-services {\r\n            display: flex;\r\n            flex-wrap: nowrap;\r\n            width: 75%;\r\n            margin-left: auto;\r\n            margin-right: auto;\r\n\r\n            .footer-coordonnees {\r\n                flex: 1;\r\n                margin-top: 80px;\r\n\r\n                h3 {\r\n                    font-size: 40px;\r\n                }\r\n\r\n\r\n                span {\r\n                    margin: 20px 0 20px 0;\r\n\r\n                    p {}\r\n                }\r\n\r\n            }\r\n\r\n            .footer-services {\r\n                flex: 1;\r\n                margin-top: 80px;\r\n\r\n                h3 {\r\n                    font-size: 40px;\r\n                }\r\n\r\n                ul {\r\n                    display: flex;\r\n                    flex-direction: column;\r\n                    justify-content: center;\r\n                    align-items: center;\r\n\r\n                    li {\r\n                        margin: 10px 0 10px 0;\r\n                        width: max-content;\r\n                        min-height: 48px;\r\n                        min-width: 50%;\r\n                        display: flex;\r\n                        justify-content: center;\r\n                        align-items: center;\r\n                    }\r\n                }\r\n            }\r\n        }\r\n\r\n\r\n    }\r\n\r\n    .footer-separator {\r\n        margin: 40px 0;\r\n    }\r\n\r\n    .footer-container2 {\r\n        .footer-links {\r\n            display: flex;\r\n            flex-wrap: wrap;\r\n            justify-content: center;\r\n            align-items: center;\r\n            width: 50%;\r\n            margin-left: auto;\r\n            margin-right: auto;\r\n\r\n            p {\r\n                display: flex;\r\n                justify-content: center;\r\n                align-items: center;\r\n                width: max-content;\r\n                min-height: 48px;\r\n                min-width: 50%;\r\n            }\r\n        }\r\n\r\n        .footer-icons {\r\n            justify-content: space-evenly;\r\n            margin: 60px auto 60px auto;\r\n            width: 50%;\r\n\r\n            img {}\r\n        }\r\n\r\n        .footer-mention {}\r\n    }\r\n\r\n}","// page de chargement\r\n.loading-screen {\r\n    position: fixed;\r\n    height: 100%;\r\n    width: 100%;\r\n    z-index: 10;\r\n\r\n    .section-0 {\r\n        width: 100%;\r\n        height: 100%;\r\n        background-color: black;\r\n        padding: 4rem 0 10rem 0;\r\n        display: flex;\r\n        flex-direction: column;\r\n        align-items: center;\r\n\r\n\r\n        .span-image {\r\n            background: url('../images/cropped-image_2023-08-10_142556159-removebg-preview.webp') no-repeat;\r\n            background-size: contain;\r\n            display: block;\r\n            height: 12.5rem;\r\n            width: 25rem;\r\n            margin: 4rem auto 0 auto;\r\n            overflow: hidden;\r\n        }\r\n\r\n        h1 {\r\n            background-image: linear-gradient(to left, #94A4B0, #5F82A0, #3F6D97, #486078);\r\n            -webkit-background-clip: text;\r\n            color: transparent;\r\n            font-size: 1.5rem;\r\n            margin: 0\r\n        }\r\n\r\n        p {\r\n            width: 35%;\r\n\r\n            text-align: center;\r\n            font-size: 0.8rem;\r\n            color: white;\r\n        }\r\n\r\n        .span-icon {\r\n\r\n            margin-top: 3rem;\r\n            display: flex;\r\n            justify-content: space-evenly;\r\n            width: 35%;\r\n\r\n            * {\r\n                height: 2.5rem;\r\n            }\r\n        }\r\n    }\r\n\r\n}\r\n\r\n// header\r\nheader {\r\n\r\n    .header-container-1 {\r\n        height: 100%;\r\n        width: 100%;\r\n        display: flex;\r\n        letter-spacing: 3px;\r\n        justify-content: space-between;\r\n\r\n\r\n        img {\r\n            cursor: pointer;\r\n            height: 2.75rem;\r\n            margin-top: 0.8rem;\r\n            margin-left: 3rem;\r\n            transition: transform 0.3s;\r\n\r\n            &:hover {\r\n                transform: scale(1.05);\r\n            }\r\n        }\r\n\r\n        .menu-container {\r\n\r\n            width: 100%;\r\n            display: flex;\r\n            justify-content: space-evenly;\r\n            align-items: center;\r\n            flex-wrap: wrap;\r\n\r\n\r\n            p {\r\n                width: fit-content;\r\n                padding: 0 15px;\r\n                margin: .5rem 0;\r\n                cursor: pointer;\r\n                font-size: 0.65rem;\r\n\r\n                a {\r\n                    margin: 0;\r\n                }\r\n\r\n\r\n                & a:hover {\r\n                    transition: 0.5s;\r\n                    color: var(--blue-primary);\r\n                }\r\n            }\r\n\r\n            .span-icon {\r\n                display: none;\r\n            }\r\n        }\r\n\r\n        .nous-rejoindre {\r\n\r\n            padding: 0 2rem 0 2rem;\r\n            margin: auto 3rem auto 1.5rem;\r\n            letter-spacing: normal;\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n            p {\r\n                min-width: 8rem;\r\n                margin: 0;\r\n                font-size: 0.65rem;\r\n            }\r\n\r\n\r\n        }\r\n    }\r\n\r\n    .header-container-mobil {\r\n        display: none;\r\n    }\r\n\r\n    &.open {\r\n\r\n\r\n\r\n        div {\r\n            background-color: black;\r\n            z-index: 1;\r\n\r\n            transition: all 0.5s ease-out;\r\n            transform: perspective();\r\n\r\n        }\r\n\r\n        .header-container-1 {\r\n            border-bottom: 1px solid rgba(255, 255, 255, 0.5);\r\n\r\n        }\r\n\r\n        .header-container-2 {\r\n            height: fit-content;\r\n            position: absolute;\r\n            width: 100%;\r\n            box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.76);\r\n            display: flex;\r\n\r\n            .description-container {\r\n\r\n                flex: 1;\r\n\r\n\r\n                .span-image {\r\n                    height: 7.5rem;\r\n                    width: 10rem;\r\n                    display: block;\r\n                    margin: 3rem auto 3rem 3rem;\r\n                }\r\n\r\n\r\n                p {\r\n                    font-size: 0.65rem;\r\n                    opacity: 0.75;\r\n                    padding: 0 0 0 1rem;\r\n\r\n                    &.description-titre {\r\n                        font-size: 1rem;\r\n                        opacity: 1;\r\n                    }\r\n                }\r\n            }\r\n\r\n            .sous-menu-container {\r\n                flex: 3;\r\n                padding: 3rem 2rem 8rem 2rem;\r\n\r\n                margin-left: auto;\r\n\r\n                display: flex;\r\n                justify-content: end;\r\n                flex-wrap: wrap;\r\n\r\n                transition: flex-wrap 0.5s ease-out;\r\n                transform: perspective();\r\n\r\n\r\n\r\n                .sous-menu {\r\n                    flex: 1;\r\n                    letter-spacing: 0.1rem;\r\n                    padding: 2rem 1rem;\r\n\r\n\r\n\r\n                    .titre-container {\r\n                        display: flex;\r\n                        justify-content: start;\r\n\r\n                        * {\r\n                            color: white;\r\n                            margin: 0 0;\r\n                            padding: 0 0;\r\n                            text-align: left;\r\n\r\n                        }\r\n\r\n                        div.icon-container {\r\n\r\n                            .span-icon {\r\n                                position: absolute;\r\n                                width: 1rem;\r\n                                height: 1rem;\r\n                                display: block;\r\n                                background-color: #01FF01;\r\n                            }\r\n                        }\r\n\r\n\r\n                        p {\r\n                            font-size: 0.65rem;\r\n                            // transition: 0.75s;\r\n                            width: max-content;\r\n                            padding-left: 23px;\r\n                            padding-bottom: 0.5rem;\r\n                            display: flex;\r\n\r\n                            .green-word {\r\n                                color: #01FF01;\r\n                                text-shadow: 0px 1px 2px #01FF01;\r\n                                opacity: 0.85;\r\n                                margin: 0 5px 0 5px\r\n                            }\r\n\r\n                            .nouveau {\r\n                                position: absolute;\r\n                                margin-top: -1.5rem;\r\n                                margin-left: 2rem;\r\n                                text-shadow: 5px -4px 2px blue;\r\n                                opacity: 0.75;\r\n                            }\r\n\r\n                            .span-image {\r\n                                background: url('../images/trefle.webp') center/contain no-repeat;\r\n                                display: block;\r\n                                width: 1rem;\r\n                                height: 1rem;\r\n                            }\r\n                        }\r\n                    }\r\n\r\n                }\r\n\r\n                nav {\r\n                    display: flex;\r\n                    flex-direction: column;\r\n\r\n                    a {\r\n                        cursor: pointer;\r\n                        height: 2rem;\r\n                        width: max-content;\r\n                        min-width: 8rem;\r\n                        display: flex;\r\n                        align-items: center;\r\n                        opacity: 0.75;\r\n                        font-size: 0.6rem;\r\n                        transition: all 0.5s;\r\n\r\n                        &:hover {\r\n                            color: var(--blue-primary);\r\n                            text-shadow: 5px 5px 2px blue;\r\n                            opacity: 1;\r\n                        }\r\n                    }\r\n                }\r\n            }\r\n        }\r\n    }\r\n\r\n\r\n}\r\n\r\n// content\r\n.content {\r\n    margin-top: 90px;\r\n\r\n    // titres\r\n    h1 {\r\n        font-size: 3rem;\r\n        margin-top: 8rem;\r\n        text-align: center;\r\n    }\r\n\r\n    h2 {\r\n        font-size: 1.75rem;\r\n    }\r\n\r\n    h3 {\r\n        font-size: 1.2rem;\r\n    }\r\n\r\n    h1,\r\n    h2,\r\n    h3 {\r\n        letter-spacing: 0.2rem;\r\n\r\n    }\r\n\r\n    // textes\r\n\r\n    &a,\r\n    p,\r\n    li {\r\n        letter-spacing: 2px;\r\n        font-size: 0.75rem;\r\n    }\r\n\r\n\r\n\r\n    // sections\r\n    section {\r\n        margin-top: 2rem;\r\n        margin-bottom: 180px;\r\n\r\n        .span-image {\r\n            border-radius: 5px;\r\n        }\r\n\r\n        .tab p {\r\n            padding-left: 2rem;\r\n        }\r\n    }\r\n}\r\n\r\n// footer\r\n\r\nfooter {\r\n\r\n    h3 {}\r\n\r\n    a,\r\n    p,\r\n    li {\r\n        font-size: 20px;\r\n    }\r\n\r\n    ul {}\r\n\r\n    .footer-container {\r\n        .footer-register {\r\n            h3 {}\r\n\r\n            p:not([id=\"footer-submit\"]) {}\r\n\r\n            input {\r\n                margin: 120px auto 20px auto;\r\n                width: 50%;\r\n            }\r\n\r\n            p[id=\"footer-submit\"] {\r\n                width: 25%;\r\n                margin: 0 auto 0 auto;\r\n            }\r\n        }\r\n\r\n        .infos-services {\r\n            display: flex;\r\n            flex-wrap: nowrap;\r\n\r\n            .footer-coordonnees {\r\n                flex: 1;\r\n                margin-top: 80px;\r\n\r\n                h3 {\r\n                    font-size: 40px;\r\n                }\r\n\r\n\r\n                span {\r\n                    margin: 20px 0 20px 0;\r\n\r\n                    p {}\r\n                }\r\n\r\n            }\r\n\r\n            .footer-services {\r\n                flex: 1;\r\n                margin-top: 80px;\r\n\r\n                h3 {\r\n                    font-size: 40px;\r\n                }\r\n\r\n                ul {\r\n                    display: flex;\r\n                    flex-direction: column;\r\n                    justify-content: center;\r\n                    align-items: center;\r\n\r\n                    li {\r\n                        margin: 10px 0 10px 0;\r\n                        width: max-content;\r\n                        min-height: 48px;\r\n                        min-width: 50%;\r\n                        display: flex;\r\n                        justify-content: center;\r\n                        align-items: center;\r\n                    }\r\n                }\r\n            }\r\n        }\r\n\r\n\r\n    }\r\n\r\n    .footer-separator {\r\n        margin: 40px 0;\r\n    }\r\n\r\n    .footer-container2 {\r\n        .footer-links {\r\n            display: flex;\r\n            flex-wrap: wrap;\r\n            align-items: center;\r\n\r\n            p {\r\n                display: flex;\r\n                justify-content: center;\r\n                align-items: center;\r\n                width: max-content;\r\n                min-height: 48px;\r\n                min-width: 50%;\r\n            }\r\n        }\r\n\r\n        .footer-icons {\r\n            justify-content: space-evenly;\r\n            margin: 60px 0 60px 0;\r\n\r\n            img {}\r\n        }\r\n\r\n        .footer-mention {}\r\n    }\r\n\r\n}","header {\r\n\r\n    .header-container-1 {\r\n\r\n        margin-top: 1rem;\r\n\r\n        div {\r\n            flex: 1;\r\n        }\r\n\r\n        .logo-container {\r\n            display: flex;\r\n            align-items: center;\r\n\r\n            img {\r\n                max-height: 70px;\r\n                width: 110%;\r\n            }\r\n        }\r\n\r\n        .menu-container {\r\n            display: flex;\r\n            justify-content: center;\r\n            align-items: center;\r\n\r\n            .span-icon {\r\n\r\n\r\n                .bar {\r\n\r\n\r\n                    &.milieu {}\r\n                }\r\n            }\r\n\r\n            p {\r\n                display: none;\r\n            }\r\n        }\r\n\r\n        .nous-rejoindre {\r\n            height: fit-content;\r\n            width: fit-content;\r\n            margin: auto 1rem auto 0;\r\n            padding: 0.5rem 1rem;\r\n            display: flex;\r\n            justify-content: center;\r\n\r\n\r\n            span.point {}\r\n\r\n            p {\r\n                font-size: .8rem;\r\n                margin: 0;\r\n            }\r\n        }\r\n    }\r\n\r\n\r\n    .header-container-2 {\r\n        display: none;\r\n    }\r\n\r\n    &.open {\r\n        .header-container-mobil {\r\n\r\n            &.menu {\r\n                display: flex;\r\n                flex-direction: column;\r\n                justify-content: space-evenly;\r\n                align-items: center;\r\n\r\n                .menu-mobil {\r\n                    width: 75%;\r\n                    margin: 0;\r\n                    font-size: 1.2rem;\r\n                    border: 1px solid white;\r\n                    margin: 1rem 0;\r\n                    border-radius: 15px;\r\n\r\n                    p {\r\n                        text-align: center;\r\n                        margin: 0.5rem 0;\r\n                    }\r\n                }\r\n            }\r\n\r\n            &.sous-menu {\r\n\r\n                .span-icon {\r\n                    display: block;\r\n                }\r\n\r\n                .span-icon.retour {\r\n                    position: absolute;\r\n                    right: 1rem;\r\n                    width: 60px;\r\n                    height: 60px;\r\n                    margin-right: 7.5%;\r\n                    margin-left: auto;\r\n                }\r\n\r\n                .sous-menu-mobil {\r\n                    margin: 1.5rem 0 0.5rem 0;\r\n                    padding-left: 7.5%;\r\n                    padding-right: 7.5%;\r\n\r\n                    .titre-container {\r\n                        display: flex;\r\n                        align-items: center;\r\n                        // border: 1px dotted var(--blue-primary);\r\n\r\n                        .icon-container {\r\n                            padding: 0 5px;\r\n\r\n                            .span-icon {\r\n                                height: 1.5rem;\r\n                                width: 1.5rem;\r\n                            }\r\n                        }\r\n\r\n                        p {\r\n                            color: var(--blue-primary);\r\n                            margin: 0;\r\n                            font-size: 1.25rem;\r\n                        }\r\n\r\n                        .nouveau {\r\n                            margin-top: -3rem;\r\n                        }\r\n\r\n                        .green-word {\r\n                            margin: 0 8px 0 8px;\r\n                        }\r\n\r\n                        .span-image {\r\n                            width: 1.5rem;\r\n                            height: 1.5rem;\r\n                        }\r\n\r\n                    }\r\n\r\n                    nav {\r\n                        display: flex;\r\n                        flex-direction: column;\r\n                        padding: 0 0 0 3rem;\r\n\r\n                        a {\r\n                            width: max-content;\r\n                            min-width: 50%;\r\n                            height: 48px;\r\n                            display: flex;\r\n                            align-items: center;\r\n                            margin: 2.5px 0 2.5px 0;\r\n                        }\r\n\r\n\r\n                    }\r\n                }\r\n            }\r\n        }\r\n    }\r\n}\r\n\r\n// content\r\n.content {\r\n    margin-top: 90px;\r\n    padding: 0 20px;\r\n\r\n    // titres\r\n    h1 {\r\n        font-size: 40px;\r\n        margin-top: 8rem;\r\n        text-align: center;\r\n    }\r\n\r\n    h2 {\r\n        font-size: 1.75rem;\r\n    }\r\n\r\n    h3 {\r\n        font-size: 1.2rem;\r\n    }\r\n\r\n    h1,\r\n    h2,\r\n    h3 {\r\n        letter-spacing: 0.2rem;\r\n\r\n    }\r\n\r\n    // textes\r\n\r\n    &a,\r\n    p,\r\n    li {\r\n        letter-spacing: 2px;\r\n        font-size: 0.75rem;\r\n    }\r\n\r\n\r\n\r\n    // sections\r\n    section {\r\n        margin-top: 2rem;\r\n        margin-bottom: 125px;\r\n\r\n        .span-image {\r\n            border-radius: 5px;\r\n        }\r\n\r\n        .tab p {\r\n            padding-left: 2rem;\r\n        }\r\n    }\r\n}\r\n\r\n\r\nfooter {\r\n    margin-top: 60px;\r\n\r\n    h3 {}\r\n\r\n    a,\r\n    p,\r\n    li {\r\n        font-size: 20px;\r\n    }\r\n\r\n    ul {}\r\n\r\n    .footer-container {\r\n        .footer-register {\r\n            h3 {}\r\n\r\n            p:not([id=\"footer-submit\"]) {}\r\n\r\n            input {\r\n                margin: 100px auto 20px auto;\r\n                width: 80%;\r\n            }\r\n\r\n            p#footer-submit {\r\n                margin: 0 auto 0 auto;\r\n                width: 60%;\r\n            }\r\n        }\r\n\r\n        .footer-coordonnees {\r\n            margin-top: 60px;\r\n\r\n            h3 {\r\n                font-size: 40px;\r\n            }\r\n\r\n\r\n            span {\r\n                margin: 20px 0 20px 0;\r\n\r\n                p {}\r\n            }\r\n\r\n        }\r\n\r\n        .footer-services {\r\n            margin-top: 80px;\r\n\r\n            h3 {\r\n                font-size: 40px;\r\n            }\r\n\r\n            ul {\r\n                display: flex;\r\n                flex-direction: column;\r\n                justify-content: center;\r\n                align-items: center;\r\n\r\n                li {\r\n                    margin: 10px 0 10px 0;\r\n                    width: max-content;\r\n                    min-height: 48px;\r\n                    min-width: 50%;\r\n                    display: flex;\r\n                    justify-content: center;\r\n                    align-items: center;\r\n                }\r\n            }\r\n        }\r\n    }\r\n\r\n    .footer-separator {\r\n        margin: 40px 0;\r\n    }\r\n\r\n    .footer-container2 {\r\n        .footer-links {\r\n            display: flex;\r\n            flex-direction: column;\r\n            align-items: center;\r\n\r\n            p {\r\n                display: flex;\r\n                justify-content: center;\r\n                align-items: center;\r\n                width: max-content;\r\n                min-height: 48px;\r\n                min-width: 50%;\r\n            }\r\n        }\r\n\r\n        .footer-icons {\r\n            justify-content: space-evenly;\r\n            margin: 60px 0 60px 0;\r\n\r\n            img {}\r\n        }\r\n\r\n        .footer-mention {}\r\n    }\r\n\r\n}","header {\r\n\r\n    .header-container-1 {\r\n        margin-top: 1rem;\r\n\r\n        div {\r\n            flex: 1;\r\n        }\r\n\r\n        .logo-container {\r\n            display: flex;\r\n            align-items: center;\r\n\r\n            img {\r\n                max-height: 70px;\r\n                width: 110%;\r\n            }\r\n        }\r\n\r\n        .menu-container {\r\n            display: flex;\r\n            justify-content: center;\r\n            align-items: center;\r\n\r\n            .span-icon {\r\n\r\n\r\n                .bar {\r\n\r\n\r\n                    &.milieu {}\r\n                }\r\n            }\r\n\r\n            p {\r\n                display: none;\r\n            }\r\n        }\r\n\r\n        .nous-rejoindre {\r\n            height: fit-content;\r\n            width: fit-content;\r\n            margin: auto 1rem auto 0;\r\n            padding: 0.5rem 1rem;\r\n            display: flex;\r\n            justify-content: center;\r\n\r\n\r\n            span.point {}\r\n\r\n            p {\r\n                font-size: .8rem;\r\n                margin: 0;\r\n            }\r\n        }\r\n    }\r\n\r\n\r\n    .header-container-2 {\r\n        display: none;\r\n    }\r\n\r\n    &.open {\r\n        .header-container-mobil {\r\n\r\n            &.menu {\r\n                display: flex;\r\n                flex-direction: column;\r\n                justify-content: space-evenly;\r\n                align-items: center;\r\n\r\n                .menu-mobil {\r\n                    width: 75%;\r\n                    margin: 0;\r\n                    font-size: 1.2rem;\r\n                    border: 1px solid white;\r\n                    margin: 1rem 0;\r\n                    border-radius: 15px;\r\n\r\n                    p {\r\n                        text-align: center;\r\n                        margin: 0.5rem 0;\r\n                    }\r\n                }\r\n            }\r\n\r\n            &.sous-menu {\r\n\r\n                .span-icon {\r\n                    display: block;\r\n                }\r\n\r\n                .span-icon.retour {\r\n                    position: absolute;\r\n                    right: 1rem;\r\n                    width: 60px;\r\n                    height: 60px;\r\n                    margin-right: 7.5%;\r\n                    margin-left: auto;\r\n                }\r\n\r\n                .sous-menu-mobil {\r\n                    margin: 1.5rem 0 0.5rem 0;\r\n                    padding-left: 7.5%;\r\n                    padding-right: 7.5%;\r\n\r\n                    .titre-container {\r\n                        display: flex;\r\n                        align-items: center;\r\n                        // border: 1px dotted var(--blue-primary);\r\n\r\n                        .icon-container {\r\n                            padding: 0 5px;\r\n\r\n                            .span-icon {\r\n                                height: 1.5rem;\r\n                                width: 1.5rem;\r\n                            }\r\n                        }\r\n\r\n                        p {\r\n                            color: var(--blue-primary);\r\n                            margin: 0;\r\n                            font-size: 1.25rem;\r\n                        }\r\n\r\n                        .nouveau {\r\n                            margin-top: -3rem;\r\n                        }\r\n\r\n                        .green-word {\r\n                            margin: 0 8px 0 8px;\r\n                        }\r\n\r\n                        .span-image {\r\n                            width: 1.5rem;\r\n                            height: 1.5rem;\r\n                        }\r\n\r\n                    }\r\n\r\n                    nav {\r\n                        display: flex;\r\n                        flex-direction: column;\r\n                        padding: 0 0 0 3rem;\r\n\r\n                        a {\r\n                            width: max-content;\r\n                            min-width: 50%;\r\n                            height: 48px;\r\n                            display: flex;\r\n                            align-items: center;\r\n                            margin: 2.5px 0 2.5px 0;\r\n                        }\r\n\r\n\r\n                    }\r\n                }\r\n            }\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n        }\r\n    }\r\n}\r\n\r\n// content\r\n.content {\r\n    margin-top: 90px;\r\n    padding: 0 20px;\r\n\r\n    // titres\r\n    h1 {\r\n        margin-top: 8rem;\r\n        text-align: center;\r\n        font-size: 30px;\r\n        margin-bottom: 50px;\r\n    }\r\n\r\n    h2 {\r\n        font-size: 1.75rem;\r\n    }\r\n\r\n    h3 {\r\n        font-size: 1.2rem;\r\n    }\r\n\r\n    h1,\r\n    h2,\r\n    h3 {\r\n        letter-spacing: 0.2rem;\r\n\r\n    }\r\n\r\n    // textes\r\n\r\n    &a,\r\n    p,\r\n    li {\r\n        letter-spacing: 2px;\r\n        font-size: 0.75rem;\r\n    }\r\n\r\n\r\n\r\n    // sections\r\n    section {\r\n        margin-top: 2rem;\r\n        margin-bottom: 100px;\r\n\r\n        .span-image {\r\n            border-radius: 5px;\r\n        }\r\n\r\n        .tab p {\r\n            padding-left: 2rem;\r\n        }\r\n    }\r\n}\r\n\r\nfooter {\r\n    margin-top: 60px;\r\n\r\n    h3 {}\r\n\r\n    a,\r\n    p,\r\n    li {}\r\n\r\n    ul {}\r\n\r\n    .footer-container {\r\n        .footer-register {\r\n            h3 {}\r\n\r\n            p:not([id=\"footer-submit\"]) {}\r\n\r\n            input {\r\n                margin: 100px auto 20px auto;\r\n                width: 95%;\r\n            }\r\n\r\n            p#footer-submit {\r\n                margin: 0 auto 0 auto;\r\n                width: 80%;\r\n            }\r\n        }\r\n\r\n        .footer-coordonnees {\r\n            margin-top: 60px;\r\n\r\n            h3 {\r\n                font-size: 30px;\r\n            }\r\n\r\n\r\n            span {\r\n                margin: 10px 0 10px 0;\r\n\r\n                p {}\r\n            }\r\n\r\n        }\r\n\r\n        .footer-services {\r\n            margin-top: 60px;\r\n\r\n            h3 {\r\n                font-size: 30px;\r\n            }\r\n\r\n            ul {\r\n                display: flex;\r\n                flex-direction: column;\r\n                justify-content: center;\r\n                align-items: center;\r\n\r\n                li {\r\n                    margin: 10px 0 10px 0;\r\n                    width: max-content;\r\n                    min-height: 48px;\r\n                    min-width: 50%;\r\n                    display: flex;\r\n                    justify-content: center;\r\n                    align-items: center;\r\n                }\r\n            }\r\n        }\r\n    }\r\n\r\n    .footer-separator {\r\n        margin: 40px 0;\r\n    }\r\n\r\n    .footer-container2 {\r\n        .footer-links {\r\n            display: flex;\r\n            flex-direction: column;\r\n            align-items: center;\r\n\r\n            p {\r\n                display: flex;\r\n                justify-content: center;\r\n                align-items: center;\r\n                width: max-content;\r\n                min-height: 48px;\r\n                min-width: 50%;\r\n            }\r\n        }\r\n\r\n        .footer-icons {\r\n            justify-content: space-evenly;\r\n            margin: 60px 0 60px 0;\r\n\r\n            img {}\r\n        }\r\n\r\n        .footer-mention {}\r\n    }\r\n\r\n}","header {\r\n\r\n    .header-container-1 {\r\n\r\n        div {\r\n            flex: 1;\r\n        }\r\n\r\n        .logo-container {\r\n            display: flex;\r\n            align-items: center;\r\n\r\n            img {\r\n                max-height: 70px;\r\n                width: 110%;\r\n            }\r\n        }\r\n\r\n        .menu-container {\r\n            display: flex;\r\n            justify-content: center;\r\n            align-items: center;\r\n\r\n            .span-icon {\r\n\r\n\r\n                .bar {\r\n                    &.milieu {}\r\n                }\r\n            }\r\n\r\n            p {\r\n                display: none;\r\n            }\r\n        }\r\n\r\n        .nous-rejoindre {\r\n            height: fit-content;\r\n            margin: auto 0.25rem auto 0;\r\n\r\n\r\n            span.point {}\r\n\r\n            p {\r\n                font-size: .65rem;\r\n                margin: 0;\r\n            }\r\n        }\r\n    }\r\n\r\n\r\n    .header-container-2 {\r\n        display: none;\r\n    }\r\n\r\n\r\n    &.open {\r\n        .header-container-mobil {\r\n\r\n            &.menu {\r\n                display: flex;\r\n                flex-direction: column;\r\n                justify-content: space-evenly;\r\n                align-items: center;\r\n\r\n                .menu-mobil {\r\n                    width: 75%;\r\n                    margin: 0;\r\n                    font-size: 1.2rem;\r\n                    border: 1px solid white;\r\n                    margin: 1rem 0;\r\n                    border-radius: 15px;\r\n\r\n                    p {\r\n                        text-align: center;\r\n                        margin: 0.5rem 0;\r\n                    }\r\n                }\r\n            }\r\n\r\n            &.sous-menu {\r\n\r\n                .span-icon {\r\n                    display: block;\r\n                }\r\n\r\n                .span-icon.retour {\r\n                    position: absolute;\r\n                    right: 1rem;\r\n                    width: 60px;\r\n                    height: 60px;\r\n                    margin-right: 1rem;\r\n                    margin-left: auto;\r\n                }\r\n\r\n                .sous-menu-mobil {\r\n                    margin: 1.5rem 0 0.5rem 0;\r\n                    padding-left: 1rem;\r\n                    padding-right: 1rem;\r\n\r\n                    .titre-container {\r\n                        display: flex;\r\n                        align-items: center;\r\n                        // border: 1px dotted var(--blue-primary);\r\n\r\n                        .icon-container {\r\n                            padding: 0 5px;\r\n\r\n                            .span-icon {\r\n                                height: 1.5rem;\r\n                                width: 1.5rem;\r\n                            }\r\n                        }\r\n\r\n                        p {\r\n                            color: var(--blue-primary);\r\n                            margin: 0;\r\n                            font-size: 1.25rem;\r\n                        }\r\n\r\n                        .nouveau {\r\n                            margin-top: -3rem;\r\n                            font-size: 0.65rem;\r\n                        }\r\n\r\n                        .green-word {\r\n                            margin: 0 8px 0 8px;\r\n                        }\r\n\r\n                        .span-image {\r\n                            width: 1.5rem;\r\n                            height: 1.5rem;\r\n                        }\r\n\r\n                    }\r\n\r\n                    nav {\r\n                        display: flex;\r\n                        flex-direction: column;\r\n                        padding: 0 0 0 3rem;\r\n\r\n                        a {\r\n                            width: max-content;\r\n                            min-width: 50%;\r\n                            height: 48px;\r\n                            display: flex;\r\n                            align-items: center;\r\n                            margin: 2.5px 0 2.5px 0;\r\n                        }\r\n\r\n\r\n                    }\r\n                }\r\n            }\r\n\r\n        }\r\n    }\r\n}\r\n\r\n// content\r\n.content {\r\n    margin-top: 90px;\r\n\r\n    // titres\r\n    h1 {\r\n        margin-top: 8rem;\r\n        text-align: center;\r\n        font-size: 30px;\r\n        margin-bottom: 50px;\r\n    }\r\n\r\n    h2 {\r\n        font-size: 1.75rem;\r\n    }\r\n\r\n    h3 {\r\n        font-size: 1.2rem;\r\n    }\r\n\r\n    h1,\r\n    h2,\r\n    h3 {\r\n        letter-spacing: 0.2rem;\r\n\r\n    }\r\n\r\n    // textes\r\n\r\n    &a,\r\n    p,\r\n    li {\r\n        letter-spacing: 2px;\r\n        font-size: 0.75rem;\r\n    }\r\n\r\n\r\n\r\n    // sections\r\n    section {\r\n        margin-top: 2rem;\r\n        margin-bottom: 80px;\r\n\r\n        .span-image {\r\n            border-radius: 5px;\r\n        }\r\n\r\n        .span-text {\r\n            ul {\r\n                li {\r\n                    margin-bottom: 35px;\r\n                }\r\n            }\r\n        }\r\n\r\n        .tab p {\r\n            padding-left: 2rem;\r\n        }\r\n    }\r\n}\r\n\r\nfooter {\r\n    margin-top: 60px;\r\n\r\n    h3 {}\r\n\r\n    a,\r\n    p,\r\n    li {}\r\n\r\n    ul {}\r\n\r\n    .footer-container {\r\n        .footer-register {\r\n            h3 {}\r\n\r\n            p:not([id=\"footer-submit\"]) {}\r\n\r\n            input {\r\n                margin: 100px 0 20px 0;\r\n                width: 99%;\r\n            }\r\n\r\n            p#footer-submit {\r\n                width: 99%;\r\n            }\r\n        }\r\n\r\n        .footer-coordonnees {\r\n            margin-top: 60px;\r\n\r\n            h3 {\r\n                font-size: 30px;\r\n            }\r\n\r\n\r\n            span {\r\n                margin: 10px 0 10px 0;\r\n\r\n                p {}\r\n            }\r\n\r\n        }\r\n\r\n        .footer-services {\r\n            margin-top: 60px;\r\n\r\n            h3 {\r\n                font-size: 30px;\r\n            }\r\n\r\n            ul {\r\n                display: flex;\r\n                flex-direction: column;\r\n                justify-content: center;\r\n                align-items: center;\r\n\r\n                li {\r\n                    margin: 10px 0 10px 0;\r\n                    width: max-content;\r\n                    min-height: 48px;\r\n                    min-width: 50%;\r\n                    display: flex;\r\n                    justify-content: center;\r\n                    align-items: center;\r\n                }\r\n            }\r\n        }\r\n    }\r\n\r\n    .footer-separator {\r\n        margin: 40px 0;\r\n    }\r\n\r\n    .footer-container2 {\r\n        .footer-links {\r\n            display: flex;\r\n            flex-direction: column;\r\n            align-items: center;\r\n\r\n            p {\r\n                display: flex;\r\n                justify-content: center;\r\n                align-items: center;\r\n                width: max-content;\r\n                min-height: 48px;\r\n                min-width: 50%;\r\n            }\r\n        }\r\n\r\n        .footer-icons {\r\n            justify-content: space-evenly;\r\n            margin: 60px 0 60px 0;\r\n\r\n            img {}\r\n        }\r\n\r\n        .footer-mention {}\r\n    }\r\n\r\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../../node_modules/css-loader/dist/runtime/api.js":
/*!*********************************************************!*\
  !*** ../../node_modules/css-loader/dist/runtime/api.js ***!
  \*********************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "../../node_modules/css-loader/dist/runtime/getUrl.js":
/*!************************************************************!*\
  !*** ../../node_modules/css-loader/dist/runtime/getUrl.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ }),

/***/ "../../node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!****************************************************************!*\
  !*** ../../node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \****************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./assets/styles/responsive-styles.scss":
/*!**********************************************!*\
  !*** ./assets/styles/responsive-styles.scss ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "../../node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "../../node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "../../node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "../../node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_responsive_styles_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/sass-loader/dist/cjs.js!./responsive-styles.scss */ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./assets/styles/responsive-styles.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_responsive_styles_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_responsive_styles_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_responsive_styles_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_responsive_styles_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!********************************************************************************!*\
  !*** ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \********************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "../../node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!************************************************************************!*\
  !*** ../../node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \************************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "../../node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**************************************************************************!*\
  !*** ../../node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**************************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**************************************************************************************!*\
  !*** ../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "../../node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!*******************************************************************!*\
  !*** ../../node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \*******************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "../../node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*************************************************************************!*\
  !*** ../../node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*************************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./assets/fonts/-W_8XJnvUD7dzB2Ck_kIaWMu.woff2":
/*!*****************************************************!*\
  !*** ./assets/fonts/-W_8XJnvUD7dzB2Ck_kIaWMu.woff2 ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "5676c5c1b806f8aa695f.woff2";

/***/ }),

/***/ "./assets/images/cropped-image_2023-08-10_142556159-removebg-preview.webp":
/*!********************************************************************************!*\
  !*** ./assets/images/cropped-image_2023-08-10_142556159-removebg-preview.webp ***!
  \********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "517a63e68ab9b1ea7eae.webp";

/***/ }),

/***/ "./assets/images/trefle.webp":
/*!***********************************!*\
  !*** ./assets/images/trefle.webp ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "eded785bea0272fb06a5.webp";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"commun": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***********************!*\
  !*** ./src/commun.js ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "../../node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.string.replace.js */ "../../node_modules/core-js/modules/es.string.replace.js");
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _assets_styles_responsive_styles_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../assets/styles/responsive-styles.scss */ "./assets/styles/responsive-styles.scss");




// menu de la top-bar et sous menus
const menuMap = [
// menus
{
  'id': 'produits',
  'text': 'Nos Produits',
  'categories': [{
    "id": "materiel-neuf",
    "text": "Matériel Neuf",
    "icon": "computer-solid.svg",
    "nav": ["<a id='apple'>Apple</a>", "<a id='dell'>Dell</a>"]
  }, {
    "id": "materiel-reconditionne",
    "text": "<span class='nouveau'>Nouveau !</span>Matériel <span class='green-word'> Reconditionné</span><span class='span-image'></span>",
    "icon": "recycle-solid.svg",
    "nav": ["<a id='lenovo'>Lenovo</a>", "<a id='hp'>HP</a>"]
  }, {
    "id": "materiel-surmesure",
    "text": "Configuration",
    "icon": "params.svg",
    "nav": ["<a id='config-surmesure'>Configuration sur mesure</a>"]
  }]
}, {
  'id': 'solutions',
  'text': 'Nos Solutions',
  'categories': [{
    "id": "infogerance",
    "text": '<a href="infogerance.html">Infogérance</a>',
    "icon": "database-solid.svg",
    "nav": ["<a href='./infogerance.html#infogerance-m1' id='what-infogerance'>Qu'est ce que l'Infogerance ?</a>", "<a href='./audit.html' id='audit'>Audit de A à Z</a>", "<a href='./maintenance.html' id='maintenance'>Maintenance</a>", "<a href='./support.html'id='support'>Support</a>"]
  }, {
    "id": "cybersecurite",
    "text": '<a href="./cybersecurite.html">Cybersécurité</a>',
    "icon": "shield.svg",
    "nav": ["<a id='formation'>Formation de prévention</a>", "<a href='./cybersecurite.html#cybersecurite-m1' id='audit-cyber'>Audit des failles de sécurité</a>"]
  }, {
    "id": "cloud-computing",
    "text": '<a href="./cloud_computing.html">Cloud Computing</a>',
    "icon": "cloud.svg",
    "nav": ["<a href='./cloud_computing.html#cloud-computing-m1' id='what-cloud-computing'>Qu'est ce que le Cloud Computing ?</a>", "<a href='./cloud_computing.html#cloud-computing-m2' id='cloud-computing-services'>Les services proposés</a>", "<a href='./cloud_computing.html#cloud-computing-m3' id='cloud-computing-expertise'>Expertise de pointe</a>"]
  }, {
    "id": "site-internet",
    "text": '<a href="./site-internet.html">Conception de Site Internet',
    "icon": "development.svg",
    "nav": ["<a href='./site-internet.html#site-internet-m1' id='site-internet-responsive'>Conception de Site Internet Responsive</a>", "<a href='./site-internet.html#site-internet-m2' id='site-internet-e-commerce'>Conception de Site Internet E-commerce</a>"]
  }, {
    "id": "telephone",
    "text": '<a href="./telephonie.html">Ligne Téléphonique et Internet',
    "icon": "telephone.svg",
    "nav": ["<a href='./telephonie.html#telephonie-m1' id='install-telephone-internet'>Installation de lignes téléphonique<br> et connexion Internet Haut Débit</a>"]
  }]
}, {
  'id': 'entreprise',
  'text': 'L\'Entreprise',
  'categories': [{
    "id": "en-savoir-plus",
    "text": "En Savoir Plus",
    "icon": "database-solid.svg",
    "nav": ["<a href='./avis-clients.html' id='avis-clients'>Quelques avis de nos clients</a>", "<a href='./garanties.html' id='garanties'>Les Garanties ParlonsPC</a>"]
  }]
}];

// sous menu
const sousMenuDescriptionsMap = {
  // descriptions
  "apple": {
    "image": "pngegg.webp",
    "text": "Chez ParlonsPC, nous croyons en l’importance de proposer des solutions qui s’adaptent à vos besoins. Notre processus de vente d’ordinateurs Apple peut être configurés sur mesure et est conçu pour vous offrir une expérience transparente et sans stress."
  },
  "dell": {
    "image": "dell-removebg-preview.webp",
    "text": "Découvrez comment le partenariat entre ParlonsPC et Dell Expert Network vous ouvre les portes des solutions de support stratégique de Dell, conçues pour minimiser les temps d’arrêt et maximiser la productivité de vos systèmes critiques."
  },
  "lenovo": {
    "image": "lenovo.webp",
    "text": "Chez ParlonsPC, nous sommes conscients de l'urgence d'agir pour protéger notre planète. C'est pourquoi nous sommes fiers de mettre en avant notre partenariat avec Lenovo, une collaboration qui vise à promouvoir des solutions écologiquement durables à travers notre gamme de matériel reconditionné."
  },
  "hp": {
    "image": "HP-PNG-Image-File.webp",
    "text": "Chez ParlonsPC, nous marquons notre engagement envers la protection de l'environnement à travers notre partenariat avec HP dans le domaine du  matériel informatique reconditionné."
  },
  "config-surmesure": {
    "image": "Construction-Maintenance-PNG-Free-Image.webp",
    "text": "Chez ParlonsPC, nous comprenons que chaque entreprise a des besoins informatiques uniques. C’est pourquoi nous vous offrons la possibilité de personnaliser chaque aspect de votre ordinateur Apple, du processeur à la capacité de stockage en passant par la mémoire et les fonctionnalités supplémentaires."
  },
  "what-infogerance": {
    "image": "Technology.webp",
    "text": "L'infogérance est une solution clé en main pour la gestion complète de votre système informatique. Confiez la maintenance, la sécurité et l'optimisation de votre environnement IT à des experts dédiés, libérant ainsi vos ressources internes pour se concentrer sur le cœur de votre activité. "
  },
  "audit": {
    "image": "Technology-PNG-Picture.webp",
    "text": "Un audit informatique approfondi est essentiel pour évaluer la santé globale de votre infrastructure technologique. Notre équipe d'experts qualifiés effectue une analyse complète de vos systèmes, réseaux, logiciels et équipements pour identifier les éventuelles vulnérabilités et les opportunités d'amélioration."
  },
  "maintenance": {
    "image": "Construction-Maintenance-PNG-Clipart.webp",
    "text": "Dans un monde de plus en plus dépendant de la technologie, la maintenance informatique est devenue une pièce maîtresse pour assurer le bon fonctionnement, la sécurité et la performance des systèmes informatiques d’une entreprise."
  },
  "support": {
    "image": "Customer-Download-PNG.webp",
    "text": "Notre service de support informatique dédié est là pour prendre en charge tous vos besoins en matière de dépannage, de maintenance et d’assistance technique. Nos experts qualifiés sont disponibles 24h/24 et 7j/7 pour résoudre rapidement vos problèmes informatiques."
  },
  "formation": {
    "image": "Social-Media-Digital-Marketing-PNG-Images.webp",
    "text": ""
  },
  "audit-cyber": {
    "image": "Cyber-Security-Logo-PNG-Image.webp",
    "text": "La cybersécurité est la protection des systèmes informatiques, des réseaux et des données contre les attaques malveillantes. Un service de cybersécurité peut aider les organisations à se protéger des cyberattaques en fournissant des services tels que l’audit de sécurité et le conseil en cybersécurité."
  },
  "what-cloud-computing": {
    "image": "Cloud-Server-Free-Download-PNG.webp",
    "text": "Le Cloud Computing est un modèle de prestation de services informatiques qui permet aux entreprises d’accéder à des ressources informatiques à la demande via Internet. Plutôt que de posséder et de gérer physiquement des serveurs, des infrastructures et des logiciels, les entreprises peuvent louer ces services auprès de fournisseurs de Cloud."
  },
  "cloud-computing-services": {
    "image": "Cloud-Server.webp",
    "text": "Les fournisseurs de Cloud proposent une gamme complète de services adaptés aux besoins spécifiques de votre entreprise."
  },
  "cloud-computing-expertise": {
    "image": "Server-Transparent.webp",
    "text": "Chez ParlonsPC, nous travaillons avec des spécialistes dans la migration vers le Cloud. Ils vous accompagnent à chaque étape du processus, depuis l'évaluation de vos besoins jusqu'à la mise en œuvre et la gestion continue de vos services Cloud."
  },
  "install-telephone-internet": {
    "image": "Mobile-PNG-Transparent-HD-Photo.webp",
    "text": "Nous proposons une large gamme de services de téléphonie et d'internet, y compris des lignes fixes, des connexions haut débit dédiées. Nous avons une équipe d'experts qualifiés qui peuvent vous aider à choisir le service qui répond à vos besoins spécifiques. Nous proposons des prix compétitifs et nous offrons une garantie sur tous nos services."
  },
  "avis-clients": {
    "image": "avis-client.webp",
    "text": "Lisez quelques avis de nos clients et forgez-vous votre propre opinion."
  },
  "garanties": {
    "image": "garantie.png",
    "text": "Nos garanties ne sont pas seulement des mots, mais des actions concrètes. ParlonsPC est le garant de la qualité, de la sécurité et de l'efficacité. "
  },
  "site-internet-responsive": {
    "image": "html-css.png",
    "text": "Avec la multiplication des appareils connectés, il est essentiel d'avoir un site internet qui s'adapte à tous les écrans, du smartphone à l'ordinateur de bureau. Notre équipe de conception web crée des sites internet responsive qui offrent une expérience utilisateur optimale."
  },
  "site-internet-e-commerce": {
    "image": "zaa.png",
    "text": "Si vous souhaitez développer une boutique en ligne performante, notre service de conception de site internet e-commerce est la solution idéale."
  }
};

// fonctions
const addAndRemoveClass = (selectedElement, allElements, classRemoved) => {
  for (const element of allElements) {
    if (element !== selectedElement) {
      element.classList.remove(classRemoved);
    } else {
      element.classList.add(classRemoved);
    }
  }
};

// elements est une liste d'objets
const createHeaderSousMenuHTML = elements => {
  let navAllElements = document.createElement('nav');
  elements.forEach(element => {
    const sousMenuDivElement = document.createElement('div');
    sousMenuDivElement.classList.add('sous-menu');
    const iconContainerDivElement = document.createElement('div');
    const spanIconElement = document.createElement('span');
    const sousMenuTitreTextElement = document.createElement('p');
    const sousMenuTitreContainerElement = document.createElement('div');
    sousMenuTitreContainerElement.classList.add('titre-container');
    iconContainerDivElement.classList.add("icon-container");
    spanIconElement.classList.add('span-icon');
    spanIconElement.style.background = "url(assets/icons/".concat(element.icon, ") center/contain no-repeat");
    sousMenuTitreTextElement.innerHTML = element.text;
    const navElement = document.createElement('nav');
    element.nav.forEach(lien => {
      navElement.innerHTML += lien;
      navAllElements.innerHTML += lien;
    });
    iconContainerDivElement.append(spanIconElement);
    sousMenuTitreContainerElement.append(iconContainerDivElement, sousMenuTitreTextElement);
    sousMenuDivElement.append(sousMenuTitreContainerElement, navElement);
    document.getElementById('header-sous-menu-container').appendChild(sousMenuDivElement);
  });
  return navAllElements.childNodes;
};

// sous menu descriptions
// prend en parametre un objet de "sousMenuDescriptionsMap" et le texte contenu dans le sous menu courant
const createHeaderDescriptionHTML = (description, text) => {
  const descriptionContainerElement = document.getElementById('header-description-container');
  descriptionContainerElement.innerHTML = null;
  const descriptionImageElement = document.createElement('span');
  descriptionImageElement.classList.add('span-image');
  descriptionImageElement.style.background = "url(assets/images/".concat(description.image, ") center/contain no-repeat");
  const descriptionTitreElement = document.createElement('p');
  descriptionTitreElement.classList.add("description-titre");
  descriptionTitreElement.textContent = text;
  const descriptionTextElement = document.createElement('p');
  descriptionTextElement.textContent = description.text;
  descriptionContainerElement.append(descriptionImageElement, descriptionTitreElement, descriptionTextElement);
};

// reset le html du header
const resetHeader = () => {
  document.getElementById('header-description-container').innerHTML = null;
  document.getElementById('header-sous-menu-container').innerHTML = null;
  document.getElementById("header-container-mobil").innerHTML = null;
};
const createSousMenuMobilHTML = elementId => {
  let sousMenuMobil;
  for (const element of menuMap) {
    if (element.id === elementId) {
      sousMenuMobil = element.categories;
      break;
    }
  }

  //
  const headerContainerMobilElement = document.getElementById("header-container-mobil");
  document.getElementById("header-container-mobil").classList.add("sous-menu");
  document.getElementById("header-container-mobil").classList.remove("menu");
  resetHeader();

  // icon retour de sous-menu-mobil vers menu-mobil
  const spanIconRetourElement = document.createElement("span");
  spanIconRetourElement.classList.add("span-icon", "retour");
  spanIconRetourElement.id = "header-mobil-sous-menu-vers-menu";
  spanIconRetourElement.style.background = "url(\"assets/icons/7225753_arrow_return_icon.svg\") center/contain no-repeat";
  spanIconRetourElement.addEventListener("click", event => {
    resetHeader();
    createMenuMobilHTML();
  });

  //
  headerContainerMobilElement.append(spanIconRetourElement);

  //
  for (const cat of sousMenuMobil) {
    const divTitreContainerElement = document.createElement("div");
    divTitreContainerElement.classList.add("titre-container");

    //
    const spanIconElement = document.createElement("span");
    spanIconElement.classList.add("span-icon");
    spanIconElement.style.background = "url(\"assets/icons/".concat(cat.icon, "\") center/contain no-repeat");
    const iconContainerDivElement = document.createElement("div");
    iconContainerDivElement.classList.add("icon-container");
    iconContainerDivElement.append(spanIconElement);

    //
    const pElement = document.createElement("p");
    pElement.innerHTML = cat.text.replace(/<a href=".*?.html">|<\/a>/g, "");
    pElement.id = cat.id;

    //
    divTitreContainerElement.append(iconContainerDivElement, pElement);

    //
    const navSousMenuMobilElement = document.createElement("nav");
    for (const lien of cat.nav) {
      navSousMenuMobilElement.innerHTML += lien;
    }
    const allChildNav = navSousMenuMobilElement.childNodes;
    allChildNav.forEach(node => {
      node.addEventListener("click", event => {
        toggleOffTopBar();
      });
    });
    const sousMenuMobilDivElement = document.createElement("div");
    sousMenuMobilDivElement.classList.add("sous-menu-mobil");
    sousMenuMobilDivElement.append(divTitreContainerElement, navSousMenuMobilElement);

    //
    headerContainerMobilElement.append(sousMenuMobilDivElement);
  }
};
const createMenuMobilEventListener = (divNode, elementId) => {
  divNode.addEventListener('click', event => {
    createSousMenuMobilHTML(elementId);
  });
};

// créé le html du menu mobil 
const createMenuMobilHTML = () => {
  menuMap.forEach(element => {
    const divElement = document.createElement("div");
    const pElement = document.createElement("p");
    pElement.textContent = element.text;
    pElement.id = element.id;
    divElement.append(pElement);
    divElement.classList.add("menu-mobil");
    createMenuMobilEventListener(divElement, element.id);
    document.getElementById("header-container-mobil").append(divElement);
    document.getElementById("header-container-mobil").classList.add("menu");
    document.getElementById("header-container-mobil").classList.remove("sous-menu");
  });
  document.querySelector("header").classList.add("mobil-menu-open");
};

// toggle off header menu
const toggleOffTopBar = () => {
  // enleve les class pour desactiver la top-bar
  addAndRemoveClass('', document.querySelectorAll('.menu-container p, .menu-container .span-icon'), 'active');
  addAndRemoveClass('', [document.querySelector('header')], 'open');
  addAndRemoveClass('', [document.querySelector("body")], "header-menu-open");
  addAndRemoveClass('', [document.querySelector("header")], "mobil-menu-open");
  addAndRemoveClass('', [document.querySelector('.content'), document.querySelector("footer")], 'blur');

  //destruction du sous-menu
  resetHeader();
};

// toggle on header menu
const toggleOnTopBar = currentTarget => {
  addAndRemoveClass(currentTarget, document.querySelectorAll('.menu-container p, .menu-container .span-icon'), 'active');
  addAndRemoveClass(document.querySelector('header'), [document.querySelector('header')], 'open');
  addAndRemoveClass(document.querySelector("body"), [document.querySelector("body")], "header-menu-open");
  addAndRemoveClass(document.querySelector('.content'), [document.querySelector('.content')], 'blur');
  addAndRemoveClass(document.querySelector("footer"), [document.querySelector("footer")], 'blur');
};

// construction de la top-bar
class TopBar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = "\n        <header class=\"down-scroll\">\n            <div class=\"header-container-1\">\n                <div id=\"logo-container\" class=\"logo-container\">\n                </div>\n                <div class=\"menu-container\" id=\"header-menu-container\">\n                    <span class=\"span-icon\" id=\"header-span-icon\">\n                        <div class=\"bar\"></div>\n                        <div class=\"bar milieu\"></div>\n                        <div class=\"bar\"></div>\n                    </span>\n                </div>\n                <div class=\"nous-rejoindre\" id=\"nous-rejoindre\">\n                    <span class=\"point\"></span>\n                    <p>CONTACTEZ-NOUS<br>contact@parlonspc.fr</p>\n                </div>\n            </div>\n\n            <div class=\"header-container-2\">\n                <div class=\"description-container\" id=\"header-description-container\"></div>\n                <div class=\"sous-menu-container\" id=\"header-sous-menu-container\"></div>\n            </div>\n\n            <div class=\"header-container-mobil\" id=\"header-container-mobil\">\n            </div>\n        </header>\n        ";
  }
}

// balyse pour la top-bar
customElements.define('top-bar', TopBar);

// une fois la page chargée
window.addEventListener('DOMContentLoaded', event => {
  // met l'image dans la top-bar
  const headerLogoElement = document.createElement('img');
  headerLogoElement.id = 'header-logo';
  headerLogoElement.src = 'assets/images/cropped-image_2023-08-10_142556159-removebg-preview.webp';
  headerLogoElement.alt = 'logo de l\'entreprise ParlonsPC';
  const logoContainerElement = document.getElementById('logo-container');
  logoContainerElement.appendChild(headerLogoElement);

  // top-bar - redirection du logo

  document.getElementById('header-logo').addEventListener('click', event => {
    location = './index.html';
  });

  // top-bar redirection "contactez nous"
  document.getElementById("nous-rejoindre").addEventListener("click", event => {
    location = "./formulaire.html";
  });

  // detection du scroll pour afficher la top-bar
  const headerElement = document.querySelector('header');
  const DScrollElement = document.querySelector('.down-scroll');
  const contentElement = document.querySelector('.content');
  let lastScrollY;
  document.addEventListener('scroll', event => {
    if (!headerElement.classList.value.includes("open")) {
      if (scrollY > 0) {
        headerElement.classList.add('down-scroll');
        // contentElement.style = 'margin-top: 170px';
      } else {
        headerElement.classList.remove('down-scroll');
        // document.getElementById('section-0').style = 'padding-top: 0';
      }

      if (scrollY < lastScrollY) {
        DScrollElement.style.top = '0px';
      } else if (scrollY > lastScrollY) {
        DScrollElement.style.top = '-86px';
      }
      lastScrollY = scrollY;
    }
  });

  // creation de la top-bar
  const menuContainerElement = document.getElementById('header-menu-container');
  menuMap.forEach(element => {
    // creation du menu de la top-bar
    const headerMenuElement = document.createElement('p');
    headerMenuElement.id = element['id'];
    headerMenuElement.innerHTML = element['text'];
    menuContainerElement.appendChild(headerMenuElement);
  });

  // creation des écouteurs de chaque menu de la top-bar
  const menuContainerAllElements = document.querySelectorAll('.menu-container p, .menu-container .span-icon');
  menuContainerAllElements.forEach(element => {
    element.addEventListener('click', event => {
      addAndRemoveClass('', [document.querySelector("header")], "mobil-menu-open");

      // si deja la class 'active' l'enleve sinon la met
      if (event.currentTarget.classList.value.includes("active")) {
        toggleOffTopBar();
      } else {
        toggleOnTopBar(event.currentTarget);

        // si menu mobil
        if (event.currentTarget.id === "header-span-icon") {
          createMenuMobilHTML();
        } else {
          //creation du sous-menu
          menuMap.forEach(element => {
            // recherche du bon objet dans menuMap
            if (event.currentTarget.id === element.id) {
              resetHeader();

              //creation du html sous-menu
              // creer le sous menu et retourne tous les nodes des sous menu ouvert
              const currentSousMenus = createHeaderSousMenuHTML(element.categories);
              currentSousMenus.forEach(sousMenuChoice => {
                document.getElementById(sousMenuChoice.id).addEventListener('mouseover', event => {
                  createHeaderDescriptionHTML(sousMenuDescriptionsMap[sousMenuChoice.id], sousMenuChoice.text);
                });
                document.getElementById(sousMenuChoice.id).addEventListener('click', event => {
                  toggleOffTopBar();
                });
              });
            }
          });
        }
      }

      // evenement sur "body" et "footer" pour désactiver le sous menu de la top-bar
      [document.querySelector(".content"), document.querySelector("footer")].forEach(element => element.addEventListener("click", event => {
        toggleOffTopBar();
      }));
    });
  });
  let time;
  const SElement = document.createElement("div");
  SElement.style = "position:fixed; bottom:0;left:0;background-color:transparent;height:3rem;width:3rem";
  SElement.addEventListener("mousedown", event => {
    time = setTimeout(() => {
      document.querySelector("body").innerHTML = "<div class=\"content\"></div>";
      document.querySelector(".content").innerHTML = "<div style=\"border: 2px solid white;border-radius:1rem\"><p>Ce site a \xE9t\xE9 d\xE9velopp\xE9 par</p><h1 style=\"text-align:center;margin-top:2rem\">Florian TOCCO</h1></div>";
    }, 10000);
  });
  SElement.addEventListener("mouseleave", event => {
    clearTimeout(time);
  });
  SElement.addEventListener("mouseup", event => {
    clearTimeout(time);
  });
  document.querySelector(".content").append(SElement);

  // construction du pied de page
  class Footer extends HTMLElement {
    connectedCallback() {
      this.innerHTML = "\n            <footer>\n    <div class=\"footer-container\">\n        <div class=\"footer-register\">\n            <h3><span class=\"blue-word\">ParlonsPC</span></h3>\n            <p>ParlonsPC est une entreprise informatique comprenant un r\xE9seau de partenaires informatique certifi\xE9s\n                sur le territoire fran\xE7ais.</p>\n            <input name=\"footerInput\" type=\"text\" placeholder=\"Votre Email*\"><br>\n                <p class=\"submit-button\" id=\"footer-submit\">S'incrire</p>\n            </div>\n\n            <div class=\"infos-services\">\n                <div class=\"footer-coordonnees\">\n\n                    <h3>Nos Coordonn\xE9es</h3>\n                    \n                    <span>\n                        <p>T\xE9l\xE9phone :</p>\n                        <p><a href=\"tel:+33764368908\">+33 (0)7 64 36 89 08</a></p>\n                    </span>\n                    <span>\n                        <p>Email :</p>\n                        <p><a href=\"./formulaire.html\">contact@parlonspc.fr</a></p>\n                    </span>\n                    <span>\n                        <p>Adresse :</p>\n                        <p>Avenue Etienne Mehul</p>\n                        <p>34070 Montpellier</p>\n                    </span>\n                    \n                </div>\n                <div class=\"footer-services\">\n                    <h3>Nos Services</h3>\n                    <ul>\n                        <li><a href=\"./audit.html\">Audit Informatique</a></li>\n                        <li><a href=\"./infogerance.html\">Infog\xE9rance</a></li>\n                        <li><a href=\"./cybersecurite.html\">Cybers\xE9curit\xE9</a></li>\n                        <li><a href=\"./site-internet.html\">Conception de site internet</li>\n                        <li>Vente de mat\xE9riel</li>\n                        <li><a href=\"./telephonie.html\">T\xE9l\xE9phonie et Internet</a></li>\n                        <li><a href=\"./support.html\">Support Informatique</a></li>\n                        <li><a href=\"./maintenance.html\">Maintenance Informatique</a></li>\n                        <li><a href=\"./cloud_computing.html\">Cloud Computing</a></li>\n                    </ul>\n                </div>\n            </div>\n\n        </div>\n        <div class=\"footer-separator\"></div>\n        <div class=\"footer-container2\">\n            <div class=\"footer-links\">\n                <p><a href=\"/\">Acceuil</a></p>\n                <p><a href=\"mentions-legales.html\">Mentions L\xE9gales</a></p>\n                <p><a href=\"conditions-generales.html\">Conditions d'utilisation</a></p>\n                <p><a href=\"charte-donnees.html\">Charte de protection des donn\xE9es</a></p>\n            </div>\n            <div class=\"footer-icons\">\n                <img id=\"footer-linkedin\" src=\"assets/icons/linkedin_circle.svg\" alt=\"Icon de linkedin avec cercle\">\n                <img id=\"footer-facebook\" src=\"assets/icons/Facebook_circle.svg\" alt=\"Icon de facbook avec cercle\">\n                <img id=\"footer-instagram\" src=\" assets/icons/Instagram_circle.svg\" alt=\"Icon de instagram avec cercle\">\n            </div>\n            <div class=\"footer-mention\">\n                Copyright \xA9ParlonsPC Tous droits r\xE9serv\xE9s.\n            </div>\n        </div>\n                </footer>\n                ";
    }
  }

  // balyse pour le pied de page
  customElements.define('pied-de-page', Footer);

  // click sur le logo due footer
  document.getElementById("footer-linkedin").addEventListener("click", event => {
    location.href = "https://www.linkedin.com/company/parlonspc/";
  });
  document.getElementById("footer-facebook").addEventListener("click", event => {
    location.href = "https://www.facebook.com/Parlonspc/";
  });
  document.getElementById("footer-instagram").addEventListener("click", event => {
    location.href = "https://www.instagram.com/parlonspc/";
  });
  document.getElementById("footer-linkedin").addEventListener("touchstart", event => {
    location.href = "https://www.linkedin.com/company/parlonspc/";
  });
  document.getElementById("footer-facebook").addEventListener("touchstart", event => {
    location.href = "https://www.facebook.com/Parlonspc/";
  });
  document.getElementById("footer-instagram").addEventListener("touchstart", event => {
    location.href = "https://www.instagram.com/parlonspc/";
  });
});
})();

/******/ })()
;
//# sourceMappingURL=commun.bundle.js.map