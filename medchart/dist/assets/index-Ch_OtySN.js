(function() {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const l of document.querySelectorAll('link[rel="modulepreload"]')) r(l);
  new MutationObserver(l => {
    for (const i of l)
      if (i.type === "childList")
        for (const o of i.addedNodes) o.tagName === "LINK" && o.rel === "modulepreload" && r(o)
  }).observe(document, {
    childList: !0,
    subtree: !0
  });

  function n(l) {
    const i = {};
    return l.integrity && (i.integrity = l.integrity), l.referrerPolicy && (i.referrerPolicy = l.referrerPolicy), l.crossOrigin === "use-credentials" ? i.credentials = "include" : l.crossOrigin === "anonymous" ? i.credentials = "omit" : i.credentials = "same-origin", i
  }

  function r(l) {
    if (l.ep) return;
    l.ep = !0;
    const i = n(l);
    fetch(l.href, i)
  }
})();
var ns = {
    exports: {}
  },
  ol = {},
  rs = {
    exports: {}
  },
  R = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var bn = Symbol.for("react.element"),
  Nc = Symbol.for("react.portal"),
  Ec = Symbol.for("react.fragment"),
  Cc = Symbol.for("react.strict_mode"),
  _c = Symbol.for("react.profiler"),
  Pc = Symbol.for("react.provider"),
  zc = Symbol.for("react.context"),
  Lc = Symbol.for("react.forward_ref"),
  Tc = Symbol.for("react.suspense"),
  Rc = Symbol.for("react.memo"),
  Dc = Symbol.for("react.lazy"),
  Vo = Symbol.iterator;

function Oc(e) {
  return e === null || typeof e != "object" ? null : (e = Vo && e[Vo] || e["@@iterator"], typeof e == "function" ? e : null)
}
var ls = {
    isMounted: function() {
      return !1
    },
    enqueueForceUpdate: function() {},
    enqueueReplaceState: function() {},
    enqueueSetState: function() {}
  },
  is = Object.assign,
  os = {};

function an(e, t, n) {
  this.props = e, this.context = t, this.refs = os, this.updater = n || ls
}
an.prototype.isReactComponent = {};
an.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState")
};
an.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate")
};

function us() {}
us.prototype = an.prototype;

function Wi(e, t, n) {
  this.props = e, this.context = t, this.refs = os, this.updater = n || ls
}
var Ki = Wi.prototype = new us;
Ki.constructor = Wi;
is(Ki, an.prototype);
Ki.isPureReactComponent = !0;
var Ho = Array.isArray,
  ss = Object.prototype.hasOwnProperty,
  Yi = {
    current: null
  },
  as = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
  };

function cs(e, t, n) {
  var r, l = {},
    i = null,
    o = null;
  if (t != null)
    for (r in t.ref !== void 0 && (o = t.ref), t.key !== void 0 && (i = "" + t.key), t) ss.call(t, r) && !as.hasOwnProperty(r) && (l[r] = t[r]);
  var s = arguments.length - 2;
  if (s === 1) l.children = n;
  else if (1 < s) {
    for (var a = Array(s), c = 0; c < s; c++) a[c] = arguments[c + 2];
    l.children = a
  }
  if (e && e.defaultProps)
    for (r in s = e.defaultProps, s) l[r] === void 0 && (l[r] = s[r]);
  return {
    $$typeof: bn,
    type: e,
    key: i,
    ref: o,
    props: l,
    _owner: Yi.current
  }
}

function Mc(e, t) {
  return {
    $$typeof: bn,
    type: e.type,
    key: t,
    ref: e.ref,
    props: e.props,
    _owner: e._owner
  }
}

function Gi(e) {
  return typeof e == "object" && e !== null && e.$$typeof === bn
}

function Ic(e) {
  var t = {
    "=": "=0",
    ":": "=2"
  };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n]
  })
}
var Qo = /\/+/g;

function _l(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? Ic("" + e.key) : t.toString(36)
}

function Nr(e, t, n, r, l) {
  var i = typeof e;
  (i === "undefined" || i === "boolean") && (e = null);
  var o = !1;
  if (e === null) o = !0;
  else switch (i) {
    case "string":
    case "number":
      o = !0;
      break;
    case "object":
      switch (e.$$typeof) {
        case bn:
        case Nc:
          o = !0
      }
  }
  if (o) return o = e, l = l(o), e = r === "" ? "." + _l(o, 0) : r, Ho(l) ? (n = "", e != null && (n = e.replace(Qo, "$&/") + "/"), Nr(l, t, n, "", function(c) {
    return c
  })) : l != null && (Gi(l) && (l = Mc(l, n + (!l.key || o && o.key === l.key ? "" : ("" + l.key).replace(Qo, "$&/") + "/") + e)), t.push(l)), 1;
  if (o = 0, r = r === "" ? "." : r + ":", Ho(e))
    for (var s = 0; s < e.length; s++) {
      i = e[s];
      var a = r + _l(i, s);
      o += Nr(i, t, n, a, l)
    } else if (a = Oc(e), typeof a == "function")
      for (e = a.call(e), s = 0; !(i = e.next()).done;) i = i.value, a = r + _l(i, s++), o += Nr(i, t, n, a, l);
    else if (i === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return o
}

function or(e, t, n) {
  if (e == null) return e;
  var r = [],
    l = 0;
  return Nr(e, r, "", "", function(i) {
    return t.call(n, i, l++)
  }), r
}

function Fc(e) {
  if (e._status === -1) {
    var t = e._result;
    t = t(), t.then(function(n) {
      (e._status === 0 || e._status === -1) && (e._status = 1, e._result = n)
    }, function(n) {
      (e._status === 0 || e._status === -1) && (e._status = 2, e._result = n)
    }), e._status === -1 && (e._status = 0, e._result = t)
  }
  if (e._status === 1) return e._result.default;
  throw e._result
}
var ae = {
    current: null
  },
  Er = {
    transition: null
  },
  $c = {
    ReactCurrentDispatcher: ae,
    ReactCurrentBatchConfig: Er,
    ReactCurrentOwner: Yi
  };

function ds() {
  throw Error("act(...) is not supported in production builds of React.")
}
R.Children = {
  map: or,
  forEach: function(e, t, n) {
    or(e, function() {
      t.apply(this, arguments)
    }, n)
  },
  count: function(e) {
    var t = 0;
    return or(e, function() {
      t++
    }), t
  },
  toArray: function(e) {
    return or(e, function(t) {
      return t
    }) || []
  },
  only: function(e) {
    if (!Gi(e)) throw Error("React.Children.only expected to receive a single React element child.");
    return e
  }
};
R.Component = an;
R.Fragment = Ec;
R.Profiler = _c;
R.PureComponent = Wi;
R.StrictMode = Cc;
R.Suspense = Tc;
R.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = $c;
R.act = ds;
R.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = is({}, e.props),
    l = e.key,
    i = e.ref,
    o = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (i = t.ref, o = Yi.current), t.key !== void 0 && (l = "" + t.key), e.type && e.type.defaultProps) var s = e.type.defaultProps;
    for (a in t) ss.call(t, a) && !as.hasOwnProperty(a) && (r[a] = t[a] === void 0 && s !== void 0 ? s[a] : t[a])
  }
  var a = arguments.length - 2;
  if (a === 1) r.children = n;
  else if (1 < a) {
    s = Array(a);
    for (var c = 0; c < a; c++) s[c] = arguments[c + 2];
    r.children = s
  }
  return {
    $$typeof: bn,
    type: e.type,
    key: l,
    ref: i,
    props: r,
    _owner: o
  }
};
R.createContext = function(e) {
  return e = {
    $$typeof: zc,
    _currentValue: e,
    _currentValue2: e,
    _threadCount: 0,
    Provider: null,
    Consumer: null,
    _defaultValue: null,
    _globalName: null
  }, e.Provider = {
    $$typeof: Pc,
    _context: e
  }, e.Consumer = e
};
R.createElement = cs;
R.createFactory = function(e) {
  var t = cs.bind(null, e);
  return t.type = e, t
};
R.createRef = function() {
  return {
    current: null
  }
};
R.forwardRef = function(e) {
  return {
    $$typeof: Lc,
    render: e
  }
};
R.isValidElement = Gi;
R.lazy = function(e) {
  return {
    $$typeof: Dc,
    _payload: {
      _status: -1,
      _result: e
    },
    _init: Fc
  }
};
R.memo = function(e, t) {
  return {
    $$typeof: Rc,
    type: e,
    compare: t === void 0 ? null : t
  }
};
R.startTransition = function(e) {
  var t = Er.transition;
  Er.transition = {};
  try {
    e()
  } finally {
    Er.transition = t
  }
};
R.unstable_act = ds;
R.useCallback = function(e, t) {
  return ae.current.useCallback(e, t)
};
R.useContext = function(e) {
  return ae.current.useContext(e)
};
R.useDebugValue = function() {};
R.useDeferredValue = function(e) {
  return ae.current.useDeferredValue(e)
};
R.useEffect = function(e, t) {
  return ae.current.useEffect(e, t)
};
R.useId = function() {
  return ae.current.useId()
};
R.useImperativeHandle = function(e, t, n) {
  return ae.current.useImperativeHandle(e, t, n)
};
R.useInsertionEffect = function(e, t) {
  return ae.current.useInsertionEffect(e, t)
};
R.useLayoutEffect = function(e, t) {
  return ae.current.useLayoutEffect(e, t)
};
R.useMemo = function(e, t) {
  return ae.current.useMemo(e, t)
};
R.useReducer = function(e, t, n) {
  return ae.current.useReducer(e, t, n)
};
R.useRef = function(e) {
  return ae.current.useRef(e)
};
R.useState = function(e) {
  return ae.current.useState(e)
};
R.useSyncExternalStore = function(e, t, n) {
  return ae.current.useSyncExternalStore(e, t, n)
};
R.useTransition = function() {
  return ae.current.useTransition()
};
R.version = "18.3.1";
rs.exports = R;
var z = rs.exports;
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ac = z,
  Uc = Symbol.for("react.element"),
  Bc = Symbol.for("react.fragment"),
  Vc = Object.prototype.hasOwnProperty,
  Hc = Ac.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  Qc = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
  };

function fs(e, t, n) {
  var r, l = {},
    i = null,
    o = null;
  n !== void 0 && (i = "" + n), t.key !== void 0 && (i = "" + t.key), t.ref !== void 0 && (o = t.ref);
  for (r in t) Vc.call(t, r) && !Qc.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps)
    for (r in t = e.defaultProps, t) l[r] === void 0 && (l[r] = t[r]);
  return {
    $$typeof: Uc,
    type: e,
    key: i,
    ref: o,
    props: l,
    _owner: Hc.current
  }
}
ol.Fragment = Bc;
ol.jsx = fs;
ol.jsxs = fs;
ns.exports = ol;
var u = ns.exports,
  ps = {
    exports: {}
  },
  xe = {},
  ms = {
    exports: {}
  },
  hs = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(e) {
  function t(N, L) {
    var T = N.length;
    N.push(L);
    e: for (; 0 < T;) {
      var W = T - 1 >>> 1,
        J = N[W];
      if (0 < l(J, L)) N[W] = L, N[T] = J, T = W;
      else break e
    }
  }

  function n(N) {
    return N.length === 0 ? null : N[0]
  }

  function r(N) {
    if (N.length === 0) return null;
    var L = N[0],
      T = N.pop();
    if (T !== L) {
      N[0] = T;
      e: for (var W = 0, J = N.length, lr = J >>> 1; W < lr;) {
        var wt = 2 * (W + 1) - 1,
          Cl = N[wt],
          xt = wt + 1,
          ir = N[xt];
        if (0 > l(Cl, T)) xt < J && 0 > l(ir, Cl) ? (N[W] = ir, N[xt] = T, W = xt) : (N[W] = Cl, N[wt] = T, W = wt);
        else if (xt < J && 0 > l(ir, T)) N[W] = ir, N[xt] = T, W = xt;
        else break e
      }
    }
    return L
  }

  function l(N, L) {
    var T = N.sortIndex - L.sortIndex;
    return T !== 0 ? T : N.id - L.id
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var i = performance;
    e.unstable_now = function() {
      return i.now()
    }
  } else {
    var o = Date,
      s = o.now();
    e.unstable_now = function() {
      return o.now() - s
    }
  }
  var a = [],
    c = [],
    g = 1,
    h = null,
    m = 3,
    w = !1,
    v = !1,
    y = !1,
    P = typeof setTimeout == "function" ? setTimeout : null,
    p = typeof clearTimeout == "function" ? clearTimeout : null,
    d = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);

  function f(N) {
    for (var L = n(c); L !== null;) {
      if (L.callback === null) r(c);
      else if (L.startTime <= N) r(c), L.sortIndex = L.expirationTime, t(a, L);
      else break;
      L = n(c)
    }
  }

  function x(N) {
    if (y = !1, f(N), !v)
      if (n(a) !== null) v = !0, Nl(j);
      else {
        var L = n(c);
        L !== null && El(x, L.startTime - N)
      }
  }

  function j(N, L) {
    v = !1, y && (y = !1, p(_), _ = -1), w = !0;
    var T = m;
    try {
      for (f(L), h = n(a); h !== null && (!(h.expirationTime > L) || N && !Pe());) {
        var W = h.callback;
        if (typeof W == "function") {
          h.callback = null, m = h.priorityLevel;
          var J = W(h.expirationTime <= L);
          L = e.unstable_now(), typeof J == "function" ? h.callback = J : h === n(a) && r(a), f(L)
        } else r(a);
        h = n(a)
      }
      if (h !== null) var lr = !0;
      else {
        var wt = n(c);
        wt !== null && El(x, wt.startTime - L), lr = !1
      }
      return lr
    } finally {
      h = null, m = T, w = !1
    }
  }
  var E = !1,
    C = null,
    _ = -1,
    Q = 5,
    D = -1;

  function Pe() {
    return !(e.unstable_now() - D < Q)
  }

  function pn() {
    if (C !== null) {
      var N = e.unstable_now();
      D = N;
      var L = !0;
      try {
        L = C(!0, N)
      } finally {
        L ? mn() : (E = !1, C = null)
      }
    } else E = !1
  }
  var mn;
  if (typeof d == "function") mn = function() {
    d(pn)
  };
  else if (typeof MessageChannel < "u") {
    var Bo = new MessageChannel,
      jc = Bo.port2;
    Bo.port1.onmessage = pn, mn = function() {
      jc.postMessage(null)
    }
  } else mn = function() {
    P(pn, 0)
  };

  function Nl(N) {
    C = N, E || (E = !0, mn())
  }

  function El(N, L) {
    _ = P(function() {
      N(e.unstable_now())
    }, L)
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(N) {
    N.callback = null
  }, e.unstable_continueExecution = function() {
    v || w || (v = !0, Nl(j))
  }, e.unstable_forceFrameRate = function(N) {
    0 > N || 125 < N ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : Q = 0 < N ? Math.floor(1e3 / N) : 5
  }, e.unstable_getCurrentPriorityLevel = function() {
    return m
  }, e.unstable_getFirstCallbackNode = function() {
    return n(a)
  }, e.unstable_next = function(N) {
    switch (m) {
      case 1:
      case 2:
      case 3:
        var L = 3;
        break;
      default:
        L = m
    }
    var T = m;
    m = L;
    try {
      return N()
    } finally {
      m = T
    }
  }, e.unstable_pauseExecution = function() {}, e.unstable_requestPaint = function() {}, e.unstable_runWithPriority = function(N, L) {
    switch (N) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        N = 3
    }
    var T = m;
    m = N;
    try {
      return L()
    } finally {
      m = T
    }
  }, e.unstable_scheduleCallback = function(N, L, T) {
    var W = e.unstable_now();
    switch (typeof T == "object" && T !== null ? (T = T.delay, T = typeof T == "number" && 0 < T ? W + T : W) : T = W, N) {
      case 1:
        var J = -1;
        break;
      case 2:
        J = 250;
        break;
      case 5:
        J = 1073741823;
        break;
      case 4:
        J = 1e4;
        break;
      default:
        J = 5e3
    }
    return J = T + J, N = {
      id: g++,
      callback: L,
      priorityLevel: N,
      startTime: T,
      expirationTime: J,
      sortIndex: -1
    }, T > W ? (N.sortIndex = T, t(c, N), n(a) === null && N === n(c) && (y ? (p(_), _ = -1) : y = !0, El(x, T - W))) : (N.sortIndex = J, t(a, N), v || w || (v = !0, Nl(j))), N
  }, e.unstable_shouldYield = Pe, e.unstable_wrapCallback = function(N) {
    var L = m;
    return function() {
      var T = m;
      m = L;
      try {
        return N.apply(this, arguments)
      } finally {
        m = T
      }
    }
  }
})(hs);
ms.exports = hs;
var Wc = ms.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Kc = z,
  we = Wc;

function S(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
}
var vs = new Set,
  In = {};

function Dt(e, t) {
  tn(e, t), tn(e + "Capture", t)
}

function tn(e, t) {
  for (In[e] = t, e = 0; e < t.length; e++) vs.add(t[e])
}
var Ge = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"),
  bl = Object.prototype.hasOwnProperty,
  Yc = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  Wo = {},
  Ko = {};

function Gc(e) {
  return bl.call(Ko, e) ? !0 : bl.call(Wo, e) ? !1 : Yc.test(e) ? Ko[e] = !0 : (Wo[e] = !0, !1)
}

function Xc(e, t, n, r) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return r ? !1 : n !== null ? !n.acceptsBooleans : (e = e.toLowerCase().slice(0, 5), e !== "data-" && e !== "aria-");
    default:
      return !1
  }
}

function Jc(e, t, n, r) {
  if (t === null || typeof t > "u" || Xc(e, t, n, r)) return !0;
  if (r) return !1;
  if (n !== null) switch (n.type) {
    case 3:
      return !t;
    case 4:
      return t === !1;
    case 5:
      return isNaN(t);
    case 6:
      return isNaN(t) || 1 > t
  }
  return !1
}

function ce(e, t, n, r, l, i, o) {
  this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = l, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = i, this.removeEmptyString = o
}
var te = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  te[e] = new ce(e, 0, !1, e, null, !1, !1)
});
[
  ["acceptCharset", "accept-charset"],
  ["className", "class"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"]
].forEach(function(e) {
  var t = e[0];
  te[t] = new ce(t, 1, !1, e[1], null, !1, !1)
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  te[e] = new ce(e, 2, !1, e.toLowerCase(), null, !1, !1)
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  te[e] = new ce(e, 2, !1, e, null, !1, !1)
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  te[e] = new ce(e, 3, !1, e.toLowerCase(), null, !1, !1)
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  te[e] = new ce(e, 3, !0, e, null, !1, !1)
});
["capture", "download"].forEach(function(e) {
  te[e] = new ce(e, 4, !1, e, null, !1, !1)
});
["cols", "rows", "size", "span"].forEach(function(e) {
  te[e] = new ce(e, 6, !1, e, null, !1, !1)
});
["rowSpan", "start"].forEach(function(e) {
  te[e] = new ce(e, 5, !1, e.toLowerCase(), null, !1, !1)
});
var Xi = /[\-:]([a-z])/g;

function Ji(e) {
  return e[1].toUpperCase()
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(Xi, Ji);
  te[t] = new ce(t, 1, !1, e, null, !1, !1)
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(Xi, Ji);
  te[t] = new ce(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1)
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(Xi, Ji);
  te[t] = new ce(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1)
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  te[e] = new ce(e, 1, !1, e.toLowerCase(), null, !1, !1)
});
te.xlinkHref = new ce("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  te[e] = new ce(e, 1, !1, e.toLowerCase(), null, !0, !0)
});

function qi(e, t, n, r) {
  var l = te.hasOwnProperty(t) ? te[t] : null;
  (l !== null ? l.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (Jc(t, n, l, r) && (n = null), r || l === null ? Gc(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName, r = l.attributeNamespace, n === null ? e.removeAttribute(t) : (l = l.type, n = l === 3 || l === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))))
}
var Ze = Kc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  ur = Symbol.for("react.element"),
  Ft = Symbol.for("react.portal"),
  $t = Symbol.for("react.fragment"),
  Zi = Symbol.for("react.strict_mode"),
  ei = Symbol.for("react.profiler"),
  gs = Symbol.for("react.provider"),
  ys = Symbol.for("react.context"),
  bi = Symbol.for("react.forward_ref"),
  ti = Symbol.for("react.suspense"),
  ni = Symbol.for("react.suspense_list"),
  eo = Symbol.for("react.memo"),
  et = Symbol.for("react.lazy"),
  ws = Symbol.for("react.offscreen"),
  Yo = Symbol.iterator;

function hn(e) {
  return e === null || typeof e != "object" ? null : (e = Yo && e[Yo] || e["@@iterator"], typeof e == "function" ? e : null)
}
var V = Object.assign,
  Pl;

function jn(e) {
  if (Pl === void 0) try {
    throw Error()
  } catch (n) {
    var t = n.stack.trim().match(/\n( *(at )?)/);
    Pl = t && t[1] || ""
  }
  return `
` + Pl + e
}
var zl = !1;

function Ll(e, t) {
  if (!e || zl) return "";
  zl = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t)
      if (t = function() {
          throw Error()
        }, Object.defineProperty(t.prototype, "props", {
          set: function() {
            throw Error()
          }
        }), typeof Reflect == "object" && Reflect.construct) {
        try {
          Reflect.construct(t, [])
        } catch (c) {
          var r = c
        }
        Reflect.construct(e, [], t)
      } else {
        try {
          t.call()
        } catch (c) {
          r = c
        }
        e.call(t.prototype)
      }
    else {
      try {
        throw Error()
      } catch (c) {
        r = c
      }
      e()
    }
  } catch (c) {
    if (c && r && typeof c.stack == "string") {
      for (var l = c.stack.split(`
`), i = r.stack.split(`
`), o = l.length - 1, s = i.length - 1; 1 <= o && 0 <= s && l[o] !== i[s];) s--;
      for (; 1 <= o && 0 <= s; o--, s--)
        if (l[o] !== i[s]) {
          if (o !== 1 || s !== 1)
            do
              if (o--, s--, 0 > s || l[o] !== i[s]) {
                var a = `
` + l[o].replace(" at new ", " at ");
                return e.displayName && a.includes("<anonymous>") && (a = a.replace("<anonymous>", e.displayName)), a
              } while (1 <= o && 0 <= s);
          break
        }
    }
  } finally {
    zl = !1, Error.prepareStackTrace = n
  }
  return (e = e ? e.displayName || e.name : "") ? jn(e) : ""
}

function qc(e) {
  switch (e.tag) {
    case 5:
      return jn(e.type);
    case 16:
      return jn("Lazy");
    case 13:
      return jn("Suspense");
    case 19:
      return jn("SuspenseList");
    case 0:
    case 2:
    case 15:
      return e = Ll(e.type, !1), e;
    case 11:
      return e = Ll(e.type.render, !1), e;
    case 1:
      return e = Ll(e.type, !0), e;
    default:
      return ""
  }
}

function ri(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case $t:
      return "Fragment";
    case Ft:
      return "Portal";
    case ei:
      return "Profiler";
    case Zi:
      return "StrictMode";
    case ti:
      return "Suspense";
    case ni:
      return "SuspenseList"
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case ys:
      return (e.displayName || "Context") + ".Consumer";
    case gs:
      return (e._context.displayName || "Context") + ".Provider";
    case bi:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case eo:
      return t = e.displayName || null, t !== null ? t : ri(e.type) || "Memo";
    case et:
      t = e._payload, e = e._init;
      try {
        return ri(e(t))
      } catch {}
  }
  return null
}

function Zc(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (t.displayName || "Context") + ".Consumer";
    case 10:
      return (t._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return e = t.render, e = e.displayName || e.name || "", t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef");
    case 7:
      return "Fragment";
    case 5:
      return t;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return ri(t);
    case 8:
      return t === Zi ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == "function") return t.displayName || t.name || null;
      if (typeof t == "string") return t
  }
  return null
}

function mt(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return ""
  }
}

function xs(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio")
}

function bc(e) {
  var t = xs(e) ? "checked" : "value",
    n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    r = "" + e[t];
  if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
    var l = n.get,
      i = n.set;
    return Object.defineProperty(e, t, {
      configurable: !0,
      get: function() {
        return l.call(this)
      },
      set: function(o) {
        r = "" + o, i.call(this, o)
      }
    }), Object.defineProperty(e, t, {
      enumerable: n.enumerable
    }), {
      getValue: function() {
        return r
      },
      setValue: function(o) {
        r = "" + o
      },
      stopTracking: function() {
        e._valueTracker = null, delete e[t]
      }
    }
  }
}

function sr(e) {
  e._valueTracker || (e._valueTracker = bc(e))
}

function Ss(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(),
    r = "";
  return e && (r = xs(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1
}

function Ir(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
  try {
    return e.activeElement || e.body
  } catch {
    return e.body
  }
}

function li(e, t) {
  var n = t.checked;
  return V({}, t, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: n ?? e._wrapperState.initialChecked
  })
}

function Go(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue,
    r = t.checked != null ? t.checked : t.defaultChecked;
  n = mt(t.value != null ? t.value : n), e._wrapperState = {
    initialChecked: r,
    initialValue: n,
    controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null
  }
}

function ks(e, t) {
  t = t.checked, t != null && qi(e, "checked", t, !1)
}

function ii(e, t) {
  ks(e, t);
  var n = mt(t.value),
    r = t.type;
  if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return
  }
  t.hasOwnProperty("value") ? oi(e, t.type, n) : t.hasOwnProperty("defaultValue") && oi(e, t.type, mt(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked)
}

function Xo(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n)
}

function oi(e, t, n) {
  (t !== "number" || Ir(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n))
}
var Nn = Array.isArray;

function Xt(e, t, n, r) {
  if (e = e.options, t) {
    t = {};
    for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
    for (n = 0; n < e.length; n++) l = t.hasOwnProperty("$" + e[n].value), e[n].selected !== l && (e[n].selected = l), l && r && (e[n].defaultSelected = !0)
  } else {
    for (n = "" + mt(n), t = null, l = 0; l < e.length; l++) {
      if (e[l].value === n) {
        e[l].selected = !0, r && (e[l].defaultSelected = !0);
        return
      }
      t !== null || e[l].disabled || (t = e[l])
    }
    t !== null && (t.selected = !0)
  }
}

function ui(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(S(91));
  return V({}, t, {
    value: void 0,
    defaultValue: void 0,
    children: "" + e._wrapperState.initialValue
  })
}

function Jo(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null) throw Error(S(92));
      if (Nn(n)) {
        if (1 < n.length) throw Error(S(93));
        n = n[0]
      }
      t = n
    }
    t == null && (t = ""), n = t
  }
  e._wrapperState = {
    initialValue: mt(n)
  }
}

function js(e, t) {
  var n = mt(t.value),
    r = mt(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r)
}

function qo(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t)
}

function Ns(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml"
  }
}

function si(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? Ns(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e
}
var ar, Es = function(e) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, l) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, n, r, l)
    })
  } : e
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
  else {
    for (ar = ar || document.createElement("div"), ar.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = ar.firstChild; e.firstChild;) e.removeChild(e.firstChild);
    for (; t.firstChild;) e.appendChild(t.firstChild)
  }
});

function Fn(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return
    }
  }
  e.textContent = t
}
var _n = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0
  },
  ed = ["Webkit", "ms", "Moz", "O"];
Object.keys(_n).forEach(function(e) {
  ed.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), _n[t] = _n[e]
  })
});

function Cs(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || _n.hasOwnProperty(e) && _n[e] ? ("" + t).trim() : t + "px"
}

function _s(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0,
        l = Cs(n, t[n], r);
      n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : e[n] = l
    }
}
var td = V({
  menuitem: !0
}, {
  area: !0,
  base: !0,
  br: !0,
  col: !0,
  embed: !0,
  hr: !0,
  img: !0,
  input: !0,
  keygen: !0,
  link: !0,
  meta: !0,
  param: !0,
  source: !0,
  track: !0,
  wbr: !0
});

