/**
 * Dll's
 */
export function polyfills() {
  return [
    'core-js/es6/promise',
  ];
}

export function vendor() {
  return [
    'csx',
    'typestyle',
    'vue-class-component',
    'vue-router',
    'vue',
    'vuex-class',
    'vuex'
  ];
}
