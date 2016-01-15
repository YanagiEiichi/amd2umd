/**/ void function(scope) {
/**/ 
/**/   // CommonJS
/**/   if (typeof module === 'object' && !!module.exports) return scope(function(name, dependencies, factory) {
/**/     if(factory === void 0) factory = dependencies, dependencies = [];
/**/     var args;
/**/     <!-- dependencies -->
/**/     module.exports = factory.apply(module.exports, args) || module.exports;
/**/   });
/**/ 
/**/   // AMD, wrap a 'String' to avoid warn of fucking webpack
/**/   if (String(typeof define) === 'function' && !!define.amd) return scope(define);
/**/ 
/**/   // Global
/**/   scope(function(name, dependencies, factory) {
/**/     if(factory === void 0) factory = dependencies, dependencies = [];
/**/     /**/ try { /* Fuck IE8- */
/**/     /**/   if(typeof execScript === 'object') execScript('var ' + name);
/**/     /**/ } catch(error) {}
/**/     window[name] = {}; 
/**/     var args = [];
/**/     for(var i = 0; i < dependencies.length; i++) args[i] = window[dependencies[i]];
/**/     window[name] = factory.apply(window[name], args) || window[name];
/**/   });
/**/ 
/**/ }(function(define) {

<!-- source -->

/**/ });