function ai(e, t) {
  if (t) {
    if (td[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(S(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(S(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(S(61))
    }
    if (t.style != null && typeof t.style != "object") throw Error(S(62))
  }
}

function ci(e, t) {
  if (e.indexOf("-") === -1) return typeof t.is == "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0
  }
}
var di = null;

function to(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e
}
var fi = null,
  Jt = null,
  qt = null;

function Zo(e) {
  if (e = nr(e)) {
    if (typeof fi != "function") throw Error(S(280));
    var t = e.stateNode;
    t && (t = dl(t), fi(e.stateNode, e.type, t))
  }
}

function Ps(e) {
  Jt ? qt ? qt.push(e) : qt = [e] : Jt = e
}

function zs() {
  if (Jt) {
    var e = Jt,
      t = qt;
    if (qt = Jt = null, Zo(e), t)
      for (e = 0; e < t.length; e++) Zo(t[e])
  }
}

function Ls(e, t) {
  return e(t)
}

function Ts() {}
var Tl = !1;

function Rs(e, t, n) {
  if (Tl) return e(t, n);
  Tl = !0;
  try {
    return Ls(e, t, n)
  } finally {
    Tl = !1, (Jt !== null || qt !== null) && (Ts(), zs())
  }
}

function $n(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = dl(n);
  if (r === null) return null;
  n = r[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (r = !r.disabled) || (e = e.type, r = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !r;
      break e;
    default:
      e = !1
  }
  if (e) return null;
  if (n && typeof n != "function") throw Error(S(231, t, typeof n));
  return n
}
var pi = !1;
if (Ge) try {
  var vn = {};
  Object.defineProperty(vn, "passive", {
    get: function() {
      pi = !0
    }
  }), window.addEventListener("test", vn, vn), window.removeEventListener("test", vn, vn)
} catch {
  pi = !1
}

function nd(e, t, n, r, l, i, o, s, a) {
  var c = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, c)
  } catch (g) {
    this.onError(g)
  }
}
var Pn = !1,
  Fr = null,
  $r = !1,
  mi = null,
  rd = {
    onError: function(e) {
      Pn = !0, Fr = e
    }
  };

function ld(e, t, n, r, l, i, o, s, a) {
  Pn = !1, Fr = null, nd.apply(rd, arguments)
}

function id(e, t, n, r, l, i, o, s, a) {
  if (ld.apply(this, arguments), Pn) {
    if (Pn) {
      var c = Fr;
      Pn = !1, Fr = null
    } else throw Error(S(198));
    $r || ($r = !0, mi = c)
  }
}

function Ot(e) {
  var t = e,
    n = e;
  if (e.alternate)
    for (; t.return;) t = t.return;
  else {
    e = t;
    do t = e, t.flags & 4098 && (n = t.return), e = t.return; while (e)
  }
  return t.tag === 3 ? n : null
}

function Ds(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated
  }
  return null
}

function bo(e) {
  if (Ot(e) !== e) throw Error(S(188))
}

function od(e) {
  var t = e.alternate;
  if (!t) {
    if (t = Ot(e), t === null) throw Error(S(188));
    return t !== e ? null : e
  }
  for (var n = e, r = t;;) {
    var l = n.return;
    if (l === null) break;
    var i = l.alternate;
    if (i === null) {
      if (r = l.return, r !== null) {
        n = r;
        continue
      }
      break
    }
    if (l.child === i.child) {
      for (i = l.child; i;) {
        if (i === n) return bo(l), e;
        if (i === r) return bo(l), t;
        i = i.sibling
      }
      throw Error(S(188))
    }
    if (n.return !== r.return) n = l, r = i;
    else {
      for (var o = !1, s = l.child; s;) {
        if (s === n) {
          o = !0, n = l, r = i;
          break
        }
        if (s === r) {
          o = !0, r = l, n = i;
          break
        }
        s = s.sibling
      }
      if (!o) {
        for (s = i.child; s;) {
          if (s === n) {
            o = !0, n = i, r = l;
            break
          }
          if (s === r) {
            o = !0, r = i, n = l;
            break
          }
          s = s.sibling
        }
        if (!o) throw Error(S(189))
      }
    }
    if (n.alternate !== r) throw Error(S(190))
  }
  if (n.tag !== 3) throw Error(S(188));
  return n.stateNode.current === n ? e : t
}

function Os(e) {
  return e = od(e), e !== null ? Ms(e) : null
}

function Ms(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null;) {
    var t = Ms(e);
    if (t !== null) return t;
    e = e.sibling
  }
  return null
}
var Is = we.unstable_scheduleCallback,
  eu = we.unstable_cancelCallback,
  ud = we.unstable_shouldYield,
  sd = we.unstable_requestPaint,
  K = we.unstable_now,
  ad = we.unstable_getCurrentPriorityLevel,
  no = we.unstable_ImmediatePriority,
  Fs = we.unstable_UserBlockingPriority,
  Ar = we.unstable_NormalPriority,
  cd = we.unstable_LowPriority,
  $s = we.unstable_IdlePriority,
  ul = null,
  Be = null;

function dd(e) {
  if (Be && typeof Be.onCommitFiberRoot == "function") try {
    Be.onCommitFiberRoot(ul, e, void 0, (e.current.flags & 128) === 128)
  } catch {}
}
var Me = Math.clz32 ? Math.clz32 : md,
  fd = Math.log,
  pd = Math.LN2;

function md(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (fd(e) / pd | 0) | 0
}
var cr = 64,
  dr = 4194304;

function En(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e
  }
}

function Ur(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0,
    l = e.suspendedLanes,
    i = e.pingedLanes,
    o = n & 268435455;
  if (o !== 0) {
    var s = o & ~l;
    s !== 0 ? r = En(s) : (i &= o, i !== 0 && (r = En(i)))
  } else o = n & ~l, o !== 0 ? r = En(o) : i !== 0 && (r = En(i));
  if (r === 0) return 0;
  if (t !== 0 && t !== r && !(t & l) && (l = r & -r, i = t & -t, l >= i || l === 16 && (i & 4194240) !== 0)) return t;
  if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0)
    for (e = e.entanglements, t &= r; 0 < t;) n = 31 - Me(t), l = 1 << n, r |= e[n], t &= ~l;
  return r
}

function hd(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1
  }
}

function vd(e, t) {
  for (var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, i = e.pendingLanes; 0 < i;) {
    var o = 31 - Me(i),
      s = 1 << o,
      a = l[o];
    a === -1 ? (!(s & n) || s & r) && (l[o] = hd(s, t)) : a <= t && (e.expiredLanes |= s), i &= ~s
  }
}

function hi(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
}

function As() {
  var e = cr;
  return cr <<= 1, !(cr & 4194240) && (cr = 64), e
}

function Rl(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t
}

function er(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - Me(t), e[t] = n
}

function gd(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n;) {
    var l = 31 - Me(n),
      i = 1 << l;
    t[l] = 0, r[l] = -1, e[l] = -1, n &= ~i
  }
}

function ro(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n;) {
    var r = 31 - Me(n),
      l = 1 << r;
    l & t | e[r] & t && (e[r] |= t), n &= ~l
  }
}
var M = 0;

function Us(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1
}
var Bs, lo, Vs, Hs, Qs, vi = !1,
  fr = [],
  ot = null,
  ut = null,
  st = null,
  An = new Map,
  Un = new Map,
  nt = [],
  yd = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");

function tu(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      ot = null;
      break;
    case "dragenter":
    case "dragleave":
      ut = null;
      break;
    case "mouseover":
    case "mouseout":
      st = null;
      break;
    case "pointerover":
    case "pointerout":
      An.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Un.delete(t.pointerId)
  }
}

function gn(e, t, n, r, l, i) {
  return e === null || e.nativeEvent !== i ? (e = {
    blockedOn: t,
    domEventName: n,
    eventSystemFlags: r,
    nativeEvent: i,
    targetContainers: [l]
  }, t !== null && (t = nr(t), t !== null && lo(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e)
}

function wd(e, t, n, r, l) {
  switch (t) {
    case "focusin":
      return ot = gn(ot, e, t, n, r, l), !0;
    case "dragenter":
      return ut = gn(ut, e, t, n, r, l), !0;
    case "mouseover":
      return st = gn(st, e, t, n, r, l), !0;
    case "pointerover":
      var i = l.pointerId;
      return An.set(i, gn(An.get(i) || null, e, t, n, r, l)), !0;
    case "gotpointercapture":
      return i = l.pointerId, Un.set(i, gn(Un.get(i) || null, e, t, n, r, l)), !0
  }
  return !1
}

function Ws(e) {
  var t = jt(e.target);
  if (t !== null) {
    var n = Ot(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = Ds(n), t !== null) {
          e.blockedOn = t, Qs(e.priority, function() {
            Vs(n)
          });
          return
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return
      }
    }
  }
  e.blockedOn = null
}

function Cr(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length;) {
    var n = gi(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      di = r, n.target.dispatchEvent(r), di = null
    } else return t = nr(n), t !== null && lo(t), e.blockedOn = n, !1;
    t.shift()
  }
  return !0
}

function nu(e, t, n) {
  Cr(e) && n.delete(t)
}

function xd() {
  vi = !1, ot !== null && Cr(ot) && (ot = null), ut !== null && Cr(ut) && (ut = null), st !== null && Cr(st) && (st = null), An.forEach(nu), Un.forEach(nu)
}

function yn(e, t) {
  e.blockedOn === t && (e.blockedOn = null, vi || (vi = !0, we.unstable_scheduleCallback(we.unstable_NormalPriority, xd)))
}

function Bn(e) {
  function t(l) {
    return yn(l, e)
  }
  if (0 < fr.length) {
    yn(fr[0], e);
    for (var n = 1; n < fr.length; n++) {
      var r = fr[n];
      r.blockedOn === e && (r.blockedOn = null)
    }
  }
  for (ot !== null && yn(ot, e), ut !== null && yn(ut, e), st !== null && yn(st, e), An.forEach(t), Un.forEach(t), n = 0; n < nt.length; n++) r = nt[n], r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < nt.length && (n = nt[0], n.blockedOn === null);) Ws(n), n.blockedOn === null && nt.shift()
}
var Zt = Ze.ReactCurrentBatchConfig,
  Br = !0;

function Sd(e, t, n, r) {
  var l = M,
    i = Zt.transition;
  Zt.transition = null;
  try {
    M = 1, io(e, t, n, r)
  } finally {
    M = l, Zt.transition = i
  }
}

function kd(e, t, n, r) {
  var l = M,
    i = Zt.transition;
  Zt.transition = null;
  try {
    M = 4, io(e, t, n, r)
  } finally {
    M = l, Zt.transition = i
  }
}

function io(e, t, n, r) {
  if (Br) {
    var l = gi(e, t, n, r);
    if (l === null) Vl(e, t, r, Vr, n), tu(e, r);
    else if (wd(l, e, t, n, r)) r.stopPropagation();
    else if (tu(e, r), t & 4 && -1 < yd.indexOf(e)) {
      for (; l !== null;) {
        var i = nr(l);
        if (i !== null && Bs(i), i = gi(e, t, n, r), i === null && Vl(e, t, r, Vr, n), i === l) break;
        l = i
      }
      l !== null && r.stopPropagation()
    } else Vl(e, t, r, null, n)
  }
}
var Vr = null;

function gi(e, t, n, r) {
  if (Vr = null, e = to(r), e = jt(e), e !== null)
    if (t = Ot(e), t === null) e = null;
    else if (n = t.tag, n === 13) {
    if (e = Ds(t), e !== null) return e;
    e = null
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null
  } else t !== e && (e = null);
  return Vr = e, null
}

function Ks(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (ad()) {
        case no:
          return 1;
        case Fs:
          return 4;
        case Ar:
        case cd:
          return 16;
        case $s:
          return 536870912;
        default:
          return 16
      }
    default:
      return 16
  }
}
var lt = null,
  oo = null,
  _r = null;

function Ys() {
  if (_r) return _r;
  var e, t = oo,
    n = t.length,
    r, l = "value" in lt ? lt.value : lt.textContent,
    i = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++);
  var o = n - e;
  for (r = 1; r <= o && t[n - r] === l[i - r]; r++);
  return _r = l.slice(e, 1 < r ? 1 - r : void 0)
}

function Pr(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0
}

function pr() {
  return !0
}

function ru() {
  return !1
}

function Se(e) {
  function t(n, r, l, i, o) {
    this._reactName = n, this._targetInst = l, this.type = r, this.nativeEvent = i, this.target = o, this.currentTarget = null;
    for (var s in e) e.hasOwnProperty(s) && (n = e[s], this[s] = n ? n(i) : i[s]);
    return this.isDefaultPrevented = (i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1) ? pr : ru, this.isPropagationStopped = ru, this
  }
  return V(t.prototype, {
    preventDefault: function() {
      this.defaultPrevented = !0;
      var n = this.nativeEvent;
      n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = pr)
    },
    stopPropagation: function() {
      var n = this.nativeEvent;
      n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = pr)
    },
    persist: function() {},
    isPersistent: pr
  }), t
}
var cn = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now()
    },
    defaultPrevented: 0,
    isTrusted: 0
  },
  uo = Se(cn),
  tr = V({}, cn, {
    view: 0,
    detail: 0
  }),
  jd = Se(tr),
  Dl, Ol, wn, sl = V({}, tr, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: so,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== wn && (wn && e.type === "mousemove" ? (Dl = e.screenX - wn.screenX, Ol = e.screenY - wn.screenY) : Ol = Dl = 0, wn = e), Dl)
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : Ol
    }
  }),
  lu = Se(sl),
  Nd = V({}, sl, {
    dataTransfer: 0
  }),
  Ed = Se(Nd),
  Cd = V({}, tr, {
    relatedTarget: 0
  }),
  Ml = Se(Cd),
  _d = V({}, cn, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }),
  Pd = Se(_d),
  zd = V({}, cn, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData
    }
  }),
  Ld = Se(zd),
  Td = V({}, cn, {
    data: 0
  }),
  iu = Se(Td),
  Rd = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  },
  Dd = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  },
  Od = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };

function Md(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Od[e]) ? !!t[e] : !1
}

function so() {
  return Md
}
var Id = V({}, tr, {
    key: function(e) {
      if (e.key) {
        var t = Rd[e.key] || e.key;
        if (t !== "Unidentified") return t
      }
      return e.type === "keypress" ? (e = Pr(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Dd[e.keyCode] || "Unidentified" : ""
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: so,
    charCode: function(e) {
      return e.type === "keypress" ? Pr(e) : 0
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0
    },
    which: function(e) {
      return e.type === "keypress" ? Pr(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0
    }
  }),
  Fd = Se(Id),
  $d = V({}, sl, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  }),
  ou = Se($d),
  Ad = V({}, tr, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: so
  }),
  Ud = Se(Ad),
  Bd = V({}, cn, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }),
  Vd = Se(Bd),
  Hd = V({}, sl, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0
    },
    deltaZ: 0,
    deltaMode: 0
  }),
  Qd = Se(Hd),
  Wd = [9, 13, 27, 32],
  ao = Ge && "CompositionEvent" in window,
  zn = null;
Ge && "documentMode" in document && (zn = document.documentMode);
var Kd = Ge && "TextEvent" in window && !zn,
  Gs = Ge && (!ao || zn && 8 < zn && 11 >= zn),
  uu = " ",
  su = !1;

function Xs(e, t) {
  switch (e) {
    case "keyup":
      return Wd.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1
  }
}

function Js(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null
}
var At = !1;

function Yd(e, t) {
  switch (e) {
    case "compositionend":
      return Js(t);
    case "keypress":
      return t.which !== 32 ? null : (su = !0, uu);
    case "textInput":
      return e = t.data, e === uu && su ? null : e;
    default:
      return null
  }
}

function Gd(e, t) {
  if (At) return e === "compositionend" || !ao && Xs(e, t) ? (e = Ys(), _r = oo = lt = null, At = !1, e) : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which)
      }
      return null;
    case "compositionend":
      return Gs && t.locale !== "ko" ? null : t.data;
    default:
      return null
  }
}
var Xd = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0
};

function au(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!Xd[e.type] : t === "textarea"
}

function qs(e, t, n, r) {
  Ps(r), t = Hr(t, "onChange"), 0 < t.length && (n = new uo("onChange", "change", null, n, r), e.push({
    event: n,
    listeners: t
  }))
}
var Ln = null,
  Vn = null;

function Jd(e) {
  sa(e, 0)
}

function al(e) {
  var t = Vt(e);
  if (Ss(t)) return e
}

function qd(e, t) {
  if (e === "change") return t
}
var Zs = !1;
if (Ge) {
  var Il;
  if (Ge) {
    var Fl = "oninput" in document;
    if (!Fl) {
      var cu = document.createElement("div");
      cu.setAttribute("oninput", "return;"), Fl = typeof cu.oninput == "function"
    }
    Il = Fl
  } else Il = !1;
  Zs = Il && (!document.documentMode || 9 < document.documentMode)
}

function du() {
  Ln && (Ln.detachEvent("onpropertychange", bs), Vn = Ln = null)
}

function bs(e) {
  if (e.propertyName === "value" && al(Vn)) {
    var t = [];
    qs(t, Vn, e, to(e)), Rs(Jd, t)
  }
}

function Zd(e, t, n) {
  e === "focusin" ? (du(), Ln = t, Vn = n, Ln.attachEvent("onpropertychange", bs)) : e === "focusout" && du()
}

function bd(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return al(Vn)
}

function ef(e, t) {
  if (e === "click") return al(t)
}

function tf(e, t) {
  if (e === "input" || e === "change") return al(t)
}

function nf(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t
}
var Fe = typeof Object.is == "function" ? Object.is : nf;

function Hn(e, t) {
  if (Fe(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!bl.call(t, l) || !Fe(e[l], t[l])) return !1
  }
  return !0
}

function fu(e) {
  for (; e && e.firstChild;) e = e.firstChild;
  return e
}

function pu(e, t) {
  var n = fu(e);
  e = 0;
  for (var r; n;) {
    if (n.nodeType === 3) {
      if (r = e + n.textContent.length, e <= t && r >= t) return {
        node: n,
        offset: t - e
      };
      e = r
    }
    e: {
      for (; n;) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e
        }
        n = n.parentNode
      }
      n = void 0
    }
    n = fu(n)
  }
}

function ea(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? ea(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1
}

function ta() {
  for (var e = window, t = Ir(); t instanceof e.HTMLIFrameElement;) {
    try {
      var n = typeof t.contentWindow.location.href == "string"
    } catch {
      n = !1
    }
    if (n) e = t.contentWindow;
    else break;
    t = Ir(e.document)
  }
  return t
}

function co(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true")
}

function rf(e) {
  var t = ta(),
    n = e.focusedElem,
    r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && ea(n.ownerDocument.documentElement, n)) {
    if (r !== null && co(n)) {
      if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var l = n.textContent.length,
          i = Math.min(r.start, l);
        r = r.end === void 0 ? i : Math.min(r.end, l), !e.extend && i > r && (l = r, r = i, i = l), l = pu(n, i);
        var o = pu(n, r);
        l && o && (e.rangeCount !== 1 || e.anchorNode !== l.node || e.anchorOffset !== l.offset || e.focusNode !== o.node || e.focusOffset !== o.offset) && (t = t.createRange(), t.setStart(l.node, l.offset), e.removeAllRanges(), i > r ? (e.addRange(t), e.extend(o.node, o.offset)) : (t.setEnd(o.node, o.offset), e.addRange(t)))
      }
    }
    for (t = [], e = n; e = e.parentNode;) e.nodeType === 1 && t.push({
      element: e,
      left: e.scrollLeft,
      top: e.scrollTop
    });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++) e = t[n], e.element.scrollLeft = e.left, e.element.scrollTop = e.top
  }
}
var lf = Ge && "documentMode" in document && 11 >= document.documentMode,
  Ut = null,
  yi = null,
  Tn = null,
  wi = !1;

function mu(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  wi || Ut == null || Ut !== Ir(r) || (r = Ut, "selectionStart" in r && co(r) ? r = {
    start: r.selectionStart,
    end: r.selectionEnd
  } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
    anchorNode: r.anchorNode,
    anchorOffset: r.anchorOffset,
    focusNode: r.focusNode,
    focusOffset: r.focusOffset
  }), Tn && Hn(Tn, r) || (Tn = r, r = Hr(yi, "onSelect"), 0 < r.length && (t = new uo("onSelect", "select", null, t, n), e.push({
    event: t,
    listeners: r
  }), t.target = Ut)))
}

function mr(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n
}
var Bt = {
    animationend: mr("Animation", "AnimationEnd"),
    animationiteration: mr("Animation", "AnimationIteration"),
    animationstart: mr("Animation", "AnimationStart"),
    transitionend: mr("Transition", "TransitionEnd")
  },
  $l = {},
  na = {};
Ge && (na = document.createElement("div").style, "AnimationEvent" in window || (delete Bt.animationend.animation, delete Bt.animationiteration.animation, delete Bt.animationstart.animation), "TransitionEvent" in window || delete Bt.transitionend.transition);

function cl(e) {
  if ($l[e]) return $l[e];
  if (!Bt[e]) return e;
  var t = Bt[e],
    n;
  for (n in t)
    if (t.hasOwnProperty(n) && n in na) return $l[e] = t[n];
  return e
}
var ra = cl("animationend"),
  la = cl("animationiteration"),
  ia = cl("animationstart"),
  oa = cl("transitionend"),
  ua = new Map,
  hu = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");

function vt(e, t) {
  ua.set(e, t), Dt(t, [e])
}
for (var Al = 0; Al < hu.length; Al++) {
  var Ul = hu[Al],
    of = Ul.toLowerCase(),
    uf = Ul[0].toUpperCase() + Ul.slice(1);
  vt(of, "on" + uf)
}
vt(ra, "onAnimationEnd");
vt(la, "onAnimationIteration");
vt(ia, "onAnimationStart");
vt("dblclick", "onDoubleClick");
vt("focusin", "onFocus");
vt("focusout", "onBlur");
vt(oa, "onTransitionEnd");
tn("onMouseEnter", ["mouseout", "mouseover"]);
tn("onMouseLeave", ["mouseout", "mouseover"]);
tn("onPointerEnter", ["pointerout", "pointerover"]);
tn("onPointerLeave", ["pointerout", "pointerover"]);
Dt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
Dt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
Dt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Dt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
Dt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
Dt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Cn = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),
  sf = new Set("cancel close invalid load scroll toggle".split(" ").concat(Cn));

function vu(e, t, n) {
  var r = e.type || "unknown-event";
  e.currentTarget = n, id(r, t, void 0, e), e.currentTarget = null
}

function sa(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n],
      l = r.event;
    r = r.listeners;
    e: {
      var i = void 0;
      if (t)
        for (var o = r.length - 1; 0 <= o; o--) {
          var s = r[o],
            a = s.instance,
            c = s.currentTarget;
          if (s = s.listener, a !== i && l.isPropagationStopped()) break e;
          vu(l, s, c), i = a
        } else
          for (o = 0; o < r.length; o++) {
            if (s = r[o], a = s.instance, c = s.currentTarget, s = s.listener, a !== i && l.isPropagationStopped()) break e;
            vu(l, s, c), i = a
          }
    }
  }
  if ($r) throw e = mi, $r = !1, mi = null, e
}

function F(e, t) {
  var n = t[Ni];
  n === void 0 && (n = t[Ni] = new Set);
  var r = e + "__bubble";
  n.has(r) || (aa(t, e, 2, !1), n.add(r))
}

function Bl(e, t, n) {
  var r = 0;
  t && (r |= 4), aa(n, e, r, t)
}
var hr = "_reactListening" + Math.random().toString(36).slice(2);

