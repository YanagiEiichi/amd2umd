/**/ void function(scope) {
/**/ 
/**/   // CommonJS
/**/   if (typeof module === 'object' && !!module.exports) return scope(function(name, dependencies, factory) {
/**/     if(factory === void 0) factory = dependencies, dependencies = [];
/**/     module.exports = factory.apply(module.exports, dependencies.map(require)) || module.exports;
/**/   });
/**/ 
/**/   // AMD, wrap a 'String' to avoid warn of fucking webpack
/**/   if (String(typeof define) === 'function' && !!define.amd) return scope(define);
/**/ 
/**/   // Global
/**/   scope(function(name, dependencies, factory) {
/**/     /**/ try { /* Fuck IE8- */
/**/     /**/   if(typeof execScript === 'object') execScript('var ' + name);
/**/     /**/ } catch(error) {}
/**/     window[name] = {}; 
/**/     window[name] = factory.apply(window[name], dependencies.map(require)) || window[name];
/**/   });
/**/ 
/**/ }(function(define) {

define('./a', ['./b'], function(b) {
  return JSON.stringify({ a: 1, b: b.b });
});

/**/ });
