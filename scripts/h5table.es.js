import require$$0, { forwardRef, useState, useRef, useEffect, useCallback, useMemo, useImperativeHandle } from "react";
var jsxRuntime = { exports: {} };
var reactJsxRuntime_development = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReactJsxRuntime_development;
function requireReactJsxRuntime_development() {
  if (hasRequiredReactJsxRuntime_development)
    return reactJsxRuntime_development;
  hasRequiredReactJsxRuntime_development = 1;
  if (process.env.NODE_ENV !== "production") {
    (function() {
      var React = require$$0;
      var REACT_ELEMENT_TYPE = Symbol.for("react.element");
      var REACT_PORTAL_TYPE = Symbol.for("react.portal");
      var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
      var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
      var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
      var REACT_PROVIDER_TYPE = Symbol.for("react.provider");
      var REACT_CONTEXT_TYPE = Symbol.for("react.context");
      var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
      var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
      var REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
      var REACT_MEMO_TYPE = Symbol.for("react.memo");
      var REACT_LAZY_TYPE = Symbol.for("react.lazy");
      var REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen");
      var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
      var FAUX_ITERATOR_SYMBOL = "@@iterator";
      function getIteratorFn(maybeIterable) {
        if (maybeIterable === null || typeof maybeIterable !== "object") {
          return null;
        }
        var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
        if (typeof maybeIterator === "function") {
          return maybeIterator;
        }
        return null;
      }
      var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      function error(format) {
        {
          {
            for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
              args[_key2 - 1] = arguments[_key2];
            }
            printWarning("error", format, args);
          }
        }
      }
      function printWarning(level, format, args) {
        {
          var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame;
          var stack = ReactDebugCurrentFrame2.getStackAddendum();
          if (stack !== "") {
            format += "%s";
            args = args.concat([stack]);
          }
          var argsWithFormat = args.map(function(item) {
            return String(item);
          });
          argsWithFormat.unshift("Warning: " + format);
          Function.prototype.apply.call(console[level], console, argsWithFormat);
        }
      }
      var enableScopeAPI = false;
      var enableCacheElement = false;
      var enableTransitionTracing = false;
      var enableLegacyHidden = false;
      var enableDebugTracing = false;
      var REACT_MODULE_REFERENCE;
      {
        REACT_MODULE_REFERENCE = Symbol.for("react.module.reference");
      }
      function isValidElementType(type) {
        if (typeof type === "string" || typeof type === "function") {
          return true;
        }
        if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing) {
          return true;
        }
        if (typeof type === "object" && type !== null) {
          if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
          // types supported by any Flight configuration anywhere since
          // we don't know which Flight build this will end up being used
          // with.
          type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== void 0) {
            return true;
          }
        }
        return false;
      }
      function getWrappedName(outerType, innerType, wrapperName) {
        var displayName = outerType.displayName;
        if (displayName) {
          return displayName;
        }
        var functionName = innerType.displayName || innerType.name || "";
        return functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName;
      }
      function getContextName(type) {
        return type.displayName || "Context";
      }
      function getComponentNameFromType(type) {
        if (type == null) {
          return null;
        }
        {
          if (typeof type.tag === "number") {
            error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.");
          }
        }
        if (typeof type === "function") {
          return type.displayName || type.name || null;
        }
        if (typeof type === "string") {
          return type;
        }
        switch (type) {
          case REACT_FRAGMENT_TYPE:
            return "Fragment";
          case REACT_PORTAL_TYPE:
            return "Portal";
          case REACT_PROFILER_TYPE:
            return "Profiler";
          case REACT_STRICT_MODE_TYPE:
            return "StrictMode";
          case REACT_SUSPENSE_TYPE:
            return "Suspense";
          case REACT_SUSPENSE_LIST_TYPE:
            return "SuspenseList";
        }
        if (typeof type === "object") {
          switch (type.$$typeof) {
            case REACT_CONTEXT_TYPE:
              var context = type;
              return getContextName(context) + ".Consumer";
            case REACT_PROVIDER_TYPE:
              var provider = type;
              return getContextName(provider._context) + ".Provider";
            case REACT_FORWARD_REF_TYPE:
              return getWrappedName(type, type.render, "ForwardRef");
            case REACT_MEMO_TYPE:
              var outerName = type.displayName || null;
              if (outerName !== null) {
                return outerName;
              }
              return getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE: {
              var lazyComponent = type;
              var payload = lazyComponent._payload;
              var init = lazyComponent._init;
              try {
                return getComponentNameFromType(init(payload));
              } catch (x) {
                return null;
              }
            }
          }
        }
        return null;
      }
      var assign = Object.assign;
      var disabledDepth = 0;
      var prevLog;
      var prevInfo;
      var prevWarn;
      var prevError;
      var prevGroup;
      var prevGroupCollapsed;
      var prevGroupEnd;
      function disabledLog() {
      }
      disabledLog.__reactDisabledLog = true;
      function disableLogs() {
        {
          if (disabledDepth === 0) {
            prevLog = console.log;
            prevInfo = console.info;
            prevWarn = console.warn;
            prevError = console.error;
            prevGroup = console.group;
            prevGroupCollapsed = console.groupCollapsed;
            prevGroupEnd = console.groupEnd;
            var props = {
              configurable: true,
              enumerable: true,
              value: disabledLog,
              writable: true
            };
            Object.defineProperties(console, {
              info: props,
              log: props,
              warn: props,
              error: props,
              group: props,
              groupCollapsed: props,
              groupEnd: props
            });
          }
          disabledDepth++;
        }
      }
      function reenableLogs() {
        {
          disabledDepth--;
          if (disabledDepth === 0) {
            var props = {
              configurable: true,
              enumerable: true,
              writable: true
            };
            Object.defineProperties(console, {
              log: assign({}, props, {
                value: prevLog
              }),
              info: assign({}, props, {
                value: prevInfo
              }),
              warn: assign({}, props, {
                value: prevWarn
              }),
              error: assign({}, props, {
                value: prevError
              }),
              group: assign({}, props, {
                value: prevGroup
              }),
              groupCollapsed: assign({}, props, {
                value: prevGroupCollapsed
              }),
              groupEnd: assign({}, props, {
                value: prevGroupEnd
              })
            });
          }
          if (disabledDepth < 0) {
            error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
          }
        }
      }
      var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
      var prefix;
      function describeBuiltInComponentFrame(name, source, ownerFn) {
        {
          if (prefix === void 0) {
            try {
              throw Error();
            } catch (x) {
              var match = x.stack.trim().match(/\n( *(at )?)/);
              prefix = match && match[1] || "";
            }
          }
          return "\n" + prefix + name;
        }
      }
      var reentry = false;
      var componentFrameCache;
      {
        var PossiblyWeakMap = typeof WeakMap === "function" ? WeakMap : Map;
        componentFrameCache = new PossiblyWeakMap();
      }
      function describeNativeComponentFrame(fn, construct) {
        if (!fn || reentry) {
          return "";
        }
        {
          var frame = componentFrameCache.get(fn);
          if (frame !== void 0) {
            return frame;
          }
        }
        var control;
        reentry = true;
        var previousPrepareStackTrace = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var previousDispatcher;
        {
          previousDispatcher = ReactCurrentDispatcher.current;
          ReactCurrentDispatcher.current = null;
          disableLogs();
        }
        try {
          if (construct) {
            var Fake = function() {
              throw Error();
            };
            Object.defineProperty(Fake.prototype, "props", {
              set: function() {
                throw Error();
              }
            });
            if (typeof Reflect === "object" && Reflect.construct) {
              try {
                Reflect.construct(Fake, []);
              } catch (x) {
                control = x;
              }
              Reflect.construct(fn, [], Fake);
            } else {
              try {
                Fake.call();
              } catch (x) {
                control = x;
              }
              fn.call(Fake.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (x) {
              control = x;
            }
            fn();
          }
        } catch (sample) {
          if (sample && control && typeof sample.stack === "string") {
            var sampleLines = sample.stack.split("\n");
            var controlLines = control.stack.split("\n");
            var s = sampleLines.length - 1;
            var c = controlLines.length - 1;
            while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
              c--;
            }
            for (; s >= 1 && c >= 0; s--, c--) {
              if (sampleLines[s] !== controlLines[c]) {
                if (s !== 1 || c !== 1) {
                  do {
                    s--;
                    c--;
                    if (c < 0 || sampleLines[s] !== controlLines[c]) {
                      var _frame = "\n" + sampleLines[s].replace(" at new ", " at ");
                      if (fn.displayName && _frame.includes("<anonymous>")) {
                        _frame = _frame.replace("<anonymous>", fn.displayName);
                      }
                      {
                        if (typeof fn === "function") {
                          componentFrameCache.set(fn, _frame);
                        }
                      }
                      return _frame;
                    }
                  } while (s >= 1 && c >= 0);
                }
                break;
              }
            }
          }
        } finally {
          reentry = false;
          {
            ReactCurrentDispatcher.current = previousDispatcher;
            reenableLogs();
          }
          Error.prepareStackTrace = previousPrepareStackTrace;
        }
        var name = fn ? fn.displayName || fn.name : "";
        var syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
        {
          if (typeof fn === "function") {
            componentFrameCache.set(fn, syntheticFrame);
          }
        }
        return syntheticFrame;
      }
      function describeFunctionComponentFrame(fn, source, ownerFn) {
        {
          return describeNativeComponentFrame(fn, false);
        }
      }
      function shouldConstruct(Component) {
        var prototype = Component.prototype;
        return !!(prototype && prototype.isReactComponent);
      }
      function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
        if (type == null) {
          return "";
        }
        if (typeof type === "function") {
          {
            return describeNativeComponentFrame(type, shouldConstruct(type));
          }
        }
        if (typeof type === "string") {
          return describeBuiltInComponentFrame(type);
        }
        switch (type) {
          case REACT_SUSPENSE_TYPE:
            return describeBuiltInComponentFrame("Suspense");
          case REACT_SUSPENSE_LIST_TYPE:
            return describeBuiltInComponentFrame("SuspenseList");
        }
        if (typeof type === "object") {
          switch (type.$$typeof) {
            case REACT_FORWARD_REF_TYPE:
              return describeFunctionComponentFrame(type.render);
            case REACT_MEMO_TYPE:
              return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
            case REACT_LAZY_TYPE: {
              var lazyComponent = type;
              var payload = lazyComponent._payload;
              var init = lazyComponent._init;
              try {
                return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
              } catch (x) {
              }
            }
          }
        }
        return "";
      }
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      var loggedTypeFailures = {};
      var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
      function setCurrentlyValidatingElement(element) {
        {
          if (element) {
            var owner = element._owner;
            var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
            ReactDebugCurrentFrame.setExtraStackFrame(stack);
          } else {
            ReactDebugCurrentFrame.setExtraStackFrame(null);
          }
        }
      }
      function checkPropTypes(typeSpecs, values, location, componentName, element) {
        {
          var has = Function.call.bind(hasOwnProperty);
          for (var typeSpecName in typeSpecs) {
            if (has(typeSpecs, typeSpecName)) {
              var error$1 = void 0;
              try {
                if (typeof typeSpecs[typeSpecName] !== "function") {
                  var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  err.name = "Invariant Violation";
                  throw err;
                }
                error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (ex) {
                error$1 = ex;
              }
              if (error$1 && !(error$1 instanceof Error)) {
                setCurrentlyValidatingElement(element);
                error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location, typeSpecName, typeof error$1);
                setCurrentlyValidatingElement(null);
              }
              if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
                loggedTypeFailures[error$1.message] = true;
                setCurrentlyValidatingElement(element);
                error("Failed %s type: %s", location, error$1.message);
                setCurrentlyValidatingElement(null);
              }
            }
          }
        }
      }
      var isArrayImpl = Array.isArray;
      function isArray(a) {
        return isArrayImpl(a);
      }
      function typeName(value) {
        {
          var hasToStringTag = typeof Symbol === "function" && Symbol.toStringTag;
          var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
          return type;
        }
      }
      function willCoercionThrow(value) {
        {
          try {
            testStringCoercion(value);
            return false;
          } catch (e) {
            return true;
          }
        }
      }
      function testStringCoercion(value) {
        return "" + value;
      }
      function checkKeyStringCoercion(value) {
        {
          if (willCoercionThrow(value)) {
            error("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", typeName(value));
            return testStringCoercion(value);
          }
        }
      }
      var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
      var RESERVED_PROPS = {
        key: true,
        ref: true,
        __self: true,
        __source: true
      };
      var specialPropKeyWarningShown;
      var specialPropRefWarningShown;
      var didWarnAboutStringRefs;
      {
        didWarnAboutStringRefs = {};
      }
      function hasValidRef(config) {
        {
          if (hasOwnProperty.call(config, "ref")) {
            var getter = Object.getOwnPropertyDescriptor(config, "ref").get;
            if (getter && getter.isReactWarning) {
              return false;
            }
          }
        }
        return config.ref !== void 0;
      }
      function hasValidKey(config) {
        {
          if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) {
              return false;
            }
          }
        }
        return config.key !== void 0;
      }
      function warnIfStringRefCannotBeAutoConverted(config, self) {
        {
          if (typeof config.ref === "string" && ReactCurrentOwner.current && self && ReactCurrentOwner.current.stateNode !== self) {
            var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);
            if (!didWarnAboutStringRefs[componentName]) {
              error('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', getComponentNameFromType(ReactCurrentOwner.current.type), config.ref);
              didWarnAboutStringRefs[componentName] = true;
            }
          }
        }
      }
      function defineKeyPropWarningGetter(props, displayName) {
        {
          var warnAboutAccessingKey = function() {
            if (!specialPropKeyWarningShown) {
              specialPropKeyWarningShown = true;
              error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
            }
          };
          warnAboutAccessingKey.isReactWarning = true;
          Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: true
          });
        }
      }
      function defineRefPropWarningGetter(props, displayName) {
        {
          var warnAboutAccessingRef = function() {
            if (!specialPropRefWarningShown) {
              specialPropRefWarningShown = true;
              error("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
            }
          };
          warnAboutAccessingRef.isReactWarning = true;
          Object.defineProperty(props, "ref", {
            get: warnAboutAccessingRef,
            configurable: true
          });
        }
      }
      var ReactElement = function(type, key, ref, self, source, owner, props) {
        var element = {
          // This tag allows us to uniquely identify this as a React Element
          $$typeof: REACT_ELEMENT_TYPE,
          // Built-in properties that belong on the element
          type,
          key,
          ref,
          props,
          // Record the component responsible for creating this element.
          _owner: owner
        };
        {
          element._store = {};
          Object.defineProperty(element._store, "validated", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: false
          });
          Object.defineProperty(element, "_self", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: self
          });
          Object.defineProperty(element, "_source", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: source
          });
          if (Object.freeze) {
            Object.freeze(element.props);
            Object.freeze(element);
          }
        }
        return element;
      };
      function jsxDEV(type, config, maybeKey, source, self) {
        {
          var propName;
          var props = {};
          var key = null;
          var ref = null;
          if (maybeKey !== void 0) {
            {
              checkKeyStringCoercion(maybeKey);
            }
            key = "" + maybeKey;
          }
          if (hasValidKey(config)) {
            {
              checkKeyStringCoercion(config.key);
            }
            key = "" + config.key;
          }
          if (hasValidRef(config)) {
            ref = config.ref;
            warnIfStringRefCannotBeAutoConverted(config, self);
          }
          for (propName in config) {
            if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
              props[propName] = config[propName];
            }
          }
          if (type && type.defaultProps) {
            var defaultProps = type.defaultProps;
            for (propName in defaultProps) {
              if (props[propName] === void 0) {
                props[propName] = defaultProps[propName];
              }
            }
          }
          if (key || ref) {
            var displayName = typeof type === "function" ? type.displayName || type.name || "Unknown" : type;
            if (key) {
              defineKeyPropWarningGetter(props, displayName);
            }
            if (ref) {
              defineRefPropWarningGetter(props, displayName);
            }
          }
          return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
        }
      }
      var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner;
      var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
      function setCurrentlyValidatingElement$1(element) {
        {
          if (element) {
            var owner = element._owner;
            var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
            ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
          } else {
            ReactDebugCurrentFrame$1.setExtraStackFrame(null);
          }
        }
      }
      var propTypesMisspellWarningShown;
      {
        propTypesMisspellWarningShown = false;
      }
      function isValidElement(object) {
        {
          return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
        }
      }
      function getDeclarationErrorAddendum() {
        {
          if (ReactCurrentOwner$1.current) {
            var name = getComponentNameFromType(ReactCurrentOwner$1.current.type);
            if (name) {
              return "\n\nCheck the render method of `" + name + "`.";
            }
          }
          return "";
        }
      }
      function getSourceInfoErrorAddendum(source) {
        {
          if (source !== void 0) {
            var fileName = source.fileName.replace(/^.*[\\\/]/, "");
            var lineNumber = source.lineNumber;
            return "\n\nCheck your code at " + fileName + ":" + lineNumber + ".";
          }
          return "";
        }
      }
      var ownerHasKeyUseWarning = {};
      function getCurrentComponentErrorInfo(parentType) {
        {
          var info = getDeclarationErrorAddendum();
          if (!info) {
            var parentName = typeof parentType === "string" ? parentType : parentType.displayName || parentType.name;
            if (parentName) {
              info = "\n\nCheck the top-level render call using <" + parentName + ">.";
            }
          }
          return info;
        }
      }
      function validateExplicitKey(element, parentType) {
        {
          if (!element._store || element._store.validated || element.key != null) {
            return;
          }
          element._store.validated = true;
          var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
          if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
            return;
          }
          ownerHasKeyUseWarning[currentComponentErrorInfo] = true;
          var childOwner = "";
          if (element && element._owner && element._owner !== ReactCurrentOwner$1.current) {
            childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
          }
          setCurrentlyValidatingElement$1(element);
          error('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);
          setCurrentlyValidatingElement$1(null);
        }
      }
      function validateChildKeys(node, parentType) {
        {
          if (typeof node !== "object") {
            return;
          }
          if (isArray(node)) {
            for (var i = 0; i < node.length; i++) {
              var child = node[i];
              if (isValidElement(child)) {
                validateExplicitKey(child, parentType);
              }
            }
          } else if (isValidElement(node)) {
            if (node._store) {
              node._store.validated = true;
            }
          } else if (node) {
            var iteratorFn = getIteratorFn(node);
            if (typeof iteratorFn === "function") {
              if (iteratorFn !== node.entries) {
                var iterator = iteratorFn.call(node);
                var step;
                while (!(step = iterator.next()).done) {
                  if (isValidElement(step.value)) {
                    validateExplicitKey(step.value, parentType);
                  }
                }
              }
            }
          }
        }
      }
      function validatePropTypes(element) {
        {
          var type = element.type;
          if (type === null || type === void 0 || typeof type === "string") {
            return;
          }
          var propTypes;
          if (typeof type === "function") {
            propTypes = type.propTypes;
          } else if (typeof type === "object" && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
          // Inner props are checked in the reconciler.
          type.$$typeof === REACT_MEMO_TYPE)) {
            propTypes = type.propTypes;
          } else {
            return;
          }
          if (propTypes) {
            var name = getComponentNameFromType(type);
            checkPropTypes(propTypes, element.props, "prop", name, element);
          } else if (type.PropTypes !== void 0 && !propTypesMisspellWarningShown) {
            propTypesMisspellWarningShown = true;
            var _name = getComponentNameFromType(type);
            error("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", _name || "Unknown");
          }
          if (typeof type.getDefaultProps === "function" && !type.getDefaultProps.isReactClassApproved) {
            error("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
          }
        }
      }
      function validateFragmentProps(fragment) {
        {
          var keys = Object.keys(fragment.props);
          for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (key !== "children" && key !== "key") {
              setCurrentlyValidatingElement$1(fragment);
              error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", key);
              setCurrentlyValidatingElement$1(null);
              break;
            }
          }
          if (fragment.ref !== null) {
            setCurrentlyValidatingElement$1(fragment);
            error("Invalid attribute `ref` supplied to `React.Fragment`.");
            setCurrentlyValidatingElement$1(null);
          }
        }
      }
      function jsxWithValidation(type, props, key, isStaticChildren, source, self) {
        {
          var validType = isValidElementType(type);
          if (!validType) {
            var info = "";
            if (type === void 0 || typeof type === "object" && type !== null && Object.keys(type).length === 0) {
              info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
            }
            var sourceInfo = getSourceInfoErrorAddendum(source);
            if (sourceInfo) {
              info += sourceInfo;
            } else {
              info += getDeclarationErrorAddendum();
            }
            var typeString;
            if (type === null) {
              typeString = "null";
            } else if (isArray(type)) {
              typeString = "array";
            } else if (type !== void 0 && type.$$typeof === REACT_ELEMENT_TYPE) {
              typeString = "<" + (getComponentNameFromType(type.type) || "Unknown") + " />";
              info = " Did you accidentally export a JSX literal instead of a component?";
            } else {
              typeString = typeof type;
            }
            error("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", typeString, info);
          }
          var element = jsxDEV(type, props, key, source, self);
          if (element == null) {
            return element;
          }
          if (validType) {
            var children = props.children;
            if (children !== void 0) {
              if (isStaticChildren) {
                if (isArray(children)) {
                  for (var i = 0; i < children.length; i++) {
                    validateChildKeys(children[i], type);
                  }
                  if (Object.freeze) {
                    Object.freeze(children);
                  }
                } else {
                  error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
                }
              } else {
                validateChildKeys(children, type);
              }
            }
          }
          if (type === REACT_FRAGMENT_TYPE) {
            validateFragmentProps(element);
          } else {
            validatePropTypes(element);
          }
          return element;
        }
      }
      function jsxWithValidationStatic(type, props, key) {
        {
          return jsxWithValidation(type, props, key, true);
        }
      }
      function jsxWithValidationDynamic(type, props, key) {
        {
          return jsxWithValidation(type, props, key, false);
        }
      }
      var jsx = jsxWithValidationDynamic;
      var jsxs = jsxWithValidationStatic;
      reactJsxRuntime_development.Fragment = REACT_FRAGMENT_TYPE;
      reactJsxRuntime_development.jsx = jsx;
      reactJsxRuntime_development.jsxs = jsxs;
    })();
  }
  return reactJsxRuntime_development;
}
var reactJsxRuntime_production_min = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReactJsxRuntime_production_min;
function requireReactJsxRuntime_production_min() {
  if (hasRequiredReactJsxRuntime_production_min)
    return reactJsxRuntime_production_min;
  hasRequiredReactJsxRuntime_production_min = 1;
  var f = require$$0, k = Symbol.for("react.element"), l = Symbol.for("react.fragment"), m = Object.prototype.hasOwnProperty, n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p = { key: true, ref: true, __self: true, __source: true };
  function q(c, a, g) {
    var b, d = {}, e = null, h = null;
    void 0 !== g && (e = "" + g);
    void 0 !== a.key && (e = "" + a.key);
    void 0 !== a.ref && (h = a.ref);
    for (b in a)
      m.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
    if (c && c.defaultProps)
      for (b in a = c.defaultProps, a)
        void 0 === d[b] && (d[b] = a[b]);
    return { $$typeof: k, type: c, key: e, ref: h, props: d, _owner: n.current };
  }
  reactJsxRuntime_production_min.Fragment = l;
  reactJsxRuntime_production_min.jsx = q;
  reactJsxRuntime_production_min.jsxs = q;
  return reactJsxRuntime_production_min;
}
if (process.env.NODE_ENV === "production") {
  jsxRuntime.exports = requireReactJsxRuntime_production_min();
} else {
  jsxRuntime.exports = requireReactJsxRuntime_development();
}
var jsxRuntimeExports = jsxRuntime.exports;
const Styles$4 = {
  "table-cell": "_table-cell_i1lht_1"
};
function H5TableCell({
  render,
  dataItem,
  index,
  dataValue
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: render ? render(dataItem, index) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: Styles$4["table-cell"], children: dataValue }) });
}
const pxToRem = (x, rootValue) => {
  return x / rootValue + "rem";
};
const cellSize = (size, rootValue) => {
  return pxToRem(size, rootValue);
};
const calculateRealRowHeight = (rowHeight, rootValue) => {
  const rem = Number(document.documentElement.style.fontSize.replace("px", ""));
  return Number(rowHeight / rootValue * rem);
};
const title = "_title_ylky1_1";
const ascending = "_ascending_ylky1_27";
const descending = "_descending_ylky1_31";
const Styles$3 = {
  title,
  "table-row-column": "_table-row-column_ylky1_5",
  "table-caret-wrapper": "_table-caret-wrapper_ylky1_14",
  "sort-caret": "_sort-caret_ylky1_20",
  ascending,
  descending,
  "is-ascending": "_is-ascending_ylky1_35",
  "is-descending": "_is-descending_ylky1_38",
  "first-table-row-column": "_first-table-row-column_ylky1_41"
};
const H5TableHeader = forwardRef(function H5TableHeader2({ height = 60, column, rootValue, handleHeadSortClick }, ref) {
  const [sortStatus, setSortStatus] = useState(
    {}
  );
  const changeSortStatus = (item) => {
    if (!item.dataIndex || !item.sortable)
      return;
    const type = sortStatus[item.dataIndex] || 0;
    const val = (type + 1) % 3;
    handleHeadSortClick(item.dataIndex, val);
    setSortStatus({ [item.dataIndex]: val });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: Styles$3["title"], children: column.map((columnItem, index) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: [
          Styles$3["table-row-column"],
          index === 0 ? Styles$3["first-table-row-column"] : ""
        ].join(" "),
        style: {
          width: cellSize(columnItem.width, rootValue),
          height: cellSize(height, rootValue),
          textAlign: columnItem.align || "center"
        },
        onClick: () => changeSortStatus(columnItem),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            H5TableCell,
            {
              dataValue: columnItem.title
            }
          ),
          columnItem.sortable && columnItem.dataIndex && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: [
                Styles$3["table-caret-wrapper"],
                sortStatus[columnItem.dataIndex] === 1 ? Styles$3["is-ascending"] : "",
                sortStatus[columnItem.dataIndex] === 2 ? Styles$3["is-descending"] : ""
              ].join(" "),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "i",
                  {
                    className: [Styles$3["sort-caret"], Styles$3["ascending"]].join(
                      " "
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "i",
                  {
                    className: [Styles$3["sort-caret"], Styles$3["descending"]].join(
                      " "
                    )
                  }
                )
              ]
            }
          )
        ]
      },
      index
    );
  }) });
});
const cell$2 = "_cell_1e4ej_20";
const left = "_left_1e4ej_27";
const right = "_right_1e4ej_31";
const center = "_center_1e4ej_35";
const Styles$2 = {
  "table-row": "_table-row_1e4ej_1",
  "table-row-column": "_table-row-column_1e4ej_6",
  "first-table-row-column": "_first-table-row-column_1e4ej_16",
  cell: cell$2,
  left,
  right,
  center
};
function H5TableRow({
  column,
  dataItem,
  height,
  rootValue,
  rowIndex,
  handleClick
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: Styles$2["table-row"], children: column.map((columnItem, index) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: [
          Styles$2["table-row-column"],
          index === 0 ? Styles$2["first-table-row-column"] : ""
        ].join(" "),
        style: {
          width: cellSize(columnItem.width, rootValue),
          height: cellSize(height, rootValue),
          textAlign: columnItem.align || "center"
        },
        onClick: () => {
          handleClick(rowIndex);
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          H5TableCell,
          {
            index: rowIndex,
            render: columnItem.render,
            dataItem,
            dataValue: dataItem[columnItem.dataIndex || ""]
          }
        )
      },
      index
    );
  }) });
}
const table = "_table_1n0a1_2";
const fixedHeader$1 = "_fixedHeader_1n0a1_10";
const cell$1 = "_cell_1n0a1_67";
const loading = "_loading_1n0a1_77";
const rowMarkContainer$1 = "_rowMarkContainer_1n0a1_83";
const mark$1 = "_mark_1n0a1_96";
const Styles$1 = {
  table,
  fixedHeader: fixedHeader$1,
  "table-header": "_table-header_1n0a1_15",
  "fixed-title-mark": "_fixed-title-mark_1n0a1_21",
  "first-column": "_first-column_1n0a1_41",
  "table-row-column": "_table-row-column_1n0a1_58",
  cell: cell$1,
  "first-column-move": "_first-column-move_1n0a1_73",
  loading,
  rowMarkContainer: rowMarkContainer$1,
  "fixed-title-more": "_fixed-title-more_1n0a1_89",
  mark: mark$1
};
function useDebounce(fn, delay) {
  const timerRef = useRef(null);
  const debounce = (...args) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    timerRef.current = setTimeout(() => {
      fn(...args);
    }, delay);
  };
  useEffect(() => {
    return () => {
      timerRef.current && clearTimeout(timerRef.current);
    };
  }, []);
  return debounce;
}
const getAngle = (x, y) => {
  return Math.atan2(y, x) * 180 / Math.PI;
};
const getTouchDirection = (x, y) => {
  if (Math.abs(x) > 5) {
    const angle = getAngle(x, y);
    if (angle >= -45 && angle <= 45) {
      return "right";
    } else if (angle >= 135 && angle <= 180 || angle >= -180 && angle < -135) {
      return "left";
    }
  } else {
    return "";
  }
};
function useTouchMoveLeftAndRight(target, options) {
  const distanceRef = useRef({ distanceX: 0, distanceY: 0 });
  const start = useRef({
    x: 0,
    y: 0
  });
  const end = useRef({
    x: 0,
    y: 0
  });
  useEffect(() => {
    const startHandle = (event) => {
      var _a;
      const touch = event.touches[0];
      if (touch) {
        start.current.x = touch.pageX;
        start.current.y = touch.pageY;
        (_a = options == null ? void 0 : options.touchstart) == null ? void 0 : _a.call(options, event);
      }
    };
    const moveHandle = (event) => {
      var _a;
      const touch = event.touches[0];
      if (touch) {
        end.current.x = touch.pageX;
        end.current.y = touch.pageY;
        const direction = getTouchDirection(
          end.current.x - start.current.x,
          end.current.y - start.current.y
        );
        distanceRef.current = {
          distanceX: end.current.x - start.current.x,
          distanceY: end.current.y - start.current.y
        };
        (_a = options == null ? void 0 : options.touchmove) == null ? void 0 : _a.call(options, event, direction, {
          distanceX: end.current.x - start.current.x,
          distanceY: end.current.y - start.current.y
        });
      }
    };
    const endHandle = (event) => {
      var _a;
      const touch = event.changedTouches[0];
      if (touch) {
        end.current.x = touch.pageX;
        end.current.y = touch.pageY;
        distanceRef.current = { distanceX: 0, distanceY: 0 };
        (_a = options == null ? void 0 : options.touchend) == null ? void 0 : _a.call(options, event);
      }
    };
    const targetRef = target.current;
    if (targetRef) {
      targetRef.addEventListener("touchstart", startHandle, { passive: false });
      targetRef.addEventListener("touchmove", moveHandle, { passive: false });
      targetRef.addEventListener("touchend", endHandle, { passive: false });
    }
    return () => {
      if (targetRef) {
        targetRef.removeEventListener("touchstart", startHandle);
        targetRef.removeEventListener("touchmove", moveHandle);
        targetRef.removeEventListener("touchend", endHandle);
      }
    };
  }, [options, target]);
  return { distanceRef };
}
function useScroll(target, handleScroll) {
  const handleScrollBase = useCallback(() => {
    handleScroll();
  }, [handleScroll]);
  useEffect(() => {
    const curRef = target.current;
    if (curRef) {
      curRef.addEventListener("scroll", handleScrollBase, {
        passive: false
      });
    }
    return () => {
      if (curRef) {
        curRef.removeEventListener("scroll", handleScrollBase);
      }
    };
  }, [target, handleScrollBase]);
}
function useGetTransformX(target, tableWidth, tableContentWidth, disable, bottomLoadEvent, offset, handleTransform, stopPropagation = true) {
  const previousXRef = useRef(0);
  const transformXRef = useRef(0);
  const resetMove = () => {
    previousXRef.current = 0;
    transformXRef.current = 0;
    handleTransform(0);
  };
  const handleBottom = () => {
    if (target.current) {
      if (target.current.scrollHeight - target.current.scrollTop < target.current.clientHeight + offset) {
        disable && bottomLoadEvent();
      }
    }
  };
  const touchend = () => {
    previousXRef.current = transformXRef.current;
  };
  const touchmove = useCallback(
    (event, direction, curDistance) => {
      var _a;
      if (direction) {
        event.cancelable && event.preventDefault();
        const max = tableContentWidth - tableWidth;
        if (max > 0) {
          const temp = Math.min(
            previousXRef.current + curDistance.distanceX,
            0
          );
          const res = Math.max(-max, temp);
          transformXRef.current = res;
          handleTransform(res);
        }
      }
      if (stopPropagation) {
        if (((_a = target.current) == null ? void 0 : _a.scrollTop) !== 0) {
          event.stopPropagation();
        }
      }
    },
    [handleTransform, stopPropagation, tableContentWidth, tableWidth, target]
  );
  const { distanceRef } = useTouchMoveLeftAndRight(target, {
    touchmove,
    touchend
  });
  const handleScroll = () => {
    if (distanceRef.current.distanceY <= 0) {
      handleBottom();
    }
  };
  useScroll(target, handleScroll);
  useEffect(() => {
    handleBottom();
  }, []);
  return { distanceRef, resetMove };
}
function useResize(fn) {
  useEffect(() => {
    fn.forEach((item) => {
      window.addEventListener("resize", item);
    });
  }, [fn]);
}
function useCalculateTableSize(tableRef, rowHeight, showRowNum, minTableHeight, rootValue, column) {
  const [tableWidth, setTableWidth] = useState(0);
  const [tableContentWidth, setTableContentWidth] = useState(0);
  const tableHeight = useMemo(() => {
    return Math.max(rowHeight * showRowNum, minTableHeight);
  }, [rowHeight, showRowNum, minTableHeight]);
  const calculateTableContent = () => {
    const rem = Number(
      document.documentElement.style.fontSize.replace("px", "")
    );
    const width = column.reduce((a, b) => {
      return a + b.width;
    }, 0);
    setTableContentWidth(width * rem / rootValue);
  };
  const calculateTableWidth = () => {
    if (tableRef.current) {
      setTableWidth(tableRef.current.clientWidth);
    }
  };
  useResize([calculateTableContent, calculateTableWidth]);
  useEffect(() => {
    calculateTableContent();
    calculateTableWidth();
  }, []);
  return { tableWidth, tableContentWidth, tableHeight };
}
function H5Table({
  column,
  tableData,
  headerHeight = 80,
  rowKey = "id",
  rowHeight = 100,
  rootValue = 75,
  showRowNum = 6,
  minTableHeight = 600,
  disable = false,
  clickOptions,
  pullDownProps = {
    offset: 10,
    error: false,
    // 数据加载失败
    loading: false,
    // 数据处于加载状态
    finish: false,
    // 数据 是否完全加载
    loadingText: "加载中...",
    // 加载文案
    errorText: "出错了",
    // 失败文案
    finishedText: "到底了"
    // 完成文案
  },
  changePullDownProps = () => {
  },
  handleHeadSortClick,
  onload = () => {
  }
}) {
  const tableRef = useRef();
  const tableHeaderRef = useRef();
  const tableContentRef = useRef();
  const { tableHeight, tableWidth, tableContentWidth } = useCalculateTableSize(
    tableRef,
    rowHeight,
    showRowNum,
    minTableHeight,
    rootValue,
    column
  );
  const [moreMark, setMoreMark] = useState(false);
  const [moveShadow, setMoveShadow] = useState(false);
  const [clickIndex, setClickIndex] = useState(-1);
  const bottomLoadEvent = () => {
    if (pullDownProps.finish)
      return;
    if (!pullDownProps.loading) {
      changePullDownProps({
        ...pullDownProps,
        loading: true
      });
      onload();
    }
  };
  const tryAgain = () => {
    if (pullDownProps.error) {
      changePullDownProps({
        ...pullDownProps,
        error: false
      });
      setTimeout(() => {
        onload();
      });
    }
  };
  const loadingText = useMemo(() => {
    let str = "";
    if (pullDownProps.loading) {
      str = pullDownProps.loadingText || "";
    }
    if (pullDownProps.finish) {
      str = pullDownProps.finishedText || "";
    }
    if (pullDownProps.error) {
      str = pullDownProps.errorText || "";
    }
    return str;
  }, [pullDownProps]);
  const handleTransform = (val) => {
    if (tableHeaderRef.current) {
      tableHeaderRef.current.style.transform = `translateX(${val}px)`;
    }
    if (tableContentRef.current) {
      tableContentRef.current.style.transform = `translateX(${val}px)`;
    }
    setMoveShadow(val < 0);
    handleTouchBottom(val);
  };
  const handleTouchBottom = useDebounce((distanceX) => {
    if (tableRef.current) {
      const temp = tableContentWidth - (tableWidth - distanceX);
      if (temp >= 0 && temp < 10) {
        setMoreMark(false);
      } else {
        setMoreMark(true);
      }
    }
  }, 200);
  const { distanceRef, resetMove } = useGetTransformX(
    tableRef,
    tableWidth,
    tableContentWidth,
    disable,
    bottomLoadEvent,
    pullDownProps.offset,
    handleTransform
  );
  const firstColumn = column[0];
  const handleCellSize = (num) => {
    return cellSize(num, rootValue);
  };
  const handleHeadSortClickBase = (dataIndex, val) => {
    setClickIndex(-1);
    handleHeadSortClick && handleHeadSortClick(dataIndex, val);
  };
  const handleClick = (index) => {
    if (!clickOptions)
      return;
    if (Math.abs(distanceRef.current.distanceX) < 20 && Math.abs(distanceRef.current.distanceY) < 20) {
      setClickIndex((state) => {
        return state === index ? -1 : index;
      });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: Styles$1["table-header"], children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: [
            Styles$1["fixed-title-mark"],
            moveShadow ? Styles$1["first-column-move"] : ""
          ].join(" "),
          style: {
            width: handleCellSize(firstColumn.width),
            height: handleCellSize(headerHeight),
            textAlign: firstColumn.align || "center"
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(H5TableCell, { dataValue: firstColumn.title })
        }
      ),
      moreMark && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: Styles$1["fixed-title-more"],
          style: {
            height: handleCellSize(headerHeight)
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: Styles$1["mark"] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        H5TableHeader,
        {
          ref: tableHeaderRef,
          column,
          rootValue,
          height: headerHeight,
          handleHeadSortClick: handleHeadSortClickBase
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        ref: tableRef,
        className: Styles$1["table"],
        style: {
          height: handleCellSize(tableHeight)
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "section",
            {
              className: [
                Styles$1["first-column"],
                moveShadow ? Styles$1["first-column-move"] : ""
              ].join(" "),
              style: {
                width: handleCellSize(firstColumn.width)
              },
              children: tableData.map((item, index) => {
                return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: [
                        Styles$1["table-row-column"],
                        Styles$1["first-table-row-column"]
                      ].join(" "),
                      style: {
                        width: handleCellSize(firstColumn.width),
                        height: handleCellSize(rowHeight),
                        textAlign: firstColumn.align || "center"
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        H5TableCell,
                        {
                          dataValue: item[firstColumn.dataIndex || ""],
                          render: firstColumn.render,
                          dataItem: item
                        }
                      )
                    }
                  ),
                  clickOptions && clickIndex === index && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: {
                        height: handleCellSize(clickOptions.clickHeight)
                      }
                    }
                  )
                ] }, item[rowKey]);
              })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("section", { ref: tableContentRef, children: tableData.map((item, index) => {
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: Styles$1["table-row"], children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                H5TableRow,
                {
                  column,
                  height: rowHeight,
                  rootValue,
                  dataItem: item,
                  rowIndex: index,
                  handleClick
                }
              ),
              clickOptions && clickIndex === index && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    height: handleCellSize(clickOptions.clickHeight)
                  }
                }
              )
            ] }, item[rowKey]);
          }) }),
          disable && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: Styles$1["loading"], onClick: tryAgain, children: loadingText }),
          clickOptions && clickIndex !== -1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: Styles$1["rowMarkContainer"],
              style: {
                top: handleCellSize(rowHeight * (clickIndex + 1))
              },
              children: clickOptions.clickRender(tableData[clickIndex], clickIndex)
            }
          )
        ]
      }
    )
  ] });
}
const virtualTable = "_virtualTable_rr830_2";
const fixedHeader = "_fixedHeader_rr830_10";
const cell = "_cell_rr830_67";
const rowMarkContainer = "_rowMarkContainer_rr830_82";
const mark = "_mark_rr830_95";
const Styles = {
  virtualTable,
  fixedHeader,
  "table-header": "_table-header_rr830_15",
  "fixed-title-mark": "_fixed-title-mark_rr830_21",
  "first-column": "_first-column_rr830_41",
  "table-row-column": "_table-row-column_rr830_58",
  cell,
  "first-column-move": "_first-column-move_rr830_73",
  "table-content": "_table-content_rr830_77",
  rowMarkContainer,
  "fixed-title-more": "_fixed-title-more_rr830_88",
  mark
};
function useHandleMove(list, options) {
  const {
    target,
    tableWidth,
    tableContentWidth,
    handleTransform,
    rowHeight,
    overScan = 5,
    stopPropagation = true
  } = options;
  const previousXRef = useRef(0);
  const transformXRef = useRef(0);
  const [translateY, setTranslateY] = useState(0);
  const [targetList, setTargetList] = useState(
    []
  );
  const resetMove = () => {
    previousXRef.current = 0;
    transformXRef.current = 0;
    handleTransform(0);
  };
  const getOffset = (scrollTop) => {
    return Math.floor(scrollTop / rowHeight) + 1;
  };
  const getVisibleCount = (containerHeight) => {
    return Math.ceil(containerHeight / rowHeight);
  };
  const getDistanceTop = (index) => {
    return index * rowHeight;
  };
  const calculateRange = () => {
    const container = target.current;
    if (container) {
      const { scrollTop, clientHeight } = container;
      console.log("scrollTop----", scrollTop);
      const offset = getOffset(scrollTop);
      const visibleCount = getVisibleCount(clientHeight);
      const start = Math.max(0, offset - overScan);
      const end = Math.min(list.length, offset + visibleCount + overScan);
      const offsetTop = getDistanceTop(start);
      setTranslateY(offsetTop);
      setTargetList(
        list.slice(start, end).map((ele, index) => ({
          data: ele,
          index: index + start
        }))
      );
    }
  };
  const touchend = () => {
    previousXRef.current = transformXRef.current;
  };
  const touchmove = useCallback(
    (event, direction, curDistance) => {
      var _a;
      if (direction) {
        event.cancelable && event.preventDefault();
        const max = tableContentWidth - tableWidth;
        if (max > 0) {
          const temp = Math.min(
            previousXRef.current + curDistance.distanceX,
            0
          );
          const res = Math.max(-max, temp);
          transformXRef.current = res;
          handleTransform(res);
        }
      }
      if (stopPropagation) {
        if (((_a = target.current) == null ? void 0 : _a.scrollTop) !== 0) {
          event.stopPropagation();
        }
      }
    },
    [handleTransform, stopPropagation, tableContentWidth, tableWidth, target]
  );
  const { distanceRef } = useTouchMoveLeftAndRight(target, {
    touchmove,
    touchend
  });
  const handleScroll = () => {
    calculateRange();
  };
  const scrollTo = (index) => {
    console.log("scrollTo----", index, getDistanceTop(index));
    target.current.scrollTop = getDistanceTop(index);
  };
  useScroll(target, handleScroll);
  useEffect(() => {
    calculateRange();
    resetMove();
  }, [list]);
  return { distanceRef, resetMove, targetList, translateY, scrollTo };
}
function H5VirtualTable({
  column,
  tableData,
  headerHeight = 80,
  rowKey = "id",
  rowHeight = 100,
  rootValue = 75,
  showRowNum = 6,
  minTableHeight = 600,
  clickOptions,
  handleHeadSortClick
}, ref) {
  const tableRef = useRef();
  const tableHeaderRef = useRef();
  const tableContentRef = useRef();
  const firstColumn = column[0];
  const [moveShadow, setMoveShadow] = useState(false);
  const [moreMark, setMoreMark] = useState(false);
  const [clickIndex, setClickIndex] = useState(-1);
  const { tableHeight, tableWidth, tableContentWidth } = useCalculateTableSize(
    tableRef,
    rowHeight,
    showRowNum,
    minTableHeight,
    rootValue,
    column
  );
  const handleTransform = (val) => {
    if (tableHeaderRef.current) {
      tableHeaderRef.current.style.transform = `translateX(${val}px)`;
    }
    if (tableContentRef.current) {
      tableContentRef.current.style.transform = `translateX(${val}px)`;
    }
    setMoveShadow(val < 0);
    handleNeedShowMore(val);
  };
  const handleNeedShowMore = useDebounce((distanceX) => {
    if (tableRef.current) {
      const temp = tableContentWidth - (tableWidth - distanceX);
      if (temp >= 0 && temp < 10) {
        setMoreMark(false);
      } else {
        setMoreMark(true);
      }
    }
  }, 200);
  const { distanceRef, targetList, translateY, scrollTo } = useHandleMove(
    tableData,
    {
      target: tableRef,
      tableWidth,
      tableContentWidth,
      rowHeight: calculateRealRowHeight(rowHeight, rootValue),
      handleTransform,
      overScan: 20
    }
  );
  const handleClick = (index) => {
    if (!clickOptions)
      return;
    if (Math.abs(distanceRef.current.distanceX) < 20 && Math.abs(distanceRef.current.distanceY) < 20) {
      setClickIndex((state) => {
        return state === index ? -1 : index;
      });
    }
  };
  const handleCellSize = (num) => {
    return cellSize(num, rootValue);
  };
  const handleHeadSortClickBase = (dataIndex, val) => {
    setClickIndex(-1);
    handleHeadSortClick && handleHeadSortClick(dataIndex, val);
  };
  useImperativeHandle(ref, () => ({
    scrollIntoView: (index) => {
      scrollTo(index);
    }
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: Styles["table-header"], children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: [
            Styles["fixed-title-mark"],
            moveShadow ? Styles["first-column-move"] : ""
          ].join(" "),
          style: {
            width: handleCellSize(firstColumn.width),
            height: handleCellSize(headerHeight),
            textAlign: firstColumn.align || "center"
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(H5TableCell, { dataValue: firstColumn.title })
        }
      ),
      moreMark && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: Styles["fixed-title-more"],
          style: {
            height: handleCellSize(headerHeight)
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: Styles["mark"] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        H5TableHeader,
        {
          ref: tableHeaderRef,
          column,
          rootValue,
          height: headerHeight,
          handleHeadSortClick: handleHeadSortClickBase
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        ref: tableRef,
        className: Styles["virtualTable"],
        style: {
          height: handleCellSize(tableHeight)
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                position: "relative",
                overflow: "hidden",
                height: handleCellSize(rowHeight * tableData.length)
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "section",
            {
              className: [
                Styles["first-column"],
                moveShadow ? Styles["first-column-move"] : ""
              ].join(" "),
              style: {
                top: translateY + "px",
                width: handleCellSize(firstColumn.width)
              },
              children: targetList.map((item) => {
                return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: [
                        Styles["table-row-column"],
                        Styles["first-table-row-column"]
                      ].join(" "),
                      style: {
                        width: handleCellSize(firstColumn.width),
                        height: handleCellSize(rowHeight),
                        textAlign: firstColumn.align || "center"
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        H5TableCell,
                        {
                          dataValue: item.data[firstColumn.dataIndex || ""],
                          render: firstColumn.render,
                          dataItem: item.data
                        }
                      )
                    }
                  ),
                  clickOptions && clickIndex === item.index && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: {
                        height: handleCellSize(clickOptions.clickHeight)
                      }
                    }
                  )
                ] }, item.data[rowKey]);
              })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "section",
            {
              className: Styles["table-content"],
              style: {
                top: translateY + "px"
              },
              ref: tableContentRef,
              children: targetList.map((item) => {
                return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: Styles["table-row"], children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    H5TableRow,
                    {
                      column,
                      height: rowHeight,
                      rootValue,
                      dataItem: item.data,
                      rowIndex: item.index,
                      handleClick
                    }
                  ),
                  clickOptions && clickIndex === item.index && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: {
                        height: handleCellSize(clickOptions.clickHeight)
                      }
                    }
                  )
                ] }, item.data[rowKey]);
              })
            }
          ),
          clickOptions && clickIndex !== -1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: Styles["rowMarkContainer"],
              style: {
                top: handleCellSize(rowHeight * (clickIndex + 1))
              },
              children: clickOptions.clickRender(
                targetList.find((val) => {
                  return val.index === clickIndex;
                }),
                clickIndex
              )
            }
          )
        ]
      }
    )
  ] });
}
const H5VirtualTableComponent = forwardRef(H5VirtualTable);
export {
  H5Table,
  H5VirtualTableComponent as H5VirtualTable
};