function Qn(e) {
  if (!e[hr]) {
    e[hr] = !0, vs.forEach(function(n) {
      n !== "selectionchange" && (sf.has(n) || Bl(n, !1, e), Bl(n, !0, e))
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[hr] || (t[hr] = !0, Bl("selectionchange", !1, t))
  }
}

function aa(e, t, n, r) {
  switch (Ks(t)) {
    case 1:
      var l = Sd;
      break;
    case 4:
      l = kd;
      break;
    default:
      l = io
  }
  n = l.bind(null, t, n, e), l = void 0, !pi || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), r ? l !== void 0 ? e.addEventListener(t, n, {
    capture: !0,
    passive: l
  }) : e.addEventListener(t, n, !0) : l !== void 0 ? e.addEventListener(t, n, {
    passive: l
  }) : e.addEventListener(t, n, !1)
}

function Vl(e, t, n, r, l) {
  var i = r;
  if (!(t & 1) && !(t & 2) && r !== null) e: for (;;) {
    if (r === null) return;
    var o = r.tag;
    if (o === 3 || o === 4) {
      var s = r.stateNode.containerInfo;
      if (s === l || s.nodeType === 8 && s.parentNode === l) break;
      if (o === 4)
        for (o = r.return; o !== null;) {
          var a = o.tag;
          if ((a === 3 || a === 4) && (a = o.stateNode.containerInfo, a === l || a.nodeType === 8 && a.parentNode === l)) return;
          o = o.return
        }
      for (; s !== null;) {
        if (o = jt(s), o === null) return;
        if (a = o.tag, a === 5 || a === 6) {
          r = i = o;
          continue e
        }
        s = s.parentNode
      }
    }
    r = r.return
  }
  Rs(function() {
    var c = i,
      g = to(n),
      h = [];
    e: {
      var m = ua.get(e);
      if (m !== void 0) {
        var w = uo,
          v = e;
        switch (e) {
          case "keypress":
            if (Pr(n) === 0) break e;
          case "keydown":
          case "keyup":
            w = Fd;
            break;
          case "focusin":
            v = "focus", w = Ml;
            break;
          case "focusout":
            v = "blur", w = Ml;
            break;
          case "beforeblur":
          case "afterblur":
            w = Ml;
            break;
          case "click":
            if (n.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            w = lu;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            w = Ed;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            w = Ud;
            break;
          case ra:
          case la:
          case ia:
            w = Pd;
            break;
          case oa:
            w = Vd;
            break;
          case "scroll":
            w = jd;
            break;
          case "wheel":
            w = Qd;
            break;
          case "copy":
          case "cut":
          case "paste":
            w = Ld;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            w = ou
        }
        var y = (t & 4) !== 0,
          P = !y && e === "scroll",
          p = y ? m !== null ? m + "Capture" : null : m;
        y = [];
        for (var d = c, f; d !== null;) {
          f = d;
          var x = f.stateNode;
          if (f.tag === 5 && x !== null && (f = x, p !== null && (x = $n(d, p), x != null && y.push(Wn(d, x, f)))), P) break;
          d = d.return
        }
        0 < y.length && (m = new w(m, v, null, n, g), h.push({
          event: m,
          listeners: y
        }))
      }
    }
    if (!(t & 7)) {
      e: {
        if (m = e === "mouseover" || e === "pointerover", w = e === "mouseout" || e === "pointerout", m && n !== di && (v = n.relatedTarget || n.fromElement) && (jt(v) || v[Xe])) break e;
        if ((w || m) && (m = g.window === g ? g : (m = g.ownerDocument) ? m.defaultView || m.parentWindow : window, w ? (v = n.relatedTarget || n.toElement, w = c, v = v ? jt(v) : null, v !== null && (P = Ot(v), v !== P || v.tag !== 5 && v.tag !== 6) && (v = null)) : (w = null, v = c), w !== v)) {
          if (y = lu, x = "onMouseLeave", p = "onMouseEnter", d = "mouse", (e === "pointerout" || e === "pointerover") && (y = ou, x = "onPointerLeave", p = "onPointerEnter", d = "pointer"), P = w == null ? m : Vt(w), f = v == null ? m : Vt(v), m = new y(x, d + "leave", w, n, g), m.target = P, m.relatedTarget = f, x = null, jt(g) === c && (y = new y(p, d + "enter", v, n, g), y.target = f, y.relatedTarget = P, x = y), P = x, w && v) t: {
            for (y = w, p = v, d = 0, f = y; f; f = It(f)) d++;
            for (f = 0, x = p; x; x = It(x)) f++;
            for (; 0 < d - f;) y = It(y),
            d--;
            for (; 0 < f - d;) p = It(p),
            f--;
            for (; d--;) {
              if (y === p || p !== null && y === p.alternate) break t;
              y = It(y), p = It(p)
            }
            y = null
          }
          else y = null;
          w !== null && gu(h, m, w, y, !1), v !== null && P !== null && gu(h, P, v, y, !0)
        }
      }
      e: {
        if (m = c ? Vt(c) : window, w = m.nodeName && m.nodeName.toLowerCase(), w === "select" || w === "input" && m.type === "file") var j = qd;
        else if (au(m))
          if (Zs) j = tf;
          else {
            j = bd;
            var E = Zd
          }
        else(w = m.nodeName) && w.toLowerCase() === "input" && (m.type === "checkbox" || m.type === "radio") && (j = ef);
        if (j && (j = j(e, c))) {
          qs(h, j, n, g);
          break e
        }
        E && E(e, m, c),
        e === "focusout" && (E = m._wrapperState) && E.controlled && m.type === "number" && oi(m, "number", m.value)
      }
      switch (E = c ? Vt(c) : window, e) {
        case "focusin":
          (au(E) || E.contentEditable === "true") && (Ut = E, yi = c, Tn = null);
          break;
        case "focusout":
          Tn = yi = Ut = null;
          break;
        case "mousedown":
          wi = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          wi = !1, mu(h, n, g);
          break;
        case "selectionchange":
          if (lf) break;
        case "keydown":
        case "keyup":
          mu(h, n, g)
      }
      var C;
      if (ao) e: {
        switch (e) {
          case "compositionstart":
            var _ = "onCompositionStart";
            break e;
          case "compositionend":
            _ = "onCompositionEnd";
            break e;
          case "compositionupdate":
            _ = "onCompositionUpdate";
            break e
        }
        _ = void 0
      }
      else At ? Xs(e, n) && (_ = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (_ = "onCompositionStart");_ && (Gs && n.locale !== "ko" && (At || _ !== "onCompositionStart" ? _ === "onCompositionEnd" && At && (C = Ys()) : (lt = g, oo = "value" in lt ? lt.value : lt.textContent, At = !0)), E = Hr(c, _), 0 < E.length && (_ = new iu(_, e, null, n, g), h.push({
        event: _,
        listeners: E
      }), C ? _.data = C : (C = Js(n), C !== null && (_.data = C)))),
      (C = Kd ? Yd(e, n) : Gd(e, n)) && (c = Hr(c, "onBeforeInput"), 0 < c.length && (g = new iu("onBeforeInput", "beforeinput", null, n, g), h.push({
        event: g,
        listeners: c
      }), g.data = C))
    }
    sa(h, t)
  })
}

function Wn(e, t, n) {
  return {
    instance: e,
    listener: t,
    currentTarget: n
  }
}

function Hr(e, t) {
  for (var n = t + "Capture", r = []; e !== null;) {
    var l = e,
      i = l.stateNode;
    l.tag === 5 && i !== null && (l = i, i = $n(e, n), i != null && r.unshift(Wn(e, i, l)), i = $n(e, t), i != null && r.push(Wn(e, i, l))), e = e.return
  }
  return r
}

function It(e) {
  if (e === null) return null;
  do e = e.return; while (e && e.tag !== 5);
  return e || null
}

function gu(e, t, n, r, l) {
  for (var i = t._reactName, o = []; n !== null && n !== r;) {
    var s = n,
      a = s.alternate,
      c = s.stateNode;
    if (a !== null && a === r) break;
    s.tag === 5 && c !== null && (s = c, l ? (a = $n(n, i), a != null && o.unshift(Wn(n, a, s))) : l || (a = $n(n, i), a != null && o.push(Wn(n, a, s)))), n = n.return
  }
  o.length !== 0 && e.push({
    event: t,
    listeners: o
  })
}
var af = /\r\n?/g,
  cf = /\u0000|\uFFFD/g;

function yu(e) {
  return (typeof e == "string" ? e : "" + e).replace(af, `
`).replace(cf, "")
}

function vr(e, t, n) {
  if (t = yu(t), yu(e) !== t && n) throw Error(S(425))
}

function Qr() {}
var xi = null,
  Si = null;

function ki(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null
}
var ji = typeof setTimeout == "function" ? setTimeout : void 0,
  df = typeof clearTimeout == "function" ? clearTimeout : void 0,
  wu = typeof Promise == "function" ? Promise : void 0,
  ff = typeof queueMicrotask == "function" ? queueMicrotask : typeof wu < "u" ? function(e) {
    return wu.resolve(null).then(e).catch(pf)
  } : ji;

function pf(e) {
  setTimeout(function() {
    throw e
  })
}

function Hl(e, t) {
  var n = t,
    r = 0;
  do {
    var l = n.nextSibling;
    if (e.removeChild(n), l && l.nodeType === 8)
      if (n = l.data, n === "/$") {
        if (r === 0) {
          e.removeChild(l), Bn(t);
          return
        }
        r--
      } else n !== "$" && n !== "$?" && n !== "$!" || r++;
    n = l
  } while (n);
  Bn(t)
}

function at(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (t = e.data, t === "$" || t === "$!" || t === "$?") break;
      if (t === "/$") return null
    }
  }
  return e
}

function xu(e) {
  e = e.previousSibling;
  for (var t = 0; e;) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (t === 0) return e;
        t--
      } else n === "/$" && t++
    }
    e = e.previousSibling
  }
  return null
}
var dn = Math.random().toString(36).slice(2),
  Ue = "__reactFiber$" + dn,
  Kn = "__reactProps$" + dn,
  Xe = "__reactContainer$" + dn,
  Ni = "__reactEvents$" + dn,
  mf = "__reactListeners$" + dn,
  hf = "__reactHandles$" + dn;

function jt(e) {
  var t = e[Ue];
  if (t) return t;
  for (var n = e.parentNode; n;) {
    if (t = n[Xe] || n[Ue]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null)
        for (e = xu(e); e !== null;) {
          if (n = e[Ue]) return n;
          e = xu(e)
        }
      return t
    }
    e = n, n = e.parentNode
  }
  return null
}

function nr(e) {
  return e = e[Ue] || e[Xe], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e
}

function Vt(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(S(33))
}

function dl(e) {
  return e[Kn] || null
}
var Ei = [],
  Ht = -1;

function gt(e) {
  return {
    current: e
  }
}

function $(e) {
  0 > Ht || (e.current = Ei[Ht], Ei[Ht] = null, Ht--)
}

function I(e, t) {
  Ht++, Ei[Ht] = e.current, e.current = t
}
var ht = {},
  ie = gt(ht),
  pe = gt(!1),
  Pt = ht;

function nn(e, t) {
  var n = e.type.contextTypes;
  if (!n) return ht;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
  var l = {},
    i;
  for (i in n) l[i] = t[i];
  return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = l), l
}

function me(e) {
  return e = e.childContextTypes, e != null
}

function Wr() {
  $(pe), $(ie)
}

function Su(e, t, n) {
  if (ie.current !== ht) throw Error(S(168));
  I(ie, t), I(pe, n)
}

function ca(e, t, n) {
  var r = e.stateNode;
  if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
  r = r.getChildContext();
  for (var l in r)
    if (!(l in t)) throw Error(S(108, Zc(e) || "Unknown", l));
  return V({}, n, r)
}

function Kr(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || ht, Pt = ie.current, I(ie, e), I(pe, pe.current), !0
}

function ku(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(S(169));
  n ? (e = ca(e, t, Pt), r.__reactInternalMemoizedMergedChildContext = e, $(pe), $(ie), I(ie, e)) : $(pe), I(pe, n)
}
var Qe = null,
  fl = !1,
  Ql = !1;

function da(e) {
  Qe === null ? Qe = [e] : Qe.push(e)
}

function vf(e) {
  fl = !0, da(e)
}

function yt() {
  if (!Ql && Qe !== null) {
    Ql = !0;
    var e = 0,
      t = M;
    try {
      var n = Qe;
      for (M = 1; e < n.length; e++) {
        var r = n[e];
        do r = r(!0); while (r !== null)
      }
      Qe = null, fl = !1
    } catch (l) {
      throw Qe !== null && (Qe = Qe.slice(e + 1)), Is(no, yt), l
    } finally {
      M = t, Ql = !1
    }
  }
  return null
}
var Qt = [],
  Wt = 0,
  Yr = null,
  Gr = 0,
  ke = [],
  je = 0,
  zt = null,
  We = 1,
  Ke = "";

function St(e, t) {
  Qt[Wt++] = Gr, Qt[Wt++] = Yr, Yr = e, Gr = t
}

function fa(e, t, n) {
  ke[je++] = We, ke[je++] = Ke, ke[je++] = zt, zt = e;
  var r = We;
  e = Ke;
  var l = 32 - Me(r) - 1;
  r &= ~(1 << l), n += 1;
  var i = 32 - Me(t) + l;
  if (30 < i) {
    var o = l - l % 5;
    i = (r & (1 << o) - 1).toString(32), r >>= o, l -= o, We = 1 << 32 - Me(t) + l | n << l | r, Ke = i + e
  } else We = 1 << i | n << l | r, Ke = e
}

function fo(e) {
  e.return !== null && (St(e, 1), fa(e, 1, 0))
}

function po(e) {
  for (; e === Yr;) Yr = Qt[--Wt], Qt[Wt] = null, Gr = Qt[--Wt], Qt[Wt] = null;
  for (; e === zt;) zt = ke[--je], ke[je] = null, Ke = ke[--je], ke[je] = null, We = ke[--je], ke[je] = null
}
var ye = null,
  ge = null,
  A = !1,
  De = null;

function pa(e, t) {
  var n = Ne(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n)
}

function ju(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, ye = e, ge = at(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, ye = e, ge = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = zt !== null ? {
        id: We,
        overflow: Ke
      } : null, e.memoizedState = {
        dehydrated: t,
        treeContext: n,
        retryLane: 1073741824
      }, n = Ne(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, ye = e, ge = null, !0) : !1;
    default:
      return !1
  }
}

function Ci(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0
}

function _i(e) {
  if (A) {
    var t = ge;
    if (t) {
      var n = t;
      if (!ju(e, t)) {
        if (Ci(e)) throw Error(S(418));
        t = at(n.nextSibling);
        var r = ye;
        t && ju(e, t) ? pa(r, n) : (e.flags = e.flags & -4097 | 2, A = !1, ye = e)
      }
    } else {
      if (Ci(e)) throw Error(S(418));
      e.flags = e.flags & -4097 | 2, A = !1, ye = e
    }
  }
}

function Nu(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13;) e = e.return;
  ye = e
}

function gr(e) {
  if (e !== ye) return !1;
  if (!A) return Nu(e), A = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !ki(e.type, e.memoizedProps)), t && (t = ge)) {
    if (Ci(e)) throw ma(), Error(S(418));
    for (; t;) pa(e, t), t = at(t.nextSibling)
  }
  if (Nu(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(S(317));
    e: {
      for (e = e.nextSibling, t = 0; e;) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              ge = at(e.nextSibling);
              break e
            }
            t--
          } else n !== "$" && n !== "$!" && n !== "$?" || t++
        }
        e = e.nextSibling
      }
      ge = null
    }
  } else ge = ye ? at(e.stateNode.nextSibling) : null;
  return !0
}

function ma() {
  for (var e = ge; e;) e = at(e.nextSibling)
}

function rn() {
  ge = ye = null, A = !1
}

function mo(e) {
  De === null ? De = [e] : De.push(e)
}
var gf = Ze.ReactCurrentBatchConfig;

function xn(e, t, n) {
  if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1) throw Error(S(309));
        var r = n.stateNode
      }
      if (!r) throw Error(S(147, e));
      var l = r,
        i = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === i ? t.ref : (t = function(o) {
        var s = l.refs;
        o === null ? delete s[i] : s[i] = o
      }, t._stringRef = i, t)
    }
    if (typeof e != "string") throw Error(S(284));
    if (!n._owner) throw Error(S(290, e))
  }
  return e
}

function yr(e, t) {
  throw e = Object.prototype.toString.call(t), Error(S(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e))
}

function Eu(e) {
  var t = e._init;
  return t(e._payload)
}

function ha(e) {
  function t(p, d) {
    if (e) {
      var f = p.deletions;
      f === null ? (p.deletions = [d], p.flags |= 16) : f.push(d)
    }
  }

  function n(p, d) {
    if (!e) return null;
    for (; d !== null;) t(p, d), d = d.sibling;
    return null
  }

  function r(p, d) {
    for (p = new Map; d !== null;) d.key !== null ? p.set(d.key, d) : p.set(d.index, d), d = d.sibling;
    return p
  }

  function l(p, d) {
    return p = pt(p, d), p.index = 0, p.sibling = null, p
  }

  function i(p, d, f) {
    return p.index = f, e ? (f = p.alternate, f !== null ? (f = f.index, f < d ? (p.flags |= 2, d) : f) : (p.flags |= 2, d)) : (p.flags |= 1048576, d)
  }

  function o(p) {
    return e && p.alternate === null && (p.flags |= 2), p
  }

  function s(p, d, f, x) {
    return d === null || d.tag !== 6 ? (d = ql(f, p.mode, x), d.return = p, d) : (d = l(d, f), d.return = p, d)
  }

  function a(p, d, f, x) {
    var j = f.type;
    return j === $t ? g(p, d, f.props.children, x, f.key) : d !== null && (d.elementType === j || typeof j == "object" && j !== null && j.$$typeof === et && Eu(j) === d.type) ? (x = l(d, f.props), x.ref = xn(p, d, f), x.return = p, x) : (x = Mr(f.type, f.key, f.props, null, p.mode, x), x.ref = xn(p, d, f), x.return = p, x)
  }

  function c(p, d, f, x) {
    return d === null || d.tag !== 4 || d.stateNode.containerInfo !== f.containerInfo || d.stateNode.implementation !== f.implementation ? (d = Zl(f, p.mode, x), d.return = p, d) : (d = l(d, f.children || []), d.return = p, d)
  }

  function g(p, d, f, x, j) {
    return d === null || d.tag !== 7 ? (d = _t(f, p.mode, x, j), d.return = p, d) : (d = l(d, f), d.return = p, d)
  }

  function h(p, d, f) {
    if (typeof d == "string" && d !== "" || typeof d == "number") return d = ql("" + d, p.mode, f), d.return = p, d;
    if (typeof d == "object" && d !== null) {
      switch (d.$$typeof) {
        case ur:
          return f = Mr(d.type, d.key, d.props, null, p.mode, f), f.ref = xn(p, null, d), f.return = p, f;
        case Ft:
          return d = Zl(d, p.mode, f), d.return = p, d;
        case et:
          var x = d._init;
          return h(p, x(d._payload), f)
      }
      if (Nn(d) || hn(d)) return d = _t(d, p.mode, f, null), d.return = p, d;
      yr(p, d)
    }
    return null
  }

  function m(p, d, f, x) {
    var j = d !== null ? d.key : null;
    if (typeof f == "string" && f !== "" || typeof f == "number") return j !== null ? null : s(p, d, "" + f, x);
    if (typeof f == "object" && f !== null) {
      switch (f.$$typeof) {
        case ur:
          return f.key === j ? a(p, d, f, x) : null;
        case Ft:
          return f.key === j ? c(p, d, f, x) : null;
        case et:
          return j = f._init, m(p, d, j(f._payload), x)
      }
      if (Nn(f) || hn(f)) return j !== null ? null : g(p, d, f, x, null);
      yr(p, f)
    }
    return null
  }

  function w(p, d, f, x, j) {
    if (typeof x == "string" && x !== "" || typeof x == "number") return p = p.get(f) || null, s(d, p, "" + x, j);
    if (typeof x == "object" && x !== null) {
      switch (x.$$typeof) {
        case ur:
          return p = p.get(x.key === null ? f : x.key) || null, a(d, p, x, j);
        case Ft:
          return p = p.get(x.key === null ? f : x.key) || null, c(d, p, x, j);
        case et:
          var E = x._init;
          return w(p, d, f, E(x._payload), j)
      }
      if (Nn(x) || hn(x)) return p = p.get(f) || null, g(d, p, x, j, null);
      yr(d, x)
    }
    return null
  }

  function v(p, d, f, x) {
    for (var j = null, E = null, C = d, _ = d = 0, Q = null; C !== null && _ < f.length; _++) {
      C.index > _ ? (Q = C, C = null) : Q = C.sibling;
      var D = m(p, C, f[_], x);
      if (D === null) {
        C === null && (C = Q);
        break
      }
      e && C && D.alternate === null && t(p, C), d = i(D, d, _), E === null ? j = D : E.sibling = D, E = D, C = Q
    }
    if (_ === f.length) return n(p, C), A && St(p, _), j;
    if (C === null) {
      for (; _ < f.length; _++) C = h(p, f[_], x), C !== null && (d = i(C, d, _), E === null ? j = C : E.sibling = C, E = C);
      return A && St(p, _), j
    }
    for (C = r(p, C); _ < f.length; _++) Q = w(C, p, _, f[_], x), Q !== null && (e && Q.alternate !== null && C.delete(Q.key === null ? _ : Q.key), d = i(Q, d, _), E === null ? j = Q : E.sibling = Q, E = Q);
    return e && C.forEach(function(Pe) {
      return t(p, Pe)
    }), A && St(p, _), j
  }

  function y(p, d, f, x) {
    var j = hn(f);
    if (typeof j != "function") throw Error(S(150));
    if (f = j.call(f), f == null) throw Error(S(151));
    for (var E = j = null, C = d, _ = d = 0, Q = null, D = f.next(); C !== null && !D.done; _++, D = f.next()) {
      C.index > _ ? (Q = C, C = null) : Q = C.sibling;
      var Pe = m(p, C, D.value, x);
      if (Pe === null) {
        C === null && (C = Q);
        break
      }
      e && C && Pe.alternate === null && t(p, C), d = i(Pe, d, _), E === null ? j = Pe : E.sibling = Pe, E = Pe, C = Q
    }
    if (D.done) return n(p, C), A && St(p, _), j;
    if (C === null) {
      for (; !D.done; _++, D = f.next()) D = h(p, D.value, x), D !== null && (d = i(D, d, _), E === null ? j = D : E.sibling = D, E = D);
      return A && St(p, _), j
    }
    for (C = r(p, C); !D.done; _++, D = f.next()) D = w(C, p, _, D.value, x), D !== null && (e && D.alternate !== null && C.delete(D.key === null ? _ : D.key), d = i(D, d, _), E === null ? j = D : E.sibling = D, E = D);
    return e && C.forEach(function(pn) {
      return t(p, pn)
    }), A && St(p, _), j
  }

  function P(p, d, f, x) {
    if (typeof f == "object" && f !== null && f.type === $t && f.key === null && (f = f.props.children), typeof f == "object" && f !== null) {
      switch (f.$$typeof) {
        case ur:
          e: {
            for (var j = f.key, E = d; E !== null;) {
              if (E.key === j) {
                if (j = f.type, j === $t) {
                  if (E.tag === 7) {
                    n(p, E.sibling), d = l(E, f.props.children), d.return = p, p = d;
                    break e
                  }
                } else if (E.elementType === j || typeof j == "object" && j !== null && j.$$typeof === et && Eu(j) === E.type) {
                  n(p, E.sibling), d = l(E, f.props), d.ref = xn(p, E, f), d.return = p, p = d;
                  break e
                }
                n(p, E);
                break
              } else t(p, E);
              E = E.sibling
            }
            f.type === $t ? (d = _t(f.props.children, p.mode, x, f.key), d.return = p, p = d) : (x = Mr(f.type, f.key, f.props, null, p.mode, x), x.ref = xn(p, d, f), x.return = p, p = x)
          }
          return o(p);
        case Ft:
          e: {
            for (E = f.key; d !== null;) {
              if (d.key === E)
                if (d.tag === 4 && d.stateNode.containerInfo === f.containerInfo && d.stateNode.implementation === f.implementation) {
                  n(p, d.sibling), d = l(d, f.children || []), d.return = p, p = d;
                  break e
                } else {
                  n(p, d);
                  break
                }
              else t(p, d);
              d = d.sibling
            }
            d = Zl(f, p.mode, x),
            d.return = p,
            p = d
          }
          return o(p);
        case et:
          return E = f._init, P(p, d, E(f._payload), x)
      }
      if (Nn(f)) return v(p, d, f, x);
      if (hn(f)) return y(p, d, f, x);
      yr(p, f)
    }
    return typeof f == "string" && f !== "" || typeof f == "number" ? (f = "" + f, d !== null && d.tag === 6 ? (n(p, d.sibling), d = l(d, f), d.return = p, p = d) : (n(p, d), d = ql(f, p.mode, x), d.return = p, p = d), o(p)) : n(p, d)
  }
  return P
}
var ln = ha(!0),
  va = ha(!1),
  Xr = gt(null),
  Jr = null,
  Kt = null,
  ho = null;

function vo() {
  ho = Kt = Jr = null
}

function go(e) {
  var t = Xr.current;
  $(Xr), e._currentValue = t
}

function Pi(e, t, n) {
  for (; e !== null;) {
    var r = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
    e = e.return
  }
}

function bt(e, t) {
  Jr = e, ho = Kt = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (fe = !0), e.firstContext = null)
}

function Ce(e) {
  var t = e._currentValue;
  if (ho !== e)
    if (e = {
        context: e,
        memoizedValue: t,
        next: null
      }, Kt === null) {
      if (Jr === null) throw Error(S(308));
      Kt = e, Jr.dependencies = {
        lanes: 0,
        firstContext: e
      }
    } else Kt = Kt.next = e;
  return t
}
var Nt = null;

function yo(e) {
  Nt === null ? Nt = [e] : Nt.push(e)
}

function ga(e, t, n, r) {
  var l = t.interleaved;
  return l === null ? (n.next = n, yo(t)) : (n.next = l.next, l.next = n), t.interleaved = n, Je(e, r)
}

function Je(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null;) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null
}
var tt = !1;

function wo(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: {
      pending: null,
      interleaved: null,
      lanes: 0
    },
    effects: null
  }
}

function ya(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
    baseState: e.baseState,
    firstBaseUpdate: e.firstBaseUpdate,
    lastBaseUpdate: e.lastBaseUpdate,
    shared: e.shared,
    effects: e.effects
  })
}

function Ye(e, t) {
  return {
    eventTime: e,
    lane: t,
    tag: 0,
    payload: null,
    callback: null,
    next: null
  }
}

function ct(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (r = r.shared, O & 2) {
    var l = r.pending;
    return l === null ? t.next = t : (t.next = l.next, l.next = t), r.pending = t, Je(e, n)
  }
  return l = r.interleaved, l === null ? (t.next = t, yo(r)) : (t.next = l.next, l.next = t), r.interleaved = t, Je(e, n)
}

function zr(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, ro(e, n)
  }
}

function Cu(e, t) {
  var n = e.updateQueue,
    r = e.alternate;
  if (r !== null && (r = r.updateQueue, n === r)) {
    var l = null,
      i = null;
    if (n = n.firstBaseUpdate, n !== null) {
      do {
        var o = {
          eventTime: n.eventTime,
          lane: n.lane,
          tag: n.tag,
          payload: n.payload,
          callback: n.callback,
          next: null
        };
        i === null ? l = i = o : i = i.next = o, n = n.next
      } while (n !== null);
      i === null ? l = i = t : i = i.next = t
    } else l = i = t;
    n = {
      baseState: r.baseState,
      firstBaseUpdate: l,
      lastBaseUpdate: i,
      shared: r.shared,
      effects: r.effects
    }, e.updateQueue = n;
    return
  }
  e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t
}

function qr(e, t, n, r) {
  var l = e.updateQueue;
  tt = !1;
  var i = l.firstBaseUpdate,
    o = l.lastBaseUpdate,
    s = l.shared.pending;
  if (s !== null) {
    l.shared.pending = null;
    var a = s,
      c = a.next;
    a.next = null, o === null ? i = c : o.next = c, o = a;
    var g = e.alternate;
    g !== null && (g = g.updateQueue, s = g.lastBaseUpdate, s !== o && (s === null ? g.firstBaseUpdate = c : s.next = c, g.lastBaseUpdate = a))
  }
  if (i !== null) {
    var h = l.baseState;
    o = 0, g = c = a = null, s = i;
    do {
      var m = s.lane,
        w = s.eventTime;
      if ((r & m) === m) {
        g !== null && (g = g.next = {
          eventTime: w,
          lane: 0,
          tag: s.tag,
          payload: s.payload,
          callback: s.callback,
          next: null
        });
        e: {
          var v = e,
            y = s;
          switch (m = t, w = n, y.tag) {
            case 1:
              if (v = y.payload, typeof v == "function") {
                h = v.call(w, h, m);
                break e
              }
              h = v;
              break e;
            case 3:
              v.flags = v.flags & -65537 | 128;
            case 0:
              if (v = y.payload, m = typeof v == "function" ? v.call(w, h, m) : v, m == null) break e;
              h = V({}, h, m);
              break e;
            case 2:
              tt = !0
          }
        }
        s.callback !== null && s.lane !== 0 && (e.flags |= 64, m = l.effects, m === null ? l.effects = [s] : m.push(s))
      } else w = {
        eventTime: w,
        lane: m,
        tag: s.tag,
        payload: s.payload,
        callback: s.callback,
        next: null
      }, g === null ? (c = g = w, a = h) : g = g.next = w, o |= m;
      if (s = s.next, s === null) {
        if (s = l.shared.pending, s === null) break;
        m = s, s = m.next, m.next = null, l.lastBaseUpdate = m, l.shared.pending = null
      }
    } while (!0);
    if (g === null && (a = h), l.baseState = a, l.firstBaseUpdate = c, l.lastBaseUpdate = g, t = l.shared.interleaved, t !== null) {
      l = t;
      do o |= l.lane, l = l.next; while (l !== t)
    } else i === null && (l.shared.lanes = 0);
    Tt |= o, e.lanes = o, e.memoizedState = h
  }
}

function _u(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null)
    for (t = 0; t < e.length; t++) {
      var r = e[t],
        l = r.callback;
      if (l !== null) {
        if (r.callback = null, r = n, typeof l != "function") throw Error(S(191, l));
        l.call(r)
      }
    }
}
var rr = {},
  Ve = gt(rr),
  Yn = gt(rr),
  Gn = gt(rr);

function Et(e) {
  if (e === rr) throw Error(S(174));
  return e
}

function xo(e, t) {
  switch (I(Gn, t), I(Yn, e), I(Ve, rr), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : si(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = si(t, e)
  }
  $(Ve), I(Ve, t)
}

function on() {
  $(Ve), $(Yn), $(Gn)
}

function wa(e) {
  Et(Gn.current);
  var t = Et(Ve.current),
    n = si(t, e.type);
  t !== n && (I(Yn, e), I(Ve, n))
}

function So(e) {
  Yn.current === e && ($(Ve), $(Yn))
}
var U = gt(0);

function Zr(e) {
  for (var t = e; t !== null;) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (n !== null && (n = n.dehydrated, n === null || n.data === "$?" || n.data === "$!")) return t
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t
    } else if (t.child !== null) {
      t.child.return = t, t = t.child;
      continue
    }
    if (t === e) break;
    for (; t.sibling === null;) {
      if (t.return === null || t.return === e) return null;
      t = t.return
    }
    t.sibling.return = t.return, t = t.sibling
  }
  return null
}
var Wl = [];

function ko() {
  for (var e = 0; e < Wl.length; e++) Wl[e]._workInProgressVersionPrimary = null;
  Wl.length = 0
}
var Lr = Ze.ReactCurrentDispatcher,
  Kl = Ze.ReactCurrentBatchConfig,
  Lt = 0,
  B = null,
  G = null,
  q = null,
  br = !1,
  Rn = !1,
  Xn = 0,
  yf = 0;

function ne() {
  throw Error(S(321))
}

function jo(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++)
    if (!Fe(e[n], t[n])) return !1;
  return !0
}

function No(e, t, n, r, l, i) {
  if (Lt = i, B = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Lr.current = e === null || e.memoizedState === null ? kf : jf, e = n(r, l), Rn) {
    i = 0;
    do {
      if (Rn = !1, Xn = 0, 25 <= i) throw Error(S(301));
      i += 1, q = G = null, t.updateQueue = null, Lr.current = Nf, e = n(r, l)
    } while (Rn)
  }
  if (Lr.current = el, t = G !== null && G.next !== null, Lt = 0, q = G = B = null, br = !1, t) throw Error(S(300));
  return e
}

function Eo() {
  var e = Xn !== 0;
  return Xn = 0, e
}

function Ae() {
  var e = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null
  };
  return q === null ? B.memoizedState = q = e : q = q.next = e, q
}

function _e() {
  if (G === null) {
    var e = B.alternate;
    e = e !== null ? e.memoizedState : null
  } else e = G.next;
  var t = q === null ? B.memoizedState : q.next;
  if (t !== null) q = t, G = e;
  else {
    if (e === null) throw Error(S(310));
    G = e, e = {
      memoizedState: G.memoizedState,
      baseState: G.baseState,
      baseQueue: G.baseQueue,
      queue: G.queue,
      next: null
    }, q === null ? B.memoizedState = q = e : q = q.next = e
  }
  return q
}

function Jn(e, t) {
  return typeof t == "function" ? t(e) : t
}

function Yl(e) {
  var t = _e(),
    n = t.queue;
  if (n === null) throw Error(S(311));
  n.lastRenderedReducer = e;
  var r = G,
    l = r.baseQueue,
    i = n.pending;
  if (i !== null) {
    if (l !== null) {
      var o = l.next;
      l.next = i.next, i.next = o
    }
    r.baseQueue = l = i, n.pending = null
  }
  if (l !== null) {
    i = l.next, r = r.baseState;
    var s = o = null,
      a = null,
      c = i;
    do {
      var g = c.lane;
      if ((Lt & g) === g) a !== null && (a = a.next = {
        lane: 0,
        action: c.action,
        hasEagerState: c.hasEagerState,
        eagerState: c.eagerState,
        next: null
      }), r = c.hasEagerState ? c.eagerState : e(r, c.action);
      else {
        var h = {
          lane: g,
          action: c.action,
          hasEagerState: c.hasEagerState,
          eagerState: c.eagerState,
          next: null
        };
        a === null ? (s = a = h, o = r) : a = a.next = h, B.lanes |= g, Tt |= g
      }
      c = c.next
    } while (c !== null && c !== i);
    a === null ? o = r : a.next = s, Fe(r, t.memoizedState) || (fe = !0), t.memoizedState = r, t.baseState = o, t.baseQueue = a, n.lastRenderedState = r
  }
  if (e = n.interleaved, e !== null) {
    l = e;
    do i = l.lane, B.lanes |= i, Tt |= i, l = l.next; while (l !== e)
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch]
}

function Gl(e) {
  var t = _e(),
    n = t.queue;
  if (n === null) throw Error(S(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch,
    l = n.pending,
    i = t.memoizedState;
  if (l !== null) {
    n.pending = null;
    var o = l = l.next;
    do i = e(i, o.action), o = o.next; while (o !== l);
    Fe(i, t.memoizedState) || (fe = !0), t.memoizedState = i, t.baseQueue === null && (t.baseState = i), n.lastRenderedState = i
  }
  return [i, r]
}

function xa() {}

function Sa(e, t) {
  var n = B,
    r = _e(),
    l = t(),
    i = !Fe(r.memoizedState, l);
  if (i && (r.memoizedState = l, fe = !0), r = r.queue, Co(Na.bind(null, n, r, e), [e]), r.getSnapshot !== t || i || q !== null && q.memoizedState.tag & 1) {
    if (n.flags |= 2048, qn(9, ja.bind(null, n, r, l, t), void 0, null), Z === null) throw Error(S(349));
    Lt & 30 || ka(n, t, l)
  }
  return l
}

function ka(e, t, n) {
  e.flags |= 16384, e = {
    getSnapshot: t,
    value: n
  }, t = B.updateQueue, t === null ? (t = {
    lastEffect: null,
    stores: null
  }, B.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e))
}

function ja(e, t, n, r) {
  t.value = n, t.getSnapshot = r, Ea(t) && Ca(e)
}

function Na(e, t, n) {
  return n(function() {
    Ea(t) && Ca(e)
  })
}

function Ea(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Fe(e, n)
  } catch {
    return !0
  }
}

function Ca(e) {
  var t = Je(e, 1);
  t !== null && Ie(t, e, 1, -1)
}

function Pu(e) {
  var t = Ae();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = {
    pending: null,
    interleaved: null,
    lanes: 0,
    dispatch: null,
    lastRenderedReducer: Jn,
    lastRenderedState: e
  }, t.queue = e, e = e.dispatch = Sf.bind(null, B, e), [t.memoizedState, e]
}

function qn(e, t, n, r) {
  return e = {
    tag: e,
    create: t,
    destroy: n,
    deps: r,
    next: null
  }, t = B.updateQueue, t === null ? (t = {
    lastEffect: null,
    stores: null
  }, B.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e
}

function _a() {
  return _e().memoizedState
}

function Tr(e, t, n, r) {
  var l = Ae();
  B.flags |= e, l.memoizedState = qn(1 | t, n, void 0, r === void 0 ? null : r)
}

function pl(e, t, n, r) {
  var l = _e();
  r = r === void 0 ? null : r;
  var i = void 0;
  if (G !== null) {
    var o = G.memoizedState;
    if (i = o.destroy, r !== null && jo(r, o.deps)) {
      l.memoizedState = qn(t, n, i, r);
      return
    }
  }
  B.flags |= e, l.memoizedState = qn(1 | t, n, i, r)
}

function zu(e, t) {
  return Tr(8390656, 8, e, t)
}

function Co(e, t) {
  return pl(2048, 8, e, t)
}

function Pa(e, t) {
  return pl(4, 2, e, t)
}

function za(e, t) {
  return pl(4, 4, e, t)
}

function La(e, t) {
  if (typeof t == "function") return e = e(), t(e),
    function() {
      t(null)
    };
  if (t != null) return e = e(), t.current = e,
    function() {
      t.current = null
    }
}

function Ta(e, t, n) {
  return n = n != null ? n.concat([e]) : null, pl(4, 4, La.bind(null, t, e), n)
}

function _o() {}

function Ra(e, t) {
  var n = _e();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && jo(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e)
}

function Da(e, t) {
  var n = _e();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && jo(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e)
}

function Oa(e, t, n) {
  return Lt & 21 ? (Fe(n, t) || (n = As(), B.lanes |= n, Tt |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, fe = !0), e.memoizedState = n)
}

function wf(e, t) {
  var n = M;
  M = n !== 0 && 4 > n ? n : 4, e(!0);
  var r = Kl.transition;
  Kl.transition = {};
  try {
    e(!1), t()
  } finally {
    M = n, Kl.transition = r
  }
}

function Ma() {
  return _e().memoizedState
}

function xf(e, t, n) {
  var r = ft(e);
  if (n = {
      lane: r,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Ia(e)) Fa(t, n);
  else if (n = ga(e, t, n, r), n !== null) {
    var l = se();
    Ie(n, e, r, l), $a(n, t, r)
  }
}

function Sf(e, t, n) {
  var r = ft(e),
    l = {
      lane: r,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
  if (Ia(e)) Fa(t, l);
  else {
    var i = e.alternate;
    if (e.lanes === 0 && (i === null || i.lanes === 0) && (i = t.lastRenderedReducer, i !== null)) try {
      var o = t.lastRenderedState,
        s = i(o, n);
      if (l.hasEagerState = !0, l.eagerState = s, Fe(s, o)) {
        var a = t.interleaved;
        a === null ? (l.next = l, yo(t)) : (l.next = a.next, a.next = l), t.interleaved = l;
        return
      }
    } catch {} finally {}
    n = ga(e, t, l, r), n !== null && (l = se(), Ie(n, e, r, l), $a(n, t, r))
  }
}

function Ia(e) {
  var t = e.alternate;
  return e === B || t !== null && t === B
}

function Fa(e, t) {
  Rn = br = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t
}

function $a(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, ro(e, n)
  }
}
var el = {
    readContext: Ce,
    useCallback: ne,
    useContext: ne,
    useEffect: ne,
    useImperativeHandle: ne,
    useInsertionEffect: ne,
    useLayoutEffect: ne,
    useMemo: ne,
    useReducer: ne,
    useRef: ne,
    useState: ne,
    useDebugValue: ne,
    useDeferredValue: ne,
    useTransition: ne,
    useMutableSource: ne,
    useSyncExternalStore: ne,
    useId: ne,
    unstable_isNewReconciler: !1
  },
  kf = {
    readContext: Ce,
    useCallback: function(e, t) {
      return Ae().memoizedState = [e, t === void 0 ? null : t], e
    },
    useContext: Ce,
    useEffect: zu,
    useImperativeHandle: function(e, t, n) {
      return n = n != null ? n.concat([e]) : null, Tr(4194308, 4, La.bind(null, t, e), n)
    },
    useLayoutEffect: function(e, t) {
      return Tr(4194308, 4, e, t)
    },
    useInsertionEffect: function(e, t) {
      return Tr(4, 2, e, t)
    },
    useMemo: function(e, t) {
      var n = Ae();
      return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e
    },
    useReducer: function(e, t, n) {
      var r = Ae();
      return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = {
        pending: null,
        interleaved: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: t
      }, r.queue = e, e = e.dispatch = xf.bind(null, B, e), [r.memoizedState, e]
    },
    useRef: function(e) {
      var t = Ae();
      return e = {
        current: e
      }, t.memoizedState = e
    },
    useState: Pu,
    useDebugValue: _o,
    useDeferredValue: function(e) {
      return Ae().memoizedState = e
    },
    useTransition: function() {
      var e = Pu(!1),
        t = e[0];
      return e = wf.bind(null, e[1]), Ae().memoizedState = e, [t, e]
    },
    useMutableSource: function() {},
    useSyncExternalStore: function(e, t, n) {
      var r = B,
        l = Ae();
      if (A) {
        if (n === void 0) throw Error(S(407));
        n = n()
      } else {
        if (n = t(), Z === null) throw Error(S(349));
        Lt & 30 || ka(r, t, n)
      }
      l.memoizedState = n;
      var i = {
        value: n,
        getSnapshot: t
      };
      return l.queue = i, zu(Na.bind(null, r, i, e), [e]), r.flags |= 2048, qn(9, ja.bind(null, r, i, n, t), void 0, null), n
    },
    useId: function() {
      var e = Ae(),
        t = Z.identifierPrefix;
      if (A) {
        var n = Ke,
          r = We;
        n = (r & ~(1 << 32 - Me(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = Xn++, 0 < n && (t += "H" + n.toString(32)), t += ":"
      } else n = yf++, t = ":" + t + "r" + n.toString(32) + ":";
      return e.memoizedState = t
    },
    unstable_isNewReconciler: !1
  },
  jf = {
    readContext: Ce,
    useCallback: Ra,
    useContext: Ce,
    useEffect: Co,
    useImperativeHandle: Ta,
    useInsertionEffect: Pa,
    useLayoutEffect: za,
    useMemo: Da,
    useReducer: Yl,
    useRef: _a,
    useState: function() {
      return Yl(Jn)
    },
    useDebugValue: _o,
    useDeferredValue: function(e) {
      var t = _e();
      return Oa(t, G.memoizedState, e)
    },
    useTransition: function() {
      var e = Yl(Jn)[0],
        t = _e().memoizedState;
      return [e, t]
    },
    useMutableSource: xa,
    useSyncExternalStore: Sa,
    useId: Ma,
    unstable_isNewReconciler: !1
  },
  Nf = {
    readContext: Ce,
    useCallback: Ra,
    useContext: Ce,
    useEffect: Co,
    useImperativeHandle: Ta,
    useInsertionEffect: Pa,
    useLayoutEffect: za,
    useMemo: Da,
    useReducer: Gl,
    useRef: _a,
    useState: function() {
      return Gl(Jn)
    },
    useDebugValue: _o,
    useDeferredValue: function(e) {
      var t = _e();
      return G === null ? t.memoizedState = e : Oa(t, G.memoizedState, e)
    },
    useTransition: function() {
      var e = Gl(Jn)[0],
        t = _e().memoizedState;
      return [e, t]
    },
    useMutableSource: xa,
    useSyncExternalStore: Sa,
    useId: Ma,
    unstable_isNewReconciler: !1
  };

function Le(e, t) {
  if (e && e.defaultProps) {
    t = V({}, t), e = e.defaultProps;
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t
  }
  return t
}

function zi(e, t, n, r) {
  t = e.memoizedState, n = n(r, t), n = n == null ? t : V({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n)
}
var ml = {
  isMounted: function(e) {
    return (e = e._reactInternals) ? Ot(e) === e : !1
  },
  enqueueSetState: function(e, t, n) {
    e = e._reactInternals;
    var r = se(),
      l = ft(e),
      i = Ye(r, l);
    i.payload = t, n != null && (i.callback = n), t = ct(e, i, l), t !== null && (Ie(t, e, l, r), zr(t, e, l))
  },
  enqueueReplaceState: function(e, t, n) {
    e = e._reactInternals;
    var r = se(),
      l = ft(e),
      i = Ye(r, l);
    i.tag = 1, i.payload = t, n != null && (i.callback = n), t = ct(e, i, l), t !== null && (Ie(t, e, l, r), zr(t, e, l))
  },
  enqueueForceUpdate: function(e, t) {
    e = e._reactInternals;
    var n = se(),
      r = ft(e),
      l = Ye(n, r);
    l.tag = 2, t != null && (l.callback = t), t = ct(e, l, r), t !== null && (Ie(t, e, r, n), zr(t, e, r))
  }
};

function Lu(e, t, n, r, l, i, o) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, i, o) : t.prototype && t.prototype.isPureReactComponent ? !Hn(n, r) || !Hn(l, i) : !0
}

function Aa(e, t, n) {
  var r = !1,
    l = ht,
    i = t.contextType;
  return typeof i == "object" && i !== null ? i = Ce(i) : (l = me(t) ? Pt : ie.current, r = t.contextTypes, i = (r = r != null) ? nn(e, l) : ht), t = new t(n, i), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = ml, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = i), t
}

function Tu(e, t, n, r) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && ml.enqueueReplaceState(t, t.state, null)
}

function Li(e, t, n, r) {
  var l = e.stateNode;
  l.props = n, l.state = e.memoizedState, l.refs = {}, wo(e);
  var i = t.contextType;
  typeof i == "object" && i !== null ? l.context = Ce(i) : (i = me(t) ? Pt : ie.current, l.context = nn(e, i)), l.state = e.memoizedState, i = t.getDerivedStateFromProps, typeof i == "function" && (zi(e, t, i, n), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && ml.enqueueReplaceState(l, l.state, null), qr(e, n, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308)
}

function un(e, t) {
  try {
    var n = "",
      r = t;
    do n += qc(r), r = r.return; while (r);
    var l = n
  } catch (i) {
    l = `
Error generating stack: ` + i.message + `
` + i.stack
  }
  return {
    value: e,
    source: t,
    stack: l,
    digest: null
  }
}

function Xl(e, t, n) {
  return {
    value: e,
    source: null,
    stack: n ?? null,
    digest: t ?? null
  }
}

function Ti(e, t) {
  try {
    console.error(t.value)
  } catch (n) {
    setTimeout(function() {
      throw n
    })
  }
}
var Ef = typeof WeakMap == "function" ? WeakMap : Map;

function Ua(e, t, n) {
  n = Ye(-1, n), n.tag = 3, n.payload = {
    element: null
  };
  var r = t.value;
  return n.callback = function() {
    nl || (nl = !0, Bi = r), Ti(e, t)
  }, n
}

function Ba(e, t, n) {
  n = Ye(-1, n), n.tag = 3;
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var l = t.value;
    n.payload = function() {
      return r(l)
    }, n.callback = function() {
      Ti(e, t)
    }
  }
  var i = e.stateNode;
  return i !== null && typeof i.componentDidCatch == "function" && (n.callback = function() {
    Ti(e, t), typeof r != "function" && (dt === null ? dt = new Set([this]) : dt.add(this));
    var o = t.stack;
    this.componentDidCatch(t.value, {
      componentStack: o !== null ? o : ""
    })
  }), n
}

function Ru(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new Ef;
    var l = new Set;
    r.set(t, l)
  } else l = r.get(t), l === void 0 && (l = new Set, r.set(t, l));
  l.has(n) || (l.add(n), e = Af.bind(null, e, t, n), t.then(e, e))
}

function Du(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return
  } while (e !== null);
  return null
}

function Ou(e, t, n, r, l) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = l, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = Ye(-1, 1), t.tag = 2, ct(n, t, 1))), n.lanes |= 1), e)
}
var Cf = Ze.ReactCurrentOwner,
  fe = !1;

function oe(e, t, n, r) {
  t.child = e === null ? va(t, null, n, r) : ln(t, e.child, n, r)
}

function Mu(e, t, n, r, l) {
  n = n.render;
  var i = t.ref;
  return bt(t, l), r = No(e, t, n, r, i, l), n = Eo(), e !== null && !fe ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, qe(e, t, l)) : (A && n && fo(t), t.flags |= 1, oe(e, t, r, l), t.child)
}

function Iu(e, t, n, r, l) {
  if (e === null) {
    var i = n.type;
    return typeof i == "function" && !Mo(i) && i.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = i, Va(e, t, i, r, l)) : (e = Mr(n.type, null, r, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e)
  }
  if (i = e.child, !(e.lanes & l)) {
    var o = i.memoizedProps;
    if (n = n.compare, n = n !== null ? n : Hn, n(o, r) && e.ref === t.ref) return qe(e, t, l)
  }
  return t.flags |= 1, e = pt(i, r), e.ref = t.ref, e.return = t, t.child = e
}

function Va(e, t, n, r, l) {
  if (e !== null) {
    var i = e.memoizedProps;
    if (Hn(i, r) && e.ref === t.ref)
      if (fe = !1, t.pendingProps = r = i, (e.lanes & l) !== 0) e.flags & 131072 && (fe = !0);
      else return t.lanes = e.lanes, qe(e, t, l)
  }
  return Ri(e, t, n, r, l)
}

function Ha(e, t, n) {
  var r = t.pendingProps,
    l = r.children,
    i = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden")
    if (!(t.mode & 1)) t.memoizedState = {
      baseLanes: 0,
      cachePool: null,
      transitions: null
    }, I(Gt, ve), ve |= n;
    else {
      if (!(n & 1073741824)) return e = i !== null ? i.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = {
        baseLanes: e,
        cachePool: null,
        transitions: null
      }, t.updateQueue = null, I(Gt, ve), ve |= e, null;
      t.memoizedState = {
        baseLanes: 0,
        cachePool: null,
        transitions: null
      }, r = i !== null ? i.baseLanes : n, I(Gt, ve), ve |= r
    }
  else i !== null ? (r = i.baseLanes | n, t.memoizedState = null) : r = n, I(Gt, ve), ve |= r;
  return oe(e, t, l, n), t.child
}

function Qa(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152)
}

function Ri(e, t, n, r, l) {
  var i = me(n) ? Pt : ie.current;
  return i = nn(t, i), bt(t, l), n = No(e, t, n, r, i, l), r = Eo(), e !== null && !fe ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, qe(e, t, l)) : (A && r && fo(t), t.flags |= 1, oe(e, t, n, l), t.child)
}

function Fu(e, t, n, r, l) {
  if (me(n)) {
    var i = !0;
    Kr(t)
  } else i = !1;
  if (bt(t, l), t.stateNode === null) Rr(e, t), Aa(t, n, r), Li(t, n, r, l), r = !0;
  else if (e === null) {
    var o = t.stateNode,
      s = t.memoizedProps;
    o.props = s;
    var a = o.context,
      c = n.contextType;
    typeof c == "object" && c !== null ? c = Ce(c) : (c = me(n) ? Pt : ie.current, c = nn(t, c));
    var g = n.getDerivedStateFromProps,
      h = typeof g == "function" || typeof o.getSnapshotBeforeUpdate == "function";
    h || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (s !== r || a !== c) && Tu(t, o, r, c), tt = !1;
    var m = t.memoizedState;
    o.state = m, qr(t, r, o, l), a = t.memoizedState, s !== r || m !== a || pe.current || tt ? (typeof g == "function" && (zi(t, n, g, r), a = t.memoizedState), (s = tt || Lu(t, n, s, r, m, a, c)) ? (h || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount()), typeof o.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = a), o.props = r, o.state = a, o.context = c, r = s) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), r = !1)
  } else {
    o = t.stateNode, ya(e, t), s = t.memoizedProps, c = t.type === t.elementType ? s : Le(t.type, s), o.props = c, h = t.pendingProps, m = o.context, a = n.contextType, typeof a == "object" && a !== null ? a = Ce(a) : (a = me(n) ? Pt : ie.current, a = nn(t, a));
    var w = n.getDerivedStateFromProps;
    (g = typeof w == "function" || typeof o.getSnapshotBeforeUpdate == "function") || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (s !== h || m !== a) && Tu(t, o, r, a), tt = !1, m = t.memoizedState, o.state = m, qr(t, r, o, l);
    var v = t.memoizedState;
    s !== h || m !== v || pe.current || tt ? (typeof w == "function" && (zi(t, n, w, r), v = t.memoizedState), (c = tt || Lu(t, n, c, r, m, v, a) || !1) ? (g || typeof o.UNSAFE_componentWillUpdate != "function" && typeof o.componentWillUpdate != "function" || (typeof o.componentWillUpdate == "function" && o.componentWillUpdate(r, v, a), typeof o.UNSAFE_componentWillUpdate == "function" && o.UNSAFE_componentWillUpdate(r, v, a)), typeof o.componentDidUpdate == "function" && (t.flags |= 4), typeof o.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof o.componentDidUpdate != "function" || s === e.memoizedProps && m === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || s === e.memoizedProps && m === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = v), o.props = r, o.state = v, o.context = a, r = c) : (typeof o.componentDidUpdate != "function" || s === e.memoizedProps && m === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || s === e.memoizedProps && m === e.memoizedState || (t.flags |= 1024), r = !1)
  }
  return Di(e, t, n, r, i, l)
}

function Di(e, t, n, r, l, i) {
  Qa(e, t);
  var o = (t.flags & 128) !== 0;
  if (!r && !o) return l && ku(t, n, !1), qe(e, t, i);
  r = t.stateNode, Cf.current = t;
  var s = o && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return t.flags |= 1, e !== null && o ? (t.child = ln(t, e.child, null, i), t.child = ln(t, null, s, i)) : oe(e, t, s, i), t.memoizedState = r.state, l && ku(t, n, !0), t.child
}

function Wa(e) {
  var t = e.stateNode;
  t.pendingContext ? Su(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Su(e, t.context, !1), xo(e, t.containerInfo)
}

function $u(e, t, n, r, l) {
  return rn(), mo(l), t.flags |= 256, oe(e, t, n, r), t.child
}
var Oi = {
  dehydrated: null,
  treeContext: null,
  retryLane: 0
};

function Mi(e) {
  return {
    baseLanes: e,
    cachePool: null,
    transitions: null
  }
}

function Ka(e, t, n) {
  var r = t.pendingProps,
    l = U.current,
    i = !1,
    o = (t.flags & 128) !== 0,
    s;
  if ((s = o) || (s = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), s ? (i = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), I(U, l & 1), e === null) return _i(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (o = r.children, e = r.fallback, i ? (r = t.mode, i = t.child, o = {
    mode: "hidden",
    children: o
  }, !(r & 1) && i !== null ? (i.childLanes = 0, i.pendingProps = o) : i = gl(o, r, 0, null), e = _t(e, r, n, null), i.return = t, e.return = t, i.sibling = e, t.child = i, t.child.memoizedState = Mi(n), t.memoizedState = Oi, e) : Po(t, o));
  if (l = e.memoizedState, l !== null && (s = l.dehydrated, s !== null)) return _f(e, t, o, r, s, l, n);
  if (i) {
    i = r.fallback, o = t.mode, l = e.child, s = l.sibling;
    var a = {
      mode: "hidden",
      children: r.children
    };
    return !(o & 1) && t.child !== l ? (r = t.child, r.childLanes = 0, r.pendingProps = a, t.deletions = null) : (r = pt(l, a), r.subtreeFlags = l.subtreeFlags & 14680064), s !== null ? i = pt(s, i) : (i = _t(i, o, n, null), i.flags |= 2), i.return = t, r.return = t, r.sibling = i, t.child = r, r = i, i = t.child, o = e.child.memoizedState, o = o === null ? Mi(n) : {
      baseLanes: o.baseLanes | n,
      cachePool: null,
      transitions: o.transitions
    }, i.memoizedState = o, i.childLanes = e.childLanes & ~n, t.memoizedState = Oi, r
  }
  return i = e.child, e = i.sibling, r = pt(i, {
    mode: "visible",
    children: r.children
  }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r
}

function Po(e, t) {
  return t = gl({
    mode: "visible",
    children: t
  }, e.mode, 0, null), t.return = e, e.child = t
}

function wr(e, t, n, r) {
  return r !== null && mo(r), ln(t, e.child, null, n), e = Po(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e
}

function _f(e, t, n, r, l, i, o) {
  if (n) return t.flags & 256 ? (t.flags &= -257, r = Xl(Error(S(422))), wr(e, t, o, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (i = r.fallback, l = t.mode, r = gl({
    mode: "visible",
    children: r.children
  }, l, 0, null), i = _t(i, l, o, null), i.flags |= 2, r.return = t, i.return = t, r.sibling = i, t.child = r, t.mode & 1 && ln(t, e.child, null, o), t.child.memoizedState = Mi(o), t.memoizedState = Oi, i);
  if (!(t.mode & 1)) return wr(e, t, o, null);
  if (l.data === "$!") {
    if (r = l.nextSibling && l.nextSibling.dataset, r) var s = r.dgst;
    return r = s, i = Error(S(419)), r = Xl(i, r, void 0), wr(e, t, o, r)
  }
  if (s = (o & e.childLanes) !== 0, fe || s) {
    if (r = Z, r !== null) {
      switch (o & -o) {
        case 4:
          l = 2;
          break;
        case 16:
          l = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          l = 32;
          break;
        case 536870912:
          l = 268435456;
          break;
        default:
          l = 0
      }
      l = l & (r.suspendedLanes | o) ? 0 : l, l !== 0 && l !== i.retryLane && (i.retryLane = l, Je(e, l), Ie(r, e, l, -1))
    }
    return Oo(), r = Xl(Error(S(421))), wr(e, t, o, r)
  }
  return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = Uf.bind(null, e), l._reactRetry = t, null) : (e = i.treeContext, ge = at(l.nextSibling), ye = t, A = !0, De = null, e !== null && (ke[je++] = We, ke[je++] = Ke, ke[je++] = zt, We = e.id, Ke = e.overflow, zt = t), t = Po(t, r.children), t.flags |= 4096, t)
}

function Au(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), Pi(e.return, t, n)
}

function Jl(e, t, n, r, l) {
  var i = e.memoizedState;
  i === null ? e.memoizedState = {
    isBackwards: t,
    rendering: null,
    renderingStartTime: 0,
    last: r,
    tail: n,
    tailMode: l
  } : (i.isBackwards = t, i.rendering = null, i.renderingStartTime = 0, i.last = r, i.tail = n, i.tailMode = l)
}

function Ya(e, t, n) {
  var r = t.pendingProps,
    l = r.revealOrder,
    i = r.tail;
  if (oe(e, t, r.children, n), r = U.current, r & 2) r = r & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128) e: for (e = t.child; e !== null;) {
      if (e.tag === 13) e.memoizedState !== null && Au(e, n, t);
      else if (e.tag === 19) Au(e, n, t);
      else if (e.child !== null) {
        e.child.return = e, e = e.child;
        continue
      }
      if (e === t) break e;
      for (; e.sibling === null;) {
        if (e.return === null || e.return === t) break e;
        e = e.return
      }
      e.sibling.return = e.return, e = e.sibling
    }
    r &= 1
  }
  if (I(U, r), !(t.mode & 1)) t.memoizedState = null;
  else switch (l) {
    case "forwards":
      for (n = t.child, l = null; n !== null;) e = n.alternate, e !== null && Zr(e) === null && (l = n), n = n.sibling;
      n = l, n === null ? (l = t.child, t.child = null) : (l = n.sibling, n.sibling = null), Jl(t, !1, l, n, i);
      break;
    case "backwards":
      for (n = null, l = t.child, t.child = null; l !== null;) {
        if (e = l.alternate, e !== null && Zr(e) === null) {
          t.child = l;
          break
        }
        e = l.sibling, l.sibling = n, n = l, l = e
      }
      Jl(t, !0, n, null, i);
      break;
    case "together":
      Jl(t, !1, null, null, void 0);
      break;
    default:
      t.memoizedState = null
  }
  return t.child
}

function Rr(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2)
}

function qe(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), Tt |= t.lanes, !(n & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(S(153));
  if (t.child !== null) {
    for (e = t.child, n = pt(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = pt(e, e.pendingProps), n.return = t;
    n.sibling = null
  }
  return t.child
}

function Pf(e, t, n) {
  switch (t.tag) {
    case 3:
      Wa(t), rn();
      break;
    case 5:
      wa(t);
      break;
    case 1:
      me(t.type) && Kr(t);
      break;
    case 4:
      xo(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context,
        l = t.memoizedProps.value;
      I(Xr, r._currentValue), r._currentValue = l;
      break;
    case 13:
      if (r = t.memoizedState, r !== null) return r.dehydrated !== null ? (I(U, U.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? Ka(e, t, n) : (I(U, U.current & 1), e = qe(e, t, n), e !== null ? e.sibling : null);
      I(U, U.current & 1);
      break;
    case 19:
      if (r = (n & t.childLanes) !== 0, e.flags & 128) {
        if (r) return Ya(e, t, n);
        t.flags |= 128
      }
      if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), I(U, U.current), r) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, Ha(e, t, n)
  }
  return qe(e, t, n)
}
var Ga, Ii, Xa, Ja;
Ga = function(e, t) {
  for (var n = t.child; n !== null;) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      n.child.return = n, n = n.child;
      continue
    }
    if (n === t) break;
    for (; n.sibling === null;) {
      if (n.return === null || n.return === t) return;
      n = n.return
    }
    n.sibling.return = n.return, n = n.sibling
  }
};
Ii = function() {};
Xa = function(e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    e = t.stateNode, Et(Ve.current);
    var i = null;
    switch (n) {
      case "input":
        l = li(e, l), r = li(e, r), i = [];
        break;
      case "select":
        l = V({}, l, {
          value: void 0
        }), r = V({}, r, {
          value: void 0
        }), i = [];
        break;
      case "textarea":
        l = ui(e, l), r = ui(e, r), i = [];
        break;
      default:
        typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = Qr)
    }
    ai(n, r);
    var o;
    n = null;
    for (c in l)
      if (!r.hasOwnProperty(c) && l.hasOwnProperty(c) && l[c] != null)
        if (c === "style") {
          var s = l[c];
          for (o in s) s.hasOwnProperty(o) && (n || (n = {}), n[o] = "")
        } else c !== "dangerouslySetInnerHTML" && c !== "children" && c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && c !== "autoFocus" && (In.hasOwnProperty(c) ? i || (i = []) : (i = i || []).push(c, null));
    for (c in r) {
      var a = r[c];
      if (s = l != null ? l[c] : void 0, r.hasOwnProperty(c) && a !== s && (a != null || s != null))
        if (c === "style")
          if (s) {
            for (o in s) !s.hasOwnProperty(o) || a && a.hasOwnProperty(o) || (n || (n = {}), n[o] = "");
            for (o in a) a.hasOwnProperty(o) && s[o] !== a[o] && (n || (n = {}), n[o] = a[o])
          } else n || (i || (i = []), i.push(c, n)), n = a;
      else c === "dangerouslySetInnerHTML" ? (a = a ? a.__html : void 0, s = s ? s.__html : void 0, a != null && s !== a && (i = i || []).push(c, a)) : c === "children" ? typeof a != "string" && typeof a != "number" || (i = i || []).push(c, "" + a) : c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && (In.hasOwnProperty(c) ? (a != null && c === "onScroll" && F("scroll", e), i || s === a || (i = [])) : (i = i || []).push(c, a))
    }
    n && (i = i || []).push("style", n);
    var c = i;
    (t.updateQueue = c) && (t.flags |= 4)
  }
};
Ja = function(e, t, n, r) {
  n !== r && (t.flags |= 4)
};

function Sn(e, t) {
  if (!A) switch (e.tailMode) {
    case "hidden":
      t = e.tail;
      for (var n = null; t !== null;) t.alternate !== null && (n = t), t = t.sibling;
      n === null ? e.tail = null : n.sibling = null;
      break;
    case "collapsed":
      n = e.tail;
      for (var r = null; n !== null;) n.alternate !== null && (r = n), n = n.sibling;
      r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null
  }
}

function re(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    n = 0,
    r = 0;
  if (t)
    for (var l = e.child; l !== null;) n |= l.lanes | l.childLanes, r |= l.subtreeFlags & 14680064, r |= l.flags & 14680064, l.return = e, l = l.sibling;
  else
    for (l = e.child; l !== null;) n |= l.lanes | l.childLanes, r |= l.subtreeFlags, r |= l.flags, l.return = e, l = l.sibling;
  return e.subtreeFlags |= r, e.childLanes = n, t
}

function zf(e, t, n) {
  var r = t.pendingProps;
  switch (po(t), t.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return re(t), null;
    case 1:
      return me(t.type) && Wr(), re(t), null;
    case 3:
      return r = t.stateNode, on(), $(pe), $(ie), ko(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (gr(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, De !== null && (Qi(De), De = null))), Ii(e, t), re(t), null;
    case 5:
      So(t);
      var l = Et(Gn.current);
      if (n = t.type, e !== null && t.stateNode != null) Xa(e, t, n, r, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(S(166));
          return re(t), null
        }
        if (e = Et(Ve.current), gr(t)) {
          r = t.stateNode, n = t.type;
          var i = t.memoizedProps;
          switch (r[Ue] = t, r[Kn] = i, e = (t.mode & 1) !== 0, n) {
            case "dialog":
              F("cancel", r), F("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              F("load", r);
              break;
            case "video":
            case "audio":
              for (l = 0; l < Cn.length; l++) F(Cn[l], r);
              break;
            case "source":
              F("error", r);
              break;
            case "img":
            case "image":
            case "link":
              F("error", r), F("load", r);
              break;
            case "details":
              F("toggle", r);
              break;
            case "input":
              Go(r, i), F("invalid", r);
              break;
            case "select":
              r._wrapperState = {
                wasMultiple: !!i.multiple
              }, F("invalid", r);
              break;
            case "textarea":
              Jo(r, i), F("invalid", r)
          }
          ai(n, i), l = null;
          for (var o in i)
            if (i.hasOwnProperty(o)) {
              var s = i[o];
              o === "children" ? typeof s == "string" ? r.textContent !== s && (i.suppressHydrationWarning !== !0 && vr(r.textContent, s, e), l = ["children", s]) : typeof s == "number" && r.textContent !== "" + s && (i.suppressHydrationWarning !== !0 && vr(r.textContent, s, e), l = ["children", "" + s]) : In.hasOwnProperty(o) && s != null && o === "onScroll" && F("scroll", r)
            } switch (n) {
            case "input":
              sr(r), Xo(r, i, !0);
              break;
            case "textarea":
              sr(r), qo(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof i.onClick == "function" && (r.onclick = Qr)
          }
          r = l, t.updateQueue = r, r !== null && (t.flags |= 4)
        } else {
          o = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = Ns(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = o.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = o.createElement(n, {
            is: r.is
          }) : (e = o.createElement(n), n === "select" && (o = e, r.multiple ? o.multiple = !0 : r.size && (o.size = r.size))) : e = o.createElementNS(e, n), e[Ue] = t, e[Kn] = r, Ga(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (o = ci(n, r), n) {
              case "dialog":
                F("cancel", e), F("close", e), l = r;
                break;
              case "iframe":
              case "object":
              case "embed":
                F("load", e), l = r;
                break;
              case "video":
              case "audio":
                for (l = 0; l < Cn.length; l++) F(Cn[l], e);
                l = r;
                break;
              case "source":
                F("error", e), l = r;
                break;
              case "img":
              case "image":
              case "link":
                F("error", e), F("load", e), l = r;
                break;
              case "details":
                F("toggle", e), l = r;
                break;
              case "input":
                Go(e, r), l = li(e, r), F("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                e._wrapperState = {
                  wasMultiple: !!r.multiple
                }, l = V({}, r, {
                  value: void 0
                }), F("invalid", e);
                break;
              case "textarea":
                Jo(e, r), l = ui(e, r), F("invalid", e);
                break;
              default:
                l = r
            }
            ai(n, l),
            s = l;
            for (i in s)
              if (s.hasOwnProperty(i)) {
                var a = s[i];
                i === "style" ? _s(e, a) : i === "dangerouslySetInnerHTML" ? (a = a ? a.__html : void 0, a != null && Es(e, a)) : i === "children" ? typeof a == "string" ? (n !== "textarea" || a !== "") && Fn(e, a) : typeof a == "number" && Fn(e, "" + a) : i !== "suppressContentEditableWarning" && i !== "suppressHydrationWarning" && i !== "autoFocus" && (In.hasOwnProperty(i) ? a != null && i === "onScroll" && F("scroll", e) : a != null && qi(e, i, a, o))
              } switch (n) {
              case "input":
                sr(e), Xo(e, r, !1);
                break;
              case "textarea":
                sr(e), qo(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + mt(r.value));
                break;
              case "select":
                e.multiple = !!r.multiple, i = r.value, i != null ? Xt(e, !!r.multiple, i, !1) : r.defaultValue != null && Xt(e, !!r.multiple, r.defaultValue, !0);
                break;
              default:
                typeof l.onClick == "function" && (e.onclick = Qr)
            }
            switch (n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                r = !!r.autoFocus;
                break e;
              case "img":
                r = !0;
                break e;
              default:
                r = !1
            }
          }
          r && (t.flags |= 4)
        }
        t.ref !== null && (t.flags |= 512, t.flags |= 2097152)
      }
      return re(t), null;
    case 6:
      if (e && t.stateNode != null) Ja(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(S(166));
        if (n = Et(Gn.current), Et(Ve.current), gr(t)) {
          if (r = t.stateNode, n = t.memoizedProps, r[Ue] = t, (i = r.nodeValue !== n) && (e = ye, e !== null)) switch (e.tag) {
            case 3:
              vr(r.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && vr(r.nodeValue, n, (e.mode & 1) !== 0)
          }
          i && (t.flags |= 4)
        } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[Ue] = t, t.stateNode = r
      }
      return re(t), null;
    case 13:
      if ($(U), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (A && ge !== null && t.mode & 1 && !(t.flags & 128)) ma(), rn(), t.flags |= 98560, i = !1;
        else if (i = gr(t), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!i) throw Error(S(318));
            if (i = t.memoizedState, i = i !== null ? i.dehydrated : null, !i) throw Error(S(317));
            i[Ue] = t
          } else rn(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          re(t), i = !1
        } else De !== null && (Qi(De), De = null), i = !0;
        if (!i) return t.flags & 65536 ? t : null
      }
      return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || U.current & 1 ? X === 0 && (X = 3) : Oo())), t.updateQueue !== null && (t.flags |= 4), re(t), null);
    case 4:
      return on(), Ii(e, t), e === null && Qn(t.stateNode.containerInfo), re(t), null;
    case 10:
      return go(t.type._context), re(t), null;
    case 17:
      return me(t.type) && Wr(), re(t), null;
    case 19:
      if ($(U), i = t.memoizedState, i === null) return re(t), null;
      if (r = (t.flags & 128) !== 0, o = i.rendering, o === null)
        if (r) Sn(i, !1);
        else {
          if (X !== 0 || e !== null && e.flags & 128)
            for (e = t.child; e !== null;) {
              if (o = Zr(e), o !== null) {
                for (t.flags |= 128, Sn(i, !1), r = o.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null;) i = n, e = r, i.flags &= 14680066, o = i.alternate, o === null ? (i.childLanes = 0, i.lanes = e, i.child = null, i.subtreeFlags = 0, i.memoizedProps = null, i.memoizedState = null, i.updateQueue = null, i.dependencies = null, i.stateNode = null) : (i.childLanes = o.childLanes, i.lanes = o.lanes, i.child = o.child, i.subtreeFlags = 0, i.deletions = null, i.memoizedProps = o.memoizedProps, i.memoizedState = o.memoizedState, i.updateQueue = o.updateQueue, i.type = o.type, e = o.dependencies, i.dependencies = e === null ? null : {
                  lanes: e.lanes,
                  firstContext: e.firstContext
                }), n = n.sibling;
                return I(U, U.current & 1 | 2), t.child
              }
              e = e.sibling
            }
          i.tail !== null && K() > sn && (t.flags |= 128, r = !0, Sn(i, !1), t.lanes = 4194304)
        }
      else {
        if (!r)
          if (e = Zr(o), e !== null) {
            if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), Sn(i, !0), i.tail === null && i.tailMode === "hidden" && !o.alternate && !A) return re(t), null
          } else 2 * K() - i.renderingStartTime > sn && n !== 1073741824 && (t.flags |= 128, r = !0, Sn(i, !1), t.lanes = 4194304);
        i.isBackwards ? (o.sibling = t.child, t.child = o) : (n = i.last, n !== null ? n.sibling = o : t.child = o, i.last = o)
      }
      return i.tail !== null ? (t = i.tail, i.rendering = t, i.tail = t.sibling, i.renderingStartTime = K(), t.sibling = null, n = U.current, I(U, r ? n & 1 | 2 : n & 1), t) : (re(t), null);
    case 22:
    case 23:
      return Do(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? ve & 1073741824 && (re(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : re(t), null;
    case 24:
      return null;
    case 25:
      return null
  }
  throw Error(S(156, t.tag))
}

function Lf(e, t) {
  switch (po(t), t.tag) {
    case 1:
      return me(t.type) && Wr(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return on(), $(pe), $(ie), ko(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return So(t), null;
    case 13:
      if ($(U), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(S(340));
        rn()
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return $(U), null;
    case 4:
      return on(), null;
    case 10:
      return go(t.type._context), null;
    case 22:
    case 23:
      return Do(), null;
    case 24:
      return null;
    default:
      return null
  }
}
var xr = !1,
  le = !1,
  Tf = typeof WeakSet == "function" ? WeakSet : Set,
  k = null;

function Yt(e, t) {
  var n = e.ref;
  if (n !== null)
    if (typeof n == "function") try {
      n(null)
    } catch (r) {
      H(e, t, r)
    } else n.current = null
}

function Fi(e, t, n) {
  try {
    n()
  } catch (r) {
    H(e, t, r)
  }
}
var Uu = !1;

function Rf(e, t) {
  if (xi = Br, e = ta(), co(e)) {
    if ("selectionStart" in e) var n = {
      start: e.selectionStart,
      end: e.selectionEnd
    };
    else e: {
      n = (n = e.ownerDocument) && n.defaultView || window;
      var r = n.getSelection && n.getSelection();
      if (r && r.rangeCount !== 0) {
        n = r.anchorNode;
        var l = r.anchorOffset,
          i = r.focusNode;
        r = r.focusOffset;
        try {
          n.nodeType, i.nodeType
        } catch {
          n = null;
          break e
        }
        var o = 0,
          s = -1,
          a = -1,
          c = 0,
          g = 0,
          h = e,
          m = null;
        t: for (;;) {
          for (var w; h !== n || l !== 0 && h.nodeType !== 3 || (s = o + l), h !== i || r !== 0 && h.nodeType !== 3 || (a = o + r), h.nodeType === 3 && (o += h.nodeValue.length), (w = h.firstChild) !== null;) m = h, h = w;
          for (;;) {
            if (h === e) break t;
            if (m === n && ++c === l && (s = o), m === i && ++g === r && (a = o), (w = h.nextSibling) !== null) break;
            h = m, m = h.parentNode
          }
          h = w
        }
        n = s === -1 || a === -1 ? null : {
          start: s,
          end: a
        }
      } else n = null
    }
    n = n || {
      start: 0,
      end: 0
    }
  } else n = null;
  for (Si = {
      focusedElem: e,
      selectionRange: n
    }, Br = !1, k = t; k !== null;)
    if (t = k, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, k = e;
    else
      for (; k !== null;) {
        t = k;
        try {
          var v = t.alternate;
          if (t.flags & 1024) switch (t.tag) {
            case 0:
            case 11:
            case 15:
              break;
            case 1:
              if (v !== null) {
                var y = v.memoizedProps,
                  P = v.memoizedState,
                  p = t.stateNode,
                  d = p.getSnapshotBeforeUpdate(t.elementType === t.type ? y : Le(t.type, y), P);
                p.__reactInternalSnapshotBeforeUpdate = d
              }
              break;
            case 3:
              var f = t.stateNode.containerInfo;
              f.nodeType === 1 ? f.textContent = "" : f.nodeType === 9 && f.documentElement && f.removeChild(f.documentElement);
              break;
            case 5:
            case 6:
            case 4:
            case 17:
              break;
            default:
              throw Error(S(163))
          }
        } catch (x) {
          H(t, t.return, x)
        }
        if (e = t.sibling, e !== null) {
          e.return = t.return, k = e;
          break
        }
        k = t.return
      }
  return v = Uu, Uu = !1, v
}

function Dn(e, t, n) {
  var r = t.updateQueue;
  if (r = r !== null ? r.lastEffect : null, r !== null) {
    var l = r = r.next;
    do {
      if ((l.tag & e) === e) {
        var i = l.destroy;
        l.destroy = void 0, i !== void 0 && Fi(t, n, i)
      }
      l = l.next
    } while (l !== r)
  }
}

function hl(e, t) {
  if (t = t.updateQueue, t = t !== null ? t.lastEffect : null, t !== null) {
    var n = t = t.next;
    do {
      if ((n.tag & e) === e) {
        var r = n.create;
        n.destroy = r()
      }
      n = n.next
    } while (n !== t)
  }
}

function $i(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n
    }
    typeof t == "function" ? t(e) : t.current = e
  }
}

function qa(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, qa(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Ue], delete t[Kn], delete t[Ni], delete t[mf], delete t[hf])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null
}

function Za(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4
}

function Bu(e) {
  e: for (;;) {
    for (; e.sibling === null;) {
      if (e.return === null || Za(e.return)) return null;
      e = e.return
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      e.child.return = e, e = e.child
    }
    if (!(e.flags & 2)) return e.stateNode
  }
}

function Ai(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Qr));
  else if (r !== 4 && (e = e.child, e !== null))
    for (Ai(e, t, n), e = e.sibling; e !== null;) Ai(e, t, n), e = e.sibling
}

function Ui(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && (e = e.child, e !== null))
    for (Ui(e, t, n), e = e.sibling; e !== null;) Ui(e, t, n), e = e.sibling
}
var b = null,
  Te = !1;

function be(e, t, n) {
  for (n = n.child; n !== null;) ba(e, t, n), n = n.sibling
}

function ba(e, t, n) {
  if (Be && typeof Be.onCommitFiberUnmount == "function") try {
    Be.onCommitFiberUnmount(ul, n)
  } catch {}
  switch (n.tag) {
    case 5:
      le || Yt(n, t);
    case 6:
      var r = b,
        l = Te;
      b = null, be(e, t, n), b = r, Te = l, b !== null && (Te ? (e = b, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : b.removeChild(n.stateNode));
      break;
    case 18:
      b !== null && (Te ? (e = b, n = n.stateNode, e.nodeType === 8 ? Hl(e.parentNode, n) : e.nodeType === 1 && Hl(e, n), Bn(e)) : Hl(b, n.stateNode));
      break;
    case 4:
      r = b, l = Te, b = n.stateNode.containerInfo, Te = !0, be(e, t, n), b = r, Te = l;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!le && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
        l = r = r.next;
        do {
          var i = l,
            o = i.destroy;
          i = i.tag, o !== void 0 && (i & 2 || i & 4) && Fi(n, t, o), l = l.next
        } while (l !== r)
      }
      be(e, t, n);
      break;
    case 1:
      if (!le && (Yt(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
        r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount()
      } catch (s) {
        H(n, t, s)
      }
      be(e, t, n);
      break;
    case 21:
      be(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (le = (r = le) || n.memoizedState !== null, be(e, t, n), le = r) : be(e, t, n);
      break;
    default:
      be(e, t, n)
  }
}

function Vu(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new Tf), t.forEach(function(r) {
      var l = Bf.bind(null, e, r);
      n.has(r) || (n.add(r), r.then(l, l))
    })
  }
}

function ze(e, t) {
  var n = t.deletions;
  if (n !== null)
    for (var r = 0; r < n.length; r++) {
      var l = n[r];
      try {
        var i = e,
          o = t,
          s = o;
        e: for (; s !== null;) {
          switch (s.tag) {
            case 5:
              b = s.stateNode, Te = !1;
              break e;
            case 3:
              b = s.stateNode.containerInfo, Te = !0;
              break e;
            case 4:
              b = s.stateNode.containerInfo, Te = !0;
              break e
          }
          s = s.return
        }
        if (b === null) throw Error(S(160));
        ba(i, o, l), b = null, Te = !1;
        var a = l.alternate;
        a !== null && (a.return = null), l.return = null
      } catch (c) {
        H(l, t, c)
      }
    }
  if (t.subtreeFlags & 12854)
    for (t = t.child; t !== null;) ec(t, e), t = t.sibling
}

function ec(e, t) {
  var n = e.alternate,
    r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (ze(t, e), $e(e), r & 4) {
        try {
          Dn(3, e, e.return), hl(3, e)
        } catch (y) {
          H(e, e.return, y)
        }
        try {
          Dn(5, e, e.return)
        } catch (y) {
          H(e, e.return, y)
        }
      }
      break;
    case 1:
      ze(t, e), $e(e), r & 512 && n !== null && Yt(n, n.return);
      break;
    case 5:
      if (ze(t, e), $e(e), r & 512 && n !== null && Yt(n, n.return), e.flags & 32) {
        var l = e.stateNode;
        try {
          Fn(l, "")
        } catch (y) {
          H(e, e.return, y)
        }
      }
      if (r & 4 && (l = e.stateNode, l != null)) {
        var i = e.memoizedProps,
          o = n !== null ? n.memoizedProps : i,
          s = e.type,
          a = e.updateQueue;
        if (e.updateQueue = null, a !== null) try {
          s === "input" && i.type === "radio" && i.name != null && ks(l, i), ci(s, o);
          var c = ci(s, i);
          for (o = 0; o < a.length; o += 2) {
            var g = a[o],
              h = a[o + 1];
            g === "style" ? _s(l, h) : g === "dangerouslySetInnerHTML" ? Es(l, h) : g === "children" ? Fn(l, h) : qi(l, g, h, c)
          }
          switch (s) {
            case "input":
              ii(l, i);
              break;
            case "textarea":
              js(l, i);
              break;
            case "select":
              var m = l._wrapperState.wasMultiple;
              l._wrapperState.wasMultiple = !!i.multiple;
              var w = i.value;
              w != null ? Xt(l, !!i.multiple, w, !1) : m !== !!i.multiple && (i.defaultValue != null ? Xt(l, !!i.multiple, i.defaultValue, !0) : Xt(l, !!i.multiple, i.multiple ? [] : "", !1))
          }
          l[Kn] = i
        } catch (y) {
          H(e, e.return, y)
        }
      }
      break;
    case 6:
      if (ze(t, e), $e(e), r & 4) {
        if (e.stateNode === null) throw Error(S(162));
        l = e.stateNode, i = e.memoizedProps;
        try {
          l.nodeValue = i
        } catch (y) {
          H(e, e.return, y)
        }
      }
      break;
    case 3:
      if (ze(t, e), $e(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
        Bn(t.containerInfo)
      } catch (y) {
        H(e, e.return, y)
      }
      break;
    case 4:
      ze(t, e), $e(e);
      break;
    case 13:
      ze(t, e), $e(e), l = e.child, l.flags & 8192 && (i = l.memoizedState !== null, l.stateNode.isHidden = i, !i || l.alternate !== null && l.alternate.memoizedState !== null || (To = K())), r & 4 && Vu(e);
      break;
    case 22:
      if (g = n !== null && n.memoizedState !== null, e.mode & 1 ? (le = (c = le) || g, ze(t, e), le = c) : ze(t, e), $e(e), r & 8192) {
        if (c = e.memoizedState !== null, (e.stateNode.isHidden = c) && !g && e.mode & 1)
          for (k = e, g = e.child; g !== null;) {
            for (h = k = g; k !== null;) {
              switch (m = k, w = m.child, m.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Dn(4, m, m.return);
                  break;
                case 1:
                  Yt(m, m.return);
                  var v = m.stateNode;
                  if (typeof v.componentWillUnmount == "function") {
                    r = m, n = m.return;
                    try {
                      t = r, v.props = t.memoizedProps, v.state = t.memoizedState, v.componentWillUnmount()
                    } catch (y) {
                      H(r, n, y)
                    }
                  }
                  break;
                case 5:
                  Yt(m, m.return);
                  break;
                case 22:
                  if (m.memoizedState !== null) {
                    Qu(h);
                    continue
                  }
              }
              w !== null ? (w.return = m, k = w) : Qu(h)
            }
            g = g.sibling
          }
        e: for (g = null, h = e;;) {
          if (h.tag === 5) {
            if (g === null) {
              g = h;
              try {
                l = h.stateNode, c ? (i = l.style, typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none") : (s = h.stateNode, a = h.memoizedProps.style, o = a != null && a.hasOwnProperty("display") ? a.display : null, s.style.display = Cs("display", o))
              } catch (y) {
                H(e, e.return, y)
              }
            }
          } else if (h.tag === 6) {
            if (g === null) try {
              h.stateNode.nodeValue = c ? "" : h.memoizedProps
            } catch (y) {
              H(e, e.return, y)
            }
          } else if ((h.tag !== 22 && h.tag !== 23 || h.memoizedState === null || h === e) && h.child !== null) {
            h.child.return = h, h = h.child;
            continue
          }
          if (h === e) break e;
          for (; h.sibling === null;) {
            if (h.return === null || h.return === e) break e;
            g === h && (g = null), h = h.return
          }
          g === h && (g = null), h.sibling.return = h.return, h = h.sibling
        }
      }
      break;
    case 19:
      ze(t, e), $e(e), r & 4 && Vu(e);
      break;
    case 21:
      break;
    default:
      ze(t, e), $e(e)
  }
}

function $e(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null;) {
          if (Za(n)) {
            var r = n;
            break e
          }
          n = n.return
        }
        throw Error(S(160))
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && (Fn(l, ""), r.flags &= -33);
          var i = Bu(e);
          Ui(e, i, l);
          break;
        case 3:
        case 4:
          var o = r.stateNode.containerInfo,
            s = Bu(e);
          Ai(e, s, o);
          break;
        default:
          throw Error(S(161))
      }
    }
    catch (a) {
      H(e, e.return, a)
    }
    e.flags &= -3
  }
  t & 4096 && (e.flags &= -4097)
}

function Df(e, t, n) {
  k = e, tc(e)
}

function tc(e, t, n) {
  for (var r = (e.mode & 1) !== 0; k !== null;) {
    var l = k,
      i = l.child;
    if (l.tag === 22 && r) {
      var o = l.memoizedState !== null || xr;
      if (!o) {
        var s = l.alternate,
          a = s !== null && s.memoizedState !== null || le;
        s = xr;
        var c = le;
        if (xr = o, (le = a) && !c)
          for (k = l; k !== null;) o = k, a = o.child, o.tag === 22 && o.memoizedState !== null ? Wu(l) : a !== null ? (a.return = o, k = a) : Wu(l);
        for (; i !== null;) k = i, tc(i), i = i.sibling;
        k = l, xr = s, le = c
      }
      Hu(e)
    } else l.subtreeFlags & 8772 && i !== null ? (i.return = l, k = i) : Hu(e)
  }
}

function Hu(e) {
  for (; k !== null;) {
    var t = k;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            le || hl(5, t);
            break;
          case 1:
            var r = t.stateNode;
            if (t.flags & 4 && !le)
              if (n === null) r.componentDidMount();
              else {
                var l = t.elementType === t.type ? n.memoizedProps : Le(t.type, n.memoizedProps);
                r.componentDidUpdate(l, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate)
              } var i = t.updateQueue;
            i !== null && _u(t, i, r);
            break;
          case 3:
            var o = t.updateQueue;
            if (o !== null) {
              if (n = null, t.child !== null) switch (t.child.tag) {
                case 5:
                  n = t.child.stateNode;
                  break;
                case 1:
                  n = t.child.stateNode
              }
              _u(t, o, n)
            }
            break;
          case 5:
            var s = t.stateNode;
            if (n === null && t.flags & 4) {
              n = s;
              var a = t.memoizedProps;
              switch (t.type) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  a.autoFocus && n.focus();
                  break;
                case "img":
                  a.src && (n.src = a.src)
              }
            }
            break;
          case 6:
            break;
          case 4:
            break;
          case 12:
            break;
          case 13:
            if (t.memoizedState === null) {
              var c = t.alternate;
              if (c !== null) {
                var g = c.memoizedState;
                if (g !== null) {
                  var h = g.dehydrated;
                  h !== null && Bn(h)
                }
              }
            }
            break;
          case 19:
          case 17:
          case 21:
          case 22:
          case 23:
          case 25:
            break;
          default:
            throw Error(S(163))
        }
        le || t.flags & 512 && $i(t)
      } catch (m) {
        H(t, t.return, m)
      }
    }
    if (t === e) {
      k = null;
      break
    }
    if (n = t.sibling, n !== null) {
      n.return = t.return, k = n;
      break
    }
    k = t.return
  }
}

function Qu(e) {
  for (; k !== null;) {
    var t = k;
    if (t === e) {
      k = null;
      break
    }
    var n = t.sibling;
    if (n !== null) {
      n.return = t.return, k = n;
      break
    }
    k = t.return
  }
}

function Wu(e) {
  for (; k !== null;) {
    var t = k;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            hl(4, t)
          } catch (a) {
            H(t, n, a)
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var l = t.return;
            try {
              r.componentDidMount()
            } catch (a) {
              H(t, l, a)
            }
          }
          var i = t.return;
          try {
            $i(t)
          } catch (a) {
            H(t, i, a)
          }
          break;
        case 5:
          var o = t.return;
          try {
            $i(t)
          } catch (a) {
            H(t, o, a)
          }
      }
    } catch (a) {
      H(t, t.return, a)
    }
    if (t === e) {
      k = null;
      break
    }
    var s = t.sibling;
    if (s !== null) {
      s.return = t.return, k = s;
      break
    }
    k = t.return
  }
}
var Of = Math.ceil,
  tl = Ze.ReactCurrentDispatcher,
  zo = Ze.ReactCurrentOwner,
  Ee = Ze.ReactCurrentBatchConfig,
  O = 0,
  Z = null,
  Y = null,
  ee = 0,
  ve = 0,
  Gt = gt(0),
  X = 0,
  Zn = null,
  Tt = 0,
  vl = 0,
  Lo = 0,
  On = null,
  de = null,
  To = 0,
  sn = 1 / 0,
  He = null,
  nl = !1,
  Bi = null,
  dt = null,
  Sr = !1,
  it = null,
  rl = 0,
  Mn = 0,
  Vi = null,
  Dr = -1,
  Or = 0;

function se() {
  return O & 6 ? K() : Dr !== -1 ? Dr : Dr = K()
}

function ft(e) {
  return e.mode & 1 ? O & 2 && ee !== 0 ? ee & -ee : gf.transition !== null ? (Or === 0 && (Or = As()), Or) : (e = M, e !== 0 || (e = window.event, e = e === void 0 ? 16 : Ks(e.type)), e) : 1
}

function Ie(e, t, n, r) {
  if (50 < Mn) throw Mn = 0, Vi = null, Error(S(185));
  er(e, n, r), (!(O & 2) || e !== Z) && (e === Z && (!(O & 2) && (vl |= n), X === 4 && rt(e, ee)), he(e, r), n === 1 && O === 0 && !(t.mode & 1) && (sn = K() + 500, fl && yt()))
}

function he(e, t) {
  var n = e.callbackNode;
  vd(e, t);
  var r = Ur(e, e === Z ? ee : 0);
  if (r === 0) n !== null && eu(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = r & -r, e.callbackPriority !== t) {
    if (n != null && eu(n), t === 1) e.tag === 0 ? vf(Ku.bind(null, e)) : da(Ku.bind(null, e)), ff(function() {
      !(O & 6) && yt()
    }), n = null;
    else {
      switch (Us(r)) {
        case 1:
          n = no;
          break;
        case 4:
          n = Fs;
          break;
        case 16:
          n = Ar;
          break;
        case 536870912:
          n = $s;
          break;
        default:
          n = Ar
      }
      n = ac(n, nc.bind(null, e))
    }
    e.callbackPriority = t, e.callbackNode = n
  }
}

function nc(e, t) {
  if (Dr = -1, Or = 0, O & 6) throw Error(S(327));
  var n = e.callbackNode;
  if (en() && e.callbackNode !== n) return null;
  var r = Ur(e, e === Z ? ee : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = ll(e, r);
  else {
    t = r;
    var l = O;
    O |= 2;
    var i = lc();
    (Z !== e || ee !== t) && (He = null, sn = K() + 500, Ct(e, t));
    do try {
      Ff();
      break
    } catch (s) {
      rc(e, s)
    }
    while (!0);
    vo(), tl.current = i, O = l, Y !== null ? t = 0 : (Z = null, ee = 0, t = X)
  }
  if (t !== 0) {
    if (t === 2 && (l = hi(e), l !== 0 && (r = l, t = Hi(e, l))), t === 1) throw n = Zn, Ct(e, 0), rt(e, r), he(e, K()), n;
    if (t === 6) rt(e, r);
    else {
      if (l = e.current.alternate, !(r & 30) && !Mf(l) && (t = ll(e, r), t === 2 && (i = hi(e), i !== 0 && (r = i, t = Hi(e, i))), t === 1)) throw n = Zn, Ct(e, 0), rt(e, r), he(e, K()), n;
      switch (e.finishedWork = l, e.finishedLanes = r, t) {
        case 0:
        case 1:
          throw Error(S(345));
        case 2:
          kt(e, de, He);
          break;
        case 3:
          if (rt(e, r), (r & 130023424) === r && (t = To + 500 - K(), 10 < t)) {
            if (Ur(e, 0) !== 0) break;
            if (l = e.suspendedLanes, (l & r) !== r) {
              se(), e.pingedLanes |= e.suspendedLanes & l;
              break
            }
            e.timeoutHandle = ji(kt.bind(null, e, de, He), t);
            break
          }
          kt(e, de, He);
          break;
        case 4:
          if (rt(e, r), (r & 4194240) === r) break;
          for (t = e.eventTimes, l = -1; 0 < r;) {
            var o = 31 - Me(r);
            i = 1 << o, o = t[o], o > l && (l = o), r &= ~i
          }
          if (r = l, r = K() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * Of(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = ji(kt.bind(null, e, de, He), r);
            break
          }
          kt(e, de, He);
          break;
        case 5:
          kt(e, de, He);
          break;
        default:
          throw Error(S(329))
      }
    }
  }
  return he(e, K()), e.callbackNode === n ? nc.bind(null, e) : null
}

function Hi(e, t) {
  var n = On;
  return e.current.memoizedState.isDehydrated && (Ct(e, t).flags |= 256), e = ll(e, t), e !== 2 && (t = de, de = n, t !== null && Qi(t)), e
}

function Qi(e) {
  de === null ? de = e : de.push.apply(de, e)
}

function Mf(e) {
  for (var t = e;;) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && (n = n.stores, n !== null))
        for (var r = 0; r < n.length; r++) {
          var l = n[r],
            i = l.getSnapshot;
          l = l.value;
          try {
            if (!Fe(i(), l)) return !1
          } catch {
            return !1
          }
        }
    }
    if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
    else {
      if (t === e) break;
      for (; t.sibling === null;) {
        if (t.return === null || t.return === e) return !0;
        t = t.return
      }
      t.sibling.return = t.return, t = t.sibling
    }
  }
  return !0
}

function rt(e, t) {
  for (t &= ~Lo, t &= ~vl, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t;) {
    var n = 31 - Me(t),
      r = 1 << n;
    e[n] = -1, t &= ~r
  }
}

function Ku(e) {
  if (O & 6) throw Error(S(327));
  en();
  var t = Ur(e, 0);
  if (!(t & 1)) return he(e, K()), null;
  var n = ll(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = hi(e);
    r !== 0 && (t = r, n = Hi(e, r))
  }
  if (n === 1) throw n = Zn, Ct(e, 0), rt(e, t), he(e, K()), n;
  if (n === 6) throw Error(S(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, kt(e, de, He), he(e, K()), null
}

function Ro(e, t) {
  var n = O;
  O |= 1;
  try {
    return e(t)
  } finally {
    O = n, O === 0 && (sn = K() + 500, fl && yt())
  }
}

function Rt(e) {
  it !== null && it.tag === 0 && !(O & 6) && en();
  var t = O;
  O |= 1;
  var n = Ee.transition,
    r = M;
  try {
    if (Ee.transition = null, M = 1, e) return e()
  } finally {
    M = r, Ee.transition = n, O = t, !(O & 6) && yt()
  }
}

function Do() {
  ve = Gt.current, $(Gt)
}

function Ct(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, df(n)), Y !== null)
    for (n = Y.return; n !== null;) {
      var r = n;
      switch (po(r), r.tag) {
        case 1:
          r = r.type.childContextTypes, r != null && Wr();
          break;
        case 3:
          on(), $(pe), $(ie), ko();
          break;
        case 5:
          So(r);
          break;
        case 4:
          on();
          break;
        case 13:
          $(U);
          break;
        case 19:
          $(U);
          break;
        case 10:
          go(r.type._context);
          break;
        case 22:
        case 23:
          Do()
      }
      n = n.return
    }
  if (Z = e, Y = e = pt(e.current, null), ee = ve = t, X = 0, Zn = null, Lo = vl = Tt = 0, de = On = null, Nt !== null) {
    for (t = 0; t < Nt.length; t++)
      if (n = Nt[t], r = n.interleaved, r !== null) {
        n.interleaved = null;
        var l = r.next,
          i = n.pending;
        if (i !== null) {
          var o = i.next;
          i.next = l, r.next = o
        }
        n.pending = r
      } Nt = null
  }
  return e
}

function rc(e, t) {
  do {
    var n = Y;
    try {
      if (vo(), Lr.current = el, br) {
        for (var r = B.memoizedState; r !== null;) {
          var l = r.queue;
          l !== null && (l.pending = null), r = r.next
        }
        br = !1
      }
      if (Lt = 0, q = G = B = null, Rn = !1, Xn = 0, zo.current = null, n === null || n.return === null) {
        X = 1, Zn = t, Y = null;
        break
      }
      e: {
        var i = e,
          o = n.return,
          s = n,
          a = t;
        if (t = ee, s.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
          var c = a,
            g = s,
            h = g.tag;
          if (!(g.mode & 1) && (h === 0 || h === 11 || h === 15)) {
            var m = g.alternate;
            m ? (g.updateQueue = m.updateQueue, g.memoizedState = m.memoizedState, g.lanes = m.lanes) : (g.updateQueue = null, g.memoizedState = null)
          }
          var w = Du(o);
          if (w !== null) {
            w.flags &= -257, Ou(w, o, s, i, t), w.mode & 1 && Ru(i, c, t), t = w, a = c;
            var v = t.updateQueue;
            if (v === null) {
              var y = new Set;
              y.add(a), t.updateQueue = y
            } else v.add(a);
            break e
          } else {
            if (!(t & 1)) {
              Ru(i, c, t), Oo();
              break e
            }
            a = Error(S(426))
          }
        } else if (A && s.mode & 1) {
          var P = Du(o);
          if (P !== null) {
            !(P.flags & 65536) && (P.flags |= 256), Ou(P, o, s, i, t), mo(un(a, s));
            break e
          }
        }
        i = a = un(a, s),
        X !== 4 && (X = 2),
        On === null ? On = [i] : On.push(i),
        i = o;do {
          switch (i.tag) {
            case 3:
              i.flags |= 65536, t &= -t, i.lanes |= t;
              var p = Ua(i, a, t);
              Cu(i, p);
              break e;
            case 1:
              s = a;
              var d = i.type,
                f = i.stateNode;
              if (!(i.flags & 128) && (typeof d.getDerivedStateFromError == "function" || f !== null && typeof f.componentDidCatch == "function" && (dt === null || !dt.has(f)))) {
                i.flags |= 65536, t &= -t, i.lanes |= t;
                var x = Ba(i, s, t);
                Cu(i, x);
                break e
              }
          }
          i = i.return
        } while (i !== null)
      }
      oc(n)
    } catch (j) {
      t = j, Y === n && n !== null && (Y = n = n.return);
      continue
    }
    break
  } while (!0)
}

function lc() {
  var e = tl.current;
  return tl.current = el, e === null ? el : e
}

function Oo() {
  (X === 0 || X === 3 || X === 2) && (X = 4), Z === null || !(Tt & 268435455) && !(vl & 268435455) || rt(Z, ee)
}

function ll(e, t) {
  var n = O;
  O |= 2;
  var r = lc();
  (Z !== e || ee !== t) && (He = null, Ct(e, t));
  do try {
    If();
    break
  } catch (l) {
    rc(e, l)
  }
  while (!0);
  if (vo(), O = n, tl.current = r, Y !== null) throw Error(S(261));
  return Z = null, ee = 0, X
}

function If() {
  for (; Y !== null;) ic(Y)
}

function Ff() {
  for (; Y !== null && !ud();) ic(Y)
}

function ic(e) {
  var t = sc(e.alternate, e, ve);
  e.memoizedProps = e.pendingProps, t === null ? oc(e) : Y = t, zo.current = null
}

function oc(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = Lf(n, t), n !== null) {
        n.flags &= 32767, Y = n;
        return
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        X = 6, Y = null;
        return
      }
    } else if (n = zf(n, t, ve), n !== null) {
      Y = n;
      return
    }
    if (t = t.sibling, t !== null) {
      Y = t;
      return
    }
    Y = t = e
  } while (t !== null);
  X === 0 && (X = 5)
}

function kt(e, t, n) {
  var r = M,
    l = Ee.transition;
  try {
    Ee.transition = null, M = 1, $f(e, t, n, r)
  } finally {
    Ee.transition = l, M = r
  }
  return null
}

function $f(e, t, n, r) {
  do en(); while (it !== null);
  if (O & 6) throw Error(S(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(S(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var i = n.lanes | n.childLanes;
  if (gd(e, i), e === Z && (Y = Z = null, ee = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || Sr || (Sr = !0, ac(Ar, function() {
      return en(), null
    })), i = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || i) {
    i = Ee.transition, Ee.transition = null;
    var o = M;
    M = 1;
    var s = O;
    O |= 4, zo.current = null, Rf(e, n), ec(n, e), rf(Si), Br = !!xi, Si = xi = null, e.current = n, Df(n), sd(), O = s, M = o, Ee.transition = i
  } else e.current = n;
  if (Sr && (Sr = !1, it = e, rl = l), i = e.pendingLanes, i === 0 && (dt = null), dd(n.stateNode), he(e, K()), t !== null)
    for (r = e.onRecoverableError, n = 0; n < t.length; n++) l = t[n], r(l.value, {
      componentStack: l.stack,
      digest: l.digest
    });
  if (nl) throw nl = !1, e = Bi, Bi = null, e;
  return rl & 1 && e.tag !== 0 && en(), i = e.pendingLanes, i & 1 ? e === Vi ? Mn++ : (Mn = 0, Vi = e) : Mn = 0, yt(), null
}

function en() {
  if (it !== null) {
    var e = Us(rl),
      t = Ee.transition,
      n = M;
    try {
      if (Ee.transition = null, M = 16 > e ? 16 : e, it === null) var r = !1;
      else {
        if (e = it, it = null, rl = 0, O & 6) throw Error(S(331));
        var l = O;
        for (O |= 4, k = e.current; k !== null;) {
          var i = k,
            o = i.child;
          if (k.flags & 16) {
            var s = i.deletions;
            if (s !== null) {
              for (var a = 0; a < s.length; a++) {
                var c = s[a];
                for (k = c; k !== null;) {
                  var g = k;
                  switch (g.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Dn(8, g, i)
                  }
                  var h = g.child;
                  if (h !== null) h.return = g, k = h;
                  else
                    for (; k !== null;) {
                      g = k;
                      var m = g.sibling,
                        w = g.return;
                      if (qa(g), g === c) {
                        k = null;
                        break
                      }
                      if (m !== null) {
                        m.return = w, k = m;
                        break
                      }
                      k = w
                    }
                }
              }
              var v = i.alternate;
              if (v !== null) {
                var y = v.child;
                if (y !== null) {
                  v.child = null;
                  do {
                    var P = y.sibling;
                    y.sibling = null, y = P
                  } while (y !== null)
                }
              }
              k = i
            }
          }
          if (i.subtreeFlags & 2064 && o !== null) o.return = i, k = o;
          else e: for (; k !== null;) {
            if (i = k, i.flags & 2048) switch (i.tag) {
              case 0:
              case 11:
              case 15:
                Dn(9, i, i.return)
            }
            var p = i.sibling;
            if (p !== null) {
              p.return = i.return, k = p;
              break e
            }
            k = i.return
          }
        }
        var d = e.current;
        for (k = d; k !== null;) {
          o = k;
          var f = o.child;
          if (o.subtreeFlags & 2064 && f !== null) f.return = o, k = f;
          else e: for (o = d; k !== null;) {
            if (s = k, s.flags & 2048) try {
              switch (s.tag) {
                case 0:
                case 11:
                case 15:
                  hl(9, s)
              }
            } catch (j) {
              H(s, s.return, j)
            }
            if (s === o) {
              k = null;
              break e
            }
            var x = s.sibling;
            if (x !== null) {
              x.return = s.return, k = x;
              break e
            }
            k = s.return
          }
        }
        if (O = l, yt(), Be && typeof Be.onPostCommitFiberRoot == "function") try {
          Be.onPostCommitFiberRoot(ul, e)
        } catch {}
        r = !0
      }
      return r
    } finally {
      M = n, Ee.transition = t
    }
  }
  return !1
}

function Yu(e, t, n) {
  t = un(n, t), t = Ua(e, t, 1), e = ct(e, t, 1), t = se(), e !== null && (er(e, 1, t), he(e, t))
}

function H(e, t, n) {
  if (e.tag === 3) Yu(e, e, n);
  else
    for (; t !== null;) {
      if (t.tag === 3) {
        Yu(t, e, n);
        break
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (dt === null || !dt.has(r))) {
          e = un(n, e), e = Ba(t, e, 1), t = ct(t, e, 1), e = se(), t !== null && (er(t, 1, e), he(t, e));
          break
        }
      }
      t = t.return
    }
}

function Af(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t), t = se(), e.pingedLanes |= e.suspendedLanes & n, Z === e && (ee & n) === n && (X === 4 || X === 3 && (ee & 130023424) === ee && 500 > K() - To ? Ct(e, 0) : Lo |= n), he(e, t)
}

function uc(e, t) {
  t === 0 && (e.mode & 1 ? (t = dr, dr <<= 1, !(dr & 130023424) && (dr = 4194304)) : t = 1);
  var n = se();
  e = Je(e, t), e !== null && (er(e, t, n), he(e, n))
}

function Uf(e) {
  var t = e.memoizedState,
    n = 0;
  t !== null && (n = t.retryLane), uc(e, n)
}

function Bf(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode,
        l = e.memoizedState;
      l !== null && (n = l.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(S(314))
  }
  r !== null && r.delete(t), uc(e, n)
}
var sc;
sc = function(e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || pe.current) fe = !0;
    else {
      if (!(e.lanes & n) && !(t.flags & 128)) return fe = !1, Pf(e, t, n);
      fe = !!(e.flags & 131072)
    }
  else fe = !1, A && t.flags & 1048576 && fa(t, Gr, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var r = t.type;
      Rr(e, t), e = t.pendingProps;
      var l = nn(t, ie.current);
      bt(t, n), l = No(null, t, r, e, l, n);
      var i = Eo();
      return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, me(r) ? (i = !0, Kr(t)) : i = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, wo(t), l.updater = ml, t.stateNode = l, l._reactInternals = t, Li(t, r, e, n), t = Di(null, t, r, !0, i, n)) : (t.tag = 0, A && i && fo(t), oe(null, t, l, n), t = t.child), t;
    case 16:
      r = t.elementType;
      e: {
        switch (Rr(e, t), e = t.pendingProps, l = r._init, r = l(r._payload), t.type = r, l = t.tag = Hf(r), e = Le(r, e), l) {
          case 0:
            t = Ri(null, t, r, e, n);
            break e;
          case 1:
            t = Fu(null, t, r, e, n);
            break e;
          case 11:
            t = Mu(null, t, r, e, n);
            break e;
          case 14:
            t = Iu(null, t, r, Le(r.type, e), n);
            break e
        }
        throw Error(S(306, r, ""))
      }
      return t;
    case 0:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Le(r, l), Ri(e, t, r, l, n);
    case 1:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Le(r, l), Fu(e, t, r, l, n);
    case 3:
      e: {
        if (Wa(t), e === null) throw Error(S(387));r = t.pendingProps,
        i = t.memoizedState,
        l = i.element,
        ya(e, t),
        qr(t, r, null, n);
        var o = t.memoizedState;
        if (r = o.element, i.isDehydrated)
          if (i = {
              element: r,
              isDehydrated: !1,
              cache: o.cache,
              pendingSuspenseBoundaries: o.pendingSuspenseBoundaries,
              transitions: o.transitions
            }, t.updateQueue.baseState = i, t.memoizedState = i, t.flags & 256) {
            l = un(Error(S(423)), t), t = $u(e, t, r, n, l);
            break e
          } else if (r !== l) {
          l = un(Error(S(424)), t), t = $u(e, t, r, n, l);
          break e
        } else
          for (ge = at(t.stateNode.containerInfo.firstChild), ye = t, A = !0, De = null, n = va(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (rn(), r === l) {
            t = qe(e, t, n);
            break e
          }
          oe(e, t, r, n)
        }
        t = t.child
      }
      return t;
    case 5:
      return wa(t), e === null && _i(t), r = t.type, l = t.pendingProps, i = e !== null ? e.memoizedProps : null, o = l.children, ki(r, l) ? o = null : i !== null && ki(r, i) && (t.flags |= 32), Qa(e, t), oe(e, t, o, n), t.child;
    case 6:
      return e === null && _i(t), null;
    case 13:
      return Ka(e, t, n);
    case 4:
      return xo(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = ln(t, null, r, n) : oe(e, t, r, n), t.child;
    case 11:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Le(r, l), Mu(e, t, r, l, n);
    case 7:
      return oe(e, t, t.pendingProps, n), t.child;
    case 8:
      return oe(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return oe(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (r = t.type._context, l = t.pendingProps, i = t.memoizedProps, o = l.value, I(Xr, r._currentValue), r._currentValue = o, i !== null)
          if (Fe(i.value, o)) {
            if (i.children === l.children && !pe.current) {
              t = qe(e, t, n);
              break e
            }
          } else
            for (i = t.child, i !== null && (i.return = t); i !== null;) {
              var s = i.dependencies;
              if (s !== null) {
                o = i.child;
                for (var a = s.firstContext; a !== null;) {
                  if (a.context === r) {
                    if (i.tag === 1) {
                      a = Ye(-1, n & -n), a.tag = 2;
                      var c = i.updateQueue;
                      if (c !== null) {
                        c = c.shared;
                        var g = c.pending;
                        g === null ? a.next = a : (a.next = g.next, g.next = a), c.pending = a
                      }
                    }
                    i.lanes |= n, a = i.alternate, a !== null && (a.lanes |= n), Pi(i.return, n, t), s.lanes |= n;
                    break
                  }
                  a = a.next
                }
              } else if (i.tag === 10) o = i.type === t.type ? null : i.child;
              else if (i.tag === 18) {
                if (o = i.return, o === null) throw Error(S(341));
                o.lanes |= n, s = o.alternate, s !== null && (s.lanes |= n), Pi(o, n, t), o = i.sibling
              } else o = i.child;
              if (o !== null) o.return = i;
              else
                for (o = i; o !== null;) {
                  if (o === t) {
                    o = null;
                    break
                  }
                  if (i = o.sibling, i !== null) {
                    i.return = o.return, o = i;
                    break
                  }
                  o = o.return
                }
              i = o
            }
        oe(e, t, l.children, n),
        t = t.child
      }
      return t;
    case 9:
      return l = t.type, r = t.pendingProps.children, bt(t, n), l = Ce(l), r = r(l), t.flags |= 1, oe(e, t, r, n), t.child;
    case 14:
      return r = t.type, l = Le(r, t.pendingProps), l = Le(r.type, l), Iu(e, t, r, l, n);
    case 15:
      return Va(e, t, t.type, t.pendingProps, n);
    case 17:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Le(r, l), Rr(e, t), t.tag = 1, me(r) ? (e = !0, Kr(t)) : e = !1, bt(t, n), Aa(t, r, l), Li(t, r, l, n), Di(null, t, r, !0, e, n);
    case 19:
      return Ya(e, t, n);
    case 22:
      return Ha(e, t, n)
  }
  throw Error(S(156, t.tag))
};

function ac(e, t) {
  return Is(e, t)
}

function Vf(e, t, n, r) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null
}

function Ne(e, t, n, r) {
  return new Vf(e, t, n, r)
}

function Mo(e) {
  return e = e.prototype, !(!e || !e.isReactComponent)
}

function Hf(e) {
  if (typeof e == "function") return Mo(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === bi) return 11;
    if (e === eo) return 14
  }
  return 2
}

function pt(e, t) {
  var n = e.alternate;
  return n === null ? (n = Ne(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
    lanes: t.lanes,
    firstContext: t.firstContext
  }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n
}

function Mr(e, t, n, r, l, i) {
  var o = 2;
  if (r = e, typeof e == "function") Mo(e) && (o = 1);
  else if (typeof e == "string") o = 5;
  else e: switch (e) {
    case $t:
      return _t(n.children, l, i, t);
    case Zi:
      o = 8, l |= 8;
      break;
    case ei:
      return e = Ne(12, n, t, l | 2), e.elementType = ei, e.lanes = i, e;
    case ti:
      return e = Ne(13, n, t, l), e.elementType = ti, e.lanes = i, e;
    case ni:
      return e = Ne(19, n, t, l), e.elementType = ni, e.lanes = i, e;
    case ws:
      return gl(n, l, i, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case gs:
          o = 10;
          break e;
        case ys:
          o = 9;
          break e;
        case bi:
          o = 11;
          break e;
        case eo:
          o = 14;
          break e;
        case et:
          o = 16, r = null;
          break e
      }
      throw Error(S(130, e == null ? e : typeof e, ""))
  }
  return t = Ne(o, n, t, l), t.elementType = e, t.type = r, t.lanes = i, t
}

function _t(e, t, n, r) {
  return e = Ne(7, e, r, t), e.lanes = n, e
}

function gl(e, t, n, r) {
  return e = Ne(22, e, r, t), e.elementType = ws, e.lanes = n, e.stateNode = {
    isHidden: !1
  }, e
}

function ql(e, t, n) {
  return e = Ne(6, e, null, t), e.lanes = n, e
}

function Zl(e, t, n) {
  return t = Ne(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = {
    containerInfo: e.containerInfo,
    pendingChildren: null,
    implementation: e.implementation
  }, t
}

function Qf(e, t, n, r, l) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Rl(0), this.expirationTimes = Rl(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Rl(0), this.identifierPrefix = r, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null
}

function Io(e, t, n, r, l, i, o, s, a) {
  return e = new Qf(e, t, n, s, a), t === 1 ? (t = 1, i === !0 && (t |= 8)) : t = 0, i = Ne(3, null, null, t), e.current = i, i.stateNode = e, i.memoizedState = {
    element: r,
    isDehydrated: n,
    cache: null,
    transitions: null,
    pendingSuspenseBoundaries: null
  }, wo(i), e
}

function Wf(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: Ft,
    key: r == null ? null : "" + r,
    children: e,
    containerInfo: t,
    implementation: n
  }
}

function cc(e) {
  if (!e) return ht;
  e = e._reactInternals;
  e: {
    if (Ot(e) !== e || e.tag !== 1) throw Error(S(170));
    var t = e;do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (me(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e
          }
      }
      t = t.return
    } while (t !== null);
    throw Error(S(171))
  }
  if (e.tag === 1) {
    var n = e.type;
    if (me(n)) return ca(e, n, t)
  }
  return t
}

function dc(e, t, n, r, l, i, o, s, a) {
  return e = Io(n, r, !0, e, l, i, o, s, a), e.context = cc(null), n = e.current, r = se(), l = ft(n), i = Ye(r, l), i.callback = t ?? null, ct(n, i, l), e.current.lanes = l, er(e, l, r), he(e, r), e
}

function yl(e, t, n, r) {
  var l = t.current,
    i = se(),
    o = ft(l);
  return n = cc(n), t.context === null ? t.context = n : t.pendingContext = n, t = Ye(i, o), t.payload = {
    element: e
  }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = ct(l, t, o), e !== null && (Ie(e, l, o, i), zr(e, l, o)), o
}

function il(e) {
  if (e = e.current, !e.child) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode
  }
}

function Gu(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t
  }
}

function Fo(e, t) {
  Gu(e, t), (e = e.alternate) && Gu(e, t)
}

function Kf() {
  return null
}
var fc = typeof reportError == "function" ? reportError : function(e) {
  console.error(e)
};

function $o(e) {
  this._internalRoot = e
}
wl.prototype.render = $o.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(S(409));
  yl(e, t, null, null)
};
wl.prototype.unmount = $o.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Rt(function() {
      yl(null, e, null, null)
    }), t[Xe] = null
  }
};

function wl(e) {
  this._internalRoot = e
}
wl.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = Hs();
    e = {
      blockedOn: null,
      target: e,
      priority: t
    };
    for (var n = 0; n < nt.length && t !== 0 && t < nt[n].priority; n++);
    nt.splice(n, 0, e), n === 0 && Ws(e)
  }
};

function Ao(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11)
}

function xl(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
}

function Xu() {}

function Yf(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var i = r;
      r = function() {
        var c = il(o);
        i.call(c)
      }
    }
    var o = dc(t, r, e, 0, null, !1, !1, "", Xu);
    return e._reactRootContainer = o, e[Xe] = o.current, Qn(e.nodeType === 8 ? e.parentNode : e), Rt(), o
  }
  for (; l = e.lastChild;) e.removeChild(l);
  if (typeof r == "function") {
    var s = r;
    r = function() {
      var c = il(a);
      s.call(c)
    }
  }
  var a = Io(e, 0, !1, null, null, !1, !1, "", Xu);
  return e._reactRootContainer = a, e[Xe] = a.current, Qn(e.nodeType === 8 ? e.parentNode : e), Rt(function() {
    yl(t, a, n, r)
  }), a
}

function Sl(e, t, n, r, l) {
  var i = n._reactRootContainer;
  if (i) {
    var o = i;
    if (typeof l == "function") {
      var s = l;
      l = function() {
        var a = il(o);
        s.call(a)
      }
    }
    yl(t, o, e, l)
  } else o = Yf(n, t, e, l, r);
  return il(o)
}
Bs = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = En(t.pendingLanes);
        n !== 0 && (ro(t, n | 1), he(t, K()), !(O & 6) && (sn = K() + 500, yt()))
      }
      break;
    case 13:
      Rt(function() {
        var r = Je(e, 1);
        if (r !== null) {
          var l = se();
          Ie(r, e, 1, l)
        }
      }), Fo(e, 1)
  }
};
lo = function(e) {
  if (e.tag === 13) {
    var t = Je(e, 134217728);
    if (t !== null) {
      var n = se();
      Ie(t, e, 134217728, n)
    }
    Fo(e, 134217728)
  }
};
Vs = function(e) {
  if (e.tag === 13) {
    var t = ft(e),
      n = Je(e, t);
    if (n !== null) {
      var r = se();
      Ie(n, e, t, r)
    }
    Fo(e, t)
  }
};
Hs = function() {
  return M
};
Qs = function(e, t) {
  var n = M;
  try {
    return M = e, t()
  } finally {
    M = n
  }
};
fi = function(e, t, n) {
  switch (t) {
    case "input":
      if (ii(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode;) n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var l = dl(r);
            if (!l) throw Error(S(90));
            Ss(r), ii(r, l)
          }
        }
      }
      break;
    case "textarea":
      js(e, n);
      break;
    case "select":
      t = n.value, t != null && Xt(e, !!n.multiple, t, !1)
  }
};
Ls = Ro;
Ts = Rt;
var Gf = {
    usingClientEntryPoint: !1,
    Events: [nr, Vt, dl, Ps, zs, Ro]
  },
  kn = {
    findFiberByHostInstance: jt,
    bundleType: 0,
    version: "18.3.1",
    rendererPackageName: "react-dom"
  },
  Xf = {
    bundleType: kn.bundleType,
    version: kn.version,
    rendererPackageName: kn.rendererPackageName,
    rendererConfig: kn.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: Ze.ReactCurrentDispatcher,
    findHostInstanceByFiber: function(e) {
      return e = Os(e), e === null ? null : e.stateNode
    },
    findFiberByHostInstance: kn.findFiberByHostInstance || Kf,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: "18.3.1-next-f1338f8080-20240426"
  };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var kr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!kr.isDisabled && kr.supportsFiber) try {
    ul = kr.inject(Xf), Be = kr
  } catch {}
}
xe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Gf;
xe.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Ao(t)) throw Error(S(200));
  return Wf(e, t, null, n)
};
xe.createRoot = function(e, t) {
  if (!Ao(e)) throw Error(S(299));
  var n = !1,
    r = "",
    l = fc;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = Io(e, 1, !1, null, null, n, !1, r, l), e[Xe] = t.current, Qn(e.nodeType === 8 ? e.parentNode : e), new $o(t)
};
xe.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0) throw typeof e.render == "function" ? Error(S(188)) : (e = Object.keys(e).join(","), Error(S(268, e)));
  return e = Os(t), e = e === null ? null : e.stateNode, e
};
xe.flushSync = function(e) {
  return Rt(e)
};
xe.hydrate = function(e, t, n) {
  if (!xl(t)) throw Error(S(200));
  return Sl(null, e, t, !0, n)
};
xe.hydrateRoot = function(e, t, n) {
  if (!Ao(e)) throw Error(S(405));
  var r = n != null && n.hydratedSources || null,
    l = !1,
    i = "",
    o = fc;
  if (n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (i = n.identifierPrefix), n.onRecoverableError !== void 0 && (o = n.onRecoverableError)), t = dc(t, null, e, 1, n ?? null, l, !1, i, o), e[Xe] = t.current, Qn(e), r)
    for (e = 0; e < r.length; e++) n = r[e], l = n._getVersion, l = l(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(n, l);
  return new wl(t)
};
xe.render = function(e, t, n) {
  if (!xl(t)) throw Error(S(200));
  return Sl(null, e, t, !1, n)
};
xe.unmountComponentAtNode = function(e) {
  if (!xl(e)) throw Error(S(40));
  return e._reactRootContainer ? (Rt(function() {
    Sl(null, null, e, !1, function() {
      e._reactRootContainer = null, e[Xe] = null
    })
  }), !0) : !1
};
xe.unstable_batchedUpdates = Ro;
xe.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
  if (!xl(n)) throw Error(S(200));
  if (e == null || e._reactInternals === void 0) throw Error(S(38));
  return Sl(e, t, n, !1, r)
};
xe.version = "18.3.1-next-f1338f8080-20240426";

function pc() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(pc)
  } catch (e) {
    console.error(e)
  }
}
pc(), ps.exports = xe;
var Jf = ps.exports,
  mc, Ju = Jf;
mc = Ju.createRoot, Ju.hydrateRoot;
const Mt = "http://localhost:5001/api";
async function hc(e, t) {
  const n = await fetch(`${Mt}${e}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(t)
    }),
    r = await n.json().catch(() => ({}));
  if (!n.ok) throw new Error(r.message || "Something went wrong. Please try again.");
  return r
}

function qf(e) {
  return hc("/auth/signup", e)
}

function Zf(e) {
  return hc("/auth/login", e)
}
async function bf(e) {
  const t = await fetch(`${Mt}/auth/me`, {
      headers: {
        Authorization: `Bearer ${e}`
      }
    }),
    n = await t.json().catch(() => ({}));
  if (!t.ok) throw new Error(n.message || "Session check failed.");
  return n
}
const Uo = "medchart_token";

function Oe() {
  return localStorage.getItem(Uo)
}

function qu(e) {
  localStorage.setItem(Uo, e)
}

function Zu() {
  localStorage.removeItem(Uo)
}

function ep() {
  const [e, t] = z.useState(null), [n, r] = z.useState(""), [l, i] = z.useState(!1), [o, s] = z.useState(!0);
  z.useEffect(() => {
    const m = Oe();
    if (!m) {
      s(!1);
      return
    }
    bf(m).then(({
      user: w
    }) => t(w)).catch(() => Zu()).finally(() => s(!1))
  }, []);

  function a() {
    n && r("")
  }
  async function c(m) {
    i(!0);
    try {
      const {
        user: w,
        token: v
      } = await qf(m);
      return qu(v), t(w), !0
    } catch (w) {
      return r(w.message), !1
    } finally {
      i(!1)
    }
  }
  async function g(m) {
    i(!0);
    try {
      const {
        user: w,
        token: v
      } = await Zf(m);
      return qu(v), t(w), !0
    } catch (w) {
      return r(w.message), !1
    } finally {
      i(!1)
    }
  }

  function h() {
    Zu(), t(null), r("")
  }
  return {
    currentUser: e,
    error: n,
    loading: l,
    initializing: o,
    signup: c,
    login: g,
    logout: h,
    clearError: a
  }
}

function tp() {
  return u.jsxs("svg", {
    width: "28",
    height: "28",
    viewBox: "0 0 28 28",
    fill: "none",
    "aria-hidden": "true",
    children: [u.jsx("circle", {
      cx: "14",
      cy: "14",
      r: "13",
      stroke: "var(--mc-teal)",
      strokeWidth: "1.4"
    }), u.jsx("path", {
      d: "M4 14H9L11.5 8L15 20L17 14H24",
      stroke: "var(--mc-red)",
      strokeWidth: "1.6",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      fill: "none"
    })]
  })
}

function np() {
  return u.jsx("svg", {
    className: "mc-pulse-svg",
    viewBox: "0 0 600 120",
    preserveAspectRatio: "none",
    fill: "none",
    "aria-hidden": "true",
    children: u.jsx("path", {
      className: "mc-pulse-path",
      d: "M0 60 H150 L175 60 L195 20 L215 100 L235 60 L260 60 L280 40 L300 60 H600",
      stroke: "var(--mc-red)",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      fill: "none"
    })
  })
}

function rp() {
  return u.jsxs("div", {
    className: "mc-hero",
    children: [u.jsxs("div", {
      className: "mc-hero-top",
      children: [u.jsx("span", {
        className: "mc-mark",
        children: u.jsx(tp, {})
      }), u.jsx("span", {
        className: "mc-wordmark",
        children: "MedChart"
      })]
    }), u.jsxs("h1", {
      className: "mc-headline",
      children: ["One record.", u.jsx("br", {}), "Every heartbeat of care."]
    }), u.jsx("p", {
      className: "mc-sub",
      children: "Patients and doctors share one chart, read from opposite sides of the desk. Sign in to pick up where you left off, or set up your account to get started."
    }), u.jsx("div", {
      className: "mc-pulse-wrap",
      children: u.jsx(np, {})
    })]
  })
}

function ue({
  label: e,
  children: t
}) {
  return u.jsxs("label", {
    className: "mc-field",
    children: [u.jsx("span", {
      children: e
    }), t]
  })
}

function lp({
  role: e,
  onChange: t
}) {
  return u.jsxs("fieldset", {
    className: "mc-role",
    children: [u.jsx("legend", {
      children: "I am a"
    }), u.jsxs("div", {
      className: "mc-role-options",
      children: [u.jsx("button", {
        type: "button",
        className: `mc-badge ${e==="patient"?"is-active":""}`,
        onClick: () => t("patient"),
        children: "Patient"
      }), u.jsx("button", {
        type: "button",
        className: `mc-badge ${e==="doctor"?"is-active":""}`,
        onClick: () => t("doctor"),
        children: "Doctor"
      })]
    })]
  })
}
const bu = {
  name: "",
  email: "",
  password: "",
  dob: "",
  gender: "",
  bloodGroup: "",
  phone: "",
  specialization: "",
  department: ""
};

function ip({
  onLogin: e,
  onSignup: t,
  error: n,
  clearError: r,
  loading: l
}) {
  const [i, o] = z.useState("login"), [s, a] = z.useState("patient"), [c, g] = z.useState(bu);

  function h(v) {
    o(v), r()
  }

  function m(v, y) {
    g(P => ({
      ...P,
      [v]: y
    })), r()
  }
  async function w(v) {
    v.preventDefault(), (i === "login" ? await e({
      email: c.email,
      password: c.password
    }) : await t({
      ...c,
      role: s
    })) && g(bu)
  }
  return u.jsxs("div", {
    className: "mc-panel",
    children: [u.jsxs("div", {
      className: "mc-tabs",
      role: "tablist",
      children: [u.jsx("button", {
        type: "button",
        role: "tab",
        "aria-selected": i === "login",
        className: `mc-tab ${i==="login"?"is-active":""}`,
        onClick: () => h("login"),
        children: "Sign in"
      }), u.jsx("button", {
        type: "button",
        role: "tab",
        "aria-selected": i === "signup",
        className: `mc-tab ${i==="signup"?"is-active":""}`,
        onClick: () => h("signup"),
        children: "Create account"
      })]
    }), u.jsxs("form", {
      className: "mc-form",
      onSubmit: w,
      children: [i === "signup" && u.jsxs(u.Fragment, {
        children: [u.jsx(lp, {
          role: s,
          onChange: a
        }), u.jsx(ue, {
          label: "Full name",
          children: u.jsx("input", {
            type: "text",
            value: c.name,
            onChange: v => m("name", v.target.value),
            placeholder: s === "doctor" ? "Dr. Asha Verma" : "Ravi Kumar",
            autoComplete: "name"
          })
        })]
      }), u.jsx(ue, {
        label: "Email",
        children: u.jsx("input", {
          type: "email",
          value: c.email,
          onChange: v => m("email", v.target.value),
          placeholder: "you@example.com",
          autoComplete: "email"
        })
      }), u.jsx(ue, {
        label: "Password",
        children: u.jsx("input", {
          type: "password",
          value: c.password,
          onChange: v => m("password", v.target.value),
          placeholder: "••••••••",
          autoComplete: i === "login" ? "current-password" : "new-password"
        })
      }), i === "signup" && s === "patient" && u.jsxs(u.Fragment, {
        children: [u.jsxs("div", {
          className: "mc-row",
          children: [u.jsx(ue, {
            label: "Date of birth",
            children: u.jsx("input", {
              type: "date",
              value: c.dob,
              onChange: v => m("dob", v.target.value)
            })
          }), u.jsx(ue, {
            label: "Gender",
            children: u.jsxs("select", {
              value: c.gender,
              onChange: v => m("gender", v.target.value),
              children: [u.jsx("option", {
                value: "",
                children: "Select…"
              }), u.jsx("option", {
                value: "Female",
                children: "Female"
              }), u.jsx("option", {
                value: "Male",
                children: "Male"
              }), u.jsx("option", {
                value: "Other",
                children: "Other"
              })]
            })
          })]
        }), u.jsxs("div", {
          className: "mc-row",
          children: [u.jsx(ue, {
            label: "Blood group",
            children: u.jsxs("select", {
              value: c.bloodGroup,
              onChange: v => m("bloodGroup", v.target.value),
              children: [u.jsx("option", {
                value: "",
                children: "Select…"
              }), ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"].map(v => u.jsx("option", {
                value: v,
                children: v
              }, v))]
            })
          }), u.jsx(ue, {
            label: "Phone",
            children: u.jsx("input", {
              type: "tel",
              value: c.phone,
              onChange: v => m("phone", v.target.value),
              placeholder: "98765 43210",
              autoComplete: "tel"
            })
          })]
        })]
      }), i === "signup" && s === "doctor" && u.jsxs("div", {
        className: "mc-row",
        children: [u.jsx(ue, {
          label: "Specialization",
          children: u.jsx("input", {
            type: "text",
            value: c.specialization,
            onChange: v => m("specialization", v.target.value),
            placeholder: "Cardiology"
          })
        }), u.jsx(ue, {
          label: "Department",
          children: u.jsx("input", {
            type: "text",
            value: c.department,
            onChange: v => m("department", v.target.value),
            placeholder: "Internal Medicine"
          })
        })]
      }), n && u.jsx("p", {
        className: "mc-error",
        children: n
      }), u.jsx("button", {
        type: "submit",
        className: "mc-submit",
        disabled: l,
        children: l ? "Please wait…" : i === "login" ? "Sign in" : "Create account"
      })]
    }), u.jsx("p", {
      className: "mc-switch",
      children: i === "login" ? u.jsxs(u.Fragment, {
        children: ["New here? ", u.jsx("button", {
          type: "button",
          onClick: () => h("signup"),
          children: "Create an account"
        })]
      }) : u.jsxs(u.Fragment, {
        children: ["Already have an account? ", u.jsx("button", {
          type: "button",
          onClick: () => h("login"),
          children: "Sign in"
        })]
      })
    })]
  })
}

function op({
  onLogin: e,
  onSignup: t,
  error: n,
  clearError: r,
  loading: l
}) {
  return u.jsxs("div", {
    className: "mc-landing",
    children: [u.jsx(rp, {}), u.jsx(ip, {
      onLogin: e,
      onSignup: t,
      error: n,
      clearError: r,
      loading: l
    })]
  })
}

function up(e) {
  return e.trim().split(/\s+/).slice(0, 2).map(t => {
    var n;
    return ((n = t[0]) == null ? void 0 : n.toUpperCase()) ?? ""
  }).join("")
}

function sp(e) {
  if (!e) return null;
  const t = new Date(e);
  if (isNaN(t)) return null;
  const n = Date.now() - t.getTime();
  return Math.max(0, Math.floor(n / (365.25 * 24 * 3600 * 1e3)))
}

function kl(e) {
  if (!e) return "—";
  const t = new Date(e);
  return isNaN(t) ? "—" : t.toLocaleString(void 0, {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  })
}

function vc({
  user: e,
  roleLabel: t,
  onLogout: n,
  children: r
}) {
  return u.jsxs("div", {
    className: "mc-profile",
    children: [u.jsxs("header", {
      className: "mc-pheader",
      children: [u.jsxs("div", {
        className: "mc-pheader-left",
        children: [u.jsx("span", {
          className: "mc-avatar",
          children: up(e.name)
        }), u.jsxs("div", {
          children: [u.jsx("h1", {
            children: e.name
          }), u.jsxs("p", {
            className: "mc-pid",
            children: [e.id, " · ", t]
          })]
        })]
      }), u.jsx("button", {
        className: "mc-logout",
        onClick: n,
        children: "Log out"
      })]
    }), u.jsx("div", {
      className: "mc-pbody",
      children: r
    })]
  })
}

function jl({
  title: e,
  children: t
}) {
  return u.jsxs("section", {
    className: "mc-card",
    children: [u.jsx("h2", {
      children: e
    }), u.jsx("div", {
      className: "mc-card-body",
      children: t
    })]
  })
}

function Re({
  label: e,
  value: t
}) {
  return u.jsxs("div", {
    className: "mc-crow",
    children: [u.jsx("span", {
      className: "mc-crow-label",
      children: e
    }), u.jsx("span", {
      className: "mc-crow-value",
      children: t || "—"
    })]
  })
}
const ap = {
    requested: "Requested",
    confirmed: "Confirmed",
    cancelled: "Cancelled",
    completed: "Completed"
  },
  cp = {
    not_started: "Treatment not started",
    active: "Treatment active",
    completed: "Treatment completed"
  };

function dp({
  appointment: e,
  role: t,
  onSetStatus: n,
  onSetTreatment: r,
  actionLoading: l
}) {
  const i = t === "doctor" ? e.patient : e.doctor,
    o = t === "doctor" ? i == null ? void 0 : i.id : [i == null ? void 0 : i.specialization, i == null ? void 0 : i.department].filter(Boolean).join(" · ") || (i == null ? void 0 : i.id),
    s = t === "doctor" && e.status === "requested",
    a = t === "doctor" && e.status === "confirmed" && e.treatmentStatus === "not_started",
    c = t === "doctor" && e.status === "confirmed" && e.treatmentStatus === "active",
    g = t === "patient" && (e.status === "requested" || e.status === "confirmed");
  return u.jsxs("div", {
    className: "mc-appt-row",
    children: [u.jsxs("div", {
      className: "mc-appt-main",
      children: [u.jsx("span", {
        className: "mc-appt-who",
        children: (i == null ? void 0 : i.name) || "Unknown"
      }), u.jsx("span", {
        className: "mc-appt-when",
        children: kl(e.scheduledAt)
      }), e.reason && u.jsx("span", {
        className: "mc-appt-reason",
        children: e.reason
      }), o && t === "patient" && u.jsx("span", {
        className: "mc-appt-reason",
        children: o
      })]
    }), u.jsxs("div", {
      className: "mc-appt-side",
      children: [u.jsxs("div", {
        className: "mc-appt-statuses",
        children: [u.jsx("span", {
          className: `mc-status mc-status-${e.status}`,
          children: ap[e.status] || e.status
        }), t === "doctor" && e.status === "confirmed" && u.jsx("span", {
          className: `mc-treatment mc-treatment-${e.treatmentStatus}`,
          children: cp[e.treatmentStatus] || e.treatmentStatus
        })]
      }), (s || a || c || g) && u.jsxs("div", {
        className: "mc-appt-actions",
        children: [s && u.jsxs(u.Fragment, {
          children: [u.jsx("button", {
            type: "button",
            className: "mc-confirm",
            disabled: l,
            onClick: () => n(e.id, "confirmed"),
            children: "Confirm"
          }), u.jsx("button", {
            type: "button",
            className: "mc-cancel",
            disabled: l,
            onClick: () => n(e.id, "cancelled"),
            children: "Decline"
          })]
        }), a && u.jsx("button", {
          type: "button",
          disabled: l,
          className: "mc-confirm",
          onClick: () => r(e.id, "active"),
          children: "Start treatment"
        }), c && u.jsx("button", {
          type: "button",
          disabled: l,
          onClick: () => r(e.id, "completed"),
          children: "Complete treatment"
        }), g && u.jsx("button", {
          type: "button",
          className: "mc-cancel",
          disabled: l,
          onClick: () => n(e.id, "cancelled"),
          children: "Cancel"
        })]
      })]
    })]
  })
}

function fp() {
  const e = new Date;
  e.setDate(e.getDate() + 1), e.setHours(10, 0, 0, 0);
  const t = n => String(n).padStart(2, "0");
  return `${e.getFullYear()}-${t(e.getMonth()+1)}-${t(e.getDate())}T${t(e.getHours())}:${t(e.getMinutes())}`
}

function pp({
  doctors: e,
  onBook: t,
  onClose: n,
  loading: r,
  error: l,
  clearError: i
}) {
  var w;
  const [o, s] = z.useState(((w = e[0]) == null ? void 0 : w.id) || ""), [a, c] = z.useState(fp()), [g, h] = z.useState("");
  async function m(v) {
    if (v.preventDefault(), !o || !a) return;
    await t({
      doctorId: o,
      scheduledAt: new Date(a).toISOString(),
      reason: g.trim()
    }) && n()
  }
  return u.jsx("div", {
    className: "mc-modal-backdrop",
    onClick: n,
    children: u.jsxs("div", {
      className: "mc-modal",
      onClick: v => v.stopPropagation(),
      children: [u.jsx("h2", {
        children: "Book an appointment"
      }), e.length === 0 ? u.jsx("p", {
        className: "mc-empty",
        children: "No doctors are available to book with yet."
      }) : u.jsxs("form", {
        onSubmit: m,
        children: [u.jsx(ue, {
          label: "Doctor",
          children: u.jsx("select", {
            value: o,
            onChange: v => {
              s(v.target.value), i()
            },
            children: e.map(v => u.jsxs("option", {
              value: v.id,
              children: [v.name, v.specialization ? ` — ${v.specialization}` : ""]
            }, v.id))
          })
        }), u.jsx(ue, {
          label: "Date & time",
          children: u.jsx("input", {
            type: "datetime-local",
            value: a,
            onChange: v => {
              c(v.target.value), i()
            }
          })
        }), u.jsx(ue, {
          label: "Reason for visit (optional)",
          children: u.jsx("textarea", {
            rows: 3,
            value: g,
            onChange: v => h(v.target.value),
            placeholder: "Briefly describe what this is about"
          })
        }), l && u.jsx("p", {
          className: "mc-error",
          children: l
        }), u.jsxs("div", {
          className: "mc-modal-actions",
          children: [u.jsx("button", {
            type: "button",
            className: "mc-modal-cancel",
            onClick: n,
            children: "Cancel"
          }), u.jsx("button", {
            type: "submit",
            className: "mc-submit",
            disabled: r,
            children: r ? "Booking…" : "Request appointment"
          })]
        })]
      })]
    })
  })
}
async function fn(e, t, n = {}) {
  const r = await fetch(`${Mt}${e}`, {
      ...n,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${t}`,
        ...n.headers
      }
    }),
    l = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(l.message || "Something went wrong. Please try again.");
  return l
}

function mp(e) {
  return fn("/appointments/doctors", e)
}

function hp(e) {
  return fn("/appointments", e)
}

function vp(e) {
  return fn("/appointments/current-patients", e)
}

function gp(e, {
  doctorId: t,
  scheduledAt: n,
  reason: r
}) {
  return fn("/appointments", e, {
    method: "POST",
    body: JSON.stringify({
      doctorId: t,
      scheduledAt: n,
      reason: r
    })
  })
}

function yp(e, t, n) {
  return fn(`/appointments/${t}/status`, e, {
    method: "PATCH",
    body: JSON.stringify({
      status: n
    })
  })
}

function wp(e, t, n) {
  return fn(`/appointments/${t}/treatment`, e, {
    method: "PATCH",
    body: JSON.stringify({
      treatmentStatus: n
    })
  })
}

function gc(e) {
  const [t, n] = z.useState([]), [r, l] = z.useState([]), [i, o] = z.useState(!0), [s, a] = z.useState(""), [c, g] = z.useState(!1), h = z.useCallback(async () => {
    const P = Oe();
    if (P) {
      o(!0);
      try {
        const {
          appointments: p
        } = await hp(P);
        n(p)
      } catch (p) {
        a(p.message)
      } finally {
        o(!1)
      }
    }
  }, []);
  z.useEffect(() => {
    h()
  }, [h]), z.useEffect(() => {
    if (e !== "patient") return;
    const P = Oe();
    P && mp(P).then(({
      doctors: p
    }) => l(p)).catch(p => a(p.message))
  }, [e]);

  function m() {
    s && a("")
  }
  async function w({
    doctorId: P,
    scheduledAt: p,
    reason: d
  }) {
    const f = Oe();
    g(!0);
    try {
      return await gp(f, {
        doctorId: P,
        scheduledAt: p,
        reason: d
      }), await h(), !0
    } catch (x) {
      return a(x.message), !1
    } finally {
      g(!1)
    }
  }
  async function v(P, p) {
    const d = Oe();
    g(!0);
    try {
      return await yp(d, P, p), await h(), !0
    } catch (f) {
      return a(f.message), !1
    } finally {
      g(!1)
    }
  }
  async function y(P, p) {
    const d = Oe();
    g(!0);
    try {
      return await wp(d, P, p), await h(), !0
    } catch (f) {
      return a(f.message), !1
    } finally {
      g(!1)
    }
  }
  return {
    appointments: t,
    doctors: r,
    loading: i,
    error: s,
    actionLoading: c,
    clearError: m,
    book: w,
    setStatus: v,
    setTreatmentStatus: y,
    refresh: h
  }
}

function yc({
  role: e,
  title: t,
  emptyText: n
}) {
  const {
    appointments: r,
    doctors: l,
    loading: i,
    error: o,
    actionLoading: s,
    clearError: a,
    book: c,
    setStatus: g,
    setTreatmentStatus: h
  } = gc(e), [m, w] = z.useState(!1);
  return u.jsxs(jl, {
    title: t,
    children: [e === "patient" && u.jsxs("div", {
      className: "mc-appt-header",
      children: [u.jsx("span", {}), u.jsx("button", {
        type: "button",
        className: "mc-book-btn",
        onClick: () => w(!0),
        children: "Book appointment"
      })]
    }), i ? u.jsx("p", {
      className: "mc-empty",
      children: "Loading…"
    }) : r.length === 0 ? u.jsx("p", {
      className: "mc-empty",
      children: n
    }) : u.jsx("div", {
      className: "mc-appt-list",
      children: r.map(v => u.jsx(dp, {
        appointment: v,
        role: e,
        onSetStatus: g,
        onSetTreatment: h,
        actionLoading: s
      }, v.id))
    }), !i && o && u.jsx("p", {
      className: "mc-error",
      children: o
    }), m && u.jsx(pp, {
      doctors: l,
      onBook: c,
      onClose: () => {
        w(!1), a()
      },
      loading: s,
      error: o,
      clearError: a
    })]
  })
}
async function wc(e, t, n = {}) {
  const r = await fetch(`${Mt}${e}`, {
      ...n,
      headers: {
        ...n.body instanceof FormData ? {} : {
          "Content-Type": "application/json"
        },
        Authorization: `Bearer ${t}`,
        ...n.headers
      }
    }),
    l = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(l.message || "Something went wrong. Please try again.");
  return l
}

function xp(e) {
  return wc("/reports", e)
}

function Sp(e, t) {
  return wc("/reports", e, {
    method: "POST",
    body: JSON.stringify(t)
  })
}
async function kp(e, t, n) {
  const r = await fetch(`${Mt}/reports/${t}/document`, {
    headers: {
      Authorization: `Bearer ${e}`
    }
  });
  if (!r.ok) throw new Error("The report could not be opened.");
  const l = await r.blob();
  return {
    url: URL.createObjectURL(l),
    mimeType: l.type || "application/octet-stream",
    fileName: n
  }
}

function jp(e) {
  const [t, n] = z.useState([]), [r, l] = z.useState([]), [i, o] = z.useState(!0), [s, a] = z.useState(!1), [c, g] = z.useState(""), h = z.useCallback(async () => {
    const v = Oe();
    if (v) {
      o(!0);
      try {
        const [{
          reports: y
        }, P] = await Promise.all([xp(v), e === "doctor" ? vp(v) : Promise.resolve({
          patients: []
        })]);
        n(y), l(P.patients)
      } catch (y) {
        g(y.message)
      } finally {
        o(!1)
      }
    }
  }, [e]);
  z.useEffect(() => {
    h()
  }, [h]);
  async function m({
    appointmentId: v,
    fileName: y,
    mimeType: P,
    dataBase64: p,
    notes: d
  }) {
    a(!0);
    try {
      return await Sp(Oe(), {
        appointmentId: v,
        fileName: y,
        mimeType: P,
        dataBase64: p,
        notes: d
      }), await h(), !0
    } catch (f) {
      return g(f.message), !1
    } finally {
      a(!1)
    }
  }
  async function w(v) {
    try {
      return await kp(Oe(), v.id, v.fileName)
    } catch (y) {
      return g(y.message), null
    }
  }
  return {
    reports: t,
    currentPatients: r,
    loading: i,
    actionLoading: s,
    error: c,
    setError: g,
    upload: m,
    openReport: w,
    refresh: h
  }
}

function xc(e) {
  return e < 1024 ? `${e} B` : `${(e/1024/1024).toFixed(1)} MB`
}
const jr = 10 * 1024 * 1024;

function Sc({
  report: e,
  onOpen: t
}) {
  return u.jsxs("div", {
    className: "mc-report-line",
    children: [u.jsxs("div", {
      children: [u.jsx("strong", {
        children: e.fileName
      }), u.jsxs("span", {
        children: [xc(e.fileSize), " · uploaded ", kl(e.uploadedAt)]
      }), e.notes && u.jsx("small", {
        children: e.notes
      })]
    }), u.jsx("button", {
      type: "button",
      className: "mc-report-open",
      onClick: () => t(e),
      children: "Open"
    })]
  })
}

function Np({
  reports: e,
  appointments: t,
  onUpload: n,
  onOpen: r,
  loading: l,
  actionLoading: i,
  error: o
}) {
  var d;
  const [s, a] = z.useState(!1), [c, g] = z.useState(((d = t[0]) == null ? void 0 : d.id) || ""), [h, m] = z.useState(null), [w, v] = z.useState(""), y = z.useMemo(() => t.filter(f => f.status === "confirmed" && ["not_started", "active"].includes(f.treatmentStatus)), [t]);

  function P() {
    var f;
    g(((f = y[0]) == null ? void 0 : f.id) || ""), m(null), v(""), a(!0)
  }
  async function p(f) {
    if (f.preventDefault(), !h || !c || h.size > jr) return;
    const x = new FileReader;
    x.onload = async () => {
      await n({
        appointmentId: c,
        fileName: h.name,
        mimeType: h.type || "application/octet-stream",
        dataBase64: x.result,
        notes: w.trim()
      }) && a(!1)
    }, x.readAsDataURL(h)
  }
  return u.jsxs(u.Fragment, {
    children: [u.jsxs("div", {
      className: "mc-report-header",
      children: [u.jsx("span", {
        className: "mc-report-help",
        children: "PDF, image, DOC, or other report · max 10 MB"
      }), u.jsx("button", {
        type: "button",
        className: "mc-book-btn",
        disabled: !y.length,
        onClick: P,
        children: "Add report"
      })]
    }), l ? u.jsx("p", {
      className: "mc-empty",
      children: "Loading reports…"
    }) : e.length === 0 ? u.jsx("p", {
      className: "mc-empty",
      children: "No reports have been uploaded for your active appointments."
    }) : u.jsx("div", {
      className: "mc-report-list",
      children: e.map(f => u.jsx(Sc, {
        report: f,
        onOpen: r
      }, f.id))
    }), !y.length && u.jsx("p", {
      className: "mc-report-help",
      children: "Reports become available after a doctor confirms an appointment."
    }), o && u.jsx("p", {
      className: "mc-error",
      children: o
    }), s && u.jsx("div", {
      className: "mc-modal-backdrop",
      onClick: () => a(!1),
      children: u.jsxs("div", {
        className: "mc-modal",
        onClick: f => f.stopPropagation(),
        children: [u.jsx("h2", {
          children: "Add a clinical report"
        }), u.jsxs("form", {
          onSubmit: p,
          children: [u.jsx(ue, {
            label: "Appointment",
            children: u.jsx("select", {
              value: c,
              onChange: f => g(f.target.value),
              children: y.map(f => u.jsx("option", {
                value: f.id,
                children: kl(f.scheduledAt)
              }, f.id))
            })
          }), u.jsx(ue, {
            label: "Report document",
            children: u.jsx("input", {
              type: "file",
              accept: ".pdf,.png,.jpg,.jpeg,.doc,.docx,.txt",
              onChange: f => {
                var x;
                return m(((x = f.target.files) == null ? void 0 : x[0]) || null)
              },
              required: !0
            })
          }), h && u.jsxs("p", {
            className: h.size > jr ? "mc-error" : "mc-report-help",
            children: [h.name, " · ", xc(h.size), h.size > jr ? " · Maximum size is 10 MB" : ""]
          }), u.jsx(ue, {
            label: "Notes (optional)",
            children: u.jsx("textarea", {
              rows: 3,
              value: w,
              onChange: f => v(f.target.value),
              placeholder: "What should the doctor know about this report?"
            })
          }), o && u.jsx("p", {
            className: "mc-error",
            children: o
          }), u.jsxs("div", {
            className: "mc-modal-actions",
            children: [u.jsx("button", {
              type: "button",
              className: "mc-modal-cancel",
              onClick: () => a(!1),
              children: "Cancel"
            }), u.jsx("button", {
              type: "submit",
              className: "mc-submit",
              disabled: i || !h || h.size > jr,
              children: i ? "Uploading…" : "Upload report"
            })]
          })]
        })]
      })
    })]
  })
}

function Ep({
  currentPatients: e,
  reports: t,
  onOpen: n,
  loading: r,
  error: l
}) {
  return u.jsxs(u.Fragment, {
    children: [r ? u.jsx("p", {
      className: "mc-empty",
      children: "Loading current patients…"
    }) : e.length === 0 ? u.jsx("p", {
      className: "mc-empty",
      children: "No current patients. Patients appear here after you confirm an appointment."
    }) : u.jsx("div", {
      className: "mc-patient-list",
      children: e.map(i => {
        const o = t.filter(s => {
          var a;
          return ((a = s.patient) == null ? void 0 : a.id) === i.id
        });
        return u.jsxs("div", {
          className: "mc-patient-block",
          children: [u.jsxs("div", {
            className: "mc-patient-heading",
            children: [u.jsxs("div", {
              children: [u.jsx("strong", {
                children: i.name
              }), u.jsxs("span", {
                children: [i.id, " · appointment ", kl(i.scheduledAt)]
              })]
            }), u.jsx("span", {
              className: `mc-treatment mc-treatment-${i.treatmentStatus}`,
              children: i.treatmentStatus === "active" ? "Treatment active" : "Treatment not started"
            })]
          }), o.length ? o.map(s => u.jsx(Sc, {
            report: s,
            onOpen: n
          }, s.id)) : u.jsx("p", {
            className: "mc-report-help",
            children: "No report uploaded yet."
          })]
        }, `${i.id}-${i.appointmentId}`)
      })
    }), l && u.jsx("p", {
      className: "mc-error",
      children: l
    })]
  })
}

function kc({
  role: e
}) {
  const t = jp(e),
    n = gc(e),
    [r, l] = z.useState(null);
  async function i(s) {
    const a = await t.openReport(s);
    a && l(a)
  }
  z.useEffect(() => () => {
    r != null && r.url && URL.revokeObjectURL(r.url)
  }, [r]);

  function o() {
    r != null && r.url && URL.revokeObjectURL(r.url), l(null)
  }
  return u.jsxs(u.Fragment, {
    children: [u.jsx(jl, {
      title: e === "doctor" ? "Current patients & reports" : "My clinical reports",
      children: e === "doctor" ? u.jsx(Ep, {
        ...t,
        onOpen: i
      }) : u.jsx(Np, {
        reports: t.reports,
        appointments: n.appointments,
        onUpload: t.upload,
        onOpen: i,
        loading: t.loading || n.loading,
        actionLoading: t.actionLoading,
        error: t.error || n.error
      })
    }), r && u.jsx("div", {
      className: "mc-modal-backdrop",
      onClick: o,
      children: u.jsxs("div", {
        className: "mc-report-viewer",
        onClick: s => s.stopPropagation(),
        children: [u.jsxs("div", {
          className: "mc-report-viewer-head",
          children: [u.jsx("strong", {
            children: r.fileName
          }), u.jsxs("div", {
            className: "mc-report-viewer-actions",
            children: [u.jsx("a", {
              className: "mc-report-open",
              href: r.url,
              target: "_blank",
              rel: "noopener noreferrer",
              children: "Open in new tab"
            }), u.jsx("a", {
              className: "mc-report-open",
              href: r.url,
              download: r.fileName,
              children: "Download"
            }), u.jsx("button", {
              type: "button",
              className: "mc-modal-cancel",
              onClick: o,
              children: "Close"
            })]
          })]
        }), r.mimeType.startsWith("image/") ? u.jsx("img", {
          src: r.url,
          alt: r.fileName,
          className: "mc-report-image"
        }) : u.jsx("iframe", {
          title: r.fileName,
          src: r.url,
          className: "mc-report-frame"
        })]
      })
    })]
  })
}

function Cp({
  user: e,
  onLogout: t
}) {
  const n = sp(e.dob);
  return u.jsx(vc, {
    user: e,
    roleLabel: "Patient",
    onLogout: t,
    children: u.jsxs("div", {
      className: "mc-grid",
      children: [u.jsxs(jl, {
        title: "Patient details",
        children: [u.jsx(Re, {
          label: "Patient ID",
          value: e.id
        }), u.jsx(Re, {
          label: "Email",
          value: e.email
        }), u.jsx(Re, {
          label: "Date of birth",
          value: e.dob
        }), u.jsx(Re, {
          label: "Age",
          value: n !== null ? `${n} yrs` : "—"
        }), u.jsx(Re, {
          label: "Gender",
          value: e.gender
        }), u.jsx(Re, {
          label: "Blood group",
          value: e.bloodGroup
        }), u.jsx(Re, {
          label: "Phone",
          value: e.phone
        })]
      }), u.jsx(yc, {
        role: "patient",
        title: "Upcoming appointments",
        emptyText: "No appointments scheduled yet. Use “Book appointment” to request a visit."
      }), u.jsx(kc, {
        role: "patient"
      })]
    })
  })
}

function _p({
  user: e,
  onLogout: t
}) {
  return u.jsx(vc, {
    user: e,
    roleLabel: "Doctor",
    onLogout: t,
    children: u.jsxs("div", {
      className: "mc-grid",
      children: [u.jsxs(jl, {
        title: "Doctor details",
        children: [u.jsx(Re, {
          label: "Doctor ID",
          value: e.id
        }), u.jsx(Re, {
          label: "Email",
          value: e.email
        }), u.jsx(Re, {
          label: "Specialization",
          value: e.specialization
        }), u.jsx(Re, {
          label: "Department",
          value: e.department
        })]
      }), u.jsx(yc, {
        role: "doctor",
        title: "Appointments",
        emptyText: "No appointments yet. Requests from patients will show up here."
      }), u.jsx(kc, {
        role: "doctor"
      })]
    })
  })
}

function Pp() {
  return u.jsxs("div", {
    className: "mc-session-loading",
    role: "status",
    "aria-live": "polite",
    children: [u.jsx("span", {
      className: "mc-session-pulse",
      "aria-hidden": "true"
    }), u.jsx("p", {
      children: "Checking your session…"
    })]
  })
}
async function zp(e) {
  const t = await fetch(`${Mt}/developer/queries`, {
      headers: {
        Authorization: `Bearer ${e}`
      }
    }),
    n = await t.json().catch(() => ({}));
  if (!t.ok) throw new Error(n.message || "Developer metrics could not be loaded.");
  return n
}
async function Lp(e, t) {
  const n = await fetch(`${Mt}/developer/optimizer/indexes`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${e}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(t)
    }),
    r = await n.json().catch(() => ({}));
  if (!n.ok) throw new Error(r.message || "The index could not be applied.");
  return r
}

function es(e) {
  return e.replace(/\s+/g, " ").replace(/\b(SELECT|FROM|LEFT JOIN|RIGHT JOIN|INNER JOIN|JOIN|WHERE|GROUP BY|ORDER BY|HAVING|VALUES|SET|RETURNING)\b/gi, `
$1`).replace(/\s+(AND|OR)\s+/gi, `
  $1 `).trim()
}

function Tp(e) {
  const t = `${e.route} ${e.sql}`.toLowerCase();
  return t.includes("auth/login") || t.includes("auth/signup") || t.includes("password_hash") ? "Authentication & login" : t.includes("treatment") || t.includes("treatment_status") ? "Treatment lifecycle" : t.includes("report_document") || t.includes("/reports") ? "Clinical reports" : t.includes("appointment") || t.includes("/appointments") ? "Appointments" : t.includes("department") ? "Departments & doctors" : t.includes("/auth/me") ? "Session verification" : "Other database operations"
}

function Rp(e) {
  const t = new Map;
  return e.forEach(n => {
    const r = Tp(n);
    t.has(r) || t.set(r, []), t.get(r).push(n)
  }), [...t.entries()].map(([n, r]) => ({
    name: n,
    items: r
  }))
}

function Dp({
  name: e,
  items: t,
  token: n
}) {
  var m, w, v;
  const [r, l] = z.useState((m = t[0]) == null ? void 0 : m.id), [i, o] = z.useState(""), [s, a] = z.useState(!1), c = t.find(y => y.id === r) || t[0], g = t.reduce((y, P) => y + P.durationMs, 0) / t.length, h = t.reduce((y, P) => y + (P.rowCount || 0), 0);
  return u.jsxs("article", {
    className: "dev-scratch-card",
    children: [u.jsxs("header", {
      className: "dev-card-heading",
      children: [u.jsxs("div", {
        children: [u.jsx("p", {
          className: "dev-card-kicker",
          children: "Query scratch card"
        }), u.jsx("h3", {
          children: e
        })]
      }), u.jsxs("span", {
        className: "dev-count",
        children: [t.length, " run", t.length === 1 ? "" : "s"]
      })]
    }), u.jsxs("div", {
      className: "dev-card-stats",
      children: [u.jsxs("span", {
        children: ["Avg ", u.jsxs("strong", {
          children: [g.toFixed(2), " ms"]
        })]
      }), u.jsxs("span", {
        children: ["Rows ", u.jsx("strong", {
          children: h
        })]
      }), u.jsxs("span", {
        children: ["Latest ", u.jsxs("strong", {
          children: [t[0].durationMs, " ms"]
        })]
      })]
    }), u.jsx("div", {
      className: "dev-query-list",
      children: t.slice(0, 8).map(y => u.jsxs("button", {
        type: "button",
        className: `dev-query-item ${c.id===y.id?"is-selected":""}`,
        onClick: () => l(y.id),
        children: [u.jsx("span", {
          children: ts(y.timestamp)
        }), u.jsx("code", {
          children: es(y.sql).split(`
`)[0]
        }), u.jsxs("strong", {
          children: [y.durationMs, " ms"]
        })]
      }, y.id))
    }), c && u.jsxs("div", {
      className: "dev-query-detail",
      children: [u.jsxs("div", {
        className: "dev-detail-grid",
        children: [u.jsxs("span", {
          children: ["Execution time ", u.jsxs("strong", {
            children: [c.durationMs, " ms"]
          })]
        }), u.jsxs("span", {
          children: ["Cardinality ", u.jsxs("strong", {
            children: [c.rowCount, " row(s)"]
          })]
        }), u.jsxs("span", {
          children: ["Parameters ", u.jsx("strong", {
            children: c.parameterCount
          })]
        }), u.jsxs("span", {
          children: ["Status ", u.jsx("strong", {
            className: c.success ? "dev-ok" : "dev-fail",
            children: c.success ? "Success" : "Failed"
          })]
        })]
      }), u.jsx("p", {
        className: "dev-detail-label",
        children: "Formatted parameterized SQL"
      }), u.jsx("pre", {
        className: "dev-pre",
        children: u.jsx("code", {
          children: es(c.sql)
        })
      }), c.optimization && u.jsxs("div", {
        className: "dev-optimization",
        children: [u.jsx("p", {
          className: "dev-detail-label",
          children: "Optimizer advisor"
        }), u.jsxs("div", {
          className: "dev-plan-grid",
          children: [u.jsxs("span", {
            children: ["Root node ", u.jsx("strong", {
              children: c.optimization.rootNode || "Not analyzed"
            })]
          }), u.jsxs("span", {
            children: ["Estimated cost ", u.jsx("strong", {
              children: c.optimization.estimatedCost ?? "—"
            })]
          }), u.jsxs("span", {
            children: ["Estimated rows ", u.jsx("strong", {
              children: c.optimization.estimatedRows ?? "—"
            })]
          }), u.jsxs("span", {
            children: ["Index access ", u.jsx("strong", {
              children: c.optimization.usesIndex ? "Detected" : "Not detected"
            })]
          })]
        }), u.jsx("p", {
          className: "dev-recommendation",
          children: c.optimization.recommendation
        })]
      }), ((v = (w = c.optimizer) == null ? void 0 : w.indexCandidates) == null ? void 0 : v.length) > 0 && u.jsxs("div", {
        className: "dev-optimizer-actions",
        children: [u.jsx("p", {
          className: "dev-detail-label",
          children: "Safe optimizer candidates"
        }), c.optimizer.indexCandidates.map(y => u.jsxs("div", {
          className: "dev-candidate",
          children: [u.jsxs("div", {
            children: [u.jsxs("strong", {
              children: [y.table, " (", y.columns.join(", "), ")"]
            }), u.jsx("small", {
              children: y.explanation
            })]
          }), u.jsx("button", {
            type: "button",
            disabled: s,
            onClick: async () => {
              a(!0), o("");
              try {
                const P = await Lp(n, {
                  table: y.table,
                  columns: y.columns
                });
                o(P.message)
              } catch (P) {
                o(P.message)
              } finally {
                a(!1)
              }
            },
            children: s ? "Applying…" : "Approve index"
          })]
        }, `${y.table}-${y.name}`)), i && u.jsx("p", {
          className: "dev-action-message",
          children: i
        })]
      }), u.jsxs("p", {
        className: "dev-detail-meta",
        children: [c.route, " · ", c.actor, " · ", ts(c.timestamp), c.error ? ` · ${c.error}` : ""]
      })]
    })]
  })
}

function ts(e) {
  return new Date(e).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  })
}

function Op({
  user: e,
  onLogout: t
}) {
  const [n, r] = z.useState({
    summary: {},
    queries: []
  }), [l, i] = z.useState(""), o = z.useCallback(async () => {
    try {
      r(await zp(Oe())), i("")
    } catch (a) {
      i(a.message)
    }
  }, []);
  z.useEffect(() => {
    o();
    const a = window.setInterval(o, 3e3);
    return () => window.clearInterval(a)
  }, [o]);
  const s = n.summary;
  return u.jsxs("div", {
    className: "dev-shell",
    children: [u.jsxs("header", {
      className: "dev-header",
      children: [u.jsxs("div", {
        children: [u.jsx("p", {
          className: "dev-kicker",
          children: "MedChart · DBMS observability"
        }), u.jsx("h1", {
          children: "Developer Query Console"
        }), u.jsx("p", {
          className: "dev-subtitle",
          children: "Live SQL execution telemetry from the healthcare workflow"
        })]
      }), u.jsxs("div", {
        className: "dev-header-actions",
        children: [u.jsx("span", {
          children: e.email
        }), u.jsx("button", {
          type: "button",
          onClick: t,
          children: "Log out"
        })]
      })]
    }), u.jsxs("main", {
      className: "dev-main",
      children: [u.jsxs("section", {
        className: "dev-metrics",
        "aria-label": "Query performance summary",
        children: [u.jsxs("div", {
          className: "dev-metric",
          children: [u.jsx("span", {
            children: "Total queries"
          }), u.jsx("strong", {
            children: s.totalQueries ?? 0
          })]
        }), u.jsxs("div", {
          className: "dev-metric",
          children: [u.jsx("span", {
            children: "Average time"
          }), u.jsxs("strong", {
            children: [s.averageDurationMs ?? 0, " ms"]
          })]
        }), u.jsxs("div", {
          className: "dev-metric",
          children: [u.jsx("span", {
            children: "Successful"
          }), u.jsx("strong", {
            children: s.successfulQueries ?? 0
          })]
        }), u.jsxs("div", {
          className: "dev-metric",
          children: [u.jsx("span", {
            children: "Failed"
          }), u.jsx("strong", {
            className: s.failedQueries ? "dev-danger" : "",
            children: s.failedQueries ?? 0
          })]
        }), u.jsxs("div", {
          className: "dev-metric",
          children: [u.jsx("span", {
            children: "Plans analyzed"
          }), u.jsx("strong", {
            children: s.explainedQueries ?? 0
          })]
        }), u.jsxs("div", {
          className: "dev-metric",
          children: [u.jsx("span", {
            children: "Index plans"
          }), u.jsx("strong", {
            children: s.optimizedPlanQueries ?? 0
          })]
        })]
      }), u.jsxs("section", {
        className: "dev-panel",
        children: [u.jsxs("div", {
          className: "dev-panel-heading",
          children: [u.jsxs("div", {
            children: [u.jsx("h2", {
              children: "Query scratch cards"
            }), u.jsx("p", {
              children: "Queries are grouped by DBMS workflow. Select an execution to inspect its formatted SQL and cardinality."
            })]
          }), u.jsx("button", {
            type: "button",
            className: "dev-refresh",
            onClick: o,
            children: "Refresh now"
          })]
        }), l && u.jsx("p", {
          className: "dev-error",
          children: l
        }), n.queries.length === 0 ? u.jsx("p", {
          className: "dev-empty",
          children: "No queries captured yet. Use the patient or doctor workflow, then return here."
        }) : u.jsx("div", {
          className: "dev-card-grid",
          children: Rp(n.queries).map(a => u.jsx(Dp, {
            ...a,
            token: Oe()
          }, a.name))
        })]
      }), u.jsxs("section", {
        className: "dev-panel dev-guidance",
        children: [u.jsx("h2", {
          children: "How to demonstrate the cross-layer flow"
        }), u.jsxs("div", {
          className: "dev-flow",
          children: [u.jsx("span", {
            children: "Patient login"
          }), u.jsx("b", {
            children: "→"
          }), u.jsx("span", {
            children: "Book appointment"
          }), u.jsx("b", {
            children: "→"
          }), u.jsx("span", {
            children: "Doctor confirms"
          }), u.jsx("b", {
            children: "→"
          }), u.jsx("span", {
            children: "Treatment active"
          }), u.jsx("b", {
            children: "→"
          }), u.jsx("span", {
            children: "Report fetch"
          })]
        }), u.jsx("p", {
          children: "Every step produces database activity in this console. Execution time is measured around the PostgreSQL call; failed queries are retained for diagnosis."
        })]
      })]
    })]
  })
}

function Mp() {
  const {
    currentUser: e,
    error: t,
    loading: n,
    initializing: r,
    signup: l,
    login: i,
    logout: o,
    clearError: s
  } = ep();
  return r ? u.jsx(Pp, {}) : e ? e.role === "developer" ? u.jsx(Op, {
    user: e,
    onLogout: o
  }) : e.role === "doctor" ? u.jsx(_p, {
    user: e,
    onLogout: o
  }) : u.jsx(Cp, {
    user: e,
    onLogout: o
  }) : u.jsx(op, {
    onLogin: i,
    onSignup: l,
    error: t,
    clearError: s,
    loading: n
  })
}
mc(document.getElementById("root")).render(u.jsx(z.StrictMode, {
  children: u.jsx(Mp, {})
}));